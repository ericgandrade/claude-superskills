---
name: agent-skill-orchestrator
description: This skill should be used when the user needs to solve a complex task and wants a detailed execution plan using the best available resources. Analyzes user requirements, discovers available plugins/agents/skills/MCPs, performs intelligent matching with confidence scoring, and creates strategic execution plans with alternatives. Works across all AI CLI platforms.
license: MIT
---

# agent-skill-orchestrator

## Purpose

Intelligent task planning and resource orchestration engine that analyzes user requirements and creates strategic execution plans using the best available resources. This skill performs automated discovery, intelligent matching with confidence scoring, and generates comprehensive plans with multiple options and fallback strategies.

The orchestrator operates as a planning assistant—it recommends approaches but always requests explicit user approval before execution. It serves as the intelligence layer above the discovery foundation, transforming "what do I have" into "how should I use it".

## When to Use

Invoke this skill when:

- User has a complex task requiring multiple steps or resources
- User wants to know the best approach to solve a problem
- User needs coordination between multiple plugins, agents, skills, or MCPs
- User wants optimized resource utilization for a task
- User is unsure which tools or approach to use
- User needs a strategic plan before implementation
- User wants to explore multiple solution approaches

## Platform Support

Works identically on all AI CLI platforms:
- **Claude Code** (`claude`)
- **GitHub Copilot CLI** (`gh copilot`)
- **Gemini CLI** (`gemini`)
- **OpenCode** (`opencode`)
- **OpenAI Codex** (`codex`)

## Progress Tracking

Display progress before each orchestration phase:

```
[██░░░░░░░░░░░░░░░░░░] 15% — Step 0: Discovering Available Resources
[████░░░░░░░░░░░░░░░░] 25% — Step 1: Analyzing User Request
[████████░░░░░░░░░░░░] 45% — Step 2: Intelligent Matching & Scoring
[████████████░░░░░░░░] 65% — Step 3: Generating Execution Plan
[██████████████████░░] 85% — Step 4: Presenting Plan for Approval
[████████████████████] 100% — Step 5: Plan Approved / Execution Ready
```

## Workflow

### Step -1: Prompt Quality Check (Pre-Analysis)

**Objective:** Ensure user request is clear and well-structured before planning.

**Why This Step Matters:**
- Vague prompts → poor resource matching → low-quality plans
- Optimized prompts → precise requirements → high-confidence plans
- Reduces planning iterations and "Refine plan" cycles

**Prompt Quality Check:** Before planning, assess whether the user request is specific enough to yield accurate resource matching. If the request is fewer than 20 words, lacks a clear action verb or goal, or uses only ambiguous references ("this", "it", "that") without context, invoke `prompt-engineer` to refine it first. A well-refined request improves confidence scores by 20–30% and reduces planning iterations. Proceed directly if the request is already clear.

**Impact on Planning:**
- ✅ Confidence scores increase 20-30%
- ✅ More accurate resource matching
- ✅ Better success criteria definition
- ✅ Reduced ambiguity in plan execution

---

### Step 0: Discover Available Resources

**Objective:** Obtain fresh inventory of all installed resources.

**Critical Dependency:** This skill MUST call `agent-skill-discovery` first.

**Actions:**

Invoke the discovery skill to get complete resource catalog:

```bash
# Call agent-skill-discovery skill
resources = invokeSkill("agent-skill-discovery")
```

**Expected Output:**

```json
{
  "platform": "Claude Code",
  "plugins": [
    {
      "name": "feature-dev",
      "agents": [
        {
          "name": "code-explorer",
          "description": "Analyzes existing codebase",
          "tools": ["Glob", "Grep", "Read", "Bash"]
        }
      ]
    }
  ],
  "skills": [
    {
      "name": "skill-creator",
      "description": "Creates new skills",
      "triggers": ["create a skill", "new skill"],
      "category": "development"
    }
  ],
  "mcpServers": [
    {
      "name": "claude_ai_Notion",
      "type": "stdio",
      "tools": ["notion-search", "notion-create-pages"]
    }
  ]
}
```

**Why This Step is Critical:**

- Ensures fresh, accurate resource availability
- Works across all platforms (discovery handles platform detection)
- Provides complete context for intelligent matching
- Avoids recommending unavailable resources

### Step 1: Analyze User Request

**Objective:** Extract requirements from user's task description.

**Actions:**

**Parse the request** to extract:
- **Task type** — development, content, integration, analysis, documentation, or planning. Infer from verbs: build/create/implement → development; transcribe/summarize/convert → content; connect/sync/automate → integration; review/debug/diagnose → analysis; document/write → documentation; design/plan/architect → planning.
- **Required capabilities** — code generation, web access, file processing, external integrations (detect service names: Notion, Jira, GitHub, Slack, Confluence, browser).
- **Keywords** — extract nouns and technology names for matching against resource descriptions and triggers.
- **Complexity** — simple (single tool, one step), moderate (2–3 steps, some coordination), complex (multi-phase, dependencies between steps).

### Step 2: Intelligent Matching & Scoring

**Objective:** Score each discovered resource against user requirements.

**Score each discovered resource** against the parsed requirements using five dimensions:

| Dimension | Weight | How to score |
|-----------|--------|--------------|
| Trigger phrase match | 30% | Does any trigger phrase from the resource overlap with the user's keywords? |
| Semantic similarity | 25% | Does the resource description align with the user's goal and domain? |
| Tool availability | 20% | Do the resource's tools cover the required capabilities (web, file I/O, code, integrations)? |
| Category relevance | 15% | Does the resource category match the detected task type? |
| MCP integration bonus | 10% | Is this an MCP tool and does the task require external service integrations? |

Total score = 0–100. Filter out resources below 40. Group into tiers: high confidence (≥80), medium (60–79), low (40–59).

### Step 3: Generate Execution Plan

**Objective:** Create strategic execution plans with alternatives.

**Build the primary strategy** by ordering high-confidence resources into a logical execution sequence:
1. Analysis/discovery resources first (if task requires understanding existing state)
2. Implementation resources in the middle (create, build, transform)
3. Validation/review resources last (check, audit, confirm)

**Build an alternative strategy** using medium-confidence resources not already in the primary plan — a simplified 2-step approach is sufficient for the alternative.

**Extract prerequisites:** For each MCP resource in the plan, add "MCP server X must be configured." For each plugin agent, add "Plugin X must be installed."

**Define success criteria** based on task type:
- development → code compiles without errors, tests pass, follows project conventions
- content → output format matches requirements, content is accurate and complete
- integration → external services respond successfully, data syncs correctly

### Step 4: Present Plan for Approval

**Objective:** Show comprehensive plan to user in clean markdown format.

**Output Structure:**

```markdown
## 📊 Discovery Analysis

**Platform:** {detected_platform}
**Task Type:** {requirements.taskType}
**Complexity:** {requirements.complexity}
**External Integrations:** {requirements.externalIntegrations.join(', ') || 'None'}

---

## 🔍 Resources Found ({total_count})

### High Confidence (80-100%)
- **{resource_name}** [{score}%] - {description}
  - **Why selected:** {reasoning}

### Medium Confidence (60-79%)
- **{resource_name}** [{score}%] - {description}

---

## ✅ Recommended Execution Plan

### Option 1: Primary Strategy (Recommended)

**Step {n}:** Use **{resource_name}** to {action}
- **Input:** {input_description}
- **Output:** {expected_output}
- **Tool:** {platform_tool_name}
- **Rationale:** {why_this_resource}

*(Repeat for each step)*

**Expected Outcome:** {final_result_description}
**Estimated Time:** {time_estimate}
**Risk Level:** {low|medium|high}

---

### Option 2: Alternative Strategy

**Step {n}:** Use **{alt_resource_name}** to {action}
- **Input:** {input_description}
- **Output:** {expected_output}
- **Rationale:** {why_this_alternative}

*(Simpler or different approach)*

---

## ⚠️ Prerequisites

Before executing this plan, ensure:

- [ ] {prerequisite_1}
- [ ] {prerequisite_2}
- [ ] {prerequisite_3}

---

## 🎯 Success Criteria

This plan will be successful when:

- [ ] {criterion_1}
- [ ] {criterion_2}
- [ ] {criterion_3}

---

## 💡 Notes

- **Parallel Execution:** Steps {x} and {y} can run in parallel
- **Fallback:** If Step {n} fails, try {alternative}
- **Dependencies:** Step {n+1} requires output from Step {n}

---

**⏸️ Awaiting your approval to proceed...**
```

### Step 5: Request Approval

**Objective:** Get explicit user confirmation before execution.

**Use AskUserQuestion:**

```javascript
AskUserQuestion({
  question: "Which execution plan would you like to proceed with?",
  header: "Plan Approval",
  options: [
    {
      label: "Execute Option 1 (Recommended)",
      description: "Primary strategy with highest confidence resources"
    },
    {
      label: "Execute Option 2 (Alternative)",
      description: "Alternative approach with different resource mix"
    },
    {
      label: "Refine plan",
      description: "Modify requirements or resource selection"
    },
    {
      label: "Cancel",
      description: "Do not execute, return to planning"
    }
  ]
});
```

**Handle Response:**

- **Execute Option 1/2:** Proceed with selected plan (Step 6)
- **Refine:** Ask follow-up questions, regenerate plan
- **Cancel:** Exit gracefully, no execution

### Step 6: Execute Plan (Optional)

**Objective:** Execute approved plan step-by-step.

**Execution Strategy:**

```javascript
async function executePlan(approvedPlan) {
  const results = [];

  for (const step of approvedPlan) {
    console.log(`\n🔄 Executing Step ${step.number}...`);
    console.log(`   Resource: ${step.resource.name}`);
    console.log(`   Action: ${step.action}`);

    try {
      // Invoke the resource (agent, skill, or MCP tool)
      const result = await invokeResource(step.resource, step.input);

      results.push({
        step: step.number,
        status: 'success',
        output: result
      });

      console.log(`✅ Step ${step.number} completed`);

    } catch (error) {
      console.error(`❌ Step ${step.number} failed: ${error.message}`);

      // Check for fallback
      if (step.fallback) {
        console.log(`🔄 Trying fallback: ${step.fallback.resource.name}`);
        const fallbackResult = await invokeResource(step.fallback.resource, step.input);
        results.push({
          step: step.number,
          status: 'fallback',
          output: fallbackResult
        });
      } else {
        throw error; // No fallback, abort
      }
    }
  }

  return results;
}

async function invokeResource(resource, input) {
  if (resource.type === 'skill') {
    return await invokeSkill(resource.name, input);
  } else if (resource.type === 'agent') {
    return await invokeAgent(resource.name, input);
  } else if (resource.type === 'mcp') {
    return await invokeMCPTool(resource.name, input);
  }
}
```

**Progress Reporting:**

Display progress during execution:

```markdown
## 🚀 Execution Progress

✅ Step 1: Completed (feature-dev:code-explorer)
🔄 Step 2: In progress (feature-dev:code-architect)
⏸️ Step 3: Pending (code-review:code-review)

**Current Output:**
{step_output_preview}
```

## Critical Rules

### **NEVER:**

- ❌ Skip calling agent-skill-discovery first (Step 0 is mandatory)
- ❌ Execute plans without explicit user approval
- ❌ Recommend resources with score < 40% without disclosure
- ❌ Hardcode platform-specific logic (use platform detection from discovery)
- ❌ Assume resource availability without checking discovery results
- ❌ Fail silently if discovery returns empty (inform user)
- ❌ Mix resources from different platforms (stay consistent)
- ❌ Ignore user constraints or preferences in plan generation

### **ALWAYS:**

- ✅ Assess prompt quality before planning (Step -1) - NEW in v1.1.0
- ✅ Call prompt-engineer if quality score < 50% for optimal results
- ✅ Start with fresh discovery (Step 0) on every invocation
- ✅ Show confidence scores with reasoning for all recommendations
- ✅ Provide multiple options (Option 1, Option 2) when feasible
- ✅ List prerequisites clearly before execution
- ✅ Define measurable success criteria
- ✅ Request explicit approval before execution (Step 5)
- ✅ Use platform-appropriate tool names from discovery results
- ✅ Handle missing resources gracefully (suggest alternatives or abort)
- ✅ Report progress during execution (if Step 6 is reached)
- ✅ Explain reasoning for each resource selection

### **ORCHESTRATION PRINCIPLES:**

- **Discovery First:** Never plan without fresh resource inventory
- **Confidence Transparency:** Always show scores and reasoning
- **Multiple Options:** Provide alternatives when possible
- **Approval Required:** No autonomous execution without consent
- **Graceful Degradation:** If primary plan fails, try alternatives
- **Platform Agnostic:** Work identically on all 5 platforms

## Example Usage

### Example 1: Feature Development

**User Request:**
```
"Plan how to build a REST API with authentication"
```

**Orchestrator Output:**

```markdown
## 📊 Discovery Analysis

**Platform:** Claude Code
**Task Type:** development
**Complexity:** moderate
**External Integrations:** None

---

## 🔍 Resources Found (8)

### High Confidence (80-100%)
- **feature-dev:code-architect** [92%] - Designs feature architectures
  - **Why selected:** Best match for API design patterns
- **feature-dev:code-explorer** [88%] - Analyzes existing codebase
  - **Why selected:** Understands existing auth patterns
- **feature-dev:code-reviewer** [85%] - Reviews code for security
  - **Why selected:** Critical for auth security validation

### Medium Confidence (60-79%)
- **skill-creator** [65%] - Scaffolds code structures
  - Can generate boilerplate auth code

---

## ✅ Recommended Execution Plan

### Option 1: Primary Strategy (Recommended)

**Step 1:** Use **feature-dev:code-explorer** to analyze existing authentication patterns
- **Input:** Codebase context
- **Output:** Analysis of current auth implementation
- **Tool:** Read, Grep, Glob
- **Rationale:** Understand existing patterns before designing (88% match)

**Step 2:** Use **feature-dev:code-architect** to design REST API structure with auth
- **Input:** Analysis results from Step 1
- **Output:** API architecture and auth flow design
- **Tool:** Read, Write, Glob
- **Rationale:** Specialized in API design patterns (92% match)

**Step 3:** Use **skill-creator** to scaffold authentication boilerplate
- **Input:** Architecture design from Step 2
- **Output:** Auth middleware code structure
- **Tool:** Write
- **Rationale:** Generates standard auth patterns (65% match)

**Step 4:** Use **feature-dev:code-reviewer** to validate security
- **Input:** Generated auth code from Step 3
- **Output:** Security audit report
- **Tool:** Read, Grep
- **Rationale:** Critical for auth security review (85% match)

**Expected Outcome:** Secure REST API with JWT authentication, following project conventions
**Estimated Time:** ~45 minutes
**Risk Level:** Low (high confidence resources, well-defined approach)

---

### Option 2: Alternative Strategy

**Step 1:** Use **skill-creator** to scaffold complete API + auth structure
- **Input:** User requirements
- **Output:** Boilerplate API with basic auth
- **Rationale:** Faster but less customized approach

**Step 2:** Use **feature-dev:code-reviewer** to validate implementation
- **Input:** Generated code
- **Output:** Quality and security review
- **Rationale:** Ensure boilerplate meets standards

*(Simpler 2-step approach for rapid prototyping)*

---

## ⚠️ Prerequisites

- [ ] Plugin "feature-dev" must be installed
- [ ] Plugin "code-review" must be installed (for Option 1 Step 4)
- [ ] Skill "skill-creator" must be installed
- [ ] Codebase must be accessible (for pattern analysis)

---

## 🎯 Success Criteria

- [ ] REST API endpoints defined and functional
- [ ] JWT authentication implemented correctly
- [ ] Security review passes with no critical issues
- [ ] Code follows project conventions
- [ ] Tests pass for auth flows

---

## 💡 Notes

- **Parallel Execution:** Steps 3 and 4 can overlap (scaffold while reviewing)
- **Fallback:** If feature-dev:code-architect unavailable, use manual design
- **Dependencies:** Step 2 requires output from Step 1 (pattern analysis)

---

**⏸️ Awaiting your approval to proceed...**
```

### Example 2: Content Processing + Integration

**User Request:**
```
"Analyze this meeting recording and create Jira tickets"
```

**Discovery Analysis:**

```markdown
## 📊 Discovery Analysis

**Platform:** GitHub Copilot CLI
**Task Type:** content + integration
**Complexity:** moderate
**External Integrations:** Jira

---
```

*(Plan output follows the same structure as Example 1 — resource scoring, primary + alternative strategies, prerequisites, success criteria, and approval prompt.)*

### Example 3: Web Research + Documentation

**User Request:**
```
"Research competitor pricing and create a Notion page"
```

**Discovery Analysis:**

```markdown
## 📊 Discovery Analysis

**Platform:** Gemini CLI
**Task Type:** integration + documentation
**Complexity:** moderate
**External Integrations:** Notion, Web

---
```

*(Plan output follows the same structure as Example 1 — resource scoring, primary + alternative strategies, prerequisites, success criteria, and approval prompt.)*

### Example 4: Vague Prompt → Optimized Plan (NEW v1.1.0)

**User Request (Vague):**
```
"help me with API stuff"
```

**Discovery Analysis:**

```markdown
## 📊 Discovery Analysis

**Platform:** Claude Code
**Task Type:** development
**Complexity:** moderate
**External Integrations:** None

---
```

*(Plan output follows the same structure as Example 1 — resource scoring, primary + alternative strategies, prerequisites, success criteria, and approval prompt.)*
