# us-program-research

Structured workflow to research, compare, and rank US academic programs (PhD, Master's, Bachelor's), with credential analysis and an actionable application plan.

## When to use

- Build a ranked shortlist of US programs aligned to profile and budget.
- Compare admissions requirements, curriculum, costs, and outcomes.
- Produce a practical action plan for application cycles.
- Support decision-making with cited evidence and clear scoring criteria.

## What is included

- `SKILL.md` — End-to-end research workflow with parallel source collection, scoring, and tiered program ranking
- `references/credential-analysis.md` — Degree equivalency and WES/ECE evaluation strategy
- `references/scorecards.md` — Adaptive scorecards and tiering logic for program comparison
- `references/subagent-prompts.md` — Prompt templates for parallel research subagents
- `references/action-plan-template.md` — Final document template for application planning
- `references/research-sources.md` — Recommended sources and quality checks
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical invocation

- "Use `us-program-research` to rank MS programs in AI under USD 50k."
- "Use `us-program-research` for funded PhD options in Computer Science."
- "Use `us-program-research` to generate my US application action plan."
- "Research top MBA programs in the US with strong tech industry placement."

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Profile Analysis → Parallel Source Collection → Scoring & Tiering → Action Plan) displayed during execution
- **Error Handling** — Handles unknown credential equivalencies, paywalled ranking sources, and conflicting program data with structured fallbacks
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
| Tags | us-programs, university-research, rankings, admissions, scorecards |
| Risk | medium |
