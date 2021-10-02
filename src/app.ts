import "reflect-metadata";
import { ApolloServer } from 'apollo-server'

import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'

import { isLogged } from './graphql/context/is-logged'
import { setupConnection } from "./database/connect";

const setupServer = async ()=>{
    await setupConnection()

    const server = new ApolloServer({
        typeDefs,
        resolvers, 
        context:isLogged
    })
    server.listen().then(({url})=>{
        console.log(`Servidor Iniciado em ${url}`)
    })
}

setupServer()

