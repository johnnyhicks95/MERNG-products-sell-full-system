/*
contiene los pedidos hechos por el ciente

*/
import React from 'react'

import { Query } from 'react-apollo'
import { OBTENER_PEDIDOS } from '../../queries'

import Pedido from './Pedido'

import '../../spinner.css'


const PedidosCliente = ( props ) => {

    // console.log(props)
    // no hago destructurin id para poder cambiar el estado del cliente y los pedidos
    const cliente = props.match.params.id
    // console.log(clienteId)


    return (
        <>
            <h1 className="text-center mb-5">Pedidos del cliente</h1>

            <div className="row">
                <Query query={OBTENER_PEDIDOS} 
                    variables={{ cliente }}
                    pollInterval={500}
                 >
                 { ( { loading, error, data, startPolling, stopPolling }) =>{
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

                        {/* console.log(data) */}

                        return (
                            data.obtenerPedidos.map(pedido => (
                                <Pedido 
                                    key={pedido.id}
                                    pedido={pedido}
                                    cliente = {cliente} // cliente: viene de variables, el objeto del query
                                />
                            ) )
                        )
                 } }

                </Query>
            </div>
        </>
    )
}

export default PedidosCliente 