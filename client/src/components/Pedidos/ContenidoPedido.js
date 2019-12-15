import React, { Component } from 'react'
import Select from 'react-select'
// import Animated from 'react-select/lib/animated'
import Resumen from './Resumen'
import GenerarPedido from './GenerarPedido'

import Error from '../Alertas/Error'

/* const options = [
    { value: 'chocolate', label:'Chocolate' }
] */

class ContenidoPedido extends Component {
    state = {
        productos: [],
        total: 0
    }

    // selecciona producto del buscador
    seleccionarProducto = (productos) => {
        // console.log(`algo paso con`, productos)
        this.setState({
            productos
        })
    }

    actualizarTotal = () => {
        const productos = this.state.productos
        
        //cuando todos los productos estan en 0 lo comprueba
        if(productos.length === 0 ) {
            this.setState ({
                total: 0
            })
            return // return para que no se ejecute el resto de codigo            
        }

        let nuevoTotal = 0 
        
        // la operacion de cantida x precio
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio))

        this.setState({ // vuelvo a enviar al estado pero actualizado 
            total: nuevoTotal
        })
        
    }
    
    // metodo para actulizar la cantidad de productos del pedido
    actualizarCantidad = (cantidad, index) => {
        // console.log(cantidad)
        // leer el state de productos
        const productos = this.state.productos
        
        
        // console.log(productos)
        // console.log(index)  para saber cual estoy modificando
        
        // actualizar la cantidad de productos
        productos[index].cantidad = Number(cantidad) // agrega cantidad desde la interfaz
        
        //validamos

        // agregamos al state los productos actualizados para mostrar
        this.setState({
            productos
        }, ()=>{ // callback para actualizar estado
            this.actualizarTotal()
        })
    }

    eliminarProducto = (id) => {
        // console.log(id)
        const productos = this.state.productos

        const productosRestantes = productos.filter(producto => producto.id !== id)

        this.setState({
            productos: productosRestantes
        }, () => { // callback  para actualizar estado
            this.actualizarTotal()
        })
    }

    // FIN METODOS **********

    render() {

        const mensaje = (this.state.total < 0 )
                        ? <Error error="Las cantidades no pueden ser negativas"/>
                        : '' 
        return (
            <>  
                <h2 className="text-center mb-5">Seleccionar articulos</h2>

                { mensaje }

                <Select
                    onChange={this.seleccionarProducto} // para pasar a lestado
                    options={this.props.productos} // paso las opciones a mostrar desde el nuevo pedido
                    isMulti={true}
                    // components={Animated()} // lo invoco pero como funcion
                    placeholder={'Seleccionar productos'}
                    // react-select acepta solo value y label para mostrar los datos
                    // con la config de gql configuro asi la data:
                    getOptionValue={(options) => options.id}
                    getOptionLabel={(options) => options.nombre}
                    value={this.state.productos} // value para elimnar con el estado los productos del input
                />

                <Resumen
                    productos={this.state.productos}
                    actualizarCantidad={this.actualizarCantidad}//metodo cantidad productos downcast
                    eliminarProducto={this.eliminarProducto}
                />
                <p className="font-wight-bold float-right mt-3">
                    Total:
                    <span className="font-weight-normal">
                        $ {this.state.total}
                    </span>
                </p>

                <GenerarPedido 
                    productos={this.state.productos} // paso como props al component
                    total={this.state.total}
                    idCliente={this.props.id}
                />
            </>
        )
    }
}

export default ContenidoPedido 