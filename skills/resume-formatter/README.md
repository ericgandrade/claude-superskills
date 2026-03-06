# resume-formatter

Ensure ATS-friendly formatting, create clean scannable layouts, and produce consistently structured resume output across sections.

## When to Use

- Standardizing inconsistent resume formatting (mixed fonts, spacing, date formats)
- Converting a poorly formatted resume into a clean, scannable Markdown or text layout
- Ensuring section headers, bullet indentation, and white space follow best practices
- Applying consistent date formats and job title conventions throughout a resume
- Reformatting a Word or PDF resume into an ATS-safe plain text or Markdown version
- Preparing a resume for human reviewers with clear visual hierarchy

## What is Included

- `SKILL.md` — Core workflow: formatting audit, layout standardization, section reordering, and Markdown/plain text output
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical Invocation

- "Format my resume into a clean, ATS-friendly layout"
- "Standardize the formatting of my resume — it's inconsistent right now"
- "Convert my resume into a clean Markdown format"
- "Fix the layout of my resume so it's scannable and professional"

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Formatting Audit → Layout Standardization → Section Review → Output Generation) displayed during execution
- **Error Handling** — Handles inconsistent date formats, missing sections, mixed heading styles, and ambiguous structure
- **EVals** — `evals/evals.json` with 3 realistic test cases; `evals/trigger-eval.json` with 20 queries (10 trigger / 10 no-trigger) for description optimization
- **Standardized description** — SKILL.md description updated to Anthropic skill-creator format

---

## Metadata

| Field | Value |
|-------|-------|
| Version | 2.0.0 |
| Author | Eric Andrade |
| Created | 2026-03-01 |
| Updated | 2026-03-06 |
| Platforms | GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, AdaL CLI |
| Category | career |
| Tags | resume, formatting, layout, ats, markdown, scannable, clean |
| Risk | safe |
