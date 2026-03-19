---
name: youtube-summarizer
description: This skill should be used when the user needs to extract transcripts from YouTube videos and generate comprehensive, detailed summaries using intelligent analysis frameworks.
license: MIT
---

# youtube-summarizer

## Purpose

This skill extracts transcripts from YouTube videos and generates comprehensive, verbose summaries using the STAR + R-I-S-E framework. It validates video availability, extracts transcripts using the `youtube-transcript-api` Python library, and produces detailed documentation capturing all insights, arguments, and key points.

The skill is designed for users who need thorough content analysis and reference documentation from educational videos, lectures, tutorials, or informational content.

## When to Use This Skill

This skill should be used when:

- User provides a YouTube video URL and wants a detailed summary
- User needs to document video content for reference without rewatching
- User wants to extract insights, key points, and arguments from educational content
- User needs transcripts from YouTube videos for analysis
- User asks to "summarize", "resume", or "extract content" from YouTube videos
- User wants comprehensive documentation prioritizing completeness over brevity

## Step 0: Environment Detection & Setup

Before processing, detect the execution environment to choose the correct transcript extraction strategy.

### Environment Detection

```bash
# Test 1: Can we run local Python?
python3 --version 2>/dev/null
PYTHON_AVAILABLE=$?

# Test 2: Is youtube-transcript-api installed?
python3 -c "import youtube_transcript_api" 2>/dev/null
LIB_AVAILABLE=$?
```

Three modes are supported, tried in order:

| Mode | Condition | Strategy |
|------|-----------|----------|
| **A — Python/CLI** | Python 3 available + library installed | `youtube-transcript-api` (full featured) |
| **B — WebFetch** | No Python OR sandboxed environment | Fetch YouTube page → extract transcript from embedded JSON |
| **C — Manual** | YouTube blocked at network level | Ask user to paste transcript text directly |

### Mode A Setup (Python available, library missing)

If Python is available but `youtube-transcript-api` is not installed, offer to install:

```
youtube-transcript-api is required but not installed.

Would you like to install it now?
- [ ] Yes - Install with pip (pip install youtube-transcript-api)
- [ ] No - I'll install it manually
```

```bash
pip install youtube-transcript-api
```

### Mode B Setup (Sandboxed / Claude Cowork / no Python)

Use WebFetch to extract the transcript embedded in the YouTube page HTML. YouTube embeds full caption track URLs in `ytInitialPlayerResponse` JSON inside the page source.

Steps:
1. WebFetch `https://www.youtube.com/watch?v=VIDEO_ID`
2. Extract `ytInitialPlayerResponse` JSON block from the HTML using regex
3. Parse `captions.playerCaptionsTracklistRenderer.captionTracks[0].baseUrl`
4. WebFetch that URL to retrieve the transcript XML
5. Parse XML `<text>` elements into plain text

If the YouTube page itself is blocked (proxy/sandbox restriction), fall through to Mode C.

### Mode C Setup (Network blocked)

Inform the user clearly:

```
⚠️  YouTube is not accessible in this environment.

Options:
1. Run this skill in Claude Code (CLI) — it has full network access and can install Python libraries.
2. Paste the video transcript text directly into this chat — the skill will summarize whatever text you provide.
3. Copy the transcript from youtube.com/watch?v=VIDEO_ID → click "..." → "Show transcript" → paste here.
```

## Main Workflow

### Progress Tracking Guidelines

Throughout the workflow, display a visual progress gauge before each step to keep the user informed. The gauge format is:

```bash
echo "[████░░░░░░░░░░░░░░░░] 20% - Step 1/5: Validating URL"
```

**Format specifications:**
- 20 characters wide (use █ for filled, ░ for empty)
- Percentage increments: Step 1=20%, Step 2=40%, Step 3=60%, Step 4=80%, Step 5=100%
- Step counter showing current/total (e.g., "Step 3/5")
- Brief description of current phase

**Display the initial status box before Step 1:**

```
╔══════════════════════════════════════════════════════════════╗
║     📹  YOUTUBE SUMMARIZER - Processing Video                ║
╠══════════════════════════════════════════════════════════════╣
║ → Step 1: Validating URL                 [IN PROGRESS]       ║
║ ○ Step 2: Checking Availability                              ║
║ ○ Step 3: Extracting Transcript                              ║
║ ○ Step 4: Generating Summary                                 ║
║ ○ Step 5: Formatting Output                                  ║
╠══════════════════════════════════════════════════════════════╣
║ Progress: ██████░░░░░░░░░░░░░░░░░░░░░░░░  20%               ║
╚══════════════════════════════════════════════════════════════╝
```

### Step 1: Validate YouTube URL

**Objective:** Extract video ID and validate URL format.

**Supported URL Formats:**
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://m.youtube.com/watch?v=VIDEO_ID`

**Actions:**

```bash
# Extract video ID using regex or URL parsing
URL="$USER_PROVIDED_URL"

# Pattern 1: youtube.com/watch?v=VIDEO_ID
if echo "$URL" | grep -qE 'youtube\.com/watch\?v='; then
    VIDEO_ID=$(echo "$URL" | sed -E 's/.*[?&]v=([^&]+).*/\1/')
# Pattern 2: youtu.be/VIDEO_ID  
elif echo "$URL" | grep -qE 'youtu\.be/'; then
    VIDEO_ID=$(echo "$URL" | sed -E 's/.*youtu\.be\/([^?]+).*/\1/')
else
    echo "❌ Invalid YouTube URL format"
    exit 1
fi

echo "📹 Video ID extracted: $VIDEO_ID"
```

**If URL is invalid:**

```
❌ Invalid YouTube URL

Please provide a valid YouTube URL in one of these formats:
- https://www.youtube.com/watch?v=VIDEO_ID
- https://youtu.be/VIDEO_ID

Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

### Step 2: Check Video & Transcript Availability

**Progress:**
```bash
echo "[████████░░░░░░░░░░░░] 40% - Step 2/5: Checking Availability"
```

**Objective:** Verify video exists and transcript is accessible using the detected mode.

**Mode A (Python):**

```python
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled, NoTranscriptFound
import sys

video_id = sys.argv[1]

try:
    transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
    print(f"✅ Video accessible: {video_id}")
    for transcript in transcript_list:
        lang_type = "[Auto-generated]" if transcript.is_generated else "[Manual]"
        print(f"  - {transcript.language} ({transcript.language_code}) {lang_type}")

except TranscriptsDisabled:
    print(f"❌ Transcripts are disabled for video {video_id}")
    sys.exit(1)
except NoTranscriptFound:
    print(f"❌ No transcript found for video {video_id}")
    sys.exit(1)
except Exception as e:
    print(f"❌ Error accessing video: {e}")
    sys.exit(1)
```

**Mode B (WebFetch):**

Use WebFetch to load `https://www.youtube.com/watch?v=VIDEO_ID`. Search the HTML for the string `"captionTracks"` to confirm captions are available. If the page is inaccessible or no `captionTracks` key is found, fall through to Mode C.

**Error Handling:**

| Error | Message | Action |
|-------|---------|--------|
| Video not found | "❌ Video does not exist or is private" | Ask user to verify URL |
| Transcripts disabled | "❌ Transcripts are disabled for this video" | Cannot proceed |
| No transcript available | "❌ No transcript found" | Cannot proceed |
| YouTube blocked (sandbox) | "⚠️ YouTube is not accessible in this environment" | Switch to Mode C |

### Step 3: Extract Transcript

**Progress:**
```bash
echo "[████████████░░░░░░░░] 60% - Step 3/5: Extracting Transcript"
```

**Objective:** Retrieve transcript text using the active mode.

**Mode A (Python):**

```python
from youtube_transcript_api import YouTubeTranscriptApi

video_id = "VIDEO_ID"

try:
    transcript = YouTubeTranscriptApi.get_transcript(
        video_id,
        languages=['pt', 'en']  # Prefer Portuguese, fallback to English
    )
    full_text = " ".join([entry['text'] for entry in transcript])
    print("✅ Transcript extracted successfully")
    print(f"📊 Transcript length: {len(full_text)} characters")
    with open(f"/tmp/transcript_{video_id}.txt", "w") as f:
        f.write(full_text)
except Exception as e:
    print(f"❌ Error extracting transcript: {e}")
    exit(1)
```

**Mode B (WebFetch):**

1. WebFetch the YouTube video page: `https://www.youtube.com/watch?v=VIDEO_ID`
2. Locate the `ytInitialPlayerResponse` JSON block in the HTML
3. Extract `captions.playerCaptionsTracklistRenderer.captionTracks[0].baseUrl`
4. WebFetch that caption URL (returns XML with `<text>` elements)
5. Strip XML tags and join `<text>` segments into plain text

If the page load fails or no caption track URL is found, switch to Mode C.

**Mode C (Manual):**

Ask the user to provide the transcript:

```
⚠️  YouTube is not accessible in this environment (proxy/sandbox restriction).

To proceed, paste the video transcript text directly into this chat.
To get it: go to youtube.com/watch?v=VIDEO_ID → click "..." below the video → "Show transcript" → copy all text.

Alternatively, run this skill in Claude Code (CLI) for automatic extraction.
```

Accept any plain text the user pastes and proceed directly to Step 4.

**Transcript Processing (all modes):**

- Combine all segments into coherent text
- Preserve punctuation and formatting where available
- Remove `[Music]`, `[Applause]` and other auto-generated noise markers

### Step 4: Generate Comprehensive Summary

**Progress:**
```bash
echo "[████████████████░░░░] 80% - Step 4/5: Generating Summary"
```

**Objective:** Apply enhanced STAR + R-I-S-E prompt to create detailed summary.

**Prompt Applied:**

Use the enhanced prompt from Phase 2 (STAR + R-I-S-E framework) with the extracted transcript as input.

**Actions:**

1. Load the full transcript text
2. Apply the comprehensive summarization prompt
3. Use AI model (Claude/GPT) to generate structured summary
4. Ensure output follows the defined structure:
   - Header with video metadata
   - Executive synthesis
   - Detailed section-by-section breakdown
   - Key insights and conclusions
   - Concepts and terminology
   - Resources and references

**Implementation:**

```bash
# Use the transcript file as input to the AI prompt
TRANSCRIPT_FILE="/tmp/transcript_${VIDEO_ID}.txt"

# The AI agent will:
# 1. Read the transcript
# 2. Apply the STAR + R-I-S-E summarization framework
# 3. Generate comprehensive Markdown output
# 4. Structure with headers, lists, and highlights

Read "$TRANSCRIPT_FILE"  # Read transcript into context
```

Then apply the full summarization prompt (from enhanced version in Phase 2).

### Step 5: Format and Present Output

**Progress:**
```bash
echo "[████████████████████] 100% - Step 5/5: Formatting Output"
```

**Objective:** Deliver the summary in clean, well-structured Markdown.

**Output Structure:**

```markdown
# [Video Title]

**Canal:** [Channel Name]  
**Duração:** [Duration]  
**URL:** [https://youtube.com/watch?v=VIDEO_ID]  
**Data de Publicação:** [Date if available]


## 📝 Detailed Summary

### [Topic 1]

[Comprehensive explanation with examples, data, quotes...]

#### [Subtopic 1.1]

[Detailed breakdown...]

### [Topic 2]

[Continued detailed analysis...]


## 📚 Concepts and Terminology

- **[Term 1]:** [Definition and context]
- **[Term 2]:** [Definition and context]


## 📌 Conclusion

[Final synthesis and takeaways]


*(Output follows same structure as Example 1.)*

## 📊 Executive Summary

This video provides a comprehensive introduction to the fundamental concepts of Artificial Intelligence (AI), designed for beginners and professionals who want to understand the technical foundations and practical applications of modern AI. The instructor covers everything from basic definitions to machine learning algorithms, using practical examples and visualizations to facilitate understanding.

[... continued detailed summary ...]
```

**Save Options:**

```
What would you like to save?
→ Summary + raw transcript

✅ File saved: resumo-exemplo123-2026-02-01.md (includes raw transcript)
[████████████████████] 100% - ✓ Processing complete!
```


Welcome to this comprehensive tutorial on machine learning fundamentals. In today's video, we'll explore the core concepts that power modern AI systems...
```


## Error Handling

| Error | Likely Cause | Action |
|-------|-------------|--------|
| Invalid YouTube URL format | URL is not a recognized youtube.com or youtu.be pattern | Show valid URL formats, ask user to provide correct URL |
| Video not found or private | Video was removed, made private, or URL is wrong | Inform user, ask for a public video URL |
| Transcripts disabled | Creator disabled transcripts on this video | Inform user transcripts are unavailable; suggest manual transcription |
| No transcript found | Video has no auto-generated or manual transcript | Inform user; suggest trying a different video or using audio-transcriber |
| `youtube-transcript-api` not installed | Python dependency missing | Offer to install with `pip install youtube-transcript-api` |
| YouTube blocked — proxy/sandbox error | Running in Claude Cowork or other sandboxed environment | Switch to Mode B (WebFetch); if also blocked, switch to Mode C (manual paste) |
| Network error / timeout | Internet connectivity issue or YouTube rate-limiting | Retry once; if it persists, inform user and ask to try again later |
| Transcript in unexpected language | Video is in a language not supported by the analyzer | Report detected language; proceed with available transcript |

**Version:** 1.2.0
**Last Updated:** 2026-02-02
**Maintained By:** Eric Andrade
