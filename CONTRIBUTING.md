# Contributing to Claude Superskills

This guide explains how to contribute skills, documentation, and installer improvements to the current repository architecture.

## Core Rule

`skills/` is the only in-repository source of truth for skills.

Do not create or edit skills under:

- `.github/skills/`
- `.claude/skills/`
- `.codex/skills/`
- `.agent/skills/`
- `.gemini/skills/`
- `.cursor/skills/`
- `.adal/skills/`

Those paths are installation targets or ignored placeholders, not authored source.

## Before You Start

Read these guides:

- [Skill Anatomy Guide](./docs/guides/skill-anatomy.md)
- [Quality Standards](./docs/guides/quality-standards.md)
- [Skills Development Guide](./resources/skills-development.md)
- [Versioning Guide](./VERSIONING.md)

## Contribution Types

- Add a new skill
- Improve an existing skill
- Fix installer or plugin behavior
- Correct or expand documentation
- Improve validation or release tooling

## Creating or Editing a Skill

Use the repository source tree only:

```bash
./scripts/create-skill.sh your-skill
```

This creates:

```text
skills/your-skill/
  SKILL.md
  README.md
```

Then edit:

```bash
$EDITOR skills/your-skill/SKILL.md
$EDITOR skills/your-skill/README.md
```

## Skill Requirements

`SKILL.md` frontmatter must contain only:

```yaml
---
name: your-skill
description: This skill should be used when the user needs to ...
license: MIT
---
```

Extended metadata such as version, author, category, tags, risk, created, and updated belongs in `README.md`.

## Suggested Workflow

```bash
# 1. Create or edit the skill in skills/
./scripts/create-skill.sh your-skill

# 2. Validate the skill
./scripts/validate-skill-yaml.sh skills/your-skill
./scripts/validate-skill-content.sh skills/your-skill

# 3. Regenerate indexes if needed
npm run generate-all --prefix cli-installer

# 4. Verify release/doc consistency if your change affects packaging or docs
bash scripts/verify-version-sync.sh
./scripts/check-doc-consistency.sh

# 5. Commit
git add skills/ README.md CLAUDE.md cli-installer/README.md .claude-plugin/marketplace.json docs/
git commit -m "feat: add your-skill"
```

## Documentation Expectations

When your change affects product scope or packaging, update all affected docs in the same change:

- `README.md`
- `CLAUDE.md`
- `cli-installer/README.md`
- `.claude-plugin/marketplace.json`
- impacted files in `docs/`

If you add a skill, also review:

- `bundles.json`
- category tables in `README.md`
- architecture or skill-type references in `CLAUDE.md`

## Validation Checklist

- skill exists only under `skills/<skill-name>/`
- `SKILL.md` uses only `name`, `description`, and `license`
- `README.md` contains the richer metadata
- validation scripts pass
- no doc still describes mirrored in-repo platform directories as authored source
- version and marketplace metadata remain consistent if touched

## Pull Requests

A good PR includes:

- a clear summary of what changed
- testing or validation notes
- examples if a skill changed behavior
- documentation updates when needed

## Commit Messages

Examples:

```bash
feat: add my-skill
feat(prompt-engineer): improve framework selection guidance
fix: correct installer documentation drift
docs: update contribution workflow
chore: bump version to X.Y.Z
```

## Reporting Issues

When reporting a bug, include:

- skill name
- platform
- input used
- expected behavior
- actual behavior
- relevant version info

## Reference Implementations

Use the current repository skills as examples:

- [skills/](./skills/)

Do not use ignored platform directories as reference implementations.
