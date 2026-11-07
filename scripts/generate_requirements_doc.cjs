const { PDFDocumentBuilder } = require('./pdf_builder.cjs');
const path = require('path');

function generateRequirementsDoc() {
  const doc = new PDFDocumentBuilder(
    'UniLang Platform Specification',
    'Complete Product Requirements Specification (SRS) & Codebase Gap Analysis',
    'UNILANG-REQ-2026-V1'
  );

  // COVER PAGE
  doc.addCoverPage({
    version: '1.0 Final',
    classification: 'Product Architecture & Engineering Standard',
    date: 'November 2026',
    status: 'Comprehensive Baseline & Build Plan',
    description: 'This document establishes the exhaustive Software Requirements Specification (SRS) for the UniLang platform based on the master blueprint in README.md. It provides an unsparing technical gap analysis comparing the target specification against the current codebase reality, defines granular functional and non-functional requirements, and establishes user journeys and acceptance criteria to drive prompt-based implementation.',
    highlights: [
      'Comprehensive Gap Analysis: Evaluates all 12 core modules against the existing React frontend.',
      'Target Personas & End-to-End Journeys: Casual, Heritage, Business, Polyglot, and Academic learners.',
      'Granular Functional Requirements: FR-01 through FR-12 with user stories, inputs, outputs, and edge cases.',
      'Non-Functional Standards: WCAG 2.2 AA accessibility, RTL multi-script typography, sub-second latency.',
      'Verification Matrix: Strict Definition of Done (DoD) to validate features before production signoff.'
    ]
  });

  // ==========================================
  // SECTION 1: EXECUTIVE OVERVIEW & VISION
  // ==========================================
  doc.addHeading1('1. Executive Overview & Product Vision');

  doc.addHeading2('1.1 The UniLang Mission');
  doc.addParagraph(
    'Language is not a sterile set of grammatical rules to be memorized or a gamified checklist of isolated vocabulary flashcards. It is the fundamental medium through which human beings communicate, express cultural values, build relationships, and discover new worldviews. UniLang is engineered to unify structured pedagogical learning paths, real-time contextual translation, conversational immersion, speech pronunciation analysis, and rich cultural discovery into a single, cohesive web application.'
  );

  doc.addHeading2('1.2 The Problem Statement');
  doc.addParagraph(
    'Existing market solutions exhibit three catastrophic structural flaws that prevent learners from achieving real-world conversational fluency:'
  );
  doc.addBullet('Isolated Rote Drills:', 'Apps like Duolingo prioritize dopamine-driven gamification and repetitive sentence translation (e.g., "The bear drinks milk") that learners will never use in real-life contexts, failing to build spontaneous speech generation.');
  doc.addBullet('Divorce from Cultural Context:', 'Conventional platforms teach vocabulary without the underlying social etiquette, historical milestones, idiomatic subtleties, or regional registers required for respectful and authentic communication.');
  doc.addBullet('Fragmented Tooling Ecosystem:', 'Learners are forced to juggle 4 to 5 disparate applications: Google Translate for translation, Anki for flashcards, Babbel for grammar drills, and italki or ChatGPT for conversational practice, resulting in fractured learning history.');

  doc.addHeading2('1.3 The UniLang Solution Architecture');
  doc.addParagraph(
    'UniLang solves this fragmentation by building a 12-pillar interconnected learning environment where every interaction reinforces the others. A word encountered in a cultural article can be saved to the Spaced Repetition vocabulary deck with one tap; a sentence translated in the Smart Translator is analyzed for grammatical nuances and practiced with an AI conversational partner; and pronunciation is benchmarked against native phonetic patterns.'
  );

  doc.addCallout(
    'STRATEGIC PRODUCT PRINCIPLE',
    'UniLang treats culture, translation, and conversation not as auxiliary add-ons, but as core pedagogical pillars that give meaning, context, and retention to vocabulary and grammar acquisition.',
    'info'
  );

  // ==========================================
  // SECTION 2: CODEBASE REALITY VS README.MD GAP ANALYSIS
  // ==========================================
  doc.addHeading1('2. Codebase Reality vs README.md Gap Analysis');
  doc.addParagraph(
    'A rigorous audit of the current repository (c:\\Users\\yadav\\OneDrive\\Desktop\\UNILANG\\src) was conducted against the master specification outlined in README.md. While the application possesses a functional React 18 / Vite shell with authentic cultural imagery and a demo login experience, the vast majority of core linguistic, AI, speech, and persistence engines remain completely unbuilt or exist solely as static placeholders.'
  );

  // Audit Table
  const auditHead = ['Module / Feature', 'README.md Specification', 'Current Codebase State', 'Status', 'Critical Deficits'];
  const auditBody = [
    [
      '1. Personalized Learning Paths',
      'CEFR-aligned (A1-C1) multi-language curricula, diagnostic placement tests, adaptive skill progression.',
      'Only 3 mock beginner lessons in lessonContent.js. Static quiz modal with hardcoded questions.',
      'Mocked / Incomplete',
      'No placement test; no CEFR progression; no persistent completion scores; no multi-level branching.'
    ],
    [
      '2. Smart Contextual Translator',
      'Context-aware translation with register/formality indicators, idiomatic breakdown, alternative options, audio playback.',
      'Basic TranslateSection.jsx wrapping public Lingva API. Basic source/target text translation.',
      'Partially Implemented',
      'No formality toggle; no idiom breakdown; no grammar explanation; no translation history persistence.'
    ],
    [
      '3. Pronunciation & Speaking Practice',
      'Audio recording, speech-to-text recognition, phonetic alignment, pitch/accuracy score (0-100%), native audio playback.',
      'Zero audio recording, zero STT, zero voice feedback components in the codebase.',
      'NOT IMPLEMENTED',
      'Complete absence of Web Speech API or Cloud Speech engine; no mic permissions or audio visualizer.'
    ],
    [
      '4. Culture Explorer',
      'Regional guides, verified high-resolution photography, historical timelines, cultural etiquette do\'s/don\'ts, quizzes.',
      'CultureSection.jsx & CultureDetail.jsx with 200 authentic verified Wikimedia images for 20 languages.',
      'Partially Implemented',
      'Missing historical milestone timeline, etiquette guides, culinary deep dives, and cultural quizzes.'
    ],
    [
      '5. Vocabulary Builder & SRS',
      'Spaced Repetition System (SuperMemo SM-2), custom flashcard decks, retention strength index, automated review scheduling.',
      'No vocabulary management files, no flashcard deck engine, no review scheduling logic.',
      'NOT IMPLEMENTED',
      'Complete absence of SM-2 algorithm, deck creation, vocabulary mastery tracking, or card flip UI.'
    ],
    [
      '6. Interactive Grammar Coach',
      'Contextual grammar explanations, verb conjugation charts, sentence diagramming, real-time error diagnostics.',
      'No grammar files, no conjugation tables, no syntax analyzer in the codebase.',
      'NOT IMPLEMENTED',
      'No grammar rule database, no conjugation engine, no sentence structure visualizer.'
    ],
    [
      '7. AI Conversation Partner',
      'Scenario-based roleplay (Café, Hotel, Taxi, Airport, Business), real-time corrections, CEFR adaptive speech.',
      'No AI chat components, no LLM provider adapter, no roleplay scenarios in codebase.',
      'NOT IMPLEMENTED',
      'No backend AI adapter (OpenAI/Gemini/Claude); no scenario prompt templates; no correction feedback stream.'
    ],
    [
      '8. Reading & Listening Studio',
      'Dual-language parallel reading texts, synchronized sentence-level audio player, comprehension quizzes, speed control.',
      'No reading/listening studio pages or audio synchronization components.',
      'NOT IMPLEMENTED',
      'Missing parallel reader UI, audio-text sync markers, passage library, and comprehension quiz module.'
    ],
    [
      '9. Learning Dashboard',
      'Comprehensive metrics: streak tracking, XP breakdown, skill radar, study time heatmap, retention forecast.',
      'DashboardSection.jsx renders visual cards with mock 450 XP, 7-day streak stored in local React state.',
      'Partially Implemented',
      'Metrics are ephemeral; no persistent database backing; no real calculation of study time or skill radar.'
    ],
    [
      '10. Travel Phrasebook',
      'Categorized practical expressions (Emergency, Medical, Food, Directions, Transit) with tap-to-speak and phonetics.',
      'No phrasebook component or phrasebook data repository.',
      'NOT IMPLEMENTED',
      'Missing 8 major phrase categories, phonetic guides, quick tap-to-speak audio, and offline caching.'
    ],
    [
      '11. Personal Learning Library',
      'User bookmarks, saved vocabulary notes, custom expression lists, exportable PDF/CSV study sheets.',
      'No library or notebook interface; no bookmarking store.',
      'NOT IMPLEMENTED',
      'Missing notebook UI, bookmarking tags, note editing modal, and export utilities.'
    ],
    [
      '12. Community & Challenges',
      'Global and friends leaderboards, weekly league tiers, daily quests, multiplayer word challenges, badge system.',
      'Static placeholder badges on dashboard; no multi-user connectivity, quests, or leagues.',
      'Mocked / Incomplete',
      'No leaderboard database, no quest generation logic, no achievement evaluation pipeline.'
    ]
  ];

  doc.addTable(auditHead, auditBody, {
    colStyles: {
      0: { cellWidth: 28, fontStyle: 'bold' },
      1: { cellWidth: 38 },
      2: { cellWidth: 38 },
      3: { cellWidth: 26, fontStyle: 'bold' },
      4: { cellWidth: 46 }
    }
  });

  doc.addCallout(
    'CRITICAL INFRASTRUCTURE DEFICIT: DATABASE & BACKEND',
    'The current frontend operates entirely client-side with mock localStorage state and demo user bypasses. There is currently NO persistent PostgreSQL/Supabase database schema, NO backend API gateway (Fastify/Express), and NO secure server-side management of AI or speech API credentials.',
    'gap'
  );

  // ==========================================
  // SECTION 3: TARGET PERSONAS & USER JOURNEYS
  // ==========================================
  doc.addHeading1('3. Target Personas & Detailed User Journeys');

  doc.addHeading2('3.1 Persona Profiles');
  doc.addBullet('Persona 1: Casual & Travel Learner ("Elena", 28):', 'Preparing for a 3-week trip to Italy and Japan. Needs essential survival vocabulary, dining etiquette, audio pronunciation, and offline phrasebooks. Has 10-15 minutes/day.');
  doc.addBullet('Persona 2: Academic & Heritage Learner ("Kenji", 22):', 'Second-generation Japanese-American seeking to connect with grandparents and prepare for the JLPT N3 exam. Needs deep grammar explanations, kanji stroke/reading practice, and cultural context.');
  doc.addBullet('Persona 3: Career & Professional Learner ("Sofia", 34):', 'Marketing Director relocating to Zurich; needs B2 professional German. Focuses on polite workplace registers, corporate email phrasing, negotiations, and scenario roleplays.');
  doc.addBullet('Persona 4: Polyglot & Intensive Learner ("Marcus", 41):', 'Language enthusiast simultaneously studying Modern Standard Arabic and French. Needs dual-language dashboards, flawless Right-to-Left (RTL) script rendering, and strict Spaced Repetition decks.');
  doc.addBullet('Persona 5: Secondary & Exam Student ("Aarav", 16):', 'High school student preparing for Spanish GCSE exams. Needs instant sentence parsing, verb conjugation drills, comprehension quizzes, and homework text translation.');

  doc.addHeading2('3.2 Comprehensive User Journeys');

  doc.addHeading3('Journey 1: Elena\'s Travel Preparation (Casual / Conversational)');
  doc.addParagraph(
    '1. Elena signs in via 1-click demo on mobile. 2. Selects "Italian" and sets her goal to "Travel & Survival". 3. The app suggests the "Italian Café & Dining" module. 4. She listens to native audio for ordering espresso, practices recording her pronunciation via the Speak module, and receives an 88% acoustic pitch match score. 5. She opens Culture Explorer to discover Italian coffee etiquette (never order cappuccino after 11 AM). 6. She bookmarks 5 essential phrases into her Offline Travel Phrasebook for easy access on the flight.'
  );

  doc.addHeading3('Journey 2: Sofia\'s Business Immersion (Professional / AI Partner)');
  doc.addParagraph(
    '1. Sofia selects "German" at B1/B2 level and initiates the "Job Interview & Meeting" scenario in the AI Conversation Partner. 2. Sofia types a sentence using the casual "du" instead of formal "Sie". 3. The Grammar Coach instantly flags the register mismatch, explains the corporate etiquette, and suggests the polite alternative. 4. Sofia completes a 10-turn dialogue, receives a fluency and grammar accuracy breakdown, and saves 6 new workplace terms to her personal Spaced Repetition deck.'
  );

  // ==========================================
  // SECTION 4: GRANULAR FUNCTIONAL REQUIREMENTS
  // ==========================================
  doc.addHeading1('4. Granular Functional Requirements (FR-01 to FR-12)');

  // FR-01
  doc.addHeading2('FR-01: Personalized Learning Paths & Level Assessments');
  doc.addParagraph(
    'The system shall deliver structured, CEFR-aligned (A1, A2, B1, B2, C1) learning curricula across all 20+ supported languages, beginning with an initial diagnostic placement test.'
  );
  doc.addBullet('Diagnostic Placement Engine:', 'A 15-question adaptive assessment evaluating reading, listening, vocabulary, and grammar to assign user baseline level (A1 to B2).');
  doc.addBullet('Curriculum Node Graph:', 'Lessons organized into progressive modules (Basics, Travel, Social, Workplace, Culture) with dependency unlocking.');
  doc.addBullet('Multi-Modal Exercises:', 'Multiple choice, sentence reordering, fill-in-the-blank, audio transcription, and image matching.');

  // FR-02
  doc.addHeading2('FR-02: Smart Contextual Translator');
  doc.addParagraph(
    'The system shall provide a multi-engine translation workspace with contextual awareness, cultural annotations, and linguistic decomposition.'
  );
  doc.addBullet('Provider Adapter Layer:', 'Abstraction supporting Lingva, LibreTranslate, DeepL, and Google Translate with automatic failover.');
  doc.addBullet('Register & Tone Detection:', 'Explicit labeling of formality (Formal, Informal, Slang, Archaic, Technical).');
  doc.addBullet('Idiomatic Decomposition:', 'High-level detection of idioms with literal vs figurative translations.');
  doc.addBullet('Word-by-Word Breakdown:', 'Interactive clickable tokens showing grammatical part-of-speech, lemma, and audio.');

  // FR-03
  doc.addHeading2('FR-03: Pronunciation & Speaking Practice Engine');
  doc.addParagraph(
    'The system shall provide speech recognition, acoustic phonetic comparison, and audio feedback for oral practice.'
  );
  doc.addBullet('Speech Recognition (STT):', 'Browser Web Speech API integration with cloud speech fallback (Whisper/Google STT).');
  doc.addBullet('Acoustic Scoring (0-100%):', 'Levenshtein phonetic distance analysis comparing learner speech transcript against target phonemes.');
  doc.addBullet('Waveform & Pitch Visualizer:', 'Real-time Canvas-rendered microphone input level and waveform playback comparison.');
  doc.addBullet('Audio Speed Control:', 'Adjustable native TTS playback speed (0.5x, 0.75x, 1.0x, 1.25x).');

  // FR-04
  doc.addHeading2('FR-04: Culture Explorer & Regional Heritage Guides');
  doc.addParagraph(
    'The system shall provide rich, authentic cultural documentation for all supported languages, citing verified historical and sociological sources.'
  );
  doc.addBullet('Verified Wikimedia Media:', 'Curated, high-resolution imagery with historical architectural, culinary, and geographical accuracy.');
  doc.addBullet('Etiquette Dos & Don\'ts:', 'Clear behavioral guidelines for dining, greeting, gifting, tipping, and body language.');
  doc.addBullet('Historical Milestone Timeline:', 'Interactive chronological milestones explaining how historical events shaped the modern language.');
  doc.addBullet('Cultural Knowledge Quizzes:', 'Mini-quizzes testing cultural nuance, preventing faux pas, and rewarding cultural XP.');

  // FR-05
  doc.addHeading2('FR-05: Vocabulary Builder with Spaced Repetition (SRS)');
  doc.addParagraph(
    'The system shall implement an algorithmic Spaced Repetition engine based on the SuperMemo SM-2 algorithm to guarantee long-term retention.'
  );
  doc.addBullet('SM-2 Algorithm Implementation:', 'Calculates next review interval (I), repetition count (n), and ease factor (EF) based on user recall grade (0-5).');
  doc.addBullet('Flashcard Studio:', 'Interactive 3D card-flip UI showing term, phonetics, audio, example sentence, and cultural context.');
  doc.addBullet('Retention Strength Meter:', 'Visual 0-100% memory retention bar per vocabulary item indicating memory decay.');
  doc.addBullet('Deck Management:', 'Pre-built thematic decks (Top 1000 Words, Travel Essentials, Business Verbs) and custom user decks.');

  // FR-06
  doc.addHeading2('FR-06: Interactive Grammar Coach & Conjugation Engine');
  doc.addParagraph(
    'The system shall provide an interactive grammar rule library, dynamic conjugation matrices, and real-time sentence structure visualizers.'
  );
  doc.addBullet('Conjugation Matrices:', 'Dynamic verb tables for all tenses (Present, Past, Future, Conditional, Subjunctive) with irregular verb highlights.');
  doc.addBullet('Sentence Diagramming:', 'Visual syntax breakdown coloring Subject, Verb, Direct Object, Indirect Object, and Prepositional phrases.');
  doc.addBullet('Contextual Error Explainer:', 'Input any learner sentence to identify tense mismatches, gender agreement errors, and case mistakes.');

  // FR-07
  doc.addHeading2('FR-07: Scenario-Based AI Conversation Partner');
  doc.addParagraph(
    'The system shall enable natural conversational voice and text roleplay with an AI agent trained in structured language instruction.'
  );
  doc.addBullet('Curated Roleplay Scenarios:', 'Ordering at a Restaurant, Checking into a Hotel, Asking for Directions, Negotiating at a Market, Job Interview, Emergency Doctor Visit.');
  doc.addBullet('Adaptive CEFR Vocabulary:', 'The AI automatically constrains its vocabulary complexity to match the user\'s proficiency level (A1 to C1).');
  doc.addBullet('Inline Gentle Corrections:', 'Identifies grammatical slips without interrupting conversational flow, providing suggestions in expandable sidebars.');
  doc.addBullet('Session Performance Report:', 'Post-chat summary rating fluency, grammar accuracy, vocabulary variety, and key terms learned.');

  // FR-08
  doc.addHeading2('FR-08: Reading & Listening Studio (Parallel Reader)');
  doc.addParagraph(
    'The system shall deliver dual-language parallel reading texts with synchronized sentence-level audio playback.'
  );
  doc.addBullet('Synchronized Karaoke Highlighting:', 'As audio plays, the active sentence in both source and target language is highlighted synchronously.');
  doc.addBullet('Instant Token Translation:', 'Clicking or tapping any individual word reveals a popover tooltip with definition, phonetics, and "Add to Deck" button.');
  doc.addBullet('Comprehension Checks:', '3 to 5 multi-choice questions at the conclusion of each passage verifying reading comprehension.');

  // FR-09
  doc.addHeading2('FR-09: Comprehensive Learning Analytics & Dashboard');
  doc.addParagraph(
    'The system shall provide detailed, persistent learning analytics to motivate learners and visualize mastery.'
  );
  doc.addBullet('Persistent Streak Engine:', 'Tracks daily active practice with streak-freeze capability and multi-day history.');
  doc.addBullet('Skill Mastery Radar Chart:', 'Visual polygon tracking 5 core linguistic competencies: Vocabulary, Grammar, Listening, Speaking, Culture.');
  doc.addBullet('Study Time Activity Heatmap:', 'GitHub-style 52-week activity grid displaying daily study intensity and minutes practiced.');

  // FR-10
  doc.addHeading2('FR-10: Offline-Ready Travel Phrasebook');
  doc.addParagraph(
    'The system shall provide an offline-accessible phrasebook with 8 core categories (Emergency, Medical, Food, Transit, Hotel, Directions, Shopping, Social).'
  );
  doc.addBullet('Audio & Phonetics:', 'Every phrase includes Romanized phonetic guide, localized script, and native audio sample.');
  doc.addBullet('Emergency Rapid-Access Mode:', 'One-tap emergency panel with critical medical, police, allergy, and embassy emergency phrases.');
  doc.addBullet('Indexed Search & Filtering:', 'Instant search filter across English, target language, and phonetic approximations.');

  // FR-11
  doc.addHeading2('FR-11: Personal Learning Library & Notebook');
  doc.addParagraph(
    'The system shall provide a centralized repository for user-saved vocabulary, bookmarked culture guides, translation history, and personal notes.'
  );
  doc.addBullet('Tagging & Folder System:', 'Organize saved items by custom user tags (e.g., "#RomeTrip", "#MedicalTerms", "#InterviewPrep").');
  doc.addBullet('Export Capabilities:', 'Export vocabulary and phrasebook lists to standard Anki .apkg, CSV, or formatted printable PDF.');

  // FR-12
  doc.addHeading2('FR-12: Community, Streaks & Gamification');
  doc.addParagraph(
    'The system shall drive sustained engagement through healthy social motivation, tiered leagues, and skill-based achievements.'
  );
  doc.addBullet('Weekly Tiered Leagues:', 'Bronze, Silver, Gold, Sapphire, Ruby, and Diamond leagues with weekly promotion and demotion.');
  doc.addBullet('Daily & Weekly Quests:', 'Dynamic daily challenges (e.g., "Score 90%+ in 2 pronunciation drills", "Learn 10 new food nouns").');
  doc.addBullet('Achievement Badges:', '30+ unlockable achievement badges celebrating milestones in streaks, vocabulary, and cultural discovery.');

  // ==========================================
  // SECTION 5: NON-FUNCTIONAL REQUIREMENTS
  // ==========================================
  doc.addHeading1('5. Non-Functional Requirements (NFR-01 to NFR-06)');

  const nfrHead = ['ID', 'Category', 'Target Metric / Standard', 'Verification Method'];
  const nfrBody = [
    [
      'NFR-01',
      'Performance',
      'Client route transitions < 100ms; Translation API latency < 800ms; Audio playback buffer < 300ms; AI TTFT < 1200ms.',
      'Automated Lighthouse CI audit, Network panel profiling, API latency tracing.'
    ],
    [
      'NFR-02',
      'Security & Auth',
      'HTTPS mandatory; secure HTTP-only session cookies; JWT authentication; zero plain API keys on client; bcrypt password hashing.',
      'Static code security scanning (npm audit, Snyk), OWASP Top 10 penetration checklist.'
    ],
    [
      'NFR-03',
      'Privacy & Audio',
      'Zero audio recording retention without explicit user opt-in; no telemetry recording of private translations; GDPR data export/delete.',
      'Automated data retention purge jobs; privacy policy compliance audit.'
    ],
    [
      'NFR-04',
      'Accessibility',
      'Full compliance with WCAG 2.2 Level AA; all buttons aria-labeled; visible focus rings; keyboard-only navigable.',
      'Axe-core accessibility scanner; full keyboard tab-navigation test.'
    ],
    [
      'NFR-05',
      'Localization / RTL',
      'Flawless bidirectional text layout (RTL) for Arabic/Hebrew/Urdu; Google Noto font fallbacks for CJK and Devanagari.',
      'Cross-browser visual regression testing on Arabic and Japanese character sets.'
    ],
    [
      'NFR-06',
      'Offline Resilience',
      'Travel phrasebook, cached lessons, and local vocabulary decks must load and function without active internet connectivity.',
      'Service Worker offline simulation; IndexedDB persistence testing.'
    ]
  ];

  doc.addTable(nfrHead, nfrBody, {
    colStyles: {
      0: { cellWidth: 16, fontStyle: 'bold' },
      1: { cellWidth: 30, fontStyle: 'bold' },
      2: { cellWidth: 70 },
      3: { cellWidth: 60 }
    }
  });

  // ==========================================
  // SECTION 6: DEFINITION OF DONE & QUALITY ASSURANCE
  // ==========================================
  doc.addHeading1('6. Quality Assurance & Definition of Done (DoD)');
  doc.addParagraph(
    'To guarantee engineering integrity, no module or feature shall be marked complete or merged into the production branch unless it satisfies the following 7-point Definition of Done checklist:'
  );

  doc.addBullet('1. Functional Specification Conformance:', 'The feature satisfies all documented functional criteria, input/output contracts, and user stories.');
  doc.addBullet('2. Error Boundary & Edge Case Handling:', 'Microphone denials, network dropouts, API rate limits, empty states, and invalid character inputs produce user-friendly recovery UI.');
  doc.addBullet('3. Security & Secret Safeguards:', 'No external API keys (OpenAI, Gemini, DeepL, ElevenLabs) are leaked into client-side bundles; all proxy calls execute server-side.');
  doc.addBullet('4. Responsive Multi-Device Layout:', 'Verified responsive rendering across mobile (375px+), tablet (768px+), and desktop (1280px+) viewport breakpoints.');
  doc.addBullet('5. Accessibility Verification:', 'Keyboard navigable, high-contrast text ratios (minimum 4.5:1), and screen-reader accessible aria tags verified.');
  doc.addBullet('6. Automated Test Coverage:', 'Unit tests for core logic (e.g., SM-2 scheduling, Levenshtein distance, conjugation tables) and Playwright E2E tests for user flows.');
  doc.addBullet('7. Synchronized Documentation:', 'README.md and engineering API specs updated to reflect the implemented state.');

  const res = doc.finalizeAndSave(path.resolve(__dirname, '..', 'UniLang_Requirements_Specification.pdf'));
  console.log('Requirements specification generated successfully:', res);
  return res;
}

generateRequirementsDoc();
