
import fs from 'fs';
const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split(/\r?\n/);

// 1. Fix Keychain junction
const kcIdx = lines.findIndex(l => l.includes("{activeInteractive === 'keychain' && ("));
if (kcIdx !== -1) {
    let i = kcIdx - 1;
    while (i > 0 && !lines[i].includes('</AnimatePresence>')) i--;
    if (i > 0) {
        lines[i+1] = '                                  </div>';
        lines[i+2] = '                               </motion.div>';
        lines[i+3] = '                            )}';
    }
}

// 2. Fix Transfer block
const trIdx = lines.findIndex(l => l.includes("{activeInteractive === 'transfer' && ("));
if (trIdx !== -1) {
    lines[trIdx] = "                        {activeInteractive === 'transfer' && (";
    lines[trIdx+1] = '                          <motion.div key="transfer" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} className="w-full max-w-md space-y-6">';
    // Find end of transfer
    let j = trIdx + 2;
    while (j < lines.length && !lines[j].includes('Надіслати')) j++;
    while (j < lines.length && !lines[j].trim().endsWith(')}')) j++;
    if (j < lines.length) {
        lines[j] = '                             </motion.div>';
        lines[j+1] = '                        )}';
    }
}

// 3. Fix Exchange block
const exIdx = lines.findIndex(l => l.includes("{activeInteractive === 'exchange' && ("));
if (exIdx !== -1) {
    lines[exIdx] = "                        {activeInteractive === 'exchange' && (";
    lines[exIdx+1] = '                          <motion.div key="exchange" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} className="w-full max-w-md space-y-6">';
    // Find end of exchange
    let j = exIdx+2;
    while (j < lines.length && !lines[j].includes('AnimatePresence')) j++; // skip inner AP
    while (j < lines.length && !lines[j].includes('AnimatePresence')) j++; // skip inner AP end
    while (j < lines.length && !lines[j].trim().endsWith(')}')) j++;
    if (j < lines.length) {
        lines[j] = '                             </motion.div>';
        lines[j+1] = '                        )}';
    }
}

// 4. Fix Public Keys block
const pkIdx = lines.findIndex(l => l.includes("{activeInteractive === 'public_keys' && ("));
if (pkIdx !== -1) {
    lines[pkIdx] = "                        {activeInteractive === 'public_keys' && (";
    lines[pkIdx+1] = '                          <motion.div key="public_keys" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} className="w-full max-w-lg space-y-6">';
    // Find end of PK
    let j = pkIdx + 2;
    while (j < lines.length && !lines[j].includes('ПУБЛІЧНИЙ ключ')) j++;
    while (j < lines.length && !lines[j].trim().endsWith(')}')) j++;
    if (j < lines.length) {
        lines[j] = '                             </motion.div>';
        lines[j+1] = '                        )}';
    }
}

fs.writeFileSync('src/App.tsx', lines.join('\n'));
console.log('App.tsx structural repair v8 complete.');
