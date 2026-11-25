# 🔗 obsidian-links

> Create, validate, repair, and analyze wikilinks in Obsidian vaults. Builds knowledge graphs through intentional bidirectional linking.

## Metadata

| Field     | Value                                              |
|-----------|----------------------------------------------------|
| Version   | 1.0.0                                              |
| Author    | Eric Andrade                                       |
| Created   | 2026-04-03                                         |
| Updated   | 2026-04-03                                         |
| Platforms | All 8                                              |
| Category  | Obsidian / Knowledge Management                    |
| Tags      | obsidian, wikilinks, knowledge-graph, backlinks, MOC |
| Risk      | Low                                                |

## Overview

`obsidian-links` manages the core linking primitive of Obsidian — `[[wikilinks]]` — as an information architecture task rather than a formatting task. Every link represents a relationship between ideas, and this skill ensures those relationships are intentional, bidirectional where appropriate, and always resolvable to a real note.

## Features

- **Link creation** — Insert wikilinks into existing notes with correct syntax
- **Broken link detection** — Find links that point to non-existent notes or invalid block IDs
- **Orphaned note discovery** — Identify notes with no incoming links
- **Auto-linking** — Convert plain text mentions to wikilinks
- **Map of Content (MOC) builder** — Aggregate related notes into organized index notes
- **Bidirectional link guidance** — Suggest reverse links for significant relationships
- **Block ID linking** — Create and validate links to specific blocks (`^block-id`)

## Quick Start / Triggers

This skill activates when you use phrases like:

- "Add wikilinks to this note"
- "Find broken links in my vault"
- "Which notes are orphaned?"
- "Link the Strategy note to the OKR Tracker"
- "Build a MOC for all my product notes"
- "Convert mentions to wikilinks"
- "Check backlinks for this note"

## Requirements

- An Obsidian vault (folder of `.md` files)
- Vault path accessible by the AI tool
- Optional: Obsidian open for live preview (not required for link creation/validation)

## Wikilink Syntax Quick Reference

| Syntax | Meaning |
|--------|---------|
| `[[Note Name]]` | Link to note |
| `[[Note Name\|Display Text]]` | Link with custom text |
| `[[Note Name#Heading]]` | Link to a heading |
| `[[Note Name#^blockid]]` | Link to a block |
| `![[Note Name]]` | Embed full note |
| `![[Note Name#Heading]]` | Embed a section |

## Examples

| Task | Example |
|------|---------|
| Add links to meeting notes | "Add wikilinks to the people and projects in this meeting note" |
| Validate links | "Check Research hub.md for broken links" |
| Find orphans | "Which notes in my vault have no incoming links?" |
| Connect two notes | "Link the Product Strategy note to the OKR Tracker" |
| Build MOC | "Create a MOC for all my notes about product management" |
| Auto-link | "Convert all mentions of 'Deep Work' to wikilinks in this note" |
