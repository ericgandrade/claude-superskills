# brainstorming

Pre-implementation ideation skill that generates structured design options for features, components, and behaviors before writing any code.

## When to use

- Explore design alternatives before starting implementation.
- Define requirements and constraints for a new feature.
- Break down a complex problem into concrete options.
- Align on approach before touching the codebase.

## What is included

- `SKILL.md` — End-to-end brainstorming workflow with structured design options and trade-off analysis
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical invocation

- "Brainstorm how to add a dark mode toggle to this app."
- "Help me design the data model for a multi-tenant SaaS."
- "What are the options for implementing real-time notifications?"
- "Ideate on approaches before I start building the auth system."

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Problem Framing → Option Generation → Trade-off Analysis → Recommendation) displayed during execution
- **EVals** — `evals/evals.json` with 3 realistic test cases; `evals/trigger-eval.json` with 20 queries (10 trigger / 10 no-trigger) for description optimization
- **Standardized description** — SKILL.md description updated to Anthropic skill-creator format

---

## Metadata

| Field | Value |
|-------|-------|
| Version | 2.0.0 |
| Author | Eric Andrade |
| Created | 2026-02-20 |
| Updated | 2026-03-19 |
| Platforms | GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, AdaL CLI |
| Category | planning |
| Tags | brainstorming, design, requirements, pre-implementation |
| Risk | safe |
