# Deep Research Agent Topology

Use this reference when dense/frontier mode is active, subagents are available, adversarial critique is requested, or citation audit is requested.

## Execution Rule

Launch independent scout agents in one parallel batch whenever the host platform supports subagents. If subagents are unavailable, simulate the same roles sequentially while preserving each role's output contract.

## Native ResearchScout Batch

Use this smaller topology for normal multi-step research:

| Agent | Assignment |
|-------|------------|
| `ResearchScout-SQ1` | Research sub-question 1 with primary-source preference |
| `ResearchScout-SQ2` | Research sub-question 2 with primary-source preference |
| `ResearchScout-SQ3` | Research sub-question 3 with primary-source preference |
| `ResearchScout-Contrarian` | Find credible conflicting or critical evidence |
| `ResearchScout-Recent` | Date-filtered search for recent developments when time-sensitive |

## Dense / Frontier Topology

Use this wider topology for maximum-depth research:

| Agent | Purpose |
|-------|---------|
| `ResearchLead` | Normalize scope, define sub-questions, assign agents, and maintain evidence standards |
| `ResearchScout-SQ1..SQ5` | Research one sub-question each with source traceability |
| `PrimarySourceHunter` | Find official docs, filings, papers, regulatory pages, datasets, and primary evidence |
| `ContrarianScout` | Find credible disagreement, failures, criticism, and negative evidence |
| `RecencyScout` | Search for recent developments and date-sensitive updates |
| `CitationAuditor` | Check whether claims are properly supported and sources are credible |
| `SynthesisJudge` | Consolidate findings, resolve conflicts, and write the final report |

## Base ResearchScout Prompt

```md
# ResearchScout -- Targeted Web Research Agent

Role: Execute assigned web research using WebSearch/WebFetch. Collect authoritative sources, extract claim-level evidence, identify contradictions, and return structured results.

Required output:
- Sub-question or query assignment
- Queries attempted
- Source inventory with URL, title, publisher, date, and relevance
- Key claims and data points with source attribution
- Short direct quotes only when exact wording matters
- Evidence quality notes
- Conflicts, gaps, and inaccessible/paywalled sources
```

## Role Contracts

### ResearchLead

Purpose: Normalize scope, define sub-questions, assign agents, and maintain evidence standards.

Required output:
- Restated research objective
- Scope and assumptions
- 3-5 sub-questions
- Agent assignment map
- Source quality criteria
- Expected final output format

### ResearchScout-SQ1..SQ5

Purpose: Research one assigned sub-question with source traceability.

Required output:
- Assigned sub-question
- Queries attempted
- Source inventory
- Key claims and data points
- Source quality notes
- Gaps and uncertainty

### PrimarySourceHunter

Purpose: Find primary evidence.

Required output:
- Official docs
- Regulatory pages
- Filings
- Standards
- Peer-reviewed or preprint papers
- Datasets
- Notes on source authority and limitations

### ContrarianScout

Purpose: Find credible disagreement, negative evidence, failures, and criticism.

Required output:
- Contested claims
- Critical sources
- Failed assumptions
- Contrary evidence
- Credibility assessment

### RecencyScout

Purpose: Find recent developments and time-sensitive updates.

Required output:
- Recent updates
- Dates and publication timing
- What changed
- Whether older sources are now stale
- Source recency risks

### CitationAuditor

Purpose: Check whether material claims are properly supported.

Required output:
- Unsupported claims
- Weak sources
- Circular citations
- Missing primary evidence
- Claims that require lower confidence
- Fix recommendations

### SynthesisJudge

Purpose: Consolidate findings, resolve conflicts, and write the final research judgment.

Required output:
- Final synthesis by sub-question
- Evidence-backed answer
- Disputed claims
- Confidence rating
- Remaining gaps
- Recommended follow-up research
