# CLAUDE.md

**Claude Superskills** (repository `ericgandrade/claude-superskills`) is a library of 53 AI skills for career, product, design, Obsidian and knowledge work. It merges the former obsidian-, career-, product-, design- and knowledge-superskills repositories. Skills live only in `skills/<name>/`.

Companion project, not included here: The Agentic SDLC Method (`ericgandrade/agentic-sdlc`, npm `agentic-sdlc-method`, plugin `agentic-sdlc`).

## Names

- Claude Code plugin: **`superskills`** (`.claude-plugin/plugin.json`). Plugin names may not start with `claude-`; `claude plugin validate` rejects them. Skills appear as `/superskills:<skill>`.
- Marketplace: `claude-superskills` (`.claude-plugin/marketplace.json`). Install: `/plugin marketplace add ericgandrade/claude-superskills` then `/plugin install superskills@claude-superskills`.
- npm: the name `claude-superskills` belongs to this project; versions up to 2.0.8 came from the earlier project now called agentic-sdlc. An `npx` installer is planned; when it is added, it must use its own cache folder (never `~/.claude-superskills` or `~/.agentic-sdlc`) and must manage only this repository's skills.

## Rules

- `SKILL.md` frontmatter has exactly `name` (kebab-case, equal to the folder name), `description` (one line, "This skill should be used when…") and `license`. No other fields: Claude Code fails to load the skill otherwise. Versions, dates and authors go in the skill's `README.md` `## Metadata` table.
- Skill instructions use the imperative form; descriptions use the third person.
- All repository content is in English.
- Keep bundled license files (`skills/ui-styling/LICENSE.txt`, the `*-OFL.txt` font licenses) and `THIRD_PARTY_NOTICES.md` up to date when adapting outside content.
- Adding or removing a skill: update `README.md` (domain table, counts and badge), `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json` (count and description), and `CHANGELOG.md`, in the same commit. Bump `version` in `plugin.json` (minor for a new skill).
- Do not set `version` in `marketplace.json`; `plugin.json` is the version authority.

## Checks before a commit

- `claude plugin validate .` passes.
- Every `SKILL.md` frontmatter parses with a strict YAML parser and holds only the three fields.
- Relative links in `README.md` and `skills/*/README.md` resolve.
