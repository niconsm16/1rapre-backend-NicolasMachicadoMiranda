import mongoose from "mongoose";


const usuarioSchema = new mongoose.Schema({
    user: { type: String, required: true, max: 50 },
    pass: { type: String, required: true, max: 25 },
    name: { type: String, required: true, max: 75 },
    address: { type: String, required: true, max: 75 },
    age: { type: String, required: true, max: 10 },
    tel: { type: String, required: true, max: 20 },
})

export const usuarioModel = mongoose.model('usuarios', usuarioSchema)
