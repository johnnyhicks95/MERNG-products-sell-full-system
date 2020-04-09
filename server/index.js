import express from 'express'
//graphql HTTP: permite conectar Graphql con express
// import graphqlHTTP from 'express-graphql'

// inicio la configuracion de Apollo server
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './data/schema'
import { resolvers } from './data/resolvers'

import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config({path: 'variables.env'})

//paso como objeto el schema
// import {schema} from './data/schema'
//importo los resolvers del archivo independiente
// import resolvers from './data/resolvers'

const app = express()
const server = new ApolloServer( {
    typeDefs, 
    resolvers,
    context: async({ req }) =>{
        // recibo el token del servidor
        const token = req.headers['authorization']
        // console.log(typeof token);
        if(token !== "null"){
            try {
                // paso el token y verifico
                // verify: token, llave de las variables
                const usuarioActual = await jwt.verify( token, process.env.SECRETO )

                // guardo la informacion del reques par usarla cuando la necesite
                req.usuarioActual = usuarioActual

                return {
                    usuarioActual
                }
            } catch(err) {
                console.error(err);
                
            }
        }
        
    }

} )

server.applyMiddleware( { app} )

app.listen ( 
    {port: 4000},
     () => console.log(`
     El servidor está corriendo en http://localhost:4000${server.graphqlPath}
     `)
)

/* Codigo que no se usa por la configuracion de apollo server
const port = 8000
 app.get('/', ( req, res) =>{
    res.send('Servidor listo!')
})

//middleware http para activar el endpoint de graphql
app.use('/graphql', graphqlHTTP({
    //aca se recibe el eschema que se va a usar
    schema,
    //usamos graphiql
    graphiql: true
}))

app.listen(port, () => console.log('Servidor corriendo en puerto 8000: ...')) */