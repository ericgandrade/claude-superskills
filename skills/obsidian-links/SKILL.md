---
name: obsidian-links
description: This skill should be used when the user needs to create, validate, repair, or analyze wikilinks inside an Obsidian vault. Use when the user wants to add links between notes, find broken links, rename a linked note, discover orphaned notes, or build a bidirectional linking structure in Obsidian.
license: MIT
---

## Purpose

This skill manages wikilinks — the `[[double bracket]]` linking syntax that is the core navigation primitive in Obsidian. It covers creating new links, validating that target notes exist, repairing broken links after renames, discovering unlinked mentions, and building Dataview-compatible linking patterns.

Wikilinks are what make a vault a knowledge graph. This skill treats linking not as a formatting task but as an information architecture task: every link represents a relationship between ideas, and that relationship should be intentional, bidirectional where appropriate, and always resolvable to a real note.

## When to Use

Invoke this skill when:

- The user wants to add wikilinks to an existing note
- The user has renamed a note and needs to find all references to update
- The user asks to find broken links (links that point to notes that do not exist)
- The user wants to find all notes that link to a particular note (backlinks)
- The user asks to discover "orphaned notes" (notes with no incoming links)
- The user asks to convert plain text mentions of a note name into wikilinks
- The user wants to create a new note and automatically link it from another note
- The user asks to build a Map of Content (MOC) that aggregates links to related notes
- The user wants to understand the link structure of a vault or a section of it

Do NOT use this skill when:

- The user wants to format the frontmatter properties of a note — use `obsidian-frontmatter` instead
- The user wants to create a new note from scratch with full content — use `obsidian-note-builder` instead
- The user is linking to external URLs — those use standard Markdown `[text](url)` syntax, not wikilinks
- The user is working in a Markdown environment other than Obsidian

## Wikilink Syntax Reference

| Syntax | Result |
|--------|--------|
| `[[Note Name]]` | Link to a note. Displays the note name as text. |
| `[[Note Name\|Display Text]]` | Link to a note with custom display text. |
| `[[Note Name#Heading]]` | Link to a specific heading within a note. |
| `[[Note Name#^blockid]]` | Link to a specific block by its block ID. |
| `[[#Heading in current note]]` | Link to a heading in the current note. |
| `[[ ]]` with just a space | Creates an "empty" link — avoid this. |
| `![[Note Name]]` | Embed (transclude) the entire note inline. |
| `![[Note Name#Heading]]` | Embed only the section under that heading. |

**Block IDs:** A block ID is a unique identifier appended to any line or paragraph:
```
This is a paragraph I want to reference. ^my-block-id
```

Then link to it from another note: `[[My Note#^my-block-id]]`

Block IDs must be:
- Lowercase letters, numbers, and hyphens only
- Appended with a space and `^` before the ID
- Placed at the end of the line they identify

## Workflow

### Step 0: Discover the Vault Structure

Before adding or validating links, identify the vault's file layout:

1. Check if a vault root has been specified. If not, ask: "Which folder is your Obsidian vault root?"
2. List the top-level folders to understand the note organization (`ls -1 <vault-root>/`)
3. If the user mentions a specific note, confirm it exists: `find <vault-root> -name "*.md" | grep -i "<note-name>"`
4. Note whether the vault uses a flat structure or nested folders, as this affects link resolution

### Step 1: Identify the Task

Determine which link operation the user needs:

| User request | Task |
|-------------|------|
| "Add links to this note" | **Create links**: Insert wikilinks into specific text |
| "Fix broken links" | **Validate & repair**: Find links whose target does not exist |
| "Find orphans" | **Audit**: List notes with no incoming links |
| "Convert mentions to links" | **Autolink**: Replace plain-text note names with wikilinks |
| "Build a MOC" | **Aggregate**: Create or update a Map of Content note |
| "Link this to that" | **Connect**: Create a specific link between two named notes |

### Step 2: Create Links

When creating wikilinks in an existing note:

1. Read the target note to identify existing headings and blocks
2. Match user intent to the correct link form:
   - Link to the full note → `[[Note Name]]`
   - Link with custom text → `[[Note Name|Anchor Text]]`
   - Link to a specific section → `[[Note Name#Heading]]`
3. Insert the link at the appropriate position in the source note without altering surrounding text
4. If the target note does not exist and the user intends to create it, create the note first (minimal stub: title heading + empty body) then insert the link

**Text replacement rule:** When converting a plain-text mention to a wikilink, replace the entire phrase that matches the note name, not partial words. "Project Alpha" → `[[Project Alpha]]`, but "project alphanumeric" should NOT be auto-linked.

### Step 3: Validate Links

To check that all wikilinks in a note (or vault) resolve to existing files:

1. Extract all `[[...]]` patterns from the source file(s)
2. For each link, extract the note name (strip `#heading`, `|display text`, `!` prefix)
3. Search the vault for a matching `.md` file: `find <vault-root> -iname "<note-name>.md"`
4. Report broken links in a table:

| Source note | Broken link | Reason |
|------------|-------------|--------|
| `Weekly Review.md` | `[[Team Meeting Notes]]` | No matching file found |
| `Project Alpha.md` | `[[Budget 2023#^block1]]` | Note exists but block ID not found |

5. For each broken link, suggest the most likely fix based on approximate filename matching

### Step 4: Find Orphaned Notes

Orphaned notes are Markdown files that no other note links to. To find them:

```bash
# List all .md files in the vault
find <vault-root> -name "*.md" > /tmp/all_notes.txt

# Extract all wikilink targets from all notes
grep -roh "\[\[.*\]\]" <vault-root> | sed 's/\[\[//;s/\]\]//;s/|.*//' | sort -u > /tmp/all_linked.txt

# Notes not referenced anywhere
comm -23 <(sort /tmp/all_notes.txt | xargs -I{} basename {} .md) /tmp/all_linked.txt
```

Present orphans in a list and suggest:
- Adding links from a related note
- Adding the orphan to a MOC
- Deleting the note if it contains no useful content

### Step 5: Build a Map of Content (MOC)

A MOC is an index note that provides a navigable entry point to a topic cluster. To build or update a MOC:

1. Identify the topic's core note (often the same name as the folder or tag)
2. Find all notes related to the topic (by filename pattern, tag, or folder)
3. Group related notes into logical sections
4. Generate a MOC note with this structure:

```markdown
# <Topic> — Map of Content

## Foundational Concepts
- [[Note A]] — one-line description
- [[Note B]] — one-line description

## Reference Material
- [[Note C]]
- [[Note D]]

## Active Projects
- [[Project Note 1]]
- [[Project Note 2]]

## Related Topics
- [[Adjacent MOC 1]]
- [[Adjacent MOC 2]]
```

### Step 6: Implement Bidirectional Links

Obsidian tracks backlinks automatically — you do not need to manually add "see also: [[this note]]" in both directions. However, for important relationships, explicit bidirectional linking improves navigability:

1. Add the forward link in the source note: `[[Target]]`
2. If the relationship is significant, add a `## Related` section or update the frontmatter `aliases` in the target note to acknowledge the connection

For parent-child relationships (a concept note and its sub-notes), use embeds rather than links when you want the content of child notes to appear inline in the parent.

## Link Naming Conventions

- Use the exact filename (without `.md`) as the link target
- Note names are case-sensitive in Obsidian on some systems — use exact capitalization
- If the vault has notes with identical names in different folders, qualify the path: `[[folder/Note Name]]`
- Prefer human-readable note names over codes: `[[Q1 OKRs]]` is better than `[[OKR_2024_Q1_v3]]`
- Avoid special characters in note names that could break links: `/`, `?`, `#`, `^`, `[`, `]`, `|`, `\`

## Critical Rules

**NEVER:**
- Create a wikilink to a note that does not exist unless the user explicitly asks to create the note as well
- Auto-link every occurrence of a word — only link the first meaningful mention per section
- Change the link target to fix a display issue; change the display text `[[Target|Different Text]]` instead
- Use wikilinks for external URLs — those always use `[text](https://...)` syntax
- Embed images using wikilinks unless the image exists in the vault: `![[image.png]]` only if the file is there

**ALWAYS:**
- Verify the target note exists before inserting a wikilink (or note that it will be created)
- Preserve all existing content when inserting links — never delete paragraphs to make room
- Use the exact note name (case-sensitive) as the link target
- Suggest adding a backlink when creating a forward link if the relationship is bidirectional
- Report broken link counts at the end of a validation scan, not just the list

## Example Usage

**Example 1: Add wikilinks to a meeting note**

User: "I wrote meeting notes for the Q2 Planning session. Please add wikilinks to the people and projects mentioned."

Workflow:
1. Read the meeting note content
2. Identify proper nouns that match existing note names (team member names, project names)
3. Insert wikilinks for each, using display text where names are abbreviated

Output:
```markdown
Attendees: [[Alice Chen]], [[Bob Martinez]], [[Team Lead]], Sara (no note found — skipping)

Discussed: [[Project Alpha]] timeline slip, budget review for [[Initiative X]], and follow-up on [[Q1 Retrospective]].
```

---

**Example 2: Find broken links in a note**

User: "Check my Research hub note for broken links."

Output:
```
Scanning Research hub.md for broken links...

✅ [[Deep Work]] — found
✅ [[Atomic Habits]] — found
❌ [[Focus Techniques]] — no matching note in vault
❌ [[Reading List 2024#^morning-reads]] — note exists but block ID not found

2 broken links found.

Suggested fixes:
- [[Focus Techniques]] → Did you mean [[Focus and Productivity]]? (closest match found)
- Remove the ^morning-reads block reference or add the block ID to Reading List 2024.md
```

---

**Example 3: Create a link between two notes**

User: "Link the Product Strategy note to the OKR Tracker note."

1. Verify both notes exist
2. Add to Product Strategy.md: `See also: [[OKR Tracker]]`
3. Optionally add reverse link in OKR Tracker.md under a `## Related` section

---

**Example 4: Find orphaned notes**

User: "Which notes in my vault have no incoming links?"

Output:
```
Orphaned notes (not linked from anywhere):

- Ideas Dump.md
- Temp Notes.md
- API Reference v2.md
- Meeting 2024-09-14.md

Suggestions:
- Add [[API Reference v2]] to your Developer Resources MOC
- Archive or delete Temp Notes.md if no longer needed
```

---

**Example 5: Build a Map of Content**

User: "Create a MOC for all my notes about Product Management."

1. Search for notes tagged `#product` or in a `Product/` folder
2. Group by type (concepts, reference, meetings, projects)
3. Output a complete MOC note with all links organized into sections
