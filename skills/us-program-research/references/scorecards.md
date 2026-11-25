# Adaptive Scorecards Reference

---

## Scorecard A: Master's (MS / MBA / MPS)

### Step 1: Determine Candidate Level

| Level                        | Keywords                                               | Weights Profile  |
|:-----------------------------|:-------------------------------------------------------|:-----------------|
| VP / C-Level                 | VP, SVP, EVP, President, CEO, CTO, CISO, CDO, Partner | EXECUTIVE        |
| Director / Senior Manager    | Director, Sr. Manager, Principal, Head of              | SENIOR           |
| Manager / Individual Contrib.| Manager, Lead, Analyst, Engineer, Consultant           | STANDARD         |
| Career Changer / Recent Grad | Student, Intern, < 3 years experience                  | CAREER_LAUNCH    |
| OPT-Critical (F1 visa)       | F1, OPT, STEM OPT extension needed                    | OPT_CRITICAL     |

### Step 2: Adaptive Weight Table

| Criterion              | EXECUTIVE | SENIOR | STANDARD | CAREER_LAUNCH | OPT_CRITICAL |
|:-----------------------|:---------:|:------:|:--------:|:-------------:|:------------:|
| Brand Equity           |    25     |   23   |    23    |      23       |     22       |
| Executive Readiness*   |    25     |   22   |    18    |      10       |     20       |
| Flexibility            |    16     |   16   |    14    |      12       |     16       |
| Network Quality        |    15     |   15   |    15    |      15       |     12       |
| ROI / Cost-Benefit     |    12     |   14   |    16    |      20       |     14       |
| Student Satisfaction   |    10     |   10   |    10    |      10       |     10       |
| STEM Designation       |     0     |    0   |     0    |       0       |      6       |
| **TOTAL**              |  **103**  |**100** |  **96**  |    **90**     |   **100**    |

> Normalize to 100 before scoring when TOTAL ≠ 100 (proportional reduction of each criterion).
> *Executive Readiness = curriculum relevance for VP→C-Level career progression.
>  For non-executives: rename to "Career Launch Potential" = placement rate, internships, employer access.
>  For OPT_CRITICAL: STEM Designation 6pts; reduce Executive Readiness, ROI, Network by 2pts each.

### Step 3: Scoring Rubrics

#### Brand Equity (% of criterion weight):

| Ranking Position                               | % of Weight |
|:-----------------------------------------------|:-----------:|
| Top-25 US News in specific field               | 90–100%     |
| Top-50 US News                                 | 78–87%      |
| Strong regional recognition, national presence | 65–74%      |
| Solid regional, AACSB-accredited               | 52–61%      |
| Local / limited national visibility            | 39–48%      |
| No AACSB / no public track record              | 26–35%      |

#### Executive Readiness (executive profiles):

| Curriculum                                                | % of Weight |
|:----------------------------------------------------------|:-----------:|
| 100% strategy/management, no mandatory programming        | 90–100%     |
| Predominantly management, optional technical modules      | 77–86%      |
| Balanced management + technical                           | 59–73%      |
| Technical with management modules                         | 45–54%      |
| Mandatory intensive coding (deep learning, Python/R)      | 32–41%      |

#### Career Launch Potential (non-executive profiles):

| Placement / Career Services                                    | % of Weight |
|:---------------------------------------------------------------|:-----------:|
| High placement rate (90%+) + strong employer network + co-op  | 90–100%     |
| Good placement + active career services                        | 64–77%      |
| Moderate career services                                       | 45–59%      |
| Weak placement / no public data                               | 23–36%      |

#### Flexibility:

| Format                                                      | % of Weight |
|:------------------------------------------------------------|:-----------:|
| 100% async online (no fixed schedule)                       | 100%        |
| Hybrid / strong evening schedule                            | 81–94%      |
| In-person evenings (2–3 fixed nights/week)                  | 63–75%      |
| Intensive daytime in-person (requires leaving job)          | 44–56%      |

#### Network Quality:

| Alumni Network                                              | % of Weight |
|:------------------------------------------------------------|:-----------:|
| National elite (Top-20 alumni, Ivy-equivalent, flagship)    | 93–100%     |
| Strong regional + active career services                    | 73–87%      |
| Moderate regional network                                   | 53–67%      |
| Limited local network                                       | 33–47%      |

#### ROI / Cost-Benefit — Formula:

```
roi_index = (brand_pts + network_pts) / (total_cost_USD / 10,000)

Thresholds:
  roi_index > 14    → 100% of weight
  roi_index 10–14   → 79–93% of weight
  roi_index 7–10    → 57–71% of weight
  roi_index 4–7     → 36–50% of weight
  roi_index < 4     → 14–29% of weight

Practical example:
  Brand = 17pts, Network = 13pts, Cost = US$45k
  roi_index = 30 / 4.5 = 6.67 → ~57% of weight
  If criterion weight is 14pts → 0.57 × 14 = 7.98pts for ROI
```

#### Student Satisfaction (sources: Niche, Reddit, GMAT Club, GradCafe):

| Satisfaction Range           | % of Weight |
|:-----------------------------|:-----------:|
| 9.0–10.0                     | 100%        |
| 8.5–8.9                      | 90%         |
| 8.0–8.4                      | 80%         |
| 7.5–7.9                      | 60–70%      |
| 7.0–7.4                      | 50%         |
| 6.5–6.9                      | 30–40%      |
| Few/no public reviews        | 20% ⚠️ RED FLAG |

#### STEM Designation (OPT_CRITICAL only):
- Confirmed STEM CIP code: 100% of weight
- Not confirmed STEM: 0%

### Steps 4–6:

**Step 4:** Sum all criteria → TOTAL (out of 100)

**Step 5:** Classify into tiers:

| Tier    | Score  | Label                          | Action               |
|:-------:|:------:|:-------------------------------|:---------------------|
| Top 5   | ≥ 80   | Top Priority                   | MUST APPLY           |
| Tier 2  | 70–79  | If Budget Allows               | IF BUDGET ALLOWS     |
| Tier 3  | 55–69  | Backup                         | BACKUP ONLY          |
| Tier 4  | < 55   | Avoid                          | AVOID                |

**Step 6 — Hidden Gems:**
💎 **Hidden Gem** = Score ≥ 70 AND Cost ≤ 50% of budget AND Satisfaction ≥ 8.0/10

---

## Scorecard B: PhD / Doctorate (total = 100 pts)

| Criterion              | Weight | Rubric                                                                         |
|:-----------------------|:------:|:-------------------------------------------------------------------------------|
| Research Reputation    |  30    | US News subfield ranking + faculty h-index + recent citations                  |
| Advisor / Lab Fit      |  25    | Active publications (last 3 years) + alignment + confirms openings             |
| Funding Available      |  20    | Fully-funded (RA/TA + stipend): 20pts; Partial: 10pts; Self-pay: 0pts         |
| Placement Outcomes     |  15    | % PhDs in desired positions + average time to graduation                       |
| Student Satisfaction   |  10    | GradCafe + Reddit r/gradadmissions + advisor RateMyProfessor                   |

### PhD Red Flags (auto-AVOID):

- ⛔ Advisor with no publications in the last 3 years
- ⛔ Program without funding for international students
- ⛔ Average time to graduation > 6 years (without field justification)
- ⛔ Reviews mentioning advisor pressure, lack of support, or high attrition
- ⛔ Department without active research/industry partnerships

### PhD Tier Thresholds:

| Tier   | Score  | Label                                                      |
|:------:|:------:|:-----------------------------------------------------------|
| Tier 1 | ≥ 80   | APPLY — fully-funded + strong advisor + reputation         |
| Tier 2 | 70–79  | APPLY — partial funding or strong advisor                  |
| Tier 3 | 55–69  | BACKUP                                                     |
| Tier 4 | < 55   | AVOID (or any red flag present)                            |

---

## Scorecard C: Bachelor's / Second Degree (total = 100 pts)

| Criterion                  | Weight | Rubric                                                               |
|:---------------------------|:------:|:---------------------------------------------------------------------|
| Brand / Reputation         |  25    | US News + QS ranking + regional employer recognition                 |
| Career Launch Potential    |  25    | Placement rate + co-op/internship + employer recruiting on campus    |
| ROI / Cost-Benefit         |  20    | In-state eligible? Scholarships? Starting salary vs. total cost      |
| Campus Life / Flexibility  |  15    | Lifestyle fit: large/small, online/campus, transfer credit           |
| Student Satisfaction       |  15    | Niche + Reddit + overall retention rate                              |

### ROI Formula — Bachelor's:

```
roi_score = (expected_starting_salary_USD / total_cost_USD) × 100

Normalize to 0–20 pts:
  roi_score > 150   → 20 pts
  roi_score 100–150 → 16–19 pts
  roi_score 70–100  → 12–15 pts
  roi_score 50–70   → 8–11 pts
  roi_score < 50    → 0–7 pts
```

**Bachelor's Tiers:** same thresholds as Master's (≥80 / 70–79 / 55–69 / <55).

---

## Market Validation — Scorecards

Scorecard A (Master's) weights validated against:

| Source                             | Alignment                                                                |
|:-----------------------------------|:-------------------------------------------------------------------------|
| US News MBA Rankings               | Brand 25% ≈ US News "quality assessment" 25%                            |
| US News MBA Rankings               | Executive Readiness replaces "selectivity" 25% for VP profiles          |
| Fortune EMBA Rankings              | Network 15% aligned with Fortune C-level alumni metric                  |
| 2024 Market Research               | ROI included — 40% of master's programs have negative ROI               |
| Working Professional needs         | Flexibility 16% — not present in traditional rankings, critical for execs|
| Niche/Reddit/GMAT Club 2024/2025   | Student Satisfaction 10% — exposes gaps not visible in rankings         |
