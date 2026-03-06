# resume-ats-optimizer

Optimize resumes for Applicant Tracking Systems — check ATS compatibility, analyze keyword match against job descriptions, and improve parse-ability without sacrificing readability.

## When to Use

- Checking whether your resume will pass ATS screening before submitting an application
- Analyzing keyword match between your resume and a specific job description
- Removing ATS-unfriendly formatting (tables, columns, headers/footers, graphics)
- Improving keyword density for a specific role without keyword stuffing
- Auditing a resume for common ATS failure points (file format, section headers, special characters)
- Preparing an ATS-optimized version alongside a visually designed version

## What is Included

- `SKILL.md` — Core workflow: ATS compatibility audit, keyword extraction, match analysis, and reformatting guidance
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical Invocation

- "Check if my resume will pass ATS for this software engineer role"
- "Analyze keyword match between my resume and this job description"
- "Optimize my resume for ATS — it keeps getting rejected by automated systems"
- "Remove ATS-unfriendly formatting from my resume while keeping it readable"

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (ATS Compatibility Audit → Keyword Extraction → Match Analysis → Optimization) displayed during execution
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
| Tags | resume, ats, applicant-tracking, keyword-optimization, job-search, parse-ability |
| Risk | safe |
