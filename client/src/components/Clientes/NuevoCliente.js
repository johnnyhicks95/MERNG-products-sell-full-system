import React, { Component, Fragment } from 'react'

//traigo los mutations
import { NUEVO_CLIENTE } from '../../mutations'
import { Mutation } from 'react-apollo'

class NuevoCliente extends Component {

    //Por varias opciones se puede leer datos del formulario, como: separar en componentes y leer el state
    //tambien con el metodo onchange y guardar en el estate, en este caso se va a almacenar todo en  state.
    state = {
        cliente: {
            nombre: '',
            apellido: '',
            empresa: '',
            edad: '',
            email: '',
            tipo: ''
        },
        error: false,
        emails: []
    }

    //metodo para leer el email que se esta ingresando
    // el primer arrow es i de indix, el e de event
    leerCampo = i => e => {
        // console.log('estas escribiendo un email')
        const nuevoEmail = this.state.emails.map( (email,index ) =>{
            if(i !== index ) return index
            return {
                ...email,
                email: e.target.value
            }
        })
        this.setState({
            emails: nuevoEmail
        })
         
    }

    //creo el metodo para agregar nuevos campos
    nuevoCampo = () => {
        // console.log('hiciste click')
        this.setState({
            emails: this.state.emails.concat( [{email: ''}] )
        })
    }

    //metodo para eliminar campo email, hago una doble arrow
    //se hace un filter para eliminar campos innecesarios
    quitarCampo = i => () => {
        // console.log(`Presionaste en eliminar ${i}`)
        this.setState({
            emails: this.state.emails.filter((email, index) => i !== index)
        })
    }

    render() {
        // la parte de la ui que mostrara un mensaje de error o no, dependiendo la validacion
        const { error } = this.state
        let respuesta = ( error ) ? <p className="alert alert-danger p-3 text-center">
            Todos los campos son obligatorios
        </p>  : ''

        return (
            <Fragment>
                {/* Formulario que contiene los inputs de la pagina: nuevo cliente */}
                <h2 className="text-center ">Nuevo Cliente</h2>

            {/* aqui va el mensaje de la validacion como codigo js */}
                { respuesta }
                <div className="col-md-8 m-3">
                    {/* llamo la configuracion mutation de apollo */}
                    <Mutation mutation={NUEVO_CLIENTE}
                    //onCompleted: de apollo client, es un metodo que puede redirigir a la direccion que se de
                        onCompleted={() => this.props.history.push('/')}
                    >
                        { crearCliente =>  ( 

                        <form className="col-md-8 m-3"
                            // Para manejar el submit con apollo se maneja el submit desde el form
                            // Como se pasa un objeto "input", se crea el objeto input pasando la data del estado
                            onSubmit={
                                e => {
                                    e.preventDefault()

                                    const { nombre, apellido, empresa, edad, tipo } = this.state.cliente

                                    //una variable que almacena emails
                                    const { emails } = this.state 

                                    //hago una pequena validacion que los campos no esten vacios en submit
                                    if(nombre=== '' || apellido === '' ||
                                    edad === '' || tipo === '') {
                                        this.setState ({
                                            error: true
                                        })
                                        //return: para que no siga con el codigo
                                        return
                                    }

                                    //si los campos no estan vacios continua el codigo
                                    this.setState({
                                        error: false
                                    })

                                    const input = {
                                        nombre,
                                        apellido,
                                        empresa,
            //Tener cuidad porque los datos se envian en string, si es numero usar un metodo para convertir en numero
                                        edad: Number(edad),
                                        tipo,
                                        emails
                                    }

                                    // console.log(input)
            //llamo el segundo metodo que usara la mutation de ../mutations
                                    crearCliente({
                                        variables: {input}
                                    })
                                }
                            }
                        >
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Nombre</label>
                                    <input type="text" className="form-control" placeholder="Nombre"
                                        onChange={
                                            e => {
                                                this.setState({
                                                    cliente: {
                                                        // hago un spread para que el state no se elimine y continue
                                                        ...this.state.cliente,
                                                        nombre: e.target.value
                                                    }
                                                })
                                            }
                                        } />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Apellido</label>
                                    <input type="text" className="form-control" placeholder="Apellido"
                                        onChange={
                                            e => {
                                                this.setState({
                                                    cliente: {
                                                        ...this.state.cliente,
                                                        apellido: e.target.value
                                                    }
                                                })
                                            }
                                        }
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label>Empresa</label>
                                    <input type="text" className="form-control" placeholder="Empresa"
                                        onChange={
                                            e => {
                                                this.setState({
                                                    cliente: {
                                                        ...this.state.cliente,
                                                        empresa: e.target.value
                                                    }
                                                })
                                            }
                                        }
                                    />
                                </div>
                                {/* mapeo del estado: emails */}
                                {this.state.emails.map( ( input, index ) => (
                                    <div key={index} className="form-group col-md-12">
                                        <label>Correo: {index + 1 }:</label>

                                        <div className="input-group">
                                            <input
                                            type="email"
                                            placeholder="Email"
                                            className="form-control"
                                            onChange={this.leerCampo(index)}
                                            />

                                            <div className="input-group-append">
                                                <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={this.quitarCampo(index)}
                                                > &times; Eliminar </button>
                                            </div>
                                        </div>
                                    </div>
                                ) )}
                                <div className="form-group d-flex justify-content-center col-md-12">
                                    <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={this.nuevoCampo}
                                    >+ Agregar email</button>
                                </div>
                                
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Edad</label>
                                    <input type="text" className="form-control" placeholder="Edad"
                                        onChange={
                                            e => {
                                                this.setState({
                                                    cliente: {
                                                        ...this.state.cliente,
                                                        edad: e.target.value
                                                    }
                                                })
                                            }
                                        }
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Tipo Cliente</label>
                                    <select className="form-control"
                                        onChange={
                                            e => {
                                                this.setState({
                                                    cliente: {
                                                        ...this.state.cliente,
                                                        tipo: e.target.value
                                                    }
                                                })
                                            }
                                        }
                                    >
                                        <option value="">Elegir...</option>
                                        <option value="PREMIUM">PREMIUM</option>
                                        <option value="BASICO">BÁSICO</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success float-right">Agregar Cliente</button>
                        </form>
                        ) }
                    </Mutation>
                </div>
            </Fragment>
        )
    }
}

export default NuevoCliente