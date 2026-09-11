import os
import re

css_dir = '/home/riaan/Desktop/conops/src/styles'
tsx_dir = '/home/riaan/Desktop/conops/src/components'
pages_dir = '/home/riaan/Desktop/conops/src/pages'

replacements = [
    # Backgrounds and Overlays (Dark Green / Black-Green to Deep Teal)
    (re.compile(r'rgba\(16,\s*21,\s*14,\s*([0-9.]+)\)'), r'rgba(18, 60, 58, \1)'),
    (re.compile(r'rgba\(18,\s*33,\s*5,\s*([0-9.]+)\)'), r'rgba(18, 60, 58, \1)'),
    (re.compile(r'rgba\(18,\s*32,\s*5,\s*([0-9.]+)\)'), r'rgba(18, 60, 58, \1)'),
    (re.compile(r'rgba\(9,\s*18,\s*3,\s*([0-9.]+)\)'), r'rgba(13, 44, 42, \1)'),
    (re.compile(r'rgba\(14,\s*27,\s*5,\s*([0-9.]+)\)'), r'rgba(18, 60, 58, \1)'),
    (re.compile(r'#091203'), r'#0d2c2a'),
    (re.compile(r'#112005'), r'#123C3A'),
    (re.compile(r'#0d1a04'), r'#0d2c2a'),
    (re.compile(r'#0f1c04'), r'#123C3A'),
    (re.compile(r'#0d1704'), r'#0d2c2a'),
    
    # Old primary green replacements to gold
    (re.compile(r'rgba\(124,\s*215,\s*18,\s*([0-9.]+)\)'), r'rgba(196, 154, 90, \1)'),
    (re.compile(r'#4da305'), r'#b38b4d'),
    
    # Ivory Background replaces #f7f6f2 and #f1f1f1
    (re.compile(r'#f7f6f2'), r'var(--bg-color)'),
    (re.compile(r'#f1f1f1'), r'var(--bg-color)'),
]

for directory in [css_dir, tsx_dir, pages_dir]:
    for filename in os.listdir(directory):
        if filename.endswith('.css') or filename.endswith('.tsx'):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r') as f:
                content = f.read()
            
            new_content = content
            for pattern, repl in replacements:
                new_content = pattern.sub(repl, new_content)
                
            # Replace inline SVG colors
            if filename.endswith('.tsx'):
                new_content = new_content.replace('stroke="#1b2f04"', 'stroke="var(--dark)"')
                new_content = new_content.replace('fill="#1b2f04"', 'fill="var(--dark)"')
                
            if new_content != content:
                with open(filepath, 'w') as f:
                    f.write(new_content)
                print(f"Updated {filename}")

print("Done.")
