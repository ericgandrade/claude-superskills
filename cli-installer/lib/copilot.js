const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const chalk = require('chalk');
const { getUserSkillsPath, isValidSkillName, assertSafePath } = require('./utils/path-resolver');

const LEGACY_COPILOT_SKILLS_DIR = path.join(os.homedir(), '.github', 'skills');

async function migrateLegacySkills(quiet) {
  if (!fs.existsSync(LEGACY_COPILOT_SKILLS_DIR)) return;
  const entries = (await fs.readdir(LEGACY_COPILOT_SKILLS_DIR)).filter(e =>
    fs.existsSync(path.join(LEGACY_COPILOT_SKILLS_DIR, e, 'SKILL.md'))
  );
  if (entries.length === 0) return;
  for (const entry of entries) {
    await fs.remove(path.join(LEGACY_COPILOT_SKILLS_DIR, entry));
  }
  if (!quiet) {
    console.log(chalk.dim(`  ↩️  Cleaned ${entries.length} skill(s) from old location ~/.github/skills/ (now using ~/.copilot/skills/)`));
  }
}

/**
 * Install skills for GitHub Copilot CLI.
 * @param {string} cacheDir - Path to cached skills dir (~/.superskills/cache/{v}/skills/)
 * @param {string[]|null} skills - Specific skills to install, or null for all
 * @param {boolean} quiet - Suppress output
 * @param {string|null} targetDirOverride - Optional custom target directory
 * @param {string} label - Log label for output
 */
async function installCopilotSkills(cacheDir, skills = null, quiet = false, targetDirOverride = null, label = 'Copilot') {
  const targetDir = targetDirOverride || getUserSkillsPath('copilot');
  await migrateLegacySkills(quiet);
  await fs.ensureDir(targetDir);

  const availableSkills = (await fs.readdir(cacheDir)).filter(f =>
    fs.statSync(path.join(cacheDir, f)).isDirectory()
  );

  const skillsToInstall = skills || availableSkills;
  let installed = 0;
  let failed = 0;

  for (const skill of skillsToInstall) {
    if (!isValidSkillName(skill)) {
      if (!quiet) console.log(chalk.yellow(`  ⚠️  Skipping invalid skill name: ${skill}`));
      failed++;
      continue;
    }

    const src = path.join(cacheDir, skill);
    const dest = path.join(targetDir, skill);
    const skillFile = path.join(src, 'SKILL.md');

    try {
      assertSafePath(path.resolve(dest), path.resolve(targetDir));
    } catch (err) {
      if (!quiet) console.log(chalk.red(`  ✗ ${err.message}`));
      failed++;
      continue;
    }

    if (!fs.existsSync(src) || !fs.existsSync(skillFile)) {
      if (!quiet) console.log(chalk.yellow(`  ⚠️  Skill not found: ${skill}`));
      failed++;
      continue;
    }

    try {
      if (fs.existsSync(dest)) await fs.remove(dest);
      await fs.copy(src, dest);
      if (!quiet) console.log(chalk.green(`  ✓ ${label}: ${skill}`));
      installed++;
    } catch (err) {
      if (fs.existsSync(dest)) await fs.remove(dest);
      if (!quiet) console.log(chalk.red(`  ✗ Error installing ${skill}: ${err.message}`));
      failed++;
    }
  }

  return { installed, failed };
}

module.exports = { installCopilotSkills };
