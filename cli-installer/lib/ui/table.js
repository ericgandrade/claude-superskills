const chalk = require('chalk');

/**
 * Exibe tabela formatada de ferramentas detectadas
 * @param {Object} tools - Objeto retornado por detectTools()
 */
function displayToolsTable(tools) {
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│ Ferramenta            │ Status   │ Versão              │');
  console.log('├─────────────────────────────────────────────────────────────┤');
  
  const toolNames = {
    copilot: 'GitHub Copilot CLI',
    claude: 'Claude Code',
    codex: 'OpenAI Codex',
    opencode: 'OpenCode',
    gemini: 'Gemini CLI'
  };
  
  for (const [key, name] of Object.entries(toolNames)) {
    const tool = tools[key];
    const status = tool.installed ? chalk.green('✓') : chalk.red('✗');
    const version = tool.version || chalk.gray('-');
    
    // Formatar linha com espaçamento fixo
    const namePadded = name.padEnd(21);
    const statusPadded = '  ' + status + '      ';
    const versionStr = String(version).substring(0, 20);
    const versionPadded = versionStr.padEnd(20);
    
    console.log(`│ ${namePadded} │${statusPadded}│ ${versionPadded}│`);
  }
  
  console.log('└─────────────────────────────────────────────────────────────┘\n');
}

/**
 * Retorna resumo de ferramentas detectadas (simples)
 * @param {Object} tools - Objeto retornado por detectTools()
 * @returns {Object} { total: number, installed: number, names: string[] }
 */
function getToolsSummary(tools) {
  const installed = [];
  
  if (tools.copilot && tools.copilot.installed) installed.push('copilot');
  if (tools.claude && tools.claude.installed) installed.push('claude');
  if (tools.codex && tools.codex.installed) installed.push('codex');
  if (tools.opencode && tools.opencode.installed) installed.push('opencode');
  if (tools.gemini && tools.gemini.installed) installed.push('gemini');
  
  return {
    total: 5,
    installed: installed.length,
    names: installed
  };
}

module.exports = { displayToolsTable, getToolsSummary };
