# 📖 Storytelling Expert

Transforms ideas, presentations, sales pitches, or data into highly engaging and persuasive stories using elite narrative frameworks.

## 🎯 Objective

Help users communicate their messages with maximum psychological and emotional impact, automatically applying the ideal storytelling framework for each situation.

## 🚀 How to Use

### Installation

```bash
# install: see https://github.com/ericgandrade/claude-superskills#install
```

### Example Commands

```bash
claude> create a narrative for: B2B product launch
claude> improve this story: [paste text]
claude> sales pitch: management software for small businesses
claude> motivational speech: demotivated team after merger
```

## 🧠 Supported Frameworks

The skill analyzes your request and automatically selects one of these 8 frameworks:

1.  **StoryBrand Method** (Customer as hero)
2.  **Golden Circle** (Starts with Why)
3.  **South Park Framework** (Causality connectors)
4.  **Pixar Formula** (Classic animation structure)
5.  **Challenger Sale** (Complex sales and teaching)
6.  **Minto Pyramid Principle** (Direct executive communication)
7.  **Hero's Journey** (Classic monomyth arc)
8.  **In Medias Res** (Starts in the middle of the action)

## 📝 Output Example

**Input:** "I need to convince my boss to invest in AI."

**Skill (Applies Minto Pyramid):**

**MAIN CONCLUSION:**
We should invest $50k in AI tools now to save $200k annually through automation.

**ARGUMENT 1:**
Our team spends 30% of their time on repetitive tasks that AI resolves in seconds.

**ARGUMENT 2:**
Our competitors have already adopted it and are delivering projects 2x faster.

**NEXT STEPS:**
Approve the 3-month pilot with tool X.

---

**License:** MIT

---

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Context Analysis → Framework Selection → Narrative Draft → Persuasion Pass) displayed during execution
- **EVals** — `evals/evals.json` with 3 realistic test cases; `evals/trigger-eval.json` with 20 queries (10 trigger / 10 no-trigger) for description optimization
- **Standardized description** — SKILL.md description updated to Anthropic skill-creator format

---

## Metadata

| Field | Value |
|-------|-------|
| Version | 2.0.0 |
| Author | Eric Andrade |
| Created | 2026-02-22 |
| Updated | 2026-03-19 |
| Platforms | GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, AdaL CLI |
| Category | content |
| Tags | storytelling, narrative, presentations, speeches, frameworks |
| Risk | safe |
