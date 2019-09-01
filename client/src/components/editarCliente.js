import React, { Component, Fragment } from 'react'
import { CLIENTE_QUERY } from '../queries'
//metodo de react apollo para realizar el queri
import { Query } from 'react-apollo'

import FormularioEditarCliente from './formularioEditarCliente';

class EditarCliente extends Component {
    state = {}
    render() {
        //tomar el ID del contacto a editar, 
        //id con metodo del react router

        const { id } = this.props.match.params

        // console.log(id)

        return (
            <Fragment>
                <h2 className="text-center ">Editar Cliente</h2>

                <div className="row justify-content-center">
                    <Query query={CLIENTE_QUERY} variables={{ id }}>
                        {/* llamo a mapear los datos automaticamente por el componente */}
                        {/* uso refetch para que vuelva a hacer la peticion y lo paso en el return */}
                        {({ loading, error, data, refetch }) => {
                            if (loading) return 'Cargando...'
                            if (error) return `Error! ${error.message}`

                            // console.log(data)
                            //busco que exista history
                            //console.log(this.props)
                            return (
                                <FormularioEditarCliente 
                                // paso por props los datos a los campos
                                cliente={data.getCliente }
                                //uso la funcion refetch para que vuela a hacer la peticion
                                refetch= {refetch }
                                />
                            )

                        }}
                    </Query>
                </div>
            </Fragment>
        )
    }
}
export default EditarCliente