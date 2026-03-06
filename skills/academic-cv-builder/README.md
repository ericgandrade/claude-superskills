# academic-cv-builder

Build and format curriculum vitae (CVs) for academic positions — faculty applications, postdoc roles, lecturerships, and tenure promotion. Covers all academic CV sections: publications, grants, teaching, conference presentations, fellowships, service, and dissertation supervision.

## When to use

- Formatting a CV for faculty, postdoc, or lecturer job applications.
- Structuring publications (books, journal articles, book chapters) in correct bibliographic format.
- Organizing grants, fellowships, and research funding in CV format.
- Transitioning from industry to academia and reframing experience for academic audiences.
- Preparing a tenure and promotion dossier with comprehensive academic record.
- Distinguishing what belongs in an academic CV vs. an industry resume.

## What is included

- `SKILL.md` — Full academic CV workflow: section structure, conventions, publication formatting, industry-to-academia translation, and checklist.
- `evals/evals.json` — 3 test cases: PhD student postdoc application, senior faculty promotion CV, and industry-to-academia transition.
- `evals/trigger-eval.json` — 20 trigger accuracy queries (10 should-trigger / 10 should-not-trigger).

## Typical invocation

- "Build an academic CV for my postdoc applications — I have 4 publications and an NSF fellowship."
- "Format my tenure promotion CV as a full professor with 2 books and 18 journal articles."
- "I'm transitioning from Google to academia — help me create an academic CV from my industry background."
- "Create a curriculum vitae for a lecturer position with my teaching and publications."

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar displayed during CV construction.
- **Error Handling** — Handles missing academic history, empty publications, unclear discipline, and missing grants gracefully.
- **EVals** — `evals/evals.json` with 3 realistic test cases; `evals/trigger-eval.json` with 20 trigger queries.
- **Standardized description** — SKILL.md description updated to Anthropic skill-creator format.

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
| Tags | academic, cv, curriculum-vitae, faculty, postdoc, publications, tenure |
| Risk | safe |
