import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');
let lines = content.split('\n');
console.log('removing:', lines.splice(739, 1));
fs.writeFileSync('src/App.tsx', lines.join('\n'));
