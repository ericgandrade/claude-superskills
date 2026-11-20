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

## What's New in v3.0

- **Agentic SDLC DE stage** — plans from an approved SPEC revision; CP3 approval recorded in CHECKPOINTS.md
- **Task graph** — tracer-bullet vertical slices with `Satisfies: AC-n`, `Implements: ADR`, `Blocked by:` edges
- **Wide refactors** — expand → migrate → contract sequencing
- **Coverage check** — every acceptance criterion has a task, every task serves a criterion or is an explicit enabler
- **Traceable commits** — commit messages carry `[Tn, AC-n]`
- **Fixed handoff** — points to `executing-plans` (subagent or inline mode) instead of external skill names

## Influences

- **Superpowers** (MIT): `writing-plans` — bite-sized TDD steps, exact paths and commands, zero-context executor.
- **Matt Pocock — skills** (MIT): `to-tickets` — tracer-bullet slices, blocking edges, expand–contract for wide refactors, prefactoring.
- **Addy Osmani — agent-skills** (MIT): `planning-and-task-breakdown` — ordered, sized tasks.

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Requirements Analysis → Step Sequencing → Dependency Mapping → Plan Review) displayed during execution
- **EVals** — `evals/evals.json` with 3 realistic test cases; `evals/trigger-eval.json` with 20 queries (10 trigger / 10 no-trigger) for description optimization
- **Standardized description** — SKILL.md description updated to Anthropic skill-creator format

---

## Metadata

| Field | Value |
|-------|-------|
| Version | 3.0.0 |
| Author | Eric Andrade |
| Created | 2026-02-20 |
| Updated | 2026-11-19 |
| Platforms | GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, AdaL CLI |
| Category | planning |
| Tags | agentic-sdlc, planning, implementation-plan, task-graph, task-breakdown, tdd |
| Risk | safe |
