#!/usr/bin/env node

const { detectTools, getInstallInstructions } = require('../lib/detector');
const { promptPlatforms, setupEscapeHandler } = require('../lib/interactive');
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
const { registerMcpServers } = require('../lib/mcp-installer');
const { searchSkills } = require('../lib/search');
const { displayToolsTable } = require('../lib/ui/table');
const { ensureSkillsCached } = require('../lib/core/downloader');
const { packageCoworkPlugin, printCoworkInstructions } = require('../lib/cowork');
const { getUserSkillsPath } = require('../lib/utils/path-resolver');
const {
  getCachedSkillInventory,
  buildPlatformSkillDiff,
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
  const removedFlags = ['--scope', '--claude-scope', '--global', '-g', '--local', '-l'];
  const used = removedFlags.filter((flag) => args.includes(flag));
  if (used.length > 0) {
    throw new Error(`Scope flags are no longer supported (${used.join(', ')}). Installation is always global.`);
  }
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
  const all = new Set();
  const homeDir = os.homedir();

  const repoSkillsDir = path.join(process.cwd(), 'skills');
  if (fs.existsSync(repoSkillsDir)) {
    for (const entry of fs.readdirSync(repoSkillsDir)) {
      const skillDir = path.join(repoSkillsDir, entry);
      if (fs.existsSync(path.join(skillDir, 'SKILL.md')) && fs.statSync(skillDir).isDirectory()) {
        all.add(entry);
      }
    }
  }

  const cacheBase = path.join(homeDir, '.claude-superskills', 'cache');
  if (fs.existsSync(cacheBase)) {
    for (const version of fs.readdirSync(cacheBase)) {
      const versionSkillsDir = path.join(cacheBase, version, 'skills');
      if (!fs.existsSync(versionSkillsDir)) continue;
      for (const entry of fs.readdirSync(versionSkillsDir)) {
        const skillDir = path.join(versionSkillsDir, entry);
        if (fs.existsSync(path.join(skillDir, 'SKILL.md')) && fs.statSync(skillDir).isDirectory()) {
          all.add(entry);
        }
      }
    }
  }

  try {
    const bundlesPath = path.join(__dirname, '..', 'bundles.json');
    if (fs.existsSync(bundlesPath)) {
      const bundles = JSON.parse(fs.readFileSync(bundlesPath, 'utf8'));
      for (const bundle of Object.values(bundles.bundles || {})) {
        for (const skill of bundle.skills || []) {
          all.add(skill);
        }
      }
    }
  } catch {
    // ignore bundle metadata parse issues for runtime fallback
  }

  return Array.from(all).sort();
}

function getPlatformTargetDir(platform) {
  return getUserSkillsPath(platform) || null;
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

function getPlatformInstallStatus(platform) {
  const managedSkills = getManagedSkillNames();
  const globalDir = getPlatformTargetDir(platform);
  const globalCount = getInstalledManagedCount(globalDir, managedSkills);

  return {
    globalDir,
    globalCount,
    hasGlobal: globalCount > 0
  };
}

async function uninstallManagedSkills(platforms, quiet) {
  let managedSkills = getManagedSkillNames();
  const targets = [...new Set(platforms.map((platform) => getPlatformTargetDir(platform)).filter(Boolean))];
  let removedCount = 0;

  if (managedSkills.length === 0) {
    const discovered = new Set();
    for (const targetDir of targets) {
      if (!(await fs.pathExists(targetDir))) continue;
      const entries = await fs.readdir(targetDir);
      for (const entry of entries) {
        const skillDir = path.join(targetDir, entry);
        if (!(await fs.pathExists(path.join(skillDir, 'SKILL.md')))) continue;
        const stat = await fs.stat(skillDir);
        if (stat.isDirectory()) discovered.add(entry);
      }
    }
    managedSkills = Array.from(discovered);
  }

  for (const targetDir of targets) {
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
    console.log(chalk.gray(`🧹 Uninstalled ${removedCount} managed skill folder(s)`));
  }
}

async function runUninstallFlow(detected, quiet, skipPrompt) {
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
        { name: 'Cancel', value: 'cancel' }
      ],
      default: 'all'
    }]);

    if (uninstallMode === 'cancel') {
      console.log(chalk.dim('\n❌ Operation cancelled.\n'));
      process.exit(0);
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
      message: 'Clear local skills cache (~/.claude-superskills/cache) too?',
      default: true
    }]);
    shouldClearCache = clearCacheNow;
  } else if (!quiet) {
    console.log(chalk.cyan('\n🗑️  Auto mode: uninstalling from all detected platforms and clearing cache...\n'));
  }

  if (!quiet) {
    console.log(chalk.cyan(`\n🧹 Uninstalling skills from: ${selectedPlatforms.join(', ')}\n`));
    console.log(chalk.gray('   Mode: global only'));
  }

  await uninstallManagedSkills(selectedPlatforms, quiet);
  if (shouldClearCache) {
    await clearSkillsCache(quiet);
  }

  if (!quiet) {
    console.log(chalk.green('\n✅ Uninstall complete!\n'));
  }
}

async function clearSkillsCache(quiet) {
  const cacheBase = path.join(os.homedir(), '.claude-superskills', 'cache');
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

async function installForPlatforms(cacheDir, platforms, skills, quiet) {
  for (const platform of platforms) {
    const installer = getInstallerByPlatform(platform);
    if (!installer) continue;

    const targetDir = getPlatformTargetDir(platform);
    if (!targetDir) continue;

    await installer(cacheDir, skills, quiet, targetDir, `${platform} (global)`);
  }
}

function buildDiffByPlatform(platforms, cacheInventory) {
  const diffByPlatform = {};
  for (const platform of platforms) {
    diffByPlatform[platform] = buildPlatformSkillDiff(platform, cacheInventory);
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

async function runInstallPlan(cacheDir, plan, quiet) {
  for (const [platform, skills] of Object.entries(plan)) {
    await installForPlatforms(cacheDir, [platform], skills, quiet);
  }
}

function printGlobalStatus(detected) {
  const detectedPlatforms = getDetectedPlatforms(detected);
  if (detectedPlatforms.length === 0) {
    console.log(chalk.yellow('\n⚠️  No supported platforms detected.\n'));
    return;
  }

  console.log(chalk.cyan('\n📊 Installation status (global)\n'));

  for (const platform of detectedPlatforms) {
    const status = getPlatformInstallStatus(platform);
    const globalDir = status.globalDir || '(n/a)';
    const globalLine = `${status.hasGlobal ? '✅' : '⬜'} ${status.globalCount} skill(s)`;

    console.log(chalk.bold(`• ${platform}`));
    console.log(chalk.dim(`  global: ${globalLine}  -> ${globalDir}`));
  }
  console.log();
}

async function runSmartInstallFlow(detected, platforms, quiet, skipPrompt, options = {}) {
  const { includeCowork = false } = options;
  const cacheDir = await warmCache(quiet);
  const cacheInventory = getCachedSkillInventory(cacheDir);
  const diffByPlatform = buildDiffByPlatform(platforms, cacheInventory);

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

    await installForPlatforms(cacheDir, platforms, null, quiet);
    const pluginRootReinstall = path.resolve(__dirname, '..', '..');
    await registerMcpServers(platforms, pluginRootReinstall, quiet);
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
    await runInstallPlan(cacheDir, plan, quiet);
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
    await installForPlatforms(cacheDir, platforms, null, quiet);
    const pluginRootR2 = path.resolve(__dirname, '..', '..');
    await registerMcpServers(platforms, pluginRootR2, quiet);
    if (!quiet) console.log(chalk.green('\n✅ Reinstall complete!\n'));
    return;
  }

  const plan = buildRecommendedInstallPlan(diffByPlatform);
  await runInstallPlan(cacheDir, plan, quiet);
  const pluginRootPlan = path.resolve(__dirname, '..', '..');
  await registerMcpServers(platforms, pluginRootPlan, quiet);
  if (!quiet) console.log(chalk.green('\n✅ Smart update complete (outdated + missing skills).\n'));
}

async function runStatusCommand() {
  const detected = detectTools();
  printGlobalStatus(detected);

  const platforms = getDetectedPlatforms(detected);
  if (platforms.length === 0) return;

  const cacheDir = await warmCache(false);
  const cacheInventory = getCachedSkillInventory(cacheDir);
  const diffByPlatform = buildDiffByPlatform(platforms, cacheInventory);
  printDiffReport(diffByPlatform, false);
}

async function runUpdateCommand(detected, quiet, skipPrompt) {
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
    await runSmartInstallFlow(detected, platforms, quiet, skipPrompt, { includeCowork: hasCowork });
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

  console.log(chalk.cyan.bold(`\n🚀 claude-superskills v${VERSION} - Multi-Platform Installer\n`));

  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }

  if (args.includes('--version') || args.includes('-v')) {
    console.log(`v${VERSION}`);
    return;
  }

  validateRemovedScopeFlags(args);

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

    let platforms;
    if (skipPrompt) {
      platforms = getDetectedTargets(detected);
    } else {
      platforms = await promptPlatforms(detected, { includeCowork: true });
    }

    if (platforms.length === 0) {
      console.log('\n❌ Installation cancelled.\n');
      process.exit(0);
    }

    const { platforms: installPlatforms, includeCowork } = splitTargets(platforms);

    const cacheDir = installPlatforms.length > 0 ? await warmCache(quiet) : null;

    if (!quiet) {
      console.log(chalk.gray('Mode: global installation only'));
      console.log(`📦 Installing bundle: ${bundle.name}`);
      console.log(`Skills: ${bundle.skills.join(', ')}\n`);
      if (includeCowork) {
        console.log(chalk.dim('Claude Cowork package generation is repo-wide; bundle filtering does not change the Cowork zip contents.\n'));
      }
    }

    if (installPlatforms.length > 0) {
      for (const skill of bundle.skills) {
        await installForPlatforms(cacheDir, installPlatforms, [skill], quiet);
      }
    }

    if (installPlatforms.length > 0) {
      const pluginRoot = path.resolve(__dirname, '..', '..');
      await registerMcpServers(installPlatforms, pluginRoot, quiet);
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

    let platforms;
    if (skipPrompt) {
      platforms = getDetectedTargets(detected);
    } else {
      platforms = await promptPlatforms(detected, { includeCowork: true });
    }

    if (platforms.length === 0) {
      console.log(chalk.red('\n❌ Installation cancelled.\n'));
      process.exit(0);
    }

    const { platforms: installPlatforms, includeCowork } = splitTargets(platforms);

    if (!quiet) {
      console.log(chalk.cyan(`\n📦 Installation target: ${platforms.join(', ')}\n`));
    }

    if (installPlatforms.length > 0) {
      await runSmartInstallFlow(detected, installPlatforms, quiet, skipPrompt, { includeCowork });
      const pluginRoot = path.resolve(__dirname, '..', '..');
      await registerMcpServers(installPlatforms, pluginRoot, quiet);
    }

    await maybePackageCowork(detected, includeCowork, quiet);
    return;
  }

  switch (command) {
    case 'list': {
      console.log('📋 Installed Skills:\n');
      const detected = detectTools();
      const platforms = getDetectedPlatforms(detected);
      const skills = await getInstalledSkillsByPlatforms(platforms);
      skills.forEach((skill) => {
        console.log(`  • ${skill}`);
      });
      if (skills.length === 0) {
        console.log('  (none)');
      }
      console.log();
      break;
    }

    case 'status':
      await runStatusCommand();
      break;

    case 'update': {
      const detected = detectTools();
      await runUpdateCommand(detected, quiet, skipPrompt);
      break;
    }

    case 'package-cowork': {
      const detected = detectTools();
      await runPackageCoworkCommand(detected, quiet);
      break;
    }

    case 'uninstall':
      console.log(chalk.cyan('🔍 Detecting installed AI CLI tools...\n'));
      await runUninstallFlow(detectTools(), quiet, skipPrompt);
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

Notes:
  - Installation is always global.
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
`);
}

main().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
