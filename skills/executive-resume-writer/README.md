# executive-resume-writer

Create C-suite and VP-level resumes that emphasize strategic leadership, board-level impact, P&L ownership, and organizational transformation.

## When to Use

- Writing a resume for a C-suite position (CEO, CTO, CFO, COO, CPO, CISO)
- Positioning a VP-level resume for a step up to SVP or C-suite
- Reframing operational experience as strategic enterprise leadership
- Highlighting board memberships, investor relations, and M&A experience
- Writing an executive summary that captures strategic vision and business outcomes
- Tailoring an executive resume for a specific industry or company stage (early-stage, public, PE-backed)

## What is Included

- `SKILL.md` — Core workflow: executive positioning, achievement quantification, board narrative, and strategic leadership framing
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical Invocation

- "Help me write a C-suite resume for a CTO role at a Series B startup"
- "Create an executive resume that highlights my P&L ownership and team leadership"
- "Write a VP of Engineering resume positioning me for a CTO promotion"
- "Build an executive resume emphasizing my M&A and organizational transformation experience"

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Executive Positioning → Achievement Framing → Leadership Narrative → Board-Level Polish) displayed during execution
- **Error Handling** — Handles sparse executive history, lack of board experience, and unclear industry context with guided prompts
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
| Tags | executive-resume, c-suite, vp, leadership, board, strategic, cto, ceo, cfo |
| Risk | safe |
