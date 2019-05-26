require('dotenv').config();
const express = require('express');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');
const SearchApi = require('./dataSources/search');
const ItemsApi = require('./dataSources/items');
const CategoriesApi = require('./dataSources/categories');
const { validateToken} = require('./utils/helpers');
const PORT = process.env.PORT;

const dataSources = () => ({
  searchApi: new SearchApi(),
  itemsApi: new ItemsApi(),
  categoriesApi: new CategoriesApi(),
});

const context = async({ req }) => {
  const token = req.headers.authorization || '';
  const isValidToken = validateToken(token);
  if (!isValidToken) {
    throw new AuthenticationError('Invalid authentication.');
  }
  return {
    token: 'someMeliAPiToken',
  };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);