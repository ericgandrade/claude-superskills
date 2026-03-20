# Skill Anatomy: Understanding the Structure

This guide explains how skills are structured in the current `claude-superskills` architecture and what makes a skill compatible with the supported AI platforms.

## What Is a Skill?

A skill is a self-contained Markdown workflow that teaches an AI assistant how to perform a specific class of work. In this repository, skills:

- are authored once in `skills/`
- are distributed to multiple AI platforms by the installer or plugin system
- use a minimal `SKILL.md` frontmatter format for Claude Code compatibility
- keep detailed metadata in `README.md`, not in the YAML frontmatter

## Repository Structure

The active repository model is:

```text
skills/<skill-name>/
  SKILL.md
  README.md
  references/    # optional
  examples/      # optional
  scripts/       # optional
```

`skills/` is the only in-repository source of truth. Platform directories such as `~/.claude/skills/` or `~/.codex/skills/` are installation targets in user environments, not authored source directories in this repository.

## SKILL.md Requirements

Every `SKILL.md` file must start with minimal YAML frontmatter:

```yaml
---
name: skill-name
description: This skill should be used when the user needs to ...
license: MIT
---
```

Rules:

- `name` must be kebab-case
- `description` should be a single line and start with `This skill should be used when...`
- `license` should be `MIT`
- do not add `version`, `author`, `category`, `tags`, `risk`, `created`, or `updated`

Claude Code is strict about YAML parsing. Extra fields can cause `malformed YAML frontmatter` errors.

## README.md Metadata

Detailed metadata belongs in each skill's `README.md`, typically in a `## Metadata` section. Common fields include:

- `Version`
- `Author`
- `Platforms`
- `Category`
- `Tags`
- `Risk`
- `Created`
- `Updated`

Keep dates and extended metadata here, not in `SKILL.md`.

## Recommended Markdown Sections

The body of `SKILL.md` should usually include:

1. `## Purpose`
2. `## When to Use`
3. `## Workflow`
4. `## Critical Rules`
5. `## Example Usage`

Additional sections such as `Progress Tracking`, `Limitations`, or `References` are fine when they materially improve execution quality.

## Writing Conventions

- Use imperative instructions in workflow steps
- Keep activation guidance explicit and concrete
- Prefer third-person trigger phrasing in the description
- Use realistic examples
- Avoid repository-specific assumptions unless the skill is intentionally repo-aware

## Compatibility Model

Skills are authored once, then distributed to supported platforms such as:

- GitHub Copilot CLI
- Claude Code
- OpenAI Codex
- OpenCode
- Gemini CLI
- Antigravity
- Cursor IDE
- AdaL CLI

The installer handles copying skills into each platform's global skill directory. The repository should not maintain mirrored skill copies for each platform.

## Example

```text
skills/prompt-engineer/
  SKILL.md
  README.md
```

`SKILL.md` contains the executable workflow. `README.md` contains the richer metadata, explanation, and supporting guidance.

## Anti-Patterns

Avoid these mistakes:

- adding extra YAML fields to `SKILL.md`
- documenting platform directories as if they were the authored source of truth
- hardcoding stale skill counts or architecture assumptions into guides
- storing the same skill in multiple in-repo platform folders

## Validation Checklist

Before committing a new or updated skill, confirm:

- the skill exists only under `skills/<skill-name>/`
- `SKILL.md` uses only `name`, `description`, and `license`
- `README.md` carries the extended metadata
- the guide and release docs still reflect the current architecture
