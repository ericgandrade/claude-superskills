# 🏗️ obsidian-note-builder

> Build complete, knowledge-graph-ready Obsidian notes from raw content. Extracts entities, inserts wikilinks, applies the right note template, and integrates with your vault's structure.

## Metadata

| Field     | Value                                              |
|-----------|----------------------------------------------------|
| Version   | 1.0.0                                              |
| Author    | Eric Andrade                                       |
| Created   | 2026-04-03                                         |
| Updated   | 2026-04-03                                         |
| Platforms | All 8                                              |
| Category  | Obsidian / Knowledge Management                    |
| Tags      | obsidian, note-building, zettelkasten, knowledge-graph, entity-extraction |
| Risk      | Low                                                |

## Overview

`obsidian-note-builder` creates complete Obsidian notes from raw input (brain dumps, meeting summaries, book highlights, article excerpts). It analyzes content to extract entities, converts them to wikilinks, selects and applies the correct note template, and structures the result so it integrates immediately into the vault's knowledge graph.

## Features

- **Entity extraction** — Identifies people, projects, concepts, tools, and documents to link
- **Auto-wikilinks** — Converts extracted entities to `[[wikilinks]]` on first mention
- **Note type selection** — Atomic concept, meeting note, reference, project note
- **Zettelkasten atomicity** — Splits multi-concept input into separate atomic notes
- **Template application** — Applies the right frontmatter and body structure per note type
- **Graph integration** — Identifies which existing notes should link back to the new note
- **Follow-up suggestions** — Lists new notes to create for referenced-but-missing entities

## Quick Start / Triggers

This skill activates when you use phrases like:

- "Turn this brain dump into an Obsidian note"
- "Create a meeting note for today's session"
- "Build a reference note for this book"
- "Add this to my vault as a concept note"
- "Extract entities and create notes"
- "Import this article into my vault"
- "Split this large note into atomic notes"

## Note Types

| Type | Best For |
|------|---------|
| Atomic Concept | One clear idea — Zettelkasten style |
| Meeting Note | Structured meeting with attendees, decisions, actions |
| Reference Note | Book, article, resource with key takeaways |
| Project Note | Project overview with status, stakeholders, actions |

## Requirements

- An Obsidian vault (for entity lookup and tag convention detection)
- No special plugins required for note creation
- Optional: Dataview plugin for querying the notes afterward

## Examples

| Input | Output |
|-------|--------|
| Brain dump about a concept | Atomic note with frontmatter, entities linked, related notes section |
| Meeting transcript | Meeting note with attendees, decisions, actions, wikilinks |
| Book highlights | Reference note with key takeaways, author linked, concepts flagged |
| Project description | Project note with status, stakeholders, next actions |
| Large sprawling note | Split into atomic notes + parent MOC linking them all |
