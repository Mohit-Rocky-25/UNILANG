import { FastifyError, FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';

export function centralErrorHandler(error: FastifyError, req: FastifyRequest, reply: FastifyReply) {
  req.log.error(error);

  if (error instanceof ZodError) {
    return reply.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Validation failed',
      issues: error.issues.map(i => ({
        path: i.path.join('.'),
        message: i.message
      }))
    });
  }

  const statusCode = error.statusCode || 500;
  return reply.status(statusCode).send({
    statusCode,
    error: error.name || 'InternalServerError',
    message: statusCode === 500 && process.env.NODE_ENV === 'production'
      ? 'An internal server error occurred.'
      : error.message
  });
}

