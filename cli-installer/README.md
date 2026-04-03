# claude-superskills v1.22.0

Universal installer for the `claude-superskills` library. Install 55 reusable AI skills across GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, and AdaL CLI from one command.

If Claude Desktop is detected, the installer can also generate a Claude Cowork plugin zip for manual upload.

![Version](https://img.shields.io/badge/version-1.22.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-green.svg)

## Quick Start

```bash
# Interactive smart installation
npx claude-superskills

# Auto smart update/install
npx claude-superskills -y -q

# Install curated bundles
npx claude-superskills --bundle essential -y
npx claude-superskills --bundle content -y
npx claude-superskills --bundle career -y
```

See [Installation Guide](../docs/INSTALLATION.md) for full setup and troubleshooting.

## What It Does

1. Detects installed AI tools and IDEs.
2. Downloads the matching skills release into a local cache.
3. Compares installed skill versions with the current installer version.
4. Recommends smart updates for outdated or missing skills.
5. Copies skills into each platform's global skills directory.
6. If Claude Cowork is detected and selected, generates a plugin zip and prints manual upload instructions.

Installation is always global. Local repository scope is no longer supported.

## Supported Platforms

- GitHub Copilot CLI: `~/.github/skills/`
- Claude Code: `~/.claude/skills/`
- OpenAI Codex: `~/.codex/skills/`
- OpenCode: `~/.agent/skills/`
- Gemini CLI: `~/.gemini/skills/`
- Antigravity: `~/.gemini/antigravity/skills/`
- Cursor IDE: `~/.cursor/skills/`
- AdaL CLI: `~/.adal/skills/`

Claude Cowork is supported as a packaging target, not as a direct copy target. The installer generates a zip for manual upload in Claude Desktop / Cowork.

Support status:
- macOS: detected and validated locally
- Windows: detection implemented with common install/data path heuristics, not yet validated end-to-end
- Linux: detection implemented with desktop-entry/config path heuristics, not yet validated end-to-end

## Available Commands

- `install`, `i` - Install skills (default)
- `list`, `ls` - List installed skills
- `status`, `st` - Show installed status and version diff
- `update`, `up` - Smart update outdated and missing skills
- `package-cowork`, `cowork` - Generate a Claude Cowork plugin zip
- `uninstall`, `rm` - Remove installed skills
- `doctor`, `doc` - Check installation health

## Options

- `--bundle NAME` - Install a curated bundle
- `--search KEYWORD` - Search for matching skills
- `--list-bundles` - Show available bundles
- `--all`, `-a` - Install for all detected platforms
- `--yes`, `-y` - Skip prompts
- `--quiet`, `-q` - Minimal output
- `--help`, `-h` - Show help
- `--version`, `-v` - Show version

## Bundles

- `essential` - Core workflow skills for discovery, orchestration, planning, and prompt optimization
- `planning` - Pre-implementation design and structured execution
- `research` - Deep research and resource discovery
- `content` - YouTube, audio, document conversion, CloudConvert, and storytelling workflows
- `product` - Product strategy, discovery, architecture, delivery, leadership, and AI-native product work
- `career` - Resume, job search, interview, negotiation, and portfolio workflows
- `developer` - Skill creation workflows
- `orchestration` - Resource discovery and planning
- `all` - All 55 available skills

```bash
npx claude-superskills --list-bundles
```

## Search

```bash
npx claude-superskills --search "planning"
npx claude-superskills --search "resume"
npx claude-superskills --search "research"
```

## Example Commands

```bash
npx claude-superskills
npx claude-superskills -y -q
npx claude-superskills --bundle essential -y
npx claude-superskills up -y
npx claude-superskills package-cowork
npx claude-superskills status
npx claude-superskills uninstall -y
npx claude-superskills doctor
```

## Notes

- The installer downloads skills from GitHub and caches them locally before copying them into platform directories.
- The installer compares installed skill versions with `v1.21.7` and recommends updates automatically.
- Skills are authored in the repository `skills/` directory only; platform directories are installation targets, not source directories.
- Claude Cowork updates are manual by design: generate the zip, remove the previous `claude-superskills` plugin in Cowork, then upload the new zip.
