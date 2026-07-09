import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

let lines = content.split('\n');
console.log('Line 1379 is:', lines[1378]);
lines.splice(1378, 1);

fs.writeFileSync('src/App.tsx', lines.join('\n'));
