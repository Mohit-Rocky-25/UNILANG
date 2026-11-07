import fastify from 'fastify';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import rateLimit from '@fastify/rate-limit';
import { env } from './lib/env.js';
import { centralErrorHandler } from './middleware/errorHandler.js';
import { authRoutes } from './routes/auth.js';
import { lessonRoutes } from './routes/lessons.js';
import { progressRoutes } from './routes/progress.js';
import { vocabularyRoutes } from './routes/vocabulary.js';
import { aiRoutes } from './routes/ai.js';
import { translateRoutes } from './routes/translate.js';
import { phrasebookRoutes } from './routes/phrasebook.js';

export function buildApp() {
  const app = fastify({
    logger: env.NODE_ENV !== 'test',
    disableRequestLogging: env.NODE_ENV === 'test'
  });

  // CORS
  const allowedOrigins = env.CORS_ORIGIN.split(',').map(o => o.trim());
  app.register(cors, {
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        cb(null, true);
        return;
      }
      cb(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
  });

  // Cookies
  app.register(cookie, {
    secret: env.JWT_SECRET,
    parseOptions: {}
  });

  // Rate Limiting
  app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute'
  });

  // Central Error Handler
  app.setErrorHandler(centralErrorHandler);

  // Health check endpoint
  app.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));

  // Register API routes
  app.register(authRoutes, { prefix: '/api/auth' });
  app.register(lessonRoutes, { prefix: '/api/lessons' });
  app.register(progressRoutes, { prefix: '/api/user' });
  app.register(vocabularyRoutes, { prefix: '/api/vocabulary' });
  app.register(aiRoutes, { prefix: '/api/ai' });
  app.register(translateRoutes, { prefix: '/api/translate' });
  app.register(phrasebookRoutes, { prefix: '/api/phrasebook' });

  return app;
}
