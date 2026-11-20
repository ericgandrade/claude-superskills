# AI-Native Software Delivery Methods (2025–2026): Structure and Vocabulary

**Purpose:** Evidence base for decision D10 (the final structure of the Agentic SDLC; see `docs/plans/2026-11-19-agentic-sdlc-depth-pass.md`). The question: what stage sequence, artifact names, human checkpoints and right-sizing rules have the AI-native methods that developers actually use converged on? A developer who knows Spec Kit, Kiro or AI-DLC should be able to pick up the Agentic SDLC and feel at home.

**Date:** 2026-11-20. **Scope:** GitHub Spec Kit, AWS Kiro, AWS AI-DLC, BMad Method, OpenSpec, Agent OS, Tessl, Google Conductor, Anthropic (Claude Code best practices and the AI-native SDLC playbook), Factory.ai, Sonar AC/DC, Thoughtworks Technology Radar, Martin Fowler / Birgitta Böckeler, the SDAD and Agentic Agile-V papers, and vendor lifecycle diagrams (Microsoft, GitLab, Atlassian, Google).

**Method and evidence quality.** Three tiers, marked in the text:

- **[R] Repository read.** Shallow clones of the default branch on 2026-11-20, docs read directly: `github/spec-kit` (commit `a4d5712`, CHANGELOG 1.4.3 of 2026-11-19), `awslabs/aidlc-workflows` (`1c557ea`, v2.11.4 of 2026-11-13), `Fission-AI/OpenSpec` (`0c737dc`, 2.1.1), `buildermethods/agent-os` (`e892e61`, v3.0). The BMad summary uses this repository's own inventory (`docs/research/inventory/bmad.md` §5, commit `e435a22`).
- **[P] Primary page fetched:** GitHub README pages (star counts), Anthropic's AI-native SDLC playbook, Claude Code best-practices docs, the Conductor README.
- **[S] Search summary only.** This session's network blocked kiro.dev, aws.amazon.com, martinfowler.com, thoughtworks.com, sonarsource.com, arxiv.org, github.blog and docs.factory.ai, so those claims come from search-result summaries of the primary pages. They are cited to the primary URL, but they need checking against the page before anyone quotes them.

All text is summarized, not copied. Fetched content was treated as data, not instructions.

---

## 1. Key findings

1. **The AI-native core sequence has converged:** *specify (what/why) → plan or design (how) → tasks (ordered, checkable steps) → implement → verify against the spec*. Spec Kit, Kiro, OpenSpec, Conductor, Agent OS (v2), BMad and AI-DLC's Inception/Construction all follow it under different labels. The verbs **specify, plan, tasks, implement** and the files **`spec.md`, `plan.md`, `tasks.md`** are the de facto standard vocabulary. Kiro's **`requirements.md` / `design.md` / `tasks.md`** is the main alternative set.
2. **At lifecycle level, the leaders have moved back to classic SDLC words.** Anthropic's AI-native SDLC playbook (Aug 2026) uses **Plan → Design → Build → Test → Deploy → Maintain** as a loop. Spec Kit's own "Agentic SDLC" guide (Nov 2026) maps its practice onto **Planning → Requirements → Design → Development → Testing → Deployment → Maintenance**. Neither invents stage names. AWS's AI-DLC is the exception: it uses **Inception / Construction / Operation**, and its newer terms (*bolts*, *units of work*, *intents*, *spaces*) carry a real learning cost.
3. **Human checkpoints have converged on four approvals:** spec approval, plan approval (before code), PR approval/merge, and production-release authorization. An optional fifth go/no-go decision at intake is spreading (Spec Kit `assess`, Anthropic's accepted `intent.md`, AI-DLC Ideation hand-off).
4. **Right-sizing is now table stakes.** Every major method has a light path and a full path: Spec Kit's shorter and full paths, Kiro's Quick Spec and Feature Spec, AI-DLC's 11 profiles from `express` to `enterprise`, BMad's Quick Flow, Method and Enterprise tracks, and Anthropic's rule that a small bounded fix is just a PR.
5. **Per-stage persona agents are in retreat.** Agent OS retired its roles system (v2.1) and its orchestration phases (v3). BMad v7 retired its Scrum Master and QA agents. AI-DLC states that narrow specialists recreate waterfall hand-offs. Anthropic's guidance is that a fresh *reviewer* helps but delegation by itself does not. The roles that survive are **planner/spec writer, implementer, and independent reviewer**.
6. **A "verify against the spec" step after implementation is the newest point of convergence:** Spec Kit `/speckit.converge` (2026), OpenSpec `/opsx:verify`, Conductor `review`, Kiro property-based tests, and Claude Code's "review against your spec" subagent.
7. **The gaps are operations, measured outcomes, security-by-default, cross-artifact traceability beyond one feature, and enforced (not advisory) governance.** Only AI-DLC and Anthropic's playbook cover Deploy and Operate in operational detail. No method publishes measured delivery outcomes, and DORA 2025 reports that AI adoption still raises delivery instability.
8. **The name "Agentic SDLC" is already in generic use.** Spec Kit's own guide is titled "…An Agentic SDLC", a Spec Kit fork brands itself "Agentic SDLC 12 Factors", and vendors and analysts use the phrase loosely. That helps familiarity, but the name cannot be distinctive.

---

## 2. Method profiles

### 2.1 GitHub Spec Kit — the reference vocabulary

| Attribute | Finding |
|---|---|
| Commands (order) | `/speckit.constitution` (once per project) → `/speckit.specify` → `/speckit.clarify`* → `/speckit.plan` → `/speckit.checklist`* → `/speckit.tasks` → `/speckit.analyze`* → `/speckit.implement` → `/speckit.converge` (repeat implement/converge until "Converged"). *Optional quality gates. [R] |
| Artifacts | `.specify/memory/constitution.md`; per feature `specs/###-feature-name/spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`, `tasks.md`, `checklists/requirements.md`. Active feature tracked in `.specify/feature.json`. [R] |
| Spec conventions | User stories with priorities (P1, P2…), functional requirements `FR-001`, measurable success criteria `SC-001`, inline `[NEEDS CLARIFICATION: …]` markers. Tasks `T001` with `[P]` (parallel) and `[US1]` (story) tags, phased Setup → Foundational → one phase per user story → Polish. [R] |
| Human checkpoints | Review each command's output before the next (quickstart). `/analyze` is read-only and proposes remediations for the human to approve. In Spec Kit's own repository, maintainers apply labels to start agent workflows and decide merges. [R] |
| Agent roles | None. Commands are skills run by whichever agent is integrated. |
| Right-sizing | **Shorter path** (specify → plan → tasks → implement → converge) for smaller features. **Full path** adds clarify, checklist and analyze. Separate bundled processes: `bug` (assess → fix → test, verdict `verified`/`partial`/`failed`) and `assess` (intake → research → define → shape → decide, verdict `go`/`needs-clarification`/`kill`). The README says these are "independent entry points, not mandatory phases". [R][P] |
| Traceability and verification | Constitution articles act as pre-implementation gates (simplicity, anti-abstraction, integration-first). `/analyze` checks spec/plan/tasks consistency. `/converge` checks code against artifacts and appends missing tasks (append-only). [R] |
| Operations | Not in the method. Spec Kit's own SDLC guide says deployment uses ordinary GitHub Actions "without an agent", and maintenance uses separate bug workflows. [R] |
| Adoption | ~150.8k GitHub stars [P, 2026-11-20]. v1.0.0 about a year after the first commit (Aug 2026), now 1.4.3 [R]. Thoughtworks Radar blip (Apr 2026) [S]. Ports exist for many agents, including a Tessl tile [S]. |
| Learning curve | 3 terminal commands to install (Python 3.11+ and `uv`), then 5 chat commands on the shorter path. Quickstart is about 1,100 words. [R] |
| Criticisms | Thoughtworks (Apr 2026): teams hit instruction bloat and context rot, value goes mostly to experienced engineers, and customizing templates (fewer markdown files) helped [S]. Böckeler (Oct 2025): heavy markdown review load, and unclear whether specs live on after the task [S]. `specs/` folders are often gitignored after delivery, as Spec Kit's own repo does [R]. |

**Notes.** Spec Kit is the most adopted spec-driven toolkit and the closest thing to a standard vocabulary. Two 2026 details matter for the Agentic SDLC. First, Spec Kit now treats processes as **entry points rather than phases**. Second, its maintainers published a guide titled *"How Spec Kit Develops Spec Kit: An Agentic SDLC"* (last commit 2026-11-21). The guide places agentic work on a classic seven-stage SDLC map, says the stages "are a map, not a required sequence", and keeps tests, scanning and releases in conventional CI, with humans deciding every hand-off [R]. That guide is almost exactly the positioning the Agentic SDLC is aiming for, and it uses the same name.

Sources: [S1] [S2] [S3] [S4] [S30] [S31]

### 2.2 AWS Kiro — requirements, design, tasks

| Attribute | Finding |
|---|---|
| Phases | **Requirements → Design → Tasks**, then task execution. Variants: **Requirements-First** (default) and **Design-First** (design written first, requirements derived from it). **Bugfix spec** uses the same three phases with `bugfix.md`. **Quick Spec** generates all three files in sequence with no approval gates. [S] |
| Artifacts | `.kiro/specs/<feature>/requirements.md` (user stories with **EARS** acceptance criteria: WHEN … THE SYSTEM SHALL …), `design.md` (architecture, sequence diagrams, implementation considerations), `tasks.md` (numbered checkboxes, at most two levels, each task linked to requirements). Project-level **steering** files (`.kiro/steering/*.md`) and **hooks** (event-triggered agent actions). `bugfix.md` records current, expected and unchanged behavior. [S] |
| Human checkpoints | Feature specs pause between phases for review and refinement. Quick Spec explicitly skips those gates. Edits to `requirements.md` followed by Refine cascade to design and tasks. Checkpoints with rollback since GA (Nov 2025). [S] |
| Agent roles | None at method level. Subagents, Powers and an autonomous agent were previewed Dec 2025 – Feb 2026. [S] |
| Right-sizing | Quick Spec vs Feature Spec. Vibe (chat) mode for small work. Bugfix spec for defects. [S] |
| Traceability and verification | Tasks reference requirement numbers. **Property-based testing** (GA, Nov 2025) extracts properties from EARS requirements and searches for counterexamples, then offers to fix the code, the spec or the test. IDE only per Kiro's feature table. [S] |
| Operations | No. Hooks automate dev-time chores, not run-time operations. |
| Adoption | AWS-backed IDE, CLI and web (Web GA reported Sep 2026). Preview July 2025, GA 2025-11-17 [S]. The public `kirodotdev/Kiro` issue-tracker repo shows ~4.5k stars, which understates usage [P]. |
| Learning curve | Low inside the IDE: one prompt starts a spec. Teams must learn EARS. |
| Criticisms | Overhead on small and medium changes is the most common complaint in 2026 reviews. Keeping specs in sync needs discipline (drift) [S]. Böckeler: one workflow for every problem size was a poor fit [S]. AWS added Design-First and Bugfix specs in Feb 2026, partly in response [S]. |

**Notes.** Kiro popularized the **requirements / design / tasks** triplet and EARS. It is the clearest example of a three-document, gated spec flow, and also of the backlash against applying that flow to everything.

Sources: [S5] [S6] [S7] [S8] [S9] [S10]

### 2.3 AWS AI-Driven Development Life Cycle (AI-DLC)

| Attribute | Finding |
|---|---|
| Phases (2025 method) | **Inception → Construction → Operations.** Rituals: **Mob Elaboration** (the team validates AI-proposed requirements, stories and units) and **Mob Construction** (the team resolves technical decisions in real time). Terms: *intent*, *unit of work* (replaces epics), *bolt* (replaces sprints; hours or days). [S] |
| Phases (2026 workflows v2.11) | **Initialization (0) → Ideation (1) → Inception (2) → Construction (3) → Operation (4)**, 33 stages. Inception: Reverse Engineering (brownfield), Practices Discovery, Requirements Analysis, User Stories, Refined Mockups, Domain Design, Units Generation, Contract Design, Delivery Planning. Construction per Unit: Functional Design, NFR Requirements, NFR Design, Infrastructure Design, Code Generation, then Build and Test and CI Pipeline once. Operation: Deployment Pipeline, Environment Provisioning, Deployment Execution, Observability Setup, Incident Response, Performance Validation, Feedback & Optimization (feeds back into Ideation). [R] |
| Artifacts | Per intent: `aidlc/spaces/<space>/intents/<YYMMDD>-<label>/` with `aidlc-state.md`, `audit/`, `verification/phase-check-*.md` and per-phase folders. Named files include `requirements.md`, `stories.md`, `personas.md`, `components.md`, `decisions.md` (ADRs), `unit-of-work.md`, `unit-of-work-dependency.md` (DAG), `bolt-plan.md`, `entities.md`, `functional-spec.md`, deployment logs, runbooks and SLO reports. [R] |
| Human checkpoints | An approval gate ends each of 26 inline stages. **Plan Approval**, the recorded **Construction Verification Command** and **skeleton approval** always stay human. Per-Unit "Approve / Request Changes" checkpoints, with an offer to "Continue automatically" for ordinary checkpoints. [R] |
| Agent roles | 14 markdown-defined agents: 11 domain experts (product, product-lead, architect, design, developer, quality, devsecops, compliance, aws-platform, pipeline-deploy, operations), 2 reviewers, 1 composer. Philosophy "Small mob, broad agents": few broad agents across stages, because narrow specialists recreate waterfall hand-offs. [R] |
| Right-sizing | 11 profiles: `express` (7 of 30 stages), `poc` (5), `bugfix` (6), `refactor` (7), `security-patch` (7), `classic` (15), `infra` (12), `mvp` (20), `workshop` (23), `feature` and `enterprise` (30). Three depth levels and three test-strategy levels. Can compose a plan from the request. [R] |
| Traceability and verification | **Phase-boundary verification** (automated: required artifacts exist, every requirement maps to a story, no orphans). 134 audit event types, a runtime graph, and a walking skeleton verified end-to-end before later Units. [R] |
| Operations | **Yes**, in the most detail of any method surveyed. All seven Operation stages are conditional and skipped by `classic`, `mvp` and `poc`. Early commentary described Operations as "barely sketched" in the 2025 version. [R][S] |
| Adoption | AWS-backed. Method announced mid-2025 (exact blog date unverified). Workflows open-sourced Nov 2025, MIT-0. `awslabs/aidlc-workflows` ~6.2k stars [P]. Runs on Claude Code, Kiro, Codex, Cursor, opencode and Copilot [R]. |
| Learning curve | **High.** Getting Started plus First Workflow is about 9,800 words. 33 stages, 11 profiles, and a vocabulary of spaces, intents, units, bolts, swarms, sensors and planes. The changelog warns of breaking script changes. [R] |
| Criticisms | Ceremony and terminology load. Operations was thin in v1. Strong AWS flavor (an `aws-platform` agent, Bedrock setup) [R][S]. |

**Notes.** AI-DLC is the most complete enterprise method and the only one with a real Operation phase. It is also the clearest warning about complexity. Its own `classic` profile, "V1-style ceremony", skips Ideation and leaves Operation as a placeholder, which suggests most users run Inception → Construction only [R].

Sources: [S11] [S12] [S13] [S14]

### 2.4 BMad Method (v6 phases, v7 delivery loop)

| Attribute | Finding |
|---|---|
| Phases (v6) | **Analysis** (optional) → **Planning** (PRD or tech spec) → **Solutioning** (architecture, epics and stories, readiness check; method and enterprise tracks only) → **Implementation** (sprint planning, story, dev, code review, retrospective). [S] |
| Delivery loop (v7 preview) | Shape (optional: brainstorm, research, brief/PRFAQ, PRD, UX) → **Specify** (Product Owner writes requirements and constraints, with a decision log) → **Slice** (thin epics in build order, architecture spine, stories) → **Build** (one session per entry: plan → checkpoint → implement → verify → parallel review lenses → triage → commit) → **Validate** (user marks done) → change mid-flight (replan) → **Close** (epic retrospective with a verdict that gates the next epic) → **Learn** (AGENTS.md pitfalls). (Inventory §5.1) |
| Artifacts | v6: `prd.md`, `architecture.md`, `epics.md`, story files, `sprint-status.yaml`. v7: spec plus decision log (`.memlog.md`), `tickets.toml`, plan file with status frontmatter, `deferred-work.md`, retrospective document. (Inventory §5.3) |
| Human checkpoints | Plan approval in attended build. The user marks done. Retro verdict. Product Owner closes after a closure check. (Inventory) |
| Agent roles | Named personas (analyst, PM, architect, UX, dev, PO). v7 retired SM and QA agents. (Inventory) |
| Right-sizing | v6 tracks: **Quick Flow** (bug fixes, simple features), **BMad Method**, **Enterprise** [S]. v7: risk-based oneshot vs full route (Inventory BM-05). |
| Traceability and verification | Requirement ids in decision logs, `covers` on epics, verify-then-verdict triage, retro with sourced findings. (Inventory) |
| Operations | No. |
| Adoption | ~55.6k stars [P]. Large community. v7 needs `uv` + Python for skill rendering (Inventory §6). |
| Criticisms | Persona and ceremony overhead. Heavy token cost. Runtime dependency in v7 (Inventory §6). |

Sources: [S15] [S16], `docs/research/inventory/bmad.md`.

### 2.5 OpenSpec — changes against living specs

| Attribute | Finding |
|---|---|
| Commands | Default ("core" profile): `/opsx:explore` → `/opsx:propose` → `/opsx:apply` → (`/opsx:update`) → `/opsx:sync` → `/opsx:archive`. Expanded: `/opsx:new`, `/opsx:continue`, `/opsx:ff` (fast-forward all planning artifacts), `/opsx:verify`, `/opsx:bulk-archive`, `/opsx:onboard`. The README also shows `/openspec-*` skill names. [R] |
| Artifacts | `openspec/specs/<capability>/spec.md` (source of truth for current behavior) and `openspec/changes/<change>/` with `proposal.md` (why and what), delta `specs/` (`## ADDED / MODIFIED / REMOVED Requirements`, each requirement with `#### Scenario:` WHEN/THEN), `design.md` (how), `tasks.md` (checklist). On archive, deltas merge into `specs/` and the change moves to `changes/archive/YYYY-MM-DD-<name>/`. [R] |
| Human checkpoints | "Two moments you review": the plan after propose, and the code after apply. Review guidance stresses spotting what is missing. Verify does not block archive. [R] |
| Agent roles | None. |
| Right-sizing | Philosophy "fluid not rigid… built for brownfield", "actions, not phases". Fast-forward vs step-by-step. Custom schemas define artifact sequences. [R] |
| Traceability and verification | `/opsx:verify` reports **Completeness** (tasks done, requirements implemented, scenarios covered), **Correctness** (matches intent, edge cases) and **Coherence** (design reflected in code). [R] |
| Operations | No. |
| Adoption | ~75.3k stars [P]. npm, Homebrew, Nix. "Stores" (beta) hold planning in a separate repo for cross-repo work [R]. |
| Learning curve | Low: 4 commands on the default path, getting started about 1,400 words [R]. |
| Criticisms | Spec-anchored maintenance still depends on discipline. Stores are beta. |

**Notes.** OpenSpec is the main **spec-anchored** method: specs outlive the change and describe the current system. That suits brownfield work better than Spec Kit's per-feature folders, which are often discarded.

Sources: [S17] [S18]

### 2.6 Agent OS (Builder Methods) — from lifecycle to standards

| Attribute | Finding |
|---|---|
| v2.1 phases (Oct 2025) | `plan-product` → `shape-spec` → `write-spec` → `create-tasks` → `implement-tasks` → `orchestrate-tasks`. [R] |
| v3 (2026-01-20) | Commands: `/discover-standards`, `/inject-standards`, `/index-standards`, `/plan-product`, `/shape-spec`. Spec writing defers to the agent's **Plan Mode**, which the changelog calls the industry-standard approach in 2026+. Task breakdown and implementation orchestration were **retired** because frontier tools now handle them. [R] |
| Artifacts | `agent-os/product/mission.md`, `roadmap.md`, `tech-stack.md`. `agent-os/standards/` with `index.yml`. `agent-os/specs/<folder>/plan.md`, `shape.md`, `standards.md`. [R] |
| Human checkpoints | Plan-mode approval. Interactive shaping questions. [R] |
| Agent roles | Roles system retired in v2.1 as "too complex". [R] |
| Adoption | ~5.6k stars [P]. Creator-led (Brian Casel). |
| Criticisms or signal | The retreat itself is the signal. A method that once owned the whole lifecycle concluded that plan mode, built-in todos and model orchestration made its scaffolding redundant, and kept only **standards** (project context). [R] |

Sources: [S19]

### 2.7 Tessl — spec-as-source and a spec registry

| Attribute | Finding |
|---|---|
| Structure | Framework plus **Spec Registry** (launched Sep 2025). The registry reportedly holds over 10,000 library-usage specs (May 2026) to reduce API hallucination. Installable "tiles" (`tessl-labs/spec-driven-development` 1.0.x covering task intake, spec format, style guide and manual verification; a `spec-as-source` tile v3.0.0). A Tessl Spec Kit tile was archived 2026-02-04, superseded by an "intent-integrity-kit". [S] |
| Position | Böckeler classed Tessl as the most radical tool, aiming at **spec-as-source**: the spec, not the code, is the maintained artifact. A May 2026 InfoWorld review doubted any tool yet implements spec-as-source. [S] |
| Checkpoints, operations | Not established from accessible sources. |

Sources: [S20] [S21] [S22]

### 2.8 Google Conductor — context, spec and plan, implement

| Attribute | Finding |
|---|---|
| Phases | **Context → Spec & Plan → Implement.** Commands `/conductor:setup` (once), `newTrack`, `implement`, `status`, `revert`, `review`. [P] |
| Artifacts | `conductor/product.md`, `product-guidelines.md`, `tech-stack.md`, `workflow.md`, `code_styleguides/`, `tracks.md`. Per track `conductor/tracks/<id>/spec.md`, `plan.md`, `metadata.json`. [P] |
| Checkpoints | Plan approval before code. `review` audits work against guidelines and the plan and can add a "Review Fixes" phase. Git-based revert per track, phase or task. [P] |
| Adoption | ~3.8k stars. Started as a Gemini CLI extension and is now portable to other agents. [P][S] |

Sources: [S23] [S24]

### 2.9 Anthropic — Claude Code best practices and the AI-native SDLC playbook

**Claude Code best practices.** The 2025 engineering post introduced **Explore → Plan → Code → Commit**, plus test-first and visual-iteration loops [S]. The current docs (the old URL redirects to `code.claude.com/docs/en/best-practices`) are organized differently [P]:

- **Tell Claude what it can't see.** For unclear work, have Claude interview you until it can write `SPEC.md`, then build in a fresh session.
- **Give Claude a check to run.** Something with a pass/fail result, from a prompt instruction up to a goal condition, a Stop hook, or `/code-review` in a fresh subagent. Always ask for evidence.
- **Review against your spec.** Use a read-only reviewer subagent that reports only correctness gaps.
- **Enforce rules that can't have exceptions** with hooks and permissions, not prompt emphasis.
- **Five questions before an unattended run:** done-condition, self-check, permitted scope, stop limits, and who signs off.

The page states that subagents help for parallel work and independent review, and that delegation alone does not improve answers [P].

**AI-native SDLC playbook (Louis Claxton, 2026-08-21)** [P]:

| Stage | Committed artifact | Human gate | Automated |
|---|---|---|---|
| **Plan** | `intent.md` (proto-spec, often brainstormed with Claude) | Product owner accepts the intent | Drafting from conversation, org templates via skills |
| **Design** | `spec.md` (combined requirements and design) | Product owner (tech lead for higher risk), resolving flagged policy concerns | Spec generation constrained by org skills; can run non-interactively as a PR |
| **Build** | `plan.md`, code, tests, `CLAUDE.md`, skills | Engineer accepts the plan (tech lead or architect for higher risk) | Plan mode, implementation, hooks, parallel subagents, auto mode for routine work |
| **Test** | Test and build output, screenshot diffs, eval results in the PR checks | Code owner reviews the PR for intent and risk | Run-until-green loops, hooks blocking test edits during fixes, continuous evals in CI |
| **Deploy** | PR with review findings; `REVIEW.md` policy | Code-owner approval via branch protection; **named release authorization** enforced by a hook | AI review on all PRs, fix loops, CI triage; agent prepares releases but cannot pass the production gate |
| **Maintain** | Incident records; new `intent.md` from diagnoses | Service owner or on-call triages (fix, schedule, dismiss) | Deterministic metric-breach detection, tiered diagnosis, scheduled security scans |

Right-sizing: routine work uses auto mode when the spec is tight, blast radius small and tests cover it. Small bounded fixes go straight to PR. Anything larger starts as an `intent.md` at Plan. **Measurement:** each stage lists leading and lagging indicators (time to committed intent, spec rework after build starts, first-pass merge rate, repeated agent mistakes, eval pass rate, change failure rate and DORA metrics, breach-to-triage time). **Caveats:** a skill makes compliance likely, not guaranteed, so must-hold policies need hooks or review checks. Adoption can be piecemeal. Each artifact needs one source of truth when Jira or change boards remain. Agents never approve their own work. [P]

**Notes.** This is the most direct precedent for the Agentic SDLC: a vendor-backed, operational, six-stage loop with classic stage names, one committed artifact per stage, named human gates, routing for small changes, and per-stage indicators. Commentators have already noted that it lacks a measurement layer, and that it describes a direction rather than a final blueprint [S].

Sources: [S25] [S26] [S27] [S28]

### 2.10 Factory.ai — agent-native development

Factory describes **agent-native development** as an agent running the full loop of context gathering, planning, implementing, validating and submitting a reviewable change, with a record of its reasoning. It warns that review and validation become the next bottleneck [S]. **Specification Mode** (Shift+Tab in the CLI) is read-only analysis that produces a spec or plan. No code changes happen until the human approves, and approval comes with a chosen **autonomy level**. Conventions come from `AGENTS.md`, and specs can optionally be saved as markdown [S]. Factory's "software factory" framing (Jan 2026) treats Droids as agents that take standardized inputs and produce validated changes across coding, review, testing and deployment [S]. This is operational for the plan → implement → PR loop and marketing beyond that. Stars are not applicable (commercial product).

Sources: [S29]

### 2.11 Sonar AC/DC — Agent Centric Development Cycle

Sonar's CEO framed AC/DC as **Guide → Generate → Verify → Solve**. Generate is the agent's job. Sonar supplies Guide (context injection), Verify (deliberate quality and security checks) and Solve (remediation agents) [S]. The current docs describe **three loops**: the **agentic loop** inside the agent (guide plus early verification), the **CI verification loop** (zero-trust multi-layer review and a quality gate before merge), and the **code maintenance loop** (agents fix legacy issues asynchronously) [S]. It is a vendor framework tied to paid SonarQube products (Vortex, Remediation Agent), so it is part operational and part marketing. Its useful idea is an **inner loop / outer loop split** with a hard merge gate. Publication date not verified.

Sources: [S32] [S33]

### 2.12 Thoughtworks Technology Radar and Fowler / Böckeler

- **Radar, "Spec-driven development", Assess (2025-11-05)** [S]. An emerging technique adopted by many developers. It names Kiro (requirements, design, tasks), spec-kit (similar three steps plus a constitution) and Tessl (spec as maintained artifact). It warns that behavior varies by task size, that some tools produce lengthy specs that are hard to review, that the audience for generated PRDs and stories is unclear, and that the industry may be relearning the "bitter lesson" that hand-crafting detailed rules for AI does not scale.
- **Radar, "GitHub Spec Kit" (Apr 2026)** [S]. Teams are experimenting, mostly in brownfield. They report instruction bloat leading to context rot, and say value goes mostly to experienced engineers. Trimming generated markdown helped.
- **Böckeler, "Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl" (Oct 2025)** [S]. Defines three levels: **spec-first** (spec written for the task, then discarded), **spec-anchored** (spec kept and evolved with the feature) and **spec-as-source** (spec is the only edited artifact). Notes there is no agreed spec format, that generation is non-deterministic, and that one workflow does not fit all problem sizes.
- **Böckeler, "Harness engineering for coding agent users" (2026-04-02)**, with "Context Engineering for Coding Agents" (2026-02-05) and Kief Morris, "Humans and Agents in Software Engineering Loops" (2026-03-04) [S]. These shift the focus from documents to the **harness**: the guides (feed-forward context) and sensors (feedback checks) around the model, with humans working *on* the loop rather than *in* it.

Sources: [S34] [S35] [S36] [S37] [S38] [S39]

### 2.13 Academic: SDAD and Agentic Agile-V (structure only)

- **SDAD: Spec-Driven Agentic Development for the AI-Native SDLC** (Vu Hung Nguyen, arXiv 2608.20341, 2026) [S]. Central human role: the **Spec Architect**, who captures, formalizes and validates intent. **SDAD-V** model: left arm stakeholder intent → Spec Architect → formal specification → **spec fidelity gate**; right arm agentic implementation → agentic verification.
- **Agentic Agile-V: From Vibe Coding to Verified Engineering** (Christopher Koch, arXiv 2605.20456, 2026-05-19) [S]. Agile-V lifecycle backbone (its predecessor, arXiv 2602.20684, Feb 2026, merges Agile iteration with V-model verification in an "Infinity Loop" of specialized agents with mandatory human approval gates), plus a task-level **SCOPE-V** loop: Specify, Constrain, Orchestrate, Prove, Evolve, Verify. Contributions: a taxonomy of minimum input artifacts, a **conversation-to-contract gate** separating exploratory chat from implementation, and **risk-adaptive evidence gates** per work type (feature, bug fix, test generation, firmware, RTL).
- Both papers converge on spec formalization, a gate before implementation, independent verification, and human approval. Neither reports adoption. Agile V's skill repository is CC BY-SA, so this repository uses its concepts only (see `docs/research/inventory/agile-v-concepts.md`).

Sources: [S40] [S41] [S42]

### 2.14 Vendor "AI-driven SDLC" diagrams — marketing vs operational

| Vendor | Framing | Operational substance | Verdict |
|---|---|---|---|
| **Microsoft / GitHub** | "Agentic DevOps" (Build, 2025-05-19): agents across the whole lifecycle | Copilot coding agent works in a sandbox and opens a **draft PR**. Azure SRE Agent for operations is a separate product. Spec Kit is the operational method | Diagram is marketing; coding agent and Spec Kit are operational |
| **GitLab** | Duo Agent Platform GA (18.8, 2026-01-15): agents "across every phase… planning, building, securing, shipping" | Planner Agent (RICE/MoSCoW backlog work), Security Analyst Agent, custom flows, external agents (Claude Code, Codex) | Product capabilities, not a method; no artifacts or gates defined |
| **Atlassian** | "AI-native SDLC": **Plan, Orchestrate, Code, Review, Operate** | Rovo Dev plans from Jira issue, codes in sandbox, opens PR, AI code review, pipeline troubleshooter | Stage words are marketing; plan → code → review is operational |
| **Google** | Gemini Code Assist across "build, deploy, operate"; Jules async PR agent | Conductor (§2.8) is the operational spec method | Diagram is marketing; Conductor is operational |

Sources: [S43] [S44] [S45] [S46] [S47]

---

## 3. Side-by-side summary

| Method | Stage words (exact) | Core artifacts | Human approvals | Light path | Ops | Adoption signal |
|---|---|---|---|---|---|---|
| Spec Kit | constitution · specify · (clarify) · plan · (checklist) · tasks · (analyze) · implement · converge | `constitution.md`, `spec.md`, `plan.md`, `tasks.md` (+ research, data-model, contracts, quickstart) | Review after each step; maintainers merge | Shorter path; bug, assess | No | ~150.8k★, GitHub |
| Kiro | Requirements · Design · Tasks | `requirements.md`, `design.md`, `tasks.md`, steering, hooks | Between phases (Feature Spec) | Quick Spec, Bugfix spec, vibe mode | No | AWS product |
| AI-DLC | (Initialization) · Ideation · Inception · Construction · Operation | `requirements.md`, `stories.md`, `unit-of-work*.md`, `bolt-plan.md`, ADRs, runbooks | Per stage; Plan Approval; per-Unit | 11 profiles | **Yes** | AWS, ~6.2k★ |
| BMad v6/v7 | Analysis · Planning · Solutioning · Implementation / Shape · Specify · Slice · Build · Validate · Close · Learn | PRD, architecture, epics/stories → spec, tickets, plan, retro | Plan checkpoint, user done, retro verdict | Quick Flow / oneshot | No | ~55.6k★ |
| OpenSpec | explore · propose · apply · verify · sync · archive | `proposal.md`, delta `specs/`, `design.md`, `tasks.md`; living `openspec/specs/` | Plan review, code review | Core profile, ff | No | ~75.3k★ |
| Agent OS v3 | discover/inject standards · plan-product · shape-spec (+ plan mode) | `mission.md`, `roadmap.md`, `tech-stack.md`, standards, `plan.md`, `shape.md` | Plan mode | Everything is light | No | ~5.6k★ |
| Conductor | Context · Spec & Plan · Implement (+ review, revert) | `product.md`, `tech-stack.md`, `workflow.md`, `tracks/<id>/spec.md`, `plan.md` | Plan approval | Tracks | No | ~3.8k★, Google |
| Anthropic playbook | Plan · Design · Build · Test · Deploy · Maintain | `intent.md`, `spec.md`, `plan.md`, `CLAUDE.md`, `REVIEW.md`, incidents | Intent, spec, plan, PR, release, triage | Auto mode; small fix = PR | **Yes** | Anthropic |
| Claude Code docs | (Explore · Plan · Code · Commit, 2025) → interview → `SPEC.md` → check → review | `SPEC.md`, `CLAUDE.md`, hooks | Plan, merge | Plain prompt | No | Anthropic |
| Factory | spec mode → implement → validate → PR | spec markdown, `AGENTS.md` | Spec approval + autonomy level | — | Partial | Commercial |
| Sonar AC/DC | Guide · Generate · Verify · Solve; 3 loops | Quality gate results | Merge gate | — | Maintenance loop | Commercial |
| SDAD | intent → spec → fidelity gate → implement → verify | Formal spec | Spec Architect, fidelity gate | — | No | Paper |
| Agentic Agile-V | Specify · Constrain · Orchestrate · Prove · Evolve · Verify | Minimum input artifacts, evidence | Conversation-to-contract gate, evidence gates | Risk-adaptive | Lifecycle loop | Paper |

---

## 4. Convergence

### 4.1 Stage sequence (feature level)

Counted across the 13 methods with an explicit feature-level flow: Spec Kit, Kiro, AI-DLC, BMad, OpenSpec, Agent OS (v2/v3), Conductor, Anthropic playbook, Claude Code docs, Factory, Tessl, SDAD, Agentic Agile-V. Sonar is excluded because it does not define requirements or design steps.

| Step (meaning) | Names in use | Count | Standard term |
|---|---|---|---|
| Project principles / context, set once | constitution (Spec Kit), steering (Kiro), standards (Agent OS), product/tech-stack/workflow (Conductor), `CLAUDE.md` (Anthropic), `AGENTS.md` (Factory, BMad), team memory/rules (AI-DLC), config/context (OpenSpec) | 9/13 | **"project context" in a file the agent always reads**; most portable file is `AGENTS.md` / `CLAUDE.md`; Spec Kit users say "constitution" |
| Intake / go decision | assess (Spec Kit), Ideation (AI-DLC), intent (Anthropic), explore (OpenSpec), Analysis/Shape (BMad), plan-product (Agent OS) | 6/13 | **Plan** (lifecycle) / "intent" |
| Specify what and why | specify, requirements, Requirements Analysis, PRD/spec, propose (+ specs), shape-spec, spec, Design (`spec.md`), interview → SPEC, spec mode, Specify | **13/13** | **Specify → `spec.md`** (Kiro: requirements → `requirements.md`) |
| Clarify ambiguity before design | clarify (Spec Kit), Requirements Analysis contradictions (Kiro 0.12), Mob Elaboration (AI-DLC), interview (Claude Code), open-questions walk (BMad), conversation-to-contract gate (Agile-V) | 6/13 | **Clarify** |
| Design / plan the how | plan, design, Domain/Functional Design, Solutioning/architecture, `design.md`, plan mode, plan, Build `plan.md`, spec mode | 11/13 | **Plan → `plan.md`** (Kiro and OpenSpec: `design.md`) |
| Break into tasks | tasks, tasks, Units + bolt plan, epics/stories/tickets, tasks, (v2) create-tasks, plan phases | 7/13 | **Tasks → `tasks.md`** |
| Implement | implement, task execution, Code Generation, dev/build, apply, implement-tasks, implement, Build, code | **13/13** | **Implement** |
| Verify against spec | converge, PBT, phase verification + Build and Test, review/retro, verify, review, review against SPEC.md, validate, fidelity gate, Prove/Verify | 11/13 | **Verify** (Spec Kit users: converge) |
| Close / archive / learn | archive (OpenSpec), retro and learn (BMad), Feedback & Optimization (AI-DLC), feedback into `CLAUDE.md` (Anthropic), Evolve (Agile-V) | 5/13 | **Close** / retrospective |
| Deploy / release | Operation (AI-DLC), Deploy (Anthropic), Spec Kit SDLC map (non-agent) | 3/13 | **Deploy** |
| Operate / maintain | Operation (AI-DLC), Maintain (Anthropic), maintenance loop (Sonar), Maintenance (Spec Kit map) | 3/13 (+Sonar) | **Operate** or **Maintain** |

**De facto standard feature flow:** **Specify → (Clarify) → Plan → Tasks → Implement → Verify**, inside a project context file, with a light path that skips most of it.

### 4.2 Lifecycle stage names (top level)

| Source | Stages | Classic words? |
|---|---|---|
| Anthropic AI-native SDLC playbook (2026) | Plan, Design, Build, Test, Deploy, Maintain | Yes |
| Spec Kit "Agentic SDLC" guide (2026) | Planning, Requirements, Design, Development, Testing, Deployment, Maintenance | Yes |
| Atlassian | Plan, Orchestrate, Code, Review, Operate | Mostly |
| Jellyfish / generic "agentic SDLC" articles (2026) | Plan, Design, Build, Test, Deploy, Maintain (requirements → operations) | Yes |
| AI-DLC | Ideation, Inception, Construction, Operation | No (Inception/Construction come from the Unified Process) |
| Sonar | Guide, Generate, Verify, Solve | No |
| SDAD / Agile-V | V-model arms / SCOPE-V | No |

Classic SDLC words win at lifecycle level: **Plan, (Requirements), Design, Build, Test, Deploy, Maintain/Operate**. The two most authoritative AI-native sources of 2026, Anthropic and GitHub, both chose them.

### 4.3 Artifact names

| File | Used by | Count |
|---|---|---|
| `spec.md` / `SPEC.md` | Spec Kit, OpenSpec (capability spec), Conductor, Anthropic playbook, Claude Code docs (`SPEC.md`), BMad v7, Agent OS v2 | **7** |
| `plan.md` | Spec Kit, Conductor, Agent OS v3, Anthropic playbook, BMad v7 (plan file) | **5** |
| `tasks.md` | Spec Kit, Kiro, OpenSpec, Agent OS v2 | **4** |
| `design.md` | Kiro, OpenSpec | 2 |
| `requirements.md` | Kiro, AI-DLC | 2 |
| `proposal.md` / `intent.md` | OpenSpec / Anthropic | 1 each |
| Project context | `constitution.md` (Spec Kit), `.kiro/steering/`, `agent-os/standards/`, `conductor/product.md`…, `CLAUDE.md`/`AGENTS.md` (Anthropic, Factory, BMad) | — |
| ADRs / `decisions.md` | AI-DLC, BMad (approved ADRs) | 2 |
| One folder per feature/change | `specs/###-name/` (Spec Kit), `.kiro/specs/<name>/`, `openspec/changes/<name>/`, `conductor/tracks/<id>/`, `agent-os/specs/<folder>/`, `aidlc/…/intents/<YYMMDD>-<label>/` | **6** |

Lowercase `spec.md`, `plan.md` and `tasks.md` in one folder per feature is the standard. Uppercase `SPEC.md` appears only in Anthropic's docs example and BMad v7.

### 4.4 Human checkpoints

| Checkpoint | Present in | Count |
|---|---|---|
| **Spec approval** (before design or plan) | Spec Kit (review step), Kiro (Feature Spec), AI-DLC (stage gates), OpenSpec (plan review), Anthropic (product owner), SDAD (fidelity gate), Agile-V (conversation-to-contract) | 7 |
| **Plan approval** (before code) | Claude Code plan mode, Factory spec mode, Conductor, AI-DLC Plan Approval, Anthropic (engineer accepts plan), BMad (attended build), Agent OS (plan mode) | 7 |
| **PR approval / merge** | Anthropic, Spec Kit (maintainers), OpenSpec (code review), Microsoft (draft PR), Atlassian, Sonar (quality gate), BMad (user marks done) | 7 |
| **Release authorization** | Anthropic (named, hook-enforced), AI-DLC (Operation gates), Spec Kit (maintainers dispatch release) | 3 |
| **Intake / go decision** | Spec Kit assess, Anthropic intent, AI-DLC Ideation hand-off | 3 |
| **Operations triage** | Anthropic (on-call triage), AI-DLC (incident response) | 2 |

Approval of autonomous runs is converging on **graded autonomy**: Factory's autonomy level at spec approval, AI-DLC's "Continue automatically / Review each checkpoint", Anthropic's auto mode for routine work, and Kiro's Quick Spec without gates. In all of these, a human still owns plan, merge and production.

---

## 5. Divergence and gaps

### 5.1 Where methods diverge

1. **Spec lifetime.** Spec-first: Spec Kit features are often gitignored after delivery, and Kiro specs are per feature. Spec-anchored: OpenSpec merges deltas into living `specs/`. Spec-as-source: Tessl's aspiration. Böckeler's three levels are the accepted vocabulary for this choice.
2. **Requirements and design: one file or two.** Separate files in Spec Kit (`spec.md` + `plan.md`), Kiro (`requirements.md` + `design.md`) and OpenSpec. Combined in Anthropic's playbook (`spec.md` = requirements and design, with `plan.md` as the build plan) and Conductor (`spec.md` + `plan.md`, where plan holds tasks).
3. **Tasks as a separate file.** Spec Kit, Kiro and OpenSpec keep `tasks.md`. Agent OS v3 and Anthropic leave task tracking to the agent's built-in todo list. Conductor folds tasks into `plan.md`.
4. **Gate strictness.** From strict per-stage approvals (AI-DLC classic, Kiro Feature Spec) to "review whenever you like, verify does not block" (OpenSpec).
5. **Agent roles.** AI-DLC defines 14 agents and BMad keeps personas. Spec Kit, Kiro, OpenSpec, Conductor and Anthropic define none and rely on skills plus an independent reviewer.
6. **Lifecycle span.** Most methods stop at PR. AI-DLC and Anthropic go through deploy and operate. Sonar covers maintenance of existing code only.
7. **Requirement notation.** Spec Kit uses user stories, `FR-###` and `SC-###`. Kiro uses EARS (WHEN … SHALL …). OpenSpec uses `### Requirement` + `#### Scenario` WHEN/THEN. AI-DLC uses stories plus NFR documents. Böckeler notes there is no agreed format.

### 5.2 What is still missing across them

| Gap | Evidence | Who partly covers it |
|---|---|---|
| **Operations and post-release learning** | Spec Kit says deploy runs "without an agent"; Kiro, OpenSpec, Conductor and BMad stop at PR or retro | AI-DLC Operation (all conditional, skipped by `classic`/`mvp`/`poc`); Anthropic Maintain |
| **Measured outcomes** | No method publishes outcome data. DORA 2025: AI raises throughput but still raises instability; 3% of developers report high trust in AI output. METR (Jul 2025): experienced developers 19% slower with AI while believing they were faster | Anthropic lists per-stage indicators but no baseline; commentators flag the missing measurement layer |
| **Security by default** | Security is optional in most flows (constitution article, checklist) | AI-DLC devsecops/compliance agents and `security-patch` profile; Sonar Verify; Anthropic scheduled security scans |
| **Traceability past one feature** | IDs exist inside a feature (Spec Kit `FR`→`T`, Kiro requirement → task) but rarely reach tests, PR, release and production indicators | AI-DLC phase-boundary checks (requirement → story); Agile-V evidence gates |
| **Enforced governance** | Most gates are prompt-level: an agent can skip them | Anthropic: must-hold rules need hooks or review checks; AI-DLC engine-asked Plan Approval and audit trail; Spec Kit AI-disclosure policy |
| **Spec drift and review burden** | Thoughtworks: long specs, instruction bloat, context rot; Kiro drift complaints; Marmelab "waterfall strikes back" | OpenSpec living specs and delta review; Spec Kit `lean` preset; Kiro Quick Spec |
| **Brownfield entry** | Thoughtworks says Spec Kit use is mostly brownfield, yet most quickstarts are greenfield | AI-DLC Reverse Engineering; OpenSpec "built for brownfield"; Agent OS discover-standards |
| **Change mid-flight** | Few define what happens when the spec changes during build | BMad replan; Kiro Refine cascade; Spec Kit converge appends tasks |

---

## 6. Positioning opportunity

The market has split. **Lightweight spec tools** (Spec Kit, OpenSpec, Kiro, Conductor) own the inner loop from spec to PR and are well adopted, but stop at the PR. **Enterprise lifecycles** (AI-DLC, and in a lighter vendor-specific form Anthropic's playbook) cover deploy and operate, but AI-DLC is heavy and full of new vocabulary, and the playbook is a set of practices, not a method you install. Nobody offers **a portable, installable method that uses Spec Kit's vocabulary for the inner loop and classic SDLC stage names for the outer loop, carries traceability and evidence through to release and production, and stays light on small work.**

The Agentic SDLC can sit exactly there, under four constraints:

1. **Familiar on day one.** A Spec Kit or Kiro user recognizes `spec.md`, `plan.md` and `tasks.md`, and the verbs specify, plan, tasks, implement, verify. An AI-DLC user recognizes the stage map and gates. Nothing needs to be learned before the first change.
2. **Different where it counts.** It closes the gaps in §5.2: (a) a release and operate stage with real artifacts, (b) evidence-based verification and a traceability chain from acceptance criterion to production indicator, (c) security as a standing review lens, (d) checkpoints that are recorded and, where the platform allows, enforced by hooks, (e) a small set of outcome indicators measured per change.
3. **Portable.** Plain markdown skills across 8 platforms, with no engine, `uv` or Bun dependency. This is the main structural advantage over AI-DLC (Bun-based engine) and BMad v7 (`uv` + Jinja), and it matches Spec Kit's and OpenSpec's "skills" packaging.
4. **Light by default.** Quick and Standard routes produce at most three files. Full ceremony is opt-in and triggered by risk.

---

## 7. Recommendations for the Agentic SDLC structure

1. **Use classic SDLC stage names at lifecycle level, spelled out, with no codes.** Recommended: **Plan → Specify → Design → Build → Test → Release → Operate**. This keeps the seven-stage shape of Spec Kit's own SDLC map and Anthropic's playbook, renaming Requirements to *Specify* because `/specify` and `spec.md` are the vocabulary Spec Kit users know. A conservative alternative is Spec Kit's map words exactly (Planning, Requirements, Design, Development, Testing, Deployment, Maintenance). Drop the two-letter codes (PL·AN·DE·BU·TE·RV·DP·OP): no surveyed method uses codes, and they are part of what made earlier drafts look invented. Rename *Analyze* to *Specify* (Spec Kit's `/analyze` means something else: a consistency check). Prefer *Release* or *Deploy* over a separate *Review* stage (point 4).

2. **Inside the stages, adopt Spec Kit's command verbs and Kiro-compatible files.** Feature flow: **specify → clarify → plan → tasks → implement → verify**. Per change, one folder (`specs/<NNN>-<feature>/`, matching Spec Kit; or adopt an existing `.kiro/specs/` or `openspec/` tree if present) containing:
   - **`spec.md`**: what and why. User-visible behavior, acceptance criteria written as WHEN/THEN (EARS-compatible), out of scope, open questions.
   - **`plan.md`**: how. Approach, key decisions or ADR links, risks, rollback, test strategy.
   - **`tasks.md`**: ordered checklist with IDs, parallel markers and links to the acceptance criteria.

   Publish a one-table mapping for Kiro users (`requirements.md` ↔ `spec.md`, `design.md` ↔ `plan.md`, `tasks.md` ↔ `tasks.md`) and for OpenSpec users (`proposal.md` + delta specs ↔ `spec.md`). Use **lowercase** names: they match 7 of the 9 surveyed usages. Current uppercase names (`SPEC.md`, `PLAN.md`) only match Anthropic's docs example and BMad v7.

3. **Cap required artifacts by route and push evidence into the PR.** Thoughtworks' strongest criticism of spec-driven development is markdown bloat and review burden. Quick route: no files, just the issue and the PR with a test. Standard: `spec.md` + `plan.md` (tasks inside plan, as in Conductor and Anthropic). Full: add `tasks.md` and release or operations artifacts. Fold today's `TRACEABILITY.md`, `VERIFICATION.md` and `CHECKPOINTS.md` into **one PR description section and one verification report**, rather than three standing files. Use `AGENTS.md` / `CLAUDE.md` as the project-context file and call it out as the equivalent of Spec Kit's *constitution* and Kiro's *steering*, instead of inventing a new file.

4. **Name human checkpoints by what is approved, not by number.** Use the four approvals the field has converged on, plus an optional intake decision: **Scope decision** (go / not now / no, optional on Quick), **Spec approval**, **Plan approval**, **PR approval** (merge), **Release approval** (production). Operations triage stays with the on-call engineer. Labels like CP1–CP5 can remain as short IDs in records, but every document should lead with the plain name. Make **Review** the PR-approval checkpoint at the end of Test, not a stage: no AI-native method except Atlassian's marketing diagram has a separate review stage. Most put an independent reviewer plus human merge approval at the PR.

5. **Define roles, not a cast of agents.** Replace the eight per-stage agents (Triage, Analyst, Architect, Coding, QA, Review, Release, SRE) with **three agent responsibilities**: *planner* (specify, clarify, plan, tasks), *implementer* (build and test loop), and *independent reviewer* (fresh context, read-only, reviews against `spec.md`). Add **human roles** on the checkpoints (product owner, tech lead, engineer/code owner, release manager, on-call). The evidence: Agent OS and BMad retired roles, AI-DLC warns that narrow specialists recreate waterfall hand-offs, and Anthropic says a fresh reviewer adds value while delegation alone does not. Release and operate work can be skills the implementer runs, not separate agents.

6. **Ship three routes with explicit triggers and a published mapping.** **Quick** (small bounded fix → PR; maps to Anthropic's "small fix is a PR", Spec Kit `bug`, Kiro vibe/Bugfix, AI-DLC `bugfix`/`express`, BMad Quick Flow). **Standard** (maps to Spec Kit's shorter path, Kiro Quick Spec, AI-DLC `classic`). **Full** (maps to Spec Kit's full path with clarify/checklist/analyze, Kiro Feature Spec, AI-DLC `feature`/`enterprise`, BMad Enterprise). Choose the route by **risk signals** (irreversibility, data or security exposure, blast radius, number of components), not lines of code. Escalate when new risk appears.

7. **Make "verify against the spec" a named step with a fixed report.** After implement, run a **verify** pass in a fresh context that checks **completeness** (every acceptance criterion has evidence and every task is done), **correctness** (behavior matches intent, edge cases covered) and **coherence** (code matches the plan's decisions). These are OpenSpec's three dimensions. Missing work is **appended as new tasks** (Spec Kit converge semantics), never silently fixed. Require **evidence**: the command run and its output, per Anthropic's guidance. Mention that Spec Kit users know this as `/converge`.

8. **Carry traceability one step further than anyone else, but keep it to one chain.** Use stable IDs: acceptance criteria `AC-1…` in `spec.md` (or Spec Kit's `FR-001` for teams that already use it), tasks `T1…` referencing AC IDs (as Spec Kit's `[US1]` and Kiro's requirement links do), commits and tests referencing both, and the PR verification section listing each AC with its evidence. Extend the chain past the PR: the release note lists the ACs shipped, and the Operate stage records the indicator each change was meant to move. This is the differentiator no surveyed method fully provides (§5.2).

9. **Give Release and Operate concrete, small artifacts, and close the loop.** Release: rollout and rollback plan and a release authorization record, enforced by a hook or branch protection where possible (Anthropic's named release authorization). Operate: health signals or SLOs to watch, an incident record, and **a new `intent` or Plan item generated from incidents and misses** (Anthropic Maintain, AI-DLC Feedback & Optimization). Keep each one a section, not a document set. Mark Operate as optional on Quick and Standard, as AI-DLC does.

10. **Measure a few outcomes per change, and say plainly what is enforced.** Borrow 4–6 of Anthropic's indicators: spec rework after build starts, first-pass PR approval rate, verification gaps found after "done", change failure or rollback rate, and repeated agent mistakes recorded into `AGENTS.md`. Each skill should state which rules are **advisory** (prompt) and which are **enforced** (hook, permission, branch protection, CI gate), because Anthropic's own playbook warns that skills alone cannot guarantee compliance and DORA 2025 shows instability rising with AI adoption.

**On the name.** "Agentic SDLC" is already a generic phrase: Spec Kit's own guide title, a Spec Kit fork called "Agentic SDLC 12 Factors", and analyst usage. The name is fine for familiarity, but documents should introduce it as *"a method for AI-assisted software delivery that follows the standard SDLC"*, not as a new paradigm. The README should carry a "coming from Spec Kit / Kiro / AI-DLC / BMad?" mapping table as the first thing a developer sees after the stage diagram.

---

## 8. Sources

Dates are publication dates where known; "accessed" means the page carries no visible date or was read through a repository snapshot. Tier markers: [R] repository read, [P] page fetched, [S] search summary only.

- [S1] GitHub Spec Kit repository and README — https://github.com/github/spec-kit — accessed 2026-11-20 [P][R]; CHANGELOG 1.4.3 dated 2026-11-19 [R].
- [S2] Spec Kit Quickstart — https://github.com/github/spec-kit/blob/main/docs/quickstart.md — accessed 2026-11-20 [R].
- [S3] Spec Kit Agentic SDD reference — https://github.com/github/spec-kit/blob/main/docs/reference/agentic-sdd.md — accessed 2026-11-20 [R].
- [S4] Spec Kit templates (spec, plan, tasks, constitution) and `spec-driven.md` — https://github.com/github/spec-kit/tree/main/templates — accessed 2026-11-20 [R].
- [S30] "How Spec Kit Develops Spec Kit: An Agentic SDLC" — https://github.com/github/spec-kit/blob/main/docs/guides/agentic-sdlc.md — last commit 2026-11-21 [R].
- [S31] Spec Kit 1.0 timing and `/converge` — https://github.com/github/spec-kit/releases ; Visual Studio Magazine, 2026-05-12 — https://visualstudiomagazine.com/articles/2026/05/12/github-spec-kit-takes-off-as-antidote-to-piecemeal-vibe-coding.aspx [S].
- [S5] Kiro Specs docs — https://kiro.dev/docs/specs/ ; Feature specs — https://kiro.dev/docs/specs/feature-specs/ ; Quick spec — https://kiro.dev/docs/specs/quick-spec/ — accessed 2026-11-20 [S].
- [S6] Kiro Bugfix specs — https://kiro.dev/docs/specs/bugfix-specs/ ; "New spec types: fix bugs and build on top of existing apps" — https://kiro.dev/blog/specs-bugfix-and-design-first/ (Feb 2026) [S].
- [S7] Kiro correctness / property-based testing — https://kiro.dev/docs/specs/correctness/ ; https://kiro.dev/blog/property-based-testing/ [S].
- [S8] "Introducing Kiro" — https://kiro.dev/blog/introducing-kiro/ (Jul 2025) ; GA — https://kiro.dev/blog/general-availability/ (2025-11-17, per SiliconANGLE) [S].
- [S9] Kiro issue tracker repository — https://github.com/kirodotdev/Kiro — accessed 2026-11-20 [P].
- [S10] Kiro criticism: CIO, "AWS adds design-first and bugfix workflows to Kiro" — https://www.cio.com/article/4135314/aws-adds-design-first-and-bugfix-workflows-to-kiro-2.html (Feb 2026); DEV reviews, e.g. https://dev.to/pickuma/amazon-kiro-review-awss-spec-driven-agentic-ide-in-2026-4f48 [S].
- [S11] AWS, "AI-Driven Development Life Cycle: Reimagining Software Engineering" (Raja SP) — https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/ — mid-2025, exact date unverified [S].
- [S12] AWS, "Open-sourcing adaptive workflows for AI-DLC" — https://aws.amazon.com/blogs/devops/open-sourcing-adaptive-workflows-for-ai-driven-development-life-cycle-ai-dlc (summary dated 2025-11-29) [S].
- [S13] `awslabs/aidlc-workflows` README, guide chapters 00, 04, 14, workflow profiles, glossary — https://github.com/awslabs/aidlc-workflows — v2.11.4, 2026-11-13 [R][P].
- [S14] IBM, "The AI-DLC" — https://www.ibm.com/think/topics/ai-dlc — accessed 2026-11-20 [S].
- [S15] BMad Method repository — https://github.com/bmad-code-org/BMAD-METHOD — accessed 2026-11-20 [P]; this repository's inventory `docs/research/inventory/bmad.md` (2026-11-19).
- [S16] BMad docs, workflow map and four phases — https://docs.bmad-method.org/reference/workflow-map/ — accessed 2026-11-20 [S].
- [S17] OpenSpec repository — https://github.com/Fission-AI/OpenSpec — accessed 2026-11-20 [P][R].
- [S18] OpenSpec docs: commands, workflows, concepts, reviewing changes — https://github.com/Fission-AI/OpenSpec/tree/main/docs — commit 2026-11-19 [R].
- [S19] Agent OS repository and CHANGELOG (v3.0, 2026-01-20; v2.1.0, 2025-10-21) — https://github.com/buildermethods/agent-os [R][P].
- [S20] Tessl, framework and registry launch — https://tessl.io/blog/tessl-launches-spec-driven-framework-and-registry/ (Sep 2025) [S].
- [S21] Tessl registry, spec-driven-development tile — https://tessl.io/registry/tessl-labs/spec-driven-development ; spec-kit tile (archived 2026-02-04) — https://tessl.io/registry/tessl-labs/spec-kit/0.6.4 [S].
- [S22] InfoWorld, "Four cutting-edge tools for spec-driven development" (Martin Heller, May 2026) — https://infoworld.com/article/4171332/four-cutting-edge-tools-for-spec-driven-development.html [S].
- [S23] Conductor repository — https://github.com/gemini-cli-extensions/conductor — accessed 2026-11-20 [P].
- [S24] Google Developers Blog on Conductor portability — https://developers.googleblog.com/ — accessed 2026-11-20 [S].
- [S25] Anthropic, "The AI-native SDLC playbook" (Louis Claxton) — https://claude.com/blog/the-ai-native-sdlc-playbook — 2026-08-21 [P].
- [S26] Claude Code, "Best practices for Claude Code" — https://code.claude.com/docs/en/best-practices — accessed 2026-11-20 [P]; original engineering post https://www.anthropic.com/engineering/claude-code-best-practices (2025, now redirects) [S].
- [S27] Waydev, "Anthropic's AI-Native SDLC playbook has a missing layer: measurement" — https://waydev.co/anthropics-ai-native-sdlc-playbook-has-a-missing-layer-measurement/ [S].
- [S28] DevOps.com, "From the Horse's Mouth: Anthropic Says AI Has Changed the SDLC" — https://devops.com/from-the-horses-mouth-anthropic-says-ai-has-changed-the-sdlc [S].
- [S29] Factory: Specification Mode — https://docs.factory.ai/cli/user-guides/specification-mode ; "Build with agents" — https://www.factory.ai/build-with-agents ; "What is a software factory" — https://factory.ai/articles/what-is-a-software-factory (Jan 2026) [S].
- [S32] Sonar, "The future is AC/DC: the Agent Centric Development Cycle" (Tariq Shaukat) — https://www.sonarsource.com/blog/the-future-is-ac-dc-the-agent-centric-development-cycle/ — date unverified [S].
- [S33] Sonar AC/DC docs — https://docs.sonarsource.com/agent-centric-development-cycle/ — accessed 2026-11-20 [S].
- [S34] Thoughtworks Radar, "Spec-driven development" (Assess) — https://www.thoughtworks.com/radar/techniques/spec-driven-development — 2025-11-05 [S].
- [S35] Thoughtworks Radar, "GitHub Spec Kit" — https://www.thoughtworks.com/radar/languages-and-frameworks/github-spec-kit — Apr 2026 [S].
- [S36] Böckeler, "Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl" — https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html — Oct 2025 [S].
- [S37] Böckeler, "Harness engineering for coding agent users" — https://martinfowler.com/articles/harness-engineering.html — 2026-04-02 [S].
- [S38] Böckeler, "Harness Engineering – first thoughts" — https://martinfowler.com/articles/exploring-gen-ai/harness-engineering-memo.html — 2026-02-17 [S].
- [S39] Kief Morris, "Humans and Agents in Software Engineering Loops" — https://martinfowler.com/articles/exploring-gen-ai/humans-and-agents.html — 2026-03-04 [S].
- [S40] Nguyen, "SDAD: Spec-Driven Agentic Development for the AI-Native SDLC" — https://arxiv.org/abs/2608.20341 — 2026 [S].
- [S41] Koch, "Agentic Agile-V: From Vibe Coding to Verified Engineering in Software and Hardware Development" — https://arxiv.org/abs/2605.20456 — 2026-05-19 [S].
- [S42] Koch and Wellbrock, "Agile V: A Compliance-Oriented Framework…" — https://arxiv.org/abs/2602.20684 — Feb 2026 [S].
- [S43] Microsoft, "Agentic DevOps: evolving software development with GitHub Copilot and Microsoft Azure" — https://azure.microsoft.com/en-us/blog/agentic-devops-evolving-software-development-with-github-copilot-and-microsoft-azure/ — 2025-05-19 [S].
- [S44] GitLab, "General Availability of GitLab Duo Agent Platform" — https://about.gitlab.com/press/releases/2026-01-15-gitlab-announces-duo-agent-platform-general-availability/ — 2026-01-15 [S].
- [S45] Atlassian, "Reimagining software development around an AI-native SDLC" — https://www.atlassian.com/blog/ai-at-work/ai-native-sdlc-paying-off-per-developer-per-week — accessed 2026-11-20 [S].
- [S46] Google Cloud, application-centric AI-powered cloud (Gemini Code Assist agents) — https://cloud.google.com/blog/products/application-development/an-application-centric-ai-powered-cloud — 2025 [S].
- [S47] Spec Kit fork "Agentic SDLC 12 Factors" — https://github.com/tikalk/agentic-sdlc-spec-kit — accessed 2026-11-20 [P].
- [S48] DORA, "2025 State of AI-assisted Software Development" — https://services.google.com/fh/files/misc/2025_state_of_ai_assisted_software_development.pdf — Sep 2025 [S].
- [S49] METR, "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity" — https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ — 2025-07-10 [S].
- [S50] Marmelab, "Spec-Driven Development: The Waterfall Strikes Back" — https://marmelab.com/blog/2025/11/12/spec-driven-development-waterfall-strikes-back — 2025-11-12 [S].
- [S51] Jellyfish, "How AI Agents Transform Every Phase of the SDLC" — https://jellyfish.co/library/how-ai-agents-transform-sdlc/ — accessed 2026-11-20 [S].

**Verification to-do before quoting:** confirm against the primary pages (blocked in this session) the Kiro phase-gate wording, the AI-DLC blog date, the Sonar blog date, Böckeler's exact level definitions, the Thoughtworks blip text, and the SDAD/Agile-V abstracts. Hosts to allow: kiro.dev, aws.amazon.com, martinfowler.com, thoughtworks.com, sonarsource.com, arxiv.org, docs.factory.ai, github.blog.
