#!/usr/bin/env bash
# Verify version synchronization across release-critical files

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$REPO_ROOT"

echo "🔍 Verifying version synchronization..."
echo ""

PACKAGE_VERSION=$(node -p "require('./cli-installer/package.json').version")
PLUGIN_VERSION=$(node -p "require('./.claude-plugin/plugin.json').version")

ERRORS=0

check_equal() {
  local label="$1"
  local actual="$2"
  local expected="$3"

  if [ "$actual" = "$expected" ]; then
    echo "✅ $label: $actual"
  else
    echo "❌ $label: expected $expected, found $actual"
    ERRORS=$((ERRORS + 1))
  fi
}

README_TITLE=$(grep -E '^# ' README.md | head -1 || true)
README_VERSION_BADGE=$(grep -Eo 'version-[0-9]+\.[0-9]+\.[0-9]+' README.md | head -1 | sed 's/version-//' || true)
CLI_README_TITLE=$(grep -E '^# ' cli-installer/README.md | head -1 || true)
CLI_README_VERSION_BADGE=$(grep -Eo 'version-[0-9]+\.[0-9]+\.[0-9]+' cli-installer/README.md | head -1 | sed 's/version-//' || true)
CLAUDE_HEADER_VERSION=$(grep -Eo 'v[0-9]+\.[0-9]+\.[0-9]+' CLAUDE.md | head -1 | sed 's/^v//' || true)

check_equal "cli-installer/package.json" "$PACKAGE_VERSION" "$PACKAGE_VERSION"
check_equal ".claude-plugin/plugin.json" "$PLUGIN_VERSION" "$PACKAGE_VERSION"
check_equal "README.md version badge" "$README_VERSION_BADGE" "$PACKAGE_VERSION"
check_equal "cli-installer/README.md version badge" "$CLI_README_VERSION_BADGE" "$PACKAGE_VERSION"
check_equal "CLAUDE.md overview version" "$CLAUDE_HEADER_VERSION" "$PACKAGE_VERSION"

if printf '%s\n' "$README_TITLE" | grep -q "v$PACKAGE_VERSION"; then
  echo "✅ README.md title: $README_TITLE"
else
  echo "❌ README.md title does not contain v$PACKAGE_VERSION"
  ERRORS=$((ERRORS + 1))
fi

if printf '%s\n' "$CLI_README_TITLE" | grep -q "v$PACKAGE_VERSION"; then
  echo "✅ cli-installer/README.md title: $CLI_README_TITLE"
else
  echo "❌ cli-installer/README.md title does not contain v$PACKAGE_VERSION"
  ERRORS=$((ERRORS + 1))
fi

echo ""
if [ "$ERRORS" -eq 0 ]; then
  echo "✅ Version synchronization passed"
  exit 0
fi

echo "❌ Version synchronization failed with $ERRORS issue(s)"
exit 1
