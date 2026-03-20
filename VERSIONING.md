# Versioning Guide

This document defines the versioning and release strategy for the current `claude-superskills` architecture.

## Release Authorities

The repository has two version-authoritative release files:

- `cli-installer/package.json` - npm package version
- `.claude-plugin/plugin.json` - Claude Code plugin version

These two versions must always match exactly.

Secondary files must reflect the same release state when applicable:

- `README.md`
- `CLAUDE.md`
- `CHANGELOG.md`
- `cli-installer/README.md`
- `.claude-plugin/marketplace.json`

## Package Versioning

The project uses Semantic Versioning for the repository release:

```text
MAJOR.MINOR.PATCH
```

- `MAJOR` - breaking changes to installation, packaging, or platform behavior
- `MINOR` - new skills, new platforms, or meaningful new product capabilities
- `PATCH` - fixes, documentation corrections, and non-breaking installer improvements

## Skill Versioning

Skills do not store version metadata in `SKILL.md`.

`SKILL.md` frontmatter must stay minimal:

```yaml
---
name: skill-name
description: This skill should be used when the user needs to ...
license: MIT
---
```

Per-skill version metadata belongs in each skill's `README.md` under `## Metadata`.

## Current Architecture Rule

`skills/` is the only in-repository source of truth.

Do not version or synchronize mirrored in-repo copies under:

- `.github/skills/`
- `.claude/skills/`
- `.codex/skills/`
- `.agent/skills/`
- `.gemini/skills/`
- `.cursor/skills/`
- `.adal/skills/`

Those directories are installation targets in user environments or ignored placeholders in the repository, not authored source.

## When to Bump the Repository Version

| Change | Recommended Bump |
|--------|------------------|
| Add a new skill | `MINOR` |
| Add a new supported platform | `MINOR` |
| Breaking installer or plugin behavior change | `MAJOR` |
| Fix installer bug | `PATCH` |
| Correct documentation or metadata drift | `PATCH` |

## Release Workflow

Preferred workflow:

```bash
node scripts/release.js [patch|minor|major]
```

This updates the core release files and regenerates indexes. After that, review impacted secondary documentation before committing.

Manual workflow:

```bash
./scripts/verify-version-sync.sh
./scripts/check-doc-consistency.sh
./scripts/pre-publish-check.sh
git add -A
git commit -m "chore: bump version to X.Y.Z"
git tag vX.Y.Z
git push origin main
git push origin vX.Y.Z
```

## Publishing Rules

- Do not publish manually from a local workstation as the normal path
- Tag push `vX.Y.Z` is the intended trigger for the GitHub Actions publish flow
- Always update `CHANGELOG.md` before tagging
- Always review secondary docs when counts, platform support, or packaging behavior changed

## Verification Commands

```bash
bash scripts/verify-version-sync.sh
./scripts/check-doc-consistency.sh
./scripts/pre-publish-check.sh
```

## Common Mistakes

- adding `version` to `SKILL.md`
- updating `package.json` without updating `.claude-plugin/plugin.json`
- fixing `README.md` while leaving `cli-installer/README.md` or `.claude-plugin/marketplace.json` stale
- documenting mirrored platform directories as active repository source
- treating historical docs as current architecture guidance

## Notes

- Historical changelog entries may mention older skill counts; that is acceptable when clearly tied to the release that shipped at that time.
- Living documentation should describe the current architecture only.
