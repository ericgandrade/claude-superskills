const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');
const ora = require('ora');

/**
 * Handles installation of Python requirements for skills
 */
class RequirementsInstaller {
  constructor() {
    this.pythonCmd = 'python3';
  }

  /**
   * Detect if skill has requirements to install
   * @param {string} skillPath - Path to skill directory
   * @returns {Promise<Object>} Requirements info
   */
  async detectRequirements(skillPath) {
    // Check for install script (preferred method)
    const installScript = path.join(skillPath, 'scripts', 'install-requirements.sh');
    
    if (await fs.pathExists(installScript)) {
      return {
        hasRequirements: true,
        scriptPath: installScript,
        type: 'bash',
        method: 'script'
      };
    }
    
    // Check for requirements.txt (fallback)
    const requirementsTxt = path.join(skillPath, 'requirements.txt');
    
    if (await fs.pathExists(requirementsTxt)) {
      const packages = await fs.readFile(requirementsTxt, 'utf-8');
      const parsedPackages = packages
        .split('\n')
        .filter(p => p.trim() && !p.trim().startsWith('#'));
      if (parsedPackages.length === 0) {
        return { hasRequirements: false };
      }
      return {
        hasRequirements: true,
        file: requirementsTxt,
        packages: parsedPackages,
        type: 'pip',
        method: 'requirements.txt'
      };
    }
    
    return { hasRequirements: false };
  }

  /**
   * Verify Python is available
   * @returns {Promise<Object>} Python availability info
   */
  async verifyPython() {
    try {
      const version = execSync(`${this.pythonCmd} --version`, { 
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe']
      }).trim();
      
      return { 
        available: true, 
        version: version,
        command: this.pythonCmd
      };
    } catch (error) {
      return { available: false };
    }
  }

  /**
   * Install requirements for a skill
   * @param {Object} requirements - Requirements object from detectRequirements()
   * @param {Object} options - Installation options
   * @returns {Promise<Object>} Installation result
   */
  async installRequirements(requirements, options = {}) {
    if (!requirements.hasRequirements) {
      return { success: true, skipped: true };
    }

    const spinner = ora('Installing skill requirements...').start();

    try {
      if (requirements.type === 'bash') {
        // Execute installation script
        spinner.text = `Running ${path.basename(requirements.scriptPath)}...`;
        
        execSync(`bash "${requirements.scriptPath}"`, {
          stdio: options.verbose ? 'inherit' : 'pipe',
          cwd: path.dirname(requirements.scriptPath),
          env: { ...process.env, TERM: 'dumb' } // Prevent interactive prompts
        });
        
      } else if (requirements.type === 'pip') {
        // Install via pip
        spinner.text = `Installing Python packages: ${requirements.packages.join(', ')}...`;
        
        const packagesStr = requirements.packages.join(' ');
        execSync(`${this.pythonCmd} -m pip install --user --break-system-packages ${packagesStr}`, {
          stdio: options.verbose ? 'inherit' : 'pipe'
        });
      }

      spinner.succeed(chalk.green('Requirements installed successfully'));
      return { success: true };
      
    } catch (error) {
      spinner.fail(chalk.red('Requirements installation failed'));
      
      console.error(chalk.yellow('\n⚠️  Automatic installation failed'));
      console.error(chalk.gray(`Error: ${error.message}`));
      console.error(chalk.yellow('\n💡 You can install requirements manually:'));
      
      if (requirements.type === 'bash') {
        console.error(chalk.gray(`   bash ${requirements.scriptPath}`));
      } else if (requirements.type === 'pip') {
        console.error(chalk.gray(`   pip install --user ${requirements.packages.join(' ')}`));
      }
      
      return { success: false, error: error.message };
    }
  }

  /**
   * Verify if Python package is installed
   * @param {string} packageName - Package name to check
   * @returns {Promise<boolean>} True if installed
   */
  async isPackageInstalled(packageName) {
    try {
      execSync(`${this.pythonCmd} -c "import ${packageName}"`, {
        stdio: 'pipe'
      });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if a pip package is installed (by package name, not import name)
   * @param {string} packageName - pip package name (e.g. 'python-pptx')
   * @returns {Promise<boolean>}
   */
  async isPipPackageInstalled(packageName) {
    try {
      execSync(`${this.pythonCmd} -m pip show ${packageName}`, { stdio: 'pipe' });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check status of requirements for installed skills
   * @param {string} skillPath - Path to skill directory
   * @returns {Promise<Object>} Status info
   */
  async checkRequirementsStatus(skillPath) {
    const requirements = await this.detectRequirements(skillPath);
    
    if (!requirements.hasRequirements) {
      return { hasRequirements: false, status: 'n/a' };
    }

    const skillName = path.basename(skillPath);

    // audio-transcriber uses a bash script — check whisper + ffmpeg manually
    if (skillName === 'audio-transcriber') {
      const whisperInstalled = await this.isPackageInstalled('whisper');
      const fasterWhisperInstalled = await this.isPackageInstalled('faster_whisper');
      
      let status = 'not-installed';
      let details = [];
      
      if (fasterWhisperInstalled) {
        status = 'installed';
        details.push('faster-whisper');
      } else if (whisperInstalled) {
        status = 'installed';
        details.push('openai-whisper');
      }
      
      try {
        execSync('which ffmpeg', { stdio: 'pipe' });
        details.push('ffmpeg');
      } catch {
        // ffmpeg not installed (optional)
      }
      
      return {
        hasRequirements: true,
        status,
        details,
        packages: fasterWhisperInstalled || whisperInstalled ? details : []
      };
    }

    // For requirements.txt skills: check each package via pip show
    if (requirements.type === 'pip' && requirements.packages) {
      const results = await Promise.all(
        requirements.packages.map(async (pkg) => ({
          name: pkg,
          installed: await this.isPipPackageInstalled(pkg)
        }))
      );

      const allInstalled = results.every(r => r.installed);
      const installedList = results.filter(r => r.installed).map(r => r.name);
      const missingList = results.filter(r => !r.installed).map(r => r.name);

      return {
        hasRequirements: true,
        status: allInstalled ? 'installed' : missingList.length === results.length ? 'not-installed' : 'partial',
        details: installedList,
        missing: missingList,
        packages: requirements.packages
      };
    }

    return { hasRequirements: true, status: 'unknown', details: [] };
  }
}

module.exports = RequirementsInstaller;
