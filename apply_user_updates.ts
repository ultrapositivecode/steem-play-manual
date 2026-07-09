import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add warning about SteemKeychain approximation
const keychainSimNote = `
                                    <div className="mb-6 p-4 bg-steem-blue/10 border border-steem-blue/20 rounded-xl flex gap-3 text-left">
                                      <Info className="w-5 h-5 text-steem-blue flex-shrink-0" />
                                      <p className="text-xs text-[#cbd5e1] leading-relaxed">
                                        <strong>⚠️ Зверніть увагу:</strong> Це лише схематичне представлення (симуляція) того, як працює розширення для браузера (наприклад, <strong>SteemKeychain</strong>). 
                                        Вона створена для того, щоб ви зрозуміли базовий принцип взаємодії з блокчейном.
                                      </p>
                                    </div>
                                    <div className="flex border-b border-white/5 mb-6">`;
content = content.replace('<div className="flex border-b border-white/5 mb-6">', keychainSimNote);

// 2. Modify "Withdrawal" side (keychainSimPhase === 'interact' inside activeInteractive === 'exchange')
// The original snippet:
/*
<p className="text-white font-black text-sm tracking-tight">Вивід на свій гаманець</p>
<p className="text-[10px] text-[#94a3b8] font-medium italic">З біржі у ваш персональний Steem акаунт</p>
*/
// And replace the explanation area with a form.
const oldWithdrawal = `<div className="p-5 bg-steem-blue/5 border border-steem-blue/20 rounded-2xl space-y-4">
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
                                               </div>`;

const newWithdrawal = `<div className="p-5 bg-steem-blue/5 border border-steem-blue/20 rounded-2xl space-y-4">
                                                  <h5 className="text-xs font-black text-white uppercase tracking-[0.1em] flex items-center gap-2">
                                                    <Coins className="w-4 h-4" /> Деталі Виведення
                                                  </h5>
                                                  <div className="space-y-3">
                                                     <div>
                                                        <label className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-wide ml-1">Мережа</label>
                                                        <div className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm font-bold text-white flex items-center justify-between">
                                                           STEEM <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                        </div>
                                                     </div>
                                                     <div>
                                                        <label className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-wide ml-1">Акаунт отримувач (Ваш нікнейм)</label>
                                                        <input 
                                                           type="text" 
                                                           placeholder="@ваша-адреса" 
                                                           className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm font-mono outline-none focus:border-steem-blue/50 text-steem-blue transition-all"
                                                        />
                                                     </div>
                                                     <div>
                                                        <label className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-wide ml-1">Memo (НЕ ПОТРІБНО для особистого)</label>
                                                        <input 
                                                           type="text" 
                                                           placeholder="Необов'язково" 
                                                           className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm font-mono outline-none focus:border-steem-blue/50 text-[#cbd5e1] transition-all"
                                                        />
                                                     </div>
                                                  </div>
                                               </div>

                                               <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex gap-3">
                                                  <Shield className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                                  <p className="text-[11px] text-emerald-400 font-bold leading-relaxed">
                                                    Централізовані біржі використовують один спільний гаманець, тому потрібне лише ім\'я акаунту (нікнейм). Для вашого особистого акаунту Memo не вимагається, адже він належить лише вам.
                                                  </p>
                                               </div>`;

content = content.replace(oldWithdrawal, newWithdrawal);

// 3. Increase fonts universally:
// text-[8px] -> text-[10px]
// text-[9px] -> text-[11px]
// text-[10px] -> text-xs
content = content.replace(/text-\[8px\]/g, 'text-[10px]');
content = content.replace(/text-\[9px\]/g, 'text-[11px]');
content = content.replace(/text-\[10px\]/g, 'text-xs');

fs.writeFileSync(filePath, content);
console.log('Applied user updates');
