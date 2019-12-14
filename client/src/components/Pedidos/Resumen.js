import React from 'react'
import Producto from './Producto'

const Resumen = (props) => {

    const productos = props.productos

    // condicion para mostrar la tabla solo cuando se haya escogido algun producto
    if (productos.length === 0) return null

    return (
        <>
            <h2 className="text-center my-5">Resumen y cantidades</h2>

            <table className="table">
                <thead className="bg-success text-light">
                    <tr className="font-weight-bold">
                        <th>Producto </th>
                        <th>Precio </th>
                        <th>Inventario </th>
                        <th>Cantidad </th>
                        <th>Eliminar </th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto, index) => (
                        <Producto 
                            key={producto.id} // como recibo de base de datos uso el id como key
                            id={producto.id}
                            producto={producto}
                            index={index}
                            actualizarCantidad={props.actualizarCantidad}// recibo de contenido pedido el metodo
                            eliminarProducto={props.eliminarProducto}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Resumen