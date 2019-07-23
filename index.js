import express from 'express'
//graphql HTTP: permite conectar Graphql con express
import graphqlHTTP from 'express-graphql'

//paso como objeto el schema
import {schema} from './data/schema'
//importo los resolvers del archivo independiente
import resolvers from './data/resolvers'


const app = express()
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

app.listen(port, () => console.log('Servidor corriendo en puerto 8000: ...'))