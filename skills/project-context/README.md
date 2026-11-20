# project-context

Plan-stage (PL) foundation of the **Agentic SDLC**: gives every agent session in a repository the same verified starting context — commands, conventions, the quality bar, domain vocabulary and known agent pitfalls.

## When to use

- Set up, adopt, refresh or audit `AGENTS.md` / `CLAUDE.md`.
- Write a `CONSTRAINTS.md` quality bar that agents cannot quietly lower.
- Build a `GLOSSARY.md` when domain words are ambiguous.
- Record an agent mistake so the next session avoids it.

## What is included

- `SKILL.md` — modes: setup, adopt, refresh, constraints, glossary, pitfall, audit
- `evals/evals.json` — 3 scenarios (setup, constraints, adopt)
- `evals/trigger-eval.json` — 14 trigger queries (8 positive, 6 negative)

## Typical invocation

- "Set up agent instructions for this repo."
- "Agents keep adding ts-ignore — write a quality bar."
- "Record this mistake so it doesn't happen again."
- "Build a glossary for the billing domain."

## Influences

- **BMad Method** (MIT): `bmad-project-context` — managed instruction block, adoption ledger, verified commands, recorded pitfalls.
- **Addy Osmani — agent-skills** (MIT): `constraint-driven-development` — CONSTRAINTS.md floor, enforced checks with commands, ratchets, exceptions, sane defaults; `context-engineering`.
- **Matt Pocock — skills** (MIT): `domain-modeling` — glossary discipline; `retro` — environment improvements over code fixes.

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
| Tags | agentic-sdlc, agents-md, claude-md, constraints, glossary, context-engineering |
| Risk | safe |
