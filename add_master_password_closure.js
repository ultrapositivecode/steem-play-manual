import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

let lines = content.split('\n');
console.log(lines[892]); 
lines.splice(893, 0, '                                  </div>');
lines.splice(894, 0, '                               </motion.div>');
lines.splice(895, 0, '                            )}');

fs.writeFileSync('src/App.tsx', lines.join('\n'));
