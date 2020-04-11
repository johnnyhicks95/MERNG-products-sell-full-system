// en este componente se haran las estadisticas de los clientes que mas compran
import React from 'react'
import Clientes from './Clientes'
import Vendedores from './Vendedores'

const Panel = () => {
    return (
        <>
            <h1 className="text-center my-5" >Top 10 clientes que mas compran</h1>
            <Clientes  />
            {/* // 0.32 vendedores que mas ganancia por pedidos completados */}
            <h1 className="text-center my-5" >Top 10 vendedores</h1>
            <Vendedores  />
        </>
    )
}


export default Panel 