import mongoose from 'mongoose'
import { Clientes } from './db'
import { rejects } from 'assert'


export const resolvers = {
    //con la configuracion de graphql-tools para mapear elementos
    Query: {
        getCliente: ({ id }) => {
            return new Cliente(id, clientesDB[id])
        }
    },
    Mutation: {
        crearCliente: (root, { input }) => {
            // viene desde debugger.js el objeto clientes
            const nuevoCliente = Clientes({
                nombre: input.nombre,
                apellido: input.apellido,
                empresa: input.empresa,
                emails: input.email,
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
                    {_id: input.id},
                    input,
                    { new: true },
                    (error, cliente) => {
                        if (error) rejects(error)
                        else resolve(cliente)
                    }
                )
            })
        }
    }
}