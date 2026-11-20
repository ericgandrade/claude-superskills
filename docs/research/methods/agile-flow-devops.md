# How Agile, Flow and DevOps Methods Are Structured

**Date:** 2026-11-20
**Purpose:** Evidence base for restructuring the Agentic SDLC (`skills/agentic-sdlc/`). The aim is a method that a developer recognizes at a glance, built from standard software-engineering vocabulary, modern (flow-based, small-batch, feedback-driven) and not waterfall-shaped.
**Scope:** Scrum (2020 Scrum Guide), Kanban (Kanban Guide and Kanban Method), Extreme Programming, SAFe 6, Disciplined Agile Delivery, Shape Up, Lean software development, Continuous Delivery and the DevOps loop, DORA, trunk-based development, Team Topologies and dual-track agile.

> **Source note.** Direct page fetches from `scrumguides.org` and `kanbanguides.org` were blocked by this session's network allowlist. Facts about those two guides come from web-search excerpts of the official pages, from Scrum.org and Kanban University pages, and from widely reproduced guide text. Each claim still links to the primary URL. Claims I could not check against fetched primary text are marked *(unverified against fetched text)*. To re-check them, add `scrumguides.org` and `kanbanguides.org` to the environment's allowed hosts.

---

## 1. Summary

1. **Every successful method has a short, fixed vocabulary.** Scrum uses 3 accountabilities, 5 events, 3 artifacts and 3 commitments, and its guide is under 13 pages ([scrumguides.org/revisions](https://scrumguides.org/revisions.html), [InfoQ](https://www.infoq.com/articles/changes-2020-Scrum-guide)). The Kanban Guide has 3 practices and 4 flow measures ([kanbanguides.org](https://kanbanguides.org/english/)). DORA has 5 metrics ([dora.dev](https://dora.dev/guides/dora-metrics-four-keys)). Methods with large vocabularies (SAFe, Disciplined Agile) are the ones most often criticized as hard to adopt ([Zuehlke](https://www.zuehlke.com/en/node/764), [ProductPlan](https://www.productplan.com/disciplined-agile/)).
2. **Developers already know one shared lifecycle vocabulary**, the DevOps loop: *Plan, Code, Build, Test, Release, Deploy, Operate, Monitor* ([IBM](https://www.ibm.com/think/topics/devops-lifecycle)). It sits alongside the GitHub-flow vocabulary of *branch, commit, pull request, review, merge* ([GitHub Docs](https://docs.github.com/en/get-started/using-github/github-flow)) and the Scrum/Jira vocabulary of *backlog, epic, story, acceptance criteria, Definition of Done* ([Atlassian](https://www.atlassian.com/agile/project-management/epics-stories-themes)).
3. **"Modern" is about structure, not naming.** Small batches, continuous integration into trunk, testing inside the build step, peer review instead of approval boards, keeping deploy separate from release, and production feedback flowing back into the backlog. DORA ties these to delivery performance ([dora.dev capabilities](https://www.dora.dev/capabilities)).
4. **Waterfall is a structure too:** one sign-off per phase, each held by a different role, with a document handed over at each step. The best-known agile critiques say this pattern can creep back into agile methods. Cagan calls it "mini-waterfalls" ([ProductPlan summary](https://www.productplan.com/glossary/dual-track-agile)). Cohn calls a strict Definition of Ready "a huge step towards a sequential, stage-gate approach" ([Mountain Goat](https://mountaingoatsoftware.com/blog/the-dangers-of-a-definition-of-ready)).
5. **What this means for the Agentic SDLC:** describe one work item flowing across a familiar board. Use DevOps-loop stage names, the standard Scrum/Jira artifact names and a Definition of Done. Have about three human decision points with familiar names (approve the plan, approve the pull request, approve the release). Measure with DORA and Kanban flow metrics. Do not use invented stage codes or numbered checkpoints. Section 7 has the concrete recommendations.

---

## 2. Method-by-method profiles

### 2.1 Scrum (2020 Scrum Guide)

| Dimension | Scrum |
|---|---|
| Structure | The **Sprint** is a container event of one month or less. Inside it run **Sprint Planning**, **Daily Scrum**, **Sprint Review** and **Sprint Retrospective** ([Scrum Guide](https://scrumguides.org/scrum-guide.html)) |
| Accountabilities | **Product Owner**, **Scrum Master**, **Developers**, together the **Scrum Team**. The 2020 edition replaced "roles" with "accountabilities" ([Scrum.org](https://www.scrum.org/scrum-guide-2020)) |
| Artifacts and commitments | **Product Backlog** with the **Product Goal**; **Sprint Backlog** with the **Sprint Goal**; **Increment** with the **Definition of Done** ([Scrum.org](https://www.scrum.org/resources/blog/scrum-guide-2020-update-commitments)) |
| Decision points | Sprint Planning (what to commit to), Sprint Review (inspect the Increment and adapt the Product Backlog), Sprint Retrospective (adapt process and Definition of Done) ([Scrum.org](https://www.scrum.org/resources/blog/2020-scrum-guide-definition-done-created-scrum-team)) |
| Cadence and flow | Fixed timebox iterations. Work is pulled into a Sprint at Planning, and the Increment can be released at any time, not only at the end *(unverified against fetched text)* ([Scrum Guide](https://scrumguides.org/scrum-guide.html)) |
| Work entry and priority | The Product Owner orders the Product Backlog. **Product Backlog refinement** is an ongoing activity, not an event ([Scrum.org](https://www.scrum.org/resources/blog/why-isnt-definition-ready-described-scrum-guide)) |
| Quality and readiness | Definition of Done: "a formal description of the state of the Increment when it meets the quality measures required for the product". An organization-wide DoD is the minimum for all teams ([Scrum.org](https://www.scrum.org/resources/blog/2020-scrum-guide-definition-done-created-scrum-team)). There is **no Definition of Ready** in the guide; readiness is handled through refinement ([Scrum.org](https://www.scrum.org/resources/blog/why-isnt-definition-ready-described-scrum-guide)) |
| Newcomer reading | Under 13 pages, cut from about 19 in 2017; deliberately "less prescriptive", for example the three Daily Scrum questions were dropped ([scrumguides.org/revisions](https://scrumguides.org/revisions.html), [InfoQ](https://www.infoq.com/articles/changes-2020-Scrum-guide)) |
| Criticisms | "Dark Scrum": managers use the events to pressure teams ([Ron Jeffries](https://ronjeffries.com/articles/016-09ff/defense)). "Scrummerfall": teams recreate waterfall phases inside a Sprint ([Agile Pain Relief](https://agilepainrelief.com/blog/scrum-team-scrummerfall/)). The DoD fits awkwardly into the commitment concept ([Scrum.org](https://www.scrum.org/resources/blog/scrum-commitments-tying-loose-ends-and-shoehorning-definition-done)). The simplified wording can be vague for newcomers ([InfoQ](https://www.infoq.com/articles/changes-2020-Scrum-guide)) |

**Notes.** Scrum shows how far a tiny, closed vocabulary can go. Each element has exactly one purpose, and each artifact is paired with a commitment that says what "good" means: the goal for the backlog and the DoD for the increment. Scrum says nothing about engineering practice (no CI, no testing, no deployment). Teams usually add XP and CD practices to fill the gap.

### 2.2 Kanban (Kanban Guide, Vacanti and Coleman) and the Kanban Method (Anderson)

| Dimension | Kanban Guide | Kanban Method |
|---|---|---|
| Structure | No phases or events. A **Definition of Workflow (DoW)** covers work-item definition, workflow states, start and finish points, WIP control policy, explicit policies and a **Service Level Expectation (SLE)** ([kanbanguides.org](https://kanbanguides.org/the-kanban-guide/2020.12), [nkdagility summary](https://nkdagility.com/resources/guides/kanban-guide/)) | Six general practices: **visualize, limit WIP, manage flow, make policies explicit, implement feedback loops, improve collaboratively / evolve experimentally** ([Kanban University](https://kanban.university/kanban-guide/), [Wikipedia](https://en.wikipedia.org/wiki/Kanban_(development))) |
| Practices | Three practices: defining and visualizing the workflow, actively managing items in the workflow, improving the workflow *(wording varies by edition)* ([kanbanguides.org](https://kanbanguides.org/english/)) | Feedback loops are run as **cadences** (replenishment, daily Kanban meeting, service delivery review and others) *(cadence names unverified against fetched text)* ([Kanban University](https://kanban.university/kanban-guide/)) |
| Roles | None prescribed | Two optional roles, Service Request Manager and Service Delivery Manager *(unverified against fetched text)* ([Kanban University PDF](https://kanban.university/wp-content/uploads/2023/04/The-Official-Kanban-Guide_A4.pdf)) |
| Artifacts | The Kanban board (a visualization of the DoW) and flow charts | Board, explicit policies, service classes |
| Metrics | **WIP, Throughput, Work Item Age, Cycle Time**, stated as a minimum ([learnsignal summary of the guide](https://www.learnsignal.com/blog/kanban-guide-flow-metrics-wip-limits-explained-guide/)) | Lead time, cycle time, WIP, throughput ([Umbrex](https://umbrex.com/resources/frameworks/organization-frameworks/kanban-method/)) |
| Cadence and flow | Continuous flow; pull system; WIP "must be explicitly controlled" ([kanbanguides.org](https://kanbanguides.org/the-kanban-guide/2020.12)) | Same, with optional cadenced reviews |
| Quality and readiness | Explicit policies per workflow state, which act like a "done" rule for each column. The SLE, for example "85% of items finished in eight days or less", keeps items from aging ([kanbanguides.org](https://kanbanguides.org/the-kanban-guide/2020.12)) | Policies made explicit |
| Newcomer reading | A short guide in the same family as the Scrum Guide ([kanbanguides.org](https://kanbanguides.org/english/)) | Longer body of knowledge (Kanban University) |
| Criticisms | No timebox creates worries about predictability and deadlines; badly chosen WIP limits hurt ([InfoQ](https://www.infoq.com/news/2011/01/myths-of-kanban/), [Mountain Goat](https://www.mountaingoatsoftware.com/agile/when-kanban-is-the-better-choice)). Columns per specialty can encourage silos and handoffs ([Scrum.org](https://www.scrum.org/resources/blog/what-scrum-gets-wrong-about-kanban-and)) | Same |

**Notes.** Kanban's contribution is **a workflow made of states with explicit entry and exit policies**, not phases with sign-offs. The board, for example *Backlog, Ready, In Progress, In Review, Done*, is the most widely recognized picture of software work. The "silos" criticism is relevant to the Agentic SDLC: one column per specialist (one agent per stage) reproduces handoffs.

### 2.3 Extreme Programming (XP)

| Dimension | XP |
|---|---|
| Structure | 1st edition: **Planning Game**, iterations and **Small Releases**. 2nd edition: **Weekly Cycle** and **Quarterly Cycle** ([Agile Alliance](https://agilealliance.org/glossary/xp/), [Wikipedia](https://www.wikipedia.org/wiki/Planning_game)) |
| Roles | Customer (on-site / Whole Team), Programmer, Coach, Tracker, Tester *(role list unverified against fetched text)* ([Microsoft archive](https://learn.microsoft.com/en-us/archive/blogs/jmeier/extreme-programming-xp-at-a-glance)) |
| Practices | **Pair Programming, Test-First / Test-Driven Development, Continuous Integration, Refactoring, Simple Design, Collective Ownership, Coding Standards, Small Releases, Whole Team, Sustainable Pace, Ten-Minute Build** ([Agile Alliance](https://agilealliance.org/glossary/xp/), [InformIT](https://informit.com/articles/article.aspx?p=30187)) |
| Artifacts | **User Stories** (story cards), acceptance (customer) tests, the code and tests themselves |
| Decision points | The Planning Game: the customer chooses stories, developers estimate. The highest-priority, highest-risk stories go into early timeboxed increments, then the team replans ([RIT slides](https://www.se.rit.edu/~swen-356/slides/XPIntro-SE556.pdf)) |
| Cadence | Weekly iterations; integration "multiple times a day" ([Agile Alliance](https://www.agilealliance.org/?p=8031229)) |
| Quality | Tests are written first: "Write failing automated test, run failing test, develop code to make test pass, run test, repeat" ([Microsoft archive](https://learn.microsoft.com/en-us/archive/blogs/jmeier/extreme-programming-xp-at-a-glance)). Acceptance tests define "done" for a story |
| Newcomer reading | *Extreme Programming Explained* (book length); practices are easy to name but demand discipline |
| Criticisms | Pair-programming cost ([InfoQ](https://www.infoq.com/news/2007/01/pair-programming-debate), [Red Gate](https://www.red-gate.com/simple-talk/other/comparing-apples-and-pairs/)). "When XP works well, it works very well, but it doesn't generalize well" (Gartner, in [Computerworld](https://www.computerworld.com/article/2585634/extreme-programming.html)). The practices are meant to be adopted together, not picked one by one ([Asana summary](https://asana.com/resources/extreme-programming-xp.md)) |

**Notes.** XP supplies the engineering vocabulary that every modern developer uses: *TDD, CI, refactoring, pair programming, user story, acceptance test, small releases*. XP has **no separate test phase**; testing is part of writing code. That matters for the Agentic SDLC, which currently has separate Build and Test stages.

### 2.4 SAFe 6 (brief)

| Dimension | SAFe 6 |
|---|---|
| Structure | **Agile Release Train (ART)**, a team of agile teams; **Planning Interval (PI)** of 8–12 weeks, usually four iterations plus an **Innovation and Planning (IP) Iteration** ([SAFe: Program Increment / PI](https://scaledagileframework.com/program-increment), [IP Iteration](https://scaledagileframework.com/innovation-and-planning-iteration)) |
| Events | **PI Planning** (2 days), **System Demo** (every iteration), **Inspect and Adapt (I&A)** (end of the PI), plus team-level iteration events ([SAFe PI Planning](https://scaledagileframework.com/PI-planning)) |
| Roles | **Release Train Engineer (RTE)**, **Product Management**, **System Architect**, **Business Owners**, **Product Owner**, **Scrum Master/Team Coach** (renamed in 6.0) ([Packt, SAFe Coaches Handbook](https://packtpub.com/en-gb/product/safe-coaches-handbook-9781839210457/chapter/chapter-2-building-the-team-3/section/agile-team-roles-and-responsibilities-ch03lvl1sec12)) |
| Artifacts | ART Backlog, Features, Enablers, Stories, **PI Objectives**, ART planning board |
| Decision points | PI Planning ends with a commitment to PI Objectives; Business Owners assign business value; I&A ([SAFe](https://scaledagileframework.com/PI-planning)) |
| Quality | "Built-in Quality", a Definition of Done at several levels; the Continuous Delivery Pipeline (Continuous Exploration, Continuous Integration, Continuous Deployment, Release on Demand) *(CDP terms unverified against fetched text)* ([Full SAFe 6.0 poster](https://ScaledAgileframework.com/wp-content/uploads/delightful-downloads/2023/03/Full_SAFe_6.0_A4.pdf)) |
| Newcomer reading | The "Big Picture" plus a large online knowledge base ([framework.scaledagile.com](https://framework.scaledagile.com/)) |
| Criticisms | "The most complex, heavyweight and restrictive" of the scaling approaches ([Zuehlke](https://www.zuehlke.com/en/node/764)); long criticism list by Ron Jeffries ([ronjeffries.com](https://www.ronjeffries.com/xprog/articles/issues-with-safe/)); compared to RUP; the diagram does not reflect working reality ([Scrum.org](https://www.scrum.org/resources/blog/many-organisations-are-lured-safe-song-sirens)) |

**Notes.** SAFe is useful mainly as a **warning about vocabulary inflation**. One part is worth keeping: the four-part Continuous Delivery Pipeline (explore, integrate, deploy, release on demand). It separates *deploy* from *release*, as DevOps does.

### 2.5 Disciplined Agile Delivery (DAD)

| Dimension | DAD |
|---|---|
| Structure | Three phases, **Inception, Construction, Transition**, used in the project-style lifecycles ([PMI DA lifecycle](https://www.pmi.org/disciplined-agile/lifecycle)) |
| Lifecycles | Six: **Agile** (Scrum-based), **Lean** (Kanban-based), **Continuous Delivery: Agile**, **Continuous Delivery: Lean**, **Exploratory** (Lean Startup), **Program** ([PMI full delivery lifecycles](https://www.pmi.org/disciplined-agile/process/introduction-to-dad/full-delivery-lifecycles-introduction), [CD: Lean](https://www.pmi.org/disciplined-agile/lifecycle/cdlean-lifecycle)) |
| Milestones | **Stakeholder Vision** (end of Inception), **Proven Architecture**, **Continued Viability**, **Sufficient Functionality** (end of Construction), **Production Ready** (Transition), **Delighted Stakeholders** ([PMI milestones](https://www.pmi.org/disciplined-agile/agile/milestones)) |
| Roles | Primary: **Stakeholder, Product Owner, Team Member, Team Lead, Architecture Owner**. Supporting: Specialist, Domain Expert, Technical Expert, Independent Tester, Integrator *(unverified against fetched text)* ([Wikipedia](https://en.wikipedia.org/wiki/Disciplined_agile_delivery)) |
| Artifacts | Work item list / backlog, vision, architecture model, **Minimum Business Increment (MBI)** ([PMI milestones](https://www.pmi.org/disciplined-agile/agile/milestones)) |
| How size and risk change the process | The team **chooses a lifecycle** ("Choose your WoW"). The CD lifecycles "require the team to have a lot of skill and discipline" ([PMI choose lifecycle](https://www.pmi.org/disciplined-agile/wow/chooselifecycle)). The Exploratory lifecycle can replace Inception ([PMI exploratory](https://www.pmi.org/disciplined-agile/lifecycle/exploratory-lifecycle)) |
| Quality | Milestones are "light-weight" reviews; the Production Ready milestone is the go/no-go for deployment ([ProjectManagement.com](https://www.projectmanagement.com/blog-post/61782/Reduce-Agile-Project-Risk-with-Light-Weight-Milestones)) |
| Newcomer reading | *Choose Your WoW!* (book), process-goal posters ([PMI poster](https://www.pmi.org/-/media/pmi/microsites/disciplined-agile/posters/daprocessgoalsposter85x11.pdf)) |
| Criticisms | "Too complicated" is a recurring complaint ([ProjectManagement.com](https://www.projectmanagement.com/blog-post/61886/why-is-disciplined-agile-so-complicated-)). The learning curve is steep for teams new to agile ([ProductPlan](https://www.productplan.com/disciplined-agile/)) |

**Notes.** DAD is the closest precedent for a method that uses **phases without being waterfall**. Its milestones are risk-based, light and few. PMI itself says the Proven Architecture milestone matters less than releasing to production more often ([PMI risk-value lifecycle](https://www.pmi.org/disciplined-agile/lifecycle/risk-value-lifecycle)). DAD's "choose a lifecycle by context" is a well-known precedent for routes by size and risk. Its six lifecycles also show the cost: every extra option makes the method harder to learn.

### 2.6 Shape Up (Basecamp)

| Dimension | Shape Up |
|---|---|
| Structure | Three activities: **Shaping, Betting, Building**. A **six-week cycle** followed by a two-week **cool-down** ([basecamp.com/shapeup glossary](https://basecamp.com/shapeup/4.5-appendix-06), [chapter 1](https://basecamp.com/shapeup/0.3-chapter-01)) |
| Roles | Shapers (senior people who shape work), the **betting table** (decision-makers), build teams of one designer and one or two programmers *(team composition unverified against fetched text)* ([Shape Up ch. 8](https://basecamp.com/shapeup/2.2-chapter-08)) |
| Artifacts | **Pitch**: Problem, **Appetite**, Solution, **Rabbit holes**, **No-gos**. **Breadboards** and **fat marker sketches** for shaping. **Scopes** and **hill charts** during building ([Shape Up ch. 4](https://basecamp.com/shapeup/1.3-chapter-04), [ch. 5](https://basecamp.com/shapeup/1.4-chapter-05), [Dan Lebrero summary](https://danlebrero.com/2021/06/16/shape-up-summary)) |
| Decision points | The **betting table** in cool-down picks pitches for the next cycle; nothing carries over automatically. The **circuit breaker** stops unfinished projects at the end of the cycle by default ([Shape Up ch. 8](https://basecamp.com/shapeup/2.2-chapter-08)) |
| Cadence and flow | Fixed time, variable scope; "bets, not backlogs". Small-batch (1–2 week) and big-batch (6 week) projects ([Shape Up ch. 8](https://basecamp.com/shapeup/2.2-chapter-08)) |
| How size and risk change the process | Appetite (a time budget) is set before the solution. Rabbit holes are removed during shaping, before the bet ([Shape Up ch. 5](https://basecamp.com/shapeup/1.4-chapter-05)) |
| Quality | Hill charts show each scope as uphill (unknowns) or downhill (execution). The team decides when to stop by comparing against the baseline, not an ideal ([Commons OS summary](https://commons-os.github.io/patterns/shape-up-basecamp/)) |
| Newcomer reading | Free online book ([basecamp.com/shapeup](https://basecamp.com/shapeup/0.3-chapter-01)). Short, vivid vocabulary |
| Criticisms | No central backlog ([Alex Debecker](https://alexdebecker.substack.com/p/concerns-before-implementing-shape)). Six-week rigidity and latency for small items; some teams switched back ([ScaleX](https://scalex.dev/blog/2-years-with-shape-up/), [Mind the Product](https://www.mindtheproduct.com/7-lessons-from-trialling-basecamps-shape-up-methodology/)) |

**Notes.** Shape Up offers the clearest model of **one strong human decision before building** (the bet), followed by a team that is trusted to build without more gates. The *appetite* concept (decide how much time the problem is worth, then shape the solution to fit) suits AI agents well, because an agent will otherwise expand scope without limit. Its terms (pitch, appetite, rabbit hole, no-go) are memorable but less universal than Scrum/Kanban terms.

### 2.7 Lean software development (brief)

| Dimension | Lean software development |
|---|---|
| Principles | **Eliminate waste, amplify learning, decide as late as possible, deliver as fast as possible, empower the team, build integrity in, see the whole** (Poppendieck, 2003) ([Wikipedia](https://Www.wikipedia.org/wiki/Lean_software_development)) |
| Alternative labels | "Build quality in, create knowledge, defer commitment, deliver fast, respect people, optimize the whole" ([Planview](https://www.planview.com/?p=21987)) |
| Structure | None prescribed; it is principles plus tools (value stream mapping, pull, WIP limits) |
| Criticisms | Lists differ between sources; a principles set rather than a usable process |

**Notes.** Lean names the waste that waterfall structures produce: handoffs, waiting, partially done work and extra features. The biggest wastes are "the addition of unrequired features, project churn and crossing organizational boundaries" ([Rework summary](https://resources.rework.com/libraries/project-management/lean-software-development)). Each handoff between agent roles is a boundary crossing.

### 2.8 Continuous Delivery and the DevOps loop

| Dimension | Continuous Delivery (Humble and Farley) | DevOps loop |
|---|---|---|
| Structure | **Deployment pipeline**: **commit stage**, then **automated acceptance test stage**, then optional capacity/manual stages, then **release** ([continuousdelivery.com patterns](https://continuousdelivery.com/implementing/patterns/), [Farley 2007 PDF](https://continuousdelivery.com/wp-content/uploads/2010/01/The-Deployment-Pipeline-by-Dave-Farley-2007.pdf)) | Eight stages: **Plan, Code, Build, Test, Release, Deploy, Operate, Monitor**, drawn as an infinity loop ([IBM](https://www.ibm.com/think/topics/devops-lifecycle), [Atlassian DevOps](https://www.atlassian.com/devops)) |
| Principles | Build quality in; work in small batches; computers do repetitive tasks, people solve problems; relentlessly pursue continuous improvement; everyone is responsible ([continuousdelivery.com/principles](https://continuousdelivery.com/principles/), *unverified against fetched text*) | Shared ownership of development and operations |
| Decision points | Each pipeline stage is an **automated gate**. The commit stage should take under five minutes and never more than ten, and a broken commit stage is fixed before anything else is checked in ([continuousdelivery.com patterns](https://continuousdelivery.com/implementing/patterns/), [O'Reilly ch. 7](https://www.oreilly.com/library/view/continuous-delivery-reliable/9780321670250/ch07.xhtml)). Release can be a business decision ("release on demand") | Deploy and release are decoupled through feature flags ([LaunchDarkly](https://launchdarkly.com/blog/modern-devops-operating-continuously/)) |
| Artifacts | Release candidate (the build artifact that moves through the pipeline), test results | Varies by tool |
| Quality | The pipeline is the definition of releasable | Monitoring closes the loop |
| Criticisms | Requires heavy investment in automation | The loop is a marketing diagram with no roles or decision rules; release/deploy order is debated ([O'Reilly](https://www.oreilly.com/library/view/operating-continuously/9781098117283/introduction01.html)) |

**Notes.** The DevOps loop is the **most widely recognized stage list in industry**, even though no single standards body owns it. CD supplies the idea that **quality gates are automated pipeline stages**, not meetings or documents.

### 2.9 DORA (metrics and capabilities)

| Dimension | DORA |
|---|---|
| Metrics | **Change lead time** (commit to successful production deployment), **deployment frequency**, **change failure rate**, **failed deployment recovery time** (replaced MTTR in 2023), **deployment rework rate** (added 2024). Grouped as **throughput** and **instability** ([dora.dev four keys](https://dora.dev/guides/dora-metrics-four-keys), [dora.dev history](https://dora.dev/guides/dora-metrics/history/)) |
| Capabilities | A catalog of technical, process and cultural capabilities, including **continuous integration, trunk-based development, loosely coupled architecture, working in small batches, streamlining change approval, test automation, deployment automation** ([dora.dev capabilities](https://www.dora.dev/capabilities), [DORA Core model](https://DORA.dev/core/dora-core-model-v1.2.2.pdf)) |
| AI | The 2025 **DORA AI Capabilities Model** names seven capabilities that strengthen AI's effect, including **working in small batches**, a **user-centric focus**, a clear AI stance/policy, a healthy data ecosystem and strong version control *(full list unverified against fetched text)*. It describes AI as an **amplifier** of existing strengths and weaknesses ([dora.dev AI capabilities model](https://dora.dev/ai/capabilities-model), [Google Cloud blog](https://cloud.google.com/blog/products/ai-machine-learning/introducing-doras-inaugural-ai-capabilities-model), [2025 report PDF](https://services.google.com/fh/files/misc/2025_state_of_ai_assisted_software_development.pdf)) |
| Change approval | Lightweight approval through peer review (pairing or in-team code review) performs better than external change approval boards ([Matko Soric summary of DORA](https://matkosoric.github.io/blogs/devops-capabilites)) |
| Criticisms | Goodhart's law: metrics turned into targets, or used to compare teams ([InfoQ](https://www.infoq.com/articles/dora-metrics-anti-patterns), [The New Stack](https://thenewstack.io/the-wrong-way-to-use-dora-metrics/)) |

**Notes.** DORA is not a process. It provides **outcome measures** and an **evidence-backed list of capabilities**. Its finding that **peer review beats external approval** argues directly against a design with many human sign-offs before production.

### 2.10 Trunk-based development

| Dimension | Trunk-based development |
|---|---|
| Core rule | Everyone integrates into one trunk at least daily; branches are short-lived (less than a day), or there are no branches ([Atlassian](https://www.atlassian.com/continuous-delivery/continuous-integration/trunk-based-development), [Mergify](https://mergify.com/learn/trunk-based-development/short-lived-branches)) |
| DORA link | Elite performers who meet reliability targets are 2.3 times more likely to use trunk-based development (2021 report, quoted by [LaunchDarkly](https://launchdarkly.com/blog/elite-performance-with-trunk-based-development/)). DORA guidance: three or fewer active branches, merge to trunk daily *(unverified against fetched text)* ([Unleash](https://docs.getunleash.io/feature-flag-tutorials/use-cases/trunk-based-development), [dora.dev capabilities](https://www.dora.dev/capabilities)) |
| Enablers | Feature flags separate branch lifetime from feature lifetime; flags must be removed afterward ([Unleash](https://docs.getunleash.io/feature-flag-tutorials/use-cases/trunk-based-development)) |
| CI origin | Fowler's CI practices: "Everyone Pushes Commits To the Mainline Every Day", "Make the Build Self-Testing" ([martinfowler.com](https://martinfowler.com/articles/continuousIntegration.html)) |

**Notes.** Most teams work with **GitHub flow**: create a branch, make changes, open a pull request, review, merge, delete the branch. Repositories can require an approving review before merge ([GitHub Docs](https://docs.github.com/en/get-started/using-github/github-flow)). The pull request is the **one human checkpoint every developer already accepts**.

### 2.11 Team Topologies (brief)

| Dimension | Team Topologies |
|---|---|
| Team types | **Stream-aligned, Enabling, Complicated-subsystem, Platform** ([teamtopologies.com](https://teamtopologies.com/key-concepts), [martinfowler.com](https://martinfowler.com/bliki/TeamTopologies.html)) |
| Interaction modes | **Collaboration, X-as-a-Service, Facilitating** ([teamtopologies.com](https://teamtopologies.com/key-concepts)) |
| Key idea | Stream-aligned teams own a flow of change end to end; other teams reduce their cognitive load |
| Criticism | "Complex organizations cannot be simply broken down into just four kinds of teams and three kinds of interactions" ([martinfowler.com](https://martinfowler.com/bliki/TeamTopologies.html)) |

**Notes.** Applied to agents: the Coding Agent working on a work item is the stream-aligned team. Specialist agents (security, architecture, test design) work best as **enabling** or **X-as-a-Service** helpers it calls on, not as stations the work passes through in sequence.

### 2.12 Dual-track agile (brief)

| Dimension | Dual-track agile |
|---|---|
| Structure | Two parallel tracks: **Discovery** produces validated backlog items; **Delivery** produces releasable software ([Productboard](https://www.productboard.com/glossary/dual-track-agile/), [Jeff Patton](https://jpattonassociates.com/dual-track-development/)) |
| Key points | "Two kinds of thinking, not two rosters of people"; discovery continues after release ([ZURB](https://radar.zurb.com/article/dual-track-is-two-kinds-of-work-not-two-teams), [Jeff Patton](https://jpattonassociates.com/dual-track-development/)) |
| Origin | Popularized around 2012 by Patton and Cagan; earlier roots in Desiree Sy (2007) ([Productboard](https://www.productboard.com/dual-track-agile)) |
| Purpose | Counteracts "mini-waterfalls" ([ProductPlan](https://www.productplan.com/glossary/dual-track-agile)) |

**Notes.** Dual-track avoids putting "analysis" and "design" in sequence before "build". Discovery runs **alongside** delivery, and its output is a refined backlog item, not a frozen document.

---

## 3. Vocabulary frequency table

How to read it: ● = the term (or an exact variant) is part of the method's official vocabulary; ○ = the concept is present under a different name or is assumed in practice; blank = absent. **Bold term** = shared by 3 or more methods (● or ○). Column abbreviations: Scr = Scrum, Kan = Kanban (Guide + Method), XP, SAFe, DAD, SU = Shape Up, Lean, CD/DevOps (Continuous Delivery + DevOps loop), DORA, TBD = trunk-based development, TT = Team Topologies, DT = dual-track.

### 3.1 Stage, event and cadence names

| Term | Scr | Kan | XP | SAFe | DAD | SU | Lean | CD/DevOps | DORA | TBD | TT | DT | Count |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Planning** (Sprint/PI/Iteration Planning, Planning Game, Replenishment, Betting) | ● | ○ | ● | ● | ○ | ○ | | ● | | | | | 7 |
| **Iteration / Sprint / Cycle** (timebox) | ● | | ● | ● | ● | ● | | | | | | | 5 |
| **Review / Demo** (Sprint Review, System Demo, stakeholder demo) | ● | ○ | ○ | ● | ○ | | | | | | | | 5 |
| **Retrospective / Inspect and Adapt / improvement loop** | ● | ● | ○ | ● | ○ | | ● | ● | ● | | | | 8 |
| **Daily sync** (Daily Scrum, Kanban meeting, stand-up) | ● | ○ | ○ | ● | ○ | | | | | | | | 5 |
| **Build** | | | ○ | ○ | ○ | ● | | ● | | ○ | | | 6 |
| **Test** | | | ● | ○ | ○ | | | ● | ○ | | | | 5 |
| **Release** (Small Releases, Release on Demand, release) | ○ | | ● | ● | ● | | | ● | | | | | 5 |
| **Deploy / Deployment** | | | | ● | ● | | | ● | ● | ○ | | | 5 |
| **Operate / Monitor** | | | | ○ | ○ | | | ● | ● | | | | 4 |
| **Discovery / Exploration / Shaping** | | | | ● | ● | ● | | | | | | ● | 4 |
| **Continuous Integration** | | | ● | ● | ○ | | | ● | ● | ● | | | 6 |
| **Code review / Pull request** | | | ○ | ○ | ○ | | | ○ | ● | ● | | | 6 |
| Inception / Construction / Transition | | | | | ● | | | | | | | | 1 |
| Cool-down | | | | ○ (IP Iteration) | | ● | | | | | | | 2 |

### 3.2 Roles and accountabilities

| Term | Scr | Kan | XP | SAFe | DAD | SU | Other | Count |
|---|---|---|---|---|---|---|---|---|
| **Product Owner** (or Customer / Product Management) | ● | ○ (Service Request Manager) | ○ (Customer) | ● | ● | ○ (shaper / betting table) | DT: product manager | 6 |
| **Developers / Team Member / Programmer** | ● | ○ | ● | ● | ● | ● | | 6 |
| **Facilitator / coach** (Scrum Master, Coach, RTE, Team Lead, Service Delivery Manager) | ● | ○ | ● | ● | ● | | | 5 |
| **Architect** (System Architect, Architecture Owner) | | | | ● | ● | | TT: complicated-subsystem | 3 |
| **Stakeholder / Business Owner** | ○ | | | ● | ● | ○ | | 4 |
| **Tester** (Tester, Independent Tester) | | | ● | ○ | ● | | | 3 |
| Release Train Engineer | | | | ● | | | | 1 |

### 3.3 Artifacts and work items

| Term | Scr | Kan | XP | SAFe | DAD | SU | Other | Count |
|---|---|---|---|---|---|---|---|---|
| **Backlog** (Product/Sprint/ART backlog, work item list) | ● | ○ | ○ | ● | ● | (rejected) | DT, Atlassian | 6 |
| **User Story** | ○ | | ● | ● | ● | | Atlassian | 5 |
| **Epic / Feature** | ○ | | | ● | ○ | | Atlassian | 4 |
| **Increment** (Increment, MBI, PI) | ● | | ○ | ● | ● | | | 4 |
| **Goal / Objective / Vision** (Product Goal, Sprint Goal, PI Objectives, Stakeholder Vision) | ● | | | ● | ● | ○ (problem + appetite) | | 4 |
| **Board** (Kanban board, ART planning board, Scrum board) | ○ | ● | ○ | ● | ○ | ○ (hill chart) | | 6 |
| **Pipeline** (deployment / CD pipeline) | | | | ● | ○ | | CD, DORA | 4 |
| Pitch / Appetite / Rabbit holes / No-gos | | | | | | ● | | 1 |
| Release candidate | | | | | | | CD | 1 |

### 3.4 Quality and flow concepts

| Term | Scr | Kan | XP | SAFe | DAD | SU | Lean | CD | DORA | TBD | Count |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **Definition of Done** (or explicit "done" policy) | ● | ○ (finish point, policies) | ○ (acceptance tests) | ● | ● | | | ○ | | | 6 |
| **Acceptance criteria / acceptance tests** | ○ | | ● | ● | ● | | | ● | | | 5 |
| **Test-first / TDD / automated tests** | | | ● | ● | ● | | ○ | ● | ● | | 6 |
| **WIP limit** | | ● | | ● | ● (Lean lifecycle) | | ● | | ○ | ○ (≤3 branches) | 6 |
| **Small batches** | ○ | ○ | ● (small releases) | ● | ○ | ● (small batch) | ● | ● | ● | ● | 10 |
| **Cycle time / lead time** | | ● | | ● | ○ | | ● | ○ | ● | | 6 |
| **Throughput / deployment frequency** | | ● | | ○ | | | ○ | ○ | ● | | 5 |
| **Timebox** | ● | | ● | ● | ○ | ● (appetite) | | | | | 5 |
| **Feature flags / deploy-release separation** | | | | ● | ○ | | | ● | ○ | ● | 5 |
| **Refinement** | ● | ○ (replenishment) | ○ | ● | ○ | ○ (shaping) | | | | | 6 |
| Definition of Ready | (rejected) | | | ○ | | | | | | | 1 |
| Service Level Expectation | | ● | | | | | | | | | 1 |

### 3.5 Terms shared by 3 or more methods

**Stages and events:** Planning, Iteration (Sprint/Cycle), Review/Demo, Retrospective, Daily sync, Build, Test, Release, Deploy, Operate/Monitor, Discovery/Exploration, Continuous Integration, Code review / Pull request.
**Roles:** Product Owner, Developers/Team Member, Facilitator/Coach, Architect, Stakeholder, Tester.
**Artifacts:** Backlog, User Story, Epic/Feature, Increment, Goal/Objective, Board, Pipeline.
**Quality and flow:** Definition of Done, Acceptance criteria, Test-first/TDD, WIP limit, Small batches, Cycle/lead time, Throughput/deployment frequency, Timebox, Feature flags, Refinement.

**Terms that are specific to one method** (avoid unless explained): Inception/Construction/Transition, Release Train Engineer, Pitch/Appetite/Rabbit hole, Service Level Expectation. **Definition of Ready** is unique to SAFe-style practice and is explicitly discouraged by Scrum.org and Mike Cohn.

---

## 4. What makes a method feel modern rather than waterfall

Waterfall is not defined by having stages. Every method, including the DevOps loop, has stages. It is defined by **how work moves between them** and **who must approve each move**. The structural features below separate the two, with evidence for each.

| # | Modern feature | Waterfall counterpart | Evidence |
|---|---|---|---|
| 1 | **Small batches.** One story, one slice, one PR, deployed in hours or days | One large release containing many features | DORA "working in small batches" shortens lead time and feedback loops ([Google Cloud / DORA](https://docs.cloud.google.com/architecture/devops/process)); a DORA AI capability ([dora.dev](https://dora.dev/ai/capabilities-model)); CD principle ([continuousdelivery.com](https://continuousdelivery.com/principles/)) |
| 2 | **Continuous flow, pull and WIP limits** | Push through phases on a schedule | Kanban Guide: WIP explicitly controlled, pull system ([kanbanguides.org](https://kanbanguides.org/the-kanban-guide/2020.12)) |
| 3 | **Testing inside the build step** (TDD, CI) | A separate test phase after coding | XP test-first ([Agile Alliance](https://agilealliance.org/glossary/xp/)); CI: each check-in triggers quick tests and regressions are fixed immediately ([DORA CI](https://www.dora.dev/capabilities)) |
| 4 | **Automated gates** (pipeline stages) | Manual sign-off meetings | CD commit stage under 10 minutes and fixed immediately when broken ([continuousdelivery.com](https://continuousdelivery.com/implementing/patterns/)) |
| 5 | **Peer review instead of approval boards** | CAB / multi-level sign-off | DORA: peer review beats external CABs ([summary](https://matkosoric.github.io/blogs/devops-capabilites)) |
| 6 | **Trunk-based integration and short-lived branches** | Long-lived feature branches merged at the end | DORA/TBD evidence ([LaunchDarkly](https://launchdarkly.com/blog/elite-performance-with-trunk-based-development/)) |
| 7 | **Deploy separate from release** (feature flags, progressive rollout) | Big-bang go-live | Feature flags decouple deploy from release ([LaunchDarkly](https://launchdarkly.com/blog/modern-devops-operating-continuously/)) |
| 8 | **A Definition of Done applied to every increment** | Quality checked once, at the end | The Scrum DoD applies to every Increment ([Scrum.org](https://www.scrum.org/resources/blog/2020-scrum-guide-definition-done-created-scrum-team)) |
| 9 | **Refinement as an ongoing activity, not an entry gate** | Requirements signed off and frozen before design | Scrum.org: a DoR used as a checklist reflects "a sequential, phase-gate mindset" ([Scrum.org](https://www.scrum.org/node/6952)); Cohn: stage-gate "is, after all, another way of describing a waterfall process" ([Mountain Goat](https://mountaingoatsoftware.com/blog/the-dangers-of-a-definition-of-ready)) |
| 10 | **Fixed time, variable scope** | Fixed scope, slipping time | Shape Up appetite and circuit breaker ([basecamp.com](https://basecamp.com/shapeup/2.2-chapter-08)); Scrum timebox |
| 11 | **Inspect the working product** (Review, demo, production metrics) | Inspect documents | Sprint Review inspects the Increment ([Scrum Guide](https://scrumguides.org/scrum-guide.html)); DAD: releasing to production matters more than proving architecture on paper ([PMI](https://www.pmi.org/disciplined-agile/lifecycle/risk-value-lifecycle)) |
| 12 | **Production feedback into the backlog** (loop, not line) | Project ends at handover | DevOps loop ([IBM](https://www.ibm.com/think/topics/devops-lifecycle)); dual-track: discovery continues after release ([Jeff Patton](https://jpattonassociates.com/dual-track-development/)) |
| 13 | **A cross-functional team that owns the item end to end** | Specialist handoffs per phase | Team Topologies stream-aligned teams ([teamtopologies.com](https://teamtopologies.com/key-concepts)); Cagan's "mini-waterfalls" critique ([ProductPlan](https://www.productplan.com/glossary/dual-track-agile)); Lean "crossing organizational boundaries" waste ([Rework](https://resources.rework.com/libraries/project-management/lean-software-development)) |
| 14 | **Few, risk-based decision points** | A gate at the end of every phase | DAD light-weight milestones ([ProjectManagement.com](https://www.projectmanagement.com/blog-post/61782/Reduce-Agile-Project-Risk-with-Light-Weight-Milestones)); Shape Up has one bet per cycle ([basecamp.com](https://basecamp.com/shapeup/2.2-chapter-08)) |

### 4.1 Waterfall smells to check for in any draft

- **One human sign-off per stage**, especially when each is held by a different role. The current Agentic SDLC draft has five numbered checkpoints across eight stages (`skills/agentic-sdlc/references/lifecycle.md`), and that is the dominant reason it reads as waterfall.
- **One specialist per stage, passing artifacts on**: Analyst, then Architect, then Coder, then QA, then Reviewer, then Release. This is the "columns by specialty" anti-pattern that Scrum.org attributes to poorly run Kanban ([Scrum.org](https://www.scrum.org/resources/blog/what-scrum-gets-wrong-about-kanban-and)).
- **A "frozen" specification.** Modern methods let the backlog item be re-refined as learning arrives, and changes to an approved spec go through a lightweight re-approval rather than a formal change request.
- **A Test stage after a Build stage.** In XP and CD, testing happens during coding and in the pipeline.
- **Document names as the primary output** (SPEC, PLAN, TEST-PLAN, VERIFICATION, TRACEABILITY, HANDOVER, RETRO) rather than **working software plus a few living artifacts**.

### 4.2 What legitimately remains phase-like

Some sequencing is unavoidable and is still accepted as modern. DAD's Inception/Construction/Transition and Shape Up's Shaping/Betting/Building both put **a short, deliberate "decide what to build" step before building**, and a **readiness check before production** (DAD Production Ready, CD acceptance stage). The difference from waterfall is that the decide step is short (days, not months), applies to one small item, and is not repeated as a gate at every later stage.

---

## 5. What makes a method adoptable

| Pattern | Evidence | Implication |
|---|---|---|
| **A short core guide** (around 15 pages or less) | Scrum Guide under 13 pages ([scrumguides.org](https://scrumguides.org/revisions.html)); the Kanban Guide is similarly short ([kanbanguides.org](https://kanbanguides.org/english/)) | Keep the core lifecycle reference to one short page plus one-page tables |
| **Countable, closed vocabulary** (3/5/3) | Scrum: 3 accountabilities, 5 events, 3 artifacts; Kanban: 3 practices, 4 measures; DORA: 5 metrics | Pick small, fixed numbers and name every element with an existing word |
| **One picture** | DevOps infinity loop; Kanban board; Scrum cycle diagram | One diagram that shows the loop, the board columns and the decision points |
| **Few roles** | Scrum has three; Kanban prescribes none; heavier frameworks (SAFe, DAD) get "too complex" criticism ([Zuehlke](https://www.zuehlke.com/en/node/764), [ProjectManagement.com](https://www.projectmanagement.com/blog-post/61886/why-is-disciplined-agile-so-complicated-)) | Three human accountabilities at most |
| **Each element states its purpose** | Sprint Planning answers "why, what, how" ([Scrum Guide](https://scrumguides.org/scrum-guide.html)) | Each stage gets one question; each decision point gets one pass rule |
| **A commitment per artifact** | Product Goal, Sprint Goal, Definition of Done ([Scrum.org](https://www.scrum.org/resources/blog/scrum-guide-2020-update-commitments)) | Pair the spec with acceptance criteria and the increment with a Definition of Done |
| **Start where you are, change incrementally** | Kanban Method change principles ([Kanban University](https://kanban.university/kanban-guide/)) | Map onto the team's existing tools (issues, PRs, CI, releases), with no new tracker |
| **Familiar tooling words** | GitHub flow ([GitHub Docs](https://docs.github.com/en/get-started/using-github/github-flow)); Jira epics and stories ([Atlassian](https://www.atlassian.com/agile/project-management/epics-stories-themes)) | Use *issue, branch, PR, review, merge, CI, release, deploy, rollback* |
| **Free, readable source** | Shape Up free online ([basecamp.com](https://basecamp.com/shapeup/0.3-chapter-01)); Scrum Guide free | Keep it in the repository and readable without a tool |
| **Context choice without too many options** | DAD's six lifecycles are powerful but steep ([ProductPlan](https://www.productplan.com/disciplined-agile/)); Shape Up's two batch sizes are simple | Two or three sizes at most, mapped to familiar work item types |
| **Measures outcomes, not compliance** | DORA metrics, Kanban flow metrics; warnings against targets ([InfoQ](https://www.infoq.com/articles/dora-metrics-anti-patterns)) | Adopt DORA five plus Kanban four; do not invent indicators |

Patterns that hurt adoption:
- **Invented labels** that need a glossary before anything else makes sense. SAFe's vocabulary is the standard example, and its PI was renamed from "Program Increment" to "Planning Interval" in 6.0, which adds churn.
- **Too many options** (DAD).
- **Rigid cadence that conflicts with reality** (Shape Up teams stretching cycles; [Mind the Product](https://www.mindtheproduct.com/7-lessons-from-trialling-basecamps-shape-up-methodology/)).
- **Ceremony without engineering practice** (Scrum without XP/CD tends to become "Dark Scrum"; [Ron Jeffries](https://ronjeffries.com/articles/016-09ff/defense)).

---

## 6. Mapping the current Agentic SDLC draft to standard vocabulary

This compares the current draft (`skills/agentic-sdlc/references/lifecycle.md`) with standard terms, to show where it departs from what developers expect.

| Current draft | Standard equivalent | Issue |
|---|---|---|
| Stage codes `PL AN DE BU TE RV DP OP` | DevOps loop: Plan, Code, Build, Test, Release, Deploy, Operate, Monitor | Two-letter codes are invented; "Analyze" and "Design" as separate stages echo waterfall's Requirements and Design phases |
| `CP1`–`CP5` checkpoints | Backlog refinement / Sprint Planning (commit to an item), PR approval, release approval (go/no-go, DAD "Production Ready") | Numbered checkpoints are not industry vocabulary; five human gates before production goes against DORA's change-approval finding |
| One AI agent role per stage (Triage, Analyst, Architect, Coding, QA, Review, Release, SRE) | One owning team (stream-aligned) plus enabling specialists | A handoff chain between specialists: Lean boundary-crossing waste, and Cagan's "mini-waterfall" |
| "SPEC frozen" at CP2 | A refined backlog item with acceptance criteria; changes go through refinement | "Frozen" signals waterfall change control |
| BU then TE as separate stages | TDD and CI inside Build; pipeline stages (commit stage, acceptance stage) | Testing after building is the classic waterfall order |
| Routes Quick / Standard / Full | Work item types (Bug/Task, Story, Epic); Shape Up small batch vs big batch; DAD lifecycle choice | Good idea; name the routes by item type so the trigger is obvious |
| `SPEC.md`, `PLAN.md`, `TEST-PLAN.md`, `VERIFICATION.md`, `TRACEABILITY.md`, `CHECKPOINTS.md`, `HANDOVER.md`, `RETRO.md` | Story/spec with acceptance criteria, design doc / ADR, task list, PR description, CI results, release notes, runbook, postmortem, retrospective notes | Too many artifacts; several of them could live in the PR and the CI run |
| "Indicators" | DORA metrics, Kanban flow metrics, SLOs | Use the standard names |

The strongest parts of the draft are well supported by the sources and should stay: acceptance criteria traced to tests (XP acceptance tests, CD acceptance stage), bounded automatic retry loops (CD "fix the broken build immediately"), routes by size and risk (DAD, Shape Up), Operate feeding Plan (DevOps loop), and an explicit rollback plan (CD/DORA recovery time).

---

## 7. Recommendations for an AI-assisted method

1. **Name the stages with the DevOps loop, compressed into a single work-item flow developers already know.** Suggested stages: **Plan, Design, Build, Review, Release, Operate**. In this list, *Build* includes code and test (TDD plus CI), *Release* covers deploy and release, and *Operate* includes monitor. Every name appears in the DevOps loop or in standard Scrum/Kanban usage. If "Design" is too heavy for small items, fold it into Plan for the small route. Drop the two-letter codes; use full words everywhere, including file names and logs.

2. **Draw the method as a Kanban board plus a loop, not as a sequence of gates.** Board columns: **Backlog, Ready, In Progress, In Review, Done**. Define "Done" as *merged, deployed and verified in production* (or released behind a flag). Put the six stages on the loop and show that one item moves left to right in hours or days. Add WIP limits for agent work, for example one active item per Coding Agent session, and track **cycle time, throughput, WIP and work item age** (Kanban Guide).

3. **Reduce human decision points to three, named with words everyone uses:**
   - **Plan approval.** The human approves the backlog item's scope, acceptance criteria and appetite. This combines Sprint Planning commitment, Shape Up's bet and DAD's Stakeholder Vision in one step. For large items, the same approval covers the design (ADRs plus task list).
   - **Pull request approval.** Standard code review, per GitHub flow and DORA's peer-review finding. The PR carries the evidence (CI results, acceptance-criteria-to-test mapping).
   - **Release approval (go/no-go).** Only when production deploy is not already fully automated with progressive rollout and rollback; this mirrors DAD's Production Ready milestone. With feature flags, approval moves to "turn on the flag".
   Everything else is an **automated gate** (pipeline stages, test thresholds, linters, security scans) or an **escalation** (bounded retry exhausted). Drop the CP numbering.

4. **Use the standard artifact set and commitments, and keep it small.** **Backlog item** (story, bug or epic) with **acceptance criteria** (Given/When/Then; [Agile Alliance](https://agilealliance.org/glossary/invest)); **design doc / ADR** for non-trivial items; **task list** (implementation plan); **pull request** (with test evidence and a traceability table in its description); **release notes** and **runbook**; **postmortem** and **retrospective notes**. Adopt Scrum's commitment pairing: the backlog item serves a **Goal**, and every increment meets the **Definition of Done**. Merge `VERIFICATION.md`, `TRACEABILITY.md` and `CHECKPOINTS.md` into the PR description and CI output where possible.

5. **Publish an explicit Definition of Done and treat it as the quality contract,** rather than a separate Test stage. Example DoD: every acceptance criterion has a passing automated test; CI green on trunk; review approved; security checks pass; docs and changelog updated; deployed with a rollback path; monitoring in place. Avoid a gating "Definition of Ready". Use **refinement** instead, so the Plan step does not become a stage-gate (Scrum.org, Cohn).

6. **Make testing part of building and verification part of the pipeline.** Use CD vocabulary: **commit stage** (fast unit tests and lint, minutes) and **acceptance stage** (acceptance criteria tests in a production-like environment). The Coding Agent works test-first. The QA role becomes an independent **test designer/verifier** that the build calls on (an enabling or X-as-a-Service relationship, in Team Topologies terms), not a later stage.

7. **Organize agents as one owning team with helpers, not a relay.** One lead agent owns the item end to end, like a stream-aligned team, and calls specialist agents (architecture, security, test design, review) as needed. Keep conventional role names (Product Owner, Tech Lead, Developer, Reviewer, Release Manager / On-call) for the **humans**, with at most three accountabilities: **Product Owner** (what and why: Plan approval), **Tech Lead / Reviewer** (how and quality: design sign-off on large items, PR approval), **Release owner / On-call** (production: release approval, incidents). As in Scrum, one person may hold several of these.

8. **Right-size with familiar work item types and an appetite.** Map routes to **Bug/Task** (small: Plan, Build, Review, Release), **Story/Feature** (standard: adds a short design note) and **Epic** (large: adds ADRs, a split into stories, staged rollout and a mandatory retrospective). Borrow Shape Up's **appetite** (a time or token budget fixed at Plan approval) and its **circuit breaker** (if the budget runs out, stop and re-plan rather than extend). Agents need an explicit stop rule, and this one is well understood.

9. **Adopt trunk-based development, small PRs and feature flags as defaults.** Short-lived branches (under a day of agent work), one PR per slice, merge to trunk frequently, deploy separately from release, and remove flags afterward. These are DORA capabilities. DORA's 2025 AI research singles out **small batches** and **strong version control** as the capabilities that amplify AI's benefit, so they belong in the default path.

10. **Measure with DORA and flow metrics, and close the loop.** Report the **five DORA metrics** (change lead time, deployment frequency, change failure rate, failed deployment recovery time, deployment rework rate) plus Kanban's four flow measures. Feed incidents, postmortem actions and metric misses back into the **backlog**, the DevOps loop's Monitor-to-Plan edge. Hold a lightweight **retrospective** per epic or on a fixed cadence (Scrum, SAFe I&A, Kanban feedback loops). Follow DORA's warning: never turn these numbers into targets or use them to compare teams.

### 7.1 One-page shape this research supports

```
            Backlog ──▶ Ready ──▶ In Progress ──────────▶ In Review ──▶ Done (in production)
               │          │            │                       │              │
  Stage:     Plan       (Design)     Build (code + test, CI)  Review        Release ─▶ Operate
  Human:   Plan approval              —                     PR approval   Release approval (if not automated)
  Auto:    refinement   ADR draft   commit stage, acceptance stage, bounded retry   rollout, rollback, monitoring
               ▲                                                                         │
               └──────────── incidents, postmortems, DORA / flow metrics → new backlog items ┘
```

Each element on this page maps to a term from Section 3.5 (shared by 3+ methods). A developer who knows Scrum, Kanban or GitHub flow can read it without a glossary.

---

## 8. Sources

Primary or official: [Scrum Guide](https://scrumguides.org/scrum-guide.html) · [Scrum Guide revisions](https://scrumguides.org/revisions.html) · [Scrum Guide PDF](https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf) · [Kanban Guide](https://kanbanguides.org/english/) · [Kanban Guide 2020.12](https://kanbanguides.org/the-kanban-guide/2020.12) · [Kanban University guide](https://kanban.university/kanban-guide/) · [Shape Up](https://basecamp.com/shapeup/0.3-chapter-01) · [Shape Up ch. 8 Betting Table](https://basecamp.com/shapeup/2.2-chapter-08) · [Shape Up glossary](https://basecamp.com/shapeup/4.5-appendix-06) · [DORA metrics](https://dora.dev/guides/dora-metrics-four-keys) · [DORA metrics history](https://dora.dev/guides/dora-metrics/history/) · [DORA capabilities](https://www.dora.dev/capabilities) · [DORA AI capabilities model](https://dora.dev/ai/capabilities-model) · [2025 DORA report](https://services.google.com/fh/files/misc/2025_state_of_ai_assisted_software_development.pdf) · [continuousdelivery.com patterns](https://continuousdelivery.com/implementing/patterns/) · [continuousdelivery.com principles](https://continuousdelivery.com/principles/) · [SAFe PI Planning](https://scaledagileframework.com/PI-planning) · [SAFe PI](https://scaledagileframework.com/program-increment) · [SAFe IP Iteration](https://scaledagileframework.com/innovation-and-planning-iteration) · [PMI DA lifecycles](https://www.pmi.org/disciplined-agile/lifecycle) · [PMI DA milestones](https://www.pmi.org/disciplined-agile/agile/milestones) · [PMI choose lifecycle](https://www.pmi.org/disciplined-agile/wow/chooselifecycle) · [Team Topologies key concepts](https://teamtopologies.com/key-concepts) · [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow) · [Fowler, Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html) · [Jeff Patton, dual-track](https://jpattonassociates.com/dual-track-development/).

Secondary and critique: [Scrum.org 2020 changes](https://www.scrum.org/scrum-guide-2020) · [Scrum.org on DoR](https://www.scrum.org/resources/blog/why-isnt-definition-ready-described-scrum-guide) · [Mountain Goat on DoR](https://mountaingoatsoftware.com/blog/the-dangers-of-a-definition-of-ready) · [Ron Jeffries, Dark Scrum](https://ronjeffries.com/articles/016-09ff/defense) · [Ron Jeffries, Issues with SAFe](https://www.ronjeffries.com/xprog/articles/issues-with-safe/) · [Zuehlke on SAFe](https://www.zuehlke.com/en/node/764) · [ProductPlan on DA](https://www.productplan.com/disciplined-agile/) · [InfoQ DORA anti-patterns](https://www.infoq.com/articles/dora-metrics-anti-patterns) · [Martin Fowler, Team Topologies](https://martinfowler.com/bliki/TeamTopologies.html) · [Atlassian epics and stories](https://www.atlassian.com/agile/project-management/epics-stories-themes) · [Atlassian trunk-based development](https://www.atlassian.com/continuous-delivery/continuous-integration/trunk-based-development) · [IBM DevOps lifecycle](https://www.ibm.com/think/topics/devops-lifecycle) · [LaunchDarkly on TBD](https://launchdarkly.com/blog/elite-performance-with-trunk-based-development/) · [Agile Alliance XP](https://agilealliance.org/glossary/xp/) · [Agile Alliance INVEST](https://agilealliance.org/glossary/invest) · [Wikipedia, Lean software development](https://Www.wikipedia.org/wiki/Lean_software_development).
