
import fs from 'fs';
const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split(/\r?\n/);

// Find the specific broken block
const masterLine = lines.findIndex(l => l.includes('motion.div key="master_password"') && l.includes('animate='));
if (masterLine !== -1) {
    // Verify it's the right place
    if (lines[masterLine+1].includes('max-w-2xl flex flex-col') && lines[masterLine+2].includes('animate=')) {
        lines.splice(masterLine, 6, 
            '                           <motion.div key="master_password" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full flex flex-col items-center">',
            '                              <div className="w-full max-w-2xl mx-auto flex flex-col items-center space-y-6 min-h-[600px]">'
        );
        console.log('MasterPassword block fixed.');
    } else {
        console.log('Match found but structure unexpected.');
    }
} else {
    console.log('No match found.');
}

fs.writeFileSync('src/App.tsx', lines.join('\n'));
