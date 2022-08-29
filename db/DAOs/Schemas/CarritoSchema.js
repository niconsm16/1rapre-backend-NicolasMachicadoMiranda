import mongoose from "mongoose";


const productosSchema = new mongoose.Schema({
    _id: { type: String, required: true, max: 50 },
    nombre: { type: String, required: true, max: 75 },
    timestamp: { type: String, required: true, max: 50 },
    descripcion: { type: String, required: true, max: 400 },
    codigo: { type: Number, required: true },
    foto: { type: String, required: true, max: 100 },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    cantidad: { type: Number, required: true },
})

const carritoSchema = new mongoose.Schema({
    _id: { type: String, required: true, max: 50 },
    timestamp: { type: String, required: true, max: 50 },
    user: { type: String, required: true, max: 100 },
    selled: { type: Boolean, required: true },
    productos: [productosSchema]
})

export const carritoModel = mongoose.model('carritos', carritoSchema)
