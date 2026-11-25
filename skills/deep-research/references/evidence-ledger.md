# Evidence Ledger Reference

Use this reference when building the evidence matrix, validating contested claims, auditing citations, or saving a comprehensive Markdown report.

## Purpose

The evidence ledger is the audit trail for the research. It separates sourced facts from interpretations, weak claims, and unresolved disputes.

## Ledger Fields

| Field | Description |
|-------|-------------|
| Claim | Specific factual claim, data point, or inference |
| Status | `confirmed`, `contested`, `weak`, or `inferred` |
| Source(s) | URL, title, publisher, and date when available |
| Source quality | `primary`, `scholarly`, `secondary`, or `supporting` |
| Notes / limitations | Methodology caveats, access issues, recency risks, or disagreement |

## Claim Status

### confirmed

Use when a claim is supported by strong evidence or multiple credible independent sources.

Examples:
- A regulatory deadline stated directly on an official government page
- A product capability documented in official vendor docs
- A statistic repeated by independent sources that point to the same primary dataset

### contested

Use when credible sources disagree or use incompatible definitions, methods, dates, jurisdictions, or samples.

Examples:
- Two analyst firms estimate different market sizes with different methodologies
- A vendor claims a capability that customers or benchmarks dispute
- Academic studies reach different conclusions due to different sample populations

### weak

Use when a claim has only one weak, indirect, promotional, outdated, or circular source.

Examples:
- A market-size number repeated by blogs without original methodology
- A vendor claim without documentation or independent validation
- A customer sentiment claim from a small sample of reviews

### inferred

Use when the conclusion is reasoned from evidence but not directly stated by sources.

Examples:
- A recommendation based on a pattern across multiple sourced facts
- A risk assessment derived from gaps in public documentation
- A market-positioning judgment based on feature, pricing, and review evidence

## Source Quality Levels

### primary

Official docs, regulatory pages, filings, standards bodies, government data, company pages, original datasets, and direct product documentation.

### scholarly

Peer-reviewed papers, preprints with clear methodology, university research, and formal research reports.

### secondary

Analyst reports, established media, expert organizations, reputable trade publications, and serious independent analysis.

### supporting

Blogs, newsletters, aggregators, review sites, forums, marketing pages, and other sources used only for context or customer sentiment.

## Validation Rules

- Cross-check material claims with at least 2 independent credible sources where possible.
- Prefer original methodology or primary data for numerical claims.
- Identify where sources cite each other rather than independently confirming a claim.
- Lower confidence when evidence is circular, stale, promotional, or inaccessible.
- Surface contradictions explicitly instead of smoothing them over.
- When sources conflict, explain which source is more credible and why using recency, methodology, primary-source status, independence, and domain expertise.

## Evidence Matrix Template

```md
| Claim | Status | Source(s) | Source quality | Notes / limitations |
|-------|--------|-----------|----------------|---------------------|
| <Claim> | confirmed / contested / weak / inferred | <URLs or source names> | primary / scholarly / secondary / supporting | <notes> |
```

## Disputed Claims Template

```md
| Disputed claim | Source positions | Credibility assessment | Current judgment |
|----------------|------------------|------------------------|------------------|
| <Claim> | <who says what> | <why one source is stronger/weaker> | <confirmed / unresolved / likely false> |
```
