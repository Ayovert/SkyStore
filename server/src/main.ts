

import express, { Express } from 'express';
import {ApolloServer } from '@apollo/server';

import {expressMiddleware} from '@apollo/server/express4'
import path from 'path';


//import cors from 'cors'

import typeDefs from './schema';
import resolvers from './resolvers';



  const startServer = async () => {
    const app: Express = express();
    const port = process.env.PORT || 4000;

    // Add express.json() middleware to parse JSON request bodies
    app.use(express.json());
  
    // Serve static files from the build directory of your React app
    app.use(express.static(path.join(__dirname, '..')));
  
    console.log(path.join(__dirname, '..'));
    console.log('Test', 'main,tsx');


    app.get('/*', (req, res) => {
      console.log('Test');
      res.sendFile(path.join(__dirname, '..', 'index.html'));
    });
  
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers
    });
  
    await apolloServer.start();
  
    app.use(expressMiddleware(apolloServer));
  
    const server = app.listen(port, () => {
      console.log(`🚀  Server running at http://localhost:${port}/`);
    });
  
    return { server, apolloServer };
  };
  
  startServer().catch(error => {
    console.error('Error starting server:', error);
  });