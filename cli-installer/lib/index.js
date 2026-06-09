'use strict';

module.exports = {
  detector: require('./detector'),
  interactive: require('./interactive'),
  cleanup: require('./cleanup'),
  copilot: require('./copilot'),
  claude: require('./claude'),
  codex: require('./codex'),
  opencode: require('./opencode'),
  gemini: require('./gemini'),
  antigravity: require('./antigravity'),
  cursor: require('./cursor'),
  adal: require('./adal'),
  bundles: require('./bundles'),
  search: require('./search'),
  cowork: require('./cowork'),
  mcpInstaller: require('./mcp-installer'),
  downloader: require('./core/downloader'),
  pathResolver: require('./utils/path-resolver'),
  skillDiff: require('./utils/skill-diff'),
  skillVersions: require('./utils/skill-versions')
};
