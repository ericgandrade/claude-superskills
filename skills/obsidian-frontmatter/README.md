# 🏷️ obsidian-frontmatter

> Create, validate, standardize, and repair YAML frontmatter properties in Obsidian notes. The schema layer of your knowledge base.

## Metadata

| Field     | Value                                              |
|-----------|----------------------------------------------------|
| Version   | 1.0.0                                              |
| Author    | Eric Andrade                                       |
| Created   | 2026-04-03                                         |
| Updated   | 2026-04-03                                         |
| Platforms | All 8                                              |
| Category  | Obsidian / Knowledge Management                    |
| Tags      | obsidian, frontmatter, yaml, properties, metadata, dataview |
| Risk      | Low                                                |

## Overview

`obsidian-frontmatter` manages the YAML properties block at the top of every Obsidian note. It covers the complete lifecycle: writing well-formed frontmatter the first time, enforcing consistent schema across notes, updating stale properties, and repairing YAML that causes Obsidian parse errors. Consistent frontmatter is what makes Dataview queries accurate and vault-wide searches reliable.

## Features

- **Frontmatter creation** — Generate well-formed YAML blocks for any note type
- **YAML repair** — Fix malformed frontmatter (tabs, inline lists, unquoted values)
- **Schema standardization** — Apply consistent property templates across multiple notes
- **Tag management** — Add, remove, or rename tags following Obsidian's hierarchy convention
- **Alias management** — Add alternative note names for better link suggestions
- **Type-specific templates** — Meeting, project, reference, daily note schemas
- **Dataview-compatible** — Ensures properties are queryable by the Dataview plugin

## Quick Start / Triggers

This skill activates when you use phrases like:

- "Add frontmatter to this note"
- "Update the metadata in this note"
- "Obsidian is showing a YAML error"
- "Add tags to this note"
- "Fix the properties in this file"
- "Create a frontmatter template for project notes"
- "Standardize metadata across all my meeting notes"

## Requirements

- An Obsidian vault with `.md` files
- No special plugins required (core Properties feature in Obsidian)
- Optional: Dataview plugin for querying properties

## Property Schema Reference

| Property | Type | Notes |
|---------|------|-------|
| `title` | Text | Human-readable note title |
| `date` | Date | ISO 8601 `YYYY-MM-DD` |
| `tags` | List | Multiline list, no inline format |
| `aliases` | List | Alternative names for link suggestions |
| `status` | Text | `draft`, `active`, `done`, `archived` |

## Examples

| Task | Description |
|------|-------------|
| Add metadata | "Add tags, date, and status to this meeting note" |
| Fix YAML errors | "Obsidian shows a YAML parse error on this note" |
| Standardize schema | "Apply the meeting note template to all notes in /Meetings" |
| Add tags | "Add tags area/work and type/meeting to this note" |
| Create template | "Create a frontmatter template for project notes" |
| Fix inline tags | "Convert all inline tag arrays to multiline list format" |
