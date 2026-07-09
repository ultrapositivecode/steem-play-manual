
import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

const badChunk = `                                       )}
                                   </AnimatePresence>
                                   </div>
                                </div>
                             )}`;

const goodChunk = `                                   </div>
                                </motion.div>
                             )}`;

content = content.replace(badChunk, goodChunk);
fs.writeFileSync('src/App.tsx', content);
console.log('Fixed block structurally.');
