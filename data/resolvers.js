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
        crearCliente: ({ root, input }) => {
            // viene desde debugger.js el objeto clientes
            const nuevocliente = Clientes({
                nombre: input.nombre,
                apellido: input.apellido,
                empresa: input.empresa,
                email: input.email,
                edad: input.edad,
                tipo: input.tipo,
                pedidos: input.pedidos,
            })
            nuevocliente.id = nuevoCliente._id
             
            // Promesa para guardar en bd y recibe un callbak
            return new Promise((resolve, object) => {
                nuevoCliente.save((error) => {
                    if(error) rejects(error)
                    else resolvers(nuevocliente)
                })
            })
        }
    }
}