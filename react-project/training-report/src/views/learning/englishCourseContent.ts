// ─── English Course Content: Beginner → Advanced ───────────────────────────
// IDs start at 9100+ to avoid collisions.
// Check id 9101 to detect if already loaded.

import type { Deck, Quiz, Note, Goal } from './tsxCourseContent';
export type { Deck, Quiz, Note, Goal };

const NOW = new Date().toISOString();

// ── FLASHCARD DECKS ────────────────────────────────────────────────────────
export const EN_DECKS: Deck[] = [
  {
    id: 9101, name: '🟢 English — Essential Grammar Terms', createdAt: NOW,
    cards: [
      { id: 91011, front: 'What is a noun?', back: 'A word that names a person, place, thing, or idea.\nExamples: teacher, city, book, happiness.', status: 'new' },
      { id: 91012, front: 'What is a verb?', back: 'A word that expresses an action, occurrence, or state of being.\nExamples: run, think, is, become.', status: 'new' },
      { id: 91013, front: 'What is an adjective?', back: 'A word that describes or modifies a noun.\nExamples: happy, large, beautiful, quick.\n"The tall man" — "tall" is the adjective.', status: 'new' },
      { id: 91014, front: 'What is an adverb?', back: 'A word that modifies a verb, adjective, or another adverb. Often ends in -ly.\nExamples: quickly, very, quite, always.\n"She runs quickly" — "quickly" modifies "runs".', status: 'new' },
      { id: 91015, front: 'What is a conjunction?', back: 'A word that joins words, phrases, or clauses.\nCoordinating: for, and, nor, but, or, yet, so (FANBOYS)\nSubordinating: because, although, when, if, since.', status: 'new' },
      { id: 91016, front: 'What is a preposition?', back: 'A word that shows the relationship between a noun/pronoun and another word.\nExamples: in, on, at, by, for, with, about, between.\n"The book is on the table."', status: 'new' },
      { id: 91017, front: 'What is a pronoun?', back: 'A word used instead of a noun to avoid repetition.\nSubject: I, you, he, she, it, we, they\nObject: me, you, him, her, it, us, them\nPossessive: my, your, his, her, its, our, their', status: 'new' },
      { id: 91018, front: 'What is a clause?', back: 'A group of words with a subject and a verb.\nIndependent clause: can stand alone ("I study English.")\nDependent clause: cannot stand alone ("because I want to improve")', status: 'new' },
      { id: 91019, front: 'What is a phrase?', back: 'A group of words without both a subject and a verb — cannot stand alone as a sentence.\nExamples: "in the morning", "very quickly", "the old man".', status: 'new' },
      { id: 91020, front: 'What is the difference between a subject and an object?', back: 'Subject: performs the action → "She reads the book."\nObject: receives the action → "She reads the book."\nHere "She" = subject, "book" = object.', status: 'new' },
    ],
  },
  {
    id: 9102, name: '🟢 English — Articles & Determiners', createdAt: NOW,
    cards: [
      { id: 91021, front: 'When do you use "a"?', back: 'Before singular countable nouns starting with a consonant sound.\n"a book", "a university" (u sounds like "yu"), "a one-way street" (o sounds like "w")\nRule: listen to the SOUND, not the letter.', status: 'new' },
      { id: 91022, front: 'When do you use "an"?', back: 'Before singular countable nouns starting with a vowel SOUND.\n"an apple", "an hour" (h is silent), "an honest person"\nNot the letter — the SOUND matters.', status: 'new' },
      { id: 91023, front: 'When do you use "the"?', back: 'Use "the" when:\n• Both speaker & listener know which one: "Close the door."\n• Something already mentioned: "I saw a dog. The dog was friendly."\n• Unique things: the sun, the moon, the internet\n• Superlatives: the best, the tallest', status: 'new' },
      { id: 91024, front: 'When do you use NO article (zero article)?', back: 'No article with:\n• Plural countable nouns in general: "Dogs are loyal."\n• Uncountable nouns in general: "Water is essential."\n• Most proper nouns: "Vietnam", "London"\n• Meals, languages, sports: "I eat breakfast. I speak English. I play football."', status: 'new' },
      { id: 91025, front: 'What is the difference between "some" and "any"?', back: '"some" → used in positive sentences and offers/requests\n"any" → used in negative sentences and questions\n\n✅ I have some money.\n✅ Do you want some coffee? (offer)\n✅ I don\'t have any money.\n✅ Do you have any questions?', status: 'new' },
    ],
  },
  {
    id: 9103, name: '🟡 English — Verb Tenses', createdAt: NOW,
    cards: [
      { id: 91031, front: 'Simple Present — form & use', back: 'Form: verb (+ s/es for he/she/it)\nUse:\n• Habits & routines: "I drink coffee every morning."\n• Facts & general truths: "Water boils at 100°C."\n• Schedules: "The train leaves at 8."', status: 'new' },
      { id: 91032, front: 'Present Continuous — form & use', back: 'Form: am/is/are + verb-ing\nUse:\n• Action happening now: "She is studying."\n• Temporary situations: "I am living in Hanoi this month."\n• Future plans: "We are meeting tomorrow."\n⚠️ NOT used with stative verbs: know, want, believe, need.', status: 'new' },
      { id: 91033, front: 'Simple Past — form & use', back: 'Form: verb + -ed (regular) or irregular form\nUse:\n• Completed action at a specific past time: "I went to school yesterday."\n• Past habits: "She walked to work every day." (past only)\nSignal words: yesterday, last week, in 2020, ago', status: 'new' },
      { id: 91034, front: 'Present Perfect — form & use', back: 'Form: have/has + past participle\nUse:\n• Experience (ever/never): "I have visited Japan."\n• Recent past with present relevance: "She has just left."\n• With since/for: "I have lived here for 5 years."\n⚠️ NOT used with specific past time: ❌ "I have gone yesterday"', status: 'new' },
      { id: 91035, front: 'Past Continuous — form & use', back: 'Form: was/were + verb-ing\nUse:\n• Action in progress at a past time: "At 8pm I was eating dinner."\n• Interrupted action: "I was studying when she called."\n• Parallel past actions: "He was cooking while she was reading."', status: 'new' },
      { id: 91036, front: 'Future with will — form & use', back: 'Form: will + base verb\nUse:\n• Spontaneous decisions: "I\'ll help you!"\n• Predictions based on opinion: "I think it will rain."\n• Promises: "I will call you."\n• Facts about the future: "The meeting will start at 9."', status: 'new' },
      { id: 91037, front: 'Future with going to — form & use', back: 'Form: am/is/are + going to + base verb\nUse:\n• Plans & intentions: "I am going to study medicine."\n• Predictions based on evidence: "Look at those clouds — it\'s going to rain!"\n\nTip: "going to" = already decided; "will" = decided now.', status: 'new' },
      { id: 91038, front: 'What are stative verbs? Give examples.', back: 'Verbs that describe states, not actions — NOT used with continuous tenses.\nCategories:\n• Mental: know, believe, understand, think (opinion), remember\n• Emotional: love, hate, want, need, prefer\n• Senses: see, hear, smell, taste, seem\n• Possession: have, own, belong\n\n❌ "I am knowing the answer." → ✅ "I know the answer."', status: 'new' },
    ],
  },
  {
    id: 9104, name: '🟡 English — Phrasal Verbs (Essential 30)', createdAt: NOW,
    cards: [
      { id: 91041, front: 'give up', back: 'To stop doing something; to quit.\n"He gave up smoking last year."', status: 'new' },
      { id: 91042, front: 'look up', back: 'To search for information (in a dictionary/internet).\n"Look up the word if you don\'t know it."', status: 'new' },
      { id: 91043, front: 'turn up / turn down', back: 'turn up = arrive unexpectedly; increase volume\nturn down = refuse; decrease volume\n"He turned down the job offer."\n"She always turns up late."', status: 'new' },
      { id: 91044, front: 'find out', back: 'To discover or learn information.\n"I need to find out when the meeting starts."', status: 'new' },
      { id: 91045, front: 'bring up', back: '1. To raise a child: "She was brought up in Hanoi."\n2. To mention a topic: "He brought up the issue at the meeting."', status: 'new' },
      { id: 91046, front: 'carry out', back: 'To perform or complete a task.\n"The team carried out the tests successfully."', status: 'new' },
      { id: 91047, front: 'come across', back: 'To find or meet by chance.\n"I came across an interesting article online."', status: 'new' },
      { id: 91048, front: 'go through', back: '1. To experience something difficult: "She went through a hard time."\n2. To read/check carefully: "Let\'s go through the report."', status: 'new' },
      { id: 91049, front: 'set up', back: 'To establish or arrange.\n"They set up a new company last year."\n"Can you set up a meeting for Thursday?"', status: 'new' },
      { id: 91050, front: 'take over', back: 'To take control or responsibility from someone.\n"She took over the project when the manager left."', status: 'new' },
      { id: 91051, front: 'put off', back: 'To postpone; to delay.\n"Don\'t put off until tomorrow what you can do today."', status: 'new' },
      { id: 91052, front: 'point out', back: 'To draw attention to something.\n"He pointed out several errors in the report."', status: 'new' },
      { id: 91053, front: 'run out of', back: 'To use up all of something; have none left.\n"We ran out of time during the presentation."', status: 'new' },
      { id: 91054, front: 'deal with', back: 'To handle a situation or problem.\n"How do you deal with stress at work?"', status: 'new' },
      { id: 91055, front: 'work out', back: '1. To exercise: "I work out every morning."\n2. To find a solution: "Let\'s work out a plan."\n3. To result well: "Everything worked out in the end."', status: 'new' },
    ],
  },
  {
    id: 9105, name: '🔴 English — Vocabulary: Collocations & Idioms', createdAt: NOW,
    cards: [
      { id: 91061, front: 'make vs do — which goes with "decision"?', back: '"make a decision" ✅\n\nMake collocations: make a mistake, make progress, make an effort, make a plan, make friends, make a suggestion, make an excuse', status: 'new' },
      { id: 91062, front: 'make vs do — which goes with "homework"?', back: '"do homework" ✅\n\nDo collocations: do research, do a test, do business, do your best, do exercise, do someone a favour, do damage', status: 'new' },
      { id: 91063, front: 'What does "hit the nail on the head" mean?', back: 'To describe something exactly right; to be precisely correct.\n"When she said the problem was communication, she hit the nail on the head."', status: 'new' },
      { id: 91064, front: 'What does "under the weather" mean?', back: 'Feeling slightly ill or unwell.\n"I\'m feeling a bit under the weather today — I might have a cold."', status: 'new' },
      { id: 91065, front: 'What does "bite the bullet" mean?', back: 'To endure a painful or difficult situation bravely.\n"I hated the dentist but I bit the bullet and made an appointment."', status: 'new' },
      { id: 91066, front: 'What does "break the ice" mean?', back: 'To do or say something to relieve tension and start a conversation in a social situation.\n"He told a joke to break the ice at the meeting."', status: 'new' },
      { id: 91067, front: '"affect" vs "effect"', back: '"affect" = verb (to influence)\n"effect" = noun (the result)\n\n✅ "The rain affected the game."\n✅ "The effect was a 2-hour delay."\n\nMemory trick: A comes before E → Affect (action) → Effect (end result)', status: 'new' },
      { id: 91068, front: '"its" vs "it\'s"', back: '"it\'s" = it is / it has (contraction)\n"its" = possessive pronoun (belonging to it)\n\n✅ "It\'s raining." (= It is raining)\n✅ "The dog hurt its paw." (= the paw of the dog)', status: 'new' },
      { id: 91069, front: '"although" vs "despite"', back: '"although" + clause (subject + verb)\n"despite" + noun phrase or gerund (-ing)\n\n✅ "Although it was raining, we went out."\n✅ "Despite the rain, we went out."\n✅ "Despite feeling tired, she finished."', status: 'new' },
      { id: 91070, front: 'strong collocations with "take"', back: 'take a break, take a risk, take action, take care, take notes, take part in, take place, take time, take turns, take advantage of', status: 'new' },
    ],
  },
];

// ── QUIZZES ────────────────────────────────────────────────────────────────
export const EN_QUIZZES: Quiz[] = [
  {
    id: 9111, name: '🟢 English Grammar — Beginner', createdAt: NOW,
    questions: [
      { id: 1, text: 'Which sentence uses the correct article?',
        correctId: 3, explanation: 'Use "an" before vowel sounds. "hour" starts with a silent h, so it sounds like "our" — a vowel sound.',
        options: [{ id: 1, text: 'I waited for a hour.' }, { id: 2, text: 'She is a honest person.' }, { id: 3, text: 'He arrived an hour ago.' }, { id: 4, text: 'It was an unique experience.' }] },
      { id: 2, text: 'Which sentence is in the simple present tense?',
        correctId: 2, explanation: 'Simple present describes habits and facts. "She works" is simple present. The others use past, continuous, or future.',
        options: [{ id: 1, text: 'She is working now.' }, { id: 2, text: 'She works at a hospital.' }, { id: 3, text: 'She worked yesterday.' }, { id: 4, text: 'She will work tomorrow.' }] },
      { id: 3, text: 'Choose the correct sentence.',
        correctId: 4, explanation: '"I am knowing" is wrong because "know" is a stative verb — it describes a state, not an action, so it cannot be used in continuous form.',
        options: [{ id: 1, text: 'I am knowing the answer.' }, { id: 2, text: 'She is wanting a coffee.' }, { id: 3, text: 'He is having two cars.' }, { id: 4, text: 'They know the answer.' }] },
      { id: 4, text: 'Which word is an adverb?',
        correctId: 2, explanation: '"Quickly" is an adverb — it modifies the verb "runs". "Quick" and "fast" (as adjective) describe nouns. "Speed" is a noun.',
        options: [{ id: 1, text: 'quick' }, { id: 2, text: 'quickly' }, { id: 3, text: 'quickness' }, { id: 4, text: 'speed' }] },
      { id: 5, text: 'Fill in the blank: "We _____ out of coffee this morning."',
        correctId: 3, explanation: '"ran out of" is the correct phrasal verb meaning "used all of something / had none left".',
        options: [{ id: 1, text: 'went out of' }, { id: 2, text: 'came out of' }, { id: 3, text: 'ran out of' }, { id: 4, text: 'turned out of' }] },
      { id: 6, text: 'Which sentence uses the Present Perfect correctly?',
        correctId: 1, explanation: 'Present Perfect is used for experience. "Have you ever visited" asks about life experience without specifying when. Adding "yesterday" makes it wrong (use Simple Past for specific times).',
        options: [{ id: 1, text: 'Have you ever visited Japan?' }, { id: 2, text: 'I have gone there yesterday.' }, { id: 3, text: 'She has called me last night.' }, { id: 4, text: 'We have finished it in 2020.' }] },
    ],
  },
  {
    id: 9112, name: '🟡 English Grammar — Intermediate', createdAt: NOW,
    questions: [
      { id: 1, text: 'Which sentence is correct?',
        correctId: 2, explanation: '"affect" is a verb meaning to influence. "effect" is a noun meaning the result. "The noise affected him" = correct verb use.',
        options: [{ id: 1, text: 'The noise effected him badly.' }, { id: 2, text: 'The noise affected him badly.' }, { id: 3, text: 'The noise was affect him.' }, { id: 4, text: 'The noise made an affect.' }] },
      { id: 2, text: 'Which is correct? "Although it was raining, ___"',
        correctId: 3, explanation: '"Although" introduces a contrast. It must be followed by a subject + verb clause. The result clause must not also use "but".',
        options: [{ id: 1, text: '...but we went out.' }, { id: 2, text: '...despite we went out.' }, { id: 3, text: '...we went out.' }, { id: 4, text: '...however we went out.' }] },
      { id: 3, text: 'Which sentence uses "despite" correctly?',
        correctId: 4, explanation: '"despite" must be followed by a noun or gerund (-ing form), NOT a clause with subject+verb.',
        options: [{ id: 1, text: 'Despite it rained, they played.' }, { id: 2, text: 'Despite that she was tired.' }, { id: 3, text: 'Despite of the rain, they played.' }, { id: 4, text: 'Despite the rain, they played.' }] },
      { id: 4, text: 'What does "she put off the meeting" mean?',
        correctId: 1, explanation: '"Put off" means to postpone — to move something to a later time.',
        options: [{ id: 1, text: 'She postponed the meeting.' }, { id: 2, text: 'She cancelled the meeting forever.' }, { id: 3, text: 'She attended the meeting.' }, { id: 4, text: 'She ended the meeting early.' }] },
      { id: 5, text: 'Choose the correct sentence using "its" vs "it\'s":',
        correctId: 3, explanation: '"it\'s" = it is. "its" = possessive. "It\'s raining" = It is raining. "The company and its staff" = possessive.',
        options: [{ id: 1, text: 'The dog hurt it\'s paw.' }, { id: 2, text: 'Its a beautiful day.' }, { id: 3, text: 'It\'s raining outside.' }, { id: 4, text: 'The team and it\'s manager.' }] },
      { id: 6, text: 'Which is the correct collocation?',
        correctId: 2, explanation: 'We "make a decision" (not do). "Do" collocations are for tasks/activities; "make" collocations often involve creation or decisions.',
        options: [{ id: 1, text: 'do a decision' }, { id: 2, text: 'make a decision' }, { id: 3, text: 'take a decision (British English)' }, { id: 4, text: 'have a decision' }] },
    ],
  },
  {
    id: 9113, name: '🔴 English — Advanced Vocabulary & Usage', createdAt: NOW,
    questions: [
      { id: 1, text: 'What does the idiom "bite the bullet" mean?',
        correctId: 3, explanation: 'Originally from surgery before anaesthesia — patients would bite a bullet to endure pain. Now it means to endure something unpleasant bravely.',
        options: [{ id: 1, text: 'To eat something dangerous' }, { id: 2, text: 'To make a quick decision' }, { id: 3, text: 'To endure a difficult situation bravely' }, { id: 4, text: 'To avoid a problem' }] },
      { id: 2, text: 'Which word best completes: "The manager asked us to _____ the report before the meeting."',
        correctId: 4, explanation: '"go through" means to read or check carefully. "go over" also works but was not an option.',
        options: [{ id: 1, text: 'go around' }, { id: 2, text: 'go by' }, { id: 3, text: 'go with' }, { id: 4, text: 'go through' }] },
      { id: 3, text: '"He was brought up in Hanoi." What does "brought up" mean here?',
        correctId: 2, explanation: '"Bring up" means to raise a child. It can also mean to mention a topic, but in this context it means raised/grew up.',
        options: [{ id: 1, text: 'He was born in Hanoi.' }, { id: 2, text: 'He was raised / grew up in Hanoi.' }, { id: 3, text: 'He was promoted in Hanoi.' }, { id: 4, text: 'He was brought to Hanoi recently.' }] },
      { id: 4, text: 'Which sentence demonstrates correct use of the past perfect?',
        correctId: 1, explanation: 'Past perfect (had + past participle) shows an action completed BEFORE another past action. "Had already left" happened before "arrived".',
        options: [{ id: 1, text: 'By the time I arrived, she had already left.' }, { id: 2, text: 'By the time I arrived, she already left.' }, { id: 3, text: 'When I arrived, she has already left.' }, { id: 4, text: 'She had left when I will arrive.' }] },
      { id: 5, text: 'What is the passive form of "The team completed the project"?',
        correctId: 3, explanation: 'Passive form: object becomes subject + was/were + past participle. "The project was completed by the team."',
        options: [{ id: 1, text: 'The project completed by the team.' }, { id: 2, text: 'The project is completed by the team.' }, { id: 3, text: 'The project was completed by the team.' }, { id: 4, text: 'The project has completed by the team.' }] },
      { id: 6, text: 'Which sentence uses the subjunctive correctly?',
        correctId: 4, explanation: 'The subjunctive uses the base verb (without s) after "recommend/suggest/insist that". "He attend" not "he attends".',
        options: [{ id: 1, text: 'I suggest that he attends the meeting.' }, { id: 2, text: 'I suggest that he is attending the meeting.' }, { id: 3, text: 'I suggest that he attended the meeting.' }, { id: 4, text: 'I suggest that he attend the meeting.' }] },
    ],
  },
];

// ── STUDY NOTES ────────────────────────────────────────────────────────────
export const EN_NOTES: Note[] = [
  {
    id: 9121, title: '🟢 EN 101 — 12 Verb Tenses Overview', category: 'English',
    tags: 'tenses, grammar, beginner, overview',
    pinned: true, createdAt: NOW, updatedAt: NOW,
    content: `THE 12 ENGLISH TENSES — Quick Reference
════════════════════════════════════════

SIMPLE (completed / habitual)
──────────────────────────────
Simple Present:    I work / she works
Simple Past:       I worked
Simple Future:     I will work

CONTINUOUS (in progress)
──────────────────────────────
Present Continuous:    I am working
Past Continuous:       I was working
Future Continuous:     I will be working

PERFECT (completed before another time)
──────────────────────────────
Present Perfect:       I have worked
Past Perfect:          I had worked
Future Perfect:        I will have worked

PERFECT CONTINUOUS (duration up to a point)
──────────────────────────────
Present Perfect Cont.: I have been working
Past Perfect Cont.:    I had been working
Future Perfect Cont.:  I will have been working

════════════════════════════════════════
MOST USED IN DAILY LIFE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Simple Present   → habits, facts, schedules
2. Present Continuous → now, temporary, future plans
3. Simple Past      → finished action in the past
4. Present Perfect  → experience, recent past, since/for
5. Simple Future    → predictions, decisions, promises
6. Going to future  → plans, evidence-based predictions

════════════════════════════════════════
SIGNAL WORDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Simple Present:    every day, usually, always, often, never
Simple Past:       yesterday, last week/year, ago, in 2020
Present Perfect:   ever, never, just, already, yet, since, for
Present Cont.:     now, at the moment, currently, today
Simple Future:     tomorrow, next week, soon, in the future`,
  },
  {
    id: 9122, title: '🟢 EN 102 — Articles: a / an / the / Ø', category: 'English',
    tags: 'articles, a, an, the, grammar, beginner',
    pinned: false, createdAt: NOW, updatedAt: NOW,
    content: `ARTICLES — Complete Guide
════════════════════════════════════════

A / AN (indefinite — one of many)
──────────────────────────────
Use before singular countable nouns mentioned for the first time
OR when the listener doesn't know which specific one.

• a = before consonant SOUND: a book, a year, a university (sounds like "yu")
• an = before vowel SOUND: an apple, an hour (h silent), an honest man

THE (definite — specific one)
──────────────────────────────
Use when both speaker & listener know which one.

1. Already mentioned:   "I saw a dog. The dog was friendly."
2. Unique things:       the sun, the moon, the sky, the internet
3. Superlatives:        the best, the most expensive
4. With "of":           the capital of Vietnam (= Hanoi)
5. Specific places:     the Eiffel Tower, the Mekong River
6. Ordinals:            the first, the second time

NO ARTICLE (zero article)
──────────────────────────────
• Plural nouns in general:   Cats are independent. (cats in general)
• Uncountable in general:    Water is essential. / I love music.
• Most countries:            Vietnam, France (but: the USA, the UK)
• Cities, people:            London, Quân
• Languages:                 English, Chinese, Vietnamese
• Meals:                     I had breakfast at 7.
• Transport:                 by car, by bus (but: on the bus = specific)
• Academic subjects:         I study mathematics.

════════════════════════════════════════
COMMON MISTAKES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ I am the student.        ✅ I am a student.
❌ She gave me an useful tip. ✅ She gave me a useful tip. (u = "yu")
❌ The life is beautiful.   ✅ Life is beautiful.
❌ I go to the school.      ✅ I go to school. (institution, not building)
❌ He is best student.      ✅ He is the best student.`,
  },
  {
    id: 9123, title: '🟡 EN 103 — Common Grammar Mistakes', category: 'English',
    tags: 'mistakes, grammar, intermediate, corrections',
    pinned: false, createdAt: NOW, updatedAt: NOW,
    content: `TOP COMMON ENGLISH GRAMMAR MISTAKES
════════════════════════════════════════

1. SUBJECT-VERB AGREEMENT
──────────────────────────────
❌ "The list of items are on the table."
✅ "The list of items IS on the table." (subject = list, singular)

❌ "Everyone are happy."
✅ "Everyone IS happy." (everyone = singular)

2. CONFUSING IT'S / ITS
──────────────────────────────
❌ "The team won it's first game."
✅ "The team won ITS first game." (possessive = its)
✅ "IT'S raining." (= it is)

3. THEN vs THAN
──────────────────────────────
THAN = for comparisons:  "She is taller THAN me."
THEN = for time/sequence: "First study, THEN take the test."

4. THERE / THEIR / THEY'RE
──────────────────────────────
THERE = place:       "The book is over THERE."
THEIR = possessive:  "THEIR house is big."
THEY'RE = they are:  "THEY'RE coming tonight."

5. AFFECT vs EFFECT
──────────────────────────────
AFFECT = verb:  "Stress AFFECTS your health."
EFFECT = noun:  "What is the EFFECT of stress?"
Tip: A before E → Affect (action) → Effect (end result)

6. FEWER vs LESS
──────────────────────────────
FEWER = countable nouns:    "fewer mistakes, fewer people"
LESS = uncountable nouns:   "less water, less time, less money"
❌ "Less people came."  ✅ "Fewer people came."

7. WHO vs WHOM
──────────────────────────────
WHO = subject:   "Who called you?" (He called = subject)
WHOM = object:   "Whom did you call?" (I called him = object)
Tip: replace with him/her → use whom; he/she → use who

8. CONDITIONAL FORMS
──────────────────────────────
Zero:    If + present, present  → "If you heat water, it boils."
First:   If + present, will     → "If it rains, I will stay home."
Second:  If + past, would       → "If I won, I would travel."
Third:   If + past perfect, would have → "If I had studied, I would have passed."

❌ "If I would have money, I would travel."
✅ "If I HAD money, I would travel."`,
  },
  {
    id: 9124, title: '🟡 EN 104 — Prepositions of Time & Place', category: 'English',
    tags: 'prepositions, in, on, at, time, place, intermediate',
    pinned: false, createdAt: NOW, updatedAt: NOW,
    content: `PREPOSITIONS — IN / ON / AT
════════════════════════════════════════

TIME
──────────────────────────────
AT  → specific time / fixed points
    at 7 o'clock, at midnight, at noon, at night
    at Christmas (the period), at the weekend (BrE)

ON  → days and dates
    on Monday, on 15 March, on my birthday
    on weekdays, on a cold evening

IN  → longer periods
    in the morning/afternoon/evening
    in January, in summer, in 2025, in the 21st century

PLACE
──────────────────────────────
AT  → specific point / location
    at the bus stop, at the top, at school (function)
    at home, at work, at the door

ON  → surface / line
    on the table, on the wall, on the left
    on the bus (travelling), on the internet, on a map

IN  → enclosed space / area
    in the room, in the box, in Vietnam
    in the car (enclosed), in the newspaper

════════════════════════════════════════
TRICKY ONES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
in the morning   BUT   at night   (not "in the night" for general)
at the weekend (BrE) / on the weekend (AmE)
in time = before it's too late ("We arrived in time.")
on time = punctually ("The train was on time.")
in the end = finally, after a long time ("In the end, she agreed.")
at the end = at the final point ("At the end of the film.")

════════════════════════════════════════
OTHER USEFUL PREPOSITIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
responsible FOR    interested IN     good AT
depend ON          proud OF          agree WITH
belong TO          apologise FOR     apply FOR
concentrate ON     result IN         consist OF`,
  },
  {
    id: 9125, title: '🔴 EN 105 — Writing Skills: Linking Words', category: 'English',
    tags: 'writing, linking words, connectors, advanced',
    pinned: false, createdAt: NOW, updatedAt: NOW,
    content: `LINKING WORDS — For Clear, Coherent Writing
════════════════════════════════════════

ADDITION (adding ideas)
──────────────────────────────
furthermore, moreover, in addition, additionally,
besides, also, as well as, not only ... but also

"The system is fast. Furthermore, it is easy to use."

CONTRAST (showing difference)
──────────────────────────────
however, nevertheless, nonetheless, on the other hand,
in contrast, although, even though, despite, in spite of,
whereas, while, yet

"The project was delayed. However, the quality was excellent."
"Although it was expensive, the results were worth it."

CAUSE (showing reason)
──────────────────────────────
because, since, as, due to, owing to, because of,
as a result of, on account of

"She passed because she studied hard."
"Due to the rain, the match was cancelled."

EFFECT / RESULT
──────────────────────────────
therefore, thus, hence, consequently, as a result,
so, which means that, this led to

"He missed the deadline; consequently, he lost the contract."

SEQUENCE / ORDER
──────────────────────────────
first, firstly, to begin with, initially,
then, next, after that, subsequently,
finally, lastly, in conclusion, to summarise

EXAMPLE / CLARIFICATION
──────────────────────────────
for example, for instance, such as, including,
namely, in other words, that is (i.e.), to illustrate

CONDITION
──────────────────────────────
if, unless, provided that, as long as, on condition that,
in case, whether or not

════════════════════════════════════════
PUNCTUATION RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• however / therefore / furthermore at the start → comma after
  "However, this is not always true."

• Semicolon before, comma after:
  "The task was hard; however, we completed it."

• although / because / since → NO comma (unless fronted)
  "She left because she was tired."
  "Because she was tired, she left." ← comma when fronted`,
  },
  {
    id: 9126, title: '🔴 EN 106 — Conditionals & Wish/If Only', category: 'English',
    tags: 'conditionals, wish, advanced, grammar',
    pinned: false, createdAt: NOW, updatedAt: NOW,
    content: `CONDITIONALS — 4 Types
════════════════════════════════════════

ZERO CONDITIONAL — general truths
──────────────────────────────
If + present simple, present simple
"If you heat ice, it melts."
"When I drink coffee, I can't sleep."
(Always true — like a scientific fact)

FIRST CONDITIONAL — real / likely future
──────────────────────────────
If + present simple, will + base verb
"If it rains tomorrow, I will stay home."
"If you study hard, you will pass."
(Possible and likely to happen)

SECOND CONDITIONAL — unreal / hypothetical present
──────────────────────────────
If + past simple, would + base verb
"If I had more time, I would learn Spanish."
"If she were the manager, she would change everything."
(Not true now — imaginary situation)
⚠️ Use "were" not "was" in formal writing: "If I were you..."

THIRD CONDITIONAL — unreal past
──────────────────────────────
If + past perfect, would have + past participle
"If I had studied harder, I would have passed."
"If they had left earlier, they wouldn't have missed the train."
(Cannot be changed — imagining a different past)

MIXED CONDITIONAL — past condition, present result
──────────────────────────────
If + past perfect, would + base verb
"If I had taken that job, I would be rich now."
(Past choice affecting present situation)

════════════════════════════════════════
WISH / IF ONLY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Wish + past simple → wish about present (unreal)
"I wish I spoke better English." (but I don't)
"If only I knew the answer."

Wish + past perfect → wish about past (regret)
"I wish I had studied more."
"If only I hadn't said that."

Wish + would → wish for change in behaviour
"I wish you would stop interrupting me."
"I wish it would stop raining."`,
  },
  {
    id: 9127, title: '⚫ EN 107 — Advanced: Passive, Reported Speech, Inversion', category: 'English',
    tags: 'passive, reported speech, inversion, advanced',
    pinned: false, createdAt: NOW, updatedAt: NOW,
    content: `PASSIVE VOICE
════════════════════════════════════════
Form: object + be (conjugated) + past participle

Active:  "The team finished the project."
Passive: "The project was finished by the team."

Tense examples:
Present:        The report is written every week.
Past:           The contract was signed yesterday.
Present Perfect: The bug has been fixed.
Future:         The results will be announced tomorrow.
Modal:          This must be checked by QA.

When to use passive:
• Focus is on the action, not who did it
• The doer is unknown or unimportant
• Formal/scientific writing

──────────────────────────────
REPORTED SPEECH (backshift)
════════════════════════════════════════
When reporting what someone said (past), tenses shift back:

Direct → Reported
present simple → past simple
"I work here." → She said she worked there.

present continuous → past continuous
"I am eating." → He said he was eating.

will → would
"I will call." → She said she would call.

can → could
"I can help." → He said he could help.

"She told me that the meeting was at 3." (NOT "is")
"He asked if I had finished the report." (NOT "have")

──────────────────────────────
INVERSION (formal/emphatic)
════════════════════════════════════════
Used for emphasis — auxiliary verb before subject:

Negative adverbs at the start:
"Never have I seen such a result."
"Rarely does she make a mistake."
"Not only did he finish early, but he also helped others."

After "only":
"Only then did I understand the problem."
"Only when she explained it did I understand."

Conditionals without "if":
"Had I known sooner, I would have acted differently."
  = If I had known sooner...
"Were I in your position, I would refuse."
  = If I were in your position...

"Should you need any help, please contact us."
  = If you should need any help...`,
  },
];

// ── GOALS ─────────────────────────────────────────────────────────────────
export const EN_GOALS: Goal[] = [
  { id: 9131, title: 'Master all 12 English tenses', category: 'English', description: 'Study each tense, its form, use, and signal words. Practice with examples.', target: 12, current: 0, unit: 'tenses', deadline: '2026-06-30', done: false, createdAt: NOW },
  { id: 9132, title: 'Learn 500 English vocabulary words', category: 'English', description: 'Use flashcards for collocations, phrasal verbs, idioms, and academic words.', target: 500, current: 0, unit: 'words', deadline: '2026-09-30', done: false, createdAt: NOW },
  { id: 9133, title: 'Learn 50 essential phrasal verbs', category: 'English', description: 'Focus on the most common phrasal verbs in business and daily conversation.', target: 50, current: 0, unit: 'phrasal verbs', deadline: '2026-07-31', done: false, createdAt: NOW },
  { id: 9134, title: 'Write 30 English paragraphs for practice', category: 'English', description: 'Practice linking words, sentence variety, and clear argumentation.', target: 30, current: 0, unit: 'paragraphs', deadline: '2026-08-31', done: false, createdAt: NOW },
];
