---
name: agentic-v-method
description: This skill should be used when the user wants to run software work end to end through the Agentic V-Method (Plan, Analyze, Design, Build, Test, Deploy) with spec-first human gates — starting a feature, change, bug fix or modernization the disciplined way, asking which stage or skill comes next, resuming work from existing SPEC or PLAN artifacts, or handling a requirement change mid-flight.
license: MIT
---

# Agentic V-Method

## Purpose

Drive AI-assisted software delivery through the six stages of the software engineering lifecycle — **PL** Plan · **AN** Analyze · **DE** Design · **BU** Build · **TE** Test · **DP** Deploy — arranged in a V. The left arm defines what must be true, the bottom builds it test-first, and the right arm proves every left-arm commitment with evidence. Acceptance-criterion IDs (`AC-n`) link the arms end to end, and three human gates keep a qualified person accountable for every material decision.

This skill is the router. It sizes the work, picks the route, invokes the stage skills in order, enforces the gates, records approvals, and resumes from artifacts already in the repository. It does not replace the stage skills; it sequences them.

Read before running:
- `references/v-model.md` — the V, stage table, pairings, traceability chain, gates, routes
- `references/rules.md` — the eight non-negotiable rules and the change protocol
- `references/artifacts.md` — templates for every artifact
- `references/phase-boundaries.md` — when to continue, clear, hand off, delegate or compact

## When to Use

- Starting a feature, change, bug fix, migration or modernization and wanting a disciplined path from idea to release
- Asking "what's next?", "which skill now?", or "where are we?" on software work
- Resuming work in a repository that already contains `docs/v-method/*/SPEC.md`, `PLAN.md`, `VERIFICATION.md` or `GATES.md`
- A requirement changes after the SPEC was approved
- Entering a specific stage directly: "plan", "analyze", "design", "build", "test", "deploy"

Do not use for one-off questions, explanations, or edits the user is directing line by line. For pure ideation with no delivery intent, use `brainstorming`; for a stand-alone review, use `multi-axis-code-review`.

## Workflow

### Step 0 — Detect state

1. Search the repository for existing method artifacts: `docs/v-method/**`, `**/SPEC.md`, `**/PLAN.md`, `**/GATES.md`, plus the project's own conventions (`docs/plans/`, `specs/`, `adr/`, issue tracker references in AGENTS.md or CLAUDE.md).
2. Look for the V-Method block in AGENTS.md or CLAUDE.md (`<!-- V-METHOD:BEGIN -->`). If it is missing on a Standard or Full route, plan to run `project-context` in PL.
3. If artifacts exist, determine the current stage from the latest gate record and the presence of downstream artifacts, then confirm with the user: "SPEC rev 2 approved, PLAN approved, T1–T3 committed. Resume BU at T4?"
4. If the user named a stage, jump there — but check its entry conditions (e.g., BU requires an approved PLAN on Standard/Full). Missing prerequisites are reported, not silently skipped.

### Step 1 — PL: size the work and choose the route

Ask at most three questions, one at a time, only where the repository cannot answer:
1. **Scope** — How many components, files or teams does this touch? Is it more than one session of work?
2. **Risk** — Does it touch security, money, personal or health data, public APIs, schemas, or production infrastructure?
3. **Reversibility** — Can it be undone with a single revert, or does it migrate data or break contracts?

Map the answers to a route:

| Route | Signals |
|---|---|
| **Quick** | One component, low risk, trivially reversible, well-understood |
| **Standard** | One session, moderate scope, reversible with a plan |
| **Full** | Multi-session, cross-cutting, high-risk, regulated, brownfield modernization, or hard to reverse |

Present the route, the stages it will run, and the artifacts it will produce. Wait for approval. Escalate the route the moment new risk appears; never downgrade silently.

Then complete PL:
- Standard/Full: invoke `project-context` if the V-Method block or CONSTRAINTS.md is missing.
- Invoke `brainstorming` when the solution shape is still open (multiple viable approaches). Skip it when the approach is already agreed.
- Capture target indicators (what will be measured after release) for the PL ↔ DP pairing.

### Step 2 — AN: specify what must be true

- Invoke `grill-me` in docs mode when open decisions remain or domain terms are fuzzy (only on explicit request or with the user's agreement — it is an intense interview).
- Invoke `spec-driven-development` to produce SPEC.md: numbered acceptance criteria, boundaries, rollback, baseline and indicators.
- Brownfield: invoke `codebase-modernization` in inventory mode before the SPEC.
- Invoke `security-hardening` for threats and sensitive data when the risk question flagged them.
- **Gate 1:** present the SPEC summary and the doubt-pass findings; ask for approval; record in GATES.md; mark the revision frozen.

Quick route: replace the SPEC with one or more agreed acceptance tests written in the conversation, and confirm them before any code.

### Step 3 — DE: design how and in what order

- Invoke `senior-solution-architect` when there are real architectural decisions; each one becomes an ADR.
- Invoke `writing-plans` to produce PLAN.md as a task graph: vertical slices, `Satisfies: AC-n`, `Blocked by:` edges, exact files and commands.
- Check coverage both ways: every `AC-n` has at least one task, every task satisfies at least one `AC-n`.
- **Gate 2:** present the task graph and coverage; ask for approval; record in GATES.md.

### Step 4 — BU: build test-first

- Invoke `executing-plans` (inline or subagent mode), which drives `test-driven-development` per task.
- On any unexpected failure, invoke `systematic-debugging` before attempting fixes.
- Brownfield changes: `codebase-modernization` change mode (characterization tests first, bounded component).
- Commits reference task and criterion: `feat(scope): message [T3, AC-2]`.
- Scope drift or new requirements → change protocol (`references/rules.md`).

### Step 5 — TE: prove it

- Invoke `test-strategy` to derive TEST-PLAN.md from the SPEC (independently of the implementation where possible) and fill gaps.
- Invoke `verification-gate` to run fresh evidence for every `AC-n` into VERIFICATION.md and build TRACEABILITY.md.
- Invoke `multi-axis-code-review` (spec, design and standards, correctness, security, simplicity).
- Invoke `security-hardening` as a review lens on Full routes and whenever sensitive data is involved.
- **Gate 3:** present the traceability matrix, evidence summary, open findings and residual risks; ask for approval; record in GATES.md.

### Step 6 — DP: ship, hand over, learn

- Invoke `deployment-pipeline` when the change deploys through CI/CD or needs a rollout strategy, quality gates, rollback rehearsal or monitoring.
- Invoke `shipping-and-handover` to integrate (merge, PR, keep, discard), write the PR body, and produce HANDOVER.md and the runbook.
- Invoke `retrospective` on Full routes (optional on Standard): acceptance decision, indicators vs baseline, environment improvements fed back to `project-context`.

### Progress display

Show the position on the V at every stage transition:

```
Agentic V-Method · Standard route
PL ✅ ▸ AN ✅ [G1] ▸ DE ✅ [G2] ▸ BU 🔄 T4/7 ▸ TE ⏳ ▸ DP ⏳
```

### Phase boundaries

At each stage transition decide whether to continue in the same context, clear, write a handoff, delegate to a subagent, or compact. Default to continuing through PL → AN → DE in one context so the plan is built on the same reasoning; start BU tasks fresh from PLAN.md when context is heavy. See `references/phase-boundaries.md`.

## Critical Rules

- **NEVER** write production code before Gate 1 (Standard/Full) or before agreed acceptance tests (Quick).
- **NEVER** treat silence, enthusiasm or "sounds good" about something else as gate approval. Ask the gate question explicitly and record the answer.
- **NEVER** claim a stage is complete without its exit criterion met and, for TE, without fresh evidence.
- **NEVER** downgrade a route silently; escalate when risk appears.
- **ALWAYS** follow `references/rules.md`: spec before change, evidence before claims, human-accountable gates, test first, builder does not grade itself, rollback always, sensitive data stays out, trace everything.
- **ALWAYS** discover and reuse the project's existing conventions before creating the default `docs/v-method/` layout.
- **ALWAYS** state when a review or verification was self-review because no independent context was available.
- **ALWAYS** keep artifacts as short as the route allows — ceremony serves the change, not the other way round.

## Example Usage

**1. New feature, Standard route**
> "Add CSV export to the reports page."

Step 0 finds no artifacts. PL: one component, moderate risk (exports customer names), reversible → Standard. AN: SPEC with AC-1 (export button visible to role X), AC-2 (file matches filtered rows), AC-3 (names escaped against CSV injection), rollback (feature flag off). Gate 1. DE: PLAN with T1–T4. Gate 2. BU via `executing-plans`. TE: evidence per AC, review, CSV-injection check. Gate 3. DP: PR with traceability summary.

**2. Bug fix, Quick route**
> "Users get logged out after 5 minutes instead of 30."

PL: one config path, low risk → Quick. Acceptance test agreed in chat: "session stays valid at 29 minutes, expires at 31." BU: failing regression test, fix, green. TE: `verification-gate` runs the suite fresh. DP: commit and PR.

**3. Resume**
> "Continue the payments refactor."

Step 0 finds `docs/v-method/2026-11-02-payments-refactor/` with GATES.md showing Gate 2 approved and commits for T1–T5. Confirms "Resume BU at T6?" and continues with `executing-plans`.

**4. Requirement change mid-flight**
> "Product now wants exports in Excel too."

Change protocol: pause at a safe point, impact analysis (new AC-4, new task T5, tests, rollback unchanged), SPEC revision 2, re-run Gate 1 and Gate 2, record both, resume.

**5. Brownfield modernization, Full route**
> "Move the claims module off the unsupported .NET Framework version."

Full route. PL: `project-context`. AN: `codebase-modernization` inventory, SPEC with behavior-preservation criteria and rollback. DE: ADR for re-platform vs migrate; task graph with characterization tests first. BU: subagent execution. TE: independent test design, security lens. DP: staged rollout via `deployment-pipeline`, HANDOVER.md, retrospective.
