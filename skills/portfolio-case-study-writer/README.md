# portfolio-case-study-writer

Transform resume bullets and work experience into detailed portfolio case studies — structured narratives with context, challenge, approach, results, and learnings.

## When to Use

- Expanding resume bullets into full case studies for a portfolio site or design portfolio
- Writing UX or product case studies from project experience notes
- Creating consulting or strategy case studies for a professional portfolio
- Documenting engineering or architecture decisions as storytelling case studies
- Building content for a personal website that showcases work in depth
- Preparing case study narratives for job interviews that ask "walk me through a project"

## What is Included

- `SKILL.md` — Core workflow: bullet expansion, narrative structure (context → challenge → approach → results → learnings), and portfolio-ready formatting
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical Invocation

- "Turn this resume bullet into a full portfolio case study"
- "Write a UX case study from my notes about the checkout redesign project"
- "Create a portfolio case study from my experience building the payment API"
- "Expand these 3 bullet points into a detailed consulting case study narrative"

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Context Extraction → Challenge Framing → Approach & Results → Portfolio Polish) displayed during execution
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
| Tags | portfolio, case-study, ux, product, storytelling, career, resume-expansion |
| Risk | safe |
