import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

let lines = content.split('\n');
console.log(lines[1082]); // prints line 1083 ?
console.log(lines.splice(1082, 1));
fs.writeFileSync('src/App.tsx', lines.join('\n'));
