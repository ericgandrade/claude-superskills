#!/usr/bin/env bash
# Check for stale documentation claims and architecture regressions

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$REPO_ROOT"

echo "🧭 Checking documentation consistency..."
echo ""

SKILL_COUNT=$(find skills -mindepth 1 -maxdepth 1 -type d | wc -l | tr -d ' ')
PACKAGE_VERSION=$(node -p "require('./cli-installer/package.json').version")

ERRORS=0

check_contains() {
  local file="$1"
  local pattern="$2"
  local label="$3"

  if grep -Fq "$pattern" "$file"; then
    echo "✅ $label"
  else
    echo "❌ $label"
    ERRORS=$((ERRORS + 1))
  fi
}

check_absent() {
  local file="$1"
  local pattern="$2"
  local label="$3"

  if grep -Fq "$pattern" "$file"; then
    echo "❌ $label"
    ERRORS=$((ERRORS + 1))
  else
    echo "✅ $label"
  fi
}

check_contains "README.md" "skills-$SKILL_COUNT-" "README.md skill badge matches count $SKILL_COUNT"
check_contains "README.md" "version-$PACKAGE_VERSION-" "README.md version badge matches $PACKAGE_VERSION"
check_contains "cli-installer/README.md" "Install $SKILL_COUNT reusable AI skills" "cli-installer/README.md skill count matches $SKILL_COUNT"
check_contains "cli-installer/README.md" "version-$PACKAGE_VERSION-" "cli-installer/README.md version badge matches $PACKAGE_VERSION"
check_contains ".claude-plugin/marketplace.json" "$SKILL_COUNT universal AI skills" "marketplace description matches skill count $SKILL_COUNT"
check_contains "docs/guides/skill-anatomy.md" '`skills/` is the only in-repository source of truth' "skill anatomy states current source-of-truth model"

check_absent "cli-installer/README.md" "Available Skills (10)" "cli-installer/README.md does not advertise obsolete skill count"
check_absent ".claude-plugin/marketplace.json" "14 universal AI skills" "marketplace.json does not advertise obsolete skill count"
check_absent "docs/guides/skill-anatomy.md" "Replicated across:" "skill-anatomy.md does not describe mirrored platform directories"
check_absent "docs/guides/skill-anatomy.md" ".github/skills/skill-creator/" "skill-anatomy.md does not use deprecated in-repo platform path example"
check_absent "CLAUDE.md" "all 45 skills" "CLAUDE.md does not contain stale total count"

echo ""
if [ "$ERRORS" -eq 0 ]; then
  echo "✅ Documentation consistency checks passed"
  exit 0
fi

echo "❌ Documentation consistency checks failed with $ERRORS issue(s)"
exit 1
