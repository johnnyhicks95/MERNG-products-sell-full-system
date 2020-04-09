import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import {RootSession} from './App';
import * as serviceWorker from './serviceWorker';

import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
    //configuro el puerto del server para acceder a los schemas,resolvers, conecciones a mongo ...
    uri: "http://localhost:4000/graphql",
  
    // Enviar token al servidor
    fetchOptions: {
      credentials: 'include'
    }, // una vez iniciada sesion se mantiene
    request: operation => {  // se comunica con el backend para revisar la autenticacion durante la sesion 
      const token = localStorage.getItem('token')
  
      operation.setContext({
        headers: {
          authorization: token // lee el token en el backend
        }
      })
    },
  
    //hago algo de cache de apollo boost
    cache: new InMemoryCache({
      addTypename: false
    }),
    // Para manejar error apollo mandara a consola el problema
    onError: ({ networkError, graphQLErrors }) => {
      console.log('graphQLErrors', graphQLErrors)
      console.log('networkError', networkError)
    }
  })

ReactDOM.render(
    // <App />, 
    <ApolloProvider client={client}>
        <RootSession />
    </ApolloProvider>,
    
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
