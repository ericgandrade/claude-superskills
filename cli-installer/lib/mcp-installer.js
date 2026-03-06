const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const chalk = require('chalk');

/**
 * MCP server definitions bundled with claude-superskills.
 * Each entry describes how to register the server in a platform's MCP config file.
 */
const MCP_SERVERS = {
  cloudconvert: {
    description: 'CloudConvert — convert 200+ formats, PDF ops (OCR, merge, split), upload/download',
    serverScript: 'mcp-servers/cloudconvert/server.py',
    // NOTE: ${...} syntax is used for env var references.
    // All platforms inherit the actual value from the shell environment at runtime.
    // The user only needs to set CLOUDCONVERT_API_KEY once in their shell profile.
    envVars: {
      CLOUDCONVERT_API_KEY: '${CLOUDCONVERT_API_KEY}',
      CLOUDCONVERT_SANDBOX: '${CLOUDCONVERT_SANDBOX:-false}'
    }
  }
};

/**
 * Platform-specific MCP config file paths (absolute, in user home).
 *
 * Claude Code (non-plugin install): uses ~/.claude.json with a nested structure.
 *   writeMcpConfig handles this separately via writeClaudeCodeMcpConfig().
 *
 * All other platforms: standard { mcpServers: { ... } } JSON file.
 */
function getMcpConfigPath(platform) {
  const home = os.homedir();
  const configPaths = {
    copilot:     path.join(home, '.github', 'mcp.json'),
    gemini:      path.join(home, '.gemini', 'mcp_config.json'),
    opencode:    path.join(home, '.agent', 'mcp.json'),
    codex:       path.join(home, '.codex', 'mcp.json'),
    cursor:      path.join(home, '.cursor', 'mcp.json'),
    antigravity: path.join(home, '.gemini', 'antigravity', 'mcp.json'),
    adal:        path.join(home, '.adal', 'mcp.json')
  };
  return configPaths[platform] || null;
}

/**
 * Build the MCP server entry object for a given server and plugin root path.
 */
function buildServerEntry(serverName, pluginRoot) {
  const def = MCP_SERVERS[serverName];
  const scriptPath = path.join(pluginRoot, def.serverScript);
  return {
    command: 'python',
    args: [scriptPath],
    env: { ...def.envVars }
  };
}

/**
 * Write MCP servers into Claude Code's ~/.claude.json under
 * projects[homedir].mcpServers — the standard non-plugin registration path.
 *
 * This handles Claude Code users who installed via `npx claude-superskills`
 * instead of via the native plugin system. Both registrations coexist safely:
 * if the plugin is also installed, Claude Code deduplicates tool names.
 */
async function writeClaudeCodeMcpConfig(pluginRoot, quiet = false) {
  const claudeConfigPath = path.join(os.homedir(), '.claude.json');

  try {
    let config = {};
    if (await fs.pathExists(claudeConfigPath)) {
      try {
        const raw = await fs.readFile(claudeConfigPath, 'utf-8');
        config = JSON.parse(raw);
      } catch {
        await fs.copy(claudeConfigPath, `${claudeConfigPath}.backup`);
        config = {};
      }
    }

    // Claude Code stores per-project MCP servers under projects[projectPath].mcpServers.
    // Writing under the home directory makes the server available in all sessions.
    const home = os.homedir();
    if (!config.projects) config.projects = {};
    if (!config.projects[home]) config.projects[home] = {};
    if (!config.projects[home].mcpServers) config.projects[home].mcpServers = {};

    let changed = false;
    for (const [serverName] of Object.entries(MCP_SERVERS)) {
      const entry = buildServerEntry(serverName, pluginRoot);
      const existing = JSON.stringify(config.projects[home].mcpServers[serverName]);
      const incoming = JSON.stringify(entry);
      if (existing !== incoming) {
        config.projects[home].mcpServers[serverName] = entry;
        changed = true;
      }
    }

    if (!changed) {
      if (!quiet) console.log(chalk.dim('  ℹ️  Claude Code MCP config already up-to-date'));
      return { success: true, skipped: true };
    }

    await fs.writeFile(claudeConfigPath, JSON.stringify(config, null, 2) + '\n', 'utf-8');

    if (!quiet) {
      console.log(chalk.green(`  ✓ Claude Code MCP config written: ${claudeConfigPath}`));
    }
    return { success: true };

  } catch (err) {
    if (!quiet) {
      console.log(chalk.yellow(`  ⚠️  Could not write Claude Code MCP config: ${err.message}`));
    }
    return { success: false, error: err.message };
  }
}

/**
 * Write (or merge) MCP server entries into a platform's standard config file.
 * Merges with existing config — never overwrites entries from other tools.
 */
async function writeMcpConfig(platform, pluginRoot, quiet = false) {
  // Claude Code has a special config format — handled separately
  if (platform === 'claude') {
    return writeClaudeCodeMcpConfig(pluginRoot, quiet);
  }

  const configPath = getMcpConfigPath(platform);
  if (!configPath) return { success: true, skipped: true };

  try {
    await fs.ensureDir(path.dirname(configPath));

    let config = {};
    if (await fs.pathExists(configPath)) {
      try {
        const raw = await fs.readFile(configPath, 'utf-8');
        config = JSON.parse(raw);
      } catch {
        await fs.copy(configPath, `${configPath}.backup`);
        config = {};
      }
    }

    if (!config.mcpServers) config.mcpServers = {};

    let changed = false;
    for (const [serverName] of Object.entries(MCP_SERVERS)) {
      const entry = buildServerEntry(serverName, pluginRoot);
      const existing = JSON.stringify(config.mcpServers[serverName]);
      const incoming = JSON.stringify(entry);
      if (existing !== incoming) {
        config.mcpServers[serverName] = entry;
        changed = true;
      }
    }

    if (!changed) {
      if (!quiet) console.log(chalk.dim(`  ℹ️  MCP config already up-to-date for ${platform}`));
      return { success: true, skipped: true };
    }

    await fs.writeFile(configPath, JSON.stringify(config, null, 2) + '\n', 'utf-8');

    if (!quiet) {
      console.log(chalk.green(`  ✓ MCP config written: ${configPath}`));
    }
    return { success: true };

  } catch (err) {
    if (!quiet) {
      console.log(chalk.yellow(`  ⚠️  Could not write MCP config for ${platform}: ${err.message}`));
    }
    return { success: false, error: err.message };
  }
}

/**
 * Register MCP servers for all detected platforms (including Claude Code).
 * Called after skills are installed. Claude Code is handled via ~/.claude.json,
 * not only via plugin.json, so npx users also get MCP registered.
 *
 * @param {string[]} platforms  - List of platform identifiers
 * @param {string}   pluginRoot - Absolute path to claude-superskills installation
 * @param {boolean}  quiet      - Suppress output
 */
async function registerMcpServers(platforms, pluginRoot, quiet = false) {
  if (!quiet) {
    console.log(chalk.cyan('\n  Registering CloudConvert MCP server...'));
  }

  // All 8 platforms — claude included (uses ~/.claude.json, not plugin.json)
  const results = await Promise.all(
    platforms.map(p => writeMcpConfig(p, pluginRoot, quiet))
  );

  const succeeded = results.filter(r => r.success && !r.skipped).length;
  if (!quiet && succeeded > 0) {
    console.log(chalk.green(`  ✓ MCP server registered for ${succeeded} platform(s)`));
    console.log(chalk.yellow('\n  ⚠️  Action required: set your CloudConvert API key once in your shell:'));
    console.log(chalk.white('     export CLOUDCONVERT_API_KEY="your-key"'));
    console.log(chalk.dim('     Add to ~/.zshrc or ~/.bashrc to persist across sessions.'));
    console.log(chalk.dim('     This single setting works for ALL 8 platforms automatically.'));
    console.log(chalk.dim('     Free tier: 10 conversion minutes/day. Use CLOUDCONVERT_SANDBOX=true for testing.'));
    console.log(chalk.dim('     Get your key: https://cloudconvert.com/dashboard/api/v2/keys'));
  }

  return results;
}

module.exports = { writeMcpConfig, registerMcpServers, getMcpConfigPath, MCP_SERVERS };
