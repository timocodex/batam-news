'use strict';

var _graphqlTools = require('graphql-tools');

var _mergeGraphqlSchemas = require('merge-graphql-schemas');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _graphqlServerExpress = require('graphql-server-express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const resolvers = (0, _mergeGraphqlSchemas.mergeResolvers)((0, _mergeGraphqlSchemas.fileLoader)(_path2.default.join(__dirname, './resolvers')));
const typeDefs = (0, _mergeGraphqlSchemas.mergeTypes)((0, _mergeGraphqlSchemas.fileLoader)(_path2.default.join(__dirname, './schema')));
const schema = (0, _graphqlTools.makeExecutableSchema)({ typeDefs, resolvers });

const server = (0, _express2.default)();
server.use('*', (0, _cors2.default)({ origin: 'http://localhost:3000' }));

server.use('/graphql', _bodyParser2.default.json(), (0, _graphqlServerExpress.graphqlExpress)({
  schema
}));
server.use('/graphiql', (0, _graphqlServerExpress.graphiqlExpress)({
  endpointURL: '/graphql'
}));
server.get('/', function (req, res) {
  res.send('Hello World!');
});

module.exports = server;