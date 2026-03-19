# cloudconvert-converter

Convert files between 200+ formats and perform PDF operations using the CloudConvert API — integrated as an MCP server in claude-superskills.

## Metadata

| Field     | Value                                                                 |
|-----------|-----------------------------------------------------------------------|
| Version   | 2.1.0                                                                 |
| Author    | Eric Andrade                                                          |
| Created   | 2026-03-06                                                            |
| Updated   | 2026-03-19                                                            |
| Platforms | Claude Code, GitHub Copilot, Gemini CLI, OpenCode, Codex, Cursor, Antigravity, AdaL |
| Category  | Content                                                               |
| Tags      | conversion, cloudconvert, pdf, ocr, video, audio, documents, mcp     |
| Risk      | low                                                                   |

## What it does

Orchestrates CloudConvert API v2 operations through 8 MCP tools:

- **Convert any file** — PPTX → PDF, MOV → MP4, PNG → WebP, DOCX → HTML, and 200+ more
- **PDF operations** — OCR, merge, split by page range, rotate, encrypt, decrypt
- **Upload & Download** — local file upload for conversion, result download to disk
- **Format discovery** — list supported outputs for any input format (free, no credits)

## Requirements

1. A [CloudConvert account](https://cloudconvert.com) — free tier includes **10 conversion minutes/day**
2. API key set in environment: `export CLOUDCONVERT_API_KEY="your-key"`
3. Python dependencies: `pip install cloudconvert mcp python-dotenv`

## Quick Start

```bash
# Set API key
export CLOUDCONVERT_API_KEY="your-key"

# Test in sandbox (no credits consumed)
export CLOUDCONVERT_SANDBOX=true
```

Then in Claude Code or any supported platform:
```
convert presentation.pptx to PDF
```
```
merge report1.pdf, report2.pdf and report3.pdf into one file
```
```
extract text from this scanned PDF using OCR
```

## Free Tier Limits

| Plan         | Minutes/day | Cost           |
|--------------|-------------|----------------|
| Free         | 10 min      | $0             |
| Prepaid      | Unlimited   | Pay-as-you-go  |
| Subscription | Unlimited   | Monthly        |

Use `CLOUDCONVERT_SANDBOX=true` for testing — no credits consumed.

## Error Handling

The skill handles all CloudConvert error scenarios:

| Error              | Cause                         | Recovery |
|--------------------|-------------------------------|----------|
| `invalid_api_key`  | Missing/invalid API key       | Setup instructions shown |
| `quota_exceeded`   | 10 min/day free limit reached | Sandbox mode or upgrade suggested |
| `unsupported_format` | Format pair not supported   | Alternative formats suggested |
| `file_too_large`   | File exceeds plan limit       | Compression or upgrade suggested |
| `timeout`          | Job took >120s                | `cloudconvert_get_job` to check status |
| `server_error`     | CloudConvert service down     | Retry once + status page link |

## MCP Tools

| Tool | Description |
|------|-------------|
| `cloudconvert_convert` | End-to-end conversion (recommended) |
| `cloudconvert_create_job` | Custom multi-task pipeline |
| `cloudconvert_get_job` | Check job status |
| `cloudconvert_wait_job` | Poll until finished |
| `cloudconvert_upload_file` | Upload local file |
| `cloudconvert_download_file` | Download result |
| `cloudconvert_list_formats` | List supported formats (free) |
| `cloudconvert_pdf_operations` | OCR, merge, split, rotate, encrypt, decrypt |

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Job Creation → Upload → Conversion → Download) displayed during execution
- **EVals** — `evals/evals.json` with 3 realistic test cases; `evals/trigger-eval.json` with 20 queries (10 trigger / 10 no-trigger) for description optimization
- **Standardized description** — SKILL.md description updated to Anthropic skill-creator format

## Links

- [CloudConvert Dashboard](https://cloudconvert.com/dashboard)
- [API Documentation](https://cloudconvert.com/api/v2)
- [Supported Formats](https://cloudconvert.com/formats)
- [Status Page](https://status.cloudconvert.com)
- [Pricing](https://cloudconvert.com/pricing)
