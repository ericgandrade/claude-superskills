const fs = require('fs-extra');
const chalk = require('chalk');

/**
 * Track of partial installations for cleanup on cancellation
 */
const partialInstalls = [];

/**
 * Register a path as partially installed
 * @param {string} installPath - Path to the installed skill
 */
function registerPartialInstall(installPath) {
  if (!partialInstalls.includes(installPath)) {
    partialInstalls.push(installPath);
  }
}

/**
 * Clear the partial installs registry
 */
function clearPartialInstalls() {
  partialInstalls.length = 0;
}

/**
 * Reverte instalações parciais em caso de cancelamento
 * @returns {Promise<void>}
 */
async function revertPartialInstalls() {
  if (partialInstalls.length === 0) return;
  
  console.log(chalk.cyan('\n🧹 Limpando instalações parciais...\n'));
  
  let removed = 0;
  let failed = 0;
  
  for (const installPath of partialInstalls) {
    try {
      if (await fs.pathExists(installPath)) {
        // Check if it's a symlink
        const stats = await fs.lstat(installPath);
        
        if (stats.isSymbolicLink()) {
          await fs.unlink(installPath);
        } else {
          await fs.remove(installPath);
        }
        
        console.log(chalk.green(`  ✓ Removido: ${installPath}`));
        removed++;
      }
    } catch (err) {
      console.log(chalk.red(`  ✗ Erro ao remover ${installPath}: ${err.message}`));
      failed++;
    }
  }
  
  if (removed > 0) {
    console.log(chalk.green(`\n✅ Cleanup concluído (${removed} removidos).\n`));
  }
  
  if (failed > 0) {
    console.log(chalk.yellow(`⚠️  ${failed} itens falharam ao remover.\n`));
  }
  
  clearPartialInstalls();
}

/**
 * Setup cleanup handler for process termination
 */
function setupCleanupHandler() {
  // Handle Ctrl+C
  process.on('SIGINT', async () => {
    await revertPartialInstalls();
    process.exit(0);
  });
  
  // Handle termination
  process.on('SIGTERM', async () => {
    await revertPartialInstalls();
    process.exit(0);
  });
}

module.exports = {
  registerPartialInstall,
  clearPartialInstalls,
  revertPartialInstalls,
  setupCleanupHandler
};
