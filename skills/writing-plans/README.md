# writing-plans

Converts specs or requirements into a detailed, executable implementation plan before touching any code.

## When to use

- Turn a feature spec into a step-by-step implementation plan.
- Break down a complex task into reviewable steps before execution.
- Produce a plan for review before delegating to `executing-plans`.
- Estimate effort and sequence dependencies before starting work.

## What is included

- `SKILL.md` — End-to-end plan-writing workflow with dependency mapping, step sequencing, and rollback strategy
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical invocation

- "Write an implementation plan for adding JWT authentication."
- "Create a plan for migrating this app from REST to GraphQL."
- "Plan the refactor of the payment module before we start coding."
- "Write a detailed migration plan to AWS — don't execute yet, just plan."

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Requirements Analysis → Step Sequencing → Dependency Mapping → Plan Review) displayed during execution
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
| Tags | planning, implementation-plan, task-breakdown, tdd |
| Risk | safe |
