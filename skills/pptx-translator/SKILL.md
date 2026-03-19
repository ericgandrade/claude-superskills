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
```

If installation fails (e.g. no pip, restricted environment), ask the user once: "python-pptx is required. Preferred install method: (a) pip install --user, (b) existing venv path, (c) manual?"

## Step 1: Single Consolidated Confirmation

Infer all parameters from the user's request. Ask only for what is truly ambiguous. Then display **one** confirmation box and proceed immediately after the user confirms. Do NOT ask again.

Parameters to infer or confirm:
1. **Source file path** — validate it exists and has `.pptx` extension
2. **Source language** — infer from user's request (e.g. "translate from Portuguese"); if not stated, the AI classifier sub-agent (Step 2) will determine it automatically
3. **Target language** — infer from request; ask if not specified
4. **Backup mode** — default Safe (output saved as new file); YOLO only if user explicitly says so
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

### After Extraction: AI-Powered Language Classification

**Do NOT use regex or `langdetect` to decide which slides to translate.** Both approaches require hardcoded rules and fail silently on valid words with no accents (e.g. "nossa jornada", "cenário", "nosso time"). Regex lists are never complete; `langdetect` misclassifies short or mixed-language text.

**The model itself already understands language natively** — use it. After extraction, launch a **single classification sub-agent** that receives all slide texts and returns a JSON decision for each slide. No libraries. No hardcoded words. No false negatives.

### Classification Sub-Agent Prompt

> **Note on large presentations:** If the presentation has more than 50 slides, split the input into batches of 50 and launch one classifier agent per batch — large payloads can exceed model context limits. Merge all results before proceeding.

```
You are a language classifier. For each slide below, determine whether its text is written (fully or partially) in {SOURCE_LANGUAGE}.

Rules:
- A slide needs translation if ANY text block contains {SOURCE_LANGUAGE} content — even a single sentence or title
- A slide does NOT need translation only if ALL its text is already in {TARGET_LANGUAGE} or is language-neutral (numbers, dates, proper nouns, acronyms, code)
- Proper nouns, brand names, product names, and technical terms are language-neutral — do not use them as evidence of either language
- When in doubt, mark needs_translation: true — it is safer to translate an already-English slide than to skip a source-language one

Slides to classify:
{SLIDE_TEXTS_JSON}

Save your result to /tmp/pptx_classify_output.json as a JSON array (no explanation, no markdown fences):
[
  {"slide_num": 1, "needs_translation": true, "language": "pt", "reason": "Title contains Portuguese: 'A nova era das empresas'"},
  {"slide_num": 2, "needs_translation": false, "language": "en", "reason": "All text is in English"},
  ...
]

After saving, print: "✅ Classification complete: {N} slides need translation, {M} already in target language"
```

Where `{SLIDE_TEXTS_JSON}` is built from the manifest:

```python
import json

slide_texts = []
for slide in manifest:
    combined = " | ".join(
        b["original_text"] for b in slide["text_blocks"] if b["original_text"].strip()
    )
    if combined.strip():
        slide_texts.append({"slide_num": slide["slide_num"], "text": combined})
    else:
        # No text content — images/charts only, skip
        slide["needs_translation"] = False

# Save for the classifier agent
with open("/tmp/pptx_classify_input.json", "w") as f:
    json.dump(slide_texts, f, ensure_ascii=False, indent=2)
```

The classifier agent saves its result to `/tmp/pptx_classify_output.json`. The classifier prompt must explicitly instruct the agent to save output there — do NOT rely on the agent inferring it. After it completes, apply the decisions with a fallback for parse failures:

```python
import json, os

try:
    with open("/tmp/pptx_classify_output.json") as f:
        decisions = {d["slide_num"]: d for d in json.load(f)}
except (FileNotFoundError, json.JSONDecodeError, KeyError):
    # Fallback: if classifier failed or returned invalid JSON, translate all slides with text
    print("⚠️  Classifier output invalid — falling back to translate-all-with-text strategy")
    decisions = {}
    for slide in manifest:
        if slide["text_blocks"]:
            slide["needs_translation"] = True
            slide["detected_language"] = "unknown"
        else:
            slide["needs_translation"] = False

for slide in manifest:
    decision = decisions.get(slide["slide_num"])
    if decision:
        slide["needs_translation"] = decision["needs_translation"]
        slide["detected_language"] = decision.get("language", "unknown")
        slide["detection_reason"] = decision.get("reason", "")
    # slides with no text content were already set to False above
```

This approach requires **zero hardcoded patterns**, works for any language pair, and handles edge cases (mixed slides, proper nouns, short titles, accented-free Portuguese) correctly.

```
✅ Extraction complete
   Slides found:       35
   Text blocks:        1911
   Slides to skip:     12 (AI classifier determined already in target language)
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

Slide {N}/{TOTAL}:
{JSON_TEXT_BLOCKS}

Speaker notes:
{NOTES_TEXT}

AFTER translating, self-validate using your own language understanding (no libraries needed):
- Read back all your translated_text values
- Confirm they are in {TARGET_LANGUAGE} and not in {SOURCE_LANGUAGE}
- If you find any block still in {SOURCE_LANGUAGE}, fix it before saving
- Set validation.status to "ok" if all blocks are correctly translated, or "warning" with a description if any issue remains

Save your result to /tmp/trans_slide_{N}.json in this format:
{
  "slide_num": N,
  "translated_blocks": [
    {"shape_id": X, "parent_id": Y_or_null, "para_idx": Z, "run_idx": W, "translated_text": "..."},
    {"shape_id": X, "parent_id": Y_or_null, "row_idx": R, "col_idx": C, "translated_text": "..."}
  ],
  "translated_notes": "...",
  "validation": {"status": "ok|warning", "detected_lang": "{TARGET_LANG_CODE}", "message": ""}
}

After saving, print: "✅ Slide {N}/{TOTAL} translated — validation: {status} ({detected_lang})"
```

### Progress Display

After launching all agents, track completion in a non-blocking loop and display each slide as it finishes. Use `list_agents` to poll, then `read_agent` on completed ones.

Display a running gauge **before launching agents**:

```
[████████░░░░░░░░░░░░] 40% — Step 3/5: Translating 23 slides in parallel…
```

Then as each agent completes, print one line per slide in the order they finish:

```
✅ Slide  3/23 translated — validation: ok (en)
✅ Slide  7/23 translated — validation: ok (en)
✅ Slide 13/23 translated — validation: ok (en)  [group shapes traversed]
⚠️ Slide 18/23 — validation: warning (pt detected) — retried OK
✅ Slide 22/23 translated — validation: ok (en)
```

Update the gauge as completion percentage increases:

```
[████████████████░░░░] 72% — Translating: 17/23 slides done
```

When all agents complete, print:

```
[████████████████████] Step 3/5 complete — all 23 slides translated
   Validation warnings: 1 (auto-retried OK)
   Validation failures: 0
```

**IMPORTANT:** If any agent output contains `"status": "warning"` and the retry also failed, flag those slides in the final summary as needing manual review — do NOT silently ignore them.

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
                            translated_cell_text = cell_map[key]
                            tf = cell.text_frame
                            if tf.paragraphs:
                                # Split by newline to preserve multi-paragraph cells
                                cell_lines = translated_cell_text.split("\n")
                                for para_idx, para in enumerate(tf.paragraphs):
                                    for run in para.runs:
                                        run.text = ""
                                    if para_idx < len(cell_lines):
                                        if para.runs:
                                            para.runs[0].text = cell_lines[para_idx]
                                        else:
                                            para.add_run().text = cell_lines[para_idx]
                            cells_updated += 1

        # Write speaker notes — preserve paragraph structure for multiline notes
        if slide_data.get("translated_notes") and slide.has_notes_slide:
            notes_tf = slide.notes_slide.notes_text_frame
            if notes_tf:
                # Split translated notes by newline to restore paragraph structure
                translated_lines = slide_data["translated_notes"].split("\n")
                existing_paras = notes_tf.paragraphs

                for para_idx, para in enumerate(existing_paras):
                    # Clear all runs in this paragraph
                    for run in para.runs:
                        run.text = ""
                    # Write corresponding translated line if available
                    if para_idx < len(translated_lines):
                        if para.runs:
                            para.runs[0].text = translated_lines[para_idx]
                        else:
                            para.add_run().text = translated_lines[para_idx]

                # If translated text has MORE lines than existing paragraphs, append extras
                from copy import deepcopy
                if len(translated_lines) > len(existing_paras):
                    # Use the last paragraph as a template for new ones
                    last_para_xml = existing_paras[-1]._p
                    parent_elem = last_para_xml.getparent()
                    for extra_line in translated_lines[len(existing_paras):]:
                        new_para = deepcopy(last_para_xml)
                        # Clear runs in cloned paragraph and set text
                        for r in new_para.findall(".//{http://schemas.openxmlformats.org/drawingml/2006/main}r"):
                            t = r.find("{http://schemas.openxmlformats.org/drawingml/2006/main}t")
                            if t is not None:
                                t.text = extra_line
                            break
                        parent_elem.append(new_para)

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
for f in (glob.glob("/tmp/pptx_manifest_*.json") +
          glob.glob("/tmp/trans_slide_*.json") +
          glob.glob("/tmp/pptx_classify_*.json")):
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
| Classifier agent fails or returns invalid JSON | Model/network error | Fall back to translate-all-with-text strategy; warn user |
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
- NEVER use regex patterns or `langdetect` to decide which slides to translate — use the AI classifier sub-agent; regex lists are always incomplete and `langdetect` misclassifies short or mixed-language text
- ALWAYS use the AI classification sub-agent (Step 2) to determine `needs_translation` per slide — the model understands language natively, requires no hardcoded patterns, and handles any language pair
- ALWAYS treat a slide as needing translation when the classifier is uncertain — it is safer to translate an already-English slide (no harm) than to miss a source-language one
- NEVER translate proper nouns: personal names, company names, brand names, product names, technology names, organizational acronyms (e.g. "Accenture", "Microsoft", "João Silva", "Azure", "BLT", "YTD")
- ALWAYS do per-slide self-validation inside each translation agent (translate → read back → fix → save) — agents use their own language understanding, no libraries
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

Skill: [AI classifier determines which slides are in Spanish]
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
