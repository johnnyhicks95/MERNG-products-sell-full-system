import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { NUEVO_USUARIO } from "../../mutations"

import Error from '../Alertas/Error'

import { withRouter } from 'react-router-dom'


const initialState = {
    usuario: '',
    password: '',
    repetirPassword: ''
}

class Registro extends Component {
    state = {
        ...initialState  // hace una copia del initialState
    }

    // para borrar los datos en el state
    limpiarState = () => {
        this.setState({...initialState}) 
    }

    // para enviar el form a la base de datos
    crearRegistro = (e, crearUsuario ) => { // crearUsuario, tambien debo enviar el mutation
        e.preventDefault()
        // console.log('Creando registro ...')

        crearUsuario().then(data => {
            // console.log(data)
            this.limpiarState()

            // redireccion al login
            this.props.history.push('/login')

        })
    }

    // metodo para sobreescribir el estado, se maneja nmediante un onChange en los select
    actualizarState = (e) => {
        // console.log('escribiendo ... ')
        const { name, value } = e.target

        this.setState({
            [name]: value
        })

    }

    // valida si el formulario esa lleno, bloquea el button hasta que 
    // o no este completo o la contrase;a este repetida
    validarForm = () => {
        const { usuario, password, repetirPassword } = this.state

        const noValido = !usuario || !password || password !== repetirPassword
        // console.log(noValido)
        return noValido
    }

    render() {

        // declaro las variables que voy a usar
        const { usuario, password, repetirPassword } = this.state

        return (
            <>
                <h1 className="text-center mb-5">Nuevo Usuario</h1>
                <div className="row  justify-content-center">

                    {/* // el mutation donde voy a enviar la data */}
                    <Mutation
                        mutation={NUEVO_USUARIO}
                        variables={{ usuario, password }}
                    >
 
                        {(crearUsuario, { loading, error, data }) => {

                            return (
                                <form
                                    className="col-md-8"
                                    onSubmit = { e => this.crearRegistro(e, crearUsuario) } // e: paso el evento
                                >

                                    {error && <Error error={error} /> }

                                    <div className="form-group">
                                        <label>Usuario</label>
                                        <input
                                            onChange={this.actualizarState}
                                            type="text"
                                            name="usuario"
                                            className="form-control"
                                            placeholder="Nombre Usuario"
                                            value={usuario} // de la variable de lestado
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input
                                            onChange={this.actualizarState}
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Password"
                                            value={ password }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Repetir Password</label>
                                        <input
                                            onChange={this.actualizarState}
                                            type="password"
                                            name="repetirPassword"
                                            className="form-control"
                                            placeholder="Repetir Password"
                                            value={ repetirPassword }
                                        />
                                    </div>

                                    <button
                                        disabled={loading || this.validarForm()} // se llama automaticamentecuando lega a esta linea
                                        type="submit"
                                        className="btn btn-success float-right"
                                    >
                                        Crear Usuario
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


export default withRouter(Registro) 