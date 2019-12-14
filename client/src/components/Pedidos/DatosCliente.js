import React from 'react'
import { Query } from 'react-apollo'
import { CLIENTE_QUERY } from '../../queries'

// es un stateless componente paso como prop el id del padre
const DatosCliente = ( { id } ) => {
    return(
        <>
        <h2 className="text-center mb-3 ">Resumen del Cliente:</h2>

        <Query query={CLIENTE_QUERY}
            variables={{ id }}
            pollInterval={500}
        >
            {({ loading, error, data, startPolling, stopPolling }) =>{
                if (loading) return 'Cargando...'
                if (error) return `Error ${error.message}`

                // console.log(data.getCliente)
                // dsetructurin de data las variables del query
                const { nombre, apellido, edad, emails, empresa, tipo } = data.getCliente

                return (
                    <ul className="list-unstyled my-5">
                        <li className="border font-weight-bold p-2">Nombre:
                            <span className="font-weight-normal"> {nombre}</span>
                        </li>
                        <li className="border font-weight-bold p-2">Apellido:
                            <span className="font-weight-normal"> {apellido}</span>
                        </li>
                        <li className="border font-weight-bold p-2">Edad:
                            <span className="font-weight-normal"> {edad}</span>
                        </li>
                        <li className="border font-weight-bold p-2">Email:
                            <span className="font-weight-normal"> {emails.map( email => ` ${email.email}`)}</span>
                        </li>
                        <li className="border font-weight-bold p-2">Empresa:
                            <span className="font-weight-normal"> {empresa}</span>
                        </li>
                        <li className="border font-weight-bold p-2">Tipo:
                            <span className="font-weight-normal"> {tipo}</span>
                        </li>
                         
                    </ul>
                )
            }}
        </Query>
        </>  
    )
}

export default  DatosCliente