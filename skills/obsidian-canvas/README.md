# 🗺️ obsidian-canvas

> Create freeform visual workspaces in Obsidian Canvas. Arrange notes, text cards, images, and web content on an infinite canvas with hub-and-spoke, column, or Kanban layouts.

## Metadata

| Field     | Value                                              |
|-----------|----------------------------------------------------|
| Version   | 1.0.0                                              |
| Author    | Eric Andrade                                       |
| Created   | 2026-04-03                                         |
| Updated   | 2026-04-03                                         |
| Platforms | All 8                                              |
| Category  | Obsidian / Knowledge Management                    |
| Tags      | obsidian, canvas, visual-workspace, knowledge-map, dashboard |
| Risk      | Low                                                |

## Overview

`obsidian-canvas` creates and edits Obsidian Canvas files (`.canvas`) — a native freeform visual workspace where notes become spatial cards on an infinite canvas. Unlike Mermaid (structured graph DSL) or Excalidraw (hand-drawn sketches), Canvas is a spatial navigation interface for your vault: each card is a live view of an actual note, preserving all links and content.

Available natively in Obsidian since v1.1.0 — no plugins required.

## Features

- **Multiple node types** — text cards, file (note) cards, web iframes, grouping boxes
- **Layout patterns** — hub-and-spoke, column, linear flow, nested clusters
- **Color coding** — 6-color named palette + custom hex for nodes and edges
- **Edges with labels** — directional arrows connecting cards with text labels
- **Kanban boards** — column layout with status groups (Backlog, In Progress, Review, Done)
- **Dashboard builder** — visual overview of projects, goals, or research areas
- **JSON output** — complete `.canvas` file ready to save and open in Obsidian

## Quick Start / Triggers

This skill activates when you use phrases like:

- "Create a canvas in Obsidian"
- "Build a visual workspace for my projects"
- "Map my notes spatially"
- "Canvas dashboard for my areas of life"
- "Obsidian canvas Kanban board"
- "Create a hub-and-spoke canvas with these notes"
- "Build a research workspace canvas"

## Requirements

- Obsidian version 1.1.0 or later (Canvas is a built-in core feature)
- No plugins required
- Vault path accessible for referencing existing notes as file cards

## Layout Patterns

| Pattern | Best For |
|---------|---------|
| Hub-and-spoke | Topic exploration, concept maps |
| Column layout | Kanban boards, area dashboards |
| Linear flow | Project roadmaps, sequential processes |
| Nested clusters | Multi-project overviews, domain maps |

## Canvas Node Type Reference

| Type | Description |
|------|-------------|
| `text` | Rich text card (Markdown supported) |
| `file` | Live embedded view of a `.md` or other vault file |
| `link` | Embedded webpage (iframe) |
| `group` | Colored bounding box for visual clustering |

## Examples

| Request | Canvas Layout |
|---------|-------------|
| "Dashboard for my three projects" | Three file cards in column layout with group boxes |
| "Concept map for product strategy" | Hub-and-spoke with central text + 6 file cards |
| "Brainstorming workspace for Q3 planning" | Four empty groups (Now/Next/Later/Ideas) |
| "Research canvas for remote work topic" | Center note + 4 surrounding text cards |
| "Kanban board for my tasks" | 4 column groups (Backlog/In Progress/Review/Done) |
