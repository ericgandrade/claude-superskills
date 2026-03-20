# Quality Standards for AI Skills

This guide defines the current quality bar for skills in `claude-superskills`.

## Core Architecture Rules

- author skills only in `skills/`
- keep `SKILL.md` frontmatter minimal
- store extended metadata in `README.md`
- do not maintain mirrored in-repo platform copies

## SKILL.md Frontmatter

Allowed fields only:

```yaml
---
name: skill-name
description: This skill should be used when the user needs to ...
license: MIT
---
```

Do not add:

- `version`
- `author`
- `category`
- `tags`
- `risk`
- `platforms`
- `created`
- `updated`

## Required Sections

Each skill should normally include:

1. `## Purpose`
2. `## When to Use`
3. `## Workflow`
4. `## Critical Rules`
5. `## Example Usage`

Add `Step 0: Discovery` when the skill needs to inspect project structure, installed tools, files, or configuration before acting.

## README.md Metadata

Put detailed metadata in `README.md`, typically under `## Metadata`.

Recommended fields:

- `Version`
- `Author`
- `Platforms`
- `Category`
- `Tags`
- `Risk`
- `Created`
- `Updated`

## Writing Standards

- use clear imperative instructions in workflow steps
- keep the description trigger-oriented and specific
- avoid hardcoded repo assumptions unless the skill is intentionally repo-specific
- use realistic examples
- be explicit about limitations and prerequisites

## Validation Checklist

Before merging a skill change:

- `SKILL.md` passes YAML validation
- `SKILL.md` contains only `name`, `description`, and `license`
- `README.md` carries the richer metadata
- examples are realistic and current
- no instructions point users to deprecated in-repo platform directories
- any affected docs were updated in the same change

## Testing Expectations

Test at the right level for the change:

- skill validation scripts for content/frontmatter changes
- targeted workflow review for prompt logic changes
- installer or release checks when packaging or distribution behavior changed

Useful commands:

```bash
./scripts/validate-skill-yaml.sh skills/<skill-name>
./scripts/validate-skill-content.sh skills/<skill-name>
bash ./scripts/verify-version-sync.sh
./scripts/check-doc-consistency.sh
```

## Anti-Patterns

Avoid:

- adding version metadata to `SKILL.md`
- documenting `.github/skills/`, `.claude/skills/`, or `.codex/skills/` as authored source
- leaving stale skill counts in public docs
- changing packaging behavior without updating marketplace or installer docs

## Definition of Done

A skill or documentation change is ready when:

- the source lives in the right place
- the docs describe the current architecture
- consistency checks pass
- maintainers will not be misled by the changed files
