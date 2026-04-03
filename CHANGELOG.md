# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.22.0] - 2026-04-03

### Added

- **webpage-reader skill**: extracts clean Markdown from URLs using the Defuddle CLI. Supports metadata-only mode, batch URL processing, and custom output paths.
- **mermaid-diagram skill**: generates Mermaid diagram syntax (flowchart, sequence, class, state, ER, mindmap, Gantt, pie, quadrant) from plain-language descriptions. 12 diagram types supported.
- **excalidraw-diagram skill**: creates hand-drawn style diagrams in Excalidraw JSON format. Supports architecture sketches, concept maps, user flows, C4 context diagrams, and org charts. Output embeds in Obsidian or opens at excalidraw.com.
- **obsidian-markdown skill**: comprehensive Obsidian Flavored Markdown reference — wikilinks, embeds, callouts, frontmatter properties, block IDs, and all Obsidian-specific syntax extensions.
- **obsidian-links skill**: creates, validates, repairs, and analyzes wikilinks in Obsidian vaults. Includes broken link detection, orphan discovery, auto-linking, and Map of Content builder.
- **obsidian-frontmatter skill**: creates, validates, standardizes, and repairs YAML frontmatter properties in Obsidian notes. Covers tags, aliases, dates, custom properties, and Dataview-compatible schema.
- **obsidian-automation skill**: automates Obsidian vault tasks using the Obsidian CLI (Local REST API), shell scripts, and Templater. Batch note creation, bulk frontmatter updates, vault maintenance, and integration with external tools.
- **obsidian-note-builder skill**: builds complete, knowledge-graph-ready Obsidian notes from raw content. Extracts entities, inserts wikilinks, applies note templates (atomic, meeting, reference, project), and supports Zettelkasten atomicity.
- **obsidian-canvas skill**: creates freeform visual workspaces using Obsidian Canvas JSON format. Supports hub-and-spoke, column, linear, and Kanban layout patterns. Output is a ready-to-save `.canvas` file.
- **obsidian bundle**: new curated bundle containing `obsidian-markdown`, `obsidian-links`, `obsidian-frontmatter`, `obsidian-automation`, `obsidian-note-builder`, `obsidian-canvas`.
- **content bundle**: extended with `webpage-reader`, `mermaid-diagram`, `excalidraw-diagram`.
- **research bundle**: extended with `webpage-reader`.

### Fixed

- **validate-skill-yaml.sh**: fixed false positive when SKILL.md body contains YAML code examples (e.g., showing how to write frontmatter with `tags:`, `---` delimiters). Validator now uses `awk` to extract only the first frontmatter block, ignoring code examples in the body.

---

## [1.21.8] - 2026-03-22

### Added

- **document-converter skill**: converts Office documents to PDF, performs PDF operations (merge, split, rotate, encrypt/decrypt, OCR) using local free tools — LibreOffice, ghostscript, pdftk, tesseract, imagemagick. No API key, no cost, works offline on macOS, Linux, and Windows.

### Removed

- **cloudconvert-converter skill**: replaced by `document-converter`. Removed CloudConvert dependency, API key requirement, paid tier, and rate limits.
- **CloudConvert MCP server** (`mcp-servers/cloudconvert/`): removed entirely. MCP server infrastructure (`mcp-installer.js`) kept as empty stub for future servers.

---

## [1.21.7] - 2026-03-20

### Changed

- **Installer UX clarification**: when all detected CLI platforms are already up to date, the installer now explicitly calls out Claude Cowork as a manual packaging target and lists platforms that are not installed on the machine, so users understand nothing will be changed there
- **Prompt wording**: refined the no-op follow-up prompt to clarify that the action applies only to CLI-installed platforms, reducing confusion when Cowork is also selected


## [1.21.6] - 2026-03-20

### Added

- **Claude Cowork packaging flow**: the installer now detects Claude Desktop/Cowork, offers Cowork as a manual-upload target, generates a plugin zip, and prints explicit replace-the-old-version update instructions

### Changed

- **Cowork command surface**: added `package-cowork` / `cowork` as a direct command for generating the Cowork plugin package without running the full install flow
- **Installer documentation**: documented the Cowork update flow and clarified that the current support level is validated on macOS, with Windows/Linux detection implemented as best-effort heuristics pending end-to-end validation

### Fixed

- **Detection table completeness**: the installer table now includes Claude Cowork alongside Cursor IDE and AdaL CLI, keeping detected tools aligned with actual installer support
- **Windows/Linux Cowork detection heuristics**: expanded common install/data path checks so Cowork-capable Claude Desktop installs are more likely to be detected outside macOS

## [1.21.5] - 2026-03-20

### Fixed

- **Gemini CLI version detection**: the installer now extracts the installed Homebrew Gemini CLI version from the resolved binary path when `gemini --version` is slow or non-responsive, so Gemini shows `0.34.0` instead of generic `Detected`
- **Version table rendering**: normalized multiline and noisy version outputs before rendering, so tools like Antigravity no longer break the table layout with Electron error lines or extra metadata

## [1.21.4] - 2026-03-20

### Fixed

- **Validate workflow updated to current architecture**: removed legacy mirrored-skill sync assumptions and replaced them with version/doc consistency checks plus a guard against tracked platform skill directories
- **YAML validation updated to current SKILL.md contract**: `scripts/validate-skill-yaml.sh` now requires `name`, `description`, and `license`, and rejects legacy fields such as `version`, `author`, `tags`, and `risk`
- **Release follow-up**: supersedes the failed `v1.21.3` tag attempt, which did not publish to npm

## [1.21.3] - 2026-03-20

### Fixed

- **Documentation consistency hardening**: corrected stale installer, marketplace, contribution, versioning, and quality docs that still described mirrored in-repo platform skill directories as active source
- **Release validation**: added `scripts/check-doc-consistency.sh` and updated `scripts/verify-version-sync.sh` plus `scripts/pre-publish-check.sh` to catch version drift and stale public metadata before release
- **Authoring workflow scripts**: updated `scripts/create-skill.sh`, `scripts/update-main-readme.sh`, `scripts/check-tools.sh`, and `scripts/install-skills.sh` to use `skills/` as the repository source of truth
- **Legacy guidance cleanup**: refreshed affected skill READMEs and marked archived reference material as historical so maintainers are no longer directed to deprecated mirrored workflows

## [1.21.2] - 2026-03-20

### Added

- **pptx-translator v2.8.0 — interactive output filename choice (Step 1.5)**: After the Step 1 confirmation, the skill now presents 3 filename options:
  1. Original filename + target language suffix (default, e.g. `proposta_comercial_fr.pptx` for PT→FR)
  2. AI translates the filename stem to the **target language** (e.g. `proposition_commerciale_fr.pptx` for PT→FR; `revisão_trimestral_pt.pptx` for EN→PT) — never hardcoded to English
  3. Custom name — free-form input, normalized to `.pptx` with spaces replaced by `_`
- **pptx-translator evals.json**: Added 2 new evals (ids 6 and 7) covering the 3 filename options across PT→FR and EN→PT language pairs

---

## [1.21.1] - 2026-03-19

### Fixed

- **Gemini CLI version detection**: Replaced `execFileSync` (which threw on non-TTY environments) with `spawnSync` capturing both stdout and stderr — eliminates "Unknown" version display
- **MCP "already up-to-date" noise**: Suppressed redundant `ℹ️  MCP config already up-to-date` messages that appeared on every run even when no changes occurred
- **README sync**: Fixed `pptx-translator` version (v2.6.0 → v2.7.0) and skill count claim ("45 Universal Skills" → "46 Universal Skills")

---

## [1.21.0] - 2026-03-19

### Changed

**Token Economy Pass — 5 major skills optimized:**
- **agent-skill-orchestrator**: Removed ~2,200 words of JavaScript pseudocode (6 non-executable functions); replaced with concise prose + scoring table; truncated verbose examples; removed 6 zero-value appendix sections; ~46% reduction (4,841 → 2,600 words)
- **agent-skill-discovery**: Removed JavaScript pseudocode functions (`discoverMCPTools`, `searchResources`), PLATFORM_CONFIGS object, Platform Support block; truncated examples; removed 5 appendix sections; ~50% reduction (3,005 → 1,500 words)
- **skill-creator**: Removed redundant JSON schema blocks, UI description sections, duplicate closing summary; ~39% reduction (4,586 → 2,809 words)
- **abx-strategy**: Removed ASCII art boxes, duplicate tables, "When to Use This Skill" and "Using This Skill with Claude" sections, merged KPI tables; ~29% reduction (3,394 → 2,420 words)
- **youtube-summarizer**: Truncated verbose Examples 2 and 4

**Parallelization — 13 skills upgraded with named sub-agents:**
- **interview-prep-generator**: Added `StoryBanker` (parallel STAR story generation per bullet) + 5 named prep agents for parallel interview prep
- **deep-research**: Added 6 `ResearchScout` agents for parallel query execution
- **salary-negotiation-prep**: Added 7 `SalaryScout` agents + `CompCalculator` for parallel market research
- **job-description-analyzer**: Added `RequirementExtractor`, `KeywordExtractor`, `GapAnalyzer`, `RedFlagDetector` for parallel JD analysis
- **mckinsey-strategist**: Added `SWOTAnalyst`, `VRIOAnalyst`, `SevenSAnalyst`, `SecondOrderAnalyst`, `ImpactMatrixAnalyst` for parallel framework analysis
- **audio-transcriber**: Added `TopicExtractor`, `ActionExtractor`, `DecisionExtractor` + batch mode pattern
- **resume-tailor**: Added `SummaryTailor`, `SkillsTailor`, `ExperienceTailor`, `EducationTailor` for parallel section tailoring
- **resume-ats-optimizer**: Added 5 named analyzer agents (`HardSkillsAnalyzer`, `SoftSkillsAnalyzer`, `IndustryAnalyzer`, `FormattingAuditor`, `KeywordDensityChecker`) for parallel ATS analysis
- **offer-comparison-analyzer**: Added 8 agents (`CashAnalyzer`, `EquityAnalyzer`, `BenefitsAnalyzer`, `PerksAnalyzer`, `GrowthScorer`, `WorkLifeScorer`, `CultureScorer`, `RiskScorer`) for parallel offer analysis
- **senior-solution-architect**: Added `C4-Context`, `C4-Container`, `C4-Component`, `AdrGenerator` for parallel C4 diagram generation
- **cloudconvert-converter**: Added `FileConverter` agent per file for batch mode parallel conversion
- **docling-converter**: Added `DoclingConverter` agent per file for batch mode parallel document processing
- **agent-skill-discovery**: Added `PluginScanner`, `SkillScanner`, `McpScanner`, `RepoScanner` parallel scanning strategy

**Career Skills Cleanup — 18 skills cleaned:**
- Removed double YAML frontmatter block (legacy `---name:` block with invalid version/author/category/risk/platforms fields) from all 18 career skills
- Removed `## When to Use This Skill` and `## Core Capabilities` sections (zero decision value for agent execution)



## [1.20.10] - 2026-03-19

### Changed
- **pptx-translator v2.7.0: SlideTranslator agent identity** — translation sub-agents now named `SlideTranslator` (visible in platform logs and Claude Code UI); classifier sub-agent named `SlideClassifier`; agents launched with `description="SlideTranslator — slides X-Y/TOTAL"` on Claude Code
- **pptx-translator v2.7.0: Haiku model for Claude Code** — SlideTranslator agents automatically use `model="haiku"` on Claude Code (mechanical JSON-in/JSON-out translation); SlideClassifier keeps session default; reduces per-slide cost ~20x
- **pptx-translator v2.7.0: Economy Mode hint** — one-time tip before confirmation box showing cheapest invocation per platform (Gemini: `--model gemini-2.0-flash`, Codex: `--model gpt-4o-mini`, OpenCode config, Cursor/Copilot/AdaL UI)
- **pptx-translator v2.7.0: minified JSON payloads** — manifest and translation JSON serialized without indentation, reducing input tokens ~30% on large presentations



## [1.20.9] - 2026-03-19

### Fixed
- **detector: Gemini CLI version showing as "Unknown"** — `detectGemini()` was using `spawnSync` for fallback paths, which returns empty stdout when the subprocess environment lacks Homebrew; switched to `execFileSync` with an augmented PATH (`/opt/homebrew/bin:/usr/local/bin:$PATH`) so Gemini's own `--version` command resolves its runtime dependencies correctly; version now reports correctly (e.g. `0.34.0`)



## [1.20.8] - 2026-03-19

### Fixed
- **pptx-translator v2.6.0: batched parallel execution (universal)** — replaced single-agent-per-slide with batches of 3 slides launched simultaneously; eliminates Gemini CLI `_recoverFromLoop` aborts caused by exceeding ~25 session turns; works uniformly across all 8 platforms without platform detection; 18 slides = 6 batches × 3 agents instead of 18 simultaneous agents
- **pptx-translator v2.6.0: consolidated Step 5** — integrity check + cleanup + final summary now execute in a single Python script (one tool call), reducing final-step turns from 3 to 1



## [1.20.7] - 2026-03-19

### Fixed
- **pptx-translator v2.5.0: 8 improvements from code review** — removed `langdetect` dependency entirely (only `python-pptx` required); classifier prompt now explicitly instructs agent to save to `/tmp/pptx_classify_output.json`; added fallback to translate-all-with-text when classifier returns invalid JSON; added batching note for >50-slide presentations; fixed multiline table cell write-back (per-paragraph, same fix as speaker notes in v2.3); removed unused imports (`pptx.util.Pt`, `lxml.etree`); added classifier temp files to cleanup; documented classifier failure in error table
- **pptx-translator v2.4.0: AI-native language classification** — replaced all hardcoded regex patterns and `langdetect` calls with a dedicated AI classifier sub-agent; model receives all slide texts and returns `needs_translation` per slide using native language understanding; works for any language pair with zero hardcoded patterns; agents self-validate using language understanding instead of `langdetect`
- **pptx-translator v2.3.0: 3-layer detection, progress gauge, multiline notes** — replaced single-regex with 3-layer strategy (expanded regex → langdetect on concatenated blocks → conservative fallback); added non-blocking per-slide progress gauge; agents receive explicit validation script; multiline speaker notes now split by `\n` and mapped back to individual paragraphs



## [1.20.6] - 2026-03-19

### Fixed
- **skill version analysis: all 46 skills showing as newer/unknown** — `readSkillVersion()` in `skill-diff.js` and `getSkillVersion()` in `skill-versions.js` were reading `version` from SKILL.md frontmatter, which is intentionally absent (adding it causes Claude Code loading failures); both functions now fall back to parsing the `| Version | X.Y.Z |` row from `README.md` Metadata table



## [1.20.5] - 2026-03-19

### Fixed
- **pptx-translator: false-negative slide skip (langdetect misclassification)** — replaced `detect_slide_language()` (per-slide langdetect) with `has_source_language_content()` (per-block regex); slides like "CiberSegurança Avanade Brasil" were misclassified as Catalan ("ca") and skipped untranslated; fix uses accented-char + PT stop-word patterns evaluated per block
- **pptx-translator: mixed-language slides incorrectly skipped** — a slide is now skipped only when ZERO text blocks match the source language; previously any misclassification of the concatenated slide text caused the entire slide to be skipped
- **pptx-translator: redundant backup in Safe mode** — removed `_backup_{timestamp}.pptx` creation from Safe mode; output is always a new file so the original is already preserved; backup is now created only in YOLO mode before overwriting the original



## [1.20.4] - 2026-03-19

### Fixed
- **detector: Gemini CLI not detected on macOS Homebrew** — `detectGemini()` now falls back to common install paths (`/opt/homebrew/bin/gemini`, `/usr/local/bin/gemini`, `~/.local/bin/gemini`, `~/go/bin/gemini`) when `gemini` is not in the npx PATH; final fallback checks `~/.gemini` directory for real Gemini CLI content (excluding antigravity-only installs)



## [1.20.3] - 2026-03-19

### Fixed
- **pptx-translator: GROUP shapes not traversed** — extraction and write-back now use recursive `iter_shapes()` that descends into MSO_SHAPE_TYPE.GROUP; nested text boxes are now fully extracted and translated
- **pptx-translator: write-back lookup key collision** — changed from `shape_id` to `(parent_id, shape_id)` composite key to prevent collisions between children of different group shapes
- **pptx-translator: validation ignores table cells** — per-slide validation now counts both text runs and table cell blocks for accurate completeness reporting
- **pptx-translator: agents launched in sequential rounds** — skill now explicitly instructs all agents to be launched in a single parallel block
- **pptx-translator: pass-through overhead for already-translated slides** — slides already in the target language are now skipped entirely via langdetect; no agent launched
- **pptx-translator: excessive confirmations** — consolidated to one config confirmation; dependency install is silent with `--user`; no mid-workflow prompts
- **pptx-translator: proper nouns translated** — added explicit rule with examples (Accenture, Microsoft, Azure, personal names, acronyms) to never translate proper nouns
- **pptx-translator: per-slide validation moved inside each agent** — translate → validate → retry happens inside each parallel agent; Step 5 is now a lightweight file integrity check only
- **pptx-translator: improvised debug shell commands** — added explicit rule prohibiting preview/debug shell commands not in the workflow specification



## [1.20.2] - 2026-03-19

### Fixed
- **Security: command injection in pip installer** — replaced execSync(string) with spawnSync(cmd, [args]) in requirements-installer.js
- **Security: bash script execution without validation** — added stat.isFile() and ownership check before running skill install scripts
- **Security: --break-system-packages removed** — pip installs now use --user only
- **Security: path traversal in skill names** — added isValidSkillName() and assertSafePath() in all 8 platform installers
- **Security: path traversal in zip extraction** — zip entries validated against targetDir before extraction
- **Security: YAML unsafe load** — yaml.load() now uses FAILSAFE_SCHEMA
- **Security: cache integrity** — .cache-complete marker now stores skillCount as JSON
- **Security: auto-push postversion hook removed** — package.json no longer auto-pushes on npm version
- **Performance: detector timeout** — execSync calls have 3s timeout; removed slow npm list -g fallbacks
- **Bug: release.js invalid regex** — fixed SyntaxError in footer replacement regex

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
