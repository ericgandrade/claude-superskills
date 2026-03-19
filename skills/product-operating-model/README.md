# product-operating-model

Index and entry point for the Modern Product Operating Model — a collection of 6 composable product skills covering strategy, discovery, architecture, delivery, AI-native development, and leadership.

## Overview

`product-operating-model` is the meta-skill that maps the complete product operating system. Use it when you're unsure which product skill to invoke, when onboarding a new team to the framework, or when you need an overview of how all 6 skills work together. It routes to the appropriate skill based on your context.

## The 6-Skill Collection

| Skill | What it covers | When to use |
|-------|---------------|-------------|
| `product-strategy` | Market positioning, ICP, competitive moat, strategic narrative | Setting direction, choosing where to play |
| `product-discovery` | OST, customer interviews, assumption testing, continuous discovery | Finding problems worth solving |
| `product-architecture` | Bets, capability blocks, roadmaps, solution briefs | Structuring what to build and when |
| `product-delivery` | Staged rollouts, metrics hierarchies, GTM, retrospectives | Shipping, measuring, and learning |
| `ai-native-product` | Agency-control tradeoffs, calibration loops, eval strategies | Building AI agents and LLM features |
| `product-leadership` | Portfolio management, board communication, org design, rhythms | Operating as Director or CPO |

## When to Use This Skill

- When unsure which of the 6 product skills applies to your situation
- When onboarding a team to the Modern Product Operating Model
- When you want a structured overview of all available product frameworks
- When planning which skills to install for a new product team

## What is Included

- `SKILL.md` — Index, routing logic, and quick-start guide for the 6-skill collection
- `templates/` — Shared templates used across the product operating model
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical Invocation

- "Give me an overview of the Modern Product Operating Model"
- "Which product skill should I use for this situation?"
- "Apply the product-operating-model framework to assess my product org"
- "Show me how all the product skills fit together"

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Context Assessment → Skill Routing → Framework Overview → Recommendations) displayed during execution
- **EVals** — `evals/evals.json` with 3 realistic test cases; `evals/trigger-eval.json` with 20 queries (10 trigger / 10 no-trigger) for description optimization
- **Standardized description** — SKILL.md description updated to Anthropic skill-creator format
- **Accurate documentation** — README rewritten with a proper skills index table and accurate routing guidance

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
| Tags | product-operating-model, product-framework, operating-model, modern-product, collection, index |
| Risk | safe |
