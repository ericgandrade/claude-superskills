# Token Economy + Parallelization — Skills Audit & Optimization Plan

> **For Claude:** Use `executing-plans` to implement this plan task-by-task.

**Goal:** (1) Reduce input token consumption across 46 SKILL.md files. (2) Add parallel sub-agent execution with named agents to 13 skills that currently run sequential workflows.

**Architecture:** Four-tier approach — (1) surgical cuts on monster skills with pseudocode dead weight, (2) targeted trim on large skills, (3) batch removal of zero-value boilerplate, (4) parallelization injection into 13 skills.

**Estimated total savings:** ~8,000–10,000 words removed (~15% reduction); 2x–10x execution speedup on 13 skills.

---

## PART A — TOKEN ECONOMY (Tasks 1–6)
*(original plan below — unchanged)*

**Constraint:** Do NOT touch workflow steps, Critical Rules, or examples that demonstrate non-obvious behavior (GROUP shapes, composite keys, YOLO mode, etc.).

---

## Waste Pattern Reference

| Pattern | Description | Impact |
|---------|-------------|--------|
| **A — Pseudocode dead weight** | JavaScript functions in code blocks that describe logic the AI should follow but doesn't execute. Readable prose would convey the same information in 10% of the tokens. | 🔴 CRITICAL |
| **B — Redundant full examples** | Multiple examples where each repeats the full output template. Only the first needs to be complete; subsequent examples can be abbreviated. | 🔴 HIGH |
| **C — Zero-value appendix sections** | "Performance Considerations", "Future Enhancements", "Related Skills", "Technical Implementation Notes" — informational for humans, zero decision value for the agent. | 🟡 MEDIUM |
| **D — Platform Support block** | 7-line platform list duplicated in 2 skills. The model already knows the platforms. | 🟢 LOW |
| **E — Identical PLATFORM_CONFIGS object** | `agent-skill-discovery` has a 35-line JS object with 5 nearly identical platform entries — pure bloat. | 🔴 HIGH |

---

## Task 1 — `agent-skill-orchestrator`: Replace pseudocode with prose logic

**File:** `skills/agent-skill-orchestrator/SKILL.md`
**Current:** 4,841 words | **Target:** ~2,600 words | **Reduction:** ~46%
**Waste patterns:** A (critical), B (high), C (medium)

**Read the file first**, then apply the following edits:

### Step 1.1 — Replace Step -1 pseudocode block (Pattern A)

**Current** (lines ~63–117): Two JavaScript functions `assessPromptQuality()` and decision block — ~60 lines of code + example YAML.

**Replace with:**
```
**Prompt Quality Check:** Before planning, assess if the user request is specific enough to yield accurate resource matching. If the request is fewer than 20 words, lacks a clear verb or goal, or contains only ambiguous references ("this", "it") without context, invoke `prompt-engineer` to refine it first. A refined request improves confidence scores by 20–30%. Otherwise proceed directly.
```
Keep the "Impact on Planning" bullet list (4 bullets, ~50 words). Remove the example YAML block — it adds nothing the prose doesn't cover.

### Step 1.2 — Replace Step 1 pseudocode blocks (Pattern A)

**Current** (lines ~221–298): Four JavaScript functions: `detectTaskType()`, `extractCapabilities()`, `detectIntegrations()`, `requirements` object — ~80 lines.

**Replace with:**
```
**Parse the request** to extract:
- **Task type** — development, content, integration, analysis, documentation, or planning (infer from verbs: build/create/implement → development; transcribe/summarize/convert → content; connect/sync/automate → integration; review/debug/diagnose → analysis)
- **Required capabilities** — code generation, web access, file processing, external integrations (Notion/Jira/GitHub/Slack)
- **Keywords** — nouns and technology names for matching against resource descriptions and triggers
- **Complexity** — simple (single tool), moderate (2–3 steps), complex (multi-phase with dependencies)
```

### Step 1.3 — Replace Step 2 scoring pseudocode (Pattern A)

**Current** (lines ~306–461): Five JavaScript functions: `scoreResource()`, `calculateTriggerMatch()`, `calculateSemanticSimilarity()`, `matchTools()`, and ranking/filtering block — ~160 lines.

**Replace with:**
```
**Score each discovered resource** against the parsed requirements using five dimensions:

| Dimension | Weight | How to score |
|-----------|--------|--------------|
| Trigger phrase match | 30% | Does any trigger phrase from the resource match the user's keywords? |
| Semantic similarity | 25% | Does the resource description align with the user's goal and domain? |
| Tool availability | 20% | Do the resource's tools cover the required capabilities? |
| Category relevance | 15% | Does the resource category match the detected task type? |
| MCP integration bonus | 10% | Is this an MCP tool and does the task require external integrations? |

Score = 0–100. Filter out resources scoring < 40. Group into high (≥80), medium (60–79), low (40–59) confidence tiers.
```

### Step 1.4 — Replace Step 3 pseudocode (Pattern A)

**Current** (lines ~471–638): Four JavaScript functions — `generatePrimaryStrategy()`, `inferAction()`, `generateAlternativeStrategy()`, `extractPrerequisites()`, `defineSuccessCriteria()` — ~170 lines.

**Replace with:**
```
**Build the primary strategy** by ordering high-confidence resources into a logical sequence:
1. Analysis/discovery resources first (if task type is analysis or requires understanding existing state)
2. Implementation resources in the middle
3. Validation/review resources last

**Build an alternative strategy** using medium-confidence resources not already in the primary plan — a simplified 2-step approach is sufficient.

**Extract prerequisites:** For each MCP resource in the plan, add a "MCP server X must be configured" prerequisite. For each plugin agent, add "plugin X must be installed."

**Define success criteria** based on task type: development → code compiles + tests pass; content → output format matches + complete; integration → external services respond + data syncs.
```

### Step 1.5 — Trim Examples 2, 3, 4 (Pattern B)

**Current:** 3 additional full examples (Example 2: Content Processing, Example 3: Web Research, Example 4: Vague Prompt) — each with 100+ lines of complete markdown output. ~350 lines total.

**Action:** Keep Example 1 (Feature Development) in full — it establishes the output format. For Examples 2, 3, 4:
- Keep the **User Request** and **Discovery Analysis** (top 15 lines each)
- Replace the rest with: `*(Full plan output follows same structure as Example 1 — resources scored, primary + alternative strategies, prerequisites, success criteria)*`

### Step 1.6 — Remove appendix sections (Pattern C)

**Remove entirely:**
- `## Technical Implementation Notes` (~60 lines of JS pseudocode for dependency management, scoring transparency, platform tool mapping)
- `## Performance Considerations` (~10 lines)
- `## Future Enhancements` (~12 lines)
- `## Related Skills` (~5 lines — covered by "Critical Dependency" note already in Step 0)
- `## References` (~7 lines — references/ directory may not exist on installed instances)

**Verification:** After edits, confirm the skill still contains: Step -1 through Step 6 workflow, all NEVER/ALWAYS rules, at least 1 complete example output.

---

## Task 2 — `agent-skill-discovery`: Remove pseudocode and trim examples

**File:** `skills/agent-skill-discovery/SKILL.md`
**Current:** 3,005 words | **Target:** ~1,500 words | **Reduction:** ~50%
**Waste patterns:** A (critical), B (high), C (medium), E (high)

### Step 2.1 — Replace PLATFORM_CONFIGS object (Pattern E)

**Current** (lines ~87–127): 35-line JavaScript object with 5 nearly identical platform entries — all have the same structure, only the key changes.

**Replace with:**
```
Platform config is uniform across all 5 platforms — `pluginsDir`, `skillsDir`, and `mcpConfig` paths follow the same structure relative to `BASE_DIR`. Use `BASE_DIR` resolved from Step 0 detection for all subsequent path construction.
```

### Step 2.2 — Remove Step 3 pseudocode (Pattern A)

**Current** (lines ~286–319): `discoverMCPTools()` function — ~35 lines.

**Replace with:**
```
Use ToolSearch with pattern `mcp__{server_name}__*` to list available tools for each configured MCP server. Build tool inventory from results.
```

### Step 2.3 — Remove Step 5 filter pseudocode (Pattern A)

**Current** (lines ~413–432): `searchResources()` function — ~20 lines.

**Replace with:**
```
Filter by keyword: search term against plugin/skill names, descriptions, trigger phrases, and MCP server/tool names. Match is case-insensitive substring.
```

### Step 2.4 — Trim Examples 2, 3, 4 (Pattern B)

**Current:** Examples 2 (Filtered by Type), 3 (Keyword Search), 4 (Empty Results) — ~120 lines of full output.

**Action:** Keep Example 1 (Full Inventory) in full. For Examples 2, 3, 4:
- Keep the **User Request** and first 10 lines of output
- Add: `*(Remaining output follows same format — only matching resource type shown)*`

### Step 2.5 — Remove appendix sections (Pattern C)

**Remove entirely:**
- `## Technical Implementation Notes` — contains `detectPlatform()`, `parseSkillFrontmatter()`, `discoverMCPTools()` functions (~60 lines), all redundant with Step 0 and Step 3 prose
- `## Performance Considerations` (~8 lines)
- `## Future Enhancements` (~10 lines)
- `## Related Skills` (~5 lines)
- `## Error Recovery` (~8 lines — already covered in each step's "Graceful Handling" notes)

### Step 2.6 — Remove Platform Support block (Pattern D)

**Current** (lines ~29–35): 7-line platform list.

**Replace with:** Remove the section entirely — the frontmatter description already states "Works across all AI CLI platforms" and the NEVER/ALWAYS rules enforce platform-agnostic behavior.

**Verification:** After edits, confirm: Step 0–6 workflow intact, all NEVER/ALWAYS rules intact, at least 1 complete example.

---

## Task 3 — `skill-creator`: Read and audit

**File:** `skills/skill-creator/SKILL.md`
**Current:** 4,586 words | **Target:** ~2,500 words | **Reduction:** ~45%

Read the full file first. Apply the same principles:
- Replace any JavaScript/Python pseudocode with prose description of the logic
- Remove any "Future Enhancements", "Performance Considerations", or "Related Skills" sections
- If there are multiple full examples, keep 1 complete and abbreviate the rest
- Keep all workflow steps, Critical Rules, and non-obvious behavioral guidance intact

---

## Task 4 — `abx-strategy`: Read and audit

**File:** `skills/abx-strategy/SKILL.md`
**Current:** 3,394 words | **Target:** ~2,000 words | **Reduction:** ~41%

Read the full file first. This is a strategy skill, so expect framework descriptions and matrices. Look for:
- Framework descriptions repeated in both prose AND table format (keep table, remove prose)
- Example outputs that are longer than needed to establish the pattern
- Section introductions that restate what the step header already says

---

## Task 5 — Batch: Remove zero-value appendix sections from 5 skills

**Files and sections to remove:**

| Skill | Sections to remove | Est. savings |
|-------|--------------------|-------------|
| `agent-skill-orchestrator` | See Task 1.6 | ~100 words |
| `agent-skill-discovery` | See Task 2.5 | ~90 words |
| `audio-transcriber` | `## Future Enhancements`, `## Related Skills` if present | ~50 words |
| `youtube-summarizer` | `## Future Enhancements`, `## Technical Notes` if present | ~50 words |
| `cloudconvert-converter` | Any `## Performance` or `## Future` sections | ~40 words |

**Rule:** Only remove if section contains zero workflow decision content — pure informational/aspirational text that the agent will never act on.

---

## Task 6 — Career skills cluster: Validate and batch trim if needed

**Files:** All 11 resume-*/career-* skills (~1,400–2,200 words each)

These skills share similar structure. Read a representative sample (resume-tailor, resume-bullet-writer, job-description-analyzer) and check for:
- Step introductions that restate the step header (remove the restatement)
- "Using This Skill" sections that are generic and don't add trigger precision
- Output format examples that are longer than needed

If the pattern is consistent across the cluster, apply the same trim to all 11.

---

---

## PART B — PARALLELIZATION (Tasks 7–19)

**Reference model:** `us-program-research` already parallelizes correctly — read its Step 2 and Step 3 as the template for all tasks below. The pattern is always: "Launch all agents in ONE message → wait for all to complete → merge results."

**Sub-agent naming convention:** Each named agent receives a role header at the top of its prompt: `# {AgentName} — {one-line role}`. For Claude Code, add `description="{AgentName}"` to the Agent tool call.

---

### Task 7 — `interview-prep-generator`: STAR story parallel generation

**File:** `skills/interview-prep-generator/SKILL.md`
**Speedup:** 7x–10x | **Priority:** 🔴 HIGHEST

Read the file. Find the Phase 2 (Story Banking) step where STAR stories are created bullet-by-bullet.

**Add before or inside Phase 2:**
```
### Parallel STAR Story Generation

Launch one **StoryBanker** agent per resume bullet simultaneously in a single block.
Each agent is independent — no story depends on another.

StoryBanker agent prompt header:
# StoryBanker — STAR Story Generator
Role: Transform a single resume bullet into a complete STAR story (Situation, Task, Action, Result).

After all StoryBanker agents complete, merge their outputs into the story bank.
```

**Also add for Phase 3 (Mock Prep):**
Launch the following in parallel after story bank is complete:

| Agent | Role |
|-------|------|
| `BehavioralPrep` | Generate behavioral question answers |
| `ProblemSolvingPrep` | Generate problem-solving question answers |
| `CollaborationPrep` | Generate collaboration question answers |
| `AchievementPrep` | Generate achievement question answers |
| `FailureGrowthPrep` | Generate failure/growth question answers |

---

### Task 8 — `deep-research`: Parallel search query execution

**File:** `skills/deep-research/SKILL.md`
**Speedup:** 4x–6x | **Priority:** 🔴 HIGH

Read the file. Find the phase where search queries are constructed (5–10 query variants).

**Add inside the search execution step:**
```
### Parallel Query Execution

Do NOT run searches sequentially. Launch one **ResearchScout** agent per query variant simultaneously.

ResearchScout agent prompt header:
# ResearchScout — Targeted Web Search Agent
Role: Execute a single search query, collect top results with URLs, and return structured findings.

Query variants to launch in parallel:
- ResearchScout-Broad: wide-scope 2–3 keyword query
- ResearchScout-Narrow: specific 5+ keyword query
- ResearchScout-Comparative: "X vs Y" or "comparison" framing
- ResearchScout-Opposing: contrarian/critical viewpoints
- ResearchScout-Primary: official docs, papers, government sources
- ResearchScout-Recent: date-filtered to last 12 months

Wait for all to complete, deduplicate by URL, then proceed to synthesis.
```

---

### Task 9 — `salary-negotiation-prep`: Parallel market data collection

**File:** `skills/salary-negotiation-prep/SKILL.md`
**Speedup:** 4x–7x | **Priority:** 🔴 HIGH

Read the file. Find the research phase where salary data sources are queried.

**Replace sequential source queries with:**
```
### Parallel Salary Research

Launch all salary data agents simultaneously in one block:

| Agent | Source | Focus |
|-------|--------|-------|
| `SalaryScout-Levels` | Levels.fyi | Tech/eng compensation |
| `SalaryScout-Glassdoor` | Glassdoor | General market range |
| `SalaryScout-LinkedIn` | LinkedIn Salary | Role + location data |
| `SalaryScout-Blind` | Blind (anonymous) | Company-specific data |
| `SalaryScout-PayScale` | PayScale | Years-of-experience curves |
| `SalaryScout-H1B` | H1B public data | Company salary floor |
| `CompCalculator` | — | Calculate equity + benefits total value |

Each SalaryScout prompt header:
# SalaryScout — Market Salary Research Agent
Role: Query {SOURCE} for salary data matching {ROLE} + {LOCATION} + {EXPERIENCE}. Return min/median/max range with source URL.

Wait for all to complete, then build composite range with confidence bands.
```

---

### Task 10 — `job-description-analyzer`: Parallel analysis dimensions

**File:** `skills/job-description-analyzer/SKILL.md`
**Speedup:** 3x–4x | **Priority:** 🟡 MEDIUM

Read the file. Find Steps 1–2 and 4–5 (requirements extraction, keyword extraction, gap analysis, red flag detection).

**Replace sequential steps with a single parallel launch:**
```
### Parallel JD Analysis

All four analyses process the same job description independently. Launch simultaneously:

| Agent | Role |
|-------|------|
| `RequirementExtractor` | Parse must-have, nice-to-have, soft skill requirements |
| `KeywordExtractor` | Extract hard skills, soft skills, domain terms for ATS matching |
| `GapAnalyzer` | Classify gaps vs candidate profile: critical / major / minor |
| `RedFlagDetector` | Identify warning signs: workload, culture, compensation signals |

Each agent prompt header: # {AgentName} — Job Description Analysis Agent

Wait for all to complete, then run Step 3 (match scoring) using merged outputs.
```

---

### Task 11 — `mckinsey-strategist`: Parallel framework application

**File:** `skills/mckinsey-strategist/SKILL.md`
**Speedup:** 3x–5x | **Priority:** 🟡 MEDIUM

Read the file. Find Phase 2 (Analysis) where the 5 mandatory frameworks are applied.

**Replace sequential framework application with:**
```
### Parallel Framework Analysis

All 5 frameworks process the same problem statement independently. Launch simultaneously:

| Agent | Framework | Output |
|-------|-----------|--------|
| `SWOTAnalyst` | SWOT (Strengths, Weaknesses, Opportunities, Threats) | 2×2 SWOT table |
| `VRIOAnalyst` | VRIO (Value, Rarity, Imitability, Organization) | VRIO table with strategic implications |
| `SevenSAnalyst` | McKinsey 7S (Strategy, Structure, Systems, Shared Values, Style, Staff, Skills) | 7S assessment table |
| `SecondOrderAnalyst` | Second-order thinking (1st/2nd/3rd consequences) | Consequence chain |
| `ImpactMatrixAnalyst` | Impact vs. Effort prioritization | Priority matrix |

Each agent prompt header: # {AgentName} — Strategic Framework Analyst

Wait for all to complete, then synthesize in Phase 3.
```

---

### Task 12 — `audio-transcriber`: Parallel extraction agents

**File:** `skills/audio-transcriber/SKILL.md`
**Speedup:** 3x | **Priority:** 🟡 MEDIUM

Read the file. Find the step where topics, action items, and decisions are extracted from the transcript.

**Replace sequential extraction with:**
```
### Parallel Content Extraction

After transcription completes, launch three extractors simultaneously:

| Agent | Role |
|-------|------|
| `TopicExtractor` | Cluster transcript segments by topic using keyword proximity and temporal grouping |
| `ActionExtractor` | Find action items (signals: "will", "should", "needs to", "by [date]", owner assignments) |
| `DecisionExtractor` | Find decisions (signals: "decided", "agreed", "we will", "the plan is") |

Each agent prompt header: # {AgentName} — Transcript Analysis Agent
Input: Full transcript text + speaker labels

Wait for all to complete, then merge into Markdown meeting minutes.

**For batch mode (multiple files):** Launch one full pipeline per file simultaneously. Merge all outputs after all files complete.
```

---

### Task 13 — `agent-skill-discovery`: Parallel directory scanning

**File:** `skills/agent-skill-discovery/SKILL.md`
**Speedup:** 2x–4x | **Priority:** 🟡 MEDIUM

Read the file. Find Steps 1–4 (scan plugins, scan skills, scan MCP, scan repository).

**Replace sequential steps with:**
```
### Parallel Resource Scanning

After platform detection (Step 0), launch all four scanners simultaneously:

| Agent | Role |
|-------|------|
| `PluginScanner` | Glob for plugin.json files, extract name/version/agents metadata |
| `SkillScanner` | Glob for SKILL.md files, parse YAML frontmatter, extract name/description/triggers |
| `McpScanner` | Read .mcp.json, run ToolSearch per server, build tool inventory |
| `RepoScanner` | Scan current working directory for local agents, skills, and MCP configs |

Each scanner prompt header: # {AgentName} — Resource Discovery Agent

Wait for all to complete, then apply filters (Step 5) and generate catalog (Step 6).
```

---

### Task 14 — `resume-tailor`: Parallel section tailoring

**File:** `skills/resume-tailor/SKILL.md`
**Speedup:** 3x–4x | **Priority:** 🟡 MEDIUM

Read the file. Find Step 3 where resume sections are tailored one by one.

**Add after job analysis completes:**
```
### Parallel Section Tailoring

All sections are independent — launch simultaneously:

| Agent | Role |
|-------|------|
| `SummaryTailor` | Rewrite professional summary to match job keywords and tone |
| `SkillsTailor` | Reorder skills by relevance, add missing keywords from JD |
| `ExperienceTailor` | Reorder jobs, swap/modify bullets to match JD priorities |
| `EducationTailor` | Highlight relevant coursework, certifications, and projects |

Each agent prompt header: # {AgentName} — Resume Section Specialist
Input: Original section text + job description + keyword priority list from analysis

Wait for all to complete, then assemble tailored resume in Step 4.
```

---

### Task 15 — `resume-ats-optimizer`: Parallel keyword analysis streams

**File:** `skills/resume-ats-optimizer/SKILL.md`
**Speedup:** 3x–5x | **Priority:** 🟡 MEDIUM

Read the file. Find Phase 2 where keyword analysis runs across skill categories.

**Replace sequential analysis with:**
```
### Parallel ATS Analysis

Launch all analyzers simultaneously:

| Agent | Role |
|-------|------|
| `HardSkillsAnalyzer` | Extract hard skills from JD, find matches in resume, calculate % match, flag gaps |
| `SoftSkillsAnalyzer` | Extract soft skills from JD, find matches in resume, suggest phrasing improvements |
| `IndustryAnalyzer` | Extract domain vocabulary from JD, check resume density, suggest insertions |
| `FormattingAuditor` | Check file format, fonts, header tags, spacing, tables for ATS parse compatibility |
| `KeywordDensityChecker` | Calculate keyword density per section, suggest optimal placement |

Each agent prompt header: # {AgentName} — ATS Optimization Agent

Wait for all to complete, then compute overall match score and build optimization plan.
```

---

### Task 16 — `offer-comparison-analyzer`: Parallel compensation calculation

**File:** `skills/offer-comparison-analyzer/SKILL.md`
**Speedup:** 4x–8x | **Priority:** 🟡 MEDIUM

Read the file. Find Phase 2 (total comp calculation) and Phase 3 (non-monetary scoring).

**Replace sequential calculation with:**
```
### Parallel Compensation Analysis (per offer)

For each offer, launch 8 analyzers simultaneously:

**Compensation agents:**
| Agent | Role |
|-------|------|
| `CashAnalyzer` | Sum base + bonus + signing bonus, annualize |
| `EquityAnalyzer` | Calculate RSU/option value with vesting schedule, annualize |
| `BenefitsAnalyzer` | Quantify 401k match, insurance value, HSA contribution |
| `PerksAnalyzer` | Quantify vacation days, remote savings, dev budget, commute cost |

**Scoring agents:**
| Agent | Role |
|-------|------|
| `GrowthScorer` | Score career growth: learning, brand value, promotion path |
| `WorkLifeScorer` | Score work-life balance: hours, flexibility, travel burden |
| `CultureScorer` | Score team/culture fit: manager quality, team dynamics, company values |
| `RiskScorer` | Score stability: funding runway, layoff history, severance terms |

Each agent prompt header: # {AgentName} — Offer Analysis Agent

If comparing N offers: launch all 8×N agents simultaneously across all offers.
Wait for all to complete, then build comparison table.
```

---

### Task 17 — `senior-solution-architect`: Parallel C4 diagram generation

**File:** `skills/senior-solution-architect/SKILL.md`
**Speedup:** 2x–3x | **Priority:** 🟢 LOW

Read the file. Find Phase 2 (C4 modeling) where diagrams are generated level by level.

**After discovery phase completes, add:**
```
### Parallel C4 Generation

Once discovery data is available, launch C4 levels simultaneously:

| Agent | Role |
|-------|------|
| `C4-Context` | Generate Level 1 Context diagram (system boundaries, external actors) in Mermaid |
| `C4-Container` | Generate Level 2 Container diagram (applications, databases, services) in Mermaid |
| `C4-Component` | Generate Level 3 Component diagram (internal modules, APIs) in Mermaid |
| `AdrGenerator` | Draft Architecture Decision Records for key design choices |

Each agent prompt header: # {AgentName} — Architecture Diagram Agent
Input: Full discovery output (existing components, dependencies, team structure)

Wait for all to complete, then assemble into the architecture document.
```

---

### Task 18 — `cloudconvert-converter`: Batch parallel file conversion

**File:** `skills/cloudconvert-converter/SKILL.md`
**Speedup:** 5x–10x | **Priority:** 🟢 LOW

Read the file. Find the standard workflow section. Add a batch processing pattern:

```
### Batch Mode — Parallel File Conversion

When user provides multiple files (glob pattern or list), launch one **FileConverter** agent per file simultaneously.

FileConverter agent prompt header:
# FileConverter — CloudConvert File Conversion Agent
Role: Convert a single file using the CloudConvert API. Upload, wait for job completion, download result.

Launch all FileConverter agents in one block. Wait for all to complete, then report results table:
| File | Status | Output | Duration |
|------|--------|--------|----------|

Note: CloudConvert free tier has rate limits. If >10 files, batch in groups of 5 with a pause between groups.
```

---

### Task 19 — `docling-converter`: Batch parallel document processing

**File:** `skills/docling-converter/SKILL.md`
**Speedup:** 6x–10x | **Priority:** 🟢 LOW

Read the file. Find the conversion step. Add batch pattern:

```
### Batch Mode — Parallel Document Conversion

When user provides a directory or multiple files, launch one **DoclingConverter** agent per file simultaneously.

DoclingConverter agent prompt header:
# DoclingConverter — Document Processing Agent
Role: Convert a single document to Markdown using Docling. Run the conversion script, validate output, report status.

Launch all DoclingConverter agents in one block. Wait for all to complete, then merge all Markdown outputs and report summary.
```

---

## Validation Checklist (run after each task)

For each modified SKILL.md:
- [ ] All numbered workflow steps present and complete
- [ ] Critical Rules / NEVER / ALWAYS section intact
- [ ] At least 1 complete example (full input + full output)
- [ ] No frontmatter changes (name, description, license only)
- [ ] For parallelization tasks: agents launched in ONE message block (not sequentially)
- [ ] For parallelization tasks: named agents have `# AgentName — Role` header in their prompt
- [ ] For parallelization tasks: merge/deduplication step defined after parallel block

## Version & Release

After all tasks complete:
1. Run `node scripts/release.js minor` from repo root (significant feature additions)
2. Update CHANGELOG with entries for token economy pass + parallelization across 13 skills
3. Update README with note about parallel execution
4. Commit, tag, push

---

*Plan created: 2026-03-19 | Author: Claude Sonnet 4.6*
