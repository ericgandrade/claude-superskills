# GTM Consulting Skills — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task-by-task.

**Goal:** Add 2 new skills to claude-superskills focused on GTM for Microsoft consulting offers — ICP definition by account type and offer GTM design — filling a gap not covered by existing `abx-strategy`, `product-strategy`, or `startup-growth-strategist`.

**Architecture:** Each skill follows the repository's single-source-of-truth model: `skills/<name>/SKILL.md` + `skills/<name>/README.md`. Minimal frontmatter (name, description, license only). No version bump until both skills are complete and validated. A third candidate skill (`presales-qualifier`) is scoped but deferred to a second batch after user review.

**Tech Stack:** Markdown skill files, YAML frontmatter, repository validation scripts (`validate-skill-yaml.sh`, `validate-skill-content.sh`), Python index generators.

**Context:** Eric Andrade, VP/Client Solutions Lead at Avanade Brazil, is responsible for creating and improving GTMs for Microsoft consulting offers (Assessment, System Integration, Outsourcing, Shared Services) targeting Enterprise accounts and SMC (Small, Medium, Corporate) segments per Microsoft's market segmentation.

---

## Pre-Implementation Checklist

Before starting Task 1, verify:

- [ ] Branch is `feature/obsidian-skills-plan` (reuse or create `feature/gtm-consulting-skills`)
- [ ] `skills/` has no existing skill named `microsoft-consulting-icp` or `consulting-gtm-designer`
- [ ] No overlap with `abx-strategy` (that skill targets generic B2B startups, not Microsoft partner consulting)
- [ ] `docs/plan/` directory exists (not `docs/plans/` which is gitignored)

---

## Skill 1: `microsoft-consulting-icp`

### Overview

**Purpose:** Define Ideal Customer Profile for Microsoft consulting engagements, segmented by account type (Enterprise vs SMC) and offer type (Assessment, SI, Outsourcing, Shared Services). Includes buyer persona mapping per offer, PURE-based opportunity scoring adapted to the Microsoft/Avanade context, and explicit Anti-ICP to prevent low-quality pipeline.

**Why not `abx-strategy`?** `abx-strategy` targets B2B companies with <500 accounts and generic SaaS/tech offers. `microsoft-consulting-icp` is specific to: Microsoft platform consulting, Avanade/partner ecosystem dynamics, Brazilian enterprise market segmentation (Enterprise vs SMC), and the buyer committee differences between a CIO buying an Assessment vs. a CFO approving a 3-year Outsourcing deal.

**Trigger phrases:**
- "Quem é meu ICP para Assessment no segmento Enterprise?"
- "Qual é o perfil de conta ideal para Outsourcing no SMC?"
- "Ajuda a definir ICP para minha oferta de SI da Microsoft"
- "Preciso mapear o comitê de compra para uma conta de Shared Services"
- "Define Anti-ICP para nossa oferta de Cloud"

---

### Task 1: Create `skills/microsoft-consulting-icp/SKILL.md`

**Files:**
- Create: `skills/microsoft-consulting-icp/SKILL.md`

**Step 1: Create the file with correct frontmatter**

```yaml
---
name: microsoft-consulting-icp
description: This skill should be used when the user needs to define Ideal Customer Profiles for Microsoft platform consulting offers. Use when segmenting accounts between Enterprise and SMC, mapping buyer committees per offer type (Assessment, System Integration, Outsourcing, Shared Services), scoring opportunity fit, or defining Anti-ICP to prevent low-quality pipeline.
license: MIT
---
```

**Mandatory frontmatter rules:**
- Only `name`, `description`, `license` — NO other fields
- `name` must be kebab-case
- Description must be a single line
- No `version`, `author`, `platforms`, `category`, `tags`, `risk`, `created`, `updated`

**Step 2: Write the skill body**

The skill body must contain these required sections (in order):
1. Purpose
2. When to Use
3. Workflow (with progress tracking display)
4. Critical Rules (NEVER/ALWAYS)
5. Example Usage (3–5 realistic scenarios)

**Content specification for each section:**

**Purpose:**
> Defines Ideal Customer Profiles for Microsoft platform consulting engagements. Segments target accounts between Enterprise and SMC using Microsoft's market framework, maps buyer personas per offer type, scores fit using an adapted PURE model, and produces Anti-ICP definitions to protect pipeline quality and win-rate.

**When to Use:**
- Designing or refreshing GTM for a specific consulting offer
- Qualifying whether an account is viable for a given offer type
- Mapping the buying committee before engaging an account
- Reviewing pipeline quality against ICP criteria
- Training pre-sales teams on qualification standards

**Workflow — 4 phases:**

Phase 1: Account Segment Identification (Enterprise vs SMC)
- Define Microsoft's segmentation criteria: Enterprise = top named accounts (typically 1000+ employees, strategic relationship, Microsoft-named); SMC = mid-market, volume-driven, digital-first
- Collect firmographic signals: revenue, employee count, IT budget, Microsoft maturity (M365/Azure adoption level), existing Avanade relationship
- Assign segment: Enterprise or SMC
- Note: the buying motion, cycle length, and governance requirements differ significantly between segments

Phase 2: Offer-Fit Scoring
- For each of the four offer types, define fit criteria:
  - **Assessment:** CIO/CTO sponsor exists, budget for discovery ($15K–$80K range), technology debt visible, Azure or M365 already in use, digital transformation pressure active
  - **System Integration:** Confirmed budget ($150K+), project scope defined or definable, Microsoft platform selected or in evaluation, decision expected within quarter, IT governance in place
  - **Outsourcing:** CFO involved, operational cost pressure explicit, FTE headcount at risk, multi-year commitment appetite, SLA expectations defined
  - **Shared Services:** CSC or GBS structure exists or planned, process standardization mandate active, scale across geographies, CFO/COO sponsorship
- Score each signal 0–3 using PURE model adapted: **P**ain (how acute), **U**rgency (forcing function), **R**eady (organizational readiness), **E**conomics (budget and ROI visibility)
- Tier output: Tier 1 (pursue actively), Tier 2 (qualify further), Tier 3 (nurture), Discard

Phase 3: Buyer Committee Mapping
- Map the buying committee per offer type:
  - Assessment: CIO/CTO (sponsor), IT Director (champion), CFO (approver for larger assessments)
  - SI: CIO (technical sponsor), Project Sponsor (business unit), CFO/Procurement (commercial), IT Architecture (influencer)
  - Outsourcing: CFO (primary), COO (operational), CIO (technical), HR (risk), Legal/Compliance (governance)
  - Shared Services: CFO/COO (sponsor), Process Owner (champion), IT (enabler), HR (risk)
- For each stakeholder: title, primary concern, success metric, likely objection, messaging angle
- Identify: Champion (internal advocate), Decision-maker (formal authority), Blocker (risk vector)

Phase 4: Anti-ICP Definition
- Define explicitly who NOT to pursue per offer type and segment
- Anti-ICP signals: no Microsoft investment, procurement-only contact (no executive sponsor), budget not allocated or approval cycle >18 months, no internal champion, RFP-only without prior relationship, single-vendor mandate to a competitor, contract in place with competing SI

**Progress tracking display:**
```
[████░░░░░░░░░░░░░░░░] 25% — Phase 1/4: Account Segment Identification
[████████░░░░░░░░░░░░] 50% — Phase 2/4: Offer-Fit Scoring
[████████████░░░░░░░░] 75% — Phase 3/4: Buyer Committee Mapping
[████████████████████] 100% — Phase 4/4: Anti-ICP Definition
```

**Critical Rules:**
- NEVER score an account without identifying a named executive sponsor — no sponsor = Discard regardless of firmographics
- NEVER conflate Enterprise and SMC motions — buying governance, cycle length, and commercial structure are fundamentally different
- ALWAYS define Anti-ICP before presenting ICP to a pre-sales team — without it, the ICP will be gamed
- ALWAYS map the buyer committee before proposing — knowing only the IT contact is insufficient for any offer beyond a small Assessment
- NEVER use generic ICP criteria — every output must reference Microsoft platform maturity and the specific offer type being evaluated

**Example Usage (5 scenarios):**
1. "Define ICP para Assessment no segmento Enterprise no setor FSI"
2. "Score esta conta para uma oportunidade de Outsourcing: [empresa, contexto]"
3. "Mapeia o comitê de compra para um projeto de SI de $500K no Bradesco"
4. "Quero revisar meu pipeline SMC — ajuda a aplicar Anti-ICP para eliminar oportunidades fracas"
5. "Qual é o perfil de conta ideal para Shared Services no segmento HPS?"

**Step 3: Validate word count**

Target: 1500–2000 words (max 5000). Count after writing.

**Step 4: Validate frontmatter**

Run:
```bash
./scripts/validate-skill-yaml.sh skills/microsoft-consulting-icp
```
Expected: no errors

**Step 5: Validate content quality**

Run:
```bash
./scripts/validate-skill-content.sh skills/microsoft-consulting-icp
```
Expected: no errors, word count within range

---

### Task 2: Create `skills/microsoft-consulting-icp/README.md`

**Files:**
- Create: `skills/microsoft-consulting-icp/README.md`

**Step 1: Write README with required Metadata table**

```markdown
# Microsoft Consulting ICP

Define Ideal Customer Profiles for Microsoft platform consulting offers by account segment and offer type.

## Metadata

| Field | Value |
|-------|-------|
| Version | 1.0.0 |
| Author | Eric Andrade |
| Created | 2026-04-03 |
| Updated | 2026-04-03 |
| Platforms | Claude Code, GitHub Copilot, OpenAI Codex, Gemini CLI, Cursor IDE |
| Category | GTM & Sales |
| Tags | gtm, icp, microsoft, consulting, avanade, enterprise, smc, presales |
| Risk | Low |

## Overview

[2–3 paragraph description of what the skill does, who it's for, and what it produces]

## When to Use

[Bulleted list matching SKILL.md When to Use section]

## Example Outputs

[2–3 example outputs the skill produces]
```

**Note:** Dates, version, author go HERE — not in `SKILL.md` frontmatter.

---

## Skill 2: `consulting-gtm-designer`

### Overview

**Purpose:** Build a GTM strategy for Microsoft platform consulting offers (Assessment, SI, Outsourcing, Shared Services) targeting Enterprise or SMC accounts. Produces a GTM canvas per offer type including value proposition by pillar, entry motion, qualification gates, expansion playbook, and win metrics.

**Why not `product-strategy`?** `product-strategy` is designed for product companies (PLG vs SLG, pricing tiers, freemium). `consulting-gtm-designer` is designed for professional services: offer packaging, consulting-specific entry motions, pre-sales investment governance, delivery credibility requirements, and the Assessment → SI → Outsourcing → Shared Services progression as a strategic expansion arc.

**Trigger phrases:**
- "Monta o GTM para nossa oferta de AI Assessment no Enterprise"
- "Como entrar em contas SMC com oferta de Cloud & AI Platforms?"
- "Preciso estruturar o GTM para Outsourcing no segmento FSI"
- "Qual é a estratégia de expansão de um Assessment para um projeto de SI?"
- "Ajuda a definir value prop por pilar para o segmento HPS"

---

### Task 3: Create `skills/consulting-gtm-designer/SKILL.md`

**Files:**
- Create: `skills/consulting-gtm-designer/SKILL.md`

**Step 1: Create the file with correct frontmatter**

```yaml
---
name: consulting-gtm-designer
description: This skill should be used when the user needs to build a Go-To-Market strategy for professional services consulting offers on the Microsoft platform. Use when designing entry motion by account segment, structuring value propositions per GTM pillar, planning the Assessment-to-SI-to-Outsourcing expansion arc, or defining win metrics for consulting pipeline.
license: MIT
---
```

**Step 2: Write the skill body**

**Purpose:**
> Builds GTM strategy for Microsoft platform consulting offers. Covers offer positioning by segment (Enterprise vs SMC), value proposition by GTM pillar (AI Business Solutions, Security, Cloud & AI Platforms, Advisory), entry and expansion motions, pre-sales investment gates, and win metrics. Produces a GTM canvas per offer type that a sales team can execute without ambiguity.

**When to Use:**
- Designing or refreshing GTM for a specific consulting offer type
- Defining value proposition differentiation across Microsoft pillars
- Planning the entry motion for a new account or segment
- Structuring the expansion arc from Assessment to larger engagements
- Reviewing pipeline strategy alignment with market conditions

**Workflow — 4 phases:**

Phase 1: Offer × Segment Definition
- Identify the offer type: Assessment, System Integration, Outsourcing, or Shared Services
- Identify the target segment: Enterprise or SMC
- Define offer scope: what is included, what is explicitly out of scope, typical duration and team composition
- Define the offer's role in the portfolio: entry offer (Assessment) or expansion offer (SI, Outsourcing, Shared Services)
- Note pricing range and commercial structure (T&M, Fixed Fee, or Hybrid) appropriate to each combination

Phase 2: Value Proposition by Pillar
- For each Microsoft GTM pillar, build the value prop specific to the offer type and segment:
  - **AI Business Solutions:** ROI from AI agent adoption, productivity gains, process automation metrics, Copilot deployment outcomes
  - **Security:** Risk reduction quantification, compliance coverage (LGPD, BACEN, HIMSS for healthcare), Zero Trust implementation outcomes, incident cost avoidance
  - **Cloud & AI Platforms:** Azure migration ROI, cloud unit economics vs. on-premise, modernization speed, platform lock-in risk mitigation
  - **Advisory:** Strategic clarity from Assessment output, roadmap quality, executive alignment, decision acceleration
- Translate each value prop into buyer-specific language per the buying committee identified in `microsoft-consulting-icp`
- Identify proof points: case studies, client references, Microsoft co-sell positioning

Phase 3: Entry and Expansion Motion
- **Entry motion per segment:**
  - Enterprise: executive-led, long-cycle, relationship-first, Assessment as risk-reduction vehicle before larger commitment; co-sell with Microsoft account team
  - SMC: digital-first, offer-packaged, faster cycle, standardized Assessment → digital SI tracks; leverage Microsoft partner network
- **Expansion arc:** Assessment → SI → Outsourcing/Shared Services
  - Assessment exit criteria: what must be true for the client to commit to SI
  - SI exit criteria: what must be true for the client to consider Outsourcing or Shared Services
  - Expansion timing triggers: delivery milestone, renewal event, executive change, regulatory pressure
- **Pre-sales investment governance:**
  - When to invest pre-sales hours (qualification threshold)
  - When to stop and disqualify
  - Governance approval gates (e.g., OpTeam/SEOps equivalent)

Phase 4: Win Metrics and GTM Canvas
- Define win metrics per offer type:
  - Assessment: conversion rate from Assessment to SI (target: >40%), time-to-proposal, client satisfaction score
  - SI: win rate in competitive evaluations, delivery margin, reference-ability post-delivery
  - Outsourcing: contract duration, FTE displacement ratio, SLA achievement, renewal rate
  - Shared Services: cross-geography expansion, process standardization rate, cost per process
- Produce 1-page GTM Canvas per offer × segment combination:
  - Offer definition
  - Target ICP
  - Value prop (by pillar)
  - Entry motion
  - Expansion arc
  - Pre-sales gates
  - Win metrics
  - Anti-ICP (who NOT to pursue)

**Progress tracking display:**
```
[████░░░░░░░░░░░░░░░░] 25% — Phase 1/4: Offer × Segment Definition
[████████░░░░░░░░░░░░] 50% — Phase 2/4: Value Proposition by Pillar
[████████████░░░░░░░░] 75% — Phase 3/4: Entry and Expansion Motion
[████████████████████] 100% — Phase 4/4: Win Metrics and GTM Canvas
```

**Critical Rules:**
- NEVER design a GTM without specifying the offer type AND the target segment — the motion is fundamentally different
- NEVER produce a value prop without translating it into buyer-specific language (CFO hears different value than CIO)
- ALWAYS include the expansion arc — an Assessment without an expansion path is a one-time transaction, not a GTM motion
- ALWAYS define pre-sales investment gates — without governance, pre-sales hours will be spent on Tier 3 and Tier 4 accounts
- NEVER conflate Microsoft pillar positioning with generic technology positioning — the Avanade/Microsoft co-sell relationship is a differentiation asset and must appear explicitly

**Example Usage (5 scenarios):**
1. "Monta o GTM para AI Business Solutions Assessment no segmento Enterprise — setor FSI"
2. "Como estruturo a expansão de um Assessment de Cloud para um projeto de SI de $500K?"
3. "Define a value prop de Security para o segmento SMC no setor PRD"
4. "Quero revisar o GTM de Outsourcing para o segmento CMT — identifica o que está fraco"
5. "Cria o GTM Canvas para Shared Services no segmento HPS com foco em Advisory"

**Step 3: Validate word count and scripts**

Run:
```bash
./scripts/validate-skill-yaml.sh skills/consulting-gtm-designer
./scripts/validate-skill-content.sh skills/consulting-gtm-designer
```
Expected: no errors

---

### Task 4: Create `skills/consulting-gtm-designer/README.md`

**Files:**
- Create: `skills/consulting-gtm-designer/README.md`

**Step 1: Write README with Metadata table**

Same structure as Task 2, adapted for `consulting-gtm-designer`.

---

## Task 5: Regenerate Indexes

After both skills are created and validated:

**Step 1: Regenerate skills index**

```bash
python3 scripts/generate-skills-index.py
```
Expected: `skills_index.json` updated with 2 new entries

**Step 2: Regenerate catalog**

```bash
python3 scripts/generate-catalog.py
```
Expected: `CATALOG.md` updated with 2 new skills

**Step 3: Verify git status**

```bash
git status --short
```
Expected: only intentional changes — new skill dirs + updated index/catalog

---

## Task 6: Update Documentation (Pre-Release)

Do NOT update version or do a release in this task batch. These doc updates are required before the next release:

**Files to update when ready to release:**
- `README.md` — add both skills to the GTM/Sales category table; bump badge count from 46 to 48
- `CLAUDE.md` — add both skills to architecture tree and Skill Types section
- `CHANGELOG.md` — add entry for new skills
- `cli-installer/README.md` — update skill count if mentioned
- `.claude-plugin/marketplace.json` — update description if skill count is mentioned
- `bundles.json` — evaluate whether either skill belongs in `product` or `essential` bundle

**Version bump (deferred to release):**
```bash
node scripts/release.js minor
```
This will: sync all 5 version files, bump from 1.21.8 → 1.22.0.

---

## Deferred: Skill 3 Candidate — `presales-qualifier`

**Scope:** Pre-sales qualification framework for Microsoft consulting deals. Structured go/no-go criteria, PURE scoring adapted to consulting context, cycle time governance, win-rate tracking by offer type and segment, and kill conditions for low-probability pipeline.

**Why deferred:** Implement after Skills 1 and 2 are reviewed. This skill has higher risk of overlap with `abx-strategy` Framework 3 (PURE scoring) and needs explicit differentiation in the consulting/services context before implementation.

**Trigger phrases:**
- "Qualifica esta oportunidade de Outsourcing para o Bradesco"
- "Qual é o go/no-go para investir pre-sales nesta conta?"
- "Nosso win-rate está baixo — ajuda a revisar os critérios de qualificação"

---

## Validation Criteria

Before marking implementation complete:

- [ ] Both `SKILL.md` files have only `name`, `description`, `license` in frontmatter
- [ ] No `created`, `updated`, `version`, or `author` fields in any `SKILL.md`
- [ ] Both `README.md` files have complete Metadata tables with dates and version
- [ ] Both skills pass `validate-skill-yaml.sh` and `validate-skill-content.sh`
- [ ] Word count: 1500–2000 words each (verified)
- [ ] `skills_index.json` and `CATALOG.md` regenerated
- [ ] No changes to `bundles.json`, `README.md`, `CHANGELOG.md`, or version files (those are release-time)
- [ ] Skills look native to the repository — no foreign structure or verbatim imported content

---

## Success Criteria

This plan succeeds when:
- Both skills are in `skills/` with valid structure and content
- Indexes are regenerated and up to date
- The skills are discoverable via realistic trigger phrases in the Microsoft consulting context
- The implementation can proceed without architectural ambiguity
- Eric can invoke either skill and receive a structured output relevant to his VP/GTM context at Avanade
