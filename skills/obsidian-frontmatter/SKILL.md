---
name: obsidian-frontmatter
description: This skill should be used when the user needs to create, validate, standardize, or repair YAML frontmatter properties in Obsidian notes. Use when the user wants to add or update tags, aliases, dates, custom properties, or any metadata fields in the Properties panel of an Obsidian note.
license: MIT
---

## Purpose

This skill manages YAML frontmatter — the metadata block at the top of every Obsidian note, delimited by `---`. Obsidian calls these "Properties" and displays them in a structured panel. This skill covers the complete lifecycle of frontmatter: writing it correctly the first time, enforcing consistent schema across notes, updating stale properties, and repairing malformed YAML that causes Obsidian to show parsing errors.

Frontmatter is how Obsidian notes become queryable. Without consistent, well-formed properties, Dataview queries fail, searches return incomplete results, and the vault's metadata structure erodes over time. This skill treats frontmatter as the schema layer of your knowledge base.

## When to Use

Invoke this skill when:

- The user wants to add a frontmatter block to a note that has none
- The user wants to update a specific property (e.g., change the status, add a tag)
- The user needs to standardize frontmatter across multiple notes to a shared schema
- The user asks to "add properties", "update metadata", or "fix the frontmatter"
- The user's note has a YAML parse error and Obsidian is not showing properties correctly
- The user wants to add or remove items from a list property (like `tags` or `aliases`)
- The user wants to set up a consistent template for a note type (meeting, project, daily note)
- The user is building Dataview queries and needs to define which properties to use

Do NOT use this skill when:

- The user wants to manage wikilinks inside the note body — use `obsidian-links` instead
- The user wants to create a complete note with full content — use `obsidian-note-builder` instead
- The user is editing frontmatter in a non-Obsidian Markdown file (e.g., Jekyll, Hugo)

## Frontmatter Syntax Reference

Frontmatter must be the very first content in a file, with the opening `---` on line 1:

```
---
title: My Note Title
date: 2024-01-15
tags:
  - project
  - active
aliases:
  - Alternative Title
status: in-progress
---
```

**Critical YAML rules:**
- Opening `---` must be on line 1 with no preceding blank lines or characters
- Use two-space indentation for list items (not tabs)
- List items must use `- ` (dash + space) prefix
- Never use inline list format for `tags`: `[tag1, tag2]` is invalid in Obsidian Properties
- String values with colons should be quoted: `title: "My Note: A Subtitle"`
- Boolean values: `true` / `false` (lowercase, no quotes)
- Dates: ISO 8601 format `YYYY-MM-DD` — Obsidian stores them as date objects

## Standard Property Schema

### Core properties (recommended for all notes)

| Property | Type | Description |
|---------|------|-------------|
| `title` | Text | Human-readable title (often matches filename) |
| `date` | Date | Creation or primary date |
| `tags` | List | Topics and categories for filtering |
| `aliases` | List | Alternative names for link suggestions |
| `status` | Text | Current state (e.g., `draft`, `active`, `done`) |

### Extended properties (by note type)

**Meeting notes:**
```
attendees:
  - Name One
  - Name Two
date: 2024-01-15
project: "[[Project Alpha]]"
action_items:
  - Task assigned to [[Person]]
```

**Project notes:**
```
status: active
start_date: 2024-01-01
due_date: 2024-03-31
stakeholders:
  - "[[Alice Chen]]"
priority: high
```

**Reference / resource notes:**
```
source: "https://example.com/article"
author: Author Name
read_date: 2024-01-15
rating: 4
```

**Daily notes:**
```
date: 2024-01-15
mood: 7
energy: 6
focus_areas:
  - Deep Work
  - Exercise
```

## Workflow

### Step 1: Inspect the Existing Note

Read the note to determine its current state:

1. Does the note have a frontmatter block? (starts with `---` on line 1?)
2. Is the existing YAML well-formed? (no tab indentation, no duplicate keys, no unclosed strings)
3. What properties already exist that should be preserved?
4. What note type is this? (meeting, project, reference, daily, concept, MOC)

If the note has a malformed frontmatter block, identify the specific error:
- **Tabs instead of spaces** — replace with 2-space indent
- **Inline list format** — convert `tags: [a, b]` to multiline list
- **Duplicate keys** — keep the last value, remove duplicates
- **Unquoted special characters** — add quotes around values with `:`, `#`, or `[`

### Step 2: Determine the Target Schema

Ask the user which note type this is if not clear from context. Use the appropriate template from the standard schema above. If the user has provided custom fields, include them.

If updating an existing frontmatter block:
- Preserve all existing properties not being changed
- Add missing properties with sensible defaults
- Never silently delete a property; if a property should be removed, confirm with the user

### Step 3: Write or Update the Frontmatter Block

Generate the complete updated frontmatter block. Rules:

1. **Tags must be a YAML list** — never inline:
   - ✅ Correct:
     ```yaml
     tags:
       - project
       - active
     ```
   - ❌ Wrong: `tags: [project, active]`

2. **Aliases must be a YAML list:**
   - ✅ Correct:
     ```yaml
     aliases:
       - My Alternative Name
     ```
   - ❌ Wrong: `aliases: My Alternative Name`

3. **Dates must be unquoted ISO 8601:**
   - ✅ Correct: `date: 2024-01-15`
   - ❌ Wrong: `date: "January 15, 2024"`

4. **Wikilinks in frontmatter must be quoted:**
   - ✅ Correct: `project: "[[Project Alpha]]"`
   - ❌ Wrong: `project: [[Project Alpha]]`

5. **No extra blank lines inside the frontmatter block**

### Step 4: Replace the Frontmatter in the File

When editing an existing note:

1. Locate the existing frontmatter block (between first `---` pair)
2. Replace the entire block including the `---` delimiters
3. Preserve everything after the closing `---` exactly as written
4. Output the complete updated note (or just the frontmatter change, whichever is more useful)

When adding frontmatter to a note that has none:

1. Insert the frontmatter block at line 1
2. Do NOT add a blank line between the frontmatter and the first heading
3. Preserve all existing content from line 1 onward (shift down by the frontmatter length)

### Step 5: Validate the Output

After generating the frontmatter, verify:

- Opening `---` is on line 1
- All required fields for the note type are present
- `tags` and `aliases` are multiline YAML lists
- No tab characters in the YAML block
- No bare wikilinks (`[[...]]`) — they must be quoted strings
- Dates are in `YYYY-MM-DD` format
- String values with colons are quoted

## Tag Naming Conventions

Tags in Obsidian support hierarchy via `/`:
- `#project/active` — nested tag for active projects
- `#area/work` — area of life tag
- `#resource/book` — resource type

In frontmatter, tags are written without the `#` prefix:
```yaml
tags:
  - project/active
  - area/work
  - resource/book
```

Recommended tag categories:
- **Status:** `inbox`, `draft`, `active`, `done`, `archived`
- **Type:** `meeting`, `project`, `concept`, `reference`, `daily`, `moc`
- **Area:** `work`, `personal`, `learning`, `health`
- **Topic:** domain-specific tags relevant to the vault's subject matter

## Batch Operations

When the user wants to standardize frontmatter across multiple notes:

1. Identify the shared schema to apply
2. List notes that are missing required properties
3. Apply changes note by note, reporting each change
4. Output a summary:

```
Updated 12 notes:
  ✅ Added tags to: Meeting 2024-01-15.md, Project Alpha.md, ...
  ✅ Fixed inline tags format in: Book Notes.md, Resource List.md
  ⚠️  Skipped: Archive/Old Note.md (no changes needed)
```

## Critical Rules

**NEVER:**
- Use tab indentation in YAML — always use 2 spaces
- Write tags or aliases on a single line: `tags: [a, b]` — always use the multiline list format
- Add a blank line between the opening `---` and the first property
- Add a blank line before the closing `---`
- Remove existing properties without explicit user confirmation
- Add frontmatter after the first heading — it must always be at the very top of the file
- Use unquoted wikilinks as property values

**ALWAYS:**
- Preserve all existing properties when adding new ones
- Use ISO 8601 dates (`YYYY-MM-DD`)
- Follow the vault's existing tag naming convention if one can be detected
- Suggest an `aliases` property if the note's title has common abbreviations or alternative names
- Quote string values that contain `:`, `#`, or `[`

## Example Usage

**Example 1: Add frontmatter to a new meeting note**

User: "Add metadata to this meeting note: attendees Alice Chen and Bob Martinez, project Project Alpha, date January 15 2024."

Output:
```yaml
---
title: Q2 Planning Kickoff
date: 2024-01-15
tags:
  - meeting
  - project/active
attendees:
  - "[[Alice Chen]]"
  - "[[Bob Martinez]]"
project: "[[Project Alpha]]"
status: done
---
```

---

**Example 2: Fix malformed frontmatter**

User: "Obsidian is showing a YAML error in this note. Here is the current frontmatter:"

```
---
title: Strategy Note
tags: [product, strategy, q2]
date: March 2024
project: [[Initiative X]]
---
```

Issues found:
1. `tags` uses inline list format — must be multiline
2. `date` is not ISO 8601 format — should be `2024-03-01`
3. `project` has an unquoted wikilink — must be quoted

Fixed output:
```yaml
---
title: Strategy Note
tags:
  - product
  - strategy
  - q2
date: 2024-03-01
project: "[[Initiative X]]"
---
```

---

**Example 3: Add a custom property to multiple notes**

User: "Add `priority: high` to all my notes tagged with `project/active`."

Response: Lists matching notes, confirms, then outputs the changes for each, preserving all existing properties.

---

**Example 4: Build a project note template**

User: "Create a frontmatter template for all my project notes."

Output:
```yaml
---
title: Project Name
date: YYYY-MM-DD
status: planning
priority: medium
tags:
  - project
  - status/planning
stakeholders:
  - "[[Person Name]]"
due_date: YYYY-MM-DD
---
```

---

**Example 5: Add tags to an existing note without touching the body**

User: "Add tags 'area/work' and 'type/reference' to this note."

1. Read the current frontmatter
2. Append the two tags to the existing `tags` list (or create the `tags` field if absent)
3. Output only the updated frontmatter block (not the full note) to minimize context
