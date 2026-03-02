#!/usr/bin/env python3
"""Generate skills_index.json from all skills, reading metadata from README.md and SKILL.md."""

import os
import json
import yaml
import re
from datetime import datetime
from pathlib import Path

print("🔍 Scanning skills...")

skills_dir = Path(__file__).parent.parent / 'skills'
skills = []

def extract_from_readme(readme_path):
    """Extract metadata from the README.md table."""
    metadata = {}
    if not readme_path.exists():
        return metadata
    
    with open(readme_path, 'r') as f:
        content = f.read()
    
    for line in content.split('\n'):
        if '|' in line:
            parts = [p.strip() for p in line.split('|') if p.strip()]
            if len(parts) >= 2:
                field = parts[0].lower()
                value = parts[1]
                if field == 'version': metadata['version'] = value
                elif field == 'author': metadata['author'] = value
                elif field == 'category': metadata['category'] = value
                elif field == 'risk': metadata['risk'] = value
                elif field == 'platforms': metadata['platforms'] = [p.strip() for p in value.split(',')]
                elif field == 'tags': metadata['tags'] = [t.strip() for t in value.split(',')]
            
    return metadata

# Read each skill's SKILL.md and README.md
for skill_name in sorted(os.listdir(skills_dir)):
    skill_path = skills_dir / skill_name
    
    if not skill_path.is_dir():
        continue
    
    skill_md = skill_path / 'SKILL.md'
    readme_md = skill_path / 'README.md'
    
    if not skill_md.exists():
        print(f"⚠️  {skill_name}/SKILL.md not found")
        continue
    
    # 1. Start with metadata from README
    meta = extract_from_readme(readme_md)
    
    # 2. Layer on metadata from SKILL.md frontmatter
    with open(skill_md, 'r') as f:
        content = f.read()
    
    if content.startswith('---'):
        lines = content.split('\n')
        yaml_end = None
        for i in range(1, len(lines)):
            if lines[i] == '---':
                yaml_end = i
                break
        
        if yaml_end is not None:
            yaml_content = '\n'.join(lines[1:yaml_end])
            try:
                fm = yaml.safe_load(yaml_content)
                if fm:
                    # YAML frontmatter takes precedence if fields exist
                    for key in ['name', 'description', 'version', 'category', 'risk', 'platforms', 'tags', 'triggers']:
                        if key in fm:
                            meta[key] = fm[key]
            except Exception as e:
                print(f"⚠️ Error parsing YAML in {skill_name}: {e}")

    # Ensure defaults
    skill_data = {
        'name': meta.get('name', skill_name),
        'version': meta.get('version', '1.0.0'),
        'description': meta.get('description', ''),
        'category': meta.get('category', 'general'),
        'tags': meta.get('tags', []),
        'risk': meta.get('risk', 'safe'),
        'platforms': meta.get('platforms', []),
        'triggers': meta.get('triggers', [])
    }
    
    skills.append(skill_data)
    print(f"✅ {skill_name} v{skill_data['version']}")

# Sort by name
skills.sort(key=lambda x: x['name'])

# Create index
index = {
    'version': '1.0.0',
    'generated': datetime.now().isoformat() + 'Z',
    'skills': skills
}

# Write index
index_path = Path(__file__).parent.parent / 'skills_index.json'
with open(index_path, 'w') as f:
    json.dump(index, f, indent=2)

print(f"\n✅ Generated skills_index.json with {len(skills)} skills")
print(f"📄 File: {index_path}")
