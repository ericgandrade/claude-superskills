# agentic-sdlc

Router for the **Agentic SDLC**: spec-first, evidence-based AI-assisted software delivery run as a continuous cycle of eight stages, each with an AI agent role and a named human checkpoint.

| AI agent | Stage | Human checkpoint |
|---|---|---|
| Triage Agent — scores readiness, prioritizes, sizes | **PL** Plan | 👤 Product owner — CP1 approves scope & route |
| Analyst Agent — interviews, writes the SPEC (AC-n) | **AN** Analyze | 👤 Product owner — CP2 approves the SPEC (frozen) |
| Architect Agent — ADRs, task graph | **DE** Design | 👤 Tech lead — CP3 signs off design & plan |
| Coding Agent — TDD slices, commits, PR | **BU** Build | 🔁 Bounded auto-retry (max 5 rounds, then escalate) |
| QA Agent — tests from the SPEC, evidence per AC-n | **TE** Test | 🔁 Bounded auto-retry |
| Review Agent — multi-axis review, security | **RV** Review | 👤 Engineer — CP4 approves the PR |
| Release Agent — flags, staged rollout, rollback | **DP** Deploy | 👤 Release manager — CP5 approves prod release |
| SRE Agent — SLOs, incidents, postmortems | **OP** Operate | 👤 On-call engineer — owns incidents |

Operate feeds incidents, postmortem actions and measured indicators back into Plan. One rule ties the cycle together: **every requirement is proven** — acceptance-criterion IDs (`AC-n`) trace SPEC → tasks → commits → tests → evidence → PR approval → release → indicators.

## When to use

- Start a feature, change, bug fix or modernization with a disciplined path from request to production.
- Ask "what's next?" on software work, or resume from existing SPEC / PLAN / CHECKPOINTS artifacts.
- Handle a requirement change after the SPEC was approved.
- Enter a stage directly: plan, analyze, design, build, test, review, deploy, operate.

## Routes

| Route | When | Checkpoints |
|---|---|---|
| Quick | Clear, low-risk, ~1 file or well-understood bug | CP1–CP3 collapse into one confirmation; CP4 = PR approval; CP5 only if production deploys |
| Standard | Fits one session | CP1+CP2 may share one conversation; CP3–CP5 separate |
| Full | Multi-session, high-risk, regulated, brownfield | Every checkpoint separate; OP watch period and retrospective mandatory |

## Stage skills

| Stage | Skills |
|---|---|
| PL Plan | `issue-triage`, `project-context`, `brainstorming` |
| AN Analyze | `grill-me`, `spec-driven-development`, `codebase-modernization`, `security-hardening` |
| DE Design | `senior-solution-architect`, `writing-plans` |
| BU Build | `executing-plans`, `test-driven-development`, `systematic-debugging` |
| TE Test | `test-strategy`, `verification-gate` |
| RV Review | `multi-axis-code-review`, `security-hardening` |
| DP Deploy | `deployment-pipeline`, `shipping-and-handover` |
| OP Operate | `operations-and-incidents`, `retrospective` |

## What is included

- `SKILL.md` — routing workflow: state detection, triage and sizing, stage sequencing, checkpoints, bounded loops, progress display
- `references/lifecycle.md` — the cycle, stages, checkpoints, routes, automatic loops, "every requirement is proven" rule
- `references/agents.md` — the eight agent roles, limits, report status vocabulary, severity scale
- `references/rules.md` — non-negotiable rules, red flags, change protocol
- `references/artifacts.md` — templates: TRIAGE, SPEC, PLAN, TEST-PLAN, VERIFICATION, TRACEABILITY, CHECKPOINTS, HANDOVER, OPERATIONS, RETRO, ADR, CONSTRAINTS, AGENTS.md block
- `references/phase-boundaries.md` — continue / delegate / clear / hand off / compact decision guide
- `evals/` — scenarios and trigger queries

## Typical invocation

- "Build the CSV export with the Agentic SDLC."
- "Where are we on the payments refactor? What's next?"
- "Requirements changed after the SPEC was approved — handle it."
- "An incident in production created new work — bring it into the cycle."

## Related approaches

The Agentic SDLC keeps the core idea of the classic V-model — every definition has a matching proof — as an explicit traceability rule inside a continuous delivery cycle. Other frameworks for AI-assisted engineering exist, including V-model-based ones such as **Agile V™** by Christopher Koch (CC BY-SA 4.0); the Agentic SDLC was designed independently and contains no Agile V content. See `THIRD_PARTY_NOTICES.md`.

## Influences

- **Addy Osmani — agent-skills** (MIT): DEFINE → SHIP lifecycle and stage entry points; gate turn rule; orchestration patterns.
- **BMad Method** (MIT): right-sized routes; change impact analysis; root-cause routing of review findings.
- **Matt Pocock — skills** (MIT): flow map; phase boundaries and context hygiene; handoff.
- **Superpowers** (MIT): hard gates, anti-rationalization tables, bounded fix loop.

Detailed mechanism tables are added in the depth pass (see `docs/plans/2026-11-19-agentic-sdlc-depth-pass.md`).

---

## Metadata

| Field | Value |
|-------|-------|
| Version | 1.0.0 |
| Author | Eric Andrade |
| Created | 2026-11-19 |
| Updated | 2026-11-20 |
| Platforms | GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, AdaL CLI |
| Category | orchestration |
| Tags | agentic-sdlc, sdlc, spec-driven, ai-agents, human-in-the-loop, traceability, workflow, router |
| Risk | safe |
