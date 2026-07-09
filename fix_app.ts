import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/App.tsx');
let content = fs.readFileSync(filePath, 'utf8');
let lines = content.split('\n');

const fixedBlock = `                                            <motion.div 
                                              key="wit" 
                                              initial={{ opacity: 0, x: 10 }} 
                                              animate={{ opacity: 1, x: 0 }} 
                                              exit={{ opacity: 0, x: -10 }}
                                              className="space-y-6 bg-zinc-900/40 p-6 rounded-[32px] border border-white/5 shadow-2xl"
                                            >
                                               <div className="flex items-center gap-3">
                                                  <div className="w-12 h-12 bg-steem-blue/10 rounded-2xl flex items-center justify-center border border-steem-blue/20 text-steem-blue shadow-lg shadow-steem-blue/5">
                                                     <Wallet className="w-7 h-7" />
                                                  </div>
                                                  <div>
                                                     <p className="text-white font-black text-sm tracking-tight">Вивід на свій гаманець</p>
                                                     <p className="text-[10px] text-[#94a3b8] font-medium italic">З біржі у ваш персональний Steem акаунт</p>
                                                  </div>
                                               </div>
                                               
                                               <div className="p-5 bg-steem-blue/5 border border-steem-blue/20 rounded-2xl space-y-4">
                                                  <h5 className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                                                    <Coins className="w-3.5 h-3.5" /> Як це працює?
                                                  </h5>
                                                  <p className="text-[11px] text-[#cbd5e1] leading-relaxed font-medium">
                                                     Ви вказуєте **@нікнейм** як адресу. Більшість бірж попросять **Memo**.
                                                     Для особистого гаманця воно **НЕ ПОТРІБНЕ**, але ви можете вказати там свій **Публічний Memo Ключ** для ідентифікації.
                                                  </p>
                                                  <div className="space-y-1.5 p-3 bg-black/40 rounded-xl border border-white/5">
                                                     <label className="text-[8px] text-[#94a3b8] font-black uppercase tracking-widest ml-1">Ваш Публічний Memo Ключ (Optional)</label>
                                                     <div className="flex items-center gap-2">
                                                       <code className="flex-1 text-[9px] text-steem-blue font-mono truncate">STM5JvkLmn123Opq456Rst789Uvw012Xyz345Abc678Def901Ghi</code>
                                                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                                                     </div>
                                                  </div>
                                               </div>

                                               <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex gap-3">
                                                  <Shield className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                                  <p className="text-[9px] text-emerald-400 font-bold leading-relaxed">
                                                    Централізовані біржі використовують один спільний гаманець, тому Memo їм ПОТРІБНЕ щоб розподілити кошти. Вашому особистому акаунту — НІ, він належить лише вам.
                                                  </p>
                                               </div>
                                            </motion.div>
                                         )}
                                       </AnimatePresence>
                                    </div>
                                  )}

                                  {/* Public Keys Simulation */}
                                  {activeInteractive === 'public_keys' && (
                                    <div className="w-full max-w-lg space-y-6">
                                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
                                             <div className="flex items-center gap-2">
                                                <Zap className="w-4 h-4 text-steem-blue" />
                                                <h4 className="text-xs font-black text-white">Приватний</h4>
                                             </div>
                                             <p className="text-[9px] text-[#94a3b8]">Зберігає ваш гаманець. Тільки ви його бачите.</p>
                                             <code className="block text-[8px] bg-black/50 p-1.5 rounded text-amber-500">5Jeb9Abc... (СЕКРЕТНО)</code>
                                          </div>
                                          <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
                                             <div className="flex items-center gap-2">
                                                <Info className="w-4 h-4 text-[#94a3b8]" />
                                                <h4 className="text-xs font-black text-white">Публічний</h4>
                                             </div>
                                             <p className="text-[9px] text-[#94a3b8]">Доступний всьому блокчейну для перевірки підпису.</p>
                                             <code className="block text-[8px] bg-black/50 p-1.5 rounded text-steem-blue">STM8Abc... (ВІДКРИТИЙ)</code>
                                          </div>
                                       </div>
                                       <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-center space-y-2">
                                          <p className="text-[10px] text-emerald-400 font-bold">Навіть якщо хтось знає ваш ПУБЛІЧНИЙ ключ, вони НЕ можуть витратити ваші гроші.</p>
                                       </div>
                                    </div>
                                  )}
                             </motion.div>
                           )}
                         </AnimatePresence>

                         <AnimatePresence>
                           {feedback && (
                             <motion.div 
                               initial={{ opacity: 0, y: 10 }}
                               animate={{ opacity: 1, y: 0 }}
                               exit={{ opacity: 0 }}
                               className={cn(
                                 "mt-6 p-4 rounded-xl font-bold flex items-center gap-3",
                                 feedback.type === 'success' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
                               )}
                             >
                               {feedback.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                               {feedback.text}
                             </motion.div>
                           )}
                         </AnimatePresence>
                      </div>
                   </div>
                 </div>
               </motion.div>
             )}`

const startIndex = lines.findIndex(l => l.includes('key="wit"'));
const endIndex = lines.findIndex(l => l.includes('{currentScene === 3 && ('));

if (startIndex !== -1 && endIndex !== -1) {
    const part1 = lines.slice(0, startIndex - 1); 
    const part2 = lines.slice(endIndex);
    const result = [...part1, fixedBlock, ...part2].join('\n');
    fs.writeFileSync(filePath, result);
    console.log('Successfully fixed App.tsx');
} else {
    console.error('Could not find anchors', startIndex, endIndex);
}
