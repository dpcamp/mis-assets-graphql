const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const models = require('../models')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 4000;
const corsOptions = {
  origin: [process.env.DEV_URL, process.env.PROD_URL],
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
  },
  context: { models }
})
app.use(cors(corsOptions))
server.applyMiddleware({ 
  app,
  path: '/',
  cors: false
 })
app.listen({port: PORT }, () =>
console.log(`Server is running on localhost:${PORT}${server.graphqlPath}`));
console.log('devURL', process.env.DEV_URL);
console.log('prodURL', process.env.PROD_URL);
