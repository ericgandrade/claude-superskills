const fs = require('fs-extra');
const path = require('path');
const os = require('os');

function installCopilotSkills(repoPath) {
  const skillsSource = path.join(repoPath, '.github', 'skills');
  const skillsTarget = path.join(os.homedir(), '.github', 'skills');
  
  console.log('🔧 Installing GitHub Copilot CLI skills...');
  
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

module.exports = { installCopilotSkills };
