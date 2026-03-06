"""cloudconvert_convert — high-level convert a file from one format to another."""

import json
import os
import time
import cloudconvert
from .errors import handle_error


async def run(
    output_format: str,
    input_file: str = None,
    input_url: str = None,
    output_path: str = None,
    options: dict = None
) -> str:
    """
    Convert a file to another format end-to-end:
    import → convert → export/url → download.

    Provide either input_file (local path) or input_url (remote URL), not both.

    Args:
        output_format: Target format (e.g. 'pdf', 'docx', 'mp4', 'webp').
        input_file:    Path to a local file to upload and convert.
        input_url:     URL of a remote file to import and convert.
        output_path:   Directory or file path to save the result. Defaults to cwd.
        options:       Extra conversion options passed to CloudConvert
                       (e.g. {"quality": 80, "pages": "1-3"}).

    Returns:
        JSON string with saved_path, filename, size, and job_id on success.
    """
    try:
        if not input_file and not input_url:
            return json.dumps({
                "error": "missing_input",
                "message": "Provide either input_file or input_url."
            })

        if input_file and not os.path.exists(input_file):
            return json.dumps({
                "error": "file_not_found",
                "message": f"File not found: {input_file}"
            })

        tasks: dict = {}

        # Step 1: Import
        if input_url:
            tasks["import-file"] = {"operation": "import/url", "url": input_url}
        else:
            tasks["import-file"] = {"operation": "import/upload"}

        # Step 2: Convert
        convert_task: dict = {
            "operation": "convert",
            "input": "import-file",
            "output_format": output_format.lower().strip(".")
        }
        if options:
            convert_task.update(options)
        tasks["convert-file"] = convert_task

        # Step 3: Export
        tasks["export-file"] = {"operation": "export/url", "input": "convert-file"}

        # Create job
        job = cloudconvert.Job.create(payload={"tasks": tasks})
        job_id = job.get("id")

        # Upload if local file
        if input_file:
            upload_task = next(
                (t for t in job.get("tasks", []) if t.get("name") == "import-file"),
                None
            )
            if not upload_task:
                return json.dumps({
                    "error": "upload_task_not_found",
                    "job_id": job_id,
                    "message": "Could not locate the import/upload task in the job."
                })
            success = cloudconvert.Task.upload(file_name=input_file, task=upload_task)
            if not success:
                return json.dumps({
                    "error": "upload_failed",
                    "job_id": job_id,
                    "message": "File upload to CloudConvert failed."
                })

        # Step 4: Wait for completion (up to 120s, polling every 3s)
        deadline = time.time() + 120
        poll_interval = 3
        finished_job = None

        while time.time() < deadline:
            finished_job = cloudconvert.Job.find(id=job_id)
            status = finished_job.get("status")

            if status == "finished":
                break
            if status == "error":
                failed_tasks = [
                    t for t in finished_job.get("tasks", []) if t.get("status") == "error"
                ]
                error_msgs = "; ".join(t.get("message", "") for t in failed_tasks)
                return json.dumps({
                    "error": "conversion_failed",
                    "job_id": job_id,
                    "message": error_msgs or "Unknown conversion error."
                })
            time.sleep(poll_interval)
        else:
            return json.dumps({
                "error": "timeout",
                "job_id": job_id,
                "message": "Conversion did not complete within 120s.",
                "action": "Use cloudconvert_get_job to check current status."
            })

        # Step 5: Extract download URL
        export_task = next(
            (t for t in finished_job.get("tasks", [])
             if t.get("name") == "export-file" and t.get("status") == "finished"),
            None
        )
        if not export_task:
            return json.dumps({
                "error": "export_not_found",
                "job_id": job_id,
                "message": "Export task did not complete successfully."
            })

        files = (export_task.get("result") or {}).get("files", [])
        if not files:
            return json.dumps({
                "error": "no_output_files",
                "job_id": job_id,
                "message": "Conversion finished but no output files found."
            })

        file_info = files[0]
        download_url = file_info.get("url")
        filename = file_info.get("filename", f"output.{output_format}")

        # Step 6: Download
        if output_path:
            if os.path.isdir(output_path):
                save_path = os.path.join(output_path, filename)
            else:
                save_path = output_path
        else:
            save_path = os.path.join(os.getcwd(), filename)

        import requests as req
        try:
            cloudconvert.download(filename=save_path, url=download_url)
        except Exception:
            resp = req.get(download_url, stream=True, timeout=60)
            resp.raise_for_status()
            with open(save_path, "wb") as f:
                for chunk in resp.iter_content(chunk_size=8192):
                    f.write(chunk)

        size_bytes = os.path.getsize(save_path)

        def _human(s: int) -> str:
            for u in ("B", "KB", "MB", "GB"):
                if s < 1024:
                    return f"{s:.1f} {u}"
                s //= 1024
            return f"{s:.1f} TB"

        return json.dumps({
            "status": "success",
            "job_id": job_id,
            "saved_path": save_path,
            "filename": os.path.basename(save_path),
            "output_format": output_format,
            "size_bytes": size_bytes,
            "size_human": _human(size_bytes)
        }, indent=2)

    except Exception as e:
        return handle_error(e)
