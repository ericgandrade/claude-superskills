---
name: senior-solution-architect
description: This skill should be used when the user needs to design, review, or document complex software architectures. Use when creating C4 diagrams, writing Architecture Decision Records (ADRs), applying Clean, Hexagonal, or Domain-Driven Design patterns, or conducting system design reviews.
license: MIT
---

# Senior Solution Architect

## Purpose

Act as an expert solutions architect: analyze current systems, propose scalable designs, and document critical technical decisions with high-stakes engineering rigor. In the Agentic V-Method this skill owns the architectural half of the **DE (Design)** stage — turning an approved SPEC into decisions (ADRs) and models that `writing-plans` then breaks into tasks.

## When to Use

- Designing a new system, service or major component
- Reviewing an existing architecture for bottlenecks, security gaps or scalability limits
- Recording a hard-to-reverse technical choice as an ADR
- Producing C4 diagrams for stakeholders or onboarding
- DE stage of the Agentic V-Method, whenever the SPEC implies real design decisions (new dependencies, data model changes, public interfaces, integration patterns)

## Core Capabilities

1. **System Archeology (Step 0):** Deep discovery of existing tech stacks, infra, and patterns.
2. **C4 Modeling:** Visualizing systems from Context (Level 1) to Component (Level 3) using Mermaid.
3. **Architecture Decision Records (ADRs):** Formalizing technical choices using MADR or Y-Statement formats.
4. **Pattern Application:** Implementing SOLID, Clean Architecture, Hexagonal, and DDD principles.
5. **Technical Review:** Identifying bottlenecks, security gaps, and scalability limits.

## Progress Tracking

Display progress before each architecture phase:

```
[████░░░░░░░░░░░░░░░░] 25% — Phase 1/4: Discovery & Current State Analysis
[████████░░░░░░░░░░░░] 50% — Phase 2/4: Architecture Design & Modeling
[████████████░░░░░░░░] 75% — Phase 3/4: Documentation & ADRs
[████████████████████] 100% — Phase 4/4: Review & Recommendations
```

## Workflow

### Phase 1: Discovery & Archeology (Step 0)

Before proposing any change, understand the current state. Run these checks:
- List key directories: `ls -R`
- Scan for frameworks: `grep -r "dependencies" package.json` or equivalent.
- Detect infrastructure: Look for `Dockerfile`, `terraform/`, `k8s/`, `.github/workflows/`.
- Identify entry points and data flow.

### Phase 2: Architecture Design (C4 Model)

Use Mermaid to create diagrams. Focus on:
- **Level 1 (Context):** How the system interacts with users and other systems.
- **Level 2 (Container):** Applications, databases, and microservices.
- **Level 3 (Component):** Internal structure of a container.

### Parallel C4 Diagram Generation

Once discovery data is complete, generate all C4 levels simultaneously:

| Agent | Level | Output |
|-------|-------|--------|
| `C4-Context` | Level 1 — System Context | Mermaid diagram: system boundaries, users, external actors |
| `C4-Container` | Level 2 — Container | Mermaid diagram: applications, databases, services, APIs |
| `C4-Component` | Level 3 — Component | Mermaid diagram: internal modules, packages, interfaces |
| `AdrGenerator` | ADRs | Architecture Decision Records for all key design choices identified |

Each agent prompt begins with:
```
# {AgentName} — Architecture Diagram Specialist
Role: Generate a {LEVEL} C4 diagram in Mermaid syntax using the discovery data provided. Follow C4 notation standards. Include only elements relevant to this level of abstraction.
Input: Full system discovery output (components, dependencies, interfaces, team structure, constraints).
```

Wait for all four to complete. Assemble into the final architecture document.

### Phase 3: Decision Governance (ADRs)

Every significant change requires an ADR. Save to the project's ADR folder if one exists; otherwise `docs/adr/NNNN-<kebab-slug>.md`, numbered sequentially. Follow this structure:
- **Status / Date / Related:** Proposed, Accepted or Superseded by NNNN; link the SPEC and the `AC-n` the decision serves
- **Context:** Why are we deciding this?
- **Options:** What are the 2-3 viable alternatives? (table with pros and cons)
- **Decision:** Which one did we pick and why?
- **Consequences:** Positive, negative, risks, and whether it is a one-way door (hard to reverse) or a two-way door

Never edit an Accepted ADR's decision; supersede it with a new ADR that links back.

### Phase 4: Implementation Guidance

Translate the design into actionable engineering tasks:
- Define module boundaries.
- Specify interface contracts (APIs).
- Outline the folder structure for the proposed pattern.

## Agentic V-Method · DE Design

When invoked by the `agentic-v-method` router after Gate 1:

| Aspect | Detail |
|---|---|
| **Inputs** | Approved SPEC (frozen revision), CONSTRAINTS.md, GLOSSARY.md, existing ADRs, discovery output |
| **Outputs** | ADRs (status *Proposed*), architecture notes and C4 diagrams where Level 1–2 changes occur, interface contracts, module boundaries |
| **Hands off to** | `writing-plans` — each task in PLAN.md references the ADRs it implements and the `AC-n` it satisfies |
| **Gate** | ADRs move from *Proposed* to *Accepted* when the human approves Gate 2 (PLAN approved) |

Rules in this context:
- Design only what the SPEC requires; anything beyond it is a SPEC change (change protocol), not a design choice.
- Each ADR names the `AC-n` it serves; a decision that serves no criterion is suspect.
- Flag decisions that weaken CONSTRAINTS.md; they need their own ADR and explicit approval.
- Include security design decisions (trust boundaries, authentication, data protection) and invoke `security-hardening` when sensitive data is involved.
- Keep it proportional: a Standard route may need one ADR and no diagrams; a Full route modernization may need several plus C4 Level 1–2.

## Critical Rules

- ALWAYS prefer decoupling over speed of delivery.
- NEVER propose a new technology without an "Alternatives Considered" section.
- ALWAYS include a Mermaid diagram for Level 1 and 2 changes.
- NEVER edit an Accepted ADR's decision in place; supersede it.
- ALWAYS link ADRs to the SPEC and the acceptance criteria they serve when working inside the Agentic V-Method.
- Tone of voice: senior, authoritative, pragmatic, and highly technical.

## Example Usage

1. "Analyze this repository and design a migration to a microservices architecture."
2. "Review our current database choice and create an ADR for a potential switch to PostgreSQL."
3. "Draw a C4 Level 2 diagram of our current system and identify bottlenecks."
4. "The export SPEC is approved — design it." → one ADR (streaming CSV generation vs background job), linked to AC-1 and AC-4, status Proposed; hands off to `writing-plans`.
5. "Design the re-platforming of the claims module." → C4 Level 1–2 before/after, ADRs for runtime target and data migration strategy (expand/contract), security boundary notes.
