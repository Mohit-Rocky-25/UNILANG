// Spanish A1 & A2 Complete CEFR Curriculum Data
export const SPANISH_CURRICULUM = {
  language: 'es',
  name: 'Spanish',
  flag: '🇪🇸',
  levels: {
    A1: {
      title: 'A1: Breakthrough Foundations',
      description: 'Master everyday essentials: greetings, ordering in cafés, shopping, directions, and present tense verbs.',
      modules: [
        {
          id: 'es-a1-mod-1',
          slug: 'greetings-and-introductions',
          title: 'Greetings & Introductions',
          category: 'Basics',
          unlockedByDefault: true,
          lessons: [
            {
              id: 'es-a1-l1',
              slug: 'hello-and-courtesy',
              title: 'Hello & Basic Courtesy',
              summary: 'Master standard greetings, day/night greetings, and polite expressions.',
              xp: 25,
              vocabulary: [
                { term: 'Hola', meaning: 'Hello', phonetic: 'OH-lah' },
                { term: 'Buenos días', meaning: 'Good morning', phonetic: 'BWEH-nohs DEE-ahs' },
                { term: 'Buenas tardes', meaning: 'Good afternoon', phonetic: 'BWEH-nahs TAHR-dehs' },
                { term: 'Buenas noches', meaning: 'Good evening / night', phonetic: 'BWEH-nahs NOH-chehs' },
                { term: 'Por favor', meaning: 'Please', phonetic: 'por fah-VOR' },
                { term: 'Muchas gracias', meaning: 'Thank you very much', phonetic: 'MOO-chahs GRAH-syahs' },
                { term: 'De nada', meaning: "You're welcome", phonetic: 'deh NAH-dah' },
                { term: 'Adiós', meaning: 'Goodbye', phonetic: 'ah-DYOHS' }
              ],
              exercises: [
                {
                  id: 'es-a1-l1-e1',
                  type: 'multi_choice',
                  prompt: "How do you say 'Good morning' in Spanish?",
                  options: ['Buenos días', 'Buenas tardes', 'Buenas noches', 'Hola'],
                  correct: 0,
                  hint: "Used before noon.",
                  explanation: "'Buenos días' is standard before 12:00 PM."
                },
                {
                  id: 'es-a1-l1-e2',
                  type: 'sentence_reorder',
                  prompt: "Arrange the words to say: 'Hello, good afternoon.'",
                  tokens: ['Hola,', 'buenas', 'tardes.'],
                  correctSentence: 'Hola, buenas tardes.',
                  distractors: ['días', 'gracias']
                },
                {
                  id: 'es-a1-l1-e3',
                  type: 'fill_blank',
                  prompt: "Complete the courtesy phrase: 'De _______' (You're welcome)",
                  correctWord: 'nada',
                  hint: "Literally 'of nothing'."
                },
                {
                  id: 'es-a1-l1-e4',
                  type: 'listen_transcribe',
                  prompt: "Listen to the audio and transcribe the phrase.",
                  audioText: 'Muchas gracias por favor',
                  correctWord: 'Muchas gracias por favor',
                  hint: "Two polite expressions together."
                },
                {
                  id: 'es-a1-l1-e5',
                  type: 'speak_match',
                  prompt: "Speak into the microphone: 'Mucho gusto'",
                  targetText: 'Mucho gusto',
                  phonetic: 'MOO-choh GOO-stoh',
                  minAccuracyScore: 70
                },
                {
                  id: 'es-a1-l1-e6',
                  type: 'multi_choice',
                  prompt: "Which phrase means 'You're welcome' in Spanish?",
                  options: ['De nada', 'Por favor', 'Perdón', 'Hasta luego'],
                  correct: 0,
                  explanation: "'De nada' means you are welcome (literally of nothing)."
                },
                {
                  id: 'es-a1-l1-e7',
                  type: 'sentence_reorder',
                  prompt: "Arrange the words: 'Goodbye, see you tomorrow.'",
                  tokens: ['Adiós,', 'hasta', 'mañana.'],
                  correctSentence: 'Adiós, hasta mañana.',
                  distractors: ['bueno', 'por']
                },
                {
                  id: 'es-a1-l1-e8',
                  type: 'fill_blank',
                  prompt: "Type the missing word: 'Por ______' (Please)",
                  correctWord: 'favor',
                  hint: "Begins with f."
                }
              ]
            },
            {
              id: 'es-a1-l2',
              slug: 'personal-introductions',
              title: 'Personal Introductions & Origins',
              summary: 'Introduce yourself, state your name, nationality, and where you are from.',
              xp: 30,
              vocabulary: [
                { term: 'Me llamo', meaning: 'My name is', phonetic: 'meh YAH-moh' },
                { term: '¿Cómo te llamas?', meaning: 'What is your name?', phonetic: 'KOH-moh teh YAH-mahs' },
                { term: 'Soy de', meaning: 'I am from', phonetic: 'soy deh' },
                { term: 'Mucho gusto', meaning: 'Nice to meet you', phonetic: 'MOO-choh GOO-stoh' },
                { term: 'Encantado / Encantada', meaning: 'Delighted to meet you', phonetic: 'en-kahn-TAH-doh' }
              ],
              exercises: [
                {
                  id: 'es-a1-l2-e1',
                  type: 'multi_choice',
                  prompt: "What does 'Me llamo...' mean?",
                  options: ['My name is...', 'I live in...', 'I am from...', 'How are you?'],
                  correct: 0,
                  explanation: "'Me llamo' literally translates to 'I call myself'."
                },
                {
                  id: 'es-a1-l2-e2',
                  type: 'sentence_reorder',
                  prompt: "Arrange: 'Me llamo Alex y soy de España.'",
                  tokens: ['Me', 'llamo', 'Alex', 'y', 'soy', 'de', 'España.'],
                  correctSentence: 'Me llamo Alex y soy de España.',
                  distractors: ['cómo', 'estás']
                },
                {
                  id: 'es-a1-l2-e3',
                  type: 'fill_blank',
                  prompt: "Fill in: '¿De dónde ______ tú?' (are you from)",
                  correctWord: 'eres',
                  hint: "Present tense of ser for tú."
                },
                {
                  id: 'es-a1-l2-e4',
                  type: 'speak_match',
                  prompt: "Pronounce: 'Encantado de conocerte'",
                  targetText: 'Encantado de conocerte',
                  phonetic: 'en-kahn-TAH-doh deh koh-noh-SEHR-teh',
                  minAccuracyScore: 70
                },
                {
                  id: 'es-a1-l2-e5',
                  type: 'listen_transcribe',
                  prompt: "Listen and write the phrase.",
                  audioText: 'Mucho gusto amigo',
                  correctWord: 'Mucho gusto amigo'
                },
                {
                  id: 'es-a1-l2-e6',
                  type: 'multi_choice',
                  prompt: "How does a female speaker say 'Delighted' in Spanish?",
                  options: ['Encantada', 'Encantado', 'Mucho', 'Bien'],
                  correct: 0,
                  explanation: "Adjectives matching a female speaker take feminine -a ending."
                },
                {
                  id: 'es-a1-l2-e7',
                  type: 'sentence_reorder',
                  prompt: "Arrange: '¿Cómo te llamas tú?'",
                  tokens: ['¿Cómo', 'te', 'llamas', 'tú?'],
                  correctSentence: '¿Cómo te llamas tú?',
                  distractors: ['dónde', 'soy']
                },
                {
                  id: 'es-a1-l2-e8',
                  type: 'fill_blank',
                  prompt: "Complete: 'Soy _____ México.' (I am from Mexico)",
                  correctWord: 'de',
                  hint: "Preposition meaning from or of."
                }
              ]
            }
          ]
        },
        {
          id: 'es-a1-mod-2',
          slug: 'cafe-and-dining',
          title: 'Café & Tapas Bar',
          category: 'Travel',
          unlockedByDefault: false,
          lessons: [
            {
              id: 'es-a1-l3',
              slug: 'ordering-coffee-drinks',
              title: 'Ordering Coffee & Drinks',
              summary: 'Order drinks, express preferences for milk and sugar, and ask for water.',
              xp: 30,
              vocabulary: [
                { term: 'Un café solo', meaning: 'An espresso', phonetic: 'oon kah-FEH SOH-loh' },
                { term: 'Un café con leche', meaning: 'Coffee with milk', phonetic: 'oon kah-FEH kohn LEH-cheh' },
                { term: 'Agua sin gas', meaning: 'Still water', phonetic: 'AH-gwah seen gahs' },
                { term: 'Agua con gas', meaning: 'Sparkling water', phonetic: 'AH-gwah kohn gahs' },
                { term: 'La cuenta', meaning: 'The check / bill', phonetic: 'lah KWEN-tah' },
                { term: 'Quisiera', meaning: 'I would like', phonetic: 'kee-SYEH-rah' }
              ],
              exercises: [
                {
                  id: 'es-a1-l3-e1',
                  type: 'multi_choice',
                  prompt: "How do you ask for still water in Spain?",
                  options: ['Agua sin gas', 'Agua con gas', 'Café solo', 'Té verde'],
                  correct: 0,
                  explanation: "'Sin gas' means without gas / still."
                },
                {
                  id: 'es-a1-l3-e2',
                  type: 'sentence_reorder',
                  prompt: "Arrange: 'Quisiera un café con leche, por favor.'",
                  tokens: ['Quisiera', 'un', 'café', 'con', 'leche,', 'por', 'favor.'],
                  correctSentence: 'Quisiera un café con leche, por favor.',
                  distractors: ['agua', 'sin']
                },
                {
                  id: 'es-a1-l3-e3',
                  type: 'fill_blank',
                  prompt: "Ask for the check: 'La ______, por favor.'",
                  correctWord: 'cuenta',
                  hint: "The bill."
                },
                {
                  id: 'es-a1-l3-e4',
                  type: 'speak_match',
                  prompt: "Say: 'La cuenta, por favor'",
                  targetText: 'La cuenta, por favor',
                  phonetic: 'lah KWEN-tah por fah-VOR',
                  minAccuracyScore: 70
                },
                {
                  id: 'es-a1-l3-e5',
                  type: 'listen_transcribe',
                  prompt: "Listen and type: 'Un café con leche'",
                  audioText: 'Un café con leche',
                  correctWord: 'Un café con leche'
                },
                {
                  id: 'es-a1-l3-e6',
                  type: 'multi_choice',
                  prompt: "What is 'un café solo'?",
                  options: ['An espresso (black coffee)', 'Coffee with milk', 'Iced coffee', 'Decaf'],
                  correct: 0
                },
                {
                  id: 'es-a1-l3-e7',
                  type: 'sentence_reorder',
                  prompt: "Arrange: 'Una botella de agua, por favor.'",
                  tokens: ['Una', 'botella', 'de', 'agua,', 'por', 'favor.'],
                  correctSentence: 'Una botella de agua, por favor.',
                  distractors: ['cuenta', 'café']
                },
                {
                  id: 'es-a1-l3-e8',
                  type: 'fill_blank',
                  prompt: "Complete: '¿Cuánto ______?' (How much is it?)",
                  correctWord: 'cuesta',
                  hint: "Present form of costar."
                }
              ]
            }
          ]
        }
      ]
    },
    A2: {
      title: 'A2: Waystage Independence',
      description: 'Expand your conversational range: describe past experiences, book hotels, explain symptoms, and navigate transit.',
      modules: [
        {
          id: 'es-a2-mod-1',
          slug: 'past-events-weekend',
          title: 'Past Events & Past Weekend',
          category: 'Social',
          unlockedByDefault: false,
          lessons: [
            {
              id: 'es-a2-l1',
              slug: 'what-did-you-do',
              title: 'What Did You Do This Weekend?',
              summary: 'Use the pretérito perfecto and pretérito indefinido to talk about past activities.',
              xp: 40,
              vocabulary: [
                { term: 'Ayer', meaning: 'Yesterday', phonetic: 'ah-YEHR' },
                { term: 'El fin de semana', meaning: 'The weekend', phonetic: 'el feen deh seh-MAH-nah' },
                { term: 'Fui a', meaning: 'I went to', phonetic: 'fwee ah' },
                { term: 'Comí', meaning: 'I ate', phonetic: 'koh-MEE' },
                { term: 'Estuve en', meaning: 'I was in/at', phonetic: 'eh-STOO-veh ehn' }
              ],
              exercises: [
                {
                  id: 'es-a2-l1-e1',
                  type: 'multi_choice',
                  prompt: "How do you say 'Yesterday I went to the beach' in Spanish?",
                  options: ['Ayer fui a la playa', 'Hoy voy a la playa', 'Mañana iré a la playa', 'Ayer como en la playa'],
                  correct: 0,
                  explanation: "'Fui' is the preterite of ir (to go) for yo."
                },
                {
                  id: 'es-a2-l1-e2',
                  type: 'sentence_reorder',
                  prompt: "Arrange: 'El fin de semana descansé en casa.'",
                  tokens: ['El', 'fin', 'de', 'semana', 'descansé', 'en', 'casa.'],
                  correctSentence: 'El fin de semana descansé en casa.',
                  distractors: ['mañana', 'fui']
                },
                {
                  id: 'es-a2-l1-e3',
                  type: 'fill_blank',
                  prompt: "Complete: 'Ayer ______ paella con mis amigos.' (I ate)",
                  correctWord: 'comí',
                  hint: "Preterite of comer for yo."
                },
                {
                  id: 'es-a2-l1-e4',
                  type: 'speak_match',
                  prompt: "Say: 'Ayer fui al museo'",
                  targetText: 'Ayer fui al museo',
                  phonetic: 'ah-YEHR fwee ahl moo-SEH-oh',
                  minAccuracyScore: 70
                },
                {
                  id: 'es-a2-l1-e5',
                  type: 'listen_transcribe',
                  prompt: "Listen and type: 'Estuve en Madrid ayer'",
                  audioText: 'Estuve en Madrid ayer',
                  correctWord: 'Estuve en Madrid ayer'
                },
                {
                  id: 'es-a2-l1-e6',
                  type: 'multi_choice',
                  prompt: "What does 'Lo pasé muy bien' mean?",
                  options: ['I had a great time', 'I arrived late', 'I was tired', 'I lost my way'],
                  correct: 0
                },
                {
                  id: 'es-a2-l1-e7',
                  type: 'sentence_reorder',
                  prompt: "Arrange: '¿Qué hiciste el sábado pasado?'",
                  tokens: ['¿Qué', 'hiciste', 'el', 'sábado', 'pasado?'],
                  correctSentence: '¿Qué hiciste el sábado pasado?',
                  distractors: ['dónde', 'vas']
                },
                {
                  id: 'es-a2-l1-e8',
                  type: 'fill_blank',
                  prompt: "Fill in: 'El viaje _____ muy interesante.' (was)",
                  correctWord: 'fue',
                  hint: "Preterite of ser for 3rd person singular."
                }
              ]
            }
          ]
        }
      ]
    }
  }
};

