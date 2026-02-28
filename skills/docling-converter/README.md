# docling-converter

Convert complex documents into structured outputs (Markdown, JSON, HTML) using Docling with optional OCR and table extraction.

## When to use

- Convert PDFs, DOCX, PPTX, XLSX, images, or HTML into Markdown.
- Extract text from scanned files with OCR.
- Run repeatable batch conversion workflows.
- Preserve document structure for downstream AI/RAG pipelines.

## What is included

- `SKILL.md` - Main workflow and usage patterns.
- `references/api_reference.md` - Additional API details.
- `scripts/batch_converter.py` - Batch conversion helper.
- `scripts/extract_with_ocr.py` - OCR-oriented conversion helper.

## Typical invocation

- "Use `docling-converter` to convert `proposal.pdf` to Markdown."
- "Use `docling-converter` with OCR for `scanned-contract.pdf`."
- "Use `docling-converter` to batch-convert files in `./docs`."

---

## Metadata

| Field | Value |
|-------|-------|
| Version | 1.0.1 |
| Author | Eric Andrade |
| Created | 2025-02-01 |
| Updated | 2026-02-04 |
| Platforms | GitHub Copilot CLI, Claude Code, OpenAI Codex |
| Category | content |
| Tags | document-conversion, markdown, json, pdf, docling, ocr |
| Risk | safe |
