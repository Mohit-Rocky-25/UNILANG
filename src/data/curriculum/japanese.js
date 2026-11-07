// Japanese A1 & A2 Complete CEFR Curriculum Data
export const JAPANESE_CURRICULUM = {
  language: 'ja',
  name: 'Japanese',
  flag: '🇯🇵',
  levels: {
    A1: {
      title: 'A1: Hajime Foundations',
      description: 'Master everyday Japanese greetings, ordering in ramen shops, bowing etiquette, and basic desu/masu grammar.',
      modules: [
        {
          id: 'ja-a1-mod-1',
          slug: 'aisatsu-to-reigi',
          title: 'Greetings & Etiquette (Aisatsu)',
          category: 'Basics',
          unlockedByDefault: true,
          lessons: [
            {
              id: 'ja-a1-l1',
              slug: 'konnichiwa-arigatou',
              title: 'Konnichiwa & Arigatou',
              summary: 'Learn essential Japanese greetings, polite expressions, and daily politeness.',
              xp: 25,
              vocabulary: [
                { term: 'こんにちは', romaji: 'Konnichiwa', meaning: 'Hello / Good afternoon', phonetic: 'kon-nee-chee-WAH' },
                { term: 'おはようございます', romaji: 'Ohayou gozaimasu', meaning: 'Good morning (polite)', phonetic: 'oh-hah-yoh goh-zye-moss' },
                { term: 'こんばんは', romaji: 'Konbanwa', meaning: 'Good evening', phonetic: 'kohn-bahn-wah' },
                { term: 'ありがとう ございます', romaji: 'Arigatou gozaimasu', meaning: 'Thank you very much (polite)', phonetic: 'ah-ree-GAH-toh goh-zye-moss' },
                { term: 'すみません', romaji: 'Sumimasen', meaning: 'Excuse me / Sorry', phonetic: 'soo-mee-mah-SEHN' },
                { term: 'お願いします', romaji: 'Onegaishimasu', meaning: 'Please (requesting)', phonetic: 'oh-neh-guy-shee-moss' }
              ],
              exercises: [
                {
                  id: 'ja-a1-l1-e1',
                  type: 'multi_choice',
                  prompt: "How do you say 'Good morning' politely in Japanese?",
                  options: ['おはようございます (Ohayou gozaimasu)', 'こんにちは (Konnichiwa)', 'こんばんは (Konbanwa)', 'さようなら (Sayonara)'],
                  correct: 0,
                  explanation: "'Ohayou gozaimasu' is the standard polite morning greeting."
                },
                {
                  id: 'ja-a1-l1-e2',
                  type: 'sentence_reorder',
                  prompt: "Arrange: '水 を お願いします' (Water, please)",
                  tokens: ['水 (Mizu)', 'を (o)', 'お願いします (onegaishimasu)'],
                  correctSentence: '水 を お願いします',
                  distractors: ['ありがとう', 'こんにちは']
                },
                {
                  id: 'ja-a1-l1-e3',
                  type: 'fill_blank',
                  prompt: "Fill in the missing word: 'ありがとう _________' (Thank you very much, polite)",
                  correctWord: 'ございます',
                  hint: "Romaji: gozaimasu (adds politeness)."
                },
                {
                  id: 'ja-a1-l1-e4',
                  type: 'listen_transcribe',
                  prompt: "Listen and type in romaji or kana: 'Sumimasen'",
                  audioText: 'すみません',
                  correctWord: 'Sumimasen',
                  hint: "Means excuse me."
                },
                {
                  id: 'ja-a1-l1-e5',
                  type: 'speak_match',
                  prompt: "Say: 'Arigatou gozaimasu'",
                  targetText: 'ありがとう ございます',
                  phonetic: 'ah-ree-GAH-toh goh-zye-moss',
                  minAccuracyScore: 70
                },
                {
                  id: 'ja-a1-l1-e6',
                  type: 'multi_choice',
                  prompt: "What does 'Sumimasen' mean in Japanese?",
                  options: ['Both Excuse me and Sorry / Thank you', 'Only Goodbye', 'Only Hello', 'No'],
                  correct: 0,
                  explanation: "'Sumimasen' is multifunctional: used to get attention, apologize, and express gratitude for a favor."
                },
                {
                  id: 'ja-a1-l1-e7',
                  type: 'sentence_reorder',
                  prompt: "Arrange: 'はじめまして、よろしく お願いします' (Nice to meet you)",
                  tokens: ['はじめまして、', 'よろしく', 'お願いします'],
                  correctSentence: 'はじめまして、 よろしく お願いします',
                  distractors: ['さようなら', 'おはよう']
                },
                {
                  id: 'ja-a1-l1-e8',
                  type: 'fill_blank',
                  prompt: "Say good evening: '_______' (Konbanwa)",
                  correctWord: 'こんばんは',
                  hint: "Written with 'ha' pronounced 'wa'."
                }
              ]
            }
          ]
        }
      ]
    },
    A2: {
      title: 'A2: Ryokou & Seikatsu',
      description: 'Navigate train stations in Tokyo (JR Yamanote), order with ticket vending machines (kenbaiki), and explain basic plans.',
      modules: [
        {
          id: 'ja-a2-mod-1',
          slug: 'densha-to-eki',
          title: 'Train Stations & Convenience Stores',
          category: 'Travel',
          unlockedByDefault: false,
          lessons: [
            {
              id: 'ja-a2-l1',
              slug: 'tokyo-eki-shinkansen',
              title: 'Navigating Tokyo Station & Shinkansen',
              summary: 'Ask for train lines, buying IC card top-ups (Suica/Pasmo), and Shinkansen platforms.',
              xp: 35,
              vocabulary: [
                { term: '駅', romaji: 'Eki', meaning: 'Station', phonetic: 'eh-kee' },
                { term: '切符', romaji: 'Kippu', meaning: 'Ticket', phonetic: 'keep-poo' },
                { term: '新幹線', romaji: 'Shinkansen', meaning: 'Bullet train', phonetic: 'sheen-kahn-sehn' },
                { term: 'どこですか', romaji: 'Doko desu ka', meaning: 'Where is it?', phonetic: 'doh-koh deh-soo kah' }
              ],
              exercises: [
                {
                  id: 'ja-a2-l1-e1',
                  type: 'multi_choice',
                  prompt: "How do you ask 'Where is the station?' in Japanese?",
                  options: ['駅は どこですか？ (Eki wa doko desu ka?)', 'これは いくらですか？', 'トイレは ありますか？', '何時ですか？'],
                  correct: 0
                },
                {
                  id: 'ja-a2-l1-e2',
                  type: 'sentence_reorder',
                  prompt: "Arrange: '新宿駅は どこですか？' (Where is Shinjuku station?)",
                  tokens: ['新宿駅は', 'どこですか？'],
                  correctSentence: '新宿駅は どこですか？',
                  distractors: ['いくら', 'これ']
                },
                {
                  id: 'ja-a2-l1-e3',
                  type: 'fill_blank',
                  prompt: "Fill in: '東京までの _____ を 一枚 お願いします。' (ticket = kippu)",
                  correctWord: '切符',
                  hint: "Romaji: kippu"
                },
                {
                  id: 'ja-a2-l1-e4',
                  type: 'speak_match',
                  prompt: "Say: 'Kore wa ikura desu ka?' (How much is this?)",
                  targetText: 'これは いくらですか？',
                  phonetic: 'koh-reh wah ee-koo-rah deh-soo kah?',
                  minAccuracyScore: 70
                },
                {
                  id: 'ja-a2-l1-e5',
                  type: 'listen_transcribe',
                  prompt: "Listen and type in romaji: 'Arigatou gozaimashita'",
                  audioText: 'ありがとうございました',
                  correctWord: 'Arigatou gozaimashita'
                },
                {
                  id: 'ja-a2-l1-e6',
                  type: 'multi_choice',
                  prompt: "What is an IC card like Suica or Pasmo used for in Japan?",
                  options: ['Trains, buses, and convenience store payments with a tap', 'Only calling long distance', 'Emergency medicine', 'Hotel keys only'],
                  correct: 0
                },
                {
                  id: 'ja-a2-l1-e7',
                  type: 'sentence_reorder',
                  prompt: "Arrange: 'Suica に チャージ したいです。' (I want to charge my Suica)",
                  tokens: ['Suica', 'に', 'チャージ', 'したいです。'],
                  correctSentence: 'Suica に チャージ したいです。',
                  distractors: ['切符', 'どこ']
                },
                {
                  id: 'ja-a2-l1-e8',
                  type: 'fill_blank',
                  prompt: "Complete: '新幹線は 何番線 _____ か？' (desu)",
                  correctWord: 'です',
                  hint: "Copula verb meaning 'is/are'."
                }
              ]
            }
          ]
        }
      ]
    }
  }
};

