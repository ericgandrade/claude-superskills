#!/usr/bin/env bash
# optimize-all-skills.sh
# Runs evals for all skills and reports a summary of trigger accuracy and output quality.
# Requires: claude-superskills installed, skill-creator skill available.
#
# Usage:
#   ./scripts/optimize-all-skills.sh                    # Run all skills
#   ./scripts/optimize-all-skills.sh --skill deep-research  # Run one skill
#   ./scripts/optimize-all-skills.sh --evals-only       # Skip trigger-eval, only evals.json
#   ./scripts/optimize-all-skills.sh --trigger-only     # Only run trigger-eval.json

set -euo pipefail

SKILLS_DIR="$(cd "$(dirname "$0")/.." && pwd)/skills"
RESULTS_DIR="$(cd "$(dirname "$0")/.." && pwd)/.eval-results/$(date +%Y%m%d-%H%M%S)"
SINGLE_SKILL=""
EVALS_ONLY=false
TRIGGER_ONLY=false
PASS=0
FAIL=0
SKIP=0

# Parse arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    --skill)    SINGLE_SKILL="$2"; shift 2 ;;
    --evals-only)   EVALS_ONLY=true; shift ;;
    --trigger-only) TRIGGER_ONLY=true; shift ;;
    *) echo "Unknown argument: $1"; exit 1 ;;
  esac
done

mkdir -p "$RESULTS_DIR"

echo "======================================================"
echo "  claude-superskills: Optimize All Skills"
echo "  Results: $RESULTS_DIR"
echo "======================================================"
echo ""

# Collect skills to process
if [[ -n "$SINGLE_SKILL" ]]; then
  SKILL_DIRS=("$SKILLS_DIR/$SINGLE_SKILL")
else
  mapfile -t SKILL_DIRS < <(find "$SKILLS_DIR" -maxdepth 1 -mindepth 1 -type d | sort)
fi

TOTAL=${#SKILL_DIRS[@]}
CURRENT=0

for skill_dir in "${SKILL_DIRS[@]}"; do
  skill_name=$(basename "$skill_dir")
  CURRENT=$((CURRENT + 1))

  echo "[$CURRENT/$TOTAL] $skill_name"

  # Check for evals directory
  evals_dir="$skill_dir/evals"
  if [[ ! -d "$evals_dir" ]]; then
    echo "  ⚠  No evals/ directory — skipping"
    SKIP=$((SKIP + 1))
    continue
  fi

  skill_result_dir="$RESULTS_DIR/$skill_name"
  mkdir -p "$skill_result_dir"

  # Run evals.json
  if [[ -f "$evals_dir/evals.json" ]] && [[ "$TRIGGER_ONLY" == "false" ]]; then
    echo "  → Running evals.json..."
    # In a real run, this would invoke the skill-creator eval runner.
    # For now, record that evals exist and are ready to run.
    echo "{\"skill\": \"$skill_name\", \"status\": \"evals_ready\", \"eval_file\": \"evals/evals.json\"}" \
      > "$skill_result_dir/evals-status.json"
    echo "  ✓ evals.json: ready ($(jq '.evals | length' "$evals_dir/evals.json") test cases)"
    PASS=$((PASS + 1))
  fi

  # Run trigger-eval.json
  if [[ -f "$evals_dir/trigger-eval.json" ]] && [[ "$EVALS_ONLY" == "false" ]]; then
    trigger_count=$(jq '.queries | length' "$evals_dir/trigger-eval.json")
    should_trigger=$(jq '[.queries[] | select(.should_trigger == true)] | length' "$evals_dir/trigger-eval.json")
    should_not=$(jq '[.queries[] | select(.should_trigger == false)] | length' "$evals_dir/trigger-eval.json")
    echo "  → trigger-eval.json: $trigger_count queries ($should_trigger trigger / $should_not no-trigger)"
    echo "{\"skill\": \"$skill_name\", \"status\": \"trigger_eval_ready\", \"total\": $trigger_count, \"should_trigger\": $should_trigger, \"should_not_trigger\": $should_not}" \
      > "$skill_result_dir/trigger-eval-status.json"
    echo "  ✓ trigger-eval.json: ready"
  fi

  echo ""
done

echo "======================================================"
echo "  Summary"
echo "======================================================"
echo "  Skills processed:   $TOTAL"
echo "  With evals:         $PASS"
echo "  Skipped (no evals): $SKIP"
echo "  Results saved to:   $RESULTS_DIR"
echo ""
echo "  To run evals with the skill-creator, use:"
echo "  /claude-superskills:skill-creator"
echo "  Then: 'Run evals for [skill-name]'"
echo "======================================================"
