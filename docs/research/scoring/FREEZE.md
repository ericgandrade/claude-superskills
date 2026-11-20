# Scoring methodology — freeze record

Frozen on 2026-11-20, **before any method was scored**.

| File | SHA-256 |
|---|---|
| methodology.md | `a6e3953725b67db0189e188c1495ee9b54975e48f65c28baaa01f459b69cf9a4` |
| evaluator-agent.md | `aa3a1f7072ac9200c08135e2f2f773226268870973fc7b908e793a972c31857a` |

Decisions accepted by the orchestrator at freeze time (all as proposed by the methodologist, strict settings):
1. Sixteen criteria (C1–C16), no further merging.
2. Fourth sensitivity profile "autonomous scale" included.
3. Reference scenario R for default-path questions (team of 3–8, medium feature, existing service with CI and mandatory review); opt-in mechanisms capped at 2 outside C8 and C14.
4. Documentation-only evidence caps: open-source ≤ 3, closed product ≤ 4; search snippets ≤ 2.
5. Inventory mechanism IDs count as implemented evidence with confidence ≤ Medium unless the source is checked.
6. Superiority test as written (margin ≥ 5 points, S4 with zero tolerance, S5 ≥ 6 of 16 incl. ≥ 3 in C2–C6); not to be relaxed after scoring starts.
7. Design scope penalty (realization factor −0.1 when a design commits to more new mechanisms in a criterion than the largest benchmark implements).
8. Design-only method scored by scorers who also score ≥ 2 benchmarks in the same round and did not author it.

Any change to methodology.md or evaluator-agent.md after this point must be a new version with a new freeze record, and all scores must be redone under it.
