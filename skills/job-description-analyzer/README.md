# job-description-analyzer

Analyze job postings to calculate your match score, identify skill gaps, extract hidden requirements, and create a targeted application strategy.

## When to Use

- Evaluating whether to apply for a specific job posting
- Understanding what a job description is really asking for beyond the listed requirements
- Calculating how well your resume matches a specific role before applying
- Identifying skill gaps to address in your cover letter or application materials
- Extracting ATS keywords from a job description for resume tailoring
- Comparing multiple job postings to prioritize applications

## What is Included

- `SKILL.md` — Core workflow: JD parsing, keyword extraction, match scoring, gap analysis, and application strategy
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical Invocation

- "Analyze this job description and tell me how well I match it"
- "What are the hidden requirements in this product manager job posting?"
- "Extract all ATS keywords from this job description for my resume"
- "Give me a match score for this role and identify my top gaps"

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (JD Parsing → Keyword Extraction → Match Scoring → Gap Analysis) displayed during execution
- **Error Handling** — Handles incomplete job descriptions, vague requirements, and missing resume inputs with guided clarification
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
| Tags | job-description, ats, keyword-extraction, match-score, gap-analysis, job-search, application-strategy |
| Risk | safe |
