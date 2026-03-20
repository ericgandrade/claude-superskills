# Skills Development Guide

This guide explains how to create and maintain skills in the current `claude-superskills` repository model.

## Source of Truth

All skills are authored in:

```text
skills/<skill-name>/
```

Do not create mirrored repository copies under `.github/skills/`, `.claude/skills/`, or other platform directories.

## Skill Structure

```text
skills/<skill-name>/
  SKILL.md
  README.md
  references/    # optional
  examples/      # optional
  scripts/       # optional
  evals/         # optional
```

## Creating a Skill

Use the helper:

```bash
./scripts/create-skill.sh my-new-skill
```

This creates:

```text
skills/my-new-skill/
  SKILL.md
  README.md
```

## SKILL.md Rules

Frontmatter must stay minimal:

```yaml
---
name: my-new-skill
description: This skill should be used when the user needs to ...
license: MIT
---
```

Extended metadata goes in `README.md`, not in `SKILL.md`.

## Zero-Config Principles

- do not hardcode paths
- discover files and directories at runtime when needed
- ask for clarification when multiple valid options exist
- use pattern-based discovery rather than brittle exact paths

## Workflow Guidance

Most skills should include:

1. `Purpose`
2. `When to Use`
3. `Workflow`
4. `Critical Rules`
5. `Example Usage`

Use a `Step 0: Discovery` phase when the skill needs project or environment awareness before acting.

## Validation

Run:

```bash
./scripts/validate-skill-yaml.sh skills/my-new-skill
./scripts/validate-skill-content.sh skills/my-new-skill
```

If the change affects packaging, docs, or release metadata, also run:

```bash
bash ./scripts/verify-version-sync.sh
./scripts/check-doc-consistency.sh
```

## Documentation Responsibilities

When a new skill or major change lands, review:

- `README.md`
- `CLAUDE.md`
- `cli-installer/README.md`
- `.claude-plugin/marketplace.json`
- `bundles.json`
- impacted guides in `docs/`

## Distribution Model

The installer and plugin system distribute repository skills to user environments such as:

- `~/.github/skills/`
- `~/.claude/skills/`
- `~/.codex/skills/`
- `~/.agent/skills/`
- `~/.gemini/skills/`

Those are install targets, not authored repository paths.

## Recommended Development Flow

```bash
git checkout -b feature/my-new-skill
./scripts/create-skill.sh my-new-skill
$EDITOR skills/my-new-skill/SKILL.md
$EDITOR skills/my-new-skill/README.md
./scripts/validate-skill-yaml.sh skills/my-new-skill
./scripts/validate-skill-content.sh skills/my-new-skill
npm run generate-all --prefix cli-installer
git add skills/ README.md CLAUDE.md docs/ bundles.json
git commit -m "feat: add my-new-skill"
```

## Common Mistakes

- creating skills in mirrored platform directories
- adding `version` to `SKILL.md`
- forgetting to update secondary docs after changing skill counts or packaging behavior
- leaving installation examples that copy from deprecated repository paths
