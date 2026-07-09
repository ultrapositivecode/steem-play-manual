
import fs from 'fs';
const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split(/\r?\n/);

// Find the indices of the duplication
const marker1 = lines.findIndex(l => l.includes('Цей запит є безпечним і не передає ваші приватні ключі отримувачу.'));
// The garbage starts AFTER the motion.div that follows this marker.
const garbageStart = lines.findIndex((l, i) => i > marker1 && l.includes('</motion.div>')) + 1;
// The garbage ends at the next motion.div
const garbageEnd = lines.findIndex((l, i) => i >= garbageStart && l.includes('</motion.div>')) + 1;

if (garbageStart > 0 && garbageEnd > garbageStart) {
  const newLines = lines.slice(0, garbageStart).concat(lines.slice(garbageEnd));
  let finalContent = newLines.join('\n');
  
  // Scaling
  finalContent = finalContent.replace('text-[11px] text-[#94a3b8] font-black uppercase tracking-[0.2em] ml-1', 'text-xs text-steem-blue font-black uppercase tracking-[0.2em] ml-1');
  finalContent = finalContent.replace('px-5 py-3 text-base outline-none', 'px-5 py-4 text-xl outline-none');
  finalContent = finalContent.replace('text-[10px] text-steem-blue font-black uppercase tracking-[0.3em] ml-1 opacity-70', 'text-xs text-steem-blue font-black uppercase tracking-[0.3em] ml-1 opacity-70');
  finalContent = finalContent.replace('px-8 py-5 rounded-3xl border border-white/10 flex items-center justify-between', 'px-8 py-6 rounded-3xl border border-white/10 flex items-center justify-between');

  fs.writeFileSync('src/App.tsx', finalContent);
  console.log(`Repaired! Deleted lines from ${garbageStart} to ${garbageEnd}`);
} else {
  console.log('Could not find markers', {garbageStart, garbageEnd});
}
