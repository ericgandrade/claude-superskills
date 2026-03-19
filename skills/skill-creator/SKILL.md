---
name: skill-creator
description: Create new skills, modify and improve existing skills, and measure skill performance. Use when users want to create a skill from scratch, update or optimize an existing skill, run evals to test a skill, benchmark skill performance with variance analysis, or optimize a skill's description for better triggering accuracy.
license: MIT
---

# Skill Creator

A skill for creating new skills and iteratively improving them.

Assess where the user is in the process and jump in accordingly: they may need help defining the skill from scratch, or they may already have a draft and need to go straight to eval/iterate. Stay flexible — if the user wants to skip formal evaluation and iterate conversationally, that's fine too. After the skill is complete, offer to run description optimization to improve triggering accuracy.

---

## Communicating with the user

Users span a wide range of technical familiarity. "Evaluation" and "benchmark" are generally OK; "JSON" and "assertion" need clear signals from the user before using them without definition. When in doubt, add a brief inline explanation.

---

## Creating a skill

### Capture Intent

Start by understanding the user's intent. The current conversation might already contain a workflow the user wants to capture (e.g., they say "turn this into a skill"). If so, extract answers from the conversation history first — the tools used, the sequence of steps, corrections the user made, input/output formats observed. The user may need to fill the gaps, and should confirm before proceeding to the next step.

1. What should this skill enable Claude to do?
2. When should this skill trigger? (what user phrases/contexts)
3. What's the expected output format?
4. Should we set up test cases to verify the skill works? Skills with objectively verifiable outputs (file transforms, data extraction, code generation, fixed workflow steps) benefit from test cases. Skills with subjective outputs (writing style, art) often don't need them. Suggest the appropriate default based on the skill type, but let the user decide.

### Interview and Research

Proactively ask questions about edge cases, input/output formats, example files, success criteria, and dependencies. Wait to write test prompts until you've got this part ironed out.

Check available MCPs - if useful for research (searching docs, finding similar skills, looking up best practices), research in parallel via subagents if available, otherwise inline. Come prepared with context to reduce burden on the user.

### Write the SKILL.md

Based on the user interview, fill in these components:

- **name**: Skill identifier (kebab-case)
- **description**: The primary triggering mechanism — include what the skill does AND specific contexts for when to use it. All "when to use" info goes here, not in the body. Make descriptions slightly "pushy" to counter Claude's tendency to undertrigger: instead of "How to build a dashboard", write "How to build a dashboard. Use this skill whenever the user mentions dashboards, data visualization, or wants to display company data, even if they don't explicitly ask for a 'dashboard.'"
- **license**: MIT (always)
- **the rest of the skill :)**

### Skill Writing Guide

#### Anatomy of a Skill

```
skill-name/
├── SKILL.md (required)
│   ├── YAML frontmatter (name, description, license required — nothing else)
│   └── Markdown instructions
└── Bundled Resources (optional)
    ├── scripts/    - Executable code for deterministic/repetitive tasks
    ├── references/ - Docs loaded into context as needed
    └── assets/     - Files used in output (templates, icons, fonts)
```

#### Progressive Disclosure

Three loading levels: **Metadata** (always in context, ~100 words), **SKILL.md body** (in context when triggered, <500 lines ideal), **Bundled resources** (loaded as needed, unlimited). Keep SKILL.md under 500 lines — if approaching the limit, move content to `references/` with clear pointers. For reference files over ~300 lines, add a table of contents.

**Domain organization**: When a skill supports multiple domains/frameworks, organize by variant:
```
cloud-deploy/
├── SKILL.md (workflow + selection)
└── references/
    ├── aws.md
    ├── gcp.md
    └── azure.md
```
Claude reads only the relevant reference file.

#### Writing Patterns

Use the imperative form in instructions. Define output formats with an explicit template block (e.g., `ALWAYS use this exact template: ...`). Include examples using `Input:`/`Output:` pairs when the transformation is concrete.

### Writing Style

Explain why things matter rather than issuing heavy-handed MUSTs. Keep the skill general — not narrowly fit to your test examples. Write a draft, then read it with fresh eyes before finalizing.

### Test Cases

After writing the skill draft, come up with 2-3 realistic test prompts — the kind of thing a real user would actually say. Share them with the user: "Here are a few test cases I'd like to try. Do these look right, or do you want to add more?" Then run them.

Save test cases to `evals/evals.json` — just prompts for now, no assertions yet. See `references/schemas.md` for the full schema including the `assertions` field, which you'll add in Step 2.

---

## Running and evaluating test cases

This section is one continuous sequence — don't stop partway through. Do NOT use `/skill-test` or any other testing skill.

Put results in `<skill-name>-workspace/` as a sibling to the skill directory. Within the workspace, organize results by iteration (`iteration-1/`, `iteration-2/`, etc.) and within that, each test case gets a directory (`eval-0/`, `eval-1/`, etc.). Don't create all of this upfront — just create directories as you go.

### Step 1: Spawn all runs (with-skill AND baseline) in the same turn

For each test case, spawn two subagents in the same turn — one with the skill, one without. This is important: don't spawn the with-skill runs first and then come back for baselines later. Launch everything at once so it all finishes around the same time.

**With-skill run:**

```
Execute this task:
- Skill path: <path-to-skill>
- Task: <eval prompt>
- Input files: <eval files if any, or "none">
- Save outputs to: <workspace>/iteration-<N>/eval-<ID>/with_skill/outputs/
- Outputs to save: <what the user cares about — e.g., "the .docx file", "the final CSV">
```

**Baseline run** (same prompt, but the baseline depends on context):
- **Creating a new skill**: no skill at all. Same prompt, no skill path, save to `without_skill/outputs/`.
- **Improving an existing skill**: the old version. Before editing, snapshot the skill (`cp -r <skill-path> <workspace>/skill-snapshot/`), then point the baseline subagent at the snapshot. Save to `old_skill/outputs/`.

Write an `eval_metadata.json` for each test case (assertions can be empty for now). Give each eval a descriptive name based on what it's testing — not just "eval-0". Use this name for the directory too. If this iteration uses new or modified eval prompts, create these files for each new eval directory — don't assume they carry over from previous iterations.

```json
{
  "eval_id": 0,
  "eval_name": "descriptive-name-here",
  "prompt": "The user's task prompt",
  "assertions": []
}
```

### Step 2: While runs are in progress, draft assertions

Don't just wait for the runs to finish — use this time productively. Draft quantitative assertions for each test case and explain them to the user. If assertions already exist in `evals/evals.json`, review them and explain what they check.

Good assertions are objectively verifiable and have descriptive names — they should read clearly in the benchmark viewer so someone glancing at the results immediately understands what each one checks. Subjective skills (writing style, design quality) are better evaluated qualitatively — don't force assertions onto things that need human judgment.

Update `eval_metadata.json` and `evals/evals.json` with the assertions once drafted.

### Step 3: As runs complete, capture timing data

When each subagent task completes, you receive a notification containing `total_tokens` and `duration_ms`. Save this data immediately to `timing.json` in the run directory:

```json
{
  "total_tokens": 84852,
  "duration_ms": 23332,
  "total_duration_seconds": 23.3
}
```

This is the only opportunity to capture this data — it comes through the task notification and isn't persisted elsewhere. Process each notification as it arrives rather than trying to batch them.

### Step 4: Grade, aggregate, and launch the viewer

Once all runs are done:

1. **Grade each run** — spawn a grader subagent (or grade inline) that reads `agents/grader.md` and evaluates each assertion against the outputs. Save results to `grading.json` in each run directory. The grading.json expectations array must use the fields `text`, `passed`, and `evidence` (not `name`/`met`/`details` or other variants) — the viewer depends on these exact field names. For assertions that can be checked programmatically, write and run a script rather than eyeballing it — scripts are faster, more reliable, and can be reused across iterations.

2. **Aggregate into benchmark** — run the aggregation script from the skill-creator directory:
   ```bash
   python -m scripts.aggregate_benchmark <workspace>/iteration-N --skill-name <name>
   ```
   This produces `benchmark.json` and `benchmark.md` with pass_rate, time, and tokens for each configuration, with mean ± stddev and the delta. If generating benchmark.json manually, see `references/schemas.md` for the exact schema the viewer expects.
   Put each with_skill version before its baseline counterpart.

3. **Do an analyst pass** — read the benchmark data and surface patterns the aggregate stats might hide. See `agents/analyzer.md` (the "Analyzing Benchmark Results" section) for what to look for — things like assertions that always pass regardless of skill (non-discriminating), high-variance evals (possibly flaky), and time/token tradeoffs.

4. **Launch the viewer** with both qualitative outputs and quantitative data:
   ```bash
   nohup python <skill-creator-path>/eval-viewer/generate_review.py \
     <workspace>/iteration-N \
     --skill-name "my-skill" \
     --benchmark <workspace>/iteration-N/benchmark.json \
     > /dev/null 2>&1 &
   VIEWER_PID=$!
   ```
   For iteration 2+, also pass `--previous-workspace <workspace>/iteration-<N-1>`.

   **Headless environments:** If `webbrowser.open()` is not available or the environment has no display, use `--static <output_path>` to write a standalone HTML file instead of starting a server. Feedback will be downloaded as a `feedback.json` file when the user clicks "Submit All Reviews". After download, copy `feedback.json` into the workspace directory for the next iteration to pick up.

   Note: please use generate_review.py to create the viewer; there's no need to write custom HTML.

5. **Tell the user** the viewer is open and ask them to return when done reviewing.

### Step 5: Read the feedback

When the user tells you they're done, read `feedback.json`:

```json
{
  "reviews": [
    {"run_id": "eval-0-with_skill", "feedback": "the chart is missing axis labels", "timestamp": "..."},
    {"run_id": "eval-1-with_skill", "feedback": "", "timestamp": "..."},
    {"run_id": "eval-2-with_skill", "feedback": "perfect, love this", "timestamp": "..."}
  ],
  "status": "complete"
}
```

Empty feedback means the user thought it was fine. Focus your improvements on the test cases where the user had specific complaints.

Kill the viewer server when you're done with it:

```bash
kill $VIEWER_PID 2>/dev/null
```

---

## Improving the skill

### How to think about improvements

- **Generalize, don't overfit.** Skills must work across many future prompts, not just the test cases. If a stubborn issue appears, try different metaphors or patterns rather than adding rigid constraints.
- **Keep the prompt lean.** Read transcripts (not just outputs) and remove anything that causes unproductive work. If you find yourself writing ALWAYS or NEVER in all caps, reframe as reasoning — LLMs respond better to understanding why than to rigid rules.
- **Explain the why.** Give the model enough context to make good judgment calls. Surface the reasoning behind requirements, not just the requirements themselves.
- **Bundle repeated work.** If multiple test case transcripts all produced the same helper script independently, put it in `scripts/` and tell the skill to use it.

### The iteration loop

After improving the skill:

1. Apply your improvements to the skill
2. Rerun all test cases into a new `iteration-<N+1>/` directory, including baseline runs. If you're creating a new skill, the baseline is always `without_skill` (no skill) — that stays the same across iterations. If you're improving an existing skill, use your judgment on what makes sense as the baseline: the original version the user came in with, or the previous iteration.
3. Launch the reviewer with `--previous-workspace` pointing at the previous iteration
4. Wait for the user to review and tell you they're done
5. Read the new feedback, improve again, repeat

Keep going until:
- The user says they're happy
- The feedback is all empty (everything looks good)
- You're not making meaningful progress

---

## Advanced: Blind comparison

For situations where you want a more rigorous comparison between two versions of a skill (e.g., the user asks "is the new version actually better?"), there's a blind comparison system. Read `agents/comparator.md` and `agents/analyzer.md` for the details. The basic idea is: give two outputs to an independent agent without telling it which is which, and let it judge quality. Then analyze why the winner won.

This is optional, requires subagents, and most users won't need it. The human review loop is usually sufficient.

---

## Description Optimization

After creating or improving a skill, offer to optimize the description for better triggering accuracy.

### Step 1: Generate trigger eval queries

Create 20 eval queries — a mix of should-trigger and should-not-trigger. Save as JSON:

```json
[
  {"query": "the user prompt", "should_trigger": true},
  {"query": "another prompt", "should_trigger": false}
]
```

Make queries realistic and concrete — include file paths, company names, casual speech, typos, varying lengths. Focus on edge cases. Avoid abstract requests like `"Format this data"`.

For **should-trigger** (8-10): vary phrasing (formal and casual), include cases where the user doesn't name the skill but clearly needs it, and cases where this skill should win against a competing skill.

For **should-not-trigger** (8-10): focus on near-misses — queries sharing keywords but needing something different. Avoid obviously irrelevant negatives; the negative cases should be genuinely tricky.

### Step 2: Review with user

Present the eval set to the user for review using the HTML template:

1. Read the template from `assets/eval_review.html`
2. Replace the placeholders:
   - `__EVAL_DATA_PLACEHOLDER__` → the JSON array of eval items (no quotes around it — it's a JS variable assignment)
   - `__SKILL_NAME_PLACEHOLDER__` → the skill's name
   - `__SKILL_DESCRIPTION_PLACEHOLDER__` → the skill's current description
3. Write to a temp file (e.g., `/tmp/eval_review_<skill-name>.html`) and open it: `open /tmp/eval_review_<skill-name>.html`
4. The user can edit queries, toggle should-trigger, add/remove entries, then click "Export Eval Set"
5. The file downloads to `~/Downloads/eval_set.json` — check the Downloads folder for the most recent version in case there are multiple (e.g., `eval_set (1).json`)

This step matters — bad eval queries lead to bad descriptions.

### Step 3: Run the optimization loop

Save the eval set to the workspace, then run in the background (warn the user it will take a few minutes):

```bash
python -m scripts.run_loop \
  --eval-set <path-to-trigger-eval.json> \
  --skill-path <path-to-skill> \
  --model <model-id-powering-this-session> \
  --max-iterations 5 \
  --verbose
```

Use the model ID from your system prompt (the one powering the current session) so the triggering test matches what the user actually experiences.

While it runs, periodically tail the output to give the user updates on which iteration it's on and what the scores look like.

The script runs the full loop automatically: 60/40 train/test split, 3 runs per query for reliability, up to 5 iterations of Claude-proposed improvements, HTML report in browser, and returns `best_description` selected by test score (not train score) to avoid overfitting.

### Step 4: Apply the result

Take `best_description` from the JSON output and update the skill's SKILL.md frontmatter. Show the user before/after and report the scores.

---

## Package and Present (only if `present_files` tool is available)

Check whether you have access to the `present_files` tool. If you don't, skip this step. If you do, package the skill and present the .skill file to the user:

```bash
python -m scripts.package_skill <path/to/skill-folder>
```

After packaging, direct the user to the resulting `.skill` file path so they can install it.

---

## Claude Code-specific instructions

In Claude Code, the core workflow works fully including subagents, eval viewer browser launch, and the description optimization loop via `claude -p`.

**Skill output location for claude-superskills:**

When creating a skill that will be added to the claude-superskills package, place it in `skills/<skill-name>/` — never in platform directories (`.github/skills/`, `.claude/skills/`, `.codex/skills/`, etc. are all gitignored in this repo and must stay empty). See `references/claude-superskills-conventions.md` for the full set of rules.

**After creating a skill for claude-superskills:**
1. Add the skill to `bundles.json` under the appropriate bundle(s)
2. Add the skill to `README.md` skills table and bump the skills badge count
3. Update `CLAUDE.md` architecture tree and Skill Types section
4. Run `node scripts/release.js patch` to bump all 5 version files atomically

---

## Claude.ai-specific instructions

Claude.ai lacks subagents, so adapt as follows: run test cases sequentially yourself (no baselines, no parallel execution); present results inline in the conversation instead of launching the browser reviewer; skip quantitative benchmarking, description optimization (requires `claude -p`), and blind comparison. The core draft → test → feedback → improve loop still works. Packaging via `package_skill.py` works anywhere with Python.

---

## Reference files

- `agents/grader.md` — Evaluate assertions against outputs
- `agents/comparator.md` — Blind A/B comparison between two outputs
- `agents/analyzer.md` — Analyze why one version beat another
- `references/schemas.md` — JSON schemas for evals.json, grading.json, benchmark.json
- `references/claude-superskills-conventions.md` — Rules for contributing to claude-superskills

---

GENERATE THE EVAL VIEWER *BEFORE* evaluating inputs yourself. Get outputs in front of the human ASAP.
