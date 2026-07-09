
import fs from 'fs';
const lines = fs.readFileSync('src/App.tsx', 'utf8').split('\n');

const toRemove = [522, 258, 327, 388]; 

toRemove.forEach(lineNum => {
    const idx = lineNum - 1;
    if (lines[idx] && lines[idx].includes('</motion.div>')) {
        lines[idx] = '// ' + lines[idx];
        console.log('Commented out line', lineNum);
    } else {
        console.log('Skipped line', lineNum);
    }
});

fs.writeFileSync('src/App.tsx', lines.join('\n'));
