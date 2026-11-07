import { describe, it, expect } from 'vitest';
import { calculateSM2Review, calculateRetentionScore, isCardDue, RECALL_GRADES } from '../../src/lib/srs.js';

describe('Phase 3: SuperMemo SM-2 SRS Algorithm Verification', () => {
  const baseCard = {
    repetitionCount: 0,
    intervalDays: 1,
    easeFactor: 2.5
  };

  it('first-time Good recall (grade=4) sets n=1, I=1 day', () => {
    const res = calculateSM2Review(baseCard, RECALL_GRADES.GOOD);
    expect(res.repetitionCount).toBe(1);
    expect(res.intervalDays).toBe(1);
    expect(res.easeFactor).toBeCloseTo(2.5, 1);
  });

  it('second-time Good recall (n=1, grade=4) sets n=2, I=6 days', () => {
    const cardStep1 = {
      repetitionCount: 1,
      intervalDays: 1,
      easeFactor: 2.5
    };
    const res = calculateSM2Review(cardStep1, RECALL_GRADES.GOOD);
    expect(res.repetitionCount).toBe(2);
    expect(res.intervalDays).toBe(6);
  });

  it('repeated Easy chain increases EF and interval exponentially', () => {
    let card = { repetitionCount: 2, intervalDays: 6, easeFactor: 2.5 };
    const res = calculateSM2Review(card, RECALL_GRADES.EASY);
    expect(res.repetitionCount).toBe(3);
    expect(res.easeFactor).toBeGreaterThan(2.5); // EF increases on grade 5
    expect(res.intervalDays).toBe(Math.round(6 * res.easeFactor));
  });

  it('failed recall / lapse (grade < 3, e.g. AGAIN=1) resets repetition count to 0 and interval to 1', () => {
    const cardLongStreak = {
      repetitionCount: 8,
      intervalDays: 45,
      easeFactor: 2.7
    };
    const res = calculateSM2Review(cardLongStreak, RECALL_GRADES.AGAIN);
    expect(res.repetitionCount).toBe(0);
    expect(res.intervalDays).toBe(1);
    expect(res.easeFactor).toBeLessThan(2.7);
  });

  it('ease factor never drops below the strict 1.3 floor', () => {
    let card = { repetitionCount: 0, intervalDays: 1, easeFactor: 1.35 };
    // Subject card to multiple consecutive blackout ratings
    for (let i = 0; i < 5; i++) {
      card = calculateSM2Review(card, RECALL_GRADES.BLACKOUT);
    }
    expect(card.easeFactor).toBe(1.3);
  });

  it('handles grade boundaries correctly: grade 2 is a failure, grade 3 is a pass', () => {
    const card = { repetitionCount: 2, intervalDays: 6, easeFactor: 2.5 };
    const passRes = calculateSM2Review(card, 3);
    expect(passRes.repetitionCount).toBe(3);

    const failRes = calculateSM2Review(card, 2);
    expect(failRes.repetitionCount).toBe(0);
    expect(failRes.intervalDays).toBe(1);
  });

  it('retention score adheres to exponential decay curve clamped [0, 100]', () => {
    expect(calculateRetentionScore(10, 0)).toBe(100); // 0 days elapsed = 100%
    expect(calculateRetentionScore(10, 5)).toBeLessThan(100);
    expect(calculateRetentionScore(10, 30)).toBeLessThan(calculateRetentionScore(10, 5));
    expect(calculateRetentionScore(1, 100)).toBeGreaterThanOrEqual(0);
  });

  it('isCardDue accurately flags past and future due dates', () => {
    const past = new Date(Date.now() - 3600000);
    const future = new Date(Date.now() + 86400000);
    expect(isCardDue({ dueDate: past.toISOString() })).toBe(true);
    expect(isCardDue({ dueDate: future.toISOString() })).toBe(false);
  });
});

