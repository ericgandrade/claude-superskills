# Phase Boundaries — Managing Context Between Stages

Model reasoning degrades as the context window fills with stale material. Every stage transition is a chance to decide what the next stage should carry forward. Decide **at** a boundary; mid-stage, either continue or split the remainder into subagents.

## The five options

| Option | What it does | Cost | Use when |
|---|---|---|---|
| **Continue** | Stay in the current context | Nothing lost | The next stage depends on reasoning that lives only in this conversation |
| **Delegate** | Send a tightly scoped task to a subagent and receive a report | Subagent starts cold; needs a precise brief | The task is self-contained (a PLAN task, a review axis, a research question) |
| **Clear** | Start an empty context | Everything not written down is lost | Nothing in the current context matters to what comes next |
| **Hand off** | Write a portable Markdown handoff file, then start fresh from it | Time to write; loses nuance not captured | Switching tool, directory, machine or person; forking a side task mid-stage |
| **Compact** | Summarize the context and continue from the summary | Summaries drop detail | The context is near its useful limit and the work must continue in one thread |

## Decision order

1. **Does the next stage need reasoning that exists only in this conversation?** → Continue. (Typical for PL → AN → DE: the SPEC and PLAN should be built on the same thinking.)
2. **Is the next unit of work self-contained with a written brief?** → Delegate. (Typical for BU tasks from PLAN.md, independent test design, parallel review axes.)
3. **Is everything that matters already in artifacts (SPEC, PLAN, CHECKPOINTS)?** → Clear and resume from the artifacts.
4. **Is the work moving to another tool, directory or person?** → Hand off.
5. **Otherwise** → Compact at the nearest stage boundary.

## Default pattern for the cycle

| Transition | Default | Why |
|---|---|---|
| PL → AN → DE | Continue | One unbroken line of reasoning from intent to plan |
| DE → BU | Clear or delegate per task | PLAN.md is self-contained by design; each task starts fresh |
| BU task → BU task | Delegate (subagent mode) or continue (inline mode) | Fresh context per task avoids drift |
| BU ⇄ TE | Delegate independent test design (QA Agent) | The builder does not grade itself |
| TE → RV | Delegate parallel review lenses (Review Agent) | Reviewers start without the author's reasoning |
| RV → DP | Continue | Shipping uses the evidence and approval just produced |
| DP → OP | Continue through the watch period, then clear | Operate needs the release context; later incidents start from HANDOVER.md |
| OP → next PL | Clear after RETRO.md is written | Learnings live in project-context and new triage items, not in chat |

## Handoff file template

```markdown
# HANDOFF — <feature> — <date>

**Stage:** <PL|AN|DE|BU|TE|RV|DP|OP> · **Route:** <Quick|Standard|Full>
**Artifacts:** <paths to SPEC, PLAN, CHECKPOINTS, VERIFICATION>
**Done:** <bullets>
**In progress:** <task, state, last command and its result>
**Next step:** <one concrete action>
**Decisions made in conversation but not yet in artifacts:** <bullets — move them into artifacts first if possible>
**Open questions for the human:** <bullets>
```

Write decisions into the proper artifact (SPEC, ADR, CHECKPOINTS) before handing off; the handoff file is a pointer, not the record.
