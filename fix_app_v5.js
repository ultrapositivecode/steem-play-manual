
import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Fix the outer ternary
content = content.replace(/\{!activeInteractive \? \(/, '{!activeInteractive && (');
content = content.replace(/\) : \(\s+<motion\.div\s+key=\{activeInteractive\}/, ')} \n {activeInteractive === \'master_password\' && ( \n <motion.div key="master_password"');

// 2. Fix the junction between master_password and keychain
// Look for the specific pattern of </AnimatePresence> followed by </div> then )} then {activeInteractive === 'keychain'
const junctionPattern = /<\/AnimatePresence>\s+<\/div>\s+\)\}\s+\{activeInteractive === 'keychain' && \(\s+<div/g;
content = content.replace(junctionPattern, `</AnimatePresence>
                               </div>
                            </motion.div>
                          )}

                          {activeInteractive === 'keychain' && (
                            <motion.div 
                               key="keychain"
                               initial={{ opacity: 0, x: 20 }}
                               animate={{ opacity: 1, x: 0 }}
                               exit={{ opacity: 0, x: -20 }}
                               className="w-full h-full flex flex-col min-h-[600px]"
                            >`);

// 3. Fix the end of keychain block
content = content.replace(/\}\)\s+\{activeInteractive === 'transfer' && \(/g, 
  '</motion.div>)} {activeInteractive === \'transfer\' && (');

fs.writeFileSync('src/App.tsx', content);
console.log('Final repair executed!');
