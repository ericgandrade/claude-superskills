# Agentic SDLC Implementation Plan

> ⛔ **SUPERSEDED (2026-11-20) by `docs/plans/2026-11-20-agentic-sdlc-execution-plan.md` (decision D10).** This file describes the earlier V-shaped design and is kept for history only. Do not execute it.

> ⚠️ **Design superseded (2026-11-20):** this master plan describes the earlier **V-shaped, six-stage** design (then called "Agentic V-Method"). The owner replaced it with the **Agentic SDLC**: a continuous cycle of eight stages (PL · AN · DE · BU · TE · RV · DP · OP), one AI agent role per stage, named human checkpoints CP1–CP5 and an Operate → Plan feedback loop (decision D8). Authoritative design: `skills/agentic-sdlc/references/lifecycle.md` and `references/agents.md`; execution plan: `docs/plans/2026-11-19-agentic-sdlc-depth-pass.md`. Names in this file were updated mechanically; V-specific sections (§3) are kept for history only. Sections §1 (business alignment), §2 (framework evaluation) and the license/naming rules remain valid.

> **For Claude:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task-by-task.
> **Status:** Wave 0 and a first (shallow) Wave 1 done. **Execution continues in `docs/plans/2026-11-19-agentic-sdlc-depth-pass.md`**, which supersedes the wave order below from Wave 1 onward. Design (§3), inventory (§4) and decisions (§9) here remain authoritative.

**Goal:** Turn claude-superskills into the home of the **Agentic SDLC**, a definitive, portable, spec-first AI software delivery method that runs the classic software engineering lifecycle (Plan · Analyze · Design · Build · Test · Deploy) in a V shape, combining the strongest ideas of Superpowers, Matt Pocock's skills, Addy Osmani's agent-skills and the BMad Method.

**Architecture:** A V-shaped lifecycle of six stages — **PL** Plan · **AN** Analyze · **DE** Design · **BU** Build · **TE** Test · **DP** Deploy — where the left arm defines (objectives, specification, design), the bottom builds, and the right arm proves each left-arm commitment, linked end to end by acceptance-criterion IDs (`AC-n`). Three human approval gates separate the stages. One router skill (`agentic-sdlc`) sizes the work and drives the stages; focused skills hand off through durable Markdown artifacts in the user's repository. Existing skills are upgraded in place (names kept for backward compatibility); new skills fill the gaps. Everything stays plain `SKILL.md` + `references/`, with no runtime dependency, so it keeps working on all 8 platforms.

**Tech Stack:** Markdown skills (minimal YAML frontmatter), JSON eval fixtures, existing shell validators, Python catalog/index generators, `scripts/release.js`.

---

## 1. Context and Motivation

### 1.1 Business alignment (Business Plan Addendum, November 2026)

The Addendum describes how Andrade Consulting Services will deliver its services. The Agentic SDLC is the engineering practice behind those statements, made executable by AI agents:

| Addendum statement | Where it lives in the Agentic SDLC |
|---|---|
| §3.1 *Evidence before recommendation* — every finding traced to inventory, configuration, documentation or code | Right arm of the V (TE/DP); `verification-gate`; traceability matrix |
| §3.1 *Specification before change* — scope, acceptance criteria and rollback agreed before any system is modified | AN stage: SPEC.md requires acceptance criteria + rollback; **CP2** |
| §3.1 *AI-assisted, human-accountable* — an engineer approves every material finding and change | Three human gates; "facts are the agent's job, decisions are the human's" rule |
| §3.1 *Protection of health information* | `security-hardening` sensitive-data guardrails (no PHI/PII/secrets in prompts, fixtures or logs) |
| §3.1 *Operational handover* — decision records, tests and runbooks | DP stage: `shipping-and-handover` (ADRs, runbook, HANDOVER.md) |
| §3.1 *Measured outcomes* — baseline and indicators at start, reviewed at close | PL ↔ DP pair of the V: indicators set in PL/SPEC, measured in `retrospective` |
| §3.3 *Controlled modernization* — inventory, dependency map, retire/retain/upgrade/re-platform/migrate, bounded change, rollback | `codebase-modernization` |
| §3.4 NIST SP 800-218 (SSDF) as secure development reference | SSDF practice mapping in `security-hardening` and the security lens of `multi-axis-code-review` |
| §4.4 *AI-assisted delivery based on writing specifications before generating and reviewing implementation work* | The whole method |

> **Integrity rules:** (1) Do not backdate anything; the Business Plan cites only what is published at the time of filing. (2) No compliance or certification claims in public docs. (3) The method is built from public, openly licensed sources credited in `THIRD_PARTY_NOTICES.md`; it uses no employer-proprietary material or names.

### 1.2 Current state of this repo (v2.0.8, 18 skills)

Already present and relevant: `brainstorming`, `writing-plans`, `executing-plans` (all derived from early Superpowers), `grill-me` (from Matt Pocock), `senior-solution-architect` (ADRs/C4), `agent-skill-orchestrator`, `skill-creator`. Missing: spec discipline, TDD, debugging, test strategy, verification, review, security, deployment, shipping/handover, retrospective, brownfield modernization, and a router that ties them into one lifecycle.

---

## 2. Framework Evaluation

Sources reviewed (shallow clones, November 18, 2026):

| Framework | Repo | License | Skills reviewed | Use in this plan |
|---|---|---|---|---|
| Superpowers (Jesse Vincent) | `obra/superpowers` | MIT | 15 | Ideas + adapted content (credited) |
| Matt Pocock skills | `mattpocock/skills` | MIT | 25 stable | Ideas + adapted content (credited) |
| Addy Osmani agent-skills | `addyosmani/agent-skills` | MIT | 25 | Ideas + adapted content (credited) |
| BMad Method v7 preview | `bmad-code-org/BMAD-METHOD` | MIT | 29 | Ideas + adapted content (credited) |
| Agile V™ (Christopher Koch) | `Agile-V/agile_v_skills` | **CC BY-SA 4.0** | 49 | **Concepts only — no text copied or adapted** (share-alike is incompatible with this repo's MIT license) |

### 2.1 Scorecard (1 = weak, 5 = strong)

| Criterion | Superpowers | Matt Pocock | Addy Osmani | BMad v7 | Agile V | Notes |
|---|:-:|:-:|:-:|:-:|:-:|---|
| Lifecycle coverage (idea → ship → learn) | 4 | 4 | 5 | 5 | 4 | Addy and BMad cover shipping; Superpowers stops at branch finish |
| Enforcement strength (hard gates, anti-rationalization) | **5** | 3 | 4 | 3 | **5** | Superpowers' iron laws; Agile V's human gates with recorded authority |
| Right-sizing (small change ≠ full ceremony) | 2 | 4 | 3 | **5** | 4 | BMad routes oneshot vs full; Agile V risk-scaled controls |
| Durable artifacts / context carry-over | 3 | **5** | 4 | **5** | **5** | Matt: GLOSSARY + ADR + tickets; BMad: brief → PRD → architecture → stories |
| Traceability (requirement → code → test → release) | 2 | 3 | 3 | 3 | **5** | Agile V typed links are the reference point |
| Multi-agent execution | **5** | 4 | 2 | 4 | 4 | Superpowers subagent-driven dev with 2-stage review; Matt parallel frontier |
| Review / verification quality | 4 | 4 | **5** | 4 | **5** | Addy five-axis; Agile V independent verifier |
| Security / production readiness | 1 | 1 | **5** | 2 | 4 | Addy security, shipping, CI/CD, observability |
| Brownfield / legacy support | 2 | 3 | 4 | **5** | 3 | BMad project-context; Addy deprecation-and-migration |
| Portability (8 platforms, no runtime deps) | 4 | 3 | **5** | 1 | 4 | BMad v7 requires `uv` + `_bmad/scripts/render_skill.py` per skill |
| Token economy | 3 | **5** | 3 | 3 | 2 | Matt's skills are short and compose a shared primitive |

### 2.2 Best ideas to absorb (by source)

**Superpowers**
- Iron-law TDD with rationalization table ("too simple to test", "I'll test after") → `test-driven-development`
- `verification-before-completion`: no success claim without fresh command output → `verification-gate`
- `subagent-driven-development`: fresh subagent per task, then **spec-compliance review** followed by **code-quality review** → `executing-plans` subagent mode
- `systematic-debugging` four phases; "3 failed fixes → question the architecture" → `systematic-debugging`
- `receiving-code-review`: technical rigor, no performative agreement → `multi-axis-code-review` receive mode
- `using-git-worktrees`, `finishing-a-development-branch` (merge / PR / keep / discard) → `executing-plans`, `shipping-and-handover`

**Matt Pocock**
- `grilling` primitive: one question at a time, frontier of open decisions, *facts are the agent's job, decisions are the human's* → `grill-me` + router rule
- `grill-with-docs`: interview leaves GLOSSARY.md + ADRs → `grill-me` docs mode, `project-context`
- `to-spec`: synthesize the conversation into a spec without re-interviewing → `spec-driven-development` synthesis mode
- `to-tickets`: tracer-bullet tasks with explicit **blocking edges** → `writing-plans`
- `implement-spec`: run the ready frontier of the task graph in parallel on one integration branch → `executing-plans`
- `code-review` two axes (Standards + Spec) in parallel subagents → `multi-axis-code-review`
- `diagnosing-bugs`: refuse to theorize until a tight red feedback loop exists → `systematic-debugging`
- `retro`: improve the *environment* (checks, standards, steering files), not the code → `retrospective`
- Phase boundaries / context hygiene (continue · clear · handoff · subagent · compact) → router reference
- `prototype` detour for questions that cannot be settled on paper → `brainstorming`

**Addy Osmani**
- DEFINE → PLAN → BUILD → VERIFY → REVIEW → SHIP lifecycle with stage commands → stage entry points in the router
- `spec-driven-development`: objectives, scope, boundaries (**always / ask first / never**) → `spec-driven-development`
- `constraint-driven-development`: CONSTRAINTS.md as a written quality-bar contract; detect a weakened bar in diffs → `project-context` + review lens
- `doubt-driven-development`: fresh-context adversarial review of non-trivial decisions → "doubt pass" in spec and review
- `incremental-implementation`: thin verifiable slices, feature flags → `executing-plans`
- `code-review-and-quality` five axes; `security-and-hardening` (OWASP); `shipping-and-launch` (staged rollout, rollback); `ci-cd-and-automation` + `observability-and-instrumentation`; `documentation-and-adrs` (drift detection); `source-driven-development` (official docs first); `deprecation-and-migration` (expand/contract) → review, security, deployment, shipping, modernization skills

**BMad Method**
- Right-sized routes: small clear changes go straight to build; complex work gets planning depth → router sizing (Quick / Standard / Full)
- `bmad-project-context`: AGENTS.md block + recorded agent pitfalls → `project-context`
- `bmad-correct-course`: impact analysis when requirements change mid-flight → router change protocol
- `bmad-retrospective`: evidence-sourced findings + **acceptance decision** → `retrospective`
- `bmad-review` lenses (adversarial, edge cases, verification gaps) → `multi-axis-code-review`
- `bmad-qa-generate-e2e-tests`: E2E/API tests following the existing harness → `test-strategy`
- `bmad-walkthrough`: guide a human reviewer through what to inspect and how to test → `shipping-and-handover`
- `bmad-architecture`: short decision-focused architecture doc → integrate with `senior-solution-architect`

**Agile V (concepts only, written in our own words)**
- A reviewed SPEC revision becomes a **frozen baseline** for the build; later changes go through the change protocol
- **Independent test design**: tests are derived from the SPEC by a separate pass/agent, not from the implementation
- **The builder does not grade its own output**: verification by a separate reviewer context
- **Gate records**: each human gate records who approved, on what evidence, with what residual risk
- Risk-scaled controls → feeds the Quick / Standard / Full sizing

### 2.3 Deliberately NOT adopted

| Idea | Reason |
|---|---|
| BMad runtime renderer (`uv run render_skill.py`, `_bmad/` config) | Breaks portability across 8 platforms; adds install friction |
| Superpowers "invoke a skill before ANY response" meta-rule | Over-triggers, wastes tokens; the router is opt-in and size-aware |
| Named personas (Mary, Winston, Amelia…) and party mode | Theatrical; kept only as optional *review lenses* |
| Mandatory issue-tracker setup (Matt) | Local Markdown task files are the default; trackers are optional |
| Any Agile V text, templates or skill files | CC BY-SA 4.0 share-alike; "Agile V" is a claimed trademark — never used in names or copy |
| Frontend/perf/browser-devtools skills (Addy) | Out of scope for the core method; candidates for a later bundle |

### 2.4 Naming and differentiation

- The method name is **Agentic SDLC**. "V-Model" is a generic software engineering term (German V-Modell, 1980s); the word "Agile" is never part of our name, to stay clearly distinct from Agile V™ and the `agentic-agile-v` project.
- README includes a short "Relationship to other V-model approaches" note crediting Agile V as related prior work.
- Before the name is cited in the Business Plan, the owner runs a USPTO trademark search (ideally with counsel). A web search is not a trademark clearance.

---

## 3. The Agentic SDLC

### 3.1 The V

```
  Agentic SDLC — define on the left, prove on the right, linked by AC-n

  PL  Plan ─────────────────────────────────────────────── DP  Deploy
   objectives, route, indicators                          release, handover, indicators measured
       AN  Analyze ───────────────────────────────── TE  Test
        SPEC, acceptance criteria AC-n               evidence per AC-n, security, review
     [CP2: SPEC approved]                        [CP4: every AC proven, no Critical findings]
            DE  Design ─────────────────────── (TE: design/standards review)
             architecture, ADRs, PLAN
          [CP3: PLAN approved]
                        BU  Build
                   TDD slices, subagents, commits

  retrospective (DP) ──▶ learnings feed PL of the next cycle (project-context)
```

Each left-arm commitment has a right-arm proof: PL objectives/indicators ↔ DP measured outcomes; AN acceptance criteria ↔ TE evidence; DE design decisions ↔ design/standards review. The `AC-n` IDs run through every artifact, producing a traceability matrix.

### 3.2 Lifecycle stages

| Stage | V arm | Question it answers | Skills | Artifact | Exit criterion / gate |
|---|---|---|---|---|---|
| **PL** Plan | Left | Why, for whom, how big, which route? | `agentic-sdlc` (sizing), `project-context`, `brainstorming` | Route decision; AGENTS.md block; CONSTRAINTS.md; design brief; target indicators | Route approved by human |
| **AN** Analyze | Left | What exactly must be true when done? | `grill-me` (docs mode), `spec-driven-development`, `codebase-modernization` (inventory mode), `security-hardening` (threats, sensitive data) | SPEC.md (ACs, boundaries, rollback, baseline + indicators); GLOSSARY.md | **CP2:** SPEC approved → frozen baseline |
| **DE** Design | Left | How will it be built and in what order? | `senior-solution-architect`, `writing-plans`, `security-hardening` (secure design) | ADRs; architecture notes; PLAN.md task graph (each task → `AC-n`) | **CP3:** PLAN approved |
| **BU** Build | Bottom | Build it, slice by slice, test-first | `test-driven-development`, `executing-plans`, `systematic-debugging`, `codebase-modernization` (change mode) | Code + tests + atomic commits (each → `AC-n`/task) | All tasks done, tests green |
| **TE** Test | Right | Does it provably meet the SPEC, safely? | `test-strategy`, `verification-gate`, `multi-axis-code-review`, `security-hardening` (review lens) | TEST-PLAN.md; VERIFICATION.md; TRACEABILITY.md; review findings | **CP4:** every AC has evidence; no open Critical findings |
| **DP** Deploy | Right | Ship it, operate it, learn from it | `deployment-pipeline`, `shipping-and-handover`, `retrospective` | PR/release notes; rollout + rollback plan; HANDOVER.md + runbook; RETRO.md | Released (or PR merged) + handover accepted |

### 3.3 Sizing routes (decided in PL)

| Route | When | Stages |
|---|---|---|
| **Quick** | Clear, low-risk, ≤ ~1 file or a well-understood bug | PL (mini) → BU (TDD) → TE (verification-gate, light review) → DP (commit/PR) |
| **Standard** | A feature or change that fits one session | PL → AN (short SPEC) → DE (PLAN) → BU → TE → DP |
| **Full** | Multi-session, cross-cutting, risky, or brownfield modernization | PL (project-context) → AN (grill-with-docs + SPEC + inventory) → DE (architecture/ADRs + task graph) → BU (subagent execution) → TE (independent test design + verification + multi-axis review + security) → DP (pipeline, staged rollout, handover, retrospective) |

The router shows progress as `PL ▸ AN ▸ DE ▸ BU ▸ TE ▸ DP` and accepts direct stage entry (`plan`, `analyze`, `design`, `build`, `test`, `deploy`), resuming from artifacts already in the repo.

### 3.4 Non-negotiable rules (shared across all method skills)

1. **Specification before change** — no production code before an approved SPEC (Standard/Full) or an agreed acceptance test (Quick).
2. **Evidence before claims** — never say "done/fixed/passing" without fresh command output in the same turn.
3. **Human-accountable** — the agent gathers facts; the human makes decisions. Gates record who approved and on what evidence.
4. **Test first** — red → green → refactor; a bug fix starts with a failing regression test.
5. **Builder does not grade itself** — verification and review run in a separate context whenever the platform allows it.
6. **Rollback always** — every SPEC states how to undo the change.
7. **Sensitive data stays out** — no secrets, PHI or PII in prompts, fixtures, logs or commits.
8. **Trace everything** — `AC-n` IDs link SPEC → PLAN → commits → tests → evidence → release.

### 3.5 Artifact conventions (in the user's project, discovered first — zero-config)

```
<project>/
├── AGENTS.md / CLAUDE.md        # Agentic SDLC block: commands, conventions, pitfalls (project-context)
├── CONSTRAINTS.md               # quality bar contract (project-context)
├── GLOSSARY.md                  # domain vocabulary (grill-me docs mode)
├── docs/adr/NNNN-*.md           # decision records
└── docs/agentic-sdlc/<YYYY-MM-DD-feature>/
    ├── SPEC.md                  # AN: objectives, non-goals, AC-n, boundaries, rollback, baseline+indicators
    ├── PLAN.md                  # DE: task graph with blocking edges, each task → AC-n
    ├── tasks/NN-*.md            # optional one-file-per-task
    ├── TEST-PLAN.md             # TE: AC-n → test level → test case
    ├── VERIFICATION.md          # TE: evidence log — commands + outputs per AC-n
    ├── TRACEABILITY.md          # TE: matrix AC-n → task → commit → test → evidence → release
    ├── CHECKPOINTS.md                 # approvals: gate, approver, date, evidence, residual risk
    ├── HANDOVER.md              # DP: what changed, how to operate, runbook, open risks, indicators
    └── RETRO.md                 # DP: acceptance decision, indicators vs baseline, environment fixes
```

If the repo already has conventions (e.g., `docs/plans/`, `specs/`, an issue tracker), the skills adopt them instead of forcing these paths.

---

## 4. Target Skill Inventory (18 → 31)

| # | Skill | Stage | Action | Primary sources |
|---|---|---|---|---|
| 1 | `agentic-sdlc` | Router (all) | **NEW** | Addy lifecycle, BMad routes + correct-course, Matt ask-matt + phase boundaries |
| 2 | `project-context` | PL | **NEW** | BMad project-context, Addy context-engineering + constraint-driven, Matt domain-modeling |
| 3 | `brainstorming` | PL | UPGRADE | Superpowers brainstorming, Addy idea-refine, Matt prototype |
| 4 | `grill-me` | AN | UPGRADE | Matt grilling + grill-with-docs |
| 5 | `spec-driven-development` | AN | **NEW** | Addy spec-driven, Matt to-spec, BMad spec, Addy doubt-driven |
| 6 | `senior-solution-architect` | DE | MINOR UPGRADE | BMad architecture, Addy documentation-and-adrs + api-and-interface-design |
| 7 | `writing-plans` | DE | UPGRADE | Superpowers writing-plans, Matt to-tickets, Addy planning-and-task-breakdown |
| 8 | `test-driven-development` | BU | **NEW** | Superpowers TDD, Matt tdd + codebase-design, Addy TDD |
| 9 | `executing-plans` | BU | UPGRADE | Superpowers executing-plans + subagent-driven + worktrees, Matt implement-spec, Addy incremental-implementation |
| 10 | `systematic-debugging` | BU | **NEW** | Superpowers systematic-debugging, Matt diagnosing-bugs, Addy debugging-and-error-recovery |
| 11 | `codebase-modernization` | AN (inventory) + BU (change) | **NEW** | Addendum §3.3, Addy deprecation-and-migration, BMad existing-codebase path |
| 12 | `test-strategy` | TE | **NEW** | BMad qa-generate-e2e-tests, Addy testing guidance, Matt integration-first testing |
| 13 | `verification-gate` | TE | **NEW** | Superpowers verification-before-completion, Addy VERIFY phase |
| 14 | `multi-axis-code-review` | TE | **NEW** | Addy code-review-and-quality, Matt code-review, Superpowers requesting/receiving review, BMad review lenses |
| 15 | `security-hardening` | Cross-cutting (AN · DE · TE) | **NEW** | Addy security-and-hardening, NIST SP 800-218 SSDF, Addendum §3.1/§3.4 |
| 16 | `deployment-pipeline` | DP | **NEW** | Addy ci-cd-and-automation + observability-and-instrumentation + shipping-and-launch |
| 17 | `shipping-and-handover` | DP | **NEW** | Superpowers finishing-a-branch, Addy shipping-and-launch, Matt pr, BMad walkthrough |
| 18 | `retrospective` | DP (loops to PL) | **NEW** | Matt retro, BMad retrospective |
| — | `agent-skill-orchestrator` | — | MINOR UPGRADE | Recognize software-delivery requests and propose the Agentic SDLC |

Totals: **13 new**, **6 upgraded** (incl. orchestrator), 18 skills in the `agentic-sdlc` bundle; repository 18 → **31** skills.

Coverage check — every stage has at least two skills and one artifact: PL (3) · AN (3 + security) · DE (2 + security) · BU (4) · TE (4) · DP (3).

Naming notes: `multi-axis-code-review` avoids a collision with the built-in Claude Code `/code-review`; `security-hardening` avoids the built-in `/security-review`. Existing names are kept so current users do not break.

Absorbed (not separate skills): doubt-driven review → spec + review; handoff + correct-course → router; prototype → `brainstorming`; constraints → `project-context`; receiving review → `multi-axis-code-review`; independent test design → `test-strategy`; gate records → router + `references/artifacts.md`.

---

## 5. Per-Skill Specifications

Each skill follows repo rules: frontmatter only `name`, `description` ("This skill should be used when…", single line), `license: MIT`; sections Purpose / When to Use / Workflow / Critical Rules / Example Usage; 1500–2000 words ideal (max 5000), heavier material in `references/`; imperative voice, no second person; English only; README.md with `## Metadata` table and an `## Influences` section crediting sources. Every method skill states its stage (e.g., "Agentic SDLC · TE Test") in its Purpose section.

### 5.1 `agentic-sdlc` (router)
- **Step 0 — Detect state:** look for existing SPEC/PLAN/VERIFICATION/GATES in the repo and resume at the right stage.
- **Step 1 — Size (PL):** ask ≤3 questions (scope, risk, reversibility) → Quick / Standard / Full; show the route and get approval.
- **Step 2 — Drive stages:** invoke stage skills in order; enforce the three gates and §3.4 rules; record approvals in CHECKPOINTS.md; show `PL ▸ AN ▸ DE ▸ BU ▸ TE ▸ DP`.
- **Change protocol:** when requirements change after CP2 → impact analysis on SPEC/PLAN/tasks/tests → new SPEC revision → re-approval.
- **references/**: `lifecycle.md` (the V, stage-to-skill map, pairings, traceability, gates, routes), `phase-boundaries.md` (continue / delegate / clear / hand off / compact decision tree), `artifacts.md` (§3.5 templates), `rules.md` (§3.4 + change protocol).

### 5.2 `project-context` (PL)
- Modes: **setup** (scan repo: languages, build/test/lint commands, conventions → write the Agentic SDLC block in AGENTS.md/CLAUDE.md), **constraints** (interview the quality bar → CONSTRAINTS.md with default thresholds), **glossary**, **pitfall** (record an observed agent mistake), **audit** (detect drift between docs and repo).
- Rule: never overwrite user content outside a marked `<!-- AGENTIC-SDLC:BEGIN --> … <!-- AGENTIC-SDLC:END -->` block.

### 5.3 `brainstorming` (PL, upgrade)
- Keep: one question at a time, 2–3 approaches with trade-offs, design presented in short chunks, approval gate.
- Add: divergent → convergent pass, "prototype detour" when a question needs runnable answers, target indicators captured for the PL ↔ DP pair, explicit handoff to `spec-driven-development`, Quick-route bypass guidance.

### 5.4 `grill-me` (AN, upgrade)
- Keep explicit-trigger-only rule ("grill me" / "me grille"); allow invocation by the router.
- Add **docs mode**: when inside a repo, capture resolved terms into GLOSSARY.md and hard-to-reverse decisions as ADRs; show the frontier of open decisions each round.

### 5.5 `spec-driven-development` (AN)
- Modes: **create** (short interview), **synthesize** (from current conversation, no re-interview), **validate**, **revise** (new baseline revision after CP2).
- SPEC.md template: Problem & objectives · Non-goals · Users/actors · Acceptance criteria (Given/When/Then, numbered `AC-1…`) · Boundaries (Always / Ask first / Never) · Constraints referenced · Security & sensitive data · Risks & assumptions · **Rollback** · **Baseline & indicators** · Open questions · Revision history.
- **Doubt pass:** a fresh-context subagent (when available) attacks the spec for gaps before approval.
- CP2: no PLAN until SPEC approved; approved revision is frozen.

### 5.6 `senior-solution-architect` (DE, minor)
- Align ADR template/location with `docs/adr/NNNN-*.md`; add an "Agentic SDLC · DE Design" section describing inputs (SPEC) and outputs (ADRs, architecture notes referenced by PLAN).

### 5.7 `writing-plans` (DE, upgrade)
- Plan header points to `executing-plans`; each task references the `AC-n` it satisfies.
- Tasks are tracer-bullet vertical slices with `Blocked by:` edges → a task graph; optional `tasks/NN-*.md` files or tracker export.
- Keep: exact paths, exact commands, expected outputs, TDD steps, frequent commits.
- Fix stale reference: header currently says `superpowers:executing-plans` → `executing-plans`.

### 5.8 `test-driven-development` (BU)
- Iron law: no production code without a failing test first; delete code written before its test.
- Red-green-refactor with "watch it fail for the right reason"; vertical slices; integration over mock-heavy tests; deep-module seams.
- Rationalization table; bug-fix variant (regression test first); when-to-skip list (pure config/docs).

### 5.9 `executing-plans` (BU, upgrade)
- **Inline mode** (current behavior, batches + checkpoints).
- **Subagent mode**: fresh subagent per task with the task text + relevant SPEC excerpt; after each task, a spec-compliance review then a code-quality review; fix loop; parallel dispatch only across the ready frontier with no shared files.
- Workspace isolation (worktree or branch) before starting; commit messages carry task and `AC-n` references; stop conditions (blocked, failing verification, scope drift → change protocol).

### 5.10 `systematic-debugging` (BU)
- Phase 1: build a tight, deterministic red feedback loop (one command). Phase 2: pattern/diff analysis (last known good, bisect). Phase 3: single hypothesis, minimal test. Phase 4: fix + regression test + verification.
- Escalation: after 3 failed fixes, stop and question the architecture with the human.

### 5.11 `codebase-modernization` (AN inventory + BU change)
- Inventory and dependency mapping from authorized code/config/docs; risk & value classification (unsupported platforms, known vulnerabilities, criticality, maintenance cost, sensitive data).
- Decision per component: **retire / retain / upgrade / re-platform / migrate**, with sequencing, test requirements and rollback.
- Controlled change: characterization tests first, expand/contract migrations, strangler pattern, bounded component, release only with approval.
- Outputs: portfolio triage table, roadmap, modernization runbook. No client data in examples.

### 5.12 `test-strategy` (TE)
- **Independent test design:** derive TEST-PLAN.md from the approved SPEC (not from the implementation), in a separate context when possible; map every `AC-n` → test level (unit / integration / end-to-end / non-functional) → concrete test case; flag ACs with no test.
- Test pyramid guidance favoring integration tests at real seams; regression selection for changed areas.
- Non-functional checks when the SPEC demands them: performance budget, accessibility, resilience/recovery (backup restore, failover), data migration verification.
- **E2E mode:** add API/end-to-end tests for features that already work, following the project's existing harness (discovered, never assumed).

### 5.13 `verification-gate` (TE)
- Identify the command that proves each claim → run it fresh → read full output → compare to `AC-n` → record in VERIFICATION.md → update TRACEABILITY.md → only then claim.
- Red-flag phrases ("should work", "looks good", "probably"); regression check; verification of subagent reports.
- Prepares the CP4 record in CHECKPOINTS.md (evidence summary + residual risk) for human approval.

### 5.14 `multi-axis-code-review` (TE)
- **Request mode** axes, run as parallel independent reviewers when subagents exist: (1) Spec compliance vs SPEC/ACs, (2) Design & standards vs ADRs/CONSTRAINTS/AGENTS.md, (3) Correctness & edge cases, (4) Security (OWASP + SSDF), (5) Simplicity/maintainability. Triage: Critical / Important / Minor with file:line and failure scenario.
- **Receive mode**: verify each comment technically before acting; push back with evidence; no performative agreement.
- Detect a weakened quality bar (deleted tests, loosened thresholds, skipped checks).

### 5.15 `security-hardening` (cross-cutting)
- AN: threats and sensitive data in the SPEC. DE: secure design decisions. TE: OWASP Top 10 checklist, secrets and dependency/supply-chain hygiene, input validation, authN/authZ, logging without sensitive data.
- **AI-use guardrails:** never paste secrets/PHI/PII into prompts or test fixtures; synthetic data only; respect client-authorized environments.
- `references/ssdf-mapping.md`: NIST SP 800-218 practice groups (PO, PS, PW, RV) → which Agentic SDLC stage produces the evidence.
- States explicitly that it supports secure practices and does not certify compliance.

### 5.16 `deployment-pipeline` (DP)
- Discover existing CI/CD (GitHub Actions, Azure DevOps, GitLab CI…) before proposing changes; add quality gates (build, test, lint, security scan, dependency audit) matching CONSTRAINTS.md.
- Deployment strategy: direct, blue-green, canary, feature flag; environment promotion with approval points.
- Rollback rehearsal: the SPEC rollback is executable and tested before production.
- Observability minimum: structured logs without sensitive data, metrics tied to SPEC indicators, alerts, health checks.
- Never runs a production deploy or pushes release tags without explicit human approval.

### 5.17 `shipping-and-handover` (DP)
- Pre-ship checklist; integration options (merge locally / open PR / keep branch / discard) with confirmation; PR body: what & why, smallest visual, before/after evidence, one-way vs two-way door, rollback, traceability summary.
- Docs drift check; ADRs finalized.
- HANDOVER.md + runbook; optional guided walkthrough for the human reviewer.

### 5.18 `retrospective` (DP → PL)
- Gather evidence (SPEC, PLAN, VERIFICATION, TRACEABILITY, GATES, diffs, commits, session notes) → acceptance decision (accepted / accepted with follow-ups / rejected) → indicators vs baseline (closing the PL ↔ DP pair) → findings with sources.
- Environment improvements: mechanical mistakes → automated checks; judgment calls → CONSTRAINTS/AGENTS.md pitfalls (via `project-context`).

---

## 6. Execution Waves and Tasks

Standard loop for **every skill task** (the "test" for a Markdown skill is its evals + validators):

1. Write `skills/<name>/evals/trigger-eval.json` (≥10 queries, ≥4 negatives that target neighbor skills) and `evals/evals.json` (3 scenarios with expectations).
2. Write `skills/<name>/SKILL.md` per §5.
3. Write `skills/<name>/README.md` with `## Metadata` and `## Influences`.
4. Run:
   ```bash
   ./scripts/validate-skill-yaml.sh skills/<name>
   ./scripts/validate-skill-content.sh skills/<name>
   ```
   Expected: no `❌`; word-count warning acceptable only if content is in `references/`.
5. Commit: `git commit -m "feat: add <name> skill v1.0.0"` (or `feat(<name>): …` for upgrades).

### Wave 0 — Foundations
- **Task 0.1** Save this evaluation as `docs/research/2026-11-18-dev-workflow-frameworks-evaluation.md` (full matrix + per-skill notes + stage coverage map).
- **Task 0.2** Create `THIRD_PARTY_NOTICES.md` with MIT copyright notices for Superpowers (Jesse Vincent), Matt Pocock, Addy Osmani and BMad Code, LLC; note that content is adapted/synthesized; trademarks ("BMad", "BMAD-METHOD", "Agile V") named only for attribution; Agile V listed as conceptual prior work with no content used.
- **Task 0.3** Write `skills/agentic-sdlc/references/artifacts.md` (SPEC, PLAN, TEST-PLAN, VERIFICATION, TRACEABILITY, GATES, HANDOVER, RETRO, ADR, CONSTRAINTS templates).
- **Task 0.4** Write `skills/agentic-sdlc/references/rules.md` (§3.4) and `references/lifecycle.md` (§3.1) — referenced by all method skills to keep wording DRY.

### Wave 1 — Router + left arm (PL, AN, DE)
- **PL:** Task 1.1 `agentic-sdlc` (NEW) · Task 1.2 `project-context` (NEW) · Task 1.3 `brainstorming` (UPGRADE)
- **AN:** Task 1.4 `grill-me` (UPGRADE) · Task 1.5 `spec-driven-development` (NEW)
- **DE:** Task 1.6 `senior-solution-architect` (MINOR) · Task 1.7 `writing-plans` (UPGRADE)
- **Checkpoint A:** owner reviews the router, the V model and SPEC/PLAN templates before Build skills are written.

### Wave 2 — Bottom of the V (BU)
- Task 2.1 `test-driven-development` · Task 2.2 `executing-plans` (UPGRADE) · Task 2.3 `systematic-debugging` · Task 2.4 `codebase-modernization`

### Wave 3 — Right arm (TE, DP)
- **TE:** Task 3.1 `test-strategy` · Task 3.2 `verification-gate` · Task 3.3 `multi-axis-code-review` · Task 3.4 `security-hardening`
- **DP:** Task 3.5 `deployment-pipeline` · Task 3.6 `shipping-and-handover` · Task 3.7 `retrospective`
- **Checkpoint B:** owner reviews the full set.

### Wave 4 — Integration and quality
- **Task 4.1** Trigger-collision audit: run every method skill's negative queries against neighbor descriptions (brainstorming ↔ spec ↔ grill-me ↔ writing-plans; test-strategy ↔ TDD ↔ verification-gate ↔ review). Adjust descriptions until no ambiguous overlaps remain.
- **Task 4.2** Update `agent-skill-orchestrator` to recognize software-delivery requests and propose the Agentic SDLC.
- **Task 4.3** Dogfood: in a scratch repo (outside this repo), run one **Quick** route (bug fix) and one **Standard** route (small feature) end to end; confirm every artifact, gate and traceability link is produced; fix skills.
- **Task 4.4** Run `skill-creator` eval loop on the 5 highest-traffic skills (`agentic-sdlc`, `spec-driven-development`, `writing-plans`, `executing-plans`, `test-driven-development`).

### Wave 5 — Bundles, docs, release (documentation consistency rule)
- **Task 5.1** `bundles.json`: add `agentic-sdlc` bundle (all 18 method skills incl. upgraded ones, ordered PL → DP); update `essential`, `planning`, and `all` (31).
- **Task 5.2** Docs: `README.md` (Agentic SDLC section with the V diagram, category table, `skills-31` badge, "Relationship to other V-model approaches" note), `CLAUDE.md` (architecture tree, Skill Types, bundle list, counts), `CATALOG.md` + `skills_index.json` (`npm run generate-all --prefix cli-installer`), `.claude-plugin/marketplace.json`, `cli-installer/README.md`, `cli-installer/package.json` description, `docs/guides/skill-anatomy.md`, `docs/guides/getting-started.md`, `docs/bundles/bundles.md`, new `docs/guides/agentic-sdlc.md` (user guide).
- **Task 5.3** Run consistency checks:
  ```bash
  ./scripts/build-skills.sh
  ./scripts/check-doc-consistency.sh
  ./scripts/verify-version-sync.sh
  ```
  Expected: 31 skills, no mismatches.
- **Task 5.4** Release prep: `node scripts/release.js major` (→ 3.0.0), `CHANGELOG.md` entry, `./scripts/package-plugin.sh`, `graphify update .`.
- **Task 5.5** Push branch `claude/superskills-dev-workflow-kppj2r`; open PR only when the owner asks. Tag push and `gh repo edit` About update happen only after merge, by the owner (or with explicit approval).

### Wave 6 — Business Plan update (outside the repo)
- **Task 6.1** Draft replacement text for the Addendum (§1.1, §3 intro, §3.1, §3.3, §3.5, §4.4, §6, §8.4) naming the Agentic SDLC. Kept outside the public repo (contains case data). Owner applies it to the source document.
- **Task 6.2** After the 3.0.0 release, fill in the real release date and version in the §6 progress row and the citation footnotes. Never cite unreleased work as completed.
- **Task 6.3** Owner: USPTO name search and counsel review before filing.

---

## 7. Validation Criteria (definition of done)

- 13 new + 6 upgraded skills pass YAML and content validators; every skill has `evals/evals.json` and `evals/trigger-eval.json`.
- Trigger audit shows no unresolved overlaps between method skills or with built-in Claude Code skills.
- Dogfood runs (Quick + Standard) complete with all artifacts produced, every gate recorded and a complete traceability matrix.
- `check-doc-consistency.sh` and `verify-version-sync.sh` pass; all docs list 31 skills and the `agentic-sdlc` bundle; README shows the V and the PL→DP stages.
- `THIRD_PARTY_NOTICES.md` present; every adapted skill's README credits its sources; no Agile V text anywhere in the repo.
- No skills committed under platform directories (`.claude/skills/`, etc.).

## 8. Risks

| Risk | Mitigation |
|---|---|
| Name confusion with Agile V™ / `agentic-agile-v` | Never use "Agile" in the name; differentiation note; USPTO search before BP filing |
| Share-alike contamination | Agile V used for concepts only; no text, templates or files copied |
| Over-triggering / skills competing for the same request | Tight descriptions, negative trigger evals, router is opt-in |
| Ceremony overload on small tasks | Quick route; sizing in PL |
| Token bloat | ≤2000 words per SKILL.md, shared `references/rules.md` and templates |
| License/attribution gaps | MIT notices + Influences sections; synthesize, do not copy verbatim at length |
| Platforms without subagents | Every subagent step has an inline fallback |
| Doc drift across 10+ files | Wave 5 checklist + consistency scripts |

## 9. Decision Log

| ID | Decision | Date |
|---|---|---|
| D1 | Method name: **Agentic SDLC**. Earlier candidate "CODE / Context Engineering Development for Enterprise" dropped (term already used by the owner's employer). | 2026-11-18 |
| D1b | Structure: six lifecycle stages PL · AN · DE · BU · TE · DP in a V shape with three human gates; no separate phase layer. | 2026-11-18 |
| D2 | The method lives inside claude-superskills; package, repo and marketplace names unchanged. | 2026-11-18 |
| D3 | Release as **3.0.0** (product repositioning, 18 → 31 skills). | 2026-11-18 |
| D4 | Keep existing skill names; new skills get descriptive names (no prefix). | 2026-11-18 |
| D5 | Method stays domain-neutral with generic sensitive-data guardrails; healthcare-specific content stays in `acs-health-maturity-kit`. | 2026-11-18 |
| D6 | Agile V (CC BY-SA 4.0) used as conceptual reference only. | 2026-11-18 |
