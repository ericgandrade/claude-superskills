# salary-negotiation-prep

Research market rates, build a negotiation strategy, and create counter-offer scripts to negotiate confidently for compensation — salary, equity, bonus, and benefits.

## When to Use

- Preparing to negotiate a job offer before accepting it
- Researching market rates for your role, experience level, and location
- Building a BATNA (Best Alternative to a Negotiated Agreement) strategy
- Writing a counter-offer email or script for salary negotiation
- Negotiating a raise or promotion at your current company
- Preparing for an annual performance review with a compensation ask

## What is Included

- `SKILL.md` — Core workflow: market rate research, BATNA definition, negotiation strategy, counter-offer scripts, and total comp framing
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical Invocation

- "Help me negotiate this job offer — the base is $130k but I expected $150k"
- "Research market rates for a senior software engineer in NYC and build a negotiation strategy"
- "Write a counter-offer email for this product manager role"
- "Prepare me for a salary negotiation conversation with my current employer"

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Market Research → BATNA Definition → Strategy Building → Script Writing) displayed during execution
- **Error Handling** — Handles confidential salary situations, unknown equity value, exploding offers, and multi-offer complexity
- **EVals** — `evals/evals.json` with 3 realistic test cases; `evals/trigger-eval.json` with 20 queries (10 trigger / 10 no-trigger) for description optimization
- **Standardized description** — SKILL.md description updated to Anthropic skill-creator format

---

## Metadata

| Field | Value |
|-------|-------|
| Version | 2.1.0 |
| Author | Eric Andrade |
| Created | 2026-03-01 |
| Updated | 2026-03-19 |
| Platforms | GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, AdaL CLI |
| Category | career |
| Tags | salary-negotiation, compensation, counter-offer, market-rates, batna, equity, job-offer |
| Risk | safe |
