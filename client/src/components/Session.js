// high order comp
import React from 'react'
import { Query } from 'react-apollo'

import  { USUARIO_ACTUAL } from '../queries'

const Session = Component => props  => (

    <Query query= { USUARIO_ACTUAL }
    >
        { ( { loading, error, data, refetch } ) => {
            if (loading) return null  // en caso no hay datos todavia , no se envia nada

            return <Component  // va arecorrer todas las urls comprobando la sesion valida
                {...props} 
                refetch={refetch}
                session={data}  // paso como props los datos de la sesion actual
                />  

        } }
    </Query>

)
export default Session