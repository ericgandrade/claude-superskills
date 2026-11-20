# Concept Inventory: Agile V Agent Skills (for the Agentic SDLC)

> **Naming note (2026-11-20):** this research was written when the method was the V-shaped, six-stage "Agentic V-Method". On 2026-11-20 the owner replaced it with the **Agentic SDLC** — a continuous cycle of eight stages (PL · AN · DE · BU · TE · RV · DP · OP), one AI agent role per stage and named human checkpoints CP1–CP5 (see `skills/agentic-sdlc/references/lifecycle.md`). Names were updated mechanically; read any remaining V-specific wording ("left arm", "right arm", "the V") as the cycle, and old Gate 1 / 2 / 3 as CP2 (SPEC) / CP3 (design and plan) / CP4 (PR approval).

| Field | Value |
|---|---|
| Framework | Agile V™ Agent Skills Library (Christopher Koch, agile-v.org) |
| Upstream | `Agile-V/agile_v_skills`, shallow clone at commit `4bcc917` |
| License | **CC BY-SA 4.0** (share-alike). Adapted text would have to carry the same license, which is incompatible with this repository's MIT license. |
| Trademark | "Agile V" is a claimed trademark of its author. It must not appear in any skill name, product name, badge or marketing copy of this repository. It may be cited once, factually, as related prior work. |
| Date | 2026-11-19 |
| Purpose | Input for the Agentic SDLC plan (`docs/plans/2026-11-18-agentic-sdlc.md`, sections 2.2–2.4, 3 and 4). |

> **Concept-only summary written independently; contains no Agile V text.** Every entry below describes a general engineering idea in this repository's own words, at the level of a textbook treatment of the V-model, requirements traceability or verification independence. No sentence, template, table layout, field list, identifier scheme, skill name or file structure from Agile V is reproduced or proposed for reuse. Where Agile V itself adapted an idea from an MIT-licensed source (its context-engineering material credits the GSD framework), that is noted so the idea can be traced to its permissive origin instead.

## Files read (paths only, relative to the clone root)

Top level: `README.md`, `AGENTS.md`, `CLAUDE.md`.

Docs: `docs/INSTALL_PROFILES.md`, `docs/GOLDEN_JOURNEY.md`, `docs/COMPARISONS.md`, `docs/compliance/01_COMPLIANCE_POSTURE.md`, `docs/compliance/02_ISO_9001_MATRIX.md` (headings), `docs/compliance/03_ISO_13485_MATRIX.md` (headings), `docs/compliance/04_AS9100D_MATRIX.md` (headings), `docs/compliance/05_ISO_27001_MATRIX.md` (headings), `docs/compliance/06_GXP_GAMP5_MATRIX.md` (headings), `docs/compliance/07_GAP_ROADMAP.md` (headings), `docs/standards/AI_GOVERNANCE_MAPPING.md`, `docs/standards/EU_AI_ACT_APPLICABILITY.md`, `docs/standards/SAFETY_ASSURANCE_PROFILES.md`, `docs/standards/SOURCE_REGISTER.md`, `docs/standards/SYSTEMS_SOFTWARE_LIFECYCLE_MAPPING.md`, `docs/agile-v-runtime/02_CONTROL_MATRIX.md`, `docs/agile-v-runtime/03_CANONICAL_LIFECYCLE_CONTRACT.md`, `docs/agile-v-runtime/04_RISK_CLASSIFICATION.md`, `docs/agile-v-runtime/05_AGENT_TOOL_AND_DELEGATION_CONTRACT.md`, `docs/agile-v-runtime/07_EVIDENCE_ADMISSION_CONTRACT.md`, `docs/agile-v-runtime/08_INDEPENDENCE_CLASSES.md`, `docs/agile-v-runtime/09_EXCEPTION_AND_WAIVER_CONTRACT.md`, `docs/agile-v-runtime/10_CHANGE_AWARE_REVALIDATION.md`, `docs/agile-v-runtime/11_RISK_ASSESSMENT_V2.md`, `docs/agile-v-runtime/12_GOVERNANCE_CONVERSION.md`, `docs/agile-v-runtime/13_SKILL_GRADUATION_POLICY.md`, `docs/agile-v-runtime/14_TRUSTED_ADMISSION_CONTEXT.md`, `docs/agile-v-runtime/16_CONTEXT_TRUST_CONTRACT.md`, `docs/agile-v-runtime/18_CAPABILITY_COMPOSITION.md`.

Skills (all 49 `SKILL.md` files: frontmatter and section structure for every file; full body for the starred ones): `agile-v-core`\*, `requirement-architect`\*, `logic-gatekeeper`\*, `test-designer`\*, `red-team-verifier`\*, `validation-agent`\*, `build-agent`\*, `agile-v-pipeline`\*, `agile-v-lifecycle`\*, `agile-v-compliance`\*, `agile-v-human-oversight`\*, `agile-v-quality-gates`, `agile-v-behavioral`, `agile-v-adr`, `agile-v-aibom`, `agile-v-control-matrix`, `agile-v-sop-adapter`, `agile-v-gxp-qualification`, `agile-v-product-owner`, `compliance-auditor`, `discovery-analyst`, `threat-modeler`, `ux-spec-author`, `safety-engineer`, `schematic-generator`, `documentation-agent`, `release-manager`, `observability-planner`, `venture-strategist`, `rd-innovator`, `gtm-executor`, `business-operations`, `c-suite-foundation`, `c-suite-update`, `chief-exec`, `chief-tech`, `chief-finance`, `chief-people`, `chief-ops`, `skills/system-understanding-agent`, `skills/impact-analysis-agent`, `skills/regression-selection-agent`, `skills/graph-traceability-agent`, `skills/diff-evidence-agent`, `domains/build-agent-python`, `domains/build-agent-js`, `domains/build-agent-nestjs`, `domains/build-agent-dart`, `domains/build-agent-embedded`.

## 1. The assurance model in one paragraph

Agile V positions itself as an assurance layer that sits on top of whatever coding agent a team already uses. Its central bet is that AI-assisted work becomes trustworthy when the inputs to the build are fixed and reviewed before synthesis, when the checks are produced by roles that did not do the building, when every artifact can be followed back to the requirement it serves through links that say what kind of relationship they represent, and when accountable people (not agents) make the go/no-go calls, with the strength of all of these scaled to the consequence of the change. Around that core it layers a large body of machine-readable contracts (schemas, reference semantics, benchmarks), compliance and standards mappings, a provenance record for AI influence, existing-codebase evidence agents, hardware and firmware roles, and a preview business/executive track. The core ideas are classic systems-engineering practice applied to agents; the volume of surrounding apparatus is where the Agentic SDLC should deliberately stay lighter.

## 2. Concept catalog

Each entry gives: the concept in generic engineering terms, the Agentic SDLC stage(s) it touches, the problem it addresses, and how the Agentic SDLC can reach the same goal with its own design. Target skills refer to plan section 4.

### Left arm: defining what must be true

**AV-01 · Written draft before any review** — *Stage: AN.*
Problem: when requirements live only in the conversation, reviewers and builders each work from a slightly different memory of what was agreed. Realization (`spec-driven-development`): the SPEC file is the only thing that counts; the skill writes it to disk before the doubt pass or the human sees it, and every later skill reads the file rather than the chat. A short rule in the router: "if it is not in SPEC.md, it is not a requirement."

**AV-02 · Author and critic kept apart** — *Stage: AN.*
Problem: a reviewer who silently rewrites a draft destroys the record of what was wrong and why it changed. Realization (`spec-driven-development`, doubt pass): the fresh-context critic only produces a numbered list of objections; the authoring pass answers each one (fixed, rejected with reason, deferred to open questions). The answered list stays in the SPEC's revision history so CP2 shows both the draft's weaknesses and their resolution.

**AV-03 · Measurable acceptance language** — *Stage: AN.*
Problem: words such as "fast", "secure" or "easy" cannot be tested and invite the builder to pick its own meaning. Realization (`spec-driven-development` validate mode, `grill-me`): a vague-word scan that turns each soft term into a threshold or an observable Given/When/Then outcome; any acceptance criterion with no plausible test is flagged before CP2. This is standard requirements-quality practice (as in ISO/IEC/IEEE 29148) and needs no borrowed wording.

**AV-04 · Stop on material ambiguity** — *Stages: all, strongest in AN and BU.*
Problem: language models tend to fill gaps with plausible guesses, which quietly become design decisions nobody approved. Realization (router rule plus every method skill): distinguish *material* gaps (change behavior, risk, scope or acceptance) from cosmetic ones; on a material gap the agent stops and asks, on a cosmetic one it proceeds and notes the assumption. This sharpens the plan's existing rule that facts are the agent's job and decisions are the human's.

**AV-05 · Every requirement has an origin** — *Stages: PL → AN.*
Problem: requirements that appear from nowhere are hard to challenge and often reflect the agent's preferences. Realization (`spec-driven-development`): each `AC-n` carries a short source tag (brainstorm decision, grill-me answer, stakeholder statement, threat identified by `security-hardening`, bug report). A criterion with no source is either removed or confirmed by the human.

**AV-06 · Frozen approved revision** — *Stages: AN (CP2) → BU, TE.*
Problem: if the specification keeps drifting during build, tests and code chase a moving target and the final evidence proves nothing stable. Realization (router change protocol, `spec-driven-development` revise mode): once CP2 approves revision *rN*, that revision is read-only; any later change opens a new revision with an impact note on PLAN, tasks and tests, and needs re-approval. Already in plan section 2.2; this inventory confirms it as a core idea.

**AV-07 · Explicit requirement status** — *Stage: AN.*
Problem: readers cannot tell whether a spec is a sketch, under review, approved, or replaced. Realization (`spec-driven-development`): a one-line status in the SPEC header with a small set of values chosen by this repository (for example Draft, In review, Approved rN, Superseded by rN+1). Deliberately far simpler than a formal state machine.

**AV-08 · Discovery and threats feed requirements, not code** — *Stages: PL, AN.*
Problem: user research findings and security threats often bypass the spec and land directly in code, untested. Realization (`brainstorming`, `security-hardening` AN mode): outputs of ideation and threat analysis are written as candidate acceptance criteria or explicit non-goals in the SPEC, so they go through CP2 and get tests like everything else.

**AV-09 · Human expectation captured before the agent's answer** — *Stages: PL, AN.*
Problem: once a person has read an AI recommendation, their own judgment anchors on it, so their approval no longer adds an independent check. Realization (`brainstorming`, `grill-me`, Full route only): before presenting options, ask the human one question about what success should look like and one about what they fear could go wrong. Record both verbatim in the SPEC; `test-strategy` later turns each concrete worry into at least one test. Kept optional and short rather than a formal assurance-case record.

### Design and planning

**AV-10 · Long-lived decisions recorded separately from routine notes** — *Stage: DE.*
Problem: important architecture choices get lost in running logs, or get silently reversed by later sessions. Realization (`senior-solution-architect`, `grill-me` docs mode): significant choices become ADRs under `docs/adr/`, never edited after acceptance but replaced by a newer ADR that points back; routine reasoning goes into the PLAN or commit messages. ADRs are a widely used public practice (Nygard, 2011), so no Agile V structure is needed.

**AV-11 · Dependency-ordered parallel work** — *Stages: DE → BU.*
Problem: running everything sequentially wastes time; running everything in parallel causes conflicts. Realization (`writing-plans`, `executing-plans`): the PLAN's blocking edges form a graph; the ready frontier runs in parallel only when tasks touch disjoint files, and later layers wait. Prefer vertical slices over horizontal layers. Matches ideas already sourced from MIT frameworks.

**AV-12 · Context hygiene by role** — *Stages: all.*
Problem: long sessions degrade, and a verifier that inherits the builder's conversation inherits its blind spots. Realization (router `phase-boundaries.md`): keep the orchestrating session thin, pass file paths rather than file contents, give each subagent a fresh context sized well under its limit, and never hand the builder's reasoning to a reviewer. Agile V credits this material to an MIT-licensed source, and the plan already draws the same idea from Matt Pocock's phase-boundary guidance.

### Bottom of the V: building under control

**AV-13 · Build only from the approved revision, nothing beyond it** — *Stage: BU.*
Problem: agents add speculative features, extra configurability or "improvements" that no criterion asked for. Realization (`executing-plans`, `test-driven-development`): every change must serve a task, and every task an `AC-n`; anything else is written down as a proposal for the next cycle, not implemented. The spec-compliance review in subagent mode flags extra behavior as a finding.

**AV-14 · Bounded self-repair, then escalate** — *Stage: BU.*
Problem: an agent can loop indefinitely on a failing fix, or "fix" by widening scope. Realization (`systematic-debugging`, `executing-plans`): allow a small fixed number of local fix attempts for mechanical failures inside the task's files; architecture changes, scope growth, files outside the task, or a third failed attempt stop the loop and go to the human. Aligns with the plan's existing three-failed-fixes rule.

**AV-15 · Delegated agents never get more authority than the delegator** — *Stage: BU.*
Problem: a subagent handed a broad mandate can touch files, tools or environments the parent task was never allowed to touch. Realization (`executing-plans` subagent mode): each subagent brief lists the task, the `AC-n` it serves, the files it may change, and the actions it may not take (push, deploy, change CI, edit SPEC). A subagent cannot widen its own brief; widening goes back through the orchestrator and, if material, the human.

**AV-16 · Per-task operating limits written down** — *Stages: PL, AN.*
Problem: what an agent may read, run or change is usually left to tool defaults, which differ by platform. Realization (`project-context` CONSTRAINTS.md plus the SPEC's Always / Ask first / Never boundaries): one short, human-readable list of allowed and forbidden actions, data types and environments, plus the rollback owner. Plain Markdown, no machine-readable control file.

### Right arm: proving it

**AV-17 · Tests derived from the specification, not the code** — *Stage: TE (design can start in DE).*
Problem: tests written after reading the implementation tend to confirm what the code does rather than what was required. Realization (`test-strategy`): TEST-PLAN.md is produced from the approved SPEC alone, ideally in a separate context and before or alongside the build; every `AC-n` maps to a test level and a concrete case, and any criterion without a test is flagged.

**AV-18 · The builder does not grade its own output** — *Stage: TE.*
Problem: self-review rarely finds the errors the author made. Realization (`verification-gate`, `multi-axis-code-review`, `executing-plans` subagent mode): verification and review run in a separate context or subagent when the platform supports it, and in a clearly separated second pass when it does not. Already a non-negotiable rule (plan section 3.4, rule 5).

**AV-19 · Independence is a graded, per-claim property** — *Stage: TE.*
Problem: "independently verified" is often claimed when the check was the same model in a new chat. Realization (`verification-gate`): VERIFICATION.md records, per acceptance criterion, how independent the evidence actually was, using a short scale defined by this repository (for example: same session; separate agent context; deterministic tool output; separate human). The general idea of degrees of verification independence is long established in safety standards; the Agentic SDLC should use its own plain labels and never call a fresh AI context "independent assurance".

**AV-20 · Prefer non-generative evidence for important claims** — *Stage: TE.*
Problem: an AI reviewer's opinion is correlated with the AI builder's; both can be wrong the same way. Realization (`verification-gate`): for the riskiest criteria, at least one piece of evidence must come from something that does not generate text (a test run, a type checker, a scanner, a measured benchmark, a human observation). This reinforces "evidence before claims" (rule 2).

**AV-21 · Verification and validation are different questions** — *Stages: TE vs DP.*
Problem: passing every test against the spec does not show that the spec solved the user's actual problem. Realization: TE (`verification-gate`) proves each `AC-n`; DP (`retrospective`) compares the PL target indicators with measured outcomes and records an acceptance decision. Neither substitutes for the other, which is exactly the PL ↔ DP pair in plan section 3.1. Textbook V&V distinction (Boehm), no borrowed wording needed.

**AV-22 · Typed trace links** — *Stages: AN → DP.*
Problem: a single generic "relates to" link cannot tell an auditor whether code *implements*, a test *verifies*, a finding *challenges*, or an approval *authorizes* something. Realization (TRACEABILITY.md, maintained by `verification-gate`): the matrix columns themselves carry the relationship meaning (`AC-n` → task → commit → test → evidence → release), plus separate small sections for review findings and gate approvals. The Agentic SDLC keeps one ID family (`AC-n`) and avoids a multi-prefix identifier scheme.

**AV-23 · Gaps found in both directions** — *Stage: TE.*
Problem: missing coverage (a criterion nobody tested) and unrequested work (code no criterion asked for) are both defects. Realization (`verification-gate`, `multi-axis-code-review` spec axis): before CP4, list criteria with no evidence and diffs with no task or criterion. Either list being non-empty blocks the gate or requires a recorded decision.

**AV-24 · Evidence must be bound to the exact version it describes** — *Stage: TE.*
Problem: "the tests passed" means little if the code changed afterwards or if the run cannot be tied to a commit. Realization (`verification-gate`): each evidence row records the command, the full-output location and the commit it ran against. Presence of a log is not proof; the evidence must actually cover what the criterion requires and match the version being approved.

**AV-25 · Stale evidence is re-run, unknown is treated as stale** — *Stages: TE, DP.*
Problem: evidence collected earlier may no longer be valid after code, dependencies, configuration or the model change. Realization (`verification-gate`, router change protocol): if anything the evidence depended on changed after it was produced, re-run the affected checks; if it is unclear whether a change matters, assume it does. Only unaffected evidence carries forward.

**AV-26 · Criteria stay fixed while they are being checked** — *Stage: TE.*
Problem: under pressure, thresholds get loosened or tests deleted in the same change that is being judged against them. Realization (`multi-axis-code-review` weakened-bar lens, `verification-gate`): during TE the SPEC criteria and CONSTRAINTS thresholds are read-only; proposals to change them are logged for `retrospective` and take effect only in a later approved revision.

**AV-27 · Findings classified by severity with a default disposition** — *Stage: TE.*
Problem: an unordered list of review comments does not tell anyone what blocks release. Realization (`multi-axis-code-review`): Critical blocks CP4, Important requires a fix or an explicit human decision, Minor may be accepted or deferred with a one-line reason. Already planned; this inventory confirms the gate linkage.

**AV-28 · Reviewers report, builders fix** — *Stages: TE → BU.*
Problem: a verifier that writes the fix becomes a second builder and loses its independence. Realization (`multi-axis-code-review` request mode): findings state the expected behavior, the observed behavior and the location; the fix happens in BU, followed by targeted re-verification of the failed items plus regression on touched files.

**AV-29 · A small taxonomy of why things failed** — *Stages: TE → DP.*
Problem: failures recorded only as prose cannot be counted, so recurring causes stay invisible. Realization (`verification-gate`, `retrospective`): tag each failure with a cause category defined here (for example: plan gap, wrong tool use, misread output, environment, unclear spec), so the retrospective can see patterns and target environment fixes.

**AV-30 · Predicted versus actual change** — *Stages: DE → TE.*
Problem: when the real diff touches files or behavior the plan never predicted, that surprise is a risk signal that usually goes unreported. Realization (`multi-axis-code-review`, `verification-gate`): compare files and interfaces named in PLAN with the actual diff; list unexpected changes with a short explanation; the agent that caused a surprise does not get to declare it harmless at Standard or Full size.

### Gates, exceptions and risk

**AV-31 · Gate records with named authority** — *Stages: AN, DE, TE (Gates 1–3).*
Problem: "the agent finished" is often mistaken for "someone approved it". Realization (CHECKPOINTS.md, router): each gate entry records who approved, their role, date, the revision or commit approved, the evidence consulted, conditions attached, and residual risk accepted. A chat "ok" is acceptable for Quick; Standard and Full need the written entry. Already in plan section 2.2.

**AV-32 · Resume from files at a gate pause** — *Stages: all gates.*
Problem: sessions end while waiting for approval, and a new session may wrongly assume approval was given. Realization (router Step 0): a gate awaiting decision is written to CHECKPOINTS.md as pending; on resume the router reads the artifacts and proceeds only if a matching approval entry exists.

**AV-33 · Distinct kinds of "proceed anyway"** — *Stages: TE, DP.*
Problem: waiving a test, accepting a known defect, postponing work and accepting residual risk are different decisions, but all tend to be recorded as "fine for now". Realization (CHECKPOINTS.md exceptions section): name the exception type, scope, owner, reason and review or expiry date. Missing evidence with no exception entry means the gate is blocked, not waived. A few things are never waivable in this method (unknown approver, evidence not tied to a version, secrets in the repository).

**AV-34 · Risk triggers set a minimum route** — *Stage: PL.*
Problem: size-based routing alone can send a one-line change to authentication down the lightest path. Realization (`agentic-sdlc` sizing): a short list of hard triggers (authentication or authorization, secrets, payments, personal or health data, irreversible data migration, production release) forces at least the Standard route; judgment can raise the route but never lower it below a trigger.

**AV-35 · Evidence obligations scale with the route** — *Stages: PL → TE.*
Problem: the same heavy ceremony for every change is ignored; no ceremony for risky changes is dangerous. Realization (router `lifecycle.md`): Quick, Standard and Full each state the minimum evidence, review independence and gate formality they require. This maps the general idea of risk-proportionate assurance onto the plan's existing three routes, not onto a five-level scale.

### Existing systems, change and learning

**AV-36 · Understand before touching an existing system** — *Stages: AN, DE.*
Problem: agents modify unfamiliar code without knowing its structure, entry points or blast radius. Realization (`codebase-modernization` inventory mode, `project-context` setup mode): a short system overview and an impact prediction (likely affected modules, interfaces and existing tests) are produced and reviewed before the SPEC is approved for brownfield work.

**AV-37 · Change cycles separate new checks from regression** — *Stages: TE, DP → PL.*
Problem: in the second and later iterations, it is unclear which tests are new and which protect existing behavior. Realization (`test-strategy`, router change protocol): new or modified criteria get fresh tests; unchanged criteria keep their regression tests untouched; a regression failure with no related approved change is treated as critical.

**AV-38 · Recurring failures become controls, approved by someone else** — *Stages: DP → PL.*
Problem: lessons learned stay in retro notes and never change the environment; or an agent quietly changes the rules mid-task. Realization (`retrospective`, `project-context` pitfall mode): repeated or severe failures produce a proposed check or CONSTRAINTS entry; a human approves it; it applies from the next cycle, not to the task that motivated it. Mechanical checks are preferred over new prose instructions.

**AV-39 · Release safety tied to the specification** — *Stage: DP.*
Problem: rollouts without measurable rollback triggers or post-release checks fail silently. Realization (`deployment-pipeline`, `shipping-and-handover`): staged rollout where appropriate, rollback rehearsed from the SPEC's rollback section, post-release checks mapped to `AC-n` and PL indicators, production incidents routed to a new SPEC revision. Observability signals cite the indicator or criterion they watch.

**AV-40 · Record of AI involvement, without secrets or hidden reasoning** — *Stages: BU, DP.*
Problem: reviewers and auditors increasingly ask which model, tools and context shaped an artifact, and model changes can invalidate earlier evidence. Realization (`shipping-and-handover`, optional HANDOVER.md section): a few lines naming the model and version, platform, method skills used and main context sources, never prompts, secrets or chain-of-thought. A model change is one of the triggers in AV-25. Kept optional and lightweight rather than a full bill-of-materials manifest.

## 3. Differentiation notes

The Agentic SDLC should share the engineering ideas above while being unmistakably a different method in scope, shape, vocabulary and weight.

**Scope.** Agile V spans software, hardware schematics, firmware, GxP qualification stages, safety lifecycles, SOP binding, and a preview business and executive track. The Agentic SDLC is a software-delivery method for AI coding agents. It should not add hardware, qualification-stage, SOP or executive skills, and it should not position itself as a regulated-industry quality system.

**Structure.** Agile V organizes work around many specialized agent roles, a five-stage pipeline, two human approval points plus an optional understanding gate, a five-level risk scale and a five-level independence scale. The Agentic SDLC uses six lifecycle stages named after classic SDLC phases (PL · AN · DE · BU · TE · DP), three gates defined by what is approved (SPEC, PLAN, proven acceptance), three sizing routes, and one router. Gate numbers should always be shown with their meaning ("CP3 · PLAN approved") because the same number means something else in Agile V.

**Naming and vocabulary.** Never use "Agile" in the method or skill names. Avoid Agile V's characteristic role names, protocol names, principle labels, phase acronyms, gate labels, record names and identifier prefixes. The Agentic SDLC uses a single ID family (`AC-n`) plus task numbers, plain file names (SPEC, PLAN, TEST-PLAN, VERIFICATION, TRACEABILITY, GATES, HANDOVER, RETRO) under `docs/agentic-sdlc/<feature>/`, and no hidden project directory. Generic engineering terms ("frozen baseline", "traceability matrix", "residual risk", "ADR", "V&V") are fine because they predate both projects.

**Weight.** Agile V backs its skills with JSON Schemas, a reference-semantics module, a benchmark corpus, evidence-adapter profiles, control-file conventions and packaging metadata. The Agentic SDLC stays plain Markdown with no runtime, schema or script dependency, which is what keeps it portable across the eight supported platforms and cheap in tokens. Where Agile V specifies a field list, the Agentic SDLC should prefer a short checklist or a single Markdown table designed from scratch.

**Center of gravity.** Agile V's strongest emphasis is assurance evidence and governance. The Agentic SDLC's should be engineering practice: test-first slices, systematic debugging, multi-axis review, subagent execution and shipping hygiene, with assurance ideas added only where they protect those practices. Test-driven development in particular is a Agentic SDLC pillar that Agile V does not emphasize.

**Claims.** Agile V carries compliance badges and alignment claims. The Agentic SDLC should make no alignment or certification claims at all beyond saying that `security-hardening`'s SSDF reference shows where evidence could come from.

**Attribution.** One factual sentence in the README's "Relationship to other V-model approaches" note, crediting Agile V as related prior work with a link, is appropriate. No Agile V badge, logo, phrasing or file should appear anywhere.

## 4. Compliance-mapping ideas

**What Agile V maps to (names only).** Quality management: ISO 9001, ISO 13485, AS9100D. Information security and privacy: ISO/IEC 27001, ISO/IEC 27701. Regulated computerized systems: GxP with GAMP 5, 21 CFR Part 11 and EU GMP Annex 11 (partially, as external controls), EudraLex Annex 15, FDA QMSR and Computer Software Assurance. AI governance: ISO/IEC 42001, ISO/IEC 23894, ISO/IEC 5338, ISO/IEC 42005, ISO/IEC 22989 and 23053, NIST AI RMF with its Generative AI profile, the EU AI Act (as an applicability screen). Systems and software lifecycle: ISO/IEC/IEEE 15288, 12207, 29148, ISO/IEC 25010, the ISO/IEC/IEEE 29119 family. Functional safety: ISO 26262, IEC 61508, IEC 62304, DO-178C with DO-330, EN 50716, Automotive SPICE. Threat knowledge: OWASP GenAI / LLM Top 10 and MITRE ATLAS. Supply-chain formats are referenced (SBOM, CycloneDX ML-BOM, SLSA).

**Gap that matters here.** No mapping to **NIST SP 800-218 (SSDF)** was found anywhere in the Agile V repository. The planned `security-hardening/references/ssdf-mapping.md` therefore covers ground Agile V does not, and fits the Agentic SDLC's software-only scope. NIST publications are US government works, so practice identifiers and names can be cited freely; the mapping should be written directly from the NIST document, never from any Agile V matrix.

**Recommendations.**
1. **SSDF (planned): high value.** Map each practice group (PO, PS, PW, RV) to the Agentic SDLC stage and artifact that would produce supporting evidence. State plainly that this shows where evidence comes from and is not a compliance claim.
2. **OWASP Top 10 and ASVS: high value, already planned** as review checklists in `security-hardening` and `multi-axis-code-review`.
3. **ISO/IEC/IEEE 29148 and 29119: optional, low cost.** A two-line note in `spec-driven-development` and `test-strategy` saying their checks echo the requirement-quality and test-design ideas of these standards. Cite clause numbers only, never ISO text.
4. **NIST AI RMF: optional, later.** Could back the AI-use guardrails in `security-hardening` with a short mapping to its four functions, but only if a business or client need appears.
5. **Not recommended:** quality-management, GxP, medical, aerospace and functional-safety matrices. They need organizational controls the method cannot supply, they would blur the differentiation in section 3, and they are Agile V's territory.

## 5. Top 10 concepts worth realizing independently

1. **Frozen approved SPEC revision with change protocol** (AV-06) → `spec-driven-development` + `agentic-sdlc`
2. **Tests derived from the spec, not the code** (AV-17) → `test-strategy`
3. **Builder never grades its own output; per-claim independence recorded** (AV-18, AV-19) → `verification-gate`
4. **Gate records with named authority, evidence and residual risk** (AV-31) → `agentic-sdlc` (CHECKPOINTS.md)
5. **Halt on material ambiguity, proceed on cosmetic gaps with logged assumptions** (AV-04) → `agentic-sdlc` (shared rules)
6. **Risk triggers that set a minimum route** (AV-34) → `agentic-sdlc` (sizing)
7. **Evidence bound to the exact commit; stale or unknown evidence re-run** (AV-24, AV-25) → `verification-gate`
8. **Two-way gap check: untested criteria and unrequested code** (AV-23) → `verification-gate` + `multi-axis-code-review`
9. **Distinct, scoped exception types; missing evidence blocks rather than waives** (AV-33) → `agentic-sdlc` (CHECKPOINTS.md)
10. **Author and critic separated in spec review** (AV-02) → `spec-driven-development` (doubt pass)
