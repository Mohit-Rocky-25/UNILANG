// French A1 & A2 Complete CEFR Curriculum Data
export const FRENCH_CURRICULUM = {
  language: 'fr',
  name: 'French',
  flag: '🇫🇷',
  levels: {
    A1: {
      title: 'A1: Découverte Foundations',
      description: 'Master French greetings, polite restaurant orders, transport, numbers, and basic present tense verbs.',
      modules: [
        {
          id: 'fr-a1-mod-1',
          slug: 'salutations-et-politesse',
          title: 'Greetings & Politeness',
          category: 'Basics',
          unlockedByDefault: true,
          lessons: [
            {
              id: 'fr-a1-l1',
              slug: 'bonjour-et-merci',
              title: 'Bonjour & Everyday Politeness',
              summary: 'Learn essential everyday French greetings and polite interactions.',
              xp: 25,
              vocabulary: [
                { term: 'Bonjour', meaning: 'Hello / Good morning', phonetic: 'bohn-ZHOOR' },
                { term: 'Bonsoir', meaning: 'Good evening', phonetic: 'bohn-SWAHR' },
                { term: "S'il vous plaît", meaning: 'Please (formal)', phonetic: 'seel voo PLEH' },
                { term: 'Merci beaucoup', meaning: 'Thank you very much', phonetic: 'mehr-SEE boh-KOO' },
                { term: 'De rien', meaning: "You're welcome", phonetic: 'duh RYEHN' },
                { term: 'Au revoir', meaning: 'Goodbye', phonetic: 'oh ruh-VWAHR' }
              ],
              exercises: [
                {
                  id: 'fr-a1-l1-e1',
                  type: 'multi_choice',
                  prompt: "What is the standard daytime greeting in French?",
                  options: ['Bonjour', 'Bonsoir', 'Bonne nuit', 'Au revoir'],
                  correct: 0,
                  explanation: "'Bonjour' means good day / hello and is used until evening."
                },
                {
                  id: 'fr-a1-l1-e2',
                  type: 'sentence_reorder',
                  prompt: "Arrange: 'Bonjour, s'il vous plaît.'",
                  tokens: ['Bonjour,', "s'il", 'vous', 'plaît.'],
                  correctSentence: "Bonjour, s'il vous plaît.",
                  distractors: ['merci', 'soir']
                },
                {
                  id: 'fr-a1-l1-e3',
                  type: 'fill_blank',
                  prompt: "Complete: 'Merci ________' (Thank you very much)",
                  correctWord: 'beaucoup',
                  hint: "Word for 'a lot'."
                },
                {
                  id: 'fr-a1-l1-e4',
                  type: 'listen_transcribe',
                  prompt: "Listen and write: 'Merci beaucoup'",
                  audioText: 'Merci beaucoup',
                  correctWord: 'Merci beaucoup'
                },
                {
                  id: 'fr-a1-l1-e5',
                  type: 'speak_match',
                  prompt: "Pronounce: 'Au revoir et bonne journée'",
                  targetText: 'Au revoir et bonne journée',
                  phonetic: 'oh ruh-VWAHR ay buhn zhoor-NAY',
                  minAccuracyScore: 70
                },
                {
                  id: 'fr-a1-l1-e6',
                  type: 'multi_choice',
                  prompt: "How do you say 'Good evening' in French?",
                  options: ['Bonsoir', 'Bonjour', 'Salut', 'Adieu'],
                  correct: 0
                },
                {
                  id: 'fr-a1-l1-e7',
                  type: 'sentence_reorder',
                  prompt: "Arrange: 'De rien, monsieur.'",
                  tokens: ['De', 'rien,', 'monsieur.'],
                  correctSentence: 'De rien, monsieur.',
                  distractors: ['bonjour', 's’il']
                },
                {
                  id: 'fr-a1-l1-e8',
                  type: 'fill_blank',
                  prompt: "Type: 'Au ______' (Goodbye)",
                  correctWord: 'revoir',
                  hint: "Literally 'until seeing again'."
                }
              ]
            }
          ]
        }
      ]
    },
    A2: {
      title: 'A2: Survie & Autonomie',
      description: 'Describe past events using passé composé vs imparfait, book hotels, and navigate French cities.',
      modules: [
        {
          id: 'fr-a2-mod-1',
          slug: 'voyage-et-hotel',
          title: 'Travel & Hotel Booking',
          category: 'Travel',
          unlockedByDefault: false,
          lessons: [
            {
              id: 'fr-a2-l1',
              slug: 'reserver-une-chambre',
              title: 'Booking a Hotel Room in Paris',
              summary: 'Inquire about room availability, check-in times, breakfast, and room keys.',
              xp: 35,
              vocabulary: [
                { term: 'Une réservation', meaning: 'A reservation', phonetic: 'oon ray-zehr-vah-SYOHN' },
                { term: 'Une chambre double', meaning: 'A double room', phonetic: 'oon SHAHM-bruh DOO-bluh' },
                { term: 'Le petit déjeuner', meaning: 'Breakfast', phonetic: 'luh puh-TEE day-zhuh-NAY' },
                { term: 'La clé', meaning: 'The key', phonetic: 'lah KLAY' }
              ],
              exercises: [
                {
                  id: 'fr-a2-l1-e1',
                  type: 'multi_choice',
                  prompt: "How do you ask 'Is breakfast included?' in French?",
                  options: ['Le petit déjeuner est-il inclus ?', 'Où est le restaurant ?', 'Je veux manger du pain', 'Combien coûte le café ?'],
                  correct: 0
                },
                {
                  id: 'fr-a2-l1-e2',
                  type: 'sentence_reorder',
                  prompt: "Arrange: 'J'ai une réservation pour deux nuits.'",
                  tokens: ["J'ai", 'une', 'réservation', 'pour', 'deux', 'nuits.'],
                  correctSentence: "J'ai une réservation pour deux nuits.",
                  distractors: ['chambre', 'avec']
                },
                {
                  id: 'fr-a2-l1-e3',
                  type: 'fill_blank',
                  prompt: "Fill in: 'Voici votre _____ de chambre.' (key)",
                  correctWord: 'clé',
                  hint: "French word for key (accent on e)."
                },
                {
                  id: 'fr-a2-l1-e4',
                  type: 'speak_match',
                  prompt: "Say: 'Une chambre pour deux personnes, s'il vous plaît.'",
                  targetText: "Une chambre pour deux personnes, s'il vous plaît.",
                  phonetic: 'oon SHAHM-bruh poor duh pehr-SUHN...',
                  minAccuracyScore: 70
                },
                {
                  id: 'fr-a2-l1-e5',
                  type: 'listen_transcribe',
                  prompt: "Listen and type: 'Voici votre chambre'",
                  audioText: 'Voici votre chambre',
                  correctWord: 'Voici votre chambre'
                },
                {
                  id: 'fr-a2-l1-e6',
                  type: 'multi_choice',
                  prompt: "What is 'le petit déjeuner'?",
                  options: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
                  correct: 0
                },
                {
                  id: 'fr-a2-l1-e7',
                  type: 'sentence_reorder',
                  prompt: "Arrange: 'À quelle heure est le départ ?'",
                  tokens: ['À', 'quelle', 'heure', 'est', 'le', 'départ', '?'],
                  correctSentence: 'À quelle heure est le départ ?',
                  distractors: ['train', 'bonjour']
                },
                {
                  id: 'fr-a2-l1-e8',
                  type: 'fill_blank',
                  prompt: "Complete: 'Le wifi est-il ______ ?' (free)",
                  correctWord: 'gratuit',
                  hint: "Masculine adjective for free."
                }
              ]
            }
          ]
        }
      ]
    }
  }
};

