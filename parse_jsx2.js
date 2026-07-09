import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');
let lines = content.split('\n');

let stack = [];
for (let i = 700; i < 1260; i++) {
  let line = lines[i];
  
  // opening
  if (line.match(/<motion\.div/) && !line.match(/\/>/)) {
     stack.push({tag: 'motion.div', line: i + 1});
  }
  
  // self-closing
  if (line.match(/<motion\.div.*?\/>/)) {
     // do not push, or pop if already pushed
  }
  
  if (line.match(/<\/motion\.div>/)) {
    stack.pop();
  }
}
console.log("Remaining motion divs:", stack);
