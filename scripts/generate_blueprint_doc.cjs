const { PDFDocumentBuilder } = require('./pdf_builder.cjs');
const path = require('path');

function generateBlueprintDoc() {
  const doc = new PDFDocumentBuilder(
    'UniLang Platform Blueprint',
    'Complete Development Architecture, Content Blueprint & Actionable Build Prompts',
    'UNILANG-ARCH-2026-V1'
  );

  // COVER PAGE
  doc.addCoverPage({
    version: '1.0 Final',
    classification: 'Engineering Architecture & Technical Blueprint',
    date: 'November 2026',
    status: 'Actionable Implementation Guide',
    description: 'This document serves as the master engineering architecture, database specification, content design blueprint, and prompt catalog for the UniLang platform. It details full relational database schemas, external provider adapters, AI prompt engineering templates, CEFR curriculum structures, travel phrasebook taxonomy, and six complete, copy-paste ready Master Build Prompts for driving autonomous development.',
    highlights: [
      'Full System Architecture: Client SPA, Node.js API Gateway, and pluggable provider adapters.',
      'Comprehensive Database Schema: 14 relational entities with exact field types, constraints, and indexes.',
      'AI Engine & Prompt Architecture: System prompts for Conversation Partner, Grammar Coach, and Quiz Generator.',
      'Complete Content Blueprints: CEFR A1-C1 curriculum mapping, Travel Phrasebook taxonomy, Grammar trees.',
      '6 Actionable Master Build Prompts: Ready-to-use prompts for autonomous agentic implementation.'
    ]
  });

  // ==========================================
  // SECTION 1: SYSTEM & SOFTWARE ARCHITECTURE
  // ==========================================
  doc.addHeading1('1. System Architecture & Technology Stack');

  doc.addHeading2('1.1 Architecture Topology');
  doc.addParagraph(
    'UniLang is structured as a modern multi-tier web application designed for high responsiveness, secure credential handling, and graceful offline degradation. The system decouples the presentation client from third-party AI, translation, and speech providers through a unified backend API gateway.'
  );

  doc.addBullet('Presentation Tier (Frontend):', 'React 18 + Vite SPA, Tailwind CSS for responsive styling, Lucide React icons, Radix UI accessible primitives, React Router v6 for client-side navigation.');
  doc.addBullet('Application Tier (API Gateway):', 'Node.js with Fastify (or Express) providing REST and WebSocket endpoints for audio streaming and AI dialogue, request validation via Zod, and rate limiting.');
  doc.addBullet('Data Tier (Persistence):', 'PostgreSQL relational database managed via Prisma ORM (or Drizzle), with Redis for session tokens, translation response caching, and rate limiting.');
  doc.addBullet('Adapter Tier (Provider Abstraction):', 'Pluggable service adapters isolating external dependencies: Translation (Lingva / LibreTranslate / DeepL), AI (Gemini API / OpenAI), and Speech (Web Speech API / Google Cloud TTS / Whisper).');

  doc.addHeading2('1.2 Provider Adapter Pattern');
  doc.addParagraph(
    'External AI, translation, and speech APIs must never be tightly coupled to business logic or invoked directly from the browser with exposed API keys. The backend implements strict adapter interfaces:'
  );

  doc.addBullet('ITranslationProvider:', 'Defines translate(text, sourceLang, targetLang, options) returning translatedText, formality, tokens, and detectedLanguage. Supports automatic failover between primary (Lingva/Libre) and premium (DeepL) engines.');
  doc.addBullet('ISpeechProvider:', 'Defines synthesizeSpeech(text, lang, speed) for audio stream generation, and recognizeSpeech(audioBuffer, lang) for phoneme transcription and acoustic scoring.');
  doc.addBullet('IAIProvider:', 'Defines generateDialogueTurn(history, scenario, cefrLevel) and analyzeGrammar(sentence, targetLang), returning structured JSON with streaming token output.');

  doc.addCallout(
    'SECURITY & CREDENTIAL BOUNDARY',
    'All external provider credentials (AI API keys, speech tokens, database connection URIs) reside strictly in server environment variables (.env). No client-side request directly contacts proprietary AI or speech endpoints.',
    'warning'
  );

  // ==========================================
  // SECTION 2: COMPREHENSIVE DATABASE SCHEMA
  // ==========================================
  doc.addHeading1('2. Comprehensive Relational Database Schema');
  doc.addParagraph(
    'The following relational schema is designed for PostgreSQL using Prisma ORM. It captures the entire lifecycle of users, learning progress, spaced repetition flashcards, cultural content, and AI conversation sessions.'
  );

  // Entities Table 1: Core User & Learning
  const dbHead1 = ['Entity Name', 'Primary Keys & Fields', 'Data Types & Constraints', 'Relations & Purpose'];
  const dbBody1 = [
    [
      'User',
      'id (PK)\nemail\npassword_hash\ndisplay_name\navatar_url\ncreated_at\nupdated_at',
      'UUID, default gen_random_uuid()\nVARCHAR(255), UNIQUE, NOT NULL\nVARCHAR(255), NOT NULL\nVARCHAR(100), NOT NULL\nVARCHAR(500), NULLABLE\nTIMESTAMPTZ, default now()\nTIMESTAMPTZ, default now()',
      'One-to-One with UserPreference;\nOne-to-Many with UserProgress, SavedVocabulary, TranslationHistory, ConversationSession.'
    ],
    [
      'UserPreference',
      'id (PK)\nuser_id (FK)\ninterface_lang\ntarget_lang\ncefr_level\ndaily_goal_xp\nsound_enabled\nrtl_mode',
      'UUID, default gen_random_uuid()\nUUID, UNIQUE, FK -> User.id\nVARCHAR(10), default "en"\nVARCHAR(10), default "es"\nVARCHAR(5), default "A1"\nINTEGER, default 50\nBOOLEAN, default true\nBOOLEAN, default false',
      'Holds user UI customization, active target language, daily study targets, and accessibility preferences.'
    ],
    [
      'Language',
      'id (PK)\ncode\nname\nnative_name\nscript_direction\nflag_emoji\nis_active',
      'UUID, default gen_random_uuid()\nVARCHAR(10), UNIQUE, NOT NULL\nVARCHAR(100), NOT NULL\nVARCHAR(100), NOT NULL\nVARCHAR(5), default "ltr"\nVARCHAR(10), NOT NULL\nBOOLEAN, default true',
      'One-to-Many with LearningPath, CultureArticle, VocabularyItem, PhrasebookEntry. Defines language capabilities.'
    ],
    [
      'LearningPath',
      'id (PK)\nlanguage_id (FK)\ncefr_level\ntitle\ndescription\nsequence_order',
      'UUID, default gen_random_uuid()\nUUID, FK -> Language.id\nVARCHAR(5), NOT NULL (A1-C1)\nVARCHAR(200), NOT NULL\nTEXT, NULLABLE\nINTEGER, NOT NULL',
      'One-to-Many with Lesson. Represents a structured curriculum milestone (e.g., "Spanish A1: Foundations").'
    ],
    [
      'Lesson',
      'id (PK)\nlearning_path_id\ntitle\nslug\nsummary\nxp_reward\nsequence_order',
      'UUID, default gen_random_uuid()\nUUID, FK -> LearningPath.id\nVARCHAR(200), NOT NULL\nVARCHAR(200), UNIQUE\nTEXT, NULLABLE\nINTEGER, default 20\nINTEGER, NOT NULL',
      'One-to-Many with Exercise, UserProgress. Represents an atomic study unit (e.g., "Ordering Food in Rome").'
    ],
    [
      'Exercise',
      'id (PK)\nlesson_id (FK)\ntype\nprompt\naudio_url\nanswer_data\nsequence_order',
      'UUID, default gen_random_uuid()\nUUID, FK -> Lesson.id\nVARCHAR(50), NOT NULL\nTEXT, NOT NULL\nVARCHAR(500), NULLABLE\nJSONB, NOT NULL\nINTEGER, NOT NULL',
      'Types: multi_choice, sentence_reorder, fill_blank, audio_match, speak_match. answer_data stores correct keys and distractors.'
    ],
    [
      'UserProgress',
      'id (PK)\nuser_id (FK)\nlesson_id (FK)\nstatus\nbest_score\nattempts_count\ncompleted_at',
      'UUID, default gen_random_uuid()\nUUID, FK -> User.id\nUUID, FK -> Lesson.id\nVARCHAR(20), default "in_progress"\nINTEGER, default 0\nINTEGER, default 1\nTIMESTAMPTZ, NULLABLE',
      'Unique compound index (user_id, lesson_id). Tracks mastery state, high scores, and completion timestamps.'
    ]
  ];

  doc.addTable(dbHead1, dbBody1, {
    colStyles: {
      0: { cellWidth: 26, fontStyle: 'bold' },
      1: { cellWidth: 36 },
      2: { cellWidth: 54 },
      3: { cellWidth: 60 }
    }
  });

  // Entities Table 2: Vocabulary, SRS, Culture & AI
  const dbHead2 = ['Entity Name', 'Primary Keys & Fields', 'Data Types & Constraints', 'Relations & Purpose'];
  const dbBody2 = [
    [
      'VocabularyItem',
      'id (PK)\nlanguage_id (FK)\nterm\nlemma\nmeaning\nphonetic\npart_of_speech\nexample_sentence\naudio_url',
      'UUID, default gen_random_uuid()\nUUID, FK -> Language.id\nVARCHAR(200), NOT NULL\nVARCHAR(200), NULLABLE\nTEXT, NOT NULL\nVARCHAR(200), NULLABLE\nVARCHAR(50), NULLABLE\nTEXT, NULLABLE\nVARCHAR(500), NULLABLE',
      'Master lexicon. Linked to SavedVocabulary. Indexed by (language_id, term) for instant dictionary lookup.'
    ],
    [
      'SavedVocabulary\n(SRS Engine)',
      'id (PK)\nuser_id (FK)\nvocabulary_id\nrepetition_count\ninterval_days\nease_factor\ndue_date\nretention_score\nuser_notes',
      'UUID, default gen_random_uuid()\nUUID, FK -> User.id\nUUID, FK -> VocabularyItem.id\nINTEGER, default 0\nINTEGER, default 1\nFLOAT, default 2.5\nTIMESTAMPTZ, default now()\nINTEGER, default 100\nTEXT, NULLABLE',
      'SuperMemo SM-2 SRS state. Compound index on (user_id, due_date) powers daily review queues.'
    ],
    [
      'TranslationHistory',
      'id (PK)\nuser_id (FK)\nsource_lang\ntarget_lang\nsource_text\ntarget_text\nformality\nis_bookmarked\ncreated_at',
      'UUID, default gen_random_uuid()\nUUID, FK -> User.id\nVARCHAR(10), NOT NULL\nVARCHAR(10), NOT NULL\nTEXT, NOT NULL\nTEXT, NOT NULL\nVARCHAR(20), default "neutral"\nBOOLEAN, default false\nTIMESTAMPTZ, default now()',
      'Enables offline history lookup, personal phrase saving, and search through past queries.'
    ],
    [
      'CultureArticle',
      'id (PK)\nlanguage_id (FK)\nregion\ntitle\nslug\nsummary\nfull_content\ncover_image\nverified_sources',
      'UUID, default gen_random_uuid()\nUUID, FK -> Language.id\nVARCHAR(100), NOT NULL\nVARCHAR(255), NOT NULL\nVARCHAR(255), UNIQUE\nTEXT, NOT NULL\nJSONB, NOT NULL\nVARCHAR(500), NOT NULL\nJSONB, NOT NULL',
      'Stores curated regional deep dives, architectural milestones, verified Wikimedia citations, and etiquette.'
    ],
    [
      'ConversationSession',
      'id (PK)\nuser_id (FK)\nlanguage_id (FK)\nscenario_key\ncefr_level\ntotal_turns\nfluency_score\ncreated_at',
      'UUID, default gen_random_uuid()\nUUID, FK -> User.id\nUUID, FK -> Language.id\nVARCHAR(100), NOT NULL\nVARCHAR(5), NOT NULL\nINTEGER, default 0\nINTEGER, default 0\nTIMESTAMPTZ, default now()',
      'One-to-Many with ConversationMessage. Tracks AI roleplay sessions (e.g. "Airport Customs Check").'
    ],
    [
      'ConversationMessage',
      'id (PK)\nsession_id (FK)\nsender_role\nmessage_text\nphonetic_text\ngrammar_feedback\naudio_url\ncreated_at',
      'UUID, default gen_random_uuid()\nUUID, FK -> ConversationSession.id\nVARCHAR(20), NOT NULL (user/ai)\nTEXT, NOT NULL\nTEXT, NULLABLE\nJSONB, NULLABLE\nVARCHAR(500), NULLABLE\nTIMESTAMPTZ, default now()',
      'Stores chat turns, real-time grammar corrections, and audio recordings for post-session reviews.'
    ],
    [
      'PhrasebookEntry',
      'id (PK)\nlanguage_id (FK)\ncategory_slug\nsource_text\ntarget_text\nphonetic\naudio_url\nis_emergency',
      'UUID, default gen_random_uuid()\nUUID, FK -> Language.id\nVARCHAR(50), NOT NULL\nTEXT, NOT NULL\nTEXT, NOT NULL\nVARCHAR(255), NULLABLE\nVARCHAR(500), NULLABLE\nBOOLEAN, default false',
      'Powers offline phrasebook with fast search indexing across source and phonetic representations.'
    ]
  ];

  doc.addTable(dbHead2, dbBody2, {
    colStyles: {
      0: { cellWidth: 26, fontStyle: 'bold' },
      1: { cellWidth: 36 },
      2: { cellWidth: 54 },
      3: { cellWidth: 60 }
    }
  });

  // ==========================================
  // SECTION 3: AI PROMPT ENGINEERING SPECIFICATIONS
  // ==========================================
  doc.addHeading1('3. AI Prompt Engineering & Conversation Blueprints');
  doc.addParagraph(
    'The AI Orchestrator executes specialized, deterministic system prompts tailored to specific pedagogical interactions. All prompts enforce strict JSON output schemas or dual-channel streaming (conversational response + side-channel grammar annotations).'
  );

  doc.addHeading2('3.1 System Prompt 1: AI Scenario Conversation Partner');
  doc.addParagraph(
    'Purpose: Manages real-time roleplay dialogues with adaptive vocabulary constraints and non-intrusive corrections.'
  );
  doc.addCallout(
    'AI CONVERSATION PARTNER PROMPT TEMPLATE',
    `You are UniLang AI, an expert language instructor roleplaying in a real-world scenario.
TARGET LANGUAGE: {{targetLanguage}}
LEARNER CEFR LEVEL: {{cefrLevel}} (A1 = elementary, A2 = basic, B1 = intermediate, B2 = advanced)
SCENARIO: {{scenarioTitle}} (Role: You are {{aiRole}}, learner is {{userRole}})

BEHAVIORAL DIRECTIVES:
1. Stay in character at all times. Respond naturally in {{targetLanguage}}.
2. VOCABULARY CONSTRAINT: Restrict your sentence complexity and vocabulary strictly to {{cefrLevel}}. Avoid archaic idioms or complex subordinate clauses for A1-A2 learners.
3. Keep responses conversational and concise (1-3 sentences maximum) to maintain dialogue flow. Always conclude with an open-ended question or prompt.
4. If the learner makes a grammatical, agreement, or register error, DO NOT reprimand them in the dialogue. Instead, provide the correction in the structured feedback JSON payload.

OUTPUT FORMAT (Strict JSON):
{
  "reply": "Your conversational in-character reply in the target language.",
  "translation": "English translation of your reply.",
  "phonetic": "Romanized phonetic guide for pronunciation.",
  "correction": {
    "hasError": true/false,
    "userMistake": "The exact erroneous phrase",
    "correctedPhrase": "The corrected phrase",
    "explanation": "Clear, encouraging pedagogical explanation in English."
  },
  "recommendedReplies": ["2-3 quick suggested replies the learner can choose if stuck"]
}`,
    'info'
  );

  doc.addHeading2('3.2 System Prompt 2: Real-Time Grammar Coach & Syntax Analyzer');
  doc.addParagraph(
    'Purpose: Analyzes any sentence provided by the user, decomposes parts of speech, and identifies syntactic errors.'
  );
  doc.addCallout(
    'GRAMMAR COACH PROMPT TEMPLATE',
    `You are UniLang Grammar Coach, an expert computational linguist and educator.
TARGET LANGUAGE: {{targetLanguage}}
INPUT SENTENCE: "{{userSentence}}"

TASK:
1. Tokenize the sentence into grammatical words/lemmas.
2. Identify tense, mood, grammatical gender, cases, and word-order syntax.
3. Detect all errors: subject-verb disagreement, incorrect preposition, wrong verb tense, register clash.
4. Return output strictly in the following JSON schema:
{
  "isValid": true/false,
  "correctedSentence": "Grammatically flawless version",
  "tokens": [
    { "word": "word", "lemma": "base", "pos": "NOUN/VERB/ADJ/ADV/PREP", "role": "Subject/Object", "notes": "" }
  ],
  "errors": [
    { "type": "TENSE/GENDER_AGREEMENT/CASE/REGISTER", "culprit": "word", "fix": "word", "reason": "Linguistic rule explanation" }
  ],
  "conjugationReference": { "verb": "infinitive", "tense": "Present/Past", "fullTable": { ... } }
}`,
    'info'
  );

  doc.addHeading2('3.3 System Prompt 3: Contextual Translation & Idiom Explainer');
  doc.addParagraph(
    'Purpose: Translates text while explaining cultural nuances, register differences, and false friends.'
  );
  doc.addCallout(
    'CONTEXTUAL TRANSLATOR PROMPT TEMPLATE',
    `You are UniLang Contextual Translator.
SOURCE: "{{sourceText}}" (Language: {{sourceLang}}) -> TARGET: {{targetLang}}

TASK:
1. Provide the most natural, authentic modern translation.
2. Provide two alternative translations: one Formal/Polite and one Casual/Colloquial.
3. Identify any idioms, cultural proverbs, or false friends in the phrase.
4. Output JSON:
{
  "primaryTranslation": "...",
  "formalityLevel": "neutral / formal / informal",
  "alternatives": [
    { "formality": "formal", "text": "...", "context": "When speaking to elders or clients" },
    { "formality": "casual", "text": "...", "context": "When texting friends" }
  ],
  "idiomsAndNuances": [
    { "phrase": "...", "literal": "...", "figurative": "...", "culturalOrigin": "..." }
  ]
}`,
    'info'
  );

  // ==========================================
  // SECTION 4: CONTENT TAXONOMY & CURRICULUM BLUEPRINT
  // ==========================================
  doc.addHeading1('4. Content Taxonomy & Curriculum Specifications');

  doc.addHeading2('4.1 CEFR Progression Roadmap (A1 to C1)');
  doc.addParagraph(
    'The UniLang pedagogical model adheres to the Common European Framework of Reference for Languages (CEFR), structuring content into five progressive tiers:'
  );

  const cefrHead = ['CEFR Level', 'Active Vocabulary', 'Core Grammar Competencies', 'Can-Do Real World Milestones'];
  const cefrBody = [
    [
      'A1: Breakthrough\n(Beginner)',
      '500 - 800 words',
      'Present tense regular verbs; subject pronouns; basic gender/number agreement; definite/indefinite articles; negation; basic interrogatives.',
      'Order food and coffee; introduce self and others; ask for directions; state nationality and occupation; read simple street signs.'
    ],
    [
      'A2: Waystage\n(Elementary)',
      '1,000 - 1,500 words',
      'Simple past (Passato Prossimo / Passé Composé / Pretérito Perfecto); reflexive verbs; direct/indirect object pronouns; comparative/superlative.',
      'Describe past weekend activities; book hotel rooms; make appointments; shop for clothing; explain symptoms to a pharmacist.'
    ],
    [
      'B1: Threshold\n(Intermediate)',
      '2,000 - 3,000 words',
      'Imperfect vs preterite contrast; future tense; conditional mood; relative clauses; basic subjunctive intro; passive voice.',
      'Travel independently across the country; narrate a personal story or film plot; express hopes, doubts, and opinions in workplace meetings.'
    ],
    [
      'B2: Vantage\n(Upper Int.)',
      '4,000 - 5,500 words',
      'Full subjunctive mood; hypothetical clauses (if-then); indirect discourse; complex prepositional idioms; gerund and participle clauses.',
      'Participate actively in corporate negotiations; comprehend native news broadcasts and podcasts; write detailed analytical essays.'
    ],
    [
      'C1: Operational\n(Advanced)',
      '7,000 - 9,000+ words',
      'Stylistic inversion; archaic and literary tenses; subtle register manipulation; regional colloquialisms; humor, irony, and sarcasm syntax.',
      'Deliver keynote presentations; read contemporary literature without dictionaries; negotiate high-stakes legal and diplomatic contracts.'
    ]
  ];

  doc.addTable(cefrHead, cefrBody, {
    colStyles: {
      0: { cellWidth: 26, fontStyle: 'bold' },
      1: { cellWidth: 26 },
      2: { cellWidth: 62 },
      3: { cellWidth: 62 }
    }
  });

  doc.addHeading2('4.2 Travel Phrasebook Category Tree');
  doc.addParagraph(
    'The phrasebook is organized into 8 essential travel domains, covering 64 real-world subcategories with standard emergency, phonetic, and cultural audio assets:'
  );
  doc.addBullet('1. Emergency & Medical:', 'Severe allergies, calling police, doctor consultations, lost passport, pharmacy requests, pharmacy OTC terms.');
  doc.addBullet('2. Transportation & Navigation:', 'Taxi directions, train ticketing, metro navigation, bus schedules, flight boarding, asking for street directions.');
  doc.addBullet('3. Dining & Gastronomy:', 'Ordering drinks, dietary restrictions (vegan, halal, kosher, gluten-free), asking for the bill, tipping etiquette.');
  doc.addBullet('4. Lodging & Hospitality:', 'Checking in, requesting extra amenities, reporting room issues, luggage storage, late check-out.');
  doc.addBullet('5. Shopping & Bargaining:', 'Asking prices, requesting sizes, payment methods, tax-free refunds, market negotiation phrases.');
  doc.addBullet('6. Socializing & Etiquette:', 'Polite introductions, making small talk, exchanging phone numbers, accepting/declining invitations.');
  doc.addBullet('7. Work & Digital Nomad:', 'Coworking space inquiries, Wi-Fi connectivity, scheduling calls, polite business requests.');
  doc.addBullet('8. Culture & Sightseeing:', 'Museum admissions, audio tour rentals, photography permissions, historical site navigation.');

  // ==========================================
  // SECTION 5: PHASED IMPLEMENTATION ROADMAP
  // ==========================================
  doc.addHeading1('5. Phased Implementation Roadmap');
  doc.addParagraph(
    'To guarantee systematic progress, development is structured into four sequential phases, each delivering verified, tested, and deployable functional milestones:'
  );

  const roadHead = ['Phase', 'Focus Area', 'Key Deliverables', 'Target Verification'];
  const roadBody = [
    [
      'Phase 1\n(Weeks 1-3)',
      'Database, Auth & Core Learning Engine',
      'PostgreSQL schema migration via Prisma; JWT auth service; complete CEFR A1 curriculum engine; interactive quiz component; persistent user progress.',
      'Automated progress persistence tests; 100% quiz completion pass rate across A1 lessons.'
    ],
    [
      'Phase 2\n(Weeks 4-6)',
      'Speech Studio & Spaced Repetition (SRS)',
      'Web Speech API integration with acoustic pitch/accuracy scoring; SuperMemo SM-2 vocabulary flashcard engine; Offline Travel Phrasebook with 8 categories.',
      'Pronunciation score benchmark against audio fixtures; SM-2 interval mathematical verification.'
    ],
    [
      'Phase 3\n(Weeks 7-9)',
      'AI Conversation Partner & Grammar Coach',
      'AI roleplay engine with streaming responses; scenario selector (Café, Hotel, Job Interview); interactive verb conjugation tables; sentence syntax diagrammer.',
      'Dialogue turn latency < 1.5s; 100% JSON schema validation for grammar and corrections.'
    ],
    [
      'Phase 4\n(Weeks 10-12)',
      'Reading Studio, Community & Gamification',
      'Parallel dual-language reader with synchronized karaoke audio; weekly league leaderboard; daily quests engine; full WCAG 2.2 AA accessibility audit.',
      'Audio-text sync accuracy < 50ms; Playwright end-to-end user journey test suite passing.'
    ]
  ];

  doc.addTable(roadHead, roadBody, {
    colStyles: {
      0: { cellWidth: 24, fontStyle: 'bold' },
      1: { cellWidth: 36, fontStyle: 'bold' },
      2: { cellWidth: 68 },
      3: { cellWidth: 48 }
    }
  });

  // ==========================================
  // SECTION 6: MASTER BUILD PROMPTS
  // ==========================================
  doc.addHeading1('6. Master Actionable Build Prompts');
  doc.addParagraph(
    'The following six Master Build Prompts are designed for the product owner to copy and paste directly into the AI coding assistant. Each prompt provides complete architectural context, exact file paths, TypeScript types, and acceptance criteria to execute full-stack modules end-to-end.'
  );

  // Master Prompt 1
  doc.addHeading2('Master Prompt 1: Persistent PostgreSQL Database & Backend Service Setup');
  doc.addCallout(
    'COPY-PASTE PROMPT 1: DATABASE & BACKEND SETUP',
    `Act as the Lead Full-Stack Architect for the UniLang platform.
TASK: Build the complete backend persistence layer and API server to replace all mock client-side state.
REQUIREMENTS:
1. Setup a Node.js/Fastify (or Express) server in /server with TypeScript, cors, dotenv, and zod.
2. Initialize Prisma ORM in /server/prisma/schema.prisma with PostgreSQL models: User, UserPreference, Language, LearningPath, Lesson, Exercise, UserProgress, VocabularyItem, SavedVocabulary, TranslationHistory, ConversationSession, PhrasebookEntry. Include all relations, foreign keys, and compound indexes documented in Section 2 of UNILANG-ARCH-2026-V1.
3. Build authentication routes in /server/src/routes/auth.ts (register, login, refresh, me) using bcrypt password hashing and JWT cookies. Ensure the 1-click demo user (demo@unilang.app) is automatically seeded.
4. Build REST API endpoints for /api/lessons, /api/user/progress, and /api/vocabulary.
5. Create a client-side API client in /src/api/client.js that seamlessly swaps localStorage with authenticated server API calls.
VERIFICATION: Run migrations, seed test data, verify all endpoints with automated curl/supertest checks, and ensure the frontend loads live database records.`,
    'info'
  );

  // Master Prompt 2
  doc.addHeading2('Master Prompt 2: Complete CEFR Learning Engine & Multi-Modal Quiz Studio');
  doc.addCallout(
    'COPY-PASTE PROMPT 2: CEFR LEARNING ENGINE',
    `Act as the Senior Frontend & Curriculum Engineer for UniLang.
TASK: Transform the partial LearnSection.jsx into an exhaustive, multi-tier CEFR curriculum engine.
REQUIREMENTS:
1. Create a structured curriculum database in /src/data/curriculum/ with full A1 and A2 modules for Spanish, French, German, Italian, and Japanese (Greetings, Dining, Travel, Hotel, Directions, Shopping, Daily Routine).
2. Build /src/components/learn/PlacementTestModal.jsx: An adaptive 15-question placement assessment evaluating vocabulary, grammar, and listening comprehension to assign user starting level.
3. Overhaul QuizModal.jsx to support 5 distinct exercise interaction types:
   a) Multiple Choice with audio prompts and explanation callouts.
   b) Sentence Reorder: Interactive draggable/clickable word chips.
   c) Fill-in-the-Blank with contextual grammar hints.
   d) Listen & Transcribe with speed-adjustable audio playback.
   e) Pronunciation Speaking match with mic recording.
4. Implement a comprehensive lesson completion screen showing XP gained, accuracy percentage, time spent, and new vocabulary unlocked.
VERIFICATION: Test all 5 exercise types; ensure progress and XP increment the user dashboard; verify responsive mobile touch behavior.`,
    'info'
  );

  // Master Prompt 3
  doc.addHeading2('Master Prompt 3: AI Scenario Conversation Partner & Voice Engine');
  doc.addCallout(
    'COPY-PASTE PROMPT 3: AI CONVERSATION PARTNER',
    `Act as the Principal AI Engineer for UniLang.
TASK: Build the end-to-end AI Conversation Partner module in /src/components/speak/ConversationPartner.jsx.
REQUIREMENTS:
1. Create server-side endpoint POST /api/ai/chat that interfaces with the AI provider (Gemini or OpenAI) using the system prompt defined in Section 3.1 of UNILANG-ARCH-2026-V1.
2. The AI must return a structured payload containing: reply text, English translation, Romanized phonetic guide, and non-intrusive grammar corrections.
3. Implement 6 selectable roleplay scenarios: Italian Café, Paris Metro, Tokyo Hotel Check-in, Berlin Job Interview, Madrid Tapas Bar, Mexico City Taxi.
4. Build a conversational UI with message bubbles, audio play buttons for each AI turn (using Web Speech API or Cloud TTS), and an expandable "Grammar Coach Feedback" sidebar.
5. Implement speech-to-text input via the browser Web Speech API so learners can speak their responses directly.
6. Provide an end-of-session summary modal rating fluency, grammar accuracy, and vocabulary variety.
VERIFICATION: Verify conversation flow, test scenario switching, confirm grammar corrections render without breaking chat flow.`,
    'info'
  );

  // Master Prompt 4
  doc.addHeading2('Master Prompt 4: Spaced Repetition (SRS) Vocabulary Builder & Flashcards');
  doc.addCallout(
    'COPY-PASTE PROMPT 4: SRS VOCABULARY BUILDER',
    `Act as the Senior Full-Stack Engineer for UniLang.
TASK: Build the complete Vocabulary Builder & Spaced Repetition (SRS) engine.
REQUIREMENTS:
1. Implement the SuperMemo SM-2 algorithm in /src/lib/srs.js:
   - Calculate interval (I), repetition count (n), and ease factor (EF) based on user recall grade (0 = complete blackout to 5 = perfect recall).
   - Compute next review due date and retention strength percentage.
2. Build /src/components/vocabulary/VocabularySection.jsx featuring:
   a) Daily Review Queue: Displays cards due for review today.
   b) Flashcard Player: 3D flip card animation showing term, phonetics, audio, example sentence, and recall rating buttons (Again, Hard, Good, Easy).
   c) Master Word Deck: Searchable, filterable table of all saved words with mastery indicators.
   d) "Add to Vocabulary" action: Wire this up across Culture Explorer, Translator, and Lessons so any highlighted word can be saved with one tap.
3. Provide offline caching via IndexedDB/localStorage so flashcard reviews can be completed without internet connectivity.
VERIFICATION: Test SM-2 mathematical intervals with unit tests; verify card flipping and database sync.`,
    'info'
  );

  // Master Prompt 5
  doc.addHeading2('Master Prompt 5: Interactive Grammar Coach & Verb Conjugation Tool');
  doc.addCallout(
    'COPY-PASTE PROMPT 5: GRAMMAR COACH & CONJUGATION',
    `Act as the Lead Linguistic Tooling Engineer for UniLang.
TASK: Build the Interactive Grammar Coach & Conjugation Engine in /src/components/grammar/GrammarSection.jsx.
REQUIREMENTS:
1. Build dynamic verb conjugation tables for regular and irregular verbs across Present, Preterite, Imperfect, Future, Conditional, and Subjunctive tenses for Spanish, French, Italian, German, and Portuguese.
2. Create an interactive "Sentence Analyzer" input where learners type or paste a sentence in the target language:
   - Send input to POST /api/ai/analyze-grammar (implementing Prompt 3.2 from UNILANG-ARCH-2026-V1).
   - Display colored token badges for each part of speech (Subject, Verb, Object, Preposition).
   - Flag grammatical errors with clear linguistic explanations and one-click corrections.
3. Build a curated Grammar Rule Library organized by CEFR levels (e.g. "Ser vs Estar", "Subjunctive Mood Triggers", "Direct vs Indirect Pronoun Order").
VERIFICATION: Verify conjugation accuracy against standard linguistic models; ensure sentence parser catches tense and gender agreement errors.`,
    'info'
  );

  // Master Prompt 6
  doc.addHeading2('Master Prompt 6: Offline Travel Phrasebook & Reading Studio');
  doc.addCallout(
    'COPY-PASTE PROMPT 6: PHRASEBOOK & READING STUDIO',
    `Act as the Senior Frontend Engineer for UniLang.
TASK: Build the Offline Travel Phrasebook and the Reading & Listening Studio.
REQUIREMENTS:
1. Build /src/components/phrasebook/PhrasebookSection.jsx:
   - Implement the 8 core categories (Emergency, Medical, Food, Directions, Lodging, Transit, Shopping, Social) with 50+ essential phrases per language.
   - Include rapid-access "Emergency Mode" pinned at the top with red accent styling.
   - Every phrase must include: English, target script, Romanized phonetics, audio playback button, and "Save to Notebook" icon.
   - Instant search filter indexing English, target script, and phonetics.
2. Build /src/components/reading/ReadingStudio.jsx:
   - Dual-language parallel reader displaying side-by-side or stacked synchronized sentences.
   - Interactive audio player with sentence-level karaoke highlighting as audio advances.
   - Interactive word tokens: Clicking any word opens a quick definition popover.
   - 3-question reading comprehension quiz at the end of each passage.
VERIFICATION: Verify audio-text karaoke synchronization; ensure offline phrasebook accessibility; test mobile responsiveness.`,
    'info'
  );

  const res = doc.finalizeAndSave(path.resolve(__dirname, '..', 'UniLang_Development_and_Content_Blueprint.pdf'));
  console.log('Blueprint document generated successfully:', res);
  return res;
}

generateBlueprintDoc();
