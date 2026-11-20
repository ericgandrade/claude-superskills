---
name: project-context
description: This skill should be used when the user wants to set up, refresh or audit the agent instructions for a repository (AGENTS.md or CLAUDE.md), define the project's quality bar in CONSTRAINTS.md, build a GLOSSARY.md of domain terms, or record a mistake an AI agent made so it is not repeated — the Plan-stage context foundation of the Agentic SDLC.
license: MIT
---

# Project Context

## Purpose

Give every agent session in a repository the same verified starting context: how to build, test and run the project, which conventions apply, which quality bar must never be lowered, what the domain words mean, and which mistakes agents have already made here. This is the **PL (Plan)** foundation of the Agentic SDLC — later stages read these files instead of re-discovering them, and the `retrospective` skill writes its learnings back here.

It manages four files, all plain Markdown at the repository root unless the project already keeps them elsewhere:

| File | Content | Mode |
|---|---|---|
| `AGENTS.md` / `CLAUDE.md` | A small verified block between `<!-- AGENTIC-SDLC:BEGIN -->` and `<!-- AGENTIC-SDLC:END -->` | setup, adopt, refresh |
| `CONSTRAINTS.md` | The quality bar contract: floor rules, thresholds with the command that checks each, ratchets, exceptions | constraints |
| `GLOSSARY.md` | Domain terms, one meaning each, with aliases to avoid | glossary |
| Pitfalls (inside the block) | Observed agent mistakes and the correct behavior | pitfall |

Templates live in `../agentic-sdlc/references/artifacts.md` when the method router is installed; the essentials are repeated below so this skill also works alone.

## When to Use

- A repository has no agent instructions, or they are stale, contradictory or bloated
- Starting a Standard or Full route of the Agentic SDLC and the Agentic SDLC block is missing
- The team wants a written quality bar that agents cannot quietly weaken
- Domain vocabulary is confusing ("account" means three things)
- An agent just made a mistake worth preventing next time
- Periodic audit: do the instructions still match the repository?

Do not use for writing product documentation, READMEs for end users, or architecture decisions (use `senior-solution-architect` for ADRs).

## Workflow

### Step 0 — Detect mode

| Situation | Mode |
|---|---|
| No instruction file, or only empty scaffolding | **setup** |
| Instruction file with real content but no Agentic SDLC block | **adopt** (existing content is the baseline, never discarded) |
| Agentic SDLC block exists | **refresh** |
| User reports or the session observed an agent mistake | **pitfall** |
| User asks about the quality bar | **constraints** |
| User asks about terms | **glossary** |
| User asks "are these still correct?" | **audit** |

If the user's stated intent contradicts what detection finds (asks for setup but a rich file exists), show the evidence and confirm before proceeding.

### Step 1 — Discover before asking (setup, adopt, refresh, audit)

Never ask what the repository can answer. Read, in this order:
1. Existing instruction files: `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.cursor/rules`, `.github/copilot-instructions.md`, contribution guides, PR templates.
2. Build and dependency manifests: `package.json`, `pyproject.toml`, `go.mod`, `Cargo.toml`, `pom.xml`, `*.csproj`, `Makefile`.
3. CI configuration: `.github/workflows/`, `.gitlab-ci.yml`, `azure-pipelines.yml`.
4. Linters, formatters, type checkers, test runners and their configs.
5. Recent history for conventions: commit message style, branch names (`git log --oneline -30`).

For every command the block will state, verify it: run it when safe and fast, or read the script it invokes. A command that does not exist yet (greenfield) is written as an explicit TODO naming the chosen stack — never as a guess stated as fact.

Report findings in a few lines, then move to the gaps.

### Step 2 — Interview only the gaps

Ask one question at a time, only about what no file reveals:
- What do agents keep getting wrong here?
- Which areas are off limits or frozen?
- Which rules come from outside the repo (security policy, compliance, client contract, style guide)?
- What does a confusing domain term actually mean?

Never ask the user to confirm something a file already states. When the repository contradicts the user, show the evidence and ask which is right.

### Step 3 — Compose the Agentic SDLC block

Keep it small — every line is paid for in every future session. Include only what an agent would get wrong without it:

```markdown
<!-- AGENTIC-SDLC:BEGIN -->
## Agentic SDLC
- Build: `<verified command>` · Test: `<verified command>` · Lint: `<verified command>` · Run: `<verified command>`
- Artifacts: `docs/agentic-sdlc/<date-feature>/` · ADRs: `docs/adr/` · Quality bar: `CONSTRAINTS.md` · Vocabulary: `GLOSSARY.md`
- Conventions: <only non-obvious ones>
- Read CONSTRAINTS.md before writing code. Never weaken it to make a change pass.
- Pitfalls:
  - <YYYY-MM-DD> — <observed mistake> → <correct behavior>
<!-- Verified: <YYYY-MM-DD> at <commit SHA> -->
<!-- AGENTIC-SDLC:END -->
```

Leave out what the manifests already say plainly, generic advice ("write clean code"), and anything a tool enforces better. For each candidate rule, ask first whether a lint rule, hook or CI check could enforce it; if yes, propose the check and keep the line only as a fallback.

**Adopt/refresh:** build a ledger of every existing instruction with a decision — retain, rewrite, relocate, automate or delete — and the reason. Show the ledger with the new block. Deletions need a reason (obsolete, duplicated, enforced by a tool, or contradicted by the repository) and explicit approval line by line.

### Step 4 — Show, approve, write

Show the complete block (and ledger) before writing. On approval, replace only the content between the markers; text outside the markers changes only through an approved ledger entry. If another loaded file contradicts the block, propose the fix — two live contradictory instructions is a defect. Never commit without the user's go-ahead.

### Constraints mode — CONSTRAINTS.md

1. Detect the current state: test runner, coverage output, linters, CI, security scanners.
2. Ask at most four questions, each with a default so "not sure" still produces a working file:
   - Which dimensions beyond the floor? (default: coverage on changed lines + dependency security)
   - Block or warn when a check fails mid-task? (default: block on the floor, warn on the rest for two weeks)
   - Target numbers, or measure today and hold the line? (default: measure and hold)
   - Slowest acceptable check at task end? (default: about 90 seconds; slower checks run in CI)
3. Write CONSTRAINTS.md with four sections:
   - **Floor** (always enforced): no new suppression comments, no unimplemented stubs or empty catch blocks, no skipped or deleted tests without a reason, no secrets in source, this file is not weakened to make a change pass.
   - **Enforced with numbers**: one row per dimension with the rule, the exact command that produces the verdict, and when it runs. A number without a command is an aspiration, not a constraint.
   - **Measured, not yet enforced (ratchets)**: today's value and direction ("must not fall"). Compare against the recorded value, not an aspiration.
   - **Exceptions**: rule, path, reason, owner, expiry date (default 90 days).
4. Sane defaults when the user has no opinion: changed-line coverage ≥ 80%; project coverage must not fall; no dependency vulnerabilities at high or above; zero critical/serious accessibility violations on new UI; state each number with its reason.
5. Prefer at least one external check (vulnerability database, accessibility engine, real-browser metrics) — a bar built only from the project's own tests can be satisfied by code that does not work.

### Glossary mode — GLOSSARY.md

One entry per term: definition in the domain's language, the aliases to avoid, and an example. When one word carries two meanings, split it into two terms and record which one the code uses. Hard-to-reverse vocabulary choices that shape the code become ADRs via `senior-solution-architect`.

### Pitfall mode

Capture: the task, the mistake, the correct behavior, and the evidence (command output, diff, file). Check whether a line already covers it. A one-off is noted in the session; a recurring or costly mistake earns a pitfall line now. If the mistake is mechanically preventable, propose a check instead. Show the diff before writing.

### Audit mode

Re-verify every command and path in the block, compare against `git log` since the recorded SHA, and list lines whose evidence is gone. Every proposed removal is shown for approval — never a silent edit.

## Critical Rules

- **NEVER** state an unverified command as fact; run it, read its script, or mark it TODO.
- **NEVER** overwrite or delete content outside the `AGENTIC-SDLC` markers without an approved ledger entry.
- **NEVER** discard existing instructions during adoption — they are the baseline.
- **NEVER** weaken CONSTRAINTS.md to make a change pass; loosening the bar requires an ADR and explicit approval.
- **ALWAYS** discover before asking, and ask one question at a time.
- **ALWAYS** prefer an automated check over a prose rule.
- **ALWAYS** keep the block small and dated with the verification SHA.
- **ALWAYS** keep secrets, personal data and client data out of every file this skill writes.

## Example Usage

**1. Setup on a new repository**
> "Set up agent instructions for this repo."

Reads `package.json`, finds `pnpm test` and `pnpm lint`, runs both to confirm, sees no CI. Asks one gap question ("Anything agents must never touch?" → "the `migrations/` folder"). Shows a 9-line block, writes it on approval.

**2. Adopting a bloated CLAUDE.md**
> "Our CLAUDE.md is 400 lines and agents ignore half of it."

Builds a ledger: 22 lines retained, 9 rewritten, 14 relocated to `docs/`, 6 automated as lint rules, 11 deletions proposed with reasons. Shows ledger and block; applies only approved entries.

**3. Defining the quality bar**
> "Agents keep adding `@ts-ignore` to get green builds."

Constraints mode: floor bans new suppressions; coverage of changed lines ≥ 80% via `vitest --coverage`; dependency audit via `osv-scanner`; project coverage 61.2% recorded as a ratchet. Adds the "never weaken" line to the block.

**4. Recording a pitfall**
> "The agent ran `pytest` outside the virtualenv again."

Pitfall mode: adds `2026-11-19 — plain pytest runs outside the project env → use uv run pytest` under the block's commands, and proposes a Makefile `test` target as the durable fix.

**5. Clarifying vocabulary**
> "Account means customer in billing and login in auth — it's confusing everyone."

Glossary mode: splits into **Customer Account** (billing) and **User Login** (auth), lists "account" as an alias to avoid, and suggests an ADR if renaming code symbols.
