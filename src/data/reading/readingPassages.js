// Seed parallel reading texts across Spanish, French, German, Italian, and Japanese
// Each article includes sentence-level alignment, vocabulary glosses for tap-to-define, and comprehension quiz

export const READING_ARTICLES = [
  // --- SPANISH ---
  {
    id: "es-cafe-madrid",
    langCode: "es",
    title: "Una Tarde en el Café de Madrid",
    category: "Short Story",
    level: "A1",
    readTimeMinutes: 3,
    summary: "Un viaje relajante por las terrazas históricas del barrio de las Letras en Madrid.",
    sentences: [
      {
        id: 0,
        target: "El sol de la tarde brilla sobre la plaza adoquinada.",
        source: "The afternoon sun shines over the cobblestone square.",
        words: [
          { term: "El", meaning: "The (masculine)", pos: "article" },
          { term: "sol", meaning: "sun", pos: "noun", phonetic: "sol" },
          { term: "de", meaning: "of", pos: "preposition" },
          { term: "la", meaning: "the (feminine)", pos: "article" },
          { term: "tarde", meaning: "afternoon / late", pos: "noun", phonetic: "ˈtaɾ.ðe" },
          { term: "brilla", meaning: "shines", pos: "verb (brillar)", phonetic: "ˈbɾi.ʎa" },
          { term: "sobre", meaning: "over / on", pos: "preposition" },
          { term: "plaza", meaning: "square / plaza", pos: "noun", phonetic: "ˈpla.sa" },
          { term: "adoquinada", meaning: "cobblestone / paved", pos: "adjective" }
        ]
      },
      {
        id: 1,
        target: "En una mesa pequeña de madera, Carlos pide un café con leche y una tostada.",
        source: "At a small wooden table, Carlos orders a coffee with milk and toast.",
        words: [
          { term: "mesa", meaning: "table", pos: "noun", phonetic: "ˈme.sa" },
          { term: "pequeña", meaning: "small", pos: "adjective", phonetic: "peˈke.ɲa" },
          { term: "madera", meaning: "wood", pos: "noun" },
          { term: "pide", meaning: "orders / asks for", pos: "verb (pedir)", phonetic: "ˈpi.ðe" },
          { term: "café con leche", meaning: "coffee with milk", pos: "phrase" },
          { term: "tostada", meaning: "toast", pos: "noun" }
        ]
      },
      {
        id: 2,
        target: "El camarero sonríe amablemente y trae la orden con un vaso de agua fresca.",
        source: "The waiter smiles kindly and brings the order with a glass of fresh water.",
        words: [
          { term: "camarero", meaning: "waiter", pos: "noun", phonetic: "kamaˈɾeɾo" },
          { term: "sonríe", meaning: "smiles", pos: "verb (sonreír)" },
          { term: "amablemente", meaning: "kindly", pos: "adverb" },
          { term: "trae", meaning: "brings", pos: "verb (traer)" },
          { term: "orden", meaning: "order", pos: "noun" },
          { term: "vaso", meaning: "glass", pos: "noun" },
          { term: "fresca", meaning: "fresh / cool", pos: "adjective" }
        ]
      },
      {
        id: 3,
        target: "La vida en Madrid se mueve despacio cuando el café está caliente.",
        source: "Life in Madrid moves slowly when the coffee is hot.",
        words: [
          { term: "vida", meaning: "life", pos: "noun" },
          { term: "se mueve", meaning: "moves", pos: "verb (moverse)" },
          { term: "despacio", meaning: "slowly", pos: "adverb", phonetic: "desˈpa.sjo" },
          { term: "caliente", meaning: "hot", pos: "adjective" }
        ]
      }
    ],
    quiz: [
      {
        id: "q1",
        question: "¿Qué pide Carlos en la cafetería?",
        options: ["Té verde y churros", "Un café con leche y una tostada", "Un refresco y patatas", "Una cerveza fría"],
        correctIndex: 1,
        explanation: "El texto dice explícitamente: 'Carlos pide un café con leche y una tostada'."
      },
      {
        id: "q2",
        question: "¿Cómo reacciona el camarero?",
        options: ["Ignora al cliente", "Sonríe amablemente", "Parece enojado", "Habla por teléfono"],
        correctIndex: 1,
        explanation: "El camarero sonríe amablemente y trae la orden con un vaso de agua fresca."
      },
      {
        id: "q3",
        question: "¿Qué significado tiene 'despacio' en la última frase?",
        options: ["Rápidamente", "Lentamente / calmado", "Peligrosamente", "Ruidosamente"],
        correctIndex: 1,
        explanation: "'Despacio' significa 'slowly', reflejando el ritmo tranquilo del café."
      }
    ]
  },
  {
    id: "es-tren-alta-velocidad",
    langCode: "es",
    title: "El AVE y el Futuro del Transporte",
    category: "News",
    level: "A2",
    readTimeMinutes: 4,
    summary: "España expande su red ferroviaria de alta velocidad conectando comunidades y reduciendo emisiones.",
    sentences: [
      {
        id: 0,
        target: "España cuenta con la segunda red de trenes de alta velocidad más extensa del mundo.",
        source: "Spain has the second most extensive high-speed rail network in the world.",
        words: [
          { term: "cuenta con", meaning: "features / has", pos: "verb phrase" },
          { term: "segunda", meaning: "second", pos: "ordinal" },
          { term: "red", meaning: "network / web", pos: "noun" },
          { term: "alta velocidad", meaning: "high speed", pos: "noun phrase" },
          { term: "extensa", meaning: "extensive", pos: "adjective" },
          { term: "mundo", meaning: "world", pos: "noun" }
        ]
      },
      {
        id: 1,
        target: "El tren conecta Madrid con Barcelona en menos de tres horas de viaje cómodo.",
        source: "The train connects Madrid with Barcelona in less than three hours of comfortable travel.",
        words: [
          { term: "conecta", meaning: "connects", pos: "verb (conectar)" },
          { term: "menos de", meaning: "less than", pos: "phrase" },
          { term: "horas", meaning: "hours", pos: "noun" },
          { term: "cómodo", meaning: "comfortable", pos: "adjective" }
        ]
      },
      {
        id: 2,
        target: "Miles de viajeros eligen el ferrocarril para evitar el tráfico y cuidar el medio ambiente.",
        source: "Thousands of travelers choose the railway to avoid traffic and protect the environment.",
        words: [
          { term: "viajeros", meaning: "travelers", pos: "noun" },
          { term: "eligen", meaning: "choose", pos: "verb (elegir)" },
          { term: "ferrocarril", meaning: "railway / railroad", pos: "noun" },
          { term: "evitar", meaning: "to avoid", pos: "verb" },
          { term: "medio ambiente", meaning: "environment", pos: "noun phrase" }
        ]
      }
    ],
    quiz: [
      {
        id: "q1",
        question: "¿Qué posición mundial ocupa la red española de alta velocidad?",
        options: ["Primera", "Segunda", "Quinta", "Décima"],
        correctIndex: 1,
        explanation: "El texto afirma: 'España cuenta con la segunda red de trenes de alta velocidad más extensa'."
      },
      {
        id: "q2",
        question: "¿Cuánto dura el viaje en AVE entre Madrid y Barcelona?",
        options: ["Más de cinco horas", "Menos de tres horas", "Todo el día", "Exactamente diez horas"],
        correctIndex: 1,
        explanation: "Conecta ambas ciudades en menos de tres horas."
      },
      {
        id: "q3",
        question: "¿Por qué eligen los viajeros el ferrocarril?",
        options: ["Porque no hay aviones", "Para evitar el tráfico y proteger el medio ambiente", "Porque es gratis", "Por obligación legal"],
        correctIndex: 1,
        explanation: "Miles de viajeros eligen el tren para evitar el tráfico y cuidar el medio ambiente."
      }
    ]
  },

  // --- FRENCH ---
  {
    id: "fr-boulangerie-matin",
    langCode: "fr",
    title: "Le Secret de la Baguette Parisienne",
    category: "Cultural Essay",
    level: "A1",
    readTimeMinutes: 3,
    summary: "L'artisanat du pain croustillant et la tradition quotidienne des boulangeries françaises.",
    sentences: [
      {
        id: 0,
        target: "Chaque matin à six heures, l'odeur du pain frais emplit la petite ruelle.",
        source: "Every morning at six o'clock, the smell of fresh bread fills the little alley.",
        words: [
          { term: "Chaque", meaning: "Each / Every", pos: "adjective" },
          { term: "matin", meaning: "morning", pos: "noun", phonetic: "ma.tɛ̃" },
          { term: "odeur", meaning: "smell / scent", pos: "noun", phonetic: "ɔ.dœʁ" },
          { term: "pain", meaning: "bread", pos: "noun", phonetic: "pɛ̃" },
          { term: "frais", meaning: "fresh", pos: "adjective" },
          { term: "emplit", meaning: "fills", pos: "verb (emplir)" },
          { term: "ruelle", meaning: "alley / lane", pos: "noun" }
        ]
      },
      {
        id: 1,
        target: "Le boulanger prépare la pâte avec de la farine, de l'eau, du sel et de la levure.",
        source: "The baker prepares the dough with flour, water, salt, and yeast.",
        words: [
          { term: "boulanger", meaning: "baker", pos: "noun", phonetic: "bu.lɑ̃.ʒe" },
          { term: "pâte", meaning: "dough / pastry", pos: "noun", phonetic: "pɑt" },
          { term: "farine", meaning: "flour", pos: "noun" },
          { term: "eau", meaning: "water", pos: "noun", phonetic: "o" },
          { term: "sel", meaning: "salt", pos: "noun" },
          { term: "levure", meaning: "yeast", pos: "noun" }
        ]
      },
      {
        id: 2,
        target: "Une bonne baguette doit être dorée à l'extérieur et très aérée à l'intérieur.",
        source: "A good baguette must be golden on the outside and airy on the inside.",
        words: [
          { term: "bonne", meaning: "good (feminine)", pos: "adjective" },
          { term: "dorée", meaning: "golden", pos: "adjective" },
          { term: "extérieur", meaning: "outside", pos: "noun" },
          { term: "aérée", meaning: "airy", pos: "adjective" },
          { term: "intérieur", meaning: "inside", pos: "noun" }
        ]
      }
    ],
    quiz: [
      {
        id: "q1",
        question: "À quelle heure l'odeur du pain frais emplit-elle la rue ?",
        options: ["À midi", "À six heures du matin", "À minuit", "À huit heures du soir"],
        correctIndex: 1,
        explanation: "Le texte précise: 'Chaque matin à six heures'."
      },
      {
        id: "q2",
        question: "Quels sont les quatre ingrédients de base de la pâte ?",
        options: ["Sucre, lait, œufs, beurre", "Farine, eau, sel, levure", "Chocolat, vanille, café, miel", "Huile, poivre, fromage, vin"],
        correctIndex: 1,
        explanation: "La pâte est faite avec de la farine, de l'eau, du sel et de la levure."
      },
      {
        id: "q3",
        question: "Comment doit être une bonne baguette à l'extérieur ?",
        options: ["Noire et brûlée", "Dorée", "Molle et blanche", "Froide et dure"],
        correctIndex: 1,
        explanation: "Elle doit être 'dorée à l'extérieur et très aérée à l'intérieur'."
      }
    ]
  },

  // --- GERMAN ---
  {
    id: "de-fahrrad-berlin",
    langCode: "de",
    title: "Mit dem Fahrrad durch Berlin",
    category: "Short Story",
    level: "A2",
    readTimeMinutes: 4,
    summary: "Entdecken Sie die deutsche Hauptstadt auf zwei Rädern durch grüne Parks und historische Straßen.",
    sentences: [
      {
        id: 0,
        target: "Berlin ist eine der fahrradfreundlichsten Hauptstädte Europas.",
        source: "Berlin is one of the most bicycle-friendly capitals in Europe.",
        words: [
          { term: "Hauptstädte", meaning: "capital cities", pos: "noun plural", phonetic: "ˈhaʊptˌʃtɛtə" },
          { term: "fahrradfreundlich", meaning: "bike-friendly", pos: "adjective" },
          { term: "Europas", meaning: "of Europe", pos: "noun genitive" }
        ]
      },
      {
        id: 1,
        target: "Jeden Tag fahren Tausende von Menschen mit dem Rad zur Arbeit oder zur Universität.",
        source: "Every day thousands of people ride their bikes to work or to university.",
        words: [
          { term: "Jeden Tag", meaning: "Every day", pos: "phrase" },
          { term: "fahren", meaning: "ride / drive", pos: "verb", phonetic: "ˈfaːʁən" },
          { term: "Menschen", meaning: "people", pos: "noun plural" },
          { term: "Arbeit", meaning: "work / job", pos: "noun" }
        ]
      },
      {
        id: 2,
        target: "Im Tiergarten kann man die Natur mitten in der Metropole genießen.",
        source: "In the Tiergarten, one can enjoy nature in the middle of the metropolis.",
        words: [
          { term: "Tiergarten", meaning: "Tiergarten (famous Berlin park)", pos: "proper noun" },
          { term: "Natur", meaning: "nature", pos: "noun" },
          { term: "mitten", meaning: "in the midst / middle", pos: "preposition" },
          { term: "genießen", meaning: "to enjoy", pos: "verb", phonetic: "ɡəˈniːsn̩" }
        ]
      }
    ],
    quiz: [
      {
        id: "q1",
        question: "Wie wird Berlin im ersten Satz beschrieben?",
        options: ["Als die teuerste Stadt", "Als fahrradfreundliche Hauptstadt", "Als die kleinste Stadt", "Als Bergdorf"],
        correctIndex: 1,
        explanation: "Der Text beschreibt Berlin als 'eine der fahrradfreundlichsten Hauptstädte Europas'."
      },
      {
        id: "q2",
        question: "Wohin fahren Tausende von Menschen täglich mit dem Rad?",
        options: ["Zum Strand", "Zur Arbeit oder Universität", "Ins Kino", "In den Flughafen"],
        correctIndex: 1,
        explanation: "Sie fahren 'mit dem Rad zur Arbeit oder zur Universität'."
      },
      {
        id: "q3",
        question: "Was bedeutet das Wort 'genießen'?",
        options: ["To avoid", "To enjoy", "To build", "To forget"],
        correctIndex: 1,
        explanation: "'Genießen' bedeutet 'to enjoy' (Natur genießen)."
      }
    ]
  },

  // --- ITALIAN ---
  {
    id: "it-espresso-rito",
    langCode: "it",
    title: "Il Rito del Caffè in Italia",
    category: "Cultural Essay",
    level: "A1",
    readTimeMinutes: 3,
    summary: "Perché bere un espresso al banco è un pilastro irrinunciabile della socialità italiana.",
    sentences: [
      {
        id: 0,
        target: "In Italia il caffè non è una semplice bevanda, ma un rituale quotidiano.",
        source: "In Italy, coffee is not just a simple beverage, but a daily ritual.",
        words: [
          { term: "semplice", meaning: "simple", pos: "adjective" },
          { term: "bevanda", meaning: "beverage / drink", pos: "noun", phonetic: "beˈvanda" },
          { term: "rituale", meaning: "ritual", pos: "noun" },
          { term: "quotidiano", meaning: "daily", pos: "adjective" }
        ]
      },
      {
        id: 1,
        target: "La maggior parte delle persone beve l'espresso in piedi al bancone del bar.",
        source: "Most people drink their espresso standing up at the bar counter.",
        words: [
          { term: "maggior parte", meaning: "majority / most", pos: "phrase" },
          { term: "in piedi", meaning: "standing up", pos: "phrase", phonetic: "in ˈpjɛdi" },
          { term: "bancone", meaning: "counter / bar", pos: "noun" }
        ]
      },
      {
        id: 2,
        target: "Il barista saluta con energia e prepara la tazzina in pochi secondi.",
        source: "The barista greets with energy and prepares the cup in a few seconds.",
        words: [
          { term: "saluta", meaning: "greets", pos: "verb (salutare)" },
          { term: "energia", meaning: "energy", pos: "noun" },
          { term: "tazzina", meaning: "small espresso cup", pos: "noun" },
          { term: "secondi", meaning: "seconds", pos: "noun" }
        ]
      }
    ],
    quiz: [
      {
        id: "q1",
        question: "Come viene definito il caffè in Italia nel testo?",
        options: ["Una medicina amara", "Un rituale quotidiano", "Un lusso costoso", "Una perdita di tempo"],
        correctIndex: 1,
        explanation: "Il testo dichiara: 'non è una semplice bevanda, ma un rituale quotidiano'."
      },
      {
        id: "q2",
        question: "Dove beve solitamente l'espresso la maggior parte delle persone?",
        options: ["A letto", "In piedi al bancone del bar", "Sul treno", "In biblioteca"],
        correctIndex: 1,
        explanation: "Si beve tradizionalmente 'in piedi al bancone del bar'."
      },
      {
        id: "q3",
        question: "Cosa significa 'tazzina'?",
        options: ["Un bicchiere grande", "Una piccola tazza da espresso", "Un piatto fondo", "Una bottiglia d'acqua"],
        correctIndex: 1,
        explanation: "La 'tazzina' è la classica tazza di porcellana per l'espresso."
      }
    ]
  },

  // --- JAPANESE ---
  {
    id: "ja-shinkansen-travel",
    langCode: "ja",
    title: "新幹線の旅 (Shinkansen Journey)",
    category: "Short Story",
    level: "A2",
    readTimeMinutes: 4,
    summary: "東京から京都への高速鉄道の旅と、日本の駅弁文化の魅力。",
    sentences: [
      {
        id: 0,
        target: "東京駅から京都駅まで、新幹線はとても速くて静かです。",
        source: "From Tokyo Station to Kyoto Station, the Shinkansen is very fast and quiet.",
        words: [
          { term: "東京駅", meaning: "Tokyo Station", pos: "noun", phonetic: "Tōkyō-eki" },
          { term: "京都駅", meaning: "Kyoto Station", pos: "noun", phonetic: "Kyōto-eki" },
          { term: "新幹線", meaning: "bullet train (Shinkansen)", pos: "noun", phonetic: "Shinkansen" },
          { term: "速い", meaning: "fast", pos: "adjective", phonetic: "hayai" },
          { term: "静か", meaning: "quiet / calm", pos: "na-adjective", phonetic: "shizuka" }
        ]
      },
      {
        id: 1,
        target: "窓から富士山が見えると、乗客たちは写真を撮ります。",
        source: "When Mount Fuji comes into view from the window, the passengers take photos.",
        words: [
          { term: "窓", meaning: "window", pos: "noun", phonetic: "mado" },
          { term: "富士山", meaning: "Mount Fuji", pos: "noun", phonetic: "Fuji-san" },
          { term: "乗客", meaning: "passengers", pos: "noun", phonetic: "jōkyaku" },
          { term: "写真", meaning: "photograph", pos: "noun", phonetic: "shashin" }
        ]
      },
      {
        id: 2,
        target: "日本の駅弁は季節の美味しい食べ物が入っています。",
        source: "Japanese train bento boxes contain delicious seasonal foods.",
        words: [
          { term: "駅弁", meaning: "station boxed lunch (ekiben)", pos: "noun", phonetic: "ekiben" },
          { term: "季節", meaning: "season", pos: "noun", phonetic: "kisetsu" },
          { term: "美味しい", meaning: "delicious", pos: "adjective", phonetic: "oishii" },
          { term: "食べ物", meaning: "food", pos: "noun", phonetic: "tabemono" }
        ]
      }
    ],
    quiz: [
      {
        id: "q1",
        question: "新幹線の中はどのように描写されていますか？",
        options: ["うるさくて遅い", "とても速くて静か", "寒くて暗い", "混雑して座れない"],
        correctIndex: 1,
        explanation: "「とても速くて静かです」と書かれています。"
      },
      {
        id: "q2",
        question: "窓から何が見えると乗客は写真を撮りますか？",
        options: ["海", "富士山", "東京タワー", "飛行機"],
        correctIndex: 1,
        explanation: "「窓から富士山が見えると、乗客たちは写真を撮ります」とあります。"
      },
      {
        id: "q3",
        question: "「駅弁」とは何ですか？",
        options: ["電車の切符", "駅で買える特製弁当", "駅員さんの帽子", "電車の時刻表"],
        correctIndex: 1,
        explanation: "駅弁（えきべん）は駅や列車内で販売される名物弁当のことです。"
      }
    ]
  }
];

export function getArticlesByLanguage(langCode) {
  const matches = READING_ARTICLES.filter(a => a.langCode === langCode);
  return matches.length > 0 ? matches : READING_ARTICLES.filter(a => a.langCode === "es");
}

