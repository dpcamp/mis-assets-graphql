const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const models = require('../models')

const PORT = 4000;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models }
})
server.applyMiddleware({ app })
app.listen({port: PORT }, () =>
console.log(`Server is running on localhost:${PORT}${server.graphqlPath}`))