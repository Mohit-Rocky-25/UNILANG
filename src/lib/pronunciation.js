import { levenshteinDistance } from './levenshtein';

export function normalizeText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics for phonetic comparison
    .replace(/[¿?¡!.,;:()\-–—"']/g, '') // strip punctuation
    .trim()
    .replace(/\s+/g, ' ');
}

export function scorePronunciation(spokenText, targetText) {
  const normSpoken = normalizeText(spokenText);
  const normTarget = normalizeText(targetText);

  if (!normSpoken || !normTarget) {
    return { score: 0, accuracy: 0, isMatch: false };
  }

  if (normSpoken === normTarget) {
    return { score: 100, accuracy: 100, isMatch: true };
  }

  const distance = levenshteinDistance(normSpoken, normTarget);
  const maxLen = Math.max(normSpoken.length, normTarget.length);
  const similarity = Math.max(0, 1 - distance / maxLen);
  const score = Math.round(similarity * 100);

  return {
    score,
    accuracy: score,
    isMatch: score >= 70,
    distance,
    normSpoken,
    normTarget
  };
}
