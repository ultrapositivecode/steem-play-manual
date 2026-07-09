import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Key, 
  FileText, 
  Lock, 
  MessageSquare, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw, 
  User, 
  Battery, 
  Zap, 
  Award, 
  ThumbsUp, 
  Coins, 
  TrendingUp, 
  Info, 
  Bold, 
  Heading, 
  Quote, 
  Check, 
  X,
  ArrowLeft,
  ChevronRight,
  Eye,
  Code,
  Table,
  Image,
  HelpCircle,
  Sliders,
  Unlock,
  List
} from 'lucide-react';
import confetti from 'canvas-confetti';
import ReactMarkdown from 'react-markdown';

const clsx = (...classes: (string | boolean | undefined | null)[]) => classes.filter(Boolean).join(' ');

export default function SteemQuest({ onExit, lang }: { onExit: () => void, lang: 'ua' | 'en' }) {
  const [level, setLevel] = useState(0); 
  const [playerName, setPlayerName] = useState('');
  
  // Level 1: Key Tree state
  const [placedKeys, setPlacedKeys] = useState<Record<string, string>>({});
  const [heldKey, setHeldKey] = useState<string | null>(null);
  const [treeStage, setTreeStage] = useState(0); 
  const [errorMsg, setErrorMsg] = useState('');

  // Level 2: Phishing state
  const [l2State, setL2State] = useState<'idle' | 'success' | 'fail'>('idle');

  // Level 3: Markdown Magic state
  const [markdownTasks, setMarkdownTasks] = useState({
    heading: false,
    bold: false,
    blockquote: false,
    table: false,
    image: false
  });
  const [rawMarkdown, setRawMarkdown] = useState('');
  const [markdownStage, setMarkdownStage] = useState<'editing' | 'published'>('editing');
  const [editorMode, setEditorMode] = useState<'markdown' | 'visual'>('markdown');
  
  // Custom Visual Editor state to demonstrate WYSIWYG flow and auto-code generation
  const [visualData, setVisualData] = useState({
    title: '',
    aboutMe: '',
    hobby: '',
    favoriteQuote: '',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=60',
    tableRows: [
      { day: 'Monday / Понеділок', action: 'Write introductory post on Steem' },
      { day: 'Wednesday / Середа', action: 'Upvote creative authors' },
      { day: 'Friday / П’ятниця', action: 'Power Up STEEM to Steem Power' }
    ],
    centerHtml: true, // Center header html tag demo
    subTextHtml: true // Subscript tag demo
  });

  // Level 4: Proof of Brain state
  const [steemPower, setSteemPower] = useState(5000);
  const [upvoteWeight, setUpvoteWeight] = useState(100);
  const [upvotedA, setUpvotedA] = useState(false);
  const [flaggedB, setFlaggedB] = useState(false);
  const [flaggedC, setFlaggedC] = useState(false);
  const [pobFeedback, setPobFeedback] = useState<string | null>(null);

  // Level 5: RC Battery state
  const [rcBattery, setRcBattery] = useState(85);
  const [steemPowerBattery, setSteemPowerBattery] = useState(15);
  const [liquidSteem, setLiquidSteem] = useState(500);
  const [powerUpInput, setPowerUpInput] = useState<string>('500');
  const [rcHistory, setRcHistory] = useState<string[]>([]);
  const [isSupercharged, setIsSupercharged] = useState(false);
  const [rcError, setRcError] = useState<string | null>(null);
  const t = {
    ua: {
      game_title: "Steem Quest: Шлях Новачка 🚀",
      desk_title: "Реєстратура",
      desk_welcome: "Вітаю у світі Steem! Щоб почати свій шлях та відкрити Дерево Ключів, тобі потрібен нікнейм. Як тебе назвати?",
      desk_placeholder: "Ваш нікнейм...",
      btn_plant: "Зареєструватися",
      
      tree_title: "Дерево Ключів (Рівень 1)",
      tree_instruction: "З твого нікнейму виросло Дерево Ключів. Майстер-пароль — на вершині. Що нижче — то легший доступ. Натисни на ключ на дереві та вибери правильний сейф для його збереження!",
      
      key_master: "Master",
      key_owner: "Owner",
      key_active: "Active",
      key_posting: "Posting",
      key_memo: "Memo",

      dz_safe: "Бабусин Сейф (Офлайн)",
      dz_wallet: "Локальний Гаманець",
      dz_browser: "Браузер (Щоденно)",

      harvest_success: "Чудово! Ваше крипто-дерево надійно захищене. Ключі розсортовані бездоганно!",
      error_wrong_vault: "Ой! Ментор підказує, що це небезпечне місце для цього ключа. Спробуйте іншу схованку.",
      error_no_name: "Будь ласка, введіть свій нікнейм!",
      next_btn: "Далі",
      
      l2_title: "Шахрай у провулку (Рівень 2)",
      l2_instruction: "Ви вийшли в Steem City. До вас у Discord звертається користувач з нікнеймом 'Steemit Support' та офіційним логотипом.",
      l2_message: "Вітаємо! Ваш акаунт було обрано для отримання гранту в розмірі 1000 STEEM! Будь ласка, введіть свій Головний Пароль (Master Password) за цим посиланням для активації: www.steeem-it-support.xyz",
      l2_btn_give: "Перейти за посиланням та ввести Master Password",
      l2_btn_report: "Ігнорувати та заблокувати (Це шахрайство)",
      l2_fail: "АКАУНТ ЗЛАМАНО! Шахраї викрали ваш Master Password і вивели всі кошти. Ніколи, за жодних обставин, не діліться своїм Master Password або Owner Key!",
      l2_success: "Абсолютно правильно! У Steem немає офіційної служби підтримки, яка коли-небудь запитувала б ваш пароль. Ви врятували свій акаунт!",
      
      // Level 3: Markdown Magic
      l3_title: "Магія Розмітки (Рівень 3)",
      l3_instruction: "Усі публікації в Steem використовують мову розмітки Markdown. Вона дозволяє гарно оформлювати статті. Допоможи відформатувати твій перший вступний пост!",
      l3_task_header: "Зроби заголовок 'Про мене' (##)",
      l3_task_bold: "Виділи слово 'Steem' жирним (**)",
      l3_task_quote: "Перетвори цитату на блок-цитату (>)",
      l3_task_table: "Додай таблицю планів (містить | Стовпчик |)",
      l3_task_image: "Додай зображення з HTML-центруванням (<center>)",
      l3_btn_format_h: "Додати Заголовок (##)",
      l3_btn_format_b: "Зробити Жирним (**)",
      l3_btn_format_q: "Додати Цитату (>)",
      l3_btn_format_t: "Додати Таблицю (|)",
      l3_btn_format_i: "Додати Картинку з <center>",
      l3_success_msg: "Пост відформатовано чудово! Тепер він виглядає професійно та структуровано.",
      l3_publish: "Опублікувати в Блокчейн",
      l3_published_title: "Пост успішно записано в блокчейн!",
      l3_explain_html: "💡 Steem підтримує деякі HTML-теги для кращого оформлення. Найчастіше автори використовують <center>...</center> для вирівнювання зображень по центру та <sub>...</sub> для дрібних підписів під ними!",
      l3_editor_mode_raw: "Маркдаун Редактор (Код)",
      l3_editor_mode_visual: "Візуальний Редактор (Demo)",
      l3_visual_intro: "Писати дописи насправді легко! Візуальний інструмент дозволяє зручно налаштувати елементи без необхідності вручну прописувати коди розмітки. Змінюйте поля нижче — і чистий маркдаун згенерується автоматично!",
      l3_visual_title: "Заголовок допису:",
      l3_visual_about: "Про мене (Текст):",
      l3_visual_hobby: "Моє хобі / Інтереси:",
      l3_visual_quote: "Мій девіз / Цитата:",
      l3_visual_img_label: "Посилання на картинку:",
      l3_visual_table_label: "Таблиця планів (Редагувати дії):",
      
      // Level 4: Proof of Brain
      l4_title: "Шлях Куратора: Proof of Brain (Рівень 4)",
      l4_instruction: "У Steem лайки мають фінансову вагу, яка залежить від вашої сили — Steem Power (SP). Справжні куратори підтримують оригінальних авторів та мінусують спам.",
      l4_sp_slider: "Ваш баланс Steem Power (Керуйте вашим впливом):",
      l4_upvote_value: "Вартість вашого лайку:",
      l4_task_desc: "Завдання: Знайдіть та підтримайте лайком (Upvote 👍) корисний оригінальний пост. Знайдіть та заблокуйте (Flag 👎) плагіат або скам!",
      l4_post_a_title: "🎨 Мій перший малюнок аквареллю: Соняшники",
      l4_post_a_desc: "Малював вчора ввечері. Додаю 4 фотографії процесу створення крок за кроком...",
      l4_post_b_title: "🚨 ВИГРАЙТЕ $10,000 БЕЗ РИЗИКУ! КЛІКАЙТЕ СЮДИ ШВИДКО!!!",
      l4_post_b_desc: "Найнадійніший інвестиційний пул. Закиньте 10 STEEM та отримайте 100 STEEM завтра!!!",
      l4_post_c_title: "📖 Копіпаст статті про Блокчейн з Вікіпедії",
      l4_post_c_desc: "Блокчейн — це розподілена база даних... (Текст повністю вкрадений без жодних посилань на джерела)",
      l4_upvoted_success: "Чудово! Ви проголосували за якісний контент. Оскільки у вас багато SP, ви принесли автору хорошу нагороду! Через 7 днів 50% цієї суми повернеться вам як нагорода за кураторство!",
      l4_flagged_success: "Вірно! Ви знизили рейтинг скаму/плагіату. Спільнота дякує вам за очищення мережі від сміття!",
      l4_next_unlocked: "Завдання кураторства виконано успішно! Ви готові йти далі.",
      l4_weight_label: "Сила вашого голосу (Voting Weight):",
      l4_locked_weight_info: "🔒 Регулювання сили голосу заблоковано на 100%. Можливість регулювання сили голосу (від 1% до 100%) відкривається лише після досягнення 500 Steem Power (SP)!",
      l4_unlocked_weight_info: "🔓 Доступно регулювання! Оскільки у вас більше 500 SP, ви можете гнучко налаштовувати силу кожного свого лайку від 1% до 100%, щоб заощаджувати Voting Power.",
      l4_curation_payout_explain: "Реальний розрахунок: вартість голосу залежить від курсу STEEM та пулу винагород (~$0.000005 за кожну SP при 100% силі голосу). Наприклад, при 5,000 SP ваш 100% голос принесе приблизно $0.025, а при 50,000 SP — $0.25. Для дрібних акаунтів сила голосу завжди зафіксована на 100%, щоб не створювати мікро-транзакцій.",

      // Level 5: RC Battery
      l5_title: "Батарейка Кредитів Ресурсів (Рівень 5)",
      l5_instruction: "Усі транзакції в Steem безкоштовні (без комісій), але кожна дія витрачає Resource Credits (RC). Вони працюють як батарейка. Спробуйте зробити кілька дій!",
      l5_battery_label: "Заряд RC Батареї:",
      l5_sp_label: "Баланс Steem Power:",
      l5_wallet_label: "Рідкий Wallet:",
      l5_action_post: "Опублікувати статтю",
      l5_action_comment: "Написати коментар",
      l5_action_vote: "Проголосувати",
      l5_err_depleted: "⚠️ ПОМИЛКА: Недостатньо Resource Credits (RC)! Батарейку розряджено. Ви не можете здійснювати транзакції!",
      l5_powerup_desc: "Новачки з низьким SP мають маленьку ємність батареї. Щоб збільшити її назавжди, введіть суму STEEM для Power Up (конвертації STEEM в Steem Power)!",
      l5_btn_powerup: "⚡ Зробити Power Up",
      l5_supercharged_msg: "🚀 СУПЕРЗАРЯД! Ви перевели STEEM в Steem Power. Ємність вашої батареї зросла, вона миттєво перезарядилася та витрачається вкрай повільно!",
      l5_history_title: "Лог транзакцій блокчейну:",
      l5_powerup_input_label: "Сума поповнення (STEEM):",
      l5_powerup_max_btn: "Макс",
      l5_powerup_error_amount: "⚠️ Будь ласка, введіть коректну суму STEEM (максимум {max} STEEM)!",
      l5_battery_impact_explain: "💡 Як сила впливає на батарею? Збільшуючи Steem Power, ви розширюєте ємність батареї Resource Credits (RC). Завдяки цьому відсоткова вартість транзакцій стрімко зменшується!",
      l5_allowed_actions_title: "Кількість дій до повного розряджання батареї:",
      l5_allowed_posts: "Публікацій: {num}",
      l5_allowed_comments: "Коментарів: {num}",
      l5_allowed_votes: "Голосів: {num}",

      // Outro
      outro_title: "Академію Steem Пройдено! 🎓",
      outro_text: "Вітаємо! Ти успішно засвоїв теоретичні та практичні засади децентралізованої мережі Steem. Тепер ти повністю готовий до реальних звершень!",
      cert_subtitle: "СЕРТИФІКАТ ВИПУСКНИКА БЛОКЧЕЙНУ",
      cert_body: "Цей документ засвідчує, що користувач успішно опанував технологію Steem, пройшов симуляцію безпеки ключів, освоїв Proof-of-Brain та керування Resource Credits.",
      cert_verified: "ПІДТВЕРДЖЕНО В БЛОКЧЕЙНІ",
      finish_btn: "Повернутися у меню"
    },
    en: {
      game_title: "Steem Quest: Beginner's Path 🚀",
      desk_title: "Welcome Desk",
      desk_welcome: "Welcome to the Steem world! To begin your journey and sprout your Tree of Keys, you need a nickname. What should we call you?",
      desk_placeholder: "Your nickname...",
      btn_plant: "Register",
      
      tree_title: "Tree of Keys (Level 1)",
      tree_instruction: "A Tree of Keys grew from your nickname. Master is at the very top. The lower branches hold daily keys. Click on a key and choose the correct secure vault to store it!",
      
      key_master: "Master",
      key_owner: "Owner",
      key_active: "Active",
      key_posting: "Posting",
      key_memo: "Memo",

      dz_safe: "Offline Safe",
      dz_wallet: "Local Wallet",
      dz_browser: "Browser (Daily)",

      harvest_success: "Excellent! Your crypto-tree keys are perfectly harvested and secured in the correct vaults!",
      error_wrong_vault: "Oops! Mentor says this is a dangerous place to keep this key. Try another vault.",
      error_no_name: "Please enter your nickname!",
      next_btn: "Next",
      
      l2_title: "Alley Scammer (Level 2)",
      l2_instruction: "You walk into Steem City. Someone in Discord with the name 'Steemit Support' and an official logo messages you.",
      l2_message: "Congratulations! Your account was selected to receive a grant of 1000 STEEM! Please enter your Master Password at this link to activate: www.steeem-it-support.xyz",
      l2_btn_give: "Go to link and paste Master Password",
      l2_btn_report: "Ignore and block (It's a scam)",
      l2_fail: "ACCOUNT COMPROMISED! Scammers stole your Master Password and drained all funds. Never, under any circumstances, share your Master Password or Owner Key!",
      l2_success: "Exactly correct! There is no official support team in Steem that would ever ask for your password. You saved your account!",
      
      // Level 3: Markdown Magic
      l3_title: "Markdown Magic (Level 3)",
      l3_instruction: "All publications in Steem use the Markdown formatting language. It allows you to create beautiful, styled articles. Help format your first introduction post!",
      l3_task_header: "Create subtitle 'About me' (##)",
      l3_task_bold: "Make the word 'Steem' bold (**)",
      l3_task_quote: "Turn a motto into a blockquote (>)",
      l3_task_table: "Add a weekly goals table (contains | Column |)",
      l3_task_image: "Add an image with HTML centering (<center>)",
      l3_btn_format_h: "Add Header (##)",
      l3_btn_format_b: "Make Bold (**)",
      l3_btn_format_q: "Add Quote (>)",
      l3_btn_format_t: "Add Table (|)",
      l3_btn_format_i: "Add Centered Image",
      l3_success_msg: "Post formatted perfectly! Now it looks highly professional.",
      l3_publish: "Publish to Blockchain",
      l3_published_title: "Post successfully published to feed!",
      l3_explain_html: "💡 Steem supports some HTML tags for advanced layout styling. Most commonly, authors wrap images/text inside <center>...</center> to align them center and <sub>...</sub> for small subtitles/captions below them!",
      l3_editor_mode_raw: "Markdown Editor (Raw)",
      l3_editor_mode_visual: "Visual Editor (Demo)",
      l3_visual_intro: "Writing posts is actually very easy! Visual tools allow you to conveniently customize layout elements without having to write code manually. Edit the fields below — clean markdown code will be compiled automatically!",
      l3_visual_title: "Post Title:",
      l3_visual_about: "About Me (Text):",
      l3_visual_hobby: "My Hobbies / Interests:",
      l3_visual_quote: "My Motto / Quote:",
      l3_visual_img_label: "Image URL:",
      l3_visual_table_label: "Goals Table (Edit actions):",

      // Level 4: Proof of Brain
      l4_title: "Curation Path: Proof of Brain (Level 4)",
      l4_instruction: "In Steem, upvotes have real financial weight depending on your Steem Power (SP). Real curators support original creators and flag/downvote spam.",
      l4_sp_slider: "Your Steem Power Balance (Drag to change impact):",
      l4_upvote_value: "Your Upvote Value:",
      l4_task_desc: "Task: Find and support (Upvote 👍) high-quality original content. Find and flag (Flag 👎) plagiarism or scam!",
      l4_post_a_title: "🎨 My first watercolor painting: Sunflowers",
      l4_post_a_desc: "Painted yesterday evening. Here are 4 step-by-step photos of the creation process...",
      l4_post_b_title: "🚨 WIN $10,000 WITH NO RISK! CLICK HERE NOW!!!",
      l4_post_b_desc: "Highly trusted investment pool. Deposit 10 STEEM and get 100 STEEM tomorrow!!!",
      l4_post_c_title: "📖 Copy-pasted article about Blockchain from Wikipedia",
      l4_post_c_desc: "Blockchain is a distributed ledger technology... (Entire text stolen without any sources or credits)",
      l4_upvoted_success: "Wonderful! You voted for high-quality content. Because you have high SP, you gave the author a handsome payout! After 7 days, 50% of this goes back to you as a curation reward!",
      l4_flagged_success: "Correct! You flagged the spam/plagiarism. The community thanks you for cleaning up the blockchain!",
      l4_next_unlocked: "Curation tasks completed successfully! You are ready to move on.",
      l4_weight_label: "Your voting weight (Voting Weight):",
      l4_locked_weight_info: "🔒 Voting weight control is locked at 100%. The ability to adjust voting weight (from 1% to 100%) unlocks only after reaching 500 Steem Power (SP)!",
      l4_unlocked_weight_info: "🔓 Slider Unlocked! Since you have more than 500 SP, you can dynamically adjust your voting weight on every upvote from 1% to 100% to conserve Voting Power.",
      l4_curation_payout_explain: "Real calculation: upvote value depends on the STEEM price and the reward pool (~$0.000005 per SP at 100% weight). For instance, with 5,000 SP your 100% upvote adds ~$0.025, and with 50,000 SP it adds ~$0.25. Smaller accounts have voting weight locked at 100% to avoid micro-transactions.",

      // Level 5: RC Battery
      l5_title: "Resource Credits (RC) Battery (Level 5)",
      l5_instruction: "All transactions in Steem are free (no fees), but every action consumes Resource Credits (RC). They act like a rechargeable battery. Try doing some actions!",
      l5_battery_label: "RC Battery Level:",
      l5_sp_label: "Steem Power Balance:",
      l5_wallet_label: "Liquid Wallet:",
      l5_action_post: "Publish an Article (-40% RC)",
      l5_action_comment: "Write a Comment (-15% RC)",
      l5_action_vote: "Upvote a Post (-10% RC)",
      l5_err_depleted: "⚠️ ERROR: Insufficient Resource Credits (RC)! Battery depleted. You cannot perform any transactions!",
      l5_powerup_desc: "Newcomers with low SP have small battery capacities. To permanently expand it, perform a Power Up (convert liquid STEEM into Steem Power)!",
      l5_btn_powerup: "⚡ Power Up 500 STEEM",
      l5_supercharged_msg: "🚀 SUPERCHARGED! You converted 500 STEEM to Steem Power. Your battery capacity grew 10x, instantly refilled, and consumes extremely slowly!",
      l5_history_title: "Blockchain transaction log:",

      // Outro
      outro_title: "Steem Academy Completed! 🎓",
      outro_text: "Congratulations! You have successfully mastered both the theoretical and practical foundations of the decentralized Steem network. You are now fully prepared for your real-world Steem adventure!",
      cert_subtitle: "BLOCKCHAIN GRADUATE CERTIFICATE",
      cert_body: "This document certifies that the user has successfully mastered the Steem technology, passed key security simulations, and understands Proof-of-Brain and Resource Credits management.",
      cert_verified: "BLOCKCHAIN VERIFIED RECORD",
      finish_btn: "Return to Menu"
    }
  };

  const c = t[lang];

  // Set starting raw markdown text based on player's name
  useEffect(() => {
    if (playerName) {
      const startingText = lang === 'ua' 
        ? `Привіт усім!

Про мене
Мене звати @${playerName}, і це мій перший вступний допис у блокчейні Steem!

Я вирішив приєднатися, бо мені подобається ідея вільного та справедливого інтернету.

Криптовалюта — це свобода спілкування. Буду радий знайти тут однодумців!`
        : `Hello everyone!

About me
My name is @${playerName}, and this is my first introductory post on the Steem blockchain!

I decided to join because I love the idea of a free, fair, and decentralized internet.

Cryptocurrency is freedom of speech. I look forward to finding like-minded friends here!`;
      setRawMarkdown(startingText);
    }
  }, [playerName, lang]);

  const keyItems = [
    { id: 'master', label: c.key_master, icon: <Lock className="w-5 h-5" />, color: 'bg-red-500 text-white', type: 'offline', cx: 150, cy: 50 },
    { id: 'owner', label: c.key_owner, icon: <Shield className="w-4 h-4" />, color: 'bg-orange-500 text-white', type: 'offline', cx: 90, cy: 110 },
    { id: 'active', label: c.key_active, icon: <Key className="w-4 h-4" />, color: 'bg-emerald-500 text-white', type: 'wallet', cx: 210, cy: 160 },
    { id: 'posting', label: c.key_posting, icon: <MessageSquare className="w-4 h-4" />, color: 'bg-sky-400 text-slate-900', type: 'browser', cx: 70, cy: 220 },
    { id: 'memo', label: c.key_memo, icon: <FileText className="w-4 h-4" />, color: 'bg-gray-400 text-slate-900', type: 'browser', cx: 230, cy: 250 },
  ];

  const dropzones = [
    { id: 'offline', label: c.dz_safe, accepts: ['master', 'owner'] },
    { id: 'wallet', label: c.dz_wallet, accepts: ['active'] },
    { id: 'browser', label: c.dz_browser, accepts: ['posting', 'memo'] },
  ];

  const handleStartTree = () => {
    if (!playerName.trim()) {
      setErrorMsg(c.error_no_name);
      return;
    }
    setErrorMsg('');
    setLevel(1);
    setTimeout(() => setTreeStage(1), 300);
  };

  const handleKeyClick = (id: string) => {
    if (placedKeys[id]) return;
    setHeldKey(id);
    setErrorMsg('');
  };

  const handleZoneClick = (zoneId: string) => {
    if (!heldKey) return;
    const targetKey = keyItems.find(k => k.id === heldKey);
    if (!targetKey) return;

    if (targetKey.type === zoneId) {
      setPlacedKeys(prev => ({ ...prev, [heldKey]: zoneId }));
      setHeldKey(null);
      setErrorMsg('');
    } else {
      setErrorMsg(c.error_wrong_vault);
    }
  };

  const isL1Complete = Object.keys(placedKeys).length === keyItems.length;

  // Level 3 markdown formatting triggers
  const compileVisualToMarkdown = (data: typeof visualData) => {
    const titleSection = data.title ? `# ${data.title}\n\n` : '';
    const aboutSection = data.aboutMe ? `## ${lang === 'ua' ? 'Про мене' : 'About me'}\n${data.aboutMe}\n\n` : '';
    const hobbySection = data.hobby ? `### ${lang === 'ua' ? 'Мої інтереси та хобі' : 'My interests & hobbies'}\n${data.hobby}\n\n` : '';
    const quoteSection = data.favoriteQuote ? `> ${data.favoriteQuote}\n\n` : '';
    
    let imgSection = '';
    if (data.imageUrl) {
      if (data.centerHtml) {
        imgSection = `<center>\n![Journey Photo](${data.imageUrl})\n${data.subTextHtml ? `<sub>${lang === 'ua' ? 'Фото моєї подорожі у Steem' : 'My journey photo in Steem'}</sub>\n` : ''}</center>\n\n`;
      } else {
        imgSection = `![Journey Photo](${data.imageUrl})\n\n`;
      }
    }

    let tableSection = '';
    if (data.tableRows && data.tableRows.length > 0) {
      tableSection = `| ${lang === 'ua' ? 'День' : 'Day'} | ${lang === 'ua' ? 'Запланована дія у Steem' : 'Planned action in Steem'} |\n`;
      tableSection += `| --- | --- |\n`;
      data.tableRows.forEach(row => {
        tableSection += `| ${row.day} | ${row.action} |\n`;
      });
    }

    return `${titleSection}${aboutSection}${hobbySection}${quoteSection}${imgSection}${tableSection}`;
  };

  // Sync visual inputs to raw Markdown
  useEffect(() => {
    if (editorMode === 'visual') {
      setRawMarkdown(compileVisualToMarkdown(visualData));
    }
  }, [visualData, editorMode, lang]);

  // Dynamic quest task checker
  useEffect(() => {
    if (!rawMarkdown) return;
    const hasHeading = /##\s+.+/.test(rawMarkdown);
    const hasBold = /\*\*[^*]+\*\*/.test(rawMarkdown);
    const hasQuote = />\s+.+/.test(rawMarkdown);
    const hasTable = /\|.+\|/.test(rawMarkdown) && rawMarkdown.includes('---');
    const hasImage = (rawMarkdown.includes('<center>') && rawMarkdown.includes('![')) || /<img/i.test(rawMarkdown) || /!\[.*\]\(.*\)/.test(rawMarkdown);

    setMarkdownTasks({
      heading: hasHeading,
      bold: hasBold,
      blockquote: hasQuote,
      table: hasTable,
      image: hasImage
    });
  }, [rawMarkdown]);

  const applyHeading = () => {
    setRawMarkdown(prev => {
      if (prev.includes("## Про мене") || prev.includes("## About me")) return prev;
      return prev.replace("Про мене\n", "## Про мене\n").replace("About me\n", "## About me\n");
    });
  };

  const applyBold = () => {
    setRawMarkdown(prev => {
      if (prev.includes("**Steem**")) return prev;
      return prev.replace(/Steem/g, "**Steem**");
    });
  };

  const applyQuote = () => {
    setRawMarkdown(prev => {
      const searchUa = "Криптовалюта — це свобода спілкування.";
      const searchEn = "Cryptocurrency is freedom of speech.";
      if (prev.includes(`> ${searchUa}`) || prev.includes(`> ${searchEn}`)) return prev;
      return prev
        .replace(searchUa, `> ${searchUa}`)
        .replace(searchEn, `> ${searchEn}`);
    });
  };

  const applyTable = () => {
    setRawMarkdown(prev => {
      const tableStr = lang === 'ua'
        ? `\n\n| День | Моя ціль у Steem |\n| --- | --- |\n| Понеділок | Створити вступний допис |\n| Середа | Проголосувати за авторів |\n| П'ятниця | Зробити Power Up |`
        : `\n\n| Day | My goal on Steem |\n| --- | --- |\n| Monday | Write introduction post |\n| Wednesday | Upvote original creators |\n| Friday | Do a Power Up |`;
      if (prev.includes("| Day |") || prev.includes("| День |")) return prev;
      return prev + tableStr;
    });
  };

  const applyImage = () => {
    setRawMarkdown(prev => {
      const imgStr = `\n\n<center>\n![Steem Rocket](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400)\n<sub>${lang === 'ua' ? 'Мій старт у всесвіт Steem!' : 'My start in the Steem universe!'}</sub>\n</center>`;
      if (prev.includes('<center>') && prev.includes('![')) return prev;
      return prev + imgStr;
    });
  };

  const isL3Complete = markdownTasks.heading && markdownTasks.bold && markdownTasks.blockquote && markdownTasks.table && markdownTasks.image;

  // Level 4 math & click handlers
  // Ensure weight is locked at 100% if SP < 500
  useEffect(() => {
    if (steemPower < 500) {
      setUpvoteWeight(100);
    }
  }, [steemPower]);

  const upvoteValue = (steemPower * (upvoteWeight / 100) * 0.000005).toFixed(4);

  const handleUpvotePost = (postId: string) => {
    if (postId === 'A') {
      setUpvotedA(true);
      setPobFeedback(c.l4_upvoted_success);
      confetti({ particleCount: 60, spread: 40, origin: { y: 0.8 } });
    } else {
      setPobFeedback(lang === 'ua' ? 'О ні! Це неякісний контент або обман. Чому ви даєте йому гроші? Його треба заблокувати!' : 'Oh no! This is low quality or scam. Why would you give it money? It should be flagged!');
    }
  };

  const handleFlagPost = (postId: string) => {
    if (postId === 'B') {
      setFlaggedB(true);
      setPobFeedback(c.l4_flagged_success);
    } else if (postId === 'C') {
      setFlaggedC(true);
      setPobFeedback(c.l4_flagged_success);
    } else {
      setPobFeedback(lang === 'ua' ? 'Обережно! Навіщо мінусувати корисний та оригінальний пост художника?' : 'Watch out! Why would you flag high quality original art?');
    }
  };

  const isL4Complete = upvotedA && (flaggedB || flaggedC);

  // Level 5 action handler
  // Dynamic resource credit metrics
  const maxRcCapacity = steemPowerBattery * 1000000;
  const postCostCredits = 6000000;
  const commentCostCredits = 2000000;
  const voteCostCredits = 1000000;

  const postCostPercent = Math.min(100, Math.round((postCostCredits / maxRcCapacity) * 1000) / 10);
  const commentCostPercent = Math.min(100, Math.round((commentCostCredits / maxRcCapacity) * 1000) / 10);
  const voteCostPercent = Math.min(100, Math.round((voteCostCredits / maxRcCapacity) * 1000) / 10);

  const allowedPosts = Math.floor(maxRcCapacity / postCostCredits);
  const allowedComments = Math.floor(maxRcCapacity / commentCostCredits);
  const allowedVotes = Math.floor(maxRcCapacity / voteCostCredits);

  const triggerRcAction = (actionName: string, basePercent: number) => {
    setRcError(null);
    // Resource usage scales dynamically with SP
    const currentPercent = actionName.includes('статті') || actionName.includes('comment') && !actionName.includes('комент') && !actionName.includes('Write')
      ? postCostPercent 
      : actionName.includes('комент') || actionName.includes('comment')
        ? commentCostPercent
        : voteCostPercent;

    const scaleFactor = isSupercharged ? 0.1 : 1.0;
    const actualCost = Math.round(currentPercent * scaleFactor * 10) / 10;

    if (rcBattery < actualCost) {
      setRcError(c.l5_err_depleted);
      return;
    }

    setRcBattery(prev => Math.round(Math.max(0, prev - actualCost) * 10) / 10);
    setRcHistory(prev => [
      `${lang === 'ua' ? 'Виконано' : 'Executed'}: ${actionName} (-${actualCost}% RC)`,
      ...prev
    ]);
  };

  const handlePowerUp = () => {
    const amount = parseFloat(powerUpInput);
    if (isNaN(amount) || amount <= 0 || amount > liquidSteem) {
      setRcError(lang === 'ua' ? `⚠️ Будь ласка, введіть коректну суму STEEM (максимум ${liquidSteem} STEEM)!` : `⚠️ Please enter a valid STEEM amount (max ${liquidSteem} STEEM)!`);
      return;
    }

    setLiquidSteem(prev => Math.round((prev - amount) * 100) / 100);
    setSteemPowerBattery(prev => prev + amount);
    setRcBattery(100);
    setRcError(null);
    setIsSupercharged(amount >= 100 || (steemPowerBattery + amount) >= 100);
    setRcHistory(prev => [
      `⚡ POWER UP: ${amount} STEEM -> +${amount} Steem Power`,
      `🔋 ${lang === 'ua' ? 'Акумулятор RC перезаряджено та збільшено ємність!' : 'RC Battery refilled and capacity expanded!'}`,
      ...prev
    ]);
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden glass border border-white/10 flex flex-col bg-[#0f172a]/95 backdrop-blur-3xl shadow-2xl"
    >
      {/* Header bar */}
      <div className="flex bg-black/40 border-b border-white/10 px-6 py-5 items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="p-2.5 bg-steem-blue/10 rounded-xl border border-steem-blue/20">
               <TrendingUp className="w-6 h-6 text-steem-blue" />
            </div>
            <div>
               <h2 className="text-lg md:text-xl font-black text-white">{c.game_title}</h2>
               {playerName && <p className="text-xs text-steem-blue font-bold">@{playerName}</p>}
            </div>
         </div>
         <button onClick={onExit} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-all border border-white/5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
           <ArrowLeft className="w-4 h-4" /> {lang === 'ua' ? 'Вихід' : 'Exit'}
         </button>
      </div>

      <div className="p-6 md:p-10 flex-1 min-h-[620px] flex flex-col justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          
          {/* Level 0: Welcome Desk / Registration */}
          {level === 0 && (
            <motion.div 
              key="l0" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              className="flex flex-col items-center justify-center flex-1 h-full max-w-lg mx-auto w-full py-6"
            >
              <div className="w-full bg-white/5 border border-white/10 p-8 md:p-10 rounded-3xl text-center space-y-6 shadow-2xl backdrop-blur-md">
                <div className="w-20 h-20 bg-steem-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-steem-blue/20">
                  <User className="w-10 h-10 text-steem-blue" />
                </div>
                <h3 className="text-3xl font-black text-white tracking-tight">{c.desk_title}</h3>
                <p className="text-[#cbd5e1] text-md leading-relaxed">{c.desk_welcome}</p>
                
                <div className="space-y-4 pt-2">
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xl">@</span>
                    <input 
                      type="text" 
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value.toLowerCase().replace(/[^a-z0-9.-]/g, ''))}
                      placeholder={c.desk_placeholder}
                      className="w-full pl-10 pr-6 py-4 bg-black/40 border border-white/10 rounded-2xl text-white font-bold text-lg focus:border-steem-blue outline-none transition-all focus:ring-1 focus:ring-steem-blue/30"
                    />
                  </div>
                  {errorMsg && <p className="text-red-400 font-bold text-sm">{errorMsg}</p>}
                  <button 
                    onClick={handleStartTree} 
                    className="w-full px-8 py-4.5 bg-steem-blue text-[#0f172a] rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-steem-blue/20"
                  >
                    {c.btn_plant}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Level 1: Key Tree sorting */}
          {level === 1 && (
            <motion.div key="l1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full flex flex-col items-center">
              <div className="text-center mb-6">
                 <h3 className="text-2xl font-black text-white mb-2">{c.tree_title}</h3>
                 <p className="text-[#cbd5e1] max-w-2xl mx-auto text-sm leading-relaxed">{c.tree_instruction}</p>
              </div>

              {!isL1Complete ? (
                <div className="flex-1 w-full flex flex-col md:flex-row gap-8 items-center justify-center relative">
                  
                  {/* Tree Visualizer */}
                  <div className="relative w-[300px] h-[380px] border border-white/10 bg-gradient-to-b from-[#1e293b]/40 to-black/80 rounded-3xl overflow-hidden flex-shrink-0">
                    {/* The Ground */}
                    <div className="absolute bottom-0 left-0 right-0 h-14 bg-[#0f172a] border-t border-white/5" />
                    
                    {/* Character Avatar */}
                    <motion.div 
                      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <div className="bg-steem-blue/90 px-3 py-1 rounded-full text-[10px] font-bold text-[#0f172a] mb-2 shadow-lg">
                        @{playerName}
                      </div>
                      <div className="relative w-12 h-12 bg-white/10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm">
                        <User className="w-6 h-6 text-white" />
                        {heldKey && (
                          <motion.div 
                            layoutId={`key-${heldKey}`}
                            className={clsx("absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#1e293b] shadow-xl", keyItems.find(k=>k.id === heldKey)?.color)}
                          >
                            {keyItems.find(k=>k.id === heldKey)?.icon}
                          </motion.div>
                        )}
                      </div>
                    </motion.div>

                    {/* SVG Tree Connection lines */}
                    <svg viewBox="0 0 300 400" className="absolute inset-0 z-10 pointer-events-none">
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: treeStage > 0 ? 1 : 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        d="M 150 380 L 150 100"
                        stroke="#0ea5e9"
                        strokeWidth="6"
                        strokeLinecap="round"
                        fill="none"
                        className="opacity-40"
                      />
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: treeStage > 0 ? 1 : 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        d="M 150 100 L 150 50" // Master
                        stroke="#0ea5e9" strokeWidth="3.5" strokeLinecap="round" fill="none" className="opacity-40"
                      />
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: treeStage > 0 ? 1 : 0 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                        d="M 150 140 L 90 110" // Owner
                        stroke="#0ea5e9" strokeWidth="3.5" strokeLinecap="round" fill="none" className="opacity-40"
                      />
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: treeStage > 0 ? 1 : 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        d="M 150 180 L 210 160" // Active
                        stroke="#0ea5e9" strokeWidth="3.5" strokeLinecap="round" fill="none" className="opacity-40"
                      />
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: treeStage > 0 ? 1 : 0 }}
                        transition={{ duration: 0.8, delay: 1.4 }}
                        d="M 150 220 L 70 200" // Posting
                        stroke="#0ea5e9" strokeWidth="3.5" strokeLinecap="round" fill="none" className="opacity-40"
                      />
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: treeStage > 0 ? 1 : 0 }}
                        transition={{ duration: 0.8, delay: 1.6 }}
                        d="M 150 250 L 230 230" // Memo
                        stroke="#0ea5e9" strokeWidth="3.5" strokeLinecap="round" fill="none" className="opacity-40"
                      />
                    </svg>

                    {/* Interactive Keys hanging on the Tree */}
                    {keyItems.map(k => {
                      if (placedKeys[k.id] || heldKey === k.id) return null;
                      return (
                         <motion.button
                           key={k.id}
                           layoutId={`key-${k.id}`}
                           initial={{ scale: 0, opacity: 0 }}
                           animate={{ scale: treeStage > 0 ? 1 : 0, opacity: treeStage > 0 ? 1 : 0 }}
                           transition={{ delay: 1.5 }}
                           onClick={() => handleKeyClick(k.id)}
                           className={clsx(
                             "absolute w-12 h-12 -ml-6 -mt-6 rounded-full flex flex-col items-center justify-center z-30 shadow-2xl cursor-pointer hover:scale-110 active:scale-95 transition-transform border border-black/20",
                             k.color
                           )}
                           style={{ left: k.cx, top: k.cy }}
                         >
                           {k.icon}
                           <span className="absolute -bottom-5.5 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded-md backdrop-blur-sm truncate w-20 text-center font-bold pointer-events-none">
                             {k.label}
                           </span>
                         </motion.button>
                      );
                    })}
                  </div>

                  {/* Vault Dropzones */}
                  <div className="flex flex-col gap-4 w-full md:w-72 z-20">
                    <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1 text-center md:text-left flex items-center gap-2 justify-center md:justify-start">
                      <Shield className="w-3.5 h-3.5 text-steem-blue" />
                      {lang === 'ua' ? 'Оберіть Сховище для Ключа' : 'Select Safe Vault for Key'}
                    </p>
                    
                    {errorMsg && (
                      <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} className="bg-red-500/20 text-red-200 text-xs font-bold p-3 rounded-2xl border border-red-500/30 text-center">
                        {errorMsg}
                      </motion.div>
                    )}

                    {dropzones.map(z => {
                       const placedHere = keyItems.filter(k => placedKeys[k.id] === z.id);
                       const isTarget = heldKey !== null;

                       return (
                         <div 
                            key={z.id}
                            onClick={() => handleZoneClick(z.id)}
                            className={clsx(
                              "p-4 rounded-2xl border-2 border-dashed transition-all cursor-pointer min-h-[95px] flex flex-col justify-center",
                              isTarget ? "border-steem-blue/50 bg-steem-blue/5 hover:bg-steem-blue/10 animate-pulse scale-[1.01]" : "border-white/10 bg-black/20 hover:border-white/20"
                            )}
                         >
                            <p className="text-[11px] font-black text-[#94a3b8] text-center mb-3 uppercase tracking-wider">{z.label}</p>
                            <div className="flex justify-center gap-2 flex-wrap min-h-[28px]">
                               {placedHere.length === 0 ? (
                                 <span className="text-[10px] text-slate-600 font-bold italic mt-1">Empty</span>
                               ) : (
                                 placedHere.map(k => (
                                   <motion.div layoutId={`key-${k.id}`} key={k.id} className={clsx("w-7 h-7 rounded-full flex items-center justify-center shadow-md border border-black/10", k.color)}>
                                      {k.icon}
                                   </motion.div>
                                 ))
                               )}
                            </div>
                         </div>
                       );
                    })}
                  </div>
                </div>
              ) : (
                <motion.div initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} className="text-center space-y-6 max-w-md mx-auto py-8 my-auto">
                   <div className="w-24 h-24 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/20 shadow-xl shadow-emerald-500/5">
                      <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                   </div>
                   <h3 className="text-3xl font-black text-emerald-400 tracking-tight">Success!</h3>
                   <p className="text-[#cbd5e1] text-md leading-relaxed">{c.harvest_success}</p>
                   <button onClick={() => setLevel(2)} className="mt-6 px-10 py-4 bg-steem-blue text-[#0f172a] rounded-xl font-black text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-steem-blue/20 flex items-center justify-center mx-auto gap-2">
                     {c.next_btn} <ArrowRight className="w-5 h-5" />
                   </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Level 2: Alley Scammer */}
          {level === 2 && (
            <motion.div key="l2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-2xl mx-auto py-4">
              {l2State === 'idle' ? (
                <div className="space-y-6">
                   <div className="text-center mb-8">
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-3">{c.l2_title}</h3>
                      <p className="text-[#cbd5e1] text-sm leading-relaxed max-w-lg mx-auto">{c.l2_instruction}</p>
                   </div>
                   
                   <div className="bg-[#5865F2]/5 border border-[#5865F2]/20 p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-2xl backdrop-blur-md">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#5865F2]" />
                      <div className="flex items-start gap-4">
                         <div className="w-12 h-12 rounded-xl bg-[#5865F2] flex items-center justify-center flex-shrink-0 shadow-lg">
                           <Shield className="w-6 h-6 text-white" />
                         </div>
                         <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-white font-black text-md">Steemit Official Support</span>
                              <span className="text-[9px] font-bold bg-[#5865F2]/30 text-white px-1.5 py-0.5 rounded">SYSTEM BOT</span>
                            </div>
                            <p className="text-[#e2e8f0] leading-relaxed text-sm bg-black/30 p-4 rounded-xl border border-white/5 italic font-medium">
                              "{c.l2_message}"
                            </p>
                         </div>
                      </div>
                   </div>

                   <div className="flex flex-col sm:flex-row gap-4 mt-8">
                      <button 
                        onClick={() => setL2State('fail')}
                        className="flex-1 py-4.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-300 rounded-xl font-bold transition-all active:scale-95"
                      >
                        {c.l2_btn_give}
                      </button>
                      <button 
                        onClick={() => {
                          setL2State('success');
                          confetti({ particleCount: 80, spread: 50, origin: { y: 0.8 } });
                        }}
                        className="flex-1 py-4.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 rounded-xl font-bold transition-all active:scale-95 flex justify-center items-center gap-2"
                      >
                         <Shield className="w-5 h-5" /> {c.l2_btn_report}
                      </button>
                   </div>
                </div>
              ) : l2State === 'fail' ? (
                <div className="text-center space-y-6 py-6 max-w-lg mx-auto">
                   <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto border border-red-500/20">
                      <AlertTriangle className="w-10 h-10 text-red-400" />
                   </div>
                   <h3 className="text-2xl font-black text-red-500 uppercase tracking-tight">Hacked!</h3>
                   <p className="text-[#cbd5e1] text-sm leading-relaxed">{c.l2_fail}</p>
                   <button onClick={() => setL2State('idle')} className="px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold transition-all active:scale-95 mt-4">
                     {lang === 'ua' ? 'Спробувати ще раз' : 'Try Again'}
                   </button>
                </div>
              ) : (
                <div className="text-center space-y-6 py-6 max-w-lg mx-auto">
                   <div className="w-20 h-20 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/20">
                      <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                   </div>
                   <h3 className="text-2xl font-black text-emerald-400 tracking-tight">Protected!</h3>
                   <p className="text-[#cbd5e1] text-sm leading-relaxed">{c.l2_success}</p>
                   <button onClick={() => setLevel(3)} className="mt-6 px-10 py-4 bg-steem-blue text-[#0f172a] rounded-xl font-black text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-steem-blue/20 flex items-center justify-center mx-auto gap-2">
                     {c.next_btn} <ArrowRight className="w-5 h-5" />
                   </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Level 3: Markdown Magic */}
          {level === 3 && (
            <motion.div key="l3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full flex flex-col items-center">
              <div className="text-center mb-6">
                 <h3 className="text-2xl font-black text-white mb-1">{c.l3_title}</h3>
                 <p className="text-[#cbd5e1] text-xs md:text-sm max-w-xl mx-auto leading-relaxed">{c.l3_instruction}</p>
              </div>

              {markdownStage === 'editing' ? (
                <div className="w-full space-y-6">
                  {/* Editor Mode Tabs Switcher */}
                  <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/10 w-fit mx-auto gap-1">
                     <button 
                       onClick={() => setEditorMode('markdown')}
                       className={clsx(
                         "px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all",
                         editorMode === 'markdown' ? "bg-steem-blue text-slate-900 shadow-md" : "text-slate-400 hover:text-white"
                       )}
                     >
                        <Code className="w-4 h-4" /> {c.l3_editor_mode_raw}
                     </button>
                     <button 
                       onClick={() => setEditorMode('visual')}
                       className={clsx(
                         "px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all",
                         editorMode === 'visual' ? "bg-steem-blue text-slate-900 shadow-md" : "text-slate-400 hover:text-white"
                       )}
                     >
                        <Eye className="w-4 h-4" /> {c.l3_editor_mode_visual}
                     </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
                    
                    {/* Left Panel: Inputs/Controls */}
                    <div className="lg:col-span-6 space-y-5">
                       
                       {editorMode === 'markdown' ? (
                         // RAW CODE MODE
                         <div className="space-y-4">
                           <div className="bg-black/30 p-5 rounded-2xl border border-white/5 space-y-3">
                              <div className="flex justify-between items-center">
                                 <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Raw Markdown Editor</p>
                                 <span className="text-[10px] text-slate-500 font-mono">{rawMarkdown.length} chars</span>
                              </div>
                              <textarea 
                                value={rawMarkdown}
                                onChange={(e) => setRawMarkdown(e.target.value)}
                                className="w-full h-80 bg-black/40 border border-white/10 rounded-xl p-4 text-xs font-mono text-[#e2e8f0] outline-none focus:border-steem-blue/50 resize-none custom-scrollbar"
                              />
                           </div>

                           {/* Helper Formatting Panel */}
                           <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-3">
                              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">{lang === 'ua' ? 'Швидкі інструменти форматування:' : 'Quick Formatting Tools:'}</p>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                 <button onClick={applyHeading} className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-[10px] font-bold text-left flex items-center gap-1.5 border border-white/5">
                                    <Heading className="w-3.5 h-3.5 text-steem-blue" /> Subtitle (##)
                                 </button>
                                 <button onClick={applyBold} className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-[10px] font-bold text-left flex items-center gap-1.5 border border-white/5">
                                    <Bold className="w-3.5 h-3.5 text-steem-blue" /> Bold (**)
                                 </button>
                                 <button onClick={applyQuote} className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-[10px] font-bold text-left flex items-center gap-1.5 border border-white/5">
                                    <Quote className="w-3.5 h-3.5 text-steem-blue" /> Blockquote (&gt;)
                                 </button>
                                 <button onClick={applyTable} className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-[10px] font-bold text-left flex items-center gap-1.5 border border-white/5">
                                    <Table className="w-3.5 h-3.5 text-steem-blue" /> Add Table (|)
                                 </button>
                                 <button onClick={applyImage} className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-[10px] font-bold text-left flex items-center gap-1.5 border border-white/5 col-span-2 md:col-span-1">
                                    <Image className="w-3.5 h-3.5 text-steem-blue" /> Center Image
                                 </button>
                              </div>
                           </div>
                         </div>
                       ) : (
                         // WYSIWYG VISUAL EDITOR MODE
                         <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-4">
                            <div className="p-3 bg-steem-blue/10 border border-steem-blue/20 rounded-xl">
                               <p className="text-[11px] text-[#e2e8f0] leading-relaxed flex items-start gap-1.5">
                                  <Info className="w-4 h-4 text-steem-blue flex-shrink-0 mt-0.5" />
                                  <span>{c.l3_visual_intro}</span>
                               </p>
                            </div>

                            <div className="space-y-3 text-left">
                               <div>
                                  <label className="text-[10px] font-black uppercase text-slate-400">{c.l3_visual_title}</label>
                                  <input 
                                    type="text" 
                                    value={visualData.title}
                                    onChange={(e) => setVisualData(prev => ({ ...prev, title: e.target.value }))}
                                    placeholder={lang === 'ua' ? "Привіт з крипто-світу!" : "Hello from crypto world!"}
                                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white mt-1 outline-none focus:border-steem-blue"
                                  />
                               </div>

                               <div>
                                  <label className="text-[10px] font-black uppercase text-slate-400">{c.l3_visual_about}</label>
                                  <textarea 
                                    value={visualData.aboutMe}
                                    onChange={(e) => setVisualData(prev => ({ ...prev, aboutMe: e.target.value }))}
                                    placeholder={lang === 'ua' ? "Опишіть себе в кількох реченнях..." : "Describe yourself in a few sentences..."}
                                    className="w-full h-16 px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white mt-1 outline-none focus:border-steem-blue resize-none"
                                  />
                               </div>

                               <div>
                                  <label className="text-[10px] font-black uppercase text-slate-400">{c.l3_visual_hobby}</label>
                                  <input 
                                    type="text" 
                                    value={visualData.hobby}
                                    onChange={(e) => setVisualData(prev => ({ ...prev, hobby: e.target.value }))}
                                    placeholder={lang === 'ua' ? "Я люблю писати про Steem та програмування..." : "I love writing about Steem and coding..."}
                                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white mt-1 outline-none focus:border-steem-blue"
                                  />
                               </div>

                               <div>
                                  <label className="text-[10px] font-black uppercase text-slate-400">{c.l3_visual_quote}</label>
                                  <input 
                                    type="text" 
                                    value={visualData.favoriteQuote}
                                    onChange={(e) => setVisualData(prev => ({ ...prev, favoriteQuote: e.target.value }))}
                                    placeholder={lang === 'ua' ? "Криптовалюта — це свобода спілкування." : "Cryptocurrency is freedom of speech."}
                                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white mt-1 outline-none focus:border-steem-blue"
                                  />
                               </div>

                               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div>
                                     <label className="text-[10px] font-black uppercase text-slate-400">{c.l3_visual_img_label}</label>
                                     <input 
                                       type="text" 
                                       value={visualData.imageUrl}
                                       onChange={(e) => setVisualData(prev => ({ ...prev, imageUrl: e.target.value }))}
                                       className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white mt-1 outline-none focus:border-steem-blue font-mono"
                                     />
                                  </div>
                                  <div className="flex flex-col justify-center gap-1 pt-4 text-xs font-bold text-slate-300">
                                     <label className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                          type="checkbox" 
                                          checked={visualData.centerHtml} 
                                          onChange={(e) => setVisualData(prev => ({ ...prev, centerHtml: e.target.checked }))}
                                          className="accent-steem-blue"
                                        />
                                        <span>HTML Centering (&lt;center&gt;)</span>
                                     </label>
                                     <label className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                          type="checkbox" 
                                          checked={visualData.subTextHtml} 
                                          onChange={(e) => setVisualData(prev => ({ ...prev, subTextHtml: e.target.checked }))}
                                          className="accent-steem-blue"
                                        />
                                        <span>HTML Caption (&lt;sub&gt;)</span>
                                     </label>
                                  </div>
                               </div>

                               <div>
                                  <label className="text-[10px] font-black uppercase text-slate-400">{c.l3_visual_table_label}</label>
                                  <div className="space-y-2 mt-1">
                                     {visualData.tableRows.map((row, index) => (
                                        <div key={index} className="flex gap-2 items-center">
                                           <span className="text-[10px] font-mono text-slate-500 w-28 shrink-0">{row.day}:</span>
                                           <input 
                                             type="text" 
                                             value={row.action}
                                             onChange={(e) => {
                                                const updatedRows = [...visualData.tableRows];
                                                updatedRows[index].action = e.target.value;
                                                setVisualData(prev => ({ ...prev, tableRows: updatedRows }));
                                             }}
                                             className="w-full px-2.5 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs text-white outline-none focus:border-steem-blue"
                                           />
                                        </div>
                                     ))}
                                  </div>
                               </div>
                            </div>
                         </div>
                       )}

                    </div>

                    {/* Right Panel: Live Preview & Task Checklist */}
                    <div className="lg:col-span-6 space-y-5">
                       
                       {/* Live Render Preview */}
                       <div className="flex flex-col h-[340px] bg-black/30 border border-white/5 rounded-2xl overflow-hidden shadow-inner">
                         <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Live Preview / Попередній Перегляд</span>
                            <div className="flex gap-1">
                               <div className="w-2 h-2 rounded-full bg-red-500/50" />
                               <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                               <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                            </div>
                         </div>
                         <div className="p-6 overflow-y-auto custom-scrollbar flex-1 prose prose-invert prose-sm text-left max-w-none">
                            <ReactMarkdown>{rawMarkdown}</ReactMarkdown>
                         </div>
                       </div>

                       {/* Task Checklist Status */}
                       <div className="bg-[#1e293b]/40 border border-white/5 p-4 rounded-2xl space-y-3">
                          <p className="text-xs font-black uppercase tracking-wider text-steem-blue">{lang === 'ua' ? 'Чекліст виконання завдань:' : 'Task Checklist Progress:'}</p>
                          <div className="grid grid-cols-2 gap-2">
                             
                             <div className={clsx("flex items-center gap-2 p-2 rounded-xl text-xs transition-all", markdownTasks.heading ? "bg-emerald-500/10 text-emerald-300" : "bg-white/5 text-slate-400")}>
                                <div className="p-1 rounded-full bg-black/20">
                                   {markdownTasks.heading ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <div className="w-3.5 h-3.5" />}
                                </div>
                                <span className="font-bold">{c.l3_task_header}</span>
                             </div>

                             <div className={clsx("flex items-center gap-2 p-2 rounded-xl text-xs transition-all", markdownTasks.bold ? "bg-emerald-500/10 text-emerald-300" : "bg-white/5 text-slate-400")}>
                                <div className="p-1 rounded-full bg-black/20">
                                   {markdownTasks.bold ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <div className="w-3.5 h-3.5" />}
                                </div>
                                <span className="font-bold">{c.l3_task_bold}</span>
                             </div>

                             <div className={clsx("flex items-center gap-2 p-2 rounded-xl text-xs transition-all", markdownTasks.blockquote ? "bg-emerald-500/10 text-emerald-300" : "bg-white/5 text-slate-400")}>
                                <div className="p-1 rounded-full bg-black/20">
                                   {markdownTasks.blockquote ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <div className="w-3.5 h-3.5" />}
                                </div>
                                <span className="font-bold">{c.l3_task_quote}</span>
                             </div>

                             <div className={clsx("flex items-center gap-2 p-2 rounded-xl text-xs transition-all", markdownTasks.table ? "bg-emerald-500/10 text-emerald-300" : "bg-white/5 text-slate-400")}>
                                <div className="p-1 rounded-full bg-black/20">
                                   {markdownTasks.table ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <div className="w-3.5 h-3.5" />}
                                </div>
                                <span className="font-bold">{c.l3_task_table}</span>
                             </div>

                             <div className={clsx("flex items-center gap-2 p-2 rounded-xl text-xs transition-all", markdownTasks.image ? "bg-emerald-500/10 text-emerald-300" : "bg-white/5 text-slate-400", "col-span-2")}>
                                <div className="p-1 rounded-full bg-black/20">
                                   {markdownTasks.image ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <div className="w-3.5 h-3.5" />}
                                </div>
                                <span className="font-bold">{c.l3_task_image}</span>
                             </div>

                          </div>

                          <div className="text-[10px] text-slate-400 leading-relaxed italic bg-black/20 p-2.5 rounded-xl border border-white/5 mt-2">
                             {c.l3_explain_html}
                          </div>
                       </div>

                       {/* Publish Button */}
                       <button
                         onClick={() => {
                           setMarkdownStage('published');
                           confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
                         }}
                         disabled={!isL3Complete}
                         className="w-full py-4 bg-steem-blue disabled:opacity-30 disabled:pointer-events-none text-slate-900 rounded-xl font-black text-sm uppercase tracking-wider shadow-lg hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
                       >
                         <FileText className="w-4 h-4" /> {c.l3_publish}
                       </button>

                    </div>

                  </div>
                </div>
              ) : (
                <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="text-center space-y-6 max-w-lg mx-auto py-8">
                   <div className="w-20 h-20 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/20">
                      <Award className="w-10 h-10 text-emerald-400" />
                   </div>
                   <h3 className="text-2xl font-black text-emerald-400">{c.l3_published_title}</h3>
                   <p className="text-slate-300 text-sm">{c.l3_success_msg}</p>

                   <div className="p-5 bg-white/5 rounded-2xl border border-white/10 text-left font-mono text-[11px] max-h-40 overflow-auto scrollbar-thin">
                      <span className="text-emerald-400">blockchain_broadcast_success:</span>
                      <pre className="text-slate-400 mt-2 whitespace-pre-wrap">{JSON.stringify({
                        author: playerName,
                        permlink: "my-first-post",
                        parent_permlink: "steemit",
                        timestamp: new Date().toISOString()
                      }, null, 2)}</pre>
                   </div>

                   <button onClick={() => setLevel(4)} className="mt-6 px-10 py-4 bg-steem-blue text-[#0f172a] rounded-xl font-black text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-steem-blue/20 flex items-center justify-center mx-auto gap-2">
                     {c.next_btn} <ArrowRight className="w-5 h-5" />
                   </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Level 4: Proof of Brain (Curation voting) */}
          {level === 4 && (
            <motion.div key="l4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full flex flex-col items-center">
              <div className="text-center mb-6">
                 <h3 className="text-2xl font-black text-white mb-1">{c.l4_title}</h3>
                 <p className="text-[#cbd5e1] text-xs md:text-sm max-w-xl mx-auto leading-relaxed">{c.l4_instruction}</p>
              </div>

              {/* SP & Voting Weight Sliders */}
              <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 space-y-5 text-left">
                 {/* Steem Power Slider */}
                 <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-white">
                       <span className="flex items-center gap-1.5"><Sliders className="w-4 h-4 text-steem-blue" /> {c.l4_sp_slider}</span>
                       <span className="text-steem-blue text-sm font-black bg-steem-blue/10 px-2.5 py-1 rounded-lg border border-steem-blue/20">{steemPower.toLocaleString()} SP</span>
                    </div>
                    <input 
                      type="range" 
                      min={10} 
                      max={100000} 
                      step={100}
                      value={steemPower} 
                      onChange={(e) => setSteemPower(Number(e.target.value))}
                      className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-steem-blue"
                    />
                 </div>

                 {/* Voting Weight Slider */}
                 <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex justify-between items-center text-xs font-bold text-white">
                       <span className="flex items-center gap-1.5">
                          {steemPower < 500 ? <Lock className="w-4 h-4 text-red-400" /> : <Unlock className="w-4 h-4 text-emerald-400" />}
                          {c.l4_weight_label}
                       </span>
                       <span className={clsx("text-xs font-black px-2.5 py-1 rounded-lg border", steemPower < 500 ? "text-slate-500 bg-white/5 border-white/10" : "text-emerald-400 bg-emerald-500/10 border-emerald-500/20")}>
                          {upvoteWeight}%
                       </span>
                    </div>
                    <input 
                      type="range" 
                      min={1} 
                      max={100} 
                      step={1}
                      value={upvoteWeight} 
                      disabled={steemPower < 500}
                      onChange={(e) => setUpvoteWeight(Number(e.target.value))}
                      className={clsx(
                        "w-full h-2 rounded-lg appearance-none cursor-pointer accent-steem-blue",
                        steemPower < 500 ? "bg-white/5 cursor-not-allowed opacity-40" : "bg-black/40"
                      )}
                    />
                    
                    {/* Locked vs Unlocked explain text */}
                    <p className="text-[10.5px] leading-relaxed font-medium mt-1.5">
                       {steemPower < 500 ? (
                          <span className="text-amber-400">{c.l4_locked_weight_info}</span>
                       ) : (
                          <span className="text-emerald-400">{c.l4_unlocked_weight_info}</span>
                       )}
                    </p>
                 </div>

                 {/* Upvote Value display */}
                 <div className="flex justify-between items-center pt-3 border-t border-white/5 text-xs">
                    <span className="text-slate-400 font-bold">{c.l4_upvote_value}</span>
                    <span className="text-emerald-400 font-black text-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-xl shadow-lg">${upvoteValue}</span>
                 </div>

                 <div className="p-3.5 bg-black/20 rounded-xl border border-white/5 text-[10px] text-slate-400 leading-relaxed">
                    {c.l4_curation_payout_explain}
                  </div>
               </div>

              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{c.l4_task_desc}</p>

              {/* Feed simulation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                 
                 {/* Post A (Original Content) */}
                 <div className={clsx("p-5 rounded-2xl border flex flex-col justify-between backdrop-blur-sm transition-all", upvotedA ? "bg-emerald-500/5 border-emerald-500/30 ring-1 ring-emerald-500/15" : "bg-white/5 border-white/10")}>
                    <div className="space-y-3">
                       <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 text-[10px] font-bold">A</div>
                          <span className="text-[10px] font-bold text-slate-400">@creative_artist</span>
                       </div>
                       <h4 className="text-xs font-black text-white">{c.l4_post_a_title}</h4>
                       <p className="text-[11px] text-slate-300 leading-relaxed">{c.l4_post_a_desc}</p>
                    </div>
                    <div className="flex gap-2 mt-4 pt-3 border-t border-white/5">
                       <button 
                         onClick={() => handleUpvotePost('A')}
                         className={clsx("flex-1 py-2 text-[10px] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5", upvotedA ? "bg-emerald-500 text-white" : "bg-white/5 text-slate-300 hover:bg-white/10")}
                       >
                         <ThumbsUp className="w-3 h-3" /> Upvote
                       </button>
                       <button 
                         onClick={() => handleFlagPost('A')}
                         className="px-2.5 py-2 text-[10px] bg-white/5 text-slate-400 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-all"
                       >
                         Flag
                       </button>
                    </div>
                 </div>

                 {/* Post B (Spam) */}
                 <div className={clsx("p-5 rounded-2xl border flex flex-col justify-between backdrop-blur-sm transition-all", flaggedB ? "bg-red-500/5 border-red-500/30" : "bg-white/5 border-white/10")}>
                    <div className="space-y-3">
                       <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 text-[10px] font-bold">S</div>
                          <span className="text-[10px] font-bold text-slate-400">@scam_bot</span>
                       </div>
                       <h4 className="text-xs font-black text-white">{c.l4_post_b_title}</h4>
                       <p className="text-[11px] text-slate-300 leading-relaxed">{c.l4_post_b_desc}</p>
                    </div>
                    <div className="flex gap-2 mt-4 pt-3 border-t border-white/5">
                       <button 
                         onClick={() => handleUpvotePost('B')}
                         className="flex-1 py-2 text-[10px] bg-white/5 text-slate-300 rounded-lg hover:bg-emerald-500/10 hover:text-emerald-400 transition-all"
                       >
                         Upvote
                       </button>
                       <button 
                         onClick={() => handleFlagPost('B')}
                         className={clsx("px-4 py-2 text-[10px] font-bold rounded-lg transition-all flex items-center justify-center gap-1", flaggedB ? "bg-red-500 text-white" : "bg-white/5 text-slate-300 hover:bg-red-500/20 hover:text-red-300")}
                       >
                         {flaggedB ? <Check className="w-3 h-3" /> : 'Flag'}
                       </button>
                    </div>
                 </div>

                 {/* Post C (Plagiarism) */}
                 <div className={clsx("p-5 rounded-2xl border flex flex-col justify-between backdrop-blur-sm transition-all", flaggedC ? "bg-red-500/5 border-red-500/30" : "bg-white/5 border-white/10")}>
                    <div className="space-y-3">
                       <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-400 text-[10px] font-bold">C</div>
                          <span className="text-[10px] font-bold text-slate-400">@copy_cat</span>
                       </div>
                       <h4 className="text-xs font-black text-white">{c.l4_post_c_title}</h4>
                       <p className="text-[11px] text-slate-300 leading-relaxed">{c.l4_post_c_desc}</p>
                    </div>
                    <div className="flex gap-2 mt-4 pt-3 border-t border-white/5">
                       <button 
                         onClick={() => handleUpvotePost('C')}
                         className="flex-1 py-2 text-[10px] bg-white/5 text-slate-300 rounded-lg hover:bg-emerald-500/10 hover:text-emerald-400 transition-all"
                       >
                         Upvote
                       </button>
                       <button 
                         onClick={() => handleFlagPost('C')}
                         className={clsx("px-4 py-2 text-[10px] font-bold rounded-lg transition-all flex items-center justify-center gap-1", flaggedC ? "bg-red-500 text-white" : "bg-white/5 text-slate-300 hover:bg-red-500/20 hover:text-red-300")}
                       >
                         {flaggedC ? <Check className="w-3 h-3" /> : 'Flag'}
                       </button>
                    </div>
                 </div>

              </div>

              {pobFeedback && (
                <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10 text-xs text-slate-200 max-w-xl text-center leading-relaxed">
                   {pobFeedback}
                </motion.div>
              )}

              {isL4Complete && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 text-center space-y-4">
                   <p className="text-xs font-bold text-emerald-400">{c.l4_next_unlocked}</p>
                   <button onClick={() => setLevel(5)} className="px-10 py-4 bg-steem-blue text-[#0f172a] rounded-xl font-black text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-steem-blue/20 flex items-center justify-center mx-auto gap-2">
                     {c.next_btn} <ArrowRight className="w-5 h-5" />
                   </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Level 5: RC Battery */}
          {level === 5 && (
            <motion.div key="l5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full flex flex-col items-center">
              <div className="text-center mb-6">
                 <h3 className="text-2xl font-black text-white mb-1">{c.l5_title}</h3>
                 <p className="text-[#cbd5e1] text-xs md:text-sm max-w-xl mx-auto leading-relaxed">{c.l5_instruction}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
                 
                 {/* Left Column: RC Status & Controls */}
                 <div className="lg:col-span-5 space-y-5">
                    <div className="bg-white/5 border border-white/10 p-5 rounded-3xl space-y-5">
                       {/* RC Battery Gauge */}
                       <div className="space-y-2">
                          <div className="flex justify-between text-xs font-bold text-white">
                             <span className="flex items-center gap-1.5"><Battery className="w-4 h-4 text-steem-blue" /> {c.l5_battery_label}</span>
                             <span className={clsx("font-black", rcBattery > 50 ? "text-emerald-400" : rcBattery > 20 ? "text-amber-400" : "text-red-400")}>{rcBattery}%</span>
                          </div>
                          <div className="w-full h-6 bg-black/40 rounded-full p-1 border border-white/5 overflow-hidden">
                             <motion.div 
                               initial={{ width: '85%' }}
                               animate={{ width: `${rcBattery}%` }}
                               className={clsx("h-full rounded-full transition-all duration-300", isSupercharged ? "bg-gradient-to-r from-purple-500 to-cyan-400 shadow-[0_0_15px_#a855f7]" : rcBattery > 50 ? "bg-emerald-500" : rcBattery > 20 ? "bg-amber-500" : "bg-red-500")}
                             />
                          </div>
                       </div>

                       {/* Acc Details */}
                       <div className="grid grid-cols-2 gap-3 pt-2">
                          <div className="p-3 bg-black/20 rounded-xl border border-white/5 text-center">
                             <p className="text-[9px] font-black uppercase text-slate-500">{c.l5_sp_label}</p>
                             <p className="text-sm font-black text-white">{steemPowerBattery} SP</p>
                          </div>
                          <div className="p-3 bg-black/20 rounded-xl border border-white/5 text-center">
                             <p className="text-[9px] font-black uppercase text-slate-500">{c.l5_wallet_label}</p>
                             <p className="text-sm font-black text-amber-500">{liquidSteem} STEEM</p>
                          </div>
                       </div>
                    </div>

                    {/* Action buttons */}
                    <div className="space-y-2">
                       <button 
                         onClick={() => triggerRcAction(lang === 'ua' ? 'Публікація статті' : 'Article comment', 40)}
                         className="w-full p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold text-xs transition-all active:scale-95 text-left flex justify-between items-center"
                       >
                         <span>{c.l5_action_post}</span>
                         <Zap className="w-4 h-4 text-steem-blue" />
                       </button>

                       <button 
                         onClick={() => triggerRcAction(lang === 'ua' ? 'Написання коментаря' : 'Write comment', 15)}
                         className="w-full p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold text-xs transition-all active:scale-95 text-left flex justify-between items-center"
                       >
                         <span>{c.l5_action_comment}</span>
                         <MessageSquare className="w-4 h-4 text-slate-400" />
                       </button>

                       <button 
                         onClick={() => triggerRcAction(lang === 'ua' ? 'Голосування' : 'Upvote post', 10)}
                         className="w-full p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold text-xs transition-all active:scale-95 text-left flex justify-between items-center"
                       >
                         <span>{c.l5_action_vote}</span>
                         <ThumbsUp className="w-4 h-4 text-slate-400" />
                       </button>
                    </div>

                 </div>

                 {/* Right Column: Console/Power Up */}
                 <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                    {/* Error display */}
                    {rcError && (
                      <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-xs font-bold text-red-300 leading-relaxed text-center">
                         {rcError}
                      </motion.div>
                    )}

                    {/* Supercharged Success Info */}
                    {isSupercharged && (
                      <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-xs font-bold text-purple-300 leading-relaxed text-center">
                         {c.l5_supercharged_msg}
                      </motion.div>
                    )}

                    {/* Power up instructions and action console */}
                    <div className="bg-gradient-to-br from-[#1e293b]/40 to-black/40 border border-white/5 rounded-3xl p-6 space-y-4">
                       <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5"><Info className="w-4 h-4 text-steem-blue" /> {lang === 'ua' ? 'Консоль Керування Силою' : 'Power Management Console'}</h4>
                       <p className="text-[11px] text-slate-300 leading-relaxed">{c.l5_powerup_desc}</p>
                       
                       {/* Numeric Input Field with MAX button */}
                       <div className="space-y-1.5 text-left">
                          <label className="text-[10px] font-black uppercase text-slate-500">{lang === 'ua' ? 'Сума для Power Up (STEEM):' : 'Power Up Amount (STEEM):'}</label>
                          <div className="relative">
                             <input 
                               type="number"
                               min="1"
                               max={liquidSteem}
                               step="any"
                               value={powerUpInput}
                               onChange={(e) => setPowerUpInput(e.target.value)}
                               placeholder={lang === 'ua' ? "Введіть суму..." : "Enter amount..."}
                               className="w-full pl-4 pr-16 py-3 bg-black/40 border border-white/10 rounded-xl text-white font-mono text-sm focus:border-purple-500 outline-none transition-all"
                             />
                             <button 
                               onClick={() => setPowerUpInput(liquidSteem.toString())}
                               className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all"
                             >
                                Max
                             </button>
                          </div>
                       </div>

                       <button
                         onClick={handlePowerUp}
                         disabled={liquidSteem === 0}
                         className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-black text-sm rounded-xl uppercase tracking-wider transition-all disabled:opacity-30 disabled:pointer-events-none active:scale-95 shadow-lg shadow-purple-500/20"
                       >
                         {c.l5_btn_powerup}
                       </button>
                    </div>

                    {/* Transaction logs */}
                    <div className="bg-black/40 border border-white/5 rounded-3xl p-5 h-40 overflow-y-auto custom-scrollbar space-y-2 text-left">
                       <p className="text-[9px] font-black uppercase tracking-wider text-slate-500">{c.l5_history_title}</p>
                       {rcHistory.length === 0 ? (
                         <span className="text-[10px] text-slate-600 italic font-bold">No transactions broadcast yet</span>
                       ) : (
                         rcHistory.map((h, i) => (
                           <div key={i} className="text-[10px] font-mono text-slate-400 flex items-start gap-1">
                             <ChevronRight className="w-3.5 h-3.5 text-slate-600 mt-0.5 flex-shrink-0" />
                             <span>{h}</span>
                           </div>
                         ))
                       )}
                    </div>

                 </div>

              </div>

              {isSupercharged && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-8">
                   <button onClick={() => setLevel(6)} className="px-12 py-4 bg-steem-blue text-[#0f172a] rounded-xl font-black text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-steem-blue/20 flex items-center justify-center mx-auto gap-2">
                     {c.next_btn} <ArrowRight className="w-5 h-5" />
                   </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Level 6: Outro & Certificate */}
          {level === 6 && (
            <motion.div key="l6" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl mx-auto py-4 flex flex-col items-center justify-center">
              <div className="text-center space-y-6 max-w-lg mx-auto mb-8">
                 <div className="text-7xl">🎓</div>
                 <h3 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-steem-blue to-purple-400">
                   {c.outro_title}
                 </h3>
                 <p className="text-[#cbd5e1] text-sm leading-relaxed">{c.outro_text}</p>
              </div>

              {/* Frosted glass certificate */}
              <div className="w-full bg-gradient-to-br from-white/5 to-white/10 rounded-3xl p-6 md:p-8 border border-white/15 shadow-2xl relative overflow-hidden backdrop-blur-xl max-w-xl text-center space-y-6 select-none">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-steem-blue/10 blur-[40px] rounded-full pointer-events-none" />
                 <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-[40px] rounded-full pointer-events-none" />

                 <div className="border border-white/10 p-6 rounded-2xl relative space-y-6">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">{c.cert_subtitle}</p>
                    
                    <div className="space-y-2">
                       <p className="text-xs text-slate-500 font-bold">{lang === 'ua' ? 'Видано для' : 'Awarded to'}</p>
                       <h4 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300">@{playerName}</h4>
                    </div>

                    <p className="text-xs text-[#cbd5e1] leading-relaxed max-w-sm mx-auto font-medium">
                       {c.cert_body}
                    </p>

                    <div className="flex justify-between items-center pt-6 border-t border-white/10 text-[9px] font-bold text-slate-500">
                       <span>DATE: {new Date().toLocaleDateString()}</span>
                       <span className="flex items-center gap-1.5 text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> {c.cert_verified}</span>
                    </div>
                 </div>
              </div>

              <button 
                onClick={onExit} 
                className="mt-8 px-12 py-4 bg-steem-blue text-[#0f172a] rounded-xl font-black text-xl hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(56,189,248,0.3)] transition-all active:scale-95 shadow-xl shadow-steem-blue/20"
              >
                {c.finish_btn}
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
}
