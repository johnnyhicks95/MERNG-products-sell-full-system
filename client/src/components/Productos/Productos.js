import React, { Component } from 'react'

import { Query, Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
// query de productos
import { OBTENER_PRODUCTOS } from '../../queries'
import { ELIMINAR_PRODUCTO } from '../../mutations'
import Exito from '../Alertas/Exito'


class Productos extends Component {
    state = {
        // estado para mostrar la alerta
        alerta: {
            mostrar: false,
            mensaje: ''
        }
    }

    render() {

        const { alerta: { mostrar, mensaje} } = this.state

        const alerta = ( mostrar ) 
            ? <Exito mensaje={ mensaje }/> 
            : ''

        return (
            <>
                <h1 className="text-center mb-5">Productos</h1>

                {/* // la alerta de que se elimino el mensaje */}
                {alerta}

                <Query
                    query={OBTENER_PRODUCTOS}
                    pollInterval={1000}
                // variables={{ }}
                >
                    {({ loading, error, data, startPolling, stopPolling }) => {
                        if (loading) return "Cargando ... "
                        if (error) return `Error : ${error.message}`

                        //compruebo que me llegue la data en consola
                        // console.log(data.obtenerProductos)

                        return (
                            <table className="table">
                                <thead>
                                    <tr className="table-primary">
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col">Eliminar</th>
                                        <th scope="col">Editar</th>
                                    </tr>
                                </thead>


                                <tbody>
                                    {data.obtenerProductos.map(item => {
                                        const { id } = item

                                        return (
                                            <tr key={id} >
                                                <td>{item.nombre}</td>
                                                <td>{item.precio}</td>
                                                <td>{item.stock}</td>
                                                <td>
                                                    <Mutation 
                                                        mutation={ELIMINAR_PRODUCTO}
                                                        // para mandar el mensaje que viende desde el resolver
                                                        // lo que se configuro y tambien en el schema
                                                        onCompleted={( data ) => {
                                                            // console.log(data)
                                                            this.setState({
                                                                alerta: {
                                                                    mostrar: true,
                                                                    mensaje: data.eliminarProducto
                                                                }
                                                            }, ()=> {
                                                                setTimeout( () => {
                                                                    // con este callback reseteo el estado
                                                                    //para eliminar el mensaje de alerta
                                                                    this.setState({
                                                                        alerta: {
                                                                            mostrar: false,
                                                                            mensaje: ''
                                                                        }
                                                                    })
                                                                }, 3000)
                                                            })
                                                        }}
                                                        >
                                                        {eliminarProducto => (
                                                            <button
                                                                type="button" 
                                                                className="btn btn-danger"
                                                                onClick={ () => {
                                                                    if(window.confirm('Seguro que deseas eliminar este producto?')) {

                                                                        eliminarProducto({
                                                                            variables: { id } 
                                                                        })
                                                                    }
                                                                }}
                                                            >
                                                                &times; Eliminar
                                                            </button>
                                                        )
                                                        }
                                                    </Mutation>
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`/productos/editar/${id}`}
                                                        // /productos/editar/:id
                                                        className="btn btn-success"
                                                    >
                                                        Editar producto
                                                    </Link>
                                                </td>
                                            </tr>

                                        )
                                    }

                                    )}
                                </tbody>
                            </table>
                        )
                    }}

                </Query>

            </>
        )
    }
}

export default Productos