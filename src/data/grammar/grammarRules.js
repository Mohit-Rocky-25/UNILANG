export const GRAMMAR_RULE_LIBRARY = [
  {
    id: 'rule-ser-vs-estar',
    level: 'A1',
    language: 'es',
    title: 'Ser vs. Estar: Permanent Essence vs. Temporary State',
    summary: 'Spanish has two verbs for "to be". Use SER for permanent characteristics, origin, and time. Use ESTAR for temporary conditions, feelings, and locations.',
    formula: 'SER = DOCTOR (Date, Occupation, Characteristic, Time, Origin, Relation) | ESTAR = PLACE (Position, Location, Action, Condition, Emotion)',
    examples: [
      { text: 'Ella es médica en Madrid.', note: 'Profession / identity -> SER' },
      { text: 'Ella está cansada hoy.', note: 'Temporary condition / emotion -> ESTAR' },
      { text: 'El museo está en el centro.', note: 'Geographical location -> ESTAR' }
    ]
  },
  {
    id: 'rule-gender-agreement',
    level: 'A1',
    language: 'es',
    title: 'Gender & Number Agreement with Nouns',
    summary: 'In Romance languages, adjectives must match the gender (masculine/feminine) and number (singular/plural) of the noun they modify.',
    formula: 'El libro rojo (m.sg) -> Los libros rojos (m.pl) | La casa roja (f.sg) -> Las casas rojas (f.pl)',
    examples: [
      { text: 'Un café caliente, por favor.', note: 'Café (masculine) -> caliente' },
      { text: 'Dos cervezas frías.', note: 'Cervezas (feminine plural) -> frías' }
    ]
  },
  {
    id: 'rule-german-cases',
    level: 'A2',
    language: 'de',
    title: 'The German Four Cases: Nominative, Accusative, Dative, Genitive',
    summary: 'German articles change depending on their grammatical function in the sentence: Nominative (Subject), Accusative (Direct Object), Dative (Indirect Object), Genitive (Possession).',
    formula: 'Der Mann (Nom) -> Den Mann (Acc) -> Dem Mann (Dat) -> Des Mannes (Gen)',
    examples: [
      { text: 'Der Hund beißt den Mann.', note: 'Der Hund = Subject (Nom); den Mann = Direct Object (Acc)' },
      { text: 'Ich gebe dem Kind das Buch.', note: 'dem Kind = Recipient (Dat); das Buch = Object (Acc)' }
    ]
  },
  {
    id: 'rule-spanish-subjunctive',
    level: 'B1',
    language: 'es',
    title: 'Subjunctive Mood Triggers: The WEIRDO Acronym',
    summary: 'The subjunctive expresses wishes, doubts, emotions, and hypothetical situations rather than objective facts.',
    formula: 'Wishes, Emotions, Impersonal expressions, Recommendations, Doubt, Ojalá + Que + Subjunctive',
    examples: [
      { text: 'Espero que tengas un buen viaje.', note: 'Wish/Hope -> tengas (subjunctive of tener)' },
      { text: 'Dudo que él venga hoy.', note: 'Doubt -> venga (subjunctive of venir)' }
    ]
  }
];

