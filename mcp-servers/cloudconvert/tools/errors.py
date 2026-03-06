"""Shared error handling for CloudConvert MCP tools."""

import json


def handle_error(e: Exception) -> str:
    """Translate CloudConvert/network exceptions into structured user-friendly messages."""
    msg = str(e)

    # API key missing or invalid (HTTP 401)
    if "401" in msg or "Unauthenticated" in msg or "Unauthorized" in msg:
        return json.dumps({
            "error": "invalid_api_key",
            "message": "CloudConvert API key is invalid or missing.",
            "action": "Set a valid key: export CLOUDCONVERT_API_KEY='your-key'",
            "link": "https://cloudconvert.com/dashboard/api/v2/keys"
        })

    # Free tier / payment required (HTTP 402)
    if "402" in msg or "Payment Required" in msg or "conversion minutes" in msg.lower():
        return json.dumps({
            "error": "quota_exceeded",
            "message": "Free tier limit reached (10 conversion minutes/day).",
            "action": "Use CLOUDCONVERT_SANDBOX=true for testing, or upgrade your plan.",
            "link": "https://cloudconvert.com/pricing"
        })

    # Unsupported format
    if "not supported" in msg.lower() or "invalid output" in msg.lower():
        return json.dumps({
            "error": "unsupported_format",
            "message": f"Conversion not supported: {msg}",
            "action": "Use cloudconvert_list_formats to see available output formats."
        })

    # File too large (HTTP 413)
    if "413" in msg or "too large" in msg.lower() or "exceeds" in msg.lower():
        return json.dumps({
            "error": "file_too_large",
            "message": "File exceeds the maximum allowed size.",
            "action": "Compress the file or upgrade your CloudConvert plan."
        })

    # Timeout
    if "timeout" in msg.lower() or "timed out" in msg.lower():
        return json.dumps({
            "error": "timeout",
            "message": "Job timed out waiting for completion.",
            "action": "Use cloudconvert_get_job to check current status.",
            "link": "https://status.cloudconvert.com"
        })

    # Network / server errors (HTTP 5xx)
    if any(code in msg for code in ["500", "502", "503", "504"]):
        return json.dumps({
            "error": "server_error",
            "message": f"CloudConvert service error: {msg}",
            "action": "Check service status and retry once.",
            "link": "https://status.cloudconvert.com"
        })

    # Generic fallback
    return json.dumps({
        "error": "cloudconvert_error",
        "message": msg
    })
