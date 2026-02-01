#!/usr/bin/env bash
# Validates SKILL.md content quality and style

set -e

SKILL_PATH="${1:-.}"

if [[ ! -f "$SKILL_PATH/SKILL.md" ]]; then
  echo "❌ Error: SKILL.md not found"
  exit 1
fi

echo "🔍 Validating content in $SKILL_PATH/SKILL.md..."

# Word count (excluding frontmatter)
WORD_COUNT=$(sed '/^---$/,/^---$/d' "$SKILL_PATH/SKILL.md" | wc -w | tr -d ' ')

if [[ $WORD_COUNT -gt 5000 ]]; then
  echo "❌ Error: SKILL.md too long ($WORD_COUNT words, max 5000)"
  echo "   Consider moving detailed content to references/"
  exit 2
elif [[ $WORD_COUNT -lt 1500 ]]; then
  echo "⚠️  Warning: SKILL.md quite short ($WORD_COUNT words, ideal 1500-2000)"
elif [[ $WORD_COUNT -gt 2000 ]]; then
  echo "⚠️  Info: SKILL.md is $WORD_COUNT words (ideal 1500-2000)"
else
  echo "✅ Word count excellent: $WORD_COUNT words"
fi

# Check for second-person usage
if grep -qi "you should\|you need\|you can\|you must" "$SKILL_PATH/SKILL.md"; then
  echo "⚠️  Warning: Detected potential second-person usage"
  echo "   Use imperative form instead: 'To do X, run Y'"
fi

echo "✅ Content validation complete!"
exit 0
