---
name: deep-research
description: This skill should be used when the user needs deep, multi-step web research with source synthesis, citations, skeptical evidence evaluation, confidence/gap analysis, and optional dense/frontier research using parallel agents. Not for researching how code in the current repository works (use codebase-modernization), deciding a system architecture (use senior-solution-architect), ranking US academic programs (use us-program-research), or reading one given URL (use webpage-reader).
license: MIT
---

# Deep Research

## Purpose

Run structured, multi-step web research with evidence-first synthesis, source traceability, skeptical evaluation, and explicit confidence/gap analysis.

This skill works in native mode with built-in web research tools and does not require Google/Gemini, OpenAI, Anthropic, OpenRouter, or any other paid provider setup. When the user explicitly wants maximum depth, use dense/frontier mode to recommend the strongest available model and run a wider parallel research topology where the host platform supports subagents.

## When to Use This Skill

Use this skill when:
- Performing market analysis
- Conducting competitive landscaping
- Building literature or source reviews
- Doing technical due diligence
- Preparing decision memos with citations
- Producing dense, high-confidence, Perplexity-like research with adversarial critique

## Requirements

- Access to built-in web research tools (`WebSearch`, `WebFetch`)
- Clear research question and scope

No external API key is required for native mode.

## Progress Tracking

Display a progress gauge at each research phase:

```
[████░░░░░░░░░░░░░░░░] 20% — Phase 1/5: Objective, Scope & Decomposition
[████████░░░░░░░░░░░░] 40% — Phase 2/5: Parallel Source Collection
[████████████░░░░░░░░] 60% — Phase 3/5: Evidence Ledger & Triangulation
[████████████████░░░░] 80% — Phase 4/5: Synthesis & Confidence/Gaps
[████████████████████] 100% — Phase 5/5: Citation Audit & Final Review
```

## Operating Modes

### Native Research

Use native mode by default.

- Use built-in `WebSearch` and `WebFetch`.
- Decompose complex topics into 3-5 sub-questions.
- Run parallel `ResearchScout` agents where subagents are available.
- Produce an evidence ledger, citations, and `Confidence & Gaps`.

### Dense / Frontier Research

Use dense/frontier mode when the user asks for maximum depth, exhaustive research, "frontier model", "Perplexity-like" research, "turbinado", adversarial review, high-confidence evidence, or says cost is secondary to research quality.

- Recommend the strongest available model or model class before execution.
- Prefer the host platform's frontier model for synthesis and critique.
- Run a wider parallel topology for sub-questions, primary-source harvesting, contrarian evidence, recency checks, citation audit, and synthesis.
- Add critique and rebuttal rounds before final synthesis.
- Increase source quota and require deeper source extraction.
- Include a model/tooling note in the final report.

If dense/frontier mode is requested but frontier tooling is unavailable, continue with native mode and disclose the limitation.

## Frontier Model Recommendation

For dense/frontier research, recommend the strongest available model before execution:

- Use an Opus-class Claude model for high-stakes synthesis, adversarial judgment, and nuanced source conflict analysis when available.
- Use a GPT frontier reasoning/chat model for broad synthesis, structured reasoning, and tool-heavy research when available.
- Use a Codex-class model for code-heavy technical research, API analysis, repository analysis, and engineering claims.
- Use a Gemini Pro-class thinking model for long-context, multimodal, PDF-heavy, and Google-grounded research when available.
- Use OpenRouter when the user wants access to multiple frontier model families through one API or wants a latest-family alias.

State the recommendation in this form:

```
Recommended research model: <model or model class>.
Reason: <why this model fits the research task>.
Fallback: <native mode or next best model>.
```

Do not hard-code one model as universally best. Use the strongest available model/tooling path and disclose limitations.

## Research Modes

Before starting, present the user with three modes:

```
Which research mode do you want?

  [1] Standard    — 12–15 sources · 1.500–3.000 words · findings by sub-question · single Confidence & Gaps block
  [2] Verbose     — 20–30 sources · 4.000–6.000 words · per-source deep-dives · per-sub-question confidence · Devil's Advocate section · Appendices
  [3] Exhaustive  — 40–60+ sources · 8.000+ words · full dense/frontier agent topology · block quotes allowed · stakeholder map · chronology · multiple critique rounds
```

If the user does not specify, default to **Standard**.

| Parameter | Standard | Verbose | Exhaustive |
|-----------|----------|---------|------------|
| Minimum sources | 12–15 | 20–30 | 40–60+ |
| Word target | 1.500–3.000 | 4.000–6.000 | 8.000+ |
| Per-source deep-dive | No | Yes (material sources) | Yes (all major sources) |
| Per-sub-question confidence | No | Yes | Yes |
| Block quotes | Short only | Allowed when exact wording matters | Allowed |
| Devil's Advocate / Steelman | No | Yes | Yes |
| Background / Context section | Brief | Full (2–4 paragraphs) | Full + chronology |
| Stakeholder / Actor map | No | When applicable | Always |
| Methodology section | No | Yes | Yes |
| Appendices (query log, rejected sources, paywalls) | No | Yes | Yes |
| Executive Summary | No | Yes (200–300 words at top) | Yes (300–500 words at top) |
| Agent topology | Native | Native + ContrarianScout | Full dense/frontier topology |
| Critique rounds | 1 | 1–2 | 2–3 adversarial rounds |

## Research Protocol

0. Present mode options and confirm with the user before proceeding.

0.5. Create and present a Research Plan

Before launching any agents, produce a structured research plan and show it to the user. Proceed unless they want changes.

```markdown
## Research Plan: [Topic]

**Core Question:** [one sentence — what exactly needs answering]
**Decision Context:** [how results will be used: strategy, due diligence, comparison, etc.]
**Scope:** [geography, time horizon, industry, technology boundaries]

### Research Dimensions
1. [Dimension] — [what to find and why it matters]
2. [Dimension] — [what to find and why it matters]
3. [Dimension] — [what to find and why it matters]
...

### Source Strategy
- Primary: [official docs, filings, government data, company pages]
- Secondary: [analyst reports, established media, expert orgs]
- Validation: [how conflicting claims will be resolved]

### Known Unknowns
- [What we know we don't know yet — data that may be hard to find]
```

Show the plan and wait for user confirmation before proceeding.

1. Define objective, scope, and decomposition
- Restate the original research question in one sentence.
- Identify audience, decision context, time horizon, geography/market scope, and requested output format.
- Decompose the topic into 3-5 concrete sub-questions.
- Each sub-question must cover a distinct dimension of the original question.
- Together, the sub-questions should be sufficient to answer the main question.
- If the topic is too broad to decompose cleanly, narrow the scope before searching.

Example decomposition:
- Market landscape: who are the major players?
- Evidence base: what reliable data exists?
- Differentiation: what capabilities or positions differ?
- Risks: what claims are uncertain, contested, or under-sourced?
- Decision implication: what should the target audience do with this evidence?

2. Build search strategy by sub-question
- Create targeted query variants for each sub-question.
- Include broad, narrow, comparative, opposing, primary-source, and recent-source queries when relevant.
- Prefer sources in this order:
  1. Primary sources: official docs, filings, regulatory pages, standards bodies, government data, company pages
  2. Scholarly sources: peer-reviewed papers, preprints with clear methodology, university research
  3. Reputable secondary sources: analyst reports, established media, expert organizations
  4. Supporting context only: blogs, newsletters, aggregators, marketing pages, review sites
- Use low-authority sources only when they provide unique firsthand evidence or market/customer sentiment.

Reject or down-rank sources that:
- Do not identify publisher, author, or date when those details matter
- Make numerical claims without methodology
- Repeat another source without adding primary evidence
- Are mostly promotional unless the research question is about vendor positioning
- Conflict with stronger primary evidence

### Agent Status Notifications

For every agent, emit three status lines in this exact format:

```
⟳  <Agent Name> — <what it is doing>
✅  <Agent Name> — Done · <N> sources collected · <key finding in one sentence>
```

Example:
```
⟳  🔍 Scout Alpha — Scanning primary sources for sub-question 1...
✅  🔍 Scout Alpha — Done · 8 sources collected · Three vendors dominate with >60% market share combined.

⟳  ⚔️ Devil's Advocate — Searching for contradictions and critical evidence...
✅  ⚔️ Devil's Advocate — Done · 4 sources collected · Two analyst reports dispute the market share figures.
```

Emit the `⟳` line immediately before launching each agent. Emit the `✅` line immediately after the agent returns results.

### Parallel Query Execution

Do NOT run searches sequentially. Launch one agent per sub-question or major query type simultaneously in a single block where the host platform supports subagents.

| Agent | Role | Assignment |
|-------|------|------------|
| 🔍 Scout Alpha | Primary researcher | Sub-question 1 with primary-source preference |
| 🔍 Scout Beta | Primary researcher | Sub-question 2 with primary-source preference |
| 🔍 Scout Gamma | Primary researcher | Sub-question 3 with primary-source preference |
| ⚔️ Devil's Advocate | Contrarian researcher | Find credible conflicting or critical evidence |
| 📡 Trend Watcher | Recency researcher | Date-filtered search for recent developments when time-sensitive |

Each agent prompt begins with:
```
# <Agent Name> — Deep Research Agent
Role: Execute assigned web research using WebSearch/WebFetch. Collect authoritative sources, extract claim-level evidence, identify contradictions, and return structured results.

Required output:
- Sub-question or query assignment
- Queries attempted
- Source inventory with URL, title, publisher, date, and relevance
- Key claims and data points with source attribution
- Quote directly when the exact wording is material — definitions, methodologies, thresholds, or claims where paraphrasing would change the meaning. Avoid decorative quotes that add length without adding precision. (block quotes allowed in Verbose/Exhaustive mode)
- Evidence quality notes
- Conflicts, gaps, and inaccessible/paywalled sources
```

Wait for all agents to complete. Emit a summary banner before deduplication:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  All agents finished · Deduplicating results...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Then deduplicate results by canonical URL and run a Gap Analysis before proceeding to the evidence ledger.

### Gap Analysis & Iteration Check

After each agent batch, reason explicitly about findings vs needs before moving to synthesis:

```markdown
### Gap Analysis — Iteration [N]

**Coverage so far:** [summary of dimensions addressed and confidence level per dimension]

**Gaps identified:**
- [ ] [Missing data point] — needed because [reason]
- [ ] [Conflicting claims unresolved] — need [source type] to adjudicate
- [ ] [Shallow coverage] — [dimension] needs deeper investigation

**Decision:** [Stop — all dimensions sufficient] / [Continue — targeted follow-up on gaps above]
```

#### Stop Criteria

Stop iterating when **any** of these conditions are met:

1. **Sufficient coverage** — all research dimensions have confirmed or contested (not weak) evidence
2. **Diminishing returns** — last iteration added less than 10% new distinct information
3. **Maximum iterations reached** — Standard: 1 follow-up, Verbose: 2, Exhaustive: 3
4. **Source saturation** — same sources appearing repeatedly across independent searches
5. **Time budget exceeded** — stop and synthesize with what's available, note gaps explicitly

If continuing, launch a targeted follow-up agent batch scoped only to the identified gaps. Emit status notifications for each follow-up agent using the same format.

### Dense / Frontier Agent Topology

When the user requests maximum-depth research, run a wider parallel topology where the host platform supports subagents:

| Agent | Role | Purpose |
|-------|------|---------|
| 🧭 Research Lead | Coordinator | Normalize scope, define sub-questions, assign agents, and maintain evidence standards |
| 🔍 Scout Alpha–Epsilon | Primary researchers | Research one sub-question each with source traceability |
| 🏛️ Source Hunter | Primary-source specialist | Find official docs, filings, papers, regulatory pages, datasets, and primary evidence |
| ⚔️ Devil's Advocate | Contrarian researcher | Find credible disagreement, failures, criticism, and negative evidence |
| 📡 Trend Watcher | Recency researcher | Search for recent developments and date-sensitive updates |
| 🔬 Citation Auditor | Fact-checker | Check whether claims are properly supported and sources are credible |
| ⚖️ Synthesis Judge | Synthesizer | Consolidate findings, resolve conflicts, and write the final report |

Launch independent scout agents in one parallel batch whenever the host platform supports subagents. If subagents are unavailable, simulate the topology sequentially while preserving the same roles and output contracts.

After all dense/frontier agents complete, emit:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  All agents finished
  🔍 Scouts Alpha–Epsilon  ✅
  🏛️ Source Hunter         ✅
  ⚔️ Devil's Advocate      ✅
  📡 Trend Watcher         ✅
  🔬 Citation Auditor      ✅
  ⚖️ Synthesis Judge       ✅
  Proceeding to final synthesis...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

3. Build an evidence ledger
- Deduplicate sources by canonical URL.
- For each source, capture URL, title, publisher/author, publication or update date, source type, sub-question addressed, and relevance notes.
- Extract specific claims, data points, methodologies, and limitations.
- Mark claim status:
  - `confirmed`: supported by strong evidence or multiple credible independent sources
  - `contested`: credible sources disagree
  - `weak`: only one weak or indirect source supports it
  - `inferred`: reasoned conclusion based on evidence, not directly stated by sources
- Quote directly when the exact wording is material — definitions, methodologies, thresholds, or claims where paraphrasing would change the meaning. Avoid decorative quotes that add length without adding precision.

Evidence ledger fields:
- Claim
- Status
- Source(s)
- Source quality
- Notes / limitations

### Source Deep-Dive (Verbose and Exhaustive modes only)

For every source that directly supports a main conclusion, produce a deep-dive paragraph after the evidence ledger. Only cover material sources — those whose removal would weaken or change a key finding.

```
### Source Deep-Dive: "<Title>" — <Publisher>

- **Type:** <primary | scholarly | analyst report | news | blog>
- **Date:** <publication or last-update date>
- **Methodology:** <how data was collected — survey, benchmark, interview, literature review, etc.>
- **Sample size:** <N respondents / data points / cases, if applicable>
- **Geographic scope:** <regions covered — flag gaps>
- **Potential conflict of interest:** <funding, ownership, vendor affiliation, or "none identified">
- **Independence:** <peer-reviewed, externally validated, or self-published>
- **Key contribution:** <what this source adds that no other source provides>
- **Limitations:** <gaps, recency issues, methodology weaknesses, self-reported data, etc.>
```

In Exhaustive mode, apply deep-dives to all sources with high or medium source quality, not only the material ones.

4. Validate, triangulate, and challenge
- Cross-check key claims with at least 2 independent credible sources where possible.
- For numerical claims, prefer original methodology or primary data.
- Identify where sources cite each other rather than independently confirming a claim.
- Surface contradictions explicitly instead of smoothing them over.
- When sources conflict, explain which source is more credible and why using recency, methodology, primary-source status, independence, and domain expertise.
- If evidence is thin, say so plainly and lower confidence.

4.5. Self-critique (three passes before synthesis)

Run all three passes before generating any output. Do not skip passes even under time pressure.

**Pass 1 — Factual Accuracy**
- Does every factual claim have a cited source?
- Are data points (numbers, dates, percentages) verified against the original source?
- Are there claims that seem too good, too bad, or too convenient to be true?
- Mark any unverified claims `[UNVERIFIED]` — do not include them in final conclusions.

**Pass 2 — Completeness**
- Does the research answer the core question stated in the Research Plan?
- Are all dimensions from the Research Plan addressed?
- Are there obvious follow-up questions a domain expert would immediately ask?
- Are the Known Unknowns from the plan still unresolved — and if so, are they disclosed?

**Pass 3 — Coherence & Bias**
- Is the narrative logically structured and free of internal contradictions?
- Are there hidden biases in source selection (e.g. over-relying on one vendor, geography, or viewpoint)?
- Are opposing viewpoints fairly represented?
- Is confidence language accurate — are there places where the text sounds more certain than evidence warrants?

5. Synthesize output
- Structure findings by sub-question unless the user requested another format.
- Cite every non-obvious factual claim inline.
- Separate confirmed facts, interpretations, recommendations, and unresolved gaps.
- In dense/frontier mode, include critique/rebuttal notes from ⚔️ Devil's Advocate and 🔬 Citation Auditor.

### Sub-question Expansion (Verbose and Exhaustive modes only)

For each sub-question, use this four-layer structure before stating the conclusion:

```
### Sub-question N: <question text>

**Evidence supporting the main claim:**
- <claim> [source]
- <claim> [source, source]

**Counter-evidence:**
- <conflicting claim or data point> [source] — methodology: <brief description>

**Methodology critique:**
- <weakness or gap in the supporting evidence>
- <independence issue, sample size concern, recency problem, etc.>

**Conflicting interpretations:**
- <interpretation A> — supported by sources X, Y
- <interpretation B> — supported by source Z; contested / weak evidence

**Sub-question conclusion:**
<1–3 sentence conclusion with explicit confidence level>
Confidence: <high | medium | low> — <one-line reason>
```

In Standard mode, state the conclusion directly without the four-layer breakdown. In Exhaustive mode, expand each layer with additional quotes and source references.

## Output Formats

Choose one based on request:

Default structure for non-trivial research:

**Standard mode:**
- Objective
- Scope and assumptions
- Methodology
- Sub-questions
- Findings by sub-question
- Evidence matrix
- Contradictions and disputed claims
- Recommendations or implications, when requested
- Confidence & gaps
- Sources

**Verbose and Exhaustive modes — additional sections:**
- Executive Summary (200–300 words) ← top of report, before everything else
- Background / Context (2–4 paragraphs before findings)
- Stakeholder / Actor map (when applicable)
- Timeline / Chronology (for time-sensitive topics)
- Devil's Advocate (steelman of the opposing position)
- Source deep-dives (after evidence ledger)
- Per-sub-question confidence scores
- Appendices (query log, rejected sources, paywalled sources)

### Methodology Section (mandatory in all modes)

Include a **Methodology** section before any findings. It must document:

```
## Methodology

**Research period:** <month and year>
**Mode:** <Standard | Verbose | Exhaustive>

**Queries used:**
- <exact query string>
- <exact query string>

**Queries discarded:** <query> (<reason: too broad, SEO-heavy, off-scope, etc.>)

**Sources attempted but inaccessible:**
- <Source name> (<reason: paywall | login required | timeout | 404>) — <what was used instead, if anything>

**Filters applied:**
- <e.g. Sources older than N years excluded unless foundational>
- <e.g. Marketing pages used only for vendor positioning claims>

**Known limitations before synthesis:**
- <e.g. No access to paid analyst reports>
- <e.g. Limited peer-reviewed literature on this topic>
```

Omit any field that does not apply. Never fabricate inaccessible sources — only list ones actually attempted.

### 1) Executive Brief
- Objective
- Top findings (5-10)
- Risks / unknowns
- Recommendations
- Confidence & gaps
- Sources

### 2) Comparative Analysis
- Criteria matrix
- Option-by-option strengths/weaknesses
- Trade-offs
- Recommendation + rationale
- Confidence & gaps
- Sources

### 3) Research Log
- Queries used
- Source inventory
- Evidence quality notes
- Open questions
- Next research steps
- Confidence & gaps

Every substantive report must close with `Confidence & Gaps`:
- Overall confidence: high / medium / low
- Per-sub-question confidence (Verbose and Exhaustive only — aggregate from sub-question conclusions)
- Strongest evidence
- Weakest evidence
- Known disagreements across sources
- Missing or inaccessible information
- Recommended follow-up research

### Additional Sections (Verbose and Exhaustive modes)

**Executive Summary** — 200–300 words at the very top of the report, before Methodology. Must cover: research question, top 3–5 findings, overall confidence level, and biggest gap or risk. Written so the reader can stop here and still understand the core answer.

**Background / Context** — 2–4 paragraphs before findings. Covers: why this topic matters, relevant history, key definitions, and the current state of the field. Gives the reader enough context to evaluate the findings without prior domain knowledge.

**Stakeholder / Actor map** — when the topic involves multiple parties (competitors, regulators, buyers, vendors). List each actor, their role, their interests, and their relevance to the research question. Include in Verbose and Exhaustive when applicable.

**Timeline / Chronology** — for time-sensitive topics (regulatory changes, product evolution, market shifts). A dated list of key events relevant to the research question, ordered chronologically. Include in Verbose and Exhaustive when the time dimension affects interpretation.

**Devil's Advocate** — a steelman section arguing the strongest case *against* the main conclusions. Written as a self-contained argument, not a list of caveats. Forces the report to confront its weakest points directly. Include in Verbose and Exhaustive always.

**Appendices** — at the end of the report, after Sources:
```
## Appendices

### A — Full Query Log
| Query | Agent | Results | Outcome |
|-------|-------|---------|---------|
| <query string> | 🔍 Scout Alpha | 12 results | 4 sources used |
| <query string> | ⚔️ Devil's Advocate | 8 results | 2 sources used |

### B — Rejected Sources
| Source | URL | Reason for rejection |
|--------|-----|----------------------|
| <title> | <url> | Promotional content, no methodology |

### C — Paywalled / Inaccessible Sources
| Source | URL | What was available |
|--------|-----|--------------------|
| <title> | <url> | Abstract only / login required |
```

## Quality Bar

- Evidence before conclusions
- Date-aware and source-aware claims
- Contradictions surfaced, not hidden
- No uncited critical claims
- Claim status visible for material claims
- Dense/frontier outputs include model/tooling limitations

## Time & Cost

- Native mode time: usually 5-20 minutes depending on scope
- Dense/frontier mode time: usually 15-45+ minutes depending on source count, critique rounds, and platform support
- Native mode cost: no external API cost for this skill
- Dense/frontier mode cost: depends on the host platform or selected frontier model; disclose model/tooling choice before execution

## Safety

- Never fabricate sources or citations.
- If evidence is insufficient, state it clearly.
- Distinguish confirmed facts from inference.

## Critical Rules

- Always include citations for material claims.
- Always separate facts from interpretations and recommendations.
- Always mark uncertainty explicitly when evidence is weak or conflicting.
- Do not paper over uncertainty with confident-sounding prose.
- Never claim a source was read in full unless it was actually accessible and reviewed.

## Error Handling

| Error | Likely Cause | Action |
|-------|-------------|--------|
| WebSearch returns no results | Query too specific, misspelled, or topic very niche | Broaden query, try alternate phrasing, report low-coverage finding |
| WebFetch times out or blocked | Site is down, bot-blocking, or paywalled | Skip that source, note it as inaccessible, continue with other sources |
| Insufficient sources found | Topic has limited public information | Report coverage gaps; recommend user provide domain-specific sources |
| Conflicting information across sources | Different sources cite different facts | Flag the conflict explicitly; present both sides with sources |
| Query too broad | Research question covers too many sub-topics | Ask user to narrow the scope or prioritize specific dimensions |
| Paywalled content | Article requires subscription | Note the source as paywalled; use abstract/preview if available |
| Source lacks author/date/methodology | Source quality is unclear | Use only as weak/supporting context or discard for critical claims |
| Sources cite each other circularly | Apparent agreement is not independent confirmation | Mark evidence as weak and search for primary source |
| Strong sources disagree | Different methods, dates, jurisdictions, or definitions | Present both claims, explain credibility factors, and lower confidence if unresolved |
| Too many low-quality sources | Query is attracting SEO/marketing content | Add primary-source, filetype, site, institution, or regulatory terms to query |
| Frontier model unavailable | Host platform lacks requested model/tooling | Use native mode or strongest available model and disclose limitation |

## Example Usage

1. "Use deep-research to compare 3 vector databases for enterprise use."
2. "Use deep-research to summarize regulatory updates from the last 12 months."
3. "Use deep-research to produce a source-backed buy-vs-build memo."
4. "Use dense deep-research with a frontier model to produce a Perplexity-like evidence report."
