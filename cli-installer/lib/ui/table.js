const chalk = require('chalk');

function sanitizeCell(value) {
  return String(value ?? '')
    .replace(/\x1B\[[0-9;]*[A-Za-z]/g, '')
    .replace(/\r?\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Displays formatted table of detected tools
 * Codex CLI and Codex App shown separately
 * @param {Object} tools - Object returned by detectTools()
 */
function displayToolsTable(tools) {
  console.log('\n┌──────────────────────────────────────────────────────────────────┐');
  console.log('│ Tool                  │ Status   │ Version                   │');
  console.log('├──────────────────────────────────────────────────────────────────┤');
  
  const toolNames = {
    copilot: 'GitHub Copilot CLI',
    claude: 'Claude Code',
    cowork: 'Claude Cowork',
    codex_cli: 'OpenAI Codex CLI',
    codex_app: 'OpenAI Codex App',
    opencode: 'OpenCode',
    gemini: 'Gemini CLI',
    antigravity: 'Google Antigravity',
    cursor: 'Cursor IDE',
    adal: 'AdaL CLI'
  };
  
  for (const [key, name] of Object.entries(toolNames)) {
    const tool = tools[key];
    if (!tool) continue; // Skip if tool not in detected object
    
    const status = tool.installed ? chalk.green('✓') : chalk.red('✗');
    const version = tool.version || chalk.gray('-');
    
    // Format row with fixed spacing
    const namePadded = name.padEnd(21);
    const statusPadded = '  ' + status + '      ';
    const versionStr = sanitizeCell(version).substring(0, 26);
    const versionPadded = versionStr.padEnd(26);
    
    console.log(`│ ${namePadded} │${statusPadded}│ ${versionPadded}│`);
  }
  
  console.log('└──────────────────────────────────────────────────────────────────┘\n');
}

/**
 * Returns a simple summary of detected tools
 * @param {Object} tools - Object returned by detectTools()
 * @returns {Object} { total: number, installed: number, names: string[] }
 */
function getToolsSummary(tools) {
  const installed = [];

  if (tools.copilot && tools.copilot.installed) installed.push('copilot');
  if (tools.claude && tools.claude.installed) installed.push('claude');
  if (tools.cowork && tools.cowork.installed) installed.push('cowork');
  if (tools.codex_cli && tools.codex_cli.installed) installed.push('codex_cli');
  if (tools.codex_app && tools.codex_app.installed) installed.push('codex_app');
  if (tools.opencode && tools.opencode.installed) installed.push('opencode');
  if (tools.gemini && tools.gemini.installed) installed.push('gemini');
  if (tools.antigravity && tools.antigravity.installed) installed.push('antigravity');
  if (tools.cursor && tools.cursor.installed) installed.push('cursor');
  if (tools.adal && tools.adal.installed) installed.push('adal');

  return {
    total: 10,
    installed: installed.length,
    names: installed
  };
}

module.exports = { displayToolsTable, getToolsSummary };
