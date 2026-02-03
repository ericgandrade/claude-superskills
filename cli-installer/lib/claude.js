const fs = require('fs-extra');
const path = require('path');
const os = require('os');

function installClaudeSkills(repoPath) {
  const skillsSource = path.join(repoPath, '.claude', 'skills');
  const skillsTarget = path.join(os.homedir(), '.claude', 'skills');
  
  console.log('🔧 Installing Claude Code skills...');
  
  fs.ensureDirSync(skillsTarget);
  
  const skills = fs.readdirSync(skillsSource).filter(f => 
    fs.statSync(path.join(skillsSource, f)).isDirectory()
  );
  
  skills.forEach(skill => {
    const source = path.join(skillsSource, skill);
    const target = path.join(skillsTarget, skill);
    
    if (fs.existsSync(target)) {
      fs.removeSync(target);
    }
    
    fs.symlinkSync(source, target, 'dir');
    console.log(`  ✅ ${skill}`);
  });
}

module.exports = { installClaudeSkills };
