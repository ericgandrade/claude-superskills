# product-delivery

Ship, measure, and learn effectively. Use when planning staged rollouts, setting up metrics hierarchies, running bet retrospectives, or executing GTM launches.

## Overview

`product-delivery` is the Execution System skill — it covers how to ship product bets, measure whether they worked, and run retrospectives to improve the next cycle. It addresses staged rollouts (canary, feature flags, phased launches), metrics hierarchies (north star → leading indicators → guardrails), GTM coordination, and bet retrospectives.

Part of the **Modern Product Operating Model collection** alongside `product-strategy`, `product-discovery`, `product-architecture`, `product-leadership`, and `ai-native-product`.

## When to Use

- Planning a staged rollout or canary release for a new feature
- Setting up a metrics hierarchy (north star, leading indicators, guardrail metrics)
- Designing a GTM launch plan coordinating product, marketing, and sales
- Running a bet retrospective to evaluate whether a shipped feature achieved its goal
- Defining feature flag strategies and controlled exposure ramps
- Creating a launch checklist for a major product release
- Aligning the team on how to measure success before shipping

## What is Included

- `SKILL.md` — Core workflow: rollout planning, metrics hierarchy design, GTM coordination, and bet retrospectives
- `templates/` — Supporting templates for launch checklists, metrics frameworks, and retrospective formats
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical Invocation

- "Help me plan a staged rollout for this new payment feature"
- "Design the metrics hierarchy for our new onboarding flow"
- "Create a GTM launch plan for our enterprise tier launch"
- "Run a bet retrospective for the feature we shipped last quarter"
- "Apply the product-delivery framework to plan this feature launch"

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Rollout Planning → Metrics Design → GTM Coordination → Retrospective) displayed during execution
- **EVals** — `evals/evals.json` with 3 realistic test cases; `evals/trigger-eval.json` with 20 queries (10 trigger / 10 no-trigger) for description optimization
- **Standardized description** — SKILL.md description updated to Anthropic skill-creator format
- **Accurate documentation** — README rewritten to reflect actual skill content (staged rollouts, metrics, GTM, retrospectives)

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
| Tags | product-delivery, rollout, gtm, metrics, feature-flags, launch, retrospective, execution |
| Risk | safe |
