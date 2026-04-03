# ✏️ excalidraw-diagram

> Create hand-drawn style diagrams using Excalidraw — architecture sketches, concept maps, user flows, C4 diagrams, and org charts. Outputs valid Excalidraw JSON ready for Obsidian or excalidraw.com.

## Metadata

| Field     | Value                                              |
|-----------|----------------------------------------------------|
| Version   | 1.0.0                                              |
| Author    | Eric Andrade                                       |
| Created   | 2026-04-03                                         |
| Updated   | 2026-04-03                                         |
| Platforms | All 8                                              |
| Category  | Content / Visualization                            |
| Tags      | excalidraw, diagram, whiteboard, architecture, sketch, obsidian |
| Risk      | Low                                                |

## Overview

`excalidraw-diagram` generates diagrams in the Excalidraw JSON format — a hand-drawn, whiteboard aesthetic format used for architecture sketches, concept maps, and informal system diagrams. The output can be embedded in Obsidian (via the Excalidraw plugin), opened at excalidraw.com, or rendered in VS Code.

## Features

- **Hand-drawn aesthetic** — Uses Excalidraw's `roughness: 1` for the informal sketch look
- **Multiple diagram types** — Architecture, concept map, user flow, C4 context, sequence, org chart
- **Obsidian-ready output** — Generates `.excalidraw.md` files embeddable with `![[filename]]`
- **Color coding** — Consistent color scheme (blue=frontend, green=backend, orange=external, purple=data)
- **Standalone JSON** — Valid Excalidraw format pasteable directly into excalidraw.com
- **Design principles** — Limits to 15 elements per diagram, labels on all arrows, minimum spacing

## Quick Start / Triggers

This skill activates when you use phrases like:

- "Create an Excalidraw diagram for..."
- "Draw a sketch of the system architecture"
- "Whiteboard-style diagram of..."
- "Hand-drawn concept map for..."
- "Excalidraw C4 context diagram"
- "Sketch the user registration flow"
- "Draw this informally for a workshop"

## Requirements

To render the diagram:

- **Obsidian**: Install [Excalidraw plugin](https://github.com/zsviczian/obsidian-excalidraw-plugin) by Zsolt Viczian
- **Browser**: [excalidraw.com](https://excalidraw.com) — paste JSON
- **VS Code**: Install "Excalidraw" VS Code extension

## Diagram Types

| Type | Best For |
|------|---------|
| Systems architecture | Services, components, APIs, databases |
| Concept map | Ideas radiating from a central concept |
| User flow | Step-by-step processes with decision points |
| C4 context | Person → System → External systems |
| Sequence sketch | Actors with messages flowing over time |
| Org chart | Hierarchy tree for teams or systems |

## Color Convention

| Color | Meaning |
|-------|---------|
| Blue (`#d0ebff`) | Frontend / user-facing |
| Green (`#d3f9d8`) | Backend / processing |
| Orange (`#ffe8cc`) | External systems |
| Purple (`#f3d9fa`) | Databases / storage |
| Gray (`#f1f3f5`) | Infrastructure / platform |

## Examples

| Request | Output |
|---------|--------|
| "Three-tier web architecture" | Browser → API → Database with labeled arrows |
| "Concept map for product strategy" | Radial layout with 6 concept branches |
| "User registration flow" | Left-to-right process with decision diamond |
| "C4 context for our SaaS app" | User, Web App, Payment Provider, Email Service |
| "Org chart for the product team" | Top-down tree with CPO, PM Lead, Design Lead |
