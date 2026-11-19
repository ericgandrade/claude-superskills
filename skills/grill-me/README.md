# grill-me

Relentless Socratic interview that walks every branch of a plan or design until nothing is silently assumed. Inside a repository it runs in **docs mode**, recording glossary terms and ADRs as decisions settle. Analyze-stage (AN) tool of the **Agentic V-Method**.

## When to use

- Only when the user explicitly says "grill me" / "me grille", or agrees when the `agentic-v-method` router proposes it.
- Not for "stress-test", "poke holes", "devil's advocate", "review" or "feedback" requests.

## How it works

- Maps the decision tree, then asks the **frontier** (decisions whose prerequisites are settled) in rounds of up to four independent questions, each with a recommended answer.
- **Facts are the agent's job** (looked up, often via subagent); **decisions are the user's**.
- Docs mode: clarified terms → `GLOSSARY.md`; hard-to-reverse decisions → `docs/adr/NNNN-*.md` (Proposed).
- Closes with confirmed decisions, open questions, risks and candidate acceptance criteria for `spec-driven-development`.

## What is included

- `SKILL.md` — interview workflow, docs mode, closing summary
- `evals/evals.json` — test scenarios
- `evals/trigger-eval.json` — strict trigger set (explicit "grill" only)

## What's New in v2.0

- Frontier rounds with recommended answers ("yes" accepts the recommendation)
- Docs mode: GLOSSARY.md and ADR capture
- Facts-vs-decisions rule with parallel lookups
- Security/data and vocabulary question types
- Candidate acceptance criteria in the closing summary; handoff to `spec-driven-development`

## Influences

- **Matt Pocock — skills** (MIT): `grill-me`, `grilling` (design tree, frontier rounds, facts vs decisions), `grill-with-docs` and `domain-modeling` (glossary and ADR trail).
- **Addy Osmani — agent-skills** (MIT): `interview-me` — one-decision-at-a-time requirement extraction.

---

## Metadata

| Field | Value |
|-------|-------|
| Version | 2.0.0 |
| Author | Eric Andrade |
| Created | 2026-05-08 |
| Updated | 2026-11-19 |
| Platforms | GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, AdaL CLI |
| Category | planning |
| Tags | agentic-v-method, planning, stress-test, socratic, decision-tree, glossary, adr |
| Risk | safe |
