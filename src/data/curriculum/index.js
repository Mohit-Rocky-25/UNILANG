import { SPANISH_CURRICULUM } from './spanish';
import { FRENCH_CURRICULUM } from './french';
import { GERMAN_CURRICULUM } from './german';
import { ITALIAN_CURRICULUM } from './italian';
import { JAPANESE_CURRICULUM } from './japanese';

export const CURRICULA = {
  es: SPANISH_CURRICULUM,
  fr: FRENCH_CURRICULUM,
  de: GERMAN_CURRICULUM,
  it: ITALIAN_CURRICULUM,
  ja: JAPANESE_CURRICULUM
};

export function getCurriculum(langCode = 'es') {
  return CURRICULA[langCode] || CURRICULA.es;
}

export function getAllLessonsForLang(langCode = 'es') {
  const curr = getCurriculum(langCode);
  const lessons = [];
  
  ['A1', 'A2'].forEach(levelKey => {
    const level = curr.levels?.[levelKey];
    if (!level) return;
    level.modules.forEach(mod => {
      mod.lessons.forEach(l => {
        lessons.push({
          ...l,
          level: levelKey,
          moduleTitle: mod.title,
          category: mod.category,
          language: langCode
        });
      });
    });
  });

  return lessons;
}

export function getLessonBySlug(slug) {
  for (const langCode of Object.keys(CURRICULA)) {
    const lessons = getAllLessonsForLang(langCode);
    const found = lessons.find(l => l.slug === slug || l.id === slug);
    if (found) return found;
  }
  return null;
}
