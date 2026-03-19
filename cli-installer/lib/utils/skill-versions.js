const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Extract version from SKILL.md frontmatter
 * @param {string} skillName - Name of the skill
 * @param {string} basePath - Base path where skills are located
 * @returns {string} Version string or 'unknown'
 */
function getSkillVersion(skillName, basePath) {
  try {
    const skillDirs = [
      path.join(basePath, 'skills', skillName),
      path.join(basePath, '.github', 'skills', skillName),
      path.join(basePath, '.claude', 'skills', skillName),
      path.join(basePath, 'skills', 'copilot', skillName),
      path.join(basePath, 'skills', 'claude', skillName)
    ];

    for (const skillDir of skillDirs) {
      // 1. Try SKILL.md frontmatter (legacy — version field no longer used)
      const skillMdPath = path.join(skillDir, 'SKILL.md');
      if (fs.existsSync(skillMdPath)) {
        const content = fs.readFileSync(skillMdPath, 'utf8');
        const match = content.match(/^---\n([\s\S]*?)\n---/);
        if (match) {
          const frontmatter = yaml.load(match[1]);
          if (frontmatter && frontmatter.version) return String(frontmatter.version);
        }

        // 2. Fallback: read from README.md Metadata table (| Version | X.Y.Z |)
        const readmePath = path.join(skillDir, 'README.md');
        if (fs.existsSync(readmePath)) {
          const readme = fs.readFileSync(readmePath, 'utf8');
          const versionMatch = readme.match(/\|\s*Version\s*\|\s*([\d]+\.[\d]+\.[\d]+)/i);
          if (versionMatch) return versionMatch[1];
        }
      }
    }

    return 'unknown';
  } catch (err) {
    console.error(`Error reading version for ${skillName}:`, err.message);
    return 'unknown';
  }
}

/**
 * Get versions for all available skills
 * @param {string[]} skillNames - Array of skill names
 * @param {string} basePath - Base path where skills are located
 * @returns {Object} Object with skillName: version pairs
 */
function getAllSkillVersions(skillNames, basePath) {
  const versions = {};
  for (const skillName of skillNames) {
    versions[skillName] = getSkillVersion(skillName, basePath);
  }
  return versions;
}

module.exports = {
  getSkillVersion,
  getAllSkillVersions
};
