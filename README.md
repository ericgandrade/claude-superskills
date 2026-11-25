# Knowledge Superskills v1.0.0

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Skills](https://img.shields.io/badge/skills-10-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**10 AI skills for knowledge work**: research with citations, reading web pages and YouTube videos, transcribing audio, converting documents, translating slides, telling a story, structuring a strategy and writing better prompts.

Part of the Superskills family: [agentic-sdlc](https://github.com/ericgandrade/agentic-sdlc) (The Agentic SDLC Method) · [product-superskills](https://github.com/ericgandrade/product-superskills) · [design-superskills](https://github.com/ericgandrade/design-superskills) · [career-superskills](https://github.com/ericgandrade/career-superskills) · [obsidian-superskills](https://github.com/ericgandrade/obsidian-superskills).

## Skills

| Group | Skill | What it does |
|---|---|---|
| Research | [`deep-research`](skills/deep-research/) | Multi-step web research with source synthesis, citations, skeptical evidence evaluation and confidence and gap analysis |
| | [`webpage-reader`](skills/webpage-reader/) | Fetches a URL and returns clean, readable Markdown without navigation or ads |
| | [`us-program-research`](skills/us-program-research/) | Structured research, comparison and ranking of US academic programs |
| Content | [`youtube-summarizer`](skills/youtube-summarizer/) | Extracts a YouTube transcript and writes a detailed summary |
| | [`audio-transcriber`](skills/audio-transcriber/) | Turns audio recordings into Markdown documentation with summaries |
| Documents | [`document-converter`](skills/document-converter/) | Office ↔ PDF, PDF ↔ images, merge, split, rotate, encrypt and OCR, with local free tools |
| | [`pptx-translator`](skills/pptx-translator/) | Translates PowerPoint decks between languages, keeping the layout |
| Thinking and communication | [`storytelling-expert`](skills/storytelling-expert/) | Turns ideas, talks or data into persuasive stories |
| | [`mckinsey-strategist`](skills/mckinsey-strategist/) | Structured strategic analysis and executive recommendations |
| | [`prompt-engineer`](skills/prompt-engineer/) | Creates and improves prompts for AI models |

Some skills need local tools (for example `ffmpeg` and Whisper for audio, LibreOffice and Ghostscript for documents). Each skill's `README.md` lists its requirements.

## Install

**Claude Code (plugin):** run inside a `claude` session:

```text
/plugin marketplace add ericgandrade/knowledge-superskills
/plugin install knowledge-superskills@knowledge-superskills
```

Skills then appear as `/knowledge-superskills:<skill-name>`. To try it locally without installing: `claude --plugin-dir ./knowledge-superskills`.

**Other platforms (GitHub Copilot CLI, Codex, Gemini CLI, Cursor, OpenCode and others):** copy the skill folders you want into the platform's skills directory, for example:

```bash
git clone https://github.com/ericgandrade/knowledge-superskills
cp -R knowledge-superskills/skills/deep-research ~/.copilot/skills/
```

An `npx` installer like the other Superskills packages is planned.

## History

These skills were part of claude-superskills, now [agentic-sdlc](https://github.com/ericgandrade/agentic-sdlc), up to v2.0.8. They moved here in November 2026 so that agentic-sdlc can focus on the Agentic SDLC method. Their earlier history is in that repository.

## License

MIT. See [LICENSE](LICENSE).
