import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import express from 'express'
import { CountriesResolver } from './resolvers/CountriesResolver'

async function startServer() {
  //création de l'application express
  const app = express()
  
  //connexion à la base de données
  await createConnection()

  //création du schéma
  const schema = await buildSchema({
    resolvers: [CountriesResolver],
  })

  //création du serveur
  const server = new ApolloServer({schema})

  //application du middleware
  await server.start()
  
  server.applyMiddleware({app})


  //lancement du serveur
  app.listen(4000, () => {
    console.log('Serveur démarré sur http://localhost:4000/graphql')
  })
}
startServer().catch((err) => {
  console.error('Erreur lors du démarrage du serveur :', err)
})
