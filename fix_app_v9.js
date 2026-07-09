
import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Fix the duplicated/broken closing tags in keychain simulation
content = content.replace(/1004:\s+<\/div>\s+1005:\s+<\/div>/g, '</div>\n                              </motion.div>');

// Helper to remove any line that looks like "NUMBER: "
let lines = content.split('\n');
lines = lines.map(line => line.replace(/^\d+:\s*/, ''));
content = lines.join('\n');

// Standardize junctions
content = content.replace(/<\/div>\s+<\/div>\s+\)\}\s+\{\/\* Transfer Simulation \*\/\}/g, '</div>\n                                  </motion.div>\n                                )}\n\n                                {/* Transfer Simulation */}');

// Wrap Exchange end properly
content = content.replace(/<\/div>\s+<\/motion\.div>\s+\)\}\s+\{\/\* Exchange Simulation \*\/\}/g, '</div>\n                                  </motion.div>\n                                )}\n\n                                {/* Exchange Simulation */}');

// Wrap Public Keys end properly
content = content.replace(/ПУБЛІЧНИЙ ключ.*?<\/div>\s+<\/div>\s+\)\}/s, (match) => {
    return match.replace(/<\/div>\s+\)\}/, '</div>\n                                  </motion.div>\n                                )}');
});

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx structural repair v9 complete.');
