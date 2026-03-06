# CloudConvert MCP Server

MCP server for the [CloudConvert API v2](https://cloudconvert.com/api/v2) — part of the **claude-superskills** package.

Exposes 8 MCP tools for file conversion (200+ formats), PDF operations, upload/download, and format discovery.

---

## WARNING: Free Tier Limits

CloudConvert free accounts include **10 conversion minutes per day**.
Each job consumes conversion minutes based on file size and format complexity.

| Plan       | Minutes/day | Cost         |
|------------|-------------|--------------|
| Free       | 10 min      | $0           |
| Prepaid    | Unlimited   | Pay-as-you-go |
| Subscription | Unlimited | Monthly plans |

**Before running conversions:**
- Use `CLOUDCONVERT_SANDBOX=true` for testing — no credits consumed, no real conversions.
- Call `cloudconvert_list_formats` to verify support — it never consumes credits.
- Check usage at: https://cloudconvert.com/dashboard

---

## Setup

### 1. Get your API Key

Sign up at https://cloudconvert.com and navigate to:
**Dashboard > API > API Keys > Create API Key**

### 2. Set the API Key — ONE place works for ALL platforms

The CloudConvert MCP server reads `CLOUDCONVERT_API_KEY` from your shell environment.
All 8 platforms (Claude Code, GitHub Copilot, Gemini CLI, etc.) launch MCP servers as
child processes that **inherit your shell environment**. This means you only need to set
the key **once**, and it works everywhere automatically.

```bash
# Add to your shell profile — ONE TIME for ALL platforms
echo 'export CLOUDCONVERT_API_KEY="your-key-here"' >> ~/.zshrc
source ~/.zshrc
```

For bash users:
```bash
echo 'export CLOUDCONVERT_API_KEY="your-key-here"' >> ~/.bashrc
source ~/.bashrc
```

> **Why one place is enough:** The MCP config files written by the installer use
> `${CLOUDCONVERT_API_KEY}` as a reference to your shell env var, not a hardcoded value.
> When any platform launches the MCP server process, your shell environment is passed
> along automatically.

### 3. (Optional) Enable Sandbox mode for testing

```bash
# Add alongside the API key in your shell profile
export CLOUDCONVERT_SANDBOX=true
```

Sandbox mode: the API accepts requests and jobs are created, but no actual conversion
happens and **no credits are consumed**. Use for development and testing.

---

## API Key: Where it lives per platform

| Platform | Config file written by installer | Key location |
|---|---|---|
| Claude Code (plugin) | `.claude-plugin/plugin.json` (auto) | Shell env — `~/.zshrc` |
| Claude Code (npx) | `~/.claude.json` → `projects[home].mcpServers` | Shell env — `~/.zshrc` |
| GitHub Copilot | `~/.github/mcp.json` | Shell env — `~/.zshrc` |
| Gemini CLI | `~/.gemini/mcp_config.json` | Shell env — `~/.zshrc` |
| OpenCode | `~/.agent/mcp.json` | Shell env — `~/.zshrc` |
| OpenAI Codex | `~/.codex/mcp.json` | Shell env — `~/.zshrc` |
| Cursor IDE | `~/.cursor/mcp.json` | Shell env — `~/.zshrc` |
| Antigravity | `~/.gemini/antigravity/mcp.json` | Shell env — `~/.zshrc` |
| AdaL CLI | `~/.adal/mcp.json` | Shell env — `~/.zshrc` |

**All platforms read from the same shell environment variable.** There is no per-platform key configuration needed.

---

## Install Python Dependencies

```bash
pip install -r mcp-servers/cloudconvert/requirements.txt
```

Dependencies: `cloudconvert>=3.0.0`, `mcp>=1.0.0`, `python-dotenv>=1.0.0`

---

## MCP Configuration by Platform

The `npx claude-superskills` installer writes MCP config files automatically for all
detected platforms. If you need to configure manually:

```json
{
  "mcpServers": {
    "cloudconvert": {
      "command": "python",
      "args": ["/path/to/claude-superskills/mcp-servers/cloudconvert/server.py"],
      "env": {
        "CLOUDCONVERT_API_KEY": "${CLOUDCONVERT_API_KEY}"
      }
    }
  }
}
```

### Claude Code — two registration paths

**Via plugin (recommended):** Install claude-superskills as a Claude Code plugin.
The `plugin.json` registers the MCP server automatically — no manual config needed.

**Via npx installer:** The installer writes to `~/.claude.json` under
`projects[homedir].mcpServers`. This makes the server available in all Claude Code
sessions regardless of working directory. Both registrations coexist safely.

---

## Available Tools

| Tool | Description | Uses Credits? |
|------|-------------|--------------|
| `cloudconvert_convert` | End-to-end: import → convert → export → download | Yes |
| `cloudconvert_create_job` | Create a custom multi-task job pipeline | Yes |
| `cloudconvert_get_job` | Get job status and download URLs | No |
| `cloudconvert_wait_job` | Poll until job finishes, return URLs | No |
| `cloudconvert_upload_file` | Upload a local file for conversion | No |
| `cloudconvert_download_file` | Download a converted file to disk | No |
| `cloudconvert_list_formats` | List supported output formats for an input | No |
| `cloudconvert_pdf_operations` | OCR, merge, split, rotate, encrypt, decrypt | Yes |

---

## Error Codes

| Code | Cause | Resolution |
|------|-------|------------|
| `invalid_api_key` | Missing or invalid `CLOUDCONVERT_API_KEY` | Set valid key — see Setup above |
| `quota_exceeded` | Free tier 10 min/day limit reached | Use sandbox mode or upgrade plan |
| `unsupported_format` | Input → output format not supported | Run `cloudconvert_list_formats` |
| `file_too_large` | File exceeds plan limit | Compress or upgrade plan |
| `timeout` | Job did not finish within timeout | Check with `cloudconvert_get_job` |
| `server_error` | CloudConvert service unavailable | Check https://status.cloudconvert.com |

---

## Test the Connection

```bash
CLOUDCONVERT_SANDBOX=true CLOUDCONVERT_API_KEY=your-key \
  python mcp-servers/cloudconvert/server.py
```

Expected output:
```
[cloudconvert-mcp] Starting in sandbox mode...
```

---

## Supported Format Categories

`document`, `image`, `video`, `audio`, `archive`, `presentation`, `spreadsheet`, `ebook`, `vector`, `font`, `cad`

See the full list: https://cloudconvert.com/formats
