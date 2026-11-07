import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { LingvaTranslationProvider } from '../providers/translation.js';

const translateSchema = z.object({
  text: z.string().min(1),
  sourceLang: z.string().default('en'),
  targetLang: z.string().default('es'),
  formality: z.enum(['formal', 'informal', 'neutral']).default('neutral'),
  saveHistory: z.boolean().default(false)
});

const provider = new LingvaTranslationProvider();

export async function translateRoutes(fastify: FastifyInstance) {
  fastify.post('/', async (req, reply) => {
    const body = translateSchema.parse(req.body);

    const result = await provider.translate(
      body.text,
      body.sourceLang,
      body.targetLang,
      { formality: body.formality }
    );

    // If user is authenticated and saveHistory is true, persist to translation history
    const user = req.user;
    if (user && body.saveHistory) {
      await prisma.translationHistory.create({
        data: {
          userId: user.userId,
          sourceLang: body.sourceLang,
          targetLang: body.targetLang,
          sourceText: body.text,
          targetText: result.translatedText,
          formality: result.formality
        }
      });
    }

    return reply.send(result);
  });
}

