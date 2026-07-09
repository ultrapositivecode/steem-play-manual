
import fs from 'fs';
const lines = fs.readFileSync('src/App.tsx', 'utf8').split('\n');

const toReplace = [259, 889]; 

toReplace.forEach(lineNum => {
    const idx = lineNum - 1;
    if (lines[idx] && lines[idx].includes('</motion.div>')) {
        lines[idx] = lines[idx].replace('</motion.div>', '</div>');
        console.log('Changed line', lineNum, 'to </div>');
    }
});

fs.writeFileSync('src/App.tsx', lines.join('\n'));
