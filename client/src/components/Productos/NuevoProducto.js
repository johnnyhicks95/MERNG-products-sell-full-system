import React, { Component } from 'react'

import { NUEVO_PRODUCTO } from '../../mutations'
import { Mutation } from 'react-apollo'

// funcion para reiniciar el estado
const initialState = {
    nombre: '',
    precio: '',
    stock: ''
}

class NuevoProducto extends Component {
    // OTRA MANERA DE MANEJAR LOS ESTADOS
    // uso de atributos etiqueta name como variable
    state = {
        // spread estado inicial, hace una copia de la variable y lo asgina aqui
        ...initialState
    }

    // funcion invoca la variable inicial
    limpiarState = () => {
        this.setState({
            ...initialState
        })
    }

    // ***************
    // FUCIONES
    // manera 2: pasar el name y value para actualizar el estado
    actualizarState = e => {
        const { name, value } = e.target
        // console.log( name,':', value )
        this.setState({
            [name]: value
        })
    }

    //VALIDA QUE LOS ACMPOS NO SE ENVIEN VACIOS, ENABLE CUANDO TODO ESTA LLENO
    validarForm = () => {
        // da un disabled al button hasta que todos los campos esten llenos
        const { nombre, precio, stock } = this.state

        const noValido = !nombre || !precio || !stock

        // console.log(noValido)
        return noValido
    }

    // FUNCION PARA CREAR LA DATA DE NUEVO PRODUCTO
    // nuevoProdcuto es la del resolver
    crearNuevoProducto = (e, nuevoProducto) => {
        e.preventDefault()

        // insertamos en la base de datos
        nuevoProducto().then(data => {
            // console.log(data)
            this.limpiarState()

            // redirecciono despues de crear el producto
            this.props.history.push('/productos')
        })
    }

    // FUN FUNCIONES
    //^^^^^^^^^^^^^^^^^^^^^

    render() {
        // del estado llamo las variables
        const { nombre, precio, stock } = this.state

        // creo la variable input que es lo que pide el mutation, para la bd
        // para crear el nuevo_producto
        const input = {
            nombre,
            precio: Number(precio),
            stock: Number(stock)
        }

        return (
            < >
                <h1 className="text-center mb-5">
                    Nuevo producto
                </h1>
                <div className="row justify-content-center">
                    <Mutation
                        // OBjeto nuevo producto
                        mutation={NUEVO_PRODUCTO}
                        variables={{ input }}
                    >
                        {/* ApoloClien:     mutation siempre espera recibir primero una funcion */}
                        {(nuevoProducto, { loading, error, data }) => {
                            return (

                                <form
                                    className="col-md-8"
                                    onSubmit={e => this.crearNuevoProducto(e, nuevoProducto)}
                                >
                                    <div className="form-group">
                                        <label>Nombre:</label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            className="form-control"
                                            placeholder="Nombre del Producto"
                                            onChange={this.actualizarState}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Precio:</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">$</div>
                                            </div>
                                            <input
                                                type="number"
                                                name="precio"
                                                className="form-control"
                                                placeholder="Precio del Producto"
                                                onChange={this.actualizarState}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Stock:</label>
                                        <input
                                            type="number"
                                            name="stock"
                                            className="form-control"
                                            placeholder="stock del Producto"
                                            onChange={this.actualizarState}
                                        />
                                    </div>
                                    <button
                                        disabled={this.validarForm()}
                                        type="submit"
                                        className="btn btn-success float-right">
                                        Crear Producto
                        </button>
                                </form>
                            )
                        }}
                    </Mutation>
                </div>
            </>
        )

    }
}

export default NuevoProducto