---
name: spec-driven-development
description: This skill should be used when the user needs a written specification before code — turning an idea, brief, interview or conversation into a SPEC with numbered acceptance criteria, boundaries, rollback and success indicators, validating or revising an existing spec, or splitting a large initiative into module specs (the Analyze stage and Gate 1 of the Agentic V-Method).
license: MIT
---

# Spec-Driven Development

## Purpose

Write down what must be true when the work is done — before any code exists — so the human and the agents share one source of truth. The SPEC defines objectives, numbered acceptance criteria (`AC-n`), boundaries, rollback and how success will be measured. It is the **AN (Analyze)** artifact of the Agentic V-Method and the subject of **Gate 1**: once approved, the revision is frozen and every later artifact (PLAN tasks, commits, tests, evidence) traces back to its `AC-n` IDs.

Code without a spec is guessing; a spec without testable criteria is a wish.

## When to Use

- A feature, change or migration is about to be built and no approved spec exists
- A brainstorming brief or a grill-me summary needs to become buildable requirements
- Requirements are scattered across a conversation, tickets or meeting notes
- An existing spec must be validated before Gate 1, or revised after a requirement change
- One request bundles several independently shippable capabilities

Not for single-line fixes or unambiguous mechanical changes — on the Quick route, agree one or more acceptance tests in the conversation instead.

## Workflow

### Step 0 — Pick the mode and discover

| Mode | Use when |
|---|---|
| **create** | Little written input; a short interview is needed |
| **synthesize** | The conversation, brief or grill-me summary already holds the answers — no re-interview |
| **validate** | A SPEC exists and must be checked before Gate 1 |
| **revise** | An approved SPEC must change (change protocol) |

Discover before asking: read the brief (`BRIEF.md` or design doc), `GLOSSARY.md`, `CONSTRAINTS.md`, relevant ADRs and code. If the project already uses a spec system (OpenSpec, GitHub Spec Kit, `specs/`, issue templates), keep its format and location and apply this skill's content and gates to it.

### Step 1 — Scope check (only when needed)

If the request bundles capabilities that have their own users or data and could ship and be verified separately (e.g., identity, billing, notifications), propose a **capability map** before any spec:

```markdown
| Module | Responsibility | Depends on |
|---|---|---|
| identity | Accounts, sessions, SSO | — |
| billing | Plans, invoices, payments | identity |
Build order: identity → billing
```

Module ids are stable kebab-case names; dependencies point one way. Get the map approved, then write one SPEC per module in build order. Single-capability requests skip this step.

### Step 2 — Surface assumptions first

Before drafting, list the assumptions being made and invite correction:

```
ASSUMPTIONS:
1. Web app only, no native mobile
2. Existing session-cookie auth is reused
3. PostgreSQL via the current Prisma schema
→ Correct any of these now.
```

Never fill an ambiguity silently. An unstated assumption is the most expensive kind of misunderstanding.

### Step 3 — Draft the SPEC

Write to the project convention, or `docs/v-method/YYYY-MM-DD-<feature>/SPEC.md`. Use the template in `../agentic-v-method/references/artifacts.md` when available. Required sections:

1. **Problem and objectives** — why, for whom, what outcome
2. **Non-goals** — explicitly out of scope (carry over the brief's "Not doing")
3. **Users and actors**
4. **Acceptance criteria** — numbered `AC-1…`, Given/When/Then
5. **Boundaries** — *Always* / *Ask first* / *Never*
6. **Constraints** — references to CONSTRAINTS.md plus feature-specific limits
7. **Security and sensitive data** — data handled, trust boundaries, threats, synthetic-data plan
8. **Risks and assumptions** — each with a mitigation or a way to verify
9. **Rollback** — exact steps to undo, and how to confirm the previous state is restored
10. **Baseline and indicators** — what will be measured after release, today's value, target, method
11. **Open questions** — must be empty or explicitly deferred with an owner before Gate 1
12. **Revision history**

Keep the SPEC as short as the route allows: a Standard-route SPEC often fits on one screen.

### Step 4 — Write acceptance criteria that can be proven

Each `AC-n` must be:
- **Observable** — describes behavior or output someone can see or measure, not implementation ("uses Redis" is a design decision, not a criterion)
- **Testable** — a test or a command can show pass or fail without interpretation
- **Single** — one behavior per criterion; split "and" statements
- **Bounded** — states the limits: sizes, roles, timeouts, error cases

Cover the unhappy paths, not just the happy one: invalid input, missing permissions, empty states, concurrency, partial failure, limits. Add non-functional criteria when they matter (p95 latency, accessibility level, data retention).

```
AC-1  Given a manager viewing a filtered report, when they click Export CSV, then a file downloads containing exactly the visible rows and columns.
AC-2  Given a cell value starting with =, +, - or @, when exported, then the value is prefixed with a single quote (CSV-injection safe).
AC-3  Given a user without the reports:export permission, when they open the report, then no Export button is shown and the export endpoint returns 403.
AC-4  Given a filter matching more than 50,000 rows, when Export is clicked, then the user is told the limit and no partial file is produced.
```

### Step 5 — Doubt pass

Before presenting for approval, attack the draft — in a fresh-context subagent when available, otherwise as an explicit self-review labeled as such. Check:
- Could two engineers build different things that both satisfy every `AC`?
- Which criterion would fail first in production? Is it covered?
- What happens on the unhappy paths listed above?
- Is any criterion actually a design decision in disguise?
- Is the rollback executable as written, and has data migration been considered?
- Can each indicator be measured with tools that exist today?
- Do boundaries forbid the dangerous shortcuts (prod data, disabling checks, secrets)?

Fix what the doubt pass finds; list what remains as open questions or risks.

### Step 6 — Gate 1

Present a short summary: objective, `AC` list, boundaries, rollback, indicators, doubt-pass findings, open items. Ask explicitly: "Approve SPEC revision 1 as the build baseline?" On approval:
- Set status to *Approved (frozen)* and record the approver and date in the revision history
- Record the gate in `GATES.md` (gate, date, approver, evidence reviewed, residual risk, decision)
- Hand off to `senior-solution-architect` (if real design decisions exist) or `writing-plans`

### Revise mode (after Gate 1)

Follow the change protocol: write the change request, analyze impact on `AC`s, tasks, tests, rollback and indicators, create revision N+1 (never edit a frozen revision in place without a new revision entry), mark changed and new criteria, and re-run Gate 1. Notify `writing-plans` to update the plan if tasks changed.

### Validate mode

Run Steps 4 and 5 against an existing SPEC and report findings as a table: section, issue, severity (blocking / should fix / nice to have), suggested fix. Do not rewrite the SPEC without approval.

## Critical Rules

- **NEVER** start or allow implementation before Gate 1 approval (Standard and Full routes).
- **NEVER** fill an ambiguity silently; surface assumptions and ask.
- **NEVER** edit a frozen SPEC revision in place; create a new revision through the change protocol.
- **NEVER** write implementation details as acceptance criteria.
- **ALWAYS** number criteria (`AC-n`) and keep IDs stable across revisions; retire, do not reuse, deleted IDs.
- **ALWAYS** include a rollback and at least one measurable indicator.
- **ALWAYS** cover unhappy paths and permissions in the criteria.
- **ALWAYS** keep real personal, health or client data out of the SPEC and its examples.
- **ALWAYS** reuse an existing spec system's format when the project has one.

## Example Usage

**1. Synthesize from a brief**
> "We agreed the export design in brainstorming — write the spec."

Synthesize mode, no re-interview. Lists three assumptions, drafts SPEC with AC-1..AC-6 including CSV injection and permission criteria, rollback by feature flag, indicator "support tickets requesting exports per month". Doubt pass adds the row-limit criterion. Gate 1 approved; hands off to `writing-plans`.

**2. Create with a short interview**
> "Write a spec for password reset via email."

Asks four questions one at a time (token lifetime, rate limits, what happens to active sessions, email provider). Drafts criteria for expired tokens, reused tokens, unknown emails (no account enumeration) and rate limiting.

**3. Large initiative**
> "Spec the new customer portal: login, billing, notifications and usage reports."

Scope check produces a capability map with four modules and a build order; after approval, writes `SPEC-identity.md` first.

**4. Validate before approval**
> "Check this spec before we approve it."

Reports: two criteria not testable ("fast", "user-friendly"), missing rollback for the schema change, no indicator. Suggests concrete rewrites.

**5. Requirement change**
> "Product now wants Excel export too."

Revise mode: impact analysis adds AC-7 and AC-8, notes a new dependency (ask-first boundary), creates revision 2, re-runs Gate 1, records it in GATES.md.
