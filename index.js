import express from 'express'
//graphql HTTP: permite conectar Graphql con express
import graphqlHTTP from 'express-graphql'
import schema from './schema'
//import los resolvers del archivo independiente
import resolvers from './resolvers'

//mantengo la variable root
const root = resolvers

const app = express()
const port = 8000

app.get('/', ( req, res) =>{
    res.send('Servidor listo!')
})


app.use('/graphql', graphqlHTTP({
    //aca se recibe el eschema que se va a usar
    schema,
    // el resolver se para como rootvalue
    rootValue: root,
    //usamos graphiql
    graphiql: true
}))

app.listen(port, () => console.log('Servidor corriendo en puerto 8000: ...'))