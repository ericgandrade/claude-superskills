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

# Check name format (kebab-case)
SKILL_NAME=$(echo "$FRONTMATTER" | grep "^name:" | sed 's/^name: *//')
if [[ ! "$SKILL_NAME" =~ ^[a-z][a-z0-9-]*$ ]]; then
  echo "❌ Error: Skill name must be in kebab-case (lowercase-with-hyphens)"
  echo "   Found: '$SKILL_NAME'"
  echo "   Expected format: lowercase-words-separated-by-hyphens"
  echo "   Examples: prompt-engineer, skill-creator, code-reviewer"
  exit 2
fi

# Check if name contains uppercase, underscores, or camelCase
if [[ "$SKILL_NAME" =~ [A-Z] ]]; then
  echo "❌ Error: Skill name contains uppercase letters"
  echo "   Found: '$SKILL_NAME'"
  echo "   Convert to kebab-case: $(echo "$SKILL_NAME" | tr '[:upper:]' '[:lower:]' | tr ' _' '-')"
  exit 2
fi

if [[ "$SKILL_NAME" =~ _ ]]; then
  echo "❌ Error: Skill name uses underscores (snake_case)"
  echo "   Found: '$SKILL_NAME'"
  echo "   Use hyphens instead: ${SKILL_NAME//_/-}"
  exit 2
fi

# Check description format (third-person)
DESCRIPTION=$(echo "$FRONTMATTER" | grep "^description:" | sed 's/^description: *//')
if [[ ! "$DESCRIPTION" =~ "This skill should be used when" ]]; then
  echo "⚠️  Warning: Description should use third-person format"
  echo "   Expected: 'This skill should be used when...'"
  echo "   Found: $DESCRIPTION"
fi

# Check for bare YAML date values (YYYY-MM-DD parsed as Date objects by js-yaml)
DATE_FIELDS=$(echo "$FRONTMATTER" | grep -E "^[a-z_]+: [0-9]{4}-[0-9]{2}-[0-9]{2}$" || true)
if [[ -n "$DATE_FIELDS" ]]; then
  echo "❌ Error: Bare date values found in SKILL.md frontmatter:"
  echo "$DATE_FIELDS" | while IFS= read -r line; do echo "   $line"; done
  echo ""
  echo "   js-yaml (Claude Code's YAML parser) treats YYYY-MM-DD as Date objects,"
  echo "   not strings. This causes 'malformed YAML frontmatter' errors in Claude Code."
  echo ""
  echo "   Fix: Move 'created' and 'updated' dates to the README.md Metadata section."
  echo "   If you must keep them in frontmatter, quote them: created: \"2026-02-20\""
  exit 2
fi

echo "✅ YAML frontmatter valid!"
echo "✅ Skill name format correct: $SKILL_NAME"
exit 0
