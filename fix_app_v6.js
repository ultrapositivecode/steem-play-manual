
import fs from 'fs';
const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split(/\r?\n/);

// 1. Fix line 903
const line903Idx = lines.findIndex(l => l.includes('> className="w-full h-full flex flex-col min-h-[600px]">'));
if (line903Idx !== -1) {
    lines[line903Idx] = lines[line903Idx].replace('> className="w-full h-full flex flex-col min-h-[600px]">', '>');
}

// 2. Fix Master Password Start (around 719)
const masterStartIdx = lines.findIndex(l => l.includes("{activeInteractive === 'master_password' && ("));
if (masterStartIdx !== -1) {
    lines[masterStartIdx] = '                        {activeInteractive === \'master_password\' && (';
    lines[masterStartIdx+1] = '                          <motion.div key="master_password" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full flex flex-col items-center">';
    lines[masterStartIdx+2] = '                             <div className="w-full max-w-2xl flex flex-col items-center space-y-6">';
    // Remove the redundant div tag if it was there
    if (lines[masterStartIdx+3].includes('<div className="w-full max-w-2xl mx-auto')) {
        lines.splice(masterStartIdx+3, 1);
    }
}

// 3. Fix Junction between Master and Keychain (around 893)
const keychainStartIdx = lines.findIndex(l => l.includes("{activeInteractive === 'keychain' && ("));
if (keychainStartIdx !== -1) {
    // Look backwards for </AnimatePresence>
    let i = keychainStartIdx - 1;
    while (i > 0 && !lines[i].includes('</AnimatePresence>')) i--;
    
    if (i > 0) {
        lines[i] = '                                  </AnimatePresence>';
        lines[i+1] = '                             </div>';
        lines[i+2] = '                          </motion.div>';
        lines[i+3] = '                        )}';
        lines[i+4] = '';
        lines[i+5] = "                        {activeInteractive === 'keychain' && (";
    }
}

fs.writeFileSync('src/App.tsx', lines.join('\n'));
console.log('App.tsx repaired and restructured.');
