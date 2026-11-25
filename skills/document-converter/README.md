# document-converter

Convert documents between formats and perform PDF operations using local, free, offline tools. No API key, no cost, no internet required.

## Metadata

| Field | Value |
|-------|-------|
| Version | 1.0.0 |
| Author | Eric Andrade |
| Created | 2026-03-22 |
| Updated | 2026-03-22 |
| Platforms | GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, AdaL CLI |
| Category | content |
| Tags | document-conversion, pdf, office, libreoffice, ocr, ghostscript, pdftk, imagemagick, tesseract |
| Risk | safe |

## What It Does

Orchestrates document conversion and PDF operations using locally installed tools:

- **LibreOffice** — Office formats (DOCX, PPTX, XLSX, ODP, ODT) → PDF, HTML
- **Ghostscript** — PDF merge, split, compress, image export
- **pdftk** — PDF merge, split, rotate, encrypt, decrypt (preferred over ghostscript)
- **Tesseract** — OCR: extract searchable text from scanned PDFs or images
- **ImageMagick** — PDF ↔ images (PNG, JPG, TIFF, WebP)

## Supported Operations

| Operation | Tool |
|-----------|------|
| DOCX / PPTX / XLSX → PDF | LibreOffice |
| Office → HTML | LibreOffice |
| PDF → PNG / JPG / TIFF | ImageMagick |
| Images → PDF | ImageMagick |
| Merge multiple PDFs | pdftk / ghostscript |
| Split PDF by page range | pdftk / ghostscript |
| Rotate PDF pages | pdftk |
| Encrypt / Decrypt PDF | pdftk |
| OCR scanned documents | Tesseract |

## Installation (tools required)

| Tool | macOS | Linux | Windows |
|------|-------|-------|---------|
| LibreOffice | `brew install --cask libreoffice` | `sudo apt install libreoffice` | `winget install TheDocumentFoundation.LibreOffice` |
| Ghostscript | `brew install ghostscript` | `sudo apt install ghostscript` | `winget install ArtifexSoftware.GhostScript` |
| pdftk | `brew install pdftk-java` | `sudo apt install pdftk` | `winget install PDFTechnologies.PDFtk` |
| Tesseract | `brew install tesseract` | `sudo apt install tesseract-ocr` | `winget install UB-Mannheim.TesseractOCR` |
| ImageMagick | `brew install imagemagick` | `sudo apt install imagemagick` | `winget install ImageMagick.ImageMagick` |

## Related Skills

- [`docling-converter`](../docling-converter/README.md) — structured Markdown/JSON extraction from PDFs
- [`pptx-translator`](../pptx-translator/README.md) — translate PowerPoint files between languages
