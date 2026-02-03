#!/usr/bin/env node

const { detectTools, getInstallInstructions } = require('../lib/detector');
const { promptPlatforms } = require('../lib/interactive');
const { installCopilotSkills } = require('../lib/copilot');
const { installClaudeSkills } = require('../lib/claude');
const { install: installCodexSkills } = require('../lib/codex');
const path = require('path');

async function main() {
  console.log('\n🚀 cli-ai-skills v1.4.0 - Tri-Platform Installer\n');
  console.log('🔍 Detectando ferramentas AI CLI instaladas...\n');
  
  const detected = detectTools();
  const hasAny = detected.copilot || detected.claude || detected.codex;
  
  if (!hasAny) {
    console.log(getInstallInstructions());
    process.exit(1);
  }
  
  // Mostrar ferramentas detectadas
  console.log('Ferramentas detectadas:');
  if (detected.copilot) console.log('  ✅ GitHub Copilot CLI');
  if (detected.claude) console.log('  ✅ Claude Code');
  if (detected.codex) console.log('  ✅ OpenAI Codex');
  console.log('');
  
  // Perguntar quais plataformas instalar
  const platforms = await promptPlatforms(detected);
  
  if (platforms.length === 0) {
    console.log('\n❌ Instalação cancelada.\n');
    process.exit(0);
  }
  
  console.log(`\n📦 Instalando skills para: ${platforms.join(', ')}\n`);
  
  // Detectar repo path (2 níveis acima de bin/)
  const repoPath = path.resolve(__dirname, '../..');
  console.log(`📂 Repositório: ${repoPath}\n`);
  
  // Instalar para plataformas selecionadas
  if (platforms.includes('copilot')) {
    installCopilotSkills(repoPath);
  }
  
  if (platforms.includes('claude')) {
    installClaudeSkills(repoPath);
  }
  
  if (platforms.includes('codex')) {
    installCodexSkills(repoPath);
  }
  
  console.log('\n✅ Instalação concluída!\n');
  console.log('📚 Para usar os skills:');
  if (platforms.includes('copilot')) console.log('   gh copilot');
  if (platforms.includes('claude')) console.log('   claude');
  if (platforms.includes('codex')) console.log('   codex (invoque com @skill-name)');
  console.log('');
}

main().catch(error => {
  console.error('\n❌ Erro durante instalação:', error.message);
  process.exit(1);
});
