import knex from 'knex'
import mongoose from 'mongoose'
import admin from 'firebase-admin'

export const databases = {

    files: {
        productos: './public/productos.json',
        carrito: './public/carrito.json'
    },
}