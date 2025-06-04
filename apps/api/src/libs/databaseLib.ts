import mongoose from 'mongoose';
import { Redis } from 'ioredis';
import { env } from '../config/env';

class DatabaseLib {
  private static instance: DatabaseLib;

  private constructor() {
    //
  }

  public static getInstance(): DatabaseLib {
    if (!DatabaseLib.instance) {
      DatabaseLib.instance = new DatabaseLib();
    }
    return DatabaseLib.instance;
  }

  public async mongooseClient(): Promise<typeof mongoose> {
    return mongoose.connect(env.MONGO_URI, {});
  }

  public redisClient(): Redis {
    return new Redis({
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      password: env.REDIS_PASSWORD,
    });
  }
}

const dbInstance = DatabaseLib.getInstance();

export const mongooseClient = dbInstance.mongooseClient.bind(dbInstance);
export const redisClient = dbInstance.redisClient.bind(dbInstance);
