---
name: excalidraw-diagram
description: This skill should be used when the user needs to create a diagram using Excalidraw — a hand-drawn style whiteboard tool. Use when the user wants a sketch-style architecture diagram, system design, concept map, user flow, or any visual that benefits from the informal, freehand aesthetic of Excalidraw. Outputs an embedded Excalidraw file ready for use in Obsidian or standalone.
license: MIT
---

## Purpose

This skill creates diagrams using the Excalidraw format — a JSON-based drawing format rendered by the Excalidraw library and its integrations. The output has a distinctive hand-drawn, whiteboard aesthetic that is ideal for architecture sketches, concept maps, brainstorming visuals, and informal system diagrams.

Unlike Mermaid which produces precise, flow-based diagrams from DSL text, Excalidraw uses geometric primitives (rectangles, ellipses, arrows, text, lines) laid out on a freeform canvas. The hand-drawn style makes it suitable for early-stage thinking, workshop facilitation, and documentation where the informal look communicates "this is a sketch, not a specification."

In Obsidian, Excalidraw files are supported via the **Excalidraw plugin** by Zsolt Viczian, which renders `.excalidraw` files natively and allows embedding them in notes.

## When to Use

Invoke this skill when:

- The user explicitly asks for an Excalidraw diagram
- The user wants a "sketch-style" or "whiteboard" diagram
- The user says "draw this informally" or "make it look hand-drawn"
- The user needs a system architecture or C4-style diagram with an informal aesthetic
- The user wants a concept map or mind map with free positioning (not the rigid Mermaid mindmap syntax)
- The user is working in Obsidian and wants to embed a whiteboard-style drawing
- The user wants a diagram exported as `.excalidraw` file or embedded in a Markdown note

Do NOT use this skill when:

- The user wants precise, structured flowcharts with clear graph routing — use `mermaid-diagram` instead
- The user wants a structured knowledge graph layout in Obsidian — use `obsidian-canvas` instead
- The user asks for a "professional" or "polished" diagram (Excalidraw's hand-drawn look is intentionally informal)
- The user wants to embed code blocks or data-driven diagrams

## Excalidraw Output Formats

| Format | Use Case |
|--------|---------|
| Obsidian embed (`.md` with JSON) | Embedded in an Obsidian note, edited with the Excalidraw plugin |
| Standalone `.excalidraw` file | Opened directly in Excalidraw app or excalidraw.com |
| Animated SVG | Excalidraw plugin "export animated" feature — for presentations |

## Diagram Types

### Systems architecture

Boxes representing services/components connected with labeled arrows. Uses color to group related components (e.g., blue for frontend, green for backend, orange for external).

### Concept map / mind map

Central concept with radiating branches. Each branch is a related idea. Uses curved arrows and freeform text nodes.

### User flow / journey

Horizontal swim lanes for actors. Steps flow left to right. Decision points use diamond shapes.

### C4-style sketch

Four levels: System Context → Container → Component → Code. Each level drawn as nested boxes with arrows for interactions.

### Sequence sketch

Actors as columns, time flowing downward. Message arrows between columns with labels.

## Workflow

### Step 1: Identify the Diagram Type and Content

From the user's request, determine:

1. **Diagram type** from the list above
2. **Main components** — the nodes/entities in the diagram
3. **Relationships** — how components connect (and the labels on connections)
4. **Layout preference** — horizontal flow, vertical hierarchy, radial, or freeform

If the user's request is vague ("draw our system"), ask one clarifying question:
- "What are the main components to include?"
- "Should this be a sketch of the overall architecture, or a sequence of interactions?"

### Step 2: Design the Layout

Plan the component positions before writing the Excalidraw JSON:

- **Architecture diagrams**: Group related components into clusters. Place external systems at the edges. Group by layer (frontend → backend → data → external).
- **Concept maps**: Place the central concept in the middle. Branch outward with related concepts at a radius of 200-300 units.
- **User flows**: Use horizontal layout. Actors as column headers at the top. Steps flow left to right.
- **C4 sketches**: Use nested rectangles. Outer box = system, inner boxes = containers, innermost = components.

Color guidelines:
- Blue (`#1971c2` / fill `#d0ebff`) — user-facing or frontend components
- Green (`#2f9e44` / fill `#d3f9d8`) — backend or processing components
- Orange (`#e8590c` / fill `#ffe8cc`) — external systems or third-party services
- Purple (`#862e9c` / fill `#f3d9fa`) — data storage or databases
- Gray (`#495057` / fill `#f1f3f5`) — infrastructure or platform components

### Step 3: Generate the Excalidraw JSON

Excalidraw diagrams are JSON objects with an `elements` array. Each element is a shape with position, size, style, and content properties.

**Element schema:**
```json
{
  "type": "rectangle",
  "id": "unique-id",
  "x": 100,
  "y": 200,
  "width": 160,
  "height": 80,
  "strokeColor": "#1971c2",
  "backgroundColor": "#d0ebff",
  "fillStyle": "hachure",
  "strokeWidth": 2,
  "roughness": 1,
  "opacity": 100,
  "text": "Component Name",
  "fontSize": 16,
  "fontFamily": 1,
  "textAlign": "center",
  "verticalAlign": "middle"
}
```

**Shape types:**
- `rectangle` — boxes for components and systems
- `ellipse` — circles/ovals for actors or rounded shapes
- `diamond` — decision points
- `arrow` — directed connections between components
- `line` — undirected connections
- `text` — standalone labels

**Arrow element:**
```json
{
  "type": "arrow",
  "id": "arrow-1",
  "x": 260,
  "y": 240,
  "width": 140,
  "height": 0,
  "points": [[0, 0], [140, 0]],
  "startBinding": {"elementId": "source-id", "gap": 5, "focus": 0},
  "endBinding": {"elementId": "target-id", "gap": 5, "focus": 0},
  "strokeColor": "#343a40",
  "strokeWidth": 2,
  "roughness": 1
}
```

**Full Excalidraw file structure:**
```json
{
  "type": "excalidraw",
  "version": 2,
  "source": "https://excalidraw.com",
  "elements": [...],
  "appState": {
    "gridSize": null,
    "viewBackgroundColor": "#ffffff"
  }
}
```

### Step 4: Output the Diagram

**For standalone `.excalidraw` file output:**
Output the complete JSON block in a fenced code block labeled `json`. Instruct the user to save it as `DiagramName.excalidraw`.

**For Obsidian embed:**
Wrap the JSON in an Obsidian Excalidraw note format — a Markdown file with an `excalidraw-plugin: parsed` frontmatter and the JSON embedded in a code fence:

````markdown
---
excalidraw-plugin: parsed
tags:
  - excalidraw
---

```json
{
  "type": "excalidraw",
  ...
}
```
````

Save as `DiagramName.excalidraw.md` in the vault. Embed in any note with `![[DiagramName.excalidraw.md]]`.

**For animated SVG:**
Note that animated export requires the Obsidian Excalidraw plugin's export command — it cannot be generated as pure JSON. Guide the user through: Design view → ⋮ menu → Export as animated SVG.

### Step 5: Provide Rendering Instructions

After the output, explain how to use it:

- **Obsidian**: Install the Excalidraw plugin by Zsolt Viczian. Save the file with `.excalidraw.md` extension. Open in Obsidian to see the rendered diagram. Embed with `![[filename.excalidraw.md]]`.
- **Excalidraw.com**: Go to [excalidraw.com](https://excalidraw.com) → ☰ Open → paste JSON.
- **VS Code**: Install the "Excalidraw" VS Code extension to render `.excalidraw` files.

## Design Principles

**Clarity over complexity:**
- Limit to 10-15 elements per diagram. Larger diagrams should be split.
- Every arrow must have a label if the relationship is not obvious.
- Avoid crossing arrows where possible — reroute elements to minimize crossings.

**Grouping by color:**
- Use the color scheme consistently: blue = frontend, green = backend, orange = external.
- Add a legend box at the bottom right when using 3+ colors.

**Typography:**
- Use `fontFamily: 1` (the hand-drawn font) for titles and labels.
- Keep label text short: 3-5 words maximum per element.
- Use ALL_CAPS or Title Case for component names, sentence case for descriptions.

**Spacing:**
- Maintain at least 40px gap between elements to prevent crowding.
- Grid spacing of 20px keeps elements visually aligned without rigid structure.
- Arrow labels should be positioned midpoint between source and target.

## Critical Rules

**NEVER:**
- Output partial JSON that is not valid Excalidraw format
- Use element IDs that are duplicated — every ID must be unique
- Reference an element in a binding that does not exist in the elements array
- Include CJK characters, non-ASCII text, or language-specific content in labels
- Use more than 20 elements without suggesting the diagram be split
- Output a Mermaid block when the user asked for Excalidraw

**ALWAYS:**
- Use the `roughness: 1` property for the hand-drawn aesthetic
- Assign unique, descriptive IDs (e.g., `frontend-ui`, `api-gateway`, `user-db`)
- Include a label on every arrow
- Output valid JSON that can be pasted directly into Excalidraw or saved as a file
- Note which Obsidian plugin is required (Excalidraw by Zsolt Viczian)

## Example Usage

**Example 1: Three-tier web architecture**

User: "Draw a simple three-tier web architecture: browser, API server, and database."

Produces: An Excalidraw JSON with three boxes (Browser in blue, API Server in green, Database in purple) connected by two labeled arrows (HTTP Request/Response, SQL Query/Result). Grid layout, left to right.

---

**Example 2: Concept map for product strategy**

User: "Create a concept map where Product Strategy is the center, connected to: Vision, ICP, Positioning, Pricing, GTM, and Roadmap."

Produces: A radial layout with "Product Strategy" as a central ellipse and six boxes arranged around it, each connected with an arrow. Consistent spacing (~250px radius), short labels.

---

**Example 3: User registration flow**

User: "Sketch a user registration flow: User fills form → Validate email → Check if email exists → (Yes) Show error → (No) Hash password → Save to DB → Send confirmation."

Produces: A left-to-right flowchart with rectangles for process steps, a diamond for the decision point, two branches (Yes to error box, No continuing the flow), and end at "Send confirmation."

---

**Example 4: C4 Context diagram**

User: "Draw a C4 context diagram for our SaaS application. Users interact with our Web App. The Web App calls our Payment Provider and sends emails via our Email Service."

Produces: A C4-style sketch with User as a person icon (ellipse), Web App as the central rectangle, and two external system boxes (Payment Provider, Email Service) at the right edge. Labeled arrows for each interaction.

---

**Example 5: Team structure org chart**

User: "Quick org chart sketch: CPO at top, under CPO are PM Lead and Design Lead, under PM Lead are three PMs, under Design Lead are two Designers."

Produces: A top-down tree with seven total boxes, connected by hierarchical lines, using gray for the org structure coloring and clear label names.
