import React, { Fragment} from 'react';
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//importar components
import Header from './components/header'
import Clientes from './components/clientes'
import EditarCliente from './components/editarCliente'
import NuevoCliente from './components/nuevoCliente'

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
      <Router>
        <Fragment>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Clientes} />
              <Route exact path="/cliente/nuevo" component={NuevoCliente} />
              <Route exact path="/cliente/editar/:id" component={EditarCliente} />
            </Switch>  
          </div>
        </Fragment>
      </Router>
    </ApolloProvider>
  );
}

export default App;
