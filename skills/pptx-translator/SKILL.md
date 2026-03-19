---
name: pptx-translator
description: This skill should be used when the user needs to translate PowerPoint presentations (.pptx) between languages, preserving formatting and layout. Supports parallel slide-by-slide translation with validation. Default languages are Portuguese and English but any language pair is supported.
license: MIT
---

# pptx-translator

## Purpose

This skill translates PowerPoint presentations (.pptx) between any two languages while preserving the original formatting, layout, fonts, and structure. It uses parallel sub-agent translation for speed, a full validation sub-routine to catch incomplete or missed translations, backup/YOLO mode for file safety, and speaker notes translation.

The skill is designed for users who need accurate, well-formatted multilingual presentations without manual copy-pasting or losing slide design.

## When to Use This Skill

This skill should be used when:

- User provides a .pptx file and wants it translated to another language
- User needs to translate a PowerPoint presentation from Portuguese to English or vice versa
- User needs to translate slides between any language pair (Spanish, French, German, Japanese, etc.)
- User wants to translate speaker/presenter notes alongside the slide content
- User needs a safe translation workflow with backup creation before modifying files
- User wants fast parallel slide-by-slide translation with validation
- User asks to "translate", "traduzir", or "convert language" of a PowerPoint or .pptx file

## Step 0: Environment Detection & Setup

Before processing, verify that the required Python libraries are available.

### Dependency Check

```bash
# Check python3
python3 --version 2>/dev/null
PYTHON_OK=$?

# Check python-pptx
python3 -c "import pptx" 2>/dev/null
PPTX_OK=$?

# Check langdetect (for validation phase)
python3 -c "import langdetect" 2>/dev/null
LANGDETECT_OK=$?
```

### If python-pptx is missing

```
⚠️  python-pptx is required but not installed.

This skill requires python-pptx to read and write PowerPoint files.

Would you like to install it now?
- [ ] Yes - Install with pip (pip install python-pptx)
- [ ] No - I'll install it manually
```

```bash
pip install python-pptx
```

### If langdetect is missing

```
⚠️  langdetect is optional but recommended for translation validation.

It helps verify that each slide was successfully translated to the target language.

Would you like to install it now?
- [ ] Yes - Install with pip (pip install langdetect)
- [ ] No - Skip language validation
```

```bash
pip install langdetect
```

## Step 1: User Configuration

Ask the user to confirm the following parameters before starting. Some may already be inferred from the request.

### Required Inputs

1. **Source file path** — path to the .pptx file to translate
   - Validate that the file exists and has a `.pptx` extension
   - If file not found, ask user to verify the path

2. **Source language** — the language the presentation is currently written in
   - Default: auto-detect (examine first few slides and infer language)
   - User may specify explicitly: `Portuguese`, `English`, `Spanish`, `French`, etc.

3. **Target language** — the language to translate into
   - Common options to suggest if not specified: `English (EN)` or `Portuguese (PT)`
   - Accept any language the user specifies

4. **Backup mode** — how to handle the original file:
   - **Safe mode (default):** Create a backup copy `{filename}_backup_{YYYYMMDD_HHMMSS}.pptx` before modifying
   - **YOLO mode:** Translate in place, no backup created
   - If not specified, default to Safe mode and inform the user

5. **Speaker notes** — whether to translate presenter/speaker notes too
   - Default: Yes (translate notes alongside slide content)
   - Ask if not specified

### Configuration Summary

Display a confirmation box before proceeding:

```
╔══════════════════════════════════════════════════════════════╗
║  PPTX TRANSLATOR — Configuration                            ║
╠══════════════════════════════════════════════════════════════╣
║  File:            ~/docs/proposta.pptx                      ║
║  Direction:       Portuguese → English                       ║
║  Speaker notes:   Yes (included)                            ║
║  Backup mode:     Safe — backup will be created             ║
║  Output file:     ~/docs/proposta_en.pptx                   ║
╚══════════════════════════════════════════════════════════════╝

Proceed? [Y/n]
```

## Step 2: Extract & Analyze Slide Content

Display progress before starting:

```
[████░░░░░░░░░░░░░░░░] 20% — Step 2/6: Extracting slide content
```

Use `python-pptx` to extract all translatable content from the presentation.

### Extraction Script

```python
from pptx import Presentation
from pptx.util import Pt
import json, sys

def extract_text(pptx_path):
    prs = Presentation(pptx_path)
    manifest = []

    for slide_num, slide in enumerate(prs.slides, start=1):
        text_blocks = []

        for shape in slide.shapes:
            # Text frames in regular shapes
            if shape.has_text_frame:
                for para_idx, para in enumerate(shape.text_frame.paragraphs):
                    for run_idx, run in enumerate(para.runs):
                        if run.text.strip():
                            text_blocks.append({
                                "shape_id": shape.shape_id,
                                "shape_name": shape.name,
                                "para_idx": para_idx,
                                "run_idx": run_idx,
                                "original_text": run.text
                            })

            # Tables
            if shape.has_table:
                for row_idx, row in enumerate(shape.table.rows):
                    for col_idx, cell in enumerate(row.cells):
                        if cell.text.strip():
                            text_blocks.append({
                                "shape_id": shape.shape_id,
                                "shape_name": f"table_{shape.name}",
                                "row_idx": row_idx,
                                "col_idx": col_idx,
                                "original_text": cell.text
                            })

        # Speaker notes
        notes_text = ""
        if slide.has_notes_slide:
            notes_tf = slide.notes_slide.notes_text_frame
            notes_text = notes_tf.text.strip() if notes_tf else ""

        manifest.append({
            "slide_num": slide_num,
            "text_blocks": text_blocks,
            "notes": notes_text
        })

    return manifest

manifest = extract_text(sys.argv[1])
print(json.dumps(manifest, ensure_ascii=False, indent=2))
```

### After Extraction

Display summary:

```
✅ Extraction complete
   Slides found:       10
   Text blocks:        87
   Speaker notes:      8 slides with notes
   Images (skipped):   3 (embedded image text is out of scope)
```

Save the manifest to a temp file: `/tmp/pptx_manifest_{timestamp}.json`

## Step 3: Parallel Translation (Sub-Agents)

Display progress:

```
[████████░░░░░░░░░░░░] 40% — Step 3/6: Translating slides in parallel
```

### Sub-Agent Strategy

Launch parallel Agent tool calls — one per slide (or batched in groups of 5 if >20 slides). This maximizes translation speed.

Each sub-agent receives:

```
Translate the following slide content from {SOURCE_LANGUAGE} to {TARGET_LANGUAGE}.

Rules:
- Preserve the meaning and tone of the original content
- Maintain consistent terminology across all text blocks on this slide
- Do NOT translate proper nouns, brand names, product names, or code snippets
- Return the result as JSON with the same structure as input (shape_id, para_idx, run_idx preserved)
- Speaker notes should be translated naturally, maintaining the presenter's voice

Slide {N}/{TOTAL} content:
{JSON_TEXT_BLOCKS}

Speaker notes for this slide:
{NOTES_TEXT}
```

Each sub-agent returns:

```json
{
  "slide_num": 3,
  "translated_blocks": [
    {"shape_id": 5, "para_idx": 0, "run_idx": 0, "translated_text": "..."},
    ...
  ],
  "translated_notes": "..."
}
```

### Progress Display

As sub-agents complete, show rolling progress:

```
[████████░░░░░░░░░░░░] 40% — Translating slide 4/10... (6 remaining)
[████████████░░░░░░░░] 60% — Translating slide 7/10... (3 remaining)
```

## Step 4: Write Back Translated Text

Display progress:

```
[████████████░░░░░░░░] 60% — Step 4/6: Writing translations to PPTX
```

### Safe Mode: Create Backup First

```python
import shutil
from datetime import datetime

timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
backup_path = pptx_path.replace(".pptx", f"_backup_{timestamp}.pptx")
shutil.copy2(pptx_path, backup_path)
print(f"✅ Backup created: {backup_path}")
```

### Write-Back Script

```python
from pptx import Presentation
import json

def write_translations(pptx_path, output_path, translations_by_slide):
    prs = Presentation(pptx_path)

    for slide_num, slide in enumerate(prs.slides, start=1):
        slide_data = translations_by_slide.get(slide_num)
        if not slide_data:
            continue

        block_map = {
            (b["shape_id"], b.get("para_idx"), b.get("run_idx")): b["translated_text"]
            for b in slide_data["translated_blocks"]
        }

        for shape in slide.shapes:
            if shape.has_text_frame:
                for para_idx, para in enumerate(shape.text_frame.paragraphs):
                    for run_idx, run in enumerate(para.runs):
                        key = (shape.shape_id, para_idx, run_idx)
                        if key in block_map:
                            # Preserve formatting — only change text, not font properties
                            run.text = block_map[key]

            if shape.has_table:
                for row_idx, row in enumerate(shape.table.rows):
                    for col_idx, cell in enumerate(row.cells):
                        cell_key = (shape.shape_id, row_idx, col_idx)
                        if cell_key in block_map:
                            cell.text = block_map[cell_key]

        # Write speaker notes
        if slide_data.get("translated_notes") and slide.has_notes_slide:
            notes_tf = slide.notes_slide.notes_text_frame
            if notes_tf.paragraphs:
                notes_tf.paragraphs[0].runs[0].text = slide_data["translated_notes"]

    prs.save(output_path)
    print(f"✅ Translated file saved: {output_path}")
```

The output file is named: `{original_name}_{target_lang_code}.pptx` (e.g., `proposta_en.pptx`)

**Formatting preservation rules:**
- Only `run.text` is changed — font size, bold, italic, color, and hyperlinks are untouched
- Table cell content is replaced text-only; table borders and formatting are preserved
- Shape positions, sizes, and backgrounds are never modified
- Image shapes are skipped entirely (inform user that embedded image text was not translated)

## Step 5: Validation Sub-Routine

Display progress:

```
[████████████████░░░░] 80% — Step 5/6: Validating translation
```

Run a full validation — never skip this step.

### Validation Checks

```python
from pptx import Presentation
try:
    from langdetect import detect, LangDetectException
    LANGDETECT_AVAILABLE = True
except ImportError:
    LANGDETECT_AVAILABLE = False

def validate_translation(original_path, translated_path, manifest, target_lang_code):
    results = {
        "slides_total": 0,
        "slides_translated": 0,
        "notes_total": 0,
        "notes_translated": 0,
        "language_warnings": [],
        "empty_block_warnings": [],
        "file_integrity": False
    }

    # Check 1: File integrity
    try:
        prs = Presentation(translated_path)
        results["file_integrity"] = True
    except Exception as e:
        results["file_integrity"] = False
        results["integrity_error"] = str(e)
        return results

    # Check 2: Completeness — compare text block counts per slide
    for slide_num, slide in enumerate(prs.slides, start=1):
        results["slides_total"] += 1
        original_slide = manifest[slide_num - 1]
        original_count = len(original_slide["text_blocks"])
        translated_count = sum(
            1 for shape in slide.shapes
            if shape.has_text_frame
            for para in shape.text_frame.paragraphs
            for run in para.runs
            if run.text.strip()
        )
        if translated_count >= original_count * 0.9:  # allow 10% tolerance for merged runs
            results["slides_translated"] += 1
        else:
            results["empty_block_warnings"].append(f"Slide {slide_num}: expected ~{original_count} blocks, found {translated_count}")

        # Check 3: Language detection
        if LANGDETECT_AVAILABLE:
            slide_text = " ".join(
                run.text for shape in slide.shapes
                if shape.has_text_frame
                for para in shape.text_frame.paragraphs
                for run in para.runs
            )
            if slide_text.strip():
                try:
                    detected = detect(slide_text)
                    if not detected.startswith(target_lang_code):
                        results["language_warnings"].append(
                            f"Slide {slide_num}: detected '{detected}', expected '{target_lang_code}'"
                        )
                except LangDetectException:
                    pass

        # Check 4: Speaker notes
        if original_slide["notes"]:
            results["notes_total"] += 1
            if slide.has_notes_slide:
                notes_text = slide.notes_slide.notes_text_frame.text.strip()
                if notes_text and notes_text != original_slide["notes"]:
                    results["notes_translated"] += 1

    return results
```

### Validation Report Display

```
╔══════════════════════════════════════════════════════════════╗
║  VALIDATION REPORT                                          ║
╠══════════════════════════════════════════════════════════════╣
║ ✅ Slides translated:        10/10                          ║
║ ✅ Speaker notes translated:  8/8                           ║
║ ✅ Language detection:        all slides detected as EN      ║
║ ✅ File integrity:            valid PPTX                    ║
╠══════════════════════════════════════════════════════════════╣
║ ⚠️  Warning: Slide 3 has mixed language content             ║
║ ⚠️  Warning: Slide 7 — fewer text blocks than expected      ║
╚══════════════════════════════════════════════════════════════╝
```

Warnings do not stop the process — they are flagged for the user's review.

## Step 6: Cleanup & Completion

Display final progress:

```
[████████████████████] 100% — Step 6/6: Cleanup complete
```

### Cleanup

Remove all temporary files created during the workflow:

```python
import os, glob

temp_files = glob.glob("/tmp/pptx_manifest_*.json")
for f in temp_files:
    os.remove(f)
    print(f"🗑️  Removed: {f}")
```

Cleanup runs on both success and failure. Use try/finally to ensure it always executes.

### Final Summary

```
╔══════════════════════════════════════════════════════════════╗
║  TRANSLATION COMPLETE                                       ║
╠══════════════════════════════════════════════════════════════╣
║  Original file:     ~/docs/proposta.pptx                    ║
║  Translated file:   ~/docs/proposta_en.pptx                 ║
║  Backup created:    ~/docs/proposta_backup_20260319.pptx    ║
║  Slides:            10/10 translated                        ║
║  Speaker notes:     8/8 translated                          ║
║  Language pair:     Portuguese → English                    ║
╚══════════════════════════════════════════════════════════════╝

[████████████████████] 100% — Translation complete!
```

## Error Handling

| Error | Cause | Action |
|-------|-------|--------|
| `python-pptx` not installed | Missing dependency | Offer `pip install python-pptx` |
| File not found | Wrong path provided | Ask user to verify the path |
| File is not a valid .pptx | Corrupted or wrong format | Inform user, suggest repairing the file in PowerPoint |
| Empty slide (no text) | Slide has only images or charts | Skip silently, report in summary as "no text content" |
| Language detection mismatch | Translation incomplete or mixed language | Flag specific slides in validation report |
| Permission denied | File is open in PowerPoint or read-only | Ask user to close PowerPoint and try again |
| Sub-agent translation fails | Network or model error | Retry the failed slide; if still failing, report and skip |
| Backup creation fails | Disk full or no write permission | Abort and inform user before any modification |

## Critical Rules

- NEVER modify the original file unless the user explicitly chose YOLO mode
- ALWAYS create a timestamped backup in Safe mode before any modification
- NEVER skip the validation sub-routine — always run all 4 checks
- ALWAYS clean up temp files after completion, whether the workflow succeeds or fails
- ALWAYS preserve text formatting — only change `run.text`, never font properties
- NEVER translate embedded image text — inform the user that image-embedded text is out of scope
- ALWAYS translate speaker notes unless the user explicitly opts out
- NEVER assume the source language — auto-detect or confirm with the user

## Example Usage

### Example 1: Standard PT→EN Translation

```
User: Translate this presentation from Portuguese to English: ~/docs/proposta_q4.pptx

Skill: [Checks dependencies, all OK]
       Configuration confirmed: PT→EN, Safe mode, speaker notes included
       ✅ Backup created: proposta_q4_backup_20260319_141500.pptx
       [Extracts 10 slides, 87 text blocks, 8 notes]
       [Launches 10 parallel sub-agents for translation]
       [Writes translations back preserving all formatting]
       [Validation: 10/10 slides, 8/8 notes, all detected as EN]
       ✅ Saved: ~/docs/proposta_q4_en.pptx
```

### Example 2: EN→PT with YOLO Mode

```
User: Translate presentation.pptx to Portuguese, YOLO mode, no backup needed

Skill: ⚠️  YOLO mode selected — no backup will be created.
       The original file will be overwritten.
       Proceed? [Y/n]
       [User confirms]
       [Translates in place, saves as presentation.pptx]
```

### Example 3: Custom Language Pair

```
User: Translate this deck from Spanish to French: ~/projects/pitch_es.pptx

Skill: [Detects Spanish source language]
       Configuration: ES→FR, Safe mode, speaker notes included
       [Translates with FR-specific terminology and tone]
       ✅ Saved: ~/projects/pitch_es_fr.pptx
```

### Example 4: Emphasis on Speaker Notes

```
User: Preciso traduzir este pptx pro ingles incluindo as notas do apresentador: ~/talks/keynote.pptx

Skill: [Extracts slide content + all 12 slides with notes]
       [Sub-agents translate both slides and notes in parallel]
       Validation: 12/12 notes translated
       ✅ Saved: ~/talks/keynote_en.pptx
```

### Example 5: Validation-Focused Review

```
User: Translate report.pptx to English and show me a detailed validation report

Skill: [Completes translation]
       [Runs full validation with langdetect on each slide]
       [Displays detailed validation report with per-slide breakdown]
       ⚠️  Slide 4: mixed content detected (contains chart labels in original language)
       ✅ 14/15 slides fully translated, 1 requires manual review
```
