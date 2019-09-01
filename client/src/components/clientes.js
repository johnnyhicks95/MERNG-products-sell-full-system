import React, { Fragment } from 'react'
import { Query, Mutation } from 'react-apollo'
import {Link } from 'react-router-dom'

//importo la consulta
import { CLIENTES_QUERY } from '../queries'
import { ELIMINAR_CLIENTE } from '../mutations'
 
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
                                            {eliminarCliente => (
                                                <button type="button" 
                                                className="btn btn-danger d-block d-md-inline-block mr-2"
                                                //evento para obtener el id del que vamos a eliminar
                                                onClick={ () => {
                                                    // console.log(item.id)
                                                    if(window.confirm('Seguro que deseas eliminar este cliente?')) {
                                                        eliminarCliente({
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
                </Fragment>
            )
        } }
    </Query>
)

export default Contactos