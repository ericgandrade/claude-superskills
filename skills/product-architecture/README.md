# product-architecture

Structure what to build and when by converting discovery opportunities into prioritized bets, organizing capability blocks, and creating roadmaps that communicate strategy without false precision.

## Overview

`product-architecture` is the Product System skill — it takes validated opportunities from discovery and turns them into roadmaps, bets, and solution briefs that engineering can commit to. It covers quarterly planning cycles, capability block organization, solution brief writing, and stakeholder communication of product direction.

Part of the **Modern Product Operating Model collection** alongside `product-strategy`, `product-discovery`, `product-delivery`, `product-leadership`, and `ai-native-product`.

## When to Use

- Organizing your product into capability blocks and logical groupings
- Converting discovery outcomes into prioritized bets with clear rationale
- Building or refreshing a quarterly or annual product roadmap
- Writing solution briefs before engineering commits resources
- Preparing for planning cycles and PI planning sessions
- Communicating product direction to stakeholders without false precision (exact dates, fake certainty)
- Aligning engineering, design, and product on the "what and why now"

## What is Included

- `SKILL.md` — Core workflow: opportunity-to-bet conversion, capability block design, roadmap structure, and solution brief templates
- `templates/` — Supporting templates for roadmaps, bets, and solution briefs
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical Invocation

- "Help me organize our product into capability blocks for Q2 planning"
- "Convert these discovery insights into prioritized product bets"
- "Write a solution brief for this feature before we kick off engineering"
- "Apply the product-architecture framework to build our roadmap"
- "Structure the product roadmap for our next planning cycle"

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Opportunity Analysis → Bet Prioritization → Roadmap Structure → Solution Brief) displayed during execution
- **EVals** — `evals/evals.json` with 3 realistic test cases; `evals/trigger-eval.json` with 20 queries (10 trigger / 10 no-trigger) for description optimization
- **Standardized description** — SKILL.md description updated to Anthropic skill-creator format
- **Accurate documentation** — README rewritten to reflect actual skill content (roadmaps, bets, solution briefs)

---

## Metadata

| Field | Value |
|-------|-------|
| Version | 2.0.0 |
| Author | Eric Andrade |
| Created | 2026-03-01 |
| Updated | 2026-03-19 |
| Platforms | GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, AdaL CLI |
| Category | product |
| Tags | product-architecture, roadmap, bets, capability-blocks, planning, solution-brief, prioritization |
| Risk | safe |
