// Italian A1 & A2 Complete CEFR Curriculum Data
export const ITALIAN_CURRICULUM = {
  language: 'it',
  name: 'Italian',
  flag: '🇮🇹',
  levels: {
    A1: {
      title: 'A1: Contatto Foundations',
      description: 'Master Italian café culture, greetings, polite requests, food, and foundational present tense verbs.',
      modules: [
        {
          id: 'it-a1-mod-1',
          slug: 'saluti-e-cortesia',
          title: 'Saluti & Cortesia',
          category: 'Basics',
          unlockedByDefault: true,
          lessons: [
            {
              id: 'it-a1-l1',
              slug: 'ciao-e-buongiorno',
              title: 'Ciao & Buongiorno',
              summary: 'Learn essential Italian greetings for morning, evening, and casual interactions.',
              xp: 25,
              vocabulary: [
                { term: 'Ciao', meaning: 'Hello / Bye (informal)', phonetic: 'CHOW' },
                { term: 'Buongiorno', meaning: 'Good morning / day', phonetic: 'bwohn-JOHR-noh' },
                { term: 'Buonasera', meaning: 'Good evening', phonetic: 'bwoh-nah-SEH-rah' },
                { term: 'Per favore', meaning: 'Please', phonetic: 'pehr fah-VOH-reh' },
                { term: 'Grazie mille', meaning: 'A thousand thanks', phonetic: 'GRAH-tsyeh MEEL-leh' },
                { term: 'Prego', meaning: "You're welcome", phonetic: 'PRAY-goh' },
                { term: 'Arrivederci', meaning: 'Goodbye (formal)', phonetic: 'ah-ree-veh-DEHR-chee' }
              ],
              exercises: [
                {
                  id: 'it-a1-l1-e1',
                  type: 'multi_choice',
                  prompt: "How do you say 'Good morning' in Italian?",
                  options: ['Buongiorno', 'Buonasera', 'Buonanotte', 'Ciao'],
                  correct: 0,
                  explanation: "'Buongiorno' is standard daytime polite greeting."
                },
                {
                  id: 'it-a1-l1-e2',
                  type: 'sentence_reorder',
                  prompt: "Arrange: 'Un caffè, per favore.'",
                  tokens: ['Un', 'caffè,', 'per', 'favore.'],
                  correctSentence: 'Un caffè, per favore.',
                  distractors: ['buono', 'grazie']
                },
                {
                  id: 'it-a1-l1-e3',
                  type: 'fill_blank',
                  prompt: "Complete: 'Grazie ______' (A thousand thanks)",
                  correctWord: 'mille',
                  hint: "Italian for thousand."
                },
                {
                  id: 'it-a1-l1-e4',
                  type: 'listen_transcribe',
                  prompt: "Listen and write: 'Grazie mille prego'",
                  audioText: 'Grazie mille prego',
                  correctWord: 'Grazie mille prego'
                },
                {
                  id: 'it-a1-l1-e5',
                  type: 'speak_match',
                  prompt: "Say: 'Arrivederci e buona giornata'",
                  targetText: 'Arrivederci e buona giornata',
                  phonetic: 'ah-ree-veh-DEHR-chee ay BWOH-nah johr-NAH-tah',
                  minAccuracyScore: 70
                },
                {
                  id: 'it-a1-l1-e6',
                  type: 'multi_choice',
                  prompt: "What does 'Prego' mean?",
                  options: ["You're welcome / After you", 'Only Goodbye', 'Only Hello', 'Sorry'],
                  correct: 0
                },
                {
                  id: 'it-a1-l1-e7',
                  type: 'sentence_reorder',
                  prompt: "Arrange: 'Piacere di conoscerti.'",
                  tokens: ['Piacere', 'di', 'conoscerti.'],
                  correctSentence: 'Piacere di conoscerti.',
                  distractors: ['ciao', 'grazie']
                },
                {
                  id: 'it-a1-l1-e8',
                  type: 'fill_blank',
                  prompt: "Say please: 'Per ______'",
                  correctWord: 'favore',
                  hint: "Italian word for favor."
                }
              ]
            }
          ]
        },
        {
          id: 'it-a1-mod-2',
          slug: 'bar-italiano-caffe',
          title: 'Il Bar Italiano & Coffee Culture',
          category: 'Culture',
          unlockedByDefault: false,
          lessons: [
            {
              id: 'it-a1-l2',
              slug: 'ordinare-al-bar',
              title: 'Ordering at an Italian Bar',
              summary: 'Learn the unwritten etiquette of coffee culture in Italy: pay first at the cassa, order al banco, and why cappuccino is only for morning.',
              xp: 30,
              vocabulary: [
                { term: 'Un caffè espresso', meaning: 'An espresso', phonetic: 'oon kahf-FEH ehs-PRES-soh' },
                { term: 'Un cappuccino', meaning: 'Cappuccino (morning only!)', phonetic: 'oon kahp-poo-CHEE-noh' },
                { term: 'Un cornetto', meaning: 'Italian croissant', phonetic: 'oon kohr-NEHT-toh' },
                { term: 'Al banco', meaning: 'At the counter', phonetic: 'ahl BAHN-koh' },
                { term: 'Lo scontrino', meaning: 'The receipt / ticket', phonetic: 'loh skohn-TREE-noh' }
              ],
              exercises: [
                {
                  id: 'it-a1-l2-e1',
                  type: 'multi_choice',
                  prompt: "According to Italian coffee etiquette, when is it acceptable to order a cappuccino?",
                  options: ['In the morning (never after 11 AM)', 'After lunch with pasta', 'Right after dinner', 'Any time of day or night'],
                  correct: 0,
                  explanation: "Italians consider warm milk after heavy meals bad for digestion; cappuccino is strictly for breakfast."
                },
                {
                  id: 'it-a1-l2-e2',
                  type: 'sentence_reorder',
                  prompt: "Arrange: 'Un espresso e un cornetto, per favore.'",
                  tokens: ['Un', 'espresso', 'e', 'un', 'cornetto,', 'per', 'favore.'],
                  correctSentence: 'Un espresso e un cornetto, per favore.',
                  distractors: ['acqua', 'cassa']
                },
                {
                  id: 'it-a1-l2-e3',
                  type: 'fill_blank',
                  prompt: "At a bar, drink your coffee at the counter: 'Prendo il caffè al ______.'",
                  correctWord: 'banco',
                  hint: "Counter in Italian."
                },
                {
                  id: 'it-a1-l2-e4',
                  type: 'speak_match',
                  prompt: "Say: 'Un caffè macchiato caldo, per favore'",
                  targetText: 'Un caffè macchiato caldo, per favore',
                  phonetic: 'oon kahf-FEH mahk-KYAH-toh KAHL-doh...',
                  minAccuracyScore: 70
                },
                {
                  id: 'it-a1-l2-e5',
                  type: 'listen_transcribe',
                  prompt: "Listen and type: 'Quanto costa un cappuccino'",
                  audioText: 'Quanto costa un cappuccino',
                  correctWord: 'Quanto costa un cappuccino'
                },
                {
                  id: 'it-a1-l2-e6',
                  type: 'multi_choice',
                  prompt: "What should you do first at a busy Italian bar in train stations?",
                  options: ['Pay at the cash register (cassa) and take the receipt', 'Sit at a table immediately', 'Ask the barista directly without receipt', 'Leave without paying'],
                  correct: 0
                },
                {
                  id: 'it-a1-l2-e7',
                  type: 'sentence_reorder',
                  prompt: "Arrange: 'Ecco lo scontrino, grazie.'",
                  tokens: ['Ecco', 'lo', 'scontrino,', 'grazie.'],
                  correctSentence: 'Ecco lo scontrino, grazie.',
                  distractors: ['caffè', 'banco']
                },
                {
                  id: 'it-a1-l2-e8',
                  type: 'fill_blank',
                  prompt: "Ask for sparkling water: 'Un bicchiere d’acqua _______.'",
                  correctWord: 'frizzante',
                  hint: "Sparkling water in Italian."
                }
              ]
            }
          ]
        }
      ]
    },
    A2: {
      title: 'A2: Sopravvivenza & Viaggio',
      description: 'Master the passato prossimo, navigate regional trains (Frecciarossa), and describe personal experiences.',
      modules: [
        {
          id: 'it-a2-mod-1',
          slug: 'in-viaggio-treno',
          title: 'Traveling by Train in Italy',
          category: 'Travel',
          unlockedByDefault: false,
          lessons: [
            {
              id: 'it-a2-l1',
              slug: 'alla-stazione-ferroviaria',
              title: 'At Roma Termini Train Station',
              summary: 'Buy tickets, find your platform (binario), and validate tickets before boarding.',
              xp: 35,
              vocabulary: [
                { term: 'Il binario', meaning: 'The platform / track', phonetic: 'eel bee-NAH-ryoh' },
                { term: 'Un biglietto di andata e ritorno', meaning: 'A round-trip ticket', phonetic: 'oon beel-YEHT-toh dee ahn-DAH-tah ay ree-TOHR-noh' },
                { term: 'Convalidare il biglietto', meaning: 'To validate the ticket', phonetic: 'kohn-vah-lee-DAH-reh...' }
              ],
              exercises: [
                {
                  id: 'it-a2-l1-e1',
                  type: 'multi_choice',
                  prompt: "What does 'binario' mean on an Italian train timetable?",
                  options: ['Train platform / track', 'Ticket counter', 'Luggage check', 'Delay'],
                  correct: 0
                },
                {
                  id: 'it-a2-l1-e2',
                  type: 'sentence_reorder',
                  prompt: "Arrange: 'A che binario arriva il treno per Firenze?'",
                  tokens: ['A', 'che', 'binario', 'arriva', 'il', 'treno', 'per', 'Firenze?'],
                  correctSentence: 'A che binario arriva il treno per Firenze?',
                  distractors: ['biglietto', 'Roma']
                },
                {
                  id: 'it-a2-l1-e3',
                  type: 'fill_blank',
                  prompt: "Fill in: 'Due biglietti per Milano, per _______.' (please)",
                  correctWord: 'favore',
                  hint: "Please in Italian."
                },
                {
                  id: 'it-a2-l1-e4',
                  type: 'speak_match',
                  prompt: "Say: 'Scusi, questo è il treno per Venezia?'",
                  targetText: 'Scusi, questo è il treno per Venezia?',
                  phonetic: 'SKOO-zee, KWEHS-toh eh eel TRAY-noh pehr veh-NEH-tsyah?',
                  minAccuracyScore: 70
                },
                {
                  id: 'it-a2-l1-e5',
                  type: 'listen_transcribe',
                  prompt: "Listen and type: 'Il treno è in orario'",
                  audioText: 'Il treno è in orario',
                  correctWord: 'Il treno è in orario'
                },
                {
                  id: 'it-a2-l1-e6',
                  type: 'multi_choice',
                  prompt: "What must you do with paper regional train tickets in Italy before boarding?",
                  options: ['Validate them in the yellow/green stamping machines', 'Show them to a police officer', 'Tear them in half', 'Nothing'],
                  correct: 0
                },
                {
                  id: 'it-a2-l1-e7',
                  type: 'sentence_reorder',
                  prompt: "Arrange: 'Il treno parte con dieci minuti di ritardo.'",
                  tokens: ['Il', 'treno', 'parte', 'con', 'dieci', 'minuti', 'di', 'ritardo.'],
                  correctSentence: 'Il treno parte con dieci minuti di ritardo.',
                  distractors: ['binario', 'arrivo']
                },
                {
                  id: 'it-a2-l1-e8',
                  type: 'fill_blank',
                  prompt: "Complete: 'Un biglietto di sola ______.' (one-way)",
                  correctWord: 'andata',
                  hint: "Literally 'going'."
                }
              ]
            }
          ]
        }
      ]
    }
  }
};

