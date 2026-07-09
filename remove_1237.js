import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');
let lines = content.split('\n');

// Find and eliminate )} at line 1237
console.log('removing line 1237:', lines.splice(1236, 1)); // 1237 is idx 1236

fs.writeFileSync('src/App.tsx', lines.join('\n'));
