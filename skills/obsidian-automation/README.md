# ⚙️ obsidian-automation

> Automate Obsidian vault tasks using the Obsidian CLI, shell scripts, and the Local REST API. Batch-create notes, run maintenance, integrate with external tools.

## Metadata

| Field     | Value                                              |
|-----------|----------------------------------------------------|
| Version   | 1.0.0                                              |
| Author    | Eric Andrade                                       |
| Created   | 2026-04-03                                         |
| Updated   | 2026-04-03                                         |
| Platforms | All 8                                              |
| Category  | Obsidian / Automation                              |
| Tags      | obsidian, automation, cli, scripting, shell, batch-processing |
| Risk      | Medium (file system operations)                    |

## Overview

`obsidian-automation` bridges Obsidian's visual interface and the command line, enabling batch operations that would be tedious through the GUI. It uses the Obsidian Local REST API (via the `obsidian-cli` npm package), shell scripting, and optional Templater plugin scripting. All destructive operations include a dry-run mode.

## Features

- **CLI integration** — Wrap the Obsidian Local REST API with commands for open, create, append, search
- **Batch note creation** — Create multiple notes from a template with dynamic values
- **Bulk frontmatter updates** — Update properties across an entire folder or vault
- **Vault maintenance** — Archive old notes, generate index MOCs, clean up orphans
- **Vault search** — Full-text search from the command line without opening Obsidian
- **Shell recipes** — Ready-to-use scripts for common automation patterns
- **Dry-run safety** — Preview changes before applying them

## Quick Start / Triggers

This skill activates when you use phrases like:

- "Open today's daily note from the command line"
- "Create meeting notes for all attendees"
- "Batch-update the status field in all project notes"
- "Automate my daily note creation"
- "Archive notes older than 30 days"
- "Obsidian CLI command to..."
- "Script to generate an index of all my notes"

## Requirements

For full CLI automation:
1. **Obsidian** running with the **Local REST API** community plugin installed
2. **Node.js** installed
3. `obsidian-cli` installed: `npm install -g obsidian-cli`
4. API key configured: `export OBSIDIAN_API_KEY="your-key"` (found in plugin settings)

For file-level automation (no Obsidian required):
- Just a shell with standard Unix tools (`bash`, `find`, `grep`, `sed`, `awk`)

## Automation Categories

| Category | Tools Needed | Example |
|---------|-------------|---------|
| Navigate | obsidian-cli + Obsidian running | Open note, navigate |
| Create | File ops or CLI | Batch note creation |
| Update | Shell + CLI | Bulk frontmatter changes |
| Search | CLI or grep | Vault-wide content search |
| Maintain | Shell scripts | Archive, index, cleanup |
| Integrate | CLI + external | Import from web, sync calendar |

## Examples

| Task | Command / Script |
|------|-----------------|
| Open today's daily note | `obsidian-cli open "Daily Notes/$(date +%Y-%m-%d)"` |
| Append quick note to inbox | `obsidian-cli append "Inbox" --content "- $(date) — $NOTE"` |
| Search vault | `obsidian-cli search "OKR"` |
| Find notes without frontmatter | `grep -rL "^---" vault/**/*.md` |
| Archive old notes | Script with `find -mtime +90` + `mv` to Archive folder |
| Batch-create meeting notes | Loop over attendees list with `obsidian-cli put` |
