import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');
let lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes(') : (') && lines[i-1] && lines[i-1].includes('</div>')) {
    if (lines[i-2] && lines[i-2].includes('Наступний рівень')) {
      lines.splice(i, 0, '                                        </motion.div>');
      console.log('Fixed middle motion.div missing tag close to quiz');
      break;
    }
  }
}

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes(')}') && lines[i-1] && lines[i-1].includes('</div>') && lines[i-2] && lines[i-2].includes('</button>')) {
     if (lines[i-3] && lines[i-3].includes('Gamepad2')) {
         lines.splice(i, 0, '                                  </motion.div>');
         console.log('Fixed early motion.div missing tag');
     }
  }
}

fs.writeFileSync('src/App.tsx', lines.join('\n'));
