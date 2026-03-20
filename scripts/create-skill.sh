#!/usr/bin/env bash

set -euo pipefail

SKILL_NAME="${1:-}"

if [[ -z "$SKILL_NAME" ]]; then
    echo "Usage: ./scripts/create-skill.sh <skill-name>"
    echo ""
    echo "Example:"
    echo "  ./scripts/create-skill.sh prompt-optimizer"
    echo ""
    exit 1
fi

SKILL_DIR="skills/$SKILL_NAME"

if [[ -e "$SKILL_DIR" ]]; then
    echo "❌ Skill already exists: $SKILL_DIR"
    exit 1
fi

echo "🎯 Creating skill source: $SKILL_DIR"
mkdir -p "$SKILL_DIR"

cat > "$SKILL_DIR/SKILL.md" << 'SKILLEOF'
---
name: SKILLNAME
description: This skill should be used when the user needs to [clear trigger and outcome].
license: MIT
---

## Purpose

[Explain what this skill does and why it exists.]

## When to Use

- [Specific scenario 1]
- [Specific scenario 2]
- [Specific scenario 3]

## Workflow

### Step 0: Discovery (if needed)

[Discovery logic for resources or configuration. Remove if not needed.]

### Step 1: [Main Action Name]

[Detailed instructions for this step.]

### Step 2: [Next Action Name]

[Continue workflow.]

## Critical Rules

- Never hardcode paths or values.
- Never assume project structure without checking.
- Always discover resources at runtime when structure matters.
- Always ask for clarification when ambiguity would change behavior.

## Example Usage

1. "[Example request 1]"
2. "[Example request 2]"
3. "[Example request 3]"
SKILLEOF

cat > "$SKILL_DIR/README.md" << 'READMEOF'
# SKILLNAME

## Overview

[High-level overview of the skill.]

## Metadata

| Field | Value |
|-------|-------|
| Version | 1.0.0 |
| Author | [Your Name] |
| Created | [YYYY-MM-DD] |
| Updated | [YYYY-MM-DD] |
| Platforms | All 8 platforms |
| Category | [category] |
| Tags | [tag1, tag2, tag3] |
| Risk | [none/safe/moderate/critical] |
READMEOF

if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s/SKILLNAME/$SKILL_NAME/g" "$SKILL_DIR/SKILL.md" "$SKILL_DIR/README.md"
else
    sed -i "s/SKILLNAME/$SKILL_NAME/g" "$SKILL_DIR/SKILL.md" "$SKILL_DIR/README.md"
fi

echo ""
echo "✅ Skill '$SKILL_NAME' created successfully"
echo ""
echo "Created:"
echo "  - $SKILL_DIR/SKILL.md"
echo "  - $SKILL_DIR/README.md"
echo ""
echo "Next steps:"
echo "  1. Replace placeholders in both files"
echo "  2. Run ./scripts/validate-skill-yaml.sh $SKILL_DIR"
echo "  3. Run ./scripts/validate-skill-content.sh $SKILL_DIR"
echo "  4. Update README.md, CLAUDE.md, bundles.json, and related docs if needed"
