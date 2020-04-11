import React from 'react'
import { Query } from 'react-apollo'
import { TOP_VENDEDORES } from '../../queries'


// uso recharts para las graficas de clientes que mas dinero gastan comprando
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

//ejemplo de estructuda de datos en recharts

/* const datos = [
    {name:'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name:'Page B', uv: 3000, pv: 1398, amt: 2210}
] */

const Vendedores = ( ) => { 
    return (
          <Query 
            query={TOP_VENDEDORES}
          >
            { ( { loading, error, data } ) => {
                if (loading) return 'Cargando ...'
                if ( error ) return `Error ${error.message}`

                {/* console.log(data) */}
                
                const vendedoresGrafica = []

                data.topVendedores.map( ( vendedor, index ) => {
                    vendedoresGrafica[index] = {
                        ...vendedor.vendedor[0],
                        total: vendedor.total
                    }
                } )
                {/* console.log(vendedoresGrafica) */}

                return (
                    <BarChart width={600} height={300} data={vendedoresGrafica}
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


export default Vendedores 