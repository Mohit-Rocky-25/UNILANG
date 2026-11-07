import { describe, it, expect } from 'vitest';
import { getPhrasebook } from '../../src/data/phrasebook/phrasebookData.js';
import { READING_ARTICLES, getArticlesByLanguage } from '../../src/data/reading/readingPassages.js';
import { PHONEME_DRILLS } from '../../src/data/speech/phonemeDrills.js';
import { scorePronunciation, normalizeText } from '../../src/lib/pronunciation.js';

describe('Phase 5: Speech Studio, Travel Phrasebook & Reading Studio Verification', () => {
  describe('Travel Phrasebook Engine', () => {
    it('provides rich phrase categories for all core languages (es, fr, de, it, ja)', () => {
      const languages = ['es', 'fr', 'de', 'it', 'ja'];
      languages.forEach(code => {
        const pb = getPhrasebook(code);
        expect(pb).toBeDefined();
        expect(pb.categories.length).toBeGreaterThanOrEqual(4);
      });
    });

    it('contains an emergency category with rapid-access phrases in Spanish', () => {
      const esPhrasebook = getPhrasebook('es');
      const emergencyCat = esPhrasebook.categories.find(c => c.isEmergency);
      expect(emergencyCat).toBeDefined();
      expect(emergencyCat?.phrases.length).toBeGreaterThanOrEqual(5);

      const doctorPhrase = emergencyCat?.phrases.find(p => p.source.toLowerCase().includes('doctor'));
      expect(doctorPhrase).toBeDefined();
      expect(doctorPhrase?.target).toContain('médico');
      expect(doctorPhrase?.phonetic).toBeDefined();
    });

    it('supports phonetic transcriptions for Japanese phrasebook', () => {
      const jaPhrasebook = getPhrasebook('ja');
      const greetingsCat = jaPhrasebook.categories.find(c => c.slug === 'greetings');
      expect(greetingsCat).toBeDefined();
      const arigatou = greetingsCat?.phrases.find(p => p.target.includes('ありがとう'));
      expect(arigatou).toBeDefined();
      expect(arigatou?.phonetic).toBeDefined();
    });
  });

  describe('Parallel Reading Studio Passages & Quizzes', () => {
    it('contains bilingual reading articles across A1 to A2 levels for core languages', () => {
      expect(READING_ARTICLES.length).toBeGreaterThanOrEqual(5);
      ['es', 'fr', 'de', 'it', 'ja'].forEach(code => {
        const articles = getArticlesByLanguage(code);
        expect(articles.length).toBeGreaterThanOrEqual(1);
        const art = articles[0];
        expect(art.sentences.length).toBeGreaterThan(0);
        expect(art.quiz.length).toBe(3);
      });
    });

    it('verifies Spanish café article sentences and word tokens have glosses', () => {
      const spanishArt = READING_ARTICLES.find(a => a.id === 'es-cafe-madrid');
      expect(spanishArt).toBeDefined();
      expect(spanishArt?.level).toBe('A1');
      expect(spanishArt?.sentences[0].target).toContain('El sol de la tarde');

      const words = spanishArt?.sentences[0].words;
      expect(words).toBeDefined();
      expect(words?.length).toBeGreaterThan(0);
      expect(words?.[1].term).toBe('sol');
      expect(words?.[1].meaning).toBe('sun');
    });

    it('validates 3-question comprehension quiz structure and valid correct index', () => {
      READING_ARTICLES.forEach(art => {
        expect(art.quiz.length).toBe(3);
        art.quiz.forEach(q => {
          expect(q.options.length).toBeGreaterThanOrEqual(3);
          expect(q.correctIndex).toBeGreaterThanOrEqual(0);
          expect(q.correctIndex).toBeLessThan(q.options.length);
          expect(q.explanation.length).toBeGreaterThan(5);
        });
      });
    });
  });

  describe('Speech & Phoneme Studio Drills', () => {
    it('verifies phoneme drills exist for difficult sounds across core languages', () => {
      expect(PHONEME_DRILLS.es.find(d => d.id === 'es-trill-r')).toBeDefined();
      expect(PHONEME_DRILLS.fr.find(d => d.id === 'fr-nasal-vowels')).toBeDefined();
      expect(PHONEME_DRILLS.de.find(d => d.id === 'de-umlauts')).toBeDefined();
      expect(PHONEME_DRILLS.it.find(d => d.id === 'it-geminates')).toBeDefined();
      expect(PHONEME_DRILLS.ja.find(d => d.id === 'ja-pitch-mora')).toBeDefined();
    });

    it('calculates acoustic pronunciation match scores with Levenshtein distance', () => {
      // Exact match
      const exact = scorePronunciation('Perro', 'perro');
      expect(exact.score).toBe(100);
      expect(exact.isMatch).toBe(true);

      // Accent insensitivity
      const accent = scorePronunciation('Rápido', 'rapido');
      expect(accent.score).toBe(100);
      expect(accent.isMatch).toBe(true);

      // Minor slip
      const near = scorePronunciation('pero', 'perro');
      expect(near.score).toBeGreaterThanOrEqual(70);

      // Completely incorrect
      const wrong = scorePronunciation('gato', 'perro');
      expect(wrong.score).toBeLessThan(50);
      expect(wrong.isMatch).toBe(false);
    });

    it('properly normalizes diacritics and punctuation', () => {
      const normalized = normalizeText('¡¿Cómo estás?!');
      expect(normalized).toBe('como estas');
    });
  });
});
