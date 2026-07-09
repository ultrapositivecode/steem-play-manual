import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

// scan motion.div tags to find unclosed ones
let lines = content.split('\n');
let stack = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('<motion.div')) {
    stack.push(i + 1);
  }
  if (lines[i].includes('</motion.div>')) {
    stack.pop();
  }
}

console.log("Unclosed motion.div at lines:", stack);
