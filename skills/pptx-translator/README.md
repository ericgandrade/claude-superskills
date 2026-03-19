# 🌐 pptx-translator

> Translate PowerPoint presentations between languages with parallel slide-by-slide translation, formatting preservation, and full validation

**Version:** 2.0.0
**Status:** ✨ Zero-Config | 🌍 Universal
**Platforms:** GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, AdaL CLI

---

## Overview

The **pptx-translator** skill translates `.pptx` PowerPoint presentations between any two languages while fully preserving the original formatting, fonts, layouts, and structure. It uses parallel sub-agent translation (one agent per slide) for speed, a full validation sub-routine to detect missed or incomplete translations, a safe backup system, and speaker notes translation.

Default direction is **Portuguese ↔ English**, but any language pair is supported.

---

## Features

- 🌍 **Any language pair** — PT↔EN by default, but supports ES, FR, DE, JA, ZH, and any other language
- ⚡ **Parallel translation** — one sub-agent per slide for maximum speed
- 🎨 **Formatting preservation** — font size, bold, italic, colors, hyperlinks, and table structure are never modified
- 📝 **Speaker notes included** — translates presenter notes alongside slide content
- 🛡️ **Safe mode** — creates a timestamped backup before modifying any file
- 💥 **YOLO mode** — translates in-place for users who don't need a backup
- ✅ **Full validation** — completeness check, language detection, notes check, and file integrity
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

The skill automatically checks for dependencies and offers to install them:

```bash
⚠️  python-pptx is required but not installed.

Would you like me to install it now?
- [x] Yes - Install with pip
- [ ] No - I'll install manually
```

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

A timestamped backup is created before any modification:

```
proposta_backup_20260319_141500.pptx
```

The original file is never modified until after the backup is confirmed.

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
✅ Speaker/presenter notes
✅ Any language pair supported by the AI model
✅ Presentations of any size (batched sub-agents for >20 slides)

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

## What's New in v2.0

- **Parallel Sub-Agents** — one sub-agent per slide for faster translation at scale
- **Full Validation Sub-Routine** — completeness check, langdetect language verification, speaker notes check, and file integrity check after every run
- **EVALs** — `evals/evals.json` with 5 realistic test cases; `evals/trigger-eval.json` with 20 queries (10 trigger / 10 no-trigger) for description optimization
- **Backup/YOLO Mode** — Safe mode (default) creates a timestamped backup; YOLO mode translates in place
- **All 8 Platforms** — works across GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, and AdaL CLI

---

## Metadata

| Field | Value |
|-------|-------|
| Version | 2.0.0 |
| Author | Eric Andrade |
| Created | 2026-03-19 |
| Updated | 2026-03-19 |
| Platforms | GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, AdaL CLI |
| Category | content |
| Tags | translation, pptx, powerpoint, multilingual, presentation |
| Risk | safe |
