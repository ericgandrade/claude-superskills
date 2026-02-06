# Changelog

All notable changes to cli-ai-skills will be documented in this file.

## [1.7.0] - 2026-02-06

### Added
- ✨ **ESC key cancellation**: Press ESC during installation to cancel with confirmation
- ✨ **5-platform support**: Added OpenCode and Gemini CLI support (total: Copilot, Claude, Codex, OpenCode, Gemini)
- ✨ **Visual tools table**: Display detected AI tools with versions in formatted table
- ✨ **Version checking**: Auto-detect installed cli-ai-skills version and suggest updates
- ✨ **Reinstall option**: Offer reinstall when all skills are up-to-date
- 📊 **Enhanced detection**: Tools now return detailed info (installed, version, path)
- 🗑️ **Improved uninstall**: Support for all 5 platforms with better UX
- 🔄 **Enhanced update**: Reinstall option and multi-platform support

### Changed
- 🔄 **detector.js structure**: Now returns objects with `{installed, version, path}` instead of booleans
- 🔄 **Platform count**: 3 → 5 platforms (+67%)
- 🔄 **build-skills.sh**: Syncs to 5 platform directories
- 🔄 **Interactive prompts**: Improved messaging with ESC hint

### Fixed
- 🐛 **Cleanup on cancel**: Partial installations are now cleaned up automatically
- 🐛 **Version display**: Consistent version display across all tools

### Technical
- Created `.opencode/skills/` and `.gemini/skills/` directories
- Added `lib/cleanup.js` for installation cleanup
- Added `lib/version-checker.js` for version comparison
- Added `lib/ui/table.js` for visual output
- Added `lib/opencode.js` and `lib/gemini.js` installers
- Enhanced `interactive.js` with ESC handler

## [1.6.0] - 2026-02-06

Initial multi-platform release with 5 platforms support (preparation).

## [1.5.0] - 2026-01-31

### Added
- Command shortcuts: `i`, `ls`, `up`, `rm`, `doc`
- Short flags: `-a`, `-g`, `-l`, `-y`, `-q`
- Curated bundles: essential, content, developer, all
- Bundle CLI: `--bundle <name>` for curated installations
- Search functionality: `--search <keyword>`

### Changed
- Modernized installer with better UX
- Improved documentation structure
- Enhanced error messages
