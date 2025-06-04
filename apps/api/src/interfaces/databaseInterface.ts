export interface Database {
  mongodb: {
    uri: string;
  };
  redis: {
    host: string;
    port: number;
    password: string;
  };
}
