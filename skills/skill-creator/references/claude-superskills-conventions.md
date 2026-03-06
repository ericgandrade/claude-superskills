# claude-superskills Conventions

Rules that apply when creating or modifying skills within the **claude-superskills** package. Read this file when the user is working in the claude-superskills repository.

---

## Skill Location

Skills in claude-superskills have a single source of truth:

```
skills/<skill-name>/
├── SKILL.md
├── README.md
└── (optional: agents/, references/, scripts/, assets/, evals/)
```

**NEVER create skills under platform directories.** These are all gitignored and must stay empty:
- `.github/skills/`
- `.claude/skills/`
- `.codex/skills/`
- `.agent/skills/`
- `.gemini/skills/`
- `.cursor/skills/`
- `.adal/skills/`

The installer downloads skills from the GitHub release at install time and copies them to each platform's directory. Nothing gets committed to those paths.

---

## SKILL.md Frontmatter Rules

Frontmatter must be **minimal**. Claude Code's YAML parser is strict and only supports specific fields.

**Allowed fields:**
```yaml
---
name: kebab-case-name
description: This skill should be used when...
license: MIT
---
```

**NEVER add these fields to SKILL.md:**
- `version` — causes parse errors
- `author` — causes parse errors
- `platforms` — causes parse errors
- `category` — causes parse errors
- `tags` — causes parse errors
- `risk` — causes parse errors
- `created` / `updated` — bare `YYYY-MM-DD` values are parsed as Date objects by js-yaml, causing "malformed YAML frontmatter" errors

**All metadata goes in README.md** under a `## Metadata` table:
```markdown
## Metadata

| Field | Value |
|-------|-------|
| Version | 1.0.0 |
| Author | Your Name |
| Created | 2026-03-06 |
| Updated | 2026-03-06 |
| Platforms | All 8 platforms |
| Category | content |
| Tags | tag1, tag2 |
| Risk | safe |
```

---

## Required Files per Skill

1. `SKILL.md` — minimal frontmatter + workflow instructions
2. `README.md` — user-facing docs with `## Metadata` table at the bottom

---

## After Creating a Skill

Run through this checklist before committing:

1. **`skills/<skill-name>/SKILL.md`** — valid frontmatter (name/description/license only), all required sections (Purpose, When to Use, Workflow, Critical Rules, Example Usage)
2. **`skills/<skill-name>/README.md`** — includes `## Metadata` table with dates, version, platforms
3. **`README.md`** — add skill to the appropriate category table; bump the `skills-N` badge count
4. **`CLAUDE.md`** — add skill to the architecture tree and Skill Types section; update skills count note
5. **`bundles.json`** — add skill to appropriate bundles (essential, content, all, etc.)
6. **Run the release script** to bump all 5 version files atomically:
   ```bash
   node scripts/release.js patch   # for new skills: use minor
   ```
   This updates: `cli-installer/package.json`, `.claude-plugin/plugin.json`, `README.md`, `CLAUDE.md`, `CHANGELOG.md`

---

## Description Guidelines for claude-superskills Skills

The description field is the primary triggering mechanism for all 8 platforms. Follow these patterns:

- Start with `This skill should be used when...`
- Be specific about what triggers it vs. what doesn't
- Include key action phrases users would actually say
- Keep under 1024 characters (enforced by `quick_validate.py`)

---

## Platform Coverage

Skills in claude-superskills are automatically distributed to all 8 platforms via the installer:

| Platform | Install Path |
|----------|-------------|
| Claude Code | `~/.claude/skills/` |
| GitHub Copilot | `~/.github/skills/` |
| Gemini CLI | `~/.gemini/skills/` |
| OpenCode | `~/.agent/skills/` |
| OpenAI Codex | `~/.codex/skills/` |
| Cursor IDE | `~/.cursor/skills/` |
| Antigravity | `~/.gemini/antigravity/skills/` |
| AdaL CLI | `~/.adal/skills/` |

No platform-specific configuration is needed in the skill itself. The installer handles everything.

---

## Evals in claude-superskills

Evals for a skill live in `skills/<skill-name>/evals/evals.json`. The workspace for runs goes in a sibling directory:

```
skills/
├── my-skill/
│   ├── SKILL.md
│   └── evals/evals.json
└── my-skill-workspace/
    ├── iteration-1/
    └── iteration-2/
```

The `evals/` directory is excluded from the `.skill` package (see `package_skill.py` → `ROOT_EXCLUDE_DIRS`), so eval artifacts never ship to end users.
