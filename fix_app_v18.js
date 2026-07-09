
import fs from 'fs';
const content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace the broken block
const badBlock = / {34}\)\}\n {34}<\/AnimatePresence>\n {34}<\/div>\n {32}<\/div>\n {28}\}\)/;
const replacement = '                                   </div>\n                                </motion.div>\n                             )}';

if (content.match(badBlock)) {
    fs.writeFileSync('src/App.tsx', content.replace(badBlock, replacement));
    console.log('Fixed JSX block!');
} else {
    console.log('Could not find block. Trying different pattern.');
}
