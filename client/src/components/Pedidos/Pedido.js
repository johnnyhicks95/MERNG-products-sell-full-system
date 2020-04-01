import React from 'react'
// este componente trae los pedidos y renderiza del query obtener_pedidos

import { OBTENER_PRODUCTO } from '../../queries'
import { Query, Mutation } from 'react-apollo'
import { ACTUALIZAR_ESTADO } from '../../mutations'

import ResumenProducto from './ResumenProducto'

const Pedido = (props) => {

    const { pedido } = props
    // console.log(pedido)
    
    
    const { id } = pedido
    // console.log(id)
    
    // console.log(typeof pedido.fecha)
    // console.log(Number(pedido.fecha))
    // convierto el string-timestamp  a tipo fecha
    const fecha = new Date(Number(pedido.fecha))
    
    // para cambiar el COLOR segun el ESTADO
    const { estado } = pedido  
    // console.log(estado)
    let clase  // va a tomar el valor segun el estado
    if(estado === 'PENDIENTE'){
        clase = 'border-light'
    } else if ( estado === 'CANCELADO' ){
        clase = 'border-danger'
    } else {
        clase = 'border-success '
    }

    return (
        <div className="col-md-4 ">
           <div className={`card mb-3 ${clase}`} >  {/*  ${clase}: da la clase segun el estado */}
                <div className="card-body">
                    <p className="card-text font-weight-bold ">Estado:
                        <Mutation
                            mutation={ACTUALIZAR_ESTADO}
                        >
                            {actualizarEstado => (

                                <select
                                    className="form-control my-3"
                                    value={pedido.estado} // escanea automaicamente el estado
                                    onChange={e => { //onchange: para manejar el estado del pedido
                                        // console.log (e.target.value)f

                                        const input = { // pide un input ( como query varibables) el hacer un pedido
                                            id, // id del pedido
                                            pedido: pedido.pedido, // el arreglo del pedido(input)
                                            fecha: pedido.fecha,
                                            total: pedido.total,
                                            cliente: props.cliente, // ya viene como props
                                            estado: e.target.value
                                        }
                                        // console.log(input) 

                                        //aqui el mutation
                                        actualizarEstado({
                                            variables: { input } // mando el input con los datos
                                        })
                                    }}
                                >
                                    <option value="PENDIENTE">PENDIENTE</option>
                                    <option value="COMPLETADO">COMPLETADO</option>
                                    <option value="CANCELADO">CANCELADO</option>
                                </select>
                            )}
                        </Mutation>
                    </p>
                    <p className="card-text font-weight-bold">Pedido ID:
                        <span className="font-weight-normal"> {pedido.id} </span>
                    </p>
                    <p className="card-text font-weight-bold">Fecha Pedido:
                        <span className="font-weight-normal"> {fecha.toLocaleString("es-EC")} </span>
                    </p>
                    <p className="card-text font-weight-bold">Total:
                        <span className="font-weight-normal"> $ {pedido.total} </span>
                    </p>

                    <h3 className="card-text text-center mb-3">Artículos del pedido</h3>
                    {pedido.pedido.map((producto, index) => { // index es el indice para evitar repetir la key
                        {/* console.log(producto) */ }
                        {/* el id es del producto de pedido */ }
                        const { id } = producto

                        return (
                            <Query
                                key={pedido.id + index}  // +index: para tener el key unico
                                query={OBTENER_PRODUCTO}
                                variables={{ id }}   // hace referencia al id del producto, se pasa como objeto
                            >

                                {({ loading, error, data }) => {
                                    if (loading) return 'Cargando ... '
                                    if (error) return `Error ${error.message}`

                                    {/* console.log(data) */ }
                                    return (
                                        <ResumenProducto
                                            producto={data.obtenerProducto}
                                            cantidad={producto.cantidad}
                                            key={producto.id}
                                        />
                                    )
                                }}

                            </Query>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Pedido