

import { ApolloServer } from 'apollo-server-lambda';

import typeDefs from '../../src/schema';
import resolvers from '../../src/resolvers';
//import cors from 'cors';



const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});



exports.handler = apolloServer.createHandler()




