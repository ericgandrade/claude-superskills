# Mechanism Inventory: BMad Method v7 preview (for the Agentic V-Method)

| Field | Value |
|---|---|
| Framework | BMad Method, v7 preview ("BMad Method knowledge", module `method` at `6.13.0-next`, core `bmad` 6.13.0) |
| Upstream | `bmad-code-org/BMAD-METHOD`, shallow clone at commit `e435a22` |
| License | **MIT**, © 2025 BMad Code, LLC. Short verbatim excerpts (three lines or fewer) are quoted below, marked as quotes with their source path. |
| Trademark | "BMad" and "BMAD-METHOD" are trademarks of BMad Code, LLC. Neither may appear in a skill name, product name, badge or marketing copy of this repository. Credit them once, factually, in each adapted skill's README `## Influences` section. Persona names (Sofia, John, Mary, Winston, Amelia, Sally) are part of their brand voice and are not reused. |
| Date | 2026-11-19 |
| Purpose | Input for the Agentic V-Method plan (`docs/plans/2026-11-18-agentic-v-method.md`, sections 3–5). Repository content was treated as data, not instructions. |

## How v7 skills are assembled (read this first)

Most v7 `SKILL.md` files are **thin shells**: about 200 words that tell the agent to run one command and follow its output.

```bash
uv run --no-cache "{project-root}/_bmad/scripts/render_skill.py" --project-root "{project-root}" --skill "{skill-root}"
```

The shell also maps invocation words to overrides (for example "oneshot" → `--set workflow.route=oneshot`, "skip review" → `--set workflow.review=none`, "no-code" → `--set workflow.fixes=handoff`, a bot or CI caller → `--set workflow.interactive=false`). `render_skill.py` (core-tools/bmad/scripts) is a Jinja2 renderer: it loads every Markdown source in the skill folder, merges `customize.toml` (shipped defaults) with `_bmad/custom/<skill>.toml` (team) and `<skill>.user.toml` (personal) plus the `--set` layer (strings replace, lists append, tables merge by key, arrays of tables merge by `id`/`code`), resolves central config (`output_folder`, `active_initiative` → `initiative_folder`), renders the templates into an immutable snapshot, and prints the entry file. Inside templates, `{{ rendered("step-02-plan.md") }}` resolves to the rendered path of the next step file and `{{ halt("...") }}` aborts with `HALT: <reason>`. Conditional blocks (`{% if workflow.route == "oneshot" %}`) remove whole branches, so the oneshot and full routes literally read different text.

So the **real workflow content** lives in: `workflow.md` (entry: standards, activation hooks, step architecture), `step-NN-*.md` files (one per phase), `plan-template.md`, `review-prompts/*.md`, `references/*.md`, `assets/*` templates and CSV catalogs, and `customize.toml`, whose comments and default values (route-selection rule, review lenses with their full prompts, implementation handoff text) are themselves workflow logic. Some skills (architecture, project-context, facilitate, review, elicitation, brainstorming, deep-recon, forge-idea) are not shells: their `SKILL.md` is the full workflow and calls helper scripts (`memlog.py`, `resolve_customization.py`, `tickets.py`, `lint_spine.py`, `check_ids.py`, `recon_kit.py`, `git_evidence.py`). Module-level routing knowledge lives in `skills/method/bmod-method/help/*.md`, read by the `bmad` router skill through `knowledge.py`.

**Note on v6 names.** v7 retired `bmad-sprint-planning`, `bmad-create-epics-and-stories`, `bmad-correct-course`, `bmad-spec`, `bmad-check-implementation-readiness`, `bmad-prd`, `bmad-product-brief` and the SM/QA agents (`skills/method/bmod-method/retired.toml`). Their jobs now live in the Product Owner agent (`bmad-agent-po`: SPEC, TICKETS, REFINE, BOARD, VALIDATE, REPLAN), the PM/analyst agents over the shared `bmad-facilitate` engine, and the plan file's `status` (which replaced `sprint-status.yaml`; mapping in `bmod-method/migration-1.toml`).

## Files read

Paths are relative to the clone root. Word counts from `wc -w`. Files marked † were skimmed (headings, frontmatter, done-when lines or docstring) rather than read line by line. Helper scripts were read only for docstrings and the logic noted in the catalog: `core-tools/bmad/scripts/render_skill.py`†, `method/bmad-agent-po/scripts/tickets.py`† (header, `STATE_OF`, `classify()`), `method/bmad-architecture/scripts/lint_spine.py`†, `method/bmad-retrospective/scripts/git_evidence.py`†, `core-tools/bmad-facilitate/scripts/check_ids.py`†, `core-tools/bmad-forge-idea/scripts/resolve_personas.py`†.

- `skills/method/bmad-build/`: SKILL.md (241), customize.toml (1417), plan-template.md (729), references/claims-check.md (233), references/deletion-check.md (151), review-prompts/edge-case-hunter.md (1257), review-prompts/verification-gap.md (1292), step-01-clarify-and-route.md (1700), step-02-plan.md (1046), step-03-implement.md (548), step-04-review.md (1856), step-05-present.md (173), step-oneshot.md (1280), workflow.md (602)
- `skills/method/bmad-build-auto/`: SKILL.md (201), customize.toml (1199, diffed against bmad-build), plan-template.md (772, diffed), step-01-clarify-and-route.md (1233), step-02-plan.md (596), step-03-implement.md (663), step-04-review.md (2643), workflow.md (709)
- `skills/method/bmad-code-review/`: SKILL.md (222), customize.toml (1233), references/claims-check.md (216), references/deletion-check.md (151), review-prompts/edge-case-hunter.md (1261, diffed), review-prompts/verification-gap.md (1278, diffed), step-01-gather-context.md (902), step-02-review.md (527), step-03-triage.md (1267), step-04-route.md (350), step-05-present.md (1215), workflow.md (276)
- `skills/method/bmad-architecture/`: SKILL.md (2219), assets/spine-template.md (697), customize.toml (895), references/headless.md (362), references/reviewer-gate.md (477)
- `skills/method/bmad-retrospective/`: SKILL.md (187), workflow.md (1690), customize.toml (224), references/acceptance-verdict.md (933), references/aggregate-views.md (639), references/evidence-gathering.md (966), references/retro-document.md (503), references/team-discussion.md (369)
- `skills/method/bmad-project-context/`: SKILL.md (2104), customize.toml (124), references/best-practices.md (1558), references/template.md (387)
- `skills/method/bmad-qa-generate-e2e-tests/`: SKILL.md (185), workflow.md (1005), customize.toml (227)
- `skills/method/bmad-walkthrough/`: SKILL.md (143), workflow.md (628), step-01-orientation.md (116), step-02-narrative.md (154), step-03-walkthrough.md (649), templates/log-template.md (184), customize.toml (160)
- `skills/method/bmad-ux/`: SKILL.md (1624), references/validate.md (936), customize.toml (554)†
- `skills/method/bmad-agent-po/`: SKILL.md (233), workflow.md (1251), customize.toml (1177), references/spec.md (1004), references/slice.md (1492), references/ticket.md (860), references/board.md (1160), references/replan.md (232), references/validate.md (255), references/validate-checks.md (694), references/store-setup.md (265), assets/ticket-template.md (933), assets/bug-template.md (367), assets/spike-template.md (298), assets/tickets-template.toml (539), config/repo-ticketing.toml (436)
- `skills/method/bmad-agent-pm/`: SKILL.md (1032), customize.toml (434), assets/template-prd.md (1660), template-prd-light.md (481), template-agent-spec.md (416), template-prototype-plan.md (781), template-launch.md (337), template-experiment.md (583), template-srs.md (404)†, template-opportunity.md (707)†, template-business-case.md (363)†, template-charter.md (359)†, template-narrative.md (327)†, template-pitch.md (483)†
- `skills/method/bmad-agent-architect/`, `bmad-agent-dev/`, `bmad-agent-ux-designer/`, `bmad-agent-analyst/`: SKILL.md (748, 775, 761, 624) and customize.toml (369, 493, 377, 573) each; analyst assets template-brief.md (691)†, template-brd.md (581)†, template-prfaq.md (1168)†, rubric-prfaq.md (137)
- `skills/method/bmod-method/`: help/help.md (3313), help/planning-skills.md (1689), help/implementation-skills.md (485), help/validation-skills.md (671), help/review-choices.md (625), help/existing-codebase.md (450), help/unattended-builds.md (882), help/ticketing-and-epics.md (271), help/artifact-lifetime.md (151), help/preparing-a-repo-for-agents.md (504), help/prototyping.md (834), help/working-in-an-organization.md (853), help/project-context.md (540), help/analysis-skills.md (458)†, doc-templates/template-decision-record.md (485), template-security-review.md (455), template-postmortem.md (579), methods-security.csv (819), ingest-templates/template-retrospective.md (166), retired.toml (108), migration-1.toml (4087)†
- `skills/core-tools/bmad/`: SKILL.md (412), references/help.md (374), references/initiative.md (168), references/setup.md (891)†
- `skills/core-tools/bmad-review/`: SKILL.md (1441), customize.toml (864), references/lens-adversarial.md (122), lens-edge-case-hunter.md (900, diffed), lens-verification-gap.md (1268, diffed), lens-structure.md (217), lens-prose.md (204), editorial-common.md (798), structure-models.md (248)
- `skills/core-tools/bmad-advanced-elicitation/`: SKILL.md (1357), customize.toml (514), assets/methods.csv (1230), evals/cases.json (809)†
- `skills/core-tools/bmad-brainstorming/`: SKILL.md (1433), customize.toml (630), references/converge.md (454), finalize.md (729), headless.md (674), in-chat-techniques.md (323), mode-autonomous.md (299), mode-facilitator.md (161), mode-partner.md (281), resume.md (101), assets/brain-methods.csv (2147, parsed: 108 techniques in 14 categories)
- `skills/core-tools/bmad-forge-idea/`: SKILL.md (1727), customize.toml (247)
- `skills/core-tools/bmad-deep-recon/`: SKILL.md (1547), references/run.md (1344), verification.md (592), synthesis.md (400), selection.md (350), lifecycle.md (170), process.md (286), codebase.md (1526), codebase-locator.md (248), codebase-analyzer.md (329), codebase-historian.md (303), codebase-verifier.md (245), draft.md (297)†, finalize.md (242)†, html-briefing.md (339)†, assets/codebase.template.md (239), research.template.md (51), types/technical.md (216)
- `skills/core-tools/bmad-facilitate/`: SKILL.md (3389), customize.toml (344), references/guidance-planning.md (380), rubric-planning.md (96), rubric-general.md (111)
- `skills/core-tools/bmad-shard-pro/`: SKILL.md (1381), assets/sharded-note.md (148)
- `skills/core-tools/bmad-ingest/`: SKILL.md (1193); `skills/core-tools/bmod-core-tools/ingest-templates/template-meeting.md` (157)
- `skills/core-tools/bmad-party-mode/`: SKILL.md (1559), references/mode-auto.md (171), mode-subagent.md (701), party-memory.md (616)
- `skills/toolsmith/bmad-eval/`: SKILL.md (1003), references/eval-format.md (1198)†, grader.md (2500 chars)†, self-improvement.md†
- `tools/ticket-tree-rules.md`
- `docs/`: plan/choose-a-planning-path.md (1851), plan/define-requirements-and-a-specification.md (1699), plan/break-work-into-stories-and-track-it.md (597), build/build-a-change.md (1577), build/finish-an-epic.md (904), build/autonomous-development-loops.md (2358), build/review-a-change.md (1644)†, existing-codebases/theory-of-project-context.md (1394)

Not read: installer/setup/migration scripts and their tests, `docs-site/`, translated docs, `bmad-customize` (customization authoring), `bmad-toolsmith`, the founder module, HTML view assets.

Path shorthand below: `method/` = `skills/method/`, `core/` = `skills/core-tools/`, `help/` = `skills/method/bmod-method/help/`.

---

## 2. Mechanism catalog

Each entry: stage(s), source, what it is concretely, the failure it prevents, and the target Agentic V-Method skill (plan §4) with adaptation notes. Every adaptation must stay portable: no `uv`, no `_bmad/` config, no renderer, no `tickets.py`; Markdown files and plain git commands only.

### A. Workflow architecture and routing (router, PL)

#### BM-01 · Step-file architecture with just-in-time loading
- **Stage:** cross-cutting
- **Source:** `method/bmad-build/workflow.md` ("WORKFLOW ARCHITECTURE"), same pattern in build-auto, code-review, walkthrough
- **What:** A workflow is split into micro-files (`step-01-clarify-and-route.md` … `step-05-present.md`). Rules: read the whole step before acting; load only the current step; never load two steps at once; never skip or reorder; halt at checkpoints and wait; state persists in the plan's frontmatter plus in-memory variables (`plan_file`, `diff_file`); artifacts are built append-only. Each step ends with `## NEXT — Read fully and follow <next step>`. **EARLY EXIT** means stop reading this step immediately and jump to the named file; return only if a later step says so.
- **Prevents:** context rot from loading a 10k-word workflow up front; the agent "optimizing" by skipping review or merging phases.
- **Target:** `agentic-v-method` router and every multi-phase method skill. **Adapt:** keep the rule set as a short "How to run this skill" block and put per-stage detail in `references/` files loaded only when the stage starts. Drop rendering and conditional templates; express route differences as plainly labeled subsections ("Quick route only").

#### BM-02 · HALT protocol and explicit stop conditions
- **Stage:** cross-cutting
- **Source:** `method/bmad-build/SKILL.md`; `method/bmad-build-auto/workflow.md` ("HALT"); every step file
- **What:** `HALT` is a first-class instruction: stop, report the reason, wait for the human (attended) or write a terminal status and exit (unattended). Attended HALT points in Build: dirty tree or branch mismatch, multi-goal detected, plan over budget, open questions, checkpoint approval, finding whose smallest fix is not trivial, review loop over 5 iterations, verification that cannot be fixed, matrix row ambiguous. Unattended HALT always carries a named blocking condition (`unclear intent`, `intent gap`, `no subagents`, `ticket not resolved`, `version-control metadata not writable`, `plan failed ready-for-development standard`, `missing plan_file before implementation`, `implementation verification failed`, `review repair loop exceeded 5 iterations (non-convergence)`, `blocked plan supplied`, `finalization left repository dirty`).
- **Prevents:** agents guessing past a decision the human owns; silent stalls with no recorded reason.
- **Target:** router rules (`references/rules.md`) and `executing-plans` stop conditions. **Keep** the named-condition vocabulary; write the reason into the current artifact (PLAN.md or GATES.md) so a resumed session sees it.

#### BM-03 · Routing by "smallest safe path" from the state of the spec
- **Stage:** PL (router)
- **Source:** `help/help.md` (Routing flowchart, "Rules the diagram leans on"); `docs/plan/choose-a-planning-path.md`
- **What:** A decision tree: (1) obvious low-risk edit → just edit, no skill; (2) one session can understand, build, review and finish it → Build; (3) otherwise, does the top-level spec exist? If not, choose an upstream shaping tool by what is missing (cannot name customer/problem → brainstorm/forge; unsure it is worth building → PRFAQ or prototype; wants it written down → brief; needs stakeholders/compliance/integrations → PRD; thinks in screens → UX), then write the spec. (4) With a spec: open questions → resolve; new input → update spec; not sliced → slice into epics; shared decisions across epics → architecture; each epic: unrefined → refine; refined with no stories → plan stories; story needs criteria → refine; ready → build per story; blocked → decide or spike; mid-build change → replan; all stories finished → retrospective, then close. Rules: phases describe kinds of help, not a mandatory sequence; mid-path, recommend the next unfinished step, not a restart; after a change, resume at the earliest affected step and do not replay unaffected work; work is complete when intent is satisfied, chosen checks pass and no chosen review leaves material findings open, "not when every skill has run".
- **Prevents:** ceremony on small work; restarting the whole process after a change; declaring done because every step ran.
- **Target:** `agentic-v-method` Step 0 (detect state) and Step 2 (drive stages). **Adapt:** replace BMad's ticket-tree state with V-Method artifacts (SPEC.md status, PLAN.md status, VERIFICATION.md, GATES.md) and keep the "resume at earliest affected stage" and "done = intent + checks + no open material findings" rules verbatim in spirit.

#### BM-04 · Size and stakes are separate axes
- **Stage:** PL
- **Source:** `help/help.md` ("Project size decides how many build sessions… Stakes decide how heavy the planning gets"); `help/implementation-skills.md`; `docs/plan/choose-a-planning-path.md` ("Size Follows the Intent")
- **What:** One session = one goal, about 500 changed lines (tests excluded) in a handful of files. Several sessions with one coherent outcome = an epic. Several epics or about 20+ sessions = a project. Risk, unclear requirements, architectural reach, cross-system effects or several people push work up a tier even when small; a large hobby project keeps planning light; a small change to a regulated system may not. Every path reuses the same implementation unit; larger work adds shared context around it rather than a different delivery system.
- **Prevents:** sizing by line count alone; regulated or risky small changes slipping through on the light path.
- **Target:** router sizing questions (scope, risk, reversibility → Quick/Standard/Full). **Keep** the explicit numeric anchor (~500 LOC per session, ~20 sessions for multi-epic) as guidance, and make risk an independent override.
- **Also (intake by container):** the Product Owner sizes new work as standalone (one ticket), epic (stories), initiative (epics) or several initiatives (a parent initiative, "not epics inside epics"); a user override is recorded as a dated `Decision:` line; before work starts, changes go through the spec writer, after it starts, through replan (the V-Method's before/after Gate 1 split).

#### BM-05 · Oneshot vs full route selection after investigation
- **Stage:** PL/DE (inside build)
- **Source:** `method/bmad-build/customize.toml` (`route`, `route_selection`); `step-02-plan.md` item 3; `docs/build/build-a-change.md` step 4
- **What:** Route is `oneshot`, `full` or `auto` (default). `auto` decides **after** codebase investigation, "with no further reading and minimal extra reasoning": estimate lines to add or modify; ≤100 → oneshot, otherwise full; more than five files and not simple or mechanical → consider full. The plan records `route` and `route_source: pinned | auto`. Oneshot writes a minimal plan (Intent + Verification only, Boundaries/Matrix/Code Map/Tasks sections deleted) and implements in the same session; full writes a complete plan, passes a checkpoint, and hands implementation to a fresh subagent. A oneshot that discovers a missing intent piece upgrades itself: writes Code Map and Open Questions back, sets `route: full`, `status: draft`, returns to planning. The docs describe the decision differently (three facts: intent gaps, irreversible actions, footprint; anything flagged gets a full plan) — the shipped config uses the LOC rule.
- **Prevents:** writing a 1,500-token plan for a 20-line fix; implementing a cross-cutting change with no approved plan.
- **Target:** router Quick route + `writing-plans` + `executing-plans`. **Adapt:** use the docs' three-fact test (intent gaps / irreversible actions / footprint) as the Quick-vs-Standard tiebreak because it is risk-based, with the LOC rule as a fallback. Keep the self-upgrade path (Quick → Standard when a gap appears mid-build).

#### BM-06 · Review depth selection tied to route
- **Stage:** TE
- **Source:** `method/bmad-build/customize.toml` (`review`, `quick_lenses`, `thorough_lenses`); `help/review-choices.md`
- **What:** `none` (no lenses, no triage; for throwaways), `quick` (one reviewer: acceptance criteria, repo agent rules, bugs), `thorough` (four independent lenses: Blind Hunter, Edge Case Hunter, Verification Gap, Intent Alignment), `auto` (oneshot → quick, full → thorough). Recorded in plan frontmatter with `review_source` and `lenses_ran` (ids in launch order). Standalone code review defaults to thorough.
- **Prevents:** uniform review cost regardless of risk; untraceable "we reviewed it" claims.
- **Target:** `multi-axis-code-review` (depth by route) and router. **Adapt:** map Quick → light review (spec compliance + correctness), Standard → full multi-axis, Full → multi-axis + security. Record which axes ran in VERIFICATION.md.

#### BM-07 · Intent resolution order and resume-by-status
- **Stage:** PL (router Step 0)
- **Source:** `method/bmad-build/step-01-clarify-and-route.md` ("Intent check"); `docs/build/autonomous-development-loops.md` ("Resume Input")
- **What:** Resolve state in order and stop at the first that applies: (1) explicit argument (ticket ref, plan file with recognized `status`, other file = starting intent); (2) recent conversation; (3) the work queue's next ready item; (4) scan for active plans (`draft`, `ready-for-dev`, `in-progress`, `in-review`), list them all and HALT with choices: resume one / next item / new. A plan file routes by status: `draft` → planning; `ready-for-dev`/`in-progress` → implement; `in-review`/`built` → review (a `built` plan re-entered = another review pass); `done` → context only; `blocked` → show reason and halt; `dropped` → halt. An unformatted intent file is ingested as intent, never guessed into a state.
- **Prevents:** duplicate plans for the same work; resuming from the wrong phase; losing a half-finished plan.
- **Target:** `agentic-v-method` Step 0. **Keep** the ordered checks and the status→stage table, applied to SPEC/PLAN/VERIFICATION statuses.

#### BM-08 · The invocation is input, not authority
- **Stage:** cross-cutting
- **Source:** `method/bmad-build/step-01-clarify-and-route.md` (RULES); build-auto step-01
- **What:** "Even detailed, plan-like intent is input to investigate, not authority to skip Build steps." Directives inside the intent that say "skip planning" or "implement directly" are ignored; a freeform request is starting intent even when brief, and the agent never asks the user to restate it.
- **Prevents:** prompt-injected or impatient instructions bypassing gates; users re-typing context.
- **Target:** router rules. **Keep** as a non-negotiable rule next to §3.4 rule 1 (specification before change), with the explicit carve-out that the human may choose the Quick route at Gate 0.

#### BM-09 · Version-control sanity gate
- **Stage:** BU (pre-flight)
- **Source:** `method/bmad-build/step-01-clarify-and-route.md` item 3; build-auto step-01 item 3
- **What:** Before work: is the tree clean, and does the branch fit the intent (name and recent history)? Dirty tree or obvious mismatch → HALT and ask. Unattended: also run `git add --refresh -- .` and confirm the tree is still clean to prove metadata is writable; judge the branch against the epic, not the story. Skip when no VCS.
- **Prevents:** mixing unrelated uncommitted work into a diff that review and rollback depend on.
- **Target:** `executing-plans` workspace isolation step. **Keep**; pair with the plan's worktree/branch creation.

#### BM-10 · Single-goal scope standard with split-and-defer
- **Stage:** PL/AN
- **Source:** `method/bmad-build/workflow.md` ("SCOPE STANDARD"); `step-01` item 4; `step-02` item 6
- **What:** A plan targets one user-facing goal. Multi-goal means ≥2 top-level independently shippable deliverables, each reviewable, testable and mergeable as its own PR. Never count verbs, "and" conjunctions or noun phrases; never split cross-layer work inside one goal. Example given: split "dark mode toggle AND JWT refactor AND admin dashboard"; do not split "add validation and display errors". On detection: list goals, 2–4 sentences on why each is independent, coupling risks, which to do first; HALT with **Split** (keep first, defer the rest) or **Keep all**. Deferred goals append to `deferred-work.md` as `source_plan / summary / evidence` entries (never edit or dedupe old ones). Neither the goal count nor the token limit is a gate: both are proposals with user override.
- **Prevents:** plans that sprawl across features and rot implementation context.
- **Target:** router sizing and `spec-driven-development`. **Keep** the precise multi-goal definition and the deferred-work ledger (as `DEFERRED.md` beside SPEC or a section in PLAN.md).

#### BM-11 · Plan size budget (900–1600 tokens)
- **Stage:** DE
- **Source:** `method/bmad-build/workflow.md`; `plan-template.md` header comment; `step-02` item 6
- **What:** A plan aims for 900–1300 tokens ("less if route is oneshot"); above 1600 is "high risk of context rot" in implementation agents, below 900 risks ambiguity. Over budget → show the count, offer Split (regenerate the plan for the narrowed scope; do not carve sections out surgically) or Keep (warn at checkpoint). Unattended: add `oversized` to `warnings` and continue. Template guidance: never over-specify "how"; use boundaries and examples; keep cohesive cross-layer changes in one file.
- **Prevents:** implementer subagents losing the thread in giant plans; under-specified plans.
- **Target:** `writing-plans` (per-task file or plan budget). **Adapt:** apply the budget to each `tasks/NN-*.md` handed to a subagent rather than to the whole PLAN.md task graph.

### B. Plan and specification artifacts (AN, DE)

#### BM-12 · Plan template with a frozen, human-owned intent block
- **Stage:** AN/DE (Gate 2)
- **Source:** `method/bmad-build/plan-template.md`; `method/bmad-build-auto/plan-template.md`
- **What:** Frontmatter: `title, type (feature|bugfix|refactor|chore), ticket, created, status, baseline_revision, route, route_source, risk, review, review_source, lenses_ran, review_loop_iteration, context[]` (+ auto: `followup_review_recommended, warnings, deferred`). Body: `<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">` containing **Intent** (Problem, Approach: one or two sentences each, "the what, not the how"), **Boundaries & Constraints** (Always: invariant rules; Never: non-goals and forbidden approaches), **I/O & Edge-Case Matrix** (Scenario | Input/State | Expected Output/Behavior | Error Handling; delete if none, never "N/A"). Then agent-owned sections: **Code Map** (`FILE -- ROLE`), **Tasks & Acceptance** (`FILE -- ACTION -- RATIONALE` checklist, one task per file preferred; ACs in Given/When/Then covering system behavior not already in the matrix; include a task to unit-test matrix rows), **Implementation Notes** (append-only), **Plan Change Log** (append-only, written by review loopbacks), **Review Triage Log** (append-only), **Design Notes** (only when non-obvious; 5–10 line golden examples), **Verification** (commands with expected result; manual checks if no CLI). After approval, only the human can change the frozen block. Unattended runs use `<intent-contract>` instead.
- **Prevents:** agents silently reinterpreting intent during build or review; "N/A" padding; plans that restate the investigation at dispatch.
- **Target:** `spec-driven-development` (SPEC.md frozen revision) and `writing-plans` (PLAN.md). **Adapt:** the frozen block maps to the approved SPEC revision (AC-n, boundaries, I/O matrix); PLAN.md keeps Code Map, task list with `AC-n` references, Plan Change Log, Verification. Keep "delete empty sections, never write N/A".

#### BM-13 · READY FOR DEVELOPMENT standard
- **Stage:** DE (Gate 2 check)
- **Source:** `method/bmad-build/workflow.md`; `method/bmad-build-auto/workflow.md`
- **What:** A full plan is ready when it is **Actionable** (every task has a file path and specific action), **Logical** (dependency order), **Testable** (all ACs Given/When/Then, each provable "without pointing at code"), **Surface-anchored** (ACs observe the outermost surface the intent references, never an internal proxy — auto version), **Complete** (no placeholders/TBDs), **Sufficient** (no known requirement, acceptance, dependency or implementation gaps), **Coherent** (no unresolved ambiguity or contradiction). A oneshot plan is ready when intent is clear, complete, coherent, sufficient, and the route choice is recorded. Step 2 self-reviews against it: what the repo can answer is fixed by looking; what a human must decide becomes an Open Question; "Do not invent the answer". Unattended: repair once, re-read from disk, re-check; still failing → HALT `plan failed ready-for-development standard` with failing criteria.
- **Prevents:** plans that look complete but hide TBDs; ACs that test an internal function instead of the user-visible behavior.
- **Target:** `writing-plans` validate step before Gate 2; "Surface-anchored" also belongs in `spec-driven-development` validate mode. **Keep** all seven criteria verbatim in meaning.

#### BM-14 · Investigate before asking; Code Map as the investigation's landing place
- **Stage:** DE
- **Source:** `method/bmad-build/step-02-plan.md` item 2; build-auto step-02
- **What:** Investigation comes before any question. Deep searches go to subagents told to return short summaries only; keep "the specific files, symbols or lines, what to reuse, and what not to change" and write them into the Code Map so implementation never needs the investigation retold. Do not ask the human during investigation: look in the ticket, its named companions, planning docs, then repo and history, until you know or those sources are exhausted; leave remaining choices for the Open Questions step. Codebase research documents are evidence "read at its commit": before relying on a claim, re-check it when the plan rests on it or the cited file changed since (`git diff --stat <commit> -- <path>`).
- **Prevents:** interviewing the user about things the repo answers; implementers re-exploring the codebase blindly; stale research steering a plan.
- **Target:** `writing-plans`, `codebase-modernization` (inventory freshness). **Keep** the "ask only what investigation cannot settle" order and the commit-pinned evidence rule.

#### BM-15 · Open Questions protocol for intent gaps
- **Stage:** AN/DE
- **Source:** `method/bmad-build/step-02-plan.md` items 4–6; `step-oneshot.md` ("Implement")
- **What:** An intent gap is something "the user would notice in the result" that the intent does not settle. Each becomes an `## Open Questions` entry: the choice, the options, what each option means. "Never write an intent gap into the frozen block as an assumption." Present as numbered questions with options, HALT, write each answer into the frozen block as a decision, delete the entry; an answer may expose a new gap → ask again; when empty, delete the section. Unattended: several defensible readings with observably different outcomes and nothing to select between them = intent gap → HALT `intent gap` (never pick a reading).
- **Prevents:** agent assumptions becoming unapproved design decisions.
- **Target:** `spec-driven-development` (open questions block Gate 1) and `writing-plans`. **Keep** "never encode a gap as an assumption" and the numbered-options format.

#### BM-16 · Risk score on every plan and ticket
- **Stage:** AN/DE
- **Source:** `method/bmad-build/step-02-plan.md` item 2; `method/bmad-agent-po/references/ticket.md`; `help/unattended-builds.md`
- **What:** `risk: low | medium | high` = business impact if the change is wrong. Proposed with a one-line reason; user decides. A plan from a ticket starts at the ticket's risk and may only be raised (unattended: never lowered; attended: lowered only on the user's word). A high-risk ticket names in Notes one check beyond its criteria. The value is machine-readable so CI can decide how much review a change gets.
- **Prevents:** uniform scrutiny; risk silently downgraded during planning.
- **Target:** router (sizing input) and `spec-driven-development` (SPEC header). **Keep**; feed it into review depth and Gate 3 strictness.

#### BM-17 · Approval checkpoint with re-read-from-disk and lock
- **Stage:** DE (Gate 2)
- **Source:** `method/bmad-build/step-02-plan.md` ("CHECKPOINT 1")
- **What:** Only when Open Questions is empty. Present a summary with the plan's risk and reason, a clickable plan path, the token count if over budget, and a note that the user can edit the file, ask questions, or run elicitation/party mode "ideally in another session to avoid context bloat". Choices: **Approve and continue**; **Approve and stop** (leave `ready-for-dev` so a fresh session implements); **Review plan** (subagent review, discuss, then approve). Before acting on approval, re-read the plan from disk: missing → HALT without recreating; changed → acknowledge external edits and use them. Then set `ready-for-dev`; the frozen block is locked.
- **Prevents:** approving a plan the user edited in their editor but the agent never re-read; carrying a bloated planning context into implementation.
- **Target:** router Gate 2 record in GATES.md. **Keep** all three options and the re-read rule; "Approve and stop" matches the plan's "clear / hand off" phase boundary.

#### BM-18 · Plan status lifecycle and board-state mapping
- **Stage:** cross-cutting (state tracking)
- **Source:** `method/bmad-build/plan-template.md`; `tools/ticket-tree-rules.md` ("Status"); `method/bmad-agent-po/scripts/tickets.py` (`STATE_OF`)
- **What:** `draft → ready-for-dev → in-progress → in-review → built → done`, plus `blocked` and `dropped`. Build skills write `draft` through `built`; unattended build writes `blocked`; only the user or an orchestrator writes `done`; only the PO writes `dropped` on the user's word. "No skill moves a ticket past `built`." Board states: none/draft/ready-for-dev → backlog; in-progress/blocked → in-progress; in-review/built → review; done; dropped. `blocked_at`, `blocked_reason` and `assignee` sit in the plan's frontmatter, not the ticket.
- **Prevents:** agents declaring their own work done; status scattered across ticket files and trackers.
- **Target:** router state + GATES.md. **Adapt:** SPEC.md and PLAN.md each carry `status`; only a human-approved Gate 3 record moves work to "done". Keep "the builder's last status is built".

#### BM-19 · Baseline revision as the trace anchor
- **Stage:** BU → TE → DP
- **Source:** `method/bmad-build/step-03-implement.md` ("Baseline"); `tools/ticket-tree-rules.md` ("Baseline"); retrospective evidence-gathering
- **What:** Before any code change, record `baseline_revision` = full canonical commit id from VCS (`NO_VCS` when absent); never overwrite on resume. Review diffs everything since it, untracked files included; retrospective derives each ticket's range as baseline → next ticket's baseline (oldest first by `git merge-base --is-ancestor`), last range to HEAD marked inferred; orchestrators use `baseline..next_baseline` to identify a ticket's commits.
- **Prevents:** reviews that miss untracked files or include unrelated commits; retros that cannot attribute changes to tasks.
- **Target:** `executing-plans` (record per task), `verification-gate`, `retrospective`, TRACEABILITY.md (AC-n → task → commit range). **Keep** exactly.

### C. Build (BU)

#### BM-20 · Plan-as-sole-source-of-truth implementation handoff
- **Stage:** BU
- **Source:** `method/bmad-build/customize.toml` (`implementation_handoff`); `step-03-implement.md`
- **What:** Full route launches a subagent with no prior conversation and this prompt (quote, `customize.toml`):
  > "Read {plan_file} fully and implement it — the plan is the sole source of truth. Load every file listed in its frontmatter `context:` before you start. When done, report what you changed, how you verified it, and anything left incomplete or risky."

  The parent adds nothing: no goal restatements, file lists, ownership boundaries, ACs or house rules ("that material already lives in it"). Keep the subagent alive for review fixes. Unattended: if the handoff conflicts with the plan, HALT with both passages. Sequential execution only.
- **Prevents:** the parent's paraphrase diverging from the approved plan; context contamination from the planning conversation.
- **Target:** `executing-plans` subagent mode. **Keep** the three-line prompt shape; add the task's `AC-n` and the SPEC excerpt reference to the task file, not to the dispatch.
- **Also (context list):** the plan's frontmatter `context:` names the few files the implementer must load itself (needed companions, project standards); the parent never pastes them, and loads them only when it implements directly. This prevents prompt bloat and drift between pasted excerpts and their sources.

#### BM-21 · Stop-and-replan when the request omitted something visible
- **Stage:** BU
- **Source:** `method/bmad-build/step-oneshot.md` ("When to stop"); build-auto step-03
- **What:** "Stop coding if the request left out something the user would notice in the result." Write the gap in Implementation Notes, then: attended oneshot → ask; auto route → upgrade to full and return to planning with the gap as an Open Question; unattended → HALT `intent gap`.
- **Prevents:** builders filling user-visible gaps with guesses.
- **Target:** `executing-plans` stop conditions (scope drift → change protocol). **Keep.**

#### BM-22 · Matrix test audit
- **Stage:** BU → TE
- **Source:** `method/bmad-build/step-03-implement.md` ("Matrix Test Audit")
- **What:** If the frozen block has an I/O & Edge-Case Matrix, every row must be covered by at least one test that verifies its expected behavior **and** that test must have run and passed in the verification output. A test that exists but did not run (unregistered, filtered, skipped, disabled) counts as missing. If a test disagrees with the matrix, "never edit the expectation to match the code": fix the code, or HALT if the row is ambiguous.
- **Prevents:** coverage claims from tests that never execute; tests bent to match buggy code.
- **Target:** `verification-gate` (per AC-n evidence) and `test-driven-development`. **Keep**; generalize from matrix rows to AC-n rows in TRACEABILITY.md.

#### BM-23 · Judge against the diff, not the implementer's report
- **Stage:** BU → TE
- **Source:** `method/bmad-build/step-03-implement.md` ("Stage the Diff")
- **What:** After the implementer returns: write a unified diff since `baseline_revision` (untracked included) to a uniquely named temp file, read it, run the plan's Verification commands ("a failing command is unfinished work"), finish anything the implementer reported unfinished, rewrite and re-read the diff if code changed. Acceptance criteria are judged at review, not here.
- **Prevents:** trusting a subagent's "done" summary; verifying a stale diff.
- **Target:** `verification-gate` (verification of subagent reports) and `executing-plans`. **Keep.**

#### BM-24 · Local commit, never push; terse completion summary
- **Stage:** BU/DP
- **Source:** `method/bmad-build/step-05-present.md`; `step-oneshot.md` ("Commit", "Present")
- **What:** Mark plan `built`; if VCS available and tree dirty, commit locally with a conventional message from the plan title or Intent; never push or do remote ops unless asked. Summary: one or two sentences (what changed; verification and review result including anything deferred; commit hash). Do not list files, repeat the plan or narrate. Offer next steps in one line: create a PR (push first if needed), a guided walkthrough, or another change. Unattended: commit all reviewed-diff files, verify the tree is clean, else HALT `finalization left repository dirty`.
- **Prevents:** accidental pushes; verbose wrap-ups that waste human attention.
- **Target:** `executing-plans` (per-task commits) and `shipping-and-handover`. **Keep**; add `AC-n`/task ids to commit messages per plan §3.4 rule 8.

### D. Review and triage (TE)

#### BM-25 · Parallel, context-free, synchronous review lenses
- **Stage:** TE
- **Source:** `method/bmad-build/step-04-review.md`; `method/bmad-code-review/step-02-review.md`; lens `instruction` texts in customize.toml
- **What:** Every lens is a fresh subagent launched with a self-contained prompt; diff and claims are passed as **absolute file paths**, never pasted. Reviewers run "at the same model capability as the current session". Launch all lenses in one turn as blocking calls, never backgrounded, and do not read any result until all are launched; triage starts only when every lens has reported. Each lens prompt ends with the same constraint (quote, `bmad-build/customize.toml`):
  > "Review by inspection only. Do not modify code, run builds or tests, or invoke quality gates. Do not invoke any skill, and do not spawn subagents of your own — you are the reviewer."

  Lenses output findings with no severity, priority or ranking. A lens may be gated by a `when` condition; an empty instruction disables it.
- **Prevents:** reviewers anchored by the author's reasoning; partial triage before all findings arrive; reviewers "fixing" things.
- **Target:** `multi-axis-code-review` request mode (rule 5: builder does not grade itself). **Keep** the constraint paragraph nearly verbatim and the "no severity from reviewers" rule.

#### BM-26 · Quick lens
- **Stage:** TE
- **Source:** `method/bmad-build/customize.toml` (`[[workflow.quick_lenses]]`); code-review variant adds the ticket file
- **What:** One context-free subagent reads the plan (ACs and intent), the files in its `context:`, the agent instruction files (`AGENTS.md`, `CLAUDE.md`) at the repo root and in every directory the diff touches ("those are the rules"), then the diff. Reports unmet ACs, broken rules and bugs, each with location, what goes wrong, and evidence checked against surrounding code.
- **Prevents:** reviews that ignore the project's own written rules.
- **Target:** `multi-axis-code-review` light mode (Quick route) combining axes 1 (spec compliance) and 2 (standards). **Keep**, including "rules in nested instruction files of touched directories".

#### BM-27 · Blind Hunter lens with a computed finding floor
- **Stage:** TE
- **Source:** `method/bmad-build/customize.toml` (`blind-hunter`)
- **What:** Sees only the diff (no plan, no intent). "Look for what's missing, not only what's wrong." Finding floor: N = min(floor(sqrt(kB) + 1), 10), where kB is the diff file's size; state the arithmetic in one line, then find at least N issues. Zero findings → re-check and keep thinking.
- **Prevents:** lazy "LGTM" from a reviewer; context-induced blindness (the reviewer cannot rationalize with the plan).
- **Target:** `multi-axis-code-review` correctness axis. **Adapt:** keep the floor formula as a quota for the diff-only reviewer, but rely on triage (BM-31) to reject padding.

#### BM-28 · Edge Case Hunter lens (exhaustive path tracer)
- **Stage:** TE
- **Source:** `method/bmad-build/review-prompts/edge-case-hunter.md`; `core/bmad-review/references/lens-edge-case-hunter.md`
- **What:** "Pure path tracer": never comments on quality, only lists missing handling. Scope: diff hunks only, boundaries directly reachable from changed lines lacking a guard in the diff (whole content when not a diff). Steps: (1) receive content (empty → fixed JSON error and stop); (2) walk every branch and boundary — control flow (conditionals, loops, error handlers, early returns) and domain boundaries; derive edge classes from the content, not a checklist (missing else/default, unguarded inputs, off-by-one, overflow, coercion, races, timeouts); **implicit branches** (diff changes RED and YELLOW of an enum → GREEN is the implicit branch); **handle lifetime** (a re-check of a held id/handle exists because an intervening call can invalidate it — name the call and what is skipped); **call-site check** (for each added/changed call, including tests, read the callee's declaration: count, order, types, defaults); (3) revisit every edge class; (4) deletion check; (5) claims check; (6) output a JSON array, each finding exactly `{location, trigger_condition (≤15 words), guard_snippet (single-line sketch), potential_consequence (≤15 words)}`. Also applies to tickets, plans and requirements that define behavior.
- **Prevents:** unhandled branches that happy-path reviews never trace.
- **Target:** `multi-axis-code-review` correctness & edge-case axis; also `spec-driven-development` doubt pass (run it over the SPEC's behavior). **Keep** the five sub-methods and the four-field output.
- **Also (deletion check):** runs only when meaningful code was removed; for each removed chunk ask whether it carried behavior or a contract the change neither re-established nor intentionally retired; report regressions, orphaned references and newly dead code as `kind: deletion` with a confidence rating, "these are inferences". Also useful for `codebase-modernization` change mode (expand/contract).

#### BM-29 · Claims check (testimony vs evidence, read last)
- **Stage:** TE
- **Source:** `method/bmad-build/references/claims-check.md`; code-review variant uses commit messages
- **What:** The change's own narrative (the plan's Intent and Tasks & Acceptance, or the commit messages) is given to the edge-case reviewer as a path it must **not open until path tracing is finished**, so claims cannot steer the trace. Then extract each checkable claim — what the change does, what it preserves, ordering, arithmetic, parity ("exactly as X does") — and try to falsify each against traced code, reading the compared-to function or real callee when needed. "The plan is the change's own account of itself: testimony, not evidence — a claim repeated in a code comment is still the same claim." Only falsified claims produce findings (`kind: "claim"`).
- **Prevents:** confirmation bias where reviewers verify the author's description instead of the code.
- **Target:** `multi-axis-code-review` spec-compliance axis and `verification-gate` (do not trust subagent reports). **Keep** the delayed-read ordering; it is cheap and powerful.

#### BM-30 · Verification Gap lens
- **Stage:** TE
- **Source:** `method/bmad-build/review-prompts/verification-gap.md`; `core/bmad-review/references/lens-verification-gap.md`
- **What:** Finds changed behavior "that could break later without any test failing." Four gap shapes: **regression gap** (changed code could regress at a consumer, no test fails), **missing-adoption gap** (a site that should use the new behavior still handles it its own way — requires evidence of intent to replace and the same observable contract), **broken-verification gap** (test looks like coverage but is skipped, flaky, not normally run, or too weak), **stale-verification gap** (a test the change made wrong or moot). Steps: screen out non-behavioral parts (formatting, renames, type-only, prompts/docs, config CI checks); name each changed behavior; trace 1–3 hops to consumers; name the smallest realistic regression (the "Demonstration") — "this line could be removed without a test failing" does not count; read the test and ask whether the Demonstration fails an assertion. Tests that do not count: source-text assertions, success/no-throw/snapshot-only, mock/log-call checks, manual checks, mocked-away integrations, pass-through e2e, stale fixtures (e.g. `expect(x ?? DEFAULT).toBe(DEFAULT)`). Evidence rules: read a test before claiming coverage; search the symbol and its imports before claiming no test exists. Output per gap: Changed surface, Impacted consumer, Existing test evidence, Missing verification, Demonstration, Consequence, Disposition (the test to add, in the repo's style). Clean output is exactly `No verification gaps found.` Triage treats its gap findings as pre-verified, severity `medium`.
- **Prevents:** green suites that would not catch the regression the change risks.
- **Target:** `test-strategy` (AC-n → test adequacy) and `multi-axis-code-review`. **Keep** the four shapes and the "what does not count as a test" list; this is one of the highest-value transferable pieces.

#### BM-31 · Intent Alignment Auditor lens
- **Stage:** TE
- **Source:** `method/bmad-build/customize.toml` (`intent-alignment`)
- **What:** Gets only the verbatim intent and the diff. "Strictly descriptive — do not prescribe additional work." Reports: (1) the defensible readings of the intent, enumerated; (2) which reading the diff implements; (3) where readings and diff diverge — "which surface the intent's expectations live at versus which surface the diff's changes and its tests exercise". In code review it runs only when an intent exists (ticket requirements, plan intent, or the user's own words — "a request to review something is not an intent").
- **Prevents:** correct code that solves a different reading of the request; tests that exercise an internal layer while the requirement lives at the UI/API surface.
- **Target:** `multi-axis-code-review` spec-compliance axis, `verification-gate`. **Keep.**

#### BM-32 · Verify-then-verdict triage
- **Stage:** TE
- **Source:** `method/bmad-build/step-04-review.md` ("Classify" 1); `method/bmad-code-review/step-03-triage.md`
- **What:** Wait for all lenses, normalize into a raw list (`R1, R2…` with source lens, title, detail, location), do not dedupe yet. For each finding: **verify the claim** at the cited location — read past the hunk, follow callers and upstream guards until yes/no; "a finding that says 'this throws when X' is only real if you can show that X happens"; an assert on an unreachable state is correct defensive code; never decide B by similarity to A unless same behavior at same line; keep severity out of verification. Then exactly one verdict: `high` (data loss/corruption, security exposure, silently wrong result, path broken with no workaround), `medium` (broken but noticed/worked around or limited reach), `low` (cosmetic/minor), `false` (with the disproof), `maybe-false` (with what would settle it). Ignore reviewer severities; severity = harm of one occurrence, independent of rarity, fix cost or whether pre-existing; unsure between medium and low → medium; vague "messy" is not a severity (name the caller that diverges or the rule that breaks). Reject all `false`; reject `low` when rarely met **and** the fix adds more than a direct correction or deletion; reject fixes that edit the plan's intent. Then group survivors by **same** root cause (same location or same fix is not enough) into `F1, F2…` carrying the highest verdict and member ids. Named failure modes: forgetting a finding, rejecting a real defect by similarity, misgrading severity.
- **Prevents:** noisy review dumps; real defects dismissed; accidental complexity from fixing negligible findings.
- **Target:** `multi-axis-code-review` (triage; Critical/Important/Minor maps to high/medium/low) and receive mode. **Keep** the whole procedure; it is the core of trustworthy agentic review.

#### BM-33 · Root-cause routing with cascading loopbacks
- **Stage:** TE → DE/AN
- **Source:** `method/bmad-build/step-04-review.md` (items 3–4); build-auto step-04
- **What:** Each grouped finding routes to one category. This change's problems: **intent_gap** (root cause inside the frozen intent; cannot be resolved from the plan; infer only if exactly one reading), **bad_plan** (the plan should have prevented it, including deviations from the plan; "when in doubt between bad_plan and patch, prefer bad_plan"), **patch** (smallest fix is trivial, adds no public surface, guards no undemonstrated state). Not this change's problem: **defer** (pre-existing; or all-`maybe-false` that would be medium/high if true; or a fix that edits agent-context files). Out-of-scope only when the intent itself excludes it, not because the plan or diff shape does — otherwise it is intent_gap or bad_plan. Cascade: intent_gap or bad_plan present → lower entries are moot (code will be re-derived). intent_gap → revert code, ask the human, re-plan. bad_plan → extract KEEP instructions, revert, amend non-frozen plan sections respecting the Plan Change Log, append a change-log entry (trigger, amendment, known-bad state avoided, KEEPs), re-implement. Increment `review_loop_iteration` before each loopback; >5 → HALT. Code review (no plan to regenerate) uses **decision_needed** (ambiguous choice; list options, one line each, with a recommendation) / **patch** / **defer**, and "an entry this change caused, with a verified member, is never defer".
- **Prevents:** patching symptoms of a bad plan; endless fix loops; mislabeling caused defects as "pre-existing".
- **Target:** `multi-axis-code-review` → router change protocol (intent_gap → SPEC revision; bad_plan → PLAN amendment). **Keep**; map intent_gap to the V-Method's post-Gate-1 change protocol.

#### BM-34 · KEEP instructions and the Plan Change Log
- **Stage:** DE/BU
- **Source:** `method/bmad-build/step-04-review.md` (bad_plan); `plan-template.md` (Plan Change Log)
- **What:** Before reverting code for a plan-level fix, write down what worked and must survive re-derivation (KEEP), then append to an append-only Plan Change Log: triggering finding, what was amended, the known-bad state the amendment avoids, the KEEP list. Every later amendment must respect all logged constraints.
- **Prevents:** regressions where a re-derived implementation loses the good parts or reintroduces an earlier failure.
- **Target:** `writing-plans` (PLAN.md change log) and `executing-plans`. **Keep.**

#### BM-35 · Re-engage the same implementer for patches
- **Stage:** BU/TE
- **Source:** `method/bmad-build/step-04-review.md` (patch)
- **What:** Patches go to the same step-03 subagent (by its handle; "a fresh launch is not re-engagement") with one fixed message: fix each with the smallest change; run only tests covering edited files; full verification runs on the parent's side; reply with what changed; list `<file> — <what is wrong> — <what the smallest fix must do>`. If it cannot be continued, the parent patches. Then re-run Verification, rewrite the diff. Patches are the only findings that survive loopbacks.
- **Prevents:** a new subagent re-learning the code; patch scope creep; unverified post-review edits.
- **Target:** `executing-plans` fix loop and `multi-axis-code-review`. **Keep** the message template.

#### BM-36 · Review Triage Log with full accounting
- **Stage:** TE
- **Source:** `method/bmad-build-auto/step-04-review.md` (item 4); `plan-template.md`
- **What:** Every pass appends `### {date} — Review pass` with `verdicts: <total> findings — high N, medium N, low N, false N, maybe-false N` and one row per finding from every lens in report order: `` `[verdict]` `[route]` summary — evidence `` (refutation for false, what would settle maybe-false, action taken for patches, why a rejected low was not worth fixing). The total must equal the findings reported; "a finding missing from the log is a triage failure". On a rerun, a finding matching a logged row (same location and claim, code unchanged) is carried with `carried` prefix, not re-verified or re-patched.
- **Prevents:** findings silently dropped; churn re-litigating settled findings across passes.
- **Target:** `multi-axis-code-review` output into VERIFICATION.md (review section). **Keep.**

#### BM-37 · No-subagent fallback: standalone prompts for another session
- **Stage:** TE
- **Source:** `method/bmad-build/step-04-review.md`; `method/bmad-code-review/step-02-review.md` item 3
- **What:** If a lens needs a subagent and none is available, write each lens's full child prompt beside the plan (named after the lens id) with every referenced file (diff, claims, instruction file) inlined, then HALT and ask the human to run each in a separate session, "ideally a different LLM", and paste back findings; resume triage from there.
- **Prevents:** self-review in the author's context on platforms without subagents.
- **Target:** `multi-axis-code-review` and `verification-gate` portability across the 8 platforms. **Keep**; this is the right degradation path for platforms without subagents.

#### BM-38 · Code review target discovery and context gathering
- **Stage:** TE
- **Source:** `method/bmad-code-review/step-01-gather-context.md`
- **What:** Find target in order: request/conversation (PR via `gh pr view`, commit, branch, range, staged/uncommitted, file list, plan file) → tickets in review → current branch vs default (confirm) → ask. Branch diffs run from the merge base (`<base>...HEAD`) so later base commits do not look reverted; include untracked files for file lists; empty diff → HALT. Stage the claims file (commit messages `git log base..head` or the supplied description) verbatim, unanalyzed. Plan context: explicit "no plan" → `no-plan` mode; plan given → `full`; otherwise ask (never assume). Load the plan's `context` docs. Over ~3000 diff lines → offer to chunk by file group. Checkpoint: diff stats, mode, loaded docs. Non-interactive mode never asks and takes named defaults.
- **Prevents:** reviewing the wrong diff; reviewing without intent ("without intent, the reviewers can only judge the diff against itself").
- **Target:** `multi-axis-code-review` Step 0. **Keep**, plus the docs' advice that review bots always pass the PR description and spec.

#### BM-39 · Code review findings written into the plan, with handoff mode
- **Stage:** TE
- **Source:** `method/bmad-code-review/step-05-present.md`
- **What:** With a plan, append `### {date}` under `## Code Review` with a summary line and checklists: `- [ ] [Review][Decision] <Title> — <Detail> Options: … Recommended: … — <reason>`, `- [ ] [Review][Patch] <Title> [file:line]`, `- [x] [Review][Defer] <Title> [file:line] — deferred: <reason>`, then a `Rejected` appendix (false with refutation, low with why). Defers also go to `deferred-work.md`. Summary: `Code review complete. D decision-needed, P patch, W defer, R rejected.` Resolve decisions one at a time (number replies). Patch handling menu: apply all / leave as action items / walk through each. **No-code (handoff) mode:** write one Markdown block a coding agent can act on: base and reviewed commit by full SHA, per patch what is wrong and how you know, files/symbols, the outcome (not a recipe), how to check the fix; unresolved decisions and defers listed separately; "never claim a fix works". Never change a plan's status.
- **Prevents:** review results lost in chat; reviewers silently changing ticket state.
- **Target:** `multi-axis-code-review` (persist to VERIFICATION.md) and receive mode handoff. **Keep** the checklist line formats and the handoff block.
- **Also (failed lenses):** a lens that fails, times out or returns empty is recorded in `failed_layers`; if nothing survives triage and any lens failed, warn that the review may be incomplete "rather than announcing a clean review".

#### BM-40 · When to stop reviewing; follow-up recommendation rule
- **Stage:** TE
- **Source:** `help/review-choices.md`; `docs/build/review-a-change.md`; build-auto step-04 Finalize
- **What:** Another pass is worth it after material fixes. Stop when findings are mostly minor notes on unlikely corner cases ("accidental complexity, not quality"). Real findings on a third pass point upstream (weak spec, unclear repo rules): fix that instead. Unattended `followup_review_recommended`: default false; first pass → true if any patched entry was `high` or ≥2 `medium` patched; follow-up pass → true only if it patched a `high`; a true must name the specific unverified risk; patch volume alone never counts.
- **Prevents:** infinite review cycles; review theater.
- **Target:** `multi-axis-code-review` and `verification-gate`. **Keep** the third-pass heuristic and the convergence rule.
- **Also (who reviews what):** in-build review (agents, fixes clear findings itself), standalone code review (agents, the human chooses fixes), walkthrough (the human, guided, fixes nothing unless asked), retrospective (agents across tasks, proposes action items only). A standalone review right after a thorough in-build review "is the same four lenses again". Map these roles in the router's `v-model.md`.

### E. Unattended execution (BU, router)

#### BM-41 · Unattended worker contract
- **Stage:** BU
- **Source:** `method/bmad-build-auto/workflow.md`; `docs/build/autonomous-development-loops.md`; `help/unattended-builds.md`
- **What:** One invocation builds exactly one named unit and never picks or advances to another; it never asks; anything unclear halts `blocked` with a named reason written into the plan; subagents are mandatory (none → HALT `no subagents`); all subagents of a step launch in one message as blocking calls, never backgrounded ("there is no event loop to resume a yielded turn"); the only way to end a turn is HALT with a terminal status. Fits when decisions and patterns are settled and someone reads results; risky or foundational work uses the attended build. The orchestrator (human, script or AI session) owns backlog policy, dispatch, marking done, and checkpoints, and reads `status`, `blocked_reason` and `## Auto Run Result` instead of chat output.
- **Prevents:** runaway agents choosing their own scope; stalled unattended runs; success inferred from chat.
- **Target:** `executing-plans` subagent mode (per-task worker) and router hand-off rules. **Adapt:** keep the worker/orchestrator split (task worker vs executing-plans as orchestrator), the "never background a subagent" rule and the named blocking conditions; drop `tickets.py mark`.

#### BM-42 · Checkpoints, intent-gap patch preservation and machine-readable run result
- **Stage:** DE/BU
- **Source:** `method/bmad-agent-po/assets/tickets-template.toml` (`plan_checkpoint`, `done_checkpoint`); `method/bmad-build-auto/step-02-plan.md` ("Halt after planning."); build-auto step-04 intent_gap
- **What:** Per work item: `plan_checkpoint = true` → a person reviews the plan first (dispatch with "Halt after planning.", which stops at `ready-for-dev`; the next dispatch implements); `done_checkpoint = true` → pause after this item until a person says continue. The worker never reads these; the orchestrator honors them; propose plan checkpoints on risky items. When review halts on intent_gap, save the attempted change as `<plan>.patch` beside the plan, reference it from the triage log, revert; if the reading was right, `git apply` it and resume review.
- **Prevents:** risky items built without human review; losing a possibly-correct attempt when halting.
- **Target:** `executing-plans` (per-task "pause for human" flags; Gate 2 approval per risky task). **Keep** both flags as optional task fields and the patch-preservation trick.
- **Also (machine-readable run result):** on finish write `## Auto Run Result`: summary, files changed (one line each), review breakdown (patches, deferrals, every rejected finding with reason), follow-up recommendation with patched counts by verdict, verification commands and outcomes, residual risks. Deferred findings go into one YAML `deferred:` list (`summary`, `evidence`, optional `location`, `severity`, maybe-false marked "(unverified)"), serialized as block scalars and re-parsed to verify; `warnings: [oversized, multiple-goals]`; with no plan, a fallback result file holds status and blocking condition. Orchestrators read files, never chat.

### F. Architecture (DE)

#### BM-43 · Architecture spine: invariants only
- **Stage:** DE
- **Source:** `method/bmad-architecture/SKILL.md` (Overview)
- **What:** The output is a "consistency contract that fixes only the invariants keeping independently-built units from diverging": design paradigm, boundary and dependency rules, how state is mutated, who owns shared data. Stack, tree and full data shape are **seed** (true at cold start, owned by code afterwards). One test (quote, `bmad-architecture/SKILL.md`):
  > "If two units one level down built this independently, could they choose incompatibly? Fix it here only when the answer is yes, **and** the call is non-obvious, **and** it's a real trade-off. Otherwise name it under Deferred and move on."

  Lead with a named paradigm (it "carries a whole model for free"). Record decisions, not rationale (rationale stays in the decision log). Carry shape in diagrams. Default purpose is a terse build substrate; a "discussion" doc keeps open questions in front when aligning people.
- **Prevents:** bloated architecture documents that duplicate code and rot; missing the decisions parallel builders actually diverge on.
- **Target:** `senior-solution-architect` (DE, minor upgrade). **Keep** the three-part test and the invariant/seed/deferred split; it complements C4/ADR work.
- **Also (currency, starters, brownfield):** verify every named technology's current version and fit on the web before binding it; for greenfield or beginner projects recommend a well-known current starter (it pre-decides a coherent slab of architecture); for brownfield, investigate first and ratify the conventions the code already shows rather than invent new ones, without retelling the scan to the user.

#### BM-44 · AD-n decision blocks (Binds / Prevents / Rule)
- **Stage:** DE
- **Source:** `method/bmad-architecture/assets/spine-template.md`; `SKILL.md` ("How a run works")
- **What:** Each surviving decision is `### AD-n — {decision}` with **Binds** (requirement ids, units, areas or `all`), **Prevents** (the divergence it stops), **Rule** (the enforceable constraint), tagged `[ADOPTED]` when the user or existing reality already settled it. IDs ascend, are never reused or renumbered; updates amend a Rule in place or add the next id. Template sections: Design Paradigm (layers → directories), Inherited Invariants (parent ids, read-only), Invariants & Rules (with a dependency-direction Mermaid diagram), Consistency Conventions (naming; data formats/ids/dates/error shapes; state/errors/logging/config/auth), Stack (name + pinned version only), Structural Seed (only non-obvious shapes; deployment and environments when this altitude owns them), Capability → Architecture Map (requirement → where it lives → what governs it), Deferred (each with why it can wait).
- **Prevents:** decisions without enforceable rules; renumbering that breaks downstream citations.
- **Target:** `senior-solution-architect` and `writing-plans` (tasks cite AD/ADR ids). **Adapt:** V-Method ADRs (`docs/adr/NNNN-*.md`) hold rationale; an optional architecture note uses AD-n blocks with Binds → `AC-n`.
- **Also (altitude and inheritance):** a spine's altitude mirrors what it augments (initiative → features, feature → epics, epic → stories). A child spine loads the parent's ADs as binding and read-only, lists them under Inherited Invariants by original id, decides only what the parent deferred, and treats a contradicting new AD as "a conflict to surface, not a local override".

#### BM-45 · Coaching path vs fast path with `[ASSUMPTION]` tags
- **Stage:** PL/AN/DE (cross-cutting)
- **Source:** `method/bmad-architecture/SKILL.md` ("How you work"); `core/bmad-facilitate/SKILL.md` ("Facilitation"); `method/bmad-ux/SKILL.md`
- **What:** Two working modes offered before any drafting. **Coaching** (default): open-ended questions one at a time, the document grows as answers land, push back on thin answers, load-bearing calls are shown with realistic alternatives and a stated lean, the user chooses. **Fast**: one batch of missing required inputs plus up to three high-impact questions, then draft everything with `[ASSUMPTION: …]` tags, then walk assumptions section by section with proposed answers. "Unless the user clearly wants speed, coach; don't silently draft." Also mandatory before drafting: ask the purpose and audience of the deliverable (it right-sizes the artifact).
- **Prevents:** agents producing a plausible document the user never thought through; unmarked guesses.
- **Target:** `spec-driven-development` (create vs synthesize), `brainstorming`, `senior-solution-architect`. **Keep** both paths and the tag convention.

#### BM-46 · Architecture reviewer gate (lint + rubric + adversarial pair)
- **Stage:** DE → TE (design review)
- **Source:** `method/bmad-architecture/references/reviewer-gate.md`; `scripts/lint_spine.py`; `SKILL.md` ("Finalize")
- **What:** Finalize order: distill from the decision log → reconcile inputs (one subagent per input returns what did not land, "especially a quiet requirement (a tone, a constraint)") → gate → triage open questions/assumptions (blockers resolved one at a time, rest deferred with revisit condition) → optional renderings → close. Gate: deterministic lint first (placeholders TBD/TODO/"similar to AD-n"/unfilled `{tokens}`, duplicate or non-monotonic AD ids, AD blocks missing Binds/Prevents/Rule, Stack rows without versions); then parallel fresh-context reviewers each writing `reviews/review-{lens}.md` and returning only verdict + top findings: a **rubric walker** (fixes the real divergence points; every Rule enforceable; nothing Deferred lets units diverge; tech verified; ratifies brownfield; covers every requirement; no weakened inherited AD; every dimension decided/deferred/open — "a whole dimension left silent is a finding, especially the operational/environmental envelope"), the **currency** reviewer, and the **adversary**: "construct two units one level down that each obey every AD to the letter yet still build incompatibly"; each pair found is a hole. Findings tiered: one-sentence verdict, critical+high, the rest counted. "An inline self-check does not count."
- **Prevents:** architecture gaps found only during integration; missing deployment/operations decisions.
- **Target:** `senior-solution-architect` (DE exit) feeding Gate 2. **Keep** the adversarial-pair lens and the "silent dimension" check; implement lint as a checklist rather than a script.

#### BM-47 · Append-only decision log, artifact distilled at the end
- **Stage:** cross-cutting
- **Source:** `method/bmad-architecture/SKILL.md`; `core/bmad-facilitate/SKILL.md`; `method/bmad-agent-po/references/spec.md`; brainstorming, forge-idea, deep-recon
- **What:** Every run keeps a `.memlog.md` beside its artifact: one append-only line per decision, constraint, version, assumption, question, direction or event (types vary by skill), gist plus reason, never edited or reordered; a later entry supersedes an earlier one; terminal moments are `event` lines (no status field). The artifact is distilled from the log at the end, not written as you go; resume = reload the log; "What is not logged is lost on resume." For requirements, the log is the authority on decisions and requirement ids, and the derived sections are regenerated from it.
- **Prevents:** decisions lost when a session ends; artifacts that drift from what was actually agreed.
- **Target:** `spec-driven-development` (SPEC revision history), `grill-me` docs mode, `brainstorming`. **Adapt:** a plain `## Decision log` section (or `DECISIONS.md`) appended with dated one-liners; no script needed.

### G. Requirements, tickets and slicing (AN, DE)

#### BM-48 · The ticket is the spec
- **Stage:** AN (cross-cutting rule)
- **Source:** `help/help.md` ("The ticket is the spec"); `method/bmad-agent-po/workflow.md` (Dispatch)
- **What:** The initiative, epic or story file is the specification at its level. Every skill working on it reads it first and in full and trusts it. Its `sources:` (inputs it was derived from) are already distilled into it and are re-read only by the spec writer on update; a `companions:` file (adopted design, architecture, glossary) is opened only where the ticket points. When a PRD and a ticket's requirements disagree, the ticket wins and the PRD is a source; the contradiction goes to the user.
- **Prevents:** builders re-deriving requirements from a PRD differently each session; context bloat from re-reading every input.
- **Target:** `spec-driven-development` and every downstream skill ("SPEC.md is the spec; read it first and in full"). **Keep.**

#### BM-49 · Requirement lines with stable ids and source citations
- **Stage:** AN
- **Source:** `method/bmad-agent-po/references/spec.md`; `assets/ticket-template.md` (Requirements)
- **What:** Each requirement is one line `R<n> (<source ids>): <checkable result>` (e.g. `R1 (FR-2, FR-5)`), epic lines `R<n> (parent R<m>)`. Ids are never reused or renumbered; new ones take the next unused number. The spec writer is the only writer of the derived lines (Requirements, Constraints, Assumption and Open question lines); changes go to the decision log, never hand-edited, and a derive replaces exactly those lines. On update, name the stale entries and the tickets whose `covers` cite a changed id, and offer to re-slice them; never edit a child. Pre-sorted input (PRD) keeps its separation: each requirement and constraint lifted with its source id; capabilities → requirement lines, rules → constraint lines.
- **Prevents:** untraceable requirements; renumbering that breaks every downstream reference.
- **Target:** `spec-driven-development` (`AC-n` ids with source tags; revisions keep ids). **Keep** the never-renumber rule and the stale-dependent report.

#### BM-50 · Spec Law (eight rules)
- **Stage:** AN
- **Source:** `method/bmad-agent-po/references/spec.md` ("Spec Law")
- **What:** (1) each requirement line says what is possible and what shows it was met; (2) requirements say WHAT, not HOW (implementation goes in a companion); (3) constraints bend design decisions; (4) boundaries name at least one thing that is out; (5) each `Done when` check is testable or demonstrable; (6) requirement ids are never reused or renumbered; (7) every load-bearing source claim lands in the ticket or a companion; (8) every sentence in the ticket, companions and decision log carries load-bearing content.
- **Prevents:** vague, solution-prescribing or padded specs; silently dropped source requirements.
- **Target:** `spec-driven-development` validate mode. **Keep** all eight as the SPEC validation checklist.
- **Also (load-bearing test and companions):** a claim is load-bearing if any consumer (downstream skill, implementer, verification pass) would change a decision without it. Multi-line content (tables, diagrams, long reference) goes into a companion file ("a line growing sub-bullets wants one"); spec-authored companions may be edited on update; adopted ones (DESIGN.md, existing docs) are listed in `companions:` and never edited or duplicated. Keeps SPEC.md lean.

#### BM-51 · Two-pass self-validation (coherence, preservation)
- **Stage:** AN (pre-Gate 1)
- **Source:** `method/bmad-agent-po/customize.toml` (`spec_self_validate`)
- **What:** Before presenting any create or update: **Pass 1 Coherence** — check against Spec Law rules 1–6 and 8; fix failures without inventing content; unconfirmed calls become `Assumption:` lines, unfilled gaps `Open question:` lines. **Pass 2 Preservation** — every load-bearing source claim lands in the ticket or a companion; log each wrapper-only drop as an event. Record each pass's verdict in the log; mention a pass to the user only when it changed something they approved.
- **Prevents:** specs that read well but lost a requirement from the source document.
- **Target:** `spec-driven-development` (runs before the doubt pass). **Keep** the preservation pass explicitly; it is distinct from the adversarial doubt pass.

#### BM-52 · Marked Notes lines
- **Stage:** AN/DE
- **Source:** `method/bmad-agent-po/assets/ticket-template.md` (Notes); `references/ticket.md`; `references/slice.md`
- **What:** Notes hold only unsettled, ticket-local items, one marked line each: `Assumption:` (unconfirmed; once confirmed, a dated Decision), `Open question:` (who waits), `Unknown:` (gates an item's start once copied to its `unknown` key), `Parked:` (unplaced requirement id, with the user's knowledge), `Decision:` (the user's choice, dated; declined suggestions too), `Source conflict:` (id — source vs code or another source), `Waits on [epic] because:`, `Dropped:` (why, before status goes to dropped). When code contradicts a requirement line, add a Source conflict to the container that owns the line, tell the user, offer the correction; dependent items stay unrefined until a Decision settles it. Declined suggestions recorded as Decisions are not re-raised unless new evidence changes their basis.
- **Prevents:** decisions re-asked every session; spec/code contradictions papered over.
- **Target:** `spec-driven-development` (Open questions / Decisions sections) and router change protocol. **Keep** the prefix vocabulary; it is grep-able and portable.

#### BM-53 · Ticket template by altitude
- **Stage:** AN
- **Source:** `method/bmad-agent-po/assets/ticket-template.md`
- **What:** Frontmatter `id, type (initiative|epic|story), title (container: its outcome; story: what works when done), parent, covers, sources, companions, after, refined, hitl, risk`. Sections: **Description**; **Outcome** (who benefits and what changes for them; the source's own success measure only if stated); **Requirements** (see BM-49; a story has only `Verify: how it will be checked`, or numbered Given/When/Then criteria naming the epic ids they prove, "a criterion states a rule, not an instance, with its failure path"); **Constraints**; **Done when** (3–6 end checks, production delivery among them for containers); **Boundaries** (what it is not; touch points `unit — what is used; owner: epic-x`; `Must not change: behavior`; initiative adds a one-sentence tracer path); **References** (`type — location, section`, opened before citing); **Notes** (BM-52). Rules: reference the parent's requirements, never copy; short plain sentences in project vocabulary; no source paths or snippets unless the snippet is the decision; UI tickets link their design and keep criteria functional; `hitl: true` only when a person does part of the work.
- **Prevents:** inconsistent specs across levels; tickets that restate parents and drift.
- **Target:** `spec-driven-development` (SPEC.md template: add Outcome, Done when, Boundaries with touch points and Must-not-change). **Adapt** to the plan's SPEC sections; Done when ≈ objectives/indicators for the PL ↔ DP pair.

#### BM-54 · Bug and spike ticket shapes
- **Stage:** AN (Quick route, BU debugging)
- **Source:** `method/bmad-agent-po/assets/bug-template.md`, `spike-template.md`; `references/ticket.md`
- **What:** **Bug:** severity P0 (outage, data loss, security exposure) / P1 (core function broken, no workaround) / P2 (impaired, workaround) / P3 (cosmetic); sections Description, Reproduction (exact steps, environment, actual vs expected, verbatim logs), **Cause Hypothesis** ("Never a prescribed fix"), Acceptance Criteria: (1) expected behavior holds after the reproduction; (2) a test that fails on the defect and passes on the fix covers the reproduction plus each related case touched; (3) **or no change is needed, with proof** (supersedes 1 and 2). Run the reproduction when cheap; if behavior already holds, show evidence and create nothing. **Spike:** title is the question; Description names who waits on the answer; Approach is numbered steps with a time box and "good enough"; criteria use `Verify:` lines (comparison recorded, prototype shows the answer works, answer recorded where waiting tickets find it, acceptors have accepted).
- **Prevents:** bug tickets that prescribe the wrong fix; spikes with no exit.
- **Target:** `systematic-debugging` (bug intake, regression-test-first) and `spec-driven-development` (spike as an AN artifact). **Keep** the "no change needed, with proof" criterion.

#### BM-55 · Epic slicing rules and thin epics
- **Stage:** DE
- **Source:** `method/bmad-agent-po/references/slice.md` ("Initiative into epics", "Refining an epic")
- **What:** Default rule: an epic is one source capability (or a tightly coupled pair) delivered and deployed together; two epics need at most a contract between them; a module or bounded context is an epic boundary only when it is also a deployment boundary. One epic unless a distinct outcome or early-usable part splits it. Units the work only consumes/configures are touch points with owners. The platform baseline (scaffold, CI, deployment) is the opening epic or first stories. "Every epic delivers to production; its `Done when` includes integrated verification." New epics are written thin (`refined: false`: Description, Outcome, Boundaries, Done when as known, no requirements); refining is its own stage: what is settled, each open point with a pick (settle now / spike / leave to stories), then requirements and `refined: true`. Shared decisions → architecture spine, or a hitl decision story in the opening epic that other epics wait on. All in one message, then revise in place until approved; every slicing choice, declined ones included, recorded as a dated Decision.
- **Prevents:** epics split by team or layer that cannot ship; premature detail on far-future epics.
- **Target:** `writing-plans` (Full route: phase/milestone slicing) and router. **Keep** "every slice deploys to production" and "thin until refined".

#### BM-56 · Story slicing rules (tracer bullet, lanes, split-never-shrink)
- **Stage:** DE
- **Source:** `method/bmad-agent-po/references/slice.md` ("Epic into stories"); `customize.toml` (`tickets_tracer_bullet`, `tickets_refactor_sweep`, `tickets_story_count`)
- **What:** A good story is one step toward Done when, sized for one agent session (merge when setup outweighs work). **First item = tracer bullet**: the thinnest path through every layer the epic touches, its setup a hitl step; then the story the user is least sure of. Stories touching the same code form one ordered lane; an interface two lanes share gets a stub as its own early story. Done is one runnable check. "Split, never shrink: 'for now', 'placeholder', 'simplified', 'wired later' is a second story." Setup goes on the first story that needs it. Tests go in every story; the only test story is a closing end-to-end suite. 8–12 stories typical; past that, offer a split. Epics with more than three entries close with a "Refactor sweep" story (cleanup only, scope from deferred findings) unless declined as a Decision. Offer an opening refactor when code quality calls for one. Name the tracer bullet, parallel work and deferred scope with the draft.
- **Prevents:** horizontal layer slices; "temporary" shortcuts that never get finished; drift and duplication accumulating across stories.
- **Target:** `writing-plans` (tracer-bullet vertical slices, `Blocked by:` edges). **Keep** tracer-bullet-first, least-certain-second, lanes, split-never-shrink and the closing refactor sweep.

#### BM-57 · Work-item schema with prerequisites and verify line
- **Stage:** DE
- **Source:** `method/bmad-agent-po/assets/tickets-template.toml`
- **What:** An ordered list (table order = build order, ids permanent, never reused) of entries: `id, type (story|spike|bug), title, description (what exists when done), verify (one runnable check a non-builder can run), covers (requirement ids), after (real prerequisites only, not restated order: sibling id, "<epic>.<entry>", or "epic-<slug>"), hitl, risk`, optional `estimate` (only if the user gives one; never proposed), `unknown` (one-sentence user question that blocks the entry until removed), `references`, `notes` (user's words only), `refine`, `plan_checkpoint`, `done_checkpoint`. Epic tables carry `after = [{ epic = 1, needs = "the one-function pricing contract" }]`. A story file is written only when reviewed, refined or published; an entry builds directly.
- **Prevents:** order confused with dependency; tickets written early that go stale before work starts.
- **Target:** `writing-plans` PLAN.md task graph (task id, covers `AC-n`, Blocked by, verify, risk, hitl, unknown). **Keep** "after = real prerequisites only" and "verify = runnable by a non-builder"; drop TOML in favor of a Markdown table.

#### BM-58 · Readiness classification of the work queue
- **Stage:** BU (dispatch)
- **Source:** `method/bmad-agent-po/scripts/tickets.py` (`classify()`); `tools/ticket-tree-rules.md`
- **What:** For each open item: done/dropped → skip; unmet = prerequisites not done-or-in-review, plus epic gates not done; blocked status or `blocked_at` → **blocked** (with `waiting_on`); in-progress/review → **in_progress**; unmet prerequisites → **blocked**; `refine` and not refined → **ready_to_refine**; has `unknown` → **blocked**; else **ready_to_start**. A prerequisite in review counts as met (so work can pipeline), a dropped prerequisite still blocks, an epic-level gate waits for the whole epic to be done. Also computes the longest remaining dependency chain.
- **Prevents:** starting work whose inputs do not exist; dropped dependencies silently unblocking dependents.
- **Target:** `executing-plans` (ready frontier for parallel dispatch). **Keep** the classification rules as prose; "in review satisfies a dependency, dropped blocks" is a useful policy.

#### BM-59 · Fresh-context validation checks by scope
- **Stage:** AN/DE (Gate 1 and Gate 2 checks)
- **Source:** `method/bmad-agent-po/references/validate.md`, `validate-checks.md`
- **What:** Fresh-context subagents run named check sections against a file path. **Ticket:** references open; no placeholders; assumptions marked; nothing contradicts epic, companions, architecture or a recorded decision; each entry has a description, a known `unknown`, a `verify` a non-builder can run. **Set:** entries cover every requirement not deferred with the user; tickets sharing an id say which part each delivers; UX/architecture/constraint/integration work is covered even without ids ("citing an id alone is not coverage"); every `after` is a real prerequisite; no cycles; a builder could write each story's ACs from epic + entry + references (else fix the epic, not the entry); tracer bullet and refactor sweep present. **Tree:** every initiative requirement has an accountable epic or agreed deferral; source ids resolve; every unit touched is an epic, out of scope, or a touch point; each shared decision has one home; every epic has Outcome, Done when (with production delivery), Boundaries; opens with a platform baseline or a Decision saying why not. **Dependencies:** what each item needs to start and to run its check is built by it or its prerequisites; items with no dependency path share no code, config, schema or setup (else add an edge or merge); shared setup owned by the earliest item; handoffs stated on both sides. **Closure:** verify Done when, requirements, constraints and companions against implementation evidence, not child status. Findings sorted into fix (mechanical) / suggest (with reason) / ask.
- **Prevents:** plans with hidden collisions between "parallel" items; coverage by citation only; closing on child status.
- **Target:** `writing-plans` (Gate 2 validation: coverage + dependency checks), `spec-driven-development` (ticket check), `retrospective` (closure). **Keep** the Dependencies "collisions" check for parallel subagent dispatch.
- **Also (closure is a check, not a count):** "Closing every child does not close the parent." Before closing, offer the retrospective, run the closure check against requirements and Done when, and get the user's confirmation; drop only after a `Dropped:` line explains why; never delete an entry from an approved breakdown; repoint dependents.

#### BM-60 · Replan (mid-flight change protocol)
- **Stage:** cross-cutting (router change protocol)
- **Source:** `method/bmad-agent-po/references/replan.md`; `docs/plan/break-work-into-stories-and-track-it.md` ("Replan")
- **What:** Goal: "Leave the remaining tickets true and nothing already built rewritten. No proposal file." Steps: (1) name the change (what, source, evidence); read the ticket, its log, breakdown, finished children and touched architecture/design; say whether **what is required** changed or only **how it is delivered**; propose adjust remaining / roll back built work / cut scope, with reason; the user decides; an in-progress item: ask whether its build stops, never edit its plan; (2) if requirements changed, re-run the spec writer with the change as input (ids kept; name entries whose covers cite a changed id); (3) re-slice affected epics; (4) drop what no longer belongs (with a Dropped line) and clear what waited on it; (5) record the reason as a dated Decision in each touched container; invalidated architecture/design → note it and offer the owning skill, never edit the companion. Report what changed, was dropped, and is ready.
- **Prevents:** scope changes that silently invalidate built work or leave stale tasks; ad hoc edits to in-flight plans.
- **Target:** `agentic-v-method` change protocol (impact on SPEC/PLAN/tasks/tests → new SPEC revision → re-approval). **Keep** the required-vs-delivery distinction and "never edit an in-progress plan".

### H. Upstream planning documents (PL, AN)

#### BM-61 · Altitude ladder for planning documents
- **Stage:** PL/AN
- **Source:** `method/bmad-agent-pm/SKILL.md` ("The ticket tree"); `assets/template-prd.md` (stance comment)
- **What:** Altitude sets what a document decides: keep a line when the level below would decide wrongly without it; leave it out when that level would decide better with more information. Program: outcomes, initiatives and their order, cross-cutting rules, no requirements. Initiative: problem and who has it, outcome and measures, capabilities with one checkable result each, rules, non-goals, known risks, questions only the user can answer. Epic: testable requirements, edge cases, failure states, in/out for the slice, what stays unchanged; cites parent ids. "Non-goals and known rabbit holes take detail at every altitude, because they stop invention below." Ceilings: ~3,000 words at program/initiative, 2,000 at epic, two pages for hobby/solo; over the ceiling pushes detail down or splits.
- **Prevents:** PRDs that pre-decide implementation; epic specs that lack testable edges.
- **Target:** `spec-driven-development` (Standard vs Full SPEC depth) and `brainstorming` design brief. **Keep** the keep/leave-out test and word ceilings.

#### BM-62 · PRD conventions: journeys, FR/RULE/SM/OQ ids, leanness coaching
- **Stage:** AN
- **Source:** `method/bmad-agent-pm/assets/template-prd.md`
- **What:** Journeys `UJ-N` with a named protagonist and inline persona (not "the user"), entry state, 3–5 beats, a climax where value lands, resolution, optionally one failure, ending with the FRs that realize it; captured from the user's narration, not authored. Requirements `FR-N`: "[Actor] can [capability] [under conditions]" plus out-of-scope bounds. `RULE-N` (rules spanning features; quality constraints carry a threshold and the user outcome they protect, "no generic non-functional list"). `SM-N` metrics with current value, target, FRs validated, and **counter-metrics** naming the metric they balance. `OQ-N` with owner, needed-by and what it blocks. Conditional sections (`include when:`): Change boundary (existing product: what stays, changes, is added, must not change), AI behavior and evaluation (must-never, failure modes from real outputs, ship/rollback eval thresholds, fallbacks), Data and compliance, SLOs, Consumer migration, Stakeholders/risks/rollout. MVP scope: after requirements, coach leanness — name what could wait and why; press hardest on an idea being tested, ease off where a mandate fixes scope; headless lists candidates as an open question and cuts nothing. Done when: every FR checkable and traced to a journey or need, every journey beat that needs the product has an FR, counter-metrics named above hobby stakes, "the user remembers making every decision in it". Next: the PRD is revisited after each epic lands.
- **Prevents:** generic NFR lists; metrics gamed without counter-metrics; scope bloat; requirements the user never chose.
- **Target:** `spec-driven-development` (Baseline & indicators with counter-indicators; Change boundary for brownfield; AI behavior section when applicable). **Adapt** selectively; the V-Method SPEC is a feature spec, not a PRD.

#### BM-63 · Agent-spec template (one feature for a coding agent)
- **Stage:** AN
- **Source:** `method/bmad-agent-pm/assets/template-agent-spec.md`
- **What:** Draft first from conversation and codebase; ask only what changes scope, security or user experience, each with a recommended answer. Sections: Problem; User stories by priority (each with why this priority, an **independent test** showing it delivers value alone, Given/When/Then); Edge cases (where a wrong guess builds the wrong thing; omit what conventions settle); Requirements (`FR-N` "The system MUST …"); Key entities (no schema); Success criteria (`SC-N`, measurable without knowing the implementation); Out of scope; Assumptions; Implementation context (decisions made, modules touched, "the highest seam where the tests run"); Open questions (each blocks handoff). Behavior, not implementation: no file paths or code except a fragment that pins a decision (a schema, a state machine).
- **Prevents:** agent specs that leave scope for the agent to guess.
- **Target:** `spec-driven-development` Standard-route SPEC (closest analogue). **Keep** "independent test per story" and "highest seam where tests run".

#### BM-64 · Prototype plan and experiment card (decide the kill criterion first)
- **Stage:** PL
- **Source:** `method/bmad-agent-pm/assets/template-prototype-plan.md`, `template-experiment.md`; `help/prototyping.md`
- **What:** **Prototype plan:** Ask and goal (the one question it must answer, and "the result that would make the user drop the idea, written before anything is built, because a bar set after the results flatters them"), Timebox, Where to build (folder, branch), Platform, Existing ground truth, Options to compare, Look and feel, Build (what may be faked or skipped, review depth none/quick), Outcome (written after: verdict proven/disproven/conditional, what it taught, what was faked, keep/throw away/drop decision, "the prototype's effort is not an estimate of the real build"). After the run the user decides on purpose: throw away (notes → spec), keep (treat as existing codebase: project context, spec, ratify architecture), or drop. **Experiment card:** one hypothesis ("We believe [change] for [who] will [effect], because [evidence]"), test, thresholds for success and kill fixed before running ("'It goes up' and 'we'll see' are not thresholds"), guardrails with stop levels and a watcher, duration checked against detectable effect, result written against thresholds as written ("a threshold moved after the data is a new experiment").
- **Prevents:** prototypes silently becoming production with no spec; post-hoc success criteria.
- **Target:** `brainstorming` (prototype detour) and router PL target indicators. **Keep** "kill criterion before build" and the throw/keep/drop decision; the threshold-before-data rule fits the PL ↔ DP indicator pair.

#### BM-65 · Launch plan (go/no-go and readiness)
- **Stage:** DP
- **Source:** `method/bmad-agent-pm/assets/template-launch.md`
- **What:** Settle who drives and who approves, and the go/no-go criteria, before planning activities. Sections: Roles (driver, approver, contributors, informed), Objective + date, Audience, Success metrics (how and when judged), Messaging in customer words, Channels and activities (each with owner and date; weigh against what is shipping — "a small change may need only a note and a support brief"), Readiness (support, documentation, sales enablement and **rollback**, each with an owner), Go/no-go criteria (what must be true on launch day, who calls it).
- **Prevents:** launches with no owner for rollback or no explicit go/no-go call.
- **Target:** `shipping-and-handover` and `deployment-pipeline` (rollout/rollback plan with owners, go/no-go). **Keep** "go/no-go criteria and approver first".

#### BM-66 · Decision record template
- **Stage:** DE/DP
- **Source:** `method/bmod-method/doc-templates/template-decision-record.md`; ADR test in `bmad-retrospective/references/acceptance-verdict.md`
- **What:** Paced sections: Status (exactly one of proposed/accepted/rejected/deprecated/superseded, plus who and when); Context (facts and forces "without arguing for the outcome"); Decision drivers (optional, most important first); Options considered (each real option including doing nothing; the facilitator advocates every option not chosen); Decision (one active sentence "We will …" plus why it won); Consequences (easier, harder, cost, follow-up work; "If only upsides come back, ask what the team gives up"); Confirmation (the review, test, metric or date that shows whether it held); Links. A changed decision gets a new superseding record. When to write one (retrospective and codebase research): the decision is hard to reverse, surprising without context, and the result of a real trade-off, and no existing record covers it; named `adr-<decision-slug>.md` beside the code it governs or in the decisions folder; the why comes from evidence, and "when none gives it the record says so".
- **Prevents:** ADRs written for trivial choices; rationalized context; ADRs that invent reasons after the fact.
- **Target:** `senior-solution-architect` (ADR template alignment) and `retrospective` (ADR proposals). **Keep** the three-part "when to write" test and the Confirmation section.
- **Also (postmortem template, same folder):** blameless and facts-before-causes: impact with sourced numbers, timeline from records first, contributing factors (trigger separated from what let it do harm; "human error" is not a stopping point), action items tagged prevents / detects / mitigates with owner and date, roles not names, one time zone. Target: `shipping-and-handover` runbook and an incident variant of `retrospective`.

#### BM-67 · Security review template with OWASP Top 10 (2025) and STRIDE catalogs
- **Stage:** AN/DE/TE (cross-cutting)
- **Source:** `method/bmod-method/doc-templates/template-security-review.md`, `methods-security.csv`
- **What:** Walk a chosen standard row by row with the system owner: "The framework handles it" is not an answer until they say where. Sections: Scope and system (standard and rows covered), Architecture and data flows (trust boundaries, flowchart), Key request flows (auth, payment, multi-party; sequence diagram), Findings (per row: item, status exactly pass / gap / unverified / not applicable, evidence, severity critical/high/medium/low for gaps), Risk decisions (accepted gaps: who, why, revisit date), Remediation plan (action, owner, priority, date), Open questions. "Record no test result, CVE, scan output or compliance statement the user did not supply." Catalog: OWASP A01 Broken Access Control … A10 Mishandling of Exceptional Conditions, and STRIDE's six threats, each with 4–5 key questions (e.g. A05: "Does any prompt or template mix user input with instructions?").
- **Prevents:** checkbox security reviews; fabricated compliance evidence.
- **Target:** `security-hardening` (TE review lens and AN threat pass). **Adapt:** write our own key questions (the catalog is MIT, but the plan wants SSDF mapping too); keep the four status values and the no-fabrication rule.

### I. Facilitation engine and document quality (cross-cutting)

#### BM-68 · Facilitation loop: brain dump, read-back, ask only what only the user knows
- **Stage:** PL/AN
- **Source:** `core/bmad-facilitate/SKILL.md` ("Facilitation", "Scale and writing", "Progress")
- **What:** Read every input before asking (long sources via extraction subagents). Invite a brain dump, then "anything else?"; hold specific questions until the broad shape is out. In a separate message, echo purpose, reader, domain and stakes, and name the path (coaching default). Coaching: one question at a time, no message asks more than two things, follow the user's thread and file what they say into the right section, steer back to the next open section. Never default what only the user knows; contradictions between inputs go to the user before drafting. Find other facts yourself (web research when the document rests on outside facts). "Nothing goes in as the user's that they did not say or accept"; a yes to a group of recommendations accepts nothing individually. Settle every section in order: required → filled or a named open question; optional → offered and decided; never left out silently. Progress line per message (`PRD · 6 of 24 done · open: Non-goals, MVP scope`). Paced templates walk sections strictly in order, each section's comment becoming the facilitator's voice and stance until it closes.
- **Prevents:** interrogations about discoverable facts; documents attributing agent guesses to the user; silently skipped sections.
- **Target:** `brainstorming`, `grill-me`, `spec-driven-development` create mode. **Keep** the "only what only the user knows" rule, the two-question cap and the group-yes rule.

#### BM-69 · Document finalize pipeline
- **Stage:** AN (pre-gate)
- **Source:** `core/bmad-facilitate/SKILL.md` ("Review", "Finalize"); `scripts/check_ids.py`
- **What:** (1) Decision-log audit: each meaningful entry lands in the document or is set aside; id check (undefined, duplicate, withdrawn-but-referenced ids; stale or out-of-order table of contents). (2) Reconciliation: one subagent per user input returns what the document dropped, "above all tone and feel". (3) Review: rubric walker + a **fresh reader** given only the document ("what it would still need answered to use it, ranked", one round) + configured reviewers, chosen by stakes, run as parallel subagents writing `review-<lens>.md`. Lead with a one-sentence verdict and the three fixes that matter most; walk critical/high one at a time; "A claim put in the user's mouth that they never made is high." (4) Triage assumptions and open questions: resolve blockers one at a time; "Many blockers is itself a finding." (5) Polish within the template's length (count words, cut). (6) Rebuild TOC. (7) Tell the user what was set aside and the three decisions you are least confident about; wait. (8) Handoffs. (9) Close: `status: final` unless a blocking question remains.
- **Prevents:** documents that lose input content, overrun length, or close with blocking unknowns.
- **Target:** `spec-driven-development` (pre-Gate 1 sequence: preservation → doubt pass → fresh reader → triage). **Keep** the fresh-reader reviewer and "three least-confident decisions".
- **Also (planning rubric):** rate each dimension strong / adequate / thin / broken against purpose and stakes: Decision-ready (trade-offs stated, one thesis), Earned (no persona, novelty, boilerplate-NFR or generic-vision theater), Testable (flag vague adjectives), Honest scope (non-goals, tagged inferences), Usable downstream (consistent terms, ids resolve); then check the template's Done when; output a two-sentence verdict, the three fixes that matter most, and findings by dimension with severity, location and fix. Use as the SPEC validation rubric.

#### BM-70 · Stakes ladder, assumption tag and level-below discipline
- **Stage:** PL/AN
- **Source:** `core/bmad-facilitate/references/guidance-planning.md`
- **What:** Stakes: hobby/personal, internal, pitch/investor, publication, public launch, regulated/contracted. Hobby: one line fills a section, minimal review. Below regulated: default and tag; at regulated/contracted: ask instead and "invent no regulation, citation or threshold" (an obligation the user did not name is an open question). Only at launch/regulated stakes may a review fix make the document longer. `[ASSUMPTION: …]` is the only tag; stays until accepted; at polish, remaining tags move to a closing Assumptions section. Stable ids for anything others cite; names, owners and dates come from the user, never the environment. A review finding that would grow agreed scope or decide what the level below should decide is sent to that level or open questions.
- **Prevents:** over-engineered hobby specs; invented regulatory claims; scope creep through review.
- **Target:** router (stakes as sizing input) and `spec-driven-development`, `security-hardening` (no invented compliance). **Keep.**

### J. Core review, elicitation and ideation tools

#### BM-71 · Lens-based document/code review framework
- **Stage:** TE (and AN for documents)
- **Source:** `core/bmad-review/SKILL.md`, `customize.toml`
- **What:** Lenses are configured entries `{code, name, applies_to (any|code|docs), when, after, instruction}`. Content is staged once as a file and classified (diff, source file, function, document; code vs docs; a behavior-defining document such as a ticket is docs a behavioral lens still applies to). Named lenses run exactly; otherwise every enabled lens whose `applies_to` and `when` fit. Announce the plan in one line. Independent lenses run in parallel and never see each other's findings; dependent lenses (`after`) receive their target's findings (prose runs after structure). Canonical finding: `{lens, location, trigger_condition, guard_snippet, potential_consequence}`, no severity; "overlap between lenses is signal, not duplication". Shipped lenses: adversarial (any), edge-case-hunter (behavioral content incl. tickets and plans), verification-gap (code in a repo), structure (docs), prose (docs, after structure). Invoked only when the user says "review" — never uninvited on edits just made.
- **Prevents:** one-size review prompts; lenses contaminating each other.
- **Target:** `multi-axis-code-review` (axes as lenses with applicability) and `spec-driven-development` doubt pass (adversarial + edge-case over SPEC). **Keep** the lens schema and independence rule.
- **Also (adversarial lens):** "Look for what's missing, not only what's wrong. Find at least ten issues to fix or improve." Zero findings means re-check and keep thinking; triage filters the padding. Use in the SPEC doubt pass.
- **Also (when to spawn independent perspectives, from party mode):** voice perspectives inline by default; spawn independent subagents only when divergent, uncolored thinking is the value: an evaluation, review or critique "that fails if one mind voices every side and they drift into agreement", or when perspectives would plausibly reach different conclusions. A router rule for subagent use; personas are dropped.

#### BM-72 · Editorial structure and prose lenses with reader calibration
- **Stage:** AN (document quality), DP (handover docs)
- **Source:** `core/bmad-review/references/editorial-common.md`, `lens-structure.md`, `lens-prose.md`, `structure-models.md`
- **What:** Content is sacrosanct; critique only organization and expression; propose, do not execute. Open with "this document exists to help [audience] accomplish [goal]". Structure lens picks a model (Tutorial/Guide linear; Reference random-access MECE; Explanation abstract→concrete; Prompt/Task meta-first, explicit flow; Strategic pyramid conclusion-first) and tags findings CUT / MERGE / MOVE / CONDENSE / QUESTION / PRESERVE with word impact from exact counts. Prose lens: clinical copy-edit, smallest fix, preserve voice, uncertain fixes as "Consider: …?", skip passages tagged CUT, dedupe. Reader calibration: **humans** (keep visuals, expectation-setting, summaries, examples, warmth) vs **llm** (dependency-first definitions, no hedging, consistent terms, structured formats, no unclear antecedents, reference well-known standards). Output: one table `Pass | Original | Revised | Changes`.
- **Prevents:** bloated or ambiguous skill files and handover docs.
- **Target:** repo's own skill-quality practice; `shipping-and-handover` (HANDOVER.md polish). **Adapt:** the llm calibration list is directly useful for writing SKILL.md files.

#### BM-73 · Advanced elicitation: cold readers pushing a draft off center
- **Stage:** AN/DE (pre-gate critique)
- **Source:** `core/bmad-advanced-elicitation/SKILL.md`, `assets/methods.csv`
- **What:** Premise: "A first draft is the most likely draft: centered, agreeable with its own prompt, biased toward adding and toward the first idea." Target = what the last exchange was about, at its own size. Default round: three pushes, each from a different direction — best-fit method for the likely weak spot, a wildcard "whose answer is hardest to predict for this target", and a third (open push for small targets, second method for documents). Each push is a fresh subagent with a brief of exactly five parts: the target (structure is a constraint, not content), purpose and consumer, what is settled (constraints, decisions made, alternatives rejected — so the push does not reopen them), the method (name, gist, form line), and the return shape (form body + `## Findings` with location, problem, proposed change; at most five for a single choice; nothing true of any draft of its kind). Multi-voice methods get one brief per voice. Merge into one proposed revision; a premise-rejecting finding is shown as a decision; set-aside findings listed with a ground. Present: one headline per push, numbered changes with before/after and the driving push, choice apply all / by number / reject / rerun / direction. Between rounds only the target and settled list advance; findings stay out of the next briefs "so the readers stay cold". Nothing changes until the user accepts. Without subagents: at most two pushes, each read fresh.
- **Prevents:** self-critique anchored by the author's reasoning; critiques that reopen settled decisions.
- **Target:** `grill-me` (upgrade) and `spec-driven-development` doubt pass. **Keep** the five-part brief and "settled list" mechanism; full method list in §4.

#### BM-74 · Brainstorming facilitation discipline
- **Stage:** PL
- **Source:** `core/bmad-brainstorming/SKILL.md`, `references/mode-*.md`, `converge.md`, `finalize.md`, `headless.md`
- **What:** Three stances chosen at the start and held: **Facilitator** (never supplies ideas; one spark only when directly asked, then hand back), **Creative Partner** (user does the majority; "yes, and"; watch the ratio; attribution by/user/coach mandatory), **Ideate for me** (agent generates, then offers to continue together). Framing: aim past 100 ideas and resist concluding; shift creative domain every 5–10 turns (usually by switching technique); one prompt per message, no multiple-choice menus except the two process choices. Open with what and why. 3–4 techniques per batch; run each until it stops producing. **Converge** is a separate phase, never mixed into generation: reflect the field (including odd and buried ideas), pick one move (affinity clustering, impact–effort, NUF test, forced ranking/dot vote, PMI, MoSCoW), at most 2–3 chained. **Finalize:** hand the mirror first (their ideas back, let them connect), then add the connections they would miss; record insights; mark complete; artifacts opt-in (keepsake, a succinct intent doc for downstream skills). Headless is quarantined in its own file because it inverts the stance.
- **Prevents:** agents brainstorming for the user; premature convergence; idea loss.
- **Target:** `brainstorming` (upgrade: divergent → convergent pass, intent doc hand-off to `spec-driven-development`). **Keep** stance discipline, separation of converge, and the "mirror first" synthesis.

#### BM-75 · Forge idea: pressure-test with modes and exits
- **Stage:** PL/AN
- **Source:** `core/bmad-forge-idea/SKILL.md`
- **What:** Goal is better thinking, not an artifact; do not steer toward "shall we build it?". Discover the idea, the session goal (clarify / test / make better) and new vs existing project. User can say "attack this" (never agree until the mode ends; look for contradictions, weak assumptions, failure cases), "defend this", or "switch roles". One question at a time in dependency order, with your current best hypothesis to react to; find discoverable answers yourself; name fuzzy or overloaded terms (user vs buyer vs payer) and force a choice; for existing projects, check claims against files and stop on contradiction. No praise ("Praise is noise"). Two voices per turn: one installed persona fitting the branch (varied) and one generated outsider (competitor, buyer, finance, critic), synthesized into the next question, not a panel debate. Log decisions, assumptions, cracks, kills, locks (a hardened, not-to-be-reopened point). Exits: **Hardened** (distill locks into an extremely short brief: decisions, rejected options, reasons), **Killed** (say so plainly, record why), **Clearer** (log only).
- **Prevents:** sycophantic idea validation; vague terms carried into specs.
- **Target:** `grill-me` (upgrade: attack/defend modes, term disambiguation into GLOSSARY.md, locks → decisions) and `brainstorming`. **Keep** the three exits and the term-ambiguity rule; drop personas and HTML seals.

#### BM-76 · Deep research epistemics and claims ledger
- **Stage:** PL/AN/DE
- **Source:** `core/bmad-deep-recon/SKILL.md`, `references/run.md`, `verification.md`, `synthesis.md`, `selection.md`, `lifecycle.md`, `types/technical.md`
- **What:** Two standing rules inherited by every subagent: "Never conclude from training data alone" and the **research firewall** (project context shapes what to ask, never what is true; research subagents receive only their brief). Files first: every digest written to `digests/` as it lands. A claim is a sentence with a source (publisher, publication date, access date). Plan gate (the one hard stop): decision, type, dimensions pruned to it, topology (breadth-first / depth-first / straightforward), knobs, search surfaces, honest time estimate. Rounds per dimension: broad-first short queries, harvest leads (contradictions first), stop on coverage or novelty exhaustion; a stop-and-write valve when over budget. Source-quality card (primary over aggregators; red flags: speculative language, marketing register, unnamed sources, one upstream echoed by many domains; answer engines are aggregators — cite their citations). Verification at landing: `normal` spot-checks load-bearing claims; `high` cross-checks two-source classes plus red team; `max` everything plus primary-source priority; statuses verified / disputed (report both, never average) / unverified / overturned; ledger lines `ref=[n] status=… class=… pub=YYYY-MM`. Red-team skeptic gets only the conclusion. Synthesis: decision-first executive summary, dimensions, cross-dimension insights (say so if none), contrary evidence, recommendations bound to their consumer with confidence basis, open questions, source table, **staleness map** (re-check dates per claim class). Select shape for choosing between candidates: agree requirements (hard gates vs weighted preferences) before researching candidates; screen to 3–5; evidence per criterion; cost and lock-in incl. exit cost; weighted matrix the user can re-weight, pick, runner-up and when it wins, strongest argument against, cheapest reversibility hedge. Technical pack freshness: versions ≤1 month, ecosystem ≤6 months, landscape ≤12 months (AI ≤3), patterns ≤2 years.
- **Prevents:** confident claims from stale model memory; project wishes leaking into research conclusions.
- **Target:** `senior-solution-architect` (technology selection), `codebase-modernization` (dependency/currency research). Existing `deep-research` skill already covers much; **adopt** the firewall, staleness map and select-shape matrix.

#### BM-77 · Codebase research with question firewall and citation anchors
- **Stage:** AN (brownfield inventory)
- **Source:** `core/bmad-deep-recon/references/codebase.md`, `codebase-locator.md`, `codebase-analyzer.md`, `codebase-historian.md`, `codebase-verifier.md`, `assets/codebase.template.md`
- **What:** One ask becomes a short document saying how the relevant code works at one commit and how it got that way, every claim cited, no recommendations. Questions are factual and never state the intent ("how does a job run end?", not "where would cancellation go?"), shapes: how does X work / why is X this way / where does X live / what touches X; an ask from a ticket adds "how is that code tested?". Roles as fresh subagents that see only the questions: **locators** (search only, via `git ls-tree`/`git grep` at the commit, one per top-level area), **analyzers** (answer one question within a file budget, read via `git show <commit>:<path>`, mark load-bearing claims, list checks that reject or throw, report two same-purpose patterns unranked), **historians** (`git blame`/`log -S`, PR and linked issue; commit messages are claims, weaker when an agent wrote them; report decisions made), **verifiers** (re-open citations; verdict verified/disputed/overturned/unverified). Paths that state intent (plans, specs, tickets) are excluded from every search. Citation format `path:line (symbol) @ sha`; history `sha "subject" #pr`. An anchors check re-finds every citation; later runs without the pinned commit show which cited files changed. Sections: questions, one per answer, "Where the answers meet" (shared methods and their checks), Open questions, Prior documents, "Decisions found" (ADR proposals via the three-part test).
- **Prevents:** researchers reporting what should be instead of what is; uncited summaries of code that silently go stale.
- **Target:** `codebase-modernization` inventory mode. **Keep** the intent firewall, the four question shapes, the citation format, and "read through git at a commit" (dirty tree invisible).

#### BM-78 · Faithful sharding of long documents
- **Stage:** AN (inputs)
- **Source:** `core/bmad-shard-pro/SKILL.md`, `assets/sharded-note.md`
- **What:** Under ~50,000 characters: leave as is. Otherwise ask whether it is kept and edited vs a fixed reference, and whether it must stay one file. Contents-list outcome (stays one file, a detailed section list near the top) when it must stay whole, is a fixed reference, or sections lean on each other; else faithful split: cut word for word into 3–14 KB shards named by content (kebab-case, never prefixed with the doc type so globs do not mis-load them), never inside tables, step lists or diagrams; keep aggregate views (matrices, glossaries) whole; per-shard summary written so a reader can tell it is the shard; when the source states two values for one thing, both shards' summaries say so — never pick one; `related` links; the original moves to `.source/` frozen. A note in the main file tells agents to read the map and open only needed shards. Findings (conflicts, index errors) go in the report, never into shards.
- **Prevents:** agents reading 200 lines of a long spec and missing the rest; summarization that loses or alters facts.
- **Target:** `spec-driven-development` / `codebase-modernization` input handling (large legacy docs). **Adapt** as guidance: keep the 50k threshold and "never resolve source conflicts while splitting".

#### BM-79 · Ingest raw input into traceable notes
- **Stage:** PL/AN (inputs)
- **Source:** `core/bmad-ingest/SKILL.md`; `bmod-core-tools/ingest-templates/template-meeting.md`; `bmod-method/ingest-templates/template-retrospective.md`
- **What:** Keep the raw as it arrived (named by the date it happened, never today's date as a guess). Every note item points to where it sits in the raw (timestamp, section, speaker, short quote); owners, dates, figures and conditions appear only as stated; relative dates get calendar dates computed with `date`/`cal`; reversals give the final state and say it changed; exact quotes where wording carries weight; `## Unclear in the source` for inaudible or conflicting passages. An independent reviewer checks: omitted or misstated decisions/commitments/conditions; something proposed or offered ("I'd do", "I can") shown as decided or assigned; misattributed quotes; unsupported citations; template done-when unmet. Meeting template done-when: every decision and commitment listed with owner and condition, nothing merely offered shown as decided, reversals in final state. Retrospective-meeting template separates "Actions agreed" from "Discussed, not agreed".
- **Prevents:** transcripts turned into fabricated decisions and owners.
- **Target:** `spec-driven-development` synthesize mode (from meeting notes) and `retrospective` (team input). **Keep** the proposed-vs-decided check.

### K. Context, testing, walkthrough, retrospective, UX, evaluation

#### BM-80 · Verified agent-instructions block with admission rules
- **Stage:** PL
- **Source:** `method/bmad-project-context/SKILL.md`, `references/best-practices.md`, `references/template.md`; `docs/existing-codebases/theory-of-project-context.md`
- **What:** A small block in `AGENTS.md` between `<!-- bmad:context -->` markers with a provenance line (date + verified SHA). Sections in order, omitted when empty: Orientation (3–4 sentences), Policy, Where things are, Running and verifying, Conventions that differ from defaults, Known pitfalls. Terse imperative lines; a bare fact appears only as the justification clause of an instruction; every prohibition names the alternative; at most two emphasis markers. **Admit:** policy the code cannot express (stated by a human or read off an enforcing config); what config files cannot say about running the project (the correction, the caveat, the right command when the obvious one is wrong); divergences from ecosystem defaults; pitfalls with observed evidence only ("A surprising scan finding is a question to ask, not a line to write"); runtime behavior invisible from the repo once confirmed; cross-component rules; required versions from project files, never from this session's environment; entry points. **Exclude:** overviews, trees, stack lists, interesting facts, self-enforceable style (propose a check), platitudes, transcribed obvious commands, pasted code, aspirational state, history. Test for every line: "would removing it change agent behavior?" Evidence cited: derivable repo summaries show no success gain and ~20% more inference cost; an always-loaded compressed index of non-derivable knowledge reached 100% vs 53%; agents skip retrieval they must choose. Pointers out of the block must name an observable trigger (path, file type, named task).
- **Prevents:** bloated AGENTS.md files that cost tokens and do not help; rules that agents skip because they sit behind a judgment-based pointer.
- **Target:** `project-context` (setup mode). **Keep** the admit/exclude lists, the marker block (as `<!-- V-METHOD:BEGIN/END -->` per plan §5.2), the provenance SHA and the observable-trigger rule.

#### BM-81 · Ledger-based adoption, deletion grounds, record and audit modes
- **Stage:** PL (and DP → PL learning loop)
- **Source:** `method/bmad-project-context/SKILL.md` (Setup/Adopt/Refresh, Record, Audit, Children); `references/best-practices.md` ("Judging an existing file", "Retire")
- **What:** Intents: setup (no meaningful instruction file), adopt (existing file, no managed block), refresh (block exists), record (an observed agent mistake), audit (re-verify and prune). No writes until the block is shown. Existing human-written instructions enter a **ledger**, each settling as `retain | rewrite | relocate | automate | delete` with reason, evidence, risk if it goes, destination, approval flag. Deletion needs one of four grounds: stale or incorrect (evidence named); mechanically enforced by a check that fails the violation; harmful or contradictory; user approved this deletion as a line item. "'It is discoverable somewhere in the repository' is never, alone, grounds." A rewrite that weakens a rule lists the lost part as a deletion. Discovery fans out to subagents; path-check every file claim; verify every command claim by reading what runs it. Interview only gaps no scan reaches, in batches of at most eight recall questions; never ask to confirm a path-checked claim. For each candidate line, ask first whether a hook, lint rule or CI check enforces it better; an `automate` line stays until the check is live. **Record:** one observed mistake (task, mistake, correction, evidence); one occurrence is noted, recurring or costly earns a line now (exact invocation under Running and verifying for command errors, else a pitfall); propose a check if mechanically preventable. **Refresh:** re-verify paths and caveats, `git log --diff-filter=DR --name-only` since the recorded SHA. **Audit:** ends smaller or equal; "A policy or pitfall goes only when the thing it guards is gone or the user retires it; nothing failing lately is not grounds." Never commit. Nested child files only when rules are subtree-exclusive, substantial, reduce the parent materially and loading is verified for every harness.
- **Prevents:** tools wiping human-written rules; rules removed because they "work"; prose rules where a lint would do.
- **Target:** `project-context` (adopt, pitfall, audit modes) and `retrospective` (environment improvements → project-context record). **Keep** the four deletion grounds and the "prefer a check over a line" rule.

#### BM-82 · End-to-end test generation protocol
- **Stage:** TE
- **Source:** `method/bmad-qa-generate-e2e-tests/workflow.md`
- **What:** Tests only; product code touched only for test hooks such as a test id, and listed. Phase 1: find the feature (request → work items in review → branch diff → ask, offering features with no e2e coverage ranked by regression harm); list scenarios before touching the harness — from the spec's requirements and acceptance criteria and the plan's I/O matrix, else from code: main path plus failures a user can reach; each scenario one sentence a product person recognizes; mark ones already covered; HALT for confirmation. Phase 2: read how the project already tests end to end (runner, layout, naming, app start, seeding, auth, CI job); run the existing suite once first (a failing suite is a finding, not something to fix here); no harness → propose one and HALT before adding dependencies. Phase 3: one test per scenario, named for it; exercise via UI locators by role/label/text or the public API, never internals; assert visible outcomes; wait on conditions, never durations; each test creates and cleans its data, passes alone and in any order, fails for one reason; no new fixture layers or page-object hierarchies. Phase 4: run twice; test wrong → fix test; harness wrong → fix harness; **application wrong → keep the test, mark it as an expected failure with the bug as reason, report it; never weaken an assertion or change product code to pass**; flaky → find the cause, no retries. Report in chat (no summary file).
- **Prevents:** tests coupled to internals, sleep-based flakiness, assertions weakened to go green.
- **Target:** `test-strategy` E2E mode. **Keep** nearly whole; scenarios map to `AC-n`.

#### BM-83 · Guided human walkthrough
- **Stage:** TE/DP (human review)
- **Source:** `method/bmad-walkthrough/workflow.md`, `step-01..03`, `templates/log-template.md`
- **What:** The human reviews a target block by block; a block or the review is done only when the user says so. Block shapes: (1) **Intent** — pasted verbatim from the ticket or plan intent, else generated (≤300 tokens) with its source noted; (2) **Broad strokes** — what the change generally is and its 3–5 entry points, each one clickable reference and one clause ("If you find yourself listing a layer's files, stop"); (3) **Slices** — one concern per block (not per file), mechanism in 2–3 sentences then places; mass edits grouped by how they changed with 1–2 worked examples and a list of the rest; (4) **Periphery** — docs, build registration, small enablers. Two files: a narrative (human-facing, blocks with checkboxes, markdown links relative to the file) and an append-only log (for another LLM session: action, result with disposition fixed/accepted/deferred/open, evidence, open; ≤150 tokens per entry; real session id or "unavailable"). Moves the user may pick: second opinion (fresh subagent), formal review, test, drive (tell the user what to click), demo (exercise and show), draw (diagram only what the code does), wrap-up (guess the follow-through, ask before doing it). Suggest 1–3 moves per block; no status chatter; if the user rejects a block's shape, rewrite it and record the constraint for later blocks. Bookkeeping goes to a background subagent so the main session stays clean.
- **Prevents:** humans rubber-stamping large diffs; reviews ordered by file rather than by concern.
- **Target:** `shipping-and-handover` (optional guided walkthrough for the human reviewer). **Keep** the four block shapes and the user-owned "done" state.

#### BM-84 · Retrospective evidence inventory and missing-evidence rule
- **Stage:** DP
- **Source:** `method/bmad-retrospective/workflow.md`, `references/evidence-gathering.md`, `retro-document.md`; `scripts/git_evidence.py`
- **What:** Every finding carries a source reference (file, line, commit, log); "A claim you cannot point at … is not a finding. Drop it." Inputs: the epic spec (requirements and Done when), each item's description/verify/covers, story files, plans (frontmatter, frozen decisions, design and implementation notes, triage log, verification, change log, code-review blocks), diff ranges and commits per plan (from baselines; per-file added/deleted/net from non-merge commits, merges measured separately), run folders, previous retro, session logs (capture references now; they expire). **Missing evidence:** each analysis declares what it needs and records a narrowed scope when absent, so a reader "can always tell 'checked and clean' from 'never checked'". The retro document is created as a skeleton once the epic is fixed and filled per phase; a resumed run reconciles recorded state against current evidence (current evidence wins) and resumes at the first incomplete phase. Optional going-in concerns from the user direct attention but never become findings without a source. No time estimates anywhere.
- **Prevents:** retros built from memory; silent gaps presented as clean results.
- **Target:** `retrospective`. **Keep** the source-or-drop rule, the checked-vs-never-checked rule and the skeleton-as-state pattern.

#### BM-85 · Aggregate views across a multi-session change
- **Stage:** DP (and TE at Full route)
- **Source:** `method/bmad-retrospective/references/aggregate-views.md`
- **What:** Defects no single diff hunk shows: **architecture delta** (run a dependency tool before/after the range and diff graphs; new cross-cutting deps, layering violations, cycles); **duplication map** (same problem solved twice across tasks); **god-class / size growth** (rank by net churn, then open the files and judge real size — churn is a candidate, not a verdict); **pattern divergence** (naming, error handling, test structure, boundaries vs the surrounding codebase — "Agents learn conventions by pattern-matching the code, so divergence compounds"); **spec-to-implementation reconciliation** (dropped requirements, unspecified behavior, reinterpreted intent; each a defect, accepted deviation, or spec to reconcile). Deterministic scripts first; delegated views return evidence and checked scope, never verdicts. Plus a diff-scope review of the whole range weighting boundaries between tasks "where no single session ever saw both sides", and a behavior check (exercise changed flows end to end; "Passing tests do not substitute for running the system").
- **Prevents:** drift and duplication accumulating invisibly across agent sessions.
- **Target:** `retrospective` and `multi-axis-code-review` (Full-route integration review across tasks). **Keep** all five views and the task-seam weighting.

#### BM-86 · Two dispositions per finding, proposed-not-applied actions, follow-through
- **Stage:** DP → PL
- **Source:** `method/bmad-retrospective/references/acceptance-verdict.md` ("Route each finding", "Action items")
- **What:** Each finding gets (a) what to do about this instance: fix now / defer (with enough context to act later) / accept as-is (recorded so later retros stop re-flagging it); and (b) what would prevent the next one: spec wording, story sizing, a missing convention or gate, or nothing. Findings from subagents or discussion are unverified reports: re-check against the primary source before an action item relies on one. Action items are specific and owned; remediation and spec reconciliation are proposed, never applied; uncertain interpretations are never written into a spec automatically. The retro writes only its own document and approved decision records; it changes no status and edits no spec or plan.
- **Prevents:** retros that fix symptoms but never the process; retros that silently rewrite the spec.
- **Target:** `retrospective` → `project-context` (prevention items become CONSTRAINTS/AGENTS pitfalls or checks). **Keep** the dual disposition; it is the mechanism for "environment improvements" in plan §5.18.
- **Also (previous-retro follow-through):** for every action item in the previous retro, record its text and owner and whether it landed, with the source that shows it (commit, file:line, test); an unpointable item is "no evidence found", not "not done"; a missing previous retro is recorded distinctly from "no outstanding items".

#### BM-87 · Acceptance verdict with fail-safe rules
- **Stage:** DP (closes the V)
- **Source:** `method/bmad-retrospective/references/acceptance-verdict.md` ("The verdict"), `retro-document.md` (frontmatter)
- **What:** Judge the final state against the epic's requirements and Done when (or profile criteria from diff and plans, marked **profiled** rather than declared), weighing behavior checks and unresolved findings. Verdicts: **accepted** (criteria demonstrably met, no blocking findings, no unfinished items), **accepted-with-open-items** (met, named findings deferred and tracked, all items finished), **rejected** (criteria not met, blocking finding unresolved, or any item unfinished). Hard rules (quote, `acceptance-verdict.md`):
  > "1. A human decision always overrides the machine verdict.
  > 2. An epic that fails its criteria with **no** human decision is recorded as **not accepted** — never as silently accepted.
  > 3. A non-empty `pending_tickets` list makes the machine verdict **rejected**, including in headless mode."

  If the completeness check could not run, do not render accepted or rejected from absent data. Frontmatter `epic, date, verdict, criteria: declared|profiled, headless` is the only machine-readable verdict; an orchestrator holds the next epic on it.
- **Prevents:** incomplete work closed as accepted; verdicts invented from missing data.
- **Target:** `retrospective` acceptance decision (accepted / accepted with follow-ups / rejected per plan §5.18). **Keep** the three hard rules and the declared-vs-profiled flag.

#### BM-88 · Two-spine UX contract and surface closure
- **Stage:** AN/DE
- **Source:** `method/bmad-ux/SKILL.md`, `references/validate.md`
- **What:** Elicit, never impose (no volunteered colors or patterns). Two peer documents: DESIGN.md (visual tokens in frontmatter + Brand & Style, Colors, Typography, Layout & Spacing, Elevation, Shapes, Components, Do's and Don'ts, order locked) and EXPERIENCE.md (Foundation/form factor, Information Architecture, Voice and Tone, Component Patterns, State Patterns, Interaction Primitives, Accessibility Floor, Key Flows with named protagonists and a climax beat), cross-referencing tokens by name; spines win over mocks. **Surface closure:** IA closes when every stated need has a surface that delivers it and every surface has a journey that lands there; when closure fails, probe, never invent. Rubric walker: flow coverage, token completeness (missing hex is critical), component coverage in both files, **state coverage** per surface (empty, cold-load, focus, error, offline, permission-denied), visual reference coverage, bloat, inheritance discipline (names verbatim from requirements), shape fit.
- **Prevents:** UI built without empty/error/offline states; requirements with no screen.
- **Target:** `spec-driven-development` (UI features: state coverage table per surface) and `test-strategy` (states → test cases). **Adapt** the state-coverage and surface-closure checks only; full UX spines are out of V-Method scope.

#### BM-89 · Skill evaluation methodology
- **Stage:** cross-cutting (repo quality, plan Wave 4)
- **Source:** `skills/toolsmith/bmad-eval/SKILL.md`, `references/eval-format.md`, `grader.md`, `self-improvement.md`; `core/bmad-advanced-elicitation/evals/cases.json`
- **What:** Four modes: **baseline** (skill vs bare model on the same input), **variant** (does a section earn its place vs a stripped version), **quality** (output vs rubric, LLM-as-judge), **trigger** (description fires on right queries, stays quiet on others). A case = input + rubric + optional `state_prefix` (a bracketed prime that places the skill mid-workflow so multi-turn behavior is testable single-shot) + fixture files. Each case runs in a clean room (temp folder, skill staged, no host config). Results settle only at ≥3 runs. Strong expectations: specific facts, structural bounds, negative assertions, frontmatter checks, bounded JSON blocks, side-artifact content, transcript tool-call patterns, phase ordering, read-only enforcement, bidirectional fidelity. Weak: filename-only, subjective, tautological. The grader also critiques the rubric (flags assertions a wrong output would pass). Bounded self-improvement loop: review → eval → one small fix → re-eval; revert regressions; hard round bound; human stays the judge.
- **Prevents:** shipping skills whose sections do nothing or whose descriptions never trigger.
- **Target:** repo practice (`skill-creator` evals for the 13 new skills, plan §7 validation). **Keep** baseline/variant/trigger and the strong-vs-weak taxonomy; example case `settled-plan` shows how to test that elicitation respects settled decisions.

#### BM-90 · Sign-off points and one owner per document
- **Stage:** cross-cutting (gates)
- **Source:** `help/working-in-an-organization.md`
- **What:** Each moment produces a written result an approval can attach to: concept verdict holds back the PRD; PRD validation holds back design and architecture; architecture review holds back per-epic requirements; breakdown approval accepts the plan and its dependencies; the retrospective verdict holds back the next epic. Each document has one owning skill and thus one owner; changes are applied to the owning document and later skills re-run. Never hand-edit a generated document.
- **Prevents:** approvals with nothing concrete attached; two documents both claiming to be the source.
- **Target:** router GATES.md (Gate 1 SPEC, Gate 2 PLAN, Gate 3 evidence, plus DP acceptance). **Keep** "every gate attaches to a written artifact" and "one owner per artifact".

#### BM-91 · Keep docs small, refactor regularly, keep plans as evidence
- **Stage:** DP/PL
- **Source:** `help/preparing-a-repo-for-agents.md`, `help/artifact-lifetime.md`, `help/existing-codebase.md`
- **What:** What makes a repo work for agents: consistency (agents copy patterns), a small verified AGENTS.md, good end-to-end tests, clean structure. Low-quality code: cleanup first, each refactor its own build change with tests first. Documentation holds only what code cannot explain (why, outside constraints, cross-component rules): one small ADR per decision, beside the code or in a decisions folder; AGENTS.md says ADRs exist and when to consult them without copying them. Refactor after several stories and at each epic end. Brownfield: no up-front documentation pass; first a small change; architecture only when a decision falls outside existing patterns (new boundary, migration strategy, new authorization rules) — "Size alone does not." Plans are live state and historical evidence: keep them; deleting plans turns completed work back into planned work; scope agents' reads to the active work in AGENTS.md; archive superseded planning docs only when references and sources stay accessible.
- **Prevents:** heavy stale documentation; agent-driven drift; losing the evidence trail.
- **Target:** `codebase-modernization`, `project-context`, `retrospective`, artifact conventions (`references/artifacts.md`). **Keep.**

---
