# deep-research

Multi-step research skill using native web tools (WebSearch/WebFetch) to synthesize comprehensive findings with citations — no external API keys required.

## When to use

- Research a topic with multiple sources before making a decision.
- Gather and synthesize technical documentation.
- Produce a structured report with cited evidence.
- Answer complex questions that require web searches.

## What is included

- `SKILL.md` — End-to-end research workflow: query decomposition, parallel source collection, synthesis, and structured report with citations
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical invocation

- "Research the best approaches to implement OAuth2 in Node.js."
- "Deep-research the current state of vector databases for RAG."
- "Research pricing models for SaaS developer tools."
- "Synthesize the latest findings on AI agent evaluation frameworks."

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Query Decomposition → Source Collection → Synthesis → Report Generation) displayed during execution
- **Error Handling** — Handles search failures, paywalled sources, conflicting information, and narrow topics with fallback strategies
- **EVals** — `evals/evals.json` with 3 realistic test cases; `evals/trigger-eval.json` with 20 queries (10 trigger / 10 no-trigger) for description optimization
- **Standardized description** — SKILL.md description updated to Anthropic skill-creator format

---

## Metadata

| Field | Value |
|-------|-------|
| Version | 2.0.0 |
| Author | Eric Andrade |
| Created | 2026-02-20 |
| Updated | 2026-03-06 |
| Platforms | GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, AdaL CLI |
| Category | research |
| Tags | research, search, analysis, synthesis, citations |
| Risk | safe |
