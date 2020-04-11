import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// 0.31: el boton que va a mostrar dependiendo del rol
const BotonRegistro = ({session}) => {

    // console.log(session.session.obtenerUsuario.rol);
    const { rol } = session.session.obtenerUsuario

    // condicion del filtro
    if( rol !== 'ADMINISTRADOR' ) return null 

    return (
        <Link to="/registro" className="btn btn-warning ml-md-2 mt-2 mt-md-0" >
            Crear usuarios
        </Link>
    )
}

export default BotonRegistro