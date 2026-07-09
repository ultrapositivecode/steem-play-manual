
import fs from 'fs';
const content = fs.readFileSync('src/App.tsx', 'utf8');

const patternsToTry = [
    /\s+\)\}\n\s+<\/AnimatePresence>\n\s+<\/div>\n\s+<\/div>\n\s+\)\}/,
    / {30,}\)\}\n {30,}<\/AnimatePresence>\n {30,}<\/div>\n {25,}<\/div>\n {20,}\)\}/
];

let replaced = false;
for (const pattern of patternsToTry) {
    if (content.match(pattern)) {
        fs.writeFileSync('src/App.tsx', content.replace(pattern, '\n                                   </div>\n                                </motion.div>\n                             )}'));
        console.log('Fixed block with pattern!');
        replaced = true;
        break;
    }
}

if (!replaced) {
    console.log('No pattern matched.');
}
