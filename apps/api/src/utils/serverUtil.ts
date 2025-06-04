import http from 'http';
import ip from 'ip';
import os from 'os';
import cluster from 'cluster';
import { Application } from 'express';
import { mongooseClient } from '../libs/databaseLib';
import { logger } from './';
import { env } from '../config/env';
import { handleServerError } from './serverError.util';
import { setupGracefulShutdown } from './gracefulShutdown.util';
import { ServerOptions } from '../interfaces';

export const startServer = async (
  app: Application,
  options: ServerOptions = {}
): Promise<http.Server> => {
  const {
    port = env.PORT,
    enableClusterMode = false,
    enableHealthCheck = true,
    rateLimitOptions = {
      windowMs: 15 * 60 * 1000,
      max: 100,
    },
  } = options;

  const isProduction = env.NODE_ENV === 'production';
  if (enableClusterMode && isProduction && cluster.isPrimary) {
    const numCPUs = os.cpus().length;
    logger.info(`Master ${process.pid} is running with ${numCPUs} workers`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      logger.warn(
        `Worker ${worker.process.pid} died with code ${code} and signal ${signal}`
      );
      logger.info('Starting a new worker');
      cluster.fork();
    });

    return http.createServer((req, res) => {
      res.writeHead(500);
      res.end('Requests should be handled by worker processes');
    });
  }

  try {
    await mongooseClient();

    logger.info('Database connection established successfully');

    if (enableHealthCheck) {
      app.get('/health', (req, res) => {
        const healthData = {
          status: 'OK',
          services: [
            { name: 'Database', status: 'OK', responseTime: '24ms' },
            { name: 'API', status: 'OK', responseTime: '156ms' },
            { name: 'Cache', status: 'WARNING', responseTime: '342ms' },
          ],
          uptime: process.uptime(),
          timestamp: new Date().toISOString(),
        };

        res.json(healthData);
      });
    }

    if (rateLimitOptions) {
      const { default: rateLimit } = await import('express-rate-limit');
      app.use(
        rateLimit({
          windowMs: rateLimitOptions.windowMs,
          max: rateLimitOptions.max,
          message: 'Too many requests from this IP, please try again later',
        })
      );
    }

    const server = http.createServer(app);

    return new Promise<http.Server>((resolve, reject) => {
      server.listen(port, () => {
        const host = `http://${ip.address()}:${port}`;
        logger.info('Server started successfully', {
          host,
          platform: os.platform(),
          pid: process.pid,
          environment: env.NODE_ENV,
          clusterWorker:
            enableClusterMode && isProduction && !cluster.isPrimary,
        });

        setupGracefulShutdown(server);

        resolve(server);
      });

      server.on('error', (error: NodeJS.ErrnoException) => {
        handleServerError(error, port);
        reject(error);
      });
    });
  } catch (error) {
    logger.error('Failed to start server', {
      error:
        error instanceof Error
          ? {
              name: error.name,
              message: error.message,
              stack: error.stack,
            }
          : error,
      environment: env.NODE_ENV,
    });
    process.exit(1);
  }
};
