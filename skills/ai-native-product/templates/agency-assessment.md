# Agency Assessment Template

Use this template to determine the appropriate autonomy level for an AI feature and plan its progression.

---

## Feature: [AI FEATURE NAME]

**Assessment Date:** [Date]  
**Assessor:** [PM Name]  
**Status:** [ ] Initial Assessment  [ ] Reassessment

---

## Feature Description

**What the AI does:**
> [Brief description of the AI capability]

**User context:**
> [When and why users engage with this feature]

**Current state:** [ ] New feature  [ ] Existing feature being upgraded

---

## Agency Level Framework

| Level | Description | AI Does | User Does |
|-------|-------------|---------|-----------|
| **1. Assist** | AI suggests, user executes | Generates options | Chooses and acts |
| **2. Recommend** | AI ranks, user approves | Analyzes and recommends | Reviews and approves |
| **3. Execute with confirmation** | AI acts after approval | Prepares action | Confirms before execution |
| **4. Execute with notification** | AI acts, notifies after | Acts autonomously | Reviews outcomes |
| **5. Fully autonomous** | AI acts without notification | Handles end-to-end | Sets goals, reviews exceptions |

---

## Risk Assessment

### Consequences of AI Error

| Factor | Assessment | Score (1-5) |
|--------|------------|-------------|
| **Reversibility** | Can the action be undone? | [X] |
| | 1 = Easily reversible, 5 = Permanent |
| **Impact scope** | Who is affected by errors? | [X] |
| | 1 = Only user, 5 = Many third parties |
| **Financial risk** | What's the cost of errors? | [X] |
| | 1 = Trivial, 5 = Significant financial loss |
| **Reputation risk** | Does error damage user's reputation? | [X] |
| | 1 = No impact, 5 = Severe reputation damage |
| **Safety risk** | Could errors cause harm? | [X] |
| | 1 = No safety concern, 5 = Potential harm |

**Total Risk Score:** [Sum] / 25

**Risk Level:**
- 5-10: Low risk → Can consider higher agency
- 11-17: Medium risk → Moderate agency with safeguards
- 18-25: High risk → Lower agency, more oversight

### Error Tolerance Assessment

| Question | Answer |
|----------|--------|
| What's the worst case if AI gets this wrong? | [Description] |
| How quickly must errors be caught? | [Immediately / Hours / Days] |
| What's the user's "undo" option? | [Description] |
| Are errors easily detectable by the user? | [Yes / No / Depends] |

---

## Trust Calibration

### Current User Trust Level

| Factor | Assessment | Score (1-5) |
|--------|------------|-------------|
| **Prior AI experience** | Have users used AI tools before? | [X] |
| | 1 = No experience, 5 = Heavy AI users |
| **Domain expertise** | Can users spot AI errors? | [X] |
| | 1 = Novices, 5 = Domain experts |
| **Verification ability** | Can users easily verify AI output? | [X] |
| | 1 = Difficult to verify, 5 = Easy to verify |
| **Current trust signals** | What do users say about AI? | [X] |
| | 1 = Skeptical, 5 = Enthusiastic |

**Trust Score:** [Sum] / 20

### Trust Building Requirements

| If trust is low (4-10) | Actions needed |
|-----------------------|----------------|
| Show AI reasoning | [ ] Required |
| Allow easy editing | [ ] Required |
| Provide undo options | [ ] Required |
| Build track record | [ ] Required |

---

## Recommended Agency Level

### Assessment Matrix

| Risk Level | Trust Level | Recommended Starting Agency |
|------------|-------------|----------------------------|
| Low | High | Level 3-4 |
| Low | Low | Level 2-3 |
| Medium | High | Level 2-3 |
| Medium | Low | Level 1-2 |
| High | Any | Level 1-2 |

### Recommendation

**Recommended starting level:** Level [X] — [Name]

**Rationale:**
> [2-3 sentences explaining why this level is appropriate]

**Key factors:**
- [Factor 1]
- [Factor 2]
- [Factor 3]

---

## Agency Progression Plan

### Current → Target Path

```
Current: Level [X] → Target: Level [Y]

Level [X] ──[Criteria]──> Level [X+1] ──[Criteria]──> Level [Y]
```

### Graduation Criteria

| From | To | Criteria | Measurement |
|------|-----|----------|-------------|
| Level 1 → 2 | Assist → Recommend | User accepts suggestions > 70% | [How measured] |
| Level 2 → 3 | Recommend → Execute+confirm | User approves recommendations > 80% | [How measured] |
| Level 3 → 4 | Execute+confirm → Execute+notify | User confirms without edit > 90% | [How measured] |
| Level 4 → 5 | Execute+notify → Autonomous | Override rate < 5% | [How measured] |

### Graduation Timeline Estimate

| Milestone | Estimated Timeline | Dependencies |
|-----------|-------------------|--------------|
| Reach Level [X+1] | [X weeks/months] | [What must happen] |
| Reach Level [Y] | [X weeks/months] | [What must happen] |

### Never Fully Autonomous

This feature should **never** reach Level 5 if:
- [ ] Actions are irreversible
- [ ] High financial stakes
- [ ] Affects third parties significantly
- [ ] Legal/compliance requirements
- [ ] Safety-critical domain

**Applicable?** [ ] Yes → Cap at Level 4 max  [ ] No → Level 5 possible

---

## Safeguards by Level

### Level [Recommended]: [Name]

**Required safeguards:**

| Safeguard | Description | Implementation |
|-----------|-------------|----------------|
| [Safeguard 1] | [What it does] | [How to build] |
| [Safeguard 2] | [What it does] | [How to build] |
| [Safeguard 3] | [What it does] | [How to build] |

**Confidence mechanisms:**

| Mechanism | Purpose |
|-----------|---------|
| [Mechanism 1] | [How it builds trust] |
| [Mechanism 2] | [How it builds trust] |

**Verification options for user:**

| Option | Description |
|--------|-------------|
| [Option 1] | [How user verifies] |
| [Option 2] | [How user verifies] |

---

## Metrics to Track

### Agency-Specific Metrics

| Metric | Definition | Target | Informs |
|--------|------------|--------|---------|
| **Acceptance rate** | % of AI suggestions accepted | > [X%] | Graduation readiness |
| **Override rate** | % of AI actions user corrects | < [X%] | Calibration needs |
| **Confirmation rate** | % confirmed without edit | > [X%] | Graduation readiness |
| **Time to action** | How long user takes to respond | < [X sec] | Trust level |
| **Reversion rate** | % of AI actions undone later | < [X%] | Quality signal |

### Tracking Plan

| Metric | Instrumentation | Dashboard | Alert Threshold |
|--------|-----------------|-----------|-----------------|
| [Metric] | [How tracked] | [Where visible] | [When to alert] |

---

## Reassessment Triggers

Reassess agency level when:

- [ ] Graduation criteria met (consider level up)
- [ ] Override rate increases significantly (consider level down)
- [ ] New failure mode discovered
- [ ] User feedback trend changes
- [ ] Major model/capability update
- [ ] Regulatory change
- [ ] 90 days since last assessment

**Next scheduled reassessment:** [Date]

---

## Sign-Off

| Role | Name | Approved | Date |
|------|------|----------|------|
| PM | [Name] | [ ] | |
| Eng Lead | [Name] | [ ] | |
| Design Lead | [Name] | [ ] | |
| Legal/Compliance (if needed) | [Name] | [ ] | |

---

*Assessment created: [Date] | Last updated: [Date]*
