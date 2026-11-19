# Development Workflow Frameworks — Evaluation (November 2026)

**Purpose:** Evidence base for the Agentic V-Method (see `docs/plans/2026-11-18-agentic-v-method.md`). Records which public AI-assisted development frameworks were reviewed, how they compare, and which ideas were absorbed into which skill.

**Method:** Shallow clones of each repository's default branch, reading every stable `SKILL.md`, the README and routing/meta skills. Scores are the reviewer's judgment on a 1–5 scale; they compare fitness for this repository's goals (portable, spec-first, enterprise-grade delivery across 8 platforms), not overall quality.

**Snapshots reviewed:**

| Framework | Repository | Commit | Date | License |
|---|---|---|---|---|
| Superpowers | `obra/superpowers` | `22f0b46` | 2026-11-03 | MIT — © 2025 Jesse Vincent |
| Matt Pocock skills | `mattpocock/skills` | `5863806` | 2026-11-12 | MIT — © 2026 Matt Pocock |
| Addy Osmani agent-skills | `addyosmani/agent-skills` | `39b723c` | 2026-11-13 | MIT — © 2025 Addy Osmani |
| BMad Method (v7 preview) | `bmad-code-org/BMAD-METHOD` | `e435a22` | 2026-11-12 | MIT — © 2025 BMad Code, LLC |
| Agile V™ | `Agile-V/agile_v_skills` | `4bcc917` | 2026-10-06 | CC BY-SA 4.0 (concepts only) |

## 1. Comparison

Sources reviewed (shallow clones, November 18, 2026):

| Framework | Repo | License | Skills reviewed | Use in this plan |
|---|---|---|---|---|
| Superpowers (Jesse Vincent) | `obra/superpowers` | MIT | 15 | Ideas + adapted content (credited) |
| Matt Pocock skills | `mattpocock/skills` | MIT | 25 stable | Ideas + adapted content (credited) |
| Addy Osmani agent-skills | `addyosmani/agent-skills` | MIT | 25 | Ideas + adapted content (credited) |
| BMad Method v7 preview | `bmad-code-org/BMAD-METHOD` | MIT | 29 | Ideas + adapted content (credited) |
| Agile V™ (Christopher Koch) | `Agile-V/agile_v_skills` | **CC BY-SA 4.0** | 49 | **Concepts only — no text copied or adapted** (share-alike is incompatible with this repo's MIT license) |

### 1.1 Scorecard (1 = weak, 5 = strong)

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

### 1.2 Best ideas to absorb (by source)

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

### 1.3 Deliberately NOT adopted

| Idea | Reason |
|---|---|
| BMad runtime renderer (`uv run render_skill.py`, `_bmad/` config) | Breaks portability across 8 platforms; adds install friction |
| Superpowers "invoke a skill before ANY response" meta-rule | Over-triggers, wastes tokens; the router is opt-in and size-aware |
| Named personas (Mary, Winston, Amelia…) and party mode | Theatrical; kept only as optional *review lenses* |
| Mandatory issue-tracker setup (Matt) | Local Markdown task files are the default; trackers are optional |
| Any Agile V text, templates or skill files | CC BY-SA 4.0 share-alike; "Agile V" is a claimed trademark — never used in names or copy |
| Frontend/perf/browser-devtools skills (Addy) | Out of scope for the core method; candidates for a later bundle |

### 1.4 Naming and differentiation

- The method name is **Agentic V-Method**. "V-Model" is a generic software engineering term (German V-Modell, 1980s); the word "Agile" is never part of our name, to stay clearly distinct from Agile V™ and the `agentic-agile-v` project.
- README includes a short "Relationship to other V-model approaches" note crediting Agile V as related prior work.
- Before the name is cited in the Business Plan, the owner runs a USPTO trademark search (ideally with counsel). A web search is not a trademark clearance.

---


## 2. Absorption Map (source skill → Agentic V-Method skill)

| Source skill | Framework | Absorbed into | Stage |
|---|---|---|---|
| brainstorming | Superpowers | `brainstorming` | PL |
| idea-refine | Addy | `brainstorming` (divergent → convergent) | PL |
| prototype | Matt | `brainstorming` (prototype detour) | PL |
| project-context | BMad | `project-context` | PL |
| context-engineering, constraint-driven-development | Addy | `project-context` | PL |
| domain-modeling | Matt | `project-context` (glossary), `grill-me` (docs mode) | PL/AN |
| grilling, grill-me, grill-with-docs | Matt | `grill-me` | AN |
| interview-me | Addy | `grill-me` | AN |
| spec-driven-development, doubt-driven-development | Addy | `spec-driven-development` | AN |
| to-spec | Matt | `spec-driven-development` (synthesize mode) | AN |
| bmad-spec, bmad-prd | BMad | `spec-driven-development` | AN |
| bmad-architecture | BMad | `senior-solution-architect` | DE |
| documentation-and-adrs, api-and-interface-design | Addy | `senior-solution-architect` | DE |
| writing-plans | Superpowers | `writing-plans` | DE |
| to-tickets | Matt | `writing-plans` (task graph, blocking edges) | DE |
| planning-and-task-breakdown | Addy | `writing-plans` | DE |
| test-driven-development | Superpowers, Addy | `test-driven-development` | BU |
| tdd, codebase-design | Matt | `test-driven-development` | BU |
| executing-plans, subagent-driven-development, using-git-worktrees, dispatching-parallel-agents | Superpowers | `executing-plans` | BU |
| implement, implement-spec | Matt | `executing-plans` | BU |
| incremental-implementation | Addy | `executing-plans` | BU |
| systematic-debugging | Superpowers | `systematic-debugging` | BU |
| diagnosing-bugs | Matt | `systematic-debugging` | BU |
| debugging-and-error-recovery | Addy | `systematic-debugging` | BU |
| deprecation-and-migration | Addy | `codebase-modernization` | AN/BU |
| bmad-qa-generate-e2e-tests | BMad | `test-strategy` (E2E mode) | TE |
| verification-before-completion | Superpowers | `verification-gate` | TE |
| code-review-and-quality, code-simplification | Addy | `multi-axis-code-review` | TE |
| code-review | Matt | `multi-axis-code-review` | TE |
| requesting-code-review, receiving-code-review | Superpowers | `multi-axis-code-review` | TE |
| bmad-code-review, bmad-review | BMad | `multi-axis-code-review` (lenses) | TE |
| security-and-hardening | Addy | `security-hardening` | AN/DE/TE |
| ci-cd-and-automation, observability-and-instrumentation | Addy | `deployment-pipeline` | DP |
| shipping-and-launch | Addy | `deployment-pipeline`, `shipping-and-handover` | DP |
| finishing-a-development-branch | Superpowers | `shipping-and-handover` | DP |
| pr | Matt | `shipping-and-handover` | DP |
| bmad-walkthrough | BMad | `shipping-and-handover` | DP |
| retro | Matt | `retrospective` | DP→PL |
| bmad-retrospective | BMad | `retrospective` | DP→PL |
| ask-matt, handoff | Matt | `agentic-v-method` (routing, phase boundaries) | Router |
| bmad (help), bmad-correct-course | BMad | `agentic-v-method` (routing, change protocol) | Router |
| using-agent-skills | Addy | `agentic-v-method` | Router |

Agile V concepts used (written independently, no text reused): frozen requirement baseline, independent test design, builder-does-not-grade-itself, gate records with residual risk, risk-scaled controls.

## 3. Stage Coverage Map

| Stage | Skills | Primary artifacts |
|---|---|---|
| PL Plan | `agentic-v-method`, `project-context`, `brainstorming` | Route, AGENTS.md block, CONSTRAINTS.md, design brief, target indicators |
| AN Analyze | `grill-me`, `spec-driven-development`, `codebase-modernization`, `security-hardening` | SPEC.md, GLOSSARY.md |
| DE Design | `senior-solution-architect`, `writing-plans`, `security-hardening` | ADRs, PLAN.md |
| BU Build | `test-driven-development`, `executing-plans`, `systematic-debugging`, `codebase-modernization` | Code, tests, commits |
| TE Test | `test-strategy`, `verification-gate`, `multi-axis-code-review`, `security-hardening` | TEST-PLAN.md, VERIFICATION.md, TRACEABILITY.md |
| DP Deploy | `deployment-pipeline`, `shipping-and-handover`, `retrospective` | HANDOVER.md, runbook, RETRO.md |
