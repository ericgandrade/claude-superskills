# resume-section-builder

Create targeted resume sections optimized for different experience levels, roles, and resume contexts — from executive summaries to skills sections, education blocks, and project showcases.

## When to Use

- Writing or rewriting a specific resume section (summary, skills, education, projects, certifications)
- Building an executive summary that opens strongly for a senior role
- Creating a skills section that balances technical and soft skills for a specific job type
- Designing a projects section for a developer or student with limited experience
- Writing an education section that highlights relevant coursework or research
- Adding non-traditional sections (volunteer work, publications, patents, speaking)

## What is Included

- `SKILL.md` — Core workflow: section type identification, content extraction, targeted writing, and role-level calibration
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical Invocation

- "Write a strong executive summary section for my senior engineer resume"
- "Build a skills section for a product manager resume — I need to balance technical and strategic skills"
- "Create a projects section for my developer resume — I have 3 key projects to highlight"
- "Help me write the education section for my resume as a recent graduate"

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Section Analysis → Content Extraction → Targeted Writing → Role Calibration) displayed during execution
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
| Tags | resume, sections, executive-summary, skills, education, projects, resume-writing |
| Risk | safe |
