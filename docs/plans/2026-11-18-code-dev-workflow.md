# CODE Development Workflow Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task-by-task.
> **Status:** DRAFT — awaiting owner decisions in [Section 9](#9-open-decisions-owner-must-answer-before-wave-1). Do not start Wave 1 before they are answered.

**Goal:** Turn claude-superskills into the home of **CODE**, a definitive, portable, spec-first AI software delivery workflow that combines the strongest ideas of Superpowers, Matt Pocock's skills, Addy Osmani's agent-skills and the BMad Method into one coherent set of skills.

**Architecture:** One router skill (`code-workflow`) sizes the work and walks it through four phases — **C**larify, **O**utline, **D**eliver, **E**vidence — each backed by focused skills that hand off through durable Markdown artifacts in the user's repository (SPEC, PLAN, tasks, verification log, ADRs, handover). Existing planning skills are upgraded in place (names kept for backward compatibility); new skills fill the gaps. Everything stays plain `SKILL.md` + `references/`, with no runtime dependency, so it keeps working on all 8 platforms.

**Tech Stack:** Markdown skills (minimal YAML frontmatter), JSON eval fixtures, existing shell validators, Python catalog/index generators, `scripts/release.js`.

---

## 1. Context and Motivation

### 1.1 Business alignment (Business Plan Addendum, November 2026)

The Addendum describes how Andrade Consulting Services will deliver its services. The CODE workflow is the engineering practice behind those statements, made executable by AI agents:

| Addendum statement | Where it lives in CODE |
|---|---|
| §3.1 *Evidence before recommendation* — every finding traced to inventory, configuration, documentation or code | `verification-gate`, `systematic-debugging`, evidence rules in every phase |
| §3.1 *Specification before change* — scope, acceptance criteria and rollback agreed before any system is modified | `spec-driven-development` (SPEC.md requires acceptance criteria + rollback), hard gate in `code-workflow` |
| §3.1 *AI-assisted, human-accountable* — an engineer approves every material finding and change | Human approval gates between phases; "facts are the agent's job, decisions are the human's" rule |
| §3.1 *Protection of health information* | `security-hardening` sensitive-data guardrails (no PHI/PII/secrets in prompts, fixtures or logs) |
| §3.1 *Operational handover* — decision records, tests and runbooks | `shipping-and-handover` (ADRs, runbook, HANDOVER.md) |
| §3.1 *Measured outcomes* — baseline and indicators at start, reviewed at close | Baseline + indicators section in SPEC.md, reviewed in `retrospective` |
| §3.3 *Controlled modernization* — inventory, dependency map, retire/retain/upgrade/re-platform/migrate, bounded change, rollback | `codebase-modernization` |
| §3.4 NIST SP 800-218 (SSDF) as secure development reference | SSDF practice mapping in `security-hardening` and the security lens of `multi-axis-code-review` |
| §4.4 *AI-assisted delivery based on writing specifications before generating and reviewing implementation work* | The whole CODE flow |

> **Integrity rule:** Do not backdate anything, and do not describe CODE in public docs as something it is not (e.g., no compliance or certification claims). The repo states what the skills do; the Addendum cites the repo.

### 1.2 Current state of this repo (v2.0.8, 18 skills)

Already present and relevant: `brainstorming`, `writing-plans`, `executing-plans` (all derived from early Superpowers), `grill-me` (from Matt Pocock), `senior-solution-architect` (ADRs/C4), `agent-skill-orchestrator`, `skill-creator`. Missing: spec discipline, TDD, debugging, verification, review, security, shipping/handover, retrospective, brownfield modernization, and a router that ties them into one flow.

---

## 2. Framework Evaluation

Sources reviewed (shallow clones, November 18, 2026; all **MIT-licensed**):

| Framework | Repo | Skills reviewed |
|---|---|---|
| Superpowers (Jesse Vincent) | `obra/superpowers` | 15 |
| Matt Pocock skills | `mattpocock/skills` | 25 stable (engineering + productivity) |
| Addy Osmani agent-skills | `addyosmani/agent-skills` | 25 |
| BMad Method v7 preview | `bmad-code-org/BMAD-METHOD` | 29 (core-tools + method) |

### 2.1 Scorecard (1 = weak, 5 = strong)

| Criterion | Superpowers | Matt Pocock | Addy Osmani | BMad v7 | Notes |
|---|:-:|:-:|:-:|:-:|---|
| Lifecycle coverage (idea → ship → learn) | 4 | 4 | 5 | 5 | Addy and BMad cover shipping; Superpowers stops at branch finish |
| Enforcement strength (hard gates, anti-rationalization) | **5** | 3 | 4 | 3 | Superpowers' "iron laws" and rationalization tables are unmatched |
| Right-sizing (small change ≠ full ceremony) | 2 | 4 | 3 | **5** | BMad routes oneshot vs full; Superpowers forces brainstorming on everything |
| Durable artifacts / context carry-over | 3 | **5** | 4 | **5** | Matt: GLOSSARY + ADR + tickets; BMad: brief → PRD → architecture → stories |
| Multi-agent execution | **5** | 4 | 2 | 4 | Superpowers subagent-driven dev with 2-stage review; Matt parallel frontier |
| Review quality | 4 | 4 | **5** | 4 | Addy five-axis; Matt two-axis (spec + standards); BMad adversarial lenses |
| Security / production readiness | 1 | 1 | **5** | 2 | Addy security-hardening, shipping, CI/CD, observability |
| Brownfield / legacy support | 2 | 3 | 4 | **5** | BMad project-context; Addy deprecation-and-migration |
| Portability (8 platforms, no runtime deps) | 4 | 3 | **5** | 1 | BMad v7 requires `uv` + `_bmad/scripts/render_skill.py` per skill |
| Token economy | 3 | **5** | 3 | 3 | Matt's skills are short and compose a shared primitive |

### 2.2 Best ideas to absorb (by source)

**Superpowers**
- Iron-law TDD with rationalization table ("too simple to test", "I'll test after") → `test-driven-development`
- `verification-before-completion`: no success claim without fresh command output → `verification-gate`
- `subagent-driven-development`: fresh subagent per task, then **spec-compliance review** followed by **code-quality review** → `executing-plans` subagent mode
- `systematic-debugging` four phases; "3 failed fixes → question the architecture" → `systematic-debugging`
- `receiving-code-review`: technical rigor, no performative agreement → `multi-axis-code-review` receive mode
- `using-git-worktrees`, `finishing-a-development-branch` (merge / PR / keep / discard) → `executing-plans`, `shipping-and-handover`

**Matt Pocock**
- `grilling` primitive: one question at a time, frontier of open decisions, *facts are the agent's job, decisions are the human's* → `grill-me` + `code-workflow` rule
- `grill-with-docs`: interview leaves GLOSSARY.md + ADRs → `grill-me` docs mode, `project-context`
- `to-spec`: synthesize the conversation into a spec without re-interviewing → `spec-driven-development` synthesis mode
- `to-tickets`: tracer-bullet tasks with explicit **blocking edges** → `writing-plans`
- `implement-spec`: run the ready frontier of the task graph in parallel on one integration branch → `executing-plans`
- `code-review` two axes (Standards + Spec) in parallel subagents → `multi-axis-code-review`
- `diagnosing-bugs`: refuse to theorize until a tight red feedback loop exists → `systematic-debugging`
- `retro`: improve the *environment* (checks, standards, steering files), not the code → `retrospective`
- Phase boundaries / context hygiene (continue · clear · handoff · subagent · compact) → `code-workflow` reference
- `prototype` detour for questions that cannot be settled on paper → `brainstorming`

**Addy Osmani**
- DEFINE → PLAN → BUILD → VERIFY → REVIEW → SHIP lifecycle with phase commands → CODE phase model
- `spec-driven-development`: objectives, scope, boundaries (**always / ask first / never**) → `spec-driven-development`
- `constraint-driven-development`: CONSTRAINTS.md as a written quality-bar contract; detect a weakened bar in diffs → `project-context` + review lens
- `doubt-driven-development`: fresh-context adversarial review of non-trivial decisions → "doubt pass" in spec and review
- `incremental-implementation`: thin verifiable slices, feature flags → `executing-plans`
- `code-review-and-quality` five axes; `security-and-hardening` (OWASP); `shipping-and-launch` (staged rollout, rollback); `documentation-and-adrs` (drift detection); `source-driven-development` (official docs first); `deprecation-and-migration` (expand/contract) → review, security, shipping, modernization skills

**BMad Method**
- Right-sized routes: small clear changes go straight to build; complex work gets planning depth → `code-workflow` sizing (Quick / Standard / Full)
- `bmad-project-context`: AGENTS.md block + recorded agent pitfalls → `project-context`
- `bmad-correct-course`: impact analysis when requirements change mid-flight → `code-workflow` change protocol
- `bmad-retrospective`: evidence-sourced findings + **acceptance decision** → `retrospective`
- `bmad-review` lenses (adversarial, edge cases, verification gaps) → `multi-axis-code-review`
- `bmad-walkthrough`: guide a human reviewer through what to inspect and how to test → `shipping-and-handover`
- `bmad-architecture`: short decision-focused architecture doc → integrate with `senior-solution-architect`

### 2.3 Deliberately NOT adopted

| Idea | Reason |
|---|---|
| BMad runtime renderer (`uv run render_skill.py`, `_bmad/` config) | Breaks portability across 8 platforms; adds install friction |
| Superpowers "invoke a skill before ANY response" meta-rule | Over-triggers, wastes tokens; the router is opt-in and size-aware |
| Named personas (Mary, Winston, Amelia…) and party mode | Theatrical; kept only as optional *review lenses* |
| Mandatory issue-tracker setup (Matt) | Local Markdown task files are the default; trackers are optional |
| Frontend/perf/browser-devtools/CI-specific skills (Addy) | Out of scope for the core workflow; candidates for a later bundle |

---

## 3. The CODE Workflow

```
              ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
  request ──▶ │  C CLARIFY   │─▶│  O OUTLINE   │─▶│  D DELIVER   │─▶│  E EVIDENCE  │──▶ shipped + learned
              │ context      │  │ spec         │  │ TDD slices   │  │ verify       │
              │ brainstorm   │  │ plan / tasks │  │ subagents    │  │ review       │
              │ grill        │  │ architecture │  │ debug        │  │ ship+handover│
              └──────────────┘  └──────────────┘  └──────────────┘  │ retrospective│
                     ▲          human gate ▲      human gate ▲      └──────┬───────┘
                     └───────────────── learnings feed project context ────┘
```

### 3.1 Sizing routes (decided by `code-workflow` in Step 0)

| Route | When | Path |
|---|---|---|
| **Quick** | Clear, low-risk, ≤ ~1 file or a well-understood bug | TDD → verification-gate → (light review) → commit |
| **Standard** | A feature or change that fits one session | grill/brainstorm → SPEC (short) → PLAN → execute → verify → review → ship |
| **Full** | Multi-session, cross-cutting, risky, or brownfield modernization | project-context → brainstorm + grill-with-docs → SPEC + architecture/ADRs → task graph → subagent execution → verify → review (incl. security) → ship + handover → retrospective |

### 3.2 Non-negotiable rules (shared across all CODE skills)

1. **Specification before change** — no production code before an approved SPEC (Standard/Full) or an agreed acceptance test (Quick).
2. **Evidence before claims** — never say "done/fixed/passing" without fresh command output in the same turn.
3. **Human-accountable** — the agent gathers facts; the human makes decisions. Phase transitions require explicit approval.
4. **Test first** — red → green → refactor; a bug fix starts with a failing regression test.
5. **Rollback always** — every SPEC states how to undo the change.
6. **Sensitive data stays out** — no secrets, PHI or PII in prompts, fixtures, logs or commits.
7. **Leave a trail** — decisions → ADRs, vocabulary → GLOSSARY, quality bar → CONSTRAINTS, outcome → HANDOVER/retro.

### 3.3 Artifact conventions (in the user's project, discovered first — zero-config)

```
<project>/
├── AGENTS.md / CLAUDE.md        # CODE block: commands, conventions, pitfalls (project-context)
├── CONSTRAINTS.md               # quality bar contract (project-context)
├── GLOSSARY.md                  # domain vocabulary (grill-me docs mode)
├── docs/adr/NNNN-*.md           # decision records
└── docs/code/<YYYY-MM-DD-feature>/
    ├── SPEC.md                  # objectives, non-goals, acceptance criteria, boundaries, rollback, baseline+indicators
    ├── PLAN.md                  # task graph with blocking edges
    ├── tasks/NN-*.md            # optional one-file-per-task
    ├── VERIFICATION.md          # evidence log: commands + outputs per acceptance criterion
    └── HANDOVER.md              # what changed, how to operate, runbook, open risks, indicators
```

If the repo already has conventions (e.g., `docs/plans/`, `specs/`, an issue tracker), the skills adopt them instead of forcing these paths.

---

## 4. Target Skill Inventory (18 → 29)

| # | Skill | Phase | Action | Primary sources |
|---|---|---|---|---|
| 1 | `code-workflow` | Router | **NEW** | Addy lifecycle, BMad routes + correct-course, Matt ask-matt + phase boundaries |
| 2 | `project-context` | C | **NEW** | BMad project-context, Addy context-engineering + constraint-driven, Matt domain-modeling |
| 3 | `brainstorming` | C | UPGRADE | Superpowers brainstorming, Addy idea-refine, Matt prototype |
| 4 | `grill-me` | C | UPGRADE | Matt grilling + grill-with-docs |
| 5 | `spec-driven-development` | O | **NEW** | Addy spec-driven, Matt to-spec, BMad spec, Addy doubt-driven |
| 6 | `writing-plans` | O | UPGRADE | Superpowers writing-plans, Matt to-tickets, Addy planning-and-task-breakdown |
| 7 | `senior-solution-architect` | O | MINOR UPGRADE | BMad architecture, Addy documentation-and-adrs |
| 8 | `test-driven-development` | D | **NEW** | Superpowers TDD, Matt tdd + codebase-design, Addy TDD |
| 9 | `executing-plans` | D | UPGRADE | Superpowers executing-plans + subagent-driven + worktrees, Matt implement-spec, Addy incremental-implementation |
| 10 | `systematic-debugging` | D | **NEW** | Superpowers systematic-debugging, Matt diagnosing-bugs, Addy debugging-and-error-recovery |
| 11 | `codebase-modernization` | D | **NEW** | Addendum §3.3, Addy deprecation-and-migration, BMad existing-codebase path |
| 12 | `verification-gate` | E | **NEW** | Superpowers verification-before-completion, Addy VERIFY phase |
| 13 | `multi-axis-code-review` | E | **NEW** | Addy code-review-and-quality, Matt code-review, Superpowers requesting/receiving review, BMad review lenses |
| 14 | `security-hardening` | E (cross-cutting) | **NEW** | Addy security-and-hardening, NIST SP 800-218 SSDF, Addendum §3.1/§3.4 |
| 15 | `shipping-and-handover` | E | **NEW** | Superpowers finishing-a-branch, Addy shipping-and-launch, Matt pr, BMad walkthrough |
| 16 | `retrospective` | E | **NEW** | Matt retro, BMad retrospective |
| — | `agent-skill-orchestrator` | — | MINOR UPGRADE | Recognize CODE route for software-delivery requests |

Naming notes: `multi-axis-code-review` avoids a collision with the built-in Claude Code `/code-review`; `security-hardening` avoids the built-in `/security-review`. Existing names are kept so current users do not break.

Absorbed (not separate skills): doubt-driven review → spec + review; handoff + correct-course → `code-workflow`; prototype → `brainstorming`; constraints → `project-context`; receiving review → `multi-axis-code-review`.

---

## 5. Per-Skill Specifications

Each skill follows repo rules: frontmatter only `name`, `description` ("This skill should be used when…", single line), `license: MIT`; sections Purpose / When to Use / Workflow / Critical Rules / Example Usage; 1500–2000 words ideal (max 5000), heavier material in `references/`; imperative voice, no second person; English only; README.md with `## Metadata` table and an `## Influences` section crediting sources.

### 5.1 `code-workflow` (router)
- **Step 0 — Detect state:** look for existing SPEC/PLAN/VERIFICATION in the repo and resume at the right phase.
- **Step 1 — Size:** ask ≤3 questions (scope, risk, reversibility) → Quick / Standard / Full; show the route and get approval.
- **Step 2 — Drive phases:** invoke phase skills in order; enforce gates (§3.2); show a progress gauge `C ▸ O ▸ D ▸ E`.
- **Change protocol:** when requirements change mid-flight → impact analysis on SPEC/PLAN/tasks → updated docs → re-approval.
- **references/**: `phase-boundaries.md` (continue / clear / handoff / subagent / compact decision tree), `artifacts.md` (§3.3 templates), `routes.md`, `skill-map.md`.
- **Slash-style entry points documented:** `/claude-superskills:code-workflow`, plus phase aliases described in README (spec, plan, build, verify, review, ship).

### 5.2 `project-context`
- Modes: **setup** (scan repo: languages, build/test/lint commands, conventions → write CODE block in AGENTS.md/CLAUDE.md), **constraints** (interview the quality bar → CONSTRAINTS.md with default thresholds), **glossary**, **pitfall** (record an observed agent mistake), **audit** (detect drift between docs and repo).
- Rule: never overwrite user content outside a marked `<!-- CODE:BEGIN --> … <!-- CODE:END -->` block.

### 5.3 `brainstorming` (upgrade)
- Keep: one question at a time, 2–3 approaches with trade-offs, design presented in short chunks, approval gate.
- Add: divergent → convergent pass (idea-refine), "prototype detour" when a question needs runnable answers, explicit handoff to `spec-driven-development` (not straight to plans), Quick-route bypass guidance.

### 5.4 `grill-me` (upgrade)
- Keep explicit-trigger-only rule ("grill me" / "me grille"); allow invocation by `code-workflow`.
- Add **docs mode**: when inside a repo, capture resolved terms into GLOSSARY.md and hard-to-reverse decisions as ADRs; the frontier of open decisions is shown each round.

### 5.5 `spec-driven-development`
- Modes: **create** (short interview), **synthesize** (from current conversation, no re-interview), **validate**, **update**.
- SPEC.md template: Problem & objectives · Non-goals · Users/actors · Acceptance criteria (Given/When/Then, numbered `AC-1…`) · Boundaries (Always / Ask first / Never) · Constraints referenced · Risks & assumptions · **Rollback** · **Baseline & indicators** · Open questions.
- **Doubt pass:** a fresh-context subagent (when available) attacks the spec for gaps before approval.
- Gate: no PLAN until SPEC approved.

### 5.6 `writing-plans` (upgrade)
- Plan header points to `executing-plans`; each task references the `AC-n` it satisfies.
- Tasks are tracer-bullet vertical slices with `Blocked by:` edges → a task graph; optional `tasks/NN-*.md` files or tracker export.
- Keep: exact paths, exact commands, expected outputs, TDD steps, frequent commits.
- Fix stale reference: header currently says `superpowers:executing-plans` → `executing-plans`.

### 5.7 `senior-solution-architect` (minor)
- Align ADR template/location with `docs/adr/NNNN-*.md`; add "called from CODE Outline phase" section.

### 5.8 `test-driven-development`
- Iron law: no production code without a failing test first; delete code written before its test.
- Red-green-refactor loop with "watch it fail for the right reason"; vertical slices; integration over mock-heavy tests; deep-module seams.
- Rationalization table; bug-fix variant (regression test first); when-to-skip list (pure config/docs).

### 5.9 `executing-plans` (upgrade)
- **Inline mode** (current behavior, batches + checkpoints).
- **Subagent mode**: fresh subagent per task with the task text + relevant SPEC excerpt; after each task, a spec-compliance review then a code-quality review; fix loop; parallel dispatch only across the ready frontier with no shared files.
- Workspace isolation (worktree or branch) before starting; stop conditions (blocked, failing verification, scope drift → change protocol).

### 5.10 `systematic-debugging`
- Phase 1: build a tight, deterministic red feedback loop (one command). Phase 2: pattern/diff analysis (last known good, bisect). Phase 3: single hypothesis, minimal test. Phase 4: fix + regression test + verification.
- Escalation: after 3 failed fixes, stop and question the architecture with the human.

### 5.11 `codebase-modernization`
- Inventory and dependency mapping from authorized code/config/docs; risk & value classification (unsupported platforms, known vulnerabilities, criticality, maintenance cost, sensitive data).
- Decision per component: **retire / retain / upgrade / re-platform / migrate**, with sequencing, test requirements and rollback.
- Controlled change: characterization tests first, expand/contract migrations, strangler pattern, bounded component, release only with approval.
- Outputs: portfolio triage table, roadmap, modernization runbook. No client data in examples.

### 5.12 `verification-gate`
- Identify the command that proves each claim → run it fresh → read full output → compare to `AC-n` → record in VERIFICATION.md → only then claim.
- Red-flag phrases list ("should work", "looks good", "probably"); regression check; verification of subagent reports.

### 5.13 `multi-axis-code-review`
- **Request mode** axes, run as parallel independent reviewers when subagents exist: (1) Spec compliance vs SPEC/ACs, (2) Standards vs CONSTRAINTS/AGENTS.md, (3) Correctness & edge cases, (4) Security (OWASP + SSDF), (5) Simplicity/maintainability. Then triage: Critical / Important / Minor with file:line and failure scenario.
- **Receive mode**: verify each comment technically before acting; push back with evidence; no performative agreement.
- Detect a weakened quality bar (deleted tests, loosened thresholds, skipped checks).

### 5.14 `security-hardening`
- Threat-model-lite per change; OWASP Top 10 checklist; secrets and dependency/supply-chain hygiene; input validation; authN/authZ; logging without sensitive data.
- **AI-use guardrails:** never paste secrets/PHI/PII into prompts or test fixtures; synthetic data only; respect client-authorized environments.
- `references/ssdf-mapping.md`: NIST SP 800-218 practice groups (PO, PS, PW, RV) → which CODE step produces the evidence.
- States explicitly that it supports secure practices and does not certify compliance.

### 5.15 `shipping-and-handover`
- Pre-ship checklist; integration options (merge locally / open PR / keep branch / discard) with confirmation; PR body: what & why, smallest visual, before/after evidence, one-way vs two-way door, rollback.
- Staged rollout + rollback plan when deploying; docs drift check; ADRs finalized.
- HANDOVER.md + runbook; optional guided walkthrough for the human reviewer.

### 5.16 `retrospective`
- Gather evidence (SPEC, PLAN, VERIFICATION, diffs, commits, session notes) → acceptance decision (accepted / accepted with follow-ups / rejected) → indicators vs baseline → findings with sources.
- Environment improvements: mechanical mistakes → automated checks; judgment calls → CONSTRAINTS/AGENTS.md pitfalls (via `project-context`).

---

## 6. Execution Waves and Tasks

Standard loop for **every skill task** (the "test" for a Markdown skill is its evals + validators):

1. Write `skills/<name>/evals/trigger-eval.json` (≥10 queries, ≥4 negatives that target neighbor skills) and `evals/evals.json` (3 scenarios with expectations).
2. Write `skills/<name>/SKILL.md` per §5.
3. Write `skills/<name>/README.md` with `## Metadata` and `## Influences`.
4. Run:
   ```bash
   ./scripts/validate-skill-yaml.sh skills/<name>
   ./scripts/validate-skill-content.sh skills/<name>
   ```
   Expected: no `❌`; word-count warning acceptable only if content is in `references/`.
5. Commit: `git commit -m "feat: add <name> skill v1.0.0"` (or `feat(<name>): …` for upgrades).

### Wave 0 — Foundations
- **Task 0.1** Save this evaluation as `docs/research/2026-11-18-dev-workflow-frameworks-evaluation.md` (full matrix + per-skill notes).
- **Task 0.2** Create `THIRD_PARTY_NOTICES.md` with MIT copyright notices for Superpowers (Jesse Vincent), Matt Pocock, Addy Osmani and BMad Code, LLC; note that content is adapted/synthesized, and that "BMad"/"BMAD-METHOD" are trademarks of BMad Code, LLC (named only for attribution).
- **Task 0.3** Write shared templates `skills/code-workflow/references/artifacts.md` (SPEC, PLAN, VERIFICATION, HANDOVER, ADR, CONSTRAINTS templates).
- **Task 0.4** Write `skills/code-workflow/references/rules.md` (§3.2) — referenced by all CODE skills to keep wording DRY.

### Wave 1 — Router, Clarify, Outline
- Task 1.1 `code-workflow` (NEW) · Task 1.2 `project-context` (NEW) · Task 1.3 `brainstorming` (UPGRADE) · Task 1.4 `grill-me` (UPGRADE) · Task 1.5 `spec-driven-development` (NEW) · Task 1.6 `writing-plans` (UPGRADE) · Task 1.7 `senior-solution-architect` (MINOR)
- **Checkpoint A:** owner reviews the router + spec templates before Deliver skills are written.

### Wave 2 — Deliver
- Task 2.1 `test-driven-development` · Task 2.2 `executing-plans` (UPGRADE) · Task 2.3 `systematic-debugging` · Task 2.4 `codebase-modernization`

### Wave 3 — Evidence
- Task 3.1 `verification-gate` · Task 3.2 `multi-axis-code-review` · Task 3.3 `security-hardening` · Task 3.4 `shipping-and-handover` · Task 3.5 `retrospective`
- **Checkpoint B:** owner reviews the full set.

### Wave 4 — Integration and quality
- **Task 4.1** Trigger-collision audit: run every CODE skill's negative queries against neighbor descriptions (brainstorming ↔ spec ↔ grill-me ↔ writing-plans; verification-gate ↔ review). Adjust descriptions until no ambiguous overlaps remain.
- **Task 4.2** Update `agent-skill-orchestrator` to recognize software-delivery requests and propose the CODE route.
- **Task 4.3** Dogfood: in a scratch repo (outside this repo), run one **Quick** route (bug fix) and one **Standard** route (small feature) end to end; record friction; fix skills.
- **Task 4.4** Run `skill-creator` eval loop on the 5 highest-traffic skills (`code-workflow`, `spec-driven-development`, `writing-plans`, `executing-plans`, `test-driven-development`).

### Wave 5 — Bundles, docs, release (documentation consistency rule)
- **Task 5.1** `bundles.json`: add `code` bundle (all 16 CODE skills incl. upgraded ones); update `essential`, `planning`, and `all` (29).
- **Task 5.2** Docs: `README.md` (CODE section with diagram, category table, `skills-29` badge), `CLAUDE.md` (architecture tree, Skill Types, bundle list, counts), `CATALOG.md` + `skills_index.json` (`npm run generate-all --prefix cli-installer`), `.claude-plugin/marketplace.json`, `cli-installer/README.md`, `cli-installer/package.json` description, `docs/guides/skill-anatomy.md`, `docs/guides/getting-started.md`, `docs/bundles/bundles.md`, new `docs/guides/code-workflow.md` (user guide).
- **Task 5.3** Run consistency checks:
  ```bash
  ./scripts/build-skills.sh
  ./scripts/check-doc-consistency.sh
  ./scripts/verify-version-sync.sh
  ```
  Expected: 29 skills, no mismatches.
- **Task 5.4** Release: `node scripts/release.js <minor|major>` (see decision D3), `CHANGELOG.md` entry, `./scripts/package-plugin.sh`, `graphify update .`.
- **Task 5.5** Push branch `claude/superskills-dev-workflow-kppj2r`; open PR only when the owner asks. Tag push and `gh repo edit` About update happen only after merge, by the owner (or with explicit approval).

---

## 7. Validation Criteria (definition of done)

- 11 new + 6 upgraded skills pass YAML and content validators; every skill has `evals/evals.json` and `evals/trigger-eval.json`.
- Trigger audit shows no unresolved overlaps between CODE skills or with built-in Claude Code skills.
- Dogfood runs (Quick + Standard) complete with all artifacts produced and every gate honored.
- `check-doc-consistency.sh` and `verify-version-sync.sh` pass; all docs list 29 skills and the `code` bundle.
- `THIRD_PARTY_NOTICES.md` present; every adapted skill's README credits its sources.
- No skills committed under platform directories (`.claude/skills/`, etc.).

## 8. Risks

| Risk | Mitigation |
|---|---|
| Over-triggering / skills competing for the same request | Tight descriptions, negative trigger evals, router is opt-in |
| Ceremony overload on small tasks | Quick route; sizing in Step 0 |
| Token bloat | ≤2000 words per SKILL.md, shared `references/rules.md` and templates |
| License/attribution gaps | MIT notices + Influences sections; synthesize, do not copy verbatim at length |
| Platforms without subagents | Every subagent step has an inline fallback |
| Doc drift across 10+ files | Wave 5 checklist + consistency scripts |

## 9. Open Decisions (owner must answer before Wave 1)

- **D1 — What "CODE" means.** The Addendum describes the practice but does not define the name. Proposal: **C**larify · **O**utline · **D**eliver · **E**vidence. Confirm or provide the intended meaning.
- **D2 — Product scope.** (a) CODE is the dev-workflow core *inside* claude-superskills (recommended; keeps npm name, marketplace, users) vs (b) rebrand the whole package/repo as CODE.
- **D3 — Version.** 3.0.0 (recommended: product repositioning, 18 → 29 skills) vs 2.1.0 (CLAUDE.md default for new skills).
- **D4 — Naming.** Keep existing names (`writing-plans`, `executing-plans`, …) and add new descriptive names (recommended) vs prefix everything `code-*` (clear branding, breaks existing users).
- **D5 — Healthcare/HIPAA flavor.** Keep CODE domain-neutral with generic sensitive-data guardrails (recommended; ACS-specific content stays in `acs-health-maturity-kit`) vs embed healthcare-specific guidance in CODE skills.
