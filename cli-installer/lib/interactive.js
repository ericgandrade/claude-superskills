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
    message: chalk.yellow('⚠️  Deseja cancelar a instalação?'),
    default: false
  }]);
  
  if (cancel) {
    console.log(chalk.red('\n❌ Instalação cancelada pelo usuário.\n'));
    process.exit(0);
  } else {
    console.log(chalk.dim('Continuando...\n'));
  }
}

/**
 * Pergunta ao usuário para quais plataformas instalar
 * @param {Object} detected - Ferramentas detectadas { copilot, claude, codex, opencode, gemini }
 * @returns {Promise<Array>} Plataformas escolhidas
 */
async function promptPlatforms(detected) {
  const choices = [];
  
  if (detected.copilot) {
    choices.push({
      name: '✅ GitHub Copilot CLI (.github/skills/)',
      value: 'copilot',
      checked: true
    });
  }
  
  if (detected.claude) {
    choices.push({
      name: '✅ Claude Code (.claude/skills/)',
      value: 'claude',
      checked: true
    });
  }
  
  if (detected.codex) {
    choices.push({
      name: '✅ OpenAI Codex (.codex/skills/)',
      value: 'codex',
      checked: true
    });
  }
  
  if (detected.opencode) {
    choices.push({
      name: '✅ OpenCode (.opencode/skills/)',
      value: 'opencode',
      checked: true
    });
  }
  
  if (detected.gemini) {
    choices.push({
      name: '✅ Gemini CLI (.gemini/skills/)',
      value: 'gemini',
      checked: true
    });
  }

  if (choices.length === 0) {
    return [];
  }

  const answers = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'platforms',
      message: 'Instalar skills para quais plataformas? (Pressione ESC para cancelar)',
      choices: choices,
      validate: (answer) => {
        if (answer.length < 1) {
          return 'Selecione ao menos uma plataforma!';
        }
        return true;
      }
    }
  ]);

  return answers.platforms;
}

module.exports = { promptPlatforms, setupEscapeHandler, confirmCancel };
