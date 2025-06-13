import http from 'http';

export interface ServerOptions {
  httpServer?: http.Server;
  port?: number;
  syncDatabase?: boolean;
  forceSync?: boolean;
  enableClusterMode?: boolean;
  enableHealthCheck?: boolean;
  rateLimitOptions?: {
    windowMs?: number;
    max?: number;
  };
}
