// ─── Chinese (Mandarin) Course Content: Beginner → Advanced ────────────────
// IDs start at 9200+ to avoid collisions.
// Check id 9201 to detect if already loaded.

import type { Deck, Quiz, Note, Goal } from './tsxCourseContent';
export type { Deck, Quiz, Note, Goal };

const NOW = new Date().toISOString();

// ── FLASHCARD DECKS ────────────────────────────────────────────────────────
export const ZH_DECKS: Deck[] = [
  {
    id: 9201, name: '🟢 Chinese — HSK 1 Core Vocabulary (75 words)', createdAt: NOW,
    cards: [
      { id: 92011, front: '你好 (nǐ hǎo)', back: 'Hello / Hi\n[polite greeting]', status: 'new' },
      { id: 92012, front: '谢谢 (xiè xiè)', back: 'Thank you', status: 'new' },
      { id: 92013, front: '不客气 (bù kè qi)', back: 'You\'re welcome / Don\'t mention it', status: 'new' },
      { id: 92014, front: '对不起 (duì bu qǐ)', back: 'Sorry / I\'m sorry', status: 'new' },
      { id: 92015, front: '没关系 (méi guān xi)', back: 'It\'s OK / Never mind / No problem', status: 'new' },
      { id: 92016, front: '再见 (zài jiàn)', back: 'Goodbye / See you', status: 'new' },
      { id: 92017, front: '我 (wǒ)', back: 'I / Me', status: 'new' },
      { id: 92018, front: '你 (nǐ)', back: 'You (singular)', status: 'new' },
      { id: 92019, front: '他 / 她 (tā)', back: 'He / She (same pronunciation, different characters)\n他 = he   她 = she', status: 'new' },
      { id: 92020, front: '我们 (wǒ men)', back: 'We / Us', status: 'new' },
      { id: 92021, front: '你们 (nǐ men)', back: 'You (plural)', status: 'new' },
      { id: 92022, front: '他们 / 她们 (tā men)', back: 'They / Them\n他们 = they (mixed/male)   她们 = they (all female)', status: 'new' },
      { id: 92023, front: '是 (shì)', back: 'To be (am / is / are)\n"我是学生。" — I am a student.', status: 'new' },
      { id: 92024, front: '不是 (bù shì)', back: 'Am not / Is not / Are not\n"他不是老师。" — He is not a teacher.', status: 'new' },
      { id: 92025, front: '有 (yǒu)', back: 'To have / There is\n"我有一本书。" — I have a book.\n"桌上有水。" — There is water on the table.', status: 'new' },
      { id: 92026, front: '没有 (méi yǒu)', back: 'Don\'t have / There is no\n"我没有钱。" — I don\'t have money.', status: 'new' },
      { id: 92027, front: '好 (hǎo)', back: 'Good / Well / Fine\n"你好吗？" — How are you?\n"很好！" — Very good!', status: 'new' },
      { id: 92028, front: '很 (hěn)', back: 'Very (intensifier)\n"我很高兴。" — I am very happy.\n⚠️ Often used before adjectives even without emphasis.', status: 'new' },
      { id: 92029, front: '大 / 小 (dà / xiǎo)', back: '大 = big / large\n小 = small / little\n"大学" = university (big learning)\n"小心" = be careful (small heart)', status: 'new' },
      { id: 92030, front: '多 / 少 (duō / shǎo)', back: '多 = many / much / a lot\n少 = few / little\n"多少？" = How much? How many?\n"不多不少" = just right', status: 'new' },
      { id: 92031, front: '今天 / 明天 / 昨天 (jīn tiān / míng tiān / zuó tiān)', back: '今天 = today\n明天 = tomorrow\n昨天 = yesterday', status: 'new' },
      { id: 92032, front: '现在 / 以前 / 以后 (xiàn zài / yǐ qián / yǐ hòu)', back: '现在 = now\n以前 = before / in the past\n以后 = after / in the future', status: 'new' },
      { id: 92033, front: '来 / 去 (lái / qù)', back: '来 = to come (towards speaker)\n去 = to go (away from speaker)\n"你来吗？" — Are you coming?\n"我去学校。" — I go to school.', status: 'new' },
      { id: 92034, front: '吃 / 喝 (chī / hē)', back: '吃 = to eat\n喝 = to drink\n"你吃了吗？" — Have you eaten? (common greeting)\n"我喝水。" — I drink water.', status: 'new' },
      { id: 92035, front: '喜欢 / 不喜欢 (xǐ huān / bù xǐ huān)', back: '喜欢 = to like\n不喜欢 = to not like\n"我喜欢中文。" — I like Chinese.', status: 'new' },
      { id: 92036, front: '想 / 要 (xiǎng / yào)', back: '想 = want to / think / miss\n要 = want / need / will\n"我想去北京。" — I want to go to Beijing.\n"我要一杯水。" — I want a glass of water.', status: 'new' },
      { id: 92037, front: '可以 / 不可以 (kě yǐ / bù kě yǐ)', back: '可以 = can / may / it\'s OK\n不可以 = cannot / not allowed\n"我可以进来吗？" — May I come in?', status: 'new' },
      { id: 92038, front: '哪儿 / 哪里 (nǎr / nǎ lǐ)', back: 'Where?\n哪儿 = where (Northern/Beijing style)\n哪里 = where (Southern/standard)\n"你在哪儿？" — Where are you?', status: 'new' },
      { id: 92039, front: '什么 / 谁 / 怎么 / 为什么', back: '什么 (shén me) = what\n谁 (shuí) = who\n怎么 (zěn me) = how\n为什么 (wèi shén me) = why\n哪 (nǎ) = which', status: 'new' },
      { id: 92040, front: '一 二 三 四 五 六 七 八 九 十', back: '1=yī  2=èr  3=sān  4=sì  5=wǔ\n6=liù  7=qī  8=bā  9=jiǔ  10=shí\n100=一百 (yī bǎi)\n1000=一千 (yī qiān)', status: 'new' },
    ],
  },
  {
    id: 9202, name: '🟡 Chinese — HSK 2 Key Vocabulary', createdAt: NOW,
    cards: [
      { id: 92051, front: '但是 / 可是 (dàn shì / kě shì)', back: 'But / However\n"我想去，但是我很忙。"\nI want to go, but I\'m very busy.', status: 'new' },
      { id: 92052, front: '因为 / 所以 (yīn wèi / suǒ yǐ)', back: 'Because / So / Therefore\n"因为下雨，所以我不去了。"\nBecause it\'s raining, I\'m not going.', status: 'new' },
      { id: 92053, front: '如果 / 那么 (rú guǒ / nà me)', back: 'If / Then\n"如果你来，那么我很高兴。"\nIf you come, then I\'ll be very happy.', status: 'new' },
      { id: 92054, front: '虽然 / 但是 (suī rán / dàn shì)', back: 'Although / But\n"虽然很贵，但是很好吃。"\nAlthough it\'s expensive, it\'s delicious.', status: 'new' },
      { id: 92055, front: '已经 (yǐ jīng)', back: 'Already\n"我已经吃了。" — I have already eaten.\n"他已经走了。" — He has already left.', status: 'new' },
      { id: 92056, front: '还 (hái)', back: 'Still / Also / Yet\n"我还在学习。" — I am still studying.\n"还有呢。" — And also... / There is more.', status: 'new' },
      { id: 92057, front: '一起 (yī qǐ)', back: 'Together\n"我们一起去吧！" — Let\'s go together!\n"一起学习。" — Study together.', status: 'new' },
      { id: 92058, front: '觉得 (jué de)', back: 'To feel / to think / to believe (opinion)\n"我觉得这很有趣。" — I think this is interesting.\n"你觉得怎么样？" — What do you think?', status: 'new' },
      { id: 92059, front: '知道 / 不知道 (zhī dào / bù zhī dào)', back: '知道 = to know (a fact)\n"我不知道。" — I don\'t know.\n"你知道吗？" — Do you know?\n⚠️ 认识 (rèn shi) = to know a person', status: 'new' },
      { id: 92060, front: '帮 / 帮助 (bāng / bāng zhù)', back: 'To help\n"你可以帮我吗？" — Can you help me?\n"谢谢你的帮助！" — Thank you for your help!', status: 'new' },
      { id: 92061, front: '准备 (zhǔn bèi)', back: 'To prepare / ready\n"我在准备考试。" — I am preparing for the exam.\n"准备好了吗？" — Are you ready?', status: 'new' },
      { id: 92062, front: '问题 (wèn tí)', back: 'Question / Problem\n"有问题吗？" — Any questions?\n"没问题！" — No problem!\n"这是个大问题。" — This is a big problem.', status: 'new' },
      { id: 92063, front: '时候 / 时间 (shí hòu / shí jiān)', back: '时候 = a point in time / "when"\n"什么时候？" — When?\n\n时间 = time (as a quantity)\n"我没有时间。" — I don\'t have time.', status: 'new' },
      { id: 92064, front: '地方 / 地点 (dì fāng / dì diǎn)', back: '地方 = place (general)\n"这个地方很漂亮。" — This place is beautiful.\n\n地点 = location / venue (specific)\n"会议地点是哪里？" — Where is the meeting venue?', status: 'new' },
      { id: 92065, front: '事情 / 事 (shì qíng / shì)', back: 'Matter / Thing / Affair\n"有什么事吗？" — What\'s the matter? / Is something wrong?\n"这件事很重要。" — This matter is very important.', status: 'new' },
    ],
  },
  {
    id: 9203, name: '🟡 Chinese — Measure Words (量词)', createdAt: NOW,
    cards: [
      { id: 92071, front: '个 (gè)', back: 'The most common/default measure word.\nPeople, many objects.\n一个人 (one person)\n一个问题 (one question)\n一个苹果 (one apple)', status: 'new' },
      { id: 92072, front: '本 (běn)', back: 'For books, magazines, dictionaries.\n一本书 = one book\n两本杂志 = two magazines\n三本词典 = three dictionaries', status: 'new' },
      { id: 92073, front: '张 (zhāng)', back: 'For flat objects: paper, tickets, maps, photos, tables, faces.\n一张纸 = one piece of paper\n一张票 = one ticket\n一张照片 = one photo', status: 'new' },
      { id: 92074, front: '杯 (bēi)', back: 'For cups/glasses of liquid.\n一杯水 = a glass of water\n一杯咖啡 = a cup of coffee\n两杯茶 = two cups of tea', status: 'new' },
      { id: 92075, front: '瓶 (píng)', back: 'For bottles.\n一瓶水 = a bottle of water\n一瓶啤酒 = a bottle of beer', status: 'new' },
      { id: 92076, front: '件 (jiàn)', back: 'For clothing (upper body) and matters/affairs.\n一件衬衫 = one shirt\n一件事 = one matter/affair', status: 'new' },
      { id: 92077, front: '条 (tiáo)', back: 'Long, flexible things: roads, rivers, fish, pants, news.\n一条鱼 = one fish\n一条裤子 = one pair of trousers\n一条消息 = one piece of news', status: 'new' },
      { id: 92078, front: '只 (zhī)', back: 'For small animals, one of a pair.\n一只猫 = one cat\n一只鸟 = one bird\n一只手 = one hand', status: 'new' },
      { id: 92079, front: '位 (wèi)', back: 'Polite measure word for people (shows respect).\n一位老师 = one teacher (respectful)\n一位客人 = one guest', status: 'new' },
      { id: 92080, front: '次 (cì)', back: 'For times/occurrences (how many times).\n一次 = one time / once\n第一次 = the first time\n很多次 = many times', status: 'new' },
    ],
  },
  {
    id: 9204, name: '🔴 Chinese — Grammar Patterns (句型)', createdAt: NOW,
    cards: [
      { id: 92091, front: '是...的 (shì...de) pattern', back: 'Emphasises time, place, or manner of a completed action.\n"你是什么时候来的？" — When did you come?\n"我是坐飞机来的。" — I came by plane.\n"他是在北京出生的。" — He was born in Beijing.', status: 'new' },
      { id: 92092, front: '把 (bǎ) sentence pattern', back: 'Places the object BEFORE the verb. Used when verb has a result/effect on the object.\n"我把作业做完了。" — I finished the homework. (lit: I [took] the homework [and] did-finish)\n\nStructure: Subject + 把 + Object + Verb + Result/Complement', status: 'new' },
      { id: 92093, front: '被 (bèi) — passive structure', back: 'Like "by" in English passives. Used when something unpleasant happens.\n"我的手机被偷了。" — My phone was stolen.\n"作业被老师改了。" — The homework was corrected by the teacher.\n\nStructure: Subject + 被 + (Agent) + Verb + Result', status: 'new' },
      { id: 92094, front: '比 (bǐ) — comparison', back: 'A is more [adj] than B.\n"他比我高。" — He is taller than me.\n"今天比昨天冷。" — Today is colder than yesterday.\n\n⚠️ For "as...as": 一样 (yī yàng)\n"他跟我一样高。" — He is as tall as me.', status: 'new' },
      { id: 92095, front: '越来越 (yuè lái yuè) — getting more and more', back: 'Structure: 越来越 + adj/verb\n"我的中文越来越好。" — My Chinese is getting better and better.\n"天气越来越热。" — The weather is getting hotter and hotter.', status: 'new' },
      { id: 92096, front: 'Verb + 了 (le) — completed action', back: '了 after a verb signals a completed action.\n"我吃了。" — I ate. / I have eaten.\n"他走了。" — He left. / He has left.\n\n⚠️ 了 at end of sentence = change of state\n"我懂了！" — Now I understand! (I didn\'t before)', status: 'new' },
      { id: 92097, front: 'Verb + 过 (guò) — past experience', back: '过 signals you have had this experience at some point.\n"我去过日本。" — I have been to Japan (before).\n"你吃过北京烤鸭吗？" — Have you ever eaten Peking duck?\n\n⚠️ 了 = completed action; 过 = life experience', status: 'new' },
      { id: 92098, front: 'Verb + 着 (zhe) — ongoing state', back: '着 shows a continuing state or action in progress.\n"她笑着说话。" — She spoke smilingly. (while smiling)\n"门开着。" — The door is open. (in an open state)\n"他穿着红色的衣服。" — He is wearing red clothes.', status: 'new' },
      { id: 92099, front: 'Resultative complements (结果补语)', back: 'Verb + result added directly after:\n做完 (zuò wán) = finish doing\n写好 (xiě hǎo) = write well / finish writing\n听懂 (tīng dǒng) = understand by listening\n看见 (kàn jiàn) = see (successfully)\n\n"我听懂了。" — I understood (what I heard).\n"你做完了吗？" — Have you finished?', status: 'new' },
      { id: 92100, front: '一...就... (yī...jiù...) — as soon as', back: 'As soon as / Once ... then ...\n"我一到家就吃饭。" — As soon as I get home, I eat.\n"他一看书就睡着。" — He falls asleep as soon as he reads.\n\nStructure: 一 + Verb1, 就 + Verb2', status: 'new' },
    ],
  },
];

// ── QUIZZES ────────────────────────────────────────────────────────────────
export const ZH_QUIZZES: Quiz[] = [
  {
    id: 9211, name: '🟢 Chinese — HSK 1 Beginner Quiz', createdAt: NOW,
    questions: [
      { id: 1, text: 'How do you say "Thank you" in Chinese?',
        correctId: 2, explanation: '谢谢 (xiè xiè) means thank you. 你好 means hello, 再见 means goodbye, 对不起 means sorry.',
        options: [{ id: 1, text: '你好 (nǐ hǎo)' }, { id: 2, text: '谢谢 (xiè xiè)' }, { id: 3, text: '再见 (zài jiàn)' }, { id: 4, text: '对不起 (duì bu qǐ)' }] },
      { id: 2, text: 'What does 没有 (méi yǒu) mean?',
        correctId: 3, explanation: '没有 means "don\'t have" or "there is no". 有 means "have/there is", 可以 means "can/may", 不是 means "is not".',
        options: [{ id: 1, text: 'To have' }, { id: 2, text: 'Can / May' }, { id: 3, text: 'Don\'t have / There is no' }, { id: 4, text: 'Is not' }] },
      { id: 3, text: 'Which sentence means "I am a student"?',
        correctId: 1, explanation: '我是学生 = I am a student. 是 (shì) is the verb "to be". 我 = I, 学生 = student.',
        options: [{ id: 1, text: '我是学生。' }, { id: 2, text: '学生是我。' }, { id: 3, text: '我有学生。' }, { id: 4, text: '学生我是。' }] },
      { id: 4, text: 'What is the correct order of tones for 你好 (nǐ hǎo)?',
        correctId: 2, explanation: '你 (nǐ) is 3rd tone (dip-rise), 好 (hǎo) is also 3rd tone. When two 3rd tones are together, the first becomes 2nd tone in speech.',
        options: [{ id: 1, text: '1st tone + 2nd tone' }, { id: 2, text: '3rd tone + 3rd tone' }, { id: 3, text: '2nd tone + 4th tone' }, { id: 4, text: '4th tone + 1st tone' }] },
      { id: 5, text: '多少 (duō shǎo) means:',
        correctId: 4, explanation: '多少 literally means "many-few" and is used to ask "how much" or "how many". It\'s used for prices and quantities.',
        options: [{ id: 1, text: 'Why?' }, { id: 2, text: 'Where?' }, { id: 3, text: 'When?' }, { id: 4, text: 'How much? / How many?' }] },
      { id: 6, text: 'Which measure word is used for books?',
        correctId: 3, explanation: '本 (běn) is the measure word for books, magazines, and dictionaries. 个 is general, 张 is for flat things, 条 is for long flexible things.',
        options: [{ id: 1, text: '个 (gè)' }, { id: 2, text: '张 (zhāng)' }, { id: 3, text: '本 (běn)' }, { id: 4, text: '条 (tiáo)' }] },
    ],
  },
  {
    id: 9212, name: '🟡 Chinese — Tones & Grammar Quiz', createdAt: NOW,
    questions: [
      { id: 1, text: 'What is the 4th tone in Mandarin?',
        correctId: 2, explanation: 'The 4th tone (ˋ) falls sharply from high to low — like saying "no!" firmly. e.g. 是 shì (to be), 去 qù (to go).',
        options: [{ id: 1, text: 'High and flat' }, { id: 2, text: 'Falling sharply from high to low' }, { id: 3, text: 'Rising from low to high' }, { id: 4, text: 'Dip then rise' }] },
      { id: 2, text: 'What does 了 (le) after a verb indicate?',
        correctId: 1, explanation: '了 after a verb signals a completed action, similar to past tense. "我吃了" = I ate / I have eaten.',
        options: [{ id: 1, text: 'Completed action' }, { id: 2, text: 'Ongoing/continuing action' }, { id: 3, text: 'Past experience' }, { id: 4, text: 'Future plan' }] },
      { id: 3, text: 'What does 过 (guò) after a verb indicate?',
        correctId: 3, explanation: '过 indicates a past experience at some point in your life, like "have ever...". 我去过日本 = I have been to Japan (at least once in my life).',
        options: [{ id: 1, text: 'Completed action' }, { id: 2, text: 'Ongoing state' }, { id: 3, text: 'Past life experience (have ever...)' }, { id: 4, text: 'A wish or desire' }] },
      { id: 4, text: '"他比我高" means:',
        correctId: 4, explanation: '比 is the comparison word. Subject + 比 + comparison + adjective = "Subject is more [adj] than comparison". So 他比我高 = He is taller than me.',
        options: [{ id: 1, text: 'He and I are both tall.' }, { id: 2, text: 'I am taller than him.' }, { id: 3, text: 'He is as tall as me.' }, { id: 4, text: 'He is taller than me.' }] },
      { id: 5, text: 'Which sentence uses 把 (bǎ) correctly?',
        correctId: 2, explanation: '把 places the specific object before the verb and requires a result/complement. 我把作业做完了 = I completed the homework (took it and did it to completion).',
        options: [{ id: 1, text: '我把吃饭了。' }, { id: 2, text: '我把作业做完了。' }, { id: 3, text: '他把很高兴。' }, { id: 4, text: '你把去哪里？' }] },
      { id: 6, text: 'What does "越来越好" mean?',
        correctId: 3, explanation: '越来越 + adjective means "more and more [adjective]". 越来越好 = getting better and better.',
        options: [{ id: 1, text: 'As good as before' }, { id: 2, text: 'Not as good as before' }, { id: 3, text: 'Getting better and better' }, { id: 4, text: 'Good enough' }] },
    ],
  },
  {
    id: 9213, name: '🔴 Chinese — Advanced Patterns Quiz', createdAt: NOW,
    questions: [
      { id: 1, text: '"我的手机被偷了" — what structure is this?',
        correctId: 2, explanation: '被 (bèi) is the passive marker in Chinese. This sentence means "My phone was stolen." 被 is commonly used for unpleasant events.',
        options: [{ id: 1, text: '把 (bǎ) structure' }, { id: 2, text: '被 (bèi) passive structure' }, { id: 3, text: '是...的 emphasis structure' }, { id: 4, text: '一...就... structure' }] },
      { id: 2, text: 'In "我是坐飞机来的", what does the 是...的 structure emphasise?',
        correctId: 3, explanation: '是...的 is used to emphasise the means, time, or place of a past action. Here it emphasises HOW (by plane) the speaker came.',
        options: [{ id: 1, text: 'That the action is ongoing' }, { id: 2, text: 'That the speaker will travel' }, { id: 3, text: 'How the speaker came (by plane)' }, { id: 4, text: 'That the speaker has never flown' }] },
      { id: 3, text: 'What does "听懂" (tīng dǒng) mean?',
        correctId: 4, explanation: '听 = to listen, 懂 = to understand. Together as a resultative complement: to understand by listening. "我听懂了" = I understood what I heard.',
        options: [{ id: 1, text: 'To listen carefully' }, { id: 2, text: 'To hear something' }, { id: 3, text: 'To not understand' }, { id: 4, text: 'To understand by listening' }] },
      { id: 4, text: 'Complete the sentence: "我一到家___吃饭。"',
        correctId: 1, explanation: '一...就... means "as soon as". 一 goes before the first action, 就 goes before the second. "As soon as I get home, I eat."',
        options: [{ id: 1, text: '就' }, { id: 2, text: '也' }, { id: 3, text: '都' }, { id: 4, text: '还' }] },
      { id: 5, text: 'What is the difference between 知道 and 认识?',
        correctId: 2, explanation: '知道 (zhī dào) = to know a fact/information. 认识 (rèn shi) = to know/recognise a person. "我知道这个答案" vs "我认识他".',
        options: [{ id: 1, text: 'They are completely interchangeable' }, { id: 2, text: '知道 = know a fact; 认识 = know a person' }, { id: 3, text: '知道 = know a person; 认识 = know a fact' }, { id: 4, text: '认识 is more formal than 知道' }] },
      { id: 6, text: '"虽然很贵，但是很好吃" — which translation is correct?',
        correctId: 3, explanation: '虽然 = although, 但是 = but. Together they form "although...but..." — a common contrast pattern. 贵 = expensive, 好吃 = delicious.',
        options: [{ id: 1, text: 'Because it\'s expensive, it\'s delicious.' }, { id: 2, text: 'It\'s expensive and not delicious.' }, { id: 3, text: 'Although it\'s expensive, it\'s delicious.' }, { id: 4, text: 'If it\'s expensive, it must be delicious.' }] },
    ],
  },
];

// ── STUDY NOTES ────────────────────────────────────────────────────────────
export const ZH_NOTES: Note[] = [
  {
    id: 9221, title: '🟢 ZH 101 — The 4 Tones + Neutral Tone', category: 'Chinese',
    tags: 'tones, pronunciation, beginner, pinyin',
    pinned: true, createdAt: NOW, updatedAt: NOW,
    content: `MANDARIN TONES — The Most Important Skill
════════════════════════════════════════
Mandarin is a tonal language. The same syllable with
different tones = completely different words.

THE 4 TONES
──────────────────────────────
Tone 1  (ˉ) — High and flat, like humming a musical note
         mā 妈 = mother
         Example: Say "mmm" at a high, steady pitch.

Tone 2  (ˊ) — Rising, like asking a question in English
         má 麻 = hemp / numb
         Example: Like "huh?" or "really?" in English.

Tone 3  (ˇ) — Dip then rise (low, then up)
         mǎ 马 = horse
         Example: Like the sound "oh?" with a dip.
         ⚠️ Before another 3rd tone, becomes 2nd tone.

Tone 4  (ˋ) — Falling sharply, like a command
         mà 骂 = to scold
         Example: Like saying "stop!" or "no!" firmly.

Neutral tone — Light and short, no mark
         ma 吗 = question particle
         Example: Quick and unstressed.

════════════════════════════════════════
"MA" EXAMPLE TABLE
──────────────────────────────
妈 mā (1st) = mother
麻 má (2nd) = hemp, numb
马 mǎ (3rd) = horse
骂 mà (4th) = to scold
吗 ma (neutral) = ? (question)

════════════════════════════════════════
TONE CHANGE RULES
──────────────────────────────
1. Two 3rd tones together: first becomes 2nd tone
   你好 (nǐ hǎo) → spoken as (ní hǎo)

2. 不 (bù) before a 4th tone → becomes 2nd tone (bú)
   不是 bù shì → spoken bú shì
   不去 bù qù  → spoken bú qù

3. 一 (yī) changes:
   Before 4th tone → 2nd: 一个 yī gè → yí gè
   Before 1st/2nd/3rd → 4th: 一起 yī qǐ → yì qǐ

════════════════════════════════════════
TIPS FOR LEARNING TONES
──────────────────────────────
✅ Learn tones WITH the word — never separately
✅ Exaggerate tones when practising alone
✅ Use flashcards with audio (HSK apps like Pleco)
✅ Record yourself and compare to native speakers
✅ Tone errors are common — don't be embarrassed, keep practising`,
  },
  {
    id: 9222, title: '🟢 ZH 102 — Pinyin & Pronunciation Guide', category: 'Chinese',
    tags: 'pinyin, pronunciation, beginner',
    pinned: false, createdAt: NOW, updatedAt: NOW,
    content: `PINYIN — The Romanisation System for Chinese
════════════════════════════════════════
Pinyin spells out how Chinese characters are pronounced.
It uses the Latin alphabet with tone marks.

TRICKY PINYIN SOUNDS (not like English)
──────────────────────────────
x  → like "sh" but with tongue tip DOWN, near front teeth
     xi (希), xue (学), xiao (小)

q  → like "ch" but with tongue tip DOWN, near front teeth
     qi (七), qian (钱), qing (请)

zh → like "j" in "judge" with tongue curled back
     zhi (知), zhao (找), zhu (住)

ch → like "ch" but with tongue curled back
     chi (吃), cha (茶), che (车)

sh → like "sh" but with tongue curled back
     shi (是), shuo (说), she (蛇)

r  → like English "r" but softer, tongue slightly curled
     ren (人), ri (日), ru (如)

c  → like "ts" in "cats"
     cai (菜), cuo (错), ci (次)

z  → like "ds" in "kids"
     zai (在), zuo (做), zi (字)

VOWELS
──────────────────────────────
a  = "ah" like "father"
e  = "uh" like "duh"
i  = "ee" after most consonants / "zzzz" sound after zh,ch,sh,r,z,c,s
o  = "aw" like "or"
u  = "oo" like "food"
ü  = like French "u" or German "ü" (pucker lips, say "ee")
     Written as "u" after j, q, x, y

FINALS TO WATCH
──────────────────────────────
ian = "yen"  (天 tiān sounds like "tyen")
uan = "when" (完 wán)
ing = "eeng" (明 míng)
ong = "oong" (中 zhōng)

════════════════════════════════════════
USEFUL RULE
──────────────────────────────
When in doubt, look it up in Pleco app with audio.
Never guess a tone — always look it up when learning
a new word.`,
  },
  {
    id: 9223, title: '🟢 ZH 103 — Basic Sentence Structure', category: 'Chinese',
    tags: 'grammar, sentence structure, beginner, word order',
    pinned: false, createdAt: NOW, updatedAt: NOW,
    content: `CHINESE SENTENCE STRUCTURE
════════════════════════════════════════

BASIC WORD ORDER: Subject + Time + Place + Verb + Object
──────────────────────────────
Chinese puts time and place BEFORE the verb (opposite of English).

English: I eat noodles at a restaurant every day.
Chinese: 我 每天 在餐厅 吃 面条。
         (I + every day + at restaurant + eat + noodles)

NEGATION
──────────────────────────────
Use 不 (bù) before most verbs and adjectives:
我不去。     — I'm not going.
我不喜欢。   — I don't like it.
他不高。     — He is not tall.

Use 没 (méi) for 有 (to have) and completed actions:
我没有钱。   — I don't have money.
我没吃。     — I didn't eat. / I haven't eaten.

YES/NO QUESTIONS
──────────────────────────────
Method 1: Add 吗 (ma) at the end
你是学生吗？   — Are you a student?
你喝咖啡吗？   — Do you drink coffee?

Method 2: Verb + 不 + Verb (affirmative-negative question)
你是不是学生？ — Are you a student or not?
你去不去？     — Are you going or not?

WH-QUESTIONS (question word stays in same position)
──────────────────────────────
English moves question word to the front.
Chinese keeps it in the SAME position as the answer.

你是谁？       — You are who? (Who are you?)
你去哪里？     — You go where? (Where are you going?)
你要什么？     — You want what? (What do you want?)
你什么时候来？ — You when come? (When are you coming?)

TOPIC-COMMENT STRUCTURE
──────────────────────────────
Chinese often sets the topic first, then comments on it.
"这本书，我看过了。" — This book, I've read it.
"中文，我很喜欢。"   — Chinese, I really like it.`,
  },
  {
    id: 9224, title: '🟡 ZH 104 — Time, Dates & Numbers', category: 'Chinese',
    tags: 'time, dates, numbers, intermediate',
    pinned: false, createdAt: NOW, updatedAt: NOW,
    content: `NUMBERS
════════════════════════════════════════
0  零 (líng)       10 十 (shí)
1  一 (yī)         11 十一 (shí yī)
2  二 (èr) / 两(liǎng) 20 二十 (èr shí)
3  三 (sān)        21 二十一 (èr shí yī)
4  四 (sì)         100 一百 (yī bǎi)
5  五 (wǔ)         1,000 一千 (yī qiān)
6  六 (liù)        10,000 一万 (yī wàn)  ← unique!
7  七 (qī)         100,000,000 一亿 (yī yì)
8  八 (bā)
9  九 (jiǔ)

⚠️ 两 (liǎng) = 2 before a measure word
   两个人 (two people) NOT 二个人
   两本书 (two books)

DAYS
──────────────────────────────
Monday    星期一 (xīng qī yī)
Tuesday   星期二 (xīng qī èr)
Wednesday 星期三 (xīng qī sān)
Thursday  星期四 (xīng qī sì)
Friday    星期五 (xīng qī wǔ)
Saturday  星期六 (xīng qī liù)
Sunday    星期天/日 (xīng qī tiān/rì)

MONTHS (number + 月 yuè)
──────────────────────────────
January  一月    July     七月
February 二月    August   八月
March    三月    September 九月
April    四月    October  十月
May      五月    November 十一月
June     六月    December 十二月

DATES
──────────────────────────────
Year (年 nián) + Month (月 yuè) + Day (日/号 rì/hào)
2025年4月15日 = April 15, 2025
今天是几月几号？= What is today's date?

TIME
──────────────────────────────
现在几点？= What time is it now?
3点       = 3 o'clock (3:00)
3点半     = 3:30 (half past three)
3点15分   = 3:15
差5分3点  = 2:55 (5 minutes to 3)
上午/下午  = AM / PM
早上/晚上  = morning / evening`,
  },
  {
    id: 9225, title: '🟡 ZH 105 — Common Grammar Patterns', category: 'Chinese',
    tags: 'grammar, patterns, 把, 被, 比, intermediate',
    pinned: false, createdAt: NOW, updatedAt: NOW,
    content: `ESSENTIAL GRAMMAR PATTERNS
════════════════════════════════════════

1. 是...的 (shì...de) — EMPHASIS
──────────────────────────────
Emphasises WHO, WHEN, WHERE, or HOW a past action happened.
Structure: Subject + 是 + [emphasis] + Verb + 的

"你是什么时候来的？"  — When did you come?
"我是昨天来的。"     — I came yesterday.
"他是骑车来的。"     — He came by bicycle.

2. 把 (bǎ) — DISPOSAL / EFFECT ON OBJECT
──────────────────────────────
Move object BEFORE verb. Verb must have a result.
Structure: Subject + 把 + Object + Verb + Result/Complement

"我把书放在桌上了。" — I put the book on the table.
"她把饭吃完了。"    — She finished eating the rice.
⚠️ Cannot use 把 with: verbs of perception (看见, 听到),
   mental verbs (喜欢, 知道), or 是/有.

3. 被 (bèi) — PASSIVE (usually negative events)
──────────────────────────────
Structure: Subject + 被 + (Agent) + Verb + Result

"我被老板批评了。"   — I was criticised by the boss.
"手机被他摔坏了。"   — The phone was dropped and broken by him.
⚠️ Unlike English, Chinese passive requires a result/outcome.

4. 比 (bǐ) — COMPARISON
──────────────────────────────
A + 比 + B + Adjective (A is more [adj] than B)

"今年比去年热。"  — This year is hotter than last year.
"我比他高5厘米。" — I am 5cm taller than him.
"他跑得比我快。"  — He runs faster than me.

Negative: A + 没有 + B + Adjective
"我没有他高。"   — I am not as tall as him.

5. ASPECT MARKERS SUMMARY
──────────────────────────────
了 (le)  — completed action:   我吃了。
过 (guò) — past experience:    我去过。
着 (zhe) — ongoing state:      门开着。

6. USEFUL SENTENCE PATTERNS
──────────────────────────────
越来越...  = more and more     越来越好
越...越... = the more...the more  越学越有趣
一...就... = as soon as        一到家就吃饭
再...也... = no matter how     再忙也要吃饭`,
  },
  {
    id: 9226, title: '🔴 ZH 106 — Reading Chinese Characters', category: 'Chinese',
    tags: 'characters, radicals, advanced, hanzi',
    pinned: false, createdAt: NOW, updatedAt: NOW,
    content: `UNDERSTANDING CHINESE CHARACTERS
════════════════════════════════════════

TYPES OF CHARACTERS
──────────────────────────────
1. Pictographs (象形字) — original pictures
   日 (rì) = sun → ☀
   月 (yuè) = moon → ☽
   山 (shān) = mountain → △△△
   水 (shuǐ) = water

2. Ideographs (指事字) — abstract concepts
   上 (shàng) = above/up
   下 (xià) = below/down
   一二三 = 1, 2, 3

3. Compound ideographs (会意字) — meanings combined
   明 (míng) = bright (日sun + 月moon)
   好 (hǎo) = good (女woman + 子child)
   休 (xiū) = rest (人person + 木tree)

4. Phonetic-semantic (形声字) — 80%+ of characters!
   Semantic radical (meaning) + phonetic component (sound hint)
   清/请/情/晴 all share 青 (qīng) — similar sound

IMPORTANT RADICALS TO KNOW
──────────────────────────────
氵(water)  → 河(river), 海(sea), 游(swim), 洗(wash)
木 (wood)  → 树(tree), 桌(table), 椅(chair), 森(forest)
口 (mouth) → 吃(eat), 喝(drink), 叫(call), 说(speak)
人/亻(person) → 你(you), 他(he), 休(rest), 们(plural)
女 (woman) → 她(she), 好(good), 妈(mom), 姐(sister)
心/忄(heart) → 想(think), 忙(busy), 怕(fear), 快(happy)
手/扌(hand) → 打(hit), 找(find), 拿(take), 把(hold)
目 (eye)   → 看(look), 见(see), 睡(sleep), 眼(eye)
日 (sun)   → 明(bright), 时(time), 晴(sunny), 早(morning)

STROKE ORDER RULES
──────────────────────────────
1. Top before bottom:    三
2. Left before right:    你
3. Horizontal before vertical (when crossing): 十
4. Outside before inside: 国
5. Close last:           日 (close the box last)

TIPS FOR LEARNING CHARACTERS
──────────────────────────────
✅ Learn characters in context (words, sentences)
✅ Use spaced repetition (Pleco, Anki, HSK apps)
✅ Practice writing — muscle memory helps recognition
✅ Group by radical — learn families of related characters
✅ Simplified (简体 jiǎntǐ) vs Traditional (繁體 fántǐ):
   Mainland China = Simplified | Taiwan/HK = Traditional`,
  },
  {
    id: 9227, title: '⚫ ZH 107 — Master: Chengyu & Advanced Expressions', category: 'Chinese',
    tags: 'chengyu, idioms, advanced, expressions, master',
    pinned: false, createdAt: NOW, updatedAt: NOW,
    content: `CHENGYU (成语) — 4-Character Idioms
════════════════════════════════════════
Chengyu are fixed 4-character expressions from classical Chinese.
They convey complex ideas concisely. Knowing them impresses native speakers.

ESSENTIAL CHENGYU FOR LEARNERS
──────────────────────────────
一石二鸟 (yī shí èr niǎo)
"One stone, two birds" = Kill two birds with one stone

半途而废 (bàn tú ér fèi)
"Halfway give up" = Give up halfway / Don't quit halfway

马到成功 (mǎ dào chéng gōng)
"Horse arrives, success comes" = Immediate success upon arrival
(Used as a blessing: "I wish you success!")

坚持不懈 (jiān chí bù xiè)
"Persist without stopping" = Persevere / Keep going without giving up

一步一个脚印 (yī bù yī gè jiǎo yìn)
"One step, one footprint" = Step by step / Down-to-earth approach

熟能生巧 (shú néng shēng qiǎo)
"Familiarity produces skill" = Practice makes perfect

亡羊补牢 (wáng yáng bǔ láo)
"Sheep lost, fix the pen" = Better late than never / Fix the problem after the loss

异口同声 (yì kǒu tóng shēng)
"Different mouths, same voice" = Everyone said the same thing / Unanimous

ADVANCED GRAMMAR PATTERNS
──────────────────────────────
不但...而且... (bù dàn...ér qiě...)
Not only... but also...
"他不但聪明，而且努力。"
He is not only smart but also hardworking.

即使...也... (jí shǐ...yě...)
Even if... still...
"即使很难，我也要坚持。"
Even if it's very difficult, I will still persist.

宁可...也不... (nìng kě...yě bù...)
Would rather... than...
"我宁可走路，也不坐那辆车。"
I would rather walk than take that car.

无论...都... (wú lùn...dōu...)
No matter... always...
"无论多忙，都要按时吃饭。"
No matter how busy, you must eat on time.

BUSINESS CHINESE PHRASES
──────────────────────────────
请多关照。(qǐng duō guān zhào)
Please take care of me / I look forward to working with you.

有什么不清楚的地方，请随时告诉我。
If anything is unclear, please tell me at any time.

按时完成 (àn shí wán chéng) = Complete on time
效率 (xiào lǜ) = efficiency
沟通 (gōu tōng) = communication
合作 (hé zuò) = cooperation / collaboration`,
  },
];

// ── GOALS ─────────────────────────────────────────────────────────────────
export const ZH_GOALS: Goal[] = [
  { id: 9231, title: 'Master all 4 Mandarin tones', category: 'Chinese', description: 'Practice tone pairs, tone sandhi rules, and minimal pairs until automatic.', target: 4, current: 0, unit: 'tones mastered', deadline: '2026-05-31', done: false, createdAt: NOW },
  { id: 9232, title: 'Learn HSK 1 vocabulary (150 words)', category: 'Chinese', description: 'All 150 HSK 1 words — meaning, pinyin, and basic usage.', target: 150, current: 0, unit: 'words', deadline: '2026-06-30', done: false, createdAt: NOW },
  { id: 9233, title: 'Learn HSK 2 vocabulary (150 words)', category: 'Chinese', description: 'Build on HSK 1 — 150 new words for HSK 2 level.', target: 150, current: 0, unit: 'words', deadline: '2026-08-31', done: false, createdAt: NOW },
  { id: 9234, title: 'Learn 100 Chinese characters by writing', category: 'Chinese', description: 'Practice stroke order and radicals. Aim for recognition and writing from memory.', target: 100, current: 0, unit: 'characters', deadline: '2026-09-30', done: false, createdAt: NOW },
  { id: 9235, title: 'Hold a 5-minute conversation in Chinese', category: 'Chinese', description: 'Introduce yourself, talk about daily life, ask questions — all in Chinese.', target: 1, current: 0, unit: 'conversation', deadline: '2026-10-31', done: false, createdAt: NOW },
];
