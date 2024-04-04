
import {ApolloServer} from 'apollo-server-lambda'

import {Handler} from 'express'

import typeDefs from '../../src/schema';
import resolvers from '../../src/resolvers';
//import cors from 'cors';



const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
   // plugins:  [ApolloServerPluginLandingPageDisabled()],
});




/**
 *  // Install a landing page plugin based on NODE_ENV
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageProductionDefault({
              graphRef: 'my-graph-id@my-graph-variant',
              footer: false,
            })
          : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
 */
//plugins: [ApolloServerPluginLandingPageDisabled()]

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



