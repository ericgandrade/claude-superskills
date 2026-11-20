# Classic Methods and Standards: How Software Life Cycles Are Structured

**Purpose:** Input for the Agentic SDLC structure and naming decision. Earlier drafts used invented labels that did not match software-engineering vocabulary. This document collects evidence on which phase, role, artifact and checkpoint names the industry already recognizes, so that the Agentic SDLC can use names that engineers, auditors and regulated-industry buyers know. A developer should be able to pick up the method and get from an idea to production.

**Scope:** ISO/IEC/IEEE 12207:2017 (with ISO/IEC/IEEE 15288 and 24748-1 covered briefly), SWEBOK Guide v4, Waterfall (Royce 1970), the V-model (with the German V-Modell XT), the Spiral model (Boehm), the Rational Unified Process / Unified Process (with OpenUP), IEC 62304 (medical device software), and DO-178C (airborne software, briefly). Supporting references: MIL-STD-1521B (review names), ISO/IEC/IEEE 29148 (requirements documents), IEEE 1012 (V&V), AAMI TIR45 (agile under IEC 62304), and the FDA's 2023 premarket software guidance.

**Date:** 2026-11-20.

---

## 0. Evidence quality and how to read the citations

- **Collection method.** Evidence was gathered through web search on 2026-11-20. In this session, full-page fetching was blocked for several hosts (for example `en.wikipedia.org` and `webstore.iec.ch`). Search-result excerpts were available. Each claim cites the URL of the source the excerpt came from. The full reference list is in Section 7.
- **Two evidence grades:**
  - Claims **without a marker** are supported by a search excerpt from the cited URL.
  - Claims marked **†** rely on the cited primary source (the standard's table of contents, the original paper or the method's own documentation) as it is widely described in the literature. Their exact wording could **not** be re-read in this session because full-text access was blocked. Check them against the primary text before quoting them in customer-facing or audit material.
- **The standards are paywalled.** ISO, IEC and RTCA texts are sold, not free. Clause titles come from publisher previews and tables of contents, which are public. Clause *requirements* are not quoted here.
- **Editions.** IEEE lists ISO/IEC/IEEE 12207:2017 as superseded by a 2026 edition [R3]. IEC 62304 Edition 2 is still in drafting, and sources disagree on its timeline [R27][R28]. This document describes the 2017 edition of 12207 and IEC 62304:2006+AMD1:2015, the editions most organizations still cite.

---

## 1. Key findings (summary)

1. **The shared core is a set of activity names, not phase names.** All eight methods name the same activities: **requirements, architecture, design, implementation (or construction or coding), integration, testing, verification, release, operation and maintenance**. Supporting processes recur too: **planning, configuration management, risk management, quality assurance and problem resolution**. Time-boxed phase names are method-specific. Inception, Elaboration, Construction and Transition belong only to RUP.
2. **The standards do not tell you what order to work in.** 12207 "does not prescribe any particular life cycle model" [R1]. IEC 62304 asks the manufacturer to *choose and document* a life cycle model in its Software Development Plan [R30]. Regulators accept iterative and agile execution as long as the required activities and evidence exist (AAMI TIR45 [R31][R32]).
3. **Most standards name responsibilities, not job titles.** 12207, IEC 62304 and DO-178C define processes, outcomes and parties (acquirer, supplier, manufacturer, applicant, certification authority). Job titles such as Project Manager, Architect, System Analyst, Implementer and Tester come from the process frameworks, mainly RUP/OpenUP and V-Modell XT [R18][R21][R23].
4. **Checkpoints are named after the decision or the evidence.** Examples: "Lifecycle Objectives" and "Lifecycle Architecture" milestones (Spiral and RUP) [R13][R16], "Preliminary Design Review" and "Critical Design Review" (MIL-STD-1521B) [R36], "decision gates" (V-Modell XT) [R24], "Stages of Involvement" (DO-178C practice) [R34]. Each one is a go/no-go decision backed by named work products.
5. **Rigor is scaled by risk class.** IEC 62304 uses Software Safety Classes A/B/C [R28][R29]. DO-178C uses software levels A–E [R33]. IEEE 1012 uses integrity levels [R38]. FDA's 2023 guidance uses Basic and Enhanced Documentation Levels [R39]. This is the recognized way to size work in regulated settings.
6. **Three ideas persist in every regulated domain:** bidirectional **traceability** (requirements → design → code → tests), **verification paired with every specification level** (the "V"), and **baselined configuration management with problem resolution**.

---

## 2. Method profiles

### 2.1 ISO/IEC/IEEE 12207:2017: Software life cycle processes

12207 is a *process reference model*: it lists processes with purpose, outcomes, activities and tasks. It is not a life cycle model. It "establishes a common framework for software life cycle processes, with well-defined terminology" and "does not prescribe any particular life cycle model" [R1]. The 2017 edition grouped processes into four groups [R2][R3]. It was aligned with ISO/IEC/IEEE 15288:2015, so systems and software share one process vocabulary.†

| Aspect | Content |
|---|---|
| **Process groups** | Agreement; Organizational Project-Enabling; Technical Management; Technical [R2][R3] |
| **Agreement processes** | Acquisition; Supply [R2] |
| **Organizational Project-Enabling** | Life Cycle Model Management; Infrastructure Management; Portfolio Management; Human Resource Management; Quality Management; Knowledge Management [R2] |
| **Technical Management (8)** | Project Planning; Project Assessment and Control; Decision Management; Risk Management; Configuration Management; Information Management; Measurement [R4]; Quality Assurance† |
| **Technical processes (14)** | Business or Mission Analysis†; Stakeholder Needs and Requirements Definition†; System/Software Requirements Definition†; Architecture Definition†; Design Definition†; System Analysis; Implementation; Integration; Verification; Transition; Validation; Operation; Maintenance; Disposal [R1][R2] |
| **Roles** | No job titles. Parties are the *acquirer*, *supplier*, *stakeholders* and the *organization*.† |
| **Artifacts** | The standard specifies *outcomes*, not document names. Its companion ISO/IEC/IEEE 15289 governs information items (documentation content).† Requirements documents are elaborated in ISO/IEC/IEEE 29148 (BRS, StRS, SyRS, SRS) [R37]. |
| **Checkpoints** | Decision Management covers decision points. Project Assessment and Control covers reviews.† Life cycle stages and their decision gates are described in the companion ISO/IEC/IEEE 24748-1 [R7]. |
| **Iteration model** | Neutral. Processes can be applied sequentially, iteratively or recursively.† |
| **Tailoring** | Clause 5.5.4 "Tailoring" [R4], plus a normative tailoring annex. Conformance can be claimed as "full" or "tailored".† |
| **Core guide size** | The standard runs to roughly 150 pages and is paywalled.† Most engineers learn it through derived material such as SWEBOK and SEBoK, not the text itself. |

**Notes.**
- **History.** The first edition (1995) and the 2008 edition carried a software-specific breakdown. Software Implementation processes were split into requirements analysis, architectural design, detailed design, construction, integration and qualification testing. Software Support processes included documentation management, configuration management, quality assurance, verification, validation, review, audit and problem resolution.† That older vocabulary is still visible in IEC 62304, which was derived from it (see 2.7).
- **ISO/IEC/IEEE 15288 (briefly).** This is the systems-level twin. The 2023 edition's technical processes start with 6.4.1 "Business or mission analysis process" and 6.4.2 "Stakeholder needs and requirements definition process". Clause 6.4.4 became "System architecture definition process" (in 2015 it was "Architecture definition process"), followed by 6.4.5 "Design definition process" [R5][R6]. Each process has purpose, outcomes, and activities and tasks [R5].
- **ISO/IEC/IEEE 24748-1 (life cycle stages).** This standard supplies the *time* dimension that 12207 and 15288 deliberately leave out. It "establishes a common framework for describing life cycles, including their individual stages" [R7]. Its customary stage names are **Concept, Development, Production, Utilization, Support, Retirement**.† Verify them against section 5 of the 2024 edition [R7].
- **Criticisms and persistence.** Practitioners find 12207 abstract and hard to apply directly. It persists as the *mapping target*: auditors, government acquirers and other standards (IEC 62304, SWEBOK) reference its process names.

### 2.2 SWEBOK Guide v4.0 (IEEE Computer Society)

SWEBOK is a *body of knowledge*, not a process. It "reflects the current state of generally accepted, consensus-driven knowledge" and comprises 18 Knowledge Areas (KAs) plus a new appendix on standards [R8]. Version 4 was published in October 2024 [R9]. A minor revision was released in September 2025 and is identified as v4.0a [R8].

| Aspect | Content |
|---|---|
| **Knowledge areas (18)** | Software Requirements; Software Architecture; Software Design; Software Construction; Software Testing; Software Engineering Operations; Software Maintenance; Software Configuration Management; Software Engineering Management; Software Engineering Process; Software Engineering Models and Methods; Software Quality; Software Security; Software Engineering Professional Practice; Software Engineering Economics; Computing Foundations; Mathematical Foundations; Engineering Foundations [R9][R10] |
| **New in v4** | Software Architecture, Software Engineering Operations, Software Security [R8][R9] |
| **Roles** | Not prescriptive. Professional roles appear only incidentally inside KAs.† |
| **Artifacts** | Not prescriptive. Requirements specifications, architecture descriptions, test plans and so on are discussed as topics.† |
| **Checkpoints** | Not prescriptive. Reviews, audits and inspections are covered in Software Quality.† |
| **Iteration model** | Neutral. The Process KA covers life cycle models (waterfall, incremental, iterative, agile).† |
| **Tailoring** | Not applicable. It is a reference, not a method. |
| **Core guide size** | Reported at 413 pages, up from 335 pages for v3.0 [R11]. Free for personal and academic use [R12]. |

**Notes.**
- The first seven KAs, from Requirements through Maintenance, read as a life cycle sequence. SWEBOK presents them as knowledge areas, not phases.
- SWEBOK v4 added **Operations** as a KA, which recognizes DevOps-era practice. "Operations" is now standard SWEBOK vocabulary alongside "Maintenance".
- **Persistence.** SWEBOK is the vocabulary source for IEEE certifications and for curricula [R12]. Its KA names are the safest neutral labels for *activity areas*.

### 2.3 Waterfall (Royce, 1970): what was actually proposed

| Aspect | Content |
|---|---|
| **Steps (Royce's figure)** | System Requirements; Software Requirements; Analysis; Program Design; Coding; Testing; Operations [R13a][R14] |
| **Royce's own recommendations** | (1) Program design comes first; (2) Document the design; (3) Do it twice; (4) Plan, control and monitor testing; (5) Involve the customer.† The "do it twice" advice, building a pilot or miniature version first for novel systems, is confirmed [R14][R15]. |
| **Roles** | Informal. The paper talks about the customer, management, program designers and testing specialists.† |
| **Artifacts** | Royce lists documents including a software requirements document, preliminary design specification, interface design specification, final design specification, test plan and results, and operating instructions.† He wrote that "the first rule of managing software development is ruthless enforcement of documentation requirements" [R15]. |
| **Checkpoints** | Formal customer reviews such as a preliminary software review, a critical software review and a final software acceptance review.† The U.S. defense standards made the same pattern formal as SRR, SDR, SSR, PDR, CDR, TRR, FCA and PCA (MIL-STD-1521B) [R36]. |
| **Iteration model** | Royce presented the single pass as risky. He argued for feedback between steps and for doing the work twice [R13][R15]. |
| **Tailoring** | Implicit, driven by project size and novelty. |
| **Core guide size** | One 11-page conference paper.† |

**Notes.**
- **The name came later.** Royce never used the word "waterfall". The term may first appear in Bell and Thayer (1976) [R13]. Larman and Basili note that Royce "recommended an approach somewhat different than what has devolved into today's waterfall concept". They also note that the "iterative feedback-based step has been lost in most descriptions" [R16a]. Walker Royce described his father as "always a proponent of iterative, incremental, evolutionary development" [R16a].
- **Criticism.** The single-pass reading of the model fails when requirements are uncertain, and it delays integration risk to the end. Iterative and incremental development predates waterfall and goes back to the mid-1950s [R16a].
- **What persists.** Royce's step names (requirements, design, coding, testing, operations) are still the backbone of nearly every method. So are his document-heavy reviews. MIL-STD-1521B review names (PDR, CDR, TRR) remain in defense and space programs, and SEI notes that agile programs often adapt them [R36].

### 2.4 V-model and V-Modell XT

**Generic V-model.** The left side decomposes the system (requirements, then system or architectural design, then detailed design, then coding). The right side integrates and tests it at matching levels (unit or component, integration, system, acceptance) [R17]. Verification asks "are we building the product right?" through reviews and testing against specifications. Validation asks "are we building the right product?" against user needs [R17]. Typical pairing: acceptance tests are designed alongside requirements, system tests alongside architecture or system design, integration tests alongside detailed design, and unit tests alongside coding [R17]. Cross-references "ensure every requirement is directly linked to its corresponding test" [R17].

**V-Modell XT.** This is the German federal reference model: "das Referenzmodell für Systementwicklungsprojekte in der Bundesverwaltung" (the reference model for system development projects in the federal administration), version 2.3, published by ITZBund [R22]. A vendor reports that version 2.3 was published in March 2019 and defines 108 products [R23]. Its milestones are called **decision gates** (Entscheidungspunkte), and to pass one "an assigned product must be available in a defined quality" [R24]. Tailoring produces a *project execution strategy* that "defines the order of the decision gates" [R22][R25].

| Aspect | Generic V-model | V-Modell XT |
|---|---|---|
| **Phases / stages** | Requirements analysis; system design; architectural design; module (detailed) design; coding; unit testing; integration testing; system testing; acceptance testing [R17] | No phases. Process modules are ordered by decision gates. Examples from the English V1.3 documentation: Project Approved, Project Defined, Requirements Specified, System Specified, System Designed, Detailed Design Completed, System Elements Realized, System Integrated, Delivery Conducted, Acceptance Completed, Project Completed† [R24] |
| **Roles** | Not standardized. The model separates developers and testers. | Project roles and organizational roles [R22]. Examples include Project Manager, Requirements Engineer, System Architect, Software Architect, Developer, Evaluator (tester), Configuration Manager, Quality Manager and Steering Committee.† |
| **Artifacts** | A specification at each left-side level, and a test specification and report at each right-side level [R17] | 108 defined "products" [R23], such as the requirements specification, overall system specification, architecture, test (evaluation) specifications and project manual.† |
| **Checkpoints** | Level-wise reviews and test exits | Decision gates (examples: project approval, system acceptance, handover to operations) [R24] |
| **Iteration model** | Sequential in its classic form, but it can be applied per increment [R17] | Supports incremental, component-based and agile execution strategies through gate ordering [R22][R25] |
| **Tailoring** | Informal | Formal tailoring by project type and process modules. It removes process parts and generates project-specific templates [R25]. |
| **Core guide size** | A diagram plus a few textbook pages | Very large. The model's PDF runs to many hundreds of pages, with 108 products [R22][R23]. |

**Notes.**
- **Criticism.** Agile advocates have called the V-model "an inadequate fit for modern development". It also ties each test level rigidly to its matching document [R17]. Supporters reply that it can be applied per iteration [R17].
- **Persistence.** The V-model is the dominant mental model in automotive (ISO 26262, ASPICE), medical devices and aviation, because it makes verification and validation pairing and traceability visible. V-Modell XT persists in German public-sector procurement [R23].

### 2.5 Spiral model (Boehm, 1986/1988; anchor points 2000)

Boehm first described the model in 1986 and published it more widely in *IEEE Computer* in May 1988 [R18a]. It is "risk-driven". Boehm later called it a "process model generator", in which risk-based choices generate a suitable process for each project [R18a].

| Aspect | Content |
|---|---|
| **Cycle quadrants** | (1) Determine objectives, alternatives and constraints; (2) Evaluate alternatives, identify and resolve risks; (3) Develop and verify the next-level product; (4) Plan the next phases [R19][R20] |
| **Cycle content (1988 figure)** | Successive rounds cover concept of operation, software requirements, product design and detailed design, then code, unit test, integration and test, acceptance test and implementation. Each round is preceded by risk analysis and prototyping.† |
| **Roles** | Stakeholders, defined by their "win conditions" (later WinWin refinement) [R18a][R20] |
| **Artifacts** | Plans produced in quadrant 4: project plan, configuration management plan, test plan, installation plan [R20]. Also prototypes and risk analyses. |
| **Checkpoints** | A **review and commitment** step before each new cycle, in which stakeholders "review and agree to proceed" [R20]. The 1988 paper had no milestones. Boehm later added three **anchor point milestones**: **Life Cycle Objectives (LCO)**, **Life Cycle Architecture (LCA)** and **Initial Operational Capability (IOC)** [R18a][R19]. |
| **Iteration model** | Iterative, with risk-driven cycles that grow in scope |
| **Tailoring** | Built in. The amount and type of each activity is set by risk. |
| **Core guide size** | One paper of about 20 pages†, plus the 2000 SEI special report on the spiral model and its anchor points [R19] |

**Notes.**
- The anchor points map onto RUP. LCO marks the Inception/Elaboration boundary and LCA the Elaboration/Construction boundary [R18a].
- **Criticism.** The model needs real risk-analysis expertise. It is often misdrawn as a sequence of mini-waterfalls, and it gives little guidance on day-to-day work. Boehm's later work (MBASE, then the Incremental Commitment Spiral Model) kept the anchor points and stakeholder commitment reviews.†
- **Persistence.** It established *risk-driven iteration* and *milestones as stakeholder commitment points*. Both ideas survive in RUP, defense acquisition and "spike first" practices.

### 2.6 Rational Unified Process (RUP) / Unified Process, and OpenUP

RUP lays out two dimensions: **phases** over time and **disciplines** by content. "The software lifecycle … is decomposed over time into four sequential phases, each concluded by a major milestone" [R21][R26].

| Aspect | Content |
|---|---|
| **Phases** | Inception; Elaboration; Construction; Transition [R21][R26] |
| **Milestones** | Lifecycle Objectives (end of Inception); Lifecycle Architecture (end of Elaboration); Initial Operational Capability (end of Construction); Product Release (end of Transition) [R21] |
| **Disciplines** | Nine disciplines: six engineering and three supporting [R27a]. Engineering: Business Modeling, Requirements, Analysis and Design, Implementation, Test, Deployment. Supporting: Configuration and Change Management, Project Management, Environment.† [R27a] |
| **Roles** | About thirty roles, called "workers" in early versions [R27b]. Examples: Project Manager, (Software) Architect, System Analyst, Use-Case Specifier, Designer, Implementer, Tester, Configuration and Change Manager [R27b]. Roles "describe responsibilities", not individuals [R27a]. |
| **Key artifacts** | Vision; Business Case (owned by the Project Manager); Risk List; Use-Case Model; Supplementary Specifications; Software Architecture Document; Design Model; Software Development Plan; Iteration Plan [R27a][R27b]. Also Development Case (the tailored process) [R27b]. |
| **Iteration model** | Iterative and incremental. "Each phase is composed of multiple iterations, concluding with a usable subset of the product" [R21]. Transition is typically followed by a new Inception for the next release [R21]. |
| **Typical effort / schedule** | Inception 5% effort / 10% schedule; Elaboration 20% / 30%; Construction 65% / 50%; Transition 10% / 10% [R21] |
| **Tailoring** | Explicit. The *Development Case* artifact records which artifacts and activities a project uses [R27b]. |
| **Core guide size** | Very large. The product was a hyperlinked knowledge base with thousands of pages.† OpenUP is the minimal open version. |

**Milestone semantics.** "Each phase is concluded with a well-defined milestone, a point in time at which certain critical decisions must be made". "The project may be cancelled or considerably re-thought if it fails to pass this milestone" [R21].

**OpenUP (Eclipse Process Framework).** OpenUP is the "minimal, complete, extensible" open version of the Unified Process. It keeps the four phases, describes "responsibilities, skills and competencies of the fundamental roles", and uses work products such as Iteration Plan, Work Items List and Risk List [R40]. Its role set (Analyst, Architect, Developer, Tester, Project Manager, Stakeholder) and work products such as Vision and Architecture Notebook are widely described.†

**Criticism and decline.** Rational kept adding guidance and artifacts until RUP became "unwieldy and hard to understand and apply successfully" (Ambler) [R41]. It was often "inappropriately instantiated as a waterfall": Inception became big requirements up front, Elaboration detailed architecture, and Transition a testing phase [R41]. RUP's popularity waned as organizations adopted agile, and IBM effectively retired it in the early 2010s [R41]. Disciplined Agile Delivery "adopted many of the great ideas from RUP" but dropped an explicit Elaboration phase [R41].

**Persistence.** Three things survive: the four-phase/milestone vocabulary (in DAD and in enterprise governance), the *phases × disciplines* grid as a teaching device, and artifact names such as Vision, Risk List, Software Architecture Document and Iteration Plan. The lesson for us: a method fails when its body of guidance grows faster than teams can read it.

### 2.7 IEC 62304: Medical device software life cycle processes

IEC 62304 is the harmonized life cycle standard for medical device software. It is recognized by FDA and used for EU MDR conformity.† The consolidated edition is IEC 62304:2006+AMD1:2015 (Edition 1.1) [R28]. Its process structure descends from ISO/IEC 12207:1995.†

| Aspect | Content |
|---|---|
| **Processes (clauses)** | 4 General requirements (quality management system, risk management, software safety classification); 5 Software development process; 6 Software maintenance process; 7 Software risk management process; 8 Software configuration management process; 9 Software problem resolution process [R28][R29]† |
| **Development activities (clause 5)** | 5.1 Software development planning; 5.2 Software requirements analysis; 5.3 Software architectural design; 5.4 Software detailed design; 5.5 Software unit implementation and verification; 5.6 Software integration and integration testing; 5.7 Software system testing; 5.8 Software release [R29] |
| **Safety classes** | Class A: no injury or damage to health possible. Class B: non-serious injury possible. Class C: death or serious injury possible [R28a]. The class is based on the worst-case hazardous situation caused by a software failure, after external risk controls [R28a]. If no class is assigned, Class C requirements apply [R28b]. |
| **Roles** | None. The obligated party is the *manufacturer*.† |
| **Key artifacts** | Software Development Plan (all classes) [R30]; software requirements; software architecture; SOUP list with SOUP functional/performance and hardware/software requirements [R30]; detailed design (Class C) [R29]; unit verification records; integration and system test records; software release record with known residual anomalies [R30]; Software Maintenance Plan [R28b]; problem reports [R28b]; configuration item identification.† |
| **Checkpoints** | No named milestones. The standard requires verification of each activity's outputs and a documented **software release** (5.8). Traceability between system requirements, software requirements and software system testing is established in planning (5.1.1 c) [R29]. |
| **Iteration model** | Neutral. The manufacturer defines the life cycle model in the plan [R30]. AAMI TIR45 maps agile practices onto the 62304 activities [R31][R32]. |
| **Tailoring** | By safety class. Activities and their depth scale from A to C. For example, detailed design applies only to Class C, while system testing and release apply to all classes [R29]. |
| **Core guide size** | About 80 pages (paywalled).† It is compact compared with RUP or V-Modell XT. |

**Notes.**
- **SOUP** ("software of unknown provenance", which Wikipedia also expands as "pedigree") is any third-party or legacy software not developed under the standard. The standard defines a risk-based model for when SOUP is acceptable and how to test it [R28b]. *This category maps directly to AI-generated code and open-source dependencies* (see Section 6).
- **Problem resolution (clause 9)** steps include: prepare problem reports, investigate the problem, advise relevant parties, use the change control process, maintain records, and verify the resolution [R28b].
- **Agile in regulated delivery.** AAMI TIR45 (2012; second edition 2023) is guidance for applying agile practices to medical device software. It references IEC 62304 activity numbering and ISO 13485 [R31][R32]. It is a technical information report, not a standard [R32].
- **FDA.** The June 2023 guidance "Content of Premarket Submissions for Device Software Functions" replaces the Level of Concern approach with **Basic** and **Enhanced** *Documentation Levels*, and it superseded the 2005 guidance [R39].
- **Edition 2 status.** The first Edition 2 attempt was withdrawn around 2021/2022. Reported changes in the current revision are a scope expanded to health software and simplified safety classification (from three classes to two). Sources disagree on timing. Some report an FDIS stage in 2026, others a second Committee Draft in mid-2026 [R27][R28c]. Treat the publication date as unconfirmed.
- **Persistence.** For a healthcare buyer, IEC 62304's clause names *are* the vocabulary. A method whose phases and artifacts map one-to-one onto 5.1–5.8 plus clauses 6–9 will be easy to audit.

### 2.8 DO-178C: Software considerations in airborne systems (brief)

| Aspect | Content |
|---|---|
| **Processes** | Software planning process; software development processes (5.1 requirements, 5.2 design, 5.3 coding, 5.4 integration, 5.5 development traceability) [R35]; integral processes (verification, configuration management, quality assurance, certification liaison) [R35a] |
| **Software levels** | A, B, C, D, E, matching catastrophic, hazardous, major, minor and no-effect failure conditions [R33]. Objective counts differ by level. One source gives 71 objectives for Level A, 69 for B, 62 for C, 26 for D and 0 for E, with some counts disputed [R33]. |
| **Roles** | Applicant; certification authority. Verification *independence* is required for many Level A/B objectives [R33].† |
| **Key artifacts** | Five plans: Plan for Software Aspects of Certification (PSAC), Software Development Plan (SDP), Software Verification Plan (SVP), Software Configuration Management Plan (SCMP), Software Quality Assurance Plan (SQAP) [R33]. Also high-level and low-level requirements, design description, source code, trace data, verification cases/procedures/results, Software Configuration Index (SCI), Software Accomplishment Summary (SAS) [R33][R35]. |
| **Checkpoints** | Four Stages of Involvement: SOI-1 planning, SOI-2 development, SOI-3 verification, SOI-4 certification [R34]. The certification authority sets the level of involvement (FAA AC 20-115C) [R34]. The SOI scheme comes from FAA practice (Order 8110.49), not from DO-178C's own text.† |
| **Iteration model** | Neutral, provided the objectives are met. |
| **Tailoring** | By software level, through the objectives tables (Annex A).† |
| **Core guide size** | About 140 pages, plus supplements DO-330 (tool qualification), DO-331 (model-based), DO-332 (object-oriented) and DO-333 (formal methods).† |

**Notes.** DO-178C is the strictest example of bidirectional traceability and structural coverage (MC/DC at Level A) [R35]. **DO-330 (tool qualification)** is the closest existing framework for treating an *AI agent as a development tool* whose output must be verified or whose tool must be qualified.†

---

## 3. Cross-method comparison

| Method | Type | Iteration model | Rigor scaling / tailoring | Names job roles? | Core reading load |
|---|---|---|---|---|---|
| ISO/IEC/IEEE 12207:2017 | Process reference standard | Neutral | Tailoring clause; full or tailored conformance | No (parties) | ~150 pp. standard† |
| ISO/IEC/IEEE 15288 / 24748-1 | System processes / life cycle stages | Neutral | Tailoring | No | Standards |
| SWEBOK v4 | Body of knowledge | Neutral | N/A | No | 413 pp. [R11] |
| Waterfall (Royce) | Paper / model | Sequential in popular use; Royce urged feedback and "do it twice" | Implicit | Informal | 11 pp.† |
| V-model | Model | Sequential, applicable per increment | Informal | No | Diagram |
| V-Modell XT | Full process model | Configurable (incremental, agile) | Formal tailoring by project type and modules | Yes | Hundreds of pages, 108 products [R23] |
| Spiral | Model | Iterative, risk-driven | Risk sets the depth | Stakeholders | ~20 pp. + SEI report |
| RUP / OpenUP | Process framework | Iterative-incremental within 4 phases | Development Case | Yes (~30 roles) | Very large (RUP); small (OpenUP) |
| IEC 62304 | Regulatory standard | Neutral (model in the plan) | Safety class A/B/C | No (manufacturer) | ~80 pp.† |
| DO-178C | Regulatory guidance | Neutral | Levels A–E | Applicant/authority; independence | ~140 pp. + supplements† |

**Pattern.** The *standards* (12207, 62304, DO-178C) are compact, neutral about life cycle model, and organized by process and outcome. The *frameworks* (RUP, V-Modell XT) add roles, phases and templates, and they became heavy. The *models* (Waterfall, V, Spiral) are diagrams that left lasting vocabulary. An AI-assisted method has the best chance of looking credible if it is compact like a standard, gives the concrete guidance of a framework without the bulk, and uses the models' vocabulary.

---

## 4. Vocabulary frequency tables

Methods counted (8): **12207** (with 15288), **SWEBOK**, **Royce** (Waterfall, with the MIL-STD review vocabulary noted separately), **V** (generic V-model and V-Modell XT), **Spiral**, **RUP** (with OpenUP), **62304**, **DO-178C**. A term counts if it appears as a process, phase, activity, discipline, KA or step name in that method. **★ = used by 3 or more methods (standard vocabulary).**

### 4.1 Phase / stage / process / activity names

| Term | Methods using it | Count | |
|---|---|---|---|
| **Requirements** (definition / analysis / specification) | 12207, SWEBOK, Royce, V, Spiral, RUP, 62304, DO-178C | 8 | ★ |
| **Design** (incl. detailed design, program design) | 12207 (Design Definition), SWEBOK, Royce (Program Design), V, Spiral, RUP (Analysis and Design), 62304, DO-178C | 8 | ★ |
| **Architecture** / architectural design | 12207, SWEBOK, V, Spiral (LCA), RUP (LCA milestone, SAD), 62304, DO-178C (within design) | 7 | ★ |
| **Testing / Test** | SWEBOK, Royce, V, Spiral, RUP, 62304 (integration testing, system testing), DO-178C (within verification) | 7 | ★ |
| **Integration** | 12207, V, Spiral, RUP (Integrator role), 62304, DO-178C, SWEBOK (topic) | 7 | ★ |
| **Verification** | 12207, SWEBOK (Quality KA), V, Spiral ("develop, verify"), 62304 (unit verification), DO-178C | 6 | ★ |
| **Planning** (project / development / software planning) | 12207, Spiral, RUP (Project Management), V-Modell XT, 62304 (5.1), DO-178C | 6 | ★ |
| **Configuration management** | 12207, SWEBOK, RUP, V-Modell XT, 62304, DO-178C | 6 | ★ |
| **Implementation** | 12207, RUP (discipline), 62304 (unit implementation), V (coding/implementation) | 4 | ★ |
| **Coding / Code** | Royce, V, Spiral, DO-178C | 4 | ★ |
| **Risk management / risk analysis** | 12207, Spiral, RUP (Risk List), 62304, V-Modell XT | 5 | ★ |
| **Quality assurance / quality management** | 12207, SWEBOK (Software Quality), V-Modell XT, DO-178C | 4 | ★ |
| **Validation** | 12207, SWEBOK, V, Spiral | 4 | ★ |
| **Operation(s)** | 12207, SWEBOK (Operations KA), Royce | 3 | ★ |
| **Maintenance** | 12207, SWEBOK, 62304 (clause 6) (Spiral: "enhancement") | 3 | ★ |
| **Release** | 62304 (5.8), RUP (Product Release), SWEBOK (release management in SCM) | 3 | ★ |
| **Problem resolution / problem reporting** | 12207:2008, 62304 (clause 9), DO-178C (problem reports) | 3 | ★ |
| **Acceptance** (testing / completed) | V, V-Modell XT gate, Spiral (acceptance test), Royce (acceptance review) | 3 | ★ |
| **Construction** | SWEBOK (KA), RUP (phase) | 2 | |
| **Transition** | 12207 (process), RUP (phase) | 2 | |
| **Deployment** | RUP (discipline), SWEBOK (within Operations) | 2 | |
| **Analysis** (as a separate step) | Royce, RUP (Analysis and Design), 12207 (System Analysis) | 3 | ★ (ambiguous meaning) |
| **Disposal / Retirement** | 12207 (Disposal), 24748-1 (Retirement) | 1–2 | |
| **Inception / Elaboration** | RUP only | 1 | |
| **Business or Mission Analysis / Business Modeling** | 12207, RUP | 2 | |

### 4.2 Role names

| Term | Methods using it | Count | |
|---|---|---|---|
| **Stakeholder** | 12207, Spiral, RUP/OpenUP | 3 | ★ |
| **Customer / Acquirer** (with Supplier) | Royce (customer), 12207 (acquirer, supplier), V-Modell XT (acquirer/supplier projects) | 3 | ★ |
| **Project Manager** | RUP, OpenUP, V-Modell XT (SWEBOK Management KA covers the function) | 3 (counting OpenUP with RUP, 2 independent) | ★ (borderline) |
| **Architect** (Software / System) | RUP, OpenUP, V-Modell XT, SWEBOK (Architecture KA) | 3 | ★ |
| **Analyst** (System Analyst) / **Requirements Engineer** | RUP (System Analyst), OpenUP (Analyst), V-Modell XT (Requirements Engineer), SWEBOK (requirements engineering) | 3 | ★ |
| **Developer / Implementer** | RUP (Implementer), OpenUP (Developer), V-Modell XT (Developer), DO-178C (developer vs. verifier) | 3 | ★ |
| **Tester / Test Designer / Evaluator** | RUP, OpenUP, V-Modell XT, V-model (independent test levels) | 3 | ★ |
| **Configuration Manager** | RUP, V-Modell XT | 2 | |
| **Quality Manager / QA** | V-Modell XT, DO-178C (SQA), 12207 (QA process) | 3 | ★ (as a function) |
| **Designer** | RUP | 1 | |
| **Independent verifier / reviewer** | DO-178C (independence), IEEE 1012 (IV&V), V-model (independent test) | 3 | ★ (as a function) |
| **Manufacturer / Applicant / Certification authority** | 62304 (manufacturer), DO-178C (applicant, authority) | 2 | (regulatory parties) |

**Observation.** No role title is used by *all* methods. The standards name **functions** (requirements, architecture, verification, QA, CM) and **parties** (acquirer, supplier, manufacturer). The recurring titles (Analyst, Architect, Developer, Tester, Project Manager, Stakeholder) come mainly from the UP family and V-Modell XT.

### 4.3 Artifact (work product) names

| Term | Methods using it | Count | |
|---|---|---|---|
| **Requirements specification** (SRS / software requirements) | Royce, V, 12207/29148 (SRS, StRS, SyRS), RUP (Use-Case Model + Supplementary Specifications), 62304, DO-178C (requirements data) | 6 | ★ |
| **Test plan / test specification / test report (results)** | Royce, V, Spiral (test plan), RUP, 62304 (test records), DO-178C (verification cases, procedures, results) | 6 | ★ |
| **Design specification / design description / design model** | Royce, V, RUP (Design Model), 62304 (detailed design), DO-178C (Design Description), V-Modell XT | 6 | ★ |
| **Architecture document / description** | RUP (Software Architecture Document), 62304 (software architecture), DO-178C (in Design Description), V-Modell XT, Spiral (LCA package) | 5 | ★ |
| **Software Development Plan** (exact term) | RUP, 62304, DO-178C | 3 | ★ |
| **Configuration management plan** | Spiral, RUP, DO-178C (SCMP), 62304 (CM planning in the SDP) | 4 | ★ |
| **Risk list / risk management file / risk analysis** | Spiral, RUP, OpenUP, 62304 (with ISO 14971), V-Modell XT | 4 | ★ |
| **Traceability (matrix / trace data)** | V, RUP, 62304, DO-178C, 12207 (outcome) | 5 | ★ |
| **Problem report / change request / anomaly list** | RUP (Change Request), 62304 (problem reports, known residual anomalies), DO-178C (Problem Reports), 12207 | 4 | ★ |
| **User / operating documentation** | Royce (operating instructions), RUP (user support material), 62304 (release documentation), V-Modell XT | 4 | ★ |
| **Release record / release notes / accomplishment summary** | 62304 (release record), RUP (Release Notes), DO-178C (SAS, SCI) | 3 | ★ |
| **Verification plan** | DO-178C (SVP), IEEE 1012 (SVVP), 62304 (within SDP), V-Modell XT (evaluation specification) | 3–4 | ★ |
| **Quality assurance plan** | DO-178C (SQAP), V-Modell XT (QA manual), 12207 (QA process) | 3 | ★ |
| **Maintenance plan** | 62304 (Software Maintenance Plan), 12207 (Maintenance process) | 2 | |
| **Iteration plan** | RUP, OpenUP, V-Modell XT ("Iteration Scheduled" gate) | 2–3 | |
| **Vision** | RUP, OpenUP | 2 | |
| **Business case** | RUP, 12207 (Business or Mission Analysis) | 2 | |
| **SOUP list / third-party inventory** | 62304 | 1 | (domain-critical) |
| **Prototype** | Royce (pilot model), Spiral, RUP (architectural prototype) | 3 | ★ |
| **Baseline** (configuration baseline) | 12207, MIL-STD (functional/allocated/product), RUP (milestone baselines), DO-178C, 62304 (configuration items) | 4+ | ★ |

### 4.4 Checkpoint / milestone / review names

| Term | Methods using it | Count | |
|---|---|---|---|
| **Milestone** (generic) | RUP, Spiral (anchor point milestones), V-Modell XT (milestone = decision gate), Royce (reviews as milestones) | 4 | ★ |
| **Review** (design review, technical review) | Royce, MIL-STD-1521B, V, DO-178C (reviews and analyses), 62304 (verification of architecture/design), Spiral (review and commitment) | 6 | ★ |
| **Acceptance** (acceptance test / review / completed) | Royce, V, V-Modell XT, Spiral, 12207 (Transition/agreement) | 5 | ★ |
| **Release** (Product Release / software release) | RUP, 62304, SWEBOK | 3 | ★ |
| **Plan approval** (Project Approved / SOI-1 / LCO) | V-Modell XT, DO-178C, RUP/Spiral (LCO) | 3 | ★ (concept) |
| **Lifecycle Objectives (LCO)** | Spiral (anchor points), RUP | 2 | (recognized pair) |
| **Lifecycle Architecture (LCA)** | Spiral, RUP | 2 | (recognized pair) |
| **Initial Operational Capability (IOC)** | Spiral, RUP (also U.S. DoD acquisition) | 2–3 | |
| **Preliminary / Critical Design Review (PDR / CDR)** | MIL-STD-1521B, Royce (preliminary / critical review), NASA practice | 2–3 | ★ (defense/space) |
| **Test Readiness Review (TRR)** | MIL-STD-1521B | 1 | |
| **Decision gate** | V-Modell XT, 24748-1 (decision gates between stages)† | 2 | |
| **Stage of Involvement (SOI)** | DO-178C practice | 1 | |
| **Audit** (functional / physical configuration audit, conformity review) | MIL-STD (FCA, PCA), DO-178C (conformity review), 12207:2008 (audit process) | 3 | ★ |

---

## 5. What persists in modern practice, and where

| Persisting practice | Origin | Where it is mandatory or dominant today | Evidence |
|---|---|---|---|
| **Bidirectional requirements traceability** | V-model; DoD standards; 12207 outcomes | Medical (62304 5.1.1 c: system requirements → software requirements → system testing), aviation (DO-178C 5.5 development traceability), automotive | [R29][R35][R17] |
| **Verification paired with every specification level** (V&V pairing) | V-model | Medical, aviation, automotive, rail. Agile teams achieve it by writing acceptance tests together with acceptance criteria. | [R17][R38] |
| **Risk-based rigor scaling** | Spiral (risk-driven); safety standards | 62304 Classes A/B/C; DO-178C Levels A–E; IEEE 1012 integrity levels; FDA Basic/Enhanced | [R28a][R33][R38][R39] |
| **Milestones as decision and commitment points** | Royce reviews; MIL-STD-1521B; Spiral anchor points; RUP | Defense and space (SRR/PDR/CDR/TRR), government (V-Modell XT gates), aviation (SOIs), enterprise portfolio stage gates | [R36][R18a][R21][R24][R34] |
| **Written plans that record the chosen life cycle and tailoring** | 12207 tailoring; RUP Development Case; V-Modell XT tailoring | 62304 Software Development Plan; DO-178C PSAC/SDP | [R30][R33][R27b][R25] |
| **Configuration management and baselines** | DoD; 12207 | All regulated domains (62304 clause 8; DO-178C SCMP/SCI) | [R28][R33] |
| **Problem resolution with documented residual anomalies** | 12207 support processes | 62304 clause 9 and the release record of known residual anomalies | [R28b][R30] |
| **Third-party / unknown-provenance software controls** | 62304 SOUP | Medical; increasingly software supply chain generally (SBOMs) | [R28b] |
| **Iterative-incremental execution inside a compliant process** | Royce's "do it twice"; Spiral; RUP | Accepted in medical devices through AAMI TIR45; V-Modell XT agile strategies | [R15][R31][R32][R22] |
| **Activity vocabulary** (requirements, architecture, design, construction, testing, operations, maintenance) | Royce through SWEBOK | Universal: curricula, certifications, job descriptions | [R9][R14] |

**What faded.**
1. Strictly sequential, document-complete phase transitions (popular waterfall).
2. Very large prescriptive frameworks (full RUP, full V-Modell XT outside government) [R41].
3. Fixed phase effort percentages used as plans.

Even in the most regulated domains, the *evidence* requirements persisted while *sequencing* became free. Regulators audit outcomes and records, not calendars.

---

## 6. Implications for an AI-assisted method (Agentic SDLC)

The recommendations below are ordered by impact on credibility with engineers, auditors and a healthcare buyer.

### R1. Name the activity areas with the standard activity words, and nothing invented
Use the eight-method consensus terms as the top-level names: **Planning, Requirements, Architecture, Design, Implementation, Testing (Verification), Release, Operations, Maintenance**, plus the supporting processes **Configuration Management, Risk Management, Quality Assurance, Problem Resolution** (Section 4.1, all ★). If a new concept is needed (for example "agent orchestration"), describe it as an *activity inside* one of these areas, not as a new top-level label. Reserve RUP-specific terms (Inception, Elaboration) for cases where the method actually adopts RUP semantics.

### R2. Separate *activities* (what) from *stages and milestones* (when)
Every durable method separates content from time: the RUP phases × disciplines grid [R21][R27a], 12207's processes versus 24748-1's stages [R1][R7], and V-Modell XT's process modules versus decision gates [R22]. Adopt that model. Activity areas can recur in every iteration. A small number of milestones mark commitment. Then the same method serves a one-hour bug fix (one pass through Requirements → Implementation → Testing → Release) and a multi-month product (many iterations between milestones). State explicitly, as 12207 does, that the method does not impose a sequential life cycle [R1].

### R3. Use recognized milestone names, each defined as a decision with entry and exit evidence
Recommended milestone set, with lineage:

| Agentic SDLC milestone | Recognized equivalent | Decision |
|---|---|---|
| **Plan Approved** | V-Modell XT "Project Approved"; DO-178C SOI-1; RUP/Spiral **Lifecycle Objectives** | Scope, risk class and life cycle plan accepted |
| **Requirements Baseline** | MIL-STD SRR/SSR; V-Modell XT "Requirements Specified" | Requirements reviewed and placed under change control |
| **Architecture Review** | RUP/Spiral **Lifecycle Architecture**; PDR | Architecture and key risks resolved enough to build |
| **Design Review** (only when the risk class requires it) | CDR; 62304 5.4 (Class C) | Detailed design verified |
| **Test Readiness / Verification Complete** | TRR; DO-178C SOI-3 | All planned verification executed; traceability complete |
| **Release Approved** | RUP **Product Release**; 62304 5.8 Software release; V-Modell XT "Acceptance Completed" | Release record, known anomalies and sign-off done |

Each milestone needs named input artifacts, criteria, and a recorded decision (approve / rework / stop). That makes AI-produced work auditable.

### R4. Use standard artifact names, and map them to IEC 62304 and 12207
Prefer: **Software Development Plan** (exact term in RUP, 62304 and DO-178C), **Software Requirements Specification**, **Software Architecture Document** (or "architecture description"), **Detailed Design**, **Test Plan** and **Test Report**, **Traceability Matrix**, **Risk Register** (or Risk List), **Problem Report**, **Release Notes / Software Release Record** (with *known residual anomalies*), **Maintenance Plan**, and **Architecture Decision Records** (modern but widely recognized). Ship an appendix table mapping each artifact to the 62304 clause (5.1–5.8, 6–9) and the 12207 process it evidences. That one table does most of the work of convincing a regulated buyer.

### R5. Define roles as responsibilities that a human or an agent can fill, with human accountability for decisions
Following RUP ("roles describe responsibilities", not people [R27a]) and the standards' function-based framing, use familiar titles: **Stakeholder** (or Product Owner, if the agile audience matters), **Project Manager**, **Analyst** (Requirements Engineer), **Architect**, **Developer**, **Tester**, **Reviewer** (Independent Verifier), **Configuration Manager** and **Quality Assurance**. For each role, state whether an AI agent may perform it, assist with it, or must not perform it. Milestone approvals and release sign-off stay with a named human. That matches the regulatory notion of an accountable manufacturer or applicant.

### R6. Build in independence of verification
DO-178C requires independence for high-level objectives [R33]. IEEE 1012 scales V&V tasks by integrity level [R38]. The V-model separates test design from development [R17]. The AI translation: **the agent or context that verifies must not be the one that authored the work**. Use a fresh context, a different prompt or role, or a human reviewer, scaled by risk class. Name this practice "independent verification" or "independent review", not a coined term.

### R7. Size and tailor work by risk class, using a familiar scheme
Do not invent route names. Adopt a **three-level rigor scheme modelled on IEC 62304 Classes A/B/C** (with DO-178C levels and FDA Basic/Enhanced as cross-references) [R28a][R33][R39]. Each level switches activities and artifacts on or off. For example, Detailed Design and Design Review are required only at the highest level, mirroring 62304 5.4 [R29]. Record the chosen level and any tailoring in the Software Development Plan, as 12207 tailoring and the RUP Development Case do [R4][R27b]. A healthcare buyer will recognize this immediately. Note that 62304 Edition 2 may move to two classes [R28c], so keep the mapping table editable.

### R8. Make traceability and V&V pairing automatic, the AI's strongest contribution
Give every requirement an ID. Require that each requirement's verification method (acceptance test, integration test, review) is defined *when the requirement is written*, which is the V-model pairing [R17]. Agents should keep a bidirectional Traceability Matrix (requirement → design element → code change → test → result → release) as a by-product of normal work. This is the evidence 62304 (5.1.1 c, 5.7) and DO-178C (5.5) demand [R29][R35], and it is the evidence humans most often fail to keep current.

### R9. Treat AI-generated code and AI tools under existing control categories
Map AI output onto concepts auditors already accept. Third-party dependencies and model-generated code that is not fully reviewed resemble **SOUP** (62304): list them, specify requirements for them, and verify them [R28b][R30]. The AI agents themselves are **development tools**, whose output is either fully verified or whose use is justified, following DO-330 tool qualification thinking.† Record agent and model versions under **Configuration Management** so builds are reproducible.

### R10. Keep the core guide short, with an iterative default and a compliance appendix
RUP declined partly because its guidance grew "unwieldy" [R41]. V-Modell XT defines 108 products [R23]. SWEBOK runs to 413 pages [R11]. The compact standards (62304 at about 80 pages) are the better model. Target a core guide a developer can read in under an hour: one page for the activity × milestone grid, one page per activity area, one page each for roles and the rigor-level table. Put standard mappings (12207, 62304, DO-178C, SWEBOK KAs) in appendices. Default to iterative-incremental delivery (Royce's "do it twice", Spiral, RUP, TIR45) [R15][R18a][R21][R31], and say so in the first paragraph so no one reads the activity list as a waterfall.

---

## 7. References

Access date for all: 2026-11-20. Excerpts came from web search results. Full-page fetching was blocked for several hosts in this session.

- **[R1]** ISO/IEC/IEEE 12207:2017 preview (iTeh sample PDF). https://cdn.standards.iteh.ai/samples/63712/0bc6d9107eeb46d88dbc7b628b12cf4b/ISO-IEC-IEEE-12207-2017.pdf ; also https://www.normservis.cz/download/view/iec/info_isoiecieee12207%7Bed1.0%7Den.pdf
- **[R2]** ISO/IEC 12207 overview (Wikipedia) and table of contents excerpt. https://en.wikipedia.org/wiki/ISO/IEC_12207 ; https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiecieee12207{ed1.0}en.pdf
- **[R3]** IEEE Standards listing showing 12207-2017 superseded by 12207-2026 (via search); arc42 summary. https://quality.arc42.org/standards/iso12207 ; https://www.wikiwand.com/en/articles/IEEE_12207
- **[R4]** 12207:2017 catalog/table of contents (technical management 6.3.1–6.3.7; 5.5.4 Tailoring). https://standards.iteh.ai/catalog/standards/iso/6b5ad16c-6696-447d-aa76-18202d695a05/iso-iec-ieee-12207-2017
- **[R5]** ISO/IEC/IEEE 15288:2023 preview (VDE) and catalog. https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiecieee15288{ed2.0}en.pdf ; https://standards.iteh.ai/catalog/standards/iso/4109ef6c-8070-4ebe-89d8-c45ae8413981/iso-iec-ieee-15288-2023
- **[R6]** ANSI blog on 15288:2023; SEBoK page. https://blog.ansi.org/ansi/iso-iec-ieee-15288-2023-system-life-cycle-processes/ ; https://sebokwiki.org/wiki/ISO/IEC/IEEE_15288
- **[R7]** ISO/IEC/IEEE 24748-1:2024. https://www.iso.org/standard/84709.html ; https://webstore.ansi.org/preview-pages/ISO/preview_ISO+IEC+IEEE+24748-1-2024.pdf
- **[R8]** IEEE Computer Society SWEBOK page. https://www.computer.org/education/bodies-of-knowledge/software-engineering
- **[R9]** SWEBOK v4 study notes listing the 18 KAs; SWEBOK v4 Wikipedia entry. https://github.com/HenrikSamuelsson/reading-swebok-v4 ; https://en.wikipedia.org/wiki/Software_Engineering_Body_of_Knowledge
- **[R10]** SWEBOK v4 topics page; SFIA mapping. https://computer.org/education/bodies-of-knowledge/software-engineering/topics ; https://sfia-online.org/en/tools-and-resources/bodies-of-knowledge/swebok-software-engineering-body-of-knowledge/swebok4-sfia9-the-guide-to-the-software-engineering-body-of-knowledge
- **[R11]** t2informatik, "What is SWEBOK?" (413 vs 335 pages). https://t2informatik.de/en/smartpedia/swebok/
- **[R12]** SWEBOK v4 download page. https://computer.org/education/bodies-of-knowledge/software-engineering/v4
- **[R13]** Winston W. Royce (Wikipedia): term "waterfall" not used; Bell and Thayer 1976. https://en.wikipedia.org/wiki/Winston_W._Royce
- **[R13a]** Royce (1970), "Managing the Development of Large Software Systems", reprint copies. https://faculty.washington.edu/hazeline/misc/reserve/royce_waterfall.pdf ; https://cs.huji.ac.il/~feit/sem/se09/Waterfall.pdf
- **[R14]** M. Todorovich, "A Summary of the Waterfall Paper". https://medium.com/@milo.todorovich/a-summary-of-the-waterfall-paper-ae9153788d1
- **[R15]** ProjectManagement.com, "The Waterfall Misconception: What Dr. Royce Really Said in 1970". https://www.projectmanagement.com/blog-post/80348/the-waterfall-misconception--what-dr--royce-really-said-in-1970 ; arXiv history of waterfall: https://arxiv.org/html/2510.03894v3
- **[R16a]** Larman and Basili (2003), "Iterative and Incremental Development: A Brief History", IEEE Computer. https://condor.depaul.edu/~dmumaugh/readings/handouts/SE477/IIDI.pdf ; https://mosaicprojects.com.au/PDF-Gen/History_of_Iterative_and_Incremental_Development.pdf
- **[R17]** V-model sources: Qt, "The V-Model in Software Testing"; V-model (Wikipedia); University of Szeged course. https://www.qt.io/quality-assurance/blog/the-v-model-in-software-testing ; https://en.wikipedia.org/wiki/V-model_(software_development) ; https://okt.inf.szte.hu/projektmunka/en/advanced_topic/applying_v_model.html
- **[R18a]** Spiral model (Wikipedia): 1986/1988 publication; anchor points added later; LCO/LCA/IOC; RUP mapping. https://en.wikipedia.org/wiki/Spiral_model
- **[R19]** Boehm, "Spiral Development: Experience, Principles, and Refinements", CMU/SEI-2000-SR-008. https://apps.dtic.mil/sti/pdfs/ADA382590.pdf ; Boehm 1988 reprint: https://faculty.washington.edu/hazeline/misc/reserve/boehm_spiralmodel.pdf
- **[R20]** Spiral quadrant descriptions: Tutorialspoint; IONOS; Open University. https://www.tutorialspoint.com/adaptive_software_development/sdlc_spiral_model.htm ; https://www.ionos.com/digitalguide/startup/productivity/spiral-model.md ; https://www.open.edu/openlearn/science-maths-technology/approaches-software-development/content-section-2.3.2
- **[R21]** RUP phases and milestones: UHCL course handout; IBM whitepaper TP-xtalk (effort/schedule split). https://sceweb.sce.uhcl.edu/helm/REQ_ENG_WEB/My-Files/mod1/rupro/phasesmilestones.pdf ; https://public.dhe.ibm.com/software/rational/web/whitepapers/2003/xtalk.pdf ; https://home.iscte-iul.pt/~hro/RUPSmallProjects/core.base_rup/customcategories/rup_lifecycle_100BF298.html
- **[R22]** V-Modell XT Bund 2.3 (ITZBund); TU München papers on V-Modell XT tailoring. https://www.itzbund.de/static/download/Produkte/VMXT/V-Modell-XT-Bund-2.3.pdf ; https://wwwbroy.in.tum.de/publ/papers/Kuhr05.pdf
- **[R23]** Projektron, "V-Modell XT" (2025) (108 products; version 2.3, 2019). https://www.projektron.de/en/blog/details/v-modell-xt-4051/
- **[R24]** V-Modell XT English V1.3 documentation; t2informatik, "Decision gate". https://ftp.heise.de/ix/ix_listings/projektmanagement/vmodell/V-Modell-XT-Gesamt-Englisch-V1.3.pdf ; https://t2informatik.de/en/smartpedia/decision-gate/
- **[R25]** FU Berlin lecture "V-Modell" (tailoring); t2informatik, "What is a Project Execution Strategy?". https://www.inf.fu-berlin.de/inst/ag-se/teaching/V-SWT2-2023/02_vmodell.pdf ; https://t2informatik.de/en/?p=21704
- **[R26]** Unified Process / RUP (Wikipedia); Open University section 3.3. https://www.wikipedia.org/wiki/Unified_Process ; https://www.open.edu/openlearn/science-maths-technology/approaches-software-development/content-section-3.3
- **[R27a]** IBM RUP knowledge base pages: "The Underlying Model of the RUP"; RUP overview and core workflows. https://cin.ufpe.br/~if682/RUP/process/workflow/environm/co_morop.htm ; https://cin.ufpe.br/~if682/RUP/process/workflow/ovu_core.htm ; https://cin.ufpe.br/~if682/RUP/process/ovu_proc.htm
- **[R27b]** RUP roles and artifacts: RUP "Process Essentials"; Business Case artifact page; RUP lecture slides. https://cin.ufpe.br/~if682/RUP/manuals/intro/im_esstl.htm ; https://cin.ufpe.br/~if682/RUP/process/artifact/ar_bcase.htm ; https://home.iscte-iul.pt/~hro/RUPSmallProjects/core.base_rup/guidances/supportingmaterials/process_essentials_C18A2AB2.html
- **[R27]** IEC 62304 Edition 2 status: Critical Software; VDE. https://criticalsoftware.com/en/newsroom/iec-62304-edition-2-changes ; https://www.vde.com/topics-en/health/expertise/iec-62304-edition-2-changes
- **[R28]** IEC 62304 (Wikipedia); IEC 62304:2006+AMD1:2015 preview (ANSI). https://en.wikipedia.org/wiki/IEC_62304 ; https://webstore.ansi.org/preview-pages/IEC/preview_iec62304%7Bed1.1%7Den.pdf
- **[R28a]** MathWorks, "IEC 62304" (class definitions and classification basis). https://www.mathworks.com/discovery/iec-62304.html
- **[R28b]** IEC 62304 checklist summaries (SOUP, problem resolution, maintenance plan, default Class C). https://www.slideshare.net/slideshow/iec62304checklistpdf/258780350 ; https://casrai.org/guides/iec-62304
- **[R28c]** Johner Institute, "IEC 62304 2nd edition: all areas of application and changes"; NSF on the Edition 2 draft. https://blog.johner-institute.com/iec-62304-medical-software/iec-62304-2nd-edition-all-areas-of-application-and-changes/ ; https://www.nsf.org/th/en/life-science-news/iec-62304-draft-of-the-2nd-edition-optimized-safety-classes-extended-scope-for-healthcare-software-and-ai
- **[R29]** IEC 62304 clause 5 titles (ANSI preview, Ed. 1.1) and traceability in 5.1.1 c (LDRA white paper; Innolitics plan). https://webstore.ansi.org/preview-pages/IEC/preview_iec62304%7Bed1.1%7Den.pdf ; https://ldra.com/wp-content/uploads/2023/08/IEC_62304-1-2006_White_Paper_v3.pdf ; https://innolitics.com/pdf/software_plan.pdf
- **[R30]** IEC 62304 deliverables summaries: CASRAI checklist; Greenlight Guru; Freyr. https://casrai.org/guides/iec-62304-checklist ; https://www.greenlight.guru/blog/iec-62304-compliance-what-to-build-first ; https://www.freyrsolutions.com/blog/iec-62304-compliance-the-complete-guide-to-medical-device-software-development-without-the-pitfalls.md
- **[R31]** AAMI, "Key Updates: AAMI TIR45:2023". https://www.aami.org/training/training-suites/expert-insights-from-aami-training/key-updates-aami-tir45-2023-guidance-on-agile-practices
- **[R32]** Johner Institute, "TIR 45 agile software development"; Greenlight Guru on TIR45. https://blog.johner-institute.com/iec-62304-medical-software/tir-45-agile-software-development/ ; https://www.greenlight.guru/blog/aami-tir45
- **[R33]** AFuzion DO-178C introduction; Wind River "What is DO-178C?". https://afuzion.com/do-178-introduction-ad/ ; https://www.windriver.com/solutions/learning/do-178c
- **[R34]** Rapita Systems, "DO-178C SOI planning (Stage of Involvement 1)"; FAA AC 20-115C. https://www.rapitasystems.com/blog/do-178c-SOI-planning-stage-involvement-1 ; https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_20-115C.pdf
- **[R35]** FAA DO-178B/C differences tool (sections 5.1–5.5); LDRA DO-178C technical briefing; Rapita verification white paper. https://www.faa.gov/sites/faa.gov/files/aircraft/air_cert/design_approvals/air_software/differences_tool.pdf ; https://ldra.com/wp-content/uploads/ldra/DO-178C-Technical-Briefing-v2.1.pdf ; https://rapitasystems.com/files/MC-WP-011%20DO-178C%20Verification_5.pdf
- **[R35a]** Parasoft, DO-178C overview (integral processes). https://www.parasoft.com/blog/what-is-
- **[R36]** MIL-STD-1521B listings (appendices SRR, SDR, SSR, PDR, CDR, TRR, FCA, PCA); SEI paper on agile adaptation of milestone reviews. https://shop.standards.ie/en-ie/standards/mil-std-1521-revision-b-1985-732566_saig_mil_mil_1700282 ; https://www.intertekinform.com/en-gb/standards/mil-std-1521-revision-b-1985-732566_saig_mil_mil_1700282/ ; https://www.sei.cmu.edu/documents/551/2017_019_001_887054.pdf
- **[R37]** ISO/IEC/IEEE 29148 tables of contents (BRS, StRS, SyRS, SRS). https://www.din.de/de/mitwirken/normenausschuesse/nia/veroeffentlichungen/wdc-beuth:din21:299567544/toc-3025650/download ; https://webstore.iec.ch/p-preview/info_isoiecieee29148%7Bed1.0%7Den.pdf
- **[R38]** IEEE 1012-2016 (integrity levels, minimum V&V tasks). https://standards.ieee.org/ieee/1012/5609 ; https://driftsys.github.io/refhub/refs/software-engineering/ieee-1012.html
- **[R39]** FDA, "Content of Premarket Submissions for Device Software Functions" (June 2023); RAPS summary. https://www.fda.gov/regulatory-information/search-fda-guidance-documents/content-premarket-submissions-device-software-functions ; https://www.raps.org/resource/fda-revamps-device-software-premarket-submissions.html
- **[R40]** Eclipse OpenUP 1.5.1.5 published site; OpenUP "Minimal, Complete, and Extensible". https://archive.eclipse.org/epf/downloads/OpenUP/published/openup_published_1.5.1.5_20121212/openup/noapplet/navigation_view_generic_E58995AE.html ; https://www.utm.mx/~caff/doc/OpenUPWeb/openup/guidances/supportingmaterials/minimal_complete_extensible_3AF278BB.html
- **[R41]** S. Ambler, "What Happened to RUP?"; Forrester, "IBM Transitions RUP to RUP 2.0"; arXiv comparison of methodologies. https://scottambler.com/what-happened-to-rup/ ; https://www.forrester.com/report/ibm-transitions-rup-to-rup-20-but-is-not-quite-there-yet/RES56142 ; https://arxiv.org/pdf/1704.07469
