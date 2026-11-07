import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../lib/jwt.js';
import { requireAuth } from '../middleware/auth.js';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  displayName: z.string().min(2, 'Name must be at least 2 characters')
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export async function authRoutes(fastify: FastifyInstance) {
  // Register
  fastify.post('/register', async (req, reply) => {
    const body = registerSchema.parse(req.body);

    const existing = await prisma.user.findUnique({
      where: { email: body.email.toLowerCase() }
    });

    if (existing) {
      return reply.status(409).send({
        statusCode: 409,
        error: 'Conflict',
        message: 'A user with this email address already exists.'
      });
    }

    const passwordHash = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        email: body.email.toLowerCase(),
        passwordHash,
        displayName: body.displayName,
        preference: {
          create: {
            interfaceLang: 'en',
            targetLang: 'es',
            cefrLevel: 'A1'
          }
        },
        userStats: {
          create: {
            totalXp: 0,
            currentStreak: 0
          }
        }
      },
      include: {
        preference: true,
        userStats: true
      }
    });

    const accessToken = signAccessToken({ userId: user.id, email: user.email });
    const refreshToken = signRefreshToken({ userId: user.id, email: user.email });

    reply.setCookie('access_token', accessToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 // 15 min
    });

    reply.setCookie('refresh_token', refreshToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return reply.status(201).send({
      message: 'Account created successfully',
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        preference: user.preference,
        stats: user.userStats
      },
      accessToken
    });
  });

  // Login
  fastify.post('/login', async (req, reply) => {
    const body = loginSchema.parse(req.body);
    const email = body.email.toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        preference: true,
        userStats: true
      }
    });

    if (!user) {
      return reply.status(401).send({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Invalid email or password.'
      });
    }

    const isValid = await bcrypt.compare(body.password, user.passwordHash);
    if (!isValid) {
      return reply.status(401).send({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Invalid email or password.'
      });
    }

    const accessToken = signAccessToken({ userId: user.id, email: user.email });
    const refreshToken = signRefreshToken({ userId: user.id, email: user.email });

    reply.setCookie('access_token', accessToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60
    });

    reply.setCookie('refresh_token', refreshToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60
    });

    return reply.send({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        preference: user.preference,
        stats: user.userStats
      },
      accessToken
    });
  });

  // Refresh
  fastify.post('/refresh', async (req, reply) => {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      return reply.status(401).send({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'No refresh token provided.'
      });
    }

    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      return reply.status(401).send({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Refresh token is expired or invalid.'
      });
    }

    const newAccessToken = signAccessToken({ userId: payload.userId, email: payload.email });
    const newRefreshToken = signRefreshToken({ userId: payload.userId, email: payload.email });

    reply.setCookie('access_token', newAccessToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60
    });

    reply.setCookie('refresh_token', newRefreshToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60
    });

    return reply.send({
      accessToken: newAccessToken
    });
  });

  // Logout
  fastify.post('/logout', async (req, reply) => {
    reply.clearCookie('access_token', { path: '/' });
    reply.clearCookie('refresh_token', { path: '/' });
    return reply.send({ message: 'Logged out successfully' });
  });

  // Me
  fastify.get('/me', { preHandler: [requireAuth] }, async (req, reply) => {
    const userId = req.user!.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        preference: true,
        userStats: true,
        userBadges: {
          include: { badge: true }
        }
      }
    });

    if (!user) {
      return reply.status(404).send({
        statusCode: 404,
        error: 'NotFound',
        message: 'User account not found.'
      });
    }

    return reply.send({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        preference: user.preference,
        stats: user.userStats,
        badges: user.userBadges.map(ub => ub.badge)
      }
    });
  });
}

