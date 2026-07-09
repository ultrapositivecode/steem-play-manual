
import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');

for (let i = 0; i < lines.length - 1; i++) {
    // If we have a sequence of </button> followed by </div>, maybe motion.div is missing
    if (lines[i].includes('</button>') && lines[i+1].includes('</div>') && !lines[i+2].includes('</motion.div>')) {
        lines.splice(i+2, 0, '                                  </motion.div>');
        console.log('Added missing motion.div tag');
    }
}
fs.writeFileSync('src/App.tsx', lines.join('\n'));
