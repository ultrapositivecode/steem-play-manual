import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');
let lines = content.split('\n');

console.log("Line 665:", lines[664]); // Index 664
console.log("Line 704:", lines[703]); // Index 703

// Remove 704 first (so indices don't shift for 665)
lines.splice(703, 1);
// Remove 665 next
lines.splice(664, 1);

fs.writeFileSync('src/App.tsx', lines.join('\n'));
