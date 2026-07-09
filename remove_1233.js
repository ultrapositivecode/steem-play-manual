import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

let lines = content.split('\n');
console.log(lines[1232]); // should be </div>
console.log(lines.splice(1232, 1));
fs.writeFileSync('src/App.tsx', lines.join('\n'));
