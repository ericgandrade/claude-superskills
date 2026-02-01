#!/usr/bin/env bash
# Validates YAML frontmatter in SKILL.md files

set -e

SKILL_PATH="${1:-.}"

if [[ ! -f "$SKILL_PATH/SKILL.md" ]]; then
  echo "❌ Error: SKILL.md not found in $SKILL_PATH"
  exit 1
fi

echo "🔍 Validating YAML frontmatter in $SKILL_PATH/SKILL.md..."

# Extract frontmatter
FRONTMATTER=$(sed -n '/^---$/,/^---$/p' "$SKILL_PATH/SKILL.md" | sed '1d;$d')

# Check required fields
for field in name description version; do
  if ! echo "$FRONTMATTER" | grep -q "^$field:"; then
    echo "❌ Missing required field: $field"
    exit 2
  fi
done

# Check description format (third-person)
DESCRIPTION=$(echo "$FRONTMATTER" | grep "^description:" | sed 's/^description: *//')
if [[ ! "$DESCRIPTION" =~ "This skill should be used when" ]]; then
  echo "⚠️  Warning: Description should use third-person format"
  echo "   Expected: 'This skill should be used when...'"
  echo "   Found: $DESCRIPTION"
fi

echo "✅ YAML frontmatter valid!"
exit 0
