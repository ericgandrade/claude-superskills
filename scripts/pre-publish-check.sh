#!/usr/bin/env bash
# Pre-publish checklist for npm package
# Usage: ./scripts/pre-publish-check.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PKG_DIR="$REPO_ROOT/cli-installer"

echo "📦 Pre-publish Checklist for claude-superskills"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if package directory exists
if [ ! -d "$PKG_DIR" ]; then
  echo "❌ Package directory not found: $PKG_DIR"
  exit 1
fi

cd "$PKG_DIR"

# 1. Check package.json exists
echo "1️⃣  Checking package.json..."
if [ ! -f "package.json" ]; then
  echo "   ❌ package.json not found!"
  exit 1
fi
echo "   ✅ package.json exists"
echo ""

# 2. Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version" 2>/dev/null)
if [ -z "$CURRENT_VERSION" ]; then
  echo "   ❌ Cannot read version from package.json"
  exit 1
fi
echo "2️⃣  Current version: $CURRENT_VERSION"
echo ""

# 3. Check if version already published
echo "3️⃣  Checking if version is published on npm..."
PUBLISHED_VERSION=$(npm view claude-superskills version 2>/dev/null || echo "0.0.0")

if [ "$CURRENT_VERSION" = "$PUBLISHED_VERSION" ]; then
  echo "   ❌ Version $CURRENT_VERSION is already published!"
  echo "   📝 Run one of these commands:"
  echo "      ./scripts/bump-version.sh patch  # Bug fixes"
  echo "      ./scripts/bump-version.sh minor  # New features"
  echo "      ./scripts/bump-version.sh major  # Breaking changes"
  exit 1
else
  echo "   ✅ Version $CURRENT_VERSION is new (npm has $PUBLISHED_VERSION)"
fi
echo ""

# 4. Check package-lock.json exists
echo "4️⃣  Checking package-lock.json..."
if [ ! -f "package-lock.json" ]; then
  echo "   ❌ package-lock.json not found!"
  echo "   📝 Run: npm install"
  exit 1
fi
echo "   ✅ package-lock.json exists"
echo ""

# 5. Verify version sync
echo "5️⃣  Verifying version sync..."
cd "$REPO_ROOT"
if ./scripts/verify-version-sync.sh; then
  echo "   ✅ Version sync OK"
else
  echo "   ❌ Version sync failed"
  exit 1
fi
echo ""

# 6. Check documentation consistency
echo "6️⃣  Checking documentation consistency..."
if ./scripts/check-doc-consistency.sh; then
  echo "   ✅ Documentation consistency OK"
else
  echo "   ❌ Documentation consistency failed"
  exit 1
fi
echo ""

# 7. Check for uncommitted changes
echo "7️⃣  Checking git status..."
cd "$REPO_ROOT"
if ! git diff-index --quiet HEAD -- 2>/dev/null; then
  echo "   ⚠️  You have uncommitted changes"
  echo "   📝 Consider committing before publishing"
else
  echo "   ✅ No uncommitted changes"
fi
echo ""

# 8. Run tests
echo "8️⃣  Running tests..."
cd "$PKG_DIR"
if npm test --silent; then
  echo "   ✅ All tests passed"
else
  echo "   ❌ Tests failed!"
  exit 1
fi
echo ""

# 9. Check what will be published
echo "9️⃣  Files to be published:"
echo ""
npm pack --dry-run 2>/dev/null | tail -n +2 | sed 's/^/   /'
echo ""

# 10. Calculate package size
TARBALL_SIZE=$(npm pack --dry-run 2>&1 | grep "package size" | awk '{print $4, $5}')
UNPACKED_SIZE=$(npm pack --dry-run 2>&1 | grep "unpacked size" | awk '{print $4, $5}')

echo "🔟  Package size:"
echo "   📦 Tarball: $TARBALL_SIZE"
echo "   📂 Unpacked: $UNPACKED_SIZE"
echo ""

# 11. Check npm audit
echo "1️⃣1️⃣  Security audit..."
if npm audit --audit-level=moderate --silent 2>/dev/null; then
  echo "   ✅ No moderate or higher vulnerabilities"
else
  echo "   ⚠️  Security vulnerabilities found (run 'npm audit' for details)"
fi
echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Pre-publish checks completed successfully!"
echo ""
echo "📋 Ready to publish version $CURRENT_VERSION"
echo ""
echo "Next steps:"
echo "  1. Review changes: git log"
echo "  2. Commit: git commit -m 'chore: bump version to $CURRENT_VERSION'"
echo "  3. Tag: git tag v$CURRENT_VERSION"
echo "  4. Push: git push origin main && git push origin v$CURRENT_VERSION"
echo "  5. Confirm GitHub Actions publish workflow runs from the tag push"
echo ""
