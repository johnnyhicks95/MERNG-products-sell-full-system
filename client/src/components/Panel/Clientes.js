import React from 'react'
import { Query } from 'react-apollo'
import { TOP_CLIENTES } from '../../queries'


// uso recharts para las graficas de clientes que mas dinero gastan comprando
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

//ejemplo de estructuda de datos en recharts

const datos = [
    {name:'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name:'Page B', uv: 3000, pv: 1398, amt: 2210}
]

const Clientes = ( ) => {
    return (
          <Query 
            query={TOP_CLIENTES}
          >
            { ( { loading, error, data } ) => {
                if (loading) return 'Cargando ...'
                if ( error ) return `Error ${error.message}`

                {/* console.log(data) */}
                
                const topClientesGrafica = []

                data.topClientes.map( ( pedido, index ) => {
                    topClientesGrafica[index] = {
                        ...pedido.cliente[0],
                        total: pedido.total
                    }
                } )
                {/* console.log(topClientesGrafica) */}

                return (
                    <BarChart width={600} height={300} data={topClientesGrafica}
                        margin={{top: 5, right: 30, left:20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="nombre" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="total" fill="#8884d8" />
                    </BarChart>
                )
            } }
          </Query>  
    )
}


export default Clientes 