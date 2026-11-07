import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000').transform(Number),
  HOST: z.string().default('0.0.0.0'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().default('file:./dev.db'),
  JWT_SECRET: z.string().default('unilang_super_secret_jwt_key_2026_dev_mode'),
  JWT_REFRESH_SECRET: z.string().default('unilang_super_secret_refresh_jwt_key_2026_dev_mode'),
  CORS_ORIGIN: z.string().default('http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173'),
  GEMINI_API_KEY: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  DEEPL_API_KEY: z.string().optional(),
  ELEVENLABS_API_KEY: z.string().optional()
});

export const env = envSchema.parse(process.env);

