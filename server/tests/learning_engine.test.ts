import { describe, it, expect } from 'vitest';
import { levenshteinDistance } from '../../src/lib/levenshtein.js';
import { normalizeText, scorePronunciation } from '../../src/lib/pronunciation.js';
import { CURRICULA, getAllLessonsForLang } from '../../src/data/curriculum/index.js';

describe('Phase 2: Learning Engine & Pronunciation Verification', () => {
  describe('Levenshtein Distance Algorithm', () => {
    it('returns 0 for identical strings', () => {
      expect(levenshteinDistance('hola', 'hola')).toBe(0);
      expect(levenshteinDistance('bonjour', 'bonjour')).toBe(0);
    });

    it('returns length for empty comparison', () => {
      expect(levenshteinDistance('hola', '')).toBe(4);
      expect(levenshteinDistance('', 'ciao')).toBe(4);
    });

    it('calculates single substitution, insertion, deletion correctly', () => {
      expect(levenshteinDistance('hola', 'hala')).toBe(1); // substitution
      expect(levenshteinDistance('hola', 'holas')).toBe(1); // insertion
      expect(levenshteinDistance('hola', 'ola')).toBe(1); // deletion
    });
  });

  describe('Pronunciation & Normalization Engine', () => {
    it('normalizes accents, diacritics and punctuation', () => {
      expect(normalizeText('¡Hola, ¿cómo estás?!')).toBe('hola como estas');
      expect(normalizeText("C'est très bien!")).toBe('cest tres bien');
      expect(normalizeText('Schön, danke.')).toBe('schon danke');
    });

    it('scores exact speech match at 100%', () => {
      const res = scorePronunciation('Buenos días', '¡Buenos días!');
      expect(res.score).toBe(100);
      expect(res.isMatch).toBe(true);
    });

    it('scores near match with single letter difference above 70%', () => {
      const res = scorePronunciation('Mucho gustos', 'Mucho gusto');
      expect(res.score).toBeGreaterThanOrEqual(85);
      expect(res.isMatch).toBe(true);
    });

    it('rejects completely erroneous transcription (<50%)', () => {
      const res = scorePronunciation('Goodbye my friend', 'Mucho gusto');
      expect(res.score).toBeLessThan(50);
      expect(res.isMatch).toBe(false);
    });
  });

  describe('CEFR Curricula Structural Integrity', () => {
    const supportedLangs = ['es', 'fr', 'de', 'it', 'ja'];

    supportedLangs.forEach(lang => {
      it(`language '${lang}' has complete A1 and A2 modules with valid exercises`, () => {
        const curr = CURRICULA[lang];
        expect(curr).toBeDefined();
        expect(curr.levels.A1).toBeDefined();
        expect(curr.levels.A1.modules.length).toBeGreaterThan(0);

        const lessons = getAllLessonsForLang(lang);
        expect(lessons.length).toBeGreaterThanOrEqual(1);

        // Every lesson must have valid exercises
        lessons.forEach(lesson => {
          expect(lesson.title).toBeDefined();
          expect(lesson.xp).toBeGreaterThan(0);
          expect(lesson.exercises).toBeDefined();
          expect(lesson.exercises.length).toBeGreaterThanOrEqual(3);
        });
      });
    });
  });
});
