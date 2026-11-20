---
name: brainstorming
description: This skill should be used when the user needs pre-implementation ideation for creative work, such as creating features, building components, adding functionality, or modifying behavior — exploring the problem, generating and comparing approaches, and agreeing on a design brief before any specification or code (the Plan stage of the Agentic SDLC).
license: MIT
---

# Brainstorming Ideas Into Designs

## Purpose

Turn a raw idea into an agreed design brief through collaborative dialogue: understand the real problem, widen the option space, converge on one direction with explicit trade-offs, and write down what will and will not be built. In the Agentic SDLC this is the **PL (Plan)** stage's ideation step; its output feeds `spec-driven-development` in AN.

## When to Use

- A request creates or changes behavior and the solution shape is still open
- Requirements are vague ("make onboarding better") or a single solution was assumed too early
- Several viable approaches exist and trade-offs must be weighed
- A design must be agreed before a specification or code is written

Skip it when the approach is already agreed and only the details remain — go straight to `spec-driven-development`. For a well-understood bug, use the Quick route of `agentic-sdlc` instead.

## Progress Tracking

Display a progress gauge before each phase:

```
[████░░░░░░░░░░░░░░░░] 20% — Phase 1/5: Exploring Context
[████████░░░░░░░░░░░░] 40% — Phase 2/5: Understanding the Problem
[████████████░░░░░░░░] 60% — Phase 3/5: Diverging — Generating Options
[████████████████░░░░] 80% — Phase 4/5: Converging — Choosing and Designing
[████████████████████] 100% — Phase 5/5: Writing the Brief
```

## Workflow

<HARD-GATE>
Do NOT write code, scaffold projects, or invoke any implementation skill until a design brief has been presented and the user has approved it. This applies to every request regardless of perceived simplicity. A simple change gets a short brief — a few sentences — but it still gets one.
</HARD-GATE>

### Phase 1 — Explore context

Before asking anything, read what exists: relevant files, docs, AGENTS.md or CLAUDE.md, CONSTRAINTS.md, GLOSSARY.md, recent commits touching the area. Report in two or three lines what was found. Never ask a question the repository already answers.

### Phase 2 — Understand the problem

Ask one question per message, multiple choice when possible. Cover, in order of what is still unknown:
1. **Who** has the problem and **what** they are trying to accomplish
2. **Why now** — what changed, what it costs to leave it alone
3. **Success** — what observable outcome means it worked (this becomes the target indicator for the PL ↔ DP pairing)
4. **Constraints** — deadlines, platforms, compliance, budgets, things that cannot change

Restate the problem as a one-sentence "How might we…" statement and confirm it before generating options. If the stated request is a solution in disguise ("add a dropdown"), surface the underlying need and confirm which one to design for.

### Phase 3 — Diverge: generate options

Produce 5–8 meaningfully different directions, not variations of one. Use lenses deliberately:
- **Inversion** — what if the opposite were true or the step were removed?
- **Constraint removal** — what if time, budget or the current architecture were not limits?
- **Simplification** — what is the smallest thing that delivers most of the value?
- **Audience shift** — how would a different user type solve it?
- **Analogy** — how do other products or domains solve the same shape of problem?
- **Build vs reuse** — what already exists in the codebase, platform or ecosystem?

Keep each option to two or three lines. Do not evaluate yet.

### Phase 4 — Converge: choose and design

1. Cluster the options and shortlist 2–3 that are genuinely different.
2. Compare them on: value to the user, effort and risk, reversibility, fit with existing architecture and CONSTRAINTS.md, what each makes harder later.
3. Lead with a recommendation and the reason for it; let the user choose.
4. **Surface assumptions:** list what must be true for the chosen direction to work, and how each could be checked cheaply.
5. **Prototype detour (optional):** when a question cannot be settled on paper — a state model that must "feel right", a UI that must be seen, a performance doubt — propose a throwaway prototype on its own branch (`prototype/<name>`) or directory. The prototype answers one question; its learning returns to this conversation; its code is not merged as is.
6. Present the design in sections scaled to their complexity (a sentence when obvious, up to ~250 words when nuanced) and confirm each before moving on: components, data flow, error handling, testing approach, rollout.
7. Apply YAGNI ruthlessly: every feature that does not serve the confirmed success criterion moves to "Not doing".

### Phase 5 — Write the brief and hand off

Save the brief using the project's convention if one exists (e.g., `docs/plans/YYYY-MM-DD-<topic>-design.md`); otherwise `docs/agentic-sdlc/YYYY-MM-DD-<topic>/BRIEF.md`.

```markdown
# BRIEF — <topic>

**Problem:** <How might we… statement>
**Users:** <who> · **Why now:** <trigger>
**Success indicator:** <what will be measured, baseline if known>
**Chosen direction:** <one paragraph>
**Alternatives considered:** <option — why not>
**Key assumptions to validate:** <assumption — how to check>
**Design outline:** <components, data flow, errors, testing, rollout>
**Not doing (and why):** <items>
**Open questions:** <items, each with an owner>
```

Commit the brief only with the user's go-ahead. Then hand off:
- **Agentic SDLC / most cases:** invoke `spec-driven-development` to turn the brief into a SPEC with numbered acceptance criteria (AN stage).
- **Spec already exists or the user explicitly wants to skip it:** invoke `writing-plans`.
- Do not invoke implementation skills from brainstorming.

## Critical Rules

- **NEVER** start implementation before the user approves the brief.
- **NEVER** present a single option as if it were the only one; always compare at least two genuinely different approaches.
- **NEVER** ask more than one question per message, or ask what the repository already answers.
- **NEVER** evaluate while diverging — generate first, judge second.
- **ALWAYS** confirm the problem statement before generating solutions.
- **ALWAYS** capture a success indicator so the Operate stage can measure the outcome after release.
- **ALWAYS** record "Not doing" items with reasons — they prevent scope creep later.
- **ALWAYS** keep prototypes throwaway and outside the main branch.

## Common Rationalizations

| Thought | Reality |
|---|---|
| "This is too simple to need a design" | Simple changes hide the most unexamined assumptions. Write a three-sentence brief. |
| "The user already said what they want" | They said a solution. Confirm the need behind it. |
| "One good option is enough" | Without an alternative there is no trade-off, only a guess. |
| "We can figure out success later" | Without an indicator, Deploy cannot tell whether it worked. |
| "The prototype works, let's ship it" | Prototypes skip tests and edge cases by design. Carry the learning, rebuild it through the cycle. |

## Red Flags — Stop and Reset

- The conversation has produced code before a brief was approved
- Every option on the shortlist is a variation of the same idea
- The success criterion is "users will like it" or "it will be better"
- The design grows each round instead of getting sharper
- Questions are being stacked three or four per message
- The brief has no "Not doing" section

When any of these appears, say so plainly, go back to the last confirmed point, and continue from there.

## Comparison Matrix Template

Use this in Phase 4 when the shortlist has three options or the trade-offs are close:

```markdown
| Criterion | Option A | Option B | Option C |
|---|---|---|---|
| Value to the user (against the success indicator) | High | Medium | High |
| Effort (rough) | 3 days | 1 day | 2 weeks |
| Risk / unknowns | Low | Low | High — new infra |
| Reversibility | Two-way door | Two-way door | One-way door |
| Fit with architecture and CONSTRAINTS.md | Good | Good | Needs ADR |
| What it makes harder later | — | Reporting | Ops on-call load |
| **Recommendation** | ✅ | fallback | not now |
```

A **one-way door** decision (hard to reverse: data migrations, public APIs, vendor lock-in) deserves more options and an ADR in the Design stage; a **two-way door** decision can be made quickly and revisited.

## Example Usage

**1. Vague improvement**
> "Onboarding is bad, let's improve it."

Explores the signup flow code and analytics events, asks who drops off and where (multiple choice), confirms "How might we get new team admins to invite a teammate in their first session?", generates seven directions, shortlists three, recommends a guided invite step, records "Not doing: full product tour". Hands off to `spec-driven-development`.

**2. Solution in disguise**
> "Add a dropdown to filter reports by region."

Asks why; learns managers need to compare their region against the company average. Offers the dropdown, a saved default view and a comparison column; the user picks the comparison column plus default view.

**3. Prototype detour**
> "Should the approval workflow be a state machine or a simple status field?"

Shortlists both, then proposes a 30-minute throwaway state-machine prototype on `prototype/approval-states` to test three real approval scenarios. The learning (two states were missing) goes into the brief.

**4. Architecture options**
> "We need real-time notifications."

Compares polling, server-sent events and WebSockets on effort, infrastructure fit and reversibility; recommends server-sent events given the existing HTTP stack; records WebSockets under alternatives with the condition that would change the decision.

**5. Small change, short brief**
> "Let users export their profile data."

Three-sentence brief: JSON export of profile fields, success = support tickets about data requests drop, not doing = PDF export. Approved in one round; hands off to `spec-driven-development`.
