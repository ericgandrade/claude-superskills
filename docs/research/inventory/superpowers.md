# Mechanism Inventory: Superpowers

> Research input for the Agentic V-Method (`docs/plans/2026-11-18-agentic-v-method.md`, sections 3–5).
> This document catalogs concrete, re-implementable mechanisms. It is analysis, not a copy of the source.

| Field | Value |
|---|---|
| Framework | Superpowers ("a complete software development methodology for your coding agents") |
| Author / license | Jesse Vincent and Prime Radiant, MIT License, © 2025 Jesse Vincent |
| Upstream | `github.com/obra/superpowers` |
| Commit inspected | `22f0b46` (Release v7.0.2: brainstorming tuning, harness bootstrap fixes, SDD helper fixes) |
| Inventory date | 2026-11-19 |
| Scope | Every file under `skills/` plus `README.md` |
| Inspected by | Agentic V-Method research wave (inventory task) |

## 1. Files read

Word counts come from `wc -w` at commit `22f0b46`. "Full" means read end to end. "Summary" means read for structure only: the per-harness tool-mapping files and the `diagnosing-superpowers` internals, as the task allowed. Embedded binary-like content (the `<img>` srcset lines in `anthropic-best-practices.md`) was skipped.

| # | File | Words | Read |
|---|---|---:|---|
| 1 | `README.md` | 1,955 | Full |
| 2 | `skills/using-superpowers/SKILL.md` | 487 | Full |
| 3 | `skills/using-superpowers/references/claude-code-tools.md` | 229 | Full (short) |
| 4 | `skills/using-superpowers/references/codex-tools.md` | 691 | Summary |
| 5 | `skills/using-superpowers/references/gemini-tools.md` | 616 | Summary |
| 6 | `skills/using-superpowers/references/antigravity-tools.md` | 203 | Summary |
| 7 | `skills/using-superpowers/references/hermes-tools.md` | 287 | Summary |
| 8 | `skills/using-superpowers/references/muse-tools.md` | 293 | Summary |
| 9 | `skills/using-superpowers/references/pi-tools.md` | 195 | Summary |
| 10 | `skills/brainstorming/SKILL.md` | 2,658 | Full |
| 11 | `skills/brainstorming/builder-check-prompt.md` | 143 | Full |
| 12 | `skills/brainstorming/visual-companion.md` | 1,748 | Full |
| 13 | `skills/brainstorming/scripts/start-server.sh` | 882 | Full |
| 14 | `skills/brainstorming/scripts/stop-server.sh` | 437 | Full |
| 15 | `skills/brainstorming/scripts/server.cjs` | 2,944 | Full |
| 16 | `skills/brainstorming/scripts/helper.js` | 584 | Full |
| 17 | `skills/brainstorming/scripts/frame-template.html` | 866 | Full (CSS class inventory) |
| 18 | `skills/writing-plans/SKILL.md` | 1,630 | Full |
| 19 | `skills/executing-plans/SKILL.md` | 2,936 | Full |
| 20 | `skills/executing-plans/scripts/task-start` | 185 | Full |
| 21 | `skills/executing-plans/scripts/task-done` | 294 | Full |
| 22 | `skills/subagent-driven-development/SKILL.md` | 2,844 | Full |
| 23 | `skills/subagent-driven-development/implementer-prompt.md` | 954 | Full |
| 24 | `skills/subagent-driven-development/task-reviewer-prompt.md` | 1,327 | Full |
| 25 | `skills/subagent-driven-development/re-review-prompt.md` | 706 | Full |
| 26 | `skills/subagent-driven-development/references/batching.md` | 90 | Full |
| 27 | `skills/subagent-driven-development/references/cannot-verify.md` | 85 | Full |
| 28 | `skills/subagent-driven-development/references/final-review.md` | 376 | Full |
| 29 | `skills/subagent-driven-development/references/fix-loop.md` | 683 | Full |
| 30 | `skills/subagent-driven-development/references/handling-reports.md` | 160 | Full |
| 31 | `skills/subagent-driven-development/references/preflight.md` | 229 | Full |
| 32 | `skills/subagent-driven-development/references/resuming.md` | 98 | Full |
| 33 | `skills/subagent-driven-development/scripts/sdd-repo` | 405 | Full |
| 34 | `skills/subagent-driven-development/scripts/sdd-workspace` | 770 | Full |
| 35 | `skills/subagent-driven-development/scripts/task-brief` | 848 | Full |
| 36 | `skills/subagent-driven-development/scripts/review-package` | 387 | Full |
| 37 | `skills/requesting-code-review/SKILL.md` | 423 | Full |
| 38 | `skills/requesting-code-review/code-reviewer.md` | 909 | Full |
| 39 | `skills/receiving-code-review/SKILL.md` | 894 | Full |
| 40 | `skills/test-driven-development/SKILL.md` | 1,464 | Full |
| 41 | `skills/test-driven-development/writing-good-tests.md` | 1,282 | Full |
| 42 | `skills/systematic-debugging/SKILL.md` | 1,444 | Full |
| 43 | `skills/systematic-debugging/root-cause-tracing.md` | 736 | Full |
| 44 | `skills/systematic-debugging/defense-in-depth.md` | 493 | Full |
| 45 | `skills/systematic-debugging/condition-based-waiting.md` | 495 | Full |
| 46 | `skills/systematic-debugging/condition-based-waiting-example.ts` | 666 | Full |
| 47 | `skills/systematic-debugging/find-polluter.sh` | 282 | Full |
| 48 | `skills/verification-before-completion/SKILL.md` | 556 | Full |
| 49 | `skills/dispatching-parallel-agents/SKILL.md` | 860 | Full |
| 50 | `skills/using-git-worktrees/SKILL.md` | 1,064 | Full |
| 51 | `skills/finishing-a-development-branch/SKILL.md` | 1,243 | Full |
| 52 | `skills/writing-skills/SKILL.md` | 2,390 | Full |
| 53 | `skills/writing-skills/references/bulletproofing.md` | 390 | Full |
| 54 | `skills/writing-skills/references/discovery.md` | 1,021 | Full |
| 55 | `skills/writing-skills/references/flowcharts.md` | 168 | Full |
| 56 | `skills/writing-skills/references/graphviz-conventions.dot` | 630 | Full |
| 57 | `skills/writing-skills/references/testing-skills-with-subagents.md` | 1,919 | Full |
| 58 | `skills/writing-skills/references/persuasion-principles.md` | 842 | Full |
| 59 | `skills/writing-skills/references/CLAUDE_MD_TESTING.md` | 814 | Full |
| 60 | `skills/writing-skills/references/anthropic-best-practices.md` | 5,770 | Full (image markup skipped) |
| 61 | `skills/writing-skills/render-graphs.js` | 525 | Full |
| 62 | `skills/diagnosing-superpowers/SKILL.md` | 1,064 | Full |
| 63 | `skills/diagnosing-superpowers/prompts/analyst-common.md` | 251 | Full |
| 64 | `skills/diagnosing-superpowers/prompts/plan-adherence.md` | 260 | Full |
| 65 | `skills/diagnosing-superpowers/prompts/quality-evidence.md` | 231 | Full |
| 66 | `skills/diagnosing-superpowers/prompts/{cost-and-time, repeated-work, request-conflicts, stumbles, skill-timeline, scrub, scrub-audit, similar-session}.md` | 1,743 | Summary |
| 67 | `skills/diagnosing-superpowers/references/{context-safety, github-issues, redaction-policy, session-discovery}.md` | 968 | Context-safety full, rest summary |
| 68 | `skills/diagnosing-superpowers/templates/{bundle-README, case, issue, report}.md` | 1,717 | Report header full, rest summary |

Total skills material: about 61,800 words across 78 files (plus README).

**Summary of the per-harness tool-mapping files (one line, as instructed):** each maps the abstract action vocabulary the skills use ("dispatch a subagent", "create a todo", "invoke a skill", "your instructions file") to one harness's concrete tools and instruction-file name (Claude Code `Agent`/todos/`Skill`; Codex `spawn_agent {fork_turns:"none"}` + `followup_task` with `multi_agent = true`; Gemini `invoke_agent`/`write_todos`/`activate_skill`/`GEMINI.md`; Antigravity `invoke_subagent` + a markdown "task artifact" in place of a todo tool; Hermes `delegate_task`/`AGENTS.md`/`SOUL.md`; Muse `subagent_spawn`/`write_todos`; Pi optional `pi-subagents` and `TODO.md` fallback). The Claude Code file adds one optional pattern: run the whole subagent-driven loop one layer down inside a mid-tier "orchestrator" subagent to save the expensive controller seat.

---

## 2. Mechanism catalog

Stage codes: **PL** Plan · **AN** Analyze · **DE** Design · **BU** Build · **TE** Test · **DP** Deploy · **X** cross-cutting. Target skills use the names in plan §4. "Keep / Change / Drop" notes cover portability across the 8 supported platforms and the V-Method's `AC-n` traceability and three gates.

### A. Bootstrap and cross-cutting discipline

#### SP-01 · Skill check before any response ("1% rule")
- **Stage:** X
- **Source:** `skills/using-superpowers/SKILL.md`
- **What it is:** A bootstrap skill, injected at session start (and re-injected after compaction where the harness supports it), that requires invoking any relevant skill *before any response or action*, including clarifying questions, codebase exploration or file checks. Threshold: "even a 1% chance a skill might apply." After invoking, the agent announces `Using [skill] to [purpose]` and creates one todo per checklist item in the skill. A skill that turns out not to fit may then be dropped. Special rule: before entering any "plan mode", run brainstorming first. The skill opens with a `<SUBAGENT-STOP>` block: a dispatched subagent executing a specific task ignores the bootstrap entirely, so workers do not re-route themselves into process skills.
- **Failure mode prevented:** The agent "just starts" (explores, codes, asks questions) and never loads the process that would have shaped the work. Subagents spinning up brainstorming instead of doing their task.
- **Target:** `agentic-v-method` (router) + `agent-skill-orchestrator`. **Keep:** the announce line and todo-per-checklist step (cheap, auditable). **Keep:** the subagent-stop idea as a sentence in every method skill ("If dispatched as a worker for one task, skip routing."). **Change:** the 1% threshold over-triggers and conflicts with the repo's explicit-trigger skills (e.g. `grill-me`); scope the rule to software-delivery requests detected by the router. **Drop:** reliance on a SessionStart hook; 4 of the 8 target platforms have no such hook, so trigger quality must come from descriptions.

#### SP-02 · Precedence and priority rules
- **Stage:** X
- **Source:** `skills/using-superpowers/SKILL.md`
- **What it is:** Two ordering rules. (1) Precedence: user instructions (CLAUDE.md, AGENTS.md, GEMINI.md, direct requests) override skills, which override default behavior; skip a skill workflow only when the human explicitly says so. (2) Priority: when several skills apply, *process* skills run first (they set the approach), then implementation/domain skills. Canonical mappings: "Let's build X" → brainstorming first; "Fix this bug" → systematic-debugging first.
- **Failure mode prevented:** Skills overriding explicit user wishes; domain skills running before the approach is decided.
- **Target:** `agentic-v-method` (`references/rules.md`). **Keep both** verbatim in spirit. Add the V-Method mapping: "build/feature" → PL sizing; "bug" → `systematic-debugging` (Quick route); "modernize" → Full route with `codebase-modernization`.

#### SP-03 · Action vocabulary plus per-harness tool maps
- **Stage:** X
- **Source:** `skills/using-superpowers/references/*-tools.md`, README install section
- **What it is:** Skills are written in harness-neutral verbs ("dispatch a subagent", "create a todo", "invoke a skill", "your instructions file"). One reference file per harness maps the verbs to concrete tools, including the fallback when a capability is missing (Antigravity has no todo tool → markdown checklist artifact; Pi has no subagent tool → optional package or inline execution). Codex needs `multi_agent = true` and `fork_turns: "none"` so children do not inherit the parent transcript.
- **Failure mode prevented:** Skills that silently break on harnesses with different tool names; fabricated subagent dispatches where none exist.
- **Target:** `agentic-v-method` `references/platforms.md` (new, small). **Keep** the verb vocabulary and an explicit "no subagent tool → do X in a separate pass" fallback in every skill that dispatches. **Change:** map the repo's 8 platforms (Copilot CLI, Claude Code, Codex, OpenCode, Gemini CLI, Antigravity, Cursor, AdaL) instead of Superpowers' list. **Drop** tool-name-level detail that will rot; keep a capability matrix (subagents yes/no, todo tool yes/no, instruction file name).

#### SP-04 · Description = trigger conditions only (never a workflow summary)
- **Stage:** X (skill authoring)
- **Source:** `skills/writing-skills/SKILL.md`, `references/discovery.md`
- **What it is:** A skill's `description` states only when to use it (symptoms, situations, triggers), third person, ideally under 500 characters, max 1024. It never summarizes the process. Evidence cited in the source: a description saying "code review between tasks" caused agents to do one review instead of the two-stage review in the body; removing the workflow summary fixed it. Keyword coverage (error strings, symptoms, synonyms, tool names) and verb-first gerund names (`condition-based-waiting`, not `async-test-helpers`) aid discovery.
- **Failure mode prevented:** Agents executing the description's shortcut and skipping the body.
- **Target:** All 13 new and 6 upgraded skills (Wave 4 quality check). **Keep** the "no workflow summary" rule. **Change:** this repo mandates "This skill should be used when…" instead of "Use when…"; same principle, different opener. Add a lint item to `scripts/validate-skill-yaml.sh` or the Wave 4 review: flag descriptions containing "then", "→", or step lists.

#### SP-05 · Instruction-file and narration hygiene
- **Stage:** X
- **Source:** `skills/executing-plans/SKILL.md`, `skills/subagent-driven-development/SKILL.md`
- **What it is:** Concrete context-budget rules for long runs: narrate at most one short line between tool calls; every tool call re-reads the whole context, so bookkeeping (ledger append) rides in the same call as real work (e.g. the commit); redirect long test output to a file in the workspace and read only its tail; read a task brief, not the whole plan; hand artifacts to subagents as file paths, never pasted text; never paste accumulated prior-task history into a dispatch (the source cites a 42k-character dispatch that was 99% pasted history).
- **Failure mode prevented:** Context exhaustion and early compaction in multi-hour sessions; cost blow-up from re-reading pasted history every turn.
- **Target:** `executing-plans` (both modes), `agentic-v-method` (`phase-boundaries.md`). **Keep** all of it; it is platform-neutral. **Change:** "file in the workspace" → the V-Method workspace path (see SP-36).

### B. PL Plan: intent discovery (brainstorming)

#### SP-06 · "What do you actually know?" triage
- **Stage:** PL
- **Source:** `skills/brainstorming/SKILL.md` (First: What Do You Actually Know?)
- **What it is:** Before replying, classify: (a) everything that matters is in the request ("make the icon cornflower blue") → do it and say what was done; (b) something non-trivial is missing → start the conversation. In case (b), before implementing, four ordered obligations: lay out approaches in their own message and have the human pick; write the design doc (short or full); get approval of the doc; invoke the planning skill. If nothing is open and there is one sensible way, steps 1–3 compress into the first message. Two things are explicitly *not* implementing: an approved spike, and doing the task after the human opts out of questions.
- **Failure mode prevented:** Interrogating people about trivial tasks; building on a thin, unverified belief about what they want.
- **Target:** `agentic-v-method` (Step 1 sizing) and `brainstorming`. **Keep** as the Quick-route entry test. **Change:** map (a) → Quick route, (b) → Standard/Full route sizing questions. The four-step obligation becomes "PL exit = route approved"; the doc-approval step moves to AN Gate 1 for Standard/Full.

#### SP-07 · Look before you ask (recon-first)
- **Stage:** PL / AN
- **Source:** `skills/brainstorming/SKILL.md` (Look Before You Ask; Do recon)
- **What it is:** In an existing project, or when given context (spec, plan, handoff, files, earlier conversation), read the referenced material and the code it connects to until able to explain how the relevant parts work today and what the change touches. Never ask what the project or context already answers; never reopen settled decisions. Later, "do recon" proactively (codebase, user files, web) and report what was looked for and found.
- **Failure mode prevented:** Questions the repo already answers; re-litigating decisions.
- **Target:** `brainstorming`, `grill-me` (docs mode), `spec-driven-development` (synthesize mode). **Keep** verbatim as a rule. It aligns with the repo's zero-config Step 0 Discovery pattern.

#### SP-08 · First-message contract
- **Stage:** PL
- **Source:** `skills/brainstorming/SKILL.md` (Your First Message)
- **What it is:** Two shapes. **(1) They already said what they want:** about 200 words total: echo the request in own words (what, for whom, why), add findings (how it works today, what the change touches), flag anything that would change the request (constraint, conflict, cheaper path), one line inviting corrections; then if the *why* is unknown, one open question about it with no options; if the why is known, ask the single open decision that most changes the build, sketching named options with trade-offs and a pick; if nothing is open, end with the short design (approach, why others don't fit, design in a few lines) and ask for approval, which covers approach plus design. **(2) They haven't:** one open question about the biggest unsettled thing, stating what the answer changes (bakery example). Ending rule: if the human asked for brainstorming, end there; if not, add a one-line opt-out ("Or if you'd rather I just dive in, say so."); taking the opt-out ends the skill after stating any major how-it-gets-made choice in one line.
- **Failure mode prevented:** Wall-of-text openers, menu-steering, forcing a design conversation on someone who wanted action.
- **Target:** `brainstorming`. **Keep** the 200-word cap, echo + findings + one question, and the opt-out line. **Change:** the opt-out should route to the V-Method Quick route (still TDD + verification), not "normal workflow".

#### SP-09 · Question discipline
- **Stage:** PL / AN
- **Source:** `skills/brainstorming/SKILL.md` (The Conversation; Ground to cover)
- **What it is:** Rules: ask only when the answer would change what gets built and neither request nor project answers it; otherwise state the call plus reason as a correctable proposal. Process steps (writing up, file locations, further looking, presentation) are always the agent's call: do them and say so. One question at a time; plain language a little above the human's level; no process jargon; never quote the skill. Until the *why* is known, open questions with no example answers ("their own words carry intent that your options can't"); after, sketch named options with trade-offs and a recommendation. "Just guess" → propose something concrete. Read whether the human wants to own the "how" (medium, tools, platform) or is delegating it; delegated choices go in the design labeled as the agent's call, never as agreed. Ground to cover (territory, never read out as a script): what kind of thing and what makes it special; why now and what success looks like; goals, non-goals, **anti-goals** (what makes it a failure even if it technically works); prior art loved/hated; current state and what was tried; details they care about. Questions are Socratic: built on the last answer or a finding, surfacing a consequence or missed case.
- **Failure mode prevented:** Leading questions, option menus that steer, unasked defaults the human never got to reject, questionnaire-style interviews.
- **Target:** `brainstorming`, `grill-me`, `spec-driven-development` (create mode). **Keep** all; the anti-goals item maps directly to SPEC "Non-goals" and should be added as a SPEC field. **Keep** "a default they never heard is one they couldn't reject" as the rationale for logging agent calls in the SPEC.

#### SP-10 · Approaches in a message of their own
- **Stage:** PL / DE
- **Source:** `skills/brainstorming/SKILL.md` (Lay out the approaches; Size the Work)
- **What it is:** Once *what* is understood and before anything is written up, generate several real alternatives, drop weak ones (including any that undermine the why or that existing work rules out), sketch the remaining 2–3 concretely and grounded in the actual project, each with trade-offs, recommend one with reason, and ask which. If the human delegated the how, say the pick will be used. If there is genuinely one way, say so and explain why others don't fit. The design doc must contain an **Approaches** part: options considered, trade-offs, which was picked, and why.
- **Failure mode prevented:** Single-option anchoring; design docs with no record of rejected alternatives.
- **Target:** `brainstorming` (PL) and `senior-solution-architect` (DE, ADR "Considered options"). **Keep**. The Approaches section is effectively a lightweight ADR; for Full route, promote the pick to `docs/adr/NNNN-*.md`.

#### SP-11 · Incremental playback with ownership labels
- **Stage:** PL / AN
- **Source:** `skills/brainstorming/SKILL.md` (Play It Back)
- **What it is:** As soon as one part is understood (purpose and audience, or one component's behavior), describe it back in about 200–300 words, then return to questions about the next part; playback and questions alternate through the whole conversation. Only what the human said is stated as theirs; anything filled in is labeled a proposal with reason. Each chunk ends by asking what is wrong or missing. Pre-send check: if the chunk describes something they will look at, attach a text sketch (or a visual companion mockup once accepted).
- **Failure mode prevented:** A single giant design dump nobody reads; silently inferred requirements presented as agreed.
- **Target:** `brainstorming`, `spec-driven-development` (presenting SPEC sections before Gate 1). **Keep** the chunk size and the theirs-vs-proposal labeling; in the SPEC, mark agent-proposed ACs (e.g. "AC-4 (proposed)") until Gate 1 approval.

#### SP-12 · Size the work (short vs. full design)
- **Stage:** PL
- **Source:** `skills/brainstorming/SKILL.md` (Size the Work; The Written Design)
- **What it is:** After the approach is picked, state size in plain words (human may override): small change → short doc (what was covered, written down, each point a line or two, no builder check); project → full written design. If work grows mid-task, stop, say so, step up a size. If it is really several independent projects, say so, agree an order, brainstorm one at a time. Full design content: intent and why; goals, non-goals, anti-goals; constraints; approaches; the parts of the how the human decided, as decided; what is left to the builder. Location: `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`, committed; human preference overrides.
- **Failure mode prevented:** Over-documenting small changes; under-documenting projects; monolithic multi-project designs.
- **Target:** `agentic-v-method` sizing (Quick/Standard/Full) and `spec-driven-development`. **Keep** the "step up a size mid-task" rule as part of the change protocol. **Change:** path → `docs/v-method/<YYYY-MM-DD-feature>/SPEC.md`; add the V-Method-required fields Superpowers lacks (numbered `AC-n` Given/When/Then, Boundaries, Rollback, Baseline & indicators, Security & sensitive data).

#### SP-13 · Builder check (fresh-reader doubt pass) with three-pile triage
- **Stage:** AN (pre-Gate 1)
- **Source:** `skills/brainstorming/SKILL.md` (Builder check), `builder-check-prompt.md`
- **What it is:** For a full design only: dispatch a fresh general-purpose subagent playing "a talented [DOMAIN]" who must plan from the document without talking to its author, and must report only questions where a wrong guess would matter, each with why it changes the plan, ranked; skip what the doc leaves to the builder, what the builder can decide, and wording nitpicks; or reply "nothing important left". The author warns the human that a reviewer will read first and there may be one round of questions, and does not hand over the doc until the check returns. Triage into: **answered already** (put the answer in the doc), **minor** (settle it, mark as "my call" in the doc), **theirs** (only the human can answer and it changes the build). Bring "theirs" in one message, most important first; update; hand over with a short list of agent calls to check. Only one round. Without a subagent tool, the author reads the doc as that builder.
- **Failure mode prevented:** Specs with hidden ambiguity discovered mid-build; endless question rounds.
- **Target:** `spec-driven-development` "doubt pass" (plan §5.5). **Keep** the prompt shape, the ranking, the three piles, and the single round. **Change:** add `AC-n` checks to the prompt ("for each AC, could you write a test from it alone?") and require the "my call" list to be recorded in SPEC "Risks & assumptions" so Gate 1 approvers see it.

#### SP-14 · Hard gate: nothing built before design approval
- **Stage:** PL → AN (Gate 1 analogue)
- **Source:** `skills/brainstorming/SKILL.md` (`<HARD-GATE>`, Red Flags)
- **What it is:** Nothing gets built until the human approves the design doc (short or full). "Building" is defined: product code, scaffolding, installing dependencies, creating projects, invoking an implementation skill. Reading and exploring are fine. Exceptions: the human opted out of questions (skill and gate end), or an approved spike (stays labeled throwaway; keeping it is a new request back through the gate). After approval the only allowed next skill is the planning skill. Approval scope rule: "sounds good" to an idea is not approval of a doc that hasn't been written.
- **Failure mode prevented:** Scaffolding before agreement; treating verbal enthusiasm as sign-off.
- **Target:** `agentic-v-method` Gate 1 and `spec-driven-development`. **Keep** the explicit definition of "building" and the approval-scope rule. **Change:** record approval in `GATES.md` (gate, approver, date, evidence, residual risk); freeze the approved SPEC revision.

#### SP-15 · Spike detour
- **Stage:** PL
- **Source:** `skills/brainstorming/SKILL.md` (Spike to feel things out)
- **What it is:** "Agentic work is waterfall, but very, very fast." Offer a quick throwaway build when it is the cheapest way to learn what they want or whether something works. Spikes get no or minimal tests, are not bulletproof, and skip plan/implementation/review. Lessons come back into the conversation. Keeping spike output is a new request through the gate.
- **Failure mode prevented:** Debating something a 10-minute prototype would settle; prototypes silently promoted to production.
- **Target:** `brainstorming` "prototype detour" (plan §5.3). **Keep** all, add: spike code lives on a throwaway branch or `spikes/` directory and is deleted or re-built test-first under BU.

#### SP-16 · Visual companion (just-in-time, per-question)
- **Stage:** PL
- **Source:** `skills/brainstorming/SKILL.md` (Visual Companion), `visual-companion.md`, `scripts/*`
- **What it is:** A local browser tab for mockups. Offered just in time, in its own message with nothing else ("This might be easier if I show you. Want me to open a browser tab with some mockups?"), never upfront, never again after a decline. Per question test: "would they understand this better by seeing it than reading it?" Visual = layouts, mockups, diagrams, side-by-side designs; text = requirements, scope, trade-offs, conceptual choices ("a question about a UI topic is not automatically a visual question"). Loop: confirm server alive (`server-info` exists, `server-stopped` absent) → write a new semantically named HTML fragment to `screen_dir` (never reuse filenames; `layout-v2.html` for iterations; use the file-write tool, not heredocs) → tell the user the URL and what is on screen, end turn → next turn read `state_dir/events` (JSONL click events, cleared on each new screen) merged with terminal text (terminal is primary) → iterate or advance → push a "Continuing in terminal..." waiting screen when going back to text. Design tips: 2–4 options per screen, fidelity matched to question, real content when it matters.
- **Failure mode prevented:** Describing visual choices in prose; stale resolved screens; visual tools used for non-visual questions.
- **Target:** `brainstorming` (optional, low priority). **Keep** the decision rule (per-question visual test) and "text sketch next to any description of something they'll look at". **Drop** the bundled Node server for v1 (see §7): portability across 8 platforms is poor (background-process reaping on Codex, Windows, Gemini).

### C. DE Design: implementation planning (writing-plans)

#### SP-17 · Plan audience and "plan = decisions the implementer cannot make"
- **Stage:** DE
- **Source:** `skills/writing-plans/SKILL.md` (Overview; What a Step Contains)
- **What it is:** Write for an engineer who has seen neither the codebase nor the spec, writes idiomatic code once given the exact interface and test, and makes reasonable choices wherever the plan leaves one. Document only what they cannot know: which files, names and signatures, spec values, which tests prove each task. A step is done when the implementer can write exactly one reasonable thing from it ("unambiguous, not complete"). Two failure poles: a plan longer than the code has written the code (transcript); lines that decide nothing ("TBD", "handle edge cases", "add appropriate validation", "write tests for the above", a type no task defines) are gaps. README framing: plans clear enough for "an enthusiastic junior engineer with poor taste, no judgement, no project context, and an aversion to testing."
- **Failure mode prevented:** Plans that are either code dumps (rot, token cost, reviewer confusion) or vague wish lists.
- **Target:** `writing-plans`. **Keep** both poles and the placeholder blacklist as a self-check. Pair with the proportion check (SP-23).

#### SP-18 · Scope check and file-structure map before tasks
- **Stage:** DE
- **Source:** `skills/writing-plans/SKILL.md` (Scope Check; File Structure)
- **What it is:** If the spec spans several independent subsystems, suggest separate plans, each producing working testable software. Before tasks, map every file to be created or modified with its single responsibility; this locks decomposition. Heuristics: units with clear boundaries and interfaces; smaller focused files (the agent reasons best about what fits in context); files that change together live together; split by responsibility, not layer; in existing code follow established patterns, propose a split only for a file that has become unwieldy.
- **Failure mode prevented:** Monolithic plans; tasks that cut across tangled files.
- **Target:** `writing-plans`, `senior-solution-architect`. **Keep**. Add "File → responsibility → AC-n" columns to the map.

#### SP-19 · Task right-sizing and step granularity
- **Stage:** DE
- **Source:** `skills/writing-plans/SKILL.md` (Task Right-Sizing; Step Granularity), README
- **What it is:** A task is "the smallest unit that carries its own test cycle and is worth a fresh reviewer's gate." Fold setup, configuration, scaffolding and docs into the task whose deliverable needs them; split only where a reviewer could reject one task while approving its neighbor; each task ends with an independently testable deliverable. Each step is one action with a checkable result (write failing test / run it to see it fail / implement minimal code / run tests to see pass / commit), roughly 2–5 minutes.
- **Failure mode prevented:** Micro-tasks that waste review seats; mega-tasks reviewers cannot judge.
- **Target:** `writing-plans`. **Keep** the reviewer-reject test for boundaries. Combine with the V-Method's tracer-bullet vertical slices and `Blocked by:` edges.

#### SP-20 · Plan header contract
- **Stage:** DE
- **Source:** `skills/writing-plans/SKILL.md` (Plan Document Header)
- **What it is:** Every plan starts with: H1 `[Feature] Implementation Plan`; a blockquote "For agentic workers: REQUIRED SUB-SKILL: use [executor A] (recommended) or [executor B]… Steps use checkbox (`- [ ]`) syntax"; **Goal** (one sentence); **Architecture** (2–3 sentences); **Tech Stack**; **Spec** (path to the spec this plan argues from; executors read both); **Global Constraints**; **Review Focus**; `---`. Location `docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md`.
- **Failure mode prevented:** Plans detached from their spec; executors not knowing which skill to use; untracked progress.
- **Target:** `writing-plans` (fixes the stale `superpowers:executing-plans` reference noted in plan §5.7). **Keep** the header; **change** the sub-skill line to `executing-plans` (inline or subagent mode), add `**Route:**`, `**SPEC revision:**` (the frozen Gate 1 revision), and `**Gate 2:** pending/approved` lines.

#### SP-21 · Global Constraints section
- **Stage:** DE
- **Source:** `skills/writing-plans/SKILL.md`; consumed in `subagent-driven-development/SKILL.md` (Review the task) and `task-reviewer-prompt.md` (`[GLOBAL_CONSTRAINTS]`)
- **What it is:** The spec's project-wide requirements (version floors, dependency limits, naming and copy rules, platform requirements), one line each, exact values copied verbatim. Every task implicitly includes them. The controller copies this block verbatim into each task reviewer's prompt as its "attention lens": exact values, formats, and stated relationships ("same layout as X"). Process rules (YAGNI, test hygiene) are not put here because the reviewer template already carries them.
- **Failure mode prevented:** Cross-cutting requirements lost because each task brief only contains task-local text.
- **Target:** `writing-plans` (PLAN.md section) and `executing-plans`. **Keep**. Source the lines from SPEC "Constraints referenced" and `CONSTRAINTS.md` (project-context), each with its origin (`CONSTRAINTS.md#perf`, `SPEC §Constraints`).

#### SP-22 · Review Focus section ("the spec is a vision document")
- **Stage:** DE → TE
- **Source:** `skills/writing-plans/SKILL.md` (header; Self-Review item 4); `requesting-code-review/code-reviewer.md`; `executing-plans/SKILL.md` (Final Review)
- **What it is:** The five input classes or failure modes the spec implies but no task's tests exercise that are most likely to bite a real user, one line each (input/condition + behavior a reasonable person expects), most likely first. Rationale: the spec says what software must do, not everything it will meet; "its silence on an input is not permission for that input to break the program." Each line then gets a test added to the task that owns the code. The final whole-branch reviewer receives this section verbatim and checks each deliberately. An empty section means "checked, found none", not "skipped".
- **Failure mode prevented:** Happy-path-only test suites; reviewers grading findings Minor because "the spec didn't mention it".
- **Target:** `writing-plans` (PLAN.md) and `test-strategy` (TEST-PLAN.md "implicit expectations" rows). **Keep** the cap of five and the "add the test to the owning task" rule. **Change:** give each line an ID (`RF-1…RF-5`) traced in TRACEABILITY.md alongside `AC-n`, so implicit-expectation coverage is visible at Gate 3.

#### SP-23 · Task template with Interfaces block and Expected outputs
- **Stage:** DE
- **Source:** `skills/writing-plans/SKILL.md` (Task Structure; What a Step Contains)
- **What it is:** Each task: `### Task N: [Component]`; **Files** (`Create: exact/path`, `Modify: exact/path:123-145`, `Test: tests/exact/path`); **Interfaces** (`Consumes:` exact signatures from earlier tasks; `Produces:` exact names, parameter and return types later tasks rely on; "a task's implementer sees only their own task; this block is how they learn the names neighbors use"); checkbox steps: (1) write failing test with code including spec values; (2) `Run: <cmd>` + `Expected: FAIL with "<message>"`; (3) "Implement `fn(input: T) -> R` in `path`" with one line on approach only if the signature and test leave a choice, a code block only for an algorithm they don't determine; (4) `Run:` + `Expected: PASS`; (5) commit with exact `git add` paths and message. Step content rules: test step = name and assertions as code with exact values; code step = signature + file + pinned values, implementer writes the body; verification = command + output meaning pass; cross-task reference = point at the Interfaces block, never repeat code. The task heading must use the English literal "Task" because the brief extractor depends on it (SP-38).
- **Failure mode prevented:** Interface drift between tasks; implementers unable to tell if a step succeeded; executors needing the whole plan in context.
- **Target:** `writing-plans`. **Keep** the template almost verbatim. **Add** a `**Satisfies:** AC-2, AC-5` line and `**Blocked by:** Task 1` line per task; commit message template carrying `(Task N, AC-2)`.

#### SP-24 · Plan self-review (five checks)
- **Stage:** DE
- **Source:** `skills/writing-plans/SKILL.md` (Self-Review)
- **What it is:** Run by the author, not a subagent, after the full plan exists: (1) **Spec coverage**: point to a task for each spec requirement, list gaps; (2) **Step scan**: every step yields exactly one reasonable thing, no line deciding nothing, no function body the signature/tests already determine; (3) **Type consistency**: names/signatures match across tasks (`clearLayers()` vs `clearFullLayers()` is a bug); (4) **Review Focus**: every implied input class has a test somewhere, top five uncovered listed; (5) **Proportion**: a plan several times longer than its spec is a transcript, replace bodies with signatures and assertions. Fix inline, no re-review loop; a missing requirement gets a new task.
- **Failure mode prevented:** Plan defects discovered at execution time.
- **Target:** `writing-plans`. **Keep**. Upgrade check (1) to an explicit `AC-n → Task` coverage table written into PLAN.md (feeds TRACEABILITY.md); any AC without a task blocks Gate 2.

#### SP-25 · Execution handoff with recommendation
- **Stage:** DE → BU (Gate 2 analogue)
- **Source:** `skills/writing-plans/SKILL.md` (Execution Handoff)
- **What it is:** After saving and self-reviewing, link the plan and ask the human to review it. If no execution method was supplied, offer exactly two options with costs: **Subagent-driven** (fresh implementer and fresh reviewer per task plus final whole-branch review; most thorough; costs a context per task and per review) and **Native/inline** (agent implements everything; one fresh reviewer on the most capable model at the end; cheapest; works on a mid-tier session model because the plan carries the design). Always recommend one with a one-sentence reason drawn from the plan (interface coupling between tasks, task count, cost of a shipped mistake). If a method was already supplied, only ask whether the plan captures what they want, and wait.
- **Failure mode prevented:** Starting execution on an unreviewed plan; unexplained cost choices.
- **Target:** `writing-plans` → Gate 2 in `agentic-v-method`. **Keep** the two-option menu with recommendation. **Change:** record the approval and chosen mode in GATES.md; on platforms with no subagent tool, present only inline mode and say why.

### D. BU Build: plan execution (executing-plans, subagent-driven-development)

#### SP-26 · Two executors sharing one workspace and ledger
- **Stage:** BU
- **Source:** `skills/executing-plans/SKILL.md` (Why inline; Setup), `skills/subagent-driven-development/SKILL.md` (vs. Executing Plans)
- **What it is:** Inline executor and subagent executor are interchangeable mid-flight: same workspace directory, same ledger format, so a plan can switch executors and resume. Inline "keeps what per-task subagents bought, by other means: the brief is the spec, the ledger is your memory, TDD is the per-task gate, and the final reviewer is the second pair of eyes." Selection: inline when the human chose it or no subagent tool exists ("never fabricate a dispatch"); subagent when a per-task review gate is wanted or the plan is long enough that later tasks would run on a compacted context. Both require mostly independent tasks; tightly coupled work goes back to manual execution or brainstorming.
- **Failure mode prevented:** Executor lock-in; fabricated dispatches on harnesses without subagents.
- **Target:** `executing-plans` (inline mode + subagent mode, plan §5.9). **Keep** the shared-ledger design; it is exactly what an 8-platform skill needs (degrade to inline where subagents are missing).

#### SP-27 · Continuous execution and "rulings, not stalls"
- **Stage:** BU
- **Source:** `skills/executing-plans/SKILL.md`, `skills/subagent-driven-development/SKILL.md` (top)
- **What it is:** Do not pause between tasks to check in; "should I continue?" prompts and progress summaries waste the human's time. Conflicts, ambiguities, plan defects, and caps one would have asked to exceed are decided by the agent: spec = binding authority, plan = its argument, judgment settles what neither answers. Every decision is ledgered as `Ruling: <what was decided> — <why> — <what it costs if wrong>`. "Deviating from the plan without a ledgered ruling is a decision made in secret." Exactly four things stop execution: an irreversible or destructive operation; a security-sensitive action; a side effect outside the worktree that norms say to ask about (merge, push to shared branch, publish); a plan so broken that every path is a guess.
- **Failure mode prevented:** Sessions parked for hours on trivial questions; silent deviations.
- **Target:** `executing-plans`. **Keep** the ruling format and four stops. **Change:** add a fifth V-Method stop: any ruling that would change, drop, or reinterpret an `AC-n` or a Boundary ("Ask first") triggers the change protocol (impact analysis, SPEC revision, re-approval), because the SPEC is frozen after Gate 1. Rulings are later copied into VERIFICATION.md / GATES.md residual-risk.

#### SP-28 · Spec as binding authority; no-spec rulings are provisional
- **Stage:** BU
- **Source:** `skills/executing-plans/SKILL.md`, `skills/subagent-driven-development/SKILL.md` (Setup)
- **What it is:** Read the plan once, note Global Constraints, create a todo per task. If the plan names a spec, read it: internal plan conflicts resolve against the spec. A plan with no reachable spec gets a ledger note, and all rulings made without one are marked provisional.
- **Failure mode prevented:** Plan-internal contradictions resolved arbitrarily.
- **Target:** `executing-plans`. **Keep**; in the V-Method the SPEC always exists for Standard/Full; for Quick route the "agreed acceptance test" plays the spec role.

#### SP-29 · Isolated workspace prerequisite
- **Stage:** BU
- **Source:** `skills/executing-plans/SKILL.md`, `skills/subagent-driven-development/SKILL.md`, `skills/using-git-worktrees/SKILL.md`
- **What it is:** Execution starts in an isolated workspace (worktree or branch). Never implement on main/master without explicit consent.
- **Failure mode prevented:** Half-done work on the default branch.
- **Target:** `executing-plans`. **Keep**. Details in SP-57.

#### SP-30 · Per-plan workspace and progress ledger (compaction recovery)
- **Stage:** BU
- **Source:** `executing-plans/SKILL.md` (Setup), `subagent-driven-development/SKILL.md` (Setup), `references/resuming.md`, `scripts/sdd-workspace`
- **What it is:** Each plan owns a git-ignored directory `<repo-root>/.superpowers/sdd/<plan-basename>/` holding the ledger (`progress.md`), task briefs, implementer reports, and review packages. Ledger first line is its identity: `# SDD ledger — plan: <plan file path>`. Resume rules: if the first line names this plan, every task with a `Task <N>: complete` line is done (do not redo); resume at the first task without one; a task whose last line is a fix round resumes the loop at the next round; a ledger naming another plan (or a stray legacy flat ledger) is left untouched and a fresh one started. After compaction, trust the ledger and `git log` over recollection; if `git clean -fdx` destroyed the workspace, recover from `git log`. Harness todos are a live view; the ledger is the record. Ledger line types: `Task N: complete (commits a..b, tests: <cmd> → <result>)` (inline) or `(commits a..b, review clean | K parked)` (subagent); `Task N: Ruling: …`; `Task N: fix round R/5 (X addressed, Y open — …; commits a..b)`; `Task N: minor (deferred): …`; `Task N: parked — <finding> — Ruling: …`; `Final: fixed <finding> — <test> RED→GREEN, suite N/N`; `Final: minor (deferred): …`; `Final review: self-review (no subagent tool)`; `Pre-flight: no shared interfaces`.
- **Failure mode prevented:** The source calls it "the single most expensive failure observed": controllers that lost their place after compaction re-dispatched entire completed task sequences.
- **Target:** `executing-plans`. **Keep** the ledger and its line grammar (it is plain markdown and portable). **Change:** location → `docs/v-method/<feature>/.work/` (git-ignored) or `.v-method/work/<plan>/`; add `AC-n` to `complete` lines; at finish, promote rulings and test evidence into VERIFICATION.md rather than deleting them with the workspace.

#### SP-31 · Pre-flight conflict scan
- **Stage:** BU (entry)
- **Source:** `subagent-driven-development/references/preflight.md`, `executing-plans/SKILL.md` (Setup)
- **What it is:** Once, before Task 1. Output is a table, not a verdict: one row per pair of tasks sharing a file or interface (the two tasks, what one produces vs. what the other consumes, finding); one row per task for self-consistency (tests specified vs. code specified; files created vs. files later touched). Also flag tasks contradicting Global Constraints and anything the plan mandates that the review rubric treats as a defect (a test asserting nothing, verbatim duplicated logic). "The scan is clean" without rows is not a scan. Table and rulings go in the ledger; tasks sharing nothing → single line `Pre-flight: no shared interfaces`. Rule on each finding with the spec as authority before starting.
- **Failure mode prevented:** Interface conflicts discovered three tasks in, after dependent work was built.
- **Target:** `executing-plans` (both modes). **Keep**; cheap and high-value. It doubles as a Gate 2 sanity check that `writing-plans` can run at the end of self-review.

#### SP-32 · Task brief extraction and BASE recording
- **Stage:** BU
- **Source:** `subagent-driven-development/SKILL.md` (Dispatch the implementer), `scripts/task-brief`, `executing-plans/scripts/task-start`
- **What it is:** Before each task, extract that task's full text from the plan into `task-<N>-brief.md` in the workspace and record BASE (`git rev-parse HEAD`). The brief is the single source of requirements; exact values appear only there; never make a subagent read the whole plan. Inline mode reads the brief for every task, even remembered ones ("what you remember is a summary"). BASE is the start of the task's review range; never `HEAD~1`, which silently drops all but the last commit of a multi-commit task.
- **Failure mode prevented:** Context bloat; implementers working from memory; truncated reviews of multi-commit tasks.
- **Target:** `executing-plans`. **Keep** both. Script portability notes in §4.

#### SP-33 · Step-by-step Expected comparison with three outcomes
- **Stage:** BU
- **Source:** `executing-plans/SKILL.md` (Work the steps)
- **What it is:** Steps run in the plan's RED-GREEN order under TDD. Every step with a command has an `Expected:` line: run, read the output, compare. Outcomes: **matches** → next step; **code is wrong** → systematic debugging, never patch the symptom to match the expected output; **plan is wrong** (contradicts spec, interface mismatch, impossible command) → rule on the smallest change that satisfies the spec, ledger `Task N: Ruling: <finding> — <decision and why>`, continue. Rulings are "carried, not remembered": later tasks touching the same interface read them from the ledger. A test that passes before the implementation exists is a finding about the test.
- **Failure mode prevented:** Fudging code to match a wrong plan; ignoring a wrong-plan signal.
- **Target:** `executing-plans`. **Keep**.

#### SP-34 · Completion contract and test-gated ledger write
- **Stage:** BU → TE
- **Source:** `executing-plans/SKILL.md` (The completion contract; Complete the task), `scripts/task-done`
- **What it is:** Before a task's completion line, all must be true *with evidence in this session*, not inferred from a good-looking diff: every test the brief names exists and ran in this task and the output was read; the final test run passed (`task-done` is that run and writes command + result into the ledger line); every `Expected:` line was compared to real output; every deviation has a `Ruling:` line. `task-done PLAN N BASE -- <test cmd>` runs the tests, stores full output in the workspace, prints the tail, and appends the completion line only if exit status is 0; a failing run records nothing.
- **Failure mode prevented:** Tasks marked done on hope; ledgers claiming completion the tests never showed.
- **Target:** `executing-plans` + `verification-gate`. **Keep**; it is the BU-level form of "evidence before claims". **Change:** the completion line also appends a VERIFICATION.md row (`AC-n | command | result | commit range`).

#### SP-35 · Fresh implementer per task with a 5-part dispatch
- **Stage:** BU
- **Source:** `subagent-driven-development/SKILL.md` (Dispatch the implementer), `implementer-prompt.md`
- **What it is:** Dispatch content is exactly: (1) one line on where the task fits; (2) the brief path introduced as "read this first — it is your requirements, with the exact values to use verbatim"; (3) interfaces and decisions from earlier tasks the brief cannot know; (4) the controller's resolution of any ambiguity noticed in the brief; (5) the report-file path (`task-N-report.md`, named after the brief) and report contract. Plus: pointer to any ledger entry parking a finding in the area; record the implementer's agent identity (fix rounds 1–3 resume it); never dispatch implementers in parallel.
- **Failure mode prevented:** Context pollution across tasks; requirements paraphrased (and mutated) by the controller.
- **Target:** `executing-plans` subagent mode. **Keep**. Add the relevant SPEC excerpt (the task's `AC-n` text) as part (3).

#### SP-36 · Model selection by role
- **Stage:** BU / TE
- **Source:** `subagent-driven-development/SKILL.md` (Model Selection)
- **What it is:** Least powerful model that can do each role. Mechanical implementation (1–2 files, complete spec, or plan contains the full code) → cheapest tier; integration/judgment (multi-file, debugging) → standard; architecture/design and the final whole-branch review → most capable. Reviewers scale with diff size/risk; mid-tier is the floor for reviewers and for implementers working from prose; scoped re-reviews of small fixes → cheap-to-mid. Fix-loop rounds 4–5 → at least one tier above the stuck implementer. Always specify the model explicitly ("an omitted model inherits your session's model — often the most capable and most expensive"). "Turn count beats token price": the cheapest models take 2–3× the turns on multi-step work and cost more overall.
- **Failure mode prevented:** Silent cost blow-up from inherited models; cheap models thrashing on judgment tasks.
- **Target:** `executing-plans` subagent mode, `multi-axis-code-review`. **Keep** the principles as tiers ("cheapest / standard / most capable"), never model names. Many of the 8 platforms cannot pick models per subagent; state "where the platform allows".

#### SP-37 · Implementer status contract and report file
- **Stage:** BU
- **Source:** `implementer-prompt.md`, `references/handling-reports.md`
- **What it is:** Implementer writes a full report to the report file: what was implemented (or attempted), what was tested and results, **TDD Evidence** (RED: command, failing output, why the failure was expected; GREEN: command, passing output), files changed, self-review findings, concerns. It returns at most 15 lines: **Status** `DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT`, commits (short SHA + subject), one-line test summary ("14/14 passing, output pristine"), concerns, report path. BLOCKED/NEEDS_CONTEXT put specifics in the final message. Controller handling: DONE → review package + reviewer; DONE_WITH_CONCERNS → read concerns, address correctness/scope concerns before review, note observations; NEEDS_CONTEXT → supply context, re-dispatch; BLOCKED → diagnose: context problem → more context, same model; needs reasoning → more capable model; too large → split; plan wrong → rule, ledger, re-dispatch with the ruling. Never force the same model to retry unchanged.
- **Failure mode prevented:** Silent low-confidence work; controller context flooded by long reports; retry loops with no change.
- **Target:** `executing-plans` subagent mode. **Keep** the four statuses and TDD Evidence block verbatim (portable, plain text). **Add** "ACs addressed: AC-n…" to the report.

#### SP-38 · Implementer self-review and escalation license
- **Stage:** BU
- **Source:** `implementer-prompt.md`
- **What it is:** "Before You Begin": ask about requirements, approach, dependencies, unclear items now. While working: ask rather than guess; run focused tests while iterating, the full suite once before committing. Code organization: follow the plan's file structure; one responsibility per file; if a file grows beyond the plan's intent, stop and report DONE_WITH_CONCERNS instead of splitting unilaterally; note tangled existing files; don't restructure outside the task. Escalation: "It is always OK to stop and say 'this is too hard for me.' Bad work is worse than no work." Triggers: architectural decision with multiple valid approaches; need code beyond what was provided; uncertainty about correctness; restructuring the plan didn't anticipate; reading file after file without progress. Self-review checklist before reporting: completeness (everything, edge cases), quality (best work, names match what things do), discipline (YAGNI, only requested, existing patterns), testing (real behavior not mocks, TDD followed, comprehensive, output pristine). After review findings: fix, re-run covering tests, append a fix report (changes, covering tests, command, output); reviewers will not re-run tests.
- **Failure mode prevented:** Workers that guess, overbuild, or bluff through tasks beyond them.
- **Target:** `executing-plans` subagent-mode implementer template. **Keep** nearly verbatim.

#### SP-39 · No-subagents contract for workers and reviewers
- **Stage:** BU / TE
- **Source:** `implementer-prompt.md`, `task-reviewer-prompt.md`, `re-review-prompt.md`, `code-reviewer.md`, `subagent-driven-development/SKILL.md`
- **What it is:** Every worker and reviewer prompt carries a section "You Do Not Dispatch Subagents": implementers never spawn helpers, and above all never a reviewer ("a reviewer you spawn duplicates that review at full cost, and its approval counts for nothing"); reviewers never spawn sub-reviewers; if the diff is too large, review in passes and say so. The source reports that in real sessions every worker-spawned reviewer duplicated the controller's review.
- **Failure mode prevented:** Recursive agent spawning, duplicated review seats, cost explosion.
- **Target:** All V-Method subagent templates (`executing-plans`, `multi-axis-code-review`, `test-strategy`, `spec-driven-development` doubt pass). **Keep**.

#### SP-40 · Batching small same-shape work
- **Stage:** BU
- **Source:** `subagent-driven-development/references/batching.md`; `task-reviewer-prompt.md` (batched dispatch check)
- **What it is:** When several tasks are each a small independent edit of the same kind (same one-line fix, constant change, field addition across files), send one dispatch listing every file and its change, and review the diff as one unit. The reviewer then checks file by file: every listed file must have its hunk; an untouched listed file is a Missing finding.
- **Failure mode prevented:** N subagent spin-ups for N trivial edits; batched edits silently skipping files.
- **Target:** `executing-plans` subagent mode, `codebase-modernization` (bulk migrations). **Keep**.

#### SP-41 · Bounded waiting on subagents
- **Stage:** BU
- **Source:** `subagent-driven-development/SKILL.md` (Waiting on dispatched subagents)
- **What it is:** Never poll a wait interface with short timeouts; never sit in one open-ended silent wait. Do local work (ledger, packaging next review, reading reports) while children run. When idle, wait in 5–10 minute stretches; between stretches post one status line and reconcile live children (list them, chase any that finished without reporting).
- **Failure mode prevented:** Lost or stuck children noticed only at session end; polling waste.
- **Target:** `executing-plans` subagent mode. **Keep** "where the platform allows".

### E. TE Test: review loop

#### SP-42 · Task reviewer: two verdicts from one diff read
- **Stage:** TE (per-task, inside BU)
- **Source:** `task-reviewer-prompt.md`, `subagent-driven-development/SKILL.md` (Review the task), `references/cannot-verify.md`
- **What it is:** Reviewer inputs: brief path, report path, review-package path (commit list + stat + `git diff -U10`), BASE/HEAD, global constraints. Method: read the diff file once (its context lines *are* the changed files; read a changed file separately only if a hunk is cut mid-function, and say so); don't re-run git commands; don't crawl the codebase, inspect outside the diff only for a named concrete risk, one focused check per risk, naming both (cross-cutting changes like lock ordering, API contracts, shared mutable state legitimately justify call-site checks); read-only on the checkout. **Do not trust the report**: claims, including design rationales like "kept it simple per YAGNI", never downgrade a finding. **Tests**: don't re-run the suite; run a single focused test only for a specific unanswered doubt; recommend heavy validation instead of running it; warnings/noise in reported output are findings; illegible or missing evidence is reported as a gap, not regenerated ("illegibility of the evidence is not invalidation of it"). **Part 1 Spec compliance**: Missing / Extra / Misunderstood; requirements living outside the diff → `⚠️ Cannot verify from diff` instead of broadening search. **Part 2 Code quality**: separation of concerns, error handling, DRY without premature abstraction, edge cases; tests verify real behavior; structure (one responsibility per file, plan's file structure followed, new files already large or files significantly grown by this change). Every finding and every "yes" carries file:line. Output starts directly with the spec verdict, no preamble or closing summary. Controller rules: never skip the task review; never accept a report missing either verdict; implementer self-review never replaces it; the controller personally resolves every ⚠️ item (it holds cross-task context) and a confirmed gap enters the fix loop.
- **Failure mode prevented:** Spec drift ("close enough"), over-building, reviewers trusting implementer narratives, reviewers burning time re-running suites.
- **Target:** `multi-axis-code-review` (spec-compliance axis + correctness axis) and `executing-plans` subagent mode. **Keep** the two-verdict structure and Missing/Extra/Misunderstood taxonomy. **Change:** spec compliance is checked per `AC-n` the task claims to satisfy (verdict per AC), which feeds TRACEABILITY.md directly.

#### SP-43 · Severity calibration and plan-mandated defects
- **Stage:** TE
- **Source:** `task-reviewer-prompt.md` (Calibration), `code-reviewer.md` (Output Format)
- **What it is:** Categories: **Critical (must fix)**: bugs, security issues, data loss, broken functionality. **Important (should fix)**: "this task cannot be trusted until it is fixed": incorrect or fragile behavior, missed requirement, merge-blocking maintainability damage (verbatim duplicated logic block, swallowed errors, tests that assert nothing). **Minor**: "coverage could be broader", style, polish. If the plan or brief mandates something the rubric calls a defect, report it as Important labeled *plan-mandated* ("the plan's authorship does not grade its own work; the human decides"). Acknowledge strengths first ("accurate praise helps the implementer trust the rest"). Each issue: file:line, what is wrong, why it matters, how to fix if not obvious. Verdict: Task quality `Approved | Needs fixes` (+1–2 sentence reasoning).
- **Failure mode prevented:** Everything-is-critical noise; plans shielding their own bad requirements.
- **Target:** `multi-axis-code-review`. **Keep** definitions; they map 1:1 to the plan's Critical / Important / Minor triage. Gate 3 rule "no open Critical findings" uses exactly these definitions.

#### SP-44 · Controller must not pre-judge findings
- **Stage:** TE
- **Source:** `subagent-driven-development/SKILL.md` (Review the task)
- **What it is:** When writing a reviewer prompt: no open-ended directives without a task-specific reason ("check all uses", "run race tests if useful"); never ask reviewers to re-run tests the implementer ran; never instruct a reviewer to ignore or downgrade a specific issue. Tripwire phrases: "do not flag", "don't treat X as a defect", "at most Minor", "the plan chose" → stop, you are pre-judging, usually to avoid a review loop. False positives are adjudicated in the loop, not suppressed in the prompt.
- **Failure mode prevented:** The builder steering its own reviewer (violates V-Method rule 5 "builder does not grade itself").
- **Target:** `multi-axis-code-review`, `verification-gate`. **Keep** the tripwire phrase list verbatim; strong, cheap, portable.

#### SP-45 · Bounded fix loop with breaker
- **Stage:** TE ↔ BU
- **Source:** `subagent-driven-development/references/fix-loop.md`
- **What it is:** Trigger: spec ❌, any Critical/Important, or a confirmed ⚠️ gap. Exits before the loop: Minor findings → ledger `Task N: minor (deferred): …` (final reviewer triages them; "a roll-up nobody reads is a silent discard"); plan-mandated or plan-conflicting findings → controller rules with spec as authority and ledgers before acting. Loop: a round = one fix dispatch + one scoped re-review; **maximum 5 rounds per task**. Rounds 1–3 resume the original implementer with findings verbatim (if the harness cannot message a live agent, fresh implementer with brief + report + findings; the report file is the persistent memory). Rounds 4–5: fresh implementer on a more capable model with framing "A prior implementer attempted this task [N] times; you own it now." Each round the implementer fixes, re-runs covering tests, appends a fix report; the controller confirms covering tests + command + output are present before dispatching the re-review. Ledger after each round: `Task N: fix round R/5 (X addressed, Y open — <one-liners>; commits a..b)`. The controller never fixes code itself (context stays clean; controller fixes skip review). **Breaker** after round 5: adjudicate each open finding: reviewer wrong or contestable → park with ruling; real but nothing downstream builds on it → park with "real and deferred" ruling; real and load-bearing (later task builds on it, or plan defect) → rule on the smallest unblocking change, ledger, carry into next dispatch; stop only if every path is a guess. Adjudicate only at the cap ("adjudicating earlier to end a loop is pre-judging with a different name"); silent discards forbidden.
- **Failure mode prevented:** Infinite review ping-pong; silently dropped findings; controller self-fixes that skip review.
- **Target:** `executing-plans` subagent mode and `multi-axis-code-review`. **Keep** the cap, escalation at round 4, and breaker taxonomy. **Change:** parked Critical findings automatically block Gate 3 and surface in GATES.md residual risk; the cap could be lowered to 3 for Standard route to save cost.

#### SP-46 · Scoped re-review
- **Stage:** TE
- **Source:** `re-review-prompt.md`
- **What it is:** Inputs: brief, findings under verification (Critical/Important + spec gaps copied verbatim, one per bullet), report file (fix reports appended), FIX_BASE (the head the previous review saw), HEAD, diff file of the fix range. Scope: verdict every finding and inspect only the fix diff for new breakage; issues entirely outside the fix diff go to "Out-of-Scope Observations", non-blocking, ledgered as deferred minors. Output: per-finding `ADDRESSED | NOT ADDRESSED` with file:line ("'Attempted' is not addressed: the specific defect must no longer exist"); New Breakage in the Fix Diff (with severity) or "None"; Out-of-Scope Observations or "None"; round verdict.
- **Failure mode prevented:** Re-reviews that wander and generate new findings forever; "attempted" fixes accepted as done.
- **Target:** `multi-axis-code-review` (re-review mode). **Keep** verbatim structure.

#### SP-47 · Final whole-branch review with a single fix wave
- **Stage:** TE
- **Source:** `subagent-driven-development/references/final-review.md`, `executing-plans/SKILL.md` (Final Review)
- **What it is:** After all tasks: build a review package over `MERGE_BASE..HEAD` (`git merge-base main HEAD`); dispatch the reviewer on the most capable model using `code-reviewer.md`, giving package path, plan and spec paths, the plan's Review Focus verbatim, and pointers to the ledger's deferred-minor, parked, and `Ruling:` lines. **Subagent executor**: one fix subagent with the complete findings list (not one fixer per finding; the source reports a per-finding fix wave that cost more than all tasks combined), then exactly one scoped re-review, then adjudicate residuals as in the breaker; no second fix wave. **Inline executor**: re-grade findings by effect first ("a reviewer who set a finding at Minor because the spec was silent has graded the spec, not the effect"); rule on every "Declined to judge" line; Critical/Important → one fix pass by the implementer where each fix is a reproducing test RED→GREEN plus a green full suite, ledgered `Final: fixed …`; no re-review (covering tests answer "addressed", suite answers "broke nothing"); Minor → `Final: minor (deferred)` and listed, never fixed unasked; unfixed findings → `Final: Ruling:`. Without a subagent tool, perform the review personally as a separate pass, ledger `Final review: self-review (no subagent tool)`, and tell the human it is weaker.
- **Failure mode prevented:** Integration defects invisible to task-scoped reviews; runaway final fix waves; unasked polish.
- **Target:** `multi-axis-code-review` (request mode, whole-branch) feeding Gate 3; `verification-gate`. **Keep** the single-wave rule and "re-grade by effect". **Change:** final review runs the V-Method's five axes (spec compliance vs ACs, design/standards vs ADRs/CONSTRAINTS, correctness, security, simplicity); the self-review fallback must be flagged in GATES.md so the Gate 3 approver sees it.

#### SP-48 · "Rulings I made" and "Deferred minors" final report
- **Stage:** TE → DP
- **Source:** `final-review.md` (Finish), `executing-plans/SKILL.md` (Finish)
- **What it is:** Before deleting the workspace, collect every ledger line containing `Ruling:` (preflight, parked, breaker, final) into the final message under "Rulings I made", in order, each with cost-if-wrong; and every `minor (deferred)` line under "Deferred minors". Both lists exhaustive. "A ruling that dies with the workspace was a decision made in secret." Then delete the plan's workspace (siblings untouched) and hand off to branch finishing.
- **Failure mode prevented:** Agent decisions taken on the human's behalf that never reach the human.
- **Target:** `verification-gate` (Gate 3 record) and `shipping-and-handover`. **Keep** the two exhaustive lists. **Change:** write them into GATES.md (Gate 3 residual risk) and HANDOVER.md "Open risks" instead of only the chat; keep the workspace deletion but only after promotion.

### F. TE Test: requesting and receiving review

#### SP-49 · Review triggers and acting on severities
- **Stage:** TE
- **Source:** `skills/requesting-code-review/SKILL.md`
- **What it is:** Mandatory review: after each task in subagent execution, after a major feature, before merge to main. Optional: when stuck, before refactoring (baseline), after fixing a complex bug. Get BASE/HEAD SHAs; dispatch a reviewer with crafted context (never session history; reviewing inline as coordinator burns the context needed to drive work). Act: fix Critical immediately, fix Important before proceeding, note Minor, push back with reasoning when the reviewer is wrong. Never skip because "it's simple", ignore Critical, proceed with unfixed Important, or argue with valid technical feedback.
- **Failure mode prevented:** Unreviewed merges; review as optional ritual.
- **Target:** `multi-axis-code-review` (request mode). **Keep** the trigger list; add "before Gate 3" as the V-Method mandatory point.

#### SP-50 · Final reviewer template: vision document, "Declined to judge", read-only
- **Stage:** TE
- **Source:** `skills/requesting-code-review/code-reviewer.md`
- **What it is:** Role "Senior Code Reviewer". Sections: What Was Implemented; Requirements/Plan; Git Range; **The spec is a vision document** (for behavior the spec is silent on, judge by what a reasonable person using the software would expect; grade by effect on that person); **Declined to judge** (before the verdict, list every behavior considered and set aside as out of scope, one line each with reason; the executor rules on each; empty list = nothing set aside); **Read-Only Review** (inspect via `git show/diff/log`; need another revision → `git worktree add /tmp/review-<SHA> <SHA>`, never move HEAD); no-subagents; **What to Check** (plan alignment incl. justified vs problematic deviations; code quality incl. type safety; architecture incl. scalability, performance, security, integration; testing incl. integration tests where they matter and all passing; production readiness: migration strategy, backward compatibility, documentation); calibration (flag deviations so intent can be confirmed; flag plan defects separately). Output: Strengths, Issues by severity with file:line/what/why/how, Recommendations, Assessment "Ready to merge? Yes | No | With fixes" + reasoning. DO/DON'T list (no "looks good" without checking; no feedback on unread code).
- **Failure mode prevented:** Reviewers silently scoping out real-user failures; reviewers mutating the checkout.
- **Target:** `multi-axis-code-review`. **Keep** "Declined to judge" and "vision document" verbatim; they are among the most transferable ideas in the framework. **Add** security axis detail from `security-hardening` and a Design & standards axis vs ADRs/CONSTRAINTS.md.

#### SP-51 · Receiving review: verify, don't perform
- **Stage:** TE
- **Source:** `skills/receiving-code-review/SKILL.md`
- **What it is:** Response pattern: READ all feedback without reacting → UNDERSTAND (restate or ask) → VERIFY against codebase reality → EVALUATE (technically sound for *this* codebase?) → RESPOND (technical acknowledgment or reasoned pushback) → IMPLEMENT one item at a time, testing each. Forbidden: "You're absolutely right!", "Great point!", "Thanks for…", any gratitude, "Let me implement that now" before verification. Correct acknowledgments: "Fixed. [what changed]", "Good catch – [issue]. Fixed in [location]." or just the fix. Unclear items: if any item is unclear, implement nothing yet and ask about all unclear items (items may be related). Source handling: human partner = trusted, implement after understanding, still ask on scope; external reviewers = five checks (technically correct here? breaks existing functionality? reason for current implementation? works on all platforms/versions? reviewer has full context?), say "I can't verify this without X" when needed, stop and discuss if it conflicts with prior human decisions. YAGNI check: for "implement properly" suggestions, grep for actual usage; unused → propose removal. Order: clarify first, then blocking (breaks, security) → simple (typos, imports) → complex (refactors), test each, check regressions. Push back when it breaks functionality, reviewer lacks context, violates YAGNI, wrong for the stack, legacy/compat reasons, conflicts with architecture decisions. If the pushback was wrong: state the correction factually, no long apology. Reply to GitHub inline comments in the thread, not top-level.
- **Failure mode prevented:** Sycophantic, blind implementation of review comments; partial implementation of related items.
- **Target:** `multi-axis-code-review` receive mode (plan §5.14). **Keep** all; translate "your human partner" into neutral phrasing; the GitHub-thread detail goes in a platform note.

### G. BU Build: test-driven development

#### SP-52 · TDD iron law with delete-means-delete
- **Stage:** BU
- **Source:** `skills/test-driven-development/SKILL.md`
- **What it is:** "NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST." Code written before its test is deleted: not kept as reference, not adapted while writing tests, not looked at. Applies to new features, bug fixes, refactoring, behavior changes. Exceptions only with human permission: throwaway prototypes, generated code, configuration files. "Violating the letter of the rules is violating the spirit of the rules."
- **Failure mode prevented:** Tests written after the fact that pass immediately and prove nothing.
- **Target:** `test-driven-development` (plan §5.8). **Keep** verbatim. Add the V-Method exception list from plan (pure config/docs) and the Quick-route rule "agreed acceptance test first".

#### SP-53 · Red-green-refactor with verification criteria
- **Stage:** BU
- **Source:** `skills/test-driven-development/SKILL.md`
- **What it is:** RED: one minimal test, one behavior, clear name, real code (mocks only if unavoidable). **Verify RED (mandatory)**: the test *fails* (not errors), the failure message is the expected one, it fails because the feature is missing (not a typo); passes immediately → it tests existing behavior, fix the test; errors → fix and re-run until it fails correctly. GREEN: simplest code to pass; no extra features, refactors, or "improvements" (YAGNI options example). **Verify GREEN (mandatory)**: test passes; other tests pass; output pristine; "other tests" means the project's whole suite (bare `pytest`, `npm test`, `cargo test`), even if the task named one file ("a scope statement bounds the deliverable, not your verification"); any failure seen, including ones not caused by the change, is reported by name ("a red test you watched scroll past and didn't mention is a report falsified by omission"). REFACTOR only after green: remove duplication, improve names, extract helpers, stay green, add no behavior. Bug-fix variant: failing test reproducing the bug first ("Never fix bugs without a test"). When-stuck table: don't know how to test → write the wished-for API/assertion first; test too complicated → design too complicated; must mock everything → too coupled, use dependency injection; huge setup → extract helpers or simplify design. Verification checklist (8 boxes): every new function tested; watched each fail; failed for expected reason; minimal code; all pass; output pristine; real code; edge cases and errors covered. "Can't check all boxes? You skipped TDD. Start over."
- **Failure mode prevented:** Tests that never could fail; "green" claims based on a single file; scope-limited verification hiding regressions.
- **Target:** `test-driven-development`. **Keep** all, especially "fails for the right reason" and "whole suite, report every failure by name".

#### SP-54 · "Name the break" gate for every test
- **Stage:** BU / TE
- **Source:** `skills/test-driven-development/writing-good-tests.md` (Principle 1)
- **What it is:** Before writing a test body, answer: what production change should make this test fail, and is that change a bug or a decision? Gate: cannot name one → redesign around an observable behavior; "the source text changed" → run the artifact and assert effects; only intentional decisions → it is a change detector, test the behavior depending on the decision (not `MAX_RETRIES == 5` but "a failing call is retried 5 times and the 6th never happens"). Derive expectations independently: literals and hand-checked fixtures; table-driven tests with literal `want` values preferred; an expectation computed by the code under test or its helpers is a mirror assertion that always passes. Behavior, not text: never grep a script/skill/config for a line; agent-instruction documents are tested by the consuming agent's behavior; human prose earns no test. Your code, not the framework: test your boundary contract (route registered, query emitted, payload produced); upstream mechanics are their maintainers' tests; one narrow characterization test when upstream surprised you; constructors/getters/constants/forwarding earn tests only if they validate, normalize, default, derive, enforce, or cause side effects.
- **Failure mode prevented:** Tautological tests, change detectors, coverage theater, framework re-testing.
- **Target:** `test-driven-development` and `test-strategy` (as a TEST-PLAN.md quality rule). **Keep** the gate function verbatim in a reference file.

#### SP-55 · "Exercise the real thing" mock discipline
- **Stage:** BU / TE
- **Source:** `writing-good-tests.md` (Principle 2)
- **What it is:** A mock earns no assertions (asserting a `*-mock` test ID proves only that the mock exists). Mock at the right level: list the real method's side effects first; mock the slow/external operation and keep what the test depends on real (example: mocking a catalog swallowed a config write duplicate-detection needed; mock only the server startup instead). Make doubles specific: assert arguments, call counts, order when they are contract; one fixture per branch (success/error/malformed). Mirror real data completely (all documented fields; partial mocks pass while integration breaks). Production classes carry production methods only; test-only cleanup lives in test utilities (`destroy()` called only by tests is a smell). Prefer real components when mock setup outgrows test logic. Gate: list side effects; complete mock responses; test-only methods in test utils; about to assert on a mock → unmock or delete.
- **Failure mode prevented:** Mock-heavy suites that pass while the integrated system is broken.
- **Target:** `test-driven-development`, `test-strategy` (integration-first guidance in plan §5.12). **Keep**.

#### SP-56 · Mutation check and test warning signs
- **Stage:** BU / TE
- **Source:** `writing-good-tests.md` (The Mutation Check; Warning Signs)
- **What it is:** Before finishing a test file, mentally mutate production code; at least one test must fail for each realistic mutation: wrong constant or argument; wrong branch handler; missing state change or side effect; empty/default return; missing validation for zero, empty, nil, unauthorized, malformed input. An uncaught mutation marks unprotected behavior or a tautological test. Warning signs list (11): setup and assertion share the same object; test can fail only via panic/crash/missing selector; fails on every intentional change but never on accidents; expected values hidden behind loops/builders/helpers; greps source text or asserts a removed symbol stays removed; would still matter if only the framework remained; exists for coverage only; asserts a mock test ID; method called only from tests; mock setup > half the test; mocking "just to be safe".
- **Failure mode prevented:** Suites with high coverage and low bug-catching power.
- **Target:** `test-strategy` (review checklist for TEST-PLAN and test code) and `multi-axis-code-review` (test-quality sub-check, including "weakened quality bar" detection). **Keep**; the mutation list is a strong portable checklist.

### H. BU Build: systematic debugging

#### SP-57 · Debugging iron law and four phases
- **Stage:** BU
- **Source:** `skills/systematic-debugging/SKILL.md`
- **What it is:** "NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST." Applies to test failures, production bugs, unexpected behavior, performance, build failures, integration issues; "especially" under time pressure or after a failed fix. Each phase must complete before the next. **Phase 1 Root cause**: read errors and stack traces completely (line numbers, codes); reproduce reliably (exact steps, every time? if not, gather data, don't guess); check recent changes (git diff, commits, dependencies, config, environment); in multi-component systems instrument every boundary (SP-58); trace data flow backward (SP-60). **Phase 2 Pattern**: find similar working code; read reference implementations completely ("don't skim"); list every difference however small; understand dependencies, config, assumptions. **Phase 3 Hypothesis**: one written hypothesis "I think X is the root cause because Y"; smallest possible change, one variable; worked → Phase 4, else new hypothesis, never stack fixes; "I don't understand X" is an allowed statement. **Phase 4 Implementation**: failing test case first (automated or one-off script, via TDD); single fix at the root cause, no "while I'm here" changes; verify (test passes, no other breaks, issue resolved) via the verification skill. Quick reference table: phase → activities → success criteria (understand WHAT and WHY / identify differences / confirmed or new hypothesis / bug resolved, tests pass). "No root cause" protocol: if truly environmental/timing/external, document what was investigated, implement handling (retry, timeout, error message), add monitoring; "95% of 'no root cause' cases are incomplete investigation."
- **Failure mode prevented:** Guess-and-check thrashing; symptom patches; multiple simultaneous changes that hide what worked.
- **Target:** `systematic-debugging` (plan §5.10). **Keep** the phases and success criteria. **Change:** make Phase 1 start with "build a one-command deterministic red loop" (plan's addition), and record the hypothesis log in the ledger when debugging inside BU.

#### SP-58 · Boundary instrumentation for multi-component failures
- **Stage:** BU
- **Source:** `systematic-debugging/SKILL.md` (Phase 1 step 4)
- **What it is:** For pipelines (CI → build → signing; API → service → DB), before proposing fixes, add diagnostics at every component boundary: log data entering and exiting, verify environment/config propagation, check state per layer. Run once to find *where* it breaks, then investigate only that component. Example prints `SET/UNSET` for a secret at each layer (never the value) and shows the break between workflow and build script.
- **Failure mode prevented:** Fixing the wrong layer of a pipeline.
- **Target:** `systematic-debugging`, `deployment-pipeline` (CI failure triage). **Keep**; note the example's good practice of logging presence, not secret values (V-Method rule 7).

#### SP-59 · Three-failed-fixes architectural escalation
- **Stage:** BU → DE
- **Source:** `systematic-debugging/SKILL.md` (Phase 4 steps 4–5; Red Flags)
- **What it is:** If a fix fails: stop and count. Fewer than 3 → back to Phase 1 with the new information. 3 or more → stop and question the architecture; no Fix #4 without discussing with the human. Signals of an architectural problem: each fix reveals new shared state or coupling elsewhere; fixes require "massive refactoring"; each fix creates symptoms elsewhere. Questions: is the pattern fundamentally sound? Are we continuing through inertia? Refactor vs. keep patching? "This is NOT a failed hypothesis - this is a wrong architecture." Human redirection signals that mean "return to Phase 1": "Is that not happening?", "Will it show us…?", "Stop guessing", "Ultra-think this", a frustrated "We're stuck?".
- **Failure mode prevented:** Endless patching of a structurally wrong design.
- **Target:** `systematic-debugging`; escalation path into `agentic-v-method` change protocol (back to DE with an ADR). **Keep** threshold 3 (matches plan §5.10).

#### SP-60 · Backward root-cause tracing
- **Stage:** BU
- **Source:** `systematic-debugging/root-cause-tracing.md`
- **What it is:** Steps: observe symptom → find the immediate cause (the code line) → ask "what called this?" and record the chain → keep tracing up, recording the value passed at each level → find the original trigger; fix at the source, then add defense-in-depth. When manual tracing fails, instrument just *before* the dangerous operation with `console.error` (not a logger that tests may suppress) including the argument, `process.cwd()`, relevant env vars, and `new Error().stack`; run `npm test 2>&1 | grep 'DEBUG …'` and look for test file names, line numbers, repeating parameters. Worked example: an empty `projectDir` resolved `cwd` to the source directory, causing `git init` in the repo; the trigger was a test reading `context.tempDir` before `beforeEach`; fix = getter that throws if accessed early, plus four defensive layers. Decision rule: if you cannot trace one level up, do not "just fix the symptom" (the flowchart's red octagon).
- **Failure mode prevented:** Fixing where the error appears instead of where bad data originates.
- **Target:** `systematic-debugging` (`references/root-cause-tracing.md`). **Keep**; replace the TypeScript specifics with language-neutral wording plus one example.

#### SP-61 · Defense-in-depth validation (four layers)
- **Stage:** BU (post-fix hardening), cross-cutting with security
- **Source:** `systematic-debugging/defense-in-depth.md`
- **What it is:** After finding a root cause from invalid data, validate at every layer the data passes: **Layer 1 entry point** (reject empty, nonexistent, wrong-type input at the API boundary); **Layer 2 business logic** (data makes sense for this operation); **Layer 3 environment guards** (refuse dangerous operations in specific contexts, e.g. no `git init` outside tmpdir when `NODE_ENV=test`); **Layer 4 debug instrumentation** (stack + context logged before the operation). Procedure: trace data flow; map every checkpoint; add validation per layer; test each layer by bypassing the previous one. Claim: each layer caught bugs the others missed (other code paths, mocks bypassing business checks, platform edge cases).
- **Failure mode prevented:** A single validation point bypassed by refactors, mocks, or alternate paths.
- **Target:** `systematic-debugging` and `security-hardening` (input validation guidance). **Keep**; in `security-hardening`, map Layer 1 to OWASP input validation.

#### SP-62 · Condition-based waiting for flaky tests
- **Stage:** BU / TE
- **Source:** `systematic-debugging/condition-based-waiting.md`, `condition-based-waiting-example.ts`
- **What it is:** Replace arbitrary sleeps with polling for the real condition. Helper contract: `waitFor(condition, description, timeoutMs = 5000)` polls every 10 ms, returns the truthy result, throws `Timeout waiting for <description> after <ms>ms`. Domain helpers in the example: `waitForEvent(manager, threadId, type)`, `waitForEventCount(…, count)` (error includes how many were seen), `waitForEventMatch(…, predicate, description)`. Pattern table: wait for event / state / count / file / complex condition. Mistakes: polling at 1 ms (CPU), no timeout, caching state outside the loop. Legitimate arbitrary timeout only when testing timed behavior: first wait for the triggering condition, base the delay on known timing (e.g. 2 ticks × 100 ms), comment why. Reported impact: 15 flaky tests fixed, pass rate 60% → 100%, 40% faster.
- **Failure mode prevented:** Race-condition flakiness that passes locally and fails in CI.
- **Target:** `systematic-debugging` (reference) and `test-strategy` (resilience/flakiness section). **Keep** as a language-neutral reference with the TS helper as the one example.

#### SP-63 · Test-polluter bisection
- **Stage:** BU
- **Source:** `systematic-debugging/find-polluter.sh`, `root-cause-tracing.md`
- **What it is:** When an unwanted file/state appears during a test run (e.g. a stray `.git`), run test files one at a time and stop at the first that creates it. Details in §4.
- **Failure mode prevented:** Hours spent guessing which test pollutes shared state.
- **Target:** `systematic-debugging` (`scripts/`). **Change** to be runner-agnostic (see §4).

### I. TE Test: verification before completion

#### SP-64 · Verification gate function
- **Stage:** TE (and every claim anywhere)
- **Source:** `skills/verification-before-completion/SKILL.md`
- **What it is:** "NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE": if the command was not run in this message, it cannot be claimed. Gate: (1) IDENTIFY the command that proves the claim; (2) RUN the full command fresh; (3) READ full output, exit code, failure count; (4) VERIFY whether output confirms the claim (no → state actual status with evidence; yes → state claim with evidence); (5) only then claim. "Skip any step = lying, not verifying." Claim → evidence table: tests pass ← test output with 0 failures (not a previous run or "should pass"); linter clean ← linter 0 errors; build succeeds ← build exit 0 (linter passing is not a build); bug fixed ← original symptom test passes; regression test works ← red-green cycle verified (write → pass → revert fix → MUST FAIL → restore → pass); agent completed ← VCS diff shows the changes (not the agent's report); requirements met ← line-by-line checklist against the plan (not "tests pass"). Applies before any success claim, expression of satisfaction ("Great!", "Done!"), commit, PR, task completion, moving to the next task, delegating; covers paraphrases and implications.
- **Failure mode prevented:** False "done/fixed/passing" claims; trusting subagent self-reports.
- **Target:** `verification-gate` (plan §5.13). **Keep** the gate and the table verbatim. **Change:** step 4 compares against the specific `AC-n`; step 5 writes a VERIFICATION.md row and updates TRACEABILITY.md; add "requirements met" as the Gate 3 evidence summary.

### J. Parallelism, isolation, and finishing

#### SP-65 · Parallel dispatch for independent problem domains
- **Stage:** BU / TE
- **Source:** `skills/dispatching-parallel-agents/SKILL.md`
- **What it is:** Decision tree: multiple failures? → independent? (no → one agent investigates all) → can they run in parallel without shared state? (no → sequential agents) → parallel dispatch, one agent per domain. Use for 3+ failing test files with different causes or independent subsystem breakages; not for related failures, when full system state matters, during exploratory debugging, or with shared files/resources. Agent task content: specific scope (one file/subsystem), clear goal, constraints ("do NOT change production code"), expected output (summary of root cause and changes). Multiple dispatch calls in one response = parallel. After return: read each summary, check for conflicting edits, run the full suite, spot-check ("agents can make systematic errors").
- **Failure mode prevented:** Serial investigation of independent failures; parallel agents trampling shared files.
- **Target:** `executing-plans` (parallel only across the ready frontier with no shared files, plan §5.9) and `systematic-debugging`. **Keep** the four-part agent task shape and the post-integration checks.

#### SP-66 · Isolated workspace setup with detection and safety checks
- **Stage:** BU (entry)
- **Source:** `skills/using-git-worktrees/SKILL.md`
- **What it is:** Step 0 detect existing isolation: compare resolved `git rev-parse --git-dir` vs `--git-common-dir`; different = already in a linked worktree (skip creation), unless `git rev-parse --show-superproject-working-tree` returns a path (submodule → treat as normal repo); report branch or "detached HEAD, externally managed". In a normal checkout, ask consent unless a preference is declared. Step 1a: use the harness's native worktree tool if one exists (creating raw git worktrees under a harness that manages its own "creates phantom state your harness can't see or manage", called the #1 mistake). Step 1b fallback: directory priority = declared preference > existing `.worktrees/` > `worktrees/` > default `.worktrees/`; verify ignored with `git check-ignore` (if not, add to `.gitignore` and commit first); `git worktree add <path> -b <branch>`; on sandbox permission error, say so and work in place. Step 2 auto-detect setup (`package.json` → npm install; `Cargo.toml` → cargo build; `requirements.txt`/`pyproject.toml`; `go.mod`). Step 3 clean baseline: run tests; failures → report and ask whether to proceed; report format "Worktree ready at <path> / Tests passing (<N> tests, 0 failures) / Ready to implement <feature>".
- **Failure mode prevented:** Nested worktrees, committed worktree directories, dirty baselines that make later failures ambiguous.
- **Target:** `executing-plans` (workspace isolation step). **Keep** detection, ignore check, and baseline. **Change:** offer "branch only" as the default on platforms without worktree support (Cursor, AdaL may not handle extra checkouts well); record baseline test count in VERIFICATION.md as the regression reference.

#### SP-67 · Finishing a branch: exact menu, provenance cleanup, typed discard
- **Stage:** DP
- **Source:** `skills/finishing-a-development-branch/SKILL.md`
- **What it is:** Step 1 run the full suite; failing → report and stop (menu only after green). Step 2 detect environment (git-dir vs common-dir; capture `WORKTREE_PATH` before any `cd`). Step 3 confirm the base branch ("This branch split from <guess> - is that correct?"). Step 4 present exactly: normal repo or named-branch worktree → 1. merge locally, 2. push and create PR, 3. keep as-is; detached HEAD → 1. push as new branch + PR, 2. keep. Discard is never offered; only on explicit request, after listing branch, commits, worktree, and requiring the typed word `discard`. Option 1: from main root, checkout base, pull, merge, re-run tests *on the merged result*; failing → stop, leave branch and worktree; green → cleanup then `git branch -d`. Option 2: push, open PR with the forge CLI following the repo PR template, report URL, keep worktree for PR feedback. Option 3: report preserved paths. Cleanup provenance: only remove worktrees under `.worktrees/` or `worktrees/` (`git worktree remove` + `prune`); others belong to the host. Removal refused due to untracked files → never `--force`; show `git status --porcelain -uall` and offer commit / move / delete. Never force-push on rejection.
- **Failure mode prevented:** Merging red code, merging into the wrong base, destroying uncommitted files, unrequested deletion.
- **Target:** `shipping-and-handover` (plan §5.17). **Keep** the menu, merged-result re-test, typed discard, and provenance cleanup. **Change:** before the menu, require Gate 3 approved in GATES.md; PR body uses the V-Method template (what & why, evidence, rollback, traceability summary).

### K. Meta: authoring and testing skills (applies to building the V-Method itself)

#### SP-68 · TDD for skills (RED baseline, GREEN, REFACTOR)
- **Stage:** X (skill development; Wave 4 of the plan)
- **Source:** `skills/writing-skills/SKILL.md`, `references/testing-skills-with-subagents.md`
- **What it is:** Iron law "NO SKILL WITHOUT A FAILING TEST FIRST", applying to new skills and edits. RED: run pressure scenarios with a subagent *without* the skill, record choices and rationalizations verbatim, identify which pressures caused violations. GREEN: write the minimal skill addressing those exact failures; re-run with the skill; must comply. REFACTOR: capture new rationalizations, add explicit negations, table rows, red flags, description symptoms; re-test until bulletproof. Signs of bulletproof: correct choice under maximum pressure, cites skill sections, acknowledges temptation but complies, meta-test says "skill was clear". Not bulletproof: new rationalizations, argues the skill is wrong, hybrid approaches, asks permission while arguing for violation. Test approach varies by type: discipline (pressure scenarios), technique (application, variation, missing-info), pattern (recognition, counter-examples), reference (retrieval, gap testing). Reported: 6 iterations and 10+ unique rationalizations to bulletproof the TDD skill.
- **Failure mode prevented:** Skills that read well but do not change agent behavior.
- **Target:** `skill-creator` (existing repo skill, outside §4) and plan Wave 4 validation. **Keep** baseline-first testing for the discipline skills (`test-driven-development`, `verification-gate`, `systematic-debugging`, router gates). **Change:** run on at least two platforms, since compliance differs by model/harness.

#### SP-69 · Pressure scenario design
- **Stage:** X
- **Source:** `references/testing-skills-with-subagents.md`, `references/CLAUDE_MD_TESTING.md`
- **What it is:** Scenario recipe: preamble "IMPORTANT: This is a real scenario. You must choose and act."; concrete A/B/C options; real constraints (times, money); real file paths; "What do you do?" not "What should you do?"; no easy out of deferring to the human. Combine 3+ pressures from: time, sunk cost, authority, economic, exhaustion, social, pragmatic. Canonical example: 3 hours / 200 lines / manually tested / 6pm with dinner at 6:30 / forgot TDD → A delete, B commit and test tomorrow, C write tests now. `CLAUDE_MD_TESTING.md` adds a variant campaign: NULL baseline vs soft suggestion vs directive vs emphatic vs process-oriented instruction text, each run on four scenarios (time + confidence, sunk cost + works already, authority + speed, familiarity + efficiency), compared on compliance, then meta-tested.
- **Failure mode prevented:** "Academic" tests where agents recite rules but break them in practice.
- **Target:** Wave 4 evals for the V-Method (e.g. "production is down, skip the SPEC?" for the router; "tests pass, claim done without running?" for `verification-gate`). **Keep** the recipe; store scenarios under each skill's `evals/` or the existing skill-creator eval format.

#### SP-70 · Match the form to the failure; micro-test wording
- **Stage:** X
- **Source:** `skills/writing-skills/SKILL.md` (Match the Form to the Failure; Micro-Test Wording)
- **What it is:** Classify the baseline failure before writing guidance: skips a rule under pressure → prohibition + rationalization table + red flags; complies but wrong output shape → positive recipe/contract stating the output's parts in order (prohibitions backfire: in head-to-head tests the prohibition arm produced more unwanted content than the recipe arm and trended worse than no guidance); omits a required element → structural REQUIRED slot in the template; behavior should depend on a condition → conditional on an observable predicate. Rules: no nuance clauses ("don't X unless it matters" reopens negotiation; one nuance clause degraded a winning recipe from consistent to noisy); exemption clauses don't scope (restructure instead). Micro-test protocol: one fresh-context sample per call with the realistic surrounding context; always a no-guidance control (if the control doesn't fail, don't write the guidance); 5+ reps per variant; manually read every flagged match; variance is a metric (binding wording converges).
- **Failure mode prevented:** Guidance that makes the targeted behavior worse; untested wording.
- **Target:** Authoring guide for all V-Method skills (`docs/guides/quality-standards.md` update) and `skill-creator`. **Keep**; this is the most evidence-backed authoring advice in the corpus. It argues for templates with REQUIRED slots (SPEC, PLAN, GATES) over prose reminders.

#### SP-71 · Persuasion principles, cross-references, token budgets
- **Stage:** X
- **Source:** `references/persuasion-principles.md`, `references/discovery.md`, `references/flowcharts.md`, `references/graphviz-conventions.dot`, `writing-skills/SKILL.md`
- **What it is:** Persuasion (citing Cialdini 2021; Meincke et al. 2025, N=28,000, compliance 33% → 72%): discipline skills use Authority (imperatives, "no exceptions") + Commitment (announce skill use, forced choices, todos) + Social Proof ("X without Y = failure. Every time."); guidance uses moderate authority + unity; collaborative uses unity + commitment; reference uses clarity only; avoid Liking (sycophancy) and Reciprocity; ethics test: would it serve the user if they fully understood it? Cross-references: `**REQUIRED SUB-SKILL:** Use <skill>` / `**REQUIRED BACKGROUND:**`; never `@file` links (force-load context). Token budgets: getting-started <150 words, frequently loaded <200, others <500 (stricter than this repo's 1500–2000). Flowcharts only for non-obvious decisions, loops where an agent might stop early, and A-vs-B choices; never for reference, code, or linear steps; graphviz conventions: diamond = question, box = action, plaintext = literal command, ellipse = state, red octagon = critical warning, doublecircle = start/end. Invoke bundled scripts via interpreter (`bash scripts/x.sh`), since some plugin packagers strip exec bits.
- **Failure mode prevented:** Weak wording ignored under pressure; context burned by force-loaded references; unreadable diagrams.
- **Target:** V-Method authoring conventions (Wave 0 foundations). **Keep** the REQUIRED SUB-SKILL marker convention (with repo skill names, no `superpowers:` prefix), the interpreter-invocation rule, and the flowchart restraint. **Change:** word budgets follow repo rules (1500–2000 target, max 5000) with heavy material in `references/`.

#### SP-72 · Anthropic skill-authoring practices bundled as reference
- **Stage:** X
- **Source:** `references/anthropic-best-practices.md`
- **What it is:** Conciseness ("the context window is a public good"; assume the agent is smart); degrees of freedom matched to fragility (high = text heuristics, medium = parameterized pseudocode, low = exact scripts, "narrow bridge vs open field"); test with every model tier used; progressive disclosure with SKILL.md under 500 lines and references one level deep (nested references get partially read with `head`), table of contents for references over 100 lines; checklist-copying workflows; validator feedback loops ("run validator → fix → repeat"); plan-validate-execute with a machine-checkable intermediate file for batch/destructive operations, verbose validator errors; evaluation-first development with a JSON eval shape (`skills`, `query`, `files`, `expected_behavior[]`), at least three evals; Agent A (author) / Agent B (tester) iteration; scripts that "solve, don't punt" with documented constants (no "voodoo constants"); forward-slash paths; fully qualified MCP tool names `Server:tool`; no time-sensitive statements (use an "old patterns" section); one default plus an escape hatch instead of many options.
- **Failure mode prevented:** Bloated or deeply nested skills; brittle scripts; unevaluated skills.
- **Target:** `docs/guides/skill-anatomy.md` / `quality-standards.md` and `skill-creator`. **Keep** plan-validate-execute (useful for `codebase-modernization` bulk changes and `deployment-pipeline`), one-level references, and the eval JSON shape.

### L. Session forensics (summary only)

#### SP-73 · Evidence-cited session diagnosis
- **Stage:** DP (retrospective) / X
- **Source:** `skills/diagnosing-superpowers/**`
- **What it is (brief):** A forensic workflow for "what went wrong in this session": (1) problem intake one question at a time until a statement names sessions, turn range, expected vs actual, and the observable (wall-clock, tokens, repeated actions); "It took too long" is a complaint, not a problem statement; nothing else starts before the human answers. (2) locate transcripts to verified absolute paths, record rejected candidates. (3) dispatch seven parallel analysts (skill-timeline, plan-adherence, repeated-work, stumbles, quality-evidence, request-conflicts, cost-and-time), each returning `finding / evidence path:line + ≤200-char quote / turns / confidence` plus a `Checked:` line; findings without `path:line` are discarded. (4) fixed-section report. Optional: GitHub issue (approval of exact text), scrubbed export bundle (redaction levels skeleton/evidence/full; scrub + independent scrub-audit loop until CLEAN; placeholders like `<EMAIL-n>`, `<SECRET-n>`, `~` for home paths), similar-session search by signature. Context-safety rules: measure files before reading (`wc -lc`, long-line detection), never `cat`/`grep` raw content, extract fields by line, narrow any >500-character result; read-only. The "quality-evidence" analyst is a ready-made claims audit: claims of done/fixed/passing with no supporting tool result in the same turn; commits whose message claims work not performed; review points acknowledged but not acted on; acceptance criteria met / not met / not checked.
- **Failure mode prevented:** Anecdotal retrospectives; leaking private session data into bug reports.
- **Target:** `retrospective` (plan §5.18). **Keep** "no citation, no finding", the quality-evidence checklist (applied to VERIFICATION.md, commits, and review records instead of raw transcripts), and the plan-adherence categories (skipped / out of order / silently changed / invented / drift after compaction). **Drop** transcript parsing, bundle export and GitHub filing (Superpowers-specific, harness-specific storage formats).

---

## 3. Prompts and templates worth adapting

Short quotes are from MIT-licensed source (© 2025 Jesse Vincent) and marked with their path.

### 3.1 Builder-check prompt (spec doubt pass)
- **Source:** `skills/brainstorming/builder-check-prompt.md`
- **Purpose:** Find ambiguity in a written design before anyone plans from it.
- **Inputs:** `[DOMAIN]` role (e.g. "software engineer"), `[DOCUMENT_PATH]`.
- **Required sections:** role framing ("handed a design document… You will not be able to talk to the person who wrote it"); read instruction; report contract; exclusions; empty-result phrase.
- **Output contract:** ranked list of questions, each with "why the answer changes the plan"; or the literal "nothing important left".
- **Key rule (quote, `builder-check-prompt.md`):** "Report only the questions you'd still need answered before you could plan this well: places where you'd have to guess and a wrong guess would matter."
- **Adaptation:** In `spec-driven-development`, add: "For each AC-n, state whether a test could be written from its text alone; list ACs that are untestable or ambiguous." Keep the single triage round (answered / my call / theirs).

### 3.2 Implementer prompt
- **Source:** `skills/subagent-driven-development/implementer-prompt.md`
- **Purpose:** One fresh worker implements one task test-first and reports compactly.
- **Inputs:** task number/name, `[MODEL]` (required), `[BRIEF_FILE]`, scene-setting context (where it fits, dependencies, architecture), working directory, `[REPORT_FILE]`.
- **Required sections:** Task Description (read the brief) · Context · Before You Begin (ask now) · Your Job (implement exactly, test per TDD, verify, commit, self-review, report) · You Do Not Dispatch Subagents · Code Organization · When You're in Over Your Head · Before Reporting Back: Self-Review · After Review Findings · Report Format.
- **Output contract:** full report in file (implemented, tested + results, TDD Evidence RED/GREEN, files changed, self-review findings, concerns); returned message ≤15 lines: Status `DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT`, commits, one-line test summary, concerns, report path.
- **Key rules (quotes, `implementer-prompt.md`):** "It is always OK to stop and say 'this is too hard for me.' Bad work is worse than no work." · "Never silently produce work you're unsure about."
- **Adaptation:** add `Satisfies: AC-n` to the context block and "ACs addressed" to the report; commit message must carry task and AC IDs; add V-Method rule 7 (no secrets/PII in fixtures or logs).

### 3.3 Task reviewer prompt (spec + quality)
- **Source:** `skills/subagent-driven-development/task-reviewer-prompt.md`
- **Purpose:** Task-scoped gate: does the diff match its requirements (nothing more, nothing less) and is it well built.
- **Inputs:** `[MODEL]`, `[BRIEF_FILE]`, `[GLOBAL_CONSTRAINTS]` (verbatim binding values), `[REPORT_FILE]`, `[BASE_SHA]`, `[HEAD_SHA]`, `[DIFF_FILE]`.
- **Required sections:** What Was Requested · What the Implementer Claims · Diff Under Review (read once; no crawling; named-risk checks only; read-only) · no-subagents · Do Not Trust the Report · Tests (don't re-run; pristine output; illegible ≠ invalid) · Part 1 Spec Compliance (Missing / Extra / Misunderstood; batched file-by-file; ⚠️ for unverifiable) · Part 2 Code Quality (quality, tests, structure) · Calibration · Output Format.
- **Output contract:** `### Spec Compliance` (✅ / ❌ with file:line; ⚠️ Cannot verify list) · `### Strengths` · `### Issues` (Critical / Important / Minor; file:line, what, why, how) · `### Assessment` (Task quality: Approved | Needs fixes; reasoning). First line is the spec verdict; no preamble or narration.
- **Key rules (quotes, `task-reviewer-prompt.md`):** "Treat the implementer's report as unverified claims about the code." · "a stated rationale never downgrades a finding's severity." · "illegibility of the evidence is not invalidation of it."
- **Adaptation:** replace the single spec verdict with a per-AC table (`AC-2: ✅ file:line`, `AC-5: ⚠️ lives in unchanged module X`); this is the raw material for TRACEABILITY.md.

### 3.4 Scoped re-review prompt
- **Source:** `skills/subagent-driven-development/re-review-prompt.md`
- **Purpose:** Verify a fix round without reopening the whole review.
- **Inputs:** `[MODEL]` (cheap-to-mid), `[BRIEF_FILE]`, `[FINDINGS]` (verbatim, one per bullet), `[REPORT_FILE]`, `[FIX_BASE_SHA]`, `[HEAD_SHA]`, `[DIFF_FILE]`.
- **Required sections:** The Task · Findings Under Verification · The Fix · no-subagents · Scope · Tests · Output Format.
- **Output contract:** Finding Verdicts (ADDRESSED | NOT ADDRESSED + file:line) · New Breakage in the Fix Diff (severity) or None · Out-of-Scope Observations or None · Verdict (all addressed, no new Critical/Important | findings remain open, listed).
- **Key rule (quote, `re-review-prompt.md`):** "'Attempted' is not addressed: the specific defect must no longer exist."
- **Adaptation:** use unchanged in `multi-axis-code-review` re-review mode.

### 3.5 Final code-reviewer prompt
- **Source:** `skills/requesting-code-review/code-reviewer.md`
- **Purpose:** Whole-branch (or major feature) review before merge.
- **Inputs:** `[DESCRIPTION]`, `[PLAN_OR_REQUIREMENTS]`, `[BASE_SHA]`, `[HEAD_SHA]`; the executors also add the review-package path, spec path, Review Focus verbatim, and ledger pointers.
- **Required sections:** role · What Was Implemented · Requirements/Plan · Git Range · The spec is a vision document · Declined to judge · Read-Only Review · no-subagents · What to Check (plan alignment, code quality, architecture, testing, production readiness) · Calibration · Output Format · Critical Rules (DO/DON'T).
- **Output contract:** Strengths · Issues (Critical/Important/Minor, each with file:line, issue, why, fix) · Recommendations · Assessment ("Ready to merge? Yes | No | With fixes" + reasoning) · plus the Declined-to-judge list before the verdict.
- **Key rules (quotes, `code-reviewer.md`):** "a reasonable person's expectation is a requirement, and a spec's silence is not permission." · "Before your verdict, list every behavior you considered and set aside as outside the plan or spec, one line each, with the reason."
- **Adaptation:** split into the five V-Method axes; each axis reviewer gets the same skeleton with its own What to Check list; the security axis adds OWASP/SSDF items from `security-hardening`.

### 3.6 Parallel-agent task prompt shape
- **Source:** `skills/dispatching-parallel-agents/SKILL.md`
- **Purpose:** Self-contained brief for one independent problem domain.
- **Required parts:** focused scope (one file/subsystem, failing test names and messages pasted), clear goal, explicit constraints, expected return (root cause + changes summary); explicit anti-shortcut ("Do NOT just increase timeouts - find the real issue").
- **Adaptation:** reuse for `systematic-debugging` fan-out and `executing-plans` ready-frontier parallelism.

### 3.7 Pressure-scenario template (skill evals)
- **Source:** `writing-skills/references/testing-skills-with-subagents.md`
- **Required parts:** "IMPORTANT: This is a real scenario. Choose and act." · concrete situation with times, costs and paths · 3+ pressures · forced A/B/C choice · "Choose A, B, or C. Be honest." · meta-test follow-up ("How could that skill have been written differently…?").
- **Adaptation:** Wave 4 evals for router gates and discipline skills.

### 3.8 Analyst prompt (diagnosis) as retrospective template
- **Source:** `diagnosing-superpowers/prompts/analyst-common.md`, `plan-adherence.md`, `quality-evidence.md`
- **Output contract (structure):** `## <Dimension> findings` then bullets `finding / evidence: path:line — "quote ≤200 chars" / turns / confidence: high|medium|low`, closing `Checked: <what was examined>`; `- none found` allowed.
- **Adaptation:** `retrospective` findings format: `finding / evidence: <artifact path:line or commit SHA> / AC or task / confidence`, with the rule that unsourced findings are dropped.

### 3.9 Document templates (structures)
- **Design doc (brainstorming):** intent and why · goals / non-goals / anti-goals · constraints · Approaches (options, trade-offs, pick, reason) · decided parts of the how · left to the builder · agent calls list.
- **Plan (writing-plans):** header (Goal, Architecture, Tech Stack, Spec, Global Constraints, Review Focus) + tasks (Files, Interfaces, checkbox steps with Run/Expected, commit).
- **Ledger (executors):** identity line + typed lines listed in SP-30.
- **Worktree ready report / finishing menus:** fixed strings in SP-66 and SP-67.

---

## 4. Scripts and tools

| Script | What it does | Inputs → outputs | Portability | Adaptation |
|---|---|---|---|---|
| `subagent-driven-development/scripts/sdd-repo` | Single source of truth for "which repository": `git rev-parse --show-toplevel` of the current directory, never inferred from the plan path. `--with-commit` also refuses a repo with no HEAD. Error message covers both "wrong directory" and "new project, run git init + first commit", and appends git's own first error line. | `[--with-commit]` → prints repo root; exit 2 with guidance | bash + git; works on Git Bash | Keep as a helper inside `executing-plans/scripts/`; the "plan path never picks the repo" rule matters for worktree setups. |
| `…/scripts/sdd-workspace` | Resolves and creates the per-plan workspace `<root>/.superpowers/sdd/<plan-basename>/`. Writes a `plan-path` marker (repo-relative or absolute) so two plans with the same basename get `-<parentdir>` then `-<parentdir>-N` suffixes; marker-less legacy dirs are adopted. Creates a self-ignoring `.gitignore` (`*`) only if absent. Lives in the working tree, not `.git/`, because Claude Code blocks agent writes under `.git/`. `-C DIR` like `git -C`. Prints `C:/…` paths via `cygpath -m` on Windows. | `[-C DIR] PLAN_FILE` → workspace absolute path | bash; Windows-aware | Keep; rename base to `.v-method/work/` (or `docs/v-method/<feature>/.work/`). The collision handling and self-ignoring `.gitignore` are worth copying exactly. |
| `…/scripts/task-brief` | awk extraction of one task's text. Task heading regex `^#+\s+Task\s+<ID>` where ID is alphanumeric, optionally dot-separated, containing a digit (so "Task Overview" is not a task). Whole-string ID match (Task 6 ≠ 6b, Task 1 ≠ 1.1); deeper sub-task headings (`#### Task 7a` under `### Task 7`) stay in the brief; fenced code blocks hide headings; an unclosed fence that would swallow later tasks aborts with exit 4; if no "Task" headings exist, lists up to five task-shaped headings (likely translated "Tarea 1") with a hint that the English word is required. | `[-C DIR] PLAN_FILE N [OUTFILE]` → `task-N-brief.md`, prints `wrote <path>: <n> lines`; exit 3 if not found | bash + POSIX awk; plan path passed via `ENVIRON` to keep Windows backslashes | Keep; V-Method PLAN.md must keep the `### Task N:` heading convention. If PLAN uses `tasks/NN-*.md` files, the brief is simply that file and the script is unnecessary. |
| `…/scripts/review-package` | Writes the reviewer's single input file: `# Review package: base..head`, `## Commits` (`git log --oneline`), `## Files changed` (`git diff --stat`), `## Diff` (`git diff -U10`). Guards: BASE and HEAD must resolve; BASE must be an ancestor of HEAD; range must be non-empty (exit 3). Default name `review-<base7>..<head7>.diff` so re-reviews get fresh files. | `[-C DIR] PLAN_FILE BASE HEAD [OUTFILE]` → path + commit count + bytes | bash + git | Keep; essential for the "builder does not grade itself" separation and context hygiene. Without bash, the skill text gives the three git commands redirected to one file. |
| `executing-plans/scripts/task-start` | One call: runs `task-brief` and prints `brief: <path>` and `base: <HEAD sha>` (read from the repo `sdd-repo` names). Rationale: every tool call re-reads context, so combine. | `PLAN_FILE N` → brief path + BASE | bash | Keep in `executing-plans`. |
| `executing-plans/scripts/task-done` | Runs the task's test command, saves full output to `task-N-tests.log`, prints the last 5 lines, and only on exit 0 appends `Task N: complete (commits <base7>..<head7>, tests: <cmd> → <last non-blank output line>)` to the ledger (creating it with its identity line if missing). Non-zero exit records nothing and propagates the status. | `PLAN_FILE N BASE -- <cmd…>` → ledger line; exit = test status | bash + git | Keep; extend to also append a VERIFICATION.md row with the task's `AC-n`. This script is the cleanest mechanical form of "evidence before claims". |
| `systematic-debugging/find-polluter.sh` | Lists test files matching a glob (also tries the pattern with `**/` collapsed so top-level files match), runs each with `npm test <file>` one by one, and stops at the first after which the pollution path exists; skips (with a warning) when pollution pre-exists. Prints the polluter and follow-up commands; exit 1 when found, 0 when clean. | `<path_to_check> <test_glob>` → polluter file name | bash; hard-codes `npm test`; linear, not true bisection | Change: take the test command as a parameter (`-- pytest {file}`), clean the pollution between runs, and keep linear search (simple, deterministic). |
| `systematic-debugging/condition-based-waiting-example.ts` | Reference implementations of `waitForEvent`, `waitForEventCount`, `waitForEventMatch` (10 ms poll, 5 s default timeout, descriptive timeout errors) plus before/after usage. | Library code (not run) | TypeScript, depends on the Lace codebase types | Keep as an example only; add one Python equivalent at most (the authoring guide warns against multi-language dilution). |
| `brainstorming/scripts/start-server.sh` | Launches the visual-companion server. Flags: `--project-dir` (persist under `<project>/.superpowers/brainstorm/<pid>-<epoch>/`, remember port and key in `.last-port`/`.last-token`), `--host` (default 127.0.0.1), `--url-host`, `--idle-timeout-minutes` (default 240), `--open`, `--foreground`, `--background`. Auto-foreground under `CODEX_CI` and Windows-like shells (they reap background processes); `umask 077`; per-start server instance ID; owner PID = harness grandparent (disabled on MSYS); waits up to 5 s for `server-started`, then checks the process survives about 2 s. | flags → JSON `{type, port, url (with ?key=), screen_dir, state_dir}` or `{error}` | bash + Node; fragile across harnesses | Not adopted in v1 (see §7). |
| `brainstorming/scripts/stop-server.sh` | Stops a session's server only if the PID's command line carries this session's `--brainstorm-server-id` (refuses stale PIDs after reboot or PID reuse); SIGTERM, then SIGKILL after about 2 s; writes `server-stopped` marker; deletes the session dir only if under `/tmp`. | `<session_dir>` → `{"status": stopped | not_running | stale_pid | failed}` | bash, `/proc` or `ps` | The "prove the PID is ours before signaling" pattern is worth reusing in any V-Method script that manages processes. |
| `brainstorming/scripts/server.cjs` | Zero-dependency Node HTTP + RFC 6455 WebSocket server. Serves the newest `.html` in `content/` (fragments wrapped in `frame-template.html`; full documents served as-is) with `helper.js` injected; `/files/*` for assets with symlink, hard-link and path-escape checks; 32-byte random session key required as `?key=` or HttpOnly SameSite=Strict cookie (constant-time compare; defeats DNS rebinding); WebSocket origin check; security headers (no-referrer, no-store, frame DENY, CORP same-origin); appends click events with a `choice` to `state/events`; clears events on each new screen; broadcasts `reload` on file changes (100 ms debounce); idle shutdown (default 4 h) and owner-PID watchdog (60 s check); preferred-port reuse with one random fallback; optional telemetry logo (disable with `SUPERPOWERS_DISABLE_TELEMETRY`, `DISABLE_TELEMETRY`, or `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`). | env vars → running server + `state/server-info` | Node ≥ 18 | Not adopted; note the telemetry default as a reason (§7). |
| `brainstorming/scripts/helper.js` | Browser client: WebSocket with exponential backoff (500 ms → 30 s), "Companion paused" overlay after 15 s disconnected, status pill, event queue while offline, `toggleSelect` (single/multi-select within `.options`/`.cards`), `window.brainstorm.send/choice` API. | n/a | Browser | Not adopted. |
| `brainstorming/scripts/frame-template.html` | CSS theme (light/dark via `prefers-color-scheme`) and frame with header, branding slot, status pill and `<!-- CONTENT -->`; component classes `.options/.option/.letter`, `.cards/.card/.card-image/.card-body`, `.mockup/.mockup-header/.mockup-body`, `.split`, `.pros-cons`, `.mock-nav/.mock-sidebar/.mock-content/.mock-button/.mock-input`, `.placeholder`, `.subtitle/.section/.label`. | n/a | Static | Not adopted. |
| `writing-skills/render-graphs.js` | Extracts all ```` ```dot ```` blocks from a skill's SKILL.md and renders SVGs via graphviz `dot` (separately or `--combine` into clusters) into `<skill>/diagrams/`. | `<skill-dir> [--combine]` → SVG files | Node ESM + graphviz installed | Optional for maintainers; the repo prefers mermaid/ASCII in skills. Not needed at runtime. |

**Cross-cutting script design rules observed (all worth copying into V-Method scripts):** one-call combination of related steps (each tool call re-reads context); invoke via `bash script` not a bare path (packagers strip exec bits); `-C DIR` instead of `cd DIR;` compounds (harness allowlists can't match varying compounds); explicit exit codes per failure class (2 usage, 3 not found/empty range, 4 malformed input); never infer the repository from a file path; print Windows-native paths when `cygpath` exists; outputs are short single lines naming the file written.

---

## 5. Rationalization and red-flag tables (consolidated, deduplicated)

Grouped by theme. "Reality" is a paraphrase unless quoted. Sources: UP = using-superpowers, BR = brainstorming, EP = executing-plans, SDD = subagent-driven-development, RQ = requesting-code-review, RC = receiving-code-review, TDD = test-driven-development, WGT = writing-good-tests, DBG = systematic-debugging, VBC = verification-before-completion, WT = using-git-worktrees, FIN = finishing-a-development-branch, WS = writing-skills (+ references), DIAG = diagnosing-superpowers.

### 5.1 Skipping process / skill routing
| Thought | Reality | Source |
|---|---|---|
| "This is just a simple question" / "doesn't count as a task" | Questions and actions are tasks; check for skills. | UP |
| "I need more context first" / "Let me explore / gather information first" / "I can check git/files quickly" | The skill check comes before clarifying questions and exploration; skills say how to explore. | UP |
| "This doesn't need a formal skill" / "The skill is overkill" | If a skill exists, use it; simple things become complex. | UP |
| "I remember this skill" / "I know what that means" | Skills evolve; knowing a concept is not using the skill; read the current version. | UP |
| "I'll just do this one thing first" / "This feels productive" | Check before doing anything; undisciplined action wastes time. | UP |
| "The problem is obvious, skip intake" / "I'll sweep everything and ask at the end" | The problem statement scopes everything; ask first. | DIAG |

### 5.2 Intent and design (PL/AN)
| Thought | Reality | Source |
|---|---|---|
| "I'll offer a menu of what they might want" | Options steer; get them describing first. | BR |
| "I'll fill in sensible defaults" | Fine, but say them out loud: "A default they never heard is one they couldn't reject." | BR |
| "I've answered their questions, so I'll write the doc" | Lay out approaches first, in a message of their own. | BR |
| "I should explain the process first" | Ask the question; the process shows itself. | BR |
| "They said 'sounds good' to the idea" | Approval covers only what was shown; an unwritten doc is not approved. | BR |
| "The spike works, I'll keep building on it" | Keeping it is a new request; back through the gate. | BR |
| "They're away, so I'll reconstruct what they wanted" | Write the questions and stop. | DIAG |

### 5.3 Test-first discipline
| Thought | Reality | Source |
|---|---|---|
| "Too simple to test" | Simple code breaks; the test takes 30 seconds. | TDD |
| "I'll test after" / "Tests after achieve the same goals" | Tests-after pass immediately and prove nothing; they answer "what does this do?", not "what should this do?" | TDD, WS |
| "Already manually tested" / "Manual test faster" | Ad hoc, unrecorded, not re-runnable; doesn't prove edge cases. | TDD |
| "Deleting X hours is wasteful" | Sunk cost; keeping untrusted code is the waste. | TDD |
| "Keep as reference, write tests first" | You'll adapt it; that's testing after; delete means delete. | TDD, WS |
| "Need to explore first" | Fine; throw the exploration away, then TDD. | TDD |
| "Test hard = design unclear" | Listen to the test: hard to test = hard to use. | TDD |
| "TDD will slow me down" / "being pragmatic, not dogmatic" | TDD is the pragmatic path; shortcuts mean debugging in production. | TDD |
| "Existing code has no tests" | You're improving it; add tests. | TDD |
| "It's about spirit, not ritual" / "This is different because…" | Violating the letter is violating the spirit. | TDD, WS |
| "The plan's code is right, skip watching the test fail" | A test never seen failing proves nothing. | EP |
| "A green run of my test file is enough" | Run the project's whole suite and report every failure by name. | TDD |
| "Mock it just to be safe" / "assert the mock rendered" | Mocks earn no assertions; mock only the slow/external level. | WGT |

### 5.4 Debugging
| Thought | Reality | Source |
|---|---|---|
| "Issue is simple, don't need process" / "Emergency, no time" | Simple bugs have root causes; systematic is faster than thrashing. | DBG |
| "Just try this first, then investigate" / "Quick fix for now" | The first fix sets the pattern. | DBG |
| "I'll write the test after confirming the fix" | Untested fixes don't stick. | DBG |
| "Multiple fixes at once saves time" | You can't isolate what worked. | DBG |
| "Reference too long, I'll adapt the pattern" | Partial understanding guarantees bugs; read it completely. | DBG |
| "I see the problem, let me fix it" / "It's probably X" | Seeing symptoms is not understanding the root cause. | DBG |
| "One more fix attempt" (after 2+) | 3+ failures = architectural problem; question the pattern. | DBG |
| "Just increase the timeout" | Wait for the real condition. | DBG (parallel-agents example, condition-based-waiting) |

### 5.5 Claims and verification
| Thought | Reality | Source |
|---|---|---|
| "Should work now" / "Tests should pass, the change was trivial" | Run the verification; "should" is not evidence. | VBC, EP |
| "I'm confident" | Confidence is not evidence. | VBC |
| "Linter passed" | A linter is not a compiler/build. | VBC |
| "Agent said success" | Verify independently via the VCS diff. | VBC |
| "Partial check is enough" / "just this once" / "I'm tired" | Partial proves nothing; no exceptions. | VBC |
| "Different words, so the rule doesn't apply" | Spirit over letter; paraphrases count. | VBC |
| "Tests passed earlier this session" | A green run only proves the tree it ran on. | FIN |
| "The merged-result failure is probably flaky" | A failing merged result stops everything. | FIN |

### 5.6 Execution and the ledger
| Thought | Reality | Source |
|---|---|---|
| "I remember what Task N says" | You remember a summary; read the brief. | EP |
| "I'll run the full suite at the end instead of per step" | Per-step runs show which step broke it. | EP |
| "The plan is wrong here, I'll just do the right thing" | Do it and ledger the ruling; unledgered deviation is secret. | EP |
| "I'll write the ledger lines after a few tasks" / "Ledger bookkeeping is overhead" | Compaction doesn't wait; controllers without a ledger re-dispatched whole task sequences. | EP, SDD |
| "Let me check in before the next task" | Only the four stops stop you. | EP |
| "I'll fix it myself, dispatching is overhead" | Controller fixes pollute context and skip review. | SDD |

### 5.7 Review
| Thought | Reality | Source |
|---|---|---|
| "Close enough on spec compliance" | Spec gaps = not done; fix or reach the cap and adjudicate. | SDD |
| "One more round will converge" | Past the cap the failure is structural; adjudicate. | SDD |
| "The reviewer will just find something new anyway" | Scoped re-reviews can't wander; out-of-scope goes to the ledger. | SDD |
| "This finding is obviously wrong, I'll drop it" | Adjudicate only at the cap, always ledgered. | SDD |
| "The fix was small, skip the re-review" | Unreviewed fixes are how regressions land. | SDD |
| "Reviews slow the loop down" | Without reviews it is unverified churn. | SDD |
| "The implementer spawned its own reviewer — extra assurance" | Duplicate seat; a defect to flag. | SDD |
| "I read my own diff carefully; the final reviewer is redundant" | Same author, same blind spots. | EP |
| "Subagents are expensive, I'll skip the final review too" | One whole-branch review is the floor. | EP |
| "The reviewer said Minor, so it's Minor" | The label may grade the spec's silence; re-grade by effect. | EP |
| "The fix is obvious, no failing test needed" | The failing test is the only proof the finding was real and is gone. | EP |
| "I'll fix the minors too while I'm in there" | Ledger them; the human decides. | EP |
| "I'll just review the diff myself" / "the reviewer needs my session history" | Dispatch with crafted context, never history. | RQ |
| "You're absolutely right!" / "Thanks for catching that!" | Performative; state the fix or push back with evidence. | RC |
| "Implement items 1–3 now, ask about 4–5 later" | Clarify all unclear items first; they may be related. | RC |

### 5.8 Workspace and integration
| Thought | Reality | Source |
|---|---|---|
| "I'm obviously not in a worktree" | Run the detection commands. | WT |
| "`git worktree add` is quicker than finding the native tool" | Bypassing the native tool creates phantom state. | WT |
| "The worktree directory is surely ignored" | Run `git check-ignore`. | WT |
| "Baseline tests can wait" | A dirty baseline makes every later failure ambiguous. | WT |
| "They obviously want it merged" / "I'll offer to discard it" | Integration is the human's decision; discard only on explicit request with typed `discard`. | FIN |
| "'Yeah, get rid of it' counts as confirmation" | Only the typed word authorizes deletion. | FIN |
| "The PR is up, the worktree is clutter" | PR feedback is fixed there. | FIN |
| "This other worktree looks stale" | Clean only what you created. | FIN |
| "Removal refused — `--force` finishes the cleanup" | Those files exist nowhere else. | FIN |
| "The base branch is obviously main" / "Force-push will fix the rejection" | Confirm the base; investigate the moved remote. | FIN |

### 5.9 Skill authoring
| Thought | Reality | Source |
|---|---|---|
| "Skill is obviously clear" / "I'm confident it's good" | Clear to you is not clear to other agents; test it. | WS |
| "It's just a reference" / "Academic review is enough" | References have gaps; reading is not using. | WS |
| "Testing is overkill" / "No time" / "Too tedious" / "I'll test if problems emerge" | Untested skills always have issues; test before deploying. | WS |
| "Batching skills is more efficient" | Test each skill before the next. | WS |
| "Small, targeted edit, no restructuring needed" (to a skill, during diagnosis) | Not your call; report evidence. | DIAG |

### 5.10 Red-flag phrase lists (stop signals)
- **Verification:** "should", "probably", "seems to"; "Great!", "Perfect!", "Done!" before evidence; any wording implying success without a run (VBC).
- **Debugging:** "quick fix for now", "just try changing X", "add multiple changes, run tests", "skip the test, I'll manually verify", "I don't fully understand but this might work", "pattern says X but I'll adapt it", listing fixes before investigation (DBG).
- **TDD:** code before test; test passes immediately; can't explain why the test failed; "tests added later" (TDD).
- **Controller pre-judging (in a reviewer prompt):** "do not flag", "don't treat X as a defect", "at most Minor", "the plan chose" (SDD).
- **Human redirections meaning "back to Phase 1":** "Is that not happening?", "Will it show us…?", "Stop guessing", "Ultra-think this", "We're stuck?" (DBG).

---

## 6. Cross-skill workflow

### 6.1 Triggers (from descriptions)
- `using-superpowers`: start of any conversation (bootstrap; injected by hooks on most harnesses).
- `brainstorming`: before any creative work (features, components, behavior changes, planning anything new, also non-software).
- `writing-plans`: a spec or requirements exist for a multi-step task, before touching code.
- `using-git-worktrees`: starting feature work needing isolation, or before executing plans.
- `subagent-driven-development`: executing plans with independent tasks in the current session.
- `executing-plans`: executing a plan inline as the implementer (human chose inline, or no subagent tool).
- `test-driven-development`: implementing any feature or bugfix, before implementation code.
- `systematic-debugging`: any bug, test failure, unexpected behavior, before proposing fixes.
- `verification-before-completion`: about to claim complete/fixed/passing, before commits or PRs.
- `requesting-code-review` / `receiving-code-review`: completing tasks or before merge / receiving feedback.
- `dispatching-parallel-agents`: 2+ independent tasks without shared state.
- `finishing-a-development-branch`: implementation complete, tests pass, integration decision needed.
- `writing-skills`: creating, editing, or verifying skills.
- `diagnosing-superpowers`: a session went wrong and the human wants to know why.

### 6.2 Handoffs and terminal states
```
using-superpowers (bootstrap, every session)
  └─ "build X" ─▶ brainstorming
        ├─ quick clear task ─▶ do it (still TDD + verification)          [exit: done]
        ├─ opt-out ─▶ normal workflow                                      [exit: skill ends]
        ├─ spike ─▶ throwaway build ─▶ back into conversation
        └─ approaches ▶ size ▶ design doc ▶ (builder check) ▶ HARD-GATE approval
              └─ ONLY next skill: writing-plans
                    └─ plan + self-review ▶ human review + choose executor
                          ├─ subagent-driven-development ┐
                          └─ executing-plans (inline)     ┤ both: using-git-worktrees first,
                                                          │ load test-driven-development,
                                                          │ shared workspace + ledger,
                                                          │ pre-flight scan, task loop,
                                                          │ systematic-debugging on wrong output,
                                                          │ verification-before-completion per task,
                                                          │ final whole-branch review via
                                                          │ requesting-code-review/code-reviewer.md,
                                                          │ "Rulings I made" + "Deferred minors"
                                                          └─▶ finishing-a-development-branch
                                                                 └─ merge / PR / keep / (discard on request)
                                                                    [terminal: worktree cleaned or preserved]
  └─ "fix bug" ─▶ systematic-debugging ─▶ test-driven-development (regression test) ─▶ verification-before-completion
        └─ 3+ failed fixes ─▶ stop, discuss architecture with the human
  └─ multiple independent failures ─▶ dispatching-parallel-agents ─▶ integrate + full suite
  └─ "what went wrong?" ─▶ diagnosing-superpowers ─▶ report (optional issue / bundle)
```

### 6.3 Gate equivalents in Superpowers vs. the V-Method
| Superpowers checkpoint | Who decides | V-Method equivalent |
|---|---|---|
| Approach pick (own message) | Human | PL route + AN design choice; ADR in DE |
| Design-doc approval (HARD-GATE) | Human | **Gate 1: SPEC approved** (adds AC-n, rollback, indicators) |
| Plan review + executor choice | Human | **Gate 2: PLAN approved** |
| Per-task review (spec + quality), fix loop | Fresh reviewer subagent + controller | TE micro-gate inside BU |
| Final whole-branch review + single fix wave | Most capable reviewer + executor | **Gate 3 input** (plus test-strategy, verification-gate, security) |
| "Rulings I made" list | Human reads after the fact | GATES.md residual risk, read *before* Gate 3 approval |
| Integration menu | Human | DP `shipping-and-handover` |

Superpowers has no PL indicators, no rollback field, no `AC-n` IDs, no traceability matrix, no security lens, no deployment/observability stage, and no retrospective; those are the V-Method's additions on top of this chain.

---

## 7. What NOT to adopt, and why

1. **The "1% chance" mandatory bootstrap and its SessionStart hook injection.** Over-triggers (every question routes through skills), conflicts with this repo's explicit-trigger skills (`grill-me`), and depends on hooks most of the 8 target platforms lack. Use precise descriptions plus the router instead.
2. **`superpowers:` namespaced cross-references and `docs/superpowers/…` paths.** Replace with plain repo skill names and `docs/v-method/<feature>/` (or discovered project conventions).
3. **Visual companion server (Node WebSocket server, launch scripts, frame template).** About 6,000 words of code to maintain; background-process behavior differs per harness (Codex and Windows reap processes, Gemini/Copilot need foreground plus harness backgrounding); security surface (session keys, cookies) to audit; and the logo is fetched from the vendor's site by default (telemetry with opt-out env vars), which is unsuitable for client environments. Keep only the per-question "would seeing help?" rule and text sketches.
4. **Model-name-specific guidance and nested-orchestrator trick.** Claude Code's three-level subagent nesting (`CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH`) is harness-specific; keep tier language only.
5. **Per-harness tool-mapping files at tool-name granularity.** They rot quickly; keep a capability matrix.
6. **Hard 5-round fix cap for every route.** Costly on Standard route; make the cap route-dependent (e.g. Quick: inline only, Standard: 3, Full: 5).
7. **Deleting the workspace (and with it the ledger) at the end.** Conflicts with V-Method traceability; promote rulings, evidence and deferred minors into VERIFICATION.md, GATES.md and HANDOVER.md first, then delete the scratch.
8. **Complete code in plan steps (older Superpowers style; README still says "complete code").** The current skill already moved to signatures + tests; keep the newer rule and the proportion check.
9. **Very low word budgets (<150/<200/<500 words).** Conflict with this repo's 1500–2000-word standard; keep the progressive-disclosure intent instead.
10. **"Never thank" / forbidden-phrase lists as literal bans in user-facing tone.** Keep the substance (verify, then act; no performative agreement) but phrase as a positive contract (SP-70 says prohibitions backfire on shaping problems).
11. **Transcript forensics, scrubbed bundle export, GitHub issue filing (diagnosing-superpowers).** Vendor-support tooling tied to harness session storage formats; the retrospective should audit V-Method artifacts and git history instead.
12. **Test-polluter script hard-coded to `npm test`, TypeScript-only examples.** Generalize or present as one example per technique.
13. **Brainstorming for non-software work ("a talk, a business, a renovation").** Out of scope for a software V-Method; keep the repo's brainstorming general but route only software delivery into the V-Method.
14. **"Continuous execution, never check in" applied across stage boundaries.** Valid inside BU; never skips Gate 1/2/3 or the change protocol.

---

## 8. Top 15 mechanisms for the Agentic V-Method (ranked)

1. **SP-64 Verification gate function + claim→evidence table** → `verification-gate`
2. **SP-30 Per-plan progress ledger with typed lines and compaction recovery** → `executing-plans`
3. **SP-42 Task reviewer with spec (Missing/Extra/Misunderstood) + quality verdicts, "do not trust the report"** → `multi-axis-code-review` / `executing-plans`
4. **SP-27 Rulings-not-stalls with `Ruling: what — why — cost if wrong` and the four stop conditions (+ AC change → change protocol)** → `executing-plans`
5. **SP-22 Review Focus ("the spec is a vision document") with tests added to owning tasks** → `writing-plans` / `test-strategy`
6. **SP-50 "Declined to judge" list in the final reviewer** → `multi-axis-code-review`
7. **SP-53 Red-green-refactor with "fails for the right reason" and whole-suite verification, failures reported by name** → `test-driven-development`
8. **SP-23 Task template with Files, Interfaces (Consumes/Produces) and Run/Expected steps** → `writing-plans`
9. **SP-45 Bounded fix loop (resume → escalate at round 4 → breaker adjudication, never silent discards)** → `executing-plans` / `multi-axis-code-review`
10. **SP-13 Builder check with three-pile triage (answered / my call / theirs), single round** → `spec-driven-development`
11. **SP-54 + SP-56 "Name the break" gate and mutation check** → `test-driven-development` / `test-strategy`
12. **SP-57 + SP-59 Four-phase debugging with 3-failed-fixes architectural escalation** → `systematic-debugging`
13. **SP-34 Completion contract with test-gated ledger write (`task-done`)** → `executing-plans` / `verification-gate`
14. **SP-48 Exhaustive "Rulings I made" + "Deferred minors" final report** → `verification-gate` (GATES.md) / `shipping-and-handover`
15. **SP-67 Finishing menu with merged-result re-test, typed `discard`, provenance-based cleanup** → `shipping-and-handover`

Honorable mentions: SP-44 controller anti-pre-judging tripwires (`multi-axis-code-review`); SP-31 pre-flight conflict scan (`executing-plans`); SP-51 receiving-review protocol (`multi-axis-code-review`); SP-70 match-the-form-to-the-failure (authoring guide).
