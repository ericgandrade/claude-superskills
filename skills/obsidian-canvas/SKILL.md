---
name: obsidian-canvas
description: This skill should be used when the user needs to create or edit an Obsidian Canvas — a freeform visual workspace that arranges notes, cards, links, images, and web content on an infinite canvas. Use when the user wants to map ideas spatially, build a knowledge dashboard, sketch a concept cluster, or create a visual workspace linking multiple Obsidian notes.
license: MIT
---

## Purpose

This skill creates and edits Obsidian Canvas files (`.canvas`) — a native Obsidian feature that provides an infinite, freeform visual workspace. Canvas is fundamentally different from both Mermaid diagrams (structured graph DSL) and Excalidraw (hand-drawn sketches): it is a spatial navigation interface for your vault, where notes become draggable cards that preserve their full content and linking behavior.

On a Canvas, you can place:
- **Note cards** — live views of existing `.md` files in the vault
- **Text cards** — free-floating rich text blocks
- **File cards** — images, PDFs, and other vault files displayed inline
- **Web cards** — embedded iframes showing external URLs
- **Groups** — colored bounding boxes that cluster related cards

Canvas files are JSON with `.canvas` extension. They are rendered natively by Obsidian with no plugins required (available since Obsidian 1.1.0).

## When to Use

Invoke this skill when:

- The user says "create a canvas" or "open canvas" in Obsidian
- The user wants a visual workspace to see multiple notes side by side
- The user wants to map relationships between notes spatially (rather than through links)
- The user needs a "dashboard" view of their projects, goals, or areas of life
- The user wants to plan a project by arranging note cards around a central concept
- The user wants to brainstorm on an infinite canvas, creating text cards for each idea
- The user is doing a research deep-dive and wants to lay out sources visually
- The user mentions "spatial thinking", "concept cluster", "visual map of notes"

Do NOT use this skill when:

- The user wants a hand-drawn sketch whiteboard — use `excalidraw-diagram` instead
- The user wants a structured flowchart or graph — use `mermaid-diagram` instead
- The user wants to add wikilinks inside note content — use `obsidian-links` instead
- The user is on Obsidian version earlier than 1.1.0 (Canvas is not available)

## Canvas File Format

Canvas files are JSON with the extension `.canvas`. Structure:

```json
{
  "nodes": [
    {
      "id": "node-1",
      "type": "text",
      "x": -200,
      "y": -100,
      "width": 250,
      "height": 100,
      "text": "Card content here"
    },
    {
      "id": "node-2",
      "type": "file",
      "file": "Projects/Project Alpha.md",
      "x": 100,
      "y": -100,
      "width": 300,
      "height": 200
    },
    {
      "id": "group-1",
      "type": "group",
      "x": -250,
      "y": -150,
      "width": 600,
      "height": 300,
      "label": "Group Label",
      "color": "1"
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "fromNode": "node-1",
      "fromSide": "right",
      "toNode": "node-2",
      "toSide": "left",
      "label": "Connection label"
    }
  ]
}
```

## Node Types

| Type | Description | Required Fields |
|------|-------------|----------------|
| `text` | Floating rich text (Markdown) | `text`, `x`, `y`, `width`, `height` |
| `file` | Embedded vault note or file | `file` (vault-relative path), `x`, `y`, `width`, `height` |
| `link` | Embedded webpage iframe | `url`, `x`, `y`, `width`, `height` |
| `group` | Colored grouping box | `x`, `y`, `width`, `height`, `label` (optional), `color` (optional) |

## Edge Configuration

Edges connect any two nodes with a labeled arrow:

```json
{
  "id": "edge-1",
  "fromNode": "source-node-id",
  "fromSide": "bottom",
  "toNode": "target-node-id",
  "toSide": "top",
  "label": "Arrow label",
  "color": "4",
  "fromEnd": "none",
  "toEnd": "arrow"
}
```

**Side values:** `top`, `bottom`, `left`, `right`  
**End values:** `none` (no arrowhead), `arrow` (filled triangle)  
**Colors:** `1` red, `2` orange, `3` yellow, `4` green, `5` cyan, `6` purple — or `"#hex"` for custom

## Color System

Obsidian Canvas uses a named color palette for nodes and edges:

| Code | Color Name | Typical Use |
|------|-----------|------------|
| `"1"` | Red | Urgent / critical items |
| `"2"` | Orange | In-progress / active |
| `"3"` | Yellow | Ideas / to-review |
| `"4"` | Green | Done / approved |
| `"5"` | Cyan | Reference / resources |
| `"6"` | Purple | Personal / goals |

## Layout Patterns

### Hub-and-Spoke

Central concept node surrounded by related notes:
- Central text card at `(0, 0)` with larger dimensions (300×150)
- Related cards at radius ~400 in all directions
- Arrows from center outward

Use for: topic MOC, project overview, concept exploration

### Column Layout

Multiple vertical columns, each representing a category or status:
- Column spacing: 350–400px
- Cards stacked vertically in each column with 20–30px gaps
- Group boxes around each column with color-coded labels

Use for: Kanban boards, area-of-life dashboards, comparison views

### Linear Flow

Cards arranged left to right or top to bottom with arrows:
- Horizontal: 350px between cards, all cards at same Y
- Vertical: 250px between cards, all cards at same X
- Edges connect each card to the next in sequence

Use for: project roadmaps, process documentation, sequential thinking

### Nested Clusters

Groups of cards inside larger group boxes:
- Use `group` nodes to visually bound clusters
- Offset child nodes by ~30px inside group boundaries
- Overlap allowed — groups are visual aids, not containers with collision

Use for: multi-project dashboards, domain + subdomain mapping

## Workflow

### Step 0: Discover Vault Context

1. Ask for the vault path if not known
2. If the canvas references existing notes, verify the filenames:
   ```bash
   find <vault-root> -name "*.md" | grep -i "<search-term>"
   ```
3. Identify existing canvas files to avoid name conflicts:
   ```bash
   find <vault-root> -name "*.canvas"
   ```

### Step 1: Understand the Canvas Goal

Classify the user's intent:

| User goal | Layout pattern |
|-----------|---------------|
| "Overview of all my projects" | Column or hub-and-spoke |
| "Visual workspace for this research topic" | Hub-and-spoke or freeform |
| "Map out the relationships between these concepts" | Hub-and-spoke with edges |
| "Brainstorm dashboard" | Column layout with text cards |
| "See my notes on X side by side" | Grid layout with file cards |
| "Project planning board" | Column layout (Kanban-style) |

### Step 2: Plan the Canvas

Before writing JSON, plan the positions:
1. Choose the layout pattern
2. List all nodes (type, label/file, dimensions)
3. Plan groupings (which nodes cluster together?)
4. Define edges (which nodes connect, in what direction, with what label?)
5. Assign coordinate positions

Standard card dimensions:
- Text card (small): 200×100
- Text card (medium): 300×150
- File note card: 350×250 (shows note preview)
- Wide banner card: 500×80
- Group box: sized to contain its children with 30–40px padding

### Step 3: Generate the Canvas JSON

Write the complete `.canvas` JSON file. Ensure:
- All node IDs are unique across nodes and edges
- All `file` references use vault-relative paths (no leading `/`)
- All edge `fromNode` and `toNode` values reference existing node IDs
- Groups do not need to explicitly list their children — position and size define membership visually

### Step 4: Output and Save Instructions

Output the complete JSON in a fenced code block. Then instruct the user to:

1. Save the file as `<Name>.canvas` in the Obsidian vault
2. Open in Obsidian — it renders automatically with no plugins
3. To edit: open the canvas and drag cards to reposition; click to edit text cards
4. To add more notes: drag `.md` files from the file explorer onto the canvas

## Critical Rules

**NEVER:**
- Reference a `file` path that does not exist in the vault without noting it as a placeholder
- Use duplicate `id` values — all node and edge IDs must be unique
- Reference an edge `fromNode` or `toNode` that is not in the nodes array
- Default to Excalidraw or Mermaid when the user explicitly says "canvas"
- Include non-canvas formatting instructions in the canvas JSON

**ALWAYS:**
- Output complete, valid JSON that can be saved directly as `.canvas`
- Use vault-relative paths for `file` nodes (no absolute paths)
- Assign meaningful IDs (e.g., `project-alpha-card`, `inbox-group`)
- Include at least one edge if the canvas has conceptual relationships between nodes
- Suggest an appropriate filename for the canvas (e.g., `Project Dashboard.canvas`)

## Example Usage

**Example 1: Project dashboard with three columns**

User: "Create a canvas dashboard showing my three active projects: Project Alpha, Initiative X, and Research Sprint, each as a file card in their own column."

Output: Canvas JSON with three file cards, one group per column with a label, and consistent vertical alignment. Filename suggestion: `Active Projects Dashboard.canvas`.

---

**Example 2: Hub-and-spoke concept map**

User: "Create a canvas with 'Product Strategy' at the center, linked to six surrounding note cards: Vision, ICP, Positioning, Pricing, GTM, and Roadmap."

Output: Canvas JSON with a central text card for Product Strategy, six file cards placed around it at consistent angles, and six arrows pointing outward from center. Color-coded edges by theme.

---

**Example 3: Brainstorming canvas**

User: "Create a blank brainstorming canvas for our Q3 planning session with four groups: Now, Next, Later, and Ideas. Add a title card at the top."

Output: Canvas JSON with one wide text card at the top as title, and four color-coded group boxes arranged in a 2×2 grid below. Groups are empty — ready for cards to be dropped in during the session.

---

**Example 4: Research deep-dive workspace**

User: "Build a canvas for my deep research on remote work trends. Place the main note 'Remote Work Research.md' at center, and add empty text cards around it for: Key Statistics, Opposing Views, Supporting Evidence, Open Questions."

Output: Canvas JSON with the central file card and four surrounding text cards with placeholder content and labeled headings. Edges pointing from the central card to each surrounding card.

---

**Example 5: Obsidian canvas Kanban board**

User: "Create a Kanban canvas with four status columns: Backlog, In Progress, Review, Done. Add three card placeholders in Backlog."

Output: Canvas JSON with four vertical group columns, three text cards in the Backlog column with placeholder task text, and appropriate color coding (gray for Backlog, orange for In Progress, yellow for Review, green for Done).
