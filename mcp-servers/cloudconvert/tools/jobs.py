"""cloudconvert_create_job / get_job / wait_job — job lifecycle management."""

import json
import time
import cloudconvert
from .errors import handle_error


async def create(tasks: dict) -> str:
    """
    Create a CloudConvert job with a custom task graph.

    Args:
        tasks: Dict of task definitions (CloudConvert job payload).
               Example:
               {
                 "import-file":  {"operation": "import/url", "url": "https://..."},
                 "convert-file": {"operation": "convert", "input": "import-file", "output_format": "pdf"},
                 "export-file":  {"operation": "export/url", "input": "convert-file"}
               }

    Returns:
        JSON string with job_id, status, and tasks list.
    """
    try:
        job = cloudconvert.Job.create(payload={"tasks": tasks})
        return json.dumps({
            "job_id": job.get("id"),
            "status": job.get("status"),
            "tasks": [
                {"id": t.get("id"), "name": t.get("name"), "status": t.get("status")}
                for t in job.get("tasks", [])
            ]
        }, indent=2)
    except Exception as e:
        return handle_error(e)


async def get(job_id: str) -> str:
    """
    Get the current status of a CloudConvert job.

    Args:
        job_id: The job UUID returned by create_job.

    Returns:
        JSON string with status, tasks, and download URLs if finished.
    """
    try:
        job = cloudconvert.Job.find(id=job_id)
        export_tasks = [
            t for t in job.get("tasks", [])
            if t.get("operation") == "export/url" and t.get("status") == "finished"
        ]
        download_urls = []
        for t in export_tasks:
            files = (t.get("result") or {}).get("files", [])
            download_urls.extend([f.get("url") for f in files if f.get("url")])

        return json.dumps({
            "job_id": job.get("id"),
            "status": job.get("status"),
            "tasks": [
                {
                    "name": t.get("name"),
                    "operation": t.get("operation"),
                    "status": t.get("status"),
                    "message": t.get("message")
                }
                for t in job.get("tasks", [])
            ],
            "download_urls": download_urls
        }, indent=2)
    except Exception as e:
        return handle_error(e)


async def wait(job_id: str, timeout_seconds: int = 120) -> str:
    """
    Wait for a CloudConvert job to finish, then return download URLs.

    Args:
        job_id:          The job UUID.
        timeout_seconds: Max seconds to wait before reporting timeout (default: 120).

    Returns:
        JSON string with status and download_urls on success, or error on timeout/failure.
    """
    try:
        deadline = time.time() + timeout_seconds
        poll_interval = 3

        while time.time() < deadline:
            job = cloudconvert.Job.find(id=job_id)
            status = job.get("status")

            if status == "finished":
                export_tasks = [
                    t for t in job.get("tasks", [])
                    if t.get("operation") == "export/url" and t.get("status") == "finished"
                ]
                download_urls = []
                for t in export_tasks:
                    files = (t.get("result") or {}).get("files", [])
                    download_urls.extend(
                        [{"filename": f.get("filename"), "url": f.get("url")} for f in files]
                    )
                return json.dumps({
                    "job_id": job_id,
                    "status": "finished",
                    "download_urls": download_urls
                }, indent=2)

            if status == "error":
                failed = [
                    t for t in job.get("tasks", []) if t.get("status") == "error"
                ]
                return json.dumps({
                    "error": "job_failed",
                    "job_id": job_id,
                    "message": "; ".join(t.get("message", "") for t in failed)
                })

            time.sleep(poll_interval)

        return json.dumps({
            "error": "timeout",
            "job_id": job_id,
            "message": f"Job did not finish within {timeout_seconds}s.",
            "action": "Use cloudconvert_get_job to check current status."
        })

    except Exception as e:
        return handle_error(e)
