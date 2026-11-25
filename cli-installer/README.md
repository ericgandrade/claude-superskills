# claude-superskills v3.0.0

![Version](https://img.shields.io/badge/version-3.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

Installer for [Claude Superskills](https://github.com/ericgandrade/claude-superskills): 53 AI skills for career, product, design, Obsidian and knowledge work. It detects the AI tools on your machine and copies the skills into each one: GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE and AdaL CLI.

## Use

```bash
npx claude-superskills                      # interactive: choose tools and skills
npx claude-superskills --bundle career -y   # one domain, no prompts
npx claude-superskills --bundle all -y -q   # everything, quiet
npx claude-superskills status               # what is installed where
npx claude-superskills update -y            # update outdated skills, add missing ones
npx claude-superskills uninstall -y         # remove this package's skills
```

Bundles: `career` (20), `product` (8), `design` (9), `obsidian` (6), `knowledge` (10), `all` (53).

## How it works

- Skills are downloaded from the GitHub release that matches the installer version and cached in `~/.superskills/cache/<version>/`.
- `uninstall`, `update` and `status` touch only the skills of this package. Skills from other packages (for example [agentic-sdlc-method](https://github.com/ericgandrade/agentic-sdlc)) or added by hand stay in place. Only `uninstall --nuclear` removes every skill folder, and it says so before asking.
- Claude Code users can install the same skills as a plugin instead: `/plugin marketplace add ericgandrade/claude-superskills`, then `/plugin install superskills@claude-superskills`.

## Versions

`claude-superskills` 3.x installs this repository's skills. Versions up to 2.0.8 belonged to an earlier project, now The Agentic SDLC Method (`npx agentic-sdlc-method`).

MIT License.
