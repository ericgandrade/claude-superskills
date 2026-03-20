#!/usr/bin/env bash

set -euo pipefail

SKILLS_REPO=$1

if [ -z "$SKILLS_REPO" ]; then
    echo "Usage: ./install-skills.sh <path-to-skills-repo>"
    echo ""
    echo "Example:"
    echo "  ./install-skills.sh ~/code/claude-superskills"
    echo "  ./install-skills.sh /Users/username/Projects/my-skills"
    echo ""
    exit 1
fi

# Expand tilde and resolve path
SKILLS_REPO="${SKILLS_REPO/#\~/$HOME}"
SKILLS_REPO=$(cd "$SKILLS_REPO" 2>/dev/null && pwd || echo "$SKILLS_REPO")

if [ ! -d "$SKILLS_REPO" ]; then
    echo "❌ Directory not found: $SKILLS_REPO"
    echo ""
    echo "Please provide a valid path to your skills repository."
    exit 1
fi

SOURCE_DIR="$SKILLS_REPO/skills"

if [ ! -d "$SOURCE_DIR" ]; then
    echo "❌ Source skills directory not found: $SOURCE_DIR"
    echo ""
    echo "This script expects a repository with skills stored under skills/"
    exit 1
fi

echo "🔧 Installing skills from:"
echo "   $SKILLS_REPO"
echo ""

CONFIGURED=0

# GitHub Copilot CLI - uses ~/.github/skills/ directory
if command -v gh &> /dev/null && gh copilot --version &> /dev/null 2>&1; then
    echo "✅ Installing for GitHub Copilot CLI..."
    mkdir -p ~/.github/skills
    
    # Create symlink for each skill
    for skill_dir in "$SOURCE_DIR"/*; do
        if [ -d "$skill_dir" ] && [ -f "$skill_dir/SKILL.md" ]; then
            skill_name=$(basename "$skill_dir")
            target="$HOME/.github/skills/$skill_name"
            
            # Remove existing symlink or directory
            if [ -L "$target" ] || [ -d "$target" ]; then
                rm -rf "$target"
            fi
            
            # Create symlink
            ln -s "$skill_dir" "$target"
            echo "   ✓ Installed: $skill_name"
        fi
    done
    
    echo "   Skills directory: ~/.github/skills/"
    CONFIGURED=$((CONFIGURED + 1))
else
    echo "⚠️  GitHub Copilot CLI not installed - skipping"
fi

echo ""

# Claude Code - uses ~/.claude/skills/ directory  
if command -v claude &> /dev/null; then
    echo "✅ Installing for Claude Code..."
    mkdir -p ~/.claude/skills
    
    # Create symlink for each skill
    for skill_dir in "$SOURCE_DIR"/*; do
        if [ -d "$skill_dir" ] && [ -f "$skill_dir/SKILL.md" ]; then
            skill_name=$(basename "$skill_dir")
            target="$HOME/.claude/skills/$skill_name"
            
            # Remove existing symlink or directory
            if [ -L "$target" ] || [ -d "$target" ]; then
                rm -rf "$target"
            fi
            
            # Create symlink
            ln -s "$skill_dir" "$target"
            echo "   ✓ Installed: $skill_name"
        fi
    done
    
    echo "   Skills directory: ~/.claude/skills/"
    CONFIGURED=$((CONFIGURED + 1))
else
    echo "⚠️  Claude Code not installed - skipping"
fi

echo ""
echo "────────────────────────────────────────"

if [ $CONFIGURED -eq 0 ]; then
    echo "❌ No AI CLI tools found. Install at least one:"
    echo "   • GitHub Copilot CLI: gh extension install github/gh-copilot"
    echo "   • Claude Code: https://claude.ai/code"
    exit 1
fi

echo "✅ Skills installed successfully!"
echo ""
echo "Benefits of symlink installation:"
echo "  • Updates automatically when you pull changes (git pull)"
echo "  • No need to reinstall after skill updates"
echo "  • Single source of truth in your repository skills/ directory"
echo ""
echo "Test skills in a NEW terminal:"
if command -v gh &> /dev/null && gh copilot --version &> /dev/null 2>&1; then
    echo "  GitHub Copilot: Start copilot and use skill triggers"
fi
if command -v claude &> /dev/null; then
    echo "  Claude Code: Start claude and use skill triggers"
fi
echo ""
