---
name: obsidian-automation
description: This skill should be used when the user wants to automate repetitive Obsidian tasks using the Obsidian CLI, shell commands, or scripted workflows. Use when the user needs to batch-create notes, bulk-update frontmatter, run vault maintenance tasks, open specific notes in Obsidian, navigate the vault programmatically, or integrate Obsidian with external tools.
license: MIT
---

## Purpose

This skill automates Obsidian vault operations that are tedious to perform manually through the GUI. It bridges the gap between Obsidian's visual interface and the command line, scripting layer, and external tools.

Automation tasks include: opening notes and performing actions (insert template, navigate, toggle pins), reading vault metadata without opening Obsidian, batch creating or modifying notes, integrating vault content with other applications, and running scheduled maintenance scripts.

The primary automation vector is the **Obsidian CLI** — a community-built command-line interface that communicates with Obsidian via its Local REST API plugin. Secondary automation paths include shell scripts operating on `.md` files directly, and native scripting with Obsidian's built-in Templater or DataviewJS plugins.

## When to Use

Invoke this skill when:

- The user wants to open a specific note in Obsidian from the command line
- The user wants to programmatically insert text or templates into notes
- The user needs to batch-process many notes at once (rename, update frontmatter, create from a list)
- The user asks to automate a repetitive task they currently do manually in Obsidian
- The user wants to integrate Obsidian with shell scripts, CI/CD, or other applications
- The user needs vault-wide search or replace operations beyond what Obsidian's GUI offers
- The user wants to run daily/weekly vault maintenance (archive old notes, generate indexes)
- The user mentions "Obsidian CLI", "Local REST API", "obsidian-local-rest-api", or automation

Do NOT use this skill when:

- The task only requires editing a single note's content — edit the `.md` file directly
- The user needs to change frontmatter properties on one note — use `obsidian-frontmatter` instead
- The user is asking about wikilink management — use `obsidian-links` instead
- The Obsidian CLI is not installed and the task does not require it (simple file operations can work without CLI)

## Automation Tools Overview

### Obsidian CLI (via Local REST API)

The Obsidian Local REST API plugin exposes an HTTP API on `localhost:27123` (default). The `obsidian-cli` npm package wraps this API with a command-line interface.

**Installation:**
```bash
# Install the Local REST API plugin in Obsidian (Community Plugins)
# Then install the CLI wrapper:
npm install -g obsidian-cli

# Or use via npx:
npx obsidian-cli --help
```

**Configuration:**
```bash
# Set the API key (found in Local REST API plugin settings)
export OBSIDIAN_API_KEY="your-key-here"

# Or pass per command:
obsidian-cli --api-key "your-key" <command>
```

**Core commands:**
```bash
# Open a note
obsidian-cli open "Daily Notes/2024-01-15"

# Get note content
obsidian-cli get "Projects/Project Alpha"

# Create or update a note
obsidian-cli put "Daily Notes/2024-01-15" --content "$(cat template.md)"

# Append to a note
obsidian-cli append "Daily Notes/2024-01-15" --content "- New task item"

# Search the vault
obsidian-cli search "query string"

# List notes in a folder
obsidian-cli list "Projects/"

# Delete a note
obsidian-cli delete "Archive/Old Note"
```

### Direct File Operations (Shell)

Many vault tasks do not require the CLI and can be done with standard shell tools on the `.md` files directly:

```bash
# Find all notes lacking frontmatter
grep -rL "^---" <vault-root>/*.md

# Count notes by tag
grep -rh "^  - " <vault-root>/**/*.md | sort | uniq -c | sort -rn | head 20

# Update a frontmatter field across all notes in a folder
find <vault-root>/Projects -name "*.md" -exec sed -i '' \
  's/^status: planning$/status: active/' {} \;

# Create a note if it does not exist
NOTE="<vault-root>/Daily Notes/$(date +%Y-%m-%d).md"
[[ ! -f "$NOTE" ]] && cat daily-template.md > "$NOTE"
```

### Templater Plugin (In-Vault Scripting)

The Templater community plugin allows JavaScript execution inside note templates. Useful for:
- Generating dynamic dates and wikilinks
- Fetching external data (weather, calendar)
- Prompting for user input during note creation

Templater syntax:
```
<% tp.date.now("YYYY-MM-DD") %>
<% tp.file.title %>
<% await tp.system.prompt("Project name?") %>
```

## Workflow

### Step 0: Detect Available Automation Tools

Before scripting, determine what is available:

```bash
# Check if obsidian-cli is installed
which obsidian-cli 2>/dev/null || npx obsidian-cli --version 2>/dev/null

# Check if Obsidian is running (Local REST API must be active)
curl -s http://localhost:27123/vault/ -H "Authorization: Bearer $OBSIDIAN_API_KEY" | head -5

# Check Templater plugin (look for .js files in vault's scripts folder)
find <vault-root> -name "*.js" -path "*/scripts/*" 2>/dev/null | head 5
```

If neither the CLI nor the Local REST API is available, tell the user:
- "The Obsidian CLI requires the Local REST API plugin to be installed and Obsidian to be running."
- Offer to proceed with direct file operations (no Obsidian required, works on `.md` files).

### Step 1: Understand the Automation Goal

Classify the task into one of these categories:

| Category | Example tasks | Primary tool |
|----------|-------------|-------------|
| **Navigate** | Open a note, navigate to a heading | obsidian-cli |
| **Create** | Batch-create notes from a list | file operations + CLI |
| **Update** | Bulk update frontmatter fields | shell `sed` / CLI |
| **Search** | Find notes by content or tag | CLI search / `grep` |
| **Maintain** | Archive old notes, generate MOC | shell script |
| **Integrate** | Sync with calendar, import from web | CLI + external tools |

### Step 2: Generate the Automation Script

For simple one-off tasks, output a single command. For multi-step automation, output a shell script with comments:

```bash
#!/usr/bin/env bash
# Purpose: Create daily notes for the next 7 days from a template
# Requirements: vault-root set, template.md exists
# Usage: ./create-daily-notes.sh /path/to/vault /path/to/template.md

VAULT="${1:?Usage: $0 <vault-root> <template>}"
TEMPLATE="${2:?Usage: $0 <vault-root> <template>}"
FOLDER="$VAULT/Daily Notes"

mkdir -p "$FOLDER"

for i in $(seq 0 6); do
  DATE=$(date -v+${i}d +%Y-%m-%d 2>/dev/null || date -d "+${i} days" +%Y-%m-%d)
  FILE="$FOLDER/$DATE.md"
  if [[ ! -f "$FILE" ]]; then
    sed "s/{{date}}/$DATE/g" "$TEMPLATE" > "$FILE"
    echo "Created: $FILE"
  else
    echo "Exists:  $FILE (skipped)"
  fi
done
```

Key scripting principles:
- Use `#!/usr/bin/env bash` shebang
- Validate required arguments and environment variables at the top
- Echo each action (created, updated, skipped) for visibility
- Use `--dry-run` mode where possible before applying changes
- Never operate on the vault without verifying `$VAULT` path

### Step 3: Handle Obsidian-Specific Operations

**Creating notes with proper frontmatter:**
When scripting note creation, always write a complete frontmatter block at the top of the file template. Pass it through `sed` or `envsubst` to inject dynamic values.

**Batch frontmatter updates:**
Use `awk` or `python` for reliable YAML frontmatter manipulation. Avoid `sed` for multi-line YAML edits — it's error-prone.

```python
#!/usr/bin/env python3
"""Update the status field in all project notes."""
import os, re, sys

vault = sys.argv[1]
new_status = sys.argv[2]

for root, dirs, files in os.walk(vault):
    for f in files:
        if not f.endswith('.md'): continue
        path = os.path.join(root, f)
        with open(path, 'r') as fp:
            content = fp.read()
        if not content.startswith('---'): continue
        updated = re.sub(r'^status: \w+', f'status: {new_status}', content, flags=re.MULTILINE)
        if updated != content:
            with open(path, 'w') as fp:
                fp.write(updated)
            print(f"Updated: {path}")
```

**Vault maintenance — archive old notes:**
```bash
#!/usr/bin/env bash
# Move notes not modified in 90+ days to Archive/
VAULT="${1:?}"
ARCHIVE="$VAULT/Archive"
mkdir -p "$ARCHIVE"

find "$VAULT" -name "*.md" -not -path "$ARCHIVE/*" -mtime +90 | while read -r f; do
  echo "Archiving: $f"
  mv "$f" "$ARCHIVE/$(basename "$f")"
done
```

### Step 4: Dry-Run First

Always offer a dry-run mode before making changes:
- Add `echo "Would create: $FILE"` before actual operations
- `--dry-run` flag pattern: check `[[ "$1" == "--dry-run" ]]` before writes
- For destructive operations (delete, overwrite), default to dry-run unless `-f` flag is explicit

### Step 5: Report Results

At the end of any automation script, output a summary count:

```
Vault maintenance complete:
  Notes created: 7
  Notes updated: 23
  Notes archived: 4
  Errors: 0
```

## Common Automation Recipes

**Open today's daily note in Obsidian:**
```bash
obsidian-cli open "Daily Notes/$(date +%Y-%m-%d)"
```

**Create a new note from a template:**
```bash
TITLE="Meeting with Alice - $(date +%Y-%m-%d)"
obsidian-cli put "Meetings/$TITLE" --content "$(cat meeting-template.md)"
obsidian-cli open "Meetings/$TITLE"
```

**Append to the inbox note:**
```bash
read -rp "Quick note: " QUICK_NOTE
obsidian-cli append "Inbox" --content "- $(date +%H:%M) — $QUICK_NOTE"
```

**Find all notes without a status property:**
```bash
grep -rL "^status:" <vault-root>/**/*.md
```

**Generate an index of all project notes:**
```bash
echo "# Project Index\n" > "$VAULT/Projects/Index.md"
find "$VAULT/Projects" -name "*.md" -not -name "Index.md" | sort | while read -r f; do
  TITLE=$(basename "$f" .md)
  echo "- [[$TITLE]]" >> "$VAULT/Projects/Index.md"
done
```

## Critical Rules

**NEVER:**
- Run destructive operations (delete, overwrite, move) without a dry-run confirmation step
- Hardcode the vault path in a script — always accept it as an argument or read from an environment variable
- Modify binary files or non-`.md` files inside a vault directory
- Use the Local REST API key in plain text in scripts committed to version control

**ALWAYS:**
- Check that Obsidian is running before using the CLI (the Local REST API must be active)
- Validate the vault path exists before operating on it
- Make a backup or test on a copy of the vault when running bulk modifications for the first time
- Use the `--dry-run` pattern before applying irreversible changes
- Document the script's purpose, requirements, and usage in a comment header

## Example Usage

**Example 1: Open today's daily note**

User: "Open today's daily note."

```bash
obsidian-cli open "Daily Notes/$(date +%Y-%m-%d)"
```

If the note does not exist, create it from a template first:
```bash
DATE=$(date +%Y-%m-%d)
NOTE="Daily Notes/$DATE"
# Create if missing
obsidian-cli list "$NOTE" 2>/dev/null || obsidian-cli put "$NOTE" --content "$(sed "s/{{date}}/$DATE/g" daily-template.md)"
obsidian-cli open "$NOTE"
```

---

**Example 2: Batch-create meeting notes**

User: "Create meeting notes for Alice, Bob, and Carol scheduled for today."

```bash
DATE=$(date +%Y-%m-%d)
for PERSON in "Alice" "Bob" "Carol"; do
  TITLE="Meeting with $PERSON - $DATE"
  obsidian-cli put "Meetings/$TITLE" \
    --content "---
title: $TITLE
date: $DATE
attendees:
  - \"[[$PERSON]]\"
tags:
  - meeting
status: scheduled
---

## Agenda

## Notes

## Action Items
"
  echo "Created: $TITLE"
done
```

---

**Example 3: Vault search from CLI**

User: "Find all notes that mention 'OKR' in my vault."

```bash
obsidian-cli search "OKR"
# Or with direct grep:
grep -rl "OKR" <vault-root> --include="*.md"
```

---

**Example 4: Archive old inbox items**

User: "Move all items in my Inbox folder older than 2 weeks to the Archive."

```bash
find "$VAULT/Inbox" -name "*.md" -mtime +14 | while read -r f; do
  DEST="$VAULT/Archive/$(basename "$f")"
  echo "Archiving: $f → $DEST"
  # Add --execute flag to actually move:
  # mv "$f" "$DEST"
done
echo "Run with --execute to apply changes."
```

---

**Example 5: Nightly maintenance script**

User: "Create a nightly script that: creates tomorrow's daily note, appends today's done tasks to a weekly review note."

Output: A full bash script with both operations, date calculations, template injection, and a summary log at the end.
