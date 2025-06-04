import mongoose from 'mongoose';
import { logger } from './';

export const setupGracefulShutdown = (server: import('http').Server): void => {
  const shutdown = async (signal: string) => {
    logger.info(`Received ${signal}, shutting down gracefully...`, {
      pid: process.pid,
    });

    try {
      if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
        logger.info('MongoDB connection closed');
      }

      server.close((err) => {
        if (err) {
          logger.error('Error during server close', { error: err });
          process.exit(1);
        }
        logger.info('Server closed');
        process.exit(0);
      });

      setTimeout(() => {
        logger.error('Forcing shutdown after timeout');
        process.exit(1);
      }, 10000).unref();
    } catch (error) {
      logger.error('Error during shutdown', {
        error: error instanceof Error ? error.message : error,
      });
      process.exit(1);
    }
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGQUIT', () => shutdown('SIGQUIT'));

  process.on('uncaughtException', (error) => {
    logger.error('Uncaught exception', {
      error: error.message,
      stack: error.stack,
    });
    shutdown('uncaughtException');
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled rejection at:', promise, 'reason:', reason);
    shutdown('unhandledRejection');
  });
};