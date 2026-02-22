const fs = require('fs-extra');
const path = require('path');
const semver = require('semver');
const yaml = require('js-yaml');
const { getUserSkillsPath } = require('./path-resolver');

function readSkillVersion(skillDir) {
  try {
    const skillMdPath = path.join(skillDir, 'SKILL.md');
    if (!fs.existsSync(skillMdPath)) return null;

    const content = fs.readFileSync(skillMdPath, 'utf8');
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return null;

    const metadata = yaml.load(match[1]);
    return metadata?.version || null;
  } catch (_err) {
    return null;
  }
}

function listSkillDirs(rootDir) {
  if (!rootDir || !fs.existsSync(rootDir)) return [];
  return fs.readdirSync(rootDir)
    .map((entry) => path.join(rootDir, entry))
    .filter((entryPath) => {
      try {
        return fs.statSync(entryPath).isDirectory();
      } catch (_err) {
        return false;
      }
    });
}

function getCachedSkillInventory(cacheDir) {
  const inventory = new Map();
  for (const skillDir of listSkillDirs(cacheDir)) {
    const name = path.basename(skillDir);
    const version = readSkillVersion(skillDir);
    inventory.set(name, { name, version });
  }
  return inventory;
}

function getInstalledSkillInventory(platform) {
  const skillsRoot = getUserSkillsPath(platform);
  const inventory = new Map();
  for (const skillDir of listSkillDirs(skillsRoot)) {
    const name = path.basename(skillDir);
    if (!fs.existsSync(path.join(skillDir, 'SKILL.md'))) continue;
    inventory.set(name, { name, version: readSkillVersion(skillDir) });
  }
  return inventory;
}

function compareVersions(installedVersion, latestVersion) {
  if (!installedVersion || !latestVersion) return 'unknown';
  if (!semver.valid(installedVersion) || !semver.valid(latestVersion)) return 'unknown';
  if (semver.lt(installedVersion, latestVersion)) return 'outdated';
  if (semver.eq(installedVersion, latestVersion)) return 'up_to_date';
  return 'newer';
}

function buildPlatformSkillDiff(platform, cacheInventory) {
  const installedInventory = getInstalledSkillInventory(platform);
  const diff = {
    platform,
    missing: [],
    outdated: [],
    upToDate: [],
    unknown: [],
    newer: []
  };

  for (const [skillName, latest] of cacheInventory.entries()) {
    const installed = installedInventory.get(skillName);
    if (!installed) {
      diff.missing.push({
        skill: skillName,
        installedVersion: null,
        latestVersion: latest.version || 'unknown'
      });
      continue;
    }

    const status = compareVersions(installed.version, latest.version);
    const item = {
      skill: skillName,
      installedVersion: installed.version || 'unknown',
      latestVersion: latest.version || 'unknown'
    };

    if (status === 'outdated') diff.outdated.push(item);
    else if (status === 'up_to_date') diff.upToDate.push(item);
    else if (status === 'newer') diff.newer.push(item);
    else diff.unknown.push(item);
  }

  diff.missing.sort((a, b) => a.skill.localeCompare(b.skill));
  diff.outdated.sort((a, b) => a.skill.localeCompare(b.skill));
  diff.upToDate.sort((a, b) => a.skill.localeCompare(b.skill));
  diff.newer.sort((a, b) => a.skill.localeCompare(b.skill));
  diff.unknown.sort((a, b) => a.skill.localeCompare(b.skill));

  return diff;
}

function hasChanges(diff) {
  return diff.missing.length > 0 || diff.outdated.length > 0;
}

function getRecommendedSkills(diff) {
  const set = new Set();
  for (const entry of diff.missing) set.add(entry.skill);
  for (const entry of diff.outdated) set.add(entry.skill);
  return Array.from(set).sort();
}

module.exports = {
  getCachedSkillInventory,
  getInstalledSkillInventory,
  buildPlatformSkillDiff,
  hasChanges,
  getRecommendedSkills
};
