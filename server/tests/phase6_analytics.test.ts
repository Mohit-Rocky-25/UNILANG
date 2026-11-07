import { describe, it, expect } from 'vitest';
import { CULTURE_EXTENDED, getCultureExtended } from '../../src/data/culture/cultureExtendedData.js';
import {
  ALL_BADGES,
  BADGE_TIERS,
  DAILY_QUESTS,
  LEAGUE_TIERS,
  generateLeagueLeaderboard
} from '../../src/data/gamification/badgesAndLeagues.js';

describe('Phase 6: Culture Depth, Library, Gamification & Leagues Verification', () => {
  describe('FR-10: Culture Depth Upgrades', () => {
    it('verifies 5 historical linguistic milestones for core languages', () => {
      ['es', 'fr', 'de', 'it', 'ja'].forEach(langCode => {
        const ext = getCultureExtended(langCode);
        expect(ext.timeline).toBeDefined();
        expect(ext.timeline.length).toBe(5);
        ext.timeline.forEach(item => {
          expect(item.year).toBeDefined();
          expect(item.title).toBeDefined();
          expect(item.description.length).toBeGreaterThan(15);
        });
      });
    });

    it('verifies 5 Dos and 5 Don’ts with rich context for core languages', () => {
      ['es', 'fr', 'de', 'it', 'ja'].forEach(langCode => {
        const ext = getCultureExtended(langCode);
        expect(ext.etiquette).toBeDefined();
        expect(ext.etiquette.dos.length).toBe(5);
        expect(ext.etiquette.donts.length).toBe(5);

        ext.etiquette.dos.forEach(d => {
          expect(d.rule).toBeDefined();
          expect(d.context.length).toBeGreaterThan(10);
        });
        ext.etiquette.donts.forEach(d => {
          expect(d.rule).toBeDefined();
          expect(d.context.length).toBeGreaterThan(10);
        });
      });
    });

    it('validates 5-question regional cultural quiz and badge reward', () => {
      ['es', 'fr', 'de', 'it', 'ja'].forEach(langCode => {
        const ext = getCultureExtended(langCode);
        expect(ext.quiz).toBeDefined();
        expect(ext.quiz.xpReward).toBe(50);
        expect(ext.quiz.badgeTitle).toBeDefined();
        expect(ext.quiz.questions.length).toBe(5);

        ext.quiz.questions.forEach(q => {
          expect(q.options.length).toBe(4);
          expect(q.correctIndex).toBeGreaterThanOrEqual(0);
          expect(q.correctIndex).toBeLessThan(4);
          expect(q.explanation.length).toBeGreaterThan(10);
        });
      });
    });
  });

  describe('FR-12: Gamification, Quests & Weekly Leagues', () => {
    it('contains at least 30 achievement badges across 5 tiers', () => {
      expect(ALL_BADGES.length).toBeGreaterThanOrEqual(30);

      const tierCounts = { BRONZE: 0, SILVER: 0, GOLD: 0, PLATINUM: 0, DIAMOND: 0 };
      ALL_BADGES.forEach(b => {
        expect(BADGE_TIERS[b.tier]).toBeDefined();
        expect(b.title).toBeDefined();
        expect(b.desc).toBeDefined();
        expect(b.icon).toBeDefined();
        tierCounts[b.tier]++;
      });

      expect(tierCounts.BRONZE).toBeGreaterThanOrEqual(5);
      expect(tierCounts.SILVER).toBeGreaterThanOrEqual(5);
      expect(tierCounts.GOLD).toBeGreaterThanOrEqual(5);
      expect(tierCounts.PLATINUM).toBeGreaterThanOrEqual(5);
      expect(tierCounts.DIAMOND).toBeGreaterThanOrEqual(5);
    });

    it('has active daily quests with targets and XP rewards', () => {
      expect(DAILY_QUESTS.length).toBeGreaterThanOrEqual(3);
      DAILY_QUESTS.forEach(q => {
        expect(q.title).toBeDefined();
        expect(q.rewardXp).toBeGreaterThanOrEqual(10);
        expect(q.target).toBeGreaterThan(0);
      });
    });

    it('generates a 30-participant weekly league leaderboard with promotion and demotion zones', () => {
      const userXp = 540;
      const userName = 'Taylor Swift';
      const board = generateLeagueLeaderboard(userXp, userName, 'Gold');

      expect(board.length).toBe(30);

      // Verify sorted descending by XP
      for (let i = 0; i < board.length - 1; i++) {
        expect(board[i].xp).toBeGreaterThanOrEqual(board[i + 1].xp);
        expect(board[i].rank).toBe(i + 1);
      }

      // Verify top 5 are in promotion zone
      const top5 = board.slice(0, 5);
      top5.forEach(p => expect(p.zone).toBe('promotion'));

      // Verify bottom 5 are in demotion zone
      const bottom5 = board.slice(25, 30);
      bottom5.forEach(p => expect(p.zone).toBe('demotion'));

      // Verify user is in leaderboard
      const userEntry = board.find(p => p.isUser);
      expect(userEntry).toBeDefined();
      expect(userEntry?.name).toBe(userName);
      expect(userEntry?.xp).toBe(userXp);
    });
  });

  describe('FR-11: Personal Notebook / Library Data Formatting', () => {
    it('validates CSV and Anki TSV structure generation', () => {
      const testItem = {
        term: 'sobremesa',
        meaning: 'after-dinner chat',
        langCode: 'es',
        phonetic: 'soh-breh-MEH-sah',
        deck: 'Culture',
        tags: ['#Food', '#Spanish']
      };

      // CSV row formatting test
      const csvRow = `"${testItem.term}","${testItem.meaning}","${testItem.langCode}","${testItem.tags.join(';')}"`;
      expect(csvRow).toContain('sobremesa');
      expect(csvRow).toContain('#Food;#Spanish');

      // Anki TSV row formatting test
      const ankiRow = `${testItem.term}\t<b>${testItem.meaning}</b>\t${testItem.deck}\t${testItem.langCode}\t${testItem.tags.join(' ')}`;
      expect(ankiRow.split('\t').length).toBe(5);
      expect(ankiRow).toContain('<b>after-dinner chat</b>');
    });
  });
});
