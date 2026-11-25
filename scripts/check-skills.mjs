#!/usr/bin/env node
// Checks every skill and the metadata that counts them. Exit 1 on any problem.
// - SKILL.md frontmatter parses with js-yaml (the parser Claude Code uses) and holds exactly
//   name, description and license; name equals the folder; README.md exists.
// - bundles.json: every listed skill exists; "all" equals the set of skill folders.
// - README.md badge, plugin.json and marketplace.json state the same skill count.
// Needs: cd cli-installer && npm ci (for js-yaml).
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(join(root, 'cli-installer', 'package.json'));
const yaml = require('js-yaml');
const errors = [];

const folders = readdirSync(join(root, 'skills')).filter((n) => statSync(join(root, 'skills', n)).isDirectory()).sort();
for (const name of folders) {
  const dir = join(root, 'skills', name);
  const skill = join(dir, 'SKILL.md');
  if (!existsSync(skill)) { errors.push(`${name}: SKILL.md missing`); continue; }
  if (!existsSync(join(dir, 'README.md'))) errors.push(`${name}: README.md missing`);
  const m = /^---\n([\s\S]*?)\n---/.exec(readFileSync(skill, 'utf8'));
  if (!m) { errors.push(`${name}: no frontmatter`); continue; }
  let fm;
  try { fm = yaml.load(m[1]); } catch (e) { errors.push(`${name}: YAML ${e.message.split('\n')[0]}`); continue; }
  const extra = Object.keys(fm || {}).filter((k) => !['name', 'description', 'license'].includes(k));
  if (extra.length) errors.push(`${name}: extra frontmatter fields ${extra.join(', ')}`);
  if (fm?.name !== name) errors.push(`${name}: frontmatter name "${fm?.name}" differs from the folder`);
  if (typeof fm?.description !== 'string' || !fm.description.trim()) errors.push(`${name}: description missing`);
  else if (fm.description.length > 1024) errors.push(`${name}: description longer than 1024 characters`);
  if (!fm?.license) errors.push(`${name}: license missing`);
}

const bundles = JSON.parse(readFileSync(join(root, 'bundles.json'), 'utf8')).bundles;
for (const [key, b] of Object.entries(bundles)) {
  for (const s of b.skills) if (!folders.includes(s)) errors.push(`bundles.json ${key}: unknown skill ${s}`);
}
const all = [...(bundles.all?.skills || [])].sort();
if (JSON.stringify(all) !== JSON.stringify(folders)) errors.push(`bundles.json all (${all.length}) differs from the skill folders (${folders.length})`);

const n = folders.length;
const readme = readFileSync(join(root, 'README.md'), 'utf8');
if (!readme.includes(`badge/skills-${n}-`)) errors.push(`README.md skills badge does not say ${n}`);
for (const f of ['.claude-plugin/plugin.json', '.claude-plugin/marketplace.json']) {
  if (!readFileSync(join(root, f), 'utf8').includes(`${n} AI skills`)) errors.push(`${f} description does not say "${n} AI skills"`);
}

if (errors.length) {
  console.error(errors.map((e) => `✘ ${e}`).join('\n'));
  console.error(`\n${errors.length} problem(s) in ${n} skills`);
  process.exit(1);
}
console.log(`✔ ${n} skills: frontmatter, bundles and counts are consistent`);
