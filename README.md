# 🤖 Claude Superskills v1.21.2

Scale AI-assisted engineering with a reusable skill platform that turns ad-hoc prompting into standardized, high-impact workflows. Install once and deliver consistent planning, research, orchestration, and content automation across your entire multi-tool AI stack.

![Version](https://img.shields.io/badge/version-1.21.2-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Skills](https://img.shields.io/badge/skills-46-brightgreen.svg)
![Platforms](https://img.shields.io/badge/platforms-8-orange.svg)

## 🚀 Quick Install

**One-liner (recommended):**
```bash
curl -fsSL https://raw.githubusercontent.com/ericgandrade/claude-superskills/main/scripts/install.sh | bash
```

**Or use NPX (zero-install):**
```bash
npx claude-superskills
```

The installer always uses **global installation** (`~/.<platform>/skills`), compares installed skill versions with the current installer version, shows differences, and recommends updates/new installs automatically.

**Other methods:**
```bash
# npm global
npm install -g claude-superskills

# With bundles
npx claude-superskills --bundle essential -y
```

**Local install (no npm/npx required):**

If you have cloned the repository and want to install skills directly, without any internet download or Node.js:
```bash
git clone https://github.com/ericgandrade/claude-superskills
cd claude-superskills

# Interactive — choose which platforms to install to
./scripts/local-install.sh

# Auto-install to all detected platforms
./scripts/local-install.sh -y

# Silent auto-install (CI / scripted environments)
./scripts/local-install.sh -y -q
```

The script reads directly from `skills/`, detects your installed platforms, and copies everything into the right directories. No Node.js, no npm, no internet.

See [Installation Guide](docs/INSTALLATION.md) for all methods and troubleshooting.

**Uninstall:**
```bash
curl -fsSL https://raw.githubusercontent.com/ericgandrade/claude-superskills/main/scripts/uninstall.sh | bash
```

## 🔌 Claude Code Plugin (Native)

Use claude-superskills as a native Claude Code plugin — no npm, no Node.js required.
Requires **Claude Code v1.0.33+** (`claude --version` to check).

---

### Option A — Claude Code CLI (Terminal)

> ⚠️ **Important:** While the universal installer (`npx claude-superskills`) works perfectly to copy skills into `~/.claude/skills/`, using the native Claude Code Plugin system (described below) is the **recommended and most suitable installation method** for Claude Code users.

**Method 1: Interactive UI (Inside a running `claude` session) — Recommended**

Start a Claude Code session:
```bash
claude
```

Then run these slash commands inside the session:
```text
# 1. Add the marketplace
/plugin marketplace add ericgandrade/claude-superskills

# 2. Install the plugin
/plugin install claude-superskills@claude-superskills
```

Alternatively, open the plugin manager with `/plugin` → navigate to the **Discover** tab → search for "claude-superskills" → press **Enter** → choose your preferred scope.

**Method 2: Shell command (Outside a session)**

> 🐛 **Known Bug:** The `claude plugin install` shell command is currently **failing** due to an upstream issue in Claude Code. We strongly recommend using the interactive in-session method above. If you prefer a CLI approach, the universal installer (`npx claude-superskills`) is completely reliable and stable. Tracked at: [anthropics/claude-code#29722](https://github.com/anthropics/claude-code/issues/29722).

```bash
# Attempt to add marketplace + install in one flow (Currently unstable)
claude plugin install claude-superskills@claude-superskills
```

Choose your scope with `--scope`:

```bash
claude plugin install claude-superskills@claude-superskills --scope user     # all your projects (default)
claude plugin install claude-superskills@claude-superskills --scope project  # team-shared via .claude/settings.json
claude plugin install claude-superskills@claude-superskills --scope local    # this project only, gitignored
```

**Method 3: Local test (no install needed)**

```bash
git clone https://github.com/ericgandrade/claude-superskills
claude --plugin-dir ./claude-superskills
```

---

### Option B — Claude.ai Web (claude.ai)

Plugin installation on claude.ai requires the plugin to be listed in the **official Anthropic marketplace**. Submission is pending. Once approved, you will be able to install directly from:

> **Settings → Extensions → Browse Plugins** on [claude.ai](https://claude.ai)

To be notified when the plugin is available on claude.ai, watch this repository.

---

### Once installed — all 46 skills under the `claude-superskills:` namespace

```
/claude-superskills:skill-creator
/claude-superskills:deep-research
/claude-superskills:brainstorming
/claude-superskills:prompt-engineer
/claude-superskills:mckinsey-strategist
/claude-superskills:writing-plans
/claude-superskills:executing-plans
/claude-superskills:agent-skill-discovery
/claude-superskills:agent-skill-orchestrator
... (44 total)
```

> **npm install still works** for GitHub Copilot, Cursor IDE, Gemini CLI, and 5 other platforms. The plugin format is Claude Code-specific.

## ✨ Features

- **46 Universal Skills** - Work on all platforms
- **Zero-Config Install** - Run once, works everywhere
- **Curated Bundles** - Install exactly what you need
- **Smart Search** - Find skills by keyword
- **8 Platform Support** - GitHub Copilot, Claude Code, Codex, OpenCode, Gemini, Antigravity, Cursor, AdaL
- **Discovery & Orchestration** - Find and plan with available resources
- **Command Shortcuts** - `i`, `ls`, `up`, `rm`, `doc`
- **Short Flags** - `-a`, `-y`, `-q`

## 📦 Available Skills

### 💼 Career & Professional Growth
| Skill | Version | Purpose |
|-------|---------|---------|
| **resume-ats-optimizer** | v2.1.0 | Optimize resumes for Applicant Tracking Systems |
| **resume-bullet-writer** | v2.1.0 | Transform weak bullets into achievement-focused statements |
| **resume-tailor** | v2.1.0 | Customize resume for specific job postings |
| **resume-formatter** | v2.1.0 | Ensure ATS-friendly formatting and clean scannable layouts |
| **resume-quantifier** | v2.1.0 | Add metrics and quantifiable results to resume bullets |
| **resume-section-builder** | v2.1.0 | Create targeted resume sections for different experience levels |
| **resume-version-manager** | v2.1.0 | Track and manage multiple resume versions during a job search |
| **job-description-analyzer** | v2.1.0 | Analyze job postings and calculate match scores |
| **interview-prep-generator** | v2.1.0 | Generate STAR stories and practice questions |
| **linkedin-profile-optimizer** | v2.1.0 | Optimize LinkedIn profile for recruiter searchability |
| **salary-negotiation-prep** | v2.1.0 | Research market rates and build negotiation strategy |
| **tech-resume-optimizer** | v2.1.0 | Optimize resumes for technical and PM roles |
| **executive-resume-writer** | v2.1.0 | Create C-suite and VP-level resumes emphasizing strategic leadership |
| **cover-letter-generator** | v2.1.0 | Create personalized cover letters from resume and job description |
| **career-changer-translator** | v2.1.0 | Translate skills from one industry to another |
| **creative-portfolio-resume** | v2.1.0 | Balance visual design with ATS compatibility for creative roles |
| **academic-cv-builder** | v2.1.0 | Build and format CVs for academic positions |
| **offer-comparison-analyzer** | v2.1.0 | Compare multiple job offers with total compensation analysis |
| **portfolio-case-study-writer** | v2.1.0 | Transform resume bullets into detailed portfolio case studies |
| **reference-list-builder** | v2.1.0 | Format professional references and prepare reference materials |

### 🔍 Discovery & Orchestration
| Skill | Version | Purpose |
|-------|---------|---------|
| **agent-skill-discovery** | v2.1.0 | Scan installed resources and current repository resources (agents, skills, MCPs) |
| **agent-skill-orchestrator** | v2.1.0 | Intelligent task planning with automatic prompt optimization and resource matching |

### 🛠️ Development & Automation
| Skill | Version | Purpose |
|-------|---------|---------|
| **skill-creator** | v2.1.0 | Automate skill creation with guided workflow |
| **prompt-engineer** | v2.0.0 | Optimize prompts using 11 frameworks (RTF, RISEN, Chain of Thought, etc.) |

### 🧭 Planning & Execution
| Skill | Version | Purpose |
|-------|---------|---------|
| **brainstorming** | v2.0.0 | Mandatory pre-implementation design clarification workflow |
| **writing-plans** | v2.0.0 | Build detailed, actionable implementation plans before coding |
| **executing-plans** | v2.0.0 | Execute plans in batches with checkpoints and review gates |
| **mckinsey-strategist** | v2.1.0 | Senior strategy consulting with SWOT, VRIO, 7S and First Principles analysis |

### 🏛️ Software Architecture
| Skill | Version | Purpose |
|-------|---------|---------|
| **senior-solution-architect** | v2.1.0 | Unified authority for C4 modeling, ADRs, and system reviews |
| **product-architecture** | v2.0.0 | Define scalable product architecture and modules |

### 🚀 Startup & Venture
| Skill | Version | Purpose |
|-------|---------|---------|
| **startup-growth-strategist** | v2.0.0 | Integrated authority for market sizing, unit economics, and GTM |
| **abx-strategy** | v2.1.0 | Build Account-Based Everything (ABX) GTM strategies |

### 📈 Product Management & Strategy
| Skill | Version | Purpose |
|-------|---------|---------|
| **product-operating-model** | v2.0.0 | Index and entry point for the Modern Product Operating Model |
| **product-strategy** | v2.0.0 | Build product strategy defining where to play and how to win |
| **product-discovery** | v2.0.0 | Run continuous discovery using OSTs, interviews, and assumption testing |
| **product-architecture** | v2.0.0 | Convert discovery opportunities into roadmaps and solution briefs |
| **product-delivery** | v2.0.0 | Ship, measure, and learn with staged rollouts and metrics hierarchies |
| **product-leadership** | v2.0.0 | Operate as Director or CPO managing portfolios and org design |
| **ai-native-product** | v2.0.0 | Build AI-native products with agency-control tradeoffs and eval strategies |

### 🔬 Research & Analysis
| Skill | Version | Purpose |
|-------|---------|---------|
| **deep-research** | v2.1.0 | Multi-step research workflow with citations using native web tools (no Google API required) |
| **us-program-research** | v2.0.0 | Structured US academic program research, ranking, and application action-plan generation |

### 📝 Content Processing
| Skill | Version | Purpose |
|-------|---------|---------|
| **youtube-summarizer** | v2.1.0 | Extract YouTube transcripts and generate comprehensive summaries |
| **audio-transcriber** | v2.1.0 | Transform audio recordings into professional Markdown documentation |
| **docling-converter** | v2.1.0 | Convert PDF/Office/image documents to Markdown/JSON/HTML with optional OCR |
| **cloudconvert-converter** | v2.1.0 | Convert 200+ file formats (docs, images, video, audio) and PDF operations (OCR, merge, split, rotate) via CloudConvert MCP |
| **pptx-translator** | v2.8.0 | Translate PowerPoint presentations between languages with batched parallel translation (3 slides/batch), AI-native language classification, group shape support, per-slide self-validation, and interactive output filename choice (original + lang suffix, AI-translated name, or custom) |
| **storytelling-expert** | v2.0.0 | Transform ideas into engaging narratives using 8 elite storytelling frameworks |

## 🎯 Curated Bundles

```bash
# Essential Skills (recommended for beginners)
npx claude-superskills --bundle essential -y

# Content Creation (video & audio)
npx claude-superskills --bundle content -y

# Planning & Execution
npx claude-superskills --bundle planning -y

# Product Management & Strategy
npx claude-superskills --bundle product -y

# Career & Professional Growth
npx claude-superskills --bundle career -y

# Research & Analysis
npx claude-superskills --bundle research -y

# Skill Developer (for creating custom skills)
npx claude-superskills --bundle developer -y

# All Skills (complete collection)
npx claude-superskills --bundle all -y
```

See [Bundles Guide](docs/bundles/bundles.md) for details.

## 🔍 Search Skills

```bash
npx claude-superskills --search "prompt"
npx claude-superskills --search "video"
```

## 🚀 Quick Start Examples

### Discovery & Planning Workflow

```bash
# 1. Discover what's available
claude  # or: gh copilot, gemini, opencode, codex
> "What do I have installed?"

# Output: Lists installed and current-repository plugins, skills, MCPs

# 2. Get intelligent execution plan
> "Plan how to build a REST API with authentication"

# Output: Detailed strategy using best available resources with confidence scores
```

### Other Use Cases

```bash
# Create a new skill
gh copilot -p "create a skill for PDF processing"

# Optimize a prompt
claude -p "improve this prompt: create REST API"

# Process content
gh copilot -p "transcribe this audio file: meeting.mp3"

# Orchestrate complex tasks
gemini -p "design a solution for processing meeting notes and creating Jira tickets"
```

## 💻 Supported Platforms

- **GitHub Copilot CLI** - Terminal AI assistant (`~/.github/skills/`)
- **Claude Code** - Anthropic's Claude in development (`~/.claude/skills/`)
- **OpenAI Codex** - GPT-powered coding assistant (`~/.codex/skills/`)
- **OpenCode** - Open source AI coding assistant (`~/.agent/skills/`)
- **Gemini CLI** - Google's Gemini in terminal (`~/.gemini/skills/`)
- **Antigravity** - AI coding assistant (`~/.gemini/antigravity/skills/`)
- **Cursor IDE** - AI-powered code editor (`~/.cursor/skills/`)
- **AdaL CLI** - AI development assistant (`~/.adal/skills/`)

**Note on Codex:** The installer uses `~/.codex/skills/` for Codex CLI + App, with cleanup support for legacy `~/.agents/skills/`.

## ⌨️ Compatibility & Invocation

These skills follow the universal `SKILL.md` format and work with any AI coding assistant that supports agentic skills.

| Tool | Type | Invocation Example | Path |
|------|------|--------------------|------|
| **Claude Code** | CLI | `/skill-name help me...` | `.claude/skills/` |
| **Gemini CLI** | CLI | `Use skill-name to...` | `.gemini/skills/` |
| **Codex CLI** | CLI | `Use skill-name to...` | `.codex/skills/` |
| **Antigravity** | IDE | *(Agent Mode)* `Use skill...` | `.gemini/antigravity/skills/` |
| **Cursor** | IDE | `@skill-name` in Chat | `.cursor/skills/` |
| **Copilot** | Ext | *(Paste skill content manually)* | N/A |
| **OpenCode** | CLI | `opencode run @skill-name` | `.agent/skills/` |
| **AdaL CLI** | CLI | *(Auto)* Skills load on-demand | `.adal/skills/` |

> **Tip:** OpenCode uses `.agent/skills/`; Antigravity uses `.gemini/antigravity/skills/`.

## 📚 Documentation

- **[Getting Started](docs/guides/getting-started.md)** - First-time user guide
- **[Skill Anatomy](docs/guides/skill-anatomy.md)** - How skills work
- **[Bundles Guide](docs/bundles/bundles.md)** - Curated collections
- **[Quality Standards](docs/guides/quality-standards.md)** - Best practices
- **[Full Catalog](CATALOG.md)** - Complete skill listing

## ⚡ CLI Commands & Shortcuts

| Command | Shortcut | Purpose |
|---------|----------|---------|
| `install` | `i` | Install skills |
| `list` | `ls` | List installed skills |
| `status` | `st` | Show global install status + version differences |
| `update` | `up` | Smart update (outdated + missing skills) |
| `uninstall` | `rm` | Remove skills |
| `doctor` | `doc` | Check installation |

```bash
npx claude-superskills i -a -y -q    # Install all, skip prompts, quiet mode
npx claude-superskills status         # Show global status + skill version differences
npx claude-superskills up -y          # Update outdated + install missing skills
npx claude-superskills ls -q          # List with minimal output
npx claude-superskills --list-bundles # Show available bundles
```

## 📋 System Requirements

- Node.js 14+ (for installer)
- One or more supported platforms installed
- Python 3.8+ (for some skills with dependencies)

## 🤝 Contributing

We welcome contributions! Check [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

- Create new skills using the [skill-creator](https://github.com/ericgandrade/claude-superskills) skill
- Follow [Quality Standards](docs/guides/quality-standards.md)
- Report issues and suggestions

## 🔒 Privacy

claude-superskills does not collect, store, transmit, or share any user data.

- **No external servers** — the plugin has no backend, no telemetry, and no network requests of its own
- **No API keys required** — all skills run entirely within Claude Code using Claude's native tools (WebSearch, WebFetch, Bash, Read/Write)
- **No logging** — nothing is recorded outside of your local Claude Code session
- **Open source** — all skill logic is fully auditable at [github.com/ericgandrade/claude-superskills](https://github.com/ericgandrade/claude-superskills)

Any web searches or document fetches performed by skills use Claude Code's built-in tools, subject to Anthropic's own privacy policy.

## 📄 License

MIT - See [LICENSE](./LICENSE) for details.

## 🔗 Quick Links

- 📚 [Full Catalog](CATALOG.md) - All skills with metadata
- 🛠️ [Skills Development Guide](docs/references/skills-development.md) - Create custom skills
- 📝 [Changelog](CHANGELOG.md) - Release history
- 🐛 [Issues](https://github.com/ericgandrade/claude-superskills/issues) - Report problems
- 💬 [Discussions](https://github.com/ericgandrade/claude-superskills/discussions) - Share ideas

---

**Built with ❤️ by [Eric Andrade](https://github.com/ericgandrade)**

*Version 1.21.2 | March 2026*

## 🎁 Get Started

Choose a bundle that fits your workflow:

- **[Essential](docs/bundles/bundles.md#-essential-bundle)** - skill-creator, prompt-engineer
- **[Content](docs/bundles/bundles.md#-content-creation-bundle)** - youtube-summarizer, audio-transcriber, docling-converter, cloudconvert-converter, pptx-translator, storytelling-expert
- **[Planning](docs/bundles/bundles.md#-planning--execution-bundle)** - brainstorming, writing-plans, executing-plans, mckinsey-strategist
- **[Product](docs/bundles/bundles.md#-product--strategy-bundle)** - abx-strategy, ai-native-product, product-strategy, and more
- **[Career](docs/bundles/bundles.md#-career--professional-growth-bundle)** - resume-ats-optimizer, interview-prep, salary-negotiation, and more
- **[Research](docs/bundles/bundles.md#-research--analysis-bundle)** - deep-research, us-program-research + discovery
- **[Developer](docs/bundles/bundles.md#-developer-bundle)** - skill-creator for power users
- **[All](docs/bundles/bundles.md#-all-skills-bundle)** - Complete toolkit

See [detailed comparison](docs/bundles/bundles.md#-bundle-comparison).

## 🛠️ Advanced Usage

- **[Skill Anatomy](docs/guides/skill-anatomy.md)** - How to build skills
- **[Skills Development](docs/references/skills-development.md)** - Advanced creation
- **[Changelog](CHANGELOG.md)** - Version history

---

**Getting Started? Check [Quick Start](docs/guides/getting-started.md) or run `npx claude-superskills` now!**
