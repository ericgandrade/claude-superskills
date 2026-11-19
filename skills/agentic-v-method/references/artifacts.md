# Agentic V-Method — Artifact Templates

All artifacts are plain Markdown in the user's repository. **Discover first:** if the project already has conventions (e.g., `docs/plans/`, `specs/`, `adr/`, an issue tracker), use them and map these templates onto them. Otherwise use the default layout:

```
<project>/
├── AGENTS.md / CLAUDE.md        # V-Method block (project-context)
├── CONSTRAINTS.md               # quality bar contract (project-context)
├── GLOSSARY.md                  # domain vocabulary (grill-me docs mode)
├── docs/adr/NNNN-<slug>.md      # decision records
└── docs/v-method/<YYYY-MM-DD-feature>/
    ├── SPEC.md  PLAN.md  tasks/NN-<slug>.md
    ├── TEST-PLAN.md  VERIFICATION.md  TRACEABILITY.md  GATES.md
    └── HANDOVER.md  RETRO.md
```

Keep each artifact as short as the route allows: a Quick route may produce only a commit message and a VERIFICATION entry; a Full route produces everything.

---

## SPEC.md (AN)

```markdown
# SPEC — <feature name>

**Revision:** 1 · **Status:** Draft | Approved (frozen) | Superseded · **Route:** Quick | Standard | Full
**Owner (approver):** <name> · **Date:** YYYY-MM-DD

## 1. Problem and objectives
<Why this change exists, for whom, and what outcome it must produce.>

## 2. Non-goals
- <Explicitly out of scope>

## 3. Users and actors
- <Who uses or is affected>

## 4. Acceptance criteria
- **AC-1** — Given <context>, when <action>, then <observable result>.
- **AC-2** — …

## 5. Boundaries
- **Always:** <things the implementation must always do>
- **Ask first:** <changes that need approval: schema, public API, dependencies, infra>
- **Never:** <forbidden actions: touch prod data, disable checks, commit secrets>

## 6. Constraints
<References to CONSTRAINTS.md thresholds and any feature-specific constraints.>

## 7. Security and sensitive data
<Data handled, trust boundaries, threats considered, synthetic data plan.>

## 8. Risks and assumptions
| ID | Risk / assumption | Mitigation / how verified |
|---|---|---|

## 9. Rollback
<Exact steps to undo the change and how to confirm the system is back to the previous state.>

## 10. Baseline and indicators
| Indicator | Baseline (today) | Target | How measured | When |
|---|---|---|---|---|

## 11. Open questions
- <Must be empty before Gate 1, or explicitly deferred with owner>

## Revision history
| Rev | Date | Change | Approved by |
|---|---|---|---|
```

## PLAN.md (DE)

```markdown
# PLAN — <feature name>

> Execute with `executing-plans`. Source: SPEC revision <N>.

**Goal:** <one sentence> · **Architecture:** <2–3 sentences, links to ADRs> · **Stack:** <key tech>

## Task graph
| Task | Title | Satisfies | Blocked by |
|---|---|---|---|
| T1 | <vertical slice> | AC-1 | — |
| T2 | <vertical slice> | AC-2, AC-3 | T1 |

## Tasks

### T1 — <title>
**Satisfies:** AC-1 · **Blocked by:** — 
**Files:** Create `path` · Modify `path:lines` · Test `path`
1. Write the failing test (code) — run `<command>`, expect FAIL: <reason>
2. Implement the minimum (code) — run `<command>`, expect PASS
3. Refactor if needed — tests stay green
4. Commit: `feat(<scope>): <message> [T1, AC-1]`
```

## TEST-PLAN.md (TE)

```markdown
# TEST PLAN — <feature name> (from SPEC revision <N>)

| AC | Level | Test case | Location | Status |
|---|---|---|---|---|
| AC-1 | integration | <case description> | `tests/…::test_name` | planned / written / passing |

## Non-functional checks
| Check | Threshold (from SPEC/CONSTRAINTS) | Method |
|---|---|---|

## Regression scope
<Existing suites to re-run and why.>
```

## VERIFICATION.md (TE)

```markdown
# VERIFICATION — <feature name>

| # | Claim | AC | Command | Result (excerpt) | Date |
|---|---|---|---|---|---|
| V1 | Login rejects expired tokens | AC-2 | `npm test -- auth.spec.ts` | `14 passed, 0 failed` | YYYY-MM-DD |

Full outputs: <attached below or linked CI run>.
Self-review disclosure: <independent reviewer used? yes/no>
```

## TRACEABILITY.md (TE)

```markdown
# TRACEABILITY — <feature name>

| AC | Task(s) | Commit(s) | Test(s) | Evidence | Release | Gap? |
|---|---|---|---|---|---|---|
| AC-1 | T1 | a1b2c3d | `auth.spec.ts::rejects_expired` | V1 | v1.4.0 | — |
```

## GATES.md

```markdown
# GATES — <feature name>

| Gate | Date | Approver | Evidence reviewed | Residual risk accepted | Decision |
|---|---|---|---|---|---|
| Gate 1 (SPEC) | | | SPEC rev 1, doubt-pass notes | | approved / with conditions / rejected |
| Gate 2 (PLAN) | | | PLAN, AC↔task coverage | | |
| Gate 3 (Evidence) | | | VERIFICATION, TRACEABILITY, review findings | | |
```

## HANDOVER.md (DP)

```markdown
# HANDOVER — <feature name>

## What changed and why
## How to operate it
<Configuration, feature flags, scheduled jobs, dependencies.>
## Runbook
| Situation | Symptoms | Action | Escalation |
|---|---|---|---|
## Rollback
<Copied from SPEC, updated with the rehearsal result.>
## Monitoring
<Dashboards, alerts, log queries tied to SPEC indicators.>
## Open risks and follow-ups
## Decision records
<Links to ADRs created or updated.>
```

## RETRO.md (DP → PL)

```markdown
# RETRO — <feature name>

**Acceptance decision:** accepted | accepted with follow-ups | rejected
## Indicators vs baseline
| Indicator | Baseline | Target | Measured | Source |
|---|---|---|---|---|
## Findings (each with source: file, commit, log, gate record)
## Environment improvements
| Finding | Type | Change | Where (check / CONSTRAINTS / AGENTS.md pitfall / tooling) |
|---|---|---|---|
```

## ADR — docs/adr/NNNN-<slug>.md (DE)

```markdown
# NNNN — <decision title>

**Status:** Proposed | Accepted | Superseded by NNNN · **Date:** YYYY-MM-DD · **Related:** SPEC <feature>, AC-n

## Context
## Decision
## Alternatives considered
| Option | Pros | Cons |
|---|---|---|
## Consequences
<Positive, negative, and what becomes harder to change (one-way vs two-way door).>
```

## CONSTRAINTS.md (PL)

```markdown
# CONSTRAINTS — quality bar contract

Last reviewed: YYYY-MM-DD by <name>. Loosening any rule requires an ADR. Reviews flag any diff that weakens this bar.

## Floor (always enforced)
- No new suppression comments (`@ts-ignore`, `eslint-disable`, `# noqa`, `# type: ignore`)
- No unimplemented stubs or empty catch blocks
- No skipped or deleted tests without a reason in the commit message
- No secrets in source
- This file is not weakened to make a change pass

## Enforced with numbers
| Dimension | Rule | Checked by (exact command) | Runs at |
|---|---|---|---|
| Types / lint | zero errors | `npm run lint && npm run typecheck` | every task |
| Coverage | changed lines ≥ 80% | `<coverage command>` + git diff | task end, CI |
| Dependencies | nothing at high or above | `<audit command>` | CI |
| Accessibility | zero critical/serious on new UI | `<a11y command>` | preview |

## Measured, not yet enforced (ratchets)
| Metric | Today | Direction |
|---|---|---|
| Project coverage | 62.4% | must not fall |

## Exceptions
| ID | Rule | Path | Reason | Owner | Expires |
|---|---|---|---|---|---|
```

## AGENTS.md / CLAUDE.md block (PL)

```markdown
<!-- V-METHOD:BEGIN -->
## Agentic V-Method
- Build: `<command>` · Test: `<command>` · Lint: `<command>` · Run: `<command>`
- Artifacts: `docs/v-method/<date-feature>/` · ADRs: `docs/adr/` · Quality bar: `CONSTRAINTS.md` · Vocabulary: `GLOSSARY.md`
- Conventions: <naming, branching, commit format>
- Pitfalls (observed agent mistakes):
  - <date> — <mistake> → <correct behavior>
<!-- V-METHOD:END -->
```
