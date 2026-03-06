"""cloudconvert_pdf_operations — specialized PDF operations (OCR, merge, split, rotate, encrypt, decrypt)."""

import json
import os
import time
import cloudconvert
from .errors import handle_error

SUPPORTED_OPERATIONS = ("ocr", "merge", "split", "rotate", "encrypt", "decrypt")


async def run(
    operation: str,
    input_files: list = None,
    input_url: str = None,
    output_path: str = None,
    options: dict = None
) -> str:
    """
    Perform a specialized PDF operation via CloudConvert.

    Args:
        operation:   One of: ocr, merge, split, rotate, encrypt, decrypt.
        input_files: List of local file paths (required for merge; single-item list for others).
        input_url:   Remote URL for a single input file (alternative to input_files).
        output_path: Directory or file path for the result. Defaults to cwd.
        options:     Extra options per operation:
                       ocr     -> {"language": "por"} (ISO 639-1)
                       rotate  -> {"rotate": 90}
                       split   -> {"pages": "1-3,5"}
                       encrypt -> {"user_password": "...", "owner_password": "..."}
                       decrypt -> {"password": "..."}

    Returns:
        JSON string with saved_path(s) and job_id.
    """
    try:
        operation = operation.lower().strip()
        if operation not in SUPPORTED_OPERATIONS:
            return json.dumps({
                "error": "unsupported_operation",
                "message": f"Operation '{operation}' is not supported.",
                "supported": list(SUPPORTED_OPERATIONS)
            })

        opts = options or {}
        tasks: dict = {}

        if operation == "merge":
            # Multiple imports
            if not input_files or len(input_files) < 2:
                return json.dumps({
                    "error": "missing_input",
                    "message": "merge requires at least 2 files in input_files."
                })
            import_names = []
            for i, fp in enumerate(input_files):
                name = f"import-{i}"
                tasks[name] = {"operation": "import/upload"}
                import_names.append(name)

            tasks["merge-pdf"] = {
                "operation": "convert",
                "input": import_names,
                "output_format": "pdf",
                "engine": "ghostscript"
            }
            tasks["export-file"] = {"operation": "export/url", "input": "merge-pdf"}

        else:
            # Single file operations
            if input_url:
                tasks["import-file"] = {"operation": "import/url", "url": input_url}
            elif input_files:
                tasks["import-file"] = {"operation": "import/upload"}
            else:
                return json.dumps({
                    "error": "missing_input",
                    "message": "Provide input_files or input_url."
                })

            convert_task: dict = {
                "operation": "convert",
                "input": "import-file",
                "output_format": "pdf"
            }

            if operation == "ocr":
                convert_task["engine"] = "tesseract"
                if "language" in opts:
                    convert_task["language"] = opts["language"]

            elif operation == "rotate":
                convert_task["engine"] = "mupdf"
                convert_task["rotate"] = opts.get("rotate", 90)

            elif operation == "split":
                convert_task["engine"] = "mupdf"
                if "pages" in opts:
                    convert_task["pages"] = opts["pages"]

            elif operation == "encrypt":
                convert_task["engine"] = "mupdf"
                if "user_password" in opts:
                    convert_task["user_password"] = opts["user_password"]
                if "owner_password" in opts:
                    convert_task["owner_password"] = opts["owner_password"]

            elif operation == "decrypt":
                convert_task["engine"] = "mupdf"
                if "password" in opts:
                    convert_task["password"] = opts["password"]

            tasks["convert-file"] = convert_task
            tasks["export-file"] = {"operation": "export/url", "input": "convert-file"}

        # Create job
        job = cloudconvert.Job.create(payload={"tasks": tasks})
        job_id = job.get("id")

        # Upload local files
        if operation == "merge" and input_files:
            for i, fp in enumerate(input_files):
                if not os.path.exists(fp):
                    return json.dumps({"error": "file_not_found", "message": f"Not found: {fp}"})
                upload_task = next(
                    (t for t in job.get("tasks", []) if t.get("name") == f"import-{i}"), None
                )
                if upload_task:
                    cloudconvert.Task.upload(file_name=fp, task=upload_task)

        elif input_files and not input_url:
            fp = input_files[0]
            if not os.path.exists(fp):
                return json.dumps({"error": "file_not_found", "message": f"Not found: {fp}"})
            upload_task = next(
                (t for t in job.get("tasks", []) if t.get("name") == "import-file"), None
            )
            if upload_task:
                cloudconvert.Task.upload(file_name=fp, task=upload_task)

        # Wait for completion
        deadline = time.time() + 180
        finished_job = None
        while time.time() < deadline:
            finished_job = cloudconvert.Job.find(id=job_id)
            status = finished_job.get("status")
            if status == "finished":
                break
            if status == "error":
                failed = [t for t in finished_job.get("tasks", []) if t.get("status") == "error"]
                return json.dumps({
                    "error": "operation_failed",
                    "job_id": job_id,
                    "message": "; ".join(t.get("message", "") for t in failed)
                })
            time.sleep(3)
        else:
            return json.dumps({
                "error": "timeout",
                "job_id": job_id,
                "message": "PDF operation timed out after 180s."
            })

        # Download results
        export_task = next(
            (t for t in finished_job.get("tasks", [])
             if t.get("name") == "export-file" and t.get("status") == "finished"),
            None
        )
        if not export_task:
            return json.dumps({"error": "export_not_found", "job_id": job_id})

        files = (export_task.get("result") or {}).get("files", [])
        saved = []
        import requests as req

        for file_info in files:
            url = file_info.get("url")
            fname = file_info.get("filename", f"{operation}_output.pdf")
            dest = os.path.join(output_path or os.getcwd(), fname) if (
                not output_path or os.path.isdir(output_path or "")
            ) else output_path

            try:
                cloudconvert.download(filename=dest, url=url)
            except Exception:
                resp = req.get(url, stream=True, timeout=60)
                resp.raise_for_status()
                with open(dest, "wb") as f:
                    for chunk in resp.iter_content(chunk_size=8192):
                        f.write(chunk)
            saved.append(dest)

        return json.dumps({
            "status": "success",
            "operation": operation,
            "job_id": job_id,
            "saved_files": saved
        }, indent=2)

    except Exception as e:
        return handle_error(e)
