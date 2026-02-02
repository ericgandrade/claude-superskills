# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a reusable AI skills library for **GitHub Copilot CLI** and **Claude Code**. Skills are Markdown-based workflow specifications (`SKILL.md`) that teach AI agents how to perform specific tasks. The project follows a **zero-config design philosophy** where skills auto-discover at runtime without hardcoded paths or values.

## Repository Structure

```
.github/skills/           # GitHub Copilot CLI skills
.claude/skills/           # Claude Code skills (identical workflow logic)
resources/
  skills-development.md   # Comprehensive developer guide
  templates/              # Skill creation templates
scripts/                  # Validation and automation scripts
```

Skills for both platforms must maintain **functional parity** - only tool names differ (`Read`/`Edit`/`Bash` for Claude vs `view`/`edit`/`bash` for Copilot).

## Validation Commands

```bash
# Validate a single skill's YAML frontmatter (kebab-case naming, required fields)
./scripts/validate-skill-yaml.sh .github/skills/<skill-name>

# Validate a single skill's content quality (word count 1500-2000 ideal, writing style)
./scripts/validate-skill-content.sh .github/skills/<skill-name>

# Validate all skills at once
for skill in .github/skills/*/; do
  ./scripts/validate-skill-yaml.sh "$skill"
  ./scripts/validate-skill-content.sh "$skill"
done

# Check installed AI tools
./scripts/check-tools.sh

# Create new skill scaffolding (creates both platform versions)
./scripts/create-skill.sh <skill-name>

# Install skills globally via symlinks (updates automatically on git pull)
./scripts/install-skills.sh $(pwd)
```

### Manual Testing

After installing, test a skill by triggering it in a new terminal session:

```bash
./scripts/install-skills.sh $(pwd)
# Then in a new session, use a trigger phrase, e.g.:
gh copilot -p "melhore este prompt: criar API REST"
```

### Pre-commit Validation Checklist

Before committing new or modified skills, confirm all three pass:

1. **YAML frontmatter** — `name` is kebab-case; `name`, `description`, `version` present; version is SemVer (X.Y.Z)
2. **Content** — Word count 1500–2000 (max 5000); no second-person ("you should"); imperative form used; 3–5 realistic examples included
3. **Structure** — Required sections present: Purpose, When to Use, Workflow, Critical Rules, Example Usage; Step 0: Discovery included if the skill interacts with project structure

## Skill Architecture

Each skill directory contains:
- `SKILL.md` - Core specification with YAML frontmatter and workflow steps
- `README.md` - User-facing documentation
- `references/` - Detailed documentation (optional)
- `examples/` - Working code samples (optional)
- `scripts/` - Executable utilities (optional)

### SKILL.md Frontmatter Requirements

```yaml
---
name: kebab-case-name        # Required, lowercase with hyphens only
description: "This skill should be used when..."  # Required, third-person
triggers:                    # Recommended
  - "trigger phrase"
version: 1.0.0              # Required, SemVer
---
```

### Required Sections

1. **Purpose** - What the skill does
2. **When to Use** - Activation scenarios
3. **Workflow** - Step-by-step instructions (Step 0: Discovery if needed)
4. **Critical Rules** - NEVER/ALWAYS guidelines
5. **Example Usage** - 3-5 realistic scenarios

## Key Design Principles

### Zero-Config Philosophy
- **No hardcoded paths**: Discover file/folder structure at runtime
- **No hardcoded values**: Extract valid values from actual files
- **Ask when ambiguous**: Interactive clarification instead of assumptions
- **Pattern-based detection**: Use `*template*` not `/templates/`

### Discovery Pattern (Step 0)
Skills that interact with project structure should include a discovery phase that:
- Searches for relevant directories using glob patterns
- Asks user to choose if multiple found
- Offers fallbacks if none found
- Extracts values from YAML/JSON files dynamically

### Writing Style
- Skill names: **kebab-case only** (enforced by validation)
- Instructions: **imperative form** ("Run the command", not "You should run")
- Descriptions: **third-person** ("This skill should be used when...")
- Examples: **always in English** (code, prompts, field names)

## Commit Convention

```bash
feat: add <skill-name> skill v1.0.0      # New skill
feat(<skill-name>): <improvement>         # Enhancement
fix(<skill-name>): <bug fix>             # Bug fix
docs(<skill-name>): <update>             # Documentation
style: <formatting change>                # Style/naming
```

## Platform Synchronization

When modifying skills, update both platforms:
- `.github/skills/<name>/SKILL.md` (Copilot)
- `.claude/skills/<name>/SKILL.md` (Claude)

Tool name conversions:
| Claude Code | GitHub Copilot |
|-------------|----------------|
| `Read`      | `view`         |
| `Edit`      | `edit`         |
| `Write`     | `edit`         |
| `Bash`      | `bash`         |

When adding a new skill, also update both index files:
- `.github/skills/README.md`
- `.claude/skills/README.md`

### Skill Types

Skills in this repository fall into categories:

- **Universal skills** — Work anywhere (e.g., `prompt-engineer`)
- **Meta-skills** — Create or manage other skills (e.g., `skill-creator`)
- **Analysis skills** — Code review, exploration
- **Documentation skills** — Generate docs, READMEs
- **Testing skills** — Validation, test generation
