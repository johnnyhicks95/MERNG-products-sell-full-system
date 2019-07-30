import React from 'react';
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  //configuro el puerto del server para acceder a los schemas,resolvers, conecciones a mongo ...
  uri: "http://localhost:4000/graphql",
  // Para manejar error apollo mandara a consola el problema
  onError:  ({ networkError, graphQLErrors}) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
})

function App() {
  return (
    //El apollo provider contendra a todas las funciones de Apollo
    // querys, mutations ...
    <ApolloProvider client={client}>
      <h1>React esta funcionando! </h1>
    </ApolloProvider>
  );
}

export default App;
