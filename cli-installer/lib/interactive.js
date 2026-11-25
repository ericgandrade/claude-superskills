const inquirer = require('inquirer');
const chalk = require('chalk');

// ESC handler state
let escListenerActive = false;
let currentPrompt = null;

/**
 * Setup ESC key handler for cancelling prompts
 */
function setupEscapeHandler() {
  if (escListenerActive) return;
  
  const readline = require('readline');
  readline.emitKeypressEvents(process.stdin);
  
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }
  
  process.stdin.on('keypress', async (str, key) => {
    if (key && key.name === 'escape') {
      await confirmCancel();
    }
  });
  
  escListenerActive = true;
}

/**
 * Confirm cancellation with user
 */
async function confirmCancel() {
  console.log('\n'); // New line for better UX

  const { cancel } = await inquirer.prompt([{
    type: 'confirm',
    name: 'cancel',
    message: chalk.yellow('⚠️  Cancel installation?'),
    default: false
  }]);

  if (cancel) {
    console.log(chalk.red('\n❌ Installation cancelled by user.\n'));
    process.exit(0);
  } else {
    console.log(chalk.dim('Continuing...\n'));
  }
}

/**
 * Ask user to choose install scope: global (~/.<platform>/skills/) or local (./<platform>/skills/).
 * @returns {Promise<'global'|'local'>}
 */
/**
 * Ask user to choose the main action: install skills or nuke.
 * @returns {Promise<'install'|'nuke'>}
 */
async function promptAction() {
  const { action } = await inquirer.prompt([{
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      {
        name: 'Install / Update skills',
        value: 'install'
      },
      new inquirer.Separator(),
      {
        name: chalk.red('☢️  Nuke   — Remove ALL skills from ALL platforms'),
        value: 'nuke'
      }
    ],
    default: 'install'
  }]);
  return action;
}

/**
 * Ask user to choose install scope: global (~/.<platform>/skills/) or local (./<platform>/skills/).
 * @returns {Promise<'global'|'local'>}
 */
async function promptScope() {
  const cwd = process.cwd();
  const { scope } = await inquirer.prompt([{
    type: 'list',
    name: 'scope',
    message: 'Install scope:',
    choices: [
      {
        name: `Global  — ~/.<platform>/skills/  (available to all projects)`,
        value: 'global'
      },
      {
        name: `Local   — ${cwd}/.<platform>/skills/  (this project only)`,
        value: 'local'
      }
    ],
    default: 'global'
  }]);
  return scope;
}

/**
 * Ask user which platforms to install to
 * Codex CLI and Codex App are always shown separately
 * @param {Object} detected - Detected tools { copilot, claude, codex_cli, codex_app, opencode, gemini }
 * @returns {Promise<Array>} Selected platforms
 */
async function promptPlatforms(detected, options = {}) {
  const {
    message = 'Install skills for which platforms? (Press ESC to cancel)',
    defaultChecked = true,
    includeCowork = false,
    scope = 'global',
    projectRoot = process.cwd()
  } = options;
  const { getUserSkillsPath, getLocalSkillsPath } = require('./utils/path-resolver');
  const getPath = (platform) => scope === 'local'
    ? getLocalSkillsPath(platform, projectRoot)
    : getUserSkillsPath(platform);
  const choices = [];
  
  if (detected.copilot && detected.copilot.installed) {
    choices.push({
      name: `✅ GitHub Copilot CLI (${getPath('copilot')})`,
      value: 'copilot',
      checked: defaultChecked
    });
  }
  
  if (detected.claude && detected.claude.installed) {
    choices.push({
      name: `✅ Claude Code (${getPath('claude')})`,
      value: 'claude',
      checked: defaultChecked
    });
  }

  if (includeCowork && detected.cowork && detected.cowork.installed) {
    choices.push({
      name: '✅ Claude Cowork (generate plugin zip for manual upload)',
      value: 'cowork',
      checked: defaultChecked
    });
  }
  
  if ((detected.codex_cli && detected.codex_cli.installed) ||
      (detected.codex_app && detected.codex_app.installed)) {
    choices.push({
      name: `✅ OpenAI Codex CLI + App (${getPath('codex')})`,
      value: 'codex',
      checked: defaultChecked
    });
  }
  
  if (detected.opencode && detected.opencode.installed) {
    choices.push({
      name: `✅ OpenCode (${getPath('opencode')})`,
      value: 'opencode',
      checked: defaultChecked
    });
  }
  
  if (detected.gemini && detected.gemini.installed) {
    choices.push({
      name: `✅ Gemini CLI (${getPath('gemini')})`,
      value: 'gemini',
      checked: defaultChecked
    });
  }

  if (detected.antigravity && detected.antigravity.installed) {
    choices.push({
      name: `✅ Google Antigravity (${getPath('antigravity')})`,
      value: 'antigravity',
      checked: defaultChecked
    });
  }

  if (detected.cursor && detected.cursor.installed) {
    choices.push({
      name: `✅ Cursor IDE (${getPath('cursor')})`,
      value: 'cursor',
      checked: defaultChecked
    });
  }

  if (detected.adal && detected.adal.installed) {
    choices.push({
      name: `✅ AdaL CLI (${getPath('adal')})`,
      value: 'adal',
      checked: defaultChecked
    });
  }

  if (choices.length === 0) {
    return [];
  }

  const answers = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'platforms',
      message,
      choices: choices,
      validate: (answer) => {
        if (answer.length < 1) {
          return 'Select at least one platform!';
        }
        return true;
      }
    }
  ]);

  return answers.platforms;
}

module.exports = { promptPlatforms, promptScope, promptAction, setupEscapeHandler, confirmCancel };
