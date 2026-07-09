import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace("                                   </motion.div>\n\n                                     <div className=\"flex-1\">", "                                     <div className=\"flex-1\">")
// Let's print out what we see on line 930
let lines = content.split('\n');
console.log(lines[929]); // prints line 930
console.log(lines.splice(929, 1));
fs.writeFileSync('src/App.tsx', lines.join('\n'));
