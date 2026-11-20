# How BMad Method and Matt Pocock's Skills Structure Delivery

**Purpose:** Input for the Agentic SDLC structure decision (D10). Describes how the two frameworks the owner wants to draw inspiration from organize work end to end — entry points, flow, roles, artifacts, decision points, sizing — and which of their terms are industry-standard vs framework-specific.

**Sources:** derived only from the deep inventories in this repo (no new reading): `docs/research/inventory/bmad.md` (BMad v7 preview, commit `e435a22`; mechanism IDs BM-xx) and `docs/research/inventory/mattpocock.md` (commit `5863806`; IDs MP-xx). Claims cite those IDs; verify against the inventories before relying on details. BMad v6 phase names are covered by the AI-native methods research, not here.

---

## 1. BMad Method v7 — "start anywhere" delivery loop

### Entry points and sizing
- The process **sizes itself to the work**: a vague notion starts at clarification, a big clear idea at planning, a small change goes straight to build-and-verify; learning loops back to planning (BMad README; inventory §5.1).
- Per change, a **route** is chosen: light ("oneshot") vs full. The code uses a line-count threshold; the docs describe a risk test (intent gaps, irreversible actions, footprint) (BM-05; inventory §6 recommends the risk test).

### Flow (inventory §5.1)
1. **Shape** (optional, any order): brainstorming / idea forging → research → brief or PRFAQ → PRD (when several people must agree) → UX. Nothing is built here.
2. **Specify:** requirements and constraints of the top-level ticket, with a decision log (BM-48–BM-53).
3. **Slice:** initiative → thin epics in build order → stories; shared decisions captured in a short **architecture** document; stories validated in fresh context (BM-43, BM-55, BM-56, BM-59).
4. **Build, one session per story:** clarify and route → investigate and plan → **checkpoint** (human approves the plan on attended runs) → implement via fresh subagent → verify and audit the edge-case matrix → parallel review lenses → verify-then-verdict triage → patch / loop back / defer → commit → plan status `built` (BM-05–BM-40).
5. **Validate:** the user marks done; optional walkthrough or E2E test generation (BM-38, BM-39, BM-82, BM-83).
6. **Change mid-flight:** replan, resuming at the earliest affected step (BM-60).
7. **Close the epic:** retrospective over the whole epic with an acceptance **verdict** that gates the next epic (BM-84–BM-87).
8. **Learn:** observed agent mistakes go into the AGENTS.md block (BM-81).

### Roles
Functional roles delivered as agents (with persona names the plan rejects): Analyst, Product Manager, Architect, UX Designer, **Product Owner** (requirements, slicing, board, replanning — absorbed v6's spec/epics/sprint/correct-course skills), Developer (inventory §5.3, header).

### Artifacts
Brief / PRFAQ, PRD, UX documents, architecture document, ticket tree (initiative → epics → stories) with prerequisites, a **plan per story** whose frontmatter holds status, route, risk, review depth and loop counter, decision logs, deferred-work ledger, retrospective with verdict (BM-18, BM-19, BM-47, BM-58, §5.3).

### Decision points
Plan approval before build (attended route), user marks done, retrospective verdict gates the next epic, replan on change. Status values: `ready-for-dev`, `in-progress`, `in-review`, `done`, `blocked` (§5.3 migration mapping).

### Strengths worth keeping
Right-sizing and multiple entry points; one fresh session per story; hand-off by file path, never pasted content (§5.2); verify-then-verdict review triage and root-cause loopbacks (BM-32, BM-33); acceptance verdict with fail-safes (BM-87); frozen human-owned intent block (BM-12).

---

## 2. Matt Pocock's skills — main flow with on-ramps

### Entry points (on-ramps) — inventory §6
- **Main flow** for an idea to build.
- **Triage** for incoming issues (bug / enhancement; states needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix) (MP-33).
- **Diagnosing bugs** for something broken (tight red feedback loop first).
- **Wayfinder** for huge, foggy efforts (decision tickets until the way is clear).
- **Improve codebase architecture** as a health on-ramp that generates ideas.

### Main flow (§6)
Grill (interview, writes GLOSSARY.md and ADRs) → optional prototype → if multi-session: **to-spec** (synthesize; problem, solution, numbered user stories, implementation and testing decisions, out of scope — MP-31, MP-32) → **to-tickets** (tracer-bullet vertical slices with blocking edges) → **implement** per ticket in a fresh context, or implement the whole spec as a task graph in parallel → **code review** (standards + spec axes) → **PR** (visual, before/after evidence, one-way/two-way door) → **retro** (improve the environment: checks, standards, pointers).

### Roles
No formal roles; the human decides, the agent finds facts ("facts are the agent's job, decisions are the human's"). HITL vs AFK distinguishes work needing a human from autonomous work (§5).

### Artifacts
GLOSSARY.md, ADRs, spec (in tracker or local), tickets with blocking edges and agent briefs (MP-35), PR body, out-of-scope records (MP-37).

### Decision points
User answers each grilling round; user confirms test seams in the spec; user approves ticket breakdown ("quiz"); PR review; retro suggestions accepted by the user.

### Strengths worth keeping
On-ramps instead of one entry; synthesize-don't-reinterview spec; tracer bullets with blocking edges and a parallel frontier; fresh context per ticket; context hygiene at phase boundaries; retros that change the environment, not the code.

---

## 3. What the two have in common

| Aspect | BMad v7 | Matt Pocock | Common pattern |
|---|---|---|---|
| Entry | Start anywhere by size | On-ramps by situation | **Multiple entry points, not one pipeline** |
| Front end | Shape → Specify | Grill → Spec | **Clarify, then write a spec** |
| Decomposition | Epics → stories (thin slices) | Tickets (tracer bullets, blocking edges) | **Thin vertical slices with dependencies** |
| Build | One fresh session per story, subagent implements | Fresh context per ticket, TDD | **Small unit of work in a clean context** |
| Review | Parallel lenses + triage | Two-axis review | **Independent, structured review before merge** |
| Close | Retrospective verdict per epic | Retro changes the environment | **Learn and feed back** |
| Hand-off | By file path | By artifact in tracker | **Artifacts, not chat, carry state** |
| Gaps (both) | No operations stage; no formal evidence log; no security stage | Same, plus no formal roles | Opportunity for the Agentic SDLC |

---

## 4. Vocabulary: standard vs framework-specific

| Term | Used by | Status |
|---|---|---|
| Spec / specification, requirements, acceptance criteria | Both (+ most methods) | **Standard** |
| Epic, story / user story | BMad (Matt uses user stories inside specs) | **Standard** (agile) |
| Ticket / issue, triage | Both | **Standard** |
| Architecture document, ADR | Both | **Standard** |
| PR, code review | Both | **Standard** |
| Retrospective | Both | **Standard** (Scrum) |
| Definition of done (concept) | BMad (user marks done; readiness checks) | **Standard** (Scrum) |
| PRD, brief, PRFAQ | BMad | PRD standard; PRFAQ Amazon-specific |
| Tracer bullet | Matt (from *The Pragmatic Programmer*) | Recognized but niche |
| Grill / grilling, wayfinder, smart zone | Matt | Framework-specific — avoid as stage names |
| Spine, entry, oneshot, lens | BMad | Framework-specific — avoid as stage names |

**Implication (preliminary, to be confirmed against the three broader research files):** a structure that uses the standard terms above (requirements/spec, design/architecture, stories or tasks, build, review, release, retrospective) with multiple entry points and thin slices would match both frameworks' strengths while staying recognizable. Framework-specific terms may survive as technique names inside skills, never as stage names.
