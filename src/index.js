const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const models = require('../models')
const cors = require('cors')

const PORT = process.env.PORT || 4000;
const corsOptions = {
  origin: ['http://192.168.235.97:4200', process.env.PROD_URL],
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models }
})
app.use(cors(corsOptions))
server.applyMiddleware({ 
  app,
  path: '/',
  cors: false
 })
app.listen({port: PORT }, () =>
console.log(`Server is running on localhost:${PORT}${server.graphqlPath}`))