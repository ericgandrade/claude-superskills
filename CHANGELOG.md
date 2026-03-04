# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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
