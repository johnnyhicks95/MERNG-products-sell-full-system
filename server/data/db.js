import mongoose from 'mongoose';

//llamamos por una promesa a mongoose
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/clientes', {useNewUrlParser: true} )

//para resolver el error setFindAndModify
// mongoose.set('setFindAndModify', false )  : update29 marzo 2020:co digo de un bug que mandaba error, ya no

//definimos el schema de los clientes como estaran en la bd
const clientesSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    empresa: String,
    emails: Array,
    edad: Number,
    tipo: String,
    pedidos: Array
})

const Clientes = mongoose.model('clientes', clientesSchema)

/*  ************
    modelo de datos : Productos 
*/
const productosSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    stock: Number
})
// creo referencia de productos de una nueva tabla
const Productos = mongoose.model('productos', productosSchema)

// Pedidos ******
const pedidosSchema = new mongoose.Schema ({
    // EL ID SE crea automaticamente gracias a mongoose
    pedido: Array,
    total: Number,
    fecha: Date,
    cliente: String,
    estado: String
})
const Pedidos = mongoose.model('pedidos', pedidosSchema)

export { Clientes, Productos, Pedidos }