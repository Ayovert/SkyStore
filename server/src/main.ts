

import express, { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServer as ApolloLambdaServer } from 'apollo-server-lambda';
import path from 'path';


//import cors from 'cors'

import typeDefs from './schema';
import resolvers from './resolvers';



const app : Express = express();

const port = process.env.PORT || 4000;

/*const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
  }*/
  
 // app.use(cors(corsOptions));

// Serve static files from the build directory of your React app
app.use(express.static(path.join(__dirname, '..')));

console.log(path.join(__dirname, '..'))
console.log("Test", "main,tsx")
app.get('/*', (req, res) => {

    console.log("Test")
    res.sendFile(path.join(__dirname, '..', "index.html"));
});

const apolloLambdaServer = new ApolloLambdaServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});

const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});



apolloServer.applyMiddleware({ app, path: '/' });

//Path is important because to handle POST requests
/*apolloServer.listen().then(({port}) => {
    console.log(path.join(__dirname, '..' ,'..', 'client','build'))
    console.log(`🚀  Server running at http://localhost:${port}/`);
});*/






app.listen(port, () => {
    console.log(`🚀  Server running at http://localhost:${port}/`);
  });


  export {
    apolloServer, apolloLambdaServer
  }
/*const server = http.createServer(app);

server.listen(port, () => {
    console.log(path.join(__dirname, '..' ,'..', 'client','build'))
    console.log(`🚀  Server running at http://localhost:${port}/`);
});*/


/**
 * node_bundler = "esbuild"
  external_node_modules = ["apollo-server-lambda"]
 */