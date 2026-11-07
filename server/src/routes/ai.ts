import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';
import { MockAIProvider } from '../providers/ai.js';

const chatSchema = z.object({
  scenarioKey: z.string(),
  targetLanguage: z.string().default('es'),
  cefrLevel: z.string().default('A1'),
  message: z.string().min(1),
  sessionId: z.string().optional()
});

const grammarSchema = z.object({
  sentence: z.string().min(1),
  targetLanguage: z.string().default('es')
});

const aiProvider = new MockAIProvider();

export async function aiRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', requireAuth);

  // Conversation partner dialogue turn
  fastify.post('/chat', async (req, reply) => {
    const userId = req.user!.userId;
    const body = chatSchema.parse(req.body);

    const lang = await prisma.language.findUnique({
      where: { code: body.targetLanguage }
    });

    if (!lang) {
      return reply.status(404).send({
        statusCode: 404,
        error: 'NotFound',
        message: 'Language not found.'
      });
    }

    // Get or create session
    let session;
    if (body.sessionId) {
      session = await prisma.conversationSession.findUnique({
        where: { id: body.sessionId }
      });
    }

    if (!session) {
      session = await prisma.conversationSession.create({
        data: {
          userId,
          languageId: lang.id,
          scenarioKey: body.scenarioKey,
          cefrLevel: body.cefrLevel
        }
      });
    }

    // Record user message
    await prisma.conversationMessage.create({
      data: {
        sessionId: session.id,
        senderRole: 'user',
        messageText: body.message
      }
    });

    // Generate AI response
    const aiResponse = await aiProvider.generateDialogueTurn(
      body.scenarioKey,
      [{ role: 'user', text: body.message }],
      body.targetLanguage,
      body.cefrLevel
    );

    // Record AI message
    await prisma.conversationMessage.create({
      data: {
        sessionId: session.id,
        senderRole: 'ai',
        messageText: aiResponse.reply,
        phoneticText: aiResponse.phonetic,
        grammarFeedback: JSON.stringify(aiResponse.correction)
      }
    });

    // Increment turns
    await prisma.conversationSession.update({
      where: { id: session.id },
      data: { totalTurns: { increment: 1 } }
    });

    return reply.send({
      sessionId: session.id,
      ...aiResponse
    });
  });

  // Real-time grammar analysis
  fastify.post('/analyze-grammar', async (req, reply) => {
    const body = grammarSchema.parse(req.body);
    const analysis = await aiProvider.analyzeGrammar(body.sentence, body.targetLanguage);
    return reply.send(analysis);
  });
}
