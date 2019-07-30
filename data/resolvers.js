import mongoose from 'mongoose'
import { Clientes } from './db'
import { rejects } from 'assert'


export const resolvers = {
    //con la configuracion de graphql-tools para mapear elementos
    Query: {

        //para enlistar todos los clientes
        getClientes: ( root, { limite }) => {
            return Clientes.find( {} ).limit(limite)
        },

        //trae un cliente segun el modelo de mongoose
        getCliente: ( root, { id }) => {
            return new Promise ( (resolve, object) => {
                //llamamos por el id y pasamos el error, pero si
                //la coneccion es exitosa trae los datos del cliente
                Clientes.findById(id, (error, cliente) => {
                    if(error) rejects(error)
                    else resolve(cliente)
                })
            } )
        },
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
                    {_id: input.id},
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
            return new Promise( (resolve, object ) => {
                Clientes.findOneAndRemove( {_id: id }, (error ) =>{
                    if (error) rejects (error)
                    else resolve("El dato del cliente se eliminó correctamente")
                } )
            })
        }


    }
}