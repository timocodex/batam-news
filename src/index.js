import {
    makeExecutableSchema,
    addMockFunctionsToSchema,
  } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import path from 'path';
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema'))); 
const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };