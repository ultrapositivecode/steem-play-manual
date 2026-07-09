import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SteemQuest from './components/SteemQuest';
import { 
  Send, 
  ArrowRight, 
  ArrowLeft, 
  Shield, 
  Coins, 
  MessageSquare, 
  ThumbsUp, 
  CreditCard,
  Palette,
  Copy,
  CheckCircle2,
  Lock,
  Unlock,
  Zap,
  HelpCircle,
  X,
  Wallet,
  ArrowUpRight,
  Download,
  Info,
  AlertTriangle,
  Trophy,
  Gamepad2,
  Edit3,
  FileText
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import confetti from 'canvas-confetti';
import { CONTENT_UA, CONTENT_EN, MOCK_KEYS, TRAINING_STORY, ECOSYSTEM_INTERACTIVES, FUNNY_NICKNAMES, KEYCHAIN_SIM_DATA } from './constants';
import { cn } from './lib/utils';

// --- Particle Background Component ---
const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-purple-900/10" />
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-500/5 blur-3xl"
          style={{
            width: Math.random() * 400 + 200,
            height: Math.random() * 400 + 200,
          }}
          initial={{ 
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%'
          }}
          animate={{
            x: [Math.random() * 100 + '%', Math.random() * 100 + '%', Math.random() * 100 + '%'],
            y: [Math.random() * 100 + '%', Math.random() * 100 + '%', Math.random() * 100 + '%'],
          }}
          transition={{
            duration: Math.random() * 30 + 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// --- Key Card Component ---
function KeyCard({ icon, title, desc, mockKey, isInteractive = false, onSelect }: { 
  icon: React.ReactNode, 
  title: string, 
  desc: string, 
  mockKey?: string,
  isInteractive?: boolean,
  onSelect?: () => void
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      onClick={onSelect}
      className={cn(
        "p-5 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-4 backdrop-blur-md transition-all",
        isInteractive ? "cursor-pointer hover:bg-white/10 hover:border-steem-blue/50 active:scale-95" : ""
      )}
    >
      <div className="flex items-start gap-4">
        <div className="mt-1 flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <h4 className="font-bold text-zinc-100 flex items-center gap-2">
            {title}
            {isInteractive && <Zap className="w-3 h-3 text-amber-400" />}
          </h4>
          <p className="text-xs text-[#94a3b8] leading-tight">{desc}</p>
        </div>
      </div>
      
      {mockKey && (
        <div className="bg-black/40 rounded-lg p-2.5 flex items-center justify-between gap-2 border border-white/5">
          <code className="text-xs text-steem-blue/70 font-mono truncate select-all">{mockKey}</code>
          <button 
            onClick={(e) => { e.stopPropagation(); handleCopy(); }}
            className="p-1 hover:bg-white/10 rounded-md transition-colors"
          >
            {copied ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-[#94a3b8]" />}
          </button>
        </div>

      )}
    </div>
  );
}

// --- Main App Component ---
export default function App() {
  const [currentScene, setCurrentScene] = useState(1);
  const [lang, setLang] = useState<'ua' | 'en'>('en');
  const [theme, setTheme] = useState<'green' | 'blue'>('blue');
  const [post, setPost] = useState({ title: '', text: '', hashtag: '#newpost' });
  const [editorState, setEditorState] = useState<'editing' | 'published'>('editing');
  const [stats, setStats] = useState({ likes: 0, rewards: 0 });
  
  // Quest state
  const [questStep, setQuestStep] = useState(0);
  const [questFinished, setQuestFinished] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Advanced state
  const [activeInteractive, setActiveInteractive] = useState<string | null>('master_password');
  const [transferTarget, setTransferTarget] = useState('');
  const [transferMemo, setTransferMemo] = useState('');
  const [transferAmount, setTransferAmount] = useState('10.000');
  const [showKeychainPopup, setShowKeychainPopup] = useState(false);

  // Keychain Simulation Specific State
  const [keychainSimPhase, setKeychainSimPhase] = useState<'setup' | 'interact'>('setup');
  const [keychainSimAccount, setKeychainSimAccount] = useState('');
  const [keychainSimAction, setKeychainSimAction] = useState<any>(null);
  const [keychainSetupData, setKeychainSetupData] = useState({ pin: '', username: '', posting: '', active: '' });

  // Key Quiz State
  const [keyQuizPhase, setKeyQuizPhase] = useState<'learn' | 'quiz' | 'results'>('learn');
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizResults, setQuizResults] = useState<{correct: number, total: number} | null>(null);

  const missions = TRAINING_STORY[lang];
  const interactives = ECOSYSTEM_INTERACTIVES[lang];
  const funnyNicks = FUNNY_NICKNAMES[lang];
  const keychainSimData = KEYCHAIN_SIM_DATA[lang];

  const handlePublish = () => {
    if (!post.text.trim()) return;
    
    setEditorState('published');
    const targetLikes = Math.floor(Math.random() * 45) + 5;
    const targetRewards = (Math.random() * 0.43 + 0.02);
    
    setStats({ likes: targetLikes, rewards: targetRewards });
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#581c87', '#10b981'],
      disableForReducedMotion: true
    });
  };

  const handleQuestSelect = (keyId: string) => {
    if (questFinished) return;
    const currentMission = missions[questStep];
    
    if (keyId === currentMission.correctId) {
      setFeedback({ type: 'success', text: currentMission.success });
      confetti({
        particleCount: 50,
        spread: 40,
        origin: { y: 0.8 },
        colors: ['#10b981']
      });
      
      setTimeout(() => {
        if (questStep < missions.length - 1) {
          setQuestStep(prev => prev + 1);
          setFeedback(null);
        } else {
          setQuestFinished(true);
        }
      }, 2500);
    } else {
      setFeedback({ 
        type: 'error', 
        text: lang === 'ua' ? 'Це не той ключ! Спробуйте ще раз.' : 'Not this key! Try again.' 
      });
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  const resetEditor = () => {
    setPost({ title: '', text: '', hashtag: '#newpost' });
    setEditorState('editing');
  };

  return (
    <div className={cn(
      "relative min-h-screen selection:bg-steem-blue/30 font-sans transition-all duration-1000",
      theme === 'green' ? "bg-emerald-950/10" : "bg-blue-950/10"
    )}>
      <ParticleBackground />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
        <AnimatePresence mode="wait">
          {currentScene === 1 && (
            <motion.div
              key="scene1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-5xl"
            >
              <div className="bg-glass-white backdrop-blur-[20px] border border-glass-border rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                {/* Background details */}
                <div className="absolute top-[-25%] right-[-15%] w-[500px] h-[500px] bg-steem-blue/30 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
                <motion.div 
                  className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"
                  animate={{ backgroundPosition: ['0px 0px', '100px 100px'] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />

                {/* Header with Language Select */}
                <div className="flex justify-between items-start mb-16 relative z-10">
                  <div>
                    <motion.h1 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#c084fc] mb-6 drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                    >
                      Steemit
                    </motion.h1>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                      className="text-xl text-[#e2e8f0] font-medium max-w-xl leading-relaxed"
                    >
                      {lang === 'ua' ? 'Ваш провідник у світ децентралізованих соцмереж. Обирайте свій шлях.' : 'Your guide to the web3 social world. Choose your path.'}
                    </motion.p>
                  </div>
                  
                  <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                    <button onClick={() => setLang('en')} className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", lang === 'en' ? "bg-steem-blue text-slate-900" : "text-slate-400 hover:text-white")}>
                      EN
                    </button>
                    <button onClick={() => setLang('ua')} className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", lang === 'ua' ? "bg-steem-blue text-slate-900" : "text-slate-400 hover:text-white")}>
                      UA
                    </button>
                  </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                  
                  {/* Beginner's Path */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentScene(6)}
                    className="flex flex-col text-left justify-between bg-gradient-to-br from-steem-blue/20 to-purple-500/10 border border-steem-blue/30 rounded-3xl p-8 transition-all hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] hover:border-steem-blue/50 group h-72"
                  >
                    <div className="w-14 h-14 bg-steem-blue/20 rounded-2xl flex items-center justify-center text-steem-blue mb-6">
                      <Gamepad2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {lang === 'ua' ? 'Шлях Новачка' : 'Beginner\'s Path'}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        {lang === 'ua' ? 'Покроковий інтерактивний квест-гайд. Найкраще для старту!' : 'Step-by-step interactive quest. Best for those new to the platform!'}
                      </p>
                    </div>
                    <div className="flex items-center text-steem-blue font-bold text-sm gap-2 mt-auto">
                      {lang === 'ua' ? 'Почати квест' : 'Start Quest'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.button>

                  {/* Knowledge Base */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentScene(3)}
                    className="flex flex-col text-left justify-between bg-white/5 border border-white/10 rounded-3xl p-8 transition-all hover:bg-white/10 hover:border-white/20 group h-72"
                  >
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white mb-6">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {lang === 'ua' ? 'База Знань' : 'Knowledge Base'}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        {lang === 'ua' ? 'Швидкий доступ до енциклопедії. Читайте про ключі, економіку та правила платформи.' : 'Quick access directly to the encyclopedia. Read about keys, economy, and rules.'}
                      </p>
                    </div>
                    <div className="flex items-center text-white font-bold text-sm gap-2 mt-auto">
                      {lang === 'ua' ? 'Читати гайд' : 'Read Guide'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.button>

                  {/* Interactive Modules */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentScene(5)}
                    className="flex flex-col text-left justify-between bg-white/5 border border-white/10 rounded-3xl p-8 transition-all hover:bg-white/10 hover:border-white/20 group h-72"
                  >
                    <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mb-6">
                      <Trophy className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {lang === 'ua' ? 'Симулятори' : 'Simulators'}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6">
                         {lang === 'ua' ? 'Практикуйтесь з Master Password, переказами та Keychain без ризику втрати коштів.' : 'Practice with Master Passwords, Keychain, and Transfers without losing real money.'}
                      </p>
                    </div>
                    <div className="flex items-center text-purple-400 font-bold text-sm gap-2 mt-auto">
                      {lang === 'ua' ? 'Відкрити хаб' : 'Open Hub'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.button>

                </div>
                
                {/* Sandbox Extra */}
                <div className="mt-8 text-center pt-8 border-t border-white/10">
                   <button onClick={() => setCurrentScene(2)} className="text-sm font-bold text-slate-500 hover:text-white transition-colors underline underline-offset-4">
                     {lang === 'ua' ? 'Відкрити Мок-редактор Публікацій (Пісочниця)' : 'Open Mock Post Editor (Sandbox)'}
                   </button>
                </div>
              </div>
            </motion.div>
          )}

          {currentScene === 2 && (
            <motion.div
              key="scene2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
              className="w-full max-w-5xl"
            >
              <div className="bg-glass-white backdrop-blur-[20px] border border-glass-border rounded-[24px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row min-h-[600px]">
                
                {/* Main Editor Area */}
                <div className="flex-1 flex flex-col">
                  {/* Editor Header */}
                  <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
                    <button 
                      onClick={() => setCurrentScene(1)} 
                      className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider"
                    >
                      <ArrowLeft className="w-4 h-4" /> {lang === 'ua' ? 'Назад' : 'Back'}
                    </button>
                    <span className="text-xs font-bold tracking-[2px] text-[#94a3b8] uppercase">
                      {editorState === 'editing' ? (lang === 'ua' ? 'РЕДАКТОР ДОПИСІВ' : 'POST EDITOR') : (lang === 'ua' ? 'РЕЗУЛЬТАТ' : 'RESULT')}
                    </span>
                    <div className="w-16" /> {/* Spacer */}
                  </div>

                  <div className="p-8 md:p-10 flex-1 flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                      {editorState === 'editing' ? (
                        <motion.div 
                          key="editing"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-6"
                        >
                          <h2 className="text-3xl font-extrabold text-[#f8fafc] tracking-tight">
                            Твої думки мають значення
                          </h2>
                          <div className="space-y-4">
                            <input
                              type="text"
                              placeholder="Заголовок..."
                              value={post.title}
                              onChange={e => setPost({...post, title: e.target.value})}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-lg outline-none focus:border-steem-blue/50 transition-all placeholder:text-[#94a3b8]/50 text-white"
                            />
                            <div className="relative">
                              <textarea
                                placeholder="Ваш контент тут... Використовуйте Markdown. Для кураторських винагород намагайтесь писати понад 250 слів."
                                value={post.text}
                                onChange={e => setPost({...post, text: e.target.value})}
                                className="w-full h-56 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-lg outline-none focus:border-steem-blue/50 transition-all resize-none placeholder:text-[#94a3b8]/50 leading-relaxed text-white custom-scrollbar"
                              />
                              <div className="absolute bottom-4 right-4 text-xs font-mono font-bold px-3 py-1 rounded bg-black/40 border border-white/10">
                                {post.text.trim() ? post.text.trim().split(/\s+/).length : 0} слів
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end pt-2">
                            <button
                              onClick={handlePublish}
                              disabled={!post.text.trim()}
                              className="group px-10 py-4 bg-[#38bdf8] hover:bg-[#38bdf8]/90 text-[#0f172a] disabled:opacity-50 rounded-xl font-bold flex items-center gap-3 transition-all shadow-lg shadow-steem-blue/20 active:scale-95"
                            >
                              Публікація <Send className="w-5 h-5" />
                            </button>
                        </div>
                                  </motion.div>
                      ) : (
                        <motion.div 
                          key="published"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="space-y-8"
                        >
                          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                               <div className="text-xs uppercase font-bold text-[#94a3b8] tracking-widest bg-white/10 px-2 py-1 rounded">
                                 Live on Chain
                               </div>
                            </div>
                            
                            <div className="aspect-[21/9] bg-gradient-to-br from-[#38bdf8]/20 to-[#a855f7]/20 rounded-xl mb-8 flex items-center justify-center border border-white/5 shadow-inner">
                              <Palette className="w-12 h-12 text-steem-blue/30" />
                            </div>
                            
                            <h3 className="text-3xl font-extrabold mb-3 text-white tracking-tight">
                              {post.title || "Без заголовку"}
                            </h3>
                            <div className="text-[#cbd5e1] text-lg mb-6 leading-relaxed markdown-render">
                              <ReactMarkdown>{post.text}</ReactMarkdown>
                            </div>
                            <div className="flex items-center gap-2">
                               <span className="text-steem-blue text-sm font-bold bg-[#38bdf8]/10 px-3 py-1 rounded-full border border-steem-blue/20">
                                 {post.hashtag}
                               </span>
                            </div>
                            
                            <div className="mt-12 p-6 bg-gradient-to-br from-[#38bdf8]/10 to-[#a855f7]/10 rounded-2xl border border-white/10 flex items-center justify-between">
                              <div className="flex flex-col gap-1">
                                 <span className="text-xs text-[#94a3b8] uppercase font-bold tracking-widest leading-none">Activity</span>
                                 <div className="flex items-center gap-2">
                                    <ThumbsUp className="w-5 h-5 text-steem-blue" />
                                    <span className="text-2xl font-bold text-white">{stats.likes}</span>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <span className="text-xs text-[#94a3b8] uppercase font-bold tracking-widest leading-none">Potential Payout</span>
                                 <div className="text-3xl font-extrabold text-white">
                                   ${stats.rewards.toFixed(4)}
                                 </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-4 justify-center mt-8">
                            <button
                              onClick={resetEditor}
                              className="btn btn-secondary px-8"
                            >
                              Створити ще
                            </button>
                            <button
                              onClick={() => setCurrentScene(4)}
                              className="btn btn-primary px-10"
                            >
                              Йти в Квест
                            </button>
                        </div>
                                  </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Sidebar Guide */}
                <div className="w-full md:w-80 bg-black/40 border-t md:border-t-0 md:border-l border-white/10 p-8 flex flex-col">
                  <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Info className="w-4 h-4 text-steem-blue" /> Чекліст Куратора
                  </h3>
                  
                  <div className="space-y-6 flex-1 text-sm text-[#cbd5e1] leading-relaxed">
                    <div className="space-y-2">
                      <h4 className="text-white font-bold flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-400" /> Обсяг тексту
                      </h4>
                      <p>Щоб отримати підтримку серйозних кураторів, ваш допис має бути змістовним: <strong>мінімум 250-300 слів</strong>.</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-white font-bold flex items-center gap-2">
                        <Palette className="w-4 h-4 text-purple-400" /> Медіа-контент
                      </h4>
                      <p>Самого тексту недостатньо. Додайте мінімум <strong>3 якісних зображення</strong>. Це робить допис привабливим.</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-white font-bold flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-amber-400" /> Форматування (Markdown)
                      </h4>
                      <p>Використовуйте стандартну розмітку Markdown для кращої структури. Приклади:</p>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/5 font-mono text-xs space-y-2 mt-2">
                        <p><span className="text-gray-500">**</span>жирний текст<span className="text-gray-500">**</span></p>
                        <p><span className="text-gray-500">##</span> Заголовок 2 рівня</p>
                        <p><span className="text-gray-500">&gt;</span> Цитата (блок)</p>
                        <p><span className="text-gray-500">[</span>Текст посилання<span className="text-gray-500">](</span>URL<span className="text-gray-500">)</span></p>
                        <p><span className="text-gray-500">![</span>Опис картинки<span className="text-gray-500">](</span>URL<span className="text-gray-500">)</span></p>
                      </div>
                      <p className="text-xs italic text-steem-blue mt-2">*Зручний WYSIWYG-редактор наразі в розробці екосистемою Steem, але Markdown дозволяє вам мати повний контроль.*</p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {currentScene === 4 && (
            <motion.div
              key="scene4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="w-full max-w-4xl"
            >
              <div className="bg-glass-white backdrop-blur-[20px] border border-glass-border rounded-[24px] overflow-hidden flex flex-col md:flex-row min-h-[600px] shadow-2xl">
                {/* Left Side: Simulation Info */}
                <div className="w-full md:w-1/2 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 flex flex-col">
                  {!questFinished ? (
                    <div className="space-y-8 flex-1">
                      <div className="flex items-center gap-3 text-steem-blue uppercase tracking-widest text-xs font-black">
                        <Lock className="w-4 h-4" /> Security Quest
                      </div>
                      
                      <AnimatePresence mode="wait">
                        <motion.div 
                          key={questStep}
                          initial={{ opacity: 0, transform: 'translateX(-20px)' }}
                          animate={{ opacity: 1, transform: 'translateX(0)' }}
                          exit={{ opacity: 0, transform: 'translateX(20px)' }}
                          className="space-y-6"
                        >
                          <h2 className="text-4xl font-black text-white leading-tight">
                            {missions[questStep].title}
                          </h2>
                          <p className="text-xl text-[#cbd5e1] leading-relaxed">
                            {missions[questStep].scenario}
                          </p>
                          
                          <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-start gap-3">
                             <HelpCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                             <p className="text-sm italic text-[#94a3b8]">{missions[questStep].hint}</p>
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      <AnimatePresence>
                        {feedback && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={cn(
                              "p-4 rounded-xl font-bold flex items-center gap-3",
                              feedback.type === 'success' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
                            )}
                          >
                            {feedback.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <X className="w-5 h-5" />}
                            {feedback.text}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="space-y-12 flex-1 flex flex-col justify-center text-center">
                       <motion.div
                         initial={{ scale: 0 }}
                         animate={{ scale: 1 }}
                         className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30"
                       >
                         <Unlock className="w-12 h-12 text-emerald-400" />
                       </motion.div>
                       <div className="space-y-4">
                          <h2 className="text-4xl font-black text-white">Ви Майстер Безпеки!</h2>
                          <p className="text-lg text-[#94a3b8]">Тепер ви точно знаєте, як захистити свій акаунт та нагороди.</p>
                       </div>
                       <button
                         onClick={() => setCurrentScene(3)}
                         className="btn btn-primary w-full"
                       >
                         Отримати Повний Посібник
                       </button>
                       <button
                         onClick={() => setCurrentScene(5)}
                         className="btn btn-secondary w-full border-steem-blue/30 text-steem-blue"
                       >
                         <Zap className="w-4 h-4 mr-2" /> Майстер-клас: Екосистема
                       </button>
                    </div>
//                                   </motion.div>
                  )}
                  
                  <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                     <div className="flex gap-1.5">
                       {missions.map((_, i) => (
                         <div key={i} className={cn(
                           "w-2.5 h-2.5 rounded-full transition-all",
                           i < questStep || questFinished ? "bg-steem-blue" : i === questStep ? "bg-steem-blue/50 animate-pulse" : "bg-white/10"
                         )} />
                       ))}
                     </div>
                     <span className="text-xs font-black text-[#94a3b8] uppercase tracking-widest">
                       {questFinished ? 'Завершено' : `Крок ${questStep + 1} з ${missions.length}`}
                     </span>
                  </div>
                </div>

                {/* Right Side: Interactive Key Selection */}
                <div className="w-full md:w-1/2 bg-black/20 p-8 md:p-12 flex flex-col gap-4">
                   <h3 className="text-xs font-black text-[#94a3b8] uppercase tracking-[3px] mb-4">Оберіть інструмент:</h3>
                   <div className="space-y-4">
                      <KeyCard 
                        isInteractive={!questFinished}
                        onSelect={() => handleQuestSelect('posting')}
                        icon={<MessageSquare className="w-6 h-6 text-steem-blue" />}
                        title="Posting Key"
                        desc="Для соціальної активності"
                        mockKey={MOCK_KEYS.posting}
                      />
                      <KeyCard 
                        isInteractive={!questFinished}
                        onSelect={() => handleQuestSelect('active')}
                        icon={<CreditCard className="w-6 h-6 text-emerald-400" />}
                        title="Active Key"
                        desc="Для фінансових операцій"
                        mockKey={MOCK_KEYS.active}
                      />
                      <KeyCard 
                        isInteractive={!questFinished}
                        onSelect={() => handleQuestSelect('owner')}
                        icon={<Shield className="w-6 h-6 text-red-400" />}
                        title="Owner Key"
                        desc="Для критичних змін"
                        mockKey={MOCK_KEYS.owner}
                      />
                      <KeyCard 
                        isInteractive={!questFinished}
                        onSelect={() => handleQuestSelect('memo')}
                        icon={<Lock className="w-6 h-6 text-amber-400" />}
                        title="Memo Key"
                        desc="Для приватних розмов"
                        mockKey={MOCK_KEYS.memo}
                      />
                   </div>
                   
                   <p className="mt-auto text-xs italic text-[#94a3b8]/50 text-center">
                     *Це демонстраційні ключі. Ніколи нікому не показуйте свої реальні ключі.
                   </p>
                </div>
              </div>
            </motion.div>
          )}

          {currentScene === 5 && (
            <motion.div
              key="scene5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-5xl"
            >
              <div className="bg-glass-white backdrop-blur-[20px] border border-glass-border rounded-[24px] overflow-hidden flex flex-col min-h-[700px] shadow-2xl relative">
                
                {/* Keychain Pseudo-Popup */}
                <AnimatePresence>
                  {showKeychainPopup && (
                    <motion.div 
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      className="absolute top-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm bg-[#0f172a]/95 backdrop-blur-2xl border border-steem-blue/50 rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
                    >
                      <div className="bg-steem-blue px-6 py-5 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <div className="p-2 bg-[#0f172a]/20 rounded-xl">
                              <Shield className="w-5 h-5 text-[#0f172a]" />
                           </div>
                           <span className="text-xs font-black text-[#0f172a] uppercase tracking-[0.2em] leading-none">Steem Keychain</span>
                         </div>
                         <button 
                            onClick={() => setShowKeychainPopup(false)}
                            className="p-2 hover:bg-[#0f172a]/10 rounded-full transition-colors"
                         >
                            <X className="w-5 h-5 text-[#0f172a]" />
                         </button>
                      </div>
                      <div className="p-10 space-y-8">
                         <div className="text-center space-y-5">
                            <div className="inline-block px-4 py-1.5 bg-steem-blue/10 border border-steem-blue/20 rounded-full">
                               <p className="text-[10px] text-steem-blue uppercase font-black tracking-[0.2em]">Запит на Підтвердження</p>
                            </div>
                            <h4 className="text-2xl font-black text-white tracking-tight leading-tight">{keychainSimAction?.label || "Request"}</h4>
                            <div className="text-xs text-white bg-black/40 p-6 rounded-[32px] border border-white/5 font-mono text-left max-h-64 overflow-auto whitespace-pre-wrap shadow-inner custom-scrollbar ring-1 ring-white/5">
                               {JSON.stringify(keychainSimAction?.json, null, 2)}
                            </div>
                         </div>
                         <div className="flex gap-4">
                            <button 
                               onClick={() => setShowKeychainPopup(false)}
                               className="flex-1 py-5 rounded-3xl bg-white/5 text-xs font-black text-[#94a3b8] border border-white/10 hover:bg-white/10 hover:text-white transition-all uppercase tracking-widest"
                            >
                               {lang === 'ua' ? 'Відхилити' : 'Reject'}
                            </button>
                            <button 
                               onClick={() => {
                                 setShowKeychainPopup(false);
                                 setFeedback({ type: 'success', text: lang === 'ua' ? `Успіх! ${keychainSimAction?.label} підтверджено.` : `Success! ${keychainSimAction?.label} confirmed.` });
                                 confetti({ particleCount: 100, spread: 70, origin: { y: 0.8 } });
                                 setTimeout(() => setFeedback(null), 3000);
                               }}
                               className="flex-1 py-5 rounded-3xl bg-steem-blue text-[#0f172a] text-xs font-black hover:scale-[1.05] active:scale-95 transition-all shadow-xl shadow-steem-blue/20 uppercase tracking-widest"
                            >
                               {lang === 'ua' ? 'Підтвердити' : 'Confirm'}
                            </button>
                         </div>
                         <div className="text-center">
                            <p className="text-[10px] text-[#475569] font-medium tracking-tighter italic">Цей запит є безпечним і не передає ваші приватні ключі отримувачу.</p>
                         </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col md:flex-row flex-1">
                  {/* Sidebar with Interactives */}
                  <div className="w-full md:w-80 p-8 border-b md:border-b-0 md:border-r border-white/10 space-y-8">
                     <div className="flex items-center justify-between">
                        <h2 className="text-sm font-black text-[#94a3b8] uppercase tracking-[3px]">Екосистема</h2>
                        <button onClick={() => setCurrentScene(1)} className="p-2 bg-white/5 rounded-lg border border-white/10 hover:text-white transition-all">
                           <ArrowLeft className="w-4 h-4" />
                        </button>
                     </div>

                     <div className="space-y-3">
                        {interactives.map((item) => (
                           <button
                             key={item.id}
                             onClick={() => setActiveInteractive(item.id)}
                             className={cn(
                               "w-full text-left p-4 rounded-xl border transition-all flex flex-col gap-1",
                               activeInteractive === item.id 
                                ? "bg-steem-blue/10 border-steem-blue/50 ring-1 ring-steem-blue/20" 
                                : "bg-white/5 border-white/10 hover:bg-white/10"
                             )}
                           >
                              <span className={cn("text-xs font-bold", activeInteractive === item.id ? "text-steem-blue" : "text-white")}>
                                {item.title}
                              </span>
                              <span className="text-xs text-[#94a3b8] line-clamp-2">{item.description}</span>
                           </button>
                        ))}
                     </div>

                     <div className="p-6 bg-gradient-to-br from-[#38bdf8]/10 to-[#a855f7]/10 rounded-2xl border border-white/10 space-y-4">
                        <div className="flex items-center gap-2">
                           <Download className="w-4 h-4 text-steem-blue" />
                           <span className="text-[11px] font-bold text-white uppercase tracking-wider">Ключі (PDF)</span>
                        </div>
                        <p className="text-xs text-[#94a3b8]">У деяких методах реєстрації ви завантажуєте файл із ключами. Ніколи не втрачайте його!</p>
                        <button 
                          onClick={() => {
                            setFeedback({ type: 'success', text: lang === 'ua' ? 'Завантаження симуляції: steem_keys.pdf' : 'Simulation download: steem_keys.pdf' });
                            setTimeout(() => setFeedback(null), 3000);
                          }}
                          className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-all border border-white/10"
                        >
                          Завантажити ключі
                        </button>
                     </div>
                                  </div>

                  {/* Content / Simulation Stage */}
                  <div className="flex-1 p-8 md:p-12 flex flex-col min-h-[700px]">
                     <AnimatePresence mode="wait">
                       {!activeInteractive && (
                         <motion.div 
                           key="default"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
                         >
                            <Zap className="w-16 h-16 text-steem-blue/30 animate-pulse" />
                            <div className="space-y-2">
                               <h3 className="text-2xl font-black text-white">Ласкаво просимо до Майстер-класу</h3>
                               <p className="text-[#94a3b8] max-w-xs">Оберіть розділ зліва, щоб побачити як працює екосистема Steem на практиці.</p>
                            </div>
                         </motion.div>
                       )} 
                        {activeInteractive === 'master_password' && (
                           <motion.div key="master_password" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full flex flex-col items-center">
                              <div className="w-full max-w-2xl mx-auto flex flex-col items-center space-y-6 min-h-[600px]">
                                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 w-full max-w-md">
                                       <button 
                                          onClick={() => { setKeyQuizPhase('learn'); setQuizResults(null); }}
                                          className={cn("flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all", keyQuizPhase === 'learn' ? "bg-steem-blue text-[#0f172a]" : "text-[#94a3b8] hover:text-white")}
                                       >
                                          1. {lang === 'ua' ? 'Знайомство' : 'Overview'}
                                       </button>
                                       <button 
                                          onClick={() => { setKeyQuizPhase('quiz'); setCurrentQuizIndex(0); setQuizResults(null); }}
                                          className={cn("flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all", keyQuizPhase === 'quiz' ? "bg-steem-blue text-[#0f172a]" : "text-[#94a3b8] hover:text-white")}
                                       >
                                          2. {lang === 'ua' ? 'Екзамен' : 'Exam'}
                                       </button>
                                    </div>

                                    <AnimatePresence mode="wait">
                                      {keyQuizPhase === 'learn' ? (
                                        <motion.div 
                                          key="learn"
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          exit={{ opacity: 0, x: 10 }}
                                          className="w-full space-y-6"
                                        >
                                           <div className="text-center space-y-3 mb-2">
                                              <h3 className="text-2xl font-black text-white">{lang === 'ua' ? 'Генеалогічне Дерево Ключів' : 'Key Genealogy Tree'}</h3>
                                              <p className="text-sm text-[#94a3b8]">{lang === 'ua' ? 'Всі ваші ключі — це сім\'я, де один Батько (Master) веде всіх інших.' : 'All your keys are a family, where one Parent (Master Password) generates all the others.'}</p>
                                           </div>

                                           {/* Master Password Node */}
                                           <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-3xl w-full text-center relative z-10 shadow-[0_0_40px_rgba(239,68,68,0.15)]">
                                              <h4 className="text-sm font-black text-red-500 uppercase tracking-[0.2em] flex justify-center items-center gap-2">
                                                <Lock className="w-5 h-5" /> {lang === 'ua' ? 'Master Password (Найвищий пріоритет)' : 'Master Password (Highest Priority)'}
                                              </h4>
                                              <p className="text-lg text-white mt-4 font-black">{lang === 'ua' ? 'ГОЛОВНИЙ ПАРОЛЬ' : 'THE SEED PASSWORD'}</p>
                                              <p className="text-xs text-[#cbd5e1] mt-2 font-mono break-all opacity-80 max-w-xs mx-auto">{lang === 'ua' ? 'P5K9x... — Ніколи не використовуйте його для входу в соцмережі!' : 'P5K9x... — Never use it to log into simple social features!'}</p>
                                              <div className="mt-4 p-3 bg-red-500/20 rounded-xl border border-red-500/20 text-xs text-red-400 font-bold italic">
                                                {lang === 'ua' ? 'Використовується ТІЛЬКИ для скидання інших ключів або відновлення акаунту. Здайте його в банківський сейф або запишіть на папері.' : 'Used ONLY to reset other keys or recover account. Write it on paper and put it in a safe physically.'}
                                              </div>
                                           </div>

                                           <div className="w-0.5 h-12 bg-gradient-to-b from-red-500/50 to-steem-blue/50 mx-auto -my-4 relative z-0"></div>

                                           {/* Private Keys Node */}
                                           <div className="w-full relative z-10">
                                              <div className="p-6 bg-black/40 border border-white/5 rounded-[32px] backdrop-blur-xl">
                                                 <p className="text-xs text-center font-black text-[#94a3b8] uppercase tracking-[4px] mb-6">{lang === 'ua' ? '4 Робочих Приватних Ключі' : '4 Working Private Keys'}</p>
                                                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    {[
                                                      { id: 'posting', icon: <MessageSquare />, label: lang === 'ua' ? 'Posting' : 'Posting', color: 'steem-blue', desc: 'Дописи та лайки' },
                                                      { id: 'active', icon: <CreditCard />, label: lang === 'ua' ? 'Active' : 'Active', color: 'emerald-500', desc: 'Гроші та токени' },
                                                      { id: 'owner', icon: <Shield />, label: lang === 'ua' ? 'Owner' : 'Owner', color: 'amber-500', desc: 'Зміна ключів' },
                                                      { id: 'memo', icon: <Lock />, label: lang === 'ua' ? 'Memo' : 'Memo', color: 'purple-500', desc: 'Приватні листи' }
                                                    ].map(k => (
                                                      <div key={k.id} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center group hover:bg-white/10 transition-all">
                                                         <div className={cn("w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center border text-white transition-transform group-hover:scale-110", `bg-${k.color}/20 border-${k.color}/30 text-${k.color}`)}>
                                                          {React.cloneElement(k.icon as React.ReactElement<any>, { className: "w-5 h-5" })}
                                                         </div>
                                                         <p className="text-sm font-black text-white">{k.label}</p>
                                                         <p className="text-[10px] text-[#94a3b8] mt-1 font-medium">{k.desc}</p>
                                                      </div>
                                                    ))}
                                                 </div>
                                              </div>
                                           </div>

                                           <div className="p-6 bg-steem-blue/5 border border-steem-blue/20 rounded-2xl flex gap-4 items-start shadow-xl">
                                              <Info className="w-6 h-6 text-steem-blue flex-shrink-0 mt-1" />
                                              <div className="space-y-2">
                                                <p className="text-sm text-white font-bold leading-relaxed">Система "Складно, але безпечно"</p>
                                                <p className="text-xs text-[#cbd5e1] leading-relaxed">
                                                   З кожного приватного ключа створюється **Публічний Ключ** (STM...). У підсумку у вас є дерево з 9 елементів (1 Master + 4 Private + 4 Public). Це дозволяє не «світити» головний пароль кожного разу, коли ви просто хочете написати коментар!
                                                </p>
                                              </div>
                                           </div>

                                           <button 
                                              onClick={() => { setKeyQuizPhase('quiz'); setCurrentQuizIndex(0); }}
                                              className="w-full py-4 bg-white text-[#0f172a] rounded-xl font-black text-sm uppercase tracking-widest hover:bg-steem-blue hover:text-white transition-all shadow-xl"
                                            >
                                              Пройти тест на знання ключів
                                            </button>
                                        </motion.div>
                                      ) : keyQuizPhase === 'results' && quizResults ? (
                                        <motion.div 
                                          key="results"
                                          initial={{ opacity: 0, scale: 0.9 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          className="text-center space-y-8 py-12"
                                        >
                                           <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30 mx-auto">
                                              <Trophy className="w-12 h-12 text-emerald-500" />
                                           </div>
                                           <div className="space-y-4">
                                              <h3 className="text-3xl font-black text-white">Результат: {quizResults.correct}/{quizResults.total}</h3>
                                              <p className="text-[#94a3b8] text-lg">
                                                {quizResults.correct === quizResults.total 
                                                  ? "Неймовірно! Ви тепер справжній майстер безпеки Steem. Переходьте до симуляції Keychain!" 
                                                  : "Непогано! Але безпека — це важливо. Можливо, варто переглянути теорію ще раз?"}
                                              </p>
                                           </div>
                                           <div className="flex gap-4 max-w-sm mx-auto">
                                              <button onClick={() => setKeyQuizPhase('learn')} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-bold hover:bg-white/10">Повторити теорію</button>
                                              <button onClick={() => setActiveInteractive('keychain')} className="flex-1 py-4 bg-steem-blue text-[#0f172a] rounded-xl font-bold hover:shadow-lg hover:shadow-steem-blue/20">Наступний рівень</button>
                                        </div>
                                        </motion.div>
                                      ) : (
                                        <motion.div 
                                          key="quiz-active"
                                          initial={{ opacity: 0, x: 10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          exit={{ opacity: 0, x: -10 }}
                                          className="w-full max-w-md mx-auto space-y-8"
                                        >
                                           <div className="space-y-3">
                                              <div className="flex justify-between items-end">
                                                <span className="text-[10px] text-steem-blue font-black uppercase tracking-[0.2em]">Питання {currentQuizIndex + 1} з 3</span>
                                                <span className="text-xs text-[#94a3b8] font-medium">Тестування Знань</span>
                                              </div>
                                              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                <motion.div 
                                                  className="h-full bg-steem-blue" 
                                                  initial={{ width: 0 }}
                                                  animate={{ width: `${((currentQuizIndex + 1) / 3) * 100}%` }}
                                                />
                                              </div>
                                           </div>

                                           <div className="space-y-4">
                                              <h4 className="text-xl font-black text-white leading-tight">
                                                {[
                                                  "Який ключ слід використовувати для щоденної публікації дописів?",
                                                  "Де найкраще зберігати Master Password?",
                                                  "Який ключ потрібен для переказу токенів іншому користувачу?"
                                                ][currentQuizIndex]}
                                              </h4>
                                              <div className="grid grid-cols-1 gap-3">
                                                {[
                                                  ["Master Password", "Active Key", "Posting Key"],
                                                  ["В браузері", "На папері (офлайн)", "В нотатках телефону"],
                                                  ["Active Key", "Posting Key", "Memo Key"]
                                                ][currentQuizIndex].map((ans, i) => (
                                                  <button 
                                                    key={i}
                                                    onClick={() => {
                                                      const isCorrect = (currentQuizIndex === 0 && i === 2) || (currentQuizIndex === 1 && i === 1) || (currentQuizIndex === 2 && i === 0);
                                                      const newCorrect = (quizResults?.correct || 0) + (isCorrect ? 1 : 0);
                                                      
                                                      if (currentQuizIndex < 2) {
                                                        setQuizResults({ correct: newCorrect, total: 3 });
                                                        setCurrentQuizIndex(currentQuizIndex + 1);
                                                      } else {
                                                        setQuizResults({ correct: newCorrect, total: 3 });
                                                        setKeyQuizPhase('results');
                                                        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                                                      }
                                                    }}
                                                    className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl text-left hover:bg-steem-blue/10 hover:border-steem-blue/50 text-white font-bold transition-all flex justify-between items-center group"
                                                  >
                                                     {ans}
                                                     <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                                  </button>
                                                ))}
                                              </div>
                                           </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>

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
                            >
                                    
                                    <div className="mb-8 p-6 bg-steem-blue/10 border border-steem-blue/20 rounded-2xl flex gap-4 text-left shadow-xl">
                                      <Shield className="w-8 h-8 text-steem-blue flex-shrink-0 mt-1" />
                                      <div className="space-y-1">
                                        <p className="text-sm text-white font-black uppercase tracking-tighter">Симулятор SteemKeychain</p>
                                        <p className="text-sm text-[#cbd5e1] leading-relaxed">
                                          Це тренажер, який показує принцип роботи браузерного розширення. Keychain дозволяє підписувати транзакції без передачі ключів сайту.
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex border-b border-white/5 mb-8">
                                       <button 
                                          onClick={() => setKeychainSimPhase('setup')}
                                          className={cn("px-8 py-4 text-sm font-black transition-all uppercase tracking-widest", keychainSimPhase === 'setup' ? "text-steem-blue border-b-2 border-steem-blue bg-steem-blue/5" : "text-[#94a3b8] hover:text-white")}
                                       >
                                          1. Конфігурація
                                       </button>
                                       <button 
                                          onClick={() => {
                                            if (keychainSetupData.username) setKeychainSimPhase('interact');
                                          }}
                                          disabled={!keychainSetupData.username}
                                          className={cn("px-8 py-4 text-sm font-black transition-all disabled:opacity-30 uppercase tracking-widest", keychainSimPhase === 'interact' ? "text-steem-blue border-b-2 border-steem-blue bg-steem-blue/5" : "text-[#94a3b8] hover:text-white")}
                                       >
                                          2. Взаємодія
                                       </button>
                                    </div>

                                    <div className="flex-1">
                                       {keychainSimPhase === 'setup' ? (
                                          <div className="space-y-8 max-w-md mx-auto bg-black/20 p-8 rounded-[40px] border border-white/5 shadow-2xl">
                                             <div className="text-center space-y-3">
                                                <h4 className="text-xl font-black text-white uppercase tracking-tight">{keychainSimData.setup.title}</h4>
                                                <p className="text-sm text-[#94a3b8] leading-relaxed italic">{keychainSimData.setup.info}</p>
                                             </div>
                                             <div className="space-y-5">
                                                {keychainSimData.setup.fields.map((field: any) => (
                                                  <div key={field.id} className="space-y-2">
                                                     <label className="text-xs text-steem-blue font-black uppercase tracking-[0.2em] ml-1">{field.label}</label>
                                                     <input 
                                                       type={field.type}
                                                       placeholder={field.placeholder}
                                                       value={(keychainSetupData as any)[field.id]}
                                                       onChange={(e) => setKeychainSetupData({...keychainSetupData, [field.id]: e.target.value})}
                                                       className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-xl outline-none focus:border-steem-blue/50 text-white transition-all shadow-inner"
                                                     />
                                                  </div>
                                                ))}
                                             </div>
                                             <button 
                                               onClick={() => setKeychainSimPhase('interact')}
                                               disabled={!keychainSetupData.username || !keychainSetupData.pin}
                                               className="w-full py-4 bg-steem-blue text-[#0f172a] rounded-xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-steem-blue/30 disabled:opacity-20"
                                             >
                                               Зберегти Ключі в Keychain
                                             </button>
                                          </div>
                                       ) : (
                                          <div className="space-y-10 max-w-2xl mx-auto">
                                             <div className="text-center space-y-3">
                                                <h4 className="text-2xl font-black text-white tracking-tighter">{keychainSimData.request.title}</h4>
                                                <p className="text-sm text-[#94a3b8]">{keychainSimData.request.info}</p>
                                             </div>
                                             
                                             <div className="bg-gradient-to-br from-zinc-900 to-black p-10 rounded-[48px] border border-white/10 space-y-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden backdrop-blur-3xl">
                                                <div className="space-y-4 relative z-10">
                                                   <label className="text-xs text-steem-blue font-black uppercase tracking-[0.3em] ml-1 opacity-70">Авторизований Акаунт</label>
                                                   <div className="bg-white/5 px-8 py-6 rounded-3xl border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all">
                                                      <div className="flex items-center gap-4">
                                                         <div className="w-12 h-12 bg-steem-blue/20 rounded-2xl flex items-center justify-center text-steem-blue border border-steem-blue/30 shadow-lg font-black text-lg">
                                                            {keychainSetupData.username[0]?.toUpperCase()}
                                                         </div>
                                                         <span className="text-xl text-white font-black tracking-tight">@{keychainSetupData.username}</span>
                                                      </div>
                                                      <div className="p-2 bg-emerald-500/20 rounded-full border border-emerald-500/30">
                                                         <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                                      </div>
                                                   </div>
                                                </div>

                                                <div className="grid grid-cols-1 gap-4 relative z-10">
                                                   {keychainSimData.request.actions.map((action: any) => (
                                                     <button 
                                                       key={action.id}
                                                       onClick={() => {
                                                         setKeychainSimAction(action);
                                                         setShowKeychainPopup(true);
                                                       }}
                                                       className="flex items-center justify-between p-6 bg-white/5 hover:bg-steem-blue hover:text-white border border-white/10 rounded-3xl transition-all group shadow-md hover:shadow-steem-blue/40"
                                                     >
                                                        <div className="text-left space-y-1">
                                                           <p className="text-lg font-black text-white group-hover:text-white transition-colors tracking-tight">{action.label}</p>
                                                           <p className="text-xs text-[#94a3b8] group-hover:text-white/80 transition-colors uppercase font-black tracking-widest">{action.details}</p>
                                                        </div>
                                                        <div className="w-12 h-12 rounded-2xl bg-black/40 flex items-center justify-center group-hover:bg-white/20 transition-all shadow-inner">
                                                           <Zap className="w-6 h-6 text-amber-500 group-hover:text-white" />
                                                        </div>
                                                     </button>
                                                   ))}
                                                </div>
                                             </div>
                                          </div>
                                       )}
                                    </div>
                                  </motion.div>
                                )}

                                {/* Transfer Simulation */}
                        {activeInteractive === 'transfer' && (
                          <motion.div key="transfer" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} className="w-full max-w-md space-y-6">
                                    <div className="space-y-4">
                                       <div className="space-y-2">
                                          <label className="text-xs font-black text-[#94a3b8] uppercase tracking-widest ml-2">Кому (Нікнейм)</label>
                                          <div className="relative">
                                             <input 
                                                type="text" 
                                                placeholder="@nickname" 
                                                value={transferTarget}
                                                onChange={(e) => setTransferTarget(e.target.value.toLowerCase())}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-steem-blue/50 transition-all font-bold"
                                             />
                                             {transferTarget && funnyNicks[transferTarget as keyof typeof funnyNicks] && (
                                                <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 flex items-start gap-2">
                                                   <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                                                   <span>{funnyNicks[transferTarget as keyof typeof funnyNicks]}</span>
                                                </div>
                                             )}
                                          </div>
                                       </div>
                                       <div className="flex gap-4">
                                          <div className="flex-1 space-y-2">
                                             <label className="text-xs font-black text-[#94a3b8] uppercase tracking-widest ml-2">Сума</label>
                                             <input 
                                                type="number" 
                                                placeholder="0.000" 
                                                value={transferAmount}
                                                onChange={(e) => setTransferAmount(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-steem-blue/50 transition-all font-mono"
                                             />
                                          </div>
                                          <div className="flex-1 space-y-2">
                                             <label className="text-xs font-black text-[#94a3b8] uppercase tracking-widest ml-2">Токен</label>
                                             <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none font-bold">
                                                <option>STEEM</option>
                                                <option>SBD</option>
                                             </select>
                                          </div>
                                       </div>
                                    </div>
                                    <button 
                                       onClick={() => {
                                          if (!transferTarget) return;
                                          setFeedback({ type: 'success', text: lang === 'ua' ? `Переказ ${transferAmount} на акаунт ${transferTarget} успішний!` : `Transfer of ${transferAmount} to ${transferTarget} successful!` });
                                          confetti({ particleCount: 50, spread: 30, origin: { x: 1 } });
                                          setTimeout(() => setFeedback(null), 3000);
                                       }}
                                       className="btn btn-primary w-full"
                                    >
                                       Надіслати
                                    </button>
                                  </motion.div>
                                )}

                                {/* Exchange Simulation */}
                        {activeInteractive === 'exchange' && (
                          <motion.div key="exchange" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} className="w-full max-w-md space-y-6">
                                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                                       <button 
                                          onClick={() => setKeychainSimPhase('setup')} // Reusing phase state for tab
                                          className={cn("flex-1 py-2.5 text-xs font-black uppercase tracking-widest rounded-lg transition-all", keychainSimPhase === 'setup' ? "bg-steem-blue text-[#0f172a]" : "text-[#94a3b8] hover:text-white")}
                                       >
                                          Депозит (На Біржу)
                                       </button>
                                       <button 
                                          onClick={() => setKeychainSimPhase('interact')}
                                          className={cn("flex-1 py-2.5 text-xs font-black uppercase tracking-widest rounded-lg transition-all", keychainSimPhase === 'interact' ? "bg-steem-blue text-[#0f172a]" : "text-[#94a3b8] hover:text-white")}
                                       >
                                          Вивід (З Біржі)
                                       </button>
                                    </div>

                                    <AnimatePresence mode="wait">
                                      {keychainSimPhase === 'setup' ? (
                                         <motion.div 
                                           key="dep" 
                                           initial={{ opacity: 0, x: -10 }} 
                                           animate={{ opacity: 1, x: 0 }} 
                                           exit={{ opacity: 0, x: 10 }}
                                           className="space-y-6 bg-zinc-900/40 p-6 rounded-[32px] border border-white/5 shadow-2xl"
                                         >
                                            <div className="flex items-center gap-3">
                                               <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/20 text-amber-500 shadow-lg shadow-amber-500/5">
                                                  <ArrowUpRight className="w-7 h-7" />
                                               </div>
                                               <div>
                                                  <p className="text-white font-black text-sm tracking-tight">Депозит на Біржу</p>
                                                  <p className="text-xs text-[#94a3b8] font-medium italic">Надішліть активи з вашого гаманця</p>
                                               </div>
                                            </div>
                                            <div className="space-y-4">
                                               <div className="p-5 bg-black/40 rounded-2xl border border-white/5 space-y-3">
                                                  <div className="flex justify-between items-center">
                                                     <label className="text-[11px] text-[#94a3b8] font-black uppercase tracking-[0.2em] ml-1">Memo (ОБОВ'ЯЗКОВО)</label>
                                                     <div className="group relative">
                                                        <Info className="w-3.5 h-3.5 text-steem-blue cursor-help" />
                                                        <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-[#1e293b] text-[11px] text-[#cbd5e1] rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl leading-relaxed">
                                                           Біржі використовують Memo щоб зрозуміти, якому саме користувачу зарахувати кошти з їхнього загального гаманця.
                                                        </div>
                                                     </div>
                                                  </div>
                                                  <input 
                                                     type="text" 
                                                     placeholder="Вкажіть Memo з біржі" 
                                                     value={transferMemo}
                                                     onChange={(e) => setTransferMemo(e.target.value)}
                                                     className={cn(
                                                        "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm font-mono outline-none transition-all placeholder:text-[#94a3b8]/30",
                                                       !transferMemo ? "border-red-500/30 focus:border-red-500/50" : "border-steem-blue/30 focus:border-steem-blue/50 text-steem-blue font-bold"
                                                     )}
                                                  />
                                                  {!transferMemo && (
                                                     <div className="flex items-start gap-2 text-red-400">
                                                       <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                                       <p className="text-[11px] italic font-bold leading-tight">БЕЗ MEMO ВАШІ ГРОШІ ЗАГУБЛЯТЬСЯ В ГЛИБИНАХ БЛОКЧЕЙНУ БІРЖІ!</p>
                                                     </div>
                                                  )}
                                               </div>
                                               <div className="p-5 bg-black/40 rounded-2xl border border-white/5">
                                                  <label className="text-[11px] text-[#94a3b8] font-black uppercase tracking-[0.2em] ml-1">Акаунт отримувач</label>
                                                  <div className="flex items-center gap-3 mt-2">
                                                     <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                                                       <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                     </div>
                                                     <div>
                                                       <p className="text-white font-black text-xs tracking-tight">@binance-hot</p>
                                                       <span className="text-xs px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20 font-black uppercase tracking-tighter shadow-sm">Verified Exchange</span>
                                                     </div>
                                                  </div>
                                               </div>
                                            </div>
                                            <button 
                                               disabled={!transferMemo}
                                               onClick={() => {
                                                  setFeedback({ type: 'success', text: lang === 'ua' ? 'Транзакція на біржу відправлена!' : 'Transaction to exchange sent!' });
                                                  setTimeout(() => setFeedback(null), 3000);
                                                  confetti({ particleCount: 40, spread: 20, origin: { x: 0.7 } });
                                               }}
                                               className="w-full py-3.5 bg-steem-blue text-[#0f172a] rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-steem-blue/20 transition-all active:scale-95 disabled:opacity-40"
                                            >
                                               Надіслати на Біржу
                                            </button>
                                            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                               <p className="text-[11px] text-[#94a3b8] leading-relaxed italic text-center font-medium">
                                                 {lang === 'ua' 
                                                   ? "💡 Якщо ви помилилися, негайно зверніться в підтримку біржі з деталями транзакції (Hash/TXID). Підтримка може повернути кошти, але зазвичай це довгий процес." 
                                                   : "💡 If you made a mistake, contact exchange support immediately with transaction details (Hash/TXID). Support can recover funds, but it's often a long process."}
                                               </p>
                                            </div>
                                         </motion.div>
                                      ) : (
                                            <motion.div 
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
                                  </motion.div>
                                )}

                                  {/* Public Keys Simulation */}
                        {activeInteractive === 'public_keys' && (
                          <motion.div key="public_keys" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} className="w-full max-w-lg space-y-6">
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
             )}
          {currentScene === 3 && (
            <motion.div
              key="scene3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-4xl"
            >
              <div className="flex flex-col gap-6 max-h-[88vh]">
                <div className="flex items-center justify-between sticky top-0 py-2 z-20">
                  <button
                    onClick={() => {
                        setCurrentScene(1);
                        resetEditor();
                        setQuestStep(0);
                        setQuestFinished(false);
                    }}
                    className="flex items-center gap-2 text-[#94a3b8] hover:text-white transition-all bg-white/5 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 shadow-lg"
                  >
                    <ArrowLeft className="w-4 h-4" /> Назад
                  </button>

                  <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md p-1.5 rounded-xl border border-white/10 shadow-lg">
                    <button
                      onClick={() => setLang('ua')}
                      className={cn(
                        "px-6 py-2 rounded-lg text-xs font-bold tracking-widest transition-all",
                        lang === 'ua' ? "bg-steem-blue text-[#0f172a] shadow-[0_0_15px_rgba(56,189,248,0.3)]" : "text-[#94a3b8] hover:text-[#f8fafc]"
                      )}
                    >
                      UA
                    </button>
                    <button
                      onClick={() => setLang('en')}
                      className={cn(
                        "px-6 py-2 rounded-lg text-xs font-bold tracking-widest transition-all",
                        lang === 'en' ? "bg-steem-blue text-[#0f172a] shadow-[0_0_15px_rgba(56,189,248,0.3)]" : "text-[#94a3b8] hover:text-[#f8fafc]"
                      )}
                    >
                      EN
                    </button>
                  </div>

                  <button
                    onClick={() => setTheme(theme === 'blue' ? 'green' : 'blue')}
                    className="p-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-[#94a3b8] hover:text-white transition-all shadow-lg"
                  >
                    <Palette className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  <div className="bg-glass-white backdrop-blur-[20px] border border-glass-border rounded-[24px] p-8 md:p-16 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
                    <article className="prose prose-invert prose-slate max-w-none prose-h1:text-4xl prose-h1:font-extrabold prose-h1:tracking-tight prose-h1:mb-10 prose-p:text-[#cbd5e1] prose-p:leading-relaxed prose-strong:text-white">
                      <ReactMarkdown>
                        {lang === 'ua' ? CONTENT_UA : CONTENT_EN}
                      </ReactMarkdown>
                    </article>
                    
                    {/* Visual Key Explanation Addon - Re-styled for Frosted Glass */}
                    <div className="mt-20 space-y-10">
                        <div className="border-t border-white/10 pt-16 text-center">
                            <h3 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                                {lang === 'ua' ? 'Система Ключів' : 'Key System'}
                            </h3>
                            <p className="text-[#94a3b8] max-w-md mx-auto">
                                {lang === 'ua' ? 'Ваша безпека понад усе. Кожен ключ має свою роль.' : 'Your security first. Each key has its role.'}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <KeyCard 
                                icon={<MessageSquare className="w-6 h-6 text-steem-blue" />}
                                title={lang === 'ua' ? 'Posting Key' : 'Posting Key'}
                                desc={lang === 'ua' ? 'Для щоденної активності: пости, голосування та спілкування.' : 'For daily social activity: posts, votes, and chat.'}
                                mockKey={MOCK_KEYS.posting}
                            />
                            <KeyCard 
                                icon={<CreditCard className="w-6 h-6 text-emerald-400" />}
                                title={lang === 'ua' ? 'Active Key' : 'Active Key'}
                                desc={lang === 'ua' ? 'Для фінансових операцій, гаманця та підсилення SP.' : 'For financial operations, wallet, and powering up.'}
                                mockKey={MOCK_KEYS.active}
                            />
                            <KeyCard 
                                icon={<Shield className="w-6 h-6 text-red-400" />}
                                title={lang === 'ua' ? 'Owner Key' : 'Owner Key'}
                                desc={lang === 'ua' ? 'Критичний ключ. Тільки для відновлення та зміни інших ключів.' : 'Critical master key. Only for recovery and changing other keys.'}
                                mockKey={MOCK_KEYS.owner}
                            />
                            <KeyCard 
                                icon={<Coins className="w-6 h-6 text-amber-400" />}
                                title={lang === 'ua' ? 'Memo Key' : 'Memo Key'}
                                desc={lang === 'ua' ? 'Використовується для дешифрування приватних блокчейн-повідомлень.' : 'Used for decrypting private blockchain messages.'}
                                mockKey={MOCK_KEYS.memo}
                            />
                        </div>

                        <div className="mt-16 p-10 bg-gradient-to-br from-[#38bdf8]/15 via-[#a855f7]/10 to-transparent border border-white/10 rounded-[24px] text-center space-y-6">
                            <h4 className="text-2xl font-extrabold text-white">
                                {lang === 'ua' ? 'Бажаєте створити власний акаунт?' : 'Want to create your own account?'}
                            </h4>
                            <p className="text-[#cbd5e1] max-w-lg mx-auto">
                              {lang === 'ua' 
                                ? 'Справжній досвід починається з реєстрації. Приєднуйтесь до глобальної спільноти сьогодні.' 
                                : 'The real experience begins with registration. Join the global community today.'}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-6">
                                <a 
                                    href="https://signup.steemit.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="btn btn-primary inline-flex items-center gap-2"
                                >
                                    {lang === 'ua' ? 'Реєстрація на Steemit' : 'Sign up on Steemit'} <ArrowRight className="w-5 h-5" />
                                </a>
                                <button 
                                  onClick={() => setCurrentScene(5)} 
                                  className="btn btn-secondary border-purple-500/30 text-purple-400 hover:bg-purple-500/10 inline-flex items-center gap-2"
                                >
                                  <Trophy className="w-5 h-5" /> {lang === 'ua' ? 'Відкрити Симулятори' : 'Open Simulators'}
                                </button>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentScene === 6 && (
            <motion.div
              key="scene6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
              className="w-full max-w-5xl"
            >
               <SteemQuest onExit={() => setCurrentScene(1)} lang={lang} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .btn {
          @apply py-3.5 px-10 rounded-xl font-bold transition-all active:scale-95 text-[15px] flex items-center justify-center;
        }
        .btn-primary {
          @apply bg-[#38bdf8] text-[#0f172a] shadow-[0_10px_15px_-3px_rgba(56,189,248,0.3)];
        }
        .btn-secondary {
          @apply bg-white/5 text-white border border-white/10;
        }
        .prose h1 { @apply text-4xl font-extrabold tracking-tight mb-8; }
        .prose h3 { @apply text-2xl font-extrabold text-[#38bdf8] mt-12 mb-6; }
        .prose h4 { @apply text-xl font-bold text-white mt-8 mb-4; }
        .prose p { @apply text-[#cbd5e1] leading-relaxed mb-6 italic-none; }
        .prose hr { @apply border-white/10 my-10; }
        .prose blockquote { @apply border-l-4 border-steem-blue bg-white/5 px-6 py-4 rounded-r-xl font-normal text-white italic; }
      `}} />
    </div>
  );
}
