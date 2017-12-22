import express from 'express';
import { 
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
import bodyParser from 'body-parser';
import cors from 'cors'
import { schema } from './src/schema';
import models from './models'
const PORT = 4000;


const server = express();
server.use('*', cors({ origin: 'http://localhost:3000' }));
server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));
server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));
server.get('/', function (req, res) {
  res.send('Hello World!');
});
models.sequelize.sync({force:true}).then( ()=> {
  server.listen(PORT, () => console.log(`GraphQL Server is now running on http://localhost:${PORT}`));
  server.on('error', ()=>console.log("error"));
  server.on('listening', ()=>console.log("listening"));
});

