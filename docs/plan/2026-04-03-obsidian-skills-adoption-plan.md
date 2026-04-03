# Obsidian Skills Adoption Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use `writing-plans` discipline to keep this work low-ambiguity. Do not implement any Obsidian skill until the external repository triage and user approval gates in this plan are complete.

**Goal:** Evaluate external Obsidian-related repositories, select the highest-value workflows, and convert the approved set into repository-native skills under `claude-superskills`.

**Architecture:** External repositories are reference inputs, not source code to import directly. All approved capabilities must be normalized into this repository's skill architecture under `skills/`, with local naming, local metadata, local evals, and local documentation. The process must deliberately filter out generic PKM ideas, low-value overlap, and vendor-specific assumptions before any files are created.

**Tech Stack:** Markdown skills (`SKILL.md`, `README.md`), repository metadata (`bundles.json`, `skills_index.json`, `CATALOG.md`), optional `templates/`, `references/`, `scripts/`, git branch `feature/obsidian-skills-plan`.

---

## Preconditions

Before executing any implementation work, all of the following must be true:

- the user has provided one or more GitHub repositories to analyze
- each repository has been triaged against current repository scope
- the first Obsidian skill set has been approved explicitly by the user
- a follow-up implementation plan exists for the exact approved skills

## Repository Rules

- `skills/` remains the only source of truth for skill content
- do not copy raw foreign folder structures into this repository
- do not import external prompts or docs verbatim without review and adaptation
- start with a small initial Obsidian cluster: target 2 to 4 skills
- if a candidate idea overlaps with an existing skill, prefer extending or differentiating clearly instead of duplicating
- use `docs/plan/` for durable planning artifacts in this branch; do not use the ignored `docs/plans/`

## Decision Gates

The work stops for user confirmation at these gates:

1. After the external repository inventory is summarized
2. After the candidate Obsidian skill matrix is proposed
3. After the first 2 to 4 skills are selected
4. Before any implementation files are created under `skills/`

## Expected Outputs

At the end of the planning phase, the branch should contain:

- this plan file
- a repository triage summary for the external Obsidian references
- a candidate skill matrix with keep/merge/discard decisions
- an approved implementation target list for the first Obsidian skills

The branch should not yet contain:

- new `skills/obsidian-*` directories
- bundle changes
- regenerated indexes
- release/version changes

## Task 1: Intake External Repositories

**Files:**
- Update: `docs/plan/2026-04-03-obsidian-skills-adoption-plan.md`
- Create later if needed: `docs/plan/obsidian-repo-triage.md`

**Step 1: Collect repository inputs**

Input required from user:
- GitHub repository URLs
- what looked valuable in each repository
- desired Obsidian focus:
  - vault organization
  - note linking
  - writing
  - research
  - review workflows
  - automation

Expected: a bounded list of repositories to inspect

**Step 2: Inventory each repository**

For each repository, record:
- repository name and URL
- project purpose
- Obsidian-relevant skills, prompts, agents, scripts, templates, commands
- plugin or tooling dependencies
- signs of personal-only workflow assumptions

Expected: a repo-by-repo inventory with concrete extracted capabilities

**Step 3: Classify extracted assets**

For each extracted item, assign one:
- Obsidian-specific workflow
- generic PKM workflow
- generic writing/research workflow
- setup/config reference only
- discard

Expected: clear separation between true Obsidian opportunities and noise

**Validation**

Run this reasoning check manually:
- every candidate left in scope must answer: "Why is this better as an Obsidian skill than as a generic productivity skill?"

## Task 2: Compare Against Current Repository Coverage

**Files:**
- Review: `skills/`
- Update later if needed: `docs/plan/obsidian-repo-triage.md`

**Step 1: Map candidates to existing skills**

Compare repository findings against the existing capabilities in `skills/`, especially adjacent areas such as:
- `writing-plans`
- `deep-research`
- `docling-converter`
- `productivity`-style and writing-oriented skills

Expected: a list of overlaps and differences

**Step 2: Identify duplication risk**

For each candidate, decide:
- new skill
- extension of an existing concept
- template/reference only
- discard

Expected: no candidate remains ambiguously classified

**Step 3: Score each candidate**

Use these criteria:
- Obsidian specificity
- reusability across many vaults
- low dependency burden
- likely trigger quality
- distinct value versus current repository
- ability to teach a repeatable workflow

Expected: shortlist candidates with explicit rationale

**Validation**

The shortlist should be small. If more than 4 strong candidates remain for the first batch, rank them and defer the rest.

## Task 3: Define The Initial Obsidian Skill Set

**Files:**
- Update: `docs/plan/2026-04-03-obsidian-skills-adoption-plan.md`
- Create later if needed: `docs/plan/obsidian-skill-matrix.md`

**Step 1: Propose final candidate names**

Draft names should be outcome-oriented, for example:
- `obsidian-vault-architect`
- `obsidian-note-linking`
- `obsidian-writing-workflow`
- `obsidian-research-notes`
- `obsidian-review-rhythm`

Expected: names that fit this repository's style and are not plugin-branded unless unavoidable

**Step 2: Define boundaries for each proposed skill**

For each selected skill, specify:
- one-sentence purpose
- ideal user requests
- what is explicitly out of scope
- optional dependencies
- whether helper assets are required

Expected: each skill has a crisp boundary and does not overlap excessively with another approved skill

**Step 3: Ask for user approval**

Present:
- selected 2 to 4 skills
- discarded candidates
- risks and assumptions

Expected: explicit user confirmation before implementation planning begins

## Task 4: Convert Approved Skills Into Exact File-Level Work

**Files:**
- Create for each approved skill:
  - `skills/<approved-skill>/SKILL.md`
  - `skills/<approved-skill>/README.md`
  - `skills/<approved-skill>/evals/evals.json`
  - `skills/<approved-skill>/evals/trigger-eval.json`
- Optional per skill:
  - `skills/<approved-skill>/templates/...`
  - `skills/<approved-skill>/references/...`
  - `skills/<approved-skill>/scripts/...`
- Modify later:
  - `bundles.json`
  - `README.md`
  - `skills_index.json`
  - `CATALOG.md`

**Step 1: Define the minimum asset set per skill**

Default rule:
- every approved skill gets `SKILL.md`, `README.md`, and starter evals
- `templates/`, `references/`, and `scripts/` are added only when justified

Expected: no gold-plating, no empty directories without purpose

**Step 2: Write an implementation checklist per skill**

For each approved skill, define:
- category placement
- README metadata needs
- likely triggers
- workflow skeleton
- eval coverage expectations
- whether it belongs in any bundle

Expected: implementation can proceed without discovering structure mid-flight

**Step 3: Define regeneration and doc updates**

After skill implementation, the expected sequence will be:

```bash
python3 scripts/generate-skills-index.py
python3 scripts/generate-catalog.py
git status --short
```

Expected:
- `skills_index.json` updated
- `CATALOG.md` updated
- only intentional metadata/docs changes remain

## Task 5: Validation Criteria For The Future Implementation

**Files:**
- Review: each new `skills/<approved-skill>/...` directory

**Step 1: Validate repository consistency**

Check:
- naming matches repository conventions
- no duplicated skill semantics
- no obsolete or imported foreign structure
- optional assets exist only when justified

Expected: each skill looks native to this repository

**Step 2: Validate trigger quality**

Check:
- trigger phrases are realistic
- Obsidian framing is explicit where needed
- the skill is discoverable from likely user requests

Expected: trigger evals reflect real Obsidian use cases

**Step 3: Validate public scope impact**

Check whether public-facing docs need updates:
- `README.md`
- `cli-installer/README.md`
- `.claude-plugin/marketplace.json`

Expected: only update public docs if the repository's visible capability scope materially changes

## Candidate Triage Template

Use this template for each repository once the user sends it:

```markdown
### Repository: <name>

- URL: <url>
- Purpose:
- Obsidian-relevant assets:
- Dependencies:
- Strong ideas worth adapting:
- Weak or discardable ideas:
- Overlap with existing skills:
- Recommendation:
```

## Candidate Skill Template

Use this template for each shortlisted skill:

```markdown
### Proposed Skill: <name>

- Purpose:
- Source inspiration:
- Why it is Obsidian-specific:
- Why it is not redundant:
- Likely triggers:
- Required files:
- Optional files:
- Risks:
- Recommendation:
```

## Success Criteria

This plan succeeds when:

- every external repository has been triaged with explicit keep/merge/discard logic
- the first Obsidian skill batch is constrained to a justified 2 to 4 skills
- each approved skill has a clear implementation shape before any files are created
- the resulting work can be executed without architectural ambiguity or repository drift
