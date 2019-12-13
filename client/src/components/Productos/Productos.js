import React, { Component } from 'react'

import { Query, Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
// query de productos
import { OBTENER_PRODUCTOS } from '../../queries'
import { ELIMINAR_PRODUCTO } from '../../mutations'

//Componentes adicionales
import Paginador from '../Paginador'
import Exito from '../Alertas/Exito'


class Productos extends Component {
    state = {
        paginador: {
            offset: 0,
            actual: 1
        },
        // estado para mostrar la alerta
        alerta: {
            mostrar: false,
            mensaje: ''
        }
    }
    //limite de la cantidad que va a manejar
    limite = 10

    //pmetodos para controlar los botones
    paginaAnterior = () => {
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

    render() {

        const { alerta: { mostrar, mensaje } } = this.state

        const alerta = (mostrar)
            ? <Exito mensaje={mensaje} />
            : ''

        return (
            <>
                <h1 className="text-center mb-5">Productos</h1>

                {/* // la alerta de que se elimino el mensaje */}
                {alerta}

                <Query
                    query={OBTENER_PRODUCTOS}
                    pollInterval={1000}
                    variables={{limite: this.limite, offset: this.state.paginador.offset }}
                >
                    {({ loading, error, data, startPolling, stopPolling }) => {
                        if (loading) return "Cargando ... "
                        if (error) return `Error : ${error.message}`

                        //compruebo que me llegue la data en consola
                        // console.log(data.obtenerProductos)

                        return (
                            <>
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
                                                            onCompleted={(data) => {
                                                                // console.log(data)
                                                                this.setState({
                                                                    alerta: {
                                                                        mostrar: true,
                                                                        mensaje: data.eliminarProducto
                                                                    }
                                                                }, () => {
                                                                    setTimeout(() => {
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
                                                                    onClick={() => {
                                                                        if (window.confirm('Seguro que deseas eliminar este producto?')) {

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

                                {/* // reuso el componente pagiandor con la cofiguracion que tenia en clientes */}
                                <Paginador
                                    actual={this.state.paginador.actual}
                                    // llamo el total de clientes queri
                                    total={data.totalProductos}
                                    //paso el limite para regular el paginador la cantidad
                                    limite={this.limite}
                                    //paso los metodos
                                    paginaAnterior={this.paginaAnterior}
                                    paginaSiguiente={this.paginaSiguiente}
                                />
                            </>
                        )
                    }}

                </Query>

            </>
        )
    }
}

export default Productos