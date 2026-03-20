# Documentation Consistency Remediation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Eliminate stale documentation and metadata drift so all public and maintainer-facing files describe the same current product, architecture, and release state.

**Architecture:** Treat `skills/` as the content source of truth and `cli-installer/package.json` plus `.claude-plugin/plugin.json` as release authorities. Centralize consistency enforcement in `CLAUDE.md`, then remediate stale secondary docs and add lightweight validation for future drift.

**Tech Stack:** Markdown docs, JSON manifests, shell validation scripts, Node-based installer metadata

---

### Task 1: Lock the rules in maintainer guidance

**Files:**
- Modify: `CLAUDE.md`

**Step 1: Add explicit documentation-consistency rules**

Add rules covering:
- version sync across release files
- doc sync across secondary docs
- marketplace metadata as part of the release surface
- prohibition on describing deprecated mirrored platform directories as current architecture

**Step 2: Correct contradictions already inside `CLAUDE.md`**

Fix:
- stale `45 skills` references
- incorrect pre-commit frontmatter rule mentioning `version`
- new-skill checklist gaps for `cli-installer/README.md`, `.claude-plugin/marketplace.json`, and `docs/guides/*.md`

**Step 3: Verify guidance is internally consistent**

Run:
```bash
rg -n "45 skills|all 45 skills|name, description, version|skills-N|marketplace.json|cli-installer/README.md" CLAUDE.md
```

Expected:
- no stale count references
- no instruction requiring `version` inside `SKILL.md`

### Task 2: Remediate stale public-facing docs

**Files:**
- Modify: `cli-installer/README.md`
- Modify: `.claude-plugin/marketplace.json`
- Modify: `docs/guides/skill-anatomy.md`

**Step 1: Update installer README**

Bring `cli-installer/README.md` up to current state:
- version aligned with current release
- skill count aligned with current release
- supported platform list aligned with actual installer
- commands/examples aligned with current CLI behavior

**Step 2: Update marketplace metadata**

Bring `.claude-plugin/marketplace.json` descriptions in line with the current public product:
- remove obsolete `14 universal AI skills` claim
- reflect current scope and positioning
- keep `version` absent

**Step 3: Update architecture guide**

Rewrite the outdated section in `docs/guides/skill-anatomy.md` so it reflects:
- `skills/` as the only in-repo source of truth
- platform directories as installation targets, not authored source
- minimal `SKILL.md` frontmatter rules

**Step 4: Verify doc consistency**

Run:
```bash
rg -n "14 universal AI skills|10\\)|Available Skills \\(10\\)|platform-specific directory|Replicated across|45 skills" \
  cli-installer/README.md .claude-plugin/marketplace.json docs/guides/skill-anatomy.md README.md CLAUDE.md
```

Expected:
- no obsolete counts
- no outdated architecture wording

### Task 3: Add lightweight drift detection

**Files:**
- Modify: `scripts/pre-publish-check.sh`
- Modify: `scripts/verify-version-sync.sh`
- Create or Modify: `scripts/check-doc-consistency.sh`

**Step 1: Define machine-checkable invariants**

Enforce at minimum:
- `cli-installer/package.json` version equals `.claude-plugin/plugin.json` version
- `README.md` title and badge match current version
- `cli-installer/README.md` and marketplace descriptions do not contain obsolete hardcoded counts known to be stale

**Step 2: Wire the check into release flow**

Call the consistency check from:
- `scripts/pre-publish-check.sh`
- optionally `scripts/release.js` or `scripts/build-skills.sh` if the repo wants earlier failure

**Step 3: Keep checks pragmatic**

Avoid brittle parsing of all prose. Prefer:
- version equality checks
- regex guards for known stale phrases
- optional skill count derivation from `skills/*/`

### Task 4: Validate release workflow end-to-end

**Files:**
- Review: `README.md`
- Review: `CLAUDE.md`
- Review: `cli-installer/README.md`
- Review: `.claude-plugin/plugin.json`
- Review: `.claude-plugin/marketplace.json`

**Step 1: Run consistency checks**

Run:
```bash
./scripts/verify-version-sync.sh
./scripts/pre-publish-check.sh
```

Expected:
- version checks pass
- no stale-doc warnings

**Step 2: Perform targeted manual review**

Confirm:
- public entry points agree on version and product scope
- no maintainer guide contradicts actual repository architecture
- no doc still implies skills are authored in platform directories

**Step 3: Commit**

Run:
```bash
git add CLAUDE.md cli-installer/README.md .claude-plugin/marketplace.json docs/guides/skill-anatomy.md scripts/pre-publish-check.sh scripts/verify-version-sync.sh scripts/check-doc-consistency.sh docs/plans/2026-03-20-documentation-consistency-remediation.md
git commit -m "docs: enforce documentation consistency rules"
```

### Validation Criteria

- `CLAUDE.md` explicitly documents documentation-sync responsibilities
- No core doc or manifest advertises obsolete skill counts or deprecated architecture
- Release flow includes at least one automated guard against future doc drift
- Maintainers can add a new skill or bump a version using one coherent checklist

### Expected Outcome

The repository has one authoritative documentation model, secondary docs are realigned to the current product, and future releases are less likely to ship with stale counts, stale descriptions, or obsolete architecture guidance.
