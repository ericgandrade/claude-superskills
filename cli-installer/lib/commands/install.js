const chalk = require('chalk');
const ora = require('ora');
const PlatformDetector = require('../core/detector');
const SkillDownloader = require('../core/downloader');
const VersionChecker = require('../core/version-checker');
const SkillInstaller = require('../core/installer');
const RequirementsInstaller = require('../core/requirements-installer');
const InstallationPrompts = require('../ui/prompts');
const ProgressGauge = require('../ui/progress-gauge');
const path = require('path');

// Read version dynamically from package.json
const packageJson = require('../../package.json');

async function installCommand(skillNames, options) {
  console.log(chalk.cyan.bold(`\n🤖 CLI AI Skills Installer v${packageJson.version}\n`));

  // Initialize progress gauge (5 main steps)
  const gauge = new ProgressGauge(5);

  const detector = new PlatformDetector();
  const downloader = new SkillDownloader();
  const versionChecker = new VersionChecker();
  const installer = new SkillInstaller(detector, downloader, versionChecker);
  const prompts = new InstallationPrompts();

  try {
    // STEP 1: Detect platforms
    gauge.setStep(1, 'Detecting platforms');
    const platformInfo = await detector.detectAll();

    console.log(chalk.green('🔍 Platform Detection:'));
    if (platformInfo.copilot.cliInstalled) {
      console.log(chalk.green(`  ✅ GitHub Copilot CLI found (${platformInfo.copilot.version})`));
    } else if (platformInfo.copilot.installed) {
      console.log(chalk.yellow(`  ⚠️  GitHub Copilot directory found but CLI not installed`));
    } else {
      console.log(chalk.dim(`  ⬜ GitHub Copilot CLI not detected`));
    }
    
    if (platformInfo.claude.installed) {
      console.log(chalk.green(`  ✅ Claude Code detected (~/.claude/)`));
    } else {
      console.log(chalk.dim(`  ⬜ Claude Code not detected`));
    }

    // Check if at least one platform is available
    if (!platformInfo.copilot.installed && !platformInfo.copilot.cliInstalled && !platformInfo.claude.installed) {
      console.log(chalk.red('\n❌ Error: No AI platforms detected\n'));
      console.log(chalk.yellow('Please install at least one:'));
      console.log(chalk.dim('  • GitHub Copilot CLI: https://docs.github.com/copilot/cli'));
      console.log(chalk.dim('  • Claude Code: https://claude.ai/code'));
      console.log(chalk.dim('\n💡 Run \'npx claude-superskills doctor\' for detailed diagnostics'));
      process.exit(1);
    }

    console.log(); // Spacing

    // STEP 2: Configuration
    gauge.setStep(2, 'Gathering configuration');
    
    // Ask for scope (unless specified)
    let scope = 'global';
    if (!options.global && !options.local && !options.yes) {
      scope = await prompts.askScope();
    } else {
      scope = options.local ? 'local' : 'global';
    }

    // Confirm local installation
    if (scope === 'local' && !options.yes) {
      const confirmed = await prompts.confirmLocalInstallation();
      if (!confirmed) {
        console.log(chalk.yellow('Installation cancelled.'));
        return;
      }
    }

    // Ask for platform selection (unless specified)
    let selectedPlatforms = [];
    if (options.copilot && options.claude) {
      selectedPlatforms = ['copilot', 'claude'];
    } else if (options.copilot) {
      selectedPlatforms = ['copilot'];
    } else if (options.claude) {
      selectedPlatforms = ['claude'];
    } else if (!options.yes) {
      selectedPlatforms = await prompts.askPlatforms(platformInfo);
    } else {
      // Default to all detected platforms
      selectedPlatforms = [];
      if (platformInfo.copilot.installed || platformInfo.copilot.cliInstalled) selectedPlatforms.push('copilot');
      if (platformInfo.claude.installed) selectedPlatforms.push('claude');
    }

    console.log(chalk.cyan(`\n📋 Configuration:`));
    console.log(chalk.dim(`  Scope: ${scope === 'global' ? 'Global' : 'Local'}`));
    console.log(chalk.dim(`  Platforms: ${selectedPlatforms.join(', ')}`));
    console.log();

    // STEP 3: Get available skills and select
    gauge.setStep(3, 'Fetching available skills');
    const availableSkills = await downloader.listAvailableSkills();

    // Select skills to install
    let skillsToInstall = skillNames || [];
    if (skillsToInstall.length === 0) {
      if (options.all) {
        skillsToInstall = availableSkills.map(s => s.name);
      } else if (!options.yes) {
        skillsToInstall = await prompts.askSkills(availableSkills);
      } else {
        console.log(chalk.red('No skills specified. Use --all or specify skill names.'));
        return;
      }
    }

    console.log(chalk.cyan(`\n🎯 Skills selected: ${skillsToInstall.join(', ')}\n`));

    // STEP 4: Check versions and install
    gauge.setStep(4, 'Installing skills');
    
    const installPaths = detector.getInstallPaths(scope, platformInfo);
    const results = {
      installed: [],
      updated: [],
      skipped: [],
      failed: []
    };

    let currentSkill = 0;
    for (const skillName of skillsToInstall) {
      currentSkill++;
      
      console.log(chalk.cyan(`\n[${currentSkill}/${skillsToInstall.length}] ${skillName}`));
      
      const skillMeta = availableSkills.find(s => s.name === skillName);
      if (!skillMeta) {
        console.log(chalk.yellow(`  ⚠️  Skill not found, skipping...`));
        results.failed.push(skillName);
        continue;
      }

      // Check if already installed
      let shouldInstall = true;
      let action = 'install';

      for (const platform of selectedPlatforms) {
        if (!installPaths[platform]) continue;
        
        const skillPath = path.join(installPaths[platform], skillName);
        const updateStatus = await versionChecker.checkUpdate(skillPath, skillMeta.version);

        if (updateStatus.installed && !options.yes) {
          if (updateStatus.needsUpdate) {
            console.log(chalk.yellow(`  ⚠️  v${updateStatus.currentVersion} installed, v${updateStatus.latestVersion} available`));
          } else {
            console.log(chalk.green(`  ✅ v${updateStatus.currentVersion} already installed (latest)`));
          }

          const decision = await prompts.askUpdate(skillName, updateStatus);
          action = decision;
          
          if (decision === 'skip' || decision === 'keep') {
            shouldInstall = false;
            results.skipped.push(skillName);
            break;
          } else if (decision === 'update' || decision === 'reinstall') {
            shouldInstall = true;
            action = decision;
            break;
          }
        } else if (updateStatus.installed && options.yes) {
          // Auto-update if outdated in yes mode
          if (updateStatus.needsUpdate) {
            action = 'update';
          } else {
            shouldInstall = false;
            results.skipped.push(skillName);
            break;
          }
        }
      }

      if (shouldInstall) {
        try {
          const result = await installer.install(skillName, {
            platforms: selectedPlatforms,
            scope,
            method: options.copy ? 'copy' : 'symlink',
            force: action === 'update' || action === 'reinstall'
          });

          if (result.success) {
            if (action === 'update') {
              results.updated.push(skillName);
              console.log(chalk.green(`  ✅ Updated successfully`));
            } else {
              results.installed.push(skillName);
              console.log(chalk.green(`  ✅ Installed successfully`));
            }
            
            // Check for Python requirements
            const requirementsInstaller = new RequirementsInstaller();
            const firstPlatform = selectedPlatforms[0];
            const skillPath = path.join(installPaths[firstPlatform], skillName);
            
            const requirements = await requirementsInstaller.detectRequirements(skillPath);
            
            if (requirements.hasRequirements) {
              console.log(chalk.blue('\n  📦 This skill has dependencies'));

              // Check Python availability
              const pythonCheck = await requirementsInstaller.verifyPython();
              if (!pythonCheck.available) {
                console.log(chalk.yellow('  ⚠️  Python 3 not found'));
                console.log(chalk.dim('     Please install Python 3.8+: https://www.python.org/downloads/'));
                continue;
              }
              console.log(chalk.green(`  ✅ Python detected: ${pythonCheck.version}`));

              if (requirements.type === 'pip') {
                // Check individual package statuses
                const statuses = await requirementsInstaller.checkPackageStatuses(requirements.packages);
                const alreadyInstalled = statuses.filter(s => s.installed);
                const missing = statuses.filter(s => !s.installed);

                if (alreadyInstalled.length > 0) {
                  console.log(chalk.green(`  ✅ Already installed: ${alreadyInstalled.map(s => s.name).join(', ')}`));
                }

                if (missing.length === 0) {
                  console.log(chalk.green('  ✅ All dependencies already installed'));
                } else if (options.yes) {
                  // --yes flag: install all missing without prompting
                  await requirementsInstaller.installPackages(missing.map(s => s.name), { verbose: options.verbose });
                } else {
                  // Interactive: let user select which packages to install
                  const inquirer = require('inquirer');
                  const { selectedPackages } = await inquirer.prompt([
                    {
                      type: 'checkbox',
                      name: 'selectedPackages',
                      message: 'Select packages to install:',
                      choices: statuses.map(s => ({
                        name: s.installed
                          ? `${s.name} ${chalk.green('(already installed)')}`
                          : s.name,
                        value: s.name,
                        checked: !s.installed
                      }))
                    }
                  ]);

                  if (selectedPackages.length === 0) {
                    console.log(chalk.blue('\n  ℹ️  No packages selected — skipped'));
                    console.log(chalk.dim(`     Install later: pip install ${requirements.packages.join(' ')}`));
                  } else {
                    const installResult = await requirementsInstaller.installPackages(selectedPackages, { verbose: options.verbose });
                    if (!installResult.success) {
                      console.log(chalk.dim(`     pip install ${selectedPackages.join(' ')}`));
                    }
                  }
                }

              } else if (requirements.type === 'bash') {
                // Bash script: single confirm (can't split individual items)
                let runScript = options.yes;
                if (!options.yes) {
                  const inquirer = require('inquirer');
                  const answer = await inquirer.prompt([{
                    type: 'confirm',
                    name: 'install',
                    message: 'Install dependencies via setup script?',
                    default: true
                  }]);
                  runScript = answer.install;
                }
                if (runScript) {
                  const installResult = await requirementsInstaller.installRequirements(requirements, { verbose: options.verbose });
                  if (!installResult.success) {
                    console.log(chalk.dim(`     bash ${requirements.scriptPath}`));
                  }
                } else {
                  console.log(chalk.blue('\n  ℹ️  Skipped — run later:'));
                  console.log(chalk.dim(`     bash ${requirements.scriptPath}`));
                }
              }
            }
            
          } else {
            results.failed.push(skillName);
            console.log(chalk.red(`  ❌ Failed: ${result.errors.join(', ')}`));
          }
        } catch (error) {
          results.failed.push(skillName);
          console.log(chalk.red(`  ❌ Error: ${error.message}`));
        }
      }
    }

    // STEP 5: Complete
    console.log(); // Spacing
    gauge.complete('Installation complete!');

    // Show summary
    ProgressGauge.summary({
      completed: results.installed.length + results.updated.length,
      failed: results.failed.length,
      total: skillsToInstall.length
    });

    console.log(chalk.cyan('\n📝 Next steps:'));
    console.log('  1. Open a new terminal');
    if (selectedPlatforms.includes('copilot')) {
      console.log('  2. Try: gh copilot -p "improve this prompt: create REST API"');
    }
    if (selectedPlatforms.includes('claude')) {
      console.log('  3. Or: claude (and use skill triggers)');
    }
    
    console.log(chalk.green(`\n🎉 ${results.installed.length + results.updated.length} skill(s) ready to use!\n`));

  } catch (error) {
    console.error(chalk.red(`\n❌ Error: ${error.message}`));
    if (error.stack) {
      console.error(chalk.dim(error.stack));
    }
    process.exit(1);
  }
}

module.exports = installCommand;
