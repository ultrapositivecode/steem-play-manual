export const MOCK_KEYS = {
  posting: "5Jeb9Abc123Def456Ghi789Jkl012Mno345Pqr678Stu901Vwx",
  active: "5KmqXyz987Wvu654Tsr321Qpo098Nml765Kji432Hgf109Edc",
  owner: "5HzoPqr456Stu789Vwx012Yza345Bcd678Efg901Hij234Klm",
  memo: "5JvkLmn123Opq456Rst789Uvw012Xyz345Abc678Def901Ghi"
};

export const TRAINING_STORY = {
  ua: [
    {
      id: "posting",
      title: "Місія 1: Створення сигналу",
      scenario: "Ви написали чудовий пост про свою подорож. Який ключ використати, щоб безпечно відправити його в блокчейн?",
      hint: "Цей ключ використовується для щоденної соціальної активності.",
      correctId: "posting",
      success: "Чудово! Ви використали Posting Key. Тепер ваш голос почує весь світ."
    },
    {
      id: "active",
      title: "Місія 2: Нагороди та Гаманець",
      scenario: "Ви отримали перші нагороди в токенах STEEM. Тепер ви хочете відправити частину другу на день народження. Який ключ знадобиться?",
      hint: "Цей ключ керує вашими фінансами та гаманцем.",
      correctId: "active",
      success: "Точно! Active Key дозволяє керувати токенами та робити перекази."
    },
    {
      id: "owner",
      title: "Місія 3: Останній Рубіж",
      scenario: "Ви запідозрили, що хтось дізнався ваші паролі. Вам потрібно ТЕРМІНОВО змінити всі налаштування безпеки. Який найпотужніший ключ ви дістанете з сейфу?",
      hint: "Цей ключ — це 'Пароль від Паролів'. Його ніколи не вводять для постів чи лайків.",
      correctId: "owner",
      success: "Бінго! Owner Key — це ваш останній захист для повного контролю над акаунтом."
    }
  ],
  en: [
    {
      id: "posting",
      title: "Mission 1: Signal Creation",
      scenario: "You've written a great post about your trip. Which key should you use to safely broadcast it to the blockchain?",
      hint: "This key is used for daily social activities.",
      correctId: "posting",
      success: "Great! You used the Posting Key. Now the whole world will hear your voice."
    },
    {
      id: "active",
      title: "Mission 2: Rewards & Wallet",
      scenario: "You've received your first rewards in STEEM tokens. Now you want to send part of it to a friend for their birthday. Which key will you need?",
      hint: "This key manages your finances and wallet.",
      correctId: "active",
      success: "Exactly! The Active Key allows you to manage tokens and make transfers."
    },
    {
      id: "owner",
      title: "Mission 3: The Final Frontier",
      scenario: "You suspect someone found out your passwords. You need to URGENTLY change all security settings. Which most powerful key will you take from the safe?",
      hint: "This key is the 'Password of Passwords'. It is never entered for simple posts or likes.",
      correctId: "owner",
      success: "Bingo! The Owner Key is your ultimate protection for full account control."
    }
  ]
};

export const ECOSYSTEM_INTERACTIVES = {
  ua: [
    {
      id: "master_password",
      title: "Дерево Ключів (Master) 🌳",
      description: "Звідки беруться всі ключі і що таке Master Password. Секрет їхньої ієрархії.",
      type: "simulation",
      content: "Master Password — це корінь всього. З нього математично створюються всі інші ключі. Його місце — у сейфі!"
    },
    {
      id: "keychain",
      title: "Steem Keychain 🛡️",
      description: "Навчання: від встановлення до складних підписів транзакцій.",
      type: "simulation",
      content: "Keychain — це ваш міст між браузером та блокчейном. Ви один раз додаєте ключі в розширення, а потім лише підтверджуєте дії. Сайт ніколи не бачить ваших ключів, він бачить лише 'цифровий відбиток' вашого підпису."
    },
    {
      id: "transfer",
      title: "Переказ (P2P) 💸",
      description: "Як відправити STEEM другу. Потрібен лише нікнейм!",
      type: "simulation",
      content: "У Steem ваш нікнейм — це номер вашого рахунку. Ніяких довгих кодів гаманців (якщо це не біржа)."
    },
    {
      id: "exchange",
      title: "Біржа <-> Гаманець 🏦",
      description: "Як завести та вивести кошти. Роль Memo та безпека.",
      type: "simulation",
      content: "Депозит на біржу: Потрібен нікнейм біржі (н-ад: @binance-hot) + ваше унікальне Memo. Вивід з біржі: Ви вказуєте свій нікнейм. Якщо біржа просить 'Memo', для особистого гаманця воно зазвичай не обов'язкове, але інколи там вказують ваш Публічний Memo Ключ для ідентифікації або шифрування повідомлень."
    },
    {
      id: "public_keys",
      title: "Публічні Ключі 📢",
      description: "Навіщо вони, якщо ми користуємось приватними?",
      type: "simulation",
      content: "Приватний ключ — це ваша рука, що ставить підпис. Публічний ключ — це зразок вашого підпису на стенді банку, щоб всі могли перевірити, що це справді ви."
    },
    {
      id: "blogging",
      title: "Блогінг та Нагороди ✍️",
      description: "Як контент стає грошима. Правило 7 днів та Power Up.",
      type: "simulation",
      content: "Steem — це система 'Доказу Мозку' (Proof-of-Brain). Ви публікуєте пост, і протягом 7 днів спільнота може за нього голосувати. Через 7 днів нагороди виплачуються: 50% автору, 50% тим, хто голосував (кураторам)."
    }
  ],
  en: [
    {
      id: "master_password",
      title: "Tree of Keys (Master) 🌳",
      description: "Where all keys come from and what the Master Password is. The secret of their hierarchy.",
      type: "simulation",
      content: "The Master Password is the root of everything. All other keys are mathematically derived from it. Its place is in a safe!"
    },
    {
      id: "keychain",
      title: "Steem Keychain 🛡️",
      description: "The safest way: an extension that keeps your keys encrypted.",
      type: "simulation",
      content: "Keychain acts as a shield. You never enter Posting/Active keys directly onto websites. When a transaction needs signing, Keychain pops up as a confirmation window."
    },
    {
      id: "transfer",
      title: "Transfer (P2P) 💸",
      description: "How to send STEEM to a friend. All you need is a nickname!",
      type: "simulation",
      content: "In Steem, your nickname is your account number. No long wallet codes (unless it's an exchange)."
    },
    {
      id: "exchange",
      title: "Exchange <-> Wallet 🏦",
      description: "How to deposit and withdraw. The role of Memo and security.",
      type: "simulation",
      content: "Deposit to exchange: Needs exchange nickname (e.g., @binance-hot) + your unique Memo. Withdraw from exchange: You specify your nickname. If the exchange asks for 'Memo', it's usually not required for a personal wallet, but sometimes your Public Memo Key is used for identification or message encryption."
    },
    {
      id: "public_keys",
      title: "Public Keys 📢",
      description: "Why do they exist if we use private ones?",
      type: "simulation",
      content: "A private key is your hand signing a document. A public key is a sample of your signature on a bank board, so everyone can verify it's really you."
    },
    {
      id: "blogging",
      title: "Blog & Rewards ✍️",
      description: "How content turns into money. The 7-day rule and Power Up.",
      type: "simulation",
      content: "Steem is a 'Proof-of-Brain' system. You publish a post, and for 7 days the community can vote on it. After 7 days, rewards are paid out: 50% to the author, 50% to those who voted (curators)."
    }
  ]
};

export const FUNNY_NICKNAMES = {
  ua: {
    "bot": "Роботи теж люди, але цей бот виглядає підозріло... 🤖",
    "scammer": "Ой-ой! Здається, ви намагаєтесь нагодувати вовка. Може краще купити піцу? 🍕",
    "justin_sun": "Ви серйозно хочете віддати гроші Джастіну? Він і так непогано справляється! 😅",
    "null": "Відправити гроші в ніщо? Це як викинути гаманець у чорну діру. 🕳️",
    "alice": "Аліса в Дивокраї? Спочатку перевірте, чи вона не білий кролик! 🐇"
  },
  en: {
    "bot": "Robots are people too, but this bot looks suspicious... 🤖",
    "scammer": "Uh-oh! Looks like you're trying to feed the wolf. Maybe buy a pizza instead? 🍕",
    "justin_sun": "Are you serious about giving money to Justin? He's doing fine already! 😅",
    "null": "Sending money to null? That's like throwing your wallet into a black hole. 🕳️",
    "alice": "Alice in Wonderland? Check if she's not a white rabbit first! 🐇"
  }
};

export const KEYCHAIN_SIM_DATA = {
  ua: {
    setup: {
      title: "Крок 1: Налаштування Keychain",
      info: "Спочатку встановіть ПІН-код для самого розширення (це не ключ блокчейну, це захист доступу до Keychain) та додайте свої ключі.",
      fields: [
        { id: "pin", label: "Створити ПІН-код", placeholder: "Наприклад: 12345678", type: "password" },
        { id: "username", label: "Нікнейм акаунту", placeholder: "Ваш нікнейм у Steem", type: "text" },
        { id: "posting", label: "Приватний Posting Key", placeholder: "5J...", type: "password" },
        { id: "active", label: "Приватний Active Key", placeholder: "5K...", type: "password" }
      ]
    },
    request: {
      title: "Крок 2: Взаємодія з сайтом",
      info: "Тепер ви на сайті. Ви лише вводите свій нікнейм, а Keychain сам 'підхоплює' запит на підпис.",
      actions: [
        { 
          id: "login", 
          label: "Вхід (Login Signature)", 
          details: "Сайт просить підтвердити особу за допомогою Posting Key.",
          json: {
            "method": "signBuffer",
            "message": "Login to Steemit: 1713364400",
            "key_type": "Posting"
          }
        },
        { 
          id: "post", 
          label: "Допис (Post Broadcast)", 
          details: "Ви надсилаєте статтю в блокчейн. Keychain покаже метадані.",
          json: {
            "method": "broadcast",
            "operations": [["comment", {
              "parent_author": "",
              "parent_permlink": "steem",
              "author": "user",
              "permlink": "my-cool-post",
              "title": "Мій крутий допис",
              "body": "Текст про Steem...",
              "json_metadata": "{\"tags\":[\"steem\"]}"
            }]]
          }
        },
        { 
          id: "transfer", 
          label: "Переказ (Transfer)", 
          details: "Вимагає Active Key для підпису фінансової операції.",
          json: {
            "method": "transfer",
            "from": "user",
            "to": "exchange",
            "amount": "100.000 STEEM",
            "memo": "105654321"
          }
        }
      ]
    }
  },
  en: {
    setup: {
      title: "Step 1: Keychain Setup",
      info: "First, set a PIN for the extension itself (this is not a blockchain key, it's for local access) and add your keys.",
      fields: [
        { id: "pin", label: "Create PIN-code", placeholder: "e.g., 12345678", type: "password" },
        { id: "username", label: "Account Username", placeholder: "Your Steem nickname", type: "text" },
        { id: "posting", label: "Private Posting Key", placeholder: "5J...", type: "password" },
        { id: "active", label: "Private Active Key", placeholder: "5K...", type: "password" }
      ]
    },
    request: {
      title: "Step 2: Website Interaction",
      info: "Now you're on a website. You just enter your username, and Keychain handles the signature request.",
      actions: [
        { 
          id: "login", 
          label: "Login (Signature)", 
          details: "Website asks to verify identity using Posting Key.",
          json: {
            "method": "signBuffer",
            "message": "Login to Steemit: 1713364400",
            "key_type": "Posting"
          }
        },
        { 
          id: "post", 
          label: "Post (Broadcast)", 
          details: "Broadcasting an article. Keychain will show metadata.",
          json: {
            "method": "broadcast",
            "operations": [["comment", {
              "parent_author": "",
              "parent_permlink": "steem",
              "author": "user",
              "permlink": "my-cool-post",
              "title": "My cool post",
              "body": "Text about Steem...",
              "json_metadata": "{\"tags\":[\"steem\"]}"
            }]]
          }
        },
        { 
          id: "transfer", 
          label: "Transfer", 
          details: "Requires Active Key to sign professional transaction.",
          json: {
            "method": "transfer",
            "from": "user",
            "to": "exchange",
            "amount": "100.000 STEEM",
            "memo": "105654321"
          }
        }
      ]
    }
  }
};

export const CONTENT_UA = `
### Про проєкт STEEMIT

**STEEMIT** - це **децентралізована** соціальна мережа на блокчейні Steem. Вона була запущена у 2016 році і стала першою платформою, яка почала винагороджувати користувачів криптовалютою за створення та оцінювання контенту.

#### Ключові особливості:
- **Відсутність єдиного центру:** Ваші дані записуються в блокчейн.
- **Стійкість до цензури:** Знищити пост у блокчейні майже неможливо (хоча інтерфейси можуть приховувати певний контент).
- **Монетизація:** Ви отримуєте реальні винагороди (токени), які можна обміняти на інші криптовалюти або фіатні гроші.

___

# STEEMIT - ПОСІБНИК ДЛЯ НОВАЧКІВ

**Ласкаво просимо до Steemit!**

Steemit змінює правила гри у соціальних мережах. Замість того, щоб корпорації заробляли мільярди на вашій увазі та контенті, у Steemit економіка працює на вас. Це система "Доказу Мозку" (Proof-of-Brain).

### Безпека вашого акаунту (НАЙВАЖЛИВІШЕ!)

На відміну від традиційних сайтів, тут **немає кнопки "Відновити пароль"**. Якщо ви втратите свої ключі, ви назавжди втратите доступ до акаунту та коштів.

1. **Master Password (Майстер-пароль)**: Найголовніший пароль (Seed), з якого математично генеруються всі інші ключі. **Ніколи не використовуйте його для щоденного входу!** Запишіть його на папері, збережіть на флешці або у надійному менеджері паролів і сховайте.
2. **Posting Key (Ключ публікації)**: Ваш основний ключ для роботи. Дозволяє публікувати пости, ставити лайки, коментувати, робити репости та підписуватися. Використовуйте тільки його для входу на Steemit.com.
3. **Active Key (Активний ключ)**: Ваш "фінансовий" ключ. Потрібен для переказів коштів, обміну токенів на внутрішній біржі, переведення Steem в Steem Power (Power Up) та оновлення даних профілю.
4. **Owner Key (Ключ власника)**: Ключ найвищого рівня. Використовується **виключно** для зміни інших ключів або відновлення контролю, якщо ваш акаунт зламали. Надійно сховайте його разом з Master Password.
5. **Memo Key (Ключ нотаток)**: Використовується рідко, переважно для шифрування та розшифровки приватних повідомлень, що передаються у блокчейні.

**Рекомендація:** Використовуйте розширення **Steem Keychain** для браузера. Це найбезпечніший спосіб взаємодії з блокчейном без ризику крадіжки ключів фішинговими сайтами.

### Економіка та Токени (Що у вашому гаманці?)

Steem має три основні токени:

* **STEEM**: Базова ліквідна криптовалюта. Її можна вільно купувати, продавати, переказувати іншим користувачам або виводити на біржі (наприклад, Binance, Huobi, Poloniex). Її також можна "заморозити", перетворивши на Steem Power.
* **STEEM POWER (SP)**: Ваша "акція" та сила впливу на платформі. Чим більше у вас SP, тим "важчий" ваш лайк (він приносить більше грошей автору) і тим більше ви заробляєте як куратор. SP не можна одразу вивести. Щоб перетворити SP назад на ліквідний STEEM, потрібно запустити процес **Power Down**, який триває 4 тижні (по 25% щотижня).
* **SBD (Steem Backed Dollars)**: Токен, що створювався з прив'язкою до $1 USD. Використовується для спрощення торгівлі та виплат.

### Як працюють винагороди?

Створюючи пости або коментуючи, ви маєте 7 днів на збір голосів (лайків). 
- Через 7 днів виплати фіксуються.
- Нагорода ділиться: приблизно **50% отримує автор**, і **50% — куратори** (ті, хто проголосував за пост).
- Ваша авторська нагорода зазвичай виплачується у пропорції: 50% у вигляді Steem Power і 50% у вигляді SBD (або STEEM, залежно від економічної ситуації в блокчейні).
- **Важливо:** Не плагіатьте! Спільнота активно бореться з крадіжкою контенту за допомогою даунвоутів (флагів). Пишіть оригінальні тексти та вказуйте джерела фотографій.

### Resource Credits (RC) або "Батарейка"

Користування Steem є безкоштовним, тобто немає комісій за транзакції. Проте, щоб уникнути спаму, існує система сумісності "Resource Credits". Кожна дія (пост, коментар, підписка) витрачає RC. RC відновлюється з часом. Чим більше у вас Steem Power, тим більший ваш ліміт RC. Якщо ви новачок, не спамте коментарями в перший день, інакше ваші RC швидко вичерпаються.

### Поради для ефективного старту:
- **Зробіть пост-знайомство**: Використайте тег \`#introduceyourself\`. Розкажіть хто ви, чим захоплюєтесь, додайте фото з листочком "Steemit + дата". Такі пости часто підтримує спільнота.
- **Взаємодійте**: Пишіть розгорнуті коментарі під постами інших авторів. Це найкращий спосіб знайти читачів.
- **Використовуйте правильні теги**: Перший тег є основною категорією (не можна змінити після публікації). Можна використовувати до 8 тегів.
- **Оформлення**: Використовуйте мову розмітки Markdown, щоб робити пости красиво оформленими — жирний шрифт, заголовки, списки, вирівнювання картинок.

Успіхів у світі Steemit!
`;

export const CONTENT_EN = `
### About STEEMIT project

**STEEMIT** is a **decentralized** social network on the Steem blockchain. Launched in 2016, it became the first platform to reward users with cryptocurrency for creating and curating content.

#### Key Features:
- **No central authority:** Your data is written to the blockchain.
- **Censorship resistance:** It is almost impossible to destroy a post on the blockchain (although front-end interfaces may hide certain content).
- **Monetization:** You receive real rewards (tokens) that can be exchanged for other cryptocurrencies or fiat money.

___

# STEEMIT - A GUIDE FOR NEWCOMERS

**Welcome to Steemit!**

Steemit is changing the rules of the game in social networks. Instead of corporations making billions from your attention and content, the economy works for you on Steemit. It is a "Proof-of-Brain" system.

### Account Security (MOST IMPORTANT!)

Unlike traditional sites, there is **no "Reset Password" button** here. If you lose your keys, you permanently lose access to your account and funds.

1. **Master Password**: The main password (Seed) from which all other keys are mathematically generated. **Never use it for daily login!** Write it down on paper, save it on a flash drive or in a secure password manager, and hide it.
2. **Posting Key**: Your main working key. Allows you to publish posts, upvote, comment, resteem, and follow. Use only this key to log into Steemit.com.
3. **Active Key**: Your "financial" key. Required for transferring funds, exchanging tokens on the internal market, converting Steem to Steem Power (Power Up), and updating profile data.
4. **Owner Key**: The highest level key. Used **exclusively** to change other keys or recover control if your account is compromised. Hide it securely along with the Master Password.
5. **Memo Key**: Rarely used, mostly for encrypting and decrypting private messages sent on the blockchain.

**Recommendation:** Use the **Steem Keychain** browser extension. It is the safest way to interact with the blockchain without the risk of your keys being stolen by phishing sites.

### Economy and Tokens (What's in your wallet?)

Steem has three main tokens:

* **STEEM**: The base liquid cryptocurrency. It can be freely bought, sold, transferred to other users, or withdrawn to exchanges (like Binance, Huobi, Poloniex). It can also be "frozen" by converting it into Steem Power.
* **STEEM POWER (SP)**: Your "shares" and influence on the platform. The more SP you have, the "heavier" your upvote is (it brings more money to the author) and the more you earn as a curator. SP cannot be withdrawn immediately. To convert SP back to liquid STEEM, you need to initiate a **Power Down** process, which takes 4 weeks (25% per week).
* **SBD (Steem Backed Dollars)**: A token originally designed to be pegged to $1 USD. Used to simplify trading and payouts.

### How do rewards work?

When creating posts or commenting, you have 7 days to collect votes (upvotes). 
- After 7 days, the payouts are finalized.
- The reward is split: approximately **50% goes to the author**, and **50% to the curators** (those who voted for the post).
- Your author reward is usually paid out in a ratio: 50% in Steem Power and 50% in SBD (or STEEM, depending on the economic situation in the blockchain).
- **Important:** Do not plagiarize! The community actively fights content theft using downvotes (flags). Write original texts and cite image sources.

### Resource Credits (RC) or "Battery"

Using Steem is free, meaning there are no transaction fees. However, to prevent spam, a system called "Resource Credits" exists. Every action (post, comment, follow) consumes RC. RC regenerates over time. The more Steem Power you have, the higher your RC limit. If you are a newcomer, don't spam comments on the first day, otherwise, your RC will deplete quickly.

### Tips for an effective start:
- **Make an introduction post**: Use the \`#introduceyourself\` tag. Tell who you are, your hobbies, and add a photo holding a piece of paper with "Steemit + date". The community often supports such posts.
- **Interact**: Write detailed comments under other authors' posts. This is the best way to find readers.
- **Use the right tags**: The first tag is the main category (cannot be changed after publishing). You can use up to 8 tags.
- **Formatting**: Use Markdown to make your posts beautifully formatted — bold text, headings, lists, image alignment.

Good luck in the world of Steemit!
`;
