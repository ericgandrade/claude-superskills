# deep-research

Multi-step research skill using native web tools (WebSearch/WebFetch) to decompose complex questions, gather authoritative sources, synthesize claim-level evidence, cite findings, and report confidence/gaps. It runs without external API keys by default and includes an optional dense/frontier mode for maximum-depth research.

## When to use

- Research a topic with multiple sources before making a decision.
- Gather and synthesize technical documentation.
- Produce a structured report with cited evidence.
- Answer complex questions that require web searches.
- Run dense, Perplexity-like research with parallel agents, frontier-model recommendation, adversarial critique, and citation audit.

## What is included

- `SKILL.md` — End-to-end research workflow: operating modes, sub-question decomposition, parallel source collection, evidence ledger, skeptical synthesis, and structured report with citations
- Native mode — no external API keys required; uses built-in WebSearch/WebFetch
- Dense/frontier mode — recommends the strongest available model and runs a wider parallel agent topology when the host platform supports subagents
- Sub-question decomposition into 3-5 concrete research threads
- Evidence ledger with source quality notes and claim status
- Required confidence/gaps section
- Skeptical conflict handling for contradictory sources
- `evals/evals.json` — realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — trigger and non-trigger examples for description optimization

## Typical invocation

- "Research the best approaches to implement OAuth2 in Node.js."
- "Deep-research the current state of vector databases for RAG."
- "Research pricing models for SaaS developer tools."
- "Synthesize the latest findings on AI agent evaluation frameworks."
- "Use dense deep-research with a frontier model to create a Perplexity-like evidence report."

## Operating modes

### Native research

- Default mode.
- Uses built-in `WebSearch` and `WebFetch`.
- Decomposes complex topics into 3-5 sub-questions.
- Runs parallel `ResearchScout` agents where supported.
- Produces citations, evidence ledger, and confidence/gaps.

### Dense / frontier research

- Activated when the user asks for maximum depth, exhaustive research, frontier models, adversarial review, or "Perplexity turbinado" style output.
- Recommends the strongest available model or model class for the task.
- Adds specialized research roles such as `PrimarySourceHunter`, `ContrarianScout`, `RecencyScout`, `CitationAuditor`, and `SynthesisJudge`.
- Falls back to native mode if frontier tooling or subagents are unavailable.

## What's New in v2.3

- **Research modes** — Standard / Verbose / Exhaustive dial with source quotas, word targets, and section requirements per mode
- **Friendly agent names** — Scouts renamed (🔍 Scout Alpha/Beta/Gamma, ⚔️ Devil's Advocate, 📡 Trend Watcher, 🏛️ Source Hunter, 🔬 Citation Auditor, ⚖️ Synthesis Judge) with live status notifications on launch and completion
- **Methodology section** — Mandatory audit trail: queries used/discarded, inaccessible sources, filters applied, known limitations
- **Source deep-dives** — Per-source analysis in Verbose/Exhaustive: methodology, sample size, geo scope, conflict of interest, independence
- **Sub-question expansion** — Four-layer structure per sub-question: supporting evidence → counter-evidence → methodology critique → conflicting interpretations → conclusion with individual confidence score
- **New report sections** — Executive Summary, Background/Context, Stakeholder map, Timeline/Chronology, Devil's Advocate, Appendices (query log, rejected sources, paywalled sources)
- **Purpose-based quote rule** — Replaced length restriction with intent-based guideline: quote when exact wording is material, not by character count

## What's New in v2.2

- **Dense / Frontier Mode** -- Maximum-depth research path with model recommendation, wider parallel topology, critique, rebuttal, and citation audit
- **Sub-question decomposition** -- Complex topics are broken into 3-5 concrete research threads before searching
- **Evidence ledger** -- Claims are tracked with source metadata, source quality, and evidence status
- **Skeptical synthesis** -- Conflicts and weak evidence are surfaced instead of smoothed over
- **Confidence & gaps** -- Reports close with confidence level, source disagreements, and missing coverage

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Query Decomposition → Source Collection → Synthesis → Report Generation) displayed during execution
- **Error Handling** — Handles search failures, paywalled sources, conflicting information, and narrow topics with fallback strategies
- **EVals** — `evals/evals.json` with 3 realistic test cases; `evals/trigger-eval.json` with 20 queries (10 trigger / 10 no-trigger) for description optimization
- **Standardized description** — SKILL.md description updated to Anthropic skill-creator format

---

## Metadata

| Field | Value |
|-------|-------|
| Version | 2.3.0 |
| Author | Eric Andrade |
| Created | 2026-02-20 |
| Updated | 2026-05-10 |
| Platforms | GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, AdaL CLI |
| Category | research |
| Tags | research, search, analysis, synthesis, citations |
| Risk | safe |
