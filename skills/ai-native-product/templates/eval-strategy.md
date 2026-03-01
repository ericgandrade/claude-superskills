# Eval Strategy Template

Use this template to design a comprehensive evaluation suite for AI features.

---

## Feature: [AI FEATURE NAME]

**Created:** [Date]  
**Owner:** [PM Name]  
**ML Lead:** [Name]

---

## Eval Overview

**What this AI does:**
> [Brief description]

**Agency level:** Level [X] — [Name]

**Critical quality dimensions:**
- [ ] Factual accuracy
- [ ] Task completion
- [ ] Safety/harmlessness
- [ ] Latency/performance
- [ ] User satisfaction

---

## Eval Types

### 1. Unit Evals (Automated, Every Change)

| Eval | What It Tests | Pass Criteria | Dataset Size |
|------|---------------|---------------|--------------|
| [Eval 1] | [Capability] | [Threshold] | [N examples] |
| [Eval 2] | [Capability] | [Threshold] | [N examples] |
| [Eval 3] | [Capability] | [Threshold] | [N examples] |

**Run trigger:** Every code/prompt change  
**Owner:** [Engineering]

---

### 2. Behavioral Evals (Automated, Daily/Weekly)

| Eval | What It Tests | Pass Criteria | Dataset Size |
|------|---------------|---------------|--------------|
| End-to-end task completion | Can AI complete full workflow? | > [X%] success | [N examples] |
| Edge case handling | Does AI handle unusual inputs? | > [X%] graceful | [N examples] |
| Consistency | Same input → similar output? | < [X%] variance | [N examples] |

**Run trigger:** Daily build / Weekly  
**Owner:** [ML Engineering]

---

### 3. Adversarial Evals (Before Major Releases)

| Eval | What It Tests | Pass Criteria |
|------|---------------|---------------|
| Prompt injection | Resistance to manipulation | 0 successful attacks |
| Jailbreak attempts | Policy adherence under pressure | 0 policy violations |
| Out-of-distribution | Graceful handling of novel inputs | No hallucinated confidence |
| Bias probes | Fairness across demographics | < [X%] variance |

**Run trigger:** Before beta, before GA  
**Owner:** [Security / ML Lead]

---

### 4. Human Evals (Weekly Sample)

| Dimension | Rubric | Sample Size | Evaluators |
|-----------|--------|-------------|------------|
| Output quality | 1-5 scale: [Define each level] | [N] per week | [Who] |
| Helpfulness | 1-5 scale: [Define each level] | [N] per week | [Who] |
| Safety | Pass/Fail: [Criteria] | [N] per week | [Who] |

**Process:**
1. Random sample of [N] production interactions
2. Evaluators score independently
3. Calibration session for disagreements
4. Weekly summary to team

**Run trigger:** Weekly  
**Owner:** [PM / Ops]

---

### 5. Production Evals (Continuous)

| Metric | Definition | Target | Alert Threshold |
|--------|------------|--------|-----------------|
| Task success rate | % of tasks completed correctly | > [X%] | < [Y%] |
| User acceptance rate | % of outputs accepted without edit | > [X%] | < [Y%] |
| Override rate | % of AI outputs user corrects | < [X%] | > [Y%] |
| Hallucination rate | % of outputs with false info | < [X%] | > [Y%] |
| Harmful output rate | % flagged as unsafe | < [X%] | > [Y%] |
| Latency P95 | 95th percentile response time | < [X]s | > [Y]s |

**Monitoring:** Real-time dashboard  
**Alerts:** PagerDuty / Slack  
**Owner:** [Engineering]

---

## Eval Datasets

### Golden Dataset

| Dataset | Size | Purpose | Last Updated |
|---------|------|---------|--------------|
| Core capabilities | [N] examples | Unit evals | [Date] |
| Edge cases | [N] examples | Behavioral evals | [Date] |
| Adversarial | [N] examples | Security evals | [Date] |

**Dataset maintenance:**
- Review quarterly
- Add new failure cases as discovered
- Version control all datasets

### Production Samples

| Sample | Selection Method | Size | Refresh |
|--------|------------------|------|---------|
| Human eval sample | Random from production | [N]/week | Weekly |
| Failure analysis | Filter by override/rejection | All | Daily |

---

## Eval Schedule

| Eval Type | Frequency | Owner | Dashboard |
|-----------|-----------|-------|-----------|
| Unit | Every change | Eng | CI/CD |
| Behavioral | Daily | ML Eng | [Link] |
| Adversarial | Pre-release | Security | [Link] |
| Human | Weekly | PM/Ops | [Link] |
| Production | Continuous | Eng | [Link] |

---

## Failure Triage Process

**When evals fail:**

1. **Unit/Behavioral fail:** Block deployment, investigate
2. **Adversarial fail:** Block release, security review
3. **Human eval degradation:** Flag for calibration review
4. **Production alert:** Page on-call, assess rollback

**Escalation path:**
- P0 (safety): Immediate rollback, exec notification
- P1 (quality): Same-day fix, PM notification
- P2 (minor): Next sprint, logged for review

---

## Eval Quality Checklist

- [ ] All critical capabilities have unit evals
- [ ] Golden dataset covers known edge cases
- [ ] Adversarial evals run before every release
- [ ] Human eval rubrics are calibrated
- [ ] Production metrics have alerts configured
- [ ] Failure triage process is documented
- [ ] Eval datasets are version controlled

---

*Eval strategy created: [Date] | Last updated: [Date]*
