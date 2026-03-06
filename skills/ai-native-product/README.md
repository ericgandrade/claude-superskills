# ai-native-product

Build AI-native products with agency-control tradeoffs, calibration loops, and eval strategies. Covers AI agent design, LLM feature integration, human-AI interaction patterns, and continuous calibration frameworks.

## Overview

`ai-native-product` is a specialized product development skill for when AI is at the core of your product — not just a backend tool. It addresses the unique challenges of building products where AI agents perform tasks autonomously: managing the agency-control tradeoff, setting up eval strategies and calibration loops, and designing human-AI interaction patterns that build user trust.

Part of the **Modern Product Operating Model collection** alongside `product-strategy`, `product-discovery`, `product-architecture`, `product-delivery`, and `product-leadership`.

## When to Use

Use this skill when you:
- Are building AI agents that act on behalf of users
- Are adding LLM-powered features to an existing product
- Need to design human-AI interaction patterns and trust mechanisms
- Are deciding how much autonomy to give AI vs. requiring human confirmation
- Need to set up eval strategies and calibration loops for AI behavior
- Are managing AI reliability, fallbacks, and graceful degradation
- Want to apply agency-control tradeoff frameworks to product decisions

**Not needed for**: Traditional software products, ML models used only for backend optimization with no user-facing autonomy.

## What is Included

- `SKILL.md` — Core workflow with agency-control analysis, calibration loop design, eval strategy, and human-AI interaction patterns
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical Invocation

- "Help me decide how much autonomy to give my AI assistant"
- "Design the calibration loop for my LLM-powered feature"
- "Apply the ai-native-product framework to our new AI agent"
- "What eval strategy should I use for our AI writing tool?"
- "Help me map agency-control tradeoffs for this AI product"

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Agency Analysis → Calibration Loop Design → Eval Strategy → Human-AI Patterns) displayed during execution
- **EVals** — `evals/evals.json` with 3 realistic test cases; `evals/trigger-eval.json` with 20 queries (10 trigger / 10 no-trigger) for description optimization
- **Standardized description** — SKILL.md description updated to Anthropic skill-creator format
- **Accurate documentation** — README rewritten to reflect actual skill content and AI-native product focus

---

## Metadata

| Field | Value |
|-------|-------|
| Version | 2.0.0 |
| Author | Eric Andrade |
| Created | 2026-03-01 |
| Updated | 2026-03-06 |
| Platforms | GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, AdaL CLI |
| Category | product |
| Tags | ai-native, product, llm, agents, agency-control, calibration, evals, human-ai |
| Risk | safe |
