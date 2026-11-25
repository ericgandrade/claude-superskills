# CLAUDE.md

**knowledge-superskills** is a library of 10 AI skills for knowledge work. Skills live only in `skills/<name>/`.

## Rules

- `SKILL.md` frontmatter has exactly `name` (kebab-case), `description` (one line, "This skill should be used when…") and `license: MIT`. No other fields: Claude Code fails to load the skill otherwise. Versions, dates and authors go in the skill's `README.md` `## Metadata` table.
- Skill instructions use the imperative form; descriptions use the third person.
- All repository content is in English.
- Adding or removing a skill: update `README.md` (table and count), `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json` (count and description), and `CHANGELOG.md`, in the same commit. Bump `version` in `plugin.json` (minor for a new skill).
- Do not set `version` in `marketplace.json`; `plugin.json` is the version authority.
