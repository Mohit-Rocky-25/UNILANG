import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma.js';

export async function lessonRoutes(fastify: FastifyInstance) {
  // Get all languages
  fastify.get('/languages', async (req, reply) => {
    const languages = await prisma.language.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    });
    return reply.send({ languages });
  });

  // Get learning paths and lessons for a language
  fastify.get('/paths', async (req, reply) => {
    const query = req.query as { lang?: string };
    const langCode = query.lang || 'es';

    const language = await prisma.language.findUnique({
      where: { code: langCode }
    });

    if (!language) {
      return reply.status(404).send({
        statusCode: 404,
        error: 'NotFound',
        message: `Language '${langCode}' not found.`
      });
    }

    const paths = await prisma.learningPath.findMany({
      where: { languageId: language.id },
      include: {
        lessons: {
          orderBy: { sequenceOrder: 'asc' },
          select: {
            id: true,
            title: true,
            slug: true,
            summary: true,
            xpReward: true,
            sequenceOrder: true,
            _count: {
              select: { exercises: true }
            }
          }
        }
      },
      orderBy: { sequenceOrder: 'asc' }
    });

    return reply.send({ language, paths });
  });

  // Get specific lesson by slug (with exercises)
  fastify.get('/:slug', async (req, reply) => {
    const { slug } = req.params as { slug: string };

    const lesson = await prisma.lesson.findUnique({
      where: { slug },
      include: {
        learningPath: {
          include: { language: true }
        },
        exercises: {
          orderBy: { sequenceOrder: 'asc' }
        }
      }
    });

    if (!lesson) {
      return reply.status(404).send({
        statusCode: 404,
        error: 'NotFound',
        message: `Lesson with slug '${slug}' was not found.`
      });
    }

    // Safely parse JSON answerData for each exercise
    const formattedExercises = lesson.exercises.map(ex => ({
      ...ex,
      answerData: JSON.parse(ex.answerData)
    }));

    return reply.send({
      lesson: {
        ...lesson,
        exercises: formattedExercises
      }
    });
  });
}

