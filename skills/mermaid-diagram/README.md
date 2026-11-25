# 📊 mermaid-diagram

> Generate any Mermaid diagram from a plain-language description — flowcharts, sequence diagrams, class diagrams, state machines, mindmaps, Gantt charts, and more.

## Metadata

| Field     | Value                                              |
|-----------|----------------------------------------------------|
| Version   | 1.0.0                                              |
| Author    | Eric Andrade                                       |
| Created   | 2026-04-03                                         |
| Updated   | 2026-04-03                                         |
| Platforms | All 8                                              |
| Category  | Content / Visualization                            |
| Tags      | mermaid, diagram, flowchart, sequence, visualization, obsidian |
| Risk      | Low                                                |

## Overview

`mermaid-diagram` translates a description — written in plain English — into syntactically correct Mermaid DSL wrapped in a fenced code block. The output renders natively in Obsidian, GitHub, GitLab, Notion, and any Markdown environment with Mermaid support.

Supports 12 diagram types including flowcharts, sequence diagrams, state machines, ER diagrams, mindmaps, and Gantt charts.

## Features

- **12 diagram types** — flowchart, sequence, class, state, ER, mindmap, Gantt, pie, quadrant, git graph, timeline, XY chart
- **Syntax validation** — mentally checks node ID references, subgraph closures, and arrow compatibility
- **Smart type selection** — picks the most appropriate diagram type for the request
- **Obsidian-native output** — uses the `mermaid` fence, which renders without plugins in Obsidian
- **Subgraph grouping** — automatically suggests grouping for diagrams with 8+ nodes

## Quick Start / Triggers

This skill activates when you use phrases like:

- "Draw a flowchart for..."
- "Sequence diagram showing..."
- "Create a class diagram for..."
- "State machine for..."
- "Mindmap of..."
- "Gantt chart for the project timeline"
- "Mermaid diagram of..."
- "ER diagram for the database schema"

## Requirements

No tools or installation required. Mermaid is supported natively in:

- **Obsidian** — built-in, no plugin needed
- **GitHub / GitLab** — renders in `.md` files
- **VS Code** — requires "Mermaid Preview" extension
- **Browser** — use [mermaid.live](https://mermaid.live)

## Diagram Types

| Type | Best For |
|------|---------|
| `flowchart TD` | Step-by-step processes, decision trees |
| `sequenceDiagram` | Actor interactions over time |
| `classDiagram` | Object models, data schemas |
| `stateDiagram-v2` | State machines, lifecycle flows |
| `erDiagram` | Database schemas, data models |
| `mindmap` | Topic hierarchies, brainstorms |
| `gantt` | Project timelines, sprint planning |
| `pie` | Proportional data |
| `quadrantChart` | 2x2 priority matrices |
| `gitGraph` | Branch and merge history |
| `timeline` | Chronological events |
| `xychart-beta` | Bar and line charts |

## Examples

| Request | Diagram Type |
|---------|-------------|
| "Draw the login flow" | `flowchart TD` |
| "Show how the API handles requests" | `sequenceDiagram` |
| "Model a blog with users and posts" | `classDiagram` |
| "What states does an order go through?" | `stateDiagram-v2` |
| "ER diagram for a CRM database" | `erDiagram` |
| "Mindmap for product roadmap themes" | `mindmap` |
| "Project timeline for Q2" | `gantt` |
