const axios = require('axios');
const AdmZip = require('adm-zip');
const fs = require('fs-extra');
const os = require('os');
const path = require('path');

const REPO_OWNER = 'ericgandrade';
const REPO_NAME = 'claude-superskills';
const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;

function getOutputDir() {
  return path.join(os.homedir(), '.claude-superskills', 'plugin-output');
}

function getGitHubHeaders() {
  return {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'claude-superskills-installer'
  };
}

function isPluginSourceAvailableLocally(pluginRoot) {
  return fs.existsSync(path.join(pluginRoot, '.claude-plugin', 'plugin.json')) &&
    fs.existsSync(path.join(pluginRoot, 'skills'));
}

function shouldIncludePath(relPath) {
  return relPath === 'README.md' ||
    relPath === 'CHANGELOG.md' ||
    relPath === 'LICENSE' ||
    relPath.startsWith('.claude-plugin/') ||
    relPath.startsWith('skills/') ||
    relPath.startsWith('mcp-servers/');
}

async function addLocalTree(zip, rootDir, currentDir) {
  const entries = await fs.readdir(currentDir);
  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry);
    const relPath = path.relative(rootDir, fullPath).replace(/\\/g, '/');
    const stat = await fs.stat(fullPath);

    if (stat.isDirectory()) {
      await addLocalTree(zip, rootDir, fullPath);
      continue;
    }

    if (!shouldIncludePath(relPath)) continue;
    zip.addLocalFile(fullPath, path.dirname(relPath), path.basename(relPath));
  }
}

async function buildZipFromLocalSource(pluginRoot, zipPath) {
  const zip = new AdmZip();
  await addLocalTree(zip, pluginRoot, pluginRoot);
  zip.writeZip(zipPath);
}

async function buildZipFromGitHubRelease(version, zipPath) {
  const url = `https://github.com/${REPO_OWNER}/${REPO_NAME}/archive/refs/tags/v${version}.zip`;
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
    headers: getGitHubHeaders(),
    maxRedirects: 5,
    timeout: 30000
  });

  const sourceZip = new AdmZip(Buffer.from(response.data));
  const outputZip = new AdmZip();
  const prefix = `${REPO_NAME}-${version}/`;

  for (const entry of sourceZip.getEntries()) {
    if (entry.isDirectory) continue;
    if (!entry.entryName.startsWith(prefix)) continue;

    const relPath = entry.entryName.slice(prefix.length);
    if (!shouldIncludePath(relPath)) continue;

    outputZip.addFile(relPath, entry.getData());
  }

  outputZip.writeZip(zipPath);
}

async function packageCoworkPlugin({ version, quiet = false, pluginRoot }) {
  const outputDir = getOutputDir();
  const zipName = `claude-superskills-v${version}.zip`;
  const zipPath = path.join(outputDir, zipName);

  await fs.ensureDir(outputDir);

  for (const file of await fs.readdir(outputDir)) {
    if (/^claude-superskills-v.*\.zip$/.test(file)) {
      await fs.remove(path.join(outputDir, file));
    }
  }

  if (!quiet) {
    console.log(`📦 Packaging Cowork plugin v${version}...`);
  }

  if (isPluginSourceAvailableLocally(pluginRoot)) {
    await buildZipFromLocalSource(pluginRoot, zipPath);
  } else {
    await buildZipFromGitHubRelease(version, zipPath);
  }

  const stat = await fs.stat(zipPath);
  if (stat.size > MAX_UPLOAD_BYTES) {
    throw new Error(`Cowork plugin zip exceeds 50 MB upload limit: ${zipPath}`);
  }

  return {
    zipName,
    zipPath,
    sizeBytes: stat.size
  };
}

function formatSize(sizeBytes) {
  return `${(sizeBytes / 1048576).toFixed(1)} MB`;
}

function printCoworkInstructions({ zipPath, sizeBytes }, version) {
  console.log('\n📦 Claude Cowork package ready\n');
  console.log(`  Version: ${version}`);
  console.log(`  Package: ${zipPath}`);
  console.log(`  Size:    ${formatSize(sizeBytes)}`);
  console.log('');
  console.log('Next steps in Claude Desktop / Cowork:');
  console.log('  1. Open Claude Desktop and switch to the Cowork tab');
  console.log('  2. Open Customize');
  console.log('  3. Open your installed plugins list or browse plugins');
  console.log('  4. Find the existing claude-superskills plugin');
  console.log('  5. Remove or uninstall the previous version first');
  console.log('  6. Upload the new zip file shown above');
  console.log('  7. Confirm the new version appears in Cowork');
  console.log('');
  console.log('Important: generating the zip does not update Cowork automatically.');
  console.log('You must remove the old plugin and upload the new package manually.\n');
}

module.exports = {
  packageCoworkPlugin,
  printCoworkInstructions,
  getOutputDir
};
