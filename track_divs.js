import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');
let lines = content.split('\n');

let stack = [];
for (let i = 705; i < 1260; i++) {
  let line = lines[i];
  // Simple tokenization: <div, </div>, <motion.div, </motion.div>
  // We ignore self-closing for this naive check
  
  // count how many <div
  let divsOpen = (line.match(/<div( |>)/g) || []).length;
  let divsClose = (line.match(/<\/div>/g) || []).length;
  let motionsOpen = (line.match(/<motion\.div( |>)/g) || []).length;
  let motionsClose = (line.match(/<\/motion\.div>/g) || []).length;
  let animateOpen = (line.match(/<AnimatePresence/g) || []).length;
  let animateClose = (line.match(/<\/AnimatePresence>/g) || []).length;
  
  // self-closing ignore
  divsOpen -= (line.match(/<div[^>]*\/>/g) || []).length;
  motionsOpen -= (line.match(/<motion\.div[^>]*\/>/g) || []).length;
  
  for(let j=0; j<animateOpen; j++) stack.push({tag: 'AnimatePresence', line: i+1});
  for(let j=0; j<divsOpen; j++) stack.push({tag: 'div', line: i+1});
  for(let j=0; j<motionsOpen; j++) stack.push({tag: 'motion.div', line: i+1});
  
  for(let j=0; j<motionsClose; j++) {
    let last = stack.pop();
    if(last && last.tag !== 'motion.div') console.log(`[${i+1}] Expected </${last.tag}> but got </motion.div>`);
  }
  for(let j=0; j<divsClose; j++) {
    let last = stack.pop();
    if(last && last.tag !== 'div') console.log(`[${i+1}] Expected </${last.tag}> but got </div>`);
  }
  for(let j=0; j<animateClose; j++) {
    let last = stack.pop();
    if(last && last.tag !== 'AnimatePresence') console.log(`[${i+1}] Expected </${last.tag}> but got </AnimatePresence>`);
  }
}
