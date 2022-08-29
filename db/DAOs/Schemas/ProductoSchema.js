import mongoose from "mongoose";


const productoSchema = new mongoose.Schema({
    _id: { type: String, required: true, max: 50 },
    timestamp: { type: String, required: true, max: 50 },
    nombre: { type: String, required: true, max: 100 },
    descripcion: { type: String, required: true, max: 400 },
    codigo: { type: Number, required: true },
    foto: { type: String, required: true, max: 100 },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true }
})

export const productoModel = mongoose.model('productos', productoSchema)
