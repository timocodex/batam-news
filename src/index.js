import {
    makeExecutableSchema,
    addMockFunctionsToSchema,
  } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import path from 'path';
import express from 'express';
import { 
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
import bodyParser from 'body-parser';
import cors from 'cors'

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema'))); 
const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = express();
server.use(cors('*'));

server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));
server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));
server.get('/', function (req, res) {
  res.send('Hello World!');
});

module.exports = server;