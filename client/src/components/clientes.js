import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import {Link } from 'react-router-dom'

//importo la consulta
import { CLIENTES_QUERY } from '../queries'
 
const Contactos = () => (
    //query es un metodo de react-apollo que se pasa como parametro
    <Query query={CLIENTES_QUERY}
    //define el intervalo de tiempo que va a hacer la peticion a la base de datos
    pollInterval={1000}
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
            // console.log(data.getClientes)   

            return (
                <Fragment>
                    <h2 className="text-center ">Listado de clientes</h2>
                    <ul className="list-group ">
                        {data.getClientes.map(item => (
                            <li key={item.id} className="list-group-item">
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-md-8 d-flex justify-content-between align-items-center">
                                        {item.nombre} {item.apellido} - {item.empresa}
                                    </div>
                                    <div className="col-md-4 d-flex justify-content-end">
                                        <Link to={`/cliente/editar/${item.id}`} className="btn btn-success d-block d-md-inline-block">
                                            Editar cliente
                                        </Link>

                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Fragment>
            )
        } }
    </Query>
)

export default Contactos