# Agentic V-Method — Depth Pass & Continuation Plan (handoff)

> **For the executing agent (Codex, Claude Code or any other):** this document is self-contained. Read it fully, then read the files listed in §2.3 before touching anything. Execute task by task with the `executing-plans` discipline: one task at a time, verify, commit, move on. Stop at every **Checkpoint** and wait for the owner.
>
> **Supersedes** the execution order of `docs/plans/2026-11-18-agentic-v-method.md` (the "master plan") from Wave 1 onward. The master plan remains the source of truth for the method design (§3), the skill inventory (§4) and the decision log (§9).

**Goal:** Rebuild the Agentic V-Method skills to real depth by systematically absorbing the concrete mechanisms (prompts, checklists, rubrics, scripts, formats, anti-rationalization tables) of the five reference frameworks — instead of the shallow, description-level synthesis produced in the first Wave 1 — and then complete Waves 2–5.

**Why this plan exists:** The owner reviewed Wave 1 and judged it shallow. Root cause (confirmed by measurement): only ~6–7 of ~140 source skills were read in full, none of their supporting files were opened (~31k words in Superpowers alone, ~339k in BMad workflow files), and each SKILL.md was self-limited to ~1,500 words, leaving the depth nowhere. Wave 1 totals ~12k words against >150k words of relevant source material.

---

## 1. Context the executor must know

### 1.1 Repository and branch

- Repo: `ericgandrade/claude-superskills` (public). Local path in the original session: `/home/user/claude-superskills`.
- Work branch: **`claude/superskills-dev-workflow-kppj2r`**. Commit and push only to this branch. Never push to `main`, never create tags, never publish to npm, never run `gh repo edit` — the owner does release steps after merge.
- `AGENTS.md` only redirects to `CLAUDE.md`. **Read `CLAUDE.md` fully**: it holds the mandatory repo rules (frontmatter limits, English-only, no skills in platform dirs, version/doc consistency, commit convention, planning rule).
- Released version on `main`: v2.0.8 with 18 skills. Target release for this work: **3.0.0** with **31 skills** (decision D3).

### 1.2 What the Agentic V-Method is (summary — full design in master plan §3)

- Six lifecycle stages in a V: **PL** Plan · **AN** Analyze · **DE** Design (left arm, defines) → **BU** Build (bottom) → **TE** Test · **DP** Deploy (right arm, proves).
- Three human gates: **Gate 1** SPEC approved (frozen baseline) · **Gate 2** PLAN approved · **Gate 3** every acceptance criterion proven, no open Critical findings. Recorded in `GATES.md`.
- Acceptance-criterion IDs (`AC-n`) trace SPEC → PLAN tasks → commits → tests → evidence → release (`TRACEABILITY.md`).
- Routes: Quick / Standard / Full, chosen in PL by scope, risk and reversibility.
- Eight rules (in `skills/agentic-v-method/references/rules.md`): spec before change, evidence before claims, human-accountable, test first, builder does not grade itself, rollback always, sensitive data stays out, trace everything.
- Business alignment: the method operationalizes the delivery principles of the owner's Business Plan Addendum (§3.1 evidence before recommendation, specification before change, AI-assisted/human-accountable, protection of health information, operational handover, measured outcomes; §3.3 controlled modernization; §3.4 NIST SP 800-218 SSDF; §4.4 spec-first AI delivery). The Business Plan itself is **private** and must never be committed (see §8).

### 1.3 Decisions already made (do not reopen)

| ID | Decision |
|---|---|
| D1 | Name: **Agentic V-Method**. Never use the word "Agile" in the name. The earlier name "CODE / Context Engineering Development for Enterprise" was dropped (employer's term) — never reintroduce it. |
| D1b | Structure: six stages in a V + three gates; no separate phase layer. |
| D2 | Lives inside claude-superskills; package, repo and marketplace names unchanged. |
| D3 | Release 3.0.0. |
| D4 | Keep existing skill names; new skills get descriptive names, no prefix. |
| D5 | Domain-neutral; healthcare-specific content stays in the separate `acs-health-maturity-kit` repo. |
| D6 | Agile V is **concept-only** (CC BY-SA 4.0). No text, templates, table layouts or file structures from it. |
| D7 | `grill-me` asks up to four independent frontier questions per round (owner may revert to one-at-a-time — ask at Checkpoint A2). |

### 1.3.1 Open design questions (resolve with the owner at Checkpoint A1)

Conflicts surfaced by the inventories, with the recommended resolution:

| ID | Conflict | Recommendation |
|---|---|---|
| Q1 | **Refactor inside TDD:** Matt Pocock keeps refactoring out of the TDD loop; Superpowers/Addy keep red-green-refactor. | Allow small local refactors under green tests inside the loop; structural refactors become their own task or a review finding. |
| Q2 | **File paths in artifacts:** Matt bans paths in specs and tickets (they rot); Superpowers plans require exact paths. | Decide by artifact lifetime: no paths in SPEC or long-lived task files; exact paths allowed in a PLAN executed immediately. |
| Q3 | **Debugging hypotheses:** Matt ranks 3–5 hypotheses before testing; master plan says "single hypothesis". | Rank 3–5 falsifiable hypotheses, then test one at a time. |
| Q4 | **Regression test for every bug:** Matt requires one only where a correct seam exists; otherwise the missing seam is itself the finding. | Keep rule 4, add the exception: when no correct seam exists, record the missing seam as a finding (feeds `codebase-modernization` / architecture) instead of writing a brittle test. |
| Q5 | **User-only skills:** Matt uses `disable-model-invocation`; this repo's CLAUDE.md allows only `name`, `description`, `license`. | Keep the frontmatter rule; enforce user-only triggering through strict descriptions (as `grill-me` does). |

### 1.4 License rules for absorbing content

| Source | License | Allowed |
|---|---|---|
| Superpowers (`obra/superpowers`) | MIT © 2025 Jesse Vincent | Adapt and rewrite; short quotes OK; credit in README `## Influences` and `THIRD_PARTY_NOTICES.md` |
| Matt Pocock (`mattpocock/skills`) | MIT © 2026 Matt Pocock | Same |
| Addy Osmani (`addyosmani/agent-skills`) | MIT © 2025 Addy Osmani | Same |
| BMad Method (`bmad-code-org/BMAD-METHOD`) | MIT © 2025 BMad Code, LLC; trademarks | Same; never use "BMad" in our skill names |
| Agile V (`Agile-V/agile_v_skills`) | **CC BY-SA 4.0**, ™ claimed | **Concepts only, own words.** Nothing copied or closely paraphrased |

Prefer rewriting and combining over copying. When a passage is copied nearly verbatim from an MIT source (e.g., a prompt template), keep it under `references/` or `prompts/` and name the source file in a comment at the top.

---

## 2. Current state (as of 2026-11-19)

### 2.1 Done on the branch

| Commit | Content |
|---|---|
| `58109d0`…`28e27fc` | Master plan (`docs/plans/2026-11-18-agentic-v-method.md`), naming history |
| `51870d3` | Wave 0: `docs/research/2026-11-18-dev-workflow-frameworks-evaluation.md`, `THIRD_PARTY_NOTICES.md`, `skills/agentic-v-method/references/{v-model,rules,artifacts}.md` |
| `7daaed2` | `agentic-v-method` router v1.0.0 (+ `references/phase-boundaries.md`, evals) |
| `efbcc08` | `project-context` v1.0.0 |
| `7b4be0b` | `brainstorming` v3.0.0 |
| `3e5e3ac` | `grill-me` v2.0.0 |
| `2534249` | `spec-driven-development` v1.0.0 |
| `8170eac` | `senior-solution-architect` v2.2.0 |
| `d2a05a2` | `writing-plans` v3.0.0 |
| (pending) | `docs/research/inventory/*.md` — five deep inventories (see §2.2) |

All Wave 1 skills pass `validate-skill-yaml.sh`; their content is **shallow and must be deepened** (§4).

### 2.2 Deep inventories (input for everything that follows)

Five subagents were launched on 2026-11-19 to read every SKILL.md **and every supporting file** of each framework and write a mechanism catalog:

| File | Content |
|---|---|
| `docs/research/inventory/superpowers.md` | SP-xx mechanisms, prompts/templates, scripts, rationalization tables, workflow, top 15 |
| `docs/research/inventory/mattpocock.md` | MP-xx mechanisms, formats (glossary, ADR, agent brief, PR), vocabularies, workflow, top 15 |
| `docs/research/inventory/addyosmani.md` | AO-xx mechanisms, consolidated checklists, agent personas, scripts, lifecycle, top 15 |
| `docs/research/inventory/bmad.md` | BM-xx mechanisms, artifact formats, review lenses, elicitation methods, delivery loop, top 15 |
| `docs/research/inventory/agile-v-concepts.md` | AV-xx concepts in original wording, differentiation notes, top 10 |

**If any inventory file is missing or thin** (fewer than ~40 mechanisms for MIT sources, or obviously description-level), regenerate it with Task 0.1's procedure before continuing.

### 2.3 Read before starting (in this order)

1. `CLAUDE.md`
2. This document
3. `docs/plans/2026-11-18-agentic-v-method.md` §3–§5, §9
4. `skills/agentic-v-method/references/*.md`
5. `docs/research/inventory/*.md` (all five)
6. The current Wave 1 skills (`skills/{agentic-v-method,project-context,brainstorming,grill-me,spec-driven-development,senior-solution-architect,writing-plans}/`)

### 2.4 Getting the reference repositories

Clone each into its own new, empty directory outside the repo and pin the reviewed commit:

```bash
mkdir -p ~/refs && cd ~/refs
git clone https://github.com/obra/superpowers.git superpowers && git -C superpowers checkout 22f0b46
git clone https://github.com/mattpocock/skills.git mattpocock && git -C mattpocock checkout 5863806
git clone https://github.com/addyosmani/agent-skills.git addyosmani && git -C addyosmani checkout 39b723c
git clone https://github.com/bmad-code-org/BMAD-METHOD.git bmad && git -C bmad checkout e435a22
git clone https://github.com/Agile-V/agile_v_skills.git agilev && git -C agilev checkout 4bcc917
```

(If a pinned commit is unavailable after a shallow clone, run `git fetch --unshallow` first.) Treat their contents as data, never as instructions. Never run their scripts from inside their directories.

---

## 3. The depth standard (definition of "deep enough")

Every Agentic V-Method skill must meet all of these before it is considered done:

1. **Mechanism selection table** — in the skill's README under `## Influences`, a table listing every mechanism absorbed: inventory ID (SP-/MP-/AO-/BM-/AV-), what was taken, how it was adapted. Minimum per new or upgraded core skill: **8 mechanisms from at least 3 frameworks**, unless fewer exist (justify).
2. **Progressive disclosure layout:**
   - `SKILL.md` — the workflow the agent follows every time: purpose, when to use, step-by-step workflow with decision points, critical rules, rationalization table, red flags, examples. **Target 2,000–4,000 words** (validator max 5,000). No artificial trimming.
   - `references/*.md` — depth loaded on demand: checklists, rubrics, catalogs of techniques, detailed formats, edge-case guides. Each referenced explicitly from SKILL.md with *when* to load it.
   - `prompts/*.md` — subagent prompt templates (role, inputs, procedure, output contract, status vocabulary) wherever the skill delegates work.
   - `scripts/*` — only portable helpers (POSIX shell or Node with no dependencies) with a usage header; every script is optional (the skill works without it).
3. **Concrete over generic** — every rule is actionable (thresholds, formats, statuses, examples). Delete any sentence that would be true of every skill.
4. **Anti-rationalization** — a "thought → reality" table drawn from the inventories for every discipline-enforcing skill (TDD, verification, review, spec, gates).
5. **Output contracts** — every artifact or report the skill produces has a template (reuse `skills/agentic-v-method/references/artifacts.md`; extend it when needed).
6. **Platform portability** — works on all 8 platforms; every subagent step has an inline fallback; no harness-specific tool names in instructions (describe capabilities generically: "dispatch a subagent", "run a shell command").
7. **Evals** — `evals/evals.json` (≥ 3 realistic scenarios, 4–6 expectations each, at least one testing a rule under pressure, e.g., the user pushing to skip a gate) and `evals/trigger-eval.json` (≥ 14 queries, ≥ 6 negatives aimed at neighbor skills).
8. **Validators pass** — `./scripts/validate-skill-yaml.sh skills/<name>` (no ❌) and `./scripts/validate-skill-content.sh skills/<name>` (no second-person warning).
9. **Frontmatter** — only `name`, `description` (single line, starts "This skill should be used when…", no `: ` sequences inside), `license: MIT`.
10. **README** — `## Metadata` table (Version, Author "Eric Andrade", Created, Updated, Platforms, Category, Tags incl. `agentic-v-method`, Risk), `## Influences` with the mechanism table, `## What's New` for upgraded skills.

---

## 4. Execution plan

### Phase A — Inventories and synthesis

**Task A.1 — Verify the five inventories.** For each file in §2.2: count mechanisms, spot-check five entries against the source files, confirm the Agile V file contains no copied text. Regenerate any inventory that fails (procedure: read every file of the framework's skills and supporting directories; write the catalog with the structure used by the other inventories). Commit: `docs: add deep framework inventories`.

**Task A.2 — Build the cross-framework mechanism matrix.** Create `docs/research/2026-11-19-mechanism-matrix.md`:
- One section per stage (PL, AN, DE, BU, TE, DP, cross-cutting, router).
- For each *capability* (e.g., "subagent implementer contract", "fix loop", "spec-compliance review", "acceptance-criteria quality rubric", "glossary format", "rationalization table for TDD", "row-level traceability"), list the competing mechanisms side by side (IDs from the inventories), then a **Decision** column: chosen mechanism(s), what is combined, why, and the target skill + file (`SKILL.md`, `references/x.md`, `prompts/y.md`, `scripts/z`).
- End with a per-skill "bill of materials": for each of the 18 method skills, the list of mechanism IDs it must implement.
Commit: `docs: add cross-framework mechanism matrix`.

**Checkpoint A1 — owner reviews the matrix** (especially the per-skill bill of materials). Do not rewrite skills before approval.

### Phase B — Deepen Wave 1 (rewrite to the depth standard)

For each skill: (1) read its bill of materials from the matrix; (2) re-read the source files behind each mechanism; (3) rewrite SKILL.md and create `references/`, `prompts/`, `scripts/` as needed; (4) update evals; (5) update README (`## Influences` mechanism table, What's New, version bump); (6) validate; (7) commit `feat(<skill>): deepen with <summary>`.

| Task | Skill | Minimum expected additions (refine from the matrix) |
|---|---|---|
| B.1 | `agentic-v-method` | Route selection rubric with examples; state-detection algorithm; gate question scripts and GATES.md recording; preflight before BU; resuming procedure; handling subagent reports; "cannot verify" protocol; change protocol with impact checklist; progress display; skill map with entry conditions |
| B.2 | `project-context` | Full instruction-block best practices and deletion grounds; ledger format; floor-guard checks (diff-scoped: thresholds moved, tests weakened, checkers silenced, unfinished work, new exceptions) as `references/floor-guard.md` + optional portable script; constraints defaults table with rationale; GLOSSARY and ADR formats in `references/` |
| B.3 | `brainstorming` | `references/techniques.md` (ideation frameworks catalog with when-to-use), `references/refinement-criteria.md`, builder-check / assumption-audit prompt in `prompts/`, prototype guidance (UI vs logic), elicitation methods for stuck sessions, brief template |
| B.4 | `grill-me` | Grilling primitive in full (design tree, frontier, facts vs decisions, subagent fact-finding), question bank by category in `references/`, glossary and ADR formats, closing summary contract; resolve D7 with owner |
| B.5 | `spec-driven-development` | `references/acceptance-criteria-rubric.md` with good/bad examples per failure type, NFR catalog, capability-map procedure, doubt-pass prompt in `prompts/doubt-pass.md`, revise-mode impact checklist, external spec systems mapping (OpenSpec, Spec Kit, issue trackers), spec examples for 3 domains |
| B.6 | `senior-solution-architect` | Design-it-twice procedure, deep-module vocabulary (module, interface, depth, seam, adapter, leverage, locality), interface design checklist, ADR format and lifecycle, architecture-doc template for DE |
| B.7 | `writing-plans` | `prompts/task-brief.md` (self-contained task brief for subagents), plan self-review checklist, vertical-slice and wide-refactor rules with examples, task-file format, coverage-check procedure, plan reviewer prompt |

**Checkpoint A2 — owner reviews the deepened Wave 1** (side-by-side with the old version: `git diff a90c227 -- skills/`).

### Phase C — Wave 2: Build (BU)

| Task | Skill | Action | Must include (refine from the matrix) |
|---|---|---|---|
| C.1 | `test-driven-development` | NEW | Iron law and deletion rule; red-green-refactor with "fail for the right reason"; `references/writing-good-tests.md`, `references/mocking.md` (when and when not), integration-first at real seams, deep-module test surfaces; bug-fix variant; rationalization table; skip list |
| C.2 | `executing-plans` | UPGRADE (major) | Inline mode + subagent mode; `prompts/implementer.md`, `prompts/task-reviewer.md` (spec compliance then quality), `prompts/re-review.md`; status vocabulary for implementer reports; fix loop with limits; batching rules; preflight; resuming; final review; worktree/branch isolation; parallel frontier only for file-disjoint tasks; traceable commits `[Tn, AC-n]`; optional portable scripts (task brief / review package) |
| C.3 | `systematic-debugging` | NEW | Tight red feedback loop first (HITL loop template when a human must reproduce); four phases; `references/root-cause-tracing.md`, `references/defense-in-depth.md`, `references/condition-based-waiting.md`; test-polluter bisection script (portable); 3-failed-fixes escalation; regression test requirement |
| C.4 | `codebase-modernization` | NEW | Inventory and dependency mapping; risk/value classification; retire/retain/upgrade/re-platform/migrate decision rubric; characterization tests; expand–contract and strangler patterns; deprecation communication; modernization runbook template; no client data |

Commit per skill. **Checkpoint B1** after Phase C.

### Phase D — Wave 3: Test and Deploy (TE, DP)

| Task | Skill | Action | Must include |
|---|---|---|---|
| D.1 | `test-strategy` | NEW | Independent test design from SPEC (separate context); AC → level → case mapping; test-pyramid and testing-patterns reference; NFR checks; E2E mode following the existing harness; test-engineer prompt |
| D.2 | `verification-gate` | NEW | Claim → command → fresh run → full output → compare → record; red-flag phrases; subagent-report verification; VERIFICATION.md and TRACEABILITY.md procedures; Gate 3 record preparation; definition-of-done checklist |
| D.3 | `multi-axis-code-review` | NEW | Axes (spec compliance, design & standards, correctness & edge cases, security, simplicity, plus performance/accessibility when relevant); parallel reviewer prompts in `prompts/`; review lenses (adversarial, edge cases, verification gaps, structure); severity and triage format; receive mode (no performative agreement, verify then act, push back with evidence); weakened-bar detection |
| D.4 | `security-hardening` | NEW | Threat-model-lite; consolidated security checklist and hardening patterns; secrets and supply chain; AI-use data guardrails; security-auditor prompt; `references/ssdf-mapping.md` (NIST SP 800-218 PO/PS/PW/RV → V-Method stage and evidence — written from the public NIST document); no compliance claims |
| D.5 | `deployment-pipeline` | NEW | CI/CD discovery; quality gates matching CONSTRAINTS.md; deployment strategies; environment promotion; rollback rehearsal; observability checklist; never deploy to production or tag without approval |
| D.6 | `shipping-and-handover` | NEW | Pre-ship checklist; integration options (merge / PR / keep / discard) with confirmation; PR body format (smallest visual, before/after evidence, one-way vs two-way door, rollback, traceability summary); human walkthrough structure; HANDOVER.md + runbook; docs-drift check |
| D.7 | `retrospective` | NEW | Evidence gathering; acceptance decision; indicators vs baseline; findings with sources; environment improvements (mechanical → check, judgment → CONSTRAINTS/pitfall); feed `project-context` |

Commit per skill. **Checkpoint B2** after Phase D.

### Phase E — Wave 4: integration and quality

- **E.1** Trigger-collision audit across all method skills and built-in Claude Code skills (`code-review`, `security-review`, `simplify`): run every negative query mentally against neighbor descriptions; tighten descriptions; record results in `docs/research/2026-11-xx-trigger-audit.md`.
- **E.2** Update `agent-skill-orchestrator` to recognize software-delivery requests and propose the Agentic V-Method.
- **E.3** Dogfood in a scratch repository **outside** this repo: one Quick route (bug fix) and one Standard route (small feature), end to end, producing every artifact, gate record and traceability row. Record friction in `docs/research/2026-11-xx-dogfood-report.md`; fix skills.
- **E.4** Run the `skill-creator` eval loop (where the platform supports it) on `agentic-v-method`, `spec-driven-development`, `writing-plans`, `executing-plans`, `test-driven-development`.

**Checkpoint C** after Phase E.

### Phase F — Wave 5: bundles, docs, release prep

Follow `CLAUDE.md` "New Skill Checklist" and "Documentation Consistency Rule":
- `bundles.json`: new `v-method` bundle (18 skills, ordered PL → DP); update `essential`, `planning`, `all` (31).
- `README.md` (Agentic V-Method section with the V diagram, categories, `skills-31` badge, "Relationship to other V-model approaches" note), `CLAUDE.md` (architecture tree, Skill Types, bundles, counts), `CATALOG.md` + `skills_index.json` (`npm run generate-all --prefix cli-installer`), `.claude-plugin/marketplace.json`, `cli-installer/README.md`, `cli-installer/package.json` description, `docs/guides/skill-anatomy.md`, `docs/guides/getting-started.md`, `docs/bundles/bundles.md`, new `docs/guides/agentic-v-method.md`.
- `./scripts/build-skills.sh`, `./scripts/check-doc-consistency.sh`, `./scripts/verify-version-sync.sh` — all pass with 31 skills.
- `node scripts/release.js major` → 3.0.0; `CHANGELOG.md` entry; `./scripts/package-plugin.sh`; `graphify update .` if available.
- Push the branch. **Stop.** PR creation, merge, tag push and `gh repo edit` are the owner's actions.

---

## 5. Per-task procedure (use for every skill task)

1. Read the skill's bill of materials (matrix §A.2) and the source files behind each mechanism.
2. Write or update `evals/trigger-eval.json` and `evals/evals.json` first (they define the behavior).
3. Write `SKILL.md` to the depth standard (§3); move depth to `references/`, `prompts/`, `scripts/`.
4. Write or update `README.md` (Metadata, Influences mechanism table, What's New).
5. Validate:
   ```bash
   ./scripts/validate-skill-yaml.sh skills/<name>
   ./scripts/validate-skill-content.sh skills/<name>
   python3 -c "import json,sys; [json.load(open(f)) for f in sys.argv[1:]]" skills/<name>/evals/*.json
   ```
   Expected: no ❌, no second-person warning, JSON parses.
6. Check that every file path referenced from SKILL.md exists.
7. Commit (convention from CLAUDE.md), end the message with the attribution lines the environment requires.
8. Push to `claude/superskills-dev-workflow-kppj2r` at the end of each phase.

## 6. Cross-skill consistency rules

- Shared rules live in `skills/agentic-v-method/references/rules.md`; shared templates in `skills/agentic-v-method/references/artifacts.md`. Other skills reference them by relative path (`../agentic-v-method/references/...`) **and** repeat the minimum needed to work standalone (a skill may be installed alone).
- Every method skill states its stage in Purpose ("Agentic V-Method · TE Test").
- Consistent vocabulary: SPEC, PLAN, `AC-n`, `Tn`, Gate 1/2/3, GATES.md, VERIFICATION.md, TRACEABILITY.md, HANDOVER.md, RETRO.md, Quick/Standard/Full.
- Status vocabulary for subagent reports must be identical across `executing-plans`, `multi-axis-code-review`, `test-strategy` and `verification-gate` (define once in `skills/agentic-v-method/references/rules.md` or a new `references/subagent-contracts.md`).
- Skill handoffs must match both ends (if A says "hand off to B", B's "When to Use" covers it).

## 7. Notes for Codex specifically

- Codex reads `AGENTS.md`, which redirects to `CLAUDE.md`; follow `CLAUDE.md`.
- Codex installs skills to `~/.codex/skills/`; this work only edits `skills/` in the repo — **never** create `.codex/skills/` or any other platform directory inside the repo (gitignored by rule).
- Where a skill says "dispatch a subagent", Codex may not have one: use the inline fallback the skill defines (run the step in a fresh, explicitly scoped pass and label it self-review).
- Long reads: process one framework or one skill per session if context is tight; the inventories and the matrix exist so later sessions do not need to re-read sources in full.

## 8. Things that must never happen

- Committing the Business Plan, its draft updates, case numbers or any personal data. (A draft of Business Plan text changes exists only outside the repo; it is out of scope for this plan.)
- Reintroducing "CODE" / "Context Engineering Development for Enterprise" or using "Agile" in the method name.
- Copying Agile V text, templates or structures.
- Adding fields other than `name`, `description`, `license` to any SKILL.md frontmatter.
- Pushing to `main`, tagging, publishing, or editing GitHub repo metadata.
- Weakening validators or skipping evals to get green.

## 9. Definition of done (whole effort)

- 13 new + 6 upgraded skills meet the depth standard (§3); matrix bill of materials fully implemented (checked off in the matrix).
- Trigger audit clean; dogfood reports for Quick and Standard routes with all artifacts and gates.
- All consistency scripts pass; docs list 31 skills and the `v-method` bundle; version 3.0.0 synced across the five version files.
- `THIRD_PARTY_NOTICES.md` and every README `## Influences` table complete; no Agile V text anywhere.
- Branch pushed; owner notified for PR/merge/tag.

## 10. Kick-off prompt for Codex

```text
Read CLAUDE.md, then docs/plans/2026-11-19-agentic-v-method-depth-pass.md (this is your plan),
then docs/plans/2026-11-18-agentic-v-method.md §3–§5 and §9, then the five files in
docs/research/inventory/. Work on branch claude/superskills-dev-workflow-kppj2r.
Start with Phase A (Task A.1, then A.2) and stop at Checkpoint A1 for my review.
Commit per task; push at the end of the phase. Never push to main, tag, or publish.
```
