// import { resolvers } from './resolvers' 
import { importSchema } from 'graphql-import'
// import { makeExecutableSchema } from 'graphql-tools'

//type definitions son los types definidos en el schema.graphql
//importSchema toma parametros: donde se encuentra
const typeDefs = importSchema('data/schema.graphql')

//Creamos el schema con los defs y los resolvers
// makeExecutable Schema toa dos parametros
// const schema = makeExecutableSchema({typeDefs, resolvers})

//exportamos para que este disponible en otros lugares
// export { schema }
export { typeDefs }