
import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Fix Transfer end ghost div
content = content.replace(/<\/button>\s+<\/div>\s+<\/motion\.div>\s+\)\}/, '</button>\n                                  </motion.div>\n                                )}');

// 2. Fix Exchange end junction
content = content.replace(/<\/AnimatePresence>\s+<\/div>\s+\)\}/, '</AnimatePresence>\n                                  </motion.div>\n                                )}');

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx structural repair v10 complete.');
