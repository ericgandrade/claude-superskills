# resume-bullet-writer

Transform weak, duty-based resume bullets into achievement-focused statements with quantifiable metrics, strong action verbs, and clear business impact.

## When to Use

- Rewriting resume bullets that describe responsibilities ("managed team") into achievements ("led 8-person team to deliver X")
- Adding quantifiable metrics to experience bullets when they feel vague
- Improving action verb strength across all resume bullet points
- Tailoring bullet points to match the language of a specific job description
- Writing new bullets from scratch based on work experience notes
- Upgrading a junior-level resume to reflect more senior accomplishments

## What is Included

- `SKILL.md` — Core workflow: bullet diagnosis, achievement reframing, metric extraction, and action verb enhancement
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical Invocation

- "Rewrite these resume bullets to focus on impact and metrics"
- "Transform my job description duties into achievement-focused resume bullets"
- "Improve the action verbs in my resume and add quantifiable results"
- "Write stronger resume bullets from these notes about my last project"

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Bullet Diagnosis → Achievement Reframing → Metric Extraction → Action Verb Enhancement) displayed during execution
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
| Tags | resume, bullets, achievement, metrics, action-verbs, impact, job-search |
| Risk | safe |
