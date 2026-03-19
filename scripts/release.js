const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Automation script to synchronize all version mentions across the repository.
 * Usage: node scripts/release.js [patch|minor|major|X.Y.Z]
 */

const targetVersionArg = process.argv[2];
if (!targetVersionArg) {
    console.error("Usage: node scripts/release.js [patch|minor|major|X.Y.Z]");
    process.exit(1);
}

const rootDir = path.join(__dirname, '..');
const pkgPath = path.join(rootDir, 'cli-installer', 'package.json');
const pluginPath = path.join(rootDir, '.claude-plugin', 'plugin.json');
const readmePath = path.join(rootDir, 'README.md');
const claudeMdPath = path.join(rootDir, 'CLAUDE.md');
const changelogPath = path.join(rootDir, 'CHANGELOG.md');

// 1. Get current version and target version
const oldVersion = JSON.parse(fs.readFileSync(pkgPath, 'utf8')).version;
let newVersion = targetVersionArg;

if (['patch', 'minor', 'major'].includes(targetVersionArg)) {
    const parts = oldVersion.split('.').map(n => parseInt(n));
    if (targetVersionArg === 'patch') parts[2]++;
    if (targetVersionArg === 'minor') { parts[1]++; parts[2] = 0; }
    if (targetVersionArg === 'major') { parts[0]++; parts[1] = 0; parts[2] = 0; }
    newVersion = parts.join('.');
}

console.log(`🚀 Preparing release: v${oldVersion} -> v${newVersion}`);

// 2. Update cli-installer/package.json (and lock)
console.log(`- Updating cli-installer/package.json...`);
try {
    execSync(`npm version ${newVersion} --no-git-tag-version`, { cwd: path.join(rootDir, 'cli-installer') });
} catch (e) {
    console.error(`Failed to update package.json: ${e.message}`);
    process.exit(1);
}

// 3. Update .claude-plugin/plugin.json
console.log(`- Updating .claude-plugin/plugin.json...`);
let pluginJson = JSON.parse(fs.readFileSync(pluginPath, 'utf8'));
pluginJson.version = newVersion;
fs.writeFileSync(pluginPath, JSON.stringify(pluginJson, null, 2) + '\n');

// 4. Update README.md
console.log(`- Updating README.md...`);
let readme = fs.readFileSync(readmePath, 'utf8');
// Header title
readme = readme.replace(new RegExp(`# 🤖 Claude Superskills v${oldVersion.replace(/\./g, '\.')}`, 'g'), `# 🤖 Claude Superskills v${newVersion}`);
// Badge
readme = readme.replace(new RegExp(`badge/version-${oldVersion.replace(/\./g, '\.')}-blue\.svg`, 'g'), `badge/version-${newVersion}-blue.svg`);
// Footer
const monthYear = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date());
readme = readme.replace(new RegExp(`\\*Version ${oldVersion.replace(/\./g, '\\.')} \\| [^*]+\\*`, 'g'), `*Version ${newVersion} | ${monthYear}*`);
fs.writeFileSync(readmePath, readme);

// 5. Update CLAUDE.md
console.log(`- Updating CLAUDE.md...`);
let claudeMd = fs.readFileSync(claudeMdPath, 'utf8');
claudeMd = claudeMd.replace(new RegExp(`v${oldVersion.replace(/\./g, '\.')}`, 'g'), `v${newVersion}`);
fs.writeFileSync(claudeMdPath, claudeMd);

// 6. Update CHANGELOG.md (Header)
console.log(`- Checking CHANGELOG.md...`);
let changelog = fs.readFileSync(changelogPath, 'utf8');
if (!changelog.includes(`## [${newVersion}]`)) {
    const today = new Date().toISOString().split('T')[0];
    const header = `---

## [${newVersion}] - ${today}

### Added
- New features...

`;
    changelog = changelog.replace('---', header);
    fs.writeFileSync(changelogPath, changelog);
    console.log(`  ⚠️ Added placeholder entry to CHANGELOG.md. Please edit it!`);
}

// 7. Regenerate indexes
console.log(`- Regenerating catalogs and indexes...`);
try {
    execSync(`npm run generate-all --prefix cli-installer`, { cwd: rootDir });
} catch (e) {
    console.warn(`  ⚠️ Failed to regenerate indexes: ${e.message}`);
}

console.log(`
✅ All files synchronized to v${newVersion}!`);
console.log(`
Next steps:`);
console.log(`1. Review the changes (especially CHANGELOG.md)`);
console.log(`2. git add . && git commit -m "chore: release v${newVersion}"`);
console.log(`3. git tag v${newVersion}`);
console.log(`4. git push origin main && git push origin v${newVersion}`);
