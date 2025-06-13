import http from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from '../schemas';
import resolvers from '../resolvers';
import { createContext } from './context';
import { logger } from '../utils';
import { Application, json } from 'express';

export const createApolloServer = async (httpServer: http.Server) => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async requestDidStart() {
          return {
            async didEncounterErrors({ errors }) {
              logger.error('GraphQL Error', { errors });
            },
          };
        },
      },
    ],
    csrfPrevention: true,
    cache: 'bounded',
    formatError: (error: { message: any; extensions: { code: any } }) => {
      logger.error('GraphQL Formatted Error', { error });
      return {
        message: error.message,
        code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
      };
    },
  });

  await server.start();
  return server;
};

export const applyApolloMiddleware = (
  app: Application,
  server: ApolloServer
) => {
  app.use(
    '/graphql',
    json(),
    expressMiddleware(server, {
      context: createContext,
    })
  );
};
