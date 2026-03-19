---
name: pptx-translator
description: This skill should be used when the user needs to translate PowerPoint presentations (.pptx) between languages, preserving formatting and layout. Supports parallel slide-by-slide translation with per-slide validation and retry. Default languages are Portuguese and English but any language pair is supported.
license: MIT
---

# pptx-translator

## Purpose

This skill translates PowerPoint presentations (.pptx) between any two languages while preserving the original formatting, layout, fonts, and structure. It uses parallel sub-agent translation (one agent per slide), per-slide validation with automatic retry, recursive group-shape traversal, and a single fast write-back pass.

## When to Use This Skill

- User provides a .pptx file and wants it translated to another language
- User needs to translate a PowerPoint from Portuguese to English or vice versa
- User needs to translate slides between any language pair (Spanish, French, German, Japanese, etc.)
- User wants to translate speaker/presenter notes alongside slide content
- User asks to "translate", "traduzir", or "convert language" of a PowerPoint or .pptx file

## Step 0: Dependency Setup (Silent)

Check dependencies silently. Do NOT ask for confirmation — install automatically with `--user` and inform the user only of what was installed.

```bash
python3 -c "import pptx" 2>/dev/null || pip install --user python-pptx -q && echo "Installed python-pptx"
python3 -c "import langdetect" 2>/dev/null || pip install --user langdetect -q && echo "Installed langdetect"
```

If installation fails (e.g. no pip, restricted environment), ask the user once: "python-pptx is required. Preferred install method: (a) pip install --user, (b) existing venv path, (c) manual?"

## Step 1: Single Consolidated Confirmation

Infer all parameters from the user's request. Ask only for what is truly ambiguous. Then display **one** confirmation box and proceed immediately after the user confirms. Do NOT ask again.

Parameters to infer or confirm:
1. **Source file path** — validate it exists and has `.pptx` extension
2. **Source language** — auto-detect from first 3 slides using `langdetect`; confirm if ambiguous
3. **Target language** — infer from request; ask if not specified
4. **Backup mode** — default Safe (timestamped backup); YOLO only if user explicitly says so
5. **Speaker notes** — default Yes (translate alongside slides)

```
╔══════════════════════════════════════════════════════════════╗
║  PPTX TRANSLATOR — Configuration                            ║
╠══════════════════════════════════════════════════════════════╣
║  File:            ~/docs/proposta.pptx                      ║
║  Direction:       Portuguese → English                      ║
║  Speaker notes:   Yes (included)                            ║
║  Original:        preserved (output saved as new file)      ║
║  Output file:     ~/docs/proposta_en.pptx                   ║
║  ⚠️  YOLO: original will be overwritten + backup created    ║
╚══════════════════════════════════════════════════════════════╝
Proceed? [Y/n]
```

After this single confirmation, proceed without further interruptions.

## Step 2: Extract & Analyze Slide Content

```
[████░░░░░░░░░░░░░░░░] 20% — Step 2/5: Extracting slide content
```

Use `python-pptx` to extract all translatable content. **CRITICAL: Use a recursive `iter_shapes()` function that descends into GROUP shapes** — do not use `slide.shapes` directly, as it misses text nested inside groups.

### Extraction Script

```python
from pptx import Presentation
from pptx.enum.shapes import MSO_SHAPE_TYPE
import json, sys

def iter_shapes(shapes, parent_id=None):
    """Recursively yield all leaf shapes, descending into GROUP shapes."""
    for shape in shapes:
        if shape.shape_type == MSO_SHAPE_TYPE.GROUP:
            yield from iter_shapes(shape.shapes, parent_id=shape.shape_id)
        else:
            yield shape, parent_id

def extract_text(pptx_path):
    prs = Presentation(pptx_path)
    manifest = []

    for slide_num, slide in enumerate(prs.slides, start=1):
        text_blocks = []

        for shape, parent_id in iter_shapes(slide.shapes):
            # Text frames in regular shapes (including children of groups)
            if shape.has_text_frame:
                for para_idx, para in enumerate(shape.text_frame.paragraphs):
                    for run_idx, run in enumerate(para.runs):
                        if run.text.strip():
                            text_blocks.append({
                                "shape_id": shape.shape_id,
                                "parent_id": parent_id,   # None if top-level
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
                                "parent_id": parent_id,
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

Save manifest to `/tmp/pptx_manifest_{timestamp}.json`.

### After Extraction

Detect which slides contain source-language content using **per-block pattern matching**, not per-slide `langdetect`. `langdetect` is unreliable for short or mixed-language texts (e.g. it classifies "CiberSegurança Avanade Brasil" as Catalan, not Portuguese).

```python
import re

# Portuguese-specific patterns: accented chars unique to PT + common PT stop-words/suffixes
_PT_PATTERN = re.compile(
    r'[çãõáéíóúâêôàü]'                     # accented chars unique to PT/ES
    r'|ção|ções|ão|ões'                      # PT suffixes
    r'|\b(não|que|para|com|uma|por|são'
    r'|foi|mais|isso|como|mas|este|essa'
    r'|esse|pela|pelo|das|dos|nos|nas'
    r'|em|se|do|da|de|no|na|ao|à|os|as'
    r'|um|já|está|até|quando|temos|foram'
    r'|estamos|devemos|próximos|oferta'
    r'|agenda|cenário|solução|abordagem'
    r'|estratégia|mercado)\b',
    re.IGNORECASE
)

def has_source_language_content(slide_data, source_lang="pt"):
    """
    Returns True if ANY text block contains source-language content.
    Evaluates per-block — mixed slides (mostly EN with a few PT words) are
    correctly included. A slide is skipped ONLY when ZERO blocks match.
    For non-PT sources, falls back to langdetect per-block (not per-slide).
    """
    if source_lang == "pt":
        for block in slide_data["text_blocks"]:
            if _PT_PATTERN.search(block["original_text"]):
                return True
        return False
    else:
        from langdetect import detect, LangDetectException
        for block in slide_data["text_blocks"]:
            try:
                if detect(block["original_text"]).startswith(source_lang):
                    return True
            except LangDetectException:
                continue
        return False

for slide in manifest:
    slide["needs_translation"] = has_source_language_content(slide, source_lang="pt")
```

A slide is marked `needs_translation=False` **only when ZERO text blocks match** the source language pattern. This prevents false negatives from `langdetect` misclassifying short or mixed-language slides.

```
✅ Extraction complete
   Slides found:       35
   Text blocks:        1911
   Slides to skip:     12 (zero source-language blocks detected)
   Slides to translate: 23
   Speaker notes:      2 slides with notes
   Group shapes found: 4 slides with grouped content (will be recursed)
```

## Step 3: Parallel Translation with Per-Slide Validation

```
[████████░░░░░░░░░░░░] 40% — Step 3/5: Translating slides in parallel
```

### CRITICAL: Launch ALL agents in a single parallel block

Launch one Agent tool call per slide that needs translation **all at the same time in the same message block**. Never launch in rounds or batches — all agents must be parallel.

Each agent:
1. Receives its slide's JSON text blocks
2. Translates the content
3. Validates immediately (language detection + block completeness)
4. Retries once automatically if validation fails
5. Saves result to `/tmp/trans_slide_{N}.json`
6. Reports `✅ Slide N/TOTAL translated and validated` or `⚠️ Slide N: validation warning — {reason}`

### Sub-Agent Prompt

```
You are a professional translator. Translate the following PowerPoint slide content from {SOURCE_LANGUAGE} to {TARGET_LANGUAGE}.

STRICT RULES:
- Preserve the meaning and tone of the original
- NEVER translate: proper nouns, personal names (people's names), company names, brand names, product names, technology names, organizational acronyms, or code snippets
  Examples of what NOT to translate: "Accenture", "Microsoft", "Bradesco", "João Silva", "Azure", "BLT", "YTD", "KPI", "CCI"
- Return JSON with the same structure as input (shape_id, parent_id, para_idx, run_idx preserved — these are required for write-back)
- Translate speaker notes naturally, maintaining the presenter's voice
- After translating, validate: use langdetect on the combined translated text to confirm it is in {TARGET_LANG_CODE}. If validation fails, retry the translation once before returning.

Slide {N}/{TOTAL}:
{JSON_TEXT_BLOCKS}

Speaker notes:
{NOTES_TEXT}

Save your result to /tmp/trans_slide_{N}.json in this format:
{
  "slide_num": N,
  "translated_blocks": [
    {"shape_id": X, "parent_id": Y_or_null, "para_idx": Z, "run_idx": W, "translated_text": "..."},
    {"shape_id": X, "parent_id": Y_or_null, "row_idx": R, "col_idx": C, "translated_text": "..."}
  ],
  "translated_notes": "...",
  "validation": {"status": "ok|warning", "detected_lang": "en", "message": ""}
}
```

### Progress Display

As agents complete, display rolling progress:

```
✅ Slide  3/35 traduzido e validado
✅ Slide  7/35 traduzido e validado
✅ Slide 13/35 traduzido e validado  (group shapes incluídos)
⚠️ Slide 18/35 — warning: mixed language detected, retried OK
✅ Slide 22/35 traduzido e validado
```

## Step 4: Write-Back in a Single Pass

```
[████████████░░░░░░░░] 60% — Step 4/5: Writing translations to PPTX
```

### Safe Mode (default): Original is preserved automatically

In Safe mode the output is always saved as a **new file** (`{name}_{lang}.pptx`). The original is never touched — it is already the backup. No redundant `_backup_{timestamp}.pptx` is created.

**YOLO mode only:** when the user explicitly chose YOLO, the output overwrites the original. In this case, create a backup first:

```python
# YOLO mode only — Safe mode does NOT run this block
import shutil
from datetime import datetime
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
backup_path = pptx_path.replace(".pptx", f"_backup_{timestamp}.pptx")
shutil.copy2(pptx_path, backup_path)
print(f"✅ Backup created: {backup_path}")
```

### Write-Back Script

Collect all `/tmp/trans_slide_{N}.json` files, then write in a single pass. **CRITICAL: Use the same recursive `iter_shapes()` function** — the write-back must descend into GROUP shapes exactly as the extractor did.

```python
from pptx import Presentation
from pptx.enum.shapes import MSO_SHAPE_TYPE
import json, glob, os

def iter_shapes(shapes, parent_id=None):
    for shape in shapes:
        if shape.shape_type == MSO_SHAPE_TYPE.GROUP:
            yield from iter_shapes(shape.shapes, parent_id=shape.shape_id)
        else:
            yield shape, parent_id

def write_translations(pptx_path, output_path, trans_dir):
    # Load all translation files
    translations_by_slide = {}
    for f in glob.glob(f"{trans_dir}/trans_slide_*.json"):
        with open(f) as fp:
            data = json.load(fp)
            translations_by_slide[data["slide_num"]] = data

    prs = Presentation(pptx_path)
    runs_updated = 0
    cells_updated = 0

    for slide_num, slide in enumerate(prs.slides, start=1):
        slide_data = translations_by_slide.get(slide_num)
        if not slide_data:
            continue  # Slide was skipped (already in target language)

        # Build lookup keyed by (parent_id, shape_id, para_idx, run_idx) for runs
        # and (parent_id, shape_id, row_idx, col_idx) for table cells
        run_map = {}
        cell_map = {}
        for b in slide_data["translated_blocks"]:
            parent_id = b.get("parent_id")
            shape_id = b["shape_id"]
            if "run_idx" in b:
                run_map[(parent_id, shape_id, b["para_idx"], b["run_idx"])] = b["translated_text"]
            elif "col_idx" in b:
                cell_map[(parent_id, shape_id, b["row_idx"], b["col_idx"])] = b["translated_text"]

        for shape, parent_id in iter_shapes(slide.shapes):
            if shape.has_text_frame:
                for para_idx, para in enumerate(shape.text_frame.paragraphs):
                    for run_idx, run in enumerate(para.runs):
                        key = (parent_id, shape.shape_id, para_idx, run_idx)
                        if key in run_map:
                            run.text = run_map[key]  # Only change text — preserve all font properties
                            runs_updated += 1

            if shape.has_table:
                for row_idx, row in enumerate(shape.table.rows):
                    for col_idx, cell in enumerate(row.cells):
                        key = (parent_id, shape.shape_id, row_idx, col_idx)
                        if key in cell_map:
                            # Preserve cell formatting — replace paragraph text only
                            if cell.text_frame.paragraphs:
                                for para in cell.text_frame.paragraphs:
                                    for run in para.runs:
                                        run.text = ""
                                cell.text_frame.paragraphs[0].add_run().text = cell_map[key]
                            cells_updated += 1

        # Write speaker notes
        if slide_data.get("translated_notes") and slide.has_notes_slide:
            notes_tf = slide.notes_slide.notes_text_frame
            if notes_tf and notes_tf.paragraphs:
                for run in notes_tf.paragraphs[0].runs:
                    run.text = ""
                notes_tf.paragraphs[0].add_run().text = slide_data["translated_notes"]

    prs.save(output_path)
    return runs_updated, cells_updated
```

**Formatting preservation rules:**
- Only `run.text` is changed — font size, bold, italic, color, and hyperlinks are untouched
- Table cell content: clear existing runs, add single new run with translated text
- Shape positions, sizes, backgrounds, and images are never touched
- Image shapes are skipped entirely (report in summary)

## Step 5: File Integrity Check & Final Summary

```
[████████████████░░░░] 80% — Step 5/5: Integrity check
```

Per-slide validation was already done inside each agent (Step 3). This step only verifies the output file is a valid PPTX.

```python
try:
    prs_check = Presentation(output_path)
    slide_count = len(prs_check.slides)
    integrity_ok = True
except Exception as e:
    integrity_ok = False
    integrity_error = str(e)
```

### Cleanup

```python
import glob, os
for f in glob.glob("/tmp/pptx_manifest_*.json") + glob.glob("/tmp/trans_slide_*.json"):
    os.remove(f)
```

### Final Summary

```
[████████████████████] 100% — Done!

╔══════════════════════════════════════════════════════════════╗
║  TRANSLATION COMPLETE ✅                                    ║
╠══════════════════════════════════════════════════════════════╣
║  Original file:     ~/docs/proposta.pptx                    ║
║  Translated file:   ~/docs/proposta_en.pptx                 ║
║  Backup created:    ~/docs/proposta_backup_20260319.pptx    ║
║  Slides translated: 23/35 (12 already in English — skipped)║
║  Text runs updated: 736                                     ║
║  Table cells updated: 1,175                                 ║
║  Speaker notes:     2/2 translated                          ║
║  Group shapes:      4 slides with groups fully traversed    ║
║  Language pair:     Portuguese → English                    ║
╚══════════════════════════════════════════════════════════════╝
```

## Error Handling

| Error | Cause | Action |
|-------|-------|--------|
| `python-pptx` install fails | Restricted environment / no pip | Ask user once for preferred install method |
| File not found | Wrong path | Ask user to verify the path |
| Invalid .pptx | Corrupted file | Inform user; suggest repairing in PowerPoint |
| Empty slide | Images/charts only | Skip silently; report as "no text content" in summary |
| Sub-agent translation fails | Model/network error | Retry once automatically; if still failing, skip slide and report |
| Backup creation fails | Disk full / read-only | Abort before any modification; inform user |
| GROUP shape ID collision | Two groups with same child shape_id | Use `(parent_id, shape_id)` composite key — always, never shape_id alone |

## Critical Rules

- NEVER modify the original file unless the user explicitly chose YOLO mode
- In Safe mode the original is preserved automatically (output is a new file) — NEVER create a redundant `_backup_{timestamp}.pptx` in Safe mode; only create backup in YOLO mode before overwriting
- ALWAYS use recursive `iter_shapes()` for both extraction AND write-back — never `slide.shapes` directly
- ALWAYS key the write-back lookup by `(parent_id, shape_id, ...)` — never by `shape_id` alone
- NEVER launch translation agents in rounds — all agents must be launched in a single parallel block
- NEVER create pass-through translations for slides already in the target language — skip them entirely
- NEVER use `langdetect` per-slide to decide skip/translate — use `has_source_language_content()` per-block pattern matching; `langdetect` is unreliable for short or mixed-language slides and frequently misclassifies Portuguese as Catalan ("ca")
- ALWAYS treat a slide as needing translation if ANY single text block matches the source language — skip only when ZERO blocks match
- NEVER translate proper nouns: personal names, company names, brand names, product names, technology names, organizational acronyms (e.g. "Accenture", "Microsoft", "João Silva", "Azure", "BLT", "YTD")
- ALWAYS do per-slide validation inside each agent (translate → validate → retry once) — not in a separate phase
- ALWAYS clean up temp files after completion, whether the workflow succeeds or fails
- ALWAYS preserve text formatting — only change `run.text`, never font/size/color properties
- NEVER ask the user for confirmation more than once (the initial config confirmation)
- NEVER add improvised "preview", "debug", or "check" shell commands not specified in this workflow

## Example Usage

### Example 1: Standard PT→EN Translation

```
User: Translate this presentation from Portuguese to English: ~/docs/proposta_q4.pptx

Skill: [Installs deps silently if needed]
       [One config confirmation: PT→EN, Safe mode, speaker notes]
       [Extracts 35 slides, 1911 blocks — 12 already in English, skipping]
       [Launches 23 parallel agents simultaneously]
       ✅ Slide  3/35 traduzido e validado
       ✅ Slide  7/35 traduzido e validado
       ✅ Slide 13/35 traduzido e validado (group shapes traversed)
       ...
       [Single write-back pass: 736 runs + 1175 table cells]
       ✅ Saved: ~/docs/proposta_q4_en.pptx
```

### Example 2: EN→PT with YOLO Mode

```
User: Translate presentation.pptx to Portuguese, YOLO mode

Skill: [Config confirmation shows ⚠️ YOLO — original will be overwritten]
       [User confirms once]
       [Translates in place, saves as presentation.pptx]
```

### Example 3: Custom Language Pair

```
User: Translate ~/projects/pitch_es.pptx from Spanish to French

Skill: [Detects Spanish via langdetect]
       [Launches parallel agents for all non-French slides]
       ✅ Saved: ~/projects/pitch_es_fr.pptx
```

### Example 4: Presentation with Group Shapes

```
User: Translate keynote.pptx to English

Skill: [Extraction finds 3 slides with GROUP shapes]
       [iter_shapes() recursively extracts all nested text boxes]
       [All group content included in translation agents]
       ✅ Slide 13/20 traduzido e validado (group shapes incluídos)
       ✅ All grouped text boxes translated correctly
```

### Example 5: Large Deck with Mixed Languages

```
User: Can you generate this PPT in English? deck.pptx

Skill: [Detects 15/40 slides already in English — skipped]
       [Launches 25 parallel agents for Portuguese slides]
       [Skip slides: 1, 5, 8, 12, 21-35 (already EN)]
       ✅ 25/40 slides translated, 15 skipped (already English)
```
