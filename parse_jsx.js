import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');
let lines = content.split('\n');

let stack = [];
for (let i = 700; i < 1260; i++) {
  let line = lines[i];
  if (line.match(/<motion\.div[^>]*>/)) {
    stack.push({tag: 'motion.div', line: i + 1});
  } else if (line.match(/<motion\.div/)) {
     // multi-line
     stack.push({tag: 'motion.div', line: i + 1});
  }
  
  if (line.match(/<\/motion\.div>/)) {
    let last = stack.pop();
    if (last && last.tag !== 'motion.div') console.log(`Mismatch at ${i+1}: got </motion.div>, expected </${last.tag}>`);
  }
}
console.log("Remaining stack:", stack);
