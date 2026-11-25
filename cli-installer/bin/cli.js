#!/usr/bin/env node

const { detectTools, getInstallInstructions } = require('../lib/detector');
const { promptPlatforms, promptScope, promptAction, setupEscapeHandler } = require('../lib/interactive');
const { setupCleanupHandler } = require('../lib/cleanup');
const { installCopilotSkills } = require('../lib/copilot');
const { installClaudeSkills } = require('../lib/claude');
const { install: installCodexSkills } = require('../lib/codex');
const { install: installOpenCodeSkills } = require('../lib/opencode');
const { install: installGeminiSkills } = require('../lib/gemini');
const { install: installAntigravitySkills } = require('../lib/antigravity');
const { install: installCursorSkills } = require('../lib/cursor');
const { install: installAdalSkills } = require('../lib/adal');
const { listBundles, validateBundle } = require('../lib/bundles');
const { searchSkills } = require('../lib/search');
const { displayToolsTable } = require('../lib/ui/table');
const { ensureSkillsCached } = require('../lib/core/downloader');
const { packageCoworkPlugin, printCoworkInstructions } = require('../lib/cowork');
const { getUserSkillsPath, getLocalSkillsPath } = require('../lib/utils/path-resolver');
const {
  getCachedSkillInventory,
  buildPlatformSkillDiff,
  buildPlatformSkillDiffForDir,
  hasChanges,
  getRecommendedSkills
} = require('../lib/utils/skill-diff');
const chalk = require('chalk');
const inquirer = require('inquirer');
const ora = require('ora');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');

const packageJson = require('../package.json');
const VERSION = packageJson.version;
const semver = require('semver');

const COMPANION_PACKAGES = [
  { name: 'agentic-sdlc-method', label: 'The Agentic SDLC Method: delivering software with AI agents', cmd: 'npx agentic-sdlc-method' },
];

function printMigrationWarning() {
  console.log(chalk.dim('claude-superskills 3.x merges the former obsidian-, career-, product-, design- and knowledge-superskills packages: 53 skills.'));
  for (const pkg of COMPANION_PACKAGES) {
    console.log(chalk.dim(`Companion: ${pkg.label} → ${pkg.cmd}`));
  }
  console.log();
}

const commandAliases = {
  i: 'install',
  ls: 'list',
  st: 'status',
  up: 'update',
  rm: 'uninstall',
  doc: 'doctor',
  cowork: 'package-cowork'
};

function validateRemovedScopeFlags(args) {
  const removedFlags = ['--claude-scope'];
  const used = removedFlags.filter((flag) => args.includes(flag));
  if (used.length > 0) {
    throw new Error(`Deprecated flag: ${used.join(', ')}. Use --local or --global instead.`);
  }
}

function resolveScope(args) {
  if (args.includes('--local') || args.includes('-l')) return 'local';
  if (args.includes('--global') || args.includes('-g')) return 'global';
  const scopeIdx = args.indexOf('--scope');
  if (scopeIdx !== -1) {
    const val = args[scopeIdx + 1];
    if (val === 'local') return 'local';
    if (val === 'global') return 'global';
  }
  return null;
}

async function warmCache(quiet) {
  const spinner = quiet ? null : ora(`Fetching skills v${VERSION} from GitHub...`).start();
  try {
    const cacheDir = await ensureSkillsCached(VERSION);
    if (spinner) spinner.succeed('Skills ready');
    return cacheDir;
  } catch (err) {
    if (spinner) spinner.fail(`Failed to fetch skills from GitHub (${err.message})`);
    throw err;
  }
}

function getDetectedPlatforms(detected) {
  const platforms = [];
  if (detected.copilot.installed) platforms.push('copilot');
  if (detected.claude.installed) platforms.push('claude');
  if (detected.codex_cli.installed || detected.codex_app.installed) platforms.push('codex');
  if (detected.opencode.installed) platforms.push('opencode');
  if (detected.gemini.installed) platforms.push('gemini');
  if (detected.antigravity.installed) platforms.push('antigravity');
  if (detected.cursor.installed) platforms.push('cursor');
  if (detected.adal.installed) platforms.push('adal');
  return platforms;
}

function getDetectedTargets(detected) {
  const targets = getDetectedPlatforms(detected);
  if (detected.cowork && detected.cowork.installed) targets.push('cowork');
  return targets;
}

function getPlatformLabel(platform) {
  const labels = {
    copilot: 'GitHub Copilot CLI',
    claude: 'Claude Code',
    codex: 'OpenAI Codex',
    opencode: 'OpenCode',
    gemini: 'Gemini CLI',
    antigravity: 'Google Antigravity',
    cursor: 'Cursor IDE',
    adal: 'AdaL CLI',
    cowork: 'Claude Cowork'
  };

  return labels[platform] || platform;
}

function splitTargets(targets) {
  return {
    platforms: targets.filter((target) => target !== 'cowork'),
    includeCowork: targets.includes('cowork')
  };
}

function getUndetectedPlatformLabels(detected) {
  const undetected = [];

  if (!detected.copilot.installed) undetected.push(getPlatformLabel('copilot'));
  if (!detected.claude.installed) undetected.push(getPlatformLabel('claude'));
  if (!detected.codex_cli.installed && !detected.codex_app.installed) undetected.push(getPlatformLabel('codex'));
  if (!detected.opencode.installed) undetected.push(getPlatformLabel('opencode'));
  if (!detected.gemini.installed) undetected.push(getPlatformLabel('gemini'));
  if (!detected.antigravity.installed) undetected.push(getPlatformLabel('antigravity'));
  if (!detected.cursor.installed) undetected.push(getPlatformLabel('cursor'));
  if (!detected.adal.installed) undetected.push(getPlatformLabel('adal'));

  return undetected;
}

function printInstallContextNotes(detected, { includeCowork = false, quiet = false } = {}) {
  if (quiet) return;

  const undetected = getUndetectedPlatformLabels(detected);

  if (includeCowork && detected.cowork && detected.cowork.installed) {
    console.log(chalk.cyan('📦 Claude Cowork'));
    console.log(chalk.dim('  Manual target only: the installer can generate a plugin zip, but it will not auto-install or auto-update Cowork.\n'));
  }

  if (undetected.length > 0) {
    console.log(chalk.cyan('ℹ️  Not installed on this machine'));
    console.log(chalk.dim(`  ${undetected.join(', ')}`));
    console.log(chalk.dim('  These platforms were not detected, so the installer will not make changes there.\n'));
  }
}

function getManagedSkillNames() {
  // Only this package's skills: its own bundles.json and its own cache. Other packages
  // (for example agentic-sdlc-method) install different skills into the same platform folders,
  // and the current working directory may hold unrelated skills, so neither is scanned.
  const all = new Set();
  try {
    const candidates = [path.join(__dirname, '..', 'bundles.json'), path.join(__dirname, '..', '..', 'bundles.json')];
    const bundlesPath = candidates.find((p) => fs.existsSync(p));
    if (bundlesPath) {
      const bundles = JSON.parse(fs.readFileSync(bundlesPath, 'utf8'));
      for (const bundle of Object.values(bundles.bundles || {})) {
        for (const skill of bundle.skills || []) all.add(skill);
      }
    }
  } catch {
    // ignore bundle metadata parse issues; fall back to the cache
  }
  const { CACHE_BASE } = require('../lib/core/downloader');
  if (fs.existsSync(CACHE_BASE)) {
    for (const version of fs.readdirSync(CACHE_BASE)) {
      const versionSkillsDir = path.join(CACHE_BASE, version, 'skills');
      if (!fs.existsSync(versionSkillsDir)) continue;
      for (const entry of fs.readdirSync(versionSkillsDir)) {
        const skillDir = path.join(versionSkillsDir, entry);
        if (fs.existsSync(path.join(skillDir, 'SKILL.md')) && fs.statSync(skillDir).isDirectory()) all.add(entry);
      }
    }
  }
  return Array.from(all).sort();
}

function getPlatformTargetDir(platform) {
  return getUserSkillsPath(platform) || null;
}

function getTargetDirForPlatform(platform, scope, projectRoot = process.cwd()) {
  return scope === 'local'
    ? getLocalSkillsPath(platform, projectRoot)
    : getUserSkillsPath(platform) || null;
}

function getInstalledManagedCount(targetDir, managedSkills) {
  if (!targetDir || !fs.existsSync(targetDir)) return 0;

  let count = 0;
  for (const skill of managedSkills) {
    const skillDir = path.join(targetDir, skill);
    if (!fs.existsSync(path.join(skillDir, 'SKILL.md'))) continue;
    if (fs.statSync(skillDir).isDirectory()) count++;
  }
  return count;
}

function getPlatformInstallStatus(platform, projectRoot = process.cwd()) {
  const managedSkills = getManagedSkillNames();
  const globalDir = getPlatformTargetDir(platform);
  const globalCount = getInstalledManagedCount(globalDir, managedSkills);
  const localDir = getLocalSkillsPath(platform, projectRoot);
  const localCount = getInstalledManagedCount(localDir, managedSkills);

  return {
    globalDir,
    globalCount,
    hasGlobal: globalCount > 0,
    localDir,
    localCount,
    hasLocal: localCount > 0
  };
}

async function uninstallManagedSkills(platforms, quiet) {
  let managedSkills = getManagedSkillNames();
  const targets = [...new Set(platforms.map((platform) => getPlatformTargetDir(platform)).filter(Boolean))];
  let removedCount = 0;

  if (managedSkills.length === 0) {
    console.log(chalk.red('❌ Could not determine managed skills list. Uninstall aborted to avoid removing skills from other packages.\n'));
    return;
  }

  const managedSet = new Set(managedSkills);
  for (const targetDir of targets) {
    if (!(await fs.pathExists(targetDir))) continue;

    for (const skill of managedSkills) {
      const skillDir = path.join(targetDir, skill);
      if (await fs.pathExists(skillDir)) {
        await fs.remove(skillDir);
        removedCount++;
      }
    }

    if (!quiet) {
      const remaining = (await fs.readdir(targetDir).catch(() => [])).filter(e => !managedSet.has(e));
      if (remaining.length > 0) {
        console.log(chalk.yellow(`  ⚠️  ${remaining.length} skill(s) from other packages remain in ${targetDir}:`));
        for (const s of remaining.slice(0, 5)) console.log(chalk.dim(`     - ${s}`));
        if (remaining.length > 5) console.log(chalk.dim(`     ... and ${remaining.length - 5} more`));
        console.log(chalk.dim('  Use the ☢️  Nuclear option to remove all skills from all packages.\n'));
      }
    }
  }

  if (!quiet) {
    console.log(chalk.gray(`🧹 Uninstalled ${removedCount} managed skill folder(s)`));
  }
}

async function uninstallManagedSkillsForScope(platforms, quiet, scope = 'global', projectRoot = process.cwd()) {
  if (scope === 'local') {
    let managedSkills = getManagedSkillNames();
    let removedCount = 0;

    if (managedSkills.length === 0) {
      console.log(chalk.red('❌ Could not determine managed skills list. Uninstall aborted.\n'));
      return;
    }

    for (const platform of platforms) {
      const targetDir = getLocalSkillsPath(platform, projectRoot);
      if (!(await fs.pathExists(targetDir))) continue;
      for (const skill of managedSkills) {
        const skillDir = path.join(targetDir, skill);
        if (await fs.pathExists(skillDir)) {
          await fs.remove(skillDir);
          removedCount++;
        }
      }
    }

    if (!quiet) {
      console.log(chalk.gray(`🧹 Uninstalled ${removedCount} local skill folder(s)`));
    }
  } else {
    await uninstallManagedSkills(platforms, quiet);
  }
}

function getLocalProjectSkillDirs(cwd) {
  const home = os.homedir();
  if (!cwd || cwd === home) return [];
  const candidates = [
    { name: 'GitHub Copilot (local)', dir: path.join(cwd, '.github', 'skills') },
    { name: 'Claude Code (local)',    dir: path.join(cwd, '.claude', 'skills') },
    { name: 'Codex (local)',          dir: path.join(cwd, '.codex', 'skills') },
    { name: 'OpenCode (local)',       dir: path.join(cwd, '.agent', 'skills') },
    { name: 'Gemini CLI (local)',     dir: path.join(cwd, '.gemini', 'skills') },
    { name: 'Antigravity (local)',    dir: path.join(cwd, '.gemini', 'antigravity', 'skills') },
    { name: 'Cursor IDE (local)',     dir: path.join(cwd, '.cursor', 'skills') },
    { name: 'AdaL CLI (local)',       dir: path.join(cwd, '.adal', 'skills') },
  ];
  return candidates.filter(({ dir }) => fs.existsSync(dir));
}

async function nuclearUninstall(quiet) {
  const home = os.homedir();
  const localDirs = getLocalProjectSkillDirs(process.cwd());
  const allPlatformDirs = [
    { name: 'GitHub Copilot',  dir: path.join(home, '.copilot', 'skills') },
    { name: 'GitHub Copilot (legacy)', dir: path.join(home, '.github', 'skills') },
    { name: 'Claude Code',    dir: path.join(home, '.claude', 'skills') },
    { name: 'Codex',          dir: path.join(home, '.codex', 'skills') },
    { name: 'OpenCode',       dir: path.join(home, '.agent', 'skills') },
    { name: 'Gemini CLI',     dir: path.join(home, '.gemini', 'skills') },
    { name: 'Antigravity',    dir: path.join(home, '.gemini', 'antigravity', 'skills') },
    { name: 'Cursor IDE',     dir: path.join(home, '.cursor', 'skills') },
    { name: 'AdaL CLI',       dir: path.join(home, '.adal', 'skills') },
    ...localDirs,
  ];

  let removed = 0;
  for (const { name, dir } of allPlatformDirs) {
    if (!(await fs.pathExists(dir))) continue;
    const entries = await fs.readdir(dir);
    for (const entry of entries) {
      const skillDir = path.join(dir, entry);
      const stat = await fs.stat(skillDir).catch(() => null);
      if (!stat || !stat.isDirectory()) continue;
      await fs.remove(skillDir);
      removed++;
      if (!quiet) console.log(chalk.gray(`  🗑️  ${name}: ${entry}`));
    }
  }

  const cachePackages = [
    '.superskills', '.claude-superskills', '.agentic-sdlc', '.career-superskills', '.design-superskills',
    '.obsidian-superskills', '.product-superskills', '.avanade-superskills',
  ];
  for (const pkg of cachePackages) {
    const cacheDir = path.join(home, pkg, 'cache');
    if (await fs.pathExists(cacheDir)) {
      await fs.remove(cacheDir);
      if (!quiet) console.log(chalk.gray(`  🗑️  Cache: ~/${pkg}/cache`));
    }
  }

  if (!quiet) {
    console.log(chalk.green(`\n✨ Nuclear uninstall complete — ${removed} skill folder(s) removed.\n`));
  }
}

async function runNuclearFlow(quiet) {
  const cwd = process.cwd();
  const localDirs = getLocalProjectSkillDirs(cwd);

  console.log('\n' + chalk.bgRed.white.bold('  ☢️  NUCLEAR UNINSTALL — THIS CANNOT BE UNDONE  ') + '\n');
  console.log(chalk.red('It removes EVERY skill folder on every platform, including skills installed by other packages (for example agentic-sdlc-method) or by hand.\n'));
  console.log(chalk.red('  This will delete ALL skill folders from ALL AI platforms:\n'));
  console.log(chalk.dim('    ~/.copilot/skills/              (GitHub Copilot)'));
  console.log(chalk.dim('    ~/.github/skills/               (GitHub Copilot — legacy, cleaned too)'));
  console.log(chalk.dim('    ~/.claude/skills/              (Claude Code)'));
  console.log(chalk.dim('    ~/.codex/skills/               (OpenAI Codex)'));
  console.log(chalk.dim('    ~/.agent/skills/               (OpenCode)'));
  console.log(chalk.dim('    ~/.gemini/skills/              (Gemini CLI)'));
  console.log(chalk.dim('    ~/.gemini/antigravity/skills/  (Antigravity)'));
  console.log(chalk.dim('    ~/.cursor/skills/              (Cursor IDE)'));
  console.log(chalk.dim('    ~/.adal/skills/                (AdaL CLI)'));
  if (localDirs.length > 0) {
    console.log(chalk.yellow('\n  Local project skill folders detected in current directory:'));
    for (const { name, dir } of localDirs) {
      console.log(chalk.yellow(`    ${dir}  (${name})`));
    }
  }
  console.log();
  console.log(chalk.red('  Skills from ALL installed packages will be removed,'));
  console.log(chalk.red('  including career-superskills, design-superskills,'));
  console.log(chalk.red('  obsidian-superskills, product-superskills, and any others.\n'));

  const { confirm } = await inquirer.prompt([{
    type: 'input',
    name: 'confirm',
    message: chalk.red.bold('Type "nuke" to confirm, or anything else to cancel:'),
  }]);

  if (confirm !== 'nuke') {
    console.log(chalk.dim('\n❌ Nuclear uninstall cancelled.\n'));
    return;
  }

  console.log(chalk.red('\n☢️  Proceeding with nuclear uninstall...\n'));
  await nuclearUninstall(quiet);
}

async function runUninstallFlow(detected, quiet, skipPrompt, scope = 'global', projectRoot = process.cwd()) {
  const allPlatforms = getDetectedPlatforms(detected);
  if (allPlatforms.length === 0) {
    console.log(chalk.yellow('\n⚠️  No supported platforms detected for uninstall.\n'));
    return;
  }

  let selectedPlatforms = allPlatforms;
  let shouldClearCache = true;

  if (!skipPrompt) {
    const { uninstallMode } = await inquirer.prompt([{
      type: 'list',
      name: 'uninstallMode',
      message: 'How do you want to uninstall?',
      choices: [
        { name: 'Uninstall from all detected platforms', value: 'all' },
        { name: 'Choose platforms to uninstall', value: 'select' },
        { name: chalk.red('☢️  Nuclear: remove ALL skills from ALL platforms'), value: 'nuclear' },
        { name: 'Cancel', value: 'cancel' }
      ],
      default: 'all'
    }]);

    if (uninstallMode === 'cancel') {
      console.log(chalk.dim('\n❌ Operation cancelled.\n'));
      process.exit(0);
    }

    if (uninstallMode === 'nuclear') {
      await runNuclearFlow(quiet);
      return;
    }

    if (uninstallMode === 'select') {
      selectedPlatforms = await promptPlatforms(detected, {
        message: 'Uninstall skills from which platforms? (Press ESC to cancel)',
        defaultChecked: false
      });
      if (selectedPlatforms.length === 0) {
        console.log(chalk.dim('\n❌ No platform selected. Operation cancelled.\n'));
        process.exit(0);
      }
    }

    const { clearCacheNow } = await inquirer.prompt([{
      type: 'confirm',
      name: 'clearCacheNow',
      message: 'Clear local skills cache (~/.superskills/cache) too?',
      default: true
    }]);
    shouldClearCache = clearCacheNow;
  } else if (!quiet) {
    console.log(chalk.cyan('\n🗑️  Auto mode: uninstalling from all detected platforms and clearing cache...\n'));
  }

  if (!quiet) {
    console.log(chalk.cyan(`\n🧹 Uninstalling skills from: ${selectedPlatforms.join(', ')}\n`));
    console.log(chalk.gray(`   Mode: ${scope}`));
  }

  await uninstallManagedSkillsForScope(selectedPlatforms, quiet, scope, projectRoot);
  if (shouldClearCache) {
    await clearSkillsCache(quiet);
  }

  if (!quiet) {
    console.log(chalk.green('\n✅ Uninstall complete!\n'));
  }
}

async function clearSkillsCache(quiet) {
  const { CACHE_BASE: cacheBase } = require('../lib/core/downloader');
  if (await fs.pathExists(cacheBase)) {
    await fs.remove(cacheBase);
    if (!quiet) console.log(chalk.gray(`🗑️  Cache cleared: ${cacheBase}`));
  } else if (!quiet) {
    console.log(chalk.gray('🗑️  Cache not found, skipping'));
  }
}

async function getInstalledSkillsByPlatforms(platforms) {
  const targets = [...new Set(platforms.map(getPlatformTargetDir).filter(Boolean))];
  const installed = new Set();

  for (const targetDir of targets) {
    if (!(await fs.pathExists(targetDir))) continue;
    const entries = await fs.readdir(targetDir);
    for (const entry of entries) {
      const skillDir = path.join(targetDir, entry);
      if (!(await fs.pathExists(path.join(skillDir, 'SKILL.md')))) continue;
      const stat = await fs.stat(skillDir);
      if (stat.isDirectory()) {
        installed.add(entry);
      }
    }
  }

  return Array.from(installed).sort();
}

function getInstallerByPlatform(platform) {
  const installers = {
    copilot: installCopilotSkills,
    claude: installClaudeSkills,
    codex: installCodexSkills,
    opencode: installOpenCodeSkills,
    gemini: installGeminiSkills,
    antigravity: installAntigravitySkills,
    cursor: installCursorSkills,
    adal: installAdalSkills
  };
  return installers[platform] || null;
}

async function installForPlatforms(cacheDir, platforms, skills, quiet, scope = 'global', projectRoot = process.cwd()) {
  for (const platform of platforms) {
    const installer = getInstallerByPlatform(platform);
    if (!installer) continue;

    const targetDir = getTargetDirForPlatform(platform, scope, projectRoot);
    if (!targetDir) continue;

    await installer(cacheDir, skills, quiet, targetDir, `${platform} (${scope})`);
  }
}

function buildDiffByPlatform(platforms, cacheInventory, scope = 'global', projectRoot = process.cwd()) {
  const diffByPlatform = {};
  for (const platform of platforms) {
    if (scope === 'local') {
      const targetDir = getLocalSkillsPath(platform, projectRoot);
      diffByPlatform[platform] = buildPlatformSkillDiffForDir(platform, cacheInventory, targetDir);
    } else {
      diffByPlatform[platform] = buildPlatformSkillDiff(platform, cacheInventory);
    }
  }
  return diffByPlatform;
}

function printDiffReport(diffByPlatform, quiet) {
  if (quiet) return;

  console.log(chalk.cyan('\n🧠 Skill version analysis\n'));
  for (const [platform, diff] of Object.entries(diffByPlatform)) {
    const outdated = diff.outdated.length;
    const missing = diff.missing.length;
    const upToDate = diff.upToDate.length;
    const newerOrUnknown = diff.newer.length + diff.unknown.length;

    console.log(chalk.bold(`• ${platform}`));
    console.log(chalk.dim(`  outdated: ${outdated} | missing: ${missing} | up-to-date: ${upToDate} | newer/unknown: ${newerOrUnknown}`));

    if (outdated > 0) {
      for (const item of diff.outdated.slice(0, 5)) {
        console.log(chalk.yellow(`    - ${item.skill}: ${item.installedVersion} -> ${item.latestVersion}`));
      }
      if (outdated > 5) console.log(chalk.dim(`    ... and ${outdated - 5} more`));
    }

    if (missing > 0) {
      const sample = diff.missing.slice(0, 5).map((item) => item.skill).join(', ');
      console.log(chalk.yellow(`    - missing examples: ${sample}`));
      if (missing > 5) console.log(chalk.dim(`    ... and ${missing - 5} more`));
    }
  }
  console.log();
}

function getRecommendationSummary(diffByPlatform) {
  let totalOutdated = 0;
  let totalMissing = 0;
  for (const diff of Object.values(diffByPlatform)) {
    totalOutdated += diff.outdated.length;
    totalMissing += diff.missing.length;
  }
  return { totalOutdated, totalMissing };
}

function hasAnyRecommendedChanges(diffByPlatform) {
  return Object.values(diffByPlatform).some((diff) => hasChanges(diff));
}

function buildRecommendedInstallPlan(diffByPlatform) {
  const plan = {};
  for (const [platform, diff] of Object.entries(diffByPlatform)) {
    const skills = getRecommendedSkills(diff);
    if (skills.length > 0) plan[platform] = skills;
  }
  return plan;
}

async function runInstallPlan(cacheDir, plan, quiet, scope = 'global', projectRoot = process.cwd()) {
  for (const [platform, skills] of Object.entries(plan)) {
    await installForPlatforms(cacheDir, [platform], skills, quiet, scope, projectRoot);
  }
}

function printInstallStatus(detected, projectRoot = process.cwd()) {
  const detectedPlatforms = getDetectedPlatforms(detected);
  if (detectedPlatforms.length === 0) {
    console.log(chalk.yellow('\n⚠️  No supported platforms detected.\n'));
    return;
  }

  console.log(chalk.cyan('\n📊 Installation status\n'));

  for (const platform of detectedPlatforms) {
    const status = getPlatformInstallStatus(platform, projectRoot);
    const globalDir = status.globalDir || '(n/a)';
    const globalLine = `${status.hasGlobal ? '✅' : '⬜'} ${status.globalCount} skill(s)`;
    const localLine = `${status.hasLocal ? '✅' : '⬜'} ${status.localCount} skill(s)`;

    console.log(chalk.bold(`• ${platform}`));
    console.log(chalk.dim(`  global: ${globalLine}  → ${globalDir}`));
    console.log(chalk.dim(`  local:  ${localLine}  → ${status.localDir}`));
  }
  console.log();
}

async function runSmartInstallFlow(detected, platforms, quiet, skipPrompt, options = {}) {
  const { includeCowork = false, scope = 'global', projectRoot = process.cwd() } = options;
  const cacheDir = await warmCache(quiet);
  const cacheInventory = getCachedSkillInventory(cacheDir);
  const diffByPlatform = buildDiffByPlatform(platforms, cacheInventory, scope, projectRoot);

  printDiffReport(diffByPlatform, quiet);

  const { totalOutdated, totalMissing } = getRecommendationSummary(diffByPlatform);
  const hasChangesToApply = hasAnyRecommendedChanges(diffByPlatform);

  if (!hasChangesToApply) {
    if (!quiet) {
      console.log(chalk.green('✅ All selected platforms are already up to date.'));
      console.log(chalk.dim('No outdated or missing managed skills were found.\n'));
      printInstallContextNotes(detected, { includeCowork, quiet });
    }

    if (skipPrompt) return;

    const { action } = await inquirer.prompt([{
      type: 'list',
      name: 'action',
      message: 'What do you want to do with the CLI-installed platforms?',
      choices: [
        { name: 'Reinstall all skills anyway', value: 'reinstall' },
        { name: 'Uninstall skills', value: 'uninstall' },
        { name: 'Cancel', value: 'cancel' }
      ],
      default: 'cancel'
    }]);

    if (action === 'cancel') return;
    if (action === 'uninstall') {
      await runUninstallFlow(detected, quiet, skipPrompt);
      return;
    }

    await installForPlatforms(cacheDir, platforms, null, quiet, scope, projectRoot);
    if (!quiet) console.log(chalk.green('\n✅ Reinstall complete!\n'));
    return;
  }

  if (!quiet) {
    console.log(chalk.cyan('📌 Recommendation'));
    console.log(chalk.dim(`  Update ${totalOutdated} outdated skill instance(s) and install ${totalMissing} new skill instance(s).\n`));
    printInstallContextNotes(detected, { includeCowork, quiet });
  }

  if (skipPrompt) {
    const plan = buildRecommendedInstallPlan(diffByPlatform);
    await runInstallPlan(cacheDir, plan, quiet, scope, projectRoot);
    if (!quiet) console.log(chalk.green('\n✅ Smart update complete (outdated + missing skills).\n'));
    return;
  }

  const { action } = await inquirer.prompt([{
    type: 'list',
    name: 'action',
    message: 'How do you want to proceed?',
    choices: [
      { name: 'Apply recommended changes (update outdated + install missing)', value: 'recommended' },
      { name: 'Reinstall all skills from scratch', value: 'reinstall' },
      { name: 'Uninstall skills', value: 'uninstall' },
      { name: 'Cancel', value: 'cancel' }
    ],
    default: 'recommended'
  }]);

  if (action === 'cancel') return;
  if (action === 'uninstall') {
    await runUninstallFlow(detected, quiet, skipPrompt);
    return;
  }

  if (action === 'reinstall') {
    await installForPlatforms(cacheDir, platforms, null, quiet, scope, projectRoot);
    if (!quiet) console.log(chalk.green('\n✅ Reinstall complete!\n'));
    return;
  }

  const plan = buildRecommendedInstallPlan(diffByPlatform);
  await runInstallPlan(cacheDir, plan, quiet, scope, projectRoot);
  if (!quiet) console.log(chalk.green('\n✅ Smart update complete (outdated + missing skills).\n'));
}

async function runStatusCommand() {
  const detected = detectTools();
  printInstallStatus(detected, process.cwd());

  const platforms = getDetectedPlatforms(detected);
  if (platforms.length === 0) return;

  const cacheDir = await warmCache(false);
  const cacheInventory = getCachedSkillInventory(cacheDir);
  const diffByPlatform = buildDiffByPlatform(platforms, cacheInventory);
  printDiffReport(diffByPlatform, false);
}

async function runUpdateCommand(detected, quiet, skipPrompt, scope = 'global', projectRoot = process.cwd()) {
  const platforms = getDetectedPlatforms(detected);
  const hasCowork = detected.cowork && detected.cowork.installed;

  if (platforms.length === 0 && !hasCowork) {
    console.log(chalk.yellow('\n⚠️  No supported platforms detected for update.\n'));
    return;
  }

  if (!quiet) {
    const targets = [...platforms];
    if (hasCowork) targets.push('cowork');
    console.log(chalk.cyan(`\n🔄 Updating skills for: ${targets.join(', ')}\n`));
  }

  if (platforms.length > 0) {
    await runSmartInstallFlow(detected, platforms, quiet, skipPrompt, { includeCowork: hasCowork, scope, projectRoot });
  }

  await maybePackageCowork(detected, hasCowork, quiet);
}

async function maybePackageCowork(detected, includeCowork, quiet) {
  if (!includeCowork || !detected.cowork || !detected.cowork.installed) return;

  const pluginRoot = path.resolve(__dirname, '..', '..');
  const result = await packageCoworkPlugin({ version: VERSION, quiet, pluginRoot });
  printCoworkInstructions(result, VERSION);
}

async function runPackageCoworkCommand(detected, quiet) {
  if (!detected.cowork || !detected.cowork.installed) {
    console.log(chalk.yellow('\n⚠️  Claude Cowork / Claude Desktop was not detected on this machine.\n'));
    return;
  }

  await maybePackageCowork(detected, true, quiet);
}

async function main() {
  const args = process.argv.slice(2);

  setupEscapeHandler();
  setupCleanupHandler();

  console.log(chalk.cyan.bold(`\n🚀 claude-superskills v${VERSION} - Claude Superskills installer\n`));

  printMigrationWarning();

  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }

  if (args.includes('--version') || args.includes('-v')) {
    console.log(`v${VERSION}`);
    return;
  }

  validateRemovedScopeFlags(args);
  const scopeFlag = resolveScope(args);

  if (args.includes('--list-bundles')) {
    listBundles();
    return;
  }

  const searchIdx = args.indexOf('--search');
  if (searchIdx !== -1) {
    const keyword = args[searchIdx + 1];
    searchSkills(keyword);
    return;
  }

  let command = args[0] || 'install';
  if (commandAliases[command]) {
    command = commandAliases[command];
  }

  const quiet = args.includes('-q') || args.includes('--quiet');
  const skipPrompt = args.includes('-y') || args.includes('--yes');

  const bundleIdx = args.indexOf('--bundle');
  if (bundleIdx !== -1) {
    const bundleName = args[bundleIdx + 1];
    const bundle = validateBundle(bundleName);

    console.log(chalk.cyan('🔍 Detecting installed AI CLI tools...\n'));
    const detected = detectTools();

    displayToolsTable(detected);

    const hasAny = detected.copilot.installed || detected.claude.installed ||
                   detected.cowork.installed ||
                   detected.codex_cli.installed || detected.codex_app.installed || detected.opencode.installed ||
                   detected.gemini.installed || detected.antigravity.installed ||
                   detected.cursor.installed || detected.adal.installed;

    if (!hasAny) {
      console.log(getInstallInstructions());
      process.exit(1);
    }

    let bundleScope = scopeFlag;
    if (!bundleScope && !skipPrompt) {
      bundleScope = await promptScope();
    }
    bundleScope = bundleScope || 'global';

    let platforms;
    if (skipPrompt) {
      platforms = getDetectedTargets(detected);
    } else {
      platforms = await promptPlatforms(detected, {
        includeCowork: true,
        scope: bundleScope,
        projectRoot: process.cwd()
      });
    }

    if (platforms.length === 0) {
      console.log('\n❌ Installation cancelled.\n');
      process.exit(0);
    }

    const { platforms: installPlatforms, includeCowork } = splitTargets(platforms);

    const cacheDir = installPlatforms.length > 0 ? await warmCache(quiet) : null;

    if (!quiet) {
      const scopeLabel = bundleScope === 'local' ? `local (${process.cwd()})` : 'global (~/)';
      console.log(chalk.gray(`Mode: ${scopeLabel}`));
      console.log(`📦 Installing bundle: ${bundle.name}`);
      console.log(`Skills: ${bundle.skills.join(', ')}\n`);
      if (includeCowork) {
        console.log(chalk.dim('Claude Cowork package generation is repo-wide; bundle filtering does not change the Cowork zip contents.\n'));
      }
    }

    if (installPlatforms.length > 0) {
      for (const skill of bundle.skills) {
        await installForPlatforms(cacheDir, installPlatforms, [skill], quiet, bundleScope, process.cwd());
      }
    }

    await maybePackageCowork(detected, includeCowork, quiet);

    if (!quiet) {
      console.log('\n✅ Bundle installed successfully!\n');
    }
    return;
  }

  if (args.length === 0 || command === 'install') {
    console.log(chalk.cyan('🔍 Detecting installed AI CLI tools...\n'));

    const detected = detectTools();

    displayToolsTable(detected);

    const hasAny = detected.copilot.installed || detected.claude.installed ||
                   detected.cowork.installed ||
                   detected.codex_cli.installed || detected.codex_app.installed || detected.opencode.installed ||
                   detected.gemini.installed || detected.antigravity.installed ||
                   detected.cursor.installed || detected.adal.installed;

    if (!hasAny) {
      console.log(getInstallInstructions());
      process.exit(1);
    }

    if (!skipPrompt) {
      const action = await promptAction();
      if (action === 'nuke') {
        await runNuclearFlow(quiet);
        return;
      }
    }

    let scope = scopeFlag;
    if (!scope && !skipPrompt) {
      scope = await promptScope();
    }
    scope = scope || 'global';

    let platforms;
    if (skipPrompt) {
      platforms = getDetectedTargets(detected);
    } else {
      platforms = await promptPlatforms(detected, {
        includeCowork: true,
        scope,
        projectRoot: process.cwd()
      });
    }

    if (platforms.length === 0) {
      console.log(chalk.red('\n❌ Installation cancelled.\n'));
      process.exit(0);
    }

    const { platforms: installPlatforms, includeCowork } = splitTargets(platforms);

    if (!quiet) {
      const scopeLabel = scope === 'local' ? `local (${process.cwd()})` : 'global (~/)';
      console.log(chalk.cyan(`\n📦 Installation target: ${platforms.join(', ')} — scope: ${scopeLabel}\n`));
    }

    if (installPlatforms.length > 0) {
      await runSmartInstallFlow(detected, installPlatforms, quiet, skipPrompt, {
        includeCowork,
        scope,
        projectRoot: process.cwd()
      });
    }

    await maybePackageCowork(detected, includeCowork, quiet);
    return;
  }

  switch (command) {
    case 'list': {
      console.log('📋 Installed Skills:\n');
      const detected = detectTools();
      const platforms = getDetectedPlatforms(detected);

      const globalSkills = await getInstalledSkillsByPlatforms(platforms);
      if (globalSkills.length > 0) {
        console.log(chalk.dim('  Global:'));
        globalSkills.forEach((skill) => console.log(`    • ${skill}`));
      } else {
        console.log(chalk.dim('  Global: (none)'));
      }

      const localInstalled = new Set();
      for (const platform of platforms) {
        const targetDir = getLocalSkillsPath(platform, process.cwd());
        if (!(await fs.pathExists(targetDir))) continue;
        const entries = await fs.readdir(targetDir);
        for (const entry of entries) {
          const skillDir = path.join(targetDir, entry);
          if (!(await fs.pathExists(path.join(skillDir, 'SKILL.md')))) continue;
          localInstalled.add(entry);
        }
      }
      if (localInstalled.size > 0) {
        console.log(chalk.dim(`\n  Local (${process.cwd()}):`));
        [...localInstalled].sort().forEach((skill) => console.log(`    • ${skill}`));
      } else {
        console.log(chalk.dim(`\n  Local (${process.cwd()}): (none)`));
      }
      console.log();
      break;
    }

    case 'status':
      await runStatusCommand();
      break;

    case 'update': {
      const detected = detectTools();
      let scope = scopeFlag;
      if (!scope && !skipPrompt) {
        scope = await promptScope();
      }
      scope = scope || 'global';
      await runUpdateCommand(detected, quiet, skipPrompt, scope, process.cwd());
      break;
    }

    case 'package-cowork': {
      const detected = detectTools();
      await runPackageCoworkCommand(detected, quiet);
      break;
    }

    case 'uninstall':
      if (args.includes('--nuclear')) {
        await runNuclearFlow(quiet);
      } else {
        console.log(chalk.cyan('🔍 Detecting installed AI CLI tools...\n'));
        let scope = scopeFlag;
        if (!scope && !skipPrompt) {
          scope = await promptScope();
        }
        scope = scope || 'global';
        await runUninstallFlow(detectTools(), quiet, skipPrompt, scope, process.cwd());
      }
      break;

    case 'doctor':
      console.log('Use: npx claude-superskills --help for options\n');
      break;

    default:
      console.log(`❌ Unknown command: ${command}`);
      showHelp();
  }
}

function showHelp() {
  console.log(`
CLI AI Skills v${VERSION}

Usage: npx claude-superskills [COMMAND] [OPTIONS]

Commands:
  install, i      Install skills (default)
  list, ls        List installed skills
  status, st      Show installed status + version diff
  update, up      Smart update (outdated + missing)
  package-cowork  Generate Claude Cowork plugin zip
  uninstall, rm   Remove skills
  doctor, doc     Check installation

Options:
  --bundle NAME   Install a curated bundle
  --search KEYWORD Search for skills
  --list-bundles  Show available bundles
  --all, -a       Install for all platforms
  --yes, -y       Skip prompts (auto-confirm)
  --quiet, -q     Minimal output
  --help, -h      Show this help
  --version, -v   Show version
  --local, -l     Install to current project directory
  --global, -g    Install to global home directory (default)
  --scope <s>     Explicit scope: local or global

Notes:
  - Default scope is global (~/.<platform>/skills/).
  - Use --local to install into the current project (./.<platform>/skills/).
  - The installer compares installed skill versions with v${VERSION} and recommends updates.
  - If Claude Cowork is detected, the installer can generate a plugin zip for manual upload.

Examples:
  npx claude-superskills                        # Interactive smart installation
  npx claude-superskills -y -q                 # Auto smart update/install
  npx claude-superskills --bundle essential -y # Install essential bundle
  npx claude-superskills up -y                 # Update outdated + install missing skills
  npx claude-superskills package-cowork        # Generate Cowork zip for manual upload
  npx claude-superskills status                # Show global status and version differences
  npx claude-superskills uninstall -y          # Uninstall all + clear cache
  npx claude-superskills uninstall --nuclear   # ☢️  Remove ALL skills from ALL platforms
  npx claude-superskills --local               # Install to current project
  npx claude-superskills --local -y            # Auto install locally
  npx claude-superskills update --local        # Update local skills only
  npx claude-superskills uninstall --local -y  # Remove local skills
`);
}

main().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
