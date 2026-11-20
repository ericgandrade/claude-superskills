# Agentic SDLC — Structure Proposal (for owner decision D10)

**Status:** APPROVED by the owner on 2026-11-20 as decision D10, with agents named by function (option C: Planner, Implementer, Reviewer + Architect, Test Engineer, Security Auditor, Release Engineer, SRE). Execution: `docs/plans/2026-11-20-agentic-sdlc-execution-plan.md`.

**Evidence base** (all in `docs/research/methods/`):
- `classic-and-standards.md` — ISO/IEC/IEEE 12207, SWEBOK v4, Waterfall, V-model, Spiral, RUP/OpenUP, IEC 62304, DO-178C (48 sources; † marks claims from search excerpts not re-read in the primary text)
- `agile-flow-devops.md` — Scrum, Kanban, XP, SAFe, Disciplined Agile, Shape Up, Lean, Continuous Delivery, DORA, trunk-based, Team Topologies, dual-track (107 links; 11 claims marked unverified)
- `ai-native-methods.md` — Spec Kit, Kiro, AWS AI-DLC, BMad, OpenSpec, Agent OS, Tessl, Factory, Sonar AC/DC, Anthropic playbook and best practices, Thoughtworks, Fowler/Böckeler, SDAD, Agentic Agile-V (51 sources; [R] read directly, [S] search summary only)
- `bmad-and-mattpocock-structure.md` — structure of the two frameworks the owner wants as inspiration

**Design rules applied** (agreed with the owner on 2026-11-20):
1. Standard vocabulary only — a stage, role, artifact or checkpoint name enters only if it appears in established methods (preferably 3+).
2. The difference lies in how AI agents and humans divide the work and in evidence, not in renaming phases.
3. Clarity test — a developer who has never seen the method gets from request to production with one page and one worked example.

---

## 1. What the research converged on

| Question | Classic & standards | Agile / flow / DevOps | AI-native (2025–26) | Convergence |
|---|---|---|---|---|
| Lifecycle names | Activities shared by all: Requirements (8/8), Design (8/8), Architecture (7), Testing (7), Planning (6), Release, Operations, Maintenance | Plan, Build, Test, Review, Release, Deploy, Operate/Monitor (3+ methods each) | Anthropic playbook: Plan, Design, Build, Test, Deploy, Maintain; Spec Kit SDLC guide: Planning, Requirements, Design, Development, Testing, Deployment, Maintenance | **Plain SDLC words, spelled out, no codes** |
| Feature-level flow | Requirements → design → implementation → verification | Backlog item → in progress → review → done | specify (13/13) → plan (11/13) → tasks (7/13) → implement (13/13) → verify (11/13) | **Spec → plan → tasks → implement → verify** |
| Iteration | Standards do not mandate a lifecycle; iterative accepted (AAMI TIR45) | Small batches, continuous flow, fast feedback | Light path in every method | **Iterative by default, thin slices** |
| Human decisions | Milestones: Plan Approved, Requirements Baseline, Architecture Review, Release Approved | Few decision points; peer review beats approval boards (DORA) | Spec approval, plan approval, PR approval, release authorization | **4 named approvals, scaled by risk** |
| Roles | Stakeholder, Architect, Analyst, Developer, Tester (functions, not titles) | Product Owner, Developers, Architect, Tester | Per-stage persona agents in retreat; planner + implementer + independent reviewer survive | **Few human roles; 3 agent responsibilities** |
| Artifacts | Requirements spec, design/architecture doc, test plan/report, traceability matrix, release notes | Backlog, story, epic, increment, Definition of Done | `spec.md` (7), `plan.md` (5), `tasks.md` (4); one folder per change (6); project context file (9) | **spec.md · plan.md · tasks.md per change + AGENTS.md** |
| Sizing | Rigor scaled by risk class (IEC 62304 A/B/C; DO-178C A–E) | Work item types (bug/task, story, epic) | Light path everywhere; route by risk | **3 paths by risk, mapped to work item types** |
| Gaps everywhere | — | — | Operations, measured outcomes, security by default, traceability past the PR, enforced (not prompt-only) gates, brownfield, mid-flight change | **Where we differentiate** |

---

## 2. Proposed lifecycle — seven standard stages

**Plan → Specify → Design → Build → Test → Release → Operate**, iterated per work item, with Operate feeding Plan.

| Stage | What happens | Standard name precedent |
|---|---|---|
| **Plan** | Take in the request, check it is not a duplicate or previously rejected, size it, choose the path, set the goal and the indicator to measure | Planning (12207, SWEBOK, RUP, Scrum, DevOps loop, Anthropic, Spec Kit) |
| **Specify** | Write `spec.md`: user stories and acceptance criteria (Given/When/Then), non-goals, constraints, rollback | Requirements (8/8 classic); `/specify` and `spec.md` (Spec Kit, Kiro, OpenSpec, BMad) |
| **Design** | Architecture decisions (ADRs) and `plan.md`; break into `tasks.md` (thin vertical slices with dependencies) | Design/Architecture (8/8 classic, Anthropic, Spec Kit); plan + tasks (AI-native) |
| **Build** | Implement task by task, test-first, in small commits and a pull request; debug systematically | Build/Implementation/Development (all three groups); TDD (XP); commit stage (CD) |
| **Test** | Verify the change against the spec in a fresh context: acceptance tests, independent code review, security review; evidence in the PR | Testing/Verification (7/8 classic); acceptance stage (CD); verify/converge (Spec Kit, OpenSpec) |
| **Release** | Deploy behind feature flags, staged rollout, rehearsed rollback, release notes and runbook | Release/Deployment (classic, DevOps, Anthropic, Spec Kit) |
| **Operate** | Monitor the change and its indicator, handle incidents, run postmortems and retrospectives; new work returns to Plan | Operations/Maintenance (12207, SWEBOK); Operate/Monitor (DevOps); Maintain (Anthropic) |

Notes:
- **Review is not a stage.** Independent review happens in Test and ends in the PR approval (AI-native research, point 4; agile research, recommendation 3).
- **Unit tests live in Build** (TDD); **Test** is verification against the spec (CD commit stage vs acceptance stage).
- "Specify" is preferred to "Analyze" (Spec Kit's `/analyze` means a consistency check) and to "Requirements" (developers using AI tools know `spec.md`); the guide states that Specify = requirements specification for readers coming from the standards.

---

## 3. Human approvals — four named decisions

| Approval | When | Who (default role) | Precedent |
|---|---|---|---|
| **Spec approval** | End of Specify | Product Owner | Requirements Baseline (classic); spec approval (Spec Kit, Kiro, AI-DLC) |
| **Plan approval** | End of Design, before code | Tech Lead | Plan Approved / Architecture Review (RUP, 62304, DO-178C); plan approval (AI-native) |
| **PR approval** | End of Test | Reviewer (Engineer) | Code review / pull request (agile, DORA, all AI-native) |
| **Release approval** | Before production | Release Owner (on-call for Operate) | Release Approved (classic); release authorization (AI-native); go/no-go (agile) |

- An optional **intake decision** in Plan (go / no-go / later) for teams that need it.
- **Quick path:** only PR approval (plus release approval when production deploys). **Standard:** all four, Spec + Plan can be one review for small features. **Full:** all four, separately.
- Approvals are recorded where developers already look: Spec and Plan approvals in an "Approvals" section of `spec.md`/`plan.md`; PR approval in the PR; Release approval in the release notes. No separate checkpoint files.
- **Enforced where possible**, not only by prompt: branch protection for PR approval, required reviewers, CI status checks, deployment environment approvals (gap found in every AI-native method).

---

## 4. Roles

**Humans (accountabilities; one person may hold several):** Product Owner · Tech Lead · Reviewer · Release Owner / On-call.

**Agents (three responsibilities, the pattern that survived in AI-native methods):**

| Agent responsibility | Does | Never |
|---|---|---|
| **Planner** | Plan, Specify, Design: clarifies, writes spec.md / plan.md / tasks.md, proposes ADRs | Writes production code |
| **Implementer** | Build: one task at a time, test-first, commits, opens the PR | Approves or verifies its own work |
| **Reviewer** (independent, read-only) | Test: verifies against the spec, reviews code and security, writes the evidence in the PR | Fixes code itself |

Specialist skills (architecture, test design, security, release, operations) are called by these agents as needed; there is no relay of one agent per stage.

---

## 5. Paths by risk (mapped to familiar work item types)

| Path | Typical work item | Signals | Required artifacts |
|---|---|---|---|
| **Quick** | Bug, task | One component, low risk, trivially reversible | Issue with acceptance test + PR with evidence |
| **Standard** | Story, feature | One iteration, moderate risk, reversible with a plan | `spec.md`, `plan.md` (+ tasks inside the plan) + PR |
| **Full** | Epic, high-risk or regulated change, brownfield modernization | Multi-iteration, security/data/money/public API, hard to reverse | `spec.md`, `plan.md`, `tasks.md`, ADRs, release plan, runbook, retrospective |

Risk signals override size (classic rigor levels; BMad risk test). An appendix maps the paths to IEC 62304 classes A/B/C and to Spec Kit / Kiro / AI-DLC / BMad paths.

---

## 6. Artifacts (standard names)

```
<project>/
├── AGENTS.md / CLAUDE.md        # project context: commands, conventions, Definition of Done, quality bar
├── docs/adr/NNNN-<title>.md     # architecture decision records
└── specs/<NNN-feature>/         # one folder per change (Spec Kit / Kiro convention)
    ├── spec.md                  # user stories, acceptance criteria, non-goals, rollback, indicator, approvals
    ├── plan.md                  # design, approach, tasks (Standard) , approvals
    └── tasks.md                 # Full path: thin slices with dependencies
PR description                   # verification section: acceptance criterion → test → evidence (traceability)
Release notes · runbook · postmortem · retrospective   # Release and Operate
```

- **Definition of Done** (project-level, in AGENTS.md) + **acceptance criteria** (per item) are the quality contract (Scrum, XP, agile research).
- Traceability lives in one table in the PR, carried to the release note and the indicator — no separate VERIFICATION / TRACEABILITY / CHECKPOINTS files.
- If the project already uses Spec Kit, Kiro or OpenSpec folders, the method uses them.

---

## 7. Where the Agentic SDLC makes a real difference

Grounded in the gaps found across all surveyed AI-native methods:
1. **Traceability past the PR** — acceptance criterion → task → commit/test → PR evidence → release note → production indicator.
2. **Release and Operate covered by default** — rollout, rollback rehearsal, incidents and postmortems feed the next Plan (only AI-DLC and Anthropic cover this; most stop at the PR).
3. **Measured outcomes** — DORA metrics plus a per-change indicator, reviewed after release (no surveyed method publishes outcomes).
4. **Security in the default path** — not an optional add-on.
5. **Enforced approvals** — branch protection, required reviewers, CI checks, environment approvals, not prompt-only gates.
6. **Brownfield entry and mid-flight change** — inventory before change; a change protocol that resumes at the earliest affected stage.
7. **Independent verification** — the agent that builds never verifies (classic V&V independence + AI-native reviewer pattern).
8. **Portable** — plain skills on 8 platforms, no engine, no new vocabulary.
9. **Regulated-ready appendices** — mappings to IEC 62304, ISO/IEC/IEEE 12207 and NIST SSDF, kept out of the core guide.

---

## 8. Worked example (clarity test)

**Request:** "Managers need to export the filtered report as CSV."

| Stage | What the developer sees |
|---|---|
| Plan | Planner checks no export exists, classifies as a story, signals: customer names (data) → **Standard path**; indicator: export-related support tickets per month |
| Specify | `specs/014-report-csv-export/spec.md`: 4 acceptance criteria (visible rows only; formula-injection escaping; permission required; 50k row limit), rollback = feature flag off. **Spec approval** by the Product Owner |
| Design | `plan.md`: stream CSV from the existing report query (ADR-0007), 5 tasks with dependencies. **Plan approval** by the Tech Lead |
| Build | Implementer builds task by task, test-first, commits `feat(reports): … [T2, AC-1]`, opens the PR |
| Test | Reviewer agent (fresh context) runs the acceptance tests, reviews code and security, fills the PR verification table (AC → test → evidence). **PR approval** by a Reviewer |
| Release | Flag on for 10% of managers, rollback rehearsed, release notes. **Release approval** by the Release Owner |
| Operate | Error rate and the support-ticket indicator watched for two weeks; retro notes one improvement to AGENTS.md |

Quick path example: "Sessions expire after 5 minutes instead of 30" → issue with acceptance test → failing test, fix → PR with evidence → **PR approval** → merged.

---

## 9. Decisions requested from the owner

1. **Stages:** Plan → Specify → Design → Build → Test → Release → Operate (no codes)?
2. **Approvals:** Spec, Plan, PR, Release (with roles Product Owner, Tech Lead, Reviewer, Release Owner), recorded in the files developers already use?
3. **Agents:** three responsibilities (Planner, Implementer, independent Reviewer) instead of eight per-stage agents?
4. **Paths:** Quick / Standard / Full mapped to bug-task / story-feature / epic-high-risk?
5. **Artifacts:** `specs/<NNN-feature>/spec.md · plan.md · tasks.md` + AGENTS.md + ADRs + PR verification table; drop separate CHECKPOINTS / VERIFICATION / TRACEABILITY files?
6. **Name:** keep "Agentic SDLC" knowing it is generic (Spec Kit's own guide uses the phrase and a fork calls itself "Agentic SDLC 12 Factors"), presented as "a method that follows the standard SDLC with AI agents"?
