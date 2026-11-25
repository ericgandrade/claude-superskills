# resume-tailor

Customize your resume for specific job postings — aligning language, reordering emphasis, and surfacing the most relevant experience while maintaining truthfulness.

## When to Use

- Adapting a master resume to a specific job posting before applying
- Aligning your resume language to match the terminology used in a job description
- Reordering or highlighting experience sections based on what a role prioritizes
- Tailoring the executive summary or objective for a specific company or team
- Preparing role-specific resume versions when applying to different types of positions simultaneously

## What is Included

- `SKILL.md` — Core workflow: JD-to-resume alignment, keyword integration, section reprioritization, and tailoring without fabrication
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical Invocation

- "Tailor my resume for this senior product manager role at Shopify"
- "Customize my resume to match this job description without changing facts"
- "Align my resume language with the terminology used in this JD"
- "Create a tailored version of my resume for this specific application"

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (JD Analysis → Keyword Alignment → Section Reprioritization → Tailored Output) displayed during execution
- **Error Handling** — Handles mismatched experience, qualification gaps, and requests to fabricate credentials with honest reframing guidance
- **EVals** — `evals/evals.json` with 3 realistic test cases; `evals/trigger-eval.json` with 20 queries (10 trigger / 10 no-trigger) for description optimization
- **Standardized description** — SKILL.md description updated to Anthropic skill-creator format

---

## Metadata

| Field | Value |
|-------|-------|
| Version | 2.1.0 |
| Author | Eric Andrade |
| Created | 2026-03-01 |
| Updated | 2026-03-19 |
| Platforms | GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, AdaL CLI |
| Category | career |
| Tags | resume, tailoring, job-application, keyword-alignment, customization, job-search |
| Risk | safe |
