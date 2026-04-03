# 📝 obsidian-markdown

> Create and edit Obsidian Flavored Markdown notes with wikilinks, embeds, callouts, properties, block IDs, and all Obsidian-specific syntax extensions.

## Metadata

| Field | Value |
|-------|-------|
| Version | 1.0.0 |
| Author | Eric Andrade |
| Created | 2026-04-03 |
| Updated | 2026-04-03 |
| Platforms | All 8 |
| Category | Obsidian |
| Tags | obsidian, markdown, wikilinks, callouts, frontmatter, embeds, vault |
| Risk | Low |

## Overview

**obsidian-markdown** teaches agents the complete Obsidian Flavored Markdown specification — the syntax extensions Obsidian adds on top of standard Markdown. Without this skill, agents generate plain Markdown that looks correct in a text editor but breaks Obsidian's linking, graph, and embedding features.

This is the **foundation skill** for all Obsidian vault work. Other skills (`obsidian-links`, `obsidian-frontmatter`, `obsidian-note-builder`) build on the syntax defined here.

## Features

- Complete wikilink syntax: `[[Note]]`, `[[Note|Text]]`, `[[Note#Heading]]`, `[[Note#^block-id]]`
- Embed syntax for notes, images, PDFs, and sections: `![[embed]]`
- Callout blocks with 14+ types, custom titles, and collapsible state
- Frontmatter properties with YAML formatting rules
- Inline tags and nested tag hierarchies
- Block ID definition and linking for sub-note precision
- Obsidian-specific formatting: `==highlight==`, LaTeX math
- Mermaid diagram integration with vault link support
- Markdown comments hidden in reading view: `%%comment%%`
- Footnotes (standard and inline)

## Quick Start

### Triggers

```bash
# Create notes
"Create an Obsidian note for my meeting with Sarah about Q3"
"Write a new note about event sourcing for my Obsidian vault"
"Make a daily note for today with proper Obsidian frontmatter"

# Links and embeds
"Add a wikilink to [[Project Alpha]] in this note"
"Embed the risks section from [[Risk Register]] into this note"
"Link to the specific block ^decision-001 in the decision log"

# Callouts
"Add a warning callout before this section"
"Create a collapsible tip callout with installation steps"

# Properties and tags
"Add frontmatter to this note with tags: meeting, q3, product"
"Set the type property to 'meeting' and add aliases"
"Add an inline tag #project/alpha to this paragraph"
```

## Requirements

No external dependencies. Works in any Obsidian vault with no plugins required.

The full syntax covered by this skill is part of Obsidian core and does not require:
- Dataview
- Templater
- Any community plugins

## Examples

| Request | What it produces |
|---------|-----------------|
| "Create a meeting note" | Note with frontmatter, type, tags, wikilinks to attendees, task items |
| "Embed the summary section from another note" | `![[Other Note#Summary]]` embed block |
| "Add a warning callout" | `> [!warning]` block with title and content |
| "Make this paragraph linkable from other notes" | Paragraph with `^block-id` appended |
| "Link to the decisions heading in [[Decision Log]]" | `[[Decision Log#Decisions]]` wikilink |
