#!/usr/bin/env bash
# =============================================================================
# claude-superskills — Local Installer (no npm/npx required)
#
# Use this when you have cloned the repository locally and want to install
# skills directly from the skills/ directory, without downloading anything.
#
# Usage:
#   ./scripts/local-install.sh           # Interactive (select platforms)
#   ./scripts/local-install.sh -y        # Auto-install to all detected platforms
#   ./scripts/local-install.sh -y -q     # Silent auto-install
#   ./scripts/local-install.sh --help
#
# Must be run from the repository root, or provide the repo path:
#   bash scripts/local-install.sh
# =============================================================================
set -euo pipefail

# ---------------------------------------------------------------------------
# Resolve repo root (the directory containing skills/)
# ---------------------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SKILLS_DIR="$REPO_ROOT/skills"

# ---------------------------------------------------------------------------
# Flags
# ---------------------------------------------------------------------------
YES=false
QUIET=false

# ---------------------------------------------------------------------------
# Colors
# ---------------------------------------------------------------------------
if [[ -t 1 ]]; then
  GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'
  BLUE='\033[0;34m'; CYAN='\033[0;36m'; BOLD='\033[1m'; NC='\033[0m'
else
  GREEN=''; YELLOW=''; RED=''; BLUE=''; CYAN=''; BOLD=''; NC=''
fi

ok()   { echo -e "${GREEN}  ✓${NC} $*"; }
warn() { echo -e "${YELLOW}  ⚠${NC} $*"; }
err()  { echo -e "${RED}  ✗${NC} $*" >&2; }
info() { [[ "$QUIET" == false ]] && echo -e "${BLUE}  →${NC} $*" || true; }
step() { [[ "$QUIET" == false ]] && echo -e "\n${BOLD}${CYAN}▸${NC} $*" || true; }

# ---------------------------------------------------------------------------
# Help
# ---------------------------------------------------------------------------
show_help() {
  cat <<EOF

${BOLD}claude-superskills — Local Installer${NC}

Installs skills from the local ${BOLD}skills/${NC} directory directly into your
platform skill directories. No npm, no npx, no internet required.

${BOLD}USAGE:${NC}
  ./scripts/local-install.sh [OPTIONS]

${BOLD}OPTIONS:${NC}
  -y, --yes       Auto-install to all detected platforms (skip prompts)
  -q, --quiet     Suppress informational output
  -h, --help      Show this help

${BOLD}INSTALL PATHS:${NC}
  GitHub Copilot CLI  →  ~/.github/skills/
  Claude Code         →  ~/.claude/skills/
  OpenAI Codex        →  ~/.codex/vendor_imports/skills/skills/.curated/
  OpenCode            →  ~/.agent/skills/
  Gemini CLI          →  ~/.gemini/skills/
  Antigravity         →  ~/.agent/skills/
  Cursor IDE          →  ~/.cursor/skills/
  AdaL CLI            →  ~/.adal/skills/

${BOLD}EXAMPLES:${NC}
  # Clone the repo and install interactively
  git clone https://github.com/ericgandrade/claude-superskills
  cd claude-superskills
  ./scripts/local-install.sh

  # Auto-install to all detected platforms
  ./scripts/local-install.sh -y

  # CI / non-interactive environments
  ./scripts/local-install.sh -y -q

EOF
}

# ---------------------------------------------------------------------------
# Parse args
# ---------------------------------------------------------------------------
parse_args() {
  while [[ $# -gt 0 ]]; do
    case $1 in
      -y|--yes)    YES=true;   shift ;;
      -q|--quiet)  QUIET=true; shift ;;
      -h|--help)   show_help;  exit 0 ;;
      *) err "Unknown option: $1"; echo "Use --help for usage."; exit 1 ;;
    esac
  done
}

# ---------------------------------------------------------------------------
# Platform detection
# (checks binary + home directory — works even if binary not in PATH yet)
# ---------------------------------------------------------------------------
declare -A DETECTED   # platform → true/false

detect_platforms() {
  DETECTED[copilot]=false
  DETECTED[claude]=false
  DETECTED[codex]=false
  DETECTED[opencode]=false
  DETECTED[gemini]=false
  DETECTED[antigravity]=false
  DETECTED[cursor]=false
  DETECTED[adal]=false

  # GitHub Copilot CLI — needs `gh` + extension
  if command -v gh &>/dev/null && gh copilot --version &>/dev/null 2>&1; then
    DETECTED[copilot]=true
  fi

  # Claude Code — binary OR ~/.claude directory
  if command -v claude &>/dev/null || [[ -d "$HOME/.claude" ]]; then
    DETECTED[claude]=true
  fi

  # OpenAI Codex CLI or App
  if command -v codex &>/dev/null || [[ -d "$HOME/.codex" ]] \
     || [[ -d "/Applications/Codex.app" ]]; then
    DETECTED[codex]=true
  fi

  # OpenCode
  if command -v opencode &>/dev/null || [[ -d "$HOME/.agent" ]]; then
    DETECTED[opencode]=true
  fi

  # Gemini CLI
  if command -v gemini &>/dev/null || [[ -d "$HOME/.gemini" ]]; then
    DETECTED[gemini]=true
  fi

  # Antigravity
  if command -v antigravity &>/dev/null \
     || [[ -d "/Applications/Antigravity.app" ]] \
     || [[ -d "$HOME/.antigravity" ]]; then
    DETECTED[antigravity]=true
  fi

  # Cursor IDE
  if command -v cursor &>/dev/null \
     || [[ -d "/Applications/Cursor.app" ]] \
     || [[ -d "$HOME/.cursor" ]]; then
    DETECTED[cursor]=true
  fi

  # AdaL CLI
  if command -v adal &>/dev/null || [[ -d "$HOME/.adal" ]]; then
    DETECTED[adal]=true
  fi
}

# ---------------------------------------------------------------------------
# Platform metadata
# ---------------------------------------------------------------------------
platform_label() {
  case $1 in
    copilot)     echo "GitHub Copilot CLI" ;;
    claude)      echo "Claude Code" ;;
    codex)       echo "OpenAI Codex" ;;
    opencode)    echo "OpenCode" ;;
    gemini)      echo "Gemini CLI" ;;
    antigravity) echo "Antigravity" ;;
    cursor)      echo "Cursor IDE" ;;
    adal)        echo "AdaL CLI" ;;
  esac
}

target_dir() {
  case $1 in
    copilot)     echo "$HOME/.github/skills" ;;
    claude)      echo "$HOME/.claude/skills" ;;
    codex)       echo "$HOME/.codex/vendor_imports/skills/skills/.curated" ;;
    opencode)    echo "$HOME/.agent/skills" ;;
    gemini)      echo "$HOME/.gemini/skills" ;;
    antigravity) echo "$HOME/.agent/skills" ;;
    cursor)      echo "$HOME/.cursor/skills" ;;
    adal)        echo "$HOME/.adal/skills" ;;
  esac
}

# ---------------------------------------------------------------------------
# Display detection table
# ---------------------------------------------------------------------------
show_table() {
  [[ "$QUIET" == true ]] && return
  echo ""
  printf "  %-22s  %s\n" "Platform" "Status"
  printf "  %-22s  %s\n" "──────────────────────" "──────────"
  local order=(copilot claude codex opencode gemini antigravity cursor adal)
  for p in "${order[@]}"; do
    local label; label=$(platform_label "$p")
    if [[ "${DETECTED[$p]}" == true ]]; then
      printf "  ${GREEN}%-22s  ✓ detected${NC}\n" "$label"
    else
      printf "  ${YELLOW}%-22s  – not found${NC}\n" "$label"
    fi
  done
  echo ""
}

# ---------------------------------------------------------------------------
# Interactive platform selection
# ---------------------------------------------------------------------------
select_platforms() {
  local order=(copilot claude codex opencode gemini antigravity cursor adal)
  local selected=()

  echo "  Select platforms to install skills for."
  echo "  (only detected platforms are shown)"
  echo ""

  local available=()
  for p in "${order[@]}"; do
    [[ "${DETECTED[$p]}" == true ]] && available+=("$p")
  done

  if [[ ${#available[@]} -eq 0 ]]; then
    return
  fi

  local i=1
  local idx_map=()
  for p in "${available[@]}"; do
    local label; label=$(platform_label "$p")
    local tdir; tdir=$(target_dir "$p")
    printf "  [%d] %-20s  %s\n" "$i" "$label" "$tdir"
    idx_map+=("$p")
    ((i++))
  done

  echo ""
  echo -e "  Enter numbers separated by spaces, or ${BOLD}a${NC} for all, or ${BOLD}q${NC} to quit:"
  read -r -p "  > " choice

  [[ "$choice" == "q" ]] && { echo ""; echo "  Cancelled."; echo ""; exit 0; }

  if [[ "$choice" == "a" ]]; then
    selected=("${available[@]}")
  else
    for n in $choice; do
      if [[ "$n" =~ ^[0-9]+$ ]] && (( n >= 1 && n <= ${#available[@]} )); then
        selected+=("${idx_map[$((n-1))]}")
      fi
    done
  fi

  CHOSEN=("${selected[@]+"${selected[@]}"}")
}

# ---------------------------------------------------------------------------
# Install skills for one platform
# ---------------------------------------------------------------------------
install_for_platform() {
  local platform=$1
  local label; label=$(platform_label "$platform")
  local dest; dest=$(target_dir "$platform")

  info "Installing for ${BOLD}$label${NC} → $dest"
  mkdir -p "$dest"

  local count=0
  local failed=0
  for skill_dir in "$SKILLS_DIR"/*/; do
    [[ -d "$skill_dir" ]] || continue
    local skill_name; skill_name=$(basename "$skill_dir")
    local target="$dest/$skill_name"

    # Remove existing (old copy, symlink, or directory)
    [[ -e "$target" || -L "$target" ]] && rm -rf "$target"

    if cp -r "$skill_dir" "$target" 2>/dev/null; then
      [[ "$QUIET" == false ]] && ok "$skill_name"
      ((count++))
    else
      warn "Failed to copy $skill_name"
      ((failed++))
    fi
  done

  if [[ $count -gt 0 ]]; then
    ok "${BOLD}$label${NC}: $count skill(s) installed"
  fi
  [[ $failed -gt 0 ]] && warn "$failed skill(s) failed"
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
main() {
  parse_args "$@"

  [[ "$QUIET" == false ]] && echo -e "\n${BOLD}${CYAN}🚀 claude-superskills — Local Installer${NC}\n"

  # Verify skills/ source exists
  if [[ ! -d "$SKILLS_DIR" ]]; then
    err "skills/ directory not found at: $SKILLS_DIR"
    err "Run this script from the repository root."
    exit 1
  fi

  local skill_count
  skill_count=$(find "$SKILLS_DIR" -mindepth 1 -maxdepth 1 -type d | wc -l | tr -d ' ')
  info "Source: $SKILLS_DIR ($skill_count skills)"

  # Detect platforms
  step "Detecting platforms..."
  detect_platforms
  show_table

  # Build list of platforms to install to
  CHOSEN=()

  if [[ "$YES" == true ]]; then
    # Auto: all detected
    local order=(copilot claude codex opencode gemini antigravity cursor adal)
    for p in "${order[@]}"; do
      [[ "${DETECTED[$p]}" == true ]] && CHOSEN+=("$p")
    done
  else
    select_platforms
  fi

  if [[ ${#CHOSEN[@]} -eq 0 ]]; then
    warn "No platforms selected. Nothing installed."
    echo ""
    exit 0
  fi

  # Deduplicate (opencode + antigravity share ~/.agent/skills)
  local seen_dirs=()
  local unique_platforms=()
  for p in "${CHOSEN[@]}"; do
    local tdir; tdir=$(target_dir "$p")
    local already=false
    for seen in "${seen_dirs[@]+"${seen_dirs[@]}"}"; do
      [[ "$seen" == "$tdir" ]] && already=true && break
    done
    if [[ "$already" == false ]]; then
      unique_platforms+=("$p")
      seen_dirs+=("$tdir")
    else
      info "Skipping duplicate path for $(platform_label "$p") (same dir as previous)"
    fi
  done

  # Install
  step "Installing skills..."
  echo ""
  local any_failed=false
  for p in "${unique_platforms[@]}"; do
    install_for_platform "$p" || any_failed=true
    echo ""
  done

  # Summary
  if [[ "$any_failed" == false ]]; then
    echo -e "${GREEN}${BOLD}✅ Installation complete!${NC}"
  else
    echo -e "${YELLOW}${BOLD}⚠  Installation finished with some errors.${NC}"
  fi
  echo ""
}

main "$@"
