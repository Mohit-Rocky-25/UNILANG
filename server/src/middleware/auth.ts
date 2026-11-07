import { FastifyRequest, FastifyReply } from 'fastify';
import { verifyAccessToken, TokenPayload } from '../lib/jwt.js';

declare module 'fastify' {
  interface FastifyRequest {
    user?: TokenPayload;
  }
}

export async function requireAuth(req: FastifyRequest, reply: FastifyReply) {
  let token = req.cookies.access_token;

  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    }
  }

  if (!token) {
    return reply.status(401).send({
      statusCode: 401,
      error: 'Unauthorized',
      message: 'Authentication required. No session or Bearer token provided.'
    });
  }

  const payload = verifyAccessToken(token);
  if (!payload) {
    return reply.status(401).send({
      statusCode: 401,
      error: 'Unauthorized',
      message: 'Access token is invalid or has expired.'
    });
  }

  req.user = payload;
}
