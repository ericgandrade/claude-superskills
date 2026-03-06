# career-changer-translator

Translate skills and experience from one industry to another, identify transferable competencies, and reframe your professional narrative for a new career target.

## When to Use

- Pivoting from one industry or role to another (e.g., military → tech, teaching → product management)
- Identifying which existing skills transfer directly to a new field
- Reframing past experience so it resonates with a new target audience
- Writing a career change cover letter or resume summary
- Understanding skill gaps and what to learn next for a career transition
- Repositioning your LinkedIn profile for a new industry

## What is Included

- `SKILL.md` — Core workflow: skill inventory, industry mapping, transferability scoring, narrative reframing, and gap analysis
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical Invocation

- "I'm a nurse wanting to transition into UX design — help me translate my skills"
- "Translate my 10 years in finance to a product manager role at a tech startup"
- "Help me reframe my military leadership experience for civilian job applications"
- "What transferable skills do I have from teaching that apply to instructional design?"

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Skill Inventory → Industry Mapping → Transferability Scoring → Narrative Reframing) displayed during execution
- **Error Handling** — Handles unclear career targets, sparse work history, and niche industries with guided clarification steps
- **EVals** — `evals/evals.json` with 3 realistic test cases; `evals/trigger-eval.json` with 20 queries (10 trigger / 10 no-trigger) for description optimization
- **Standardized description** — SKILL.md description updated to Anthropic skill-creator format

---

## Metadata

| Field | Value |
|-------|-------|
| Version | 2.0.0 |
| Author | Eric Andrade |
| Created | 2026-03-01 |
| Updated | 2026-03-06 |
| Platforms | GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, AdaL CLI |
| Category | career |
| Tags | career-change, transferable-skills, career-pivot, resume, industry-translation, professional-growth |
| Risk | safe |
