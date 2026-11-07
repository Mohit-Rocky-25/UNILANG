// German A1 & A2 Complete CEFR Curriculum Data
export const GERMAN_CURRICULUM = {
  language: 'de',
  name: 'German',
  flag: '🇩🇪',
  levels: {
    A1: {
      title: 'A1: Einstieg Foundations',
      description: 'Master German introductions, polite cafe orders, directions, and present tense verb conjugations.',
      modules: [
        {
          id: 'de-a1-mod-1',
          slug: 'begruessung-und-hoeflichkeit',
          title: 'Greetings & Politeness',
          category: 'Basics',
          unlockedByDefault: true,
          lessons: [
            {
              id: 'de-a1-l1',
              slug: 'hallo-und-danke',
              title: 'Guten Tag & Danke',
              summary: 'Learn standard day/evening greetings, introductions, and saying please/thank you in German.',
              xp: 25,
              vocabulary: [
                { term: 'Guten Tag', meaning: 'Good day / Hello', phonetic: 'GOO-tehn TAHK' },
                { term: 'Guten Morgen', meaning: 'Good morning', phonetic: 'GOO-tehn MOR-gehn' },
                { term: 'Guten Abend', meaning: 'Good evening', phonetic: 'GOO-tehn AH-behnt' },
                { term: 'Bitte', meaning: 'Please / You are welcome', phonetic: 'BIT-teh' },
                { term: 'Vielen Dank', meaning: 'Many thanks', phonetic: 'FEE-lehn DAHN-k' },
                { term: 'Auf Wiedersehen', meaning: 'Goodbye (formal)', phonetic: 'owf VEE-der-zay-ehn' }
              ],
              exercises: [
                {
                  id: 'de-a1-l1-e1',
                  type: 'multi_choice',
                  prompt: "How do you say 'Good morning' in German?",
                  options: ['Guten Morgen', 'Guten Abend', 'Gute Nacht', 'Auf Wiedersehen'],
                  correct: 0,
                  explanation: "'Guten Morgen' is used in the morning hours before noon."
                },
                {
                  id: 'de-a1-l1-e2',
                  type: 'sentence_reorder',
                  prompt: "Arrange: 'Guten Tag, wie geht es Ihnen?'",
                  tokens: ['Guten', 'Tag,', 'wie', 'geht', 'es', 'Ihnen?'],
                  correctSentence: 'Guten Tag, wie geht es Ihnen?',
                  distractors: ['danke', 'du']
                },
                {
                  id: 'de-a1-l1-e3',
                  type: 'fill_blank',
                  prompt: "Complete: 'Vielen ______' (Many thanks)",
                  correctWord: 'Dank',
                  hint: "Capitalized D."
                },
                {
                  id: 'de-a1-l1-e4',
                  type: 'listen_transcribe',
                  prompt: "Listen and write: 'Vielen Dank bitte'",
                  audioText: 'Vielen Dank bitte',
                  correctWord: 'Vielen Dank bitte'
                },
                {
                  id: 'de-a1-l1-e5',
                  type: 'speak_match',
                  prompt: "Say: 'Auf Wiedersehen'",
                  targetText: 'Auf Wiedersehen',
                  phonetic: 'owf VEE-der-zay-ehn',
                  minAccuracyScore: 70
                },
                {
                  id: 'de-a1-l1-e6',
                  type: 'multi_choice',
                  prompt: "What does 'Bitte' mean in German?",
                  options: ['Both Please and You are welcome', 'Only Goodbye', 'Only Hello', 'Excuse me'],
                  correct: 0,
                  explanation: "'Bitte' is versatile: used for 'please', 'you are welcome', and 'here you go'."
                },
                {
                  id: 'de-a1-l1-e7',
                  type: 'sentence_reorder',
                  prompt: "Arrange: 'Danke schön, auf Wiedersehen.'",
                  tokens: ['Danke', 'schön,', 'auf', 'Wiedersehen.'],
                  correctSentence: 'Danke schön, auf Wiedersehen.',
                  distractors: ['morgen', 'bitte']
                },
                {
                  id: 'de-a1-l1-e8',
                  type: 'fill_blank',
                  prompt: "Say good evening: 'Guten ______'",
                  correctWord: 'Abend',
                  hint: "Capitalized A."
                }
              ]
            }
          ]
        }
      ]
    },
    A2: {
      title: 'A2: Grundstufe Professional',
      description: 'Navigate workplace situations, polite business registers (Sie vs du), and public transport.',
      modules: [
        {
          id: 'de-a2-mod-1',
          slug: 'arbeitswelt-und-termin',
          title: 'Workplace & Appointments',
          category: 'Workplace',
          unlockedByDefault: false,
          lessons: [
            {
              id: 'de-a2-l1',
              slug: 'das-vorstellungsgespraech',
              title: 'Job Interview & Meetings',
              summary: 'Use polite formal German (Sie), discuss qualifications, and ask about schedules.',
              xp: 40,
              vocabulary: [
                { term: 'Das Vorstellungsgespräch', meaning: 'The job interview', phonetic: 'dahs for-SHTEL-oongs-geh-shpreysh' },
                { term: 'Die Erfahrung', meaning: 'The experience', phonetic: 'dee ehr-FAH-roong' },
                { term: 'Ich interessiere mich für', meaning: 'I am interested in', phonetic: 'eekh in-teh-reh-SEE-reh meekh foor' },
                { term: 'Können Sie mir helfen?', meaning: 'Can you help me? (formal)', phonetic: 'KURN-nehn zee meer HEL-fehn' }
              ],
              exercises: [
                {
                  id: 'de-a2-l1-e1',
                  type: 'multi_choice',
                  prompt: "In a German job interview, which pronoun must you use to address the interviewer?",
                  options: ['Sie (formal)', 'du (informal)', 'ihr (plural informal)', 'man (general)'],
                  correct: 0,
                  explanation: "Professional etiquette in Germany strictly requires formal 'Sie' in corporate settings."
                },
                {
                  id: 'de-a2-l1-e2',
                  type: 'sentence_reorder',
                  prompt: "Arrange: 'Ich habe drei Jahre Erfahrung im Marketing.'",
                  tokens: ['Ich', 'habe', 'drei', 'Jahre', 'Erfahrung', 'im', 'Marketing.'],
                  correctSentence: 'Ich habe drei Jahre Erfahrung im Marketing.',
                  distractors: ['du', 'bist']
                },
                {
                  id: 'de-a2-l1-e3',
                  type: 'fill_blank',
                  prompt: "Fill in: 'Wann beginnt das ______ ?' (meeting / interview)",
                  correctWord: 'Meeting',
                  hint: "Common corporate term."
                },
                {
                  id: 'de-a2-l1-e4',
                  type: 'speak_match',
                  prompt: "Say: 'Sehr erfreut, Sie kennenzulernen'",
                  targetText: 'Sehr erfreut, Sie kennenzulernen',
                  phonetic: 'zayr ehr-FROYT zee KEN-nehn-tsoo-LEHR-nehn',
                  minAccuracyScore: 70
                },
                {
                  id: 'de-a2-l1-e5',
                  type: 'listen_transcribe',
                  prompt: "Listen and type: 'Ich freue mich auf die Zusammenarbeit'",
                  audioText: 'Ich freue mich auf die Zusammenarbeit',
                  correctWord: 'Ich freue mich auf die Zusammenarbeit'
                },
                {
                  id: 'de-a2-l1-e6',
                  type: 'multi_choice',
                  prompt: "What does 'Erfahrung' mean?",
                  options: ['Experience', 'Education', 'Salary', 'Contract'],
                  correct: 0
                },
                {
                  id: 'de-a2-l1-e7',
                  type: 'sentence_reorder',
                  prompt: "Arrange: 'Haben Sie Fragen an uns?'",
                  tokens: ['Haben', 'Sie', 'Fragen', 'an', 'uns?'],
                  correctSentence: 'Haben Sie Fragen an uns?',
                  distractors: ['hast', 'du']
                },
                {
                  id: 'de-a2-l1-e8',
                  type: 'fill_blank',
                  prompt: "Type the formal possessive: 'Vielen Dank für _____ Zeit.' (your time)",
                  correctWord: 'Ihre',
                  hint: "Capitalized I."
                }
              ]
            }
          ]
        }
      ]
    }
  }
};

