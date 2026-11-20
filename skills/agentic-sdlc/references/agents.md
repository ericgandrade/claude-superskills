# Agentic SDLC — Agent Roles

Each stage is run by a functional **agent role**: a scoped brief that defines what the role reads, which skills it uses, what it may and may not do, and what it must hand back. Roles are not personas; they exist for context isolation, least privilege and separation of duties (the agent that builds never tests or reviews its own work).

On platforms with subagents, dispatch each role as a fresh subagent with the brief below plus the artifacts it needs. On platforms without subagents, run the role inline in a clearly separated pass and label any self-check as self-review.

| Role | Stage | Reads | Uses skills | May | Must not | Returns |
|---|---|---|---|---|---|---|
| **Triage Agent** | PL | Issue/request, backlog, AGENTS.md block, CONSTRAINTS.md | `issue-triage`, `project-context`, `brainstorming` | Score readiness, propose priority and route, ask clarifying questions | Start analysis or design before CP1 | Triage record: readiness score, priority, route, open questions |
| **Analyst Agent** | AN | Triage record, brief, GLOSSARY.md, relevant code | `grill-me`, `spec-driven-development`, `codebase-modernization` (inventory), `security-hardening` | Interview, look up facts, draft SPEC | Make product decisions; edit a frozen SPEC | SPEC.md draft + doubt-pass findings |
| **Architect Agent** | DE | Frozen SPEC, ADRs, CONSTRAINTS.md, code | `senior-solution-architect`, `writing-plans`, `security-hardening` | Propose ADRs, design interfaces, write PLAN.md | Add scope not in the SPEC | ADRs (Proposed) + PLAN.md + coverage check |
| **Coding Agent** | BU | One PLAN task brief + referenced files only | `executing-plans`, `test-driven-development`, `systematic-debugging` | Write tests and code for its task, commit `[Tn, AC-n]` | Touch files outside its task, weaken tests, mark its own work as verified | Implementer report: status, commits, test output, concerns |
| **QA Agent** | TE | Frozen SPEC (not the implementation reasoning), code under test | `test-strategy`, `verification-gate` | Design tests from the SPEC, run suites, record evidence | Accept the Coding Agent's claims without re-running | TEST-PLAN.md, VERIFICATION.md, TRACEABILITY.md, gaps |
| **Review Agent** | RV | Diff, SPEC, ADRs, CONSTRAINTS.md, evidence | `multi-axis-code-review`, `security-hardening` | Review on all axes in parallel lenses, verify findings | Fix code itself; rank across axes; trust the PR description | Findings (Critical / Important / Minor), routed by root cause, "declined to judge" list |
| **Release Agent** | DP | Approved PR, SPEC rollback, CONSTRAINTS.md, CI config | `deployment-pipeline`, `shipping-and-handover` | Prepare rollout, flags, rollback rehearsal, PR/release notes, handover | Deploy to production or tag without CP5 | Release plan, rehearsal result, HANDOVER.md, runbook |
| **SRE Agent** | OP | SLOs, dashboards/logs, incident reports, SPEC indicators | `operations-and-incidents`, `retrospective` | Watch SLOs, triage incidents, draft postmortems, measure indicators | Take destructive production actions without the on-call engineer | SLO report, incident record, postmortem, RETRO.md, new PL items |

## Status vocabulary (shared by every role report)

`DONE` · `DONE_WITH_CONCERNS` (lists them) · `BLOCKED` (names the blocker and what would unblock it) · `NEEDS_CONTEXT` (names the missing input) · `CANNOT_VERIFY` (states what could not be checked and why).

## Severity scale (shared)

**Critical** — blocks CP4/CP5. **Important** — must be fixed or explicitly accepted as residual risk. **Minor** — deferred list, triaged at the end.
