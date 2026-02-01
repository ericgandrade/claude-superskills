#!/usr/bin/env bash
# Updates main README.md with new skill entry

set -e

SKILL_NAME="$1"

if [[ -z "$SKILL_NAME" ]]; then
  echo "Usage: $0 <skill-name>"
  exit 1
fi

SKILL_PATH=".github/skills/$SKILL_NAME"

if [[ ! -f "$SKILL_PATH/SKILL.md" ]]; then
  echo "❌ Error: Skill not found at $SKILL_PATH"
  exit 1
fi

echo "📝 Updating README.md with $SKILL_NAME..."

# Extract metadata
NAME=$(grep "^name:" "$SKILL_PATH/SKILL.md" | sed 's/^name: *//')
DESCRIPTION=$(grep "^description:" "$SKILL_PATH/SKILL.md" | sed 's/^description: *//')

echo ""
echo "### 🆕 $NAME"
echo "$DESCRIPTION"
echo ""
echo "**[→ Full Documentation]($SKILL_PATH/README.md)**"
echo ""

echo "✅ Add the above to README.md under '## Available Skills'"
exit 0
