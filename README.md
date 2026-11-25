<h1 align="center">Claude Superskills</h1>

<p align="center"><b>v3.0.0</b> · Open Source · MIT License · Vendor-Agnostic</p>

<p align="center">
  <img alt="Version 3.0.0" src="https://img.shields.io/badge/version-3.0.0-blue.svg">
  <img alt="53 skills" src="https://img.shields.io/badge/skills-53-brightgreen.svg">
  <img alt="MIT License" src="https://img.shields.io/badge/license-MIT-green.svg">
  <img alt="Vendor-agnostic" src="https://img.shields.io/badge/vendor-agnostic-1d3fbf.svg">
</p>

**53 AI skills for the work around the code**: getting the job, shaping the product, designing what people see, keeping your notes connected, and researching and communicating what you know.

A skill is a Markdown workflow that an AI tool loads when your request matches it. Ask *"tailor my resume to this job post"*, *"build an Opportunity Solution Tree"* or *"turn this meeting audio into notes"*, and the matching skill takes over with a tested procedure instead of a generic answer. The skills run in Claude Code, GitHub Copilot CLI, OpenAI Codex, Gemini CLI, Cursor and other tools that read skill folders.

Building software with AI agents? See the companion project, **[The Agentic SDLC Method](https://github.com/ericgandrade/agentic-sdlc)**.

---

## The skills

### Career (20)

| Skill | What it does |
|---|---|
| `resume-tailor` | Customizes a resume for one job posting while keeping it truthful |
| `resume-ats-optimizer` | Checks ATS compatibility and keyword match against a job description |
| `resume-bullet-writer` | Turns weak bullets into achievement statements with metrics and impact |
| `resume-quantifier` | Finds places to add numbers and estimates them when exact data is missing |
| `resume-formatter` | Produces a clean, ATS-friendly, scannable layout |
| `resume-section-builder` | Builds summary, skills, education and other sections for a level and role |
| `resume-version-manager` | Keeps a master resume and tracks tailored versions per application |
| `tech-resume-optimizer` | Tunes resumes for engineering, product and technical roles |
| `executive-resume-writer` | Writes C-suite and VP resumes around strategy, board impact and P&L |
| `creative-portfolio-resume` | Balances visual design with ATS compatibility for creative roles |
| `academic-cv-builder` | Formats CVs for faculty, research and postdoc positions |
| `career-changer-translator` | Translates experience across industries for a career pivot |
| `job-description-analyzer` | Scores resume-to-job fit, finds gaps and plans the application |
| `cover-letter-generator` | Writes a tailored cover letter from a resume and a job description |
| `linkedin-profile-optimizer` | Rewrites headline, About and experience for recruiter search |
| `portfolio-case-study-writer` | Expands resume bullets into portfolio case studies |
| `interview-prep-generator` | Generates STAR stories, practice questions and talking points |
| `reference-list-builder` | Prepares reference sheets and briefs your references |
| `offer-comparison-analyzer` | Compares offers side by side on total compensation |
| `salary-negotiation-prep` | Researches market rates and scripts the counter-offer |

### Product (8)

| Skill | What it does |
|---|---|
| `product-operating-model` | Overview of the Modern Product Operating Model and how the product skills fit |
| `product-strategy` | Where to play and how to win: strategy canvas, ICP and anti-ICP |
| `product-discovery` | Continuous discovery: weekly rhythm, Opportunity Solution Trees, interviews |
| `product-architecture` | Turns opportunities into prioritized bets and roadmaps |
| `product-delivery` | Staged rollouts, metrics hierarchies, bet retrospectives, launches |
| `product-leadership` | Director and CPO work: portfolios, executives, boards |
| `abx-strategy` | Account-Based Everything go-to-market for complex B2B sales |
| `startup-growth-strategist` | Idea validation, TAM/SAM/SOM, growth projections, go-to-market |

### Design (9)

| Skill | What it does |
|---|---|
| `ui-ux-pro-max` | UI/UX design intelligence for web and mobile: styles, palettes, typography, patterns |
| `design` | End-to-end design help: brand identity, tokens, UI styling, logos |
| `design-system` | Creates, maintains or migrates a design system with layered tokens |
| `ui-styling` | shadcn/ui components, Tailwind CSS, responsive layouts |
| `brand` | Brand voice, visual identity standards and messaging frameworks |
| `banner-design` | Banners in 22 art-direction styles |
| `slides` | HTML presentations with Chart.js visualizations and design tokens |
| `excalidraw-diagram` | Hand-drawn style architecture and concept diagrams |
| `mermaid-diagram` | Flowcharts, sequence, class, state and ER diagrams in Mermaid |

### Obsidian (6)

| Skill | What it does |
|---|---|
| `obsidian-note-builder` | Turns raw content into a structured, richly linked note |
| `obsidian-markdown` | Writes Obsidian Flavored Markdown: wikilinks, callouts, embeds |
| `obsidian-links` | Creates, validates, repairs and analyzes wikilinks across a vault |
| `obsidian-frontmatter` | Creates, validates and standardizes YAML properties |
| `obsidian-canvas` | Builds and edits Obsidian Canvas boards |
| `obsidian-automation` | Automates repetitive vault tasks with the Obsidian CLI and scripts |

### Knowledge (10)

| Skill | What it does |
|---|---|
| `deep-research` | Multi-step web research with citations, evidence evaluation and gap analysis |
| `webpage-reader` | Fetches a URL and returns clean, readable Markdown |
| `us-program-research` | Researches, compares and ranks US academic programs |
| `youtube-summarizer` | Extracts a YouTube transcript and writes a detailed summary |
| `audio-transcriber` | Turns audio recordings into Markdown notes with summaries |
| `document-converter` | Office ↔ PDF, PDF ↔ images, merge, split, rotate, encrypt and OCR, with local tools |
| `pptx-translator` | Translates PowerPoint decks between languages, keeping the layout |
| `storytelling-expert` | Turns ideas, talks and data into persuasive stories |
| `mckinsey-strategist` | Structured strategic analysis and executive recommendations |
| `prompt-engineer` | Creates and improves prompts for AI models |

Some skills need local tools, for example `ffmpeg` and Whisper for audio, LibreOffice for documents, or Python for the design data scripts. Each skill's `README.md` lists its requirements.

## Install

**Claude Code (plugin, recommended).** Inside a `claude` session:

```text
/plugin marketplace add ericgandrade/claude-superskills
/plugin install superskills@claude-superskills
```

Skills appear as `/superskills:<skill-name>`, or just ask in plain language.

**Other tools (GitHub Copilot CLI, Codex, Gemini CLI, Cursor, OpenCode and others).** Copy the skill folders you want into the tool's skills directory:

```bash
git clone https://github.com/ericgandrade/claude-superskills
cp -R claude-superskills/skills/resume-tailor ~/.copilot/skills/
```

An `npx` installer for all tools is planned for this repository.

## One repository instead of five

Until November 2026 these skills lived in five packages: obsidian-superskills, career-superskills, product-superskills, design-superskills and knowledge-superskills. They are merged here, with no skill renamed, so there is one place to install, update and report issues. The former repositories were retired.

If you added the `ericgandrade/claude-superskills` marketplace in Claude Code before November 2026, it served the Agentic SDLC. It now serves the `superskills` plugin; for the Agentic SDLC, run `/plugin marketplace add ericgandrade/agentic-sdlc`.

## Credits and license

MIT. Several design skills adapt [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) by Next Level Builder (MIT); `ui-styling` ships its own Apache 2.0 license and fonts under the SIL Open Font License. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

---

*Version 3.0.0 | November 2026*
