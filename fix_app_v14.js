
import fs from 'fs';
const lines = fs.readFileSync('src/App.tsx', 'utf8').split('\n');

const toRemove = [649, 619]; // Remove backwards so indices don't shift

toRemove.forEach(lineNum => {
    const idx = lineNum - 1;
    if (lines[idx] && lines[idx].includes('</motion.div>')) {
        lines.splice(idx, 1);
        console.log('Removed line', lineNum);
    } else {
        console.log('Skipped line', lineNum);
    }
});

fs.writeFileSync('src/App.tsx', lines.join('\n'));
