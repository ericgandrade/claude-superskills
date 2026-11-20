---
name: grill-me
description: Relentless Socratic interview that walks down every branch of a plan or design, resolving decisions round by round and, inside a repository, recording glossary terms and ADRs as it goes (Analyze stage of the Agentic SDLC). Trigger ONLY when the user explicitly says "grill me" or the PT equivalent "me grille", or when the agentic-sdlc router invokes it with the user's agreement. Do NOT trigger for stress-test, poke holes, devil's advocate, challenge, review, or feedback requests.
license: MIT
---

# Grill Me

## Purpose

Stress-test a plan, design or idea through relentless questioning until every branch of the decision tree is resolved and nothing is silently assumed. The agent finds the facts; the human makes the decisions.

Inside a repository, run in **docs mode**: resolved vocabulary goes into `GLOSSARY.md` and hard-to-reverse decisions become ADRs, so the interview leaves a durable trail. In the Agentic SDLC this is an **AN (Analyze)** tool: the closing summary is the raw material for `spec-driven-development`.

## When to Use

Trigger ONLY when the user explicitly uses the word "grill" — e.g.:
- "grill me on this"
- "grill me on my plan / architecture / design"
- "I want you to grill me before I present"
- PT: "me grille sobre esse plano"

Also run when the `agentic-sdlc` router proposes it during Analyze and the user agrees.

Do NOT trigger for synonyms or near-misses, even when the intent seems similar:
- "stress-test this" → not grill-me
- "poke holes in my plan" → not grill-me
- "play devil's advocate" → not grill-me
- "challenge my assumptions" → not grill-me
- "pressure-test this" → not grill-me
- "review this and tell me what's wrong" → not grill-me
- "give me feedback" → not grill-me

## Workflow

### Step 0 — Understand the subject and choose the mode

Read the plan, design or idea provided. If working in a codebase, explore the relevant files, `GLOSSARY.md`, existing ADRs (`docs/adr/`) and the Agentic SDLC artifacts (`docs/agentic-sdlc/**`) before asking anything that the code or docs can answer.

- **Docs mode** (default inside a repository): record terms and decisions as they settle.
- **Conversation mode** (no repository, or the user declines files): same interview, nothing written.

State the mode in one line and continue.

### Step 1 — Map the decision tree (silent)

Before the first question, map:
- Decisions already locked in
- Open branches
- Dependencies between decisions (which answers unblock which questions)
- Unstated assumptions the plan relies on
- Facts that must be looked up rather than asked

### Step 2 — Interview in rounds along the frontier

The **frontier** is every open decision whose prerequisites are already settled — questions that can be asked now without guessing at answers not yet heard.

Each round, ask the frontier questions that are independent of each other — at most four per round, fewer when they are weighty. A question whose answer depends on another question still open belongs to a later round. Format:

```
❓ **Q1 — <title>**: <question, with options when useful>
➡️ Recommended: <answer and one-line reason>

❓ **Q2 — <title>**: …
➡️ Recommended: …
```

Word each question so that "yes" accepts the recommendation. Wait for the answers, recompute the frontier, and ask the next round. Exhaust a thread before opening an unrelated one.

**Facts are the agent's job.** When a question needs a fact from the environment (files, configs, logs, docs, data), look it up — delegate to a subagent when available so the main thread keeps moving. Only the questions downstream of that lookup wait; ask the rest of the frontier now. Never ask the user for something that can be found.

**Decisions are the user's job.** Put each decision to the user with a recommendation and wait. Do not decide on their behalf because the answer seems obvious.

**Question types to cycle through:**
- **Scope** — what is in, what is explicitly out?
- **Dependencies** — what does this rely on that is not yet defined?
- **Failure modes** — what breaks first under load, bad input, partial outage, concurrency?
- **Alternatives rejected** — why this and not X?
- **Success criteria** — how will anyone know it worked? What is measured?
- **Reversibility** — what is hard to undo? What is the rollback?
- **Security and data** — what sensitive data is touched, who can access it, what is logged?
- **Ownership** — who owns each part when something goes wrong?
- **Vocabulary** — does each important word mean exactly one thing?

Push back on weak reasoning. "It should be fine" is not an answer; ask what evidence would show it is fine.

### Step 3 — Record as decisions settle (docs mode)

- **Glossary:** when a term is clarified, add or update its entry in `GLOSSARY.md` — definition, aliases to avoid, one example. When one word turns out to carry two meanings, split it into two terms and note which one the code uses.
- **ADR:** when a decision is hard to reverse (data model, public interface, vendor, security boundary, architectural style), draft `docs/adr/NNNN-<slug>.md` with context, decision, alternatives considered and consequences, status *Proposed*. Two-way-door decisions stay in the summary only.
- Show each write briefly ("Added *Customer Account* to GLOSSARY.md; drafted ADR 0007 — use event sourcing for ledger, Proposed"). Do not commit without the user's go-ahead.

### Step 4 — Resolve and close

The session ends when the frontier is empty: every branch visited, nothing left silently assumed. Before acting on anything, confirm with the user that a shared understanding has been reached. Then summarize:

- **Decisions confirmed** (with the recommendation accepted or changed)
- **Decisions changed or refined** during the interview
- **Open questions** that remain, each with an owner
- **Risks surfaced** that need mitigation
- **Candidate acceptance criteria** — observable statements that emerged ("Given…, when…, then…")
- **Docs written** — glossary entries and ADRs (docs mode)

In the Agentic SDLC, hand the summary to `spec-driven-development` (synthesize mode) to produce the SPEC.

## Critical Rules

- **NEVER** trigger without an explicit "grill" request or the user's agreement to the router's proposal.
- **NEVER** ask a question the code, docs or a quick lookup can answer.
- **NEVER** put dependent questions in the same round.
- **NEVER** decide for the user; facts are the agent's job, decisions are the user's.
- **NEVER** accept "it should be fine" without the evidence that would show it.
- **ALWAYS** give a recommended answer with every question.
- **ALWAYS** follow a thread to its end before opening an unrelated one.
- **ALWAYS** surface assumptions the user relies on but did not state.
- **ALWAYS** confirm shared understanding before acting on the outcome.
- **ALWAYS** keep secrets, personal data and client data out of GLOSSARY.md and ADRs.

## Example Usage

**1. Architecture, docs mode**
> "Grill me on the architecture for the new billing service."

Reads the repo and existing ADRs. Round 1: Q1 sync vs async invoicing, Q2 single vs multi-currency, Q3 who owns failed-payment retries. A subagent checks the current payment provider's webhook support in parallel. Round 2 follows from the answers. Drafts ADR 0012 (event-driven invoicing, Proposed); splits "account" into *Customer Account* and *Billing Profile* in GLOSSARY.md. Closes with eight candidate acceptance criteria for the SPEC.

**2. Migration plan, conversation mode**
> "Grill me on my plan to move from Heroku to AWS — no repo, it's just a doc."

Conversation mode. Rounds on cutover strategy, data migration downtime, DNS rollback, cost ceiling. Pushes back on "we'll just restore from backup" by asking when the restore was last tested.

**3. Inside the Agentic SDLC**
> Router: "Open decisions remain on the export feature. Run grill-me?" User: "Yes, grill me."

Two short rounds settle file format, row limit and permission model; the summary goes straight to `spec-driven-development`.

**4. Portuguese trigger**
> "Me grille sobre esse plano de carve-out antes de eu escrever o plano."

Runs the interview (in the user's language for conversation, English for any file written to the repo), focusing on separation sequencing, shared services and TSA ownership.

**5. Go-to-market plan**
> "Grill me on this go-to-market plan."

Conversation mode; rounds on target segment, pricing hypothesis, channel, success metric and what would make the plan be abandoned.
