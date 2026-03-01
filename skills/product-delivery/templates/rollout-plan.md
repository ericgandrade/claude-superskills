# Rollout Plan Template

Use this template to plan staged rollouts that minimize risk and maximize learning.

---

## Rollout: [FEATURE/BET NAME]

**Rollout ID:** [RO-001]  
**Owner:** [PM Name]  
**Tech Lead:** [Name]  
**Created:** [Date]  
**Target GA:** [Date/Quarter]

---

## Rollout Overview

| Field | Value |
|-------|-------|
| **Bet** | [Link to bet] |
| **Solution Brief** | [Link] |
| **Feature Flag** | [Flag name] |
| **Rollback Runbook** | [Link] |

---

## Rollout Strategy

**Approach:** [ ] Staged %  [ ] Segment-based  [ ] Opt-in beta  [ ] Geography-based

**Total duration:** [X weeks]

---

## Stage 0: Internal Dogfooding

**Duration:** [1-3 days]

**Audience:**
- [ ] Product team
- [ ] Engineering team
- [ ] Wider internal team
- Size: [X people]

**Entry Criteria:**
- [ ] Feature complete (core flow)
- [ ] No known P0 bugs
- [ ] Basic instrumentation in place

**Activities:**
- [ ] Team uses feature in real work
- [ ] Bugs logged
- [ ] Quick usability feedback

**Exit Criteria:**
- [ ] No P0/P1 bugs found
- [ ] Core flow validated
- [ ] Team confidence to proceed

**Progression Decision:**
- **Date:** [Date]
- **Decision maker:** [Name]
- **Go/No-go meeting:** [If needed]

---

## Stage 1: Alpha (Friendly Customers)

**Duration:** [1 week]

**Audience:**
- Target: [5-10 customers]
- Selection criteria: [Engaged, forgiving, relevant use case]
- Recruitment: [How we'll invite them]

**Customers selected:**
| Customer | Contact | Use Case | Status |
|----------|---------|----------|--------|
| [Customer 1] | [Name] | [Relevance] | [ ] Invited [ ] Active |
| [Customer 2] | [Name] | [Relevance] | [ ] Invited [ ] Active |
| [Customer 3] | [Name] | [Relevance] | [ ] Invited [ ] Active |

**Entry Criteria:**
- [ ] Stage 0 complete
- [ ] Customers recruited and briefed
- [ ] Feedback channel established (Slack, calls, etc.)

**Activities:**
- [ ] Daily check-ins with alpha users
- [ ] Qualitative feedback sessions
- [ ] Bug triage and hotfixes
- [ ] Usability observation

**Feedback Collection:**
| Method | Frequency | Owner |
|--------|-----------|-------|
| Check-in calls | [Daily/Every other day] | [PM] |
| In-app feedback | Continuous | [Auto] |
| Bug reports | Continuous | [Eng] |

**Exit Criteria:**
- [ ] [X] of [Y] alpha users successful
- [ ] Net positive qualitative feedback
- [ ] No major usability blockers
- [ ] Critical bugs fixed

**Progression Decision:**
- **Date:** [Date]
- **Decision maker:** [PM]

---

## Stage 2: Beta (Limited Release)

**Duration:** [1-2 weeks]

**Audience:**
- Target: [10-25%] of users
- Segment: [All / Specific segment]
- Size: ~[X users]

**Entry Criteria:**
- [ ] Stage 1 complete with positive signal
- [ ] Leading metrics instrumented
- [ ] Guardrail alerts configured
- [ ] Support team briefed

**Activities:**
- [ ] Monitor leading metrics daily
- [ ] Watch guardrail dashboards
- [ ] Collect quantitative data
- [ ] Continue qualitative feedback (lighter touch)

**Metrics to Watch:**

| Metric | Type | Baseline | Target | Alert Threshold |
|--------|------|----------|--------|-----------------|
| [Adoption rate] | Leading | [X] | [Y] | < [Z] |
| [Task completion] | Leading | [X] | [Y] | < [Z] |
| [Error rate] | Guardrail | [X] | [Y] | > [Z] |
| [Support tickets] | Guardrail | [X] | [Y] | > [Z] |

**Exit Criteria:**
- [ ] Leading metrics trending toward target
- [ ] No guardrail breaches
- [ ] Error rate < [X%]
- [ ] Support load acceptable

**Progression Decision:**
- **Date:** [Date]
- **Decision maker:** [PM + Eng Lead]

---

## Stage 3: GA (Full Release)

**Duration:** Ongoing

**Audience:**
- 100% of users
- All segments

**Entry Criteria:**
- [ ] Stage 2 metrics met
- [ ] GTM checklist complete (see below)
- [ ] Documentation published
- [ ] Support fully trained

**Activities:**
- [ ] Monitor core metrics weekly
- [ ] Collect ongoing feedback
- [ ] Plan iteration based on data

**GTM Checklist:**

| Item | Owner | Status |
|------|-------|--------|
| Positioning finalized | [PMM] | [ ] |
| Sales enablement complete | [PMM] | [ ] |
| Support documentation | [PM] | [ ] |
| In-app messaging | [PM] | [ ] |
| External announcement | [Marketing] | [ ] |
| Changelog published | [PM] | [ ] |

---

## Rollback Plan

**Rollback trigger conditions:**
- [ ] Guardrail metric [X] exceeds [threshold]
- [ ] Error rate exceeds [X%]
- [ ] Critical bug affecting > [X%] of users
- [ ] Customer escalation at [severity]

**Rollback procedure:**
1. [Step 1: Disable feature flag]
2. [Step 2: Notify stakeholders]
3. [Step 3: Communicate to affected users]
4. [Step 4: Triage root cause]

**Rollback owner:** [Name]

**Rollback runbook:** [Link]

---

## Communication Plan

| Stage | Internal Comms | External Comms |
|-------|----------------|----------------|
| Stage 0 | Team Slack | None |
| Stage 1 | Team + CS | Alpha customer emails |
| Stage 2 | Full team + sales | Beta announcement (if opt-in) |
| Stage 3 | All hands | Full launch comms |

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk 1] | High/Med/Low | High/Med/Low | [Plan] |
| [Risk 2] | [X] | [X] | [Plan] |
| [Risk 3] | [X] | [X] | [Plan] |

---

## Rollout Timeline

```
Week 1         Week 2         Week 3         Week 4
─────────────────────────────────────────────────────
[Stage 0]      [  Stage 1   ] [   Stage 2   ] [GA]
 Internal       Alpha          Beta           Full
 2-3 days       1 week         1-2 weeks      →
```

---

## Decision Log

| Date | Stage | Decision | Rationale | Decided By |
|------|-------|----------|-----------|------------|
| [Date] | 0→1 | Proceed | [Why] | [Name] |
| [Date] | 1→2 | Proceed | [Why] | [Name] |
| [Date] | 2→GA | Proceed | [Why] | [Name] |

---

## Post-GA Review

**Scheduled:** [Date, 2-4 weeks after GA]

**Review items:**
- [ ] Core metrics vs. targets
- [ ] Feedback themes
- [ ] Iteration opportunities
- [ ] Scale/Iterate/Kill decision (links to bet retrospective)

---

*Rollout plan created: [Date] | Last updated: [Date]*
