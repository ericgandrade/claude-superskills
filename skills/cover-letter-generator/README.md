# cover-letter-generator

Create personalized, compelling cover letters from your resume and a job description — tailored to the role, company, and hiring manager.

## When to Use

- Writing a cover letter for a specific job application
- Tailoring a generic cover letter to a particular role or company
- Creating a cover letter that complements an ATS-optimized resume
- Drafting a cover letter that highlights your most relevant experience for a career change
- Writing email introductions or "why I'm interested" narratives for referrals

## What is Included

- `SKILL.md` — Core workflow: company research, keyword alignment, narrative structure, and personalization hooks
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical Invocation

- "Write a cover letter for this software engineer job at Stripe"
- "Generate a personalized cover letter from my resume and this job description"
- "Help me write a cover letter for a career change from finance to product management"
- "Create a compelling cover letter for this role — I have my resume and the JD"

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Company Research → Keyword Alignment → Narrative Draft → Personalization Pass) displayed during execution
- **Error Handling** — Handles missing resume, missing job description, vague company info, and generic roles with guided clarification steps
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
| Tags | cover-letter, job-application, resume, career, personalization, job-search |
| Risk | safe |
