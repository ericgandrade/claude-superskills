# senior-solution-architect

Comprehensive authority for designing, reviewing, and documenting complex software architectures using C4 modeling and ADRs.

## When to use

- Designing new systems or microservices.
- Documenting existing infrastructure using C4 models.
- Formalizing technical decisions through Architecture Decision Records (ADRs).
- Performing deep technical reviews of repositories.

## What is included

- `SKILL.md` — Unified architecture workflow combining C4 modeling, ADRs, and system design reviews
- `templates/` — MADR and Y-Statement templates for Architecture Decision Records
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical invocation

- "Use senior-solution-architect to design a migration to microservices."
- "Review this repository and create an ADR for our database choice."
- "Generate a C4 model for our new event-driven architecture."
- "Document the architectural decision for using PostgreSQL over MongoDB."

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Context Discovery → Architecture Analysis → C4 Modeling / ADR Writing → Design Review) displayed during execution
- **EVals** — `evals/evals.json` with 3 realistic test cases; `evals/trigger-eval.json` with 20 queries (10 trigger / 10 no-trigger) for description optimization
- **Standardized description** — SKILL.md description updated to Anthropic skill-creator format

## What's New in v2.2

- **Agentic SDLC DE stage** — inputs, outputs and CP3 behavior when invoked by the router
- **ADR conventions** — `docs/adr/NNNN-<slug>.md`, status lifecycle, supersede instead of edit, links to SPEC and `AC-n`
- Standard sections (Purpose, When to Use, Example Usage) added

## Influences

- **BMad Method** (MIT): `bmad-architecture` — short, decision-focused architecture documents.
- **Addy Osmani — agent-skills** (MIT): `documentation-and-adrs`, `api-and-interface-design`.

---

## Metadata

| Field | Value |
|-------|-------|
| Version | 2.2.0 |
| Author | Eric Andrade |
| Created | 2026-03-01 |
| Updated | 2026-11-19 |
| Platforms | GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, AdaL CLI |
| Category | architecture |
| Tags | agentic-sdlc, architecture, c4-model, adr, systems-design, clean-architecture |
| Risk | safe |
