import React, { Fragment, Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import {Link } from 'react-router-dom'

//importo la consulta
import { CLIENTES_QUERY } from '../queries'
import { ELIMINAR_CLIENTE } from '../mutations'

//Componentes adicionales
import Paginador from './Paginador'
 
// antes era un componente sin estado
class Clientes extends Component {
    //limite de la cantidad que va a manejar
    limite = 8
    //guardo el paginador modificado el offse ten el s chem.gql y resolver
    // guardo en el estado el offset
    state = {
        paginador: {
            offset: 0,
            actual: 1
        }
    }

    //pmetodos para controlar los botones
    paginaAnterior = () =>  {
        // console.log('anterior')
        this.setState({
            paginador: {
                offset: this.state.paginador.offset - this.limite,
                actual: this.state.paginador.actual - 1
            }
        })
    }

    paginaSiguiente = () => {
        // console.log('siguiente')
        this.setState({
            paginador: {
                offset: this.state.paginador.offset + this.limite,
                actual: this.state.paginador.actual + 1
            }
        })
    }


    render(){
        return(
    
    //query es un metodo de react-apollo que se pasa como parametro
    <Query query={CLIENTES_QUERY}
    //define el intervalo de tiempo que va a hacer la peticion a la base de datos
    pollInterval={1000}
    //paso la siguiente query para paginar: limite y offset de getClientes
    variables = { {
        limite: this.limite,
        offset: this.state.paginador.offset
    }}
    >
        {/* estos parametros ajustan
        loading: un mensaje mientras carga los datos
        error: lo que se muestra en la base de datos
        data: los datos en si
        */}
        {/* startPllon y stop son metodos de poll interval que deben pasarse como parametros */}
        
        {( { loading, error, data , startPolling , stopPolling } ) => {
            if(loading) return "Cargando ..."
            if(error) return `Error: ${error.message}`
            // console.log(data)   
            // console.log(data.getClientesgit)   

            return (
                <Fragment>
                    <h2 className="text-center ">Listado de clientes</h2>
                    <ul className="list-group ">
                        {data.getClientes.map(item => {
                            //no envia la funcion implicito el return ()
                            const {id} = item

                            //retorno el componente por problema de id
                            return(
                            <li key={item.id} className="list-group-item">
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-md-8 d-flex justify-content-between align-items-center">
                                        {item.nombre} {item.apellido} - {item.empresa}
                                    </div>
                                    <div className="col-md-4 d-flex justify-content-end">
                                        <Mutation mutation={ELIMINAR_CLIENTE}>
                                            {/* // paso la funcion del mutation, del resolver */}
                                            {eliminarCliente => (
                                                <button type="button" 
                                                className="btn btn-danger d-block d-md-inline-block mr-2"
                                                //evento para obtener el id del que vamos a eliminar
                                                onClick={ () => {
                                                    // console.log(item.id)
                                                    if(window.confirm('Seguro que deseas eliminar este cliente?')) {
                                                        eliminarCliente({
                                                            //mando la variable como objeto
                                                            variables: {id}
                                                        })
                                                    }
                                                }}
                                                >
                                                &times;Eliminar
                                                </button>
                                            )}
                                        </Mutation>
                                        <Link to={`/cliente/editar/${item.id}`} className="btn btn-success d-block d-md-inline-block">
                                            Editar cliente
                                        </Link>

                                    </div>
                                </div>
                            </li>)
                        })}
                    </ul>

                    <Paginador 
                        actual={this.state.paginador.actual}
                        // llamo el total de clientes queri
                        totalClientes={data.totalClientes}
                        //paso el limite para regular el paginador la cantidad
                        limite={this.limite}
                        //paso los metodos
                        paginaAnterior = {this.paginaAnterior}
                        paginaSiguiente = {this.paginaSiguiente}
                    />
                </Fragment>
            )
        } }
    </Query>
        )
    }
}

export default Clientes