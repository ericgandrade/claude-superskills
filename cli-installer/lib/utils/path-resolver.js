const fs = require('fs');
const path = require('path');
const os = require('os');

const CACHE_BASE = path.join(os.homedir(), '.claude-superskills', 'cache');

/**
 * Get the cached skills path for a given version.
 * Skills are downloaded from GitHub and stored at:
 *   ~/.claude-superskills/cache/{version}/skills/
 * @param {string} version - Package version, e.g. "1.10.3"
 * @returns {string} Path to the skills directory in cache
 */
function getCachedSkillsPath(version) {
  return path.join(CACHE_BASE, version, 'skills');
}

/**
 * Returns all Codex-related skill paths for cleanup purposes (uninstall).
 * Codex CLI and App both write to ~/.codex/skills/ now, but ~/.agents/skills/
 * may still exist from previous installs — include it so uninstall cleans it too.
 * @returns {string[]}
 */
function getCodexSkillPaths() {
  const home = os.homedir();
  return [
    path.join(home, '.codex', 'skills'),
    path.join(home, '.agents', 'skills')
  ];
}

/**
 * Get user home directory skills path for a platform.
 * @param {string} platform - Platform name
 * @returns {string} Path to user's skills directory
 */
function getUserSkillsPath(platform) {
  const home = os.homedir();

  const platformDirs = {
    'codex':       path.join(home, '.codex', 'skills'),
    'copilot':     path.join(home, '.github', 'skills'),
    'claude':      path.join(home, '.claude', 'skills'),
    'opencode':    path.join(home, '.agent', 'skills'),
    'gemini':      path.join(home, '.gemini', 'skills'),
    'antigravity': path.join(home, '.gemini', 'antigravity', 'skills'),
    'cursor':      path.join(home, '.cursor', 'skills'),
    'adal':        path.join(home, '.adal', 'skills')
  };

  return platformDirs[platform] || path.join(home, `.${platform}`, 'skills');
}

/**
 * Validate that a skill name is safe to use as a directory component.
 * Allows only lowercase alphanumeric, hyphens, and underscores.
 * Rejects path-traversal patterns (e.g. "..", "/", "\").
 * @param {string} name - Skill directory name
 * @returns {boolean}
 */
function isValidSkillName(name) {
  return typeof name === 'string' &&
    name.length > 0 &&
    name.length <= 100 &&
    /^[a-z0-9_-]+$/.test(name);
}

/**
 * Assert that resolvedPath stays within baseDir.
 * Throws if a path-traversal escape is detected.
 * @param {string} resolvedPath - path.resolve()'d target path
 * @param {string} baseDir - path.resolve()'d base directory
 */
function assertSafePath(resolvedPath, baseDir) {
  const base = baseDir.endsWith(path.sep) ? baseDir : baseDir + path.sep;
  if (!resolvedPath.startsWith(base) && resolvedPath !== baseDir) {
    throw new Error(`Path traversal detected: ${resolvedPath} is outside ${baseDir}`);
  }
}

module.exports = {
  getCachedSkillsPath,
  getUserSkillsPath,
  getCodexSkillPaths,
  isValidSkillName,
  assertSafePath
};
