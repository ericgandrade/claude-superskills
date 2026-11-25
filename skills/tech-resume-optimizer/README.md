# tech-resume-optimizer

Optimize resumes for software engineering, product management, and technical roles — improving technical keyword density, project impact framing, and FAANG/startup-specific formatting conventions.

## When to Use

- Optimizing a software engineer resume for FAANG, MAANG, or high-growth startup applications
- Improving a technical PM resume to balance product and engineering credibility
- Strengthening the technical depth of bullet points (architecture decisions, scale, performance wins)
- Adding the right programming languages, frameworks, and tools in the right format for tech roles
- Tailoring a resume for a specific type of tech role (backend, fullstack, data engineering, ML, platform)
- Preparing a tech resume for companies that use technical screening rubrics

## What is Included

- `SKILL.md` — Core workflow: tech role analysis, technical keyword optimization, project impact framing, and role-specific calibration
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical Invocation

- "Optimize my software engineer resume for a senior backend role at a Series B startup"
- "Improve the technical depth of my resume bullets for a FAANG application"
- "Tailor my tech resume for a Staff Engineer position — focus on architecture and scale"
- "Add the right technical keywords and frameworks to my resume for a data engineering role"

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Role Analysis → Technical Keyword Audit → Impact Framing → Role Calibration) displayed during execution
- **Error Handling** — Handles vague technical bullets, missing stack details, and unclear seniority level with guided clarification
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
| Tags | resume, tech-resume, software-engineer, faang, technical-roles, pm, product-manager |
| Risk | safe |
