
import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

const badBlock = / {30,}<\/div>\n {30,}<\/motion\.div>\n {25,}\)\}/;
// From viewing: 
// 889:                                    </div>
// 890:                                 </motion.div>
// 891:                              )}

const replacement = '                                 </motion.div>\n                             )}';

content = content.replace(badBlock, replacement);
fs.writeFileSync('src/App.tsx', content);
console.log('Fixed block structurally (finally).');
