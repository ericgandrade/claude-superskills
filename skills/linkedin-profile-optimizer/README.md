# linkedin-profile-optimizer

Optimize your LinkedIn profile for recruiter searchability, algorithm visibility, and professional engagement — covering headline, summary, experience, and keyword strategy.

## When to Use

- Improving your LinkedIn profile to attract more recruiter outreach
- Optimizing your headline and summary for a specific target role or industry
- Adding keywords to your profile to rank higher in LinkedIn recruiter searches
- Aligning your LinkedIn content with your updated resume after a job change
- Repositioning your profile for a career pivot or industry transition
- Improving the completeness score and SSI (Social Selling Index) of your profile

## What is Included

- `SKILL.md` — Core workflow: headline optimization, about/summary writing, experience section enhancement, skills endorsement strategy, and keyword placement
- `evals/evals.json` — 3 realistic test cases with assertions for trigger accuracy and workflow correctness
- `evals/trigger-eval.json` — 20 queries (10 should-trigger / 10 should-not-trigger) for description optimization

## Typical Invocation

- "Optimize my LinkedIn profile for a senior data scientist role"
- "Rewrite my LinkedIn headline and summary to attract more recruiter views"
- "Add the right keywords to my LinkedIn profile for a product manager job search"
- "Help me align my LinkedIn profile with my updated resume"

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Profile Audit → Keyword Strategy → Section Rewrites → Completion Check) displayed during execution
- **Error Handling** — Handles missing profile sections, unclear target role, and vague career goals with guided clarification steps
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
| Tags | linkedin, profile, recruiter, keywords, personal-brand, job-search, social-selling |
| Risk | safe |
