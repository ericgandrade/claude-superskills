# Changelog

## [3.0.0] - 2026-11-25

### Changed
- **One repository for every public superskills package.** The repository formerly called knowledge-superskills is now `claude-superskills` and holds 53 skills, with no skill renamed or rewritten:

  | Domain | Skills | Source repository and commit |
  |---|---:|---|
  | Career | 20 | career-superskills `63b7637` |
  | Product | 8 | product-superskills `a93a3ac` |
  | Design | 9 | design-superskills `59d0ee6` |
  | Obsidian | 6 | obsidian-superskills `a1d2494` |
  | Knowledge | 10 | knowledge-superskills `a251345` |

- The Claude Code plugin is now `superskills` (the `claude-` prefix is reserved): `/plugin install superskills@claude-superskills`. The marketplace keeps the name `claude-superskills`.
- Version 3.0.0 continues the numbering of the `claude-superskills` name, which reached 2.0.8 in the earlier project now called agentic-sdlc.

### Added
- **npm installer `claude-superskills` 3.0.0** (`npx claude-superskills`), based on the installer of The Agentic SDLC Method: bundles `career`, `product`, `design`, `obsidian`, `knowledge` and `all`. It caches in `~/.superskills/cache` and manages only this package's skills, so it never removes skills installed by `agentic-sdlc-method` or by hand. Publishing runs from `.github/workflows/publish-npm.yml` (npm Trusted Publishing with provenance, `NPM_TOKEN` fallback); `scripts/check-skills.mjs` checks frontmatter, bundles and counts in CI.
- `THIRD_PARTY_NOTICES.md` with the MIT notice of ui-ux-pro-max-skill (Next Level Builder), adapted by seven design skills, and the bundled Apache 2.0 and SIL OFL licenses of `ui-styling`.
- README with the full catalog by domain.

### Fixed
- `prompt-engineer` description written in the third person, as the frontmatter rule requires.

## [1.0.0] - 2026-11-25

### Added
- First release as knowledge-superskills. Ten skills moved from the project now called agentic-sdlc. Each skill keeps its own version and history notes in its `README.md`:
  - Research: `deep-research` 2.3.0, `webpage-reader` 1.0.0, `us-program-research` 2.0.0.
  - Content: `youtube-summarizer` 2.1.0, `audio-transcriber` 2.1.0.
  - Documents: `document-converter` 1.0.0, `pptx-translator` 2.8.0.
  - Thinking and communication: `storytelling-expert` 2.0.0, `mckinsey-strategist` 2.1.0, `prompt-engineer` 2.0.0.
- Claude Code plugin manifest and marketplace entry.
