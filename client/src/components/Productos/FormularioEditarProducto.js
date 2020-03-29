import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { ACTUALIZAR_PRODUCTO} from '../../mutations'

//para redireccionar
import { withRouter } from 'react-router-dom'

const initialState = {
    nombre: '',
    precio: '',
    stock: ''
}

class FormularioEditar extends Component {
    state = {
        ...this.props.producto.obtenerProducto
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

    // *******************
    // metodos de este componente
    editarProductoForm = ( e, actualizarProducto) => {
        e.preventDefault()

        // pido que devuelva lo que se puso en el schema
        actualizarProducto().then( data => {
            // console.log(data)
            //redireccion en oncomplete
            // vacio el estado cuando acaba de actualizar
            this.setState({
                ...initialState
            })
        })
    }

    render () {
        // del query llamo las variables y las almaceno en el estado
        // del estado llamo las variables
        const { nombre, precio, stock } = this.state
        const { id } = this.props

        // creo la variable input que es lo que pide el mutation, para la bd
        // para crear el nuevo_producto
        const input = {
            id,
            nombre,
            precio: Number(precio),
            stock: Number(stock)
        }

        return (
            <Mutation
                mutation = { ACTUALIZAR_PRODUCTO }
                variables = { { input }}    // paso el objeto input
                key = { this.props.id }
                onCompleted = { ( ) => this.props.refetch().then( () => {
                    this.props.history.push('/productos')
                })} //uso el refetech que actualiza la ultima actualizacion y redirecciona con la promesa
            >
            { ( actualizarProducto, { loading, error, data } ) => {
                // actualizarProducto da la posibilidad de ejecutar el mutation
                return (
                    <form 
                    className="col-md-8" 
                    onSubmit = { e => this.editarProductoForm( e, actualizarProducto ) }
                    >
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input 
                                onChange={this.actualizarState}
                                type="text"
                                name="nombre" 
                                className="form-control" 
                                placeholder="Nombre del Producto"
                                value= {nombre} // del estado llamo al input
                            />
                        </div>
                        <div className="form-group">
                            <label>Precio:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">$</div>
                                </div>
                                <input 
                                    onChange={this.actualizarState}
                                    type="number" 
                                    name="precio" 
                                    className="form-control" 
                                    placeholder="Precio del Producto"
                                    value={precio}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Stock:</label>
                            <input 
                                onChange={this.actualizarState}
                                type="number" 
                                name="stock" 
                                className="form-control" 
                                placeholder="stock del Producto" 
                                value={stock}
                            />
                        </div>
                        <button 
                            disabled={ this.validarForm() }
                            type="submit" 
                            className="btn btn-success float-right">
                                    Guardar Cambios
                        </button>
                    </form> 
                )
            }}                
            </Mutation>
        )
    }
}

export default withRouter(FormularioEditar)