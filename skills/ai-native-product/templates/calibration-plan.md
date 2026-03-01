# Calibration Plan Template

Use this template to set up continuous calibration for AI features.

---

## Feature: [AI FEATURE NAME]

**Created:** [Date]  
**Owner:** [PM Name]  
**ML Lead:** [Name]

---

## Calibration Overview

**The CCCD Loop:**
```
OBSERVE → IDENTIFY → CALIBRATE → VALIDATE → DEPLOY
    ↑                                          │
    └──────────────────────────────────────────┘
```

**Current calibration status:** [ ] Initial  [ ] Ongoing  [ ] Mature

---

## 1. OBSERVE: Data Collection

### Interaction Logging

| Data Point | What We Capture | Storage | Retention |
|------------|-----------------|---------|-----------|
| Input | User prompt/request | [System] | [Duration] |
| Output | AI response | [System] | [Duration] |
| User action | Accept/edit/reject | [System] | [Duration] |
| Edits made | Diff of changes | [System] | [Duration] |
| Feedback | Thumbs up/down, comments | [System] | [Duration] |
| Context | User segment, use case | [System] | [Duration] |

### Feedback Channels

| Channel | Type | Collection Method |
|---------|------|-------------------|
| In-product | Implicit | Accept/reject/edit tracking |
| In-product | Explicit | Thumbs up/down, ratings |
| Support | Explicit | Ticket tagging |
| Interviews | Qualitative | Monthly user sessions |

### Privacy & Compliance

- [ ] PII handling documented
- [ ] Data retention policy set
- [ ] User consent obtained
- [ ] Logging can be disabled per user

---

## 2. IDENTIFY: Pattern Recognition

### Automated Detection

| Pattern | Detection Method | Alert Threshold |
|---------|------------------|-----------------|
| Quality degradation | Rolling eval scores | < [X%] over [Y] days |
| New failure mode | Clustering of overrides | > [N] similar in [Y] hours |
| Drift | Distribution shift detection | [Method/threshold] |
| Latency spike | P95 monitoring | > [X]s |

### Manual Review Cadence

| Review | Frequency | Owner | Focus |
|--------|-----------|-------|-------|
| Override analysis | Daily | ML Eng | What are users correcting? |
| Feedback review | Weekly | PM | Themes in explicit feedback |
| Failure deep-dive | Weekly | Trio | Root cause of failures |
| Segment analysis | Monthly | PM | Quality variance by user type |

### Failure Categorization

| Category | Definition | Example |
|----------|------------|---------|
| **Accuracy** | Factually wrong | Wrong date, incorrect calculation |
| **Relevance** | Correct but not useful | Answered different question |
| **Completeness** | Missing key information | Partial response |
| **Style** | Wrong tone/format | Too formal, wrong structure |
| **Safety** | Policy violation | Harmful content |
| **Hallucination** | Made up information | Cited non-existent source |

---

## 3. CALIBRATE: Adjustment Methods

### Calibration Levers

| Lever | Speed | Effort | Use When |
|-------|-------|--------|----------|
| **Prompt tuning** | Fast (hours) | Low | Style issues, minor accuracy |
| **Few-shot examples** | Fast (hours) | Low | Format/structure issues |
| **Guardrail rules** | Fast (hours) | Low | Safety issues, edge cases |
| **Retrieval tuning** | Medium (days) | Medium | Relevance issues |
| **Fine-tuning** | Slow (weeks) | High | Systematic accuracy issues |
| **Model upgrade** | Slow (weeks) | High | Fundamental capability gaps |

### Current Calibration Actions

| Issue | Lever | Change | Status | Owner |
|-------|-------|--------|--------|-------|
| [Issue 1] | [Lever] | [What changed] | [ ] Planned [ ] In progress [ ] Done | [Name] |
| [Issue 2] | [Lever] | [What changed] | [ ] Planned [ ] In progress [ ] Done | [Name] |

### Calibration Backlog

| Issue | Priority | Evidence | Proposed Lever |
|-------|----------|----------|----------------|
| [Issue] | P1/P2/P3 | [Data supporting] | [Suggested approach] |

---

## 4. VALIDATE: Pre-Deploy Testing

### Validation Checklist

Before deploying calibration changes:

- [ ] Unit evals pass (no regression)
- [ ] Behavioral evals pass
- [ ] Targeted eval for specific issue shows improvement
- [ ] No new failure modes introduced
- [ ] Human eval sample approved
- [ ] Latency acceptable

### A/B Testing (When Applicable)

| Test | Control | Treatment | Metric | Duration |
|------|---------|-----------|--------|----------|
| [Test name] | [Current version] | [Calibrated version] | [Primary metric] | [Duration] |

**Success criteria:** [What determines winner]

---

## 5. DEPLOY: Staged Rollout

### Calibration Deployment Stages

| Stage | Audience | Duration | Gate Criteria |
|-------|----------|----------|---------------|
| Shadow | 0% (logging only) | 1-2 days | No errors |
| Canary | 5% | 2-3 days | Metrics stable |
| Gradual | 25% → 50% → 100% | 1 week | No degradation |

### Rollback Triggers

- [ ] Eval metrics drop > [X%]
- [ ] Override rate increases > [X%]
- [ ] Safety alert triggered
- [ ] Latency exceeds threshold

---

## Calibration Cadence

### Daily
- [ ] Check automated alerts
- [ ] Review override patterns
- [ ] Triage any P0 issues

### Weekly
- [ ] Feedback synthesis meeting
- [ ] Failure categorization review
- [ ] Calibration backlog grooming
- [ ] Update calibration actions

### Monthly
- [ ] Segment-level quality review
- [ ] Eval dataset refresh
- [ ] Calibration retrospective
- [ ] Agency level reassessment

---

## Calibration Metrics

| Metric | Baseline | Current | Target | Trend |
|--------|----------|---------|--------|-------|
| Override rate | [X%] | [Y%] | < [Z%] | ↑↓→ |
| User acceptance | [X%] | [Y%] | > [Z%] | ↑↓→ |
| Hallucination rate | [X%] | [Y%] | < [Z%] | ↑↓→ |
| Avg edits per output | [X] | [Y] | < [Z] | ↑↓→ |
| Time to calibrate | [X days] | [Y days] | < [Z days] | ↑↓→ |

---

## Roles & Responsibilities

| Role | Responsibilities |
|------|------------------|
| **PM** | Owns calibration priorities, feedback synthesis, user communication |
| **ML Lead** | Owns calibration implementation, eval maintenance |
| **Eng** | Owns logging infrastructure, deployment |
| **Ops/QA** | Owns human eval process, manual review |

---

## Calibration Health Check

- [ ] Logging captures all needed signals
- [ ] Alerts are configured and tested
- [ ] Weekly review cadence is maintained
- [ ] Calibration backlog is groomed
- [ ] Validation process is followed
- [ ] Rollback procedure is documented
- [ ] Metrics are trending in right direction

---

*Calibration plan created: [Date] | Last updated: [Date]*
