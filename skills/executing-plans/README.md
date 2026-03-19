# executing-plans

Executes a written implementation plan in a separate session with step-by-step review checkpoints and progress tracking.

## When to use

- Run a multi-step implementation plan produced by `writing-plans`.
- Execute complex tasks with checkpoints to review progress.
- Apply changes across multiple files following a structured plan.
- Resume interrupted implementation with full context.

## What is included

- `SKILL.md` — End-to-end execution workflow with review checkpoints, progress tracking, and rollback guidance
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical invocation

- "Execute this implementation plan: [paste plan]."
- "Run the plan and pause after each step for review."
- "Continue executing from Step 3 of the plan."
- "Execute the plan in Plan.md with checkpoints after each section."

## What's New in v2.0

- **Progress Tracking** — Dynamic gauge bar that advances per completed plan step, displayed throughout execution
- **Error Handling** — Handles plan ambiguity, missing files, failed steps, and mid-plan interruptions with resume and rollback guidance
- **EVals** — `evals/evals.json` with 3 realistic test cases; `evals/trigger-eval.json` with 20 queries (10 trigger / 10 no-trigger) for description optimization
- **Standardized description** — SKILL.md description updated to Anthropic skill-creator format

---

## Metadata

| Field | Value |
|-------|-------|
| Version | 2.1.0 |
| Author | Eric Andrade |
| Created | 2026-02-20 |
| Updated | 2026-03-19 |
| Platforms | GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, AdaL CLI |
| Category | planning |
| Tags | planning, execution, checkpoints, implementation |
| Risk | safe |
