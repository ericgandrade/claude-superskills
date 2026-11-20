# spec-driven-development

Analyze-stage (AN) skill of the **Agentic SDLC**: writes the SPEC — objectives, numbered acceptance criteria (`AC-n`), boundaries, rollback and success indicators — and runs **CP2**. The approved revision is frozen and becomes the baseline every later artifact traces back to.

## When to use

- Before building any non-trivial feature, change or migration.
- To turn a brainstorming brief, grill-me summary or conversation into buildable requirements.
- To validate a spec before approval, or revise one after a requirement change.
- To split a large initiative into module specs (capability map).

## Modes

| Mode | Use when |
|---|---|
| create | Short interview needed |
| synthesize | Answers already exist in the conversation or brief |
| validate | Check an existing spec before CP2 |
| revise | Change an approved spec via the change protocol |

## What is included

- `SKILL.md` — scope check, assumptions, SPEC sections, acceptance-criteria rules, doubt pass, CP2, revise and validate modes
- `evals/evals.json` — 3 scenarios (synthesize, validate, revise)
- `evals/trigger-eval.json` — 14 trigger queries (8 positive, 6 negative)

## Typical invocation

- "Write the spec for the CSV export."
- "Turn this conversation into a SPEC."
- "Validate this spec before we approve it."
- "Requirements changed — revise the spec."

## Influences

- **Addy Osmani — agent-skills** (MIT): `spec-driven-development` — gated workflow, scope check with capability map, assumptions first, always/ask-first/never boundaries; `doubt-driven-development` — fresh-context adversarial review.
- **Matt Pocock — skills** (MIT): `to-spec` — synthesize the conversation into a spec without re-interviewing.
- **BMad Method** (MIT): `bmad-spec` / `bmad-prd` — spec creation, validation and update modes.

---

## Metadata

| Field | Value |
|-------|-------|
| Version | 1.0.0 |
| Author | Eric Andrade |
| Created | 2026-11-19 |
| Updated | 2026-11-19 |
| Platforms | GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, AdaL CLI |
| Category | planning |
| Tags | agentic-sdlc, specification, acceptance-criteria, requirements, spec-driven |
| Risk | safe |
