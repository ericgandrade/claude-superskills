# Copilot Instructions for CLI AI Skills

This repository contains reusable AI skills for **GitHub Copilot CLI** and **Claude Code**. Skills are Markdown-based workflow specifications (`SKILL.md`) that teach AI agents specific tasks.

## Build, Test, and Lint Commands

### Validation Scripts

```bash
# Validate a single skill's YAML frontmatter (kebab-case naming, required fields)
./scripts/validate-skill-yaml.sh .github/skills/<skill-name>

# Validate a single skill's content quality (word count, writing style)
./scripts/validate-skill-content.sh .github/skills/<skill-name>

# Validate all skills in a directory
for skill in .github/skills/*/; do
  ./scripts/validate-skill-yaml.sh "$skill"
  ./scripts/validate-skill-content.sh "$skill"
done
```

### Installation & Setup

```bash
# Check which AI tools are installed (gh copilot, claude)
./scripts/check-tools.sh

# Install skills globally via symlinks (updates automatically on git pull)
./scripts/install-skills.sh $(pwd)

# Create new skill scaffolding
./scripts/create-skill.sh <skill-name>
```

### Manual Testing

Test skills by installing them and running through trigger phrases:

```bash
# Install skills first
./scripts/install-skills.sh $(pwd)

# Test in new terminal session
gh copilot -p "melhore este prompt: criar API REST"
```

## Architecture

### Dual-Platform Design

Skills maintain **functional parity** across two platforms:

- **GitHub Copilot CLI** (`.github/skills/`) - Uses `view`, `edit`, `bash` tools
- **Claude Code** (`.claude/skills/`) - Uses `Read`, `Edit`, `Bash` tools

Only tool names and prompt prefixes differ (`copilot>` vs `claude>`). Workflow logic is identical.

### Skill Structure

Each skill is a directory containing:

```
skill-name/
├── SKILL.md           # Core specification with YAML frontmatter + workflow
├── README.md          # User-facing documentation
├── references/        # Optional: Detailed docs
├── examples/          # Optional: Working code samples
└── scripts/           # Optional: Executable utilities
```

### SKILL.md Anatomy

```yaml
---
name: kebab-case-name        # Required, lowercase with hyphens only
description: "This skill should be used when..."  # Required, third-person
triggers:                    # Recommended
  - "trigger phrase"
version: 1.0.0              # Required, SemVer
---

## Purpose
[What the skill does]

## When to Use
[Activation scenarios]

## Workflow
### Step 0: Discovery (if applicable)
[Runtime discovery of paths/values]

### Step 1: [Action]
[Instructions]

## Critical Rules
[NEVER/ALWAYS guidelines]

## Example Usage
[3-5 realistic scenarios]
```

### Zero-Config Philosophy

Skills follow a **zero-configuration design** to work universally:

1. **No hardcoded paths** - Discover file/folder structure at runtime using glob patterns
2. **No hardcoded values** - Extract valid values from actual files (YAML, JSON, etc.)
3. **No configuration files** - Skills work out of the box
4. **Ask when ambiguous** - Interactive clarification instead of assumptions
5. **Pattern-based detection** - Use `*template*` not `/templates/`

**Discovery Pattern (Step 0):**

Skills that interact with project structure should include a discovery phase:

- Search for relevant directories using patterns (e.g., `*template*`, `*config*`)
- Ask user to choose if multiple found
- Offer fallbacks if none found
- Extract values from YAML/JSON files dynamically

## Key Conventions

### Naming & Writing Style

- **Skill names:** kebab-case only (e.g., `prompt-engineer`, not `promptEngineer`)
- **Instructions:** Imperative form ("Run the command", not "You should run")
- **Descriptions:** Third-person ("This skill should be used when...")
- **Examples:** Always in English (code, prompts, field names)

### Platform Synchronization

When modifying skills, **update both platforms**:

1. `.github/skills/<name>/SKILL.md` (Copilot)
2. `.claude/skills/<name>/SKILL.md` (Claude)

Tool name conversions:

| Claude Code | GitHub Copilot |
|-------------|----------------|
| `Read`      | `view`         |
| `Edit`      | `edit`         |
| `Write`     | `edit`         |
| `Bash`      | `bash`         |

### Commit Conventions

```bash
feat: add <skill-name> skill v1.0.0      # New skill
feat(<skill-name>): <improvement>         # Enhancement
fix(<skill-name>): <bug fix>             # Bug fix
docs(<skill-name>): <update>             # Documentation
style: <formatting change>                # Style/naming
```

### Validation Requirements

Before committing new/modified skills:

1. **YAML frontmatter validation:**
   - Name must be kebab-case
   - Required fields: `name`, `description`, `version`
   - Version must follow SemVer (X.Y.Z)

2. **Content validation:**
   - Word count: 1500-2000 ideal (5000 max)
   - Avoid second-person ("you should")
   - Use imperative form for instructions
   - Include 3-5 realistic examples

3. **Structure validation:**
   - Required sections: Purpose, When to Use, Workflow, Critical Rules, Example Usage
   - Include Step 0: Discovery if skill interacts with project structure
   - Provide NEVER/ALWAYS guidelines in Critical Rules

### Documentation Structure

- **SKILL.md** - Technical specification for AI agent
- **README.md** - User-facing documentation with installation, features, use cases, FAQ
- **resources/skills-development.md** - Comprehensive developer guide
- **resources/templates/** - Skill creation templates

### File Organization

```
.github/
  skills/                  # Copilot skills
    skill-name/
      SKILL.md
      README.md
.claude/
  skills/                  # Claude skills (mirrors .github/skills/)
    skill-name/
      SKILL.md
      README.md
resources/
  skills-development.md    # Developer guide
  templates/               # Skill templates
scripts/                   # Validation & automation
examples/                  # Example skill usage
```

## Important Notes

### Creating New Skills

Use the scaffolding script instead of manual creation:

```bash
./scripts/create-skill.sh my-skill-name
```

This ensures:
- Correct directory structure
- YAML frontmatter template
- Both platform versions created
- Validation-ready skeleton

### Skill Types

Skills in this repository fall into categories:

- **Universal skills** - Work anywhere (e.g., `prompt-engineer`)
- **Meta-skills** - Create/manage other skills (e.g., `skill-creator`)
- **Analysis skills** - Code review, exploration
- **Documentation skills** - Generate docs, READMEs
- **Testing skills** - Validation, test generation

### Resources

- **[Skills Development Guide](./resources/skills-development.md)** - Comprehensive skill creation guide
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guidelines
- **[CLAUDE.md](./CLAUDE.md)** - Claude Code specific guidance (similar content)

## References

- [Claude Code Skills Docs](https://code.claude.com/docs/en/skills)
- [GitHub Copilot Agents](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [Agent Skills Standard](https://agentskills.io)
- [Anthropic Prompt Engineering](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering)
