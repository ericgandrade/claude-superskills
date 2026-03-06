# docling-converter

Convert complex documents into structured outputs (Markdown, JSON, HTML) using Docling with optional OCR and table extraction.

## When to use

- Convert PDFs, DOCX, PPTX, XLSX, images, or HTML into Markdown.
- Extract text from scanned files with OCR.
- Run repeatable batch conversion workflows.
- Preserve document structure for downstream AI/RAG pipelines.

## What is included

- `SKILL.md` — Main workflow and usage patterns with format detection and fallback strategies
- `references/api_reference.md` — Additional API details and configuration options
- `scripts/batch_converter.py` — Batch conversion helper for directories
- `scripts/extract_with_ocr.py` — OCR-oriented conversion helper for scanned files
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical invocation

- "Use `docling-converter` to convert `proposal.pdf` to Markdown."
- "Use `docling-converter` with OCR for `scanned-contract.pdf`."
- "Use `docling-converter` to batch-convert files in `./docs`."
- "Convert this PowerPoint to Markdown preserving the structure."

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Format Detection → Docling Processing → Structure Extraction → Output Generation) displayed during execution
- **Error Handling** — Handles missing Docling installation, unsupported formats, OCR failures, and corrupt files with clear recovery steps
- **EVals** — `evals/evals.json` with 3 realistic test cases; `evals/trigger-eval.json` with 20 queries (10 trigger / 10 no-trigger) for description optimization
- **Standardized description** — SKILL.md description updated to Anthropic skill-creator format
- **All 8 platforms** — Now supported on all 8 AI CLI platforms

---

## Metadata

| Field | Value |
|-------|-------|
| Version | 2.0.0 |
| Author | Eric Andrade |
| Created | 2025-02-01 |
| Updated | 2026-03-06 |
| Platforms | GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, AdaL CLI |
| Category | content |
| Tags | document-conversion, markdown, json, pdf, docling, ocr |
| Risk | safe |
