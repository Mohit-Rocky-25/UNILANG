import { describe, it, expect } from 'vitest';
import { CONJUGATION_DATABASE } from '../../src/data/grammar/conjugationData.js';
import { GRAMMAR_RULE_LIBRARY } from '../../src/data/grammar/grammarRules.js';
import { SCENARIOS } from '../../src/data/scenarios/index.js';

describe('Phase 4: Grammar Engine & AI Scenario Verification', () => {
  describe('Conjugation Matrices', () => {
    it('verifies Spanish ser and estar conjugations', () => {
      const es = CONJUGATION_DATABASE.es;
      expect(es).toBeDefined();
      expect(es.verbs.ser.tenses.present.yo).toBe('soy');
      expect(es.verbs.ser.tenses.preterite.yo).toBe('fui');
      expect(es.verbs.estar.tenses.present.yo).toBe('estoy');
    });

    it('verifies French être and avoir conjugations', () => {
      const fr = CONJUGATION_DATABASE.fr;
      expect(fr).toBeDefined();
      expect(fr.verbs.etre.tenses.present.je).toBe('suis');
      expect(fr.verbs.avoir.tenses.present.je).toBe('ai');
    });

    it('verifies German sein and haben conjugations', () => {
      const de = CONJUGATION_DATABASE.de;
      expect(de).toBeDefined();
      expect(de.verbs.sein.tenses.present.ich).toBe('bin');
      expect(de.verbs.haben.tenses.present.wir).toBe('haben');
    });

    it('verifies Italian essere and avere conjugations', () => {
      const itLang = CONJUGATION_DATABASE.it;
      expect(itLang).toBeDefined();
      expect(itLang.verbs.essere.tenses.present.io).toBe('sono');
      expect(itLang.verbs.avere.tenses.present.noi).toBe('abbiamo');
    });
  });

  describe('Grammar Rule Library Structure', () => {
    it('contains rules across A1 to B2 with valid formulas and examples', () => {
      expect(GRAMMAR_RULE_LIBRARY.length).toBeGreaterThanOrEqual(4);
      GRAMMAR_RULE_LIBRARY.forEach(rule => {
        expect(rule.title).toBeDefined();
        expect(rule.formula).toBeDefined();
        expect(rule.examples.length).toBeGreaterThan(0);
      });
    });
  });

  describe('AI Roleplay Scenarios', () => {
    it('validates all 6 roleplay scenarios are configured with CEFR levels and opening dialogues', () => {
      expect(SCENARIOS.length).toBe(6);
      SCENARIOS.forEach(sc => {
        expect(sc.key).toBeDefined();
        expect(sc.title).toBeDefined();
        expect(sc.openingLine).toBeDefined();
        expect(sc.openingTranslation).toBeDefined();
        expect(sc.cefrLevel).toMatch(/A1|A2|B1|B2|C1/);
        expect(sc.targetVocab.length).toBeGreaterThan(0);
      });
    });
  });
});
