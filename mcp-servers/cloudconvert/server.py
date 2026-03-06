#!/usr/bin/env python3
"""
CloudConvert MCP Server — part of claude-superskills v1.18.0
Exposes 8 MCP tools for file conversion, PDF operations, upload/download.

Setup:
    export CLOUDCONVERT_API_KEY="your-key"
    export CLOUDCONVERT_SANDBOX=true   # optional: test mode (no credits consumed)

Free tier: 10 conversion minutes/day. Use CLOUDCONVERT_SANDBOX=true for testing.
"""

import os
import sys
import json
import asyncio

# Validate API key before importing cloudconvert (fail fast with clear message)
_api_key = os.environ.get("CLOUDCONVERT_API_KEY", "").strip()
if not _api_key:
    sys.stderr.write(
        "\n[cloudconvert-mcp] ERROR: CLOUDCONVERT_API_KEY is not set.\n"
        "  Add to your shell profile:\n"
        "    export CLOUDCONVERT_API_KEY='your-key'\n"
        "  Get your key at: https://cloudconvert.com/dashboard/api/v2/keys\n\n"
    )
    sys.exit(1)

import cloudconvert
from mcp.server.fastmcp import FastMCP

from tools import convert, jobs, upload, download, formats, pdf_ops

# Configure CloudConvert SDK
_sandbox = os.environ.get("CLOUDCONVERT_SANDBOX", "false").lower() == "true"
cloudconvert.configure(api_key=_api_key, sandbox=_sandbox)

# Initialise MCP server
mcp = FastMCP(
    "cloudconvert",
    instructions=(
        "CloudConvert MCP server — convert 200+ file formats, perform PDF operations "
        "(OCR, merge, split, rotate, encrypt/decrypt), upload local files, and download results. "
        "Free tier: 10 conversion minutes/day. "
        "Set CLOUDCONVERT_SANDBOX=true to test without consuming credits."
    )
)


# ── Tool 1: Convert ──────────────────────────────────────────────────────────

@mcp.tool()
async def cloudconvert_convert(
    output_format: str,
    input_file: str = None,
    input_url: str = None,
    output_path: str = None,
    options: dict = None
) -> str:
    """
    Convert a file to another format end-to-end (import → convert → export → download).
    Supports 200+ formats: documents, images, video, audio, presentations, archives.

    Provide input_file (local path) OR input_url (remote), not both.
    output_path defaults to the current working directory.
    options passes extra CloudConvert parameters (e.g. {"quality": 80}).

    Free tier: consumes conversion minutes. Use cloudconvert_list_formats first to verify support.
    """
    return await convert.run(
        output_format=output_format,
        input_file=input_file,
        input_url=input_url,
        output_path=output_path,
        options=options
    )


# ── Tool 2: Create Job ───────────────────────────────────────────────────────

@mcp.tool()
async def cloudconvert_create_job(tasks: dict) -> str:
    """
    Create a CloudConvert job with a custom multi-task pipeline.
    Use this for advanced workflows (e.g. compress then convert, chain operations).

    tasks: CloudConvert task graph dict. Each key is a task name; each value is a task definition.
    Example:
      {
        "import-file":  {"operation": "import/url", "url": "https://..."},
        "convert-file": {"operation": "convert", "input": "import-file", "output_format": "pdf"},
        "export-file":  {"operation": "export/url", "input": "convert-file"}
      }
    """
    return await jobs.create(tasks=tasks)


# ── Tool 3: Get Job ──────────────────────────────────────────────────────────

@mcp.tool()
async def cloudconvert_get_job(job_id: str) -> str:
    """
    Get the current status of a CloudConvert job by its ID.
    Returns status, per-task details, and download URLs if the job is finished.
    """
    return await jobs.get(job_id=job_id)


# ── Tool 4: Wait Job ─────────────────────────────────────────────────────────

@mcp.tool()
async def cloudconvert_wait_job(job_id: str, timeout_seconds: int = 120) -> str:
    """
    Poll a CloudConvert job until it finishes (or times out), then return download URLs.
    timeout_seconds defaults to 120. Use cloudconvert_get_job if you need non-blocking status.
    """
    return await jobs.wait(job_id=job_id, timeout_seconds=timeout_seconds)


# ── Tool 5: Upload File ──────────────────────────────────────────────────────

@mcp.tool()
async def cloudconvert_upload_file(file_path: str, task_id: str = None) -> str:
    """
    Upload a local file to CloudConvert for conversion.
    If task_id is omitted, an import/upload task is created automatically.
    Returns task_id to use as input in subsequent conversion tasks.
    """
    return await upload.run(file_path=file_path, task_id=task_id)


# ── Tool 6: Download File ────────────────────────────────────────────────────

@mcp.tool()
async def cloudconvert_download_file(url: str, output_path: str = None) -> str:
    """
    Download a converted file from a CloudConvert export URL to the local filesystem.
    output_path can be a directory or a full file path. Defaults to the current directory.
    Returns saved_path and file size.
    """
    return await download.run(url=url, output_path=output_path)


# ── Tool 7: List Formats ─────────────────────────────────────────────────────

@mcp.tool()
async def cloudconvert_list_formats(input_format: str, category: str = None) -> str:
    """
    List all supported output formats for a given input format.
    Does NOT consume conversion credits — safe to call before converting.

    input_format: source format (e.g. 'pptx', 'pdf', 'mp4', 'png').
    category:     optional filter — 'document', 'image', 'video', 'audio', 'archive'.
    """
    return await formats.run(input_format=input_format, category=category)


# ── Tool 8: PDF Operations ───────────────────────────────────────────────────

@mcp.tool()
async def cloudconvert_pdf_operations(
    operation: str,
    input_files: list = None,
    input_url: str = None,
    output_path: str = None,
    options: dict = None
) -> str:
    """
    Perform specialized PDF operations via CloudConvert.
    Supported operations: ocr, merge, split, rotate, encrypt, decrypt.

    input_files: list of local file paths (required for merge; single item for others).
    input_url:   remote URL (alternative to input_files for single-file ops).
    output_path: directory or file path for the result. Defaults to cwd.
    options:
      ocr     -> {"language": "por"}
      rotate  -> {"rotate": 90}
      split   -> {"pages": "1-3,5"}
      encrypt -> {"user_password": "...", "owner_password": "..."}
      decrypt -> {"password": "..."}
    """
    return await pdf_ops.run(
        operation=operation,
        input_files=input_files,
        input_url=input_url,
        output_path=output_path,
        options=options
    )


# ── Entry point ──────────────────────────────────────────────────────────────

if __name__ == "__main__":
    mode = "sandbox" if _sandbox else "production"
    sys.stderr.write(f"[cloudconvert-mcp] Starting in {mode} mode...\n")
    mcp.run()
