import React from 'react'
import { ApolloConsumer } from 'react-apollo'
import { withRouter } from 'react-router-dom'

const cerrarSesionUsuario = ( cliente, history ) => {
    localStorage.removeItem('token', '')

    // desloguear usuario
    cliente.resetStore()
    // redireccion
    history.push('/login')
}

const CerrarSesion = ({history}) => (  // history: permite redirigir a otro lado cuando cierre sesion
    <ApolloConsumer>
    { cliente => {

    return (
        <button 
            onClick={ () => cerrarSesionUsuario( cliente, history ) }    
            className="btn btn-light ml-md-2 mt-2 mt-md-0" 
        >
            Cerrar Sesion
        </button>
    )
    } }

    </ApolloConsumer>
)

export default withRouter(CerrarSesion)
