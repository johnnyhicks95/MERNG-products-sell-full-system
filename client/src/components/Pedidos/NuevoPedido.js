import React, { Component } from 'react'

import DatosCliente from './DatosCliente'
import { Query } from 'react-apollo'
import { OBTENER_PRODUCTOS } from '../../queries'

import ContenidoPedido from './ContenidoPedido'

import '../../spinner.css'

class NuevoPedido extends Component {
    state = {}

    render() {

        // el id del router para pasar a componentes hijos
        const { id } = this.props.match.params

        return (

            <>
                <h1 className="text-center mb-5">Nuevo pedido</h1>

                <div className="row">
                    <div className="col-md-3">
                        <DatosCliente
                            id={id}
                        />
                    </div>
                    <div className="col-md-9">
                        <Query query={OBTENER_PRODUCTOS}
                            // agrego el filtro desde los resolvers-schema para tener el stock exacto
                            variables={{stock: true}} 
                        >
                            {({ loading, error, data }) => {
                                // of loading muestra spinner
                                if (loading) return (
                                    <div className="sk-fading-circle">
                                        <div className="sk-circle1 sk-circle"></div>
                                        <div className="sk-circle2 sk-circle"></div>
                                        <div className="sk-circle3 sk-circle"></div>
                                        <div className="sk-circle4 sk-circle"></div>
                                        <div className="sk-circle5 sk-circle"></div>
                                        <div className="sk-circle6 sk-circle"></div>
                                        <div className="sk-circle7 sk-circle"></div>
                                        <div className="sk-circle8 sk-circle"></div>
                                        <div className="sk-circle9 sk-circle"></div>
                                        <div className="sk-circle10 sk-circle"></div>
                                        <div className="sk-circle11 sk-circle"></div>
                                        <div className="sk-circle12 sk-circle"></div>
                                    </div>
                                ) // fin spinmer

                                if(error) return `Error ${error.message}`

                                // console.log(data)

                                return (
                                    <ContenidoPedido
                                        productos={data.obtenerProductos}
                                        id={id} // id del cliente
                                    />
                                )
                            }}
                        </Query>
                    </div>
                </div>

            </>
        )
    }
}

export default NuevoPedido