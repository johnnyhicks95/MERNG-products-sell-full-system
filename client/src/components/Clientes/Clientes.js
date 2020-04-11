import React, { Fragment, Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'

//importo la consulta
import { CLIENTES_QUERY } from '../../queries'
import { ELIMINAR_CLIENTE } from '../../mutations'

//Componentes adicionales
import Paginador from '../Paginador'
import Exito from '../Alertas/Exito'

// antes era un componente sin estado
class Clientes extends Component {
    //limite de la cantidad que va a manejar
    limite = 8
    //guardo el paginador modificado el offse ten el s chem.gql y resolver
    // guardo en el estado el offset
    state = {
        paginador: {
            offset: 0,
            actual: 1
        },
        // estado para mostrar la alerta
        alerta: {
            mostrar: false,
            mensaje: ''
        }
    }

    //pmetodos para controlar los botones
    paginaAnterior = () => {
        // console.log('anterior')
        this.setState({
            paginador: {
                offset: this.state.paginador.offset - this.limite,
                actual: this.state.paginador.actual - 1
            }
        })
    }

    paginaSiguiente = () => {
        // console.log('siguiente')
        this.setState({
            paginador: {
                offset: this.state.paginador.offset + this.limite,
                actual: this.state.paginador.actual + 1
            }
        })
    }


    render() {


        // Alertas en caso de que se crea el perfil del cliente
        const { alerta: { mostrar, mensaje } } = this.state

        const alerta = (mostrar)
            ? <Exito mensaje={mensaje} />
            : ''

        // Obtiene el ID del vendedor para mostrar sus clientes
        // console.log(this.props.session.obtenerUsuario.id);

        // const id = this.props.session.obtenerUsuario.id 
        let id 
        const { rol } = this.props.session.obtenerUsuario
        // console.log(rol);
        

        if( rol === 'VENDEDOR' ) {
            id = this.props.session.obtenerUsuario.id 
        } else {
            id = ''  // 0.30: al tener el id vacio el resolver filtra todo en el resolver
        }

        return (

            //query es un metodo de react-apollo que se pasa como parametro
            <Query query={CLIENTES_QUERY}
                //define el intervalo de tiempo que va a hacer la peticion a la base de datos
                pollInterval={1000}
                //paso la siguiente query para paginar: limite y offset de getClientes
                variables={{
                    limite: this.limite,
                    offset: this.state.paginador.offset,
                    vendedor: id  // 0.30 filtro de clientes y vendedores
                }}
            >
                {/* estos parametros ajustan
        loading: un mensaje mientras carga los datos
        error: lo que se muestra en la base de datos
        data: los datos en si
        */}
                {/* startPllon y stop son metodos de poll interval que deben pasarse como parametros */}

                {({ loading, error, data, startPolling, stopPolling }) => {
                    if (loading) return "Cargando ..."
                    if (error) return `Error: ${error.message}`
                    // console.log(data)   
                    // console.log(data.getClientesgit)   

                    return (
                        <Fragment>
                            <h2 className="text-center ">Listado de clientes</h2>
                            { alerta }
                            <ul className="list-group ">
                                {data.getClientes.map(item => {
                                    //no envia la funcion implicito el return ()
                                    const { id } = item

                                    //retorno el componente por problema de id
                                    return (
                                        <li key={item.id} className="list-group-item">
                                            <div className="row justify-content-between align-items-center">
                                                <div className="col-md-8 d-flex justify-content-between align-items-center">
                                                    {item.nombre} {item.apellido} - {item.empresa}
                                                </div>
                                                <div className="col-md-4 d-flex justify-content-end">

                                                    {/* link para hacer pedidos paso el id del  */}
                                                    <Link 
                                                        to={`/pedidos/nuevo/${id}`}
                                                        className="btn btn-warning d-block d-md-inline-block mr-2"
                                                        >
                                                        &#43; Nuevo pedido    
                                                    </Link>

                                                    <Link 
                                                        to={`/pedidos/${id}`}
                                                        className="btn btn-primary d-block d-md-inline-block mr-2"
                                                        >
                                                        Ver pedidos    
                                                    </Link>

                                                    <Mutation mutation={ELIMINAR_CLIENTE}
                                                        // para mandar el mensaje que viende desde el resolver
                                                        // lo que se configuro y tambien en el schema
                                                        onCompleted={(data) => {
                                                            // console.log(data)
                                                            this.setState({
                                                                alerta: {
                                                                    mostrar: true,
                                                                    mensaje: data.eliminarCliente
                                                                }
                                                            }, () => {
                                                                setTimeout(() => {
                                                                    // con este callback reseteo el estado
                                                                    //para eliminar el mensaje de alerta
                                                                    this.setState({
                                                                        alerta: {
                                                                            mostrar: false,
                                                                            mensaje: ''
                                                                        }
                                                                    })
                                                                }, 3000)
                                                            })
                                                        }}
                                                    >
                                                        {/* // paso la funcion del mutation, del resolver */}
                                                        {eliminarCliente => (
                                                            <button type="button"
                                                                className="btn btn-danger d-block d-md-inline-block mr-2"
                                                                //evento para obtener el id del que vamos a eliminar
                                                                onClick={() => {
                                                                    // console.log(item.id)
                                                                    if (window.confirm('Seguro que deseas eliminar este cliente?')) {
                                                                        eliminarCliente({
                                                                            //mando la variable como objeto
                                                                            variables: { id }
                                                                        })
                                                                    }
                                                                }}
                                                            >
                                                                &times;Eliminar
                                                </button>
                                                        )}
                                                    </Mutation>  
                                                    <Link to={`/clientes/editar/${item.id}`} className="btn btn-success d-block d-md-inline-block">
                                                        Editar cliente
                                        </Link>

                                                </div>
                                            </div>
                                        </li>)
                                })}
                            </ul>

                            <Paginador
                                actual={this.state.paginador.actual}
                                // llamo el total de clientes queri
                                totalClientes={data.totalClientes}
                                //paso el limite para regular el paginador la cantidad
                                limite={this.limite}
                                //paso los metodos
                                paginaAnterior={this.paginaAnterior}
                                paginaSiguiente={this.paginaSiguiente}
                            />
                        </Fragment>
                    )
                }}
            </Query>
        )
    }
}

export default Clientes