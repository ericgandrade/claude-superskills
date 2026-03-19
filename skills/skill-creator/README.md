# skill-creator

**Create new skills, improve existing skills, and measure skill performance using Anthropic's full EVals framework.**

Built on top of and fully compatible with the [official Anthropic skill-creator](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/skill-creator), adapted for the claude-superskills package and all 8 AI platforms.

## What It Does

The skill-creator automates the entire lifecycle of creating and improving CLI skills:

- **Create new skills** from scratch — interview, draft SKILL.md, run test cases, iterate
- **Improve existing skills** — load an existing skill, run evals against it, benchmark, optimize
- **Measure skill performance** — quantitative benchmarks with pass rate, time, and token variance
- **Optimize trigger accuracy** — description optimization loop using Claude with extended thinking
- **Blind A/B comparison** — independent agent compares two skill versions with rubric scoring

## Key Features

- **Full EVals Framework** — spawn with-skill and baseline subagents in parallel, grade with assertions, aggregate into benchmark.json
- **Interactive Viewer** — browser-based review UI (Outputs + Benchmark tabs) via `eval-viewer/generate_review.py`
- **Description Optimization** — `scripts/run_loop.py` runs up to 5 iterations with 60/40 train/test split, outputs `best_description` via test score (not train, to prevent overfitting)
- **Eval Review HTML** — `assets/eval_review.html` lets users edit, toggle, and export trigger/not-trigger query sets
- **Grader Agent** — `agents/grader.md` evaluates assertions against transcripts + output files
- **Analyzer Agent** — `agents/analyzer.md` surfaces benchmark patterns and post-hoc blind comparison analysis
- **Comparator Agent** — `agents/comparator.md` does blind A/B rubric scoring (content + structure, 1-5 scale)
- **Packaging** — `scripts/package_skill.py` creates distributable `.skill` files

## When to Use

Use this skill when you want to:
- Create a new CLI skill following official standards
- Improve or optimize an existing skill
- Run evals to test whether a skill is working
- Benchmark skill performance with quantitative metrics
- Optimize the skill's description for better triggering accuracy
- Compare two versions of a skill with blind A/B analysis

## Core Loop

```
Draft/Load skill
      ↓
Write test cases → evals/evals.json
      ↓
Spawn subagents in parallel:
  with_skill run + baseline run (per test case)
      ↓
Draft assertions while runs complete
      ↓
Grade with agents/grader.md → grading.json
      ↓
Aggregate → benchmark.json + benchmark.md
      ↓
Analyst pass → agents/analyzer.md
      ↓
Launch eval-viewer/generate_review.py → browser
      ↓
User reviews outputs + benchmark tabs
      ↓
Read feedback.json → improve skill
      ↓
Repeat (next iteration-N/)
      ↓
Offer description optimization (scripts/run_loop.py)
      ↓
Optional: blind comparison (agents/comparator.md)
      ↓
Package (scripts/package_skill.py)
```

## File Structure

```
skill-creator/
├── SKILL.md                          # Main workflow instructions
├── README.md                         # This file
├── agents/
│   ├── grader.md                     # Grades assertions against transcripts
│   ├── analyzer.md                   # Benchmark analysis + blind comparison analysis
│   └── comparator.md                 # Blind A/B rubric scoring
├── references/
│   ├── schemas.md                    # JSON schemas (evals, grading, benchmark, etc.)
│   └── claude-superskills-conventions.md  # Rules for contributing to claude-superskills
├── scripts/
│   ├── run_loop.py                   # Description optimization loop (main script)
│   ├── run_eval.py                   # Trigger eval runner (claude -p subprocess)
│   ├── improve_description.py        # Claude extended thinking description improver
│   ├── aggregate_benchmark.py        # Aggregates grading.json → benchmark.json + .md
│   ├── generate_report.py            # HTML report generator for optimization loop
│   ├── package_skill.py              # Creates .skill zip package
│   ├── quick_validate.py             # Validates SKILL.md frontmatter
│   └── utils.py                      # Shared helpers (parse_skill_md, etc.)
├── eval-viewer/
│   ├── generate_review.py            # Serves browser review UI (Outputs + Benchmark tabs)
│   └── viewer.html                   # Viewer HTML template (embedded data)
└── assets/
    └── eval_review.html              # Trigger eval review/edit UI template
```

## Description Optimization

The `scripts/run_loop.py` script optimizes the `description` field in SKILL.md frontmatter — the primary mechanism that determines when Claude invokes a skill.

```bash
python -m scripts.run_loop \
  --eval-set /path/to/trigger-eval.json \
  --skill-path /path/to/skill \
  --model claude-sonnet-4-6 \
  --max-iterations 5 \
  --verbose
```

The loop:
1. Splits 20 eval queries into 60% train / 40% test (stratified by should_trigger)
2. Runs each query 3 times (`claude -p`) to get a reliable trigger rate
3. Calls Claude with extended thinking to propose an improved description based on failures
4. Re-evaluates and repeats up to 5 times
5. Returns `best_description` selected by **test** score to avoid overfitting
6. Opens live HTML report in browser with auto-refresh during optimization

## Quick Validate

Before packaging, validate the SKILL.md frontmatter:

```bash
python -m scripts.quick_validate skills/my-skill
```

Checks: kebab-case name, description under 1024 chars, no unexpected frontmatter keys (only name/description/license/allowed-tools/metadata/compatibility are allowed).

## claude-superskills-specific Notes

When creating skills for the claude-superskills package:
- Place skills in `skills/<name>/` — never in platform directories (all gitignored)
- SKILL.md frontmatter must be minimal: only `name`, `description`, `license`
- After creating, update `bundles.json`, `README.md` badge count, `CLAUDE.md`
- Run `node scripts/release.js patch` to bump version atomically across all 5 files

See `references/claude-superskills-conventions.md` for the complete rules.

## Based On

This skill is built on the [Anthropic official skill-creator](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/skill-creator) — the same scripts, agents, and eval-viewer are included verbatim. The SKILL.md has been adapted to add claude-superskills conventions (all-8-platforms coverage, frontmatter rules, skill output path, version management checklist) while keeping the full Anthropic workflow intact.

## What's New in v2.0

- **Full Anthropic EVals Framework** — major rewrite incorporating the official skill-creator framework with with-skill + baseline subagent runs, grader/analyzer/comparator agents, benchmark.json, and eval-viewer browser UI
- **Description Optimization loop** — `scripts/run_loop.py` with 60/40 train/test split, Claude extended thinking, max 5 iterations
- **Blind A/B comparison** — `agents/comparator.md` for independent rubric scoring between skill versions
- **Eval review UI** — `assets/eval_review.html` for editing and toggling trigger/not-trigger query sets
- **Progress Tracking** — 4-phase gauge bar (Draft/Load → Eval Runs → Grading → Optimization) displayed during execution
- **EVals** — `evals/evals.json` with 3 realistic test cases; `evals/trigger-eval.json` with 20 queries

---

## Metadata

| Field | Value |
|-------|-------|
| Version | 2.1.0 |
| Author | Eric Andrade |
| Created | 2025-02-01 |
| Updated | 2026-03-19 |
| Platforms | All 8 platforms |
| Category | meta |
| Tags | automation, scaffolding, skill-creation, evals, benchmarking, description-optimization |
| Risk | safe |
