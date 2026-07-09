
import fs from 'fs';
const lines = fs.readFileSync('src/App.tsx', 'utf8').split('\n');

// Try removing lines 888, 889 and adding </motion.div>
lines.splice(888, 2); 
lines.splice(888, 0, '                                 </motion.div>');

fs.writeFileSync('src/App.tsx', lines.join('\n'));
console.log('Fixed keychain block closure');
