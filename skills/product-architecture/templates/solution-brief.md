# Solution Brief Template

Use this template to provide enough context to start building without over-prescribing the solution. Replaces heavyweight PRDs.

---

## Solution Brief: [NAME]

**Brief ID:** [SB-001]  
**Status:** [ ] Draft  [ ] Shaped  [ ] Ready  [ ] In Progress  [ ] Complete  
**Owner:** [PM Name]  
**Created:** [Date]  
**Last Updated:** [Date]

---

## Context

| Field | Value |
|-------|-------|
| **Bet** | [Link to bet in backlog] |
| **Opportunity** | [Link to validated opportunity in OST] |
| **Block** | [Which capability block] |
| **Target User** | [Specific persona] |
| **Priority** | [P0 / P1 / P2] |

---

## The Problem

> 2-3 sentences on what problem we're solving and for whom. Be specific.

[Problem statement]

**Why this problem matters:**
> [Business impact, customer pain intensity]

**Why now:**
> [What makes this urgent or timely]

---

## Customer Evidence

**Key quote:**
> "[Actual quote from discovery interview]"  
> — [Role, Company type]

**Supporting evidence:**
| Source | Finding |
|--------|---------|
| [Interview 1] | [What they said] |
| [Interview 2] | [What they said] |
| [Data point] | [What it shows] |

**Number of interviews mentioning this:** [X]

---

## Success Metrics

### Primary Metric

| Metric | Baseline | Target | Measurement Method |
|--------|----------|--------|-------------------|
| [Primary metric] | [Current value] | [Target value] | [How we'll track] |

### Secondary Metrics

| Metric | Baseline | Target |
|--------|----------|--------|
| [Secondary 1] | [X] | [Y] |
| [Secondary 2] | [X] | [Y] |

### Guardrail Metrics

> Metrics we won't let degrade while pursuing the primary goal

| Guardrail | Threshold | Action if Breached |
|-----------|-----------|-------------------|
| [Metric] | [Don't go below X] | [What we'll do] |

---

## Solution Approach

> High-level description of the approach. NOT detailed specs — those emerge through design and development.

**The core idea:**
> [2-3 sentence summary of the solution approach]

**How it works:**
1. [Step 1 / Component 1]
2. [Step 2 / Component 2]
3. [Step 3 / Component 3]

**Why this approach:**
> [Rationale for choosing this approach over alternatives]

**Alternatives considered:**

| Alternative | Why Not |
|-------------|---------|
| [Alternative A] | [Reason] |
| [Alternative B] | [Reason] |

---

## Key Decisions Made

> Decisions that are locked and should not be revisited without new evidence

| Decision | Rationale | Decided By | Date |
|----------|-----------|------------|------|
| [Decision 1] | [Why] | [Who] | [When] |
| [Decision 2] | [Why] | [Who] | [When] |
| [Decision 3] | [Why] | [Who] | [When] |

---

## Open Questions

> Questions that need to be answered during design/development

| Question | Owner | Target Date | Status |
|----------|-------|-------------|--------|
| [Question 1] | [Name] | [Date] | 🔴 Open |
| [Question 2] | [Name] | [Date] | 🟡 In Progress |
| [Question 3] | [Name] | [Date] | 🟢 Resolved |

---

## Constraints

### Must Have (Non-negotiable)
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

### Must Not (Explicit exclusions)
- [Constraint 1]
- [Constraint 2]

### Timeline
- **Timebox:** [Duration]
- **Target completion:** [Date/Quarter]
- **Hard deadline:** [If applicable, and why]

### Technical Constraints
- [Constraint 1]
- [Constraint 2]

### Business Constraints
- [Constraint 1]
- [Constraint 2]

---

## Assumptions to Validate

> Assumptions we're making that should be tested early

| Assumption | Risk Level | How to Validate | Status |
|------------|------------|-----------------|--------|
| [Assumption 1] | High | [Test method] | [ ] Not started |
| [Assumption 2] | Medium | [Test method] | [ ] Not started |
| [Assumption 3] | Low | [Test method] | [ ] Not started |

---

## Out of Scope

> Explicitly what we are NOT doing in this bet

- ❌ [Out of scope item 1]
- ❌ [Out of scope item 2]
- ❌ [Out of scope item 3]
- ❌ [Out of scope item 4]

**Why out of scope:**
> [Brief rationale for scope boundaries]

---

## Dependencies

| Dependency | Type | Owner | Status | Risk |
|------------|------|-------|--------|------|
| [Dependency 1] | [Tech / Design / External] | [Name] | [Status] | [High/Med/Low] |
| [Dependency 2] | [Type] | [Name] | [Status] | [Risk] |

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk 1] | High/Med/Low | High/Med/Low | [How we'll address] |
| [Risk 2] | [Likelihood] | [Impact] | [Mitigation] |

---

## Rollout Approach

**Rollout strategy:** [ ] Big bang  [ ] Staged  [ ] Feature flag  [ ] Beta

**Stages:**
1. [Stage 1]: [Who gets it, what we're testing]
2. [Stage 2]: [Expansion criteria]
3. [Stage 3]: [Full rollout]

**Rollback plan:**
> [What we'll do if things go wrong]

---

## Team

| Role | Name | Responsibilities |
|------|------|------------------|
| PM | [Name] | [Owns outcome, facilitates] |
| Designer | [Name] | [Owns experience] |
| Tech Lead | [Name] | [Owns implementation] |
| Engineers | [Names] | [Build] |
| QA | [Name] | [Quality] |

---

## Timeline (High-Level)

| Phase | Duration | Key Milestones |
|-------|----------|----------------|
| Discovery/Design | [X days/weeks] | [Milestones] |
| Build | [X days/weeks] | [Milestones] |
| Test | [X days/weeks] | [Milestones] |
| Rollout | [X days/weeks] | [Milestones] |
| Measure | [X days/weeks] | [Success determination] |

---

## What This Brief Does NOT Include

> These emerge through the design and build process

- ❌ Detailed UI specs
- ❌ Technical architecture
- ❌ Database schemas
- ❌ API specifications
- ❌ Test plans
- ❌ Edge cases (discover through building)

---

## Brief Evolution Log

| Date | Stage | Changes | Author |
|------|-------|---------|--------|
| [Date] | Draft | Initial version | [Name] |
| [Date] | Shaped | Added design input | [Name] |
| [Date] | Ready | Engineering reviewed | [Name] |

---

## Approval

| Role | Name | Approved | Date |
|------|------|----------|------|
| PM | [Name] | [ ] | |
| Design | [Name] | [ ] | |
| Engineering | [Name] | [ ] | |

---

## Post-Ship: Results

*Complete after bet concludes*

**Shipped:** [Date]

**Results:**
| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Primary | [X] | [Y] | ✅ / ❌ |
| Secondary | [X] | [Y] | ✅ / ❌ |

**Key learnings:**
- [Learning 1]
- [Learning 2]

**Next steps:**
- [ ] [Action]
- [ ] [Action]

---

*Brief created: [Date] | Last updated: [Date]*
