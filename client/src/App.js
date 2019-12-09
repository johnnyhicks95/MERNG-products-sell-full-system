import React, { Fragment} from 'react';
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//importar components
import Header from './components/Layout/Header'
import Clientes from './components/Clientes/Clientes'
import EditarCliente from './components/Clientes/EditarCliente'
import NuevoCliente from './components/Clientes/NuevoCliente'

import NuevoProducto from './components/Productos/NuevoProducto'

const client = new ApolloClient({
  //configuro el puerto del server para acceder a los schemas,resolvers, conecciones a mongo ...
  uri: "http://localhost:4000/graphql",
  //hago algo de cache de apollo boost
  cache: new InMemoryCache({
    addTypename: false
  }),
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
      <Router>
        <Fragment>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Clientes} />
              <Route exact path="/cliente/editar/:id" component={EditarCliente} />
              <Route exact path="/cliente/nuevo" component={NuevoCliente} />
              <Route exact path="/productos/nuevo" component={NuevoProducto} />
            </Switch>  
          </div>
        </Fragment>
      </Router>
    </ApolloProvider>
  );
}

export default App;
