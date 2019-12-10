import gql from 'graphql-tag'

export const NUEVO_CLIENTE = gql `
mutation crearCliente( $input: ClienteInput ) {
  crearCliente(input: $input ) {
    id 
    nombre
    apellido
  }
}
`

//del codigo probado del playground copio y pego el mutation
export const ACTUALIZAR_CLIENTE = gql`
  mutation actualizarCliente($input : ClienteInput){
    actualizarCliente(input: $input) {
      id
      nombre
      apellido
      edad
      empresa
      tipo
      emails {
        email
      }
    }
  }
`

//eliminar los datos del ciente por el id
export const ELIMINAR_CLIENTE = gql`
  mutation eliminarCliente($id: ID!) {
    eliminarCliente( id: $id )
  }
`

// del mutation para crear u nuevo producto
export const NUEVO_PRODUCTO = gql `
  mutation nuevoProducto($input : ProductoInput ){
    nuevoProducto( input: $input ) {
      id
      nombre
    }
}
`

// ELIMINAR PRODUCTO
export const ELIMINAR_PRODUCTO = gql`
  mutation eliminarProducto ($id : ID! ){
    eliminarProducto(id  :$id ) 
  }
`