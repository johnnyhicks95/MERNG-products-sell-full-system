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