import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

//llamamos por una promesa a mongoose
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/clientes', {
    useNewUrlParser: true,
    useUnifiedTopology: true // actualizacion de la version >= 3.1.0 de agosto 2019
} )

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
    // cliente: String,
    cliente: mongoose.Types.ObjectId, // 0.27 $lookup, graficas de ventas
    estado: String
})
const Pedidos = mongoose.model('pedidos', pedidosSchema)


// USUARIOS - autenticacion
const usuariosSchema = new mongoose.Schema({
    usuario: String,
    nombre: String,
    password: String,
    rol: String
})

// hashear los passwords antes de guardarlos en la base de datos
// pre: funcion antes de guardar en la base de datos
usuariosSchema.pre('save', function(next) {
    //si el password no esta modificado ejecutar la siguiente funcion
    if(!this.isModified('password')){
        return next() // next: pasa a la siguiente funcion
    }
    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err)
        
        // si si se pudo generar el salt entonces ejecuta
        // primero: que se hashea; segundo: el salt; tercero el callback: que hare con el hash
        bcrypt.hash(this.password, salt, ( err, hash) => {
            if(err) return next(err)

            // en aso de que no
            this.password = hash
            next() // que continue el codigo
        } )
    })
})

const Usuarios = mongoose.model('usuarios', usuariosSchema)

export { Clientes, Productos, Pedidos, Usuarios }