import gql from 'graphql-tag'

export const CLIENTES_QUERY = gql`
  query getClientes($limite: Int, $offset: Int){
    getClientes(limite: $limite, offset:$offset){
        id
        nombre
        apellido
        empresa
      }
      totalClientes
    }
`

export const CLIENTE_QUERY = gql`
query ConsultarCliente($id:ID){
    getCliente(id: $id){
      id
      nombre
      apellido
      empresa
      edad
      tipo
      emails{
        email
      }
    }
  }
`

// PRODUCTOS
export const OBTENER_PRODUCTOS = gql `
query {
  obtenerProductos {
    id
    nombre
    precio
    stock
  }
}
`