const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const chalk = require('chalk');
const { getSkillsSourcePath, getUserSkillsPath } = require('./utils/path-resolver');

/**
 * Install skills for Claude Code
 * @param {string} repoPath - Path to the cli-ai-skills repository
 * @param {Array<string>|null} skills - Skills to install (null = all)
 * @param {boolean} quiet - Suppress output
 */
function installClaudeSkills(repoPath, skills = null, quiet = false) {
  const skillsSource = getSkillsSourcePath(repoPath, 'claude');
  const skillsTarget = getUserSkillsPath('claude');

  if (!quiet) {
    console.log(chalk.cyan('\n🔧 Installing Claude Code skills...'));
    console.log(chalk.gray(`   Destino: ${skillsTarget}`));
  }

  if (!fs.existsSync(skillsSource)) {
    if (!quiet) {
      console.log(chalk.red('❌ Diretório .claude/skills não encontrado no repositório'));
      console.log(chalk.gray(`   Esperado: ${skillsSource}`));
    }
    return { installed: 0, failed: 0 };
  }

  fs.ensureDirSync(skillsTarget);

  // Listar skills disponíveis
  const availableSkills = fs.readdirSync(skillsSource).filter(f =>
    fs.statSync(path.join(skillsSource, f)).isDirectory() &&
    f !== 'node_modules' &&
    !f.startsWith('.')
  );

  if (availableSkills.length === 0) {
    if (!quiet) {
      console.log(chalk.yellow('   ⚠️  Nenhum skill encontrado em .claude/skills/'));
    }
    return { installed: 0, failed: 0 };
  }

  const skillsToInstall = skills || availableSkills;
  let installed = 0;
  let failed = 0;

  skillsToInstall.forEach(skill => {
    const source = path.join(skillsSource, skill);
    const target = path.join(skillsTarget, skill);

    if (!fs.existsSync(source)) {
      if (!quiet) {
        console.log(chalk.yellow(`   ⚠️  Skill não encontrada: ${skill}`));
      }
      failed++;
      return;
    }

    // Remover symlink antigo se existir
    if (fs.existsSync(target) || fs.lstatSync(target, {throwIfNoEntry: false})) {
      try {
        fs.unlinkSync(target);
      } catch (e) {
        // Ignore
      }
    }

    // Criar novo symlink
    try {
      fs.symlinkSync(source, target, 'dir');
      if (!quiet) {
        console.log(chalk.green(`   ✓ Claude: ${skill}`));
      }
      installed++;
    } catch (error) {
      if (!quiet) {
        console.log(chalk.red(`   ✗ Erro ao instalar ${skill}: ${error.message}`));
      }
      failed++;
    }
  });

  if (!quiet) {
    console.log(chalk.green(`\n✅ ${installed} Claude skill(s) instalado(s)`));
    if (failed > 0) {
      console.log(chalk.yellow(`⚠️  ${failed} skill(s) falharam`));
    }
  }

  return { installed, failed };
}

module.exports = { installClaudeSkills };
