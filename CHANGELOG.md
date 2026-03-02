# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

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
