import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';

const progressUpdateSchema = z.object({
  lessonId: z.string().uuid(),
  score: z.number().min(0).max(100),
  xpGained: z.number().min(0).default(20),
  minutesSpent: z.number().min(0).default(5)
});

const preferenceUpdateSchema = z.object({
  interfaceLang: z.string().optional(),
  targetLang: z.string().optional(),
  cefrLevel: z.string().optional(),
  dailyGoalXp: z.number().optional(),
  soundEnabled: z.boolean().optional(),
  rtlMode: z.boolean().optional()
});

export async function progressRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', requireAuth);

  // Get user progress
  fastify.get('/progress', async (req, reply) => {
    const userId = req.user!.userId;

    const progress = await prisma.userProgress.findMany({
      where: { userId },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            slug: true,
            xpReward: true,
            learningPath: {
              select: {
                cefrLevel: true,
                language: {
                  select: { code: true, name: true, flagEmoji: true }
                }
              }
            }
          }
        }
      }
    });

    return reply.send({ progress });
  });

  // Record lesson completion / progress
  fastify.post('/progress', async (req, reply) => {
    const userId = req.user!.userId;
    const body = progressUpdateSchema.parse(req.body);

    const lesson = await prisma.lesson.findUnique({
      where: { id: body.lessonId }
    });

    if (!lesson) {
      return reply.status(404).send({
        statusCode: 404,
        error: 'NotFound',
        message: 'Lesson not found.'
      });
    }

    // Upsert user progress
    const progress = await prisma.userProgress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId: body.lessonId
        }
      },
      update: {
        status: 'completed',
        bestScore: {
          // Keep best score
          set: Math.max(body.score)
        },
        attemptsCount: { increment: 1 },
        completedAt: new Date()
      },
      create: {
        userId,
        lessonId: body.lessonId,
        status: 'completed',
        bestScore: body.score,
        attemptsCount: 1,
        completedAt: new Date()
      }
    });

    // Update user stats (XP, streak)
    const stats = await prisma.userStats.upsert({
      where: { userId },
      update: {
        totalXp: { increment: body.xpGained },
        lastActivityDate: new Date()
      },
      create: {
        userId,
        totalXp: body.xpGained,
        currentStreak: 1,
        highestStreak: 1
      }
    });

    // Record study log
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.studyLog.create({
      data: {
        userId,
        studyDate: today,
        minutesSpent: body.minutesSpent,
        xpEarned: body.xpGained,
        lessonsCount: 1
      }
    });

    return reply.send({
      message: 'Progress recorded successfully',
      progress,
      updatedStats: stats
    });
  });

  // Get preferences
  fastify.get('/preferences', async (req, reply) => {
    const userId = req.user!.userId;
    const preferences = await prisma.userPreference.findUnique({
      where: { userId }
    });
    return reply.send({ preferences });
  });

  // Update preferences
  fastify.patch('/preferences', async (req, reply) => {
    const userId = req.user!.userId;
    const data = preferenceUpdateSchema.parse(req.body);

    const preferences = await prisma.userPreference.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        ...data
      }
    });

    return reply.send({
      message: 'Preferences updated successfully',
      preferences
    });
  });

  // Get stats
  fastify.get('/stats', async (req, reply) => {
    const userId = req.user!.userId;
    const stats = await prisma.userStats.findUnique({
      where: { userId }
    });
    return reply.send({ stats });
  });
}

