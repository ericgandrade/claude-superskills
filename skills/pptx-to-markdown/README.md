# pptx-to-markdown

Convert PowerPoint presentations into rich, structured Markdown using a 4-pass deep analysis pipeline: text extraction (python-pptx), slide rendering (pptx2png), and dual AI vision passes for explicit and implicit visual content.

## When to use

- Convert `.pptx` files to `.md` for documentation, knowledge bases, or LLM pipelines
- Extract insights from charts, timelines, diagrams, and visual content
- Generate comprehensive text summaries of presentations without losing visual context
- Prepare presentation slides for RAG or downstream AI processing

## What is included

- `SKILL.md` — Full 7-step workflow with progress gauges, error handling, and eval gates
- `README.md` — This documentation file

## Pipeline overview

```
.pptx
  │
  ├── Step 1: python-pptx ──────────► text_pass.json
  │                                   (titles, bullets, notes, tables)
  │
  ├── Step 2a: pptx2png ────────────► slide_001.png … slide_NNN.png
  │                                   (2× resolution rendering)
  │
  ├── Step 2b: AI Vision (pass 1) ──► visual_explicit.json
  │                                   (WordArt, layout, icons)
  │
  ├── Step 2c: AI Vision (pass 2) ──► visual_implicit.json
  │                                   (charts, timelines, diagrams)
  │
  └── Step 3: Enrichment ───────────► <filename>.md
                                      (combined, structured output)
```

## Typical invocation

```bash
# GitHub Copilot CLI
copilot> pptx to markdown: presentation.pptx
copilot> deep read this pptx: strategy-deck.pptx
copilot> extract all content from: quarterly-review.pptx

# Claude Code
claude> convert this presentation to markdown: presentation.pptx
claude> use pptx-to-markdown on: ./decks/roadmap.pptx
```

## Output structure

The generated `.md` is saved in the same folder as the input `.pptx` and contains:

- **Header** with title, author, company, creation date, slide count
- **Table of Contents** with slide index
- **Per-slide sections** with:
  - `📝 Conteúdo Textual` — text extracted by python-pptx
  - `📊 Tabelas Estruturais` — tables preserved as Markdown tables
  - `👁️ Análise Visual` — AI-derived insights (explicit + implicit)
  - `🗣️ Notas do Apresentador` — speaker notes
- **Metadata footer** with stats

## Progress gauge

The skill prints real-time progress at two levels:

**Step-level (macro):**
```
[████████░░░░░░░░░░░░] 29% - Step 2/7: Rendering slides with pptx2png...
```

**Slide-level (micro, in-place):**
```
  slide 04/12  [████████░░░░░░░] 33%  Renderizando...
```

## Error handling

| Severity | Examples | Behaviour |
|----------|----------|-----------|
| 🔴 FATAL | pptx2png absent, PPTX not found, 0 PNGs generated | Aborts, cleans temp dir, shows fix hint |
| 🟡 WARN | Partial PNG render, empty slide, vision incomplete | Continues, marks slide `⚠️`, reports in summary |

Cleanup (`rm -rf .<stem>_tmp/`) always runs inside a `try/finally` block.

## Dependencies

All dependencies must be installed **before** running the skill. The skill will abort with a FATAL error if any are missing — no auto-install or alternative path will be attempted.

| Dependency | Required | How to install |
|------------|----------|----------------|
| `python3` | ✅ Hard | `brew install python3` / `sudo apt install python3` |
| `python-pptx` | ✅ Hard | `pip install python-pptx` |
| `pptx2png` | ✅ Hard | `pip install pptx2png` |

**Full setup (run once before first use):**
```bash
# macOS
brew install python3
pip install python-pptx pptx2png

# Ubuntu / Debian
sudo apt install python3 python3-pip
pip install python-pptx pptx2png

# Windows
# python3: https://python.org/downloads
# then:    pip install python-pptx pptx2png
```

## Metadata

| Field | Value |
|-------|-------|
| Version | 1.0.0 |
| Author | Eric Andrade |
| Created | 2026-03-04 |
| Updated | 2026-03-04 |
| Platforms | GitHub Copilot CLI, Claude Code, OpenAI Codex, Gemini CLI, Cursor IDE |
| Category | content |
| Tags | pptx, powerpoint, markdown, pptx2png, vision, document-conversion, presentation |
| Risk | safe |
