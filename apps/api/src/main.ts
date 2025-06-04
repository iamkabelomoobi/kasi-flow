/**
 * Main application entry point
 * Configures Express server with middlewares and starts the server
 */
import express, { Application } from 'express';
import dotenv from 'dotenv';
import { cleanEnv, num } from 'envalid';
import { configureMiddlewares } from './middlewares';
import { startServer } from './utils';

const env = cleanEnv(dotenv.config().parsed || process.env, {
  PORT: num({ default: 3000 }),
  RATE_LIMIT_WINDOW_MS: num({ default: 60 * 1000 }),
  RATE_LIMIT_MAX_REQUESTS: num({ default: 60 }),
});

const app: Application = express();

configureMiddlewares(app);

startServer(app, {
  port: env.PORT,
  enableClusterMode: true,
  rateLimitOptions: {
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX_REQUESTS,
  },
}).catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
