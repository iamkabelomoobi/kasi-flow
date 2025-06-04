import { cleanEnv, num, str } from 'envalid';

export const env = cleanEnv(process.env, {
  PORT: num({ default: 8080 }),
  NODE_ENV: str({
    choices: ['development', 'test', 'production'],
    default: 'development',
  }),
  MONGO_URI: str({ default: 'mongodb://localhost:27017/kasi-flow' }),
  REDIS_HOST: str({ default: 'localhost' }),
  REDIS_PORT: num({ default: 6379 }),
  REDIS_PASSWORD: str({ default: 'root' }),
  LogtailAccessToken: str({ default: 'some-random-token' }),
});
