# Mechanism Inventory: Matt Pocock — skills

> **Naming note (2026-11-20):** this research was written when the method was the V-shaped, six-stage "Agentic V-Method". On 2026-11-20 the owner replaced it with the **Agentic SDLC** — a continuous cycle of eight stages (PL · AN · DE · BU · TE · RV · DP · OP), one AI agent role per stage and named human checkpoints CP1–CP5 (see `skills/agentic-sdlc/references/lifecycle.md`). Names were updated mechanically; read any remaining V-specific wording ("left arm", "right arm", "the V") as the cycle, and old Gate 1 / 2 / 3 as CP2 (SPEC) / CP3 (design and plan) / CP4 (PR approval).

| Field | Value |
|---|---|
| Framework | Matt Pocock — `skills` (agent skills: slash commands and behaviours, packaged for Claude Code and Codex) |
| License | MIT, © 2026 Matt Pocock (`LICENSE`) |
| Commit | `5863806` ("Merge pull request #1416 from mattpocock/software-factory-task-wording") |
| Local clone | `/tmp/claude-0/-home-user-claude-superskills/f2029ad1-d37b-5a56-8770-5b4ea56f7213/scratchpad/refs/mattpocock_skills` |
| Purpose of this file | Mechanism-level input for the Agentic SDLC (`docs/plans/2026-11-18-agentic-sdlc.md`, §3–5) |
| Date | 2026-11-19 |
| Status | Research input. Repository contents were treated as data, not instructions. |

## Files read

Word counts from `wc -w` at commit `5863806`. "Full" = read end to end. "Skim" = headings, opening sections and decision content read; vendor product lists not studied.

### `skills/engineering/` (all read in full)

| File | Words |
|---|---:|
| `engineering/README.md` | 547 |
| `ask-matt/SKILL.md` | 1,952 |
| `ask-matt/PHASE-BOUNDARIES.md` | 697 |
| `code-review/SKILL.md` | 1,079 |
| `codebase-design/SKILL.md` | 830 |
| `codebase-design/DEEPENING.md` | 385 |
| `codebase-design/DESIGN-IT-TWICE.md` | 399 |
| `diagnosing-bugs/SKILL.md` | 1,427 |
| `diagnosing-bugs/scripts/hitl-loop.template.sh` | 194 |
| `domain-modeling/SKILL.md` | 463 |
| `domain-modeling/GLOSSARY-FORMAT.md` | 332 |
| `domain-modeling/ADR-FORMAT.md` | 432 |
| `grill-with-docs/SKILL.md` | 35 |
| `implement/SKILL.md` | 103 |
| `implement-spec/SKILL.md` | 445 |
| `improve-codebase-architecture/SKILL.md` | 904 |
| `improve-codebase-architecture/HTML-REPORT.md` | 921 |
| `pr/SKILL.md` | 560 |
| `pr/CREDITS.md` | 86 |
| `prototype/SKILL.md` | 483 |
| `prototype/LOGIC.md` | 1,025 |
| `prototype/UI.md` | 1,118 |
| `research/SKILL.md` | 138 |
| `retro/SKILL.md` | 679 |
| `setup-matt-pocock-skills/SKILL.md` | 1,126 |
| `setup-matt-pocock-skills/domain.md` | 246 |
| `setup-matt-pocock-skills/issue-tracker-github.md` | 761 |
| `setup-matt-pocock-skills/issue-tracker-gitlab.md` | 609 |
| `setup-matt-pocock-skills/issue-tracker-local.md` | 265 |
| `setup-matt-pocock-skills/triage-labels.md` | 138 |
| `tdd/SKILL.md` | 570 |
| `tdd/tests.md` | 291 |
| `tdd/mocking.md` | 202 |
| `to-spec/SKILL.md` | 493 |
| `to-tickets/SKILL.md` | 915 |
| `triage/SKILL.md` | 990 |
| `triage/AGENT-BRIEF.md` | 1,232 |
| `triage/OUT-OF-SCOPE.md` | 711 |
| `wayfinder/SKILL.md` | 2,080 |
| `wizard/SKILL.md` | 669 |
| `wizard/template.sh` | 1,264 |
| 19 × `*/agents/openai.yaml` | 6–17 each |

### `skills/productivity/` (all read in full)

| File | Words |
|---|---:|
| `productivity/README.md` | 188 |
| `grill-me/SKILL.md` | 22 |
| `grilling/SKILL.md` | 329 |
| `handoff/SKILL.md` | 144 |
| `teach/SKILL.md` | 1,522 |
| `teach/GLOSSARY-FORMAT.md` | 343 |
| `teach/LEARNING-RECORD-FORMAT.md` | 416 |
| `teach/MISSION-FORMAT.md` | 253 |
| `teach/RESOURCES-FORMAT.md` | 281 |
| `to-questionnaire/SKILL.md` | 470 |
| `wait-what/SKILL.md` | 60 |
| `writing-for-agents/SKILL.md` | 1,775 |
| `writing-for-agents/SKILL-MECHANICS.md` | 414 |
| 7 × `*/agents/openai.yaml` | 13–17 each |

### `skills/in-progress/` and others

| File | Words | Depth |
|---|---:|---|
| `in-progress/README.md` | 249 | Full |
| `in-progress/software-factory/SKILL.md` | 946 | Full |
| `in-progress/software-factory/EXAMPLE-TASKS.md` | 690 | Full |
| `in-progress/software-factory/RUNNERS.md` | 1,288 | Skim (types table, "questions that decide the slot") |
| `in-progress/software-factory/TICKET-TRACKERS.md` | 1,221 | Skim |
| `in-progress/software-factory/GIT-HOSTS.md` | 1,110 | Skim |
| `in-progress/software-factory/OBSERVABILITY-PLATFORMS.md` | 1,122 | Skim (hooks, types 1–2) |
| `in-progress/claude-handoff/SKILL.md` | 222 | Full |
| `in-progress/loop-me/SKILL.md` | 415 | Full |
| `in-progress/chief-of-staff/SKILL.md` | 747 | Full |
| `in-progress/setup-ts-deep-modules/SKILL.md` | 1,103 | Full |
| `in-progress/setup-ts-deep-modules/dependency-cruiser.config.cjs` | 489 | Full |
| `in-progress/writing-beats`, `writing-fragments`, `writing-shape` `SKILL.md` | 852 / 595 / 1,024 | Skim (out of scope: prose writing) |
| `misc/git-guardrails-claude-code/SKILL.md` + `scripts/block-dangerous-git.sh` | 302 + 69 | Full script, skim skill |
| `misc/setup-pre-commit/SKILL.md` | 332 | Skim |
| Repository root `GLOSSARY.md`, `LICENSE` | — | Read (vocabulary, license check) |

**`agents/openai.yaml` (all 26 read):** each declares `interface.display_name` and `interface.short_description` for Codex. The user-invoked skills add `policy.allow_implicit_invocation: false`, the Codex counterpart of Claude Code's `disable-model-invocation: true`.

---

## 2. Mechanism catalog

Stage codes: **PL** Plan · **AN** Analyze · **DE** Design · **BU** Build · **TE** Test · **DP** Deploy · **X** cross-cutting. "Target" names a skill from plan §4. All adaptation notes assume the Agentic SDLC constraints: 8 platforms, no mandatory issue tracker, `AC-n` traceability, three human gates, and the repo's minimal frontmatter rule (only `name`, `description`, `license`).

### A. Routing, flow and context management

#### MP-01 — Router skill over a main flow with on-ramps
- **Stage:** X (router)
- **Source:** `engineering/ask-matt/SKILL.md`; `productivity/writing-for-agents/SKILL-MECHANICS.md` ("Router skills")
- **What it is:** One user-invoked skill names every other skill and when to reach for it. It organises them as: (1) a **main flow** (idea → ship: `grill-with-docs` → optional prototype detour → `to-spec` → `to-tickets` → `implement` or `implement-spec` → `tdd` + `code-review` inside → `pr` → `retro`); (2) **on-ramps**, starting situations that generate work and then merge onto the main flow (`triage` for incoming issues, `diagnosing-bugs` for something broken, `wayfinder` for a huge foggy effort); (3) **codebase health** (`improve-codebase-architecture`); (4) a **vocabulary layer** that runs underneath (`domain-modeling`, `codebase-design`); (5) **standalone** tools; (6) a **precondition** (`setup-matt-pocock-skills`). The main flow has two explicit branch questions: "can you settle every question in conversation?" (no → prototype detour) and "is this a multi-session build?" (yes → spec + tickets; no → implement in the same context). The router can only hint, not fire: user-invoked skills have no description, so nothing but the human can start them.
- **Failure prevented:** the human forgets which of many skills exists. Users also take the wrong path, for example triaging tickets that `to-tickets` already made agent-ready.
- **Target:** `agentic-sdlc`. Keep the main-flow/on-ramp/vocabulary-layer structure: it maps cleanly onto PL▸AN▸DE▸BU▸TE▸DP with on-ramps (bug → `systematic-debugging`, brownfield → `codebase-modernization` inventory, incoming request → SPEC intake). Change: the Agentic SDLC router *does* invoke stage skills where the platform allows, so drop the "hint only" limitation. Encode the two branch questions in the sizing step (Quick/Standard/Full).

#### MP-02 — "Read the skill before you describe it" rule
- **Stage:** X
- **Source:** `ask-matt/SKILL.md`
- **What it is:** Before the router states what a skill does or recommends skipping a step, it must read that skill's `SKILL.md`. The router's own summaries are "for orientation only".
- **Failure prevented:** the router drifts from the skills it describes, producing confident but stale advice about what a stage does or whether it can be skipped.
- **Target:** `agentic-sdlc` Critical Rules. Keep verbatim in spirit: "read the stage skill before claiming what it requires or advising a skip."

#### MP-03 — Phase-boundary decision tree (five options, ordered)
- **Stage:** X (router)
- **Source:** `ask-matt/PHASE-BOUNDARIES.md`, `ask-matt/SKILL.md` §Phase boundaries
- **What it is:** A **phase** is a chunk of work inside a session (grilling, implementation, QA) that ends when "ok, we're done with that". The decision belongs *only* at a boundary; mid-phase you either continue or split the remaining work into subagents (compacting mid-phase loses the thread). At a boundary, walk five questions top to bottom; the first "yes" wins:
  1. **Continue?** Yes if the next phase needs this one as a *primary source* (grilling → implementation is the standard yes) or there is enough smart zone left (~150k tokens). Rule this out first because it costs nothing.
  2. **Clear?** Yes if everything in context is disposable. Cheapest move, and not terminal (the old session remains resumable). The cost of error is one-way: clearing a relevant context loses the *why*.
  3. **Hand off?** Only for a **new harness**, a **new directory/repo**, a **colleague**, or forking a side task found **mid-phase**. "That list is the whole clause." It buys portability.
  4. **AFK subagent?** If the task is tight enough to run unattended (automated review is the standard case).
  5. **Compact** (the default, but the last option, not the first reach). Pass an instruction ("we're going to QA this area") so the summary keeps what matters.
  Underneath sits a **primary vs secondary source** table: Continue keeps full information with lots of noise and little room; compact/handoff are lossy with less noise and lots of room. "These are judgement calls": the value is asking in order, at the boundary.
- **Failure prevented:** a fresh session that is "confidently wrong about a decision the summary flattened"; context rot from pushing past the smart zone; needless handoff files.
- **Target:** `agentic-sdlc` → `references/phase-boundaries.md` (already named in plan §5.1). Keep the ordered tree and the primary/secondary trade. Change: rename the harness commands generically ("clear context / start new session", "summarise and continue") because `/clear` and `/compact` are Claude Code commands. Map Agentic SDLC stage transitions to defaults: AN→DE usually Continue; DE→BU (CP3) usually clear or subagent per task; BU→TE always a separate context for review (Rule 5).

#### MP-04 — Smart zone and the one-window rule for left-arm work
- **Stage:** PL/AN/DE
- **Source:** `ask-matt/SKILL.md` §Context hygiene
- **What it is:** The **smart zone** is the window (~150k tokens on current models) within which the model still reasons sharply. Steps 1–3 of the main flow (grill → spec → tickets) stay in **one unbroken context window**; don't compact or clear until after tickets exist, so all three build on the same thinking. Each `/implement` then starts fresh from its ticket. Run `retro` *in* the session it reviews, before clearing; afterwards, point it at that session's log. If the window approaches the smart-zone limit before tickets exist, compact at the nearest phase boundary rather than pushing on degraded.
- **Failure prevented:** the SPEC and PLAN lose the reasoning from the interview; or work continues in a degraded window.
- **Target:** `agentic-sdlc` (route guidance) and `writing-plans`. Keep: "AN → DE in one context where possible; BU tasks start fresh from the task file." Express the token figure as approximate and model-dependent.

#### MP-05 — Handoff document
- **Stage:** X (router; DP handover)
- **Source:** `productivity/handoff/SKILL.md`; `in-progress/claude-handoff/SKILL.md`
- **What it is:** Writes a summary of the conversation so a fresh agent can continue. Rules: save to the **OS temp directory** (`$TMPDIR`, else `/tmp`; `%TEMP%` on Windows), not the workspace. Include a **"suggested skills"** section naming which skills the next agent should load. **Do not duplicate** what already lives in other artifacts (specs, plans, ADRs, issues, commits, diffs): reference them by path or URL. **Redact** secrets and PII. Optional argument = what the next session is for; tailor the document to it. `claude-handoff` (beta) also launches a background agent seeded with the file (`claude --bg --name "<name>" -- "$(cat file)"`; passing the file avoids shell expansion of backticks and `$`).
- **Failure prevented:** a new session restarts discovery from zero; handoff files duplicate and contradict canonical artifacts; secrets leak into prompts.
- **Target:** `agentic-sdlc` (handoff protocol). Keep the four rules. Change: the Agentic SDLC keeps state in `docs/agentic-sdlc/<feature>/` artifacts, so the handoff is mostly a pointer list plus "current stage, next gate, open decisions". Drop `claude --bg` (Claude Code only); mention it as an optional platform-specific accelerator.

#### MP-06 — Wait-what re-pitch
- **Stage:** X
- **Source:** `productivity/wait-what/SKILL.md`
- **What it is:** A one-line user-invoked corrective: when a message did not land, the agent re-pitches it with the missing context, in **ASD-STE100 Simplified Technical English**, using the vocabulary in `GLOSSARY.md` (following `GLOSSARY-MAP.md` in multi-context repos). The router frames the upfront cure as a shared language agreed early (`grill-with-docs`).
- **Failure prevented:** the human approves a gate or decision they did not understand because the agent used jargon.
- **Target:** `agentic-sdlc` Critical Rules (gate presentation): "present every gate decision in plain, simplified English using GLOSSARY terms." No separate skill.

### B. Repository setup and project context

#### MP-07 — Explore → present → confirm → write setup
- **Stage:** PL
- **Source:** `engineering/setup-matt-pocock-skills/SKILL.md`
- **What it is:** A prompt-driven (not scripted) per-repo setup, run once. **Explore:** `git remote -v` / `.git/config` (GitHub? GitLab?), existing `AGENTS.md`/`CLAUDE.md` and any `## Agent skills` section, `GLOSSARY.md`/`GLOSSARY-MAP.md` (and legacy `CONTEXT.md`, offering `git mv`), `docs/adr/`, `src/*/docs/adr/`, `docs/agents/`, `.scratch/`, whether the `triage` skill is installed, monorepo signals (`pnpm-workspace.yaml`, `workspaces`, populated `packages/*`). **Present:** summarise present/missing, then go section by section, "one section, one answer". Lead each with the recommended answer so the user accepts in a word; explain only where the choice truly branches; **skip a section** when exploration settled it. **Confirm:** show drafts of every file; let the user edit. **Write.** **Done:** say which skills now read these files and that `docs/agents/*.md` can be edited by hand.
- **Failure prevented:** cold questioning about facts the repo already shows; config written without user review; redundant questions.
- **Target:** `project-context` (setup mode). Keep the four-phase shape, "recommended answer first", and "skip sections exploration settled". Change: sections become build/test/lint commands, conventions, CONSTRAINTS, glossary layout, optional tracker.

#### MP-08 — Single instruction-file selection and in-place block
- **Stage:** PL
- **Source:** `setup-matt-pocock-skills/SKILL.md` §4; `in-progress/setup-ts-deep-modules/SKILL.md` §7
- **What it is:** If `CLAUDE.md` exists, edit it; else if `AGENTS.md` exists, edit it; if neither exists, *ask* which to create. Never create one when the other exists. If the managed block (`## Agent skills`) already exists, update it **in place**, never append a duplicate, and don't touch the user's surrounding sections. The block is a list of one-line summaries, each with a **pointer** to a detail doc under `docs/agents/` (`issue-tracker.md`, `triage-labels.md`, `domain.md`). The block for `setup-ts-deep-modules` is a single pointer line ("Packages are deep modules: see ... before adding or importing one").
- **Failure prevented:** duplicated or conflicting instruction files; clobbered user content; bloated always-loaded context.
- **Target:** `project-context`. Keep the selection rule and pointer-only block. The plan's `<!-- AGENTIC-SDLC:BEGIN/END -->` markers are a stronger form of "update in place"; combine both. Keep detail in `docs/agentic-sdlc/` or `CONSTRAINTS.md`, and leave only one-line pointers in the always-loaded file (see MP-12, MP-15).

#### MP-09 — Tracker indirection document ("publish to the issue tracker")
- **Stage:** X (AN/DE/BU)
- **Source:** `setup-matt-pocock-skills/issue-tracker-{github,gitlab,local}.md`, `triage-labels.md`; every skill that says "The issue tracker should have been provided to you"
- **What it is:** Skills never hard-code a tracker. They use abstract verbs ("publish to the issue tracker", "fetch the relevant ticket", "resolve each ticket the way the issue tracker closes work") and a per-repo doc translates each verb. **GitHub:** `gh issue create/view/list/comment/edit/close`, sub-issues (`--parent`, `--add-sub-issue`, or REST fallback), **native blocking** (`--blocked-by`, `--add-blocked-by`, REST with the database id, not `#number`), open-blocker count via `issue_dependencies_summary.blocked_by`, comment *then* close (because `close --comment` on a closed issue silently drops the comment), and a fork safety check (`gh repo view --json nameWithOwner` before the first create). **GitLab:** `glab` equivalents, `/blocked_by` quick action (Premium) with a `Blocked by:` line fallback. **Local markdown:** `.scratch/<feature>/spec.md`, `.scratch/<feature>/issues/<NN>-<slug>.md` (one file per ticket, from `01`), a `Status:` line, a `## Comments` section appended at the bottom. Labels are canonical **roles** mapped to real strings in a table.
- **Failure prevented:** skills break on any repo that does not use GitHub; duplicate labels; comments lost on close; filing issues into the upstream repo from a fork.
- **Target:** `writing-plans`, `spec-driven-development`, `project-context`. Keep the indirection pattern. Make **local markdown the default** (Agentic SDLC has no mandatory tracker) and treat GitHub/GitLab/Jira as optional *export* adapters described in a reference file. Keep the "comment then close" and fork-target checks in the GitHub adapter notes.

#### MP-10 — Domain-docs consumer rules
- **Stage:** X
- **Source:** `setup-matt-pocock-skills/domain.md`; repeated in `tdd`, `diagnosing-bugs`, `to-spec`, `to-tickets`, `triage`, `improve-codebase-architecture`
- **What it is:** Before exploring, read `GLOSSARY.md` (or `GLOSSARY-MAP.md` → each relevant context glossary) and the ADRs touching the area (including `src/<context>/docs/adr/`). If they don't exist, **proceed silently**: don't flag absence or suggest creating them upfront. Use the glossary's terms in every output (issue titles, refactor proposals, hypotheses, test names). A needed concept missing from the glossary is a signal: either invented language (reconsider) or a real gap (note it for domain-modeling). If output contradicts an ADR, surface it explicitly: *"Contradicts ADR-0007 (...), but worth reopening because…"*.
- **Failure prevented:** vocabulary drift between docs, code and tests; silent override of recorded decisions; nagging users to create docs.
- **Target:** shared rule in every Agentic SDLC skill (put once in `agentic-sdlc/references/rules.md` and point to it). Keep "proceed silently" and the ADR-conflict phrasing.

#### MP-11 — Lazy artifact creation
- **Stage:** X
- **Source:** `domain-modeling/SKILL.md`, `ADR-FORMAT.md`, `GLOSSARY-FORMAT.md`, `teach/LEARNING-RECORD-FORMAT.md`
- **What it is:** Create `GLOSSARY.md` when the first term is resolved and `docs/adr/` when the first ADR is needed, never upfront.
- **Failure prevented:** empty scaffolding that rots and adds noise.
- **Target:** all Agentic SDLC artifact rules (`references/artifacts.md`). Keep. Apply to `docs/agentic-sdlc/<feature>/`: create each file when its stage produces content (for example no VERIFICATION.md before TE).

### C. Writing documents for agents (skill-authoring mechanics)

#### MP-12 — Context pointers and pointer-writing rules
- **Stage:** X (authoring)
- **Source:** `productivity/writing-for-agents/SKILL.md`
- **What it is:** A **context pointer** is a reference held in context that names out-of-context material and encodes the condition for reaching it (a skill description, an `AGENTS.md` line naming a doc). The *wording* decides when and how reliably the agent reaches it, so a must-have target behind a weak pointer is a variance bug: sharpen the wording first, inline only if that fails. A pointer states what the material is and lists the **branches** that should trigger it. Rules: **front-load the leading word**; **one trigger per branch** (synonyms for one branch collapse); **cut identity the body already carries**. Two budgets: **context load** (always-loaded tokens) vs **cognitive load** (the human as index, which is the price of human agency, not something to minimise blindly).
- **Failure prevented:** skills that never trigger or trigger erratically; bloated descriptions.
- **Target:** all 18 Agentic SDLC skill descriptions (repo rule: single-line "This skill should be used when…"). Use: list distinct branches (for example "spec, acceptance criteria, requirements" as *one* branch) and front-load the stage keyword.

#### MP-13 — Information hierarchy, progressive disclosure, co-location, sprawl
- **Stage:** X (authoring)
- **Source:** `writing-for-agents/SKILL.md`
- **What it is:** Content is **steps** (ordered actions) or **reference** (consulted on demand). The ladder runs: (1) in-file step, (2) in-file reference, (3) disclosed reference behind a pointer (sibling file or external). **Progressive disclosure** moves material down the ladder to protect the hierarchy. It is not primarily a token saving. Branching is the test: inline what every branch needs; disclose what only some branches reach. **Co-location:** keep a concept's definition, rules and caveats under one heading. **Sprawl:** a document too long even when every line is live; cure by disclosure and splitting by branch or sequence.
- **Failure prevented:** buried steps (attention becomes a "coin flip"); scattered rules.
- **Target:** all Agentic SDLC skills; matches the repo's 1500–2000-word guidance with `references/`. Use the branching test to decide what goes into `references/` (for example `systematic-debugging/references/loop-construction.md`, `test-strategy/references/non-functional.md`).

#### MP-14 — Completion criteria (clarity + demand) and split-by-sequence
- **Stage:** X (authoring); directly relevant to gates
- **Source:** `writing-for-agents/SKILL.md` §Steps and completion criteria, §When to split
- **What it is:** Every step ends on a **completion criterion**. **Clarity:** can the agent tell done from not done? Vague bounds invite **premature completion**, pulled by visible **post-completion steps**. Defence order: sharpen the bound first; only if it is irreducibly fuzzy *and* rushing is observed, hide later steps by splitting across a **real context boundary** (handoff or subagent: an inline call clears nothing). **Demand:** how much the criterion requires ("every modified model accounted for" vs "produce a change list") drives legwork. The strongest criteria are "checkable and exhaustive". Merging sequences exposes later steps and invites rushing.
- **Failure prevented:** agents declaring stages done early because the next stage is visible.
- **Target:** every Agentic SDLC step and every gate. Give each step a "**Done when:**" line (Matt uses this format in `wizard`, `setup-ts-deep-modules`, `to-questionnaire`). Gate criteria should be exhaustive: "every AC-n has evidence", "every task maps to ≥1 AC-n". This also justifies splitting BU from TE across a context boundary.

#### MP-15 — Leading words and the negation failure mode
- **Stage:** X (authoring)
- **Source:** `writing-for-agents/SKILL.md` §Leading words
- **What it is:** A **leading word** is a compact concept already in pretraining (*lesson*, *fog of war*, *tracer bullets*). Repeated as a *token*, not a sentence, it builds a distributed definition and anchors behaviour cheaply. It works twice: in execution (same behaviour each time the word appears) and in invocation (shared language across prompts, docs and code). Refactor triads into one word ("fast, deterministic, low-overhead" → *tight*; "a loop you believe in" → *red*). Prefer existing words over coined ones, since coined words recruit no priors. **Negation** steers badly ("don't think of an elephant"): state the positive target; use a prohibition only as a hard guardrail and pair it with the positive.
- **Failure prevented:** verbose, low-salience instructions; prohibitions that prime the banned behaviour.
- **Target:** all Agentic SDLC skills. Candidate leading words: *tight red loop*, *tracer bullet*, *frontier*, *seam*, *gate*, *evidence*, *one-way door*. Review Critical Rules (often written as NEVER lists) and pair each with the positive behaviour. Note the tension with the repo convention of NEVER/ALWAYS rules.

#### MP-16 — Pruning: single source of truth, environment-as-cache, sediment, no-ops
- **Stage:** X; also `project-context` audit mode and `retrospective`
- **Source:** `writing-for-agents/SKILL.md` §Pruning; `retro/SKILL.md` (No-ops, Global AGENTS.md categories)
- **What it is:** Each meaning lives in one place. **Duplication** inflates prominence and costs maintenance. The **environment** (scripts, config, layout, `--help`) is a source of truth, so restating it is a **cache**, worth it only when lookup is expensive. Cache only what the agent cannot find by looking: unwritten conventions, reasons, gotchas. **Relevance** test per line. **Sediment:** stale layers that pile up because adding feels safe and removing feels risky. **No-op** test: does the sentence change behaviour vs the model default? This is model-relative, so settle it by running, not debating. Delete the whole failing sentence; fix weak words with stronger ones (*thorough* → *relentless*).
- **Failure prevented:** AGENTS.md bloat; stale command lists; instructions that do nothing.
- **Target:** `project-context` (setup: don't restate `package.json` scripts the agent can read; audit: detect sediment/no-ops/drift) and `retrospective`. Keep the cache principle: the Agentic SDLC block should hold commands only when discovery is expensive or non-obvious.

#### MP-17 — Invocation choice (user-invoked vs model-invoked) and shared reference
- **Stage:** X (packaging)
- **Source:** `writing-for-agents/SKILL-MECHANICS.md`; both READMEs; `agents/openai.yaml`
- **What it is:** **Model-invoked** skills keep a model-facing description (permanent context load, but discoverable by the agent and by other skills). An all-reference model-invoked skill is a home for **shared reference** that several skills call (`codebase-design`, `domain-modeling`, `grilling`). **User-invoked** skills (`disable-model-invocation: true`; Codex `allow_implicit_invocation: false`) cost zero context but rely on the human to remember them; their description becomes a human one-liner. Two user-invoked skills cannot share reference via each other, so put it in a plain external file. Split off a model-invoked skill only for a distinct trigger word you actually use, or when another skill must reach it.
- **Failure prevented:** context bloat from rarely used skills; unreachable shared vocabulary.
- **Target:** Agentic SDLC packaging. **Constraint:** this repo forbids extra frontmatter fields (`disable-model-invocation` would violate the CLAUDE.md rule), so all Agentic SDLC skills are model-invoked. Adopt the *shared-reference skill* idea instead: deep-module vocabulary lives once (in `test-driven-development/references/` or `senior-solution-architect/references/`), and other skills point to it. Strict explicit-trigger descriptions (as `grill-me` already has) approximate user invocation.

### D. Interview and decision capture (PL/AN)

#### MP-18 — Grilling: design tree, rounds, frontier, recommended answers
- **Stage:** AN (also PL)
- **Source:** `productivity/grilling/SKILL.md`
- **What it is:** Map the topic as a **design tree** (each decision branches into dependent decisions). Work in **rounds**. The **frontier** = every decision whose prerequisites are already settled. Ask the *whole frontier* in one round. Number each question and give a recommended answer, worded so "yes" accepts it. Format per question: `❓ **Q1** - **<title>**: <body, may include multiple choices>` then `➡️ <recommended answer>`, separated by `---`. Wait for answers, recompute the frontier, ask the next round. A question that depends on another question still open in the same round belongs to a later round.
- **Failure prevented:** one-question-at-a-time interviews that take forever; questions whose answers depend on unanswered questions; unanchored questions that make the user design from scratch.
- **Target:** `grill-me` (upgrade). Keep the frontier-round mechanic, numbering, recommended answers, "yes accepts". Note it differs from Superpowers' "one question at a time" (used by `brainstorming`); keep both: `brainstorming` single-question for divergent ideation, `grill-me` frontier rounds for convergence. Add "show the frontier" (plan §5.4 already asks for it).

#### MP-19 — Facts are the agent's job; decisions are the user's
- **Stage:** AN, X
- **Source:** `grilling/SKILL.md`; restated in `ask-matt` ("facts are the agent's job and decisions are yours")
- **What it is:** When a frontier question needs a fact from the environment (filesystem, tools), dispatch a **fresh-context subagent** to find it. Never ask the user for something lookup-able. Don't block: a running exploration is an unsettled prerequisite, so only its downstream questions wait; ask the rest of the frontier now. Decisions go to the user, and the agent waits.
- **Failure prevented:** wasting human attention on discoverable facts; the agent silently making decisions; the interview stalling on a slow lookup.
- **Target:** `grill-me`, `spec-driven-development`, and Agentic SDLC Rule 3 (human-accountable). Keep exactly. This is the operational definition of Rule 3. Without subagents, the agent looks up inline before asking.

#### MP-20 — Done when the frontier is empty and understanding is confirmed
- **Stage:** AN (pre-CP2)
- **Source:** `grilling/SKILL.md`
- **What it is:** The session ends when the frontier is empty (every branch visited, "nothing left silently assumed"). Do not act until the user confirms shared understanding.
- **Failure prevented:** acting on half-resolved designs; silent assumptions.
- **Target:** `grill-me` completion criterion; feeds CP2 readiness in `spec-driven-development` ("Open questions" must be empty or explicitly deferred).

#### MP-21 — grill-with-docs composition (stateful interview)
- **Stage:** AN
- **Source:** `engineering/grill-with-docs/SKILL.md` (35 words: "Call the Skill tool twice, for 'grilling' and 'domain-modeling'"); `ask-matt` (choose it whenever a working directory exists)
- **What it is:** A wrapper that composes the interview primitive with the domain-modeling discipline, so resolved terms go into `GLOSSARY.md` and hard-to-reverse decisions into ADRs during the interview. `grill-me` is the stateless version for when no repo exists. The router says: if a working directory exists, `grill-with-docs` is "strictly the better one".
- **Failure prevented:** interview results living only in chat; vocabulary not captured.
- **Target:** `grill-me` **docs mode** (plan §5.4). Change: one skill with two modes chosen by "is there a repo?" rather than two skills; "Call the Skill tool" is Claude Code wording, so in portable form, inline or point to the domain-modeling rules as `references/`.

#### MP-22 — Domain-modeling active moves
- **Stage:** AN
- **Source:** `engineering/domain-modeling/SKILL.md`
- **What it is:** The *active* discipline (merely reading `GLOSSARY.md` is not it). Five moves during a session: (1) **Challenge against the glossary**: "Your glossary defines 'cancellation' as X, but you seem to mean Y. Which is it?" (2) **Sharpen fuzzy language**: "You're saying 'account': do you mean the Customer or the User?" (3) **Discuss concrete scenarios**: invent edge-case scenarios that force precision at concept boundaries. (4) **Cross-reference with code**: "Your code cancels entire Orders, but you just said partial cancellation is possible. Which is right?" (5) **Update GLOSSARY.md inline**, immediately, without batching. `GLOSSARY.md` must contain no implementation detail; it is "a glossary and nothing else", not a spec or scratch pad. ADRs offered sparingly (MP-24).
- **Failure prevented:** overloaded terms ("account" doing three jobs) reaching the SPEC and code; docs and code disagreeing silently.
- **Target:** `grill-me` docs mode and `project-context` glossary mode. Keep all five moves. Cross-referencing with code is especially valuable in `codebase-modernization` inventory mode.

#### MP-23 — GLOSSARY.md format and multi-context map
- **Stage:** AN / PL
- **Source:** `domain-modeling/GLOSSARY-FORMAT.md`; `teach/GLOSSARY-FORMAT.md`; repo-root `GLOSSARY.md` (in use)
- **What it is:** `# {Context Name}` + 1–2 sentence description + `## Language` with entries `**Term**:` / one- or two-sentence definition of what it IS / `_Avoid_: synonym, synonym`. Rules: be opinionated (pick one term, list the rest under `_Avoid_`); keep definitions tight; only project-specific concepts (no generic programming terms); group under subheadings when clusters emerge. Optional `## Relationships` and `## Flagged ambiguities` (used in the repo's own root glossary: "'backlog' was previously used to mean both... Resolved: ..."). The teach variant adds: use glossary terms inside other definitions, flag field-wide ambiguities, revise in place. **Multi-context:** `GLOSSARY-MAP.md` lists contexts with links plus a **Relationships** section (for example "Ordering → Fulfillment: Ordering emits `OrderPlaced` events"). Inference: map exists → multi; only root glossary → single; neither → create root lazily.
- **Failure prevented:** synonyms proliferating across docs, tests and code; glossary turning into a design doc.
- **Target:** `project-context` (glossary mode) and `grill-me` docs mode; `GLOSSARY.md` is already in plan §3.5. Adopt the format as-is, including `_Avoid_` and Flagged ambiguities.

#### MP-24 — ADR three-condition test and minimal ADR format
- **Stage:** DE (also AN)
- **Source:** `domain-modeling/ADR-FORMAT.md`, `domain-modeling/SKILL.md`
- **What it is:** Offer an ADR only when **all three** hold: (1) **hard to reverse**, (2) **surprising without context**, (3) **the result of a real trade-off**. Format: `docs/adr/NNNN-slug.md`, sequential (scan for the highest number, +1), created lazily. Minimum content: `# {Short title}` + 1–3 sentences (context, decision, why). "An ADR can be a single paragraph." Optional only when valuable: `Status` frontmatter (`proposed | accepted | deprecated | superseded by ADR-NNNN`), Considered Options, Consequences. **What qualifies:** architectural shape; integration patterns between contexts; technology choices with lock-in ("would take a quarter to swap"); boundary/scope decisions (explicit no's); deliberate deviations from the obvious path; constraints invisible in code (compliance, latency contracts); non-obvious rejected alternatives. Multi-context repos have system-wide `docs/adr/` plus per-context `src/<ctx>/docs/adr/`.
- **Failure prevented:** ADR inflation (records nobody reads) or the opposite (deliberate decisions "fixed" by the next engineer).
- **Target:** `senior-solution-architect` (align ADR location, plan §5.6) and `grill-me` docs mode. Keep the three-condition gate and minimal template as the default; the architect's richer template becomes the optional sections. Add an `AC-n`/SPEC link line when an ADR derives from a SPEC requirement.

#### MP-25 — To-questionnaire: grill the send, not the subject
- **Stage:** AN (stakeholder input), PL
- **Source:** `productivity/to-questionnaire/SKILL.md`
- **What it is:** When a blocking decision needs someone else's knowledge, interview the user only about the **send** (which they can always answer): (1) recipient role/expertise/relationship (one exchange), (2) what decisions or facts they need back (one exchange). Then write `to-questionnaire-<slug>.md` in the current directory. Template: title; **Purpose** (decision riding on it); **From/To/How your answers will be used**; **Context** (one paragraph); **How to answer** (deadline, effort, "I don't know" is useful); themed `##` sections with `###` one-idea questions (never compound), most important first, an answer stub (`>`) under each, and *Why this matters* only where misreadable; **Anything else?** catch-all. Done when every item from step 2 has a question.
- **Failure prevented:** compound, context-free questions sent to stakeholders; asking the user things only a third party knows.
- **Target:** `spec-driven-development` (Open questions → stakeholder questionnaire) and `grill-me`. Keep the template; write into `docs/agentic-sdlc/<feature>/` rather than cwd. Useful for consulting contexts where the client holds domain knowledge.

#### MP-26 — Research as a background agent against primary sources
- **Stage:** PL/AN
- **Source:** `engineering/research/SKILL.md`; wayfinder research tickets
- **What it is:** Spin up a background agent with fresh context. It investigates against **primary sources** (official docs, source code, specs, first-party APIs), following every claim back to its owner, and writes **one Markdown file citing each claim**, saved where the repo keeps such notes (matching convention; if none, somewhere sensible and say where). The user keeps working. The output feeds the interview; it does not replace it. Wayfinder variant: research lands on a throwaway `research/<name>` branch, pushed but never merged, with a pointer from the ticket.
- **Failure prevented:** parametric guesses about APIs; blocked humans waiting on reading.
- **Target:** `spec-driven-development` / `senior-solution-architect` (delegate fact-finding); this repo's existing `deep-research` covers the heavy version. Keep "primary sources + per-claim citation + saved file". Drop the branch trick (repo pollution vs portability).

### E. Prototyping (PL)

#### MP-27 — Prototype branch selection: logic vs UI
- **Stage:** PL (detour from AN)
- **Source:** `engineering/prototype/SKILL.md`; `ask-matt` main-flow step 2
- **What it is:** A prototype is "throwaway code that answers a question", and the question decides the shape. "Does this logic/state model feel right?" → logic branch; "What should this look like?" → UI branch. If ambiguous and the user is unreachable, default by surrounding code (backend module → logic; page/component → UI) and state the assumption at the top. Shared rules: (1) throwaway and clearly named as a prototype, located near where it will be used, following existing routing conventions; (2) trivial to run (one command, or a double-clickable HTML); (3) no persistence by default (if the question is about persistence, use a scratch DB named "PROTOTYPE, wipe me"); (4) skip polish: no tests, minimal error handling, no abstractions; (5) surface the full relevant state after every action or variant switch; (6) capture when done (MP-30). In the main flow the detour is bridged by handoff in both directions: hand off out, prototype in a fresh session, hand back what was learned and reference it from the original thread.
- **Failure prevented:** settling runnable questions on paper; building the wrong kind of prototype.
- **Target:** `brainstorming` ("prototype detour", plan §5.3). Keep the two-branch selection and six rules. The handoff bridge is optional (same session is fine when the prototype is small).

#### MP-28 — Logic prototype: single shareable HTML over a pure module
- **Stage:** PL
- **Source:** `prototype/LOGIC.md`
- **What it is:** Process: (1) **state the question** in one visible paragraph at the top of the demo; (2) isolate logic in one `<script>` as a **pure, liftable module**: a reducer `(state, action) => state`, an explicit state machine (when legality of actions is part of the question), pure functions over a data type, or a class with a clear method surface. No DOM inside it; the page calls in, nothing flows back. (3) Build one self-contained HTML file (no framework, bundler or server; opens by double-click; survives email) written for **non-developers in domain language**. Layout: title + one-line explanation; **current state** panel (labelled fields, not raw JSON, highlighting what changed); **free-play buttons** (one per action); **guided walkthroughs** as tabs, each a scenario description plus ordered step buttons, resetting to a known initial state. Scenarios: happy path, tricky edge case, an attempt at something illegal. Restrained styling. (4) Hand over; the valuable moments are "wait, that shouldn't be possible". (5) Capture. Anti-patterns: tests, real DB, generalising, logic blurred with page, frameworks, shipping the shell.
- **Failure prevented:** state models that look fine on paper but break on real sequences; domain experts excluded from validation.
- **Target:** `brainstorming` (prototype detour, logic branch) and potentially `spec-driven-development` (walkthrough scenarios become Given/When/Then AC-n candidates). Strong adoption candidate; it is platform-neutral.

#### MP-29 — UI prototype: radically different variants behind a switcher
- **Stage:** PL
- **Source:** `prototype/UI.md`
- **What it is:** Default **3 variants**, cap 5. **Sub-shape A (preferred):** render variants on an *existing* route gated by `?variant=`, keeping real data fetching, auth and surrounding chrome ("an empty route hides design problems"). **Sub-shape B (last resort):** a throwaway route following project routing conventions with "prototype" in its path. Variants must be **structurally different** (layout, information hierarchy, primary affordance), not colour tweaks; if two come out similar, redo one with explicit guidance ("do not use a card grid"). A single switcher component; a **floating bottom bar** with ←/label/→, wrap-around, URL updates via the framework router (shareable, reload-stable), ←/→ keys (ignored when an input, textarea or contenteditable has focus), visually distinct, and **hidden in production** (`NODE_ENV !== 'production'`). Typical feedback: "header from B with sidebar from C". Capture: fold the winner (rewritten properly) into main; losers and switcher go to the throwaway branch. Anti-patterns: colour-only variants, shared `<Layout>`, real mutations, promoting prototype code directly.
- **Failure prevented:** choosing between vague mental mockups; evaluating designs in a vacuum; prototype UI leaking to production.
- **Target:** `brainstorming` (UI branch). Keep; it is framework-agnostic pseudo-code.

#### MP-30 — Prototype capture: decision into main, prototype kept as primary source
- **Stage:** PL → AN
- **Source:** `prototype/SKILL.md` rule 6, `LOGIC.md` §5, `UI.md` §6; `to-spec` and `to-tickets` "prototype snippet exception"
- **What it is:** Fold the validated decision into the real code or spec. Commit the prototype itself to a throwaway branch (`prototype/<name>`, out of main) and leave a **context pointer** to it on the implementation issue. Record the verdict and the question it settled. Main keeps only the decision. Specs and tickets normally contain no code, *except* a prototype snippet that encodes a decision more precisely than prose (state machine, reducer, schema, type shape), trimmed to the decision-rich parts and marked as from a prototype.
- **Failure prevented:** prototype code rotting in main; lost rationale; specs that misstate a validated state machine in prose.
- **Target:** `brainstorming` → `spec-driven-development`. Keep the snippet exception in the SPEC template. Make the branch optional (some users won't want extra branches); the alternative is `docs/agentic-sdlc/<feature>/prototypes/` with a "not production" note.

### F. Specification (AN)

#### MP-31 — Synthesize-not-interview spec mode
- **Stage:** AN
- **Source:** `engineering/to-spec/SKILL.md`
- **What it is:** Turns the *current conversation* plus codebase understanding into a spec. "Do NOT interview the user; just synthesize what you already know." Steps: (1) explore the repo if not done; use glossary vocabulary; respect ADRs; (2) **sketch the test seams**: prefer existing seams, use the highest seam possible, propose new ones as high as possible, "the fewer seams across the codebase, the better — the ideal number is one"; confirm seams with the user; (3) write with the template, publish to the tracker, and label `ready-for-agent` (no further triage needed).
- **Failure prevented:** re-interviewing after a thorough grilling; specs without a testing plan.
- **Target:** `spec-driven-development` **synthesize** mode (plan §5.5 already lists it). Keep the seam sketch as a required SPEC section ("Test seams") feeding `test-strategy`. Replace "publish to tracker" with "write SPEC.md".

#### MP-32 — Spec template
- **Stage:** AN
- **Source:** `to-spec/SKILL.md` `<spec-template>`
- **What it is:** Sections: **Problem Statement** (user's perspective); **Solution** (user's perspective); **User Stories** ("A LONG, numbered list", format "As an <actor>, I want a <feature>, so that <benefit>", "extremely extensive"); **Implementation Decisions** (modules built/modified, interfaces, technical clarifications, architectural decisions, schema changes, API contracts, specific interactions; **no file paths or code snippets**, apart from the prototype exception); **Testing Decisions** (what makes a good test, which modules are tested, prior art); **Out of Scope**; **Further Notes**.
- **Failure prevented:** specs that go stale because of file paths; specs missing test intent or scope boundaries.
- **Target:** `spec-driven-development`. Merge into the plan's SPEC.md template: numbered user stories become sources for **AC-n** (each story → ≥1 Given/When/Then AC); keep "Implementation decisions without file paths" (durable SPEC) while PLAN.md may hold exact paths (executed soon); keep Testing Decisions as "Test seams + prior art"; Out of Scope = Non-goals. Matt's template lacks rollback, baseline/indicators, security and boundaries; the Agentic SDLC adds those.

#### MP-33 — Triage state machine
- **Stage:** AN (intake on-ramp)
- **Source:** `engineering/triage/SKILL.md`; `setup-matt-pocock-skills/triage-labels.md`
- **What it is:** Two **category** roles (`bug`, `enhancement`) and five **state** roles (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). Each triaged issue carries exactly one of each; conflicting states → flag and ask. Transitions: unlabeled → `needs-triage` → `needs-info` | `ready-for-agent` | `ready-for-human` | `wontfix`; `needs-info` → `needs-triage` when the reporter replies; maintainer overrides any time, unusual transitions flagged. External PRs are "an issue with attached code" in the same machine when enabled. Natural-language invocation ("Show me anything that needs my attention", "Move #42 to ready-for-agent"). Attention view: three buckets oldest-first: unlabeled; `needs-triage`; `needs-info` with reporter activity since last triage notes. Every tracker post begins with `> *This was generated by AI during triage.*`. **Quick override:** trust the maintainer, confirm the actions, skip grilling, ask about writing a brief. **Resume:** parse prior triage notes; never re-ask resolved questions.
- **Failure prevented:** issues stuck in ambiguous states; AI posts mistaken for human ones; re-asking reporters.
- **Target:** mostly *not* adopted as a skill (Agentic SDLC has no mandatory tracker). Absorb into `agentic-sdlc` as an **intake on-ramp** (incoming request → classify bug/enhancement → route Quick/Standard or needs-info) and keep the **AI-generated disclaimer** rule for anything the method posts to a tracker or PR (`shipping-and-handover`).

#### MP-34 — Triage evidence checks: redundancy, prior rejection, verify-the-claim
- **Stage:** AN
- **Source:** `triage/SKILL.md` steps 1–3
- **What it is:** Before recommending, run two codebase checks: (a) **redundancy**: search for an existing implementation by *domain concept* (not request wording) and report where you looked; if found → "already implemented" wontfix; (b) **prior rejection**: read `.out-of-scope/*.md` and surface matches. Then **recommend** category + state with reasoning and a brief codebase summary, and wait. Then **verify the claim** before any grilling: reproduce a bug from the reporter's steps; for a PR, check out and run the relevant tests. Report confirmed (with code path) / failed / insufficient detail (strong `needs-info` signal).
- **Failure prevented:** building features that exist; re-litigating rejected ideas; specifying fixes for unreproduced bugs.
- **Target:** `spec-driven-development` (create mode, step 0: "already exists?" and "previously rejected?") and `systematic-debugging` (reproduce first). Keep "search by domain concept, report where you looked".

#### MP-35 — Agent brief format (durable, behavioural contract)
- **Stage:** AN → BU (task contract)
- **Source:** `triage/AGENT-BRIEF.md`
- **What it is:** The brief is "the authoritative specification" an AFK agent works from; the issue body and discussion are only context. Principles: **durability over precision** (may sit for weeks: describe interfaces, types and behavioural contracts; name types, signatures and config shapes; *no file paths, no line numbers*; don't assume structure persists); **behavioural, not procedural** ("The `SkillConfig` type should accept an optional `schedule` field of type `CronExpression`", not "open src/types/skill.ts line 42"); **complete acceptance criteria**, each independently verifiable; **explicit scope boundaries**. Template: `## Agent Brief` / **Category** / **Summary** / **Current behavior** / **Desired behavior** (edge cases, errors) / **Key interfaces** / **Acceptance criteria** (checkboxes) / **Out of scope**. PR variant: current behavior = state of the diff; the brief asks to finish or fix it. `ready-for-human` uses the same structure plus why it can't be delegated (judgement, external access, design decisions, manual testing). The file includes a worked "bad brief" with six named defects.
- **Failure prevented:** stale, procedural tickets; agents gold-plating; no definition of done.
- **Target:** `writing-plans` (optional `tasks/NN-*.md` format) and `spec-driven-development` (Quick route: a brief *is* the mini-SPEC). Keep the template and add `Satisfies: AC-n` plus `Blocked by:`. Resolve the tension with Superpowers' exact-path plans: SPEC and long-lived tasks use behavioural/no-path wording; an immediately executed PLAN may add paths.

#### MP-36 — Needs-info template
- **Stage:** AN
- **Source:** `triage/SKILL.md` §Needs-info template
- **What it is:** `## Triage Notes` / **What we've established so far:** (bullets, capturing everything resolved during grilling) / **What we still need from you (@reporter):** (specific, actionable questions, never "please provide more info").
- **Failure prevented:** losing partial progress; vague info requests.
- **Target:** `spec-driven-development` (Open questions section and the "blocked on stakeholder" state); `retrospective` evidence. Keep the established/still-need split.

#### MP-37 — Out-of-scope knowledge base
- **Stage:** AN (and PL)
- **Source:** `triage/OUT-OF-SCOPE.md`
- **What it is:** `.out-of-scope/<concept>.md`, one file per *concept* (not per issue), kebab-case name. Relaxed short-design-doc style: `# Concept`, a statement that the project does not do it, `## Why this is out of scope` (substantive and durable: scope/philosophy, technical constraints, strategic decisions; never "too busy right now", which is a deferral), optional code sample, `## Prior requests` list. Read all files during intake; match by **concept similarity**, not keyword ("night theme" → `dark-mode.md`); surface: "We rejected this before because [reason]. Do you still feel the same way?" The maintainer confirms (append to prior requests, close), reconsiders (delete/update file, proceed), or disagrees (distinct, proceed). Write only for **rejected enhancements**, never for "already implemented" (that would poison dedup) or bugs.
- **Failure prevented:** re-litigating rejected features every six months; lost rationale.
- **Target:** `spec-driven-development` (Non-goals that are durable product decisions) or `project-context`. Optional: adopt as `docs/agentic-sdlc/out-of-scope/` only when the user wants persistent rejections; otherwise ADRs with "rejected alternative" serve.

### G. Large-effort planning (Full route)

#### MP-38 — Wayfinder map of decision tickets
- **Stage:** PL/AN (Full route)
- **Source:** `engineering/wayfinder/SKILL.md`; tracker docs §Wayfinding operations
- **What it is:** For efforts too big for one session and wrapped in fog. Name the **destination** first (a spec, a decision, or an in-place change); it fixes scope. The **map** (one issue labelled `wayfinder:map`, or local `.scratch/<effort>/map.md`) is an *index, not a store*: `## Destination`, `## Notes` (domain, skills every session should consult, standing preferences), `## Decisions so far` (one line per closed ticket: link + gist), `## Not yet specified` (fog), `## Out of scope`. Open tickets are not listed; they are found by query. **Tickets** are child issues whose body is `## Question`, sized to one ~100K-token session, labelled `wayfinder:<research|prototype|grilling|task>`, never triage labels. **Plan, don't do:** produce decisions, not deliverables; the urge to just do the work signals the map's edge. When clear, hand off to `to-spec` (which "collapses the map's linked decisions into a buildable plan"); go straight to implement only if the effort turned out small.
- **Failure prevented:** charging at a huge foggy goal; losing decisions across sessions; mixing decisions with deliverables.
- **Target:** `agentic-sdlc` Full route (multi-session AN). Adopt the *map structure* as an optional `docs/agentic-sdlc/<effort>/MAP.md` with decision tickets as local files; drop the tracker requirement and labels. Feed the map into SPEC creation (synthesize mode).

#### MP-39 — Fog of war vs ticket test; Not yet specified vs Out of scope
- **Stage:** AN
- **Source:** `wayfinder/SKILL.md` §Fog of war, §Out of scope
- **What it is:** The map is deliberately incomplete. **Test:** can you *state the question precisely now* (not answer it)? Yes → ticket (even if blocked). No → write it loosely in **Not yet specified**; don't pre-slice fog into ticket-sized pieces (one patch may become several tickets or none). Resolving a ticket "graduates" newly specifiable fog into fresh tickets and removes it from the section. **Out of scope** is a different axis: scope, not sharpness. Work beyond the destination never graduates and returns only if the destination is redrawn, as a fresh effort. A mis-scoped existing ticket is closed and gets one line (gist + why + link) in Out of scope, not in Decisions so far ("which records the route actually walked").
- **Failure prevented:** premature decomposition of unknowns; scope creep disguised as "later"; confusing deferred with rejected.
- **Target:** `spec-driven-development` (Open questions vs Non-goals distinction) and the router's change protocol. Keep the precise-question test.

#### MP-40 — Ticket types (HITL/AFK), claim-first, one ticket per session, refer by name
- **Stage:** AN / BU
- **Source:** `wayfinder/SKILL.md` §Ticket Types, §Invocation, §Refer by name
- **What it is:** Every ticket is **HITL** (resolved only through live exchange with a human; the agent never answers its own questions) or **AFK**. Types: **Research** (AFK, subagent), **Prototype** (HITL), **Grilling** (HITL, the default), **Task** (HITL or AFK: manual work that must happen before a decision, such as signing up for a service or provisioning access; its answer records resulting facts such as where credentials live, URLs and row counts). **Claim first:** assign the ticket before any work (the assignee *is* the claim) so concurrent sessions skip it. **Never resolve more than one ticket per session**, research excepted. Resolution: post an answer comment, close, append a context pointer to Decisions so far; then create newly surfaced tickets in a two-pass **create-then-wire** (ids first, then blocking edges and cross-references with real ids, because a placeholder `#<n>` auto-links to an unrelated issue). **Refer by name** in anything humans read (a name wraps its link; never a wall of `#42, #43`). Expect concurrent sessions editing the tracker.
- **Failure prevented:** agents impersonating the human in HITL steps; two sessions on one ticket; illegible id-soup status reports; broken cross-links.
- **Target:** `writing-plans` (task metadata: `Mode: HITL|AFK`) and `executing-plans` (claim before work when parallel; one task per fresh subagent). "Refer by name" belongs in Agentic SDLC reporting rules (progress, TRACEABILITY.md).

### H. Design vocabulary and architecture (DE)

#### MP-41 — Deep-module vocabulary
- **Stage:** DE / BU / TE
- **Source:** `engineering/codebase-design/SKILL.md`
- **What it is:** Use these terms exactly, never substituting "component", "service", "API" or "boundary". **Module** (anything with interface + implementation; scale-agnostic; avoid unit/component/service). **Interface** (everything a caller must know: types *plus* invariants, ordering constraints, error modes, required config, performance characteristics; avoid API/signature). **Implementation** (the body; distinct from Adapter). **Depth** (leverage at the interface: behaviour exercisable per unit of interface learned; deep = large behaviour behind small interface; shallow = interface nearly as complex as implementation). **Seam** (Feathers: where behaviour can change without editing there; where the interface lives; placement is its own decision; avoid "boundary"). **Adapter** (concrete thing satisfying an interface at a seam; a role, not a substance). **Leverage** (what callers get). **Locality** (what maintainers get: change, bugs and verification concentrate in one place). Relationships: a module has exactly one interface; depth is measured against it; a seam is where it lives; an adapter sits at a seam; depth → leverage + locality. **Rejected framings:** Ousterhout's line-ratio depth (rewards padding); interface = TS `interface` keyword; "boundary" (DDD overload). Design questions: can I reduce methods, simplify params, hide more inside? Testability: accept dependencies, don't create them; return results rather than mutating; small surface.
- **Failure prevented:** shallow pass-through layers; tests coupled to internals; vague architecture talk.
- **Target:** single shared reference (for example `senior-solution-architect/references/deep-modules.md`) pointed to by `test-driven-development`, `codebase-modernization`, `multi-axis-code-review`, `writing-plans`. Keep the definitions, rejected framings and "use exactly" discipline.

#### MP-42 — The deletion test
- **Stage:** DE / AN (inventory) / TE (review)
- **Source:** `codebase-design/SKILL.md`; `improve-codebase-architecture/SKILL.md`
- **What it is:** Imagine deleting the module. If complexity vanishes, it was a pass-through. If complexity reappears across N callers, it was earning its keep. In architecture review, "would deleting it concentrate complexity, or just move it?" A "yes, concentrates" is the deepening signal.
- **Failure prevented:** keeping or adding shallow wrappers; deleting modules that carry real weight.
- **Target:** `codebase-modernization` (retire/retain decision heuristic), `multi-axis-code-review` (simplicity axis), `senior-solution-architect`. Cheap and portable.

#### MP-43 — Seam discipline: interface is the test surface; one adapter = hypothetical seam
- **Stage:** DE / BU / TE
- **Source:** `codebase-design/SKILL.md`, `DEEPENING.md`
- **What it is:** (1) Depth is a property of the interface: a deep module may be internally composed of small mockable parts with **internal seams** used by its own tests, but those are not exposed through the external interface. (2) **The interface is the test surface:** callers and tests cross the same seam; wanting to test *past* the interface means the module is the wrong shape. (3) **One adapter means a hypothetical seam; two adapters mean a real one** (typically production + test): don't introduce a port without two justified adapters, because a single-adapter seam is just indirection.
- **Failure prevented:** speculative ports/interfaces; tests reaching into internals; exposing internals for testability.
- **Target:** `test-driven-development`, `test-strategy`, `senior-solution-architect`. Keep as rules.

#### MP-44 — Dependency categories for deepening and testing
- **Stage:** DE / TE
- **Source:** `codebase-design/DEEPENING.md`
- **What it is:** Classify each dependency of a candidate module: (1) **In-process** (pure computation, in-memory): always deepenable; merge and test through the new interface; no adapter. (2) **Local-substitutable** (local stand-ins exist: PGLite for Postgres, in-memory filesystem): deepenable if the stand-in exists; test with the stand-in in the suite; seam internal, no port at the external interface. (3) **Remote but owned** (your own services over a network): define a **port** at the seam, HTTP/gRPC/queue adapter in production, in-memory adapter in tests (recommendation shape: "Define a port at the seam, implement an HTTP adapter for production and an in-memory adapter for testing, so the logic sits in one deep module even though it's deployed across a network"). (4) **True external** (Stripe, Twilio): injected port, mock adapter in tests. These also appear as badges in the architecture report (`in-process`, `local-substitutable`, `ports & adapters`, `mock`).
- **Failure prevented:** mocking things that have local stand-ins; real network calls in unit tests; wrong test level choice.
- **Target:** `test-strategy` (choosing test level and doubles per dependency) and `senior-solution-architect`. High value for the TEST-PLAN "test level" column.

#### MP-45 — Replace, don't layer (test migration on deepening)
- **Stage:** BU / TE
- **Source:** `codebase-design/DEEPENING.md`
- **What it is:** Once tests exist at the deepened module's interface, old unit tests on the former shallow modules are waste: **delete them**. Write new tests at the interface; assert observable outcomes, not internal state; tests should survive internal refactors ("If a test has to change when the implementation changes, it's testing past the interface").
- **Failure prevented:** duplicated, brittle test layers that block refactoring.
- **Target:** `codebase-modernization` (change mode, after characterization tests prove behaviour), `test-driven-development`. Note: in modernization, delete old tests only after new interface tests cover the same behaviour (characterization first). Record the deletion in VERIFICATION.md so `multi-axis-code-review` does not flag it as a weakened quality bar.

#### MP-46 — Design It Twice with parallel constrained subagents
- **Stage:** DE
- **Source:** `codebase-design/DESIGN-IT-TWICE.md`
- **What it is:** (1) **Frame the problem space** for the user: constraints any interface must satisfy, dependencies and their category, a rough illustrative sketch ("not a proposal"); show it, then proceed immediately (the user reads while agents work). (2) **Spawn ≥3 fresh-context subagents in parallel**, each with a separate *technical* brief (file paths, coupling, dependency category, what sits behind the seam) plus both the deep-module vocabulary and `GLOSSARY.md` vocabulary, and a **different design constraint**: Agent 1 "minimise the interface: 1–3 entry points, maximise leverage per entry point"; Agent 2 "maximise flexibility"; Agent 3 "optimise for the most common caller: default case trivial"; Agent 4 (optional) "ports & adapters for cross-seam dependencies". Each returns: interface (types, methods, params, invariants, ordering, error modes); usage example; what is hidden; dependency strategy and adapters; trade-offs. (3) Present sequentially, compare in prose by **depth, locality, seam placement**, then give an opinionated recommendation or hybrid ("the user wants a strong read, not a menu").
- **Failure prevented:** anchoring on the first interface idea; option menus with no recommendation.
- **Target:** `senior-solution-architect` (DE). Keep the constraint set and output schema. Without subagents, generate the designs sequentially under the same constraints. Pairs with an ADR when the chosen design passes the three-condition test.

#### MP-47 — Architecture survey: hot-spot scoping, friction exploration, candidate report, grilling loop
- **Stage:** AN (inventory) / DE
- **Source:** `engineering/improve-codebase-architecture/SKILL.md`
- **What it is:** (1) **Explore** with YAGNI scoping: take a named direction if given; else walk back `git log --oneline` to find **hot spots** (files that keep changing) and weight them, widening only if changes are scattered. Read glossary and ADRs first. Spawn a fresh-context subagent to walk the code *organically*, noting friction: bouncing between many small modules to understand one concept; shallow modules; pure functions extracted "just for testability" while bugs hide in how they're called (no locality); coupled modules leaking across seams; untested or hard-to-test areas. Apply the deletion test. (2) **Report** (MP-48). Each candidate: Files, Problem, Solution, Benefits (in locality/leverage terms, plus how tests improve), Before/After diagram, **Recommendation strength** `Strong | Worth exploring | Speculative`; end with **Top recommendation**. **ADR conflicts:** surface only when friction justifies reopening, with a warning callout; don't list every refactor an ADR forbids. **Do NOT propose interfaces yet**; ask "Which of these would you like to explore?" (3) **Grilling loop** on the chosen candidate (constraints, dependencies, shape, what sits behind the seam, which tests survive); update the glossary inline; if the user **rejects with a load-bearing reason**, offer an ADR "so future architecture reviews don't re-suggest it" (skip ephemeral reasons); optional Design It Twice.
- **Failure prevented:** refactoring cold code; boiling the ocean; re-suggesting rejected refactors; jumping to interface design before the user chooses.
- **Target:** `codebase-modernization` (inventory mode: hot-spot scoping and candidate classification feed the retire/retain/upgrade table) and `retrospective` (when debugging finds "no correct seam"). Keep: hot-spot scoping, recommendation-strength badges, "no interfaces before selection", ADR-on-rejection.

#### MP-48 — Visual HTML architecture report and strict vocabulary tone
- **Stage:** AN / DE
- **Source:** `improve-codebase-architecture/HTML-REPORT.md`
- **What it is:** A single self-contained HTML file in the OS temp dir (`<tmpdir>/architecture-review-<timestamp>.html`), opened with `xdg-open`/`open`/`start`, absolute path reported. **Tailwind via CDN + Mermaid ESM via CDN** (`mermaid@11`, theme neutral). Custom CSS classes `.seam` (dashed), `.leak` (red), `.deep` (dark gradient). Header: repo, date, legend (solid box = module, dashed line = seam, red arrow = leakage, thick dark box = deep module), no intro paragraph. Each candidate `<article>`: title naming the deepening; badge row (strength: emerald/amber/slate, plus dependency category); monospaced Files; **Before/After diagram** side by side (~320px tall); one-sentence Problem; one-sentence Solution; **Wins** bullets ≤6 words in glossary terms ("locality: bugs concentrate in one module"); optional amber ADR callout. Diagram patterns: Mermaid flowchart/sequence (with `classDef` for leaks), hand-built boxes and SVG arrows, **cross-section** (stacked bands for layers), **mass diagram** (interface vs implementation rectangles), **call-graph collapse**. Tone: "Use exactly: module, interface, implementation, depth, deep, shallow, seam, adapter, leverage, locality. Never substitute: component, service, unit... API, signature... boundary... layer, wrapper." Ban "easier to maintain"/"cleaner code". "If the diagram needs a paragraph to be understood, redraw the diagram."
- **Failure prevented:** walls of architecture prose nobody reads; vague benefits.
- **Target:** `codebase-modernization` (optional visual portfolio report). Adaptation: pin CDN versions per repo artifact rules; make the report optional (Markdown table default for platforms without browsers); save into `docs/agentic-sdlc/<feature>/` if the user wants it kept, otherwise temp.

### I. Planning and task decomposition (DE)

#### MP-49 — Tracer-bullet vertical slices with blocking edges and user quiz
- **Stage:** DE
- **Source:** `engineering/to-tickets/SKILL.md`
- **What it is:** (1) Gather context from the conversation or a passed reference (full body + comments). (2) Optionally explore; look for **prefactoring**: "Make the change easy, then make the easy change." (3) Draft **tracer-bullet** tickets. Rules: each slice cuts a narrow but COMPLETE path through every layer (schema, API, UI, tests); demoable or verifiable alone; sized for **one fresh context window**; prefactoring first. Each ticket declares **blocking edges** (none = start now). (4) **Quiz the user** with a numbered list: Title / Blocked by / What it delivers (end-to-end behaviour). Ask: granularity right (too coarse/fine)? Edges correct (only genuine gates)? Merge or split? Iterate to approval. (5) Publish in dependency order (blockers first) so edges can reference real ids. Work the **frontier** (all blockers done). Don't close or modify the parent issue. Avoid file paths and snippets (prototype exception).
- **Failure prevented:** horizontal layer-by-layer plans that only integrate at the end; plans too big for a context window; false dependencies that serialise parallelisable work.
- **Target:** `writing-plans` (plan §5.7 already names tracer bullets + `Blocked by:`). Keep the slice rules, prefactor-first, the three quiz questions (become part of CP3 review), dependency-ordered numbering. Add `Satisfies: AC-n` per task and a check that every AC-n is covered by ≥1 task.

#### MP-50 — Expand–contract for wide refactors
- **Stage:** DE / BU
- **Source:** `to-tickets/SKILL.md` §3
- **What it is:** A **wide refactor** is one mechanical change (rename a column, retype a shared symbol) whose **blast radius** breaks thousands of call sites, so no vertical slice can land green. Sequence it: **Expand** (add the new form beside the old; nothing breaks) → **Migrate** call sites in batches sized by blast radius (per package/directory), each its own ticket blocked by the expand, CI green batch to batch → **Contract** (delete the old form) in a ticket blocked by every migrate batch. If even batches can't stay green alone, keep the sequence on a shared integration branch, all blocking a final integrate-and-verify ticket; green is promised only there.
- **Failure prevented:** big-bang refactors that leave CI red for days; forcing mechanical refactors into feature slices.
- **Target:** `writing-plans` (exception to tracer bullets) and `codebase-modernization` change mode (plan §5.11 names expand/contract). Adopt verbatim as the task-graph pattern.

#### MP-51 — Local ticket file template
- **Stage:** DE
- **Source:** `to-tickets/SKILL.md` `<local-ticket-template>`, `<issue-template>`
- **What it is:** Local: `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01` in dependency order, *one ticket per file, never a combined file*. Body: `# <NN>: <Title>` / **What to build:** (end-to-end behaviour, user perspective, not a layer list) / **Blocked by:** (numbers/titles or "None (can start immediately)") / **Status:** ready-for-agent / acceptance-criteria checkboxes. Tracker form: `## Parent` (omit if none) / `## What to build` / `## Acceptance criteria` / `## Blocked by` (omit when native edges are set).
- **Failure prevented:** monolithic plan files that subagents must parse; tickets without done criteria.
- **Target:** `writing-plans` → `docs/agentic-sdlc/<feature>/tasks/NN-*.md` (plan §3.5). Keep the shape; add `Satisfies: AC-n`, `Mode: AFK|HITL`, and optional `Files:` for immediate execution.

#### MP-52 — Pre-agreed test seams ("highest seam, ideally one")
- **Stage:** AN / DE / BU
- **Source:** `to-spec/SKILL.md` step 2; `tdd/SKILL.md` §Seams
- **What it is:** Before any test is written, write down the seams under test and confirm them with the user; "No test is written at an unconfirmed seam." Ask "What's the public interface, and which seams should we test?" and give each proposed seam a one-line note on **what it catches and what it misses**. In spec writing: prefer existing seams; use the highest seam possible; the ideal number across the codebase is one.
- **Failure prevented:** test effort spread across every edge case instead of critical paths; tests at seams the human doesn't trust.
- **Target:** `spec-driven-development` (Test seams section, approved at CP2), `test-strategy` (TEST-PLAN derives from them), `test-driven-development` (only test at agreed seams). Keep the "catches/misses" note format.

### J. Build (BU)

#### MP-53 — TDD rules of the loop
- **Stage:** BU
- **Source:** `engineering/tdd/SKILL.md`
- **What it is:** "TDD is the red → green loop." Rules: **red before green** (failing test first, then only enough code to pass; no anticipating future tests or speculative features); **one slice at a time** (one seam, one test, one minimal implementation per cycle); **refactoring is not part of the loop**; it belongs to the review stage (`code-review`). Every reference section applies on every cycle ("consult them before and during the loop, not after"). Read `GLOSSARY.md` so test names match domain language; respect ADRs.
- **Failure prevented:** speculative code; mixing refactoring with behaviour change.
- **Target:** `test-driven-development`. Keep red-first and one-slice. **Conflict:** plan §5.8 keeps red-green-*refactor*. Recommendation: keep refactor in the cycle but limited to the just-written code under green tests; leave structural refactors to `multi-axis-code-review` findings. Document the choice in the skill's Influences.

#### MP-54 — Test anti-patterns: implementation-coupled, tautological, horizontal slicing
- **Stage:** BU / TE
- **Source:** `tdd/SKILL.md` §Anti-patterns; `tdd/tests.md`
- **What it is:** (1) **Implementation-coupled**: mocks internal collaborators, tests private methods, verifies through a side channel (querying the DB instead of using the interface). Tell: breaks on refactor without behaviour change. (2) **Tautological**: the expected value is recomputed the way the code computes it (`expect(add(a,b)).toBe(a+b)`, a reduce over items mirroring the implementation, a constant asserted equal to itself); it passes by construction. Expected values must come from an independent source of truth (known-good literal, worked example, the spec). (3) **Horizontal slicing**: all tests first, then all code, which tests imagined shape rather than behaviour. Work in vertical slices, each test a **tracer bullet** that responds to what the last cycle taught. Red flags list: mocking internals, private methods, asserting call counts/order, name describes HOW not WHAT, verifying outside the interface. Good test: behaviour callers care about, public API only, survives refactors, WHAT not HOW, one logical assertion. Example pair: "createUser saves to database" (DB query) vs "createUser makes user retrievable" (via `getUser`).
- **Failure prevented:** green suites that prove nothing; brittle suites that block refactoring.
- **Target:** `test-driven-development` (rationalization/anti-pattern table), `test-strategy` (independent expected values from the SPEC: AC-n literals), `multi-axis-code-review` (correctness axis checks for tautological tests). The tautology rule pairs directly with Agentic SDLC independent test design: expected values come from the SPEC, not the code.

#### MP-55 — Mock only at system boundaries; SDK-style interfaces
- **Stage:** BU / TE
- **Source:** `tdd/mocking.md`
- **What it is:** Mock external APIs, databases (*sometimes*; prefer a test DB), time/randomness, filesystem (*sometimes*). Never mock your own modules or internal collaborators. Design for mockability: **dependency injection** (pass `paymentClient` in rather than `new StripeClient(process.env.KEY)` inside); **SDK-style interfaces** (`api.getUser`, `api.getOrders`, `api.createOrder`) over a generic `fetch(endpoint, options)`, so each mock returns one shape, there is no conditional logic in the mock, the endpoints a test touches are visible, and types are per endpoint.
- **Failure prevented:** mock-heavy tests coupled to internals; mocks with branching logic.
- **Target:** `test-driven-development`, `test-strategy`. Keep as-is; aligns with MP-44 categories.

#### MP-56 — Single-context implement loop
- **Stage:** BU (inline mode)
- **Source:** `engineering/implement/SKILL.md`
- **What it is:** If given a ticket reference, fetch it and **state its title before starting** (ask if ambiguous). Use TDD at **pre-agreed seams**. Run **typechecking regularly, single test files regularly, the full suite once at the end**. Then run `code-review`. Commit to the current branch.
- **Failure prevented:** working on the wrong ticket; slow full-suite loops during development; unreviewed commits.
- **Target:** `executing-plans` inline mode. Keep "state the task title first" (and its AC-n), the check cadence (fast checks often, full suite at task end = verification-gate input), and review-before-commit (Standard/Full routes).

#### MP-57 — Task-graph execution: frontier, integration branch, worktrees, merger, context pointers
- **Stage:** BU (subagent mode)
- **Source:** `engineering/implement-spec/SKILL.md`
- **What it is:** Goal: the whole spec on one **integration branch**, every ticket resolved. Tickets are a **task graph**, so there is always a **frontier**. Every subagent starts with fresh context. Communication is sparse, mainly **context pointers** (spec, tickets, research notes, previous commits); don't duplicate what pointers reach. Steps: (1) read spec + tickets → task graph; (2) optional **exploration subagent** that saves markdown notes to a directory *outside the repo* accessible to all later subagents; (3) create integration branch; open a draft PR after the first merge if the tracker closes work through PRs (a branch with no commits ahead of main can't open one); (4) one fresh **implementer subagent per ticket**, each in its **own worktree/branch**; it confirms its worktree is based on the integration branch (reset if not), runs TDD, and **merges the integration tip into its branch before reporting done**; implementers run in the background for concurrency; (5) a **merger subagent** merges completed work into the integration branch; (6) when the frontier changes, launch more implementers; (7) after all tickets, run **one code-review** on the integration branch; fix all findings in **a single fresh implementer**; (8) mark the draft PR ready or resolve tickets; (9) clean up worktrees.
- **Failure prevented:** serial execution of parallelisable work; merge conflicts discovered late; orchestrator context bloat; implementers re-exploring.
- **Target:** `executing-plans` subagent mode (plan §5.9). Keep frontier dispatch, worktree per task, implementer-merges-integration-tip, merger role, exploration notes, pointer-based comms. **Change:** the Agentic SDLC requires per-task spec-compliance and quality review (Superpowers style) in addition to Matt's single end review; keep both. Restrict parallelism to frontier tasks with no shared files (plan §5.9). Store exploration notes in `docs/agentic-sdlc/<feature>/notes/` or a temp dir (repo-agnostic choice).

#### MP-58 — Diagnosis Phase 1: build a feedback loop (ten constructions)
- **Stage:** BU
- **Source:** `engineering/diagnosing-bugs/SKILL.md` Phase 1
- **What it is:** "This is the skill. Everything else is mechanical." With a tight pass/fail signal that goes red on *this* bug, the cause will be found. Spend disproportionate effort: "Be aggressive. Be creative. Refuse to give up." Constructions in rough order: (1) failing test at whatever seam reaches the bug; (2) curl/HTTP script against a dev server; (3) CLI with a fixture input diffed against a known-good snapshot; (4) headless browser script (Playwright/Puppeteer) asserting DOM/console/network; (5) replay a captured trace (request/payload/event log saved to disk); (6) throwaway harness (minimal subset, mocked deps, single call); (7) property/fuzz loop (1000 random inputs); (8) bisection harness (`git bisect run`); (9) differential loop (old vs new version or two configs); (10) HITL bash script (last resort).
- **Failure prevented:** theorising by reading code without a reproducible signal.
- **Target:** `systematic-debugging` Phase 1 (plan §5.10). Keep the ordered list in `references/loop-construction.md`.

#### MP-59 — Tighten the loop; raise the rate for flakes; stop when no loop is possible
- **Stage:** BU
- **Source:** `diagnosing-bugs/SKILL.md` Phase 1
- **What it is:** Treat the loop as a product: **faster** (cache setup, skip unrelated init, narrow scope), **sharper** (assert the specific symptom, not "didn't crash"), **more deterministic** (pin time, seed RNG, isolate filesystem, freeze network). "A 30-second flaky loop is barely better than no loop; a 2-second deterministic one is tight." **Non-deterministic bugs:** aim for a higher reproduction rate rather than a clean repro: loop the trigger 100×, parallelise, add stress, narrow timing windows, inject sleeps ("A 50%-flake bug is debuggable; 1% is not"). **No loop possible:** stop and say so, list what was tried, ask for (a) access to a reproducing environment, (b) a redacted captured artifact (HAR, log dump, core dump, timestamped screen recording), or (c) permission for temporary production instrumentation. "Do **not** proceed to hypothesise without a loop."
- **Failure prevented:** slow or flaky loops that waste iterations; guessing at unreproducible bugs.
- **Target:** `systematic-debugging`. Keep all three parts.

#### MP-60 — Phase 1 completion checklist: one command, already run, red-capable
- **Stage:** BU
- **Source:** `diagnosing-bugs/SKILL.md` §Completion criterion
- **What it is:** Phase 1 is done when the agent can name **one command** (script path, test invocation, curl) that it has **already run at least once** (showing invocation and redacted output) and that is: **Red-capable** (drives the real bug path and asserts the user's exact symptom; can go red on this bug, green once fixed); **Deterministic** (same verdict every run, or a pinned high rate for flakes); **Fast** (seconds); **Agent-runnable** (unattended; humans only via the HITL script). "If you catch yourself reading code to build a theory before this command exists, stop." "No red-capable command, no Phase 2."
- **Failure prevented:** premature hypothesising; loops that don't actually catch the bug.
- **Target:** `systematic-debugging` gate between phases; strong example of MP-14 completion criteria. Record the command in VERIFICATION.md as the bug's regression evidence.

#### MP-61 — Reproduce + minimise to load-bearing elements
- **Stage:** BU
- **Source:** `diagnosing-bugs/SKILL.md` Phase 2
- **What it is:** Confirm the loop shows the failure the **user** described, not a nearby one ("Wrong bug = wrong fix"); reproducible across runs; exact symptom captured. Then **minimise**: cut inputs, callers, config, data and steps *one at a time*, re-running after each cut, keeping only what's load-bearing. Done when removing any remaining element makes the loop go green. The minimal repro shrinks the hypothesis space and becomes the regression test.
- **Failure prevented:** fixing a different bug; large hypothesis spaces.
- **Target:** `systematic-debugging` Phase 2 (plan's "pattern/diff analysis" sits next to it). Keep.

#### MP-62 — 3–5 ranked falsifiable hypotheses, shown to the user
- **Stage:** BU
- **Source:** `diagnosing-bugs/SKILL.md` Phase 3
- **What it is:** Generate **3–5 ranked hypotheses before testing any** (single-hypothesis generation anchors). Each must be falsifiable with a stated prediction: *"If <X> is the cause, then <changing Y> will make the bug disappear / <changing Z> will make it worse."* No statable prediction = "a vibe": discard or sharpen. **Show the ranked list to the user before testing** (they may re-rank instantly: "we just deployed a change to #3"); don't block if they are AFK.
- **Failure prevented:** anchoring on the first plausible idea; untestable theories; ignoring human domain knowledge.
- **Target:** `systematic-debugging` Phase 3. **Change:** the plan says "single hypothesis" (Superpowers); merge as "rank 3–5, then test one at a time, one variable at a time".

#### MP-63 — Instrument: one variable, debugger first, tagged debug logs; perf branch
- **Stage:** BU
- **Source:** `diagnosing-bugs/SKILL.md` Phase 4
- **What it is:** Each probe maps to a specific prediction; **change one variable at a time**. Tool preference: (1) debugger/REPL ("one breakpoint beats ten logs"); (2) targeted logs at boundaries that distinguish hypotheses; (3) never "log everything and grep". **Tag every debug log** with a unique prefix, for example `[DEBUG-a4f2]`, so cleanup is one grep ("Untagged logs survive; tagged logs die"). **Perf branch:** logs are usually wrong; establish a baseline measurement (timing harness, `performance.now()`, profiler, query plan), then bisect. "Measure first, fix second."
- **Failure prevented:** debug logs left in commits; confounded experiments; optimising without a baseline.
- **Target:** `systematic-debugging` Phase 4; tagged-log rule also in `verification-gate` (grep for leftover tags before claiming done).

#### MP-64 — Regression test only at a correct seam; "no seam" is a finding
- **Stage:** BU → TE / retrospective
- **Source:** `diagnosing-bugs/SKILL.md` Phase 5
- **What it is:** Write the regression test **before the fix**, but only at a **correct seam**: one where the test exercises the real bug pattern as it occurs at the call site. A seam that is too shallow (single-caller test for a multi-caller bug; a unit test that can't replicate the chain) gives false confidence. If no correct seam exists, **that is the finding**: architecture prevents locking the bug down; flag it (router: take it to `improve-codebase-architecture`). With a seam: minimised repro → failing test → watch it fail (if red was forced by mutating code/fixtures, `diff` against a pristine copy to prove the mutation landed) → fix → watch it pass → re-run the original un-minimised Phase 1 loop.
- **Failure prevented:** regression tests that pass regardless of the bug; hidden architectural testability gaps.
- **Target:** `systematic-debugging` Phase 5 and `test-driven-development` (bug-fix variant). Feed "no correct seam" into `codebase-modernization` / `retrospective` as an environment finding. **Conflict:** Agentic SDLC Rule 4 says "a bug fix starts with a failing regression test"; add Matt's exception (document the missing seam instead of writing a false-confidence test) explicitly in the skill.

#### MP-65 — Debug cleanup checklist and hypothesis-in-commit
- **Stage:** BU / TE
- **Source:** `diagnosing-bugs/SKILL.md` Phase 6
- **What it is:** Before declaring done: original repro no longer reproduces (re-run Phase 1 loop); regression test passes (or the missing seam is documented); all `[DEBUG-...]` instrumentation removed (grep the prefix); throwaway prototypes deleted or moved to a clearly marked debug location; **the hypothesis that turned out correct is stated in the commit/PR message** "so the next debugger learns".
- **Failure prevented:** leftover instrumentation; lost causal knowledge.
- **Target:** `systematic-debugging` exit checklist → `verification-gate`; commit-message rule in `shipping-and-handover`.

#### MP-66 — Redaction discipline for shown commands and artifacts
- **Stage:** X (security)
- **Source:** `diagnosing-bugs/SKILL.md` §Redact; `handoff`, `claude-handoff`
- **What it is:** Before showing any command, output or captured artifact, replace every secret with `<REDACTED>`. Build loops against **environment variables** so credentials stay in the environment, not in shown text. Captured artifacts carry auth headers: quote only the lines that carry the signal. If redacted output isn't enough, say so and ask. Handoff summaries redact keys, passwords and PII "since the summary becomes the agent's prompt".
- **Failure prevented:** secrets leaking into transcripts, handoff files, PR bodies and VERIFICATION.md evidence.
- **Target:** `security-hardening` (AI-use guardrails) and `verification-gate` (evidence logs are redacted). Directly implements Agentic SDLC Rule 7. Keep verbatim.

#### MP-67 — Human-in-the-loop reproduction script
- **Stage:** BU
- **Source:** `diagnosing-bugs/scripts/hitl-loop.template.sh`
- **What it is:** A bash template the agent copies and edits; the agent runs it, and the user follows prompts. Two helpers: `step "<instruction>"` (show, wait for Enter) and `capture VAR "<question>"` (read a reply into VAR). At the end, it prints captured values as `KEY=VALUE` for the agent to parse. `set -euo pipefail`. Rule: `capture` echoes to the terminal the agent reads, so capture *observations*; leave signing in to the user as a `step`.
- **Failure prevented:** unstructured "please click around and tell me" loops; credentials typed into agent-visible captures.
- **Target:** `systematic-debugging` scripts/ (portable bash; Windows users need WSL or Git Bash; note this).

### K. Review (TE)

#### MP-68 — Two-axis review in parallel fresh subagents, no cross-axis reranking
- **Stage:** TE
- **Source:** `engineering/code-review/SKILL.md`
- **What it is:** Review the diff from a fixed point along **Standards** (does it conform to documented coding standards plus a smell baseline?) and **Spec** (does it faithfully implement the originating issue/spec?). Both run as **parallel subagents with fresh context** "so they don't pollute each other's context". Aggregate under `## Standards` and `## Spec`, verbatim or lightly cleaned. **Do not merge or rerank** across axes. End with a one-line summary: findings per axis and the worst issue *within each axis*, never a single winner. Rationale: "Standards pass, Spec fail" (follows every rule, wrong thing) and "Spec pass, Standards fail" are both real; separate reporting stops one masking the other.
- **Failure prevented:** a clean-code review hiding a wrong implementation, or vice versa; reviewer context contamination.
- **Target:** `multi-axis-code-review`. Keep the per-axis isolation and **the no-rerank rule** across the plan's five axes (spec, design/standards, correctness, security, simplicity): each axis reports its own severity triage; the summary gives the worst per axis. CP4 then needs "no open Critical in any axis".

#### MP-69 — Pin the fixed point and fail early; spec-source discovery order
- **Stage:** TE
- **Source:** `code-review/SKILL.md` steps 1–2
- **What it is:** Use the user's fixed point (SHA, branch, tag, `main`, `HEAD~5`); ask if missing. Capture once: `git diff <fixed-point>...HEAD` (three-dot = against the merge-base) and `git log <fixed-point>..HEAD --oneline`. Confirm `git rev-parse <fixed-point>` resolves and the diff is non-empty **before** spawning subagents ("A bad ref or empty diff should fail here, not inside two parallel sub-agents"). Spec source, in order: (1) issue refs in commit messages (`#123`, `Closes #45`, `!67`); (2) a path the user passed; (3) a spec file under `docs/`, `specs/`, `.scratch/` matching the branch/feature; (4) ask; if there is none, the Spec axis reports "no spec available".
- **Failure prevented:** reviewing the wrong diff; parallel agents failing on a bad ref; reviewing without the spec.
- **Target:** `multi-axis-code-review`, `verification-gate`. Add Agentic SDLC location first: `docs/agentic-sdlc/*/SPEC.md` and AC-n refs in commit messages.

#### MP-70 — Fowler smell baseline with repo-override and judgement labelling
- **Stage:** TE
- **Source:** `code-review/SKILL.md` step 3
- **What it is:** Find every standards source (`CODING_STANDARDS.md`, `CONTRIBUTING.md` mandatory when present). The Standards axis always carries a fixed baseline of 12 Fowler smells (*Refactoring* ch.3), each "what it is → how to fix": Mysterious Name (rename; if no honest name, the design is murky), Duplicated Code (extract the shared shape), Feature Envy (move the method to the data), Data Clumps (bundle into a type), Primitive Obsession (small domain type), Repeated Switches (polymorphism or a shared map), Shotgun Surgery (gather into one module), Divergent Change (split by reason to change), Speculative Generality (delete, inline until a real need), Message Chains (hide the walk behind one method), Middle Man (cut it, call directly), Refused Bequest (composition over inheritance). Binding rules: **the repo overrides** (a documented standard that endorses something suppresses the smell); **always a judgement call** (label "possible Feature Envy", never a hard violation); skip anything tooling already enforces.
- **Failure prevented:** reviews with no standard in repos that document nothing; reviewer pedantry overriding local conventions.
- **Target:** `multi-axis-code-review` simplicity/maintainability axis. Keep the list, override rule and labelling. Map Speculative Generality to Spec scope-creep findings too.

#### MP-71 — Reviewer subagent briefs (Standards and Spec)
- **Stage:** TE
- **Source:** `code-review/SKILL.md` step 4
- **What it is:** **Standards brief** includes the diff command, commit list, standards files list and the *full pasted smell baseline* (the subagent has no other access). Instruction: report per file/hunk (a) violations of documented standards citing file + rule; (b) baseline smells, naming and quoting the hunk; distinguish hard violations from judgement calls; skip tooling-enforced items; **under 400 words**. **Spec brief** includes the diff, commits and spec contents. Instruction: report (a) requirements missing or partial, (b) behaviour not asked for (**scope creep**), (c) implemented-but-looks-wrong; **quote the spec line** for each; under 400 words. Issue both calls together in the foreground.
- **Failure prevented:** unbounded, uncited review prose; subagents lacking the rules.
- **Target:** `multi-axis-code-review` (one brief per axis). Keep: "paste rules in full", "cite the rule / quote the spec line", word cap, and the three Spec categories. Map the Spec brief onto AC-n: cite the `AC-n` instead of a quoted line.

#### MP-72 — Review agent owns standards (context-pressure asymmetry)
- **Stage:** TE / PL
- **Source:** `retro/SKILL.md` §Implementation vs Review, §Files
- **What it is:** Implementation agents carry the most **context pressure** (exploration, code, debugging); review agents the least (they get a diff, need no exploration, and often write no code). Therefore the **review** agent imposes coding standards. File roles: `CLAUDE.md`/`AGENTS.md` are pushed into every agent's context, so use them "incredibly sparingly", mostly for navigation pointers; `CODING_STANDARDS.md` is read *during review, not implementation* (add pointers to docs if it exceeds 1,000 lines); docs are pointed-to references; skills for docs whose description should load, or for user commands.
- **Failure prevented:** implementer context drowning in rules; standards nobody enforces.
- **Target:** `project-context` (where rules go: CONSTRAINTS.md read at TE, short pointer block in AGENTS.md) and `multi-axis-code-review` (design/standards axis loads CONSTRAINTS/standards). Adopt as a design principle of the Agentic SDLC artifact layout.

### L. Ship and learn (DP)

#### MP-73 — PR body: smallest visual, before/after evidence, merge danger
- **Stage:** DP
- **Source:** `engineering/pr/SKILL.md`; `pr/CREDITS.md` (Summary visuals adapted from Dex Horthy's `show-me`, HumanLayer)
- **What it is:** Template: `## Summary` (diagram, diff-sketch or tree) / `## Evidence` (**Before:** / **After:**) / `## Merge Danger` (**Door:** one-way or two-way + optional description; **Blast Radius:** one word + optional ramifications). Skip preambles; brief prose; use GLOSSARY language. **Summary:** pick the *smallest view* that makes the key point: pseudocode (logic), call tree (runtime flow), component tree with module paths and state (UI), shallow file tree (refactor), Mermaid sequence (interaction), or `diff` blocks matched to topic (component, file-layout, call-tree, state/control-flow diffs); show the whole block only when most is new or a copyable target matters; place each visual next to its text; keep only what answers the question; usually one or several, never all. **Evidence tiers:** screenshots S-tier (visual change, environment ready); execution-based A-tier (test results, console output; show the exact test that now fails then passes, as pseudocode). **Door:** two-way doors are walkable back; destructive/hard-to-reverse = one-way; cheap rollback = lower risk. **Blast radius:** consider all (layout shift, consumer breakages, mobile responsiveness).
- **Failure prevented:** walls of PR prose; "trust me" PRs without evidence; reviewers unaware a change is irreversible.
- **Target:** `shipping-and-handover` (plan §5.17 already lists these). Add a **Traceability** section (AC-n → test → evidence) and a **Rollback** line (from SPEC) beside the Door. Keep the evidence tiers. Preserve the Dex Horthy credit in Influences.

#### MP-74 — Retro: environment-improvement categories, severity-ordered
- **Stage:** DP → PL
- **Source:** `engineering/retro/SKILL.md`
- **What it is:** A retro suggests improvements to the agent's **environment**, not the code. Steps: (1) load the writing-for-agents style; (2) read the **primary sources** of the session (session logs on the machine; default current session); (3) find candidates in seven categories, each with a "use when" trigger: **Navigation** (session took long to find info; hidden file dependencies; add a navigation pointer); **Automated checks** (could lint/type/test/filesystem linters have caught the agent's error? *Read the repo's own check command first*, since an existing but unwired or broken check is the finding; **a repo with no guardrail** (no pre-commit hook and no CI running lint/typecheck/test) is itself a finding); **Coding standards** (should the reviewer get a new rule, or should one be removed/clarified?); **Global AGENTS.md** (move steering to standards or checks when large); **Tool economy** (expensive tool calls; token-inefficient CLIs/MCPs); **No-ops** (instructions that don't change behaviour); **Information access** (tee dev-server logs, read-only third-party access). (4) Present in order of severity.
- **Failure prevented:** the same agent mistakes recurring across sessions; retros that only discuss code.
- **Target:** `retrospective` (plan §5.18 "environment improvements"). Keep the seven categories and "read the existing check command first". Combine with BMad-style acceptance decision and indicator comparison. Output feeds `project-context` pitfall mode.

#### MP-75 — Mechanical → deterministic check; judgement → coding standard
- **Stage:** DP → PL
- **Source:** `retro/SKILL.md` (Coding standards); `ask-matt` step 4
- **What it is:** Classify each violation. **Mechanical** (fixed syntactic pattern, banned API, import shape, file-location rule) → a deterministic check, "full stop": a custom lint rule, a pre-commit hook or a CI job, whichever is cheapest given the repo's language and existing guardrail. "Default to building the check over writing the rule." **Judgement calls** (cross-file consistency, "matches the surrounding style") → `CODING_STANDARDS.md`.
- **Failure prevented:** prose rules for things a linter could enforce; standards files bloated with mechanical rules.
- **Target:** `retrospective` and `project-context` (CONSTRAINTS.md holds judgement rules; mechanical ones become checks registered in `deployment-pipeline` quality gates). Plan §5.18 already names this; keep the "full stop" priority.

#### MP-76 — Wizard for human-only procedures
- **Stage:** DP (also PL setup)
- **Source:** `engineering/wizard/SKILL.md`, `wizard/template.sh`
- **What it is:** For steps only a human can take (provisioning infrastructure, credentials/CI secrets, unfamiliar third-party dashboards, one-off migrations/cutovers), not for steps the agent can do itself. Process: (1) **Scope**: read `.env*`, README, `docker-compose*`, framework config, `.github/workflows/*` (every `secrets.*`/`vars.*` reference is a value to produce); for migrations, current state, target state and the irreversible actions between; show the ordered stages and values; done when each value has source, destination (`.env`, GitHub secret, both, nowhere) and secret/public status. (2) **Map each journey** ("Dashboard → Developers → API keys → Reveal test key → copy"); never invent UI steps: ask or check docs. (3) **Author**: copy the template, write stages below the marker using the library helpers, set `TOTAL_STAGES`; open the URL before asking for its value; `ask_secret` for secrets; `write_env` every persisted value; `set_secret` only what CI needs; `confirm` before irreversible actions; one focused task per stage. (4) **Verify**: `bash -n`, `shellcheck` if available, `chmod +x`; don't run it yourself (browsers + human input); trace statically that every value lands where planned and every `set_secret` name matches a `secrets.*` reference. Ephemeral by default; commit and link from the README only when it should be a repeatable path.
- **Failure prevented:** re-explaining manual setup to an agent each time; secrets echoed in chat; mismatched CI secret names; missed irreversible steps.
- **Target:** `deployment-pipeline` (environment/secrets setup, cutover runbooks) and `shipping-and-handover` (runbook as an executable script). Bash limits portability (Windows → WSL/Git Bash; GitHub-only secret writes). Keep as an optional script with the GitHub calls isolated (`set_secret`/`set_var` already degrade gracefully).

#### MP-77 — Software-factory brakes: start slow, one trigger at a time, cap loops
- **Stage:** DP (also BU automation)
- **Source:** `in-progress/software-factory/SKILL.md`, `EXAMPLE-TASKS.md`
- **What it is:** "Every trigger is an accelerator. Accelerators without brakes make a slop cannon." Three **brakes**: **automated checks** (types, lint, tests every run must pass), **automated review** (a separate run reads the diff cold against standards and the ticket), **human review** (reads the PR before merge; what it catches becomes new checks and sharper review). Add one automated trigger at a time, **throttled** at first (one bug report in ten, a clock once a day), human review on every PR; open the throttle as brakes earn trust; **cap every loop of runs at a few tries before a human**. Example: rework run fixes only what review named; after N fails, label for a human. **Ratchet task**: a daily clock takes one file off a lint exception list, fixes it, opens a PR ("the check only ever gets stricter"). The factory's own fix runs never chain and always get human review.
- **Failure prevented:** runaway agent loops; unreviewed automated merges; big-bang strictness migrations.
- **Target:** `deployment-pipeline` (CI quality gates as brakes; ratchet pattern for introducing stricter checks) and `executing-plans` (retry cap: "3 failed attempts → stop and escalate", consistent with plan §5.10). Keep the three-brake vocabulary.

#### MP-78 — Question-every-task design checklist
- **Stage:** DP / DE (automation design)
- **Source:** `software-factory/SKILL.md` §Question every task
- **What it is:** For each automated task: (1) What triggers it? (2) What does it do, and which services does it read and write? (3) What does it trigger next? (4) Where does a human re-enter? (5) What stops two runs doing the same work? For each ticket source: what stops it filing the same ticket twice? A design is finished when every slot names a product (or a deliberate none) and every question has an answer. A run never waits for a human; it ends, and the human's later change triggers a new run. Runners are disposable: memory lives only in the tracker, git host and orchestrator.
- **Failure prevented:** automation with no human re-entry point; duplicate concurrent runs; hidden state on runners.
- **Target:** `deployment-pipeline` (when adding CI jobs or agent automations: answer the five questions in the rollout plan). The vocabulary itself (task, trigger, run, runner, orchestrator) is useful but optional.

#### MP-79 — Prove the rule bites (pass → fail → pass)
- **Stage:** TE / PL (constraints)
- **Source:** `in-progress/setup-ts-deep-modules/SKILL.md` §6, `dependency-cruiser.config.cjs`
- **What it is:** After installing a guardrail (here dependency-cruiser rules enforcing that packages are reached only through root entry-point files, tests go through entry points, the `tests/` folder is private, and there are no cycles), the completion criterion for the whole skill is to **observe** the check pass on clean code, **fail** on a deliberately introduced violation (a deep import), then **pass** after reverting. "A config that doesn't fail on a violation is worthless." The config uses path-depth rules with `$1` back-references (intra-package freedom, cross-package entry-point-only) so new folders never need config changes; layering left as a commented stub; `.cjs` for ESM repos. Then document the convention next to the code and add a one-line pointer in the agent instructions file.
- **Failure prevented:** guardrails that are installed but never actually fire.
- **Target:** `verification-gate` and `deployment-pipeline` (every new quality gate must be shown to fail on a seeded violation), and `retrospective` (when it proposes a new check). Also a template for TS deep-module enforcement in `codebase-modernization`. Highly portable principle.

#### MP-80 — Destructive-git guardrail hook
- **Stage:** X (security / DP)
- **Source:** `misc/git-guardrails-claude-code/` (`SKILL.md`, `scripts/block-dangerous-git.sh`)
- **What it is:** A Claude Code PreToolUse hook reads the tool input JSON (`jq -r '.tool_input.command'`), matches patterns (`git push`, `reset --hard`, `clean -f/-fd`, `branch -D`, `checkout .`, `restore .`, `push --force`) and exits 2 with "BLOCKED: … The user has prevented you from doing this." Scope choice: project `.claude/settings.json` or global.
- **Failure prevented:** agents pushing or destroying work without approval.
- **Target:** `deployment-pipeline` / `security-hardening`: the *rule* ("never push tags or deploy to production without explicit human approval", plan §5.16) is portable; the hook is Claude Code-specific. Mention as an optional platform enforcement.

#### MP-81 — Workflow checkpoints: push right, decision-ready brief
- **Stage:** X (gate design)
- **Source:** `in-progress/loop-me/SKILL.md`
- **What it is:** Vocabulary for designing workflows: **Trigger** (event or schedule; events usually more efficient); **Checkpoint** (human verify/decide point; optional); **Push right** (defer the checkpoint as late as possible, doing maximal work first so the human is asked once, late, with everything prepared); **Brief** (what a checkpoint presents: a tight, decision-ready summary of what was produced, why, and a link to the asset; never the raw output; "Speed of review is imperative"). "Mandate nothing structural." Definition of done for a workflow spec: an implementer agent could build it "without asking a single question".
- **Failure prevented:** gates that dump raw drafts on the human; too many early interruptions.
- **Target:** `agentic-sdlc` gate presentation: every gate shows a **brief** (evidence summary, residual risk, links to SPEC/PLAN/VERIFICATION), not the raw artifact. "Push right" fits within-stage questions; the three Agentic SDLC gates remain fixed. The "no single question remaining" bar is a good CP3 criterion for PLAN.md.

#### MP-82 — Wiki memory that records history, not the present
- **Stage:** DP → PL (long-running memory)
- **Source:** `in-progress/chief-of-staff/SKILL.md`
- **What it is:** A coordinating agent thinks on two tracks: **tactical** (finish this task) and **strategic** (improve the environment for the next one). All work runs in subagents (protect the coordinator window), background where possible, with sparse pointer-based comms. Memory is a **wiki**: `index.md` (every page, one-line summary, grouped) plus one page per thing (decision, recurring problem, subsystem, preference), interlinked; sources are cited, never copied or edited. Operations: **Ingest** (update every page touched and the index), **Query** (read the index before decisions; file valuable answers), **Lint** (contradictions, orphans, missing links, overtaken claims; schedule it). **Write history, not the present:** date every claim ("On 2026-10-13, Matt decided…"); cite the commit for code claims ("As of `repo@abc1234`, …"); never "currently/now/is" about code without a date or commit; supersede rather than rewrite. Strategic view: **pit of success** (constrained APIs, correctness-forcing lint, CODING_STANDARDS for reviewers), **data sources** (dev-server logs, test DBs, browser), **"no workarounds"** rule. Procedures: retro roughly one in five subagent sessions (failures first).
- **Failure prevented:** memory files that silently go stale and assert outdated facts as current.
- **Target:** `retrospective` (RETRO.md claims dated and commit-anchored) and `project-context` (pitfall entries dated with commit SHA). Adopt "write history, not the present" for all Agentic SDLC records (CHECKPOINTS.md, RETRO.md, HANDOVER.md).

#### MP-83 — Stateful workspace with decision-grade records (teach pattern)
- **Stage:** X (pattern reference)
- **Source:** `productivity/teach/SKILL.md`, `LEARNING-RECORD-FORMAT.md`, `MISSION-FORMAT.md`, `RESOURCES-FORMAT.md`
- **What it is:** The current directory is a stateful workspace across sessions: `MISSION.md` (Why, Success looks like, Constraints, Out of scope; ≤ one screen; push back on vagueness: "A bad mission is worse than no mission"), `RESOURCES.md` (annotated high-trust sources, Knowledge vs Wisdom, explicit `## Gaps`), `learning-records/NNNN-slug.md` (ADR-equivalents for *evidence of understanding*, with supersession instead of deletion; "Coverage is not learning. Wait for evidence."), `NOTES.md` (preferences). Lessons are tightly scoped HTML with one tangible win. Quiz rule: answers the same length, correct position varied, no formatting clues.
- **Failure prevented:** multi-session work restarting from zero; records written for coverage rather than evidence.
- **Target:** not a Agentic SDLC skill. Transferable ideas: MISSION's "Success looks like" (observable outcomes) maps to SPEC **Baseline & indicators** (PL↔DP pair); "evidence, not coverage" maps to Rule 2; supersession instead of deletion maps to SPEC revisions after CP2. The quiz-fairness rule applies if `test-strategy` ever generates multiple-choice checks.

---

## 3. Templates and formats worth adapting

| Template | Source | Purpose | Required sections / shape | Key rules |
|---|---|---|---|---|
| **GLOSSARY.md** | `domain-modeling/GLOSSARY-FORMAT.md` | Canonical domain language | `# Context`, 1–2 sentence description, `## Language`, entries `**Term**:` + definition + `_Avoid_:`; optional Relationships, Flagged ambiguities | Opinionated, tight, project-specific only, no implementation detail, inline updates, lazy creation |
| **GLOSSARY-MAP.md** | same | Multi-context index | `## Contexts` (link + one line), `## Relationships` (events/shared types between contexts) | Only with monorepo signals |
| **ADR** | `domain-modeling/ADR-FORMAT.md` | Record hard-to-reverse decisions | `# Title` + 1–3 sentences; optional Status, Considered Options, Consequences | Three-condition gate; `docs/adr/NNNN-slug.md`; scan for highest number |
| **Spec** | `to-spec/SKILL.md` | Buildable plan from a conversation | Problem, Solution, User Stories (long, numbered), Implementation Decisions, Testing Decisions, Out of Scope, Further Notes | No file paths/code except prototype snippets; seams confirmed first |
| **Ticket (local)** | `to-tickets/SKILL.md` | One vertical slice | `# NN: Title`, What to build, Blocked by, Status, AC checkboxes | One file per ticket, dependency-ordered numbering |
| **Agent brief** | `triage/AGENT-BRIEF.md` | Durable AFK contract | Category, Summary, Current behavior, Desired behavior, Key interfaces, Acceptance criteria, Out of scope | Behavioural, no paths/line numbers, independently verifiable ACs |
| **Needs-info** | `triage/SKILL.md` | Request missing info without losing progress | Triage Notes: established so far / still need from you | Specific, actionable questions |
| **Out-of-scope record** | `triage/OUT-OF-SCOPE.md` | Durable rejection memory | `# Concept`, statement, `## Why this is out of scope`, `## Prior requests` | One file per concept; enhancements only; durable reasons |
| **Wayfinder map** | `wayfinder/SKILL.md` | Index of a multi-session decision effort | Destination, Notes, Decisions so far, Not yet specified, Out of scope | Index not store; open tickets found by query |
| **Decision ticket** | same | One decision per session | `## Question`; type label; answer recorded on resolution | Claim first; one per session; refer by name |
| **Questionnaire** | `to-questionnaire/SKILL.md` | Async stakeholder discovery | Purpose, From/To/Use, Context, How to answer, themed sections, Anything else? | One idea per question, most important first, answer stubs |
| **PR body** | `pr/SKILL.md` | Fast-to-review PR | Summary (visual), Evidence (before/after), Merge Danger (door + blast radius) | Smallest visual; screenshots S-tier, execution A-tier |
| **Handoff** | `handoff/SKILL.md` | Portable session continuation | Free-form summary + **Suggested skills** | Temp dir; reference artifacts, don't duplicate; redact; tailor to next purpose |
| **Architecture HTML report** | `improve-codebase-architecture/HTML-REPORT.md` | Visual candidate survey | Header + legend, candidate articles (badges, files, before/after, problem, solution, wins, ADR callout), Top recommendation | Tailwind + Mermaid CDN; strict vocabulary; no paragraphs |
| **Agent skills block** | `setup-matt-pocock-skills/SKILL.md` | Always-loaded pointer block | `## Agent skills` with sub-blocks, each a one-line summary + `See docs/agents/<x>.md` | Edit existing file; update in place |
| **Mission / Learning record** | `teach/*-FORMAT.md` | Stateful multi-session goals and evidence | Mission: Why, Success looks like, Constraints, Out of scope. LR: title + 1–3 sentences | Concrete outcomes; evidence over coverage; supersede, don't delete |
| **Wiki page** | `chief-of-staff/SKILL.md` | Durable agent memory | `index.md` + one page per concern | Dated, commit-anchored claims; cite sources, don't copy |

**Short quotes for the most important rules (MIT, attributed):**

> "Word each question so 'yes' accepts your recommended answer." (`skills/productivity/grilling/SKILL.md`)

> "Finding _facts_ is your job, never the user's." (`skills/productivity/grilling/SKILL.md`)

> "If you catch yourself reading code to build a theory before this command exists, **stop**" (`skills/engineering/diagnosing-bugs/SKILL.md`)

> "Do **not** merge or rerank findings, because the two axes are deliberately separate" (`skills/engineering/code-review/SKILL.md`)

> "One adapter means a hypothetical seam. Two adapters means a real one." (`skills/engineering/codebase-design/SKILL.md`)

> "Expected values must come from an independent source of truth: a known-good literal, a worked example, the spec." (`skills/engineering/tdd/SKILL.md`)

> "Default to building the check over writing the rule." (`skills/engineering/retro/SKILL.md`)

> "Every trigger is an accelerator. Accelerators without brakes make a slop cannon." (`skills/in-progress/software-factory/SKILL.md`)

---

## 4. Scripts and tools

| Script / tool | Source | What it does | Portability | Adaptation notes |
|---|---|---|---|---|
| `hitl-loop.template.sh` | `diagnosing-bugs/scripts/` | Structures a human-driven repro: `step` (instruction + Enter) and `capture VAR` (question → variable), printing `KEY=VALUE` at the end for the agent | Bash, `set -euo pipefail`; POSIX-ish `read -r -p`. Linux/macOS native; Windows needs WSL or Git Bash | Copy into `systematic-debugging/scripts/`. Keep the "capture observations, not credentials" warning. Platform-neutral otherwise. |
| `wizard/template.sh` | `wizard/` | Library + stages: colour detection via `tput`; `banner`, `stage` (clears screen, "Stage i/N"), `say/step/note/warn`, `open_url` (wslview → explorer.exe → xdg-open → open, falls back to printing), `pause`, `confirm` (y/N), `ask` (Readline, offers existing `.env` value), `ask_secret` (hidden), `_existing` (safe dotenv parse; refuses ambiguous escapes), `write_env` (idempotent upsert, creates file 0600, preserves mode and symlink), `set_secret`/`set_var` via `gh` (graceful SKIPPED fallback), `finish` summary. Stages wrapped in `run_wizard` so bash parses the whole file before the first prompt (edits mid-run can't break it). | Bash; cross-platform URL opening incl. WSL; GitHub-only secret writes | Strong candidate for `deployment-pipeline/scripts/wizard-template.sh`. Abstract `set_secret` to a pluggable function (GitHub/GitLab/Azure DevOps CLIs). Keep the "never hand-edit the library" and "run_wizard wrapper" rules. Static verification only (`bash -n`, `shellcheck`). |
| `dependency-cruiser.config.cjs` | `in-progress/setup-ts-deep-modules/` | Five forbidden rules (entry-point boundary from app, across packages with `$1` intra-package freedom, tests through entry points, `tests/` private, no cycles), layering stub, TS resolution options | TypeScript/JS only | Reference template for `codebase-modernization` or `project-context` CONSTRAINTS when the stack is TS; the language-agnostic idea is "public surface = root files; subfolders private; prove it bites". |
| `block-dangerous-git.sh` | `misc/git-guardrails-claude-code/scripts/` | PreToolUse hook blocking destructive git patterns with exit 2 | Claude Code hooks + `jq` only | Mention as optional Claude Code enforcement of the "no push/deploy without approval" rule; not portable to other platforms. |
| `gh` / `glab` command recipes | `setup-matt-pocock-skills/issue-tracker-*.md` | Tracker operations, including native blocking, sub-issues and open-blocker counts | Requires CLIs and auth | Optional export adapter in `writing-plans/references/tracker-export.md`. Keep: database-id gotcha, comment-then-close, fork-target check. |
| HTML report scaffold | `improve-codebase-architecture/HTML-REPORT.md` | Tailwind CDN + Mermaid ESM | Needs a browser and network for CDNs | Pin exact versions; optional output only. |
| Logic prototype HTML | `prototype/LOGIC.md` | Single-file, double-clickable state-model demo | Any browser, no network | Fully portable; recommend as the `brainstorming` prototype default. |
| `agents/openai.yaml` | every skill | Codex display metadata and `allow_implicit_invocation` | Codex only | Not needed; the repo's installer handles platforms. Could be generated if Codex metadata becomes desirable. |
| `setup-pre-commit` (misc) | `misc/setup-pre-commit/SKILL.md` | Husky + lint-staged + Prettier + typecheck + tests | Node ecosystem | Example of a "guardrail" that `retrospective` (MP-74) would propose; not adopted as a skill. |

---

## 5. Vocabularies and principles

| Term | Definition (as used in the framework) | Where it is used |
|---|---|---|
| **Deep / shallow module** | Deep = much behaviour behind a small interface; shallow = interface nearly as complex as the implementation | codebase-design, improve-codebase-architecture, tdd, setup-ts-deep-modules |
| **Module, interface, implementation, depth, seam, adapter, leverage, locality** | See MP-41. "Use these terms exactly." | Same, plus HTML report tone rules |
| **Deletion test** | Delete it mentally: does complexity vanish (pass-through) or reappear in N callers (earning its keep)? | codebase-design, improve-codebase-architecture |
| **Internal vs external seam** | Private seams used by a module's own tests vs the seam at its interface | codebase-design, DEEPENING |
| **Hypothetical vs real seam** | One adapter = hypothetical; two = real | codebase-design, DEEPENING, HTML report phrasings |
| **Dependency categories** | In-process / local-substitutable / remote-but-owned (ports & adapters) / true external (mock) | DEEPENING, DESIGN-IT-TWICE, HTML report badges |
| **Tracer bullet** | A narrow but complete end-to-end slice through every layer; also each TDD cycle "responds to what the last cycle taught" | to-tickets, tdd |
| **Vertical vs horizontal slicing** | Vertical = one behaviour through all layers; horizontal = one layer at a time (anti-pattern) | to-tickets, tdd |
| **Blocking edge, task graph, frontier** | Tickets declare blockers; the graph's frontier is every open ticket whose blockers are done. In grilling, the frontier is every decision whose prerequisites are settled | to-tickets, implement-spec, wayfinder, grilling |
| **Integration branch** | The single branch where all ticket work lands before review/PR | implement-spec, to-tickets (wide refactors) |
| **Wide refactor, blast radius, expand–contract** | A mechanical change too wide for a slice; sequenced expand → migrate batches → contract | to-tickets; blast radius also in pr |
| **Design tree, rounds** | The decision structure walked by grilling, a frontier per round | grilling, ask-matt |
| **Smart zone** | ~150k-token window of sharp reasoning | ask-matt, PHASE-BOUNDARIES |
| **Phase, phase boundary** | A chunk of work in a session; the only place to decide continue/clear/handoff/subagent/compact | ask-matt, PHASE-BOUNDARIES |
| **Primary vs secondary source** | The session as it happened vs a summary; also prototypes and research branches kept as primary sources | PHASE-BOUNDARIES, prototype, wayfinder, retro |
| **Context pointer** | A reference in context that names material and the condition for reaching it | writing-for-agents, implement-spec, chief-of-staff, prototype, wayfinder |
| **Context load vs cognitive load** | Agent token/attention cost vs human "which doc when" cost | writing-for-agents, SKILL-MECHANICS |
| **Leading word** | A pretrained compact concept repeated as a token to anchor behaviour | writing-for-agents (examples: *tight*, *red*, *fog of war*) |
| **Tight / red loop** | Fast, deterministic, agent-runnable / able to fail on *this* bug | diagnosing-bugs |
| **Premature completion, post-completion steps, demand, legwork** | Completion-criterion vocabulary | writing-for-agents |
| **Sediment, no-op, cache, single source of truth** | Pruning vocabulary | writing-for-agents, retro |
| **HITL / AFK** | Human-in-the-loop vs away-from-keyboard work | wayfinder, triage (`ready-for-agent` = AFK), phase boundaries |
| **Fog of war, destination, decision ticket, map** | Large-effort planning vocabulary | wayfinder, root GLOSSARY |
| **One-way / two-way door** | Irreversible vs reversible change | pr |
| **Mechanical vs judgement** | Violation classes: checks vs coding standards | retro, ask-matt |
| **Guardrail, navigation pointer, reviewer agent, context pressure** | Environment vocabulary for retros | retro |
| **Push right, checkpoint, brief** | Human-checkpoint design | loop-me |
| **Brakes (checks, automated review, human review), ratchet, slop cannon** | Automation safety vocabulary | software-factory |
| **Pit of success, no workarounds, write history not the present** | Environment and memory principles | chief-of-staff |
| **Zone of proximal development, fluency vs storage strength** | Teaching principles | teach |

**How the vocabularies work together.** The design vocabulary (codebase-design) and the domain vocabulary (GLOSSARY.md) are two independent layers that every output combines: architecture nouns come from codebase-design ("the Order intake module is shallow"), domain nouns from GLOSSARY ("Order", not "FooBarHandler"). Every planning and execution skill repeats the frontier/graph vocabulary, so a decision tree (grilling), a decision map (wayfinder) and a ticket graph (to-tickets → implement-spec) all use the same idea: work whatever is unblocked. The context vocabulary (smart zone, phase boundary, primary source, context pointer) governs when a skill runs in the same window, a subagent or a new session.

---

## 6. Cross-skill workflow

```
                     setup-matt-pocock-skills (precondition: tracker, labels, domain docs)
                                         │
 On-ramps:  triage (incoming issues) ────┤          diagnosing-bugs (broken) ──▶ fix + regression test ──▶ retro
            wayfinder (huge, foggy) ─────┤                                    └─ "no correct seam" ──▶ improve-codebase-architecture
            improve-codebase-architecture ──▶ "generates an idea" ─┐
                                         ▼                         ▼
 Main flow: grill-with-docs (= grilling + domain-modeling; writes GLOSSARY.md + ADRs)
                 │  (question needs a runnable answer?) ──▶ handoff ▸ prototype ▸ handoff back
                 ▼
            multi-session?  no ──▶ implement (same context: tdd at seams ▸ code-review ▸ commit)
                 │ yes
                 ▼
            to-spec (synthesize, confirm seams) ──▶ to-tickets (tracer bullets + blocking edges, quiz)
                 │                                     [keep grill→spec→tickets in ONE context window]
                 ▼
            implement per ticket (clear between)   OR   implement-spec (task graph, frontier, worktrees,
                                                         merger, one code-review on integration branch)
                 ▼
            pr (Summary visual ▸ Evidence ▸ Merge Danger)
                 ▼
            retro (environment improvements: checks, standards, pointers) ──▶ next build starts better

 Underneath: domain-modeling (domain words) · codebase-design (deep-module words, DEEPENING, DESIGN-IT-TWICE)
 Anywhere:   research (background, cited file) · to-questionnaire (someone else's knowledge) · wizard (human-only steps)
             wait-what (re-pitch) · handoff (portability) · phase-boundary tree at every boundary
```

**Chaining mechanics.**
- **Composition by invocation:** thin wrappers call primitives (`grill-me` → `grilling`; `grill-with-docs` → `grilling` + `domain-modeling`; `triage` step 4 and `wayfinder` grilling tickets → the same pair; `improve-codebase-architecture` → `codebase-design` + `grilling` + `domain-modeling`; `implement` → `tdd` + `code-review`; `implement-spec` implementers → `tdd`, then one `code-review`; `retro` → `writing-for-agents`; `wayfinder` research → `research`, prototype → `prototype`).
- **Hand-off by artifact:** spec and tickets live in the tracker (or `.scratch/`), which is why `/implement` can start in a clean context. `wayfinder` hands off to `to-spec`, never directly to `implement`. `prototype` hands its verdict back via an issue pointer. `triage` produces agent briefs that `implement` picks up; tickets produced by `to-tickets` are already `ready-for-agent` and must **not** be triaged.
- **Shared config:** every engineering skill expects the tracker and label vocabulary from `docs/agents/*.md` and tells the user to run setup if missing.
- **Learning loop:** `diagnosing-bugs` → `retro` (what would have prevented this?) → checks/standards; "no seam" → `improve-codebase-architecture` → back into `grill-with-docs`.

**Mapping to the V.** PL ≈ setup + grill (destination) + prototype + research; AN ≈ grill-with-docs + to-spec (+ wayfinder for Full); DE ≈ codebase-design/Design It Twice + ADRs + to-tickets; BU ≈ implement / implement-spec + tdd + diagnosing-bugs; TE ≈ code-review (two axes; no separate verification or test-plan skill); DP ≈ pr + wizard + retro. **Gaps the Agentic SDLC must fill itself:** explicit gates with recorded approval, AC-n IDs, independent test design (TEST-PLAN), verification evidence log, security review, deployment/rollback/observability, handover/runbook, baseline indicators. Matt has strong "evidence" habits (Phase 1 command shown, PR before/after) but no formal evidence artifact.

---

## 7. What NOT to adopt, and why

1. **Mandatory issue tracker and `gh`/`glab`-first design.** Every engineering skill begins "The issue tracker should have been provided to you. If not, tell the user to run `/setup-...`". The Agentic SDLC has no mandatory tracker. Use local files in `docs/agentic-sdlc/` as the default and offer tracker export as an optional adapter.
2. **`disable-model-invocation`, `argument-hint`, `metadata.credits` frontmatter and `agents/openai.yaml`.** The repo's CLAUDE.md forbids frontmatter beyond `name`/`description`/`license` (loading failures in Claude Code are the stated reason). Approximate user invocation with strict trigger descriptions; put credits in README `## Influences`.
3. **"Call the Skill tool with X" composition.** This is Claude Code wording. Across 8 platforms, write "apply the `<skill>` workflow (see its SKILL.md)" or inline the needed rules in `references/`.
4. **Harness-specific commands (`/clear`, `/compact`, `claude --bg`, `claude agents`, PreToolUse hooks).** Keep the decisions (phase-boundary tree, handoff), drop the command names, or mark them "Claude Code: …" as optional accelerators.
5. **Triage labels and state machine as a skill.** Valuable for maintainers of open-source repos; outside the Agentic SDLC's delivery scope. Keep only the intake routing, redundancy/prior-rejection checks and AI disclaimer.
6. **Wayfinder as a separate skill with tracker labels, sub-issues and assignee claims.** Too heavy and tracker-bound; the router's own docs call it "the most cognitively demanding flow". Absorb the map structure and fog-of-war test into the Full route as an optional MAP.md.
7. **"Refactoring is not part of the loop."** Conflicts with the plan's red-green-refactor and with most TDD literature; adopt a limited local refactor under green and leave structural refactoring to review findings (see MP-53).
8. **Blanket "no file paths" in every planning artifact.** Right for durable SPECs and briefs; wrong for an immediately executed PLAN (Superpowers' exact-paths approach reduces executor guessing). Apply by artifact lifetime.
9. **Prototype/research throwaway branches pushed to the remote.** Pollutes remotes and assumes push rights. Offer a local folder or local branch; push only if the user wants it.
10. **Writing reports to OS temp and auto-opening with `xdg-open`.** Not reliable on remote or headless platforms. Default to repo-relative output when the user wants to keep it, temp otherwise, and print the path.
11. **Unpinned CDN imports in generated HTML (`mermaid@11`, Tailwind play CDN).** Conflict with the repo's pinned-version artifact rules; pin exact versions if adopted.
12. **`teach`, `writing-beats/fragments/shape`, `scaffold-exercises`, `migrate-to-shoehorn`.** Off-topic for software delivery (teaching, prose writing, course content, TS-specific migrations).
13. **`software-factory` as a skill.** A design language for autonomous agent factories, beta, with fast-staling vendor surveys ("Surveyed 2026-10, and not guaranteed to be up to date"). Keep only the brakes, ratchet, question-every-task and cap-loops ideas.
14. **`chief-of-staff` "all work in subagents".** Assumes subagent and background-agent support that several target platforms lack. Keep the wiki-history principle and the tactical/strategic split.
15. **"Do NOT interview the user" as a universal rule for spec writing.** Correct only for synthesize mode; create mode still interviews (plan §5.5 has both).
16. **Single end-of-spec code review only (implement-spec).** The Agentic SDLC's Rule 5 and Superpowers practice need per-task spec-compliance checks; keep Matt's end review in addition.
17. **Fowler smells as hard violations, or a smell list larger than 12.** Matt deliberately keeps them as labelled judgement calls overridable by repo standards; don't escalate them to Critical.
18. **Persona voice and the "Ask Matt" / "Matt Pocock" naming.** Credit the source in Influences; don't present Agentic SDLC skills under the author's name.

---

## 8. Top 15 mechanisms ranked by value to the Agentic SDLC

1. **MP-18/19/20 Grilling frontier rounds with recommended answers, and facts vs decisions:** convergent AN interview that operationalises Rule 3. → `grill-me`
2. **MP-58/59/60 Tight, red-capable feedback loop as a hard Phase 1 gate (ten constructions, completion checklist):** → `systematic-debugging`
3. **MP-68/71 Parallel isolated review axes with no cross-axis reranking and cited briefs (≤400 words, quote spec line / AC-n):** → `multi-axis-code-review`
4. **MP-49 Tracer-bullet vertical slices with blocking edges, prefactor-first and the three-question user quiz:** → `writing-plans`
5. **MP-57 Task-graph execution over the ready frontier (worktree per task, implementer merges integration tip, merger role, context-pointer comms):** → `executing-plans`
6. **MP-03/04 Phase-boundary decision tree, primary/secondary sources and smart-zone context hygiene:** → `agentic-sdlc` (`references/phase-boundaries.md`)
7. **MP-41/42/43/44 Deep-module vocabulary, deletion test, interface-as-test-surface, dependency categories:** → shared reference used by `test-driven-development`, `test-strategy`, `senior-solution-architect`, `codebase-modernization`
8. **MP-54/52 Test anti-patterns (tautological, implementation-coupled, horizontal) and pre-agreed seams with catches/misses notes:** → `test-driven-development` + `test-strategy`
9. **MP-74/75/72 Environment-focused retro (seven categories), mechanical → check vs judgement → standard, reviewer owns standards:** → `retrospective` + `project-context`
10. **MP-24/23/22 ADR three-condition test with minimal format, GLOSSARY format with `_Avoid_`, active domain-modeling moves:** → `senior-solution-architect` + `grill-me` docs mode
11. **MP-73 PR body: smallest visual, tiered before/after evidence, one-way/two-way door and blast radius:** → `shipping-and-handover`
12. **MP-35/32 Durable behavioural agent brief and spec template (long numbered user stories → AC-n source; no file paths in durable artifacts):** → `spec-driven-development` + `writing-plans`
13. **MP-50 Expand–contract sequencing for wide refactors:** → `codebase-modernization` + `writing-plans`
14. **MP-47 Architecture survey with git-history hot-spot scoping, strength-graded candidates, "no interfaces before selection", ADR-on-rejection:** → `codebase-modernization` (inventory mode)
15. **MP-77/79 Automation brakes (checks, automated review, human review; throttle; cap loops) and "prove the rule bites" (pass → fail → pass):** → `deployment-pipeline` + `verification-gate`
