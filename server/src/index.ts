import { buildApp } from './app.js';
import { env } from './lib/env.js';

const app = buildApp();

async function start() {
  try {
    const address = await app.listen({ port: env.PORT, host: env.HOST });
    console.log(`🚀 UniLang Server running at ${address}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
