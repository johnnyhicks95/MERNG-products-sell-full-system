//Creamos una clase para crear nuevos clientes
class Cliente {
    constructor(id, {nombre, apellido, empresa,
         email, edad, tipo }){
        this.id = id
        this.nombre = nombre
        this.apellido = apellido
        this.empresa = empresa
        this.email = email
        this.edad = edad
        this.tipo = tipo
    }
}

const clientesDB = {}

//definimos el resolver
const resolvers  = {
    getCliente: ({id}) => {
        return new Cliente(id, clientesDB[id])
    },

    crearCliente: ({ input }) => {
        const id = require('crypto').randomBytes(10).toString('hex')
        // codigo solamente de ejemplo guarandose en memoria
        clientesDB[id] = input
        return new Cliente(id, input)
    }
}

export default resolvers