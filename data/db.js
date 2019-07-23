import { Mongoose } from 'mongoose';

//llamamos por una promesa a mongoose
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/clientes', {useNewUrlParser: true} )

//definimos el schema de los clientes como estaran en la bd
const clientesSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    empresa: String,
    email: String,
    edad: Number,
    tipo: String,
    pedidos: Array
})

const Clientes = mongoose.model(', clienteSchema')

export { Clientes}