# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.20.1] - 2026-03-19

### Fixed
- **youtube-summarizer SKILL.md** — aligned with README.md by adding 3-mode environment detection (Mode A: Python/CLI, Mode B: WebFetch for sandboxed environments, Mode C: manual paste when YouTube is blocked); previously the SKILL.md only described the Python path with no fallback

---

## [1.20.0] - 2026-03-19

### Added
- New `pptx-translator` skill: translate PowerPoint presentations between any language pair with parallel sub-agent slide-by-slide translation, full validation sub-routine (completeness, language detection, notes, file integrity), backup/YOLO mode, and speaker notes support
- EVALs and trigger-evals for `pptx-translator` (5 test cases, 20 trigger queries)

---

## [1.19.2] - 2026-03-06

### Fixed
- **SKILL.md version alignment** — Updated `version` field in 20 career skill `SKILL.md` frontmatter files from `1.0.0` to `2.0.0` to match each skill's `README.md` Metadata table
- **Main README skill table** — All 45 skills now listed with `v2.0.0`; 12 missing career skills added; empty Product Management & Strategy section populated with 7 skills; skill count badge corrected to 45

### Closed
- GitHub Roadmap issues #2, #3, #4 — Gemini CLI, OpenCode, and Codex platform support confirmed implemented since v1.13.x

---

## [1.19.1] - 2026-03-06

### Changed
- **All 45 skill READMEs** updated to Skill 2.0 — each README now reflects actual skill functionality, includes a `## What's New in v2.0` section (Progress Tracking, EVals, Error Handling, Standardized description), bumps skill version to `2.0.0`, and lists all 8 AI CLI platforms
- **Tier 1 rewrites** (8 skills): `ai-native-product`, `product-architecture`, `product-delivery`, `product-discovery`, `product-leadership`, `product-operating-model`, `product-strategy` — replaced generic "Strategic planning and execution" placeholder content with accurate, skill-specific documentation
- **Tier 2 expansions** (20 skills): all career skills plus `brainstorming`, `creative-portfolio-resume`, `career-changer-translator` — expanded minimal 21-line READMEs to full documentation with When to Use, What is Included, Typical Invocations, and What's New in v2.0
- **Tier 3 updates** (17 skills): all other skills — added evals references, What's New in v2.0, version bump to 2.0.0, and all-8-platform coverage

---

## [1.19.0] - 2026-03-06

### Added
- **`evals/evals.json`** for all 45 skills — 2-3 realistic test cases per skill with concrete prompts, expected outputs, and verifiable assertions, following the Anthropic skill-creator EVals schema
- **`evals/trigger-eval.json`** for all 45 skills — 20 queries per skill (10 should-trigger / 10 should-not-trigger) for description optimization and trigger accuracy benchmarking
- **`scripts/optimize-all-skills.sh`** — batch eval runner that scans all skills, validates evals presence, and reports readiness status

### Changed
- **Progress Tracking sections** added to all 45 `SKILL.md` files — 4-phase gauge bars (`[████░░░░░░░░░░░░░░░░] N% — Phase X/Y: Description`) show workflow progress during skill execution
- **All SKILL.md descriptions** standardized to the required format: `"This skill should be used when the user [verb]..."` — fixed grammar, truncation, and broken phrasing across all 45 skills
- **Error Handling tables** (`| Error | Likely Cause | Action |`) added to 19 skills with external dependencies or complex workflows: `youtube-summarizer`, `audio-transcriber`, `docling-converter`, `executing-plans`, `deep-research`, `us-program-research`, `executive-resume-writer`, `resume-tailor`, `linkedin-profile-optimizer`, `interview-prep-generator`, `salary-negotiation-prep`, `job-description-analyzer`, `cover-letter-generator`, `academic-cv-builder`, `career-changer-translator`, `tech-resume-optimizer`, `resume-formatter`, `resume-version-manager`, `offer-comparison-analyzer`

---

## [1.18.1] - 2026-03-06

### Changed
- **`skill-creator` (v2.0.0):** Major rewrite incorporating the full Anthropic official skill-creator framework. Now supports both creating new skills AND improving existing ones. Added: EVals framework (with-skill + baseline subagent runs, grader/analyzer/comparator agents, benchmark.json, eval-viewer browser UI), Description Optimization loop (`scripts/run_loop.py` with 60/40 train/test split, Claude extended thinking, max 5 iterations), Blind A/B comparison, and packaging. All scripts, agents, and eval-viewer copied verbatim from the Anthropic official skill-creator plugin. SKILL.md adapted with claude-superskills-specific conventions (frontmatter rules, skill output path, 8-platform coverage, version checklist).

### Added
- `skills/skill-creator/agents/grader.md` — evaluates assertions against execution transcripts
- `skills/skill-creator/agents/analyzer.md` — benchmark pattern analysis + blind comparison post-hoc analysis
- `skills/skill-creator/agents/comparator.md` — blind A/B rubric scoring (content + structure, 1-5 scale)
- `skills/skill-creator/references/schemas.md` — JSON schemas for evals.json, grading.json, benchmark.json, etc.
- `skills/skill-creator/references/claude-superskills-conventions.md` — rules for contributing to claude-superskills
- `skills/skill-creator/scripts/` — 9 Python scripts: run_loop.py, run_eval.py, improve_description.py, aggregate_benchmark.py, generate_report.py, package_skill.py, quick_validate.py, utils.py, __init__.py
- `skills/skill-creator/eval-viewer/generate_review.py` — browser review server (Outputs + Benchmark tabs)
- `skills/skill-creator/eval-viewer/viewer.html` — viewer HTML template
- `skills/skill-creator/assets/eval_review.html` — trigger eval review/edit UI

### Notes
- Based on [Anthropic official skill-creator](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/skill-creator) — scripts and agents included verbatim

---

## [1.18.0] - 2026-03-06

### Added
- **CloudConvert MCP Server** (`mcp-servers/cloudconvert/`) — 8 MCP tools covering file conversion (200+ formats), PDF operations (OCR, merge, split, rotate, encrypt/decrypt), upload/download, and format discovery. Integrates with all 8 platforms via auto-generated MCP config files.
- **`cloudconvert-converter` skill** — orchestration skill for CloudConvert with full error handling (quota limits, invalid API key, unsupported formats, timeouts, network errors), free tier warnings, sandbox guidance, and comparison with pandoc/docling.
- **`cli-installer/lib/mcp-installer.js`** — shared MCP config writer: merges server entries into each platform's JSON config without overwriting other tools.
- **EVals** (`skills/cloudconvert-converter/evals/evals.json`) — 5 test cases with assertions for trigger accuracy and workflow correctness.

### Changed
- `cli-installer/lib/commands/install.js` — calls `registerMcpServers` after skill installation to auto-register the CloudConvert MCP for all detected platforms.
- `.claude-plugin/plugin.json` — added `mcpServers.cloudconvert` entry for Claude Code native plugin.
- `bundles.json` — added `cloudconvert-converter` to `content` and `all` bundles.

### Notes
- CloudConvert API key must be configured manually post-install (no installer prompt).
  See `mcp-servers/cloudconvert/README.md` for setup instructions.
- Free tier: 10 conversion minutes/day. Use `CLOUDCONVERT_SANDBOX=true` for testing.

---

## [1.17.1] - 2026-03-05

### Removed
- **`pptx-to-markdown`**: Removed due to excessive dependency footprint (python-pptx, pptx2png, Apache POI). Complexity and install burden outweighed the value. Alternatives: use `docling-converter` for PowerPoint content extraction.

---

## [1.17.0] - 2026-03-04

### Added
- **`pptx-to-markdown` (v1.0.0):** Deep PowerPoint-to-Markdown converter using a 4-pass pipeline — python-pptx text extraction, Apache POI 5.3.0 high-fidelity slide rendering, and dual AI vision passes (explicit + implicit visual content). Features real-time progress gauges, 12 eval gates, 3-level error handling (FATAL/WARN/INFO), and guaranteed temp cleanup via `try/finally`.

---

## [1.16.0] - 2026-03-04

### Added
- **`senior-solution-architect` (v1.0.0):** Unified authority for C4 modeling, Architecture Decision Records (ADRs), and system design reviews. Combines Clean Architecture, Hexagonal, and DDD patterns.
- **`startup-growth-strategist` (v1.0.0):** Integrated authority for market sizing (TAM/SAM/SOM), unit economics, competitive analysis, and Go-To-Market strategy for founders.
- **Architecture bundle:** New curated bundle grouping `senior-solution-architect` and `product-architecture`.
- **Startup bundle:** New curated bundle grouping `startup-growth-strategist`, `product-strategy`, and `abx-strategy`.

### Changed
- **Release automation:** Added `scripts/release.js` to synchronize all 5 critical version files atomically.
- **CLAUDE.md:** Updated architecture tree and Skill Types to reflect all 44 skills.

## [1.15.4] - 2026-03-01

### Fixed
- **Metadata Consistency:** Re-synced all 42 skill versions after metadata structural changes.
- **Index Generation:** Fixed script to correctly parse metadata from README.md tables.

## [1.15.2] - 2026-03-01

### Fixed
- **Claude Code Compatibility:** Adopted minimal YAML frontmatter across all skills to fix "malformed YAML frontmatter" errors.
- **Metadata Management:** Moved detailed metadata (version, author, tags) to README.md files.

## [1.15.0] - 2026-03-01

### Added
- **Career & Professional Growth Bundle:** 20 new comprehensive frameworks for job seekers and professionals.
- **Product Management & Strategy Bundle:** 8 new frameworks.

## [1.14.0] - 2026-03-01

### Added
- **Product Management & Strategy Bundle:** 8 new comprehensive frameworks.
  - `abx-strategy` (v1.0.0): Account-Based Everything (ABX) GTM strategies.
  - `ai-native-product` (v1.0.0): Design AI-native product features and capabilities.
  - `product-architecture` (v1.0.0): Define scalable product architecture and modules.
  - `product-delivery` (v1.0.0): Optimize product delivery and execution workflows.
  - `product-discovery` (v1.0.0): Continuous product discovery and user research.
  - `product-leadership` (v1.0.0): Establish product leadership and team alignment.
  - `product-operating-model` (v1.0.0): Define the product operating model and processes.
  - `product-strategy` (v1.0.0): Craft cohesive product strategy and roadmaps.

## [1.13.10] - 2026-03-01

### Fixed
- **Installer Improvement:** Added robust executable path detection for Antigravity. Supports automatic `agy` alias, standard application paths (macOS, Windows, Linux), and fallback via skills directory (~/.gemini/antigravity/skills/). This fixes issues where the installer failed to find Antigravity on machines without the binary in the `PATH`.
