import express, { Application } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs, resolvers } from './graphql'
require('dotenv').config()
import { connectDatabase } from '../database/index'

const port = 9000

const mount = async (app: Application) => {
  const db = await connectDatabase()
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db })
  })
  server.applyMiddleware({ app, path: '/api' })

  app.listen(port)

  console.log(`[app]: http://localhost:${port}`)
}

mount(express())
