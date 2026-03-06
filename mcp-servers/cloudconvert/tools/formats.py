"""cloudconvert_list_formats — list supported output formats for a given input format."""

import json
import cloudconvert
from .errors import handle_error


async def run(input_format: str, category: str = None) -> str:
    """
    List supported output formats for a given input format.
    Does NOT consume conversion credits.

    Args:
        input_format: Source format (e.g. 'pptx', 'pdf', 'mp4').
        category:     Optional filter — 'document', 'image', 'video', 'audio', 'archive'.

    Returns:
        JSON string with supported output formats.
    """
    try:
        params = {"input_format": input_format.lower().strip(".")}
        if category:
            params["output_format"] = category

        result = cloudconvert.Format.all(params)

        formats = []
        for item in (result if isinstance(result, list) else result.get("data", [])):
            entry = {
                "output_format": item.get("output_format") or item.get("format"),
                "name": item.get("name", ""),
            }
            if item.get("output_format"):
                formats.append(entry)

        return json.dumps({
            "input_format": input_format,
            "supported_outputs": formats,
            "count": len(formats)
        }, indent=2)

    except Exception as e:
        return handle_error(e)
