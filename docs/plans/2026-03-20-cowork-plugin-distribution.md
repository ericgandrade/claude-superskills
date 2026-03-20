# Cowork Plugin Distribution Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Extend `claude-superskills` so the installer can detect a Cowork-capable Claude Desktop environment, generate a Cowork-compatible plugin zip automatically, and guide the user through removing the old plugin version and uploading the new one manually in Cowork.

**Architecture:** Keep the existing repository plugin structure as the single package source. The npm installer should treat Cowork as a packaging-and-guidance target, not as a fully automatable install target. Detection should identify Claude Desktop/Cowork availability, packaging should reuse the plugin zip pipeline, and the installer UX should produce explicit operator instructions for update/removal inside Cowork.

**Tech Stack:** `cli-installer/` Node CLI, `lib/detector.js`, `lib/ui/table.js`, `lib/interactive.js`, `scripts/package-plugin.sh`, `.claude-plugin/plugin.json`, Claude Desktop Cowork custom plugin upload flow

---

### Task 1: Lock the product behavior

**Files:**
- Modify: `README.md`
- Modify: `docs/INSTALLATION.md`
- Modify: `CLAUDE.md`

**Step 1: Define Cowork support level**

Document Cowork as:
- **detected locally**
- **package generated automatically**
- **installed manually by user through Claude Desktop / Cowork UI**

Do **not** present Cowork as a normal auto-copy installer target like `~/.claude/skills/`.

**Step 2: Differentiate the three Claude paths**

Document separately:
- Claude Code local plugin development: `claude --plugin-dir ./claude-superskills`
- Claude Code marketplace/GitHub plugin install
- Claude Desktop Cowork custom plugin upload

**Step 3: Clarify the known bug**

State that the historical `claude plugin install` shell bug affects GitHub clone/install flow, but **not** the Cowork custom zip upload path.

### Task 2: Add Cowork detection to the installer

**Files:**
- Modify: `cli-installer/lib/detector.js`
- Modify: `cli-installer/lib/ui/table.js`
- Modify: `cli-installer/lib/interactive.js`
- Modify: `cli-installer/bin/cli.js`

**Step 1: Create a `detectCowork()` detector**

Detection should be heuristic and platform-aware.

Recommended heuristics:
- macOS: detect Claude Desktop app bundle if present
- Windows/Linux: detect Claude Desktop install paths if known
- optional secondary heuristics:
  - known local plugin storage/cache directories
  - Cowork-related local app data directories if they exist

Return shape:
```js
{ installed: boolean, version: string | null, path: string | null }
```

Use a conservative label if version is unavailable:
- `Claude Desktop detected`
- avoid pretending Cowork is installed if only the CLI is present

**Step 2: Surface Cowork in detection output**

Add a row in the tools table such as:
- `Claude Cowork`

Status should reflect desktop/cowork availability, not skill install status.

**Step 3: Add Cowork as a selectable install target**

In interactive platform selection:
- add Cowork only when detected
- label it clearly as a **manual upload** target, for example:
  - `Claude Cowork (generate plugin zip for manual upload)`

### Task 3: Implement Cowork packaging as a first-class installer action

**Files:**
- Create: `cli-installer/lib/cowork.js`
- Modify: `cli-installer/bin/cli.js`
- Modify: `scripts/package-plugin.sh` or port logic into `cli-installer/lib/cowork.js`

**Step 1: Extract packaging logic into reusable code**

Do not shell out to an ad hoc script if avoidable. Preferred approach:
- create `cli-installer/lib/cowork.js`
- move or duplicate the zip packaging logic there in a Node-friendly way
- keep `scripts/package-plugin.sh` as a maintainer wrapper, but let the installer call reusable packaging logic directly

Expected API:
```js
async function packageCoworkPlugin({ version, quiet }) {
  return {
    zipPath,
    zipName,
    sizeBytes
  };
}
```

**Step 2: Wire Cowork into the install flow**

If the user selects Cowork:
- ensure repository/plugin package files are available
- generate `plugin-output/claude-superskills-vX.Y.Z.zip`
- print a success message with the exact path
- do **not** claim the plugin is installed

**Step 3: Keep behavior explicit**

The install summary for Cowork should say something like:
- `Package generated for manual Cowork upload`

Not:
- `Installed`
- `Updated automatically`

### Task 4: Teach manual update flow inside Cowork

**Files:**
- Modify: `cli-installer/lib/cowork.js`
- Modify: `README.md`
- Modify: `docs/INSTALLATION.md`
- Create or Modify: `docs/guides/cowork-plugin-distribution.md`

**Step 1: Add post-package instructions**

After generating the zip, print operator steps:

1. Open Claude Desktop
2. Switch to the `Cowork` tab
3. Open `Customize`
4. Open installed plugins or browse plugins
5. Find the existing `claude-superskills` plugin
6. Remove/uninstall the previous version
7. Upload the new zip file
8. Confirm the new version appears in Cowork

**Step 2: Teach removal of old version**

The installer should explain:
- Cowork plugins added manually are saved locally
- updating should be treated as **remove old zip-based install, then upload new zip**

If official docs confirm overwrite/update behavior later, this can be relaxed. For now, the plan should prefer explicit removal first to avoid version ambiguity.

**Step 3: Show the exact generated artifact**

Print:
- absolute zip path
- version
- file size

Optional:
- copy a short one-line instruction block the user can paste into release notes/internal docs

### Task 5: Support repeated upgrades cleanly

**Files:**
- Modify: `cli-installer/lib/cowork.js`
- Modify: `plugin-output/` handling
- Modify: `scripts/package-plugin.sh`

**Step 1: Remove stale local zip artifacts**

Before creating a new package:
- delete older `plugin-output/claude-superskills-v*.zip` files

This keeps the user from uploading the wrong artifact accidentally.

**Step 2: Add install/update wording**

If Cowork is selected and a zip for an older version already exists locally:
- say `new package created`
- mention the previous zip was replaced locally
- remind the user this does **not** update Cowork until they re-upload manually

**Step 3: Add optional dedicated command**

Consider adding a shortcut command:
```bash
npx claude-superskills cowork
```
or
```bash
npx claude-superskills package-cowork
```

This gives users a direct update path without going through the full multi-platform install flow.

### Task 6: Define the UX copy in the installer

**Files:**
- Modify: `cli-installer/bin/cli.js`
- Modify: `cli-installer/lib/ui/table.js`
- Modify: `cli-installer/README.md`

**Step 1: Detection table**

Show Cowork in detection output like:
- `Claude Cowork | ✓ | Claude Desktop detected`

**Step 2: Selection prompt**

Show Cowork as:
- `Claude Cowork (generate plugin zip for manual upload)`

**Step 3: Completion summary**

Use wording like:
```text
Claude Cowork
  Package: /absolute/path/plugin-output/claude-superskills-vX.Y.Z.zip
  Next step: remove the old claude-superskills plugin in Cowork and upload this new file manually
```

### Task 7: Validation matrix

**Files:**
- Create or Modify: `docs/guides/cowork-plugin-testing.md`
- Test: `cli-installer/lib/detector.js`
- Test: `cli-installer/lib/cowork.js`

**Step 1: Desktop detection tests**

Validate:
- Claude Desktop present → Cowork target appears
- Claude Desktop absent → Cowork target hidden

**Step 2: Packaging tests**

Validate:
- zip generated successfully
- plugin root contains `.claude-plugin/plugin.json`
- `skills/` present inside zip
- package size stays under documented limits

**Step 3: Manual Cowork acceptance test**

Validate in Claude Desktop:
- old plugin can be removed
- new zip uploads successfully
- plugin appears in Cowork
- installed plugin exposes expected commands/skills

**Step 4: Regression tests**

Ensure Cowork support does not break:
- Claude Code regular install flow
- multi-platform skill copy flow
- existing plugin zip packaging flow

### Task 8: Recommended implementation order

**Files:**
- Modify: `cli-installer/lib/detector.js`
- Create: `cli-installer/lib/cowork.js`
- Modify: `cli-installer/bin/cli.js`
- Modify: docs files

**Step 1: Detection**

Add Cowork detection and table rendering first.

**Step 2: Packaging**

Implement reusable zip generation and local cleanup.

**Step 3: Installer integration**

Expose Cowork as a selectable/manual-upload target.

**Step 4: Docs**

Write the end-user update instructions with explicit remove-old/upload-new guidance.

**Step 5: Optional command**

Add a dedicated `package-cowork` style command if the UX still feels buried.

### Validation Criteria

- Installer can detect a Cowork-capable desktop environment
- User can select Cowork as a packaging target
- Installer generates the correct zip artifact automatically
- Installer clearly explains that Cowork update is manual
- User instructions explicitly cover removing the old plugin and uploading the new one
- Docs separate Cowork packaging from the broken shell-based plugin install flow

### Expected Outcome

`claude-superskills` gains a practical Cowork distribution path:
- detect Cowork-capable environment
- generate the right plugin zip automatically
- guide the user through safe manual replacement inside Cowork
- keep Claude Code marketplace and Cowork upload as separate, clearly documented deployment channels
