# offer-comparison-analyzer

Compare multiple job offers side-by-side with total compensation analysis, weighted scoring, and a clear recommendation to help you make the best career decision.

## When to Use

- Evaluating two or more competing job offers at the same time
- Calculating total compensation (salary + bonus + equity + benefits) across offers
- Weighing non-monetary factors like career growth, culture, and work-life balance
- Negotiating a counteroffer using data from competing offers
- Making an informed decision when offers have different trade-offs (higher salary vs. better equity)
- Comparing a current role against a new offer to decide whether to move

## What is Included

- `SKILL.md` — Core workflow: offer parsing, total comp calculation, weighted scoring matrix, and structured recommendation
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical Invocation

- "Compare these two job offers and help me decide which to accept"
- "Analyze the total compensation for my three job offers including equity"
- "Help me compare offer A ($150k + equity) vs offer B ($170k + no equity)"
- "Score these job offers based on salary, growth, culture, and location"

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Offer Parsing → Total Comp Calculation → Weighted Scoring → Recommendation) displayed during execution
- **Error Handling** — Handles missing offer details, unknown equity vesting, unclear bonus structures, and subjective factors with guided clarification
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
| Tags | job-offer, compensation, equity, total-comp, offer-comparison, negotiation, career-decision |
| Risk | safe |
