// en este componente se haran las estadisticas de los clientes que mas compran
import React from 'react'
import Clientes from './Clientes'

const Panel = () => {
    return (
        <>
            <h1 className="text-center my-5" >Top 10 clientes que mas compran</h1>
            <Clientes  />
        </>
    )
}


export default Panel 