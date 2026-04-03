# 🌐 webpage-reader

> Extract clean Markdown content from any web page URL, removing navigation, ads, and clutter for token-efficient reading and research.

## Metadata

| Field | Value |
|-------|-------|
| Version | 1.0.0 |
| Author | Eric Andrade |
| Created | 2026-04-03 |
| Updated | 2026-04-03 |
| Platforms | All 8 |
| Category | Content |
| Tags | web, extraction, markdown, research, content, defuddle, url |
| Risk | Low |

## Overview

**webpage-reader** extracts the meaningful content from any web page URL, stripping navigation menus, advertisements, sidebars, cookie banners, and other non-content elements. It produces clean, readable Markdown output optimized for token efficiency.

This skill uses [Defuddle CLI](https://github.com/kepano/defuddle) for extraction and gracefully falls back to standard web fetching when Defuddle is unavailable. It is the recommended way to read individual web pages during research, note-taking, or documentation workflows.

## Features

- Clean Markdown extraction from any public HTTP/HTTPS URL
- Automatic removal of navigation, ads, sidebars, and boilerplate
- Token-efficient output compared to raw web fetching
- Save directly to a local file with the `-o` flag
- Metadata extraction: title, author, description, domain
- Graceful fallback to WebFetch when Defuddle is not installed
- Automatic Defuddle installation offer
- Smart URL routing — redirects `.md`, `.pdf`, `.docx` to the appropriate skills
- Batch processing for multiple URLs in a single request

## Quick Start

### Triggers

```bash
# Read a page
"Read this page: https://example.com/article"
"Fetch the content of https://docs.example.com"
"Extract this URL: https://blog.example.com/post"
"Get this page as Markdown: https://example.com"

# Save to file
"Extract this article and save it to notes/ref.md: https://example.com/article"
"Fetch and save this documentation page: https://docs.example.com"

# Metadata only
"What is the title of this page? https://example.com/post"
"Who is the author of https://example.com/article?"

# Batch / research
"Read these three pages and tell me what each covers: [URLs]"
"Fetch all these documentation URLs for my research: [URLs]"
"Extract content from these pages and save each one: [URLs]"
```

## Requirements

Defuddle CLI (the skill offers automatic installation on first use):

```bash
npm install -g defuddle
```

Requires Node.js 14+. The skill works without Defuddle via WebFetch fallback, but output quality and token efficiency are reduced.

## Examples

| Request | Action |
|---------|--------|
| `"Read https://docs.anthropic.com/..."` | Extracts documentation page as clean Markdown |
| `"Save this article to notes/ref.md: https://..."` | Extracts and saves to local file |
| `"Get the title of https://..."` | Returns only the page title from metadata |
| `"Fetch these 5 URLs for my research"` | Processes each URL sequentially with labeled output |
| `"Read https://example.com/post without the ads"` | Extracts body content only |
