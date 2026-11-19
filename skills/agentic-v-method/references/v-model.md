# The Agentic V-Method — The V

The Agentic V-Method runs the classic software engineering lifecycle in a V shape. The left arm **defines**, the bottom **builds**, the right arm **proves**. Every commitment made on the left has a matching proof on the right, and acceptance-criterion IDs (`AC-n`) link the two arms end to end.

```
  PL  Plan ─────────────────────────────────────────────── DP  Deploy
   objectives, route, indicators                          release, handover, indicators measured
       AN  Analyze ───────────────────────────────── TE  Test
        SPEC, acceptance criteria AC-n               evidence per AC-n, security, review
     [Gate 1: SPEC approved]                        [Gate 3: every AC proven, no Critical findings]
            DE  Design ─────────────────────── (TE: design/standards review)
             architecture, ADRs, PLAN
          [Gate 2: PLAN approved]
                        BU  Build
                   TDD slices, subagents, commits

  retrospective (DP) ──▶ learnings feed PL of the next cycle
```

## Stages

| Stage | Arm | Question | Skills | Artifacts | Exit |
|---|---|---|---|---|---|
| **PL** Plan | Left | Why, for whom, how big, which route? | `agentic-v-method`, `project-context`, `brainstorming` | Route decision, AGENTS.md block, CONSTRAINTS.md, design brief, target indicators | Route approved |
| **AN** Analyze | Left | What exactly must be true when done? | `grill-me`, `spec-driven-development`, `codebase-modernization` (inventory), `security-hardening` | SPEC.md, GLOSSARY.md | **Gate 1** — SPEC approved and frozen |
| **DE** Design | Left | How will it be built, in what order? | `senior-solution-architect`, `writing-plans`, `security-hardening` | ADRs, PLAN.md | **Gate 2** — PLAN approved |
| **BU** Build | Bottom | Build it slice by slice, test-first | `test-driven-development`, `executing-plans`, `systematic-debugging`, `codebase-modernization` (change) | Code, tests, commits referencing tasks and `AC-n` | All tasks done, tests green |
| **TE** Test | Right | Does it provably meet the SPEC, safely? | `test-strategy`, `verification-gate`, `multi-axis-code-review`, `security-hardening` | TEST-PLAN.md, VERIFICATION.md, TRACEABILITY.md, review findings | **Gate 3** — every AC has evidence, no open Critical findings |
| **DP** Deploy | Right | Ship it, operate it, learn from it | `deployment-pipeline`, `shipping-and-handover`, `retrospective` | Release/PR, rollout + rollback plan, HANDOVER.md, runbook, RETRO.md | Released or merged, handover accepted |

## Pairings across the V

| Left-arm commitment | Right-arm proof |
|---|---|
| PL — objectives, target indicators, baseline | DP — indicators measured after release; acceptance decision in RETRO.md |
| AN — acceptance criteria `AC-n`, boundaries, rollback | TE — evidence for each `AC-n` in VERIFICATION.md; rollback rehearsed in DP |
| DE — architecture decisions, constraints, task plan | TE — design and standards axis of `multi-axis-code-review` |
| BU — code and tests | (bottom of the V: the turning point from definition to proof) |

## Traceability chain

```
SPEC AC-n ──▶ PLAN task (Satisfies: AC-n) ──▶ commit ("task 3, AC-2") ──▶ test case ──▶ evidence entry ──▶ release
```

`TRACEABILITY.md` records the chain as a matrix (one row per `AC-n`). A row with an empty cell is a gap: either the criterion was not built, not tested, or not proven. Gate 3 cannot pass with gaps unless the human explicitly accepts them as residual risk in GATES.md.

## Gates

| Gate | Between | Passes when | Recorded in |
|---|---|---|---|
| Gate 1 | AN → DE | SPEC complete (ACs, boundaries, rollback, indicators), doubt pass done, human approves | GATES.md; SPEC revision marked frozen |
| Gate 2 | DE → BU | Every task maps to at least one `AC-n`, every `AC-n` maps to at least one task, human approves | GATES.md |
| Gate 3 | TE → DP | Every `AC-n` has fresh evidence, no open Critical review findings, security lens done, human approves | GATES.md |

Each gate record states: gate, date, approver, evidence reviewed, residual risks accepted, decision (approved / approved with conditions / rejected).

## Routes

| Route | When | Stages used |
|---|---|---|
| **Quick** | Clear, low-risk, ~1 file, or a well-understood bug | PL (mini) → BU (TDD) → TE (verification-gate, light review) → DP (commit/PR). Gates collapse into one confirmation before commit. |
| **Standard** | Feature or change that fits one session | All six stages; short SPEC; three gates |
| **Full** | Multi-session, cross-cutting, high-risk, regulated, or brownfield modernization | All six stages at full depth; subagent execution; independent test design; security lens mandatory; retrospective mandatory |

Escalate a route (Quick → Standard → Full) the moment new risk appears. Never downgrade silently.
