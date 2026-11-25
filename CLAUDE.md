# CLAUDE.md

**Claude Superskills** (repository `ericgandrade/claude-superskills`) is a library of 53 AI skills for career, product, design, Obsidian and knowledge work. It merges the former obsidian-, career-, product-, design- and knowledge-superskills repositories. Skills live only in `skills/<name>/`.

Companion project, not included here: The Agentic SDLC Method (`ericgandrade/agentic-sdlc`, npm `agentic-sdlc-method`, plugin `agentic-sdlc`).

## Names

- Claude Code plugin: **`superskills`** (`.claude-plugin/plugin.json`). Plugin names may not start with `claude-`; `claude plugin validate` rejects them. Skills appear as `/superskills:<skill>`.
- Marketplace: `claude-superskills` (`.claude-plugin/marketplace.json`). Install: `/plugin marketplace add ericgandrade/claude-superskills` then `/plugin install superskills@claude-superskills`.
- npm: package `claude-superskills` (installer in `cli-installer/`, version source of truth `cli-installer/package.json`); versions up to 2.0.8 came from the earlier project now called agentic-sdlc. Release: `node scripts/release.js [patch|minor|major]`, review `CHANGELOG.md`, merge, then create the GitHub release `vX.Y.Z` on main; `.github/workflows/publish-npm.yml` publishes.
- Installer isolation (do not break): `lib/core/downloader.js` `REPO_NAME` equals the GitHub repo name (release zips unpack to `<repo>-<version>/`); the cache is `~/.superskills/cache` (never `~/.claude-superskills` or `~/.agentic-sdlc`, which belong to other installers); `getManagedSkillNames()` in `bin/cli.js` lists only this package's skills (`bundles.json` and its own cache), so `uninstall`, `update` and `status` never touch other packages' skills.

## Rules

- `SKILL.md` frontmatter has exactly `name` (kebab-case, equal to the folder name), `description` (one line, "This skill should be used when…") and `license`. No other fields: Claude Code fails to load the skill otherwise. Versions, dates and authors go in the skill's `README.md` `## Metadata` table.
- Skill instructions use the imperative form; descriptions use the third person.
- All repository content is in English.
- Keep bundled license files (`skills/ui-styling/LICENSE.txt`, the `*-OFL.txt` font licenses) and `THIRD_PARTY_NOTICES.md` up to date when adapting outside content.
- Adding or removing a skill: update `README.md` (domain table, counts and badge), `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json` (count and description), and `CHANGELOG.md`, in the same commit. Bump `version` in `plugin.json` (minor for a new skill).
- Do not set `version` in `marketplace.json`; `plugin.json` is the version authority.

## Checks before a commit

- `claude plugin validate .` passes.
- `node scripts/check-skills.mjs` passes (needs `npm ci` in `cli-installer/`): frontmatter, bundles and counts.
- `./scripts/verify-version-sync.sh` passes: `cli-installer/package.json`, `.claude-plugin/plugin.json`, the README hero and badge, and `cli-installer/README.md` show the same version.
- Adding a skill also means adding it to its domain bundle and to `all` in `bundles.json`.
- Relative links in `README.md` and `skills/*/README.md` resolve.
