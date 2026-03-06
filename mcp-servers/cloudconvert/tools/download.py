"""cloudconvert_download_file — download a converted file to the local filesystem."""

import json
import os
import requests
import cloudconvert
from .errors import handle_error


async def run(url: str, output_path: str = None) -> str:
    """
    Download a converted file from a CloudConvert export URL.

    Args:
        url:         Export URL from a finished export/url task.
        output_path: Directory or full file path to save the download.
                     Defaults to the current working directory.

    Returns:
        JSON string with saved_path and file size.
    """
    try:
        filename = url.split("/")[-1].split("?")[0] or "converted_file"

        if output_path:
            if os.path.isdir(output_path):
                save_path = os.path.join(output_path, filename)
            else:
                save_path = output_path
                os.makedirs(os.path.dirname(save_path), exist_ok=True)
        else:
            save_path = os.path.join(os.getcwd(), filename)

        # Use cloudconvert SDK download helper when possible, fall back to requests
        try:
            cloudconvert.download(filename=save_path, url=url)
        except Exception:
            response = requests.get(url, stream=True, timeout=60)
            response.raise_for_status()
            with open(save_path, "wb") as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)

        size_bytes = os.path.getsize(save_path)
        return json.dumps({
            "saved_path": save_path,
            "filename": os.path.basename(save_path),
            "size_bytes": size_bytes,
            "size_human": _human_size(size_bytes)
        }, indent=2)

    except Exception as e:
        return handle_error(e)


def _human_size(size: int) -> str:
    for unit in ("B", "KB", "MB", "GB"):
        if size < 1024:
            return f"{size:.1f} {unit}"
        size /= 1024
    return f"{size:.1f} TB"
