
import fs from 'fs';
const lines = fs.readFileSync('src/App.tsx', 'utf8').split('\n');

const fixes = [258, 327, 388];

fixes.forEach(lineNum => {
    const idx = lineNum - 1;
    if (lines[idx] && lines[idx].includes('</motion.div>')) {
        lines[idx] = lines[idx].replace('</motion.div>', '</div>');
        console.log('Fixed line', lineNum);
    } else {
        console.log('Skipped line', lineNum, 'or already fixed');
    }
});

fs.writeFileSync('src/App.tsx', lines.join('\n'));
