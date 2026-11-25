# product-discovery

Run continuous discovery to find problems worth solving — covering weekly discovery rhythm, Opportunity Solution Trees, customer interview frameworks, assumption testing, and pre-commitment solution exploration.

## Overview

`product-discovery` is the Research & Insight System skill — it helps product teams systematically find and validate problems before committing engineering resources. It covers Teresa Torres' Opportunity Solution Tree (OST), continuous interview frameworks, assumption mapping, and structured discovery cadences that feed into the product architecture cycle.

Part of the **Modern Product Operating Model collection** alongside `product-strategy`, `product-architecture`, `product-delivery`, `product-leadership`, and `ai-native-product`.

## When to Use

- Setting up a weekly continuous discovery rhythm for your product team
- Building or updating an Opportunity Solution Tree (OST)
- Creating customer interview guides and interview snapshot frameworks
- Mapping and testing assumptions before committing engineering work
- Exploring solution options for a validated problem (solution brainstorm)
- Writing opportunity statements and how-might-we framing
- Prioritizing which problems to investigate next based on impact and evidence

## What is Included

- `SKILL.md` — Core workflow: OST construction, interview framework, assumption mapping, solution exploration, and discovery cadence design
- `templates/` — Supporting templates for interview guides, opportunity statements, and assumption matrices
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical Invocation

- "Help me build an Opportunity Solution Tree for our onboarding flow"
- "Create a customer interview guide for discovery on our enterprise segment"
- "Set up a weekly discovery rhythm for my product team"
- "Map the assumptions for this solution before we build it"
- "Apply the product-discovery framework to explore this problem space"

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Opportunity Mapping → Interview Design → Assumption Testing → Solution Exploration) displayed during execution
- **EVals** — `evals/evals.json` with 3 realistic test cases; `evals/trigger-eval.json` with 20 queries (10 trigger / 10 no-trigger) for description optimization
- **Standardized description** — SKILL.md description updated to Anthropic skill-creator format
- **Accurate documentation** — README rewritten to reflect actual skill content (OST, continuous discovery, assumption mapping)

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
| Tags | product-discovery, opportunity-solution-tree, user-research, continuous-discovery, assumption-testing, interviews |
| Risk | safe |
