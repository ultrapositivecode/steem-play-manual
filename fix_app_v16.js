
import fs from 'fs';
const lines = fs.readFileSync('src/App.tsx', 'utf8').split('\n');

const toFix = [889, 893]; 

toFix.forEach(lineNum => {
    const idx = lineNum - 1;
    if (lines[idx] && lines[idx].includes('</motion.div>')) {
        lines[idx] = lines[idx].replace('</motion.div>', '</div>');
        console.log('Fixed line', lineNum);
    } else {
        console.log('Skipped line', lineNum);
    }
});

fs.writeFileSync('src/App.tsx', lines.join('\n'));
