# interview-prep-generator

Generate STAR stories, role-specific practice questions, and talking points from your resume and job description to prepare for any interview.

## When to Use

- Preparing for a job interview with structured STAR stories from your experience
- Generating likely interview questions based on a specific job description
- Building talking points for behavioral, situational, and technical interview rounds
- Practicing responses to "Tell me about yourself" and other common openers
- Preparing for panel or case interviews at specific companies or industries
- Reviewing your resume to identify experience gaps before an interview

## What is Included

- `SKILL.md` — Core workflow: JD analysis, STAR story generation, question bank, and role-specific talking points
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical Invocation

- "Help me prepare for my interview at Google for a senior PM role"
- "Generate STAR stories from my resume for a software engineering interview"
- "What questions should I expect for this data scientist role at a fintech company?"
- "Create a complete interview prep guide from my resume and this job description"

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (JD Analysis → STAR Story Generation → Question Bank → Talking Points) displayed during execution
- **Error Handling** — Handles missing resume, vague job descriptions, and company-specific unknowns with guided clarification
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
| Tags | interview, star-stories, interview-prep, behavioral, job-search, talking-points |
| Risk | safe |
