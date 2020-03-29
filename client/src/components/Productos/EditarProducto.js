import React, { Component } from 'react'

import  { Query } from 'react-apollo'

import { OBTENER_PRODUCTO } from '../../queries'

import FormularioEditar from './FormularioEditarProducto'

class EditarProducto extends Component {
    state = { } 

    render() {

        // tomar el id para editar
        const { id } = this.props.match.params
        // console.log(id)

        return( 
            // hago un query para obtener el producto actual
        // <h1>{id }</h1>
            <>
                <h1 className="text-center">Editar Producto</h1>

                <div className="row justify-content-center">
                    <Query query={OBTENER_PRODUCTO}
                        variables={{id}}
                    >
                        {({ loading, error, data, refetch }) => {
                            if (loading) return "Cargando ..."
                            if (error) return `Error ${error.message}`
                            // console.log(data)  data que llega de servidor

                            return (
                                <FormularioEditar
                                    producto={data} // guarda la data(y queries) y la almacena en producto
                                    id= {id}
                                    refetch={refetch} //refresca la peticion del queri
                                >

                                </FormularioEditar>
                            )
                        } }
                    </Query>
                </div>
            </>
        )
    }
}

export default EditarProducto