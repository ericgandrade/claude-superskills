---
name: writing-plans
description: This skill should be used when the user has a spec or requirements for a multi-step task before touching code — breaking the work into a task graph of test-first vertical slices with exact files, commands, expected outputs and links to acceptance criteria (the Design stage and CP3 of the Agentic SDLC).
license: MIT
---

# Writing Plans

## Purpose

Turn an approved specification into an executable, low-ambiguity plan that another engineer — or a fresh agent with no context — can run task by task with predictable outcomes. The plan is a **task graph**: vertical slices, each declaring the acceptance criteria it satisfies and the tasks that block it. It is the **DE (Design)** artifact of the Agentic SDLC and the subject of **CP3**.

Write as if the executor is skilled but knows nothing about this codebase, its tools or its domain, and has questionable taste in test design. Spell out everything: files, code intent, commands, expected output. DRY. YAGNI. TDD. Frequent commits.

**Announce at start:** "Using the writing-plans skill to create the implementation plan."

## When to Use

- A SPEC (or equivalent requirements) exists and implementation has not started
- Work spans several files, layers or sessions and needs coordination
- A handoff-ready plan is needed for another session, engineer or subagents
- DE stage of the Agentic SDLC, after CP2 (and after `senior-solution-architect` when real design decisions exist)

Not for a one-file Quick-route fix — `test-driven-development` alone is enough there.

## Progress Tracking

```
[█████░░░░░░░░░░░░░░░] 25% — Phase 1/4: Gathering Context & Constraints
[██████████░░░░░░░░░░] 50% — Phase 2/4: Slicing Into a Task Graph
[███████████████░░░░░] 75% — Phase 3/4: Specifying Files, Code & Commands
[████████████████████] 100% — Phase 4/4: Coverage Check, CP3 & Handoff
```

## Workflow

### Phase 1 — Gather context and constraints

1. Read the approved SPEC (note its revision), the ADRs it produced, CONSTRAINTS.md, GLOSSARY.md and the Agentic SDLC block in AGENTS.md/CLAUDE.md.
2. Explore the code the plan will touch: entry points, existing tests and their harness, conventions, similar features to imitate.
3. Look for **prefactoring** opportunities — "make the change easy, then make the easy change." A prefactor becomes the first task.
4. Use the domain vocabulary from GLOSSARY.md in task titles and descriptions.

### Phase 2 — Slice into a task graph

Break the work into **tracer-bullet vertical slices**:
- Each slice cuts a narrow but complete path through every layer it needs (schema, API, UI, tests) — not a horizontal layer on its own.
- Each completed slice is demonstrable or verifiable on its own.
- Each slice fits in one fresh context window (a subagent can do it from the task text alone).
- Each slice declares **Satisfies:** the `AC-n` it delivers, and **Blocked by:** the tasks that must finish first ("—" if none).

**Wide refactors** (one mechanical change that breaks many call sites — renaming a column, retyping a shared symbol) are the exception: sequence them **expand → migrate → contract**. Expand adds the new form beside the old; migrate batches move callers over, each its own task blocked by expand, keeping the build green; contract removes the old form, blocked by every migrate batch.

Present the graph as a table before detailing tasks:

```markdown
| Task | Title | Satisfies | Implements | Blocked by |
|---|---|---|---|---|
| T1 | Prefactor report query into ReportQuery | — (enabler) | — | — |
| T2 | Export endpoint streams filtered rows as CSV | AC-1 | ADR-0007 | T1 |
| T3 | CSV-injection escaping | AC-2 | — | T2 |
| T4 | Permission check on button and endpoint | AC-3 | — | T2 |
| T5 | Row-limit guard with user message | AC-4 | ADR-0007 | T2 |
```

Ask the user whether granularity and blocking edges feel right before writing the detail.

### Phase 3 — Specify each task

Each step is one action of 2–5 minutes. Use this structure:

````markdown
### T2 — Export endpoint streams filtered rows as CSV

**Satisfies:** AC-1 · **Implements:** ADR-0007 · **Blocked by:** T1

**Files:**
- Create: `src/reports/export.ts`
- Modify: `src/reports/routes.ts:40-58`
- Test: `tests/reports/export.test.ts`

**Step 1: Write the failing test**
```ts
it("exports exactly the filtered rows as CSV", async () => {
  const res = await request(app).get("/reports/42/export?region=south");
  expect(res.status).toBe(200);
  expect(parseCsv(res.text)).toEqual(expectedSouthRows);
});
```

**Step 2: Run it and confirm it fails for the right reason**
Run: `npm test -- tests/reports/export.test.ts`
Expected: FAIL — 404 Not Found (route does not exist yet)

**Step 3: Write the minimal implementation**
```ts
// export.ts — stream rows from ReportQuery through a CSV serializer
```

**Step 4: Run it and confirm it passes**
Run: `npm test -- tests/reports/export.test.ts`
Expected: PASS (1 test)

**Step 5: Commit**
```bash
git add src/reports/export.ts src/reports/routes.ts tests/reports/export.test.ts
git commit -m "feat(reports): stream filtered rows as CSV [T2, AC-1]"
```
````

Rules for the detail:
- **Exact paths** always, with line ranges for modifications when known.
- **Real code** for tests and for anything non-obvious; never "add validation" without saying what is validated and how.
- **Exact commands** with the expected result — including the expected failure message in the red step.
- **Commit messages** carry the task ID and the criteria: `[T2, AC-1]`.
- **Non-code tasks** (docs, config, Markdown skills, infrastructure) still get a verification step: the command or check that proves the task is done (validator, lint, dry run, `terraform plan`).
- Reference relevant skills by name where they apply (`test-driven-development`, `systematic-debugging`, `security-hardening`).

### Phase 4 — Coverage check, CP3, handoff

1. **Coverage both ways:** every `AC-n` in the SPEC maps to at least one task; every task satisfies at least one `AC-n` or is an explicit enabler (prefactor, setup). Show the check as a short list; fix gaps before proceeding.
2. **Save the plan** to the project convention, or `docs/agentic-sdlc/YYYY-MM-DD-<feature>/PLAN.md` (standalone use: `docs/plans/YYYY-MM-DD-<feature>.md`). Optionally write one file per task under `tasks/NN-<slug>.md` for subagent execution or export to an issue tracker, keeping the `Blocked by` edges.
3. **Plan header:**

```markdown
# <Feature> — Implementation Plan

> **For the executor:** use the `executing-plans` skill to run this plan task by task.
> Source: SPEC revision <N> · ADRs: <list>

**Goal:** <one sentence> · **Architecture:** <2–3 sentences> · **Tech stack:** <key technologies>
```

4. **CP3:** present the task graph, coverage check and any risks; ask the Tech lead explicitly: "Approve this design and plan for execution?" End the turn. Record the decision in `CHECKPOINTS.md`; ADRs referenced by the plan move from *Proposed* to *Accepted*.
5. **Handoff:** offer the execution mode:
   - **Subagent mode (this session):** fresh subagent per task, spec-compliance review then quality review between tasks, parallel only across independent ready tasks.
   - **Inline mode or separate session:** batches with checkpoints, in this session or a new one opened on the plan file.
   Both run through `executing-plans`.

## Critical Rules

- **NEVER** plan against an unapproved SPEC on Standard or Full routes; report the missing CP2 instead.
- **NEVER** leave steps abstract — every step names files, code intent, commands and expected output.
- **NEVER** slice horizontally by layer except for wide refactors sequenced expand → migrate → contract.
- **NEVER** add tasks that satisfy no criterion and enable nothing; that is scope creep — raise it as a SPEC change.
- **ALWAYS** declare `Satisfies` and `Blocked by` on every task.
- **ALWAYS** start each code task with a failing test and its expected failure.
- **ALWAYS** run the coverage check before CP3.
- **ALWAYS** keep secrets and real personal or client data out of plan examples and fixtures.

## Example Usage

**1. From an approved SPEC**
> "SPEC rev 1 for CSV export is approved — write the plan."

Reads the SPEC and ADR-0007, finds the report query duplicated in two places, makes a prefactor T1, slices T2–T5 by criterion, shows the graph, gets agreement, writes TDD steps, passes the coverage check, requests CP3.

**2. Wide refactor**
> "Plan renaming `customer_id` to `account_id` across the monorepo."

Expand (add `account_id` alongside, dual-write), migrate in five batches by package (each blocked by expand), contract (drop `customer_id`, blocked by all batches). Each batch has its own green-build verification.

**3. Handoff to another session**
> "Write a plan I can execute tomorrow in a fresh session."

Self-contained tasks with full context, exact commands and expected outputs; plan header points to `executing-plans`; optional `tasks/` files.

**4. Infrastructure change**
> "Plan moving the worker from cron to a queue."

Tasks include `terraform plan` verification steps, a feature-flagged dual-run task, and a rollback task mapped to the SPEC's rollback section.

**5. Coverage gap found**
> Coverage check shows AC-4 (row limit) has no task.

Adds T5 before CP3 and reports the fix.
