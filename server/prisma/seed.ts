import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const LANGUAGES_DATA = [
  { code: 'es', name: 'Spanish', nativeName: 'Español', flagEmoji: '🇪🇸', scriptDirection: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', flagEmoji: '🇫🇷', scriptDirection: 'ltr' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flagEmoji: '🇯🇵', scriptDirection: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flagEmoji: '🇩🇪', scriptDirection: 'ltr' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flagEmoji: '🇮🇹', scriptDirection: 'ltr' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flagEmoji: '🇵🇹', scriptDirection: 'ltr' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flagEmoji: '🇷🇺', scriptDirection: 'ltr' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flagEmoji: '🇨🇳', scriptDirection: 'ltr' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flagEmoji: '🇰🇷', scriptDirection: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flagEmoji: '🇸🇦', scriptDirection: 'rtl' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flagEmoji: '🇮🇳', scriptDirection: 'ltr' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flagEmoji: '🇮🇳', scriptDirection: 'ltr' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flagEmoji: '🇹🇷', scriptDirection: 'ltr' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flagEmoji: '🇳🇱', scriptDirection: 'ltr' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flagEmoji: '🇵🇱', scriptDirection: 'ltr' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flagEmoji: '🇸🇪', scriptDirection: 'ltr' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flagEmoji: '🇬🇷', scriptDirection: 'ltr' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flagEmoji: '🇻🇳', scriptDirection: 'ltr' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flagEmoji: '🇹🇭', scriptDirection: 'ltr' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flagEmoji: '🇮🇩', scriptDirection: 'ltr' }
];

const BADGES_DATA = [
  { code: 'first_step', name: 'First Step', description: 'Completed your first UniLang lesson.', icon: '🌱', tier: 'bronze' },
  { code: 'streak_3', name: '3-Day Fire', description: 'Maintained a 3-day practice streak.', icon: '🔥', tier: 'bronze' },
  { code: 'streak_7', name: 'Week Warrior', description: 'Maintained a 7-day practice streak.', icon: '⚡', tier: 'silver' },
  { code: 'streak_30', name: 'Unstoppable Force', description: 'Maintained a 30-day practice streak.', icon: '🏆', tier: 'gold' },
  { code: 'vocab_10', name: 'Word Collector', description: 'Saved 10 words to your SRS vocabulary deck.', icon: '📚', tier: 'bronze' },
  { code: 'vocab_50', name: 'Lexicon Builder', description: 'Saved 50 words to your SRS vocabulary deck.', icon: '🧠', tier: 'silver' },
  { code: 'vocab_200', name: 'Polyglot Mind', description: 'Mastered 200 words in your SRS vocabulary deck.', icon: '👑', tier: 'gold' },
  { code: 'perfect_quiz', name: 'Flawless Victory', description: 'Scored 100% on any lesson quiz.', icon: '🎯', tier: 'bronze' },
  { code: 'pronunciation_pro', name: 'Native Tone', description: 'Achieved 90%+ pronunciation accuracy score.', icon: '🎙️', tier: 'silver' },
  { code: 'culture_voyager', name: 'Culture Voyager', description: 'Explored cultural milestones in 5 different languages.', icon: '🌍', tier: 'bronze' },
  { code: 'ai_conversationalist', name: 'AI Dialogue Partner', description: 'Completed a 10-turn conversation with an AI partner.', icon: '💬', tier: 'silver' },
  { code: 'grammar_guru', name: 'Grammar Guru', description: 'Mastered 5 verb conjugation tables without errors.', icon: '📖', tier: 'gold' },
  { code: 'phrasebook_ready', name: 'World Traveler', description: 'Bookmarked 15 phrases in your offline Travel Phrasebook.', icon: '✈️', tier: 'bronze' },
  { code: 'night_owl', name: 'Night Owl', description: 'Completed a learning session after 10 PM.', icon: '🦉', tier: 'bronze' },
  { code: 'early_bird', name: 'Early Bird', description: 'Completed a lesson before 8 AM.', icon: '🌅', tier: 'bronze' },
  { code: 'league_promotion', name: 'Rising Star', description: 'Earned promotion to a higher league tier.', icon: '⭐', tier: 'silver' },
  { code: 'xp_500', name: 'XP Enthusiast', description: 'Accumulated 500 total XP.', icon: '💎', tier: 'bronze' },
  { code: 'xp_2000', name: 'XP Master', description: 'Accumulated 2,000 total XP.', icon: '🔮', tier: 'silver' },
  { code: 'xp_10000', name: 'Legendary Scholar', description: 'Accumulated 10,000 total XP.', icon: '🏅', tier: 'diamond' },
  { code: 'listening_star', name: 'Attentive Ear', description: 'Completed 5 Listen & Transcribe audio exercises.', icon: '🎧', tier: 'bronze' },
  { code: 'reader_milestone', name: 'Avid Reader', description: 'Read 3 parallel dual-language stories in Reading Studio.', icon: '📑', tier: 'silver' },
  { code: 'streak_freeze_used', name: 'Safe Shield', description: 'Protected your streak using a streak freeze.', icon: '🛡️', tier: 'bronze' },
  { code: 'feedback_champ', name: 'Reflective Learner', description: 'Applied 10 grammar coach corrections during AI roleplay.', icon: '💡', tier: 'silver' },
  { code: 'emergency_prepared', name: 'Crisis Ready', description: 'Reviewed all emergency phrases in the phrasebook.', icon: '🚨', tier: 'bronze' },
  { code: 'multi_language', name: 'Multi-Lingual', description: 'Completed lessons across at least 3 distinct languages.', icon: '🌐', tier: 'gold' },
  { code: 'sentence_architect', name: 'Sentence Architect', description: 'Completed 10 sentence reordering challenges flawlessly.', icon: '🧩', tier: 'bronze' },
  { code: 'diamond_league', name: 'Diamond Tier Elite', description: 'Reached the Diamond League tier.', icon: '💎', tier: 'diamond' },
  { code: 'super_reviewer', name: 'SRS Master', description: 'Reviewed 50 flashcards on their exact due date.', icon: '⏰', tier: 'gold' },
  { code: 'culinary_expert', name: 'Foodie Linguist', description: 'Explored cultural cuisine guides for 5 languages.', icon: '🍜', tier: 'bronze' },
  { code: 'etiquette_master', name: 'Diplomatic Manners', description: 'Passed the cultural etiquette quiz with 100%.', icon: '🤝', tier: 'silver' }
];

const QUESTS_DATA = [
  { title: 'Daily Warmup', description: 'Complete 1 lesson today.', targetCount: 1, rewardXp: 20, questType: 'daily', category: 'lesson' },
  { title: 'Vocab Builder', description: 'Review 5 flashcards in your SRS queue.', targetCount: 5, rewardXp: 25, questType: 'daily', category: 'vocab' },
  { title: 'Pronunciation Check', description: 'Practice speaking 3 target phrases.', targetCount: 3, rewardXp: 30, questType: 'daily', category: 'speaking' },
  { title: 'Weekly Scholar', description: 'Complete 7 lessons this week.', targetCount: 7, rewardXp: 150, questType: 'weekly', category: 'lesson' },
  { title: 'Conversation Master', description: 'Engage in 2 AI roleplay sessions.', targetCount: 2, rewardXp: 100, questType: 'weekly', category: 'speaking' }
];

async function main() {
  console.log('🌱 Starting UniLang database seeding...');

  // 1. Seed Languages
  console.log('Seeding 20 languages...');
  for (const lang of LANGUAGES_DATA) {
    await prisma.language.upsert({
      where: { code: lang.code },
      update: { name: lang.name, nativeName: lang.nativeName, flagEmoji: lang.flagEmoji, scriptDirection: lang.scriptDirection },
      create: lang
    });
  }

  // 2. Seed Badges
  console.log('Seeding 30+ badges...');
  for (const badge of BADGES_DATA) {
    await prisma.badge.upsert({
      where: { code: badge.code },
      update: { name: badge.name, description: badge.description, icon: badge.icon, tier: badge.tier },
      create: badge
    });
  }

  // 3. Seed Quests
  console.log('Seeding quest templates...');
  for (const q of QUESTS_DATA) {
    const existing = await prisma.quest.findFirst({ where: { title: q.title } });
    if (!existing) {
      await prisma.quest.create({ data: q });
    }
  }

  // 4. Seed Demo User
  console.log('Seeding demo user: demo@unilang.app...');
  const passwordHash = await bcrypt.hash('demo1234', 10);
  
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@unilang.app' },
    update: { displayName: 'Alex Morgan', passwordHash },
    create: {
      email: 'demo@unilang.app',
      displayName: 'Alex Morgan',
      passwordHash
    }
  });

  // User Preference
  await prisma.userPreference.upsert({
    where: { userId: demoUser.id },
    update: { targetLang: 'es', cefrLevel: 'A1', dailyGoalXp: 50 },
    create: {
      userId: demoUser.id,
      interfaceLang: 'en',
      targetLang: 'es',
      cefrLevel: 'A1',
      dailyGoalXp: 50
    }
  });

  // User Stats
  await prisma.userStats.upsert({
    where: { userId: demoUser.id },
    update: { totalXp: 450, currentStreak: 7, highestStreak: 14 },
    create: {
      userId: demoUser.id,
      totalXp: 450,
      currentStreak: 7,
      highestStreak: 14,
      streakFreezes: 2,
      vocabScore: 65,
      grammarScore: 50,
      listeningScore: 70,
      speakingScore: 60,
      cultureScore: 80
    }
  });

  // Assign starter badges to demo user
  const starterBadgeCodes = ['first_step', 'streak_7', 'vocab_10'];
  for (const code of starterBadgeCodes) {
    const b = await prisma.badge.findUnique({ where: { code } });
    if (b) {
      await prisma.userBadge.upsert({
        where: { userId_badgeId: { userId: demoUser.id, badgeId: b.id } },
        update: {},
        create: { userId: demoUser.id, badgeId: b.id }
      });
    }
  }

  // 5. Seed Core Curricula for Spanish (A1 & A2)
  console.log('Seeding CEFR curricula for Spanish, French, German, Italian, Japanese...');
  const es = await prisma.language.findUnique({ where: { code: 'es' } });
  if (es) {
    const a1Path = await prisma.learningPath.upsert({
      where: { id: 'es-a1-path' },
      update: {},
      create: {
        id: 'es-a1-path',
        languageId: es.id,
        cefrLevel: 'A1',
        title: 'Spanish A1: Breakthrough Foundations',
        description: 'Master essential greetings, food ordering, basic travel navigation, and foundational present tense verbs.',
        sequenceOrder: 1
      }
    });

    // Lesson 1: Greetings & Introductions
    const lesson1 = await prisma.lesson.upsert({
      where: { slug: 'es-a1-greetings' },
      update: {},
      create: {
        learningPathId: a1Path.id,
        title: 'Greetings & Polite Introductions',
        slug: 'es-a1-greetings',
        summary: 'Learn essential everyday Spanish greetings, polite forms of address, and asking someone how they are doing.',
        xpReward: 30,
        sequenceOrder: 1
      }
    });

    // Exercises for Lesson 1 (5 multi-modal types)
    const exData = [
      {
        type: 'multi_choice',
        prompt: "What is the standard polite greeting for 'Good morning' in Spanish?",
        answerData: JSON.stringify({
          options: ['Buenos días', 'Buenas noches', 'Hola amigo', 'Hasta luego'],
          correct: 0,
          hint: "Used before noon.",
          explanation: "'Buenos días' is standard morning greeting in Spanish."
        }),
        sequenceOrder: 1
      },
      {
        type: 'sentence_reorder',
        prompt: "Arrange the words to say: 'Hello, how are you?'",
        answerData: JSON.stringify({
          tokens: ['Hola,', '¿cómo', 'estás', 'tú?'],
          correctSentence: 'Hola, ¿cómo estás tú?',
          distractors: ['bueno', 'gracias']
        }),
        sequenceOrder: 2
      },
      {
        type: 'fill_blank',
        prompt: "Complete the phrase: 'Muchas ______' (Thank you very much)",
        answerData: JSON.stringify({
          correctWord: 'gracias',
          acceptedAlternatives: ['Gracias'],
          hint: "Spanish word for thanks"
        }),
        sequenceOrder: 3
      },
      {
        type: 'audio_match',
        prompt: "Listen to the word and select its English translation: 'Por favor'",
        answerData: JSON.stringify({
          audioPromptText: 'Por favor',
          options: ['Please', 'Thank you', 'Goodbye', 'You are welcome'],
          correct: 0,
          explanation: "'Por favor' literally means 'for favor' = Please."
        }),
        sequenceOrder: 4
      },
      {
        type: 'speak_match',
        prompt: "Speak into the microphone: 'Mucho gusto' (Nice to meet you)",
        answerData: JSON.stringify({
          targetText: 'Mucho gusto',
          phonetic: 'MOO-choh GOO-stoh',
          minAccuracyScore: 70
        }),
        sequenceOrder: 5
      }
    ];

    for (const ex of exData) {
      await prisma.exercise.create({
        data: {
          lessonId: lesson1.id,
          type: ex.type,
          prompt: ex.prompt,
          answerData: ex.answerData,
          sequenceOrder: ex.sequenceOrder
        }
      });
    }

    // Lesson 2: Café & Dining
    const lesson2 = await prisma.lesson.upsert({
      where: { slug: 'es-a1-dining' },
      update: {},
      create: {
        learningPathId: a1Path.id,
        title: 'Ordering at a Spanish Café & Tapas Bar',
        slug: 'es-a1-dining',
        summary: 'Order drinks, tapas, ask for the bill, and explain basic dietary preferences.',
        xpReward: 35,
        sequenceOrder: 2
      }
    });

    const diningExercises = [
      {
        type: 'multi_choice',
        prompt: "How do you politely ask for the check in a Spanish restaurant?",
        answerData: JSON.stringify({
          options: ['La cuenta, por favor', 'Dónde está el baño', 'Quiero pagar ahora', 'Tengo hambre'],
          correct: 0,
          hint: "'La cuenta' means the bill/check.",
          explanation: "'La cuenta, por favor' is the standard polite way to request the bill."
        }),
        sequenceOrder: 1
      },
      {
        type: 'sentence_reorder',
        prompt: "Arrange the words: 'A coffee with milk, please.'",
        answerData: JSON.stringify({
          tokens: ['Un', 'café', 'con', 'leche,', 'por', 'favor.'],
          correctSentence: 'Un café con leche, por favor.',
          distractors: ['agua', 'sin']
        }),
        sequenceOrder: 2
      },
      {
        type: 'fill_blank',
        prompt: "Fill in the blank: 'Quiero un vaso de _____ sin gas.' (water)",
        answerData: JSON.stringify({
          correctWord: 'agua',
          hint: "The Spanish word for water."
        }),
        sequenceOrder: 3
      }
    ];

    for (const ex of diningExercises) {
      await prisma.exercise.create({
        data: {
          lessonId: lesson2.id,
          type: ex.type,
          prompt: ex.prompt,
          answerData: ex.answerData,
          sequenceOrder: ex.sequenceOrder
        }
      });
    }

    // Seed Starter Vocabulary for Demo User in SRS
    console.log('Seeding starter vocabulary & SRS items...');
    const vocabList = [
      { term: 'Hola', lemma: 'hola', meaning: 'Hello / Hi', phonetic: 'OH-lah', partOfSpeech: 'interjection', exampleSentence: 'Hola, ¿cómo estás?' },
      { term: 'Gracias', lemma: 'gracias', meaning: 'Thank you', phonetic: 'GRAH-syahs', partOfSpeech: 'noun', exampleSentence: 'Muchas gracias por la ayuda.' },
      { term: 'Por favor', lemma: 'por favor', meaning: 'Please', phonetic: 'por fah-VOR', partOfSpeech: 'phrase', exampleSentence: 'Un café, por favor.' },
      { term: 'La cuenta', lemma: 'cuenta', meaning: 'The bill / check', phonetic: 'lah KWEN-tah', partOfSpeech: 'noun', exampleSentence: '¿Nos trae la cuenta, por favor?' },
      { term: 'Agua', lemma: 'agua', meaning: 'Water', phonetic: 'AH-gwah', partOfSpeech: 'noun', exampleSentence: 'Quiero agua con gas.' },
      { term: 'Amigo', lemma: 'amigo', meaning: 'Friend', phonetic: 'ah-MEE-goh', partOfSpeech: 'noun', exampleSentence: 'Él es mi mejor amigo.' }
    ];

    for (const v of vocabList) {
      const vocabItem = await prisma.vocabularyItem.create({
        data: {
          languageId: es.id,
          term: v.term,
          lemma: v.lemma,
          meaning: v.meaning,
          phonetic: v.phonetic,
          partOfSpeech: v.partOfSpeech,
          exampleSentence: v.exampleSentence
        }
      });

      // Add to demo user's SRS saved vocabulary
      await prisma.savedVocabulary.create({
        data: {
          userId: demoUser.id,
          vocabularyId: vocabItem.id,
          repetitionCount: 1,
          intervalDays: 1,
          easeFactor: 2.5,
          dueDate: new Date(), // due today!
          retentionScore: 95,
          deck: 'Travel Essentials'
        }
      });
    }

    // Seed Phrasebook Entries
    console.log('Seeding Travel Phrasebook entries...');
    const phrasebookData = [
      { categorySlug: 'emergency', sourceText: 'Help me, please!', targetText: '¡Ayúdeme, por favor!', phonetic: 'ah-YOO-deh-meh por fah-VOR', isEmergency: true },
      { categorySlug: 'emergency', sourceText: 'Call the police!', targetText: '¡Llame a la policía!', phonetic: 'YAH-meh ah lah poh-lee-SEE-ah', isEmergency: true },
      { categorySlug: 'emergency', sourceText: 'Where is the nearest hospital?', targetText: '¿Dónde está el hospital más cercano?', phonetic: 'DOHN-deh eh-STAH el ohs-pee-TAHL mahs sehr-KAH-noh', isEmergency: true },
      { categorySlug: 'medical', sourceText: 'I am allergic to peanuts.', targetText: 'Soy alérgico a los cacahuates.', phonetic: 'soy ah-LEHR-hee-koh ah lohs kah-kah-WAH-tehs', isEmergency: true },
      { categorySlug: 'dining', sourceText: 'Can I have the menu, please?', targetText: '¿Me puede traer el menú, por favor?', phonetic: 'meh PWEH-deh trah-EHR el meh-NOO por fah-VOR', isEmergency: false },
      { categorySlug: 'dining', sourceText: 'Is this vegetarian?', targetText: '¿Esto es vegetariano?', phonetic: 'EHS-toh ehs veh-heh-tah-RYAH-noh', isEmergency: false },
      { categorySlug: 'transit', sourceText: 'Where is the train station?', targetText: '¿Dónde está la estación de tren?', phonetic: 'DOHN-deh eh-STAH lah eh-stah-SYOHN deh trehn', isEmergency: false },
      { categorySlug: 'lodging', sourceText: 'I have a room reservation.', targetText: 'Tengo una reserva de habitación.', phonetic: 'TEHN-goh OO-nah reh-SEHR-vah deh ah-bee-tah-SYOHN', isEmergency: false }
    ];

    for (const p of phrasebookData) {
      await prisma.phrasebookEntry.create({
        data: {
          languageId: es.id,
          categorySlug: p.categorySlug,
          sourceText: p.sourceText,
          targetText: p.targetText,
          phonetic: p.phonetic,
          isEmergency: p.isEmergency
        }
      });
    }
  }

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

