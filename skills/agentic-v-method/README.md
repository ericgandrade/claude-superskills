# agentic-v-method

Router for the **Agentic V-Method**: spec-first, evidence-based AI-assisted software delivery that runs the classic software engineering lifecycle — **Plan · Analyze · Design · Build · Test · Deploy** — in a V shape with three human approval gates.

```
  PL  Plan ───────────────────────────── DP  Deploy
       AN  Analyze ───────────────── TE  Test
            DE  Design ───────── (design review)
                      BU  Build
```

The left arm defines what must be true, the bottom builds it test-first, and the right arm proves each left-arm commitment. Acceptance-criterion IDs (`AC-n`) link SPEC → PLAN → commits → tests → evidence → release.

## When to use

- Start a feature, change, bug fix or modernization with a disciplined path from idea to release.
- Ask "what's next?" on software work, or resume from existing SPEC / PLAN / GATES artifacts.
- Handle a requirement change after the SPEC was approved.
- Enter a stage directly: plan, analyze, design, build, test, deploy.

## Routes

| Route | When | Stages |
|---|---|---|
| Quick | Clear, low-risk, ~1 file or well-understood bug | PL (mini) → BU → TE → DP |
| Standard | Fits one session | All six, short SPEC, three gates |
| Full | Multi-session, high-risk, regulated, brownfield | All six at full depth, subagents, retrospective |

## Stage skills

| Stage | Skills |
|---|---|
| PL Plan | `project-context`, `brainstorming` |
| AN Analyze | `grill-me`, `spec-driven-development`, `codebase-modernization`, `security-hardening` |
| DE Design | `senior-solution-architect`, `writing-plans` |
| BU Build | `test-driven-development`, `executing-plans`, `systematic-debugging` |
| TE Test | `test-strategy`, `verification-gate`, `multi-axis-code-review`, `security-hardening` |
| DP Deploy | `deployment-pipeline`, `shipping-and-handover`, `retrospective` |

## What is included

- `SKILL.md` — routing workflow: state detection, sizing, stage sequencing, gates, progress display
- `references/v-model.md` — the V, stage table, pairings, traceability chain, gates, routes
- `references/rules.md` — eight non-negotiable rules, red flags, change protocol
- `references/artifacts.md` — templates: SPEC, PLAN, TEST-PLAN, VERIFICATION, TRACEABILITY, GATES, HANDOVER, RETRO, ADR, CONSTRAINTS, AGENTS.md block
- `references/phase-boundaries.md` — continue / delegate / clear / hand off / compact decision guide
- `evals/evals.json` — 3 scenarios (new feature, resume, change protocol)
- `evals/trigger-eval.json` — 18 trigger queries (10 positive, 8 negative)

## Typical invocation

- "Build the CSV export with the Agentic V-Method."
- "Where are we on the payments refactor? What's next?"
- "Requirements changed after Gate 1 — handle it."
- "Run the V-Method on this bug."

## Relationship to other V-model approaches

The V-model is a long-established software engineering lifecycle in which each specification level is paired with a verification level. Other V-model-based approaches for AI-assisted engineering exist, notably **Agile V™** by Christopher Koch (CC BY-SA 4.0). The Agentic V-Method was designed independently and contains no Agile V content; see `THIRD_PARTY_NOTICES.md`.

## Influences

- **Addy Osmani — agent-skills** (MIT): DEFINE → SHIP lifecycle and stage entry points; `using-agent-skills` routing.
- **BMad Method** (MIT): right-sized routes; `bmad-correct-course` change impact analysis; `bmad` help routing.
- **Matt Pocock — skills** (MIT): `ask-matt` flow map; phase boundaries and context hygiene; `handoff`.
- **Superpowers** (MIT): hard gates and anti-rationalization tables.

---

## Metadata

| Field | Value |
|-------|-------|
| Version | 1.0.0 |
| Author | Eric Andrade |
| Created | 2026-11-19 |
| Updated | 2026-11-19 |
| Platforms | GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, AdaL CLI |
| Category | orchestration |
| Tags | agentic-v-method, sdlc, spec-driven, v-model, traceability, workflow, router |
| Risk | safe |
