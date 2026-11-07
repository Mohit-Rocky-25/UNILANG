import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma.js';

export async function phrasebookRoutes(fastify: FastifyInstance) {
  fastify.get('/', async (req, reply) => {
    const query = req.query as { lang?: string; category?: string; emergency?: string; search?: string };
    const langCode = query.lang || 'es';

    const lang = await prisma.language.findUnique({
      where: { code: langCode }
    });

    if (!lang) {
      return reply.status(404).send({
        statusCode: 404,
        error: 'NotFound',
        message: 'Language not found.'
      });
    }

    const where: any = { languageId: lang.id };
    if (query.category) {
      where.categorySlug = query.category;
    }
    if (query.emergency === 'true') {
      where.isEmergency = true;
    }

    let entries = await prisma.phrasebookEntry.findMany({
      where,
      orderBy: { isEmergency: 'desc' }
    });

    if (query.search) {
      const q = query.search.toLowerCase();
      entries = entries.filter(e =>
        e.sourceText.toLowerCase().includes(q) ||
        e.targetText.toLowerCase().includes(q) ||
        (e.phonetic && e.phonetic.toLowerCase().includes(q))
      );
    }

    return reply.send({
      language: lang,
      entries,
      totalCount: entries.length
    });
  });
}

