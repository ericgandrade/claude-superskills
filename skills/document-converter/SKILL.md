---
name: document-converter
description: This skill should be used when the user needs to convert documents between formats (Office to PDF, PDF to images, image to PDF), perform PDF operations (merge, split, rotate, encrypt, decrypt), or run OCR on scanned documents. Uses local free tools — LibreOffice, ghostscript, pdftk, tesseract, and imagemagick — with no API key required. Trigger when the user says "convert this document", "export to PDF", "merge PDFs", "split PDF", "rotate PDF", "OCR this scan", "convert PPTX to PDF", "convert DOCX to PDF", or any document format conversion request.
license: MIT
---

# document-converter

## Purpose

Convert documents between formats and perform PDF operations using local, free, offline tools. No API key, no cost, no internet required. Supports Office formats, PDF manipulation, image-to-PDF, and OCR using LibreOffice, ghostscript, pdftk, tesseract, and imagemagick.

## When to Use

- Converting Office documents (DOCX, PPTX, XLSX, ODP, ODT) to PDF or HTML
- Converting PDF pages to images (PNG, JPG, TIFF) or images to PDF
- PDF operations: merge multiple PDFs, split by page range, rotate pages, encrypt or decrypt
- OCR: extract searchable text from scanned PDFs or image files
- Any document format conversion that does not involve video or audio

**Do NOT use for:**
- Video or audio format conversion (use a dedicated media skill)
- Converting code between programming languages
- Simple markdown → HTML (use pandoc directly)
- Structured text extraction from PDFs (use `docling-converter` instead)

## Step 0: Discovery — Detect Available Tools

Before any conversion, detect which tools are installed and identify the operating system:

```bash
# Detect OS
uname -s   # Darwin = macOS, Linux = Linux; on Windows use 'ver' or check $OS

# Check each tool
libreoffice --version 2>/dev/null || echo "NOT FOUND"
gs --version 2>/dev/null || echo "NOT FOUND"
pdftk --version 2>/dev/null || echo "NOT FOUND"
tesseract --version 2>/dev/null || echo "NOT FOUND"
convert -version 2>/dev/null || echo "NOT FOUND"   # ImageMagick
```

If a required tool is missing, show the install command for the user's OS before proceeding:

| Tool | macOS | Linux (apt) | Windows |
|------|-------|-------------|---------|
| LibreOffice | `brew install --cask libreoffice` | `sudo apt install libreoffice` | `winget install TheDocumentFoundation.LibreOffice` |
| Ghostscript | `brew install ghostscript` | `sudo apt install ghostscript` | `winget install ArtifexSoftware.GhostScript` |
| pdftk | `brew install pdftk-java` | `sudo apt install pdftk` | `winget install PDFTechnologies.PDFtk` |
| Tesseract | `brew install tesseract` | `sudo apt install tesseract-ocr` | `winget install UB-Mannheim.TesseractOCR` |
| ImageMagick | `brew install imagemagick` | `sudo apt install imagemagick` | `winget install ImageMagick.ImageMagick` |

If the user is on Windows and Microsoft Office is installed, note that LibreOffice and Office produce equivalent results for DOCX/PPTX/XLSX; Office via COM automation is an advanced alternative.

## Workflow

### Office Documents → PDF (most common)

Use LibreOffice headless mode. Works for DOCX, PPTX, XLSX, ODP, ODT, and any format LibreOffice opens.

```bash
# Convert single file to PDF in the same directory
libreoffice --headless --convert-to pdf "/path/to/file.pptx" --outdir "/path/to/output/"

# Convert to HTML
libreoffice --headless --convert-to html "/path/to/file.docx" --outdir "/path/to/output/"

# Batch: convert all PPTX in a directory
libreoffice --headless --convert-to pdf /path/to/folder/*.pptx --outdir /path/to/output/
```

Notes:
- Output file is placed in `--outdir` with the same base name and new extension
- For batch, run one `libreoffice` process — do NOT spawn multiple instances in parallel (LibreOffice uses a single user profile lock)
- If LibreOffice is open as a GUI app, close it first or use `--norestore` flag

### PDF → Images / Images → PDF

Use ImageMagick for image-PDF interchange:

```bash
# PDF pages → PNG (one file per page)
convert -density 150 "/path/to/doc.pdf" "/path/to/output/page_%03d.png"

# PDF pages → JPG with quality control
convert -density 150 "/path/to/doc.pdf" -quality 85 "/path/to/output/page_%03d.jpg"

# Single image → PDF
convert "/path/to/image.png" "/path/to/output/document.pdf"

# Multiple images → single PDF
convert img1.png img2.jpg img3.tiff "/path/to/output/combined.pdf"
```

Note: On some systems ImageMagick's PDF support requires ghostscript. If conversion fails with a policy error, check `/etc/ImageMagick-*/policy.xml` and ensure PDF is not restricted.

### PDF Operations — Merge, Split, Rotate

Prefer `pdftk` when available (simpler syntax). Fall back to `ghostscript` if pdftk is not installed.

**Merge PDFs:**
```bash
# pdftk (preferred)
pdftk file1.pdf file2.pdf file3.pdf cat output merged.pdf

# ghostscript (fallback)
gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -sOutputFile=merged.pdf file1.pdf file2.pdf file3.pdf
```

**Split PDF by page range:**
```bash
# pdftk — extract pages 1-3 and 5
pdftk input.pdf cat 1-3 5 output extracted.pdf

# ghostscript — extract pages 2 to 5
gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -dFirstPage=2 -dLastPage=5 -sOutputFile=extracted.pdf input.pdf
```

**Rotate pages:**
```bash
# pdftk — rotate all pages 90° clockwise
pdftk input.pdf rotate 1-endeast output rotated.pdf

# pdftk — rotate specific page (page 3) 180°
pdftk input.pdf rotate 3south output rotated.pdf
```

**Encrypt PDF (add password):**
```bash
pdftk input.pdf output secured.pdf user_pw "userpass" owner_pw "ownerpass"
```

**Decrypt PDF (remove password):**
```bash
pdftk secured.pdf input_pw "password" output decrypted.pdf
```

### OCR — Extract Text from Scanned Documents

Use Tesseract. Input must be an image (PNG, JPG, TIFF) or a PDF that ImageMagick can rasterize first.

```bash
# OCR a single image → searchable text file
tesseract "/path/to/scan.png" "/path/to/output/result"
# Output: result.txt

# OCR with language specification (Portuguese example)
tesseract "/path/to/scan.png" output -l por

# OCR → searchable PDF (requires tesseract with pdf support)
tesseract "/path/to/scan.png" output -l eng pdf
# Output: output.pdf

# OCR a scanned PDF: rasterize first, then OCR
convert -density 300 "scan.pdf" "scan_page_%03d.tiff"
tesseract "scan_page_000.tiff" output -l eng pdf
```

For multi-page scanned PDFs:
```bash
# Rasterize all pages
convert -density 300 "scan.pdf" "page_%03d.tiff"

# OCR each page and merge results
for f in page_*.tiff; do
  tesseract "$f" "${f%.tiff}" -l eng pdf
done
pdftk page_*.pdf cat output final_ocr.pdf
```

## Tool Routing Decision Table

| Task | Primary tool | Fallback |
|------|-------------|---------|
| Office → PDF | LibreOffice | None (LibreOffice is the standard) |
| Office → HTML | LibreOffice | None |
| PDF → images | ImageMagick | ghostscript (`gs -sDEVICE=png16m`) |
| Images → PDF | ImageMagick | ghostscript |
| Merge PDFs | pdftk | ghostscript |
| Split PDF | pdftk | ghostscript |
| Rotate PDF | pdftk | ghostscript |
| Encrypt PDF | pdftk | None |
| Decrypt PDF | pdftk | None |
| OCR | tesseract | None |

## Comparison: When to Use document-converter vs Alternatives

| Tool | Best for |
|------|----------|
| `document-converter` | Office → PDF, PDF operations (merge/split/rotate/encrypt), OCR, image ↔ PDF |
| `docling-converter` | PDF/Office → structured Markdown or JSON; layout-aware content extraction |
| `pandoc` | Markdown ↔ HTML ↔ LaTeX ↔ DOCX; lightweight lightweight text format conversions |
| `pptx-translator` | Translating PowerPoint files between languages |

## Critical Rules

- NEVER start a batch LibreOffice conversion with multiple parallel processes — LibreOffice uses a single user-profile lock and parallel instances will crash
- ALWAYS run Step 0 Discovery to confirm the required tool is installed before invoking it
- ALWAYS suggest the correct install command for the user's OS when a tool is missing
- NEVER use cloudconvert, external APIs, or paid services — this skill is fully offline
- ALWAYS prefer pdftk over ghostscript for PDF operations when both are available (simpler, safer syntax)
- ALWAYS specify output directory explicitly to avoid writing files to unexpected locations

## Example Usage

**Convert PPTX to PDF:**
```bash
libreoffice --headless --convert-to pdf presentation.pptx --outdir ./output/
```

**Merge 3 PDFs:**
```bash
pdftk report.pdf appendix.pdf cover.pdf cat output final.pdf
```

**OCR a scanned image (Portuguese):**
```bash
tesseract scan.png resultado -l por
```

**PDF pages to PNG images:**
```bash
convert -density 150 document.pdf page_%03d.png
```

**Encrypt a PDF:**
```bash
pdftk sensitive.pdf output protected.pdf user_pw "secret123"
```
