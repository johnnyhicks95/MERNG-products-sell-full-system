import React, { Component } from 'react'

class Producto extends Component {
    state = {}

    render() {
        //para ller los datos del producto
        const { producto } = this.props
        // console.log(producto)

        return (
            <>
                <tr>
                    <td>{producto.nombre}</td>
                    <td>$ {producto.precio}</td>
                    <td>{producto.stock}</td>
                    <td>
                        <input 
                            type = "number"
                            className="form-control"
                            onChange={ e => 
                                this.props.actualizarCantidad(e.target.value, this.props.index)
                            }
                        />
                    </td>
                    <td>
                        <button
                            type="button"
                            className="btn btn-danger font-weight-bold"
                            onClick={ e => this.props.eliminarProducto(producto.id)}
                        >
                            &times; Eliminar
                        </button>
                    </td>
                </tr>
            </>
        )
    }
}

export default Producto