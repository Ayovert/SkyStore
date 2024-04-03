

import { ApolloServer } from 'apollo-server-lambda';
import {Handler} from 'express'

import typeDefs from '../../src/schema';
import resolvers from '../../src/resolvers';
//import cors from 'cors';



const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});



const apolloHandler = apolloServer.createHandler()


export const handler: Handler = (event: any, context: any, ...args) => {
    return apolloHandler(
      {
        ...event,
        requestContext: context,
      },
      context,
      ...args
    );
  };



