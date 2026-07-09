import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

let lines = content.split('\n');
console.log(lines[959]); // prints line 960
console.log(lines.splice(959, 1));
fs.writeFileSync('src/App.tsx', lines.join('\n'));
