# Metrics Hierarchy Template

Use this template to design a clear metrics hierarchy that connects feature activity to business outcomes.

---

## Product/Bet: [NAME]

**Owner:** [PM Name]  
**Created:** [Date]  
**Last Updated:** [Date]

---

## Metrics Hierarchy Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     LAGGING METRICS                             │
│                 (Business outcomes)                             │
│                 Move: Monthly/Quarterly                         │
├─────────────────────────────────────────────────────────────────┤
│                      CORE METRICS                               │
│                (Primary outcomes for bet)                       │
│                    Move: Weekly                                 │
├─────────────────────────────────────────────────────────────────┤
│                    LEADING METRICS                              │
│                (Early signal, fast feedback)                    │
│                    Move: Daily                                  │
├─────────────────────────────────────────────────────────────────┤
│                   GUARDRAIL METRICS                             │
│               (Don't let these degrade)                         │
│                   Monitor: Real-time                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## Lagging Metrics

> Business outcomes influenced by many factors. Use for strategic planning, not daily decisions.

| Metric | Definition | Current | Target | Measurement |
|--------|------------|---------|--------|-------------|
| **[Revenue]** | [How calculated] | [X] | [Y] | Monthly |
| **[Retention]** | [How calculated] | [X] | [Y] | Monthly |
| **[NPS]** | [How calculated] | [X] | [Y] | Quarterly |
| **[LTV]** | [How calculated] | [X] | [Y] | Quarterly |

**How these connect to strategy:**
> [Explain how these metrics reflect strategic objectives]

**Limitations:**
- Slow to move (monthly/quarterly)
- Hard to attribute to specific bets
- Influenced by many factors

**Use for:**
- Quarterly/annual planning
- Board reporting
- Long-term trend analysis

---

## Core Metrics

> The primary outcomes your bets target. These are what you're trying to move.

| Metric | Definition | Current | Target | Measurement |
|--------|------------|---------|--------|-------------|
| **[Activation rate]** | [% of signups who complete X within Y days] | [X%] | [Y%] | Weekly |
| **[Engagement score]** | [How calculated] | [X] | [Y] | Weekly |
| **[Conversion rate]** | [% of X who do Y] | [X%] | [Y%] | Weekly |
| **[Feature adoption]** | [% of MAU using feature] | [X%] | [Y%] | Weekly |

**How these connect to lagging metrics:**
```
Core: Activation rate ↗ → Lagging: Retention ↗ → Revenue ↗
Core: Engagement ↗ → Lagging: NPS ↗ → Retention ↗
```

**Use for:**
- Bet success criteria
- Weekly team reviews
- Prioritization decisions

---

## Leading Metrics

> Early signals that predict core metric movement. Fast feedback for iteration.

| Metric | Definition | Current | Target | Measurement | Leading Indicator For |
|--------|------------|---------|--------|-------------|----------------------|
| **[Onboarding completion]** | [% completing onboarding] | [X%] | [Y%] | Daily | Activation |
| **[First value action]** | [% completing X in first session] | [X%] | [Y%] | Daily | Activation |
| **[DAU/MAU ratio]** | [Daily active / Monthly active] | [X] | [Y] | Daily | Engagement |
| **[Feature discovery]** | [% who find feature] | [X%] | [Y%] | Daily | Feature adoption |
| **[Task completion rate]** | [% who complete X task] | [X%] | [Y%] | Daily | Core engagement |

**Leading → Core Relationships:**
```
Leading: Onboarding completion ↗ → Core: Activation rate ↗
Leading: Feature discovery ↗ → Core: Feature adoption ↗
Leading: Task completion ↗ → Core: Engagement score ↗
```

**Use for:**
- Daily monitoring
- Rollout gate decisions
- Rapid iteration

---

## Guardrail Metrics

> Metrics you won't let degrade while optimizing for primary goals.

| Metric | Definition | Current | Threshold | Alert At | Action |
|--------|------------|---------|-----------|----------|--------|
| **[Error rate]** | [% of requests with errors] | [X%] | [< Y%] | [Z%] | Pause rollout |
| **[Page load time]** | [P95 load time] | [X sec] | [< Y sec] | [Z sec] | Investigate |
| **[Support ticket rate]** | [Tickets per 1K MAU] | [X] | [< Y] | [Z] | Pause rollout |
| **[Unsubscribe rate]** | [% unsubscribing] | [X%] | [< Y%] | [Z%] | Review messaging |
| **[Core feature usage]** | [Usage of critical feature] | [X] | [> Y] | [< Z] | Investigate |

**Alert Configuration:**
| Guardrail | Alert Method | Recipient | Response SLA |
|-----------|--------------|-----------|--------------|
| Error rate | PagerDuty | Eng lead | 15 min |
| Support tickets | Slack | PM | 4 hours |
| Performance | DataDog | Eng lead | 1 hour |

**Use for:**
- Real-time monitoring
- Rollout go/no-go
- Rollback triggers

---

## Metric Relationships Diagram

```
                    LAGGING (Quarterly)
                    ┌─────────────────┐
                    │    Revenue      │
                    │   Retention     │
                    │      NPS        │
                    └────────▲────────┘
                             │
                    CORE (Weekly)
                    ┌────────┴────────┐
                    │   Activation    │
                    │   Engagement    │
                    │   Conversion    │
                    └────────▲────────┘
                             │
                  LEADING (Daily)
        ┌────────────────────┼────────────────────┐
        │                    │                    │
┌───────┴───────┐   ┌───────┴───────┐   ┌───────┴───────┐
│  Onboarding   │   │ First value   │   │    Task       │
│  completion   │   │    action     │   │  completion   │
└───────────────┘   └───────────────┘   └───────────────┘

        ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
                    GUARDRAILS (Real-time)
        ┌─────────────┬─────────────┬─────────────────┐
        │ Error rate  │ Performance │ Support tickets │
        └─────────────┴─────────────┴─────────────────┘
```

---

## Dashboard Design

### Daily Dashboard (Leading + Guardrails)

| Section | Metrics | Visualization |
|---------|---------|---------------|
| Today's health | Error rate, load time | Status lights |
| Leading metrics | Onboarding, first value | Trend lines (7-day) |
| Guardrail alerts | Any breaches | Alert list |

### Weekly Dashboard (Core + Leading)

| Section | Metrics | Visualization |
|---------|---------|---------------|
| Core metrics | Activation, engagement | Week-over-week trend |
| Leading metrics | All leading | Comparison to targets |
| Cohort analysis | New user performance | Cohort chart |

### Monthly/Quarterly Dashboard (Lagging + Core)

| Section | Metrics | Visualization |
|---------|---------|---------------|
| Business health | Revenue, retention, NPS | Long-term trend |
| Core trends | All core metrics | Month-over-month |
| Attribution | Bet impact analysis | Contribution chart |

---

## Metric Selection Checklist

For each metric, verify:

- [ ] **Measurable** — We can actually track this today
- [ ] **Actionable** — We can influence it with our work
- [ ] **Attributable** — We can connect changes to our bet
- [ ] **Timely** — We'll see signal fast enough to decide
- [ ] **Not gameable** — Can't be artificially inflated
- [ ] **Understood** — Team agrees on definition

---

## Instrumentation Status

| Metric | Instrumented | Data Source | Owner | Status |
|--------|--------------|-------------|-------|--------|
| [Metric 1] | [ ] Yes [ ] No | [Source] | [Name] | 🟢 Ready |
| [Metric 2] | [ ] Yes [ ] No | [Source] | [Name] | 🟡 In progress |
| [Metric 3] | [ ] Yes [ ] No | [Source] | [Name] | 🔴 Not started |

---

## Review Cadence

| Review | Frequency | Attendees | Focus |
|--------|-----------|-----------|-------|
| Daily standup | Daily | Trio | Leading + guardrails |
| Weekly review | Weekly | Team | Core metrics, trends |
| Monthly review | Monthly | Team + stakeholders | Core + lagging |
| Quarterly review | Quarterly | Leadership | Full hierarchy |

---

*Metrics hierarchy created: [Date] | Last updated: [Date]*
