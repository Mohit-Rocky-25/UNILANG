import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';

const addVocabSchema = z.object({
  langCode: z.string().default('es'),
  term: z.string().min(1),
  lemma: z.string().optional(),
  meaning: z.string().min(1),
  phonetic: z.string().optional(),
  partOfSpeech: z.string().optional(),
  exampleSentence: z.string().optional(),
  deck: z.string().default('Default'),
  tags: z.string().optional(),
  userNotes: z.string().optional()
});

const reviewVocabSchema = z.object({
  grade: z.number().min(0).max(5) // 0-5 SuperMemo scale
});

// SuperMemo SM-2 algorithm calculation helper
export function calculateSM2(
  grade: number,
  prevRepetition: number,
  prevInterval: number,
  prevEaseFactor: number
) {
  let repetitionCount = prevRepetition;
  let intervalDays = prevInterval;
  let easeFactor = prevEaseFactor;

  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  easeFactor = easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  if (grade < 3) {
    // Failed recall (lapse)
    repetitionCount = 0;
    intervalDays = 1;
  } else {
    // Successful recall
    if (repetitionCount === 0) {
      intervalDays = 1;
    } else if (repetitionCount === 1) {
      intervalDays = 6;
    } else {
      intervalDays = Math.round(prevInterval * easeFactor);
    }
    repetitionCount += 1;
  }

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + intervalDays);

  // Retention score calculation: 100 * exp(-daysSinceLastReview / (I * 1.0 + 0.5))
  const retentionScore = Math.min(100, Math.max(10, Math.round(easeFactor * 35)));

  return {
    repetitionCount,
    intervalDays,
    easeFactor,
    dueDate,
    retentionScore
  };
}

export async function vocabularyRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', requireAuth);

  // List all saved vocabulary
  fastify.get('/', async (req, reply) => {
    const userId = req.user!.userId;
    const query = req.query as { deck?: string; dueOnly?: string };

    const whereClause: any = { userId };
    if (query.deck) {
      whereClause.deck = query.deck;
    }
    if (query.dueOnly === 'true') {
      whereClause.dueDate = { lte: new Date() };
    }

    const savedItems = await prisma.savedVocabulary.findMany({
      where: whereClause,
      include: {
        vocabulary: {
          include: { language: true }
        }
      },
      orderBy: { dueDate: 'asc' }
    });

    const now = new Date();
    const dueCount = savedItems.filter(item => new Date(item.dueDate) <= now).length;

    return reply.send({
      items: savedItems,
      totalCount: savedItems.length,
      dueCount
    });
  });

  // Add new word to vocabulary / SRS
  fastify.post('/', async (req, reply) => {
    const userId = req.user!.userId;
    const body = addVocabSchema.parse(req.body);

    const lang = await prisma.language.findUnique({
      where: { code: body.langCode }
    });

    if (!lang) {
      return reply.status(404).send({
        statusCode: 404,
        error: 'NotFound',
        message: `Language '${body.langCode}' not found.`
      });
    }

    // Find or create vocabulary item
    let vocabItem = await prisma.vocabularyItem.findFirst({
      where: {
        languageId: lang.id,
        term: body.term
      }
    });

    if (!vocabItem) {
      vocabItem = await prisma.vocabularyItem.create({
        data: {
          languageId: lang.id,
          term: body.term,
          lemma: body.lemma,
          meaning: body.meaning,
          phonetic: body.phonetic,
          partOfSpeech: body.partOfSpeech,
          exampleSentence: body.exampleSentence
        }
      });
    }

    // Upsert into user's saved vocabulary
    const saved = await prisma.savedVocabulary.upsert({
      where: {
        userId_vocabularyId: {
          userId,
          vocabularyId: vocabItem.id
        }
      },
      update: {
        userNotes: body.userNotes,
        deck: body.deck,
        tags: body.tags
      },
      create: {
        userId,
        vocabularyId: vocabItem.id,
        deck: body.deck,
        tags: body.tags,
        userNotes: body.userNotes,
        repetitionCount: 0,
        intervalDays: 1,
        easeFactor: 2.5,
        dueDate: new Date(),
        retentionScore: 100
      },
      include: {
        vocabulary: true
      }
    });

    return reply.status(201).send({
      message: 'Word added to your vocabulary deck!',
      saved
    });
  });

  // Submit review result for a card (SuperMemo SM-2)
  fastify.patch('/:id/review', async (req, reply) => {
    const userId = req.user!.userId;
    const { id } = req.params as { id: string };
    const { grade } = reviewVocabSchema.parse(req.body);

    const saved = await prisma.savedVocabulary.findUnique({
      where: { id }
    });

    if (!saved || saved.userId !== userId) {
      return reply.status(404).send({
        statusCode: 404,
        error: 'NotFound',
        message: 'Saved vocabulary card not found.'
      });
    }

    const sm2Result = calculateSM2(
      grade,
      saved.repetitionCount,
      saved.intervalDays,
      saved.easeFactor
    );

    const updated = await prisma.savedVocabulary.update({
      where: { id },
      data: {
        repetitionCount: sm2Result.repetitionCount,
        intervalDays: sm2Result.intervalDays,
        easeFactor: sm2Result.easeFactor,
        dueDate: sm2Result.dueDate,
        retentionScore: sm2Result.retentionScore
      },
      include: {
        vocabulary: true
      }
    });

    // Award XP for review
    await prisma.userStats.update({
      where: { userId },
      data: {
        totalXp: { increment: 5 },
        lastActivityDate: new Date()
      }
    });

    return reply.send({
      message: 'Review recorded',
      card: updated,
      sm2: sm2Result
    });
  });
}

