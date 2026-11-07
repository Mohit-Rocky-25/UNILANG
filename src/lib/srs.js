/**
 * UniLang Spaced Repetition System (SRS)
 * Pure implementation of the SuperMemo SM-2 Algorithm
 *
 * References:
 * - P. A. Wozniak, "Optimization of learning", Master's Thesis, University of Technology in Poznan, 1990.
 */

export const RECALL_GRADES = {
  BLACKOUT: 0,
  AGAIN: 1,    // Complete failure to recall
  HARD: 3,     // Correct response recalled with serious difficulty
  GOOD: 4,     // Correct response after a hesitation
  EASY: 5      // Perfect recall with no hesitation
};

/**
 * Calculates next review interval, repetition count, ease factor, and due date.
 *
 * @param {Object} item Current card review state
 * @param {number} item.repetitionCount Number of consecutive successful recalls (n)
 * @param {number} item.intervalDays Previous interval in days (I_prev)
 * @param {number} item.easeFactor Current ease factor (EF, default 2.5, min 1.3)
 * @param {Date|string} [item.lastReviewedAt] Timestamp of previous review
 * @param {number} grade User recall grade q in [0, 5]
 * @param {Date} [currentDate] Reference date for review calculation (defaults to now)
 * @returns {Object} Updated SM-2 state
 */
export function calculateSM2Review(item, grade, currentDate = new Date()) {
  const q = Math.max(0, Math.min(5, Math.round(grade)));
  let n = item?.repetitionCount || 0;
  let I = item?.intervalDays || 1;
  let EF = item?.easeFactor !== undefined ? item.easeFactor : 2.5;

  // 1. Calculate new Ease Factor:
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  EF = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  // Hard floor at 1.3
  if (EF < 1.3) EF = 1.3;

  // 2. Calculate interval and repetition count:
  if (q < 3) {
    // Lapse / Failure: reset repetitions and schedule for immediate tomorrow
    n = 0;
    I = 1;
  } else {
    // Successful recall
    if (n === 0) {
      I = 1;
    } else if (n === 1) {
      I = 6;
    } else {
      I = Math.round(I * EF);
    }
    n += 1;
  }

  // 3. Compute next due date
  const now = new Date(currentDate);
  const dueDate = new Date(now.getTime() + I * 24 * 60 * 60 * 1000);

  // 4. Calculate retention score (decay curve)
  const retentionScore = calculateRetentionScore(I, 0);

  return {
    repetitionCount: n,
    intervalDays: I,
    easeFactor: Number(EF.toFixed(3)),
    dueDate,
    lastReviewedAt: now,
    retentionScore
  };
}

/**
 * Retention strength formula based on Ebbinghaus forgetting curve:
 * Retention % = 100 * exp(-daysSinceLastReview / (I * 1.0 + 0.5))
 * Clamped strictly between 0 and 100.
 */
export function calculateRetentionScore(intervalDays, daysSinceLastReview) {
  if (daysSinceLastReview <= 0) return 100;
  const I = Math.max(1, intervalDays || 1);
  const decay = Math.exp(-daysSinceLastReview / (I * 1.0 + 0.5));
  return Math.min(100, Math.max(0, Math.round(100 * decay)));
}

/**
 * Determines whether a card is currently due for review.
 */
export function isCardDue(item, referenceDate = new Date()) {
  if (!item || !item.dueDate) return true;
  const due = new Date(item.dueDate);
  return due <= referenceDate;
}

