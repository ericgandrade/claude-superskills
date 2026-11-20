---
name: agentic-sdlc
description: This skill should be used when the user wants to run software work end to end through the Agentic SDLC (Plan, Analyze, Design, Build, Test, Review, Deploy, Operate) with AI agent roles and named human checkpoints — starting a feature, change, bug fix or modernization the disciplined way, asking which stage or skill comes next, resuming work from existing SPEC or PLAN artifacts, or handling a requirement change mid-flight.
license: MIT
---

# Agentic SDLC

## Purpose

Drive AI-assisted software delivery as a continuous cycle of eight stages — **PL** Plan · **AN** Analyze · **DE** Design · **BU** Build · **TE** Test · **RV** Review · **DP** Deploy · **OP** Operate. In each stage an AI agent role does the work and a named human role holds the checkpoint: the Product owner approves scope (CP1) and the SPEC (CP2), the Tech lead signs off the design (CP3), an Engineer approves the PR (CP4), the Release manager approves the production release (CP5), and the On-call engineer owns incidents in Operate. Build and Test loop automatically within strict limits. Operate feeds production learnings back into Plan.

One rule ties the cycle together: **every requirement is proven**. Acceptance-criterion IDs (`AC-n`) defined in Analyze trace through tasks, commits, tests, evidence, PR approval and release.

This skill is the router. It sizes the work, picks the route, dispatches the agent roles in order, enforces the checkpoints, records approvals, and resumes from artifacts already in the repository. Each stage reads the artifacts directly (SPEC, PLAN, CHECKPOINTS) — the router never paraphrases one stage's output for the next.

Read before running:
- `references/lifecycle.md` — the cycle, stages, checkpoints, routes, automatic loops, traceability rule
- `references/agents.md` — the eight agent roles, their limits, report status vocabulary and severity scale
- `references/rules.md` — the non-negotiable rules and the change protocol
- `references/artifacts.md` — templates for every artifact
- `references/phase-boundaries.md` — when to continue, delegate, clear, hand off or compact

## When to Use

- Starting a feature, change, bug fix, migration or modernization and wanting a disciplined path from request to production
- Asking "what's next?", "which skill now?", or "where are we?" on software work
- Resuming work in a repository that already contains `docs/agentic-sdlc/*/SPEC.md`, `PLAN.md`, `VERIFICATION.md` or `CHECKPOINTS.md`
- A requirement changes after the SPEC was approved
- Entering a specific stage directly: plan, analyze, design, build, test, review, deploy, operate
- An incident or postmortem produced new work that must re-enter the cycle

Do not use for one-off questions, explanations, or edits the user is directing line by line. For pure ideation with no delivery intent, use `brainstorming`; for a stand-alone review, use `multi-axis-code-review`.

## Workflow

### Step 0 — Detect state

1. Search for existing cycle artifacts: `docs/agentic-sdlc/**`, `**/SPEC.md`, `**/PLAN.md`, `**/CHECKPOINTS.md`, plus the project's own conventions (`docs/plans/`, `specs/`, `adr/`, tracker references in AGENTS.md or CLAUDE.md).
2. Look for the Agentic SDLC block in AGENTS.md or CLAUDE.md (`<!-- AGENTIC-SDLC:BEGIN -->`). If missing on a Standard or Full route, plan to run `project-context` in PL.
3. If artifacts exist, determine the current stage from the latest checkpoint record and the presence of downstream artifacts, then confirm: "SPEC rev 2 approved (CP2), PLAN approved (CP3), T1–T5 committed. Resume BU at T6?"
4. If the user named a stage, jump there after checking its entry conditions (e.g., BU requires CP3 on Standard/Full). Report missing prerequisites; never skip them silently.

### Step 1 — PL: triage, size, choose the route (Triage Agent → CP1)

- Invoke `issue-triage` to score readiness, clarify the request and propose a priority (for ad-hoc requests, triage is a short check).
- Ask at most three sizing questions, one at a time, only where the repository cannot answer: **scope** (components, sessions), **risk** (security, money, personal or health data, public APIs, schemas, production infrastructure), **reversibility** (single revert vs data migration or broken contracts). Risk triggers force a minimum route regardless of size.

| Route | Signals |
|---|---|
| **Quick** | One component, low risk, trivially reversible, well understood |
| **Standard** | One session, moderate scope, reversible with a plan |
| **Full** | Multi-session, cross-cutting, high-risk, regulated, brownfield modernization, or hard to reverse |

- Standard/Full: invoke `project-context` if the Agentic SDLC block or CONSTRAINTS.md is missing; invoke `brainstorming` when the solution shape is still open; capture target indicators for Operate to measure.
- **CP1:** present scope, priority, route and the artifacts the route will produce; ask the Product owner for approval; end the turn.

### Step 2 — AN: specify what must be true (Analyst Agent → CP2)

- Invoke `grill-me` (docs mode) when open decisions remain and the user agrees; invoke `spec-driven-development` to produce SPEC.md with numbered acceptance criteria, boundaries, rollback, baseline and indicators.
- Brownfield: `codebase-modernization` inventory mode first. Sensitive data or risk flags: `security-hardening` threats section.
- **CP2:** present the SPEC summary and doubt-pass findings; ask the Product owner for approval; record it; mark the revision frozen; end the turn.
- Quick route: agree one or more acceptance tests in the conversation instead of a SPEC; CP1–CP3 collapse into this single confirmation.

### Step 3 — DE: design how and in what order (Architect Agent → CP3)

- Invoke `senior-solution-architect` for real architectural decisions (each becomes an ADR) and `writing-plans` for PLAN.md: vertical slices, `Satisfies: AC-n`, `Blocked by:` edges, exact files and commands.
- Check coverage both ways: every `AC-n` has a task; every task serves an `AC-n` or is an explicit enabler.
- **CP3:** present the design and task graph; ask the Tech lead for sign-off; record it; ADRs move to Accepted; end the turn.

### Step 4 — BU ↔ TE: build and test in a bounded automatic loop (Coding Agent, QA Agent)

- Invoke `executing-plans` (subagent or inline mode); each task is built with `test-driven-development`; unexpected failures go through `systematic-debugging` before any fix.
- Invoke `test-strategy` (QA Agent, from the SPEC, not from the implementation) and `verification-gate` to record fresh evidence per `AC-n` in VERIFICATION.md and TRACEABILITY.md.
- Failures loop back to the Coding Agent: at most 5 fix rounds per task, a fresh more capable agent from round 4, then an explicit ruling on every open finding and a notification to the human. Never weaken tests or thresholds to get green.
- Scope drift or new requirements → change protocol (`references/rules.md`).

### Step 5 — RV: review (Review Agent → CP4)

- Invoke `multi-axis-code-review` (spec compliance, design and standards, correctness and edge cases, security, simplicity) and `security-hardening` as a review lens when sensitive data or Full route.
- Route findings by root cause: intent gap → new SPEC revision (back to CP2); plan defect → PLAN amendment (back to CP3); local defect → back to BU.
- **CP4:** present the traceability matrix, evidence summary, open findings and residual risks; ask the Engineer to approve the PR; record it; end the turn.

### Step 6 — DP: deploy (Release Agent → CP5)

- Invoke `deployment-pipeline` for rollout strategy, feature flags, quality gates, rollback rehearsal and monitoring; invoke `shipping-and-handover` for integration, PR/release notes, HANDOVER.md and runbook.
- **CP5:** present the rollout plan, rollback rehearsal result and monitoring; ask the Release manager to approve the production release; never deploy to production or tag without it.

### Step 7 — OP: operate and feed back (SRE Agent, On-call engineer)

- Invoke `operations-and-incidents` to watch SLOs and the SPEC indicators during the watch period, triage incidents with the on-call engineer and draft postmortems.
- Invoke `retrospective` (mandatory on Full, optional on Standard): acceptance decision, indicators vs baseline, environment improvements fed to `project-context`.
- Every incident action, postmortem item and indicator miss becomes a new item for `issue-triage` — the cycle restarts at PL.

### Progress display

Show the position in the cycle at every stage transition:

```
Agentic SDLC · Standard route
PL ✅ CP1 ▸ AN ✅ CP2 ▸ DE ✅ CP3 ▸ BU 🔄 T4/7 ⇄ TE ⏳ ▸ RV ⏳ ▸ DP ⏳ ▸ OP ⏳
```

## Critical Rules

- **NEVER** write production code before CP2 (Standard/Full) or before agreed acceptance tests (Quick).
- **NEVER** treat silence, enthusiasm or "whatever you think" as checkpoint approval. Ask explicitly, end the turn, and record the role, the person and the exact words.
- **NEVER** let the Coding Agent verify or review its own work; TE and RV run as separate roles.
- **NEVER** run the BU ↔ TE loop without its cap; at the cap, escalate to a human.
- **NEVER** deploy to production, push release tags or take destructive production actions without CP5 or the on-call engineer.
- **NEVER** downgrade a route silently; escalate when risk appears.
- **ALWAYS** follow `references/rules.md`: spec before change, evidence before claims, human-accountable checkpoints, test first, builder does not grade itself, rollback always, sensitive data stays out, every requirement is proven.
- **ALWAYS** discover and reuse the project's conventions before creating the default `docs/agentic-sdlc/` layout.
- **ALWAYS** keep artifacts as short as the route allows — ceremony serves the change.

## Example Usage

**1. New feature, Standard route**
> "Add CSV export to the reports page."

Triage: ready, priority medium; moderate risk (customer names) → Standard. CP1. AN: SPEC with AC-1..AC-4 (visible rows, CSV-injection escaping, permission, row limit), rollback by feature flag. CP2. DE: one ADR, PLAN T1–T5. CP3. BU ⇄ TE until every AC has evidence. RV: five axes, one Important finding fixed. CP4. DP: flag rollout to 10% then 100%, rollback rehearsed. CP5. OP: export error rate and support tickets watched for a week; retrospective.

**2. Bug fix, Quick route**
> "Users get logged out after 5 minutes instead of 30."

Triage → Quick. One confirmation of the acceptance test ("valid at 29 min, expired at 31"). BU: failing regression test, fix. TE: suite re-run fresh. RV: light review; CP4 approves the PR. No CP5 needed for a config-only change behind the normal pipeline.

**3. Resume**
> "Continue the payments refactor."

Step 0 finds CHECKPOINTS.md with CP3 approved and commits for T1–T5; confirms "Resume BU at T6?" and continues.

**4. Requirement change mid-flight**
> "Product now wants Excel export too."

Change protocol: impact analysis (new AC-5, task T6, tests), SPEC revision 2, CP2 and CP3 again, recorded, resume.

**5. Incident feeds the cycle**
> "Exports are timing out in production since yesterday's release."

OP: SRE Agent correlates the alert with the release, the on-call engineer flips the feature flag off (rollback), postmortem drafted; the action item "stream exports above 10k rows" goes to `issue-triage` as a new PL item.
