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
import getModels from './models'
import cors from 'cors'

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema'))); 
const schema = makeExecutableSchema({ typeDefs, resolvers });

const SECRET = 'asdfaweg121fdgsSEFGrgsdgeregeE45';
const SECRET2 = 'werw3rerw45SEFESFESFdrgf545rgrdg';

const server = express();
server.use(cors('*'));
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');
// server.use(express.static(path.join(__dirname,'client/build')));


const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', newTokens.token);
        res.set('x-refresh-token', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};
const upload = require('./routes/upload');
server.use('/api/uploads', upload);
server.use(addUser)

getModels().then((models) => {
  if (!models) {
    console.log('Could not connect to database');
    return;
  }
  server.use(
    '/graphql', bodyParser.json(),graphqlExpress(req => ({
      schema,
      context: {
        models,
       //user: req.user,
        SECRET,
        SECRET2,
      },
    })),
  );
  server.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }));
  
  // server.get('*', (req, res) => {
  //     res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
  // });
  server.get('/api', function (req, res) {
   res.send('res');
  });
})



module.exports = server;
