# The Agentic SDLC — The Cycle

The Agentic SDLC runs the software development lifecycle as a **continuous cycle** of eight stages. In each stage an **AI agent role** does the work and a **named human role** holds the checkpoint. Build and Test loop automatically within strict limits; every other stage transition waits for an explicit human decision. Operate feeds production learnings back into Plan.

```
        AI agent              Stage                         Human checkpoint
  ┌─▶ Triage Agent      ──▶  PL  Plan       import · prioritize · size      ◀── 👤 Product owner — CP1 approves scope & route
  │   Analyst Agent     ──▶  AN  Analyze    interview · SPEC · AC-n         ◀── 👤 Product owner — CP2 approves SPEC (frozen)
  │   Architect Agent   ──▶  DE  Design     ADRs · task graph               ◀── 👤 Tech lead     — CP3 signs off design & plan
  │   Coding Agent      ──▶  BU  Build      TDD slices · commits · PR  ┐
  │   QA Agent          ──▶  TE  Test       evidence per AC-n · CI     ┘◀── 🔁 bounded auto-retry (max 5 rounds, then escalate)
  │   Review Agent      ──▶  RV  Review     multi-axis · security      ◀── 👤 Engineer      — CP4 approves the PR
  │   Release Agent     ──▶  DP  Deploy     flags · promote · rollback ◀── 👤 Release mgr   — CP5 approves prod release
  │   SRE Agent         ──▶  OP  Operate    SLOs · incidents · retro   ◀── 👤 On-call       — owns incidents
  └────────────── feedback loop: incidents, postmortems, measured indicators → new work in PL ──────────────┘
```

## Stages

| Stage | Agent role | Question | Skills | Artifacts | Checkpoint |
|---|---|---|---|---|---|
| **PL** Plan | Triage Agent | What should be worked on now, why, how big, which route? | `issue-triage`, `agentic-sdlc` (sizing), `project-context`, `brainstorming` | Prioritized item, readiness score, route, brief, target indicators | **CP1** Product owner approves scope, priority and route |
| **AN** Analyze | Analyst Agent | What exactly must be true when done? | `grill-me`, `spec-driven-development`, `codebase-modernization` (inventory), `security-hardening` | SPEC.md (AC-n, boundaries, rollback, indicators), GLOSSARY.md | **CP2** Product owner approves the SPEC; the revision is frozen |
| **DE** Design | Architect Agent | How will it be built, in what order? | `senior-solution-architect`, `writing-plans`, `security-hardening` | ADRs, PLAN.md task graph (each task → AC-n) | **CP3** Tech lead signs off design and plan |
| **BU** Build | Coding Agent | Build it, slice by slice, test-first | `executing-plans`, `test-driven-development`, `systematic-debugging`, `codebase-modernization` (change) | Code, tests, commits `[Tn, AC-n]`, PR | Bounded auto-retry; escalates to a human at the cap |
| **TE** Test | QA Agent | Does it provably meet the SPEC? | `test-strategy`, `verification-gate` | TEST-PLAN.md, VERIFICATION.md, TRACEABILITY.md | Bounded auto-retry; no human checkpoint, but no gaps allowed into RV |
| **RV** Review | Review Agent | Is it correct, safe, simple and true to the design? | `multi-axis-code-review`, `security-hardening` | Review findings, triage, residual risks | **CP4** Engineer approves the PR with the traceability matrix |
| **DP** Deploy | Release Agent | Ship it safely and reversibly | `deployment-pipeline`, `shipping-and-handover` | Rollout + rollback plan, release notes, HANDOVER.md, runbook | **CP5** Release manager approves the production release |
| **OP** Operate | SRE Agent | Is it healthy? What did production teach us? | `operations-and-incidents`, `retrospective` | SLO report, incident records, postmortems, RETRO.md, new PL items | On-call engineer owns incidents |

## The rule that replaces the V: every requirement is proven

The cycle keeps the strongest idea of the classic V-model — each definition has a matching proof — as an explicit rule rather than a shape:

| Defined in | Proven in |
|---|---|
| PL — scope, target indicators, baseline | DP/OP — indicators measured after release; acceptance decision in RETRO.md |
| AN — acceptance criteria `AC-n`, boundaries, rollback | TE — evidence per `AC-n`; RV — spec-compliance axis; DP — rollback rehearsed |
| DE — architecture decisions, constraints, task plan | RV — design and standards axis |

Traceability chain:

```
SPEC AC-n ─▶ PLAN task ─▶ commit [Tn, AC-n] ─▶ test ─▶ evidence ─▶ PR approval (CP4) ─▶ release (CP5) ─▶ indicator (OP)
```

`TRACEABILITY.md` records one row per `AC-n`. A row with an empty cell is a gap; CP4 cannot pass with gaps unless the approver explicitly accepts them as residual risk in CHECKPOINTS.md.

## Checkpoints

| ID | Stage | Role | Passes when | Recorded in |
|---|---|---|---|---|
| CP1 | PL | Product owner | Item is ready (readiness score), scope and priority clear, route chosen | CHECKPOINTS.md |
| CP2 | AN | Product owner | SPEC complete (AC-n, boundaries, rollback, indicators), doubt pass done | CHECKPOINTS.md; SPEC revision frozen |
| CP3 | DE | Tech lead | Every AC-n has a task, every task serves an AC-n or is an enabler; ADRs proposed | CHECKPOINTS.md; ADRs → Accepted |
| CP4 | RV | Engineer | Every AC-n has fresh evidence, no open Critical findings, security lens done | CHECKPOINTS.md |
| CP5 | DP | Release manager | Rollout plan, rollback rehearsed, monitoring in place | CHECKPOINTS.md |
| — | OP | On-call engineer | Owns incidents; postmortems produce new PL items | Incident records, RETRO.md |

Each checkpoint record states: checkpoint, date, role, person, exact words of approval, evidence reviewed, residual risks accepted, decision (approved / approved with conditions / rejected). Only an explicit "yes" in a later turn counts; the agent ends its turn after producing a checkpointed artifact.

In small teams one person may hold several roles; the record still names the role being exercised.

## Routes

| Route | When | Stages and checkpoints |
|---|---|---|
| **Quick** | Clear, low-risk, ~1 file, or a well-understood bug | PL (mini) → BU (TDD) → TE → RV → DP (commit/PR). CP1–CP3 collapse into one confirmation of scope and acceptance test; CP4 is the PR approval; CP5 only if production deploys. |
| **Standard** | Feature or change that fits one session | All stages; short SPEC; CP1+CP2 may be one conversation; CP3–CP5 separate |
| **Full** | Multi-session, cross-cutting, high-risk, regulated, or brownfield modernization | All stages at full depth; subagent execution; independent test design; security lens mandatory; staged rollout; OP watch period and retrospective mandatory |

Escalate a route the moment new risk appears; never downgrade silently.

## Automatic loops (no human in the loop, but bounded)

- **BU ↔ TE:** failing tests or verification gaps go back to the Coding Agent. Maximum 5 fix rounds per task; from round 4 a fresh, more capable agent takes over; after round 5 every open finding gets an explicit ruling and the human is notified. Never weaken a test or a threshold to get green.
- **RV → BU:** review findings are routed by root cause: intent gaps → new SPEC revision (CP2 again); plan defects → PLAN amendment (CP3 again); local defects → back to the Coding Agent.
- **OP → PL:** incidents, postmortem actions and indicator misses become new items for the Triage Agent.
