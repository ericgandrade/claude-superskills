# Scoring Methodology for Agentic Development Methods

| Field | Value |
|---|---|
| Methodology version | 1.0 (frozen at first use; see §10.1) |
| Date | 2026-11-20 |
| Purpose | Compare methods that structure how AI coding agents and humans deliver software, on observable evidence, with a pre-registered superiority test |
| Benchmark set | Superpowers (obra/superpowers), Matt Pocock skills, Addy Osmani agent-skills, BMad Method v7, GitHub Spec Kit, AWS Kiro, AWS AI-DLC, OpenSpec, Agile V |
| Also covers | Methods that exist only as a design (§8), and later re-scoring of the same method once built |
| Companion | `docs/research/scoring/evaluator-agent.md` (scorer brief) |
| Design provenance | Written from first principles and published practice, without reading the plan or positioning documents of any evaluated method |

---

## 1. Principles

1. **Score artifacts, not adjectives.** A level is awarded only when the evidence its anchor names can be pointed to in a file, template, script, configuration or official document, after behaviourally anchored rating scales (Smith & Kendall, 1963) and CMMI appraisal practice (SCAMPI), where direct artifacts outrank affirmations.
2. **Cumulative gates.** A level requires every requirement of that level *and all lower levels* (ISO/IEC 33020, CMMI). A level-4 feature without a level-2 basic scores 1 or 2.
3. **One home per facet.** Each facet of a mechanism counts in exactly one criterion (§3.1).
4. **As released, on a reference scenario.** Roadmaps, open pull requests and "coming soon" never count. Default-path questions are judged on scenario R (§2.2).
5. **Pre-registration.** Everything here is fixed before scoring; changes after scores are seen invalidate the round (§10.1).
6. **Conservatism.** When evidence is ambiguous, score the lower level and lower the confidence.

## 2. Unit of analysis

### 2.1 What a "method" includes

A method is its official released distribution at a pinned version (commit SHA or tag), its official documentation as of a stated date, and first-party extensions. Forks, third-party posts and unmerged branches are excluded except as S evidence (§6). For closed products (AWS Kiro), the unit is the shipped version plus official documentation as of a stated date.

### 2.2 Reference scenario R

"Default path" is judged against one scenario, so methods with many modes compare on the same footing:

> **R:** A team of 3–8 professional engineers adds a medium-sized feature (roughly 3–10 tasks, 5–20 files touched) to an existing production web service that has version control, CI and a team rule that changes are reviewed before merge. The team uses one supported AI coding agent.

A mechanism is **on the default path** if a user following the main entry point for R meets it without opting in; for methods that route by size or risk, it is the route the method selects for R. Opt-in mechanisms count up to level 2, except in C8 (unattended mode is evaluated as offered) and C14 (which concerns the other paths).

### 2.3 Definitions used by the anchors

- **Mechanism:** a located instruction, template, script, hook, configuration or product feature with a trigger and a defined behaviour.
- **Artifact:** a persisted file with a defined template or required fields.
- **Independent context:** a reviewer or verifier that did not author the work under review and receives it fresh (separate subagent, separate session or a human), not the authoring agent re-reading its own output in the same context.
- **Enforced beyond prompts:** a deterministic control that blocks or flags a violation regardless of model compliance: script, hook, CI job, schema or linter, branch protection, tool permissions or sandbox configuration. "MUST" in a prompt is not enforcement, however strongly worded.
- **Bounded:** a numeric limit (rounds, attempts, time, tokens or cost) plus a defined action when the limit is hit.

## 3. Criteria

Sixteen criteria: each required concern is its own criterion, and only the pairs the brief already pairs are merged (right-sizing with brownfield, portability with extensibility, learning with measured outcomes). Further merging was rejected because these concerns vary independently across methods (strong approvals without trace IDs; strong loops without release coverage), so merging would hide real differences. Further splitting (test quality apart from design discipline) was rejected because it would give construction practices too many votes relative to their outcome evidence.

### 3.1 Boundary table (facet → home criterion)

| Facet | Home | Not counted in |
|---|---|---|
| How code and tests are written (test-first, mock discipline, design, simplicity, refactoring) | C3 | C6, C4 |
| Control structure of a loop (bound, breaker, exit criterion, escalation, loopback routing) | C6 | C3, C5, C8 |
| Proof that a completion claim is true (fresh evidence, DoD, independent test design) | C4 | C5 |
| Independent examination of a diff by another agent or human, and handling of its findings | C5 | C4 |
| Requirement content quality, clarification, spec change control | C2 | C9, C10 |
| Links between requirement, task, code, test, release and production | C9 | C7 |
| Execution graphs (task dependencies, parallel frontiers) and codebase or knowledge graphs | C7 | C9 |
| Run-level envelope for unattended work (preflight, isolation, halts, resume, budgets) | C8 | C6 |
| Who decides, recorded approvals, enforcement of approvals, waivers | C10 | C2, C8 |
| Security practices and agent-specific threats | C11 | C5 (a security lens in review counts in C11, the lens mechanics in C5) |
| Deployment, rollback, observability, incidents, production signals into the backlog | C12 | C16 |
| What the agent's context window holds and how hand-offs carry state | C13 | C1 |
| How much process a change gets, and entry into existing code | C14 | C1 |
| Platforms, runtime dependencies, extension mechanisms | C15 | C1 |
| Human time and effort to first successful use on the primary platform | C1 | C15 |
| Cross-cycle learning (retrospectives that change the environment, outcome metrics) | C16 | C6, C12 |

A mechanism with facets in two homes (a red-green loop with a round cap) counts each facet once, in its own home.

### 3.2 Generic level logic

Every anchor instantiates this ladder; use it to resolve borderline cases.

| Level | Generic meaning |
|---|---|
| 0 | Absent, or the method's text contradicts the practice |
| 1 | Mentioned as advice or principle; no procedure |
| 2 | A defined procedure, template or checklist exists, but it is optional, off the default path, or produces no record |
| 3 | Integrated: on the default path, with explicit criteria and a named artifact or record |
| 4 | Robust: level 3 plus independence, bounds, explicit failure handling and edge-case coverage |
| 5 | Mechanized or closed-loop: level 4 plus enforcement beyond prompts, or measured evidence that the mechanism works, as each anchor specifies |

## 4. Anchored scales

Each criterion gives scope, anchors, and "5 vs 4": what a 5 needs that a 4 lacks.

### C1 · Ease of adoption and learning curve

Scope: human effort to a first successful use on the primary platform. **Core reading load** = words to read before a first run (install, quickstart, entry skill or command); at ~200 words/minute, 4k ≈ 20 min, 8k ≈ 40 min, 15k ≈ 75 min.

- **0** No install instructions or no identifiable entry point; the source must be read to start.
- **1** Install documented, but no stated starting point among many skills or commands, no quickstart; or core reading load above 15k words; or more than 5 manual setup steps.
- **2** Install in ≤5 steps and a stated first command or skill, but no end-to-end worked example; core reading load ≤15k words.
- **3** One documented entry point (router, help or start command) and a quickstart that walks one task end to end; install in ≤3 steps; core reading load ≤8k words.
- **4** Level 3, plus in-tool guidance that inspects project state and recommends the next step, a troubleshooting or FAQ section, core reading load ≤4k words, and advanced features kept off the first path.
- **5** Level 4, plus verified onboarding: a scripted setup check (doctor or verify command) or a documented time-to-first-success measurement, and versioned upgrade or migration notes.
- *5 vs 4:* onboarding is verified by a tool or a measurement, not only documented well.

### C2 · Requirements and specification quality

Scope: elicitation, clarification, testable acceptance criteria, scope boundaries, ambiguity handling, and change control of the specification. (Approval of the spec is C10; links from it are C9.)

- **0** No requirements step; work goes from prompt to code.
- **1** Advice to clarify or write a spec; no template.
- **2** A spec, PRD template or clarification interview exists, but acceptance criteria are not required to be testable, or the step is off the default path.
- **3** On the default path, a spec artifact with required testable acceptance criteria (Given/When/Then, EARS, or measurable statements), explicit scope and non-goals, and a clarification step that resolves open questions or records them before building.
- **4** Level 3, plus an independent critique of the spec (fresh-context critic or validation pass with a checklist), a stop rule on material ambiguity, and change control: spec revisions are versioned with a change log, and a mid-build requirement change triggers a defined impact step.
- **5** Level 4, plus deterministic validation of the spec (a script or schema checks that acceptance criteria and IDs are present and flags vague terms), or acceptance criteria made executable, and a rule that a post-approval change re-opens approval or revalidation.
- *5 vs 4:* spec quality is checked by a tool or made executable, not only reviewed.

### C3 · Code quality practices

Scope: construction-time practices that produce clean, maintainable, tested code: test-first discipline, test quality, design discipline (interfaces, boundaries, decision records), simplicity, refactoring and anti-rationalization rules. (Loop control is C6; completion evidence is C4; review is C5; security is C11.)

- **0** No guidance on how code or tests are written.
- **1** General principles ("write clean code", "add tests") stated as advice.
- **2** A defined practice with steps for at least one of test-first, design or simplicity, but optional or off the default build path.
- **3** The default build path requires test-first, or an explicit per-task test obligation, *and* includes at least one design-discipline step (interface or boundary design before code, or decision records) *and* a simplicity rule (minimal change, no speculative abstraction).
- **4** Level 3, plus test-quality safeguards (failing test observed before the fix, limits on mocks, a stated failure each test must catch, a catalogue of test anti-patterns), a refactoring step, and explicit counters to common agent rationalizations.
- **5** Level 4, plus mechanized quality: scripts, hooks or CI that run linters, type checks, coverage or mutation testing as gates, *or* evals or pressure tests showing that the practice instructions change agent behaviour.
- *5 vs 4:* quality is enforced or its effect is measured.

### C4 · Verification and evidence

Scope: completion claims backed by fresh evidence, Definition of Done, independent test design, verification versus validation, and binding evidence to the version it describes.

- **0** The agent may declare work done without any evidence requirement.
- **1** Advice to test or verify before finishing.
- **2** A checklist or DoD exists, but showing evidence is not required, or evidence is not tied to the latest change.
- **3** A verification gate on the default path: a completion claim requires output from commands (tests, build) run after the last change; a DoD separate from the acceptance criteria; failure blocks completion.
- **4** Level 3, plus independence: tests or acceptance checks designed by a role or context other than the implementer (for example derived from the spec); verdicts based on the diff and artifacts rather than the implementer's report; an explicit "cannot verify" status instead of a silent pass.
- **5** Level 4, plus persisted evidence records bound to a version (commit SHA or hash) with a staleness rule (re-run when stale or unknown), *or* a deterministic gate (script or CI) that refuses completion without passing evidence.
- *5 vs 4:* evidence is persisted, versioned and machine-checked, not only demanded in a prompt.

### C5 · Code review rigor

Scope: independent examination of changes and the handling of findings.

- **0** No review step.
- **1** Advice to review, or a generic self-review in the same context.
- **2** A review step or checklist exists, but it is optional or done in the authoring context.
- **3** On the default path, review by an independent context with a multi-axis checklist (correctness, spec conformance, design, tests, security) and a severity scale; blocking findings must be resolved before merge.
- **4** Level 3, plus at least two of: (a) parallel lenses or reviewers with a merge and dedup step; (b) verification and triage of each finding (confirmed against the code; fixed, rejected with reason, or deferred); (c) anti-sycophancy rules in both directions (the reviewer must not rubber-stamp, the receiver must not accept findings without checking them); (d) scoped re-review after fixes.
- **5** All four of (a)–(d), plus at least two of: a triage log that records the disposition of every finding; calibration devices (context-free or adversarial lens, required minimum findings, default NO-GO); a structured hand-off to the human reviewer (walkthrough or review guide); measured review effectiveness.
- *5 vs 4:* full finding accounting and calibration against both leniency and noise.

### C6 · Loop engineering

Scope: designed feedback loops inside delivery (red-green, build-test, verify-fix, review-fix, debug) and their control: exit criteria, bounds, breakers, escalation, loopback routing and convergence.

- **0** Linear one-pass flow; no loops described.
- **1** Iteration implied ("fix and retry") without structure.
- **2** At least one named loop with steps, but no bound and no exit criterion.
- **3** At least two loop types, each with an explicit exit criterion and a bound or breaker, and a named escalation target.
- **4** Level 3, plus loopback routing by root cause (a failure goes back to spec, design, plan or code as appropriate), state carried between iterations (what was tried), scoped re-check after a fix, and an anti-thrash rule (for example, repeated failed fixes escalate to a design question).
- **5** Level 4, plus instrumented loops: iteration outcomes recorded in a ledger that drives decisions, *and* either deterministic enforcement of bounds (script or state machine) or measured loop efficacy.
- *5 vs 4:* loops are recorded and enforced or measured, not only described.

### C7 · Graph engineering

Scope: two sub-dimensions. **E (execution graph):** explicit task dependencies, parallel frontiers, conflict avoidance, integration of parallel work. **K (knowledge graph):** codebase or domain maps (dependency, symbol, module or domain graphs) used for context and impact analysis. Each is rated *declared* (exists), *used* (drives a decision) or *computed* (machine-readable and produced or validated by tooling). Traceability links are C9.

- **0** Tasks are an unordered or linear list; no structural maps.
- **1** Ordered tasks with informal mention of dependencies, or prose descriptions of the codebase.
- **2** E or K is *declared*: dependency fields on tasks, or a codebase map artifact.
- **3** One sub-dimension is *used* and the other at least *declared*: for example, the dependency graph decides order and identifies independent tasks for parallel execution, with a conflict rule (disjoint file sets), while a code map exists.
- **4** Both are *used*: parallel frontier dispatch with an integration step, and impact analysis from the codebase map feeding the plan or test selection.
- **5** Level 4, plus at least one sub-dimension *computed*: machine-readable graph (YAML, JSON or graph store) with tooling for cycle detection, frontier computation or regeneration from code, kept current automatically.
- *5 vs 4:* graphs are computed and validated by tools, not maintained by prose.

### C8 · Autonomous execution safety

Scope: the run-level envelope that makes unattended execution safe: preflight, isolation, authority limits, halt conditions, resumability, budgets and reporting. Evaluated as offered (opt-in is acceptable).

- **0** No unattended mode, or unattended runs encouraged without safeguards.
- **1** Unattended running mentioned with general cautions only.
- **2** An unattended mode with at least two safeguards (for example isolation and halt conditions), but without preflight or resumability.
- **3** An unattended mode with preflight checks (clean tree, baseline tests), isolation (branch, worktree or sandbox), an explicit list of halt conditions, and resumable state (ledger or checkpoints) that survives interruption or context compaction.
- **4** Level 3, plus authority limits (no push, merge or deploy without a human; delegated agents never hold more authority than the delegator), budget controls (iteration, time, token or cost caps), and a machine-readable run result that distinguishes done, blocked and needs-human.
- **5** Level 4, plus enforcement beyond prompts of the authority limits (hooks, permission settings, sandbox configuration or scripts that block disallowed actions) and a tested or scripted resume procedure.
- *5 vs 4:* limits are enforced by the environment, and recovery is tested.

### C9 · Traceability end to end

Scope: stable identifiers and links across the chain requirement → task → code → test → release → production, and gap analysis.

- **0** No identifiers or links.
- **1** Informal references (a task mentions the spec).
- **2** IDs for requirements or tasks, linked in one segment (for example task → acceptance criterion).
- **3** Stable IDs linked across at least three segments (for example requirement → task → test, or requirement → task → commit), kept in default-path artifacts.
- **4** Level 3, plus gap analysis in both directions (every requirement has a test; every change or test has a requirement; orphans detected), and links extended to the release (release notes or PR reference requirement IDs).
- **5** Level 4, plus machine-checked trace (a tool validates links or generates the matrix) and links extended to production (deployment, monitoring or incident records referencing requirement IDs).
- *5 vs 4:* the trace is tool-validated and reaches production.

### C10 · Human governance

Scope: named decision points, decision owners, recorded approvals, enforcement, audit trail, exceptions and waivers.

- **0** No human checkpoints.
- **1** Suggests that the user review outputs.
- **2** Defined stop points where the agent waits for a human, but approvals are not recorded and owners are not named.
- **3** Named checkpoints on the default path, each with a decision-owner role; approval recorded in an artifact (who, when, which version); the agent ends its turn and does not proceed until approval.
- **4** Level 3, plus approvals bound to a specific artifact revision (a change re-opens approval), an exception or waiver procedure with recorded rationale, explicit accountability roles, and approval depth that scales with risk.
- **5** Level 4, plus enforcement beyond prompts (branch protection, required reviewers, CI checks of approval records, or signed approvals) and an audit trail that can be exported or is mapped to a named standard.
- *5 vs 4:* approvals are enforced by systems the agent cannot bypass.

### C11 · Security by default

Scope: secure-development practices and agent-specific security, aligned with NIST SSDF (SP 800-218) and its generative-AI profile (SP 800-218A).

- **0** No security content.
- **1** General mention of security.
- **2** A security skill or checklist exists but is opt-in.
- **3** On the default path: security considered in spec or design, a security lens in review, secret-handling rules, and dependency hygiene rules.
- **4** Level 3, plus a threat-modeling procedure triggered by risk, secure-coding guidance mapped to a named reference (OWASP, SSDF), and agent-specific controls: untrusted content treated as data (prompt injection), least-privilege tool permissions, and provenance of skills and dependencies.
- **5** Level 4, plus automated security tooling wired as gates (SAST, secret scanning, dependency audit, SBOM) *or* an explicit SSDF/SP 800-218A practice mapping with evidence locations.
- *5 vs 4:* security is enforced by tools or audited against a standard.

### C12 · Release and operations coverage

Scope: deployment, rollout, rollback, observability, incident response, and production feedback into planning.

- **0** The method ends at commit or merge.
- **1** Deployment mentioned.
- **2** A release checklist or deployment guidance, without a rollback requirement.
- **3** A release step with a required rollback plan, staged rollout or feature-flag guidance, and observability requirements (logs, metrics, alerts) defined before release.
- **4** Level 3, plus an incident procedure (triage, postmortem), a defined intake from production signals into the backlog or spec, and go/no-go release criteria tied to the spec.
- **5** Level 4, plus threshold-based automated verification or rollback after deployment (SLO or error-budget triggers) and runbooks that the method produces and maintains.
- *5 vs 4:* operations are automated against thresholds.

### C13 · Context engineering and token efficiency

Scope: what enters the agent's context and when: progressive disclosure, artifact hand-offs, fresh contexts, budgets, compaction and resume.

- **0** Everything loaded at once; no guidance about context.
- **1** General advice to keep context small.
- **2** Some progressive disclosure (references loaded on demand) or hand-off documents, applied inconsistently.
- **3** Systematic progressive disclosure (small entry files, references loaded just in time), hand-offs between phases through files rather than chat, and fresh subagent contexts with explicit briefs.
- **4** Level 3, plus size budgets for artifacts or skills, a compaction or resume protocol, context-hygiene rules by role (what each role may see), and single-source-of-truth rules against duplication.
- **5** Level 4, plus budgets enforced by a validator or token use measured, *or* evals comparing context strategies.
- *5 vs 4:* context discipline is measured or machine-enforced.

### C14 · Right-sizing and brownfield support

Scope: matching process weight to change size and risk, and entering existing codebases.

- **0** One heavyweight path for every change.
- **1** Acknowledges that small changes may skip steps, without a rule.
- **2** A light path exists, but selection criteria are vague; brownfield addressed only as advice.
- **3** Explicit routing among two or more paths with stated size or risk criteria, and a brownfield entry procedure (explore and document the existing system and its conventions before changing it).
- **4** Level 3, plus separate size and risk axes (risk triggers force a heavier path regardless of size), escalation when work outgrows its path, and brownfield artifacts (code map, characterization tests for legacy code, regression selection).
- **5** Level 4, plus routing by a defined, scored rubric or a tool, and evidence (worked cases or evals) that the light path preserves the method's safety invariants, plus an adoption guide for teams with an existing process.
- *5 vs 4:* routing is reproducible and the light path's safety is demonstrated.

### C15 · Portability and extensibility

Scope: breadth of supported agent platforms, runtime dependencies, and how the method is extended or customized.

- **0** A single proprietary platform; not extensible.
- **1** A single platform; extension only by forking.
- **2** One primary platform with documented manual use elsewhere, *or* a documented customization mechanism.
- **3** Officially supported on three or more agent platforms using plain files (Markdown, YAML) with no mandatory runtime beyond the host agent and a standard toolchain, plus a documented extension mechanism.
- **4** Level 3, plus per-platform tool mappings or adapters, a customization layer that survives upgrades, and a contribution guide with authoring standards.
- **5** Level 4, plus automated validation of skills and extensions in CI (linters, schema, cross-platform checks) and a versioned extension interface.
- *5 vs 4:* extensions are validated automatically against a stable interface.

### C16 · Learning loop and measured outcomes

Scope: cross-cycle improvement that changes the working environment, and outcome metrics (for example the DORA four keys, rework rate, escaped defects).

- **0** No learning mechanism.
- **1** Advice to reflect or capture lessons.
- **2** A retrospective template or lessons file, optional.
- **3** A retrospective in the default cycle producing owned action items that change the environment (instruction files, checklists, skills, tests).
- **4** Level 3, plus recurrence handling (a recurring failure becomes a new control or check), follow-up of actions in the next cycle, and defined outcome metrics collected each cycle.
- **5** Level 4, plus metrics computed from repository or CI data by tooling and used in a stated decision rule (a threshold triggers a process change), with trends tracked across cycles.
- *5 vs 4:* metrics are computed and drive decisions.

## 5. Weights and profiles

### 5.1 Baseline weights (sum 100)

| ID | Criterion | Weight |
|---|---|---:|
| C1 | Ease of adoption and learning curve | 6 |
| C2 | Requirements and specification quality | 8 |
| C3 | Code quality practices | 9 |
| C4 | Verification and evidence | 9 |
| C5 | Code review rigor | 8 |
| C6 | Loop engineering | 7 |
| C7 | Graph engineering | 4 |
| C8 | Autonomous execution safety | 6 |
| C9 | Traceability end to end | 5 |
| C10 | Human governance | 6 |
| C11 | Security by default | 6 |
| C12 | Release and operations coverage | 6 |
| C13 | Context engineering and token efficiency | 6 |
| C14 | Right-sizing and brownfield support | 6 |
| C15 | Portability and extensibility | 4 |
| C16 | Learning loop and measured outcomes | 4 |
| | **Total** | **100** |

### 5.2 Rationale

Weights were set by swing weighting for a professional team adopting AI agents for production work: how much does moving a method from 0 to 5 on this criterion change the team's delivery outcome?

- **Delivery-quality core (C2–C6 = 41).** DORA 2024 associated each 25% rise in AI adoption with an estimated 1.5% drop in delivery throughput and 7.2% drop in stability, even as individual productivity rose. The risk with agents is code that is wrong, unreviewed or unverified, and specification, construction, verification, review and loops are where a method controls that risk directly. C3 and C4 weigh most. Evidence on TDD alone is mixed (Rafique & Mišić, 2013), so C3 rewards a bundle of practices.
- **Review (C5 = 8).** Code review is a primary quality and knowledge-transfer practice (Bacchelli & Bird, 2013; Sadowski et al., 2018). Agents raise change volume, which makes review the bottleneck. DORA 2025 notes that AI produces large blocks of code that are hard to review and test.
- **Small batches, governance, context (C14, C10, C13 = 6 each).** The DORA AI Capabilities Model (2025) names capabilities that amplify AI's effect, including clear AI stance, AI-accessible internal data, strong version control, small batches and quality internal platforms. Right-sizing operationalizes small batches; governance states what agents may decide; context engineering makes knowledge accessible efficiently (long-context degradation: Liu et al., 2024).
- **Adoption (C1 = 6).** METR's 2025 randomized trial found experienced developers about 19% slower with early-2025 AI tools despite believing they were faster. Friction is real, and a method teams cannot adopt delivers nothing else.
- **Security, release/operations, autonomy (C11, C12, C8 = 6 each).** Necessary for professional delivery (NIST SP 800-218/218A; DORA stability), but many of their controls live in the surrounding platform (CI, cloud, IAM) rather than the agent method.
- **Traceability (C9 = 5).** High value in regulated contexts, moderate elsewhere; the regulated profile raises it.
- **Graphs, portability, learning (C7, C15, C16 = 4 each).** Graph engineering has little published outcome evidence yet; portability does not change quality on any one tool; learning and DORA metrics pay off over quarters. The profiles test whether conclusions depend on these.

### 5.3 Alternative profiles for sensitivity

| ID | Equal | Startup speed | Regulated enterprise | Autonomous scale |
|---|---:|---:|---:|---:|
| C1 | 6.25 | 12 | 3 | 4 |
| C2 | 6.25 | 6 | 10 | 6 |
| C3 | 6.25 | 10 | 7 | 7 |
| C4 | 6.25 | 8 | 10 | 9 |
| C5 | 6.25 | 6 | 9 | 8 |
| C6 | 6.25 | 7 | 5 | 11 |
| C7 | 6.25 | 4 | 2 | 9 |
| C8 | 6.25 | 8 | 5 | 11 |
| C9 | 6.25 | 2 | 10 | 4 |
| C10 | 6.25 | 2 | 11 | 4 |
| C11 | 6.25 | 4 | 9 | 5 |
| C12 | 6.25 | 5 | 7 | 4 |
| C13 | 6.25 | 8 | 3 | 9 |
| C14 | 6.25 | 10 | 4 | 4 |
| C15 | 6.25 | 6 | 1 | 3 |
| C16 | 6.25 | 2 | 4 | 2 |
| Sum | 100 | 100 | 100 | 100 |

- **Startup speed:** small team, light compliance; adoption, right-sizing, code quality, context and autonomy dominate.
- **Regulated enterprise:** audited delivery; governance, traceability, verification, requirements and security dominate.
- **Autonomous scale:** many agents, long unattended runs; loops, autonomy, graphs, context and verification dominate. An extra profile can only make the superiority test (§9) stricter.

### 5.4 Sensitivity analysis plan

Run all of the following on final scores (risk-adjusted for design-only methods):

1. **Profile totals:** totals and ranks under baseline, equal, startup, regulated and autonomous-scale weights.
2. **One-at-a-time perturbation:** for each criterion, multiply its baseline weight by 0.5 and by 1.5, renormalize to 100, and record rank changes (a tornado table).
3. **Leave-one-criterion-out:** drop each criterion in turn, renormalize, and recompute ranks.
4. **Stochastic weights (rank acceptability, after SMAA; Lahdelma et al., 1998):** draw 10,000 weight vectors from (a) a Dirichlet centred on baseline, α_c = 0.5 · w_c (Σα = 50), and (b) a uniform Dirichlet, α_c = 1. Report each method's probability of ranking first and its mean rank.
5. **Score perturbation:** for each method, draw criterion scores uniformly within ±u (§7.3), 10,000 times, and report the probability of ranking first under baseline weights.

These follow the uncertainty and sensitivity steps recommended for composite indicators (OECD/JRC, *Handbook on Constructing Composite Indicators*, 2008).

## 6. Evidence rules

### 6.1 Evidence types

| Code | Type | What qualifies |
|---|---|---|
| **I** | Implemented-and-read | The scorer read the file that implements the mechanism (skill text, prompt template, script, hook, schema, configuration) at the pinned version, or exercised the shipped product feature and recorded what happened. For a prompt library, the skill text *is* the implementation. |
| **I-inv** | Implemented, via inventory | A mechanism ID from `docs/research/inventory/*.md` (SP-nn, MP-nn, AO-nn, BM-nn, AV-nn) whose inventory entry names the source file and whose file list marks it as read in full. Treated as I for level caps; confidence at most Medium unless the scorer spot-checks the source. Only the "What it is / What" and "Source" lines count; "Target", "Keep/Change/Adapt" and adaptation notes are commentary written for another method and must be ignored. |
| **D** | Documented-only | Official README, docs site or vendor documentation describes the behaviour, but the implementing file was not read (or, for a closed product, cannot be read). |
| **S** | Search-summary-only | Web search snippets, third-party articles, talks, social posts, or an inventory entry read only in summary. |
| **P** | Specified-in-design | Applies only to design-only methods (§8): the design document specifies the mechanism concretely. |

### 6.2 Caps by evidence type

The maximum level is set by the weakest evidence type needed to meet all of that level's requirements:

| Best evidence for the level's requirements | Maximum level |
|---|---|
| S only | 2 |
| D, open-source method (implementation available but not read) | 3 |
| D, closed-source product (implementation not inspectable) | 4 |
| I or I-inv | 5 |
| P | per §8 |

For open-source methods, levels 4–5 need the implementation read (I or I-inv). Enforcement-beyond-prompts requirements need the enforcing file itself as I evidence.

### 6.3 Missing evidence

- Each requirement of an awarded level needs a citation (path with line or section, mechanism ID, or URL with access date). Uncited claims are ignored.
- **Searched, not found:** score the highest evidenced level (possibly 0) and keep the search log.
- **Could not access:** score only what was accessed, mark `partial-access`, confidence Low.
- Never infer a mechanism from reputation, name or marketing.

### 6.4 Confidence

| Rating | Conditions (all must hold) | Half-width u_conf |
|---|---|---:|
| High | Every requirement of the awarded level cited with I evidence at a pinned version; the next level's missing requirement identified explicitly; scorers agree exactly | 0.25 |
| Medium | Some requirement rests on I-inv or D evidence, *or* scorers differ by 1, *or* a borderline judgment on one requirement | 0.5 |
| Low | Any requirement rests on S evidence, partial access, scorers differ by 2 or more, *or* the score depends on an interpretation the scorer flags as contestable | 1.0 |

## 7. Scoring procedure and aggregation

### 7.1 Phases

1. **Freeze:** log the methodology version and SHA-256 hash.
2. **Pilot calibration:** two scorers score two benchmarks (one light, one heavy). Anchor wording may be clarified only now, each change logged with a version bump; then re-freeze.
3. **Evidence collection:** pin the version, list files read, run the per-criterion search.
4. **Independent scoring:** at least two isolated scorers per method, randomized criterion order, no totals or other scorecards visible.
5. **Reconciliation:** a difference of 1 takes the lower score unless one scorer cites evidence the other missed; 2 or more requires written reconciliation, failing which the median rounded down with Low confidence.
6. **Reliability:** Krippendorff's α (ordinal) on paired pre-reconciliation scores over all cells; proceed if α ≥ 0.667, target ≥ 0.80 (Krippendorff, 2004). Below 0.667, rewrite the most-disputed anchors (logged) and re-score those criteria for *all* methods.
7. **Red-team audit** (§10.3).
8. **Aggregation and sensitivity** (§5.4), computed by script, not by scorers.
9. **Superiority test** (§9) and report.

### 7.2 Totals

For method m, profile P and criterion score s (0–5; for design-only methods the risk-adjusted score RA, §8):

T(m, P) = Σ_c w(c, P) · s(m, c) / 5, on a 0–100 scale.

### 7.3 Uncertainty

Per criterion: u(m, c) = max(u_conf, half the pre-reconciliation scorer range). For design-only methods, add realization uncertainty: u = √(u² + ((1 − r) · D / 2)²) (§8.3).

Per total: U(m, P) = √( Σ_c ( w(c, P) / 5 · u(m, c) )² ).

The quadrature sum assumes criterion errors are independent. Systematic errors (for example, a scorer generous everywhere) are not independent, so the superiority margin also has a fixed floor (§9).

## 8. Design-only methods

A design-only method exists as a plan, not as released skills or tools. It is scored with the **same anchors** from P evidence, then discounted for realization risk.

### 8.1 What counts: the concreteness test

A designed mechanism counts only if the design specifies at least four of five elements, *including every element the anchor requirement depends on*:

1. **Artifact or location:** the file, template or skill that will hold it.
2. **Trigger:** when it runs (stage, event or condition).
3. **Procedure or decision rule:** steps, thresholds, numeric bounds and criteria.
4. **Output or record:** what it produces and where that is persisted.
5. **Failure behaviour:** what happens when the check fails, the bound is hit or the input is missing.

Example: a "bounded fix loop" meets the C6 bound requirement only if the bound number and the action at the bound are specified.

**Non-credit language.** "Will support", "where appropriate", "as needed", "could", "may", "TBD", "future work", "optional enhancement", or a mechanism named without its behaviour do not count. A design that only *lists* a practice ("security review") is level 1 for that facet.

**No credit for measurement not yet taken.** Requirements needing operational or measured evidence (time-to-first-success measurement, measured review effectiveness, evals, computed metrics with trends) are met by a design only if the eval or measurement is fully specified (inputs, procedure, pass threshold), and then r for that criterion is capped at 0.8.

### 8.2 Design score D

D(m, c) is the anchor level whose requirements are all met by mechanisms that pass the concreteness test. Confidence for design scores is at most Medium.

### 8.3 Realization risk factor r

Scorer and auditor each assign r(m, c) from this rubric; the final r is the **lower** unless the higher is supported by cited evidence.

| r | Condition (take the lowest matching row) |
|---:|---|
| 1.0 | Mechanisms already implemented or prototyped in the method's own repository and read (I evidence) |
| 0.9 | Every mechanism at the awarded level has an implemented precedent in a benchmark (cite the mechanism ID), and the design specification is complete |
| 0.8 | Precedents exist, but the combination or integration is new, or the specification is complete for only part of the level's requirements, or the level depends on a specified-but-unrun eval |
| 0.7 | At least one mechanism at the awarded level has no implemented precedent, *or* it depends on deterministic tooling not yet written, *or* it has three or more cross-stage dependencies on other unbuilt mechanisms |
| 0.6 | It is novel *and* depends on platform capabilities not available on all target agents, *or* the design contains unresolved internal contradictions affecting it |

Scope load: if the design commits to more new mechanisms in a criterion than the largest benchmark implements there, lower r by 0.1 (floor 0.6).

### 8.4 Risk-adjusted score

RA(m, c) = D(m, c) × r(m, c). RA is used in all totals, sensitivity runs and the superiority test. The scorecard also reports the design total and the **realization gap** (design total − risk-adjusted total).

### 8.5 Symmetry and re-scoring

- Benchmarks get no credit for roadmaps; designs get no credit for vague intentions. One standard: only concrete mechanisms count.
- Once built, the method is re-scored from scratch as implemented (r = 1) by scorers who did not score the design. The report compares design, risk-adjusted and built scores per criterion, which also tests how well r predicted realization.

## 9. Superiority test (pre-registered)

Let X be the evaluated method and B(P) the highest-scoring benchmark under profile P. X is **superior to the benchmark set** only if **all seven** conditions hold. Each is evaluated after the red-team audit.

| # | Condition | Definition |
|---|---|---|
| S1 | Margin under baseline | T(X, base) − T(B, base) ≥ M(base), where M(P) = max(5.0, 2 · √(U(X, P)² + U(B, P)²)) points on the 0–100 scale |
| S2 | Robust across profiles | For each of equal, startup, regulated and autonomous-scale: X ranks first and T(X, P) − T(B(P), P) ≥ M(P) |
| S3 | Robust to weights and scores | Rank-1 probability ≥ 0.90 under the centred Dirichlet, ≥ 0.75 under the uniform Dirichlet, and ≥ 0.90 under score perturbation (§5.4, items 4–5); X stays first under every leave-one-criterion-out run |
| S4 | No weak spot | For every criterion, s(X, c) ≥ the median of the nine benchmark scores on that criterion (no tolerance) |
| S5 | Best in class | s(X, c) ≥ max over benchmarks on that criterion − 0.25 for at least 6 of 16 criteria, of which at least 3 are in the core C2–C6 |
| S6 | Survives audit | Red-team audit completed; S1–S5 recomputed after all upheld challenges |
| S7 | Reliable scoring | Krippendorff's α ≥ 0.667 for the round |

**Why these thresholds.** The factor 2 approximates a two-sided 95% bound on the difference of two independent totals. The 5-point floor covers correlated scorer error that quadrature ignores (one level on criteria carrying a quarter of the weight). S4 stops a method winning on totals while worse than an ordinary benchmark somewhere that matters. S5 requires leadership, anchored in the delivery-quality core. For a design-only X every condition uses RA, so a risky design must beat realized benchmarks after discount.

**Verdicts** (report exactly one, and list every failed condition):

- **Superior:** S1–S7 all hold.
- **Conditionally superior:** S1, S4, S6 and S7 hold, but S2 fails for at most one profile or S3 falls short. State the condition under which the advantage disappears.
- **Comparable:** |T(X, base) − T(B, base)| < M(base).
- **Not superior:** none of the above, or B leads by M(base) or more.

## 10. Anti-bias protocol

### 10.1 Pre-registration and freeze

The methodology is frozen (version plus hash) before evidence collection. Changes after the pilot invalidate all scores and require re-scoring every method. Totals and verdicts are computed mechanically from the reconciled score table.

### 10.2 Scorer independence and conflicts of interest

- **Separate scorers.** At least two independent scorers per method. Scorers of the design-only method also score at least two benchmarks in the same round (shared calibration) and took no part in authoring it.
- **Information diet.** Scorers receive only this methodology, the evaluator brief, the method's sources and inventory catalogs; never the requester's hypothesis, positioning documents, promotional comparisons or other scorers' sheets.
- **Conflict declaration.** Each scorer declares authorship, planning, promotion or positioning briefings for any evaluated method, and vendor affinity (the scorer model's vendor publishes a method). Conflicted scorers may not score or audit that method.
- **Adjudication.** The owner of a design-only method may answer factual questions in writing (logged) but may not adjudicate its scores; disputes go to a named, unconflicted adjudicator.
- **Anti-anchoring.** Randomized criterion order; evidence recorded before a level is chosen; totals never shown to scorers.
- **Anti-sycophancy.** Scorer prompts state that no outcome is expected, the requester's preferences are irrelevant, and unsupported scores will be struck.

### 10.3 Red-team audit

An auditor who scored none of the methods in scope:

- **Scope:** the two top-ranked methods under baseline, every design-only method, every Low-confidence cell that changes a rank, and a random 15% of other cells.
- **Challenge types:** (a) evidence does not say what is claimed; (b) a lower-level requirement is unmet; (c) double counting; (d) not on the default path for R; (e) vague intention credited; (f) optimistic r; (g) **steelman the competition:** where the top or design-only method leads, search for missed evidence that would raise the strongest benchmarks.
- **Resolution:** *upheld* when evidence shows the requirement unmet (type g: met), and the score changes; contested challenges go to the adjudicator; all are logged.

### 10.4 Mandatory weakness disclosure

Every scorecard lists the method's three weakest criteria relative to the benchmark median. A design-only scorecard lists **every** criterion where RA is below the best benchmark, the gap, and the top realization risks. A report without these carries no verdict.

## 11. Output templates

### 11.1 Per-method scorecard

```markdown
# Scorecard — <Method name>

| Field | Value |
|---|---|
| Method / version | <name> @ <commit SHA or tag; product version + docs date> |
| Status | implemented | design-only |
| Scorer ID | <id> | Methodology version + hash | <v, sha256> |
| Date | <YYYY-MM-DD> | Access | full | partial (<what was missing>) |
| Conflict declaration | <none | details> |
| Files read (count, list in appendix) | <n> |

## Scores

| ID | Criterion | Score (D) | r | RA | Conf | Ev. type | Evidence (path:section / mechanism ID / URL) | Rationale: requirement met per level; first unmet requirement of next level |
|---|---|---|---|---|---|---|---|---|
| C1 | Adoption | | 1.0 | | | | | |
| … | … | | | | | | | |
| C16 | Learning loop | | 1.0 | | | | | |

(For implemented methods r = 1.0 and RA = Score.)

## Weighted totals (filled by aggregator)
| Profile | Total | U |
|---|---|---|

## Weakest criteria (mandatory)
1. <criterion> — score vs benchmark median/best — why

## Realization risks (design-only, mandatory)
| Criterion | Gap to best benchmark | Risk driver | r justification |

## Claims not scored
| Claim | Source | Reason (uncited / roadmap / vague / S-only above cap) |

## Search log
| Criterion | Probe terms / paths searched | Result |
```

### 11.2 Machine-readable block (appended to every scorecard)

```json
{"method":"<slug>","version":"<pin>","status":"implemented|design-only","scorer":"<id>",
 "scores":{"C1":{"s":0,"r":1.0,"conf":"H|M|L","ev":"I|I-inv|D|S|P","cites":["..."]}}}
```

### 11.3 Comparison table

```markdown
| Method | Status | C1 | C2 | … | C16 | Base | ±U | Equal | Startup | Regulated | Auton. | Rank-1 prob. (centred) | Min conf |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| <method> | impl | 3 | 4 | … | 1 | 61.2 | 2.4 | … | … | … | … | 0.12 | M |
| Benchmark median | — | | | | | | | | | | | | |
| Benchmark best | — | | | | | | | | | | | | |
```

Design-only rows show RA in criterion cells, and a second row in italics with D.

### 11.4 Superiority report

```markdown
| Condition | Value | Threshold | Pass |
|---|---|---|---|
| S1 margin (base) | ΔT = … | M = … | ✓/✗ |
| S2 per profile | equal … / startup … / regulated … / auton. … | M(P) each | |
| S3 rank-1 prob. | centred … / uniform … / score-pert. … ; LOO first in k/16 | .90/.75/.90; 16/16 | |
| S4 criteria below median | list | none | |
| S5 best-in-class count | n (core n) | ≥6 (≥3 core) | |
| S6 audit | upheld challenges: n | completed | |
| S7 Krippendorff α | … | ≥ .667 | |
| **Verdict** | Superior / Conditionally superior / Comparable / Not superior | | |
```

### 11.5 Audit log

```markdown
| # | Method | Criterion | Type (a–g) | Challenge | Evidence | Outcome (upheld/rejected/adjudicated) | Score change |
```

## 12. Limits

- It measures what a method *specifies and implements*, not field outcomes. Prompt instructions depend on model compliance; controlled task trials are needed to measure real effect.
- Weights are judgment informed by the cited literature; profiles and S2/S3 keep conclusions from resting on one weighting.
- Closed products are scored mostly from documentation (cap 4), which disadvantages them at level 5; their scorecards say so.
- Integer anchors are coarse; confidence and disagreement feed the uncertainty bands instead of fractional scores.

## References

- Bacchelli & Bird (2013). Expectations, outcomes, and challenges of modern code review. ICSE.
- DORA (2024). Accelerate State of DevOps Report. https://dora.dev/report/2024 ; https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report
- DORA (2025). State of AI-assisted Software Development; AI Capabilities Model. https://cloud.google.com/blog/products/ai-machine-learning/introducing-doras-inaugural-ai-capabilities-model
- ISO/IEC 33020:2019. Process measurement framework for assessment of process capability.
- Krippendorff (2004). Content Analysis, 2nd ed. Sage.
- Lahdelma, Hokkanen & Salminen (1998). SMAA. European Journal of Operational Research 106(1).
- Liu et al. (2024). Lost in the Middle. TACL.
- METR (2025). Measuring the impact of early-2025 AI on experienced open-source developer productivity.
- NIST SP 800-218 (2022) SSDF; NIST SP 800-218A (2024) SSDF Community Profile for Generative AI.
- OECD/JRC (2008). Handbook on Constructing Composite Indicators.
- Rafique & Mišić (2013). Effects of TDD on external quality and productivity: a meta-analysis. IEEE TSE 39(6).
- Sadowski et al. (2018). Modern code review: a case study at Google. ICSE-SEIP.
- SEI (2011). SCAMPI A v1.3 Method Definition Document.
- Smith & Kendall (1963). Retranslation of expectations. Journal of Applied Psychology 47(2).
