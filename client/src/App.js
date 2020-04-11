import React, { Fragment } from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

//importar components
import Header from './components/Layout/Header'
import Clientes from './components/Clientes/Clientes'
import EditarCliente from './components/Clientes/EditarCliente'
import NuevoCliente from './components/Clientes/NuevoCliente'

import NuevoProducto from './components/Productos/NuevoProducto'
import Productos from './components/Productos/Productos'
import EditarProducto from './components/Productos/EditarProducto'

import NuevoPedido from './components/Pedidos/NuevoPedido'
import PedidosCliente from './components/Pedidos/PedidosCliente'

import Panel from './components/Panel/Panel'

import Registro from './components/Auth/Registro'
import Login from './components/Auth/Login'

import Session from './components/Session'


// es una sfc : para controlar la autenticacion de usuarios
const App = ({ refetch, session }) => {
  // console.log(session);
  const { obtenerUsuario } = session

  const mensaje = ( obtenerUsuario ) ? `Bienvenido: ${obtenerUsuario.nombre}` : <Redirect to="/login" />

  /* function App() {'
  
  */
  return (
    //El apollo provider contendra a todas las funciones de Apollo
    // querys, mutations ...
    // <ApolloProvider client={client}>
      <Router>
        <Fragment>
          <Header session={session} />
          <div className="container">
            <p className="text-right" >{mensaje}</p>  
            <Switch>
              {/* <Route exact path="/clientes" component={Clientes}  - 
              o.30: modified to pass props ID and filter who created his own client /> */}
              <Route exact path="/clientes" render={ () => <Clientes session={session} /> } />
              <Route exact path="/clientes/editar/:id" component={EditarCliente} />
              {/* <Route exact path="/clientes/nuevo" component={NuevoCliente} />   modified in 0.30 to pass props: id*/}
              <Route exact path="/clientes/nuevo" render={ () => <NuevoCliente session={session} /> } />

              <Route exact path="/productos/nuevo" component={NuevoProducto} />
              <Route exact path="/productos" component={Productos} />
              <Route exact path="/productos/editar/:id" component={EditarProducto} />

              {/* <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido} />  0.32 : referencia vendedor-pedido */}
              <Route exact path="/pedidos/nuevo/:id" render={ () => <NuevoPedido session={session} /> } />
              <Route exact path="/pedidos/:id" component={PedidosCliente} />

              <Route exact path="/panel" component={Panel} />

              {/* <Route exact path="/login" component={Login} /> */}
              <Route exact path="/login" render={ () => <Login refetch={refetch} /> } />
              {/* <Route exact path="/registro" component={Registro} />
              0.31 : mostrando el contenido si es administrador o si es vendedor */}
              <Route exact path="/registro" render={ () => <Registro session={session} /> } />

            </Switch>
          </div>
        </Fragment>
      </Router>
    // </ApolloProvider>
  );
}

// export default App;
// de un HOC para controlar la session de los usuarios
const RootSession = Session(App)

export { RootSession }
