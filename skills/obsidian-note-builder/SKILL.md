---
name: obsidian-note-builder
description: This skill should be used when the user wants to create a well-structured, richly linked Obsidian note from raw content, ideas, or instructions. Use when the user needs entity extraction, automatic wikilink insertion, Zettelkasten-style atomic note formatting, or building a note that integrates seamlessly into an existing vault's knowledge graph.
license: MIT
---

## Purpose

This skill builds complete, knowledge-graph-ready Obsidian notes. It does more than just format text — it analyzes content to extract entities (people, projects, concepts, tools), converts those entities to wikilinks, chooses the right note type (atomic concept, project note, meeting note, daily note, reference note), and structures the output so it integrates with an existing vault's linking and tagging conventions.

The result is a note that is immediately navigable in Obsidian, discoverable through search and Dataview, and connected to the knowledge graph via bidirectional links.

## When to Use

Invoke this skill when:

- The user provides raw notes, a transcript, or a brain dump and asks to "turn it into a proper Obsidian note"
- The user wants a new note created that will link to and be linked from existing notes
- The user asks to "extract entities" from a piece of text and auto-link them
- The user wants Zettelkasten-style atomic notes where each note expresses one idea
- The user provides a meeting summary and wants a structured meeting note
- The user wants a reference note for a book, article, or resource they consumed
- The user needs to import external content (web article, PDF excerpt, email) into their vault
- The user says "build a note", "create a note in Obsidian", or "add this to my vault"

Do NOT use this skill when:

- The user only wants to update or fix the frontmatter properties — use `obsidian-frontmatter` instead
- The user only wants to add wikilinks to an existing note — use `obsidian-links` instead
- The user wants to automate bulk note creation — use `obsidian-automation` instead
- The user explicitly says they want plain Markdown without Obsidian-specific features

## Note Types and Templates

### Atomic Concept Note (Zettelkasten)

An atomic note captures exactly one idea. It is self-contained, evergreen, and heavily linked:

```
---
title: <Concept Name>
date: YYYY-MM-DD
tags:
  - concept
  - <topic>
aliases:
  - <alternative name>
---

# <Concept Name>

<One to three paragraph clear definition of the concept.>

## Key Principles

- <Principle 1>
- <Principle 2>

## Related Concepts

- [[Related Concept A]] — brief relationship description
- [[Related Concept B]] — brief relationship description

## Sources

- [[Book or Article Title]] by Author Name
```

### Meeting Note

```
---
title: <Meeting Title — Date>
date: YYYY-MM-DD
tags:
  - meeting
attendees:
  - "[[Person One]]"
  - "[[Person Two]]"
project: "[[Project Name]]"
status: done
---

# <Meeting Title>

**Date:** [[YYYY-MM-DD]]  
**Attendees:** [[Person One]], [[Person Two]]

## Agenda

1. Topic One
2. Topic Two

## Notes

<Structured notes by agenda item>

## Decisions

- <Decision 1>

## Action Items

- [ ] <Task> — assigned to [[Person]]

## Next Meeting

[[Next Meeting Note]] scheduled for <date>
```

### Reference / Resource Note

```
---
title: <Resource Title>
date: YYYY-MM-DD
tags:
  - reference
  - <topic>
source: "<URL or citation>"
author: <Author Name>
read_date: YYYY-MM-DD
rating: <1-5>
---

# <Resource Title>

> <One-line summary of the resource's main argument or value>

## Key Takeaways

- <Takeaway 1>
- <Takeaway 2>

## Quotes

> "<Memorable quote>" — <Author>

## How It Connects

- Relevant to [[Project X]] because...
- Supports the ideas in [[Concept Y]]
```

### Project Note

```
---
title: <Project Name>
date: YYYY-MM-DD
status: active
priority: medium
tags:
  - project
stakeholders:
  - "[[Person]]"
due_date: YYYY-MM-DD
---

# <Project Name>

> <One-sentence project description>

## Goal

<What success looks like>

## Status

<Current state of the project>

## Key Decisions

- <Decision with [[Meeting Note]] link>

## Resources

- [[Related Document]]
- [[Team Member]]

## Next Actions

- [ ] <Task>
```

## Workflow

### Step 0: Discover Existing Vault Context

Before building the note, understand the vault:

1. Ask the user: "What is the vault root path?" (if not already known)
2. Scan for naming conventions — is the vault flat or folder-based?
3. Identify existing related notes that the new note should link to:
   ```bash
   find <vault-root> -name "*.md" | xargs grep -l "<key terms>" 2>/dev/null | head 10
   ```
4. Look for an existing tag taxonomy by scanning frontmatter in similar notes:
   ```bash
   grep -rh "^  - " <vault-root>/**/*.md | sort | uniq -c | sort -rn | head 20
   ```
5. If discovery is not possible (no vault path), proceed with generic conventions and note the assumptions made

### Step 1: Classify the Input

Read the user's input and determine:

- **Raw content or brain dump** → Extract, structure, atomize
- **Meeting transcript or summary** → Meeting note template
- **Book/article highlights** → Reference note template
- **Project description** → Project note template
- **Technical concept or idea** → Atomic concept note
- **Daily journal entry** → Daily note format

If ambiguous, ask: "What type of note should this be — a concept note, meeting note, reference note, or project note?"

### Step 2: Extract Entities

Scan the input text for entities that should become wikilinks:

**Entity categories to extract:**
- **People**: Full names, nicknames matching known vault notes
- **Projects**: Named initiatives, products, code names
- **Concepts**: Technical terms, frameworks, methodologies with their own notes
- **Places**: Locations significant to the vault's domain
- **Tools / Systems**: Software, hardware, platforms with their own notes
- **Documents**: Reports, articles, books referenced

**Entity extraction rules:**
- Only link entities that are likely to have (or should have) a corresponding note
- Generic words ("meeting", "project", "task") are not entities
- The same entity should only be linked on first mention per section
- If an entity does not have an existing note, mark it as a candidate for creation: `[[New Concept]] ⟵ create this note`

### Step 3: Structure the Note

Apply the appropriate template from the note types above. Then:

1. **Write a clear, specific title** — descriptive, unique, suitable as a filename
2. **Build the frontmatter block** — using the `obsidian-frontmatter` conventions (multiline lists, ISO dates, quoted wikilinks)
3. **Write the note body** — including all extracted entities as wikilinks
4. **Add a Related / See Also section** — link to conceptually adjacent notes
5. **Add a Sources section** if the note synthesizes external content

### Step 4: Apply Zettelkasten Atomicity (If Concept Note)

For atomic concept notes:

- Each note should express **one idea** clearly
- If the input covers multiple ideas, split into multiple notes and link them
- The opening paragraph must work as a standalone definition (no "as mentioned above")
- Prefer active, declarative sentences: "Atomic notes are single-idea notes" not "This is a note about..."
- The note should not repeat content that lives in another linked note — summarize and link instead

### Step 5: Output the Complete Note

Output the full Markdown content of the note including frontmatter. After the note, list:

1. **New notes to create** — entities referenced but not yet in the vault
2. **Existing notes to update** — notes that should now link back to this new note
3. **Tag corrections** — any tags that don't match the vault's detected taxonomy

## Entity Linking Rules

- Link on the first meaningful mention per section, not every occurrence
- Use display text when the linked note name differs from the natural phrasing:
  - `[[Product Discovery|discovery process]]`
  - `[[Alice Chen|Alice]]`
- Never link common words that happen to match a note name unless the semantic connection is intentional
- When the user mentions a concept that exists in the vault both as a tag and as a note, prefer the wikilink

## Critical Rules

**NEVER:**
- Create a note without a frontmatter block
- Link to a note that does not exist without flagging it as a "note to create"
- Duplicate content that already lives in another note — link instead
- Use heading levels inconsistently (always `#` for title, `##` for sections, `###` for subsections)
- Add external URLs as wikilinks — use standard Markdown link syntax for external URLs
- Output a partial note — always output the complete note

**ALWAYS:**
- Match the vault's existing tag naming convention when detectable
- Put the opening `---` on line 1 with no blank line before it
- Include at least one wikilink in every note (it should connect to the graph)
- Suggest follow-up notes to create when entities are referenced but not yet in the vault
- Use a title that works as an Obsidian filename (no `/`, `?`, `#`, `^`, `[`, `]`, `|` characters)
- End the note with a `## See Also` or `## Related` section

## Example Usage

**Example 1: Convert a brain dump into an atomic concept note**

User: "Turn this into a proper Obsidian note: 'Evergreen notes are notes designed to accumulate insight over time. Unlike fleeting notes, they are written to stand alone. Key principle from Andy Matuschak.'"

Output:
```markdown
---
title: Evergreen Notes
date: 2024-01-15
tags:
  - concept
  - note-taking
aliases:
  - Evergreen Note
---

# Evergreen Notes

Evergreen notes are permanent notes designed to accumulate insight over time. Unlike fleeting notes captured in the moment, evergreen notes are written with enough context to stand alone and remain useful long after the writing session.

## Key Principles

- Write for your future self, not just for now
- Each note captures one idea fully and clearly
- Notes are revised and updated as understanding deepens

## Origin

Coined by [[Andy Matuschak]] as part of his writing practice.

## Related Concepts

- [[Atomic Notes]] — evergreen notes are always atomic
- [[Fleeting Notes]] — the raw capture stage before evergreen refinement
- [[Zettelkasten]] — the system that popularized this practice

## See Also

- [[Note-Taking Workflow]]
```

---

**Example 2: Structure a meeting summary**

User: "Create a meeting note for today's Q2 Planning session. Alice Chen and Bob Martinez attended. We decided to push the launch date to March 15. Bob owns the announcement. Next meeting in two weeks."

Output: Complete meeting note with frontmatter, structured agenda/notes/decisions/actions, wikilinks for Alice Chen, Bob Martinez, and the action item, plus a flag to create `[[Q2 Planning — 2024-02-15]]` for the next meeting.

---

**Example 3: Build a reference note from book highlights**

User: "Create a reference note for the book 'Building a Second Brain' by Tiago Forte. Key ideas: CODE method (Capture, Organize, Distill, Express), progressive summarization, project vs area vs resource vs archive (PARA)."

Output: A reference note with frontmatter (title, author, tags), key takeaways as bullets, the CODE and PARA acronyms explained, and wikilinks to `[[Progressive Summarization]]`, `[[PARA Method]]`, etc. as candidates for future atomic notes.

---

**Example 4: Import web article content into vault**

User: "Add this article summary to my vault as a reference note: [article excerpt provided]"

1. Extract key information (author, source URL, publication date)
2. Identify main concepts discussed
3. Create reference note with source frontmatter
4. Extract entities for wikilinks
5. Output complete note + list of concept notes to create

---

**Example 5: Split a large note into atomic notes**

User: "This note has become too big. Split it into separate atomic notes, one per concept."

1. Read the note and identify concept boundaries
2. Write a separate atomic note for each concept
3. Replace the original note with a MOC that links to all child notes
4. Output all new notes + the updated parent note
