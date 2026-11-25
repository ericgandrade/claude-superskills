# 💼 McKinsey Strategist

Acts as a McKinsey & Co. Senior Partner to diagnose complex business problems and provide high-impact strategic recommendations.

## 🎯 Objective

Help users solve complex problems using elite consulting frameworks, analytical rigor, and first-principles thinking.

## 🚀 How to Use

### Installation

```bash
# install: see https://github.com/ericgandrade/claude-superskills#install
```

### Example Commands

```bash
claude> act as a consultant: revenue decline in e-commerce
claude> strategic analysis for: SaaS startup with high churn
claude> business diagnosis: international retail expansion
claude> consulting case: merger of two technology companies
```

## 🧠 Integrated Frameworks

The skill automatically applies a deep diagnostic using:

1.  **SWOT Analysis** (Strengths, Weaknesses, Opportunities, Threats)
2.  **VRIO Framework** (Sustainable Competitive Advantage)
3.  **McKinsey 7S Framework** (Organizational Alignment)
4.  **Second-Order Thinking** (2nd and 3rd order consequences)
5.  **Impact vs. Effort Matrix** (Strategic Prioritization)

## 📝 Output Example

**Input:** "Analyze the entry of a new low-cost competitor in the market."

**Skill (Executive Synthesis):**
"The low-cost competitor's entry threatens to erode margins by 20%, requiring immediate differentiation through a premium value proposition and exclusive distribution channel lock-in."

**Analytical Deep Dive:**
[Detailed SWOT, VRIO, and 7S tables]

**Strategic Proposal:**
1.  **Exclusive Channel Lock-in** (High Impact, Medium Effort)
    *   *2nd Order:* Price retaliation by competitor.
    *   *Mitigation:* Long-term contracts with key distributors.

---

**License:** MIT

---

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Problem Framing → Framework Application → Strategic Analysis → Executive Synthesis) displayed during execution
- **EVals** — `evals/evals.json` with 3 realistic test cases; `evals/trigger-eval.json` with 20 queries (10 trigger / 10 no-trigger) for description optimization
- **Standardized description** — SKILL.md description updated to Anthropic skill-creator format

---

## Metadata

| Field | Value |
|-------|-------|
| Version | 2.1.0 |
| Author | Eric Andrade |
| Created | 2026-02-22 |
| Updated | 2026-03-19 |
| Platforms | GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, AdaL CLI |
| Category | strategy |
| Tags | consulting, strategy, mece, frameworks, business-analysis |
| Risk | safe |
