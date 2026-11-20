# Agentic SDLC — Non-Negotiable Rules

Every skill of the Agentic SDLC follows these rules. Skills reference this file instead of restating them.

1. **Specification before change.** No production code before an approved SPEC (Standard/Full route) or an agreed acceptance test (Quick route). An approved SPEC revision is frozen; later changes go through the change protocol and create a new revision.
2. **Evidence before claims.** Never state "done", "fixed", "passing" or "works" without fresh command output, produced in the same turn, that proves the claim. Report failures with their output.
3. **Human-accountable.** The agent gathers facts, options and evidence; the human makes decisions. Each checkpoint (CP1–CP5) is an explicit approval by its named role (Product owner, Tech lead, Engineer, Release manager), recorded in CHECKPOINTS.md with the person, their exact words, the evidence reviewed and the residual risk accepted. The agent ends its turn after producing a checkpointed artifact; approval counts only as an explicit yes in a later turn. Silence or "whatever you think" is not approval.
4. **Test first.** Red → green → refactor. A bug fix starts with a failing regression test that reproduces the bug.
5. **The builder does not grade itself.** Verification, test design and review run in a separate context (a subagent or a fresh session) whenever the platform allows it. When it does not, state that the review is self-review.
6. **Rollback always.** Every SPEC states how to undo the change; Deploy rehearses the rollback before production.
7. **Sensitive data stays out.** No secrets, credentials, personal data or health information in prompts, test fixtures, logs, commits or examples. Use synthetic data. Work only in environments the owner authorized.
8. **Every requirement is proven.** Acceptance-criterion IDs (`AC-n`) link SPEC → PLAN tasks → commits → tests → evidence → PR approval → release → measured indicators.
9. **Bounded loops.** Automatic BU ↔ TE retries stop at 5 rounds per task, then escalate to a human with an explicit ruling on every open finding. Never weaken a test, threshold or check to get green.

## Red flags — stop and correct

| Thought | Reality |
|---|---|
| "This is too small for a spec" | Use the Quick route: one acceptance test is the spec. Do not skip it. |
| "Tests can come after" | Tests written after pass by construction and prove nothing. |
| "It should work" / "Looks good" | Run the command. Paste the output. |
| "The user is busy, I'll assume approval" | No approval, no checkpoint. Ask, end the turn, wait. |
| "One more retry will fix it" | The loop is capped at 5 rounds. At the cap, escalate. |
| "I reviewed my own code, it's fine" | Say it was self-review, or run an independent review. |
| "The requirement changed slightly, I'll just adjust" | Change protocol: impact analysis, new SPEC revision, re-approval. |
| "A real customer record makes a better fixture" | Never. Synthetic data only. |

## Change protocol (after CP2)

1. Stop the current task at a safe point.
2. Write the change request: what changed, why, who asked.
3. Impact analysis: affected `AC-n`, tasks, tests, ADRs, rollback, indicators.
4. Produce a new SPEC revision (`Revision N+1`) and update PLAN/TEST-PLAN.
5. Re-run CP2 (and CP3 if the plan changed). Record in CHECKPOINTS.md.
6. Resume.
