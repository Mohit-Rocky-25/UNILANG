import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { buildApp } from '../src/app.js';
import { prisma } from '../src/lib/prisma.js';
import { signAccessToken } from '../src/lib/jwt.js';

describe('UniLang API Suite — Phase 1 Verification', () => {
  const app = buildApp();
  let demoToken: string;
  let lessonId: string;
  let vocabId: string;

  beforeAll(async () => {
    await app.ready();
    const demoUser = await prisma.user.findUnique({
      where: { email: 'demo@unilang.app' }
    });
    if (demoUser) {
      demoToken = signAccessToken({ userId: demoUser.id, email: demoUser.email });
    }
    const sampleLesson = await prisma.lesson.findFirst();
    if (sampleLesson) {
      lessonId = sampleLesson.id;
    }
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  describe('Health Endpoint', () => {
    it('GET /health returns status ok', async () => {
      const res = await app.inject({ method: 'GET', url: '/health' });
      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.status).toBe('ok');
    });
  });

  describe('Authentication Suite', () => {
    it('POST /api/auth/login succeeds for seeded demo credentials', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/auth/login',
        payload: {
          email: 'demo@unilang.app',
          password: 'demo1234'
        }
      });
      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.user.email).toBe('demo@unilang.app');
      expect(json.accessToken).toBeDefined();
      expect(res.headers['set-cookie']).toBeDefined();
    });

    it('POST /api/auth/login rejects invalid password with 401', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/auth/login',
        payload: {
          email: 'demo@unilang.app',
          password: 'wrong_password_123'
        }
      });
      expect(res.statusCode).toBe(401);
      const json = JSON.parse(res.payload);
      expect(json.error).toBe('Unauthorized');
    });

    it('GET /api/auth/me rejects unauthenticated request with 401', async () => {
      const res = await app.inject({ method: 'GET', url: '/api/auth/me' });
      expect(res.statusCode).toBe(401);
    });

    it('GET /api/auth/me returns profile for valid token', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/auth/me',
        headers: {
          authorization: `Bearer ${demoToken}`
        }
      });
      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.user.displayName).toBe('Alex Morgan');
      expect(json.user.stats).toBeDefined();
      expect(json.user.stats.totalXp).toBeGreaterThanOrEqual(450);
    });
  });

  describe('Lessons & Curricula Suite', () => {
    it('GET /api/lessons/languages returns 20 active languages', async () => {
      const res = await app.inject({ method: 'GET', url: '/api/lessons/languages' });
      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.languages.length).toBeGreaterThanOrEqual(20);
    });

    it('GET /api/lessons/paths?lang=es returns A1 paths and lessons', async () => {
      const res = await app.inject({ method: 'GET', url: '/api/lessons/paths?lang=es' });
      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.paths.length).toBeGreaterThan(0);
      expect(json.paths[0].lessons.length).toBeGreaterThan(0);
    });

    it('GET /api/lessons/es-a1-greetings returns lesson with parsed exercises', async () => {
      const res = await app.inject({ method: 'GET', url: '/api/lessons/es-a1-greetings' });
      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.lesson.title).toBeDefined();
      expect(json.lesson.exercises.length).toBeGreaterThanOrEqual(5);
      expect(typeof json.lesson.exercises[0].answerData).toBe('object');
    });
  });

  describe('User Progress Suite', () => {
    it('POST /api/user/progress records lesson completion and awards XP', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/user/progress',
        headers: { authorization: `Bearer ${demoToken}` },
        payload: {
          lessonId,
          score: 100,
          xpGained: 30,
          minutesSpent: 8
        }
      });
      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.progress.status).toBe('completed');
      expect(json.updatedStats.totalXp).toBeGreaterThanOrEqual(480);
    });

    it('GET /api/user/progress returns completed lessons list', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/user/progress',
        headers: { authorization: `Bearer ${demoToken}` }
      });
      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.progress.length).toBeGreaterThan(0);
    });
  });

  describe('Vocabulary & Spaced Repetition Suite', () => {
    it('POST /api/vocabulary adds new term to user deck', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/vocabulary',
        headers: { authorization: `Bearer ${demoToken}` },
        payload: {
          langCode: 'es',
          term: 'Biblioteca',
          meaning: 'Library',
          partOfSpeech: 'noun',
          deck: 'Travel Essentials'
        }
      });
      expect(res.statusCode).toBe(201);
      const json = JSON.parse(res.payload);
      expect(json.saved.deck).toBe('Travel Essentials');
      vocabId = json.saved.id;
    });

    it('PATCH /api/vocabulary/:id/review updates SM-2 schedule correctly', async () => {
      const res = await app.inject({
        method: 'PATCH',
        url: `/api/vocabulary/${vocabId}/review`,
        headers: { authorization: `Bearer ${demoToken}` },
        payload: { grade: 4 } // "Good" recall
      });
      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.sm2.repetitionCount).toBeGreaterThanOrEqual(1);
      expect(json.sm2.intervalDays).toBeGreaterThanOrEqual(1);
      expect(json.sm2.easeFactor).toBeGreaterThanOrEqual(2.5);
    });
  });

  describe('AI Dialogue & Phrasebook Endpoints', () => {
    it('POST /api/ai/chat returns dialogue turn with phonetic and corrections', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/ai/chat',
        headers: { authorization: `Bearer ${demoToken}` },
        payload: {
          scenarioKey: 'italian_cafe',
          targetLanguage: 'it',
          cefrLevel: 'A1',
          message: 'Vorrei un caffè per favore.'
        }
      });
      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.reply).toBeDefined();
      expect(json.translation).toBeDefined();
      expect(json.phonetic).toBeDefined();
      expect(json.recommendedReplies.length).toBeGreaterThan(0);
    });

    it('GET /api/phrasebook returns categorized travel expressions', async () => {
      const res = await app.inject({ method: 'GET', url: '/api/phrasebook?lang=es' });
      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.entries.length).toBeGreaterThan(0);
    });
  });
});
