import React from 'react'
// este resumen se muestra en la lista de pedidos

// destructuring de cantidad y producto
const ResumenProducto = ( { cantidad, producto }) => {
    return (
        <> 
            <div className="contenedor-productos mb-4 p-4" >
                <p className="card-text font-weight-bold" >
                    Nombre del producto: 
                    <span className="font-weight-normal" > { producto.nombre } </span>
                </p>
                <p className="card-text font-weight-bold" >
                    Cantidad: 
                    <span className="font-weight-normal" > { cantidad } </span>
                </p>
                <p className="card-text font-weight-bold" >
                    Precio: 
                    <span className="font-weight-normal" >$ { producto.precio } </span>
                </p>
            </div>
        </>
    )
}

export default ResumenProducto 
