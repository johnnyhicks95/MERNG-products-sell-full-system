 import React from 'react'
 
 // recibo el atributo error del padre
const Error = ({ error }) => {
    
    if ( error.message ){ // coge el mensaje de error de gql y lo muestra en react
        error = error.message
    }

    return (
        <p className="alert alert-danger text-white text-center p-2 mb-2">{error}</p>
    )
}


 export default Error