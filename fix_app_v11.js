
import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Fix the transfer block:
// It has N button, then M div, then K motion.div.
// We want N button, then K motion.div.

// The patterns around line 1060
const lines = content.split('\n');
const newLines = [];
let skipNextDiv = false;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('</button>') && lines[i+1].includes('</div>') && lines[i+2].includes('</motion.div>')) {
        newLines.push(lines[i]);
        i++; // skip div
        newLines.push(lines[i+1]); // motion.div
        i++;
    } else {
        newLines.push(lines[i]);
    }
}

fs.writeFileSync('src/App.tsx', newLines.join('\n'));
console.log('Fixed transfer block!');
