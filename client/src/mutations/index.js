import gql from 'graphql-tag'

export const NUEVO_CLIENTE = gql`
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
export const NUEVO_PRODUCTO = gql`
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
// para actualizar producto desde el formulario
export const ACTUALIZAR_PRODUCTO = gql`
  mutation actualizarProducto ($input : ProductoInput){
  actualizarProducto(input :$input ) {
    nombre
    precio
    stock
  }
}
 `

// **********
// PEDIDOS
export const NUEVO_PEDIDO = gql`
  mutation nuevoPedido($input: PedidoInput){
  nuevoPedido(input: $input ){
    id
    # total
    # fecha
    # pedido{    
    #   cantidad
    #   id
    # }
    
  }
}
 `

 export const ACTUALIZAR_ESTADO = gql`
  mutation actualizarEstado($input : PedidoInput ){
    actualizarEstado( input: $input )
  }
 `


 //  USUARIOS
 export const NUEVO_USUARIO = gql `
 mutation crearUsuario($usuario: String!, $nombre: String! ,$password: String!, $rol: String! ){
   crearUsuario(usuario: $usuario, password: $password )
 }
 `

 // autenticar usuario con token, crear un tiempo de sesion; lo mando al login
 export const AUTENTICAR_USUARIO = gql`
 mutation autentuzarUsuario( $usuario: String!, $password: String! ) {
   autenticarUsuario(usuario: $usuario, nombre: $nombre ,password: $password, rol: $rol ){
     token
   }
 }
 `
