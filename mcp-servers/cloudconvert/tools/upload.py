"""cloudconvert_upload_file — upload a local file for conversion."""

import json
import os
import cloudconvert
from .errors import handle_error


async def run(file_path: str, task_id: str = None) -> str:
    """
    Upload a local file to CloudConvert for conversion.
    Creates an import/upload task automatically if task_id is not provided.

    Args:
        file_path: Absolute path to the local file to upload.
        task_id:   Optional existing import/upload task ID. If omitted, a new task is created.

    Returns:
        JSON string with task_id and upload status.
    """
    try:
        if not os.path.exists(file_path):
            return json.dumps({
                "error": "file_not_found",
                "message": f"File not found: {file_path}"
            })

        if task_id:
            task = cloudconvert.Task.find(id=task_id)
        else:
            job = cloudconvert.Job.create(payload={
                "tasks": {
                    "upload-file": {"operation": "import/upload"}
                }
            })
            task = next(
                (t for t in job.get("tasks", []) if t.get("name") == "upload-file"),
                None
            )
            if not task:
                return json.dumps({
                    "error": "task_creation_failed",
                    "message": "Could not create import/upload task."
                })
            task_id = task.get("id")

        success = cloudconvert.Task.upload(file_name=file_path, task=task)

        if success:
            return json.dumps({
                "task_id": task_id,
                "status": "uploaded",
                "file": os.path.basename(file_path)
            }, indent=2)
        else:
            return json.dumps({
                "error": "upload_failed",
                "task_id": task_id,
                "message": "Upload returned a non-success response."
            })

    except Exception as e:
        return handle_error(e)
