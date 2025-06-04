export interface ServerOptions {
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
