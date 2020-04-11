import mongoose from 'mongoose'
import { Clientes, Productos, Pedidos, Usuarios } from './db'
import { rejects } from 'assert'
import bcrypt from 'bcrypt'

// generar token
import dotenv from 'dotenv'
dotenv.config({ path: 'variables.env' })

import jwt from 'jsonwebtoken'
// toma 3 parametros: el usuario, llave secreta, expira
const crearToken = ( usuarioLogin, secreto, expiresIn ) => {
    const { usuario } = usuarioLogin

    return jwt.sign( {usuario}, secreto, { expiresIn } )
}


export const resolvers = {
    //con la configuracion de graphql-tools para mapear elementos
    Query: {

        //para enlistar todos los clientes
        //paso offset para la paginacion
        getClientes: (root, { limite, offset }) => {
            //limit es un metodo de mongoose
            // metodo skip con el offset
            return Clientes.find({}).limit(limite).skip(offset)
        },

        //trae un cliente segun el modelo de mongoose
        getCliente: (root, { id }) => {
            return new Promise((resolve, object) => {
                //llamamos por el id y pasamos el error, pero si
                //la coneccion es exitosa trae los datos del cliente
                Clientes.findById(id, (error, cliente) => {
                    if (error) rejects(error)
                    else resolve(cliente)
                })
            })
        },

        //una nueva consulta para obtener el total de clientes en la bd
        totalClientes: (root) => {
            return new Promise((resolve, reject) => {
                //Del modelo clientes usamos un metodo de mongoose para saber el total de datos
                Clientes.countDocuments({}, (error, count) => {
                    if (error) rejects(error)
                    else resolve(count)
                })
            })
        },

        //***********de los productos******* */
        // agrego stock para validacion de cantidad al hacer pedido
        obtenerProductos: (root, { limite, offset, stock }) => {
            let filtro
            if (stock) {                     // srock son los productos en existencia
                filtro = { stock: { $gt: 0 } } // me traigo los productos en stock mayor que cero
            }
            return Productos.find(filtro).limit(limite).skip(offset)
        },
        // un solo producto como consulta a mongo
        obtenerProducto: (root, { id }) => {
            return new Promise((resolve, object) => {
                Productos.findById(id, (error, producto) => {
                    // producto es el resultado de la consulta
                    if (error) rejects(error)
                    else resolve(producto)
                })
            })
        },
        //una nueva consulta para obtener el total de clientes en la bd
        totalProductos: (root) => {
            return new Promise((resolve, reject) => {
                //Del modelo clientes usamos un metodo de mongoose para saber el total de datos
                Productos.countDocuments({}, (error, count) => {
                    if (error) rejects(error)
                    else resolve(count)
                })
            })
        },


        // PARA LOS PEDIDOS  -  cliente : es el filtro(payload)
        obtenerPedidos: (root, { cliente }) => {
            return new Promise((resolve, object) => {
                // mongoose:   cliente(filtro) : Cliente( que deseamos buscar)
                Pedidos.find({ cliente: cliente }, (error, pedido) => {
                    if (error) rejects(error)
                    else resolve(pedido)
                })
            })
        },


        // LA CONSULTA A MONGO PARA CREAR LA GRAFICA
        // DE CLIENTES QUE GASTAN MAS EN PRODUCTOS
        topClientes: (root) => {
            return new Promise((resolve, object) => {
                Pedidos.aggregate([    // codigo de mongo db, Pedidos viene de db.js
                    {
                        $match: { estado: "COMPLETADO" } // HACE EL FILTRO A BUSCAR
                    },
                    {
                        $group: {
                            _id: "$cliente",
                            total: { $sum: "$total" }  //
                        }
                    },
                    {
                        $lookup: {             //hace una relacion entre tablas, deben ser mismo tipo
                            // crea una nueva tabla de consulta
                            from: "clientes",
                            localField: '_id',
                            foreignField: '_id',
                            as: 'cliente'
                        }
                    },
                    {
                        $sort: { total: -1 }      // para que se ordene descendentemente
                        // desde el mas grande
                    },
                    {
                        $limit: 10    // cuantos resultados se quiere obtener
                    }
                ], (error, resultado) => {
                    if (error) rejects(error)
                    else resolve(resultado)
                })
            })
        },

        // para la verificacion de usuarios a traves del token 
        // enviado del frontend a lback
        obtenerUsuario: ( root, args, { usuarioActual } ) => {
            // usuarioActual es el usuario que obtenemos el token
            if( !usuarioActual ){
                return null
            }
            console.log(usuarioActual);

            // obtener el usuario actual del request JWT verificado
            const usuario = Usuarios.findOne( { usuario: usuarioActual.usuario } )
            return usuario
            
        }
    },

    Mutation: {
        crearCliente: (root, { input }) => {
            // viene desde debugger.js el objeto clientes
            const nuevoCliente = Clientes({
                nombre: input.nombre,
                apellido: input.apellido,
                empresa: input.empresa,
                emails: input.emails,
                edad: input.edad,
                tipo: input.tipo,
                pedidos: input.pedidos
            })
            nuevoCliente.id = nuevoCliente._id

            // Promesa para guardar en bd y recibe un callbak
            return new Promise((resolve, object) => {
                nuevoCliente.save((error) => {
                    if (error) rejects(error)
                    else resolve(nuevoCliente)
                })
            })
        },

        // nombre igual que el schema.graphql, para actualizar cliente
        actualizarCliente: (root, { input }) => {
            return new Promise((resolve, object) => {
                // con un metodo de mongoose buscamos el _id de mongo
                // filtro, valor ,opciones  -new true crea un archivo nuevo si no tiene ese id
                Clientes.findOneAndUpdate(
                    // primero selecciona el filtro en este caso el id de la bd en mongo
                    { _id: input.id },
                    input,
                    // true si el registro no existe crea uno nuevo
                    { new: true },
                    (error, cliente) => {
                        if (error) rejects(error)
                        else resolve(cliente)
                    }
                )
            })
        },

        //Mutation para eliminar cliente por id segun schema.graphql
        eliminarCliente: (root, { id }) => {
            return new Promise((resolve, object) => {
                Clientes.findOneAndDelete({ _id: id }, (error) => {
                    if (error) rejects(error)
                    else resolve("El dato del cliente se eliminó correctamente")
                })
            })
        },


        /* *************
        Nuevos Productos

        ************ */
        nuevoProducto: (root, { input }) => {
            const nuevoProducto = new Productos({ // Modelos: es el modelo descrito en db.js
                nombre: input.nombre,
                precio: input.precio,
                stock: input.stock
            })

            // mongoDB crea el ID que se asigna al objeto
            nuevoProducto.id = nuevoProducto._id;

            return new Promise((resolve, object) => {
                // para guardar en la base de datos
                nuevoProducto.save((error) => {
                    if (error) rejects(error)
                    else resolve(nuevoProducto)
                })
            })
        },

        // actualizar producto
        actualizarProducto: (root, { input }) => {
            return new Promise((resolve, producto) => {
                // { que se vaa actualizar} , con que quiero que actualize; si no existe, crealo, el callback
                // ( { 1 }, 2 , 3 , 4 )
                Productos.findOneAndUpdate({ _id: input.id }, input, { new: true }, (error, producto) => {
                    if (error) rejects(error)
                    else resolve(producto)
                })
            })
        },
        // ELIMINAR PRODUCTO
        eliminarProducto: (root, { id }) => {
            return new Promise((resolve, producto) => {
                Productos.findOneAndDelete({ _id: id }, (error) => {
                    if (error) rejects(error)
                    else resolve('El producto se elimino correctamente! ')
                })
            })
        },
        // NUEVO PEDIDO
        nuevoPedido: (root, { input }) => {
            const nuevoPedido = new Pedidos({  // Pedidos: es el modelo descrito en db.js
                // construyo el objeto
                pedido: input.pedido,
                total: input.total,
                fecha: new Date(), // genera la fecha actual
                cliente: input.cliente,
                estado: "PENDIENTE" // generar opciones segun caso, queda pendiente porque al crear un pedido esara pendiente
            })

            nuevoPedido.id = nuevoPedido._id // id para la bd

            // en las mutations usar siempre promesas, ahora creo el objeto
            return new Promise((resolve, object) => {

                nuevoPedido.save((error) => {
                    if (error) rejects(error)
                    else resolve(nuevoPedido)
                })
            })
        },

        actualizarEstado: (root, { input }) => {
            return new Promise((resolve, object) => {

                // console.log(input)
                const { estado } = input

                let instruccion
                if (estado === 'COMPLETADO') { // si el pedido esta completado se resta
                    instruccion = '-'
                } else if (estado === 'CANCELADO') { // si el pedido se cancela se suma
                    instruccion = '+'
                }

                // recorrer y actualziar la cantidad de productos
                // update 2: recorre y actualiza la cantidad de productos en base al 
                // estado del pedido
                input.pedido.forEach(pedido => {
                    Productos.updateOne(
                        { _id: pedido.id },
                        {
                            "$inc":  //inc (funcion de mongo): incrementa un campo especifico 
                                // { "stock":  -pedido.cantidad }  // va a restar la cantidad del stock   
                                { "stock": `${instruccion}${pedido.cantidad}` }  // va a restar la cantidad del stock segun estado 
                        }, function (error) {  // por ultimo recibe un callback para controlar errores 
                            if (error) return new Error(error)
                        }
                    )
                })


                // primero: filtro que va actualizar(id); segundo: objeto( que se va a actualizar), 
                // tercero: si no existe lo crea; cuarto: callback en caso de error o done
                Pedidos.findOneAndUpdate(
                    { _id: input.id },
                    input,
                    { new: true },
                    (error) => {
                        if (error) rejects(error)
                        else resolve('Se actualizo correctamente')
                    }
                )
            })
        },

        // va a ser una funcion asincrona para optimizar la busqueda
        crearUsuario: async (root, { usuario,nombre, password, rol  }) => {

            // resivar si un usuario contiene ese password
            // findOne: resvisa si al menos ha yun usuario con con ese usuario
            const existeUsuario = await Usuarios.findOne({ usuario })

            if (existeUsuario) {
                throw new Error('El usuario ya existe')
            }

            // Usuarios: viene de db.js
            const nuevoUsuario = await new Usuarios({
                usuario,
                nombre,
                password,
                rol
            }).save() // save: guardo en la base de datos

            // console.log(nuevoUsuario) // ver que recibe el server
            return "Usuario creado correctamente"
        },


        // Para comprobar si el usuario es correcto  JWT
        autenticarUsuario: async (root, { usuario, password }) => {
            const nombreUsuario = await Usuarios.findOne({ usuario }) // permite realizar la busqueda por usuario

            if (!nombreUsuario) {
                throw new Error('Usuario no encontrado  ') // revisa que el usuario no exista
            }

            // si el usuario existe revisa la contrase;a 
            const passwordCorrecto = await bcrypt.compare( 
                password, nombreUsuario.password )  // compara el password del front con el de la bd
            
            // si el password es incorrecto
            if ( !passwordCorrecto ){
                // return "Password incorrecto!"
                throw new Error('Password incorrecto! ')
            } 
            /* else {
                return "Password correcto! "
            } */
            return {
                token: crearToken( nombreUsuario, process.env.SECRETO, '3hr' )
            }
        }
    }
}