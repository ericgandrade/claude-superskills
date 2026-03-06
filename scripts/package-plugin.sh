#!/usr/bin/env bash
# package-plugin.sh — Generate a Claude Desktop plugin ZIP package
# Output: plugin-output/claude-superskills-vX.Y.Z.zip
# Usage: ./scripts/package-plugin.sh

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PACKAGE_JSON="$REPO_ROOT/cli-installer/package.json"
OUTPUT_DIR="$REPO_ROOT/plugin-output"

# Read version from package.json
VERSION=$(node -e "console.log(require('$PACKAGE_JSON').version)")
ZIP_NAME="claude-superskills-v${VERSION}.zip"
ZIP_PATH="$OUTPUT_DIR/$ZIP_NAME"

echo "Packaging claude-superskills v${VERSION}..."

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Remove any previous zip
rm -f "$OUTPUT_DIR"/claude-superskills-v*.zip

# Generate zip from repo root, excluding non-essential files
cd "$REPO_ROOT"
zip -r "$ZIP_PATH" . \
  --exclude "*.git*" \
  --exclude "*node_modules*" \
  --exclude "*plugin-output*" \
  --exclude "*__pycache__*" \
  --exclude "*.pyc" \
  --exclude "*.log" \
  --exclude ".DS_Store" \
  --exclude ".env" \
  --exclude "*.swp" \
  --exclude "*.swo" \
  --exclude "*~" \
  --exclude ".github/skills/*" \
  --exclude ".claude/skills/*" \
  --exclude ".codex/skills/*" \
  --exclude ".agent/skills/*" \
  --exclude ".agents/skills/*" \
  --exclude ".gemini/skills/*" \
  --exclude ".cursor/skills/*" \
  --exclude ".adal/skills/*" \
  --exclude ".antigravity/skills/*" \
  --exclude ".opencode/skills/*" \
  --exclude "cli-installer/skills/*" \
  --exclude "output/*" \
  --exclude "proposta-media/*" \
  --exclude "Proposta*" \
  --exclude "antigravity-awesome-skills/*"

# Check file size
SIZE_BYTES=$(stat -f%z "$ZIP_PATH" 2>/dev/null || stat -c%s "$ZIP_PATH")
SIZE_MB=$(echo "scale=1; $SIZE_BYTES / 1048576" | bc)

echo ""
echo "Done: $ZIP_PATH"
echo "Size: ${SIZE_MB} MB"

if (( $(echo "$SIZE_MB > 50" | bc -l) )); then
  echo ""
  echo "WARNING: File exceeds 50 MB Claude Desktop upload limit (${SIZE_MB} MB)."
  echo "Consider excluding additional files from the package."
  exit 1
fi

echo ""
echo "Upload at: Claude Desktop -> Organization Settings -> Plugins -> Add plugins -> Upload a file"
