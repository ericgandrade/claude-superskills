# resume-version-manager

Track different resume versions, maintain a master resume, and manage tailored role-specific versions throughout a job search campaign.

## When to Use

- Maintaining a master resume and generating role-specific versions from it
- Tracking which resume version was submitted to which company
- Keeping tailored resume versions organized across multiple simultaneous applications
- Propagating updates (new job, promotion, new skill) from the master to all active versions
- Auditing version history to understand what's changed between resume iterations
- Setting up a resume file naming and storage convention for a job search

## What is Included

- `SKILL.md` — Core workflow: master resume setup, version tracking, update propagation, and naming convention design
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical Invocation

- "Help me set up a system to manage multiple resume versions during my job search"
- "I have 5 tailored resume versions — help me track which one I sent where"
- "Update my master resume and propagate the changes to my active role versions"
- "Create a resume version management system for my active job search"

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Master Resume Setup → Version Inventory → Update Propagation → Tracking System) displayed during execution
- **Error Handling** — Handles overlapping versions, missing master resume, and unclear version histories with structured clarification
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
| Tags | resume, version-control, master-resume, job-search, tracking, tailoring |
| Risk | safe |
