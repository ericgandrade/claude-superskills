# 🌐 pptx-translator

> Translate PowerPoint presentations between languages with parallel slide-by-slide translation, formatting preservation, and full validation

**Version:** 2.3.0
**Status:** ✨ Zero-Config | 🌍 Universal
**Platforms:** GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, AdaL CLI

---

## Overview

The **pptx-translator** skill translates `.pptx` PowerPoint presentations between any two languages while fully preserving the original formatting, fonts, layouts, and structure. It uses parallel sub-agent translation (one agent per slide) for speed, a full validation sub-routine to detect missed or incomplete translations, a safe backup system, and speaker notes translation.

Default direction is **Portuguese ↔ English**, but any language pair is supported.

---

## Features

- 🌍 **Any language pair** — PT↔EN by default, but supports ES, FR, DE, JA, ZH, and any other language
- ⚡ **Parallel translation** — all slide agents launched simultaneously in a single block for maximum speed
- 🔁 **Per-slide validation + retry** — each agent validates its slide immediately and retries once before reporting
- 🧩 **Group shape support** — recursive traversal of MSO GROUP shapes; nested text boxes are fully extracted and translated
- ⏭️ **Smart skip** — slides already in the target language are detected via langdetect and skipped (no unnecessary agents)
- 🎨 **Formatting preservation** — font size, bold, italic, colors, hyperlinks, and table structure are never modified
- 📝 **Speaker notes included** — translates presenter notes alongside slide content
- 🛡️ **Safe mode** — creates a timestamped backup before modifying any file
- 💥 **YOLO mode** — translates in-place for users who don't need a backup
- 🏷️ **Proper noun protection** — personal names, company names, brands, acronyms, and technology names are never translated
- 🧹 **Auto cleanup** — temp files are always removed, even on failure
- 🚫 **Image text awareness** — informs user that embedded image text is out of scope

---

## Quick Start

### Triggers

Activate this skill with any of these phrases:

```bash
# English
copilot> Translate this PowerPoint to English: ~/docs/proposta.pptx
copilot> Translate presentation.pptx from Portuguese to English
copilot> I need to translate a pptx file from Spanish to French

# Portuguese (also supported)
copilot> Traduza esta apresentacao para ingles: ~/docs/proposta.pptx
copilot> Preciso traduzir meu pptx pro ingles
```

### First-Time Setup

Dependencies are installed automatically with `pip install --user` — no prompts unless the install fails:

```bash
# Silent auto-install on first run
Installed python-pptx
Installed langdetect
```

If automatic install fails, the skill asks once for the preferred install method.

---

## Use Cases

### 1. **Standard PT→EN Translation**

```bash
copilot> Translate ~/docs/proposta_q4.pptx from Portuguese to English
```

**Output:**
- Backup created: `proposta_q4_backup_20260319.pptx`
- Translated: `proposta_q4_en.pptx`
- Validation report: 10/10 slides, 8/8 notes, all EN detected

### 2. **EN→PT with YOLO Mode (No Backup)**

```bash
copilot> Translate presentation.pptx to Portuguese, YOLO mode
```

**Output:**
- Warning displayed: original will be overwritten
- User confirms, file translated in place
- Validation report shown after completion

### 3. **Custom Language Pair**

```bash
copilot> Translate this deck from Spanish to French: ~/projects/pitch_es.pptx
```

**Output:**
- Auto-detects Spanish source
- Translates to French with proper FR terminology
- Saved as `pitch_es_fr.pptx`

### 4. **Emphasizing Speaker Notes**

```bash
copilot> Preciso traduzir este pptx pro ingles incluindo as notas do apresentador: ~/talks/keynote.pptx
```

**Output:**
- 12 slides + 12 speaker notes translated
- Validation confirms all notes were translated
- Saved as `keynote_en.pptx`

### 5. **Validation-Focused Review**

```bash
copilot> Translate report.pptx to English and show me a detailed validation report
```

**Output:**
- Full validation with per-slide language detection
- Mixed-language slides flagged with specific warnings
- Actionable review list for manual follow-up

---

## Output Structure

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

╔══════════════════════════════════════════════════════════════╗
║  VALIDATION REPORT                                          ║
╠══════════════════════════════════════════════════════════════╣
║ ✅ Slides translated:        10/10                          ║
║ ✅ Speaker notes translated:  8/8                           ║
║ ✅ Language detection:        all slides detected as EN      ║
║ ✅ File integrity:            valid PPTX                    ║
╚══════════════════════════════════════════════════════════════╝
```

---

## Requirements

- **Python 3.x** (usually pre-installed on macOS/Linux)
- **pip** (Python package manager)
- **[python-pptx](https://python-pptx.readthedocs.io/)** — reads and writes .pptx files (installed automatically)
- **[langdetect](https://pypi.org/project/langdetect/)** — optional, used for validation language detection

### Manual Installation (Optional)

```bash
pip install python-pptx langdetect
```

---

## Backup & Safety

### Safe Mode (Default)

The output is saved as a **new file** (`{name}_{lang}.pptx`). The original is never touched — it serves as the implicit backup. No redundant `_backup_` file is created.

```
proposta.pptx          ← original, untouched
proposta_en.pptx       ← new translated file
```

### YOLO Mode

Use when you don't need a backup:

```bash
copilot> Translate presentation.pptx to English, YOLO mode
```

The skill will display a warning and ask for confirmation before proceeding.

---

## Validation Details

The validation sub-routine runs 4 checks after every translation:

| Check | What It Does |
|-------|-------------|
| **Completeness** | Compares text block count per slide against the original manifest |
| **Language detection** | Uses `langdetect` to verify each slide is in the target language |
| **Speaker notes** | Confirms notes were translated for all slides that had them |
| **File integrity** | Verifies the translated .pptx opens without errors |

---

## Limitations

### What Works

✅ Text in regular shapes and text boxes
✅ Text in tables (cell content)
✅ Text nested inside GROUP shapes (recursive traversal)
✅ Speaker/presenter notes
✅ Any language pair supported by the AI model
✅ Presentations of any size (all slides translated in parallel)

### What Doesn't Work

❌ Text embedded in images (WordArt on rasterized images, photos with text overlay)
❌ Text in charts (chart data labels, axis labels within Chart objects)
❌ Encrypted/password-protected PPTX files
❌ Files that are open and locked in PowerPoint

---

## Error Messages

### File Not Found

```
❌ File not found: ~/docs/presentation.pptx

Please verify the path is correct and the file exists.
```

### python-pptx Not Installed

```
⚠️  python-pptx is required but not installed.

Install with: pip install python-pptx
```

### Permission Denied

```
❌ Permission denied: ~/docs/presentation.pptx

The file may be open in PowerPoint or is read-only.
Please close PowerPoint and try again.
```

---

## FAQ

### Q: How long does it take to translate a presentation?

**A:** Depends on the number of slides:
- Small deck (5-10 slides): 30-60 seconds
- Medium deck (20-30 slides): 1-2 minutes
- Large deck (50+ slides): 2-5 minutes (sub-agents run in parallel)

### Q: Will the fonts, colors, and layout be preserved?

**A:** Yes. The skill only changes the text content of each run, never the font properties, colors, sizes, or positions.

### Q: Can I translate to languages other than Portuguese/English?

**A:** Yes. Any language pair is supported. Just specify: "Translate this from Spanish to Japanese."

### Q: What happens if a slide has only images?

**A:** The slide is skipped silently and reported in the summary as "no text content." Embedded image text is out of scope.

### Q: Can I translate without creating a backup?

**A:** Yes, using YOLO mode: "Translate presentation.pptx to English, YOLO mode." The skill will warn you and ask for confirmation.

### Q: Are chart labels and axis text translated?

**A:** No. Text inside Chart objects is not accessible via python-pptx's text frame API. The skill will note any chart-containing slides in the validation report.

---

## What's New in v2.3

- **3-layer language detection** — replaced fragile single-regex approach with a 3-layer strategy: (1) expanded regex with more PT words (`nossa`, `nosso`, `jornada`, `empresa`, `sendo`, `vamos`, `também`, etc.), (2) `langdetect` on the *concatenated* text of all slide blocks (more context = higher accuracy), (3) conservative fallback that translates rather than skips when detection is inconclusive — eliminates false negatives like slide 22 ("A nossa jornada")
- **Real-time progress gauge** — non-blocking agent polling with per-slide completion lines (`✅ Slide 7/23 translated — validation: ok (en)`) and a live progress bar updated as agents finish
- **Concrete validation script in agent prompt** — agents now receive an explicit Python `langdetect` validation script to run after translating; `detected_lang` field reflects the actual detected language, not a hardcoded value; warning triggers automatic retry
- **Multiline speaker notes preserved** — write-back now splits translated notes by `\n` and maps lines back to individual paragraphs; extra paragraphs are appended via deepcopy if the translation has more lines than the original

## What's New in v2.2

- **Reliable source-language detection** — replaced `langdetect` per-slide with `has_source_language_content()` regex per-block; fixes false negatives where slides with Portuguese content (e.g. "CiberSegurança Avanade Brasil") were misclassified as Catalan and skipped untranslated
- **Per-block skip logic** — a slide is skipped only when ZERO text blocks match the source language; mixed slides (mostly EN with a few PT words) are now correctly translated
- **Backup only when needed** — Safe mode no longer creates a redundant `_backup_{timestamp}.pptx`; since output is always a new file, the original is already preserved; backup is only created in YOLO mode before overwriting

## What's New in v2.1

- **GROUP Shape Recursion** — `iter_shapes()` now descends into MSO GROUP shapes; nested text boxes (e.g. org charts, diagram sections) are fully extracted and translated
- **Composite Write-Back Key** — lookup keyed by `(parent_id, shape_id)` to prevent ID collisions between children of different groups
- **Per-Slide Validation + Retry** — each parallel agent validates its own slide immediately (translate → validate → retry once) instead of a separate end phase
- **Smart Skip** — slides already in the target language detected via `langdetect` are skipped entirely; no agent launched, no pass-through overhead
- **Single Parallel Block** — all agents launched simultaneously; no sequential rounds
- **Proper Noun Protection** — explicit rule with examples (Accenture, Microsoft, Azure, personal names, acronyms) prevents proper nouns from being translated
- **Silent Dependency Install** — `pip install --user` runs automatically without confirmation prompts
- **Single Consolidated Confirmation** — one config box at the start; no mid-workflow interruptions

---

## Metadata

| Field | Value |
|-------|-------|
| Version | 2.3.0 |
| Author | Eric Andrade |
| Created | 2026-03-19 |
| Updated | 2026-03-19 (v2.3.0) |
| Platforms | GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, AdaL CLI |
| Category | content |
| Tags | translation, pptx, powerpoint, multilingual, presentation |
| Risk | safe |
