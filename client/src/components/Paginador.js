import React, { Component } from 'react'

//Componente que nos dira cuantas paginas vamos a tener
class Paginador extends Component {
    state= {
        // desde el state manejo el paginador
        paginador : {
            paginas: Math.ceil( Number (this.props.totalClientes) / this.props.limite  )
        }
      }
    render( ){

        const { actual } = this.props
        const btnAnterior = (actual >1)
            ? <button type="button" className="btn btn-success mr-2"
                onClick={this.props.paginaAnterior}
                >&laquo;Anterior</button>
            : ''

        //boton siguiente
        const { paginas } = this.state.paginador
        const btnSiguiente = (actual !== paginas)
        ? <button type="button" className="btn btn-success"
            onClick={this.props.paginaSiguiente}
            >Siguiente &laquo;</button>
        : ''

        // guardo en una cosntante el algoritmo de division de paginas
        // const paginas = this.props.totalClientes / 10
        // console.log(paginas )

        return (
            <div className="mt-5 d-flex justify-content-center">
                {/* este boton solo aparecer de la pagina 2 en adelante */}
                {btnAnterior }
                {btnSiguiente}
            </div>
        )
    }
}

export default  Paginador