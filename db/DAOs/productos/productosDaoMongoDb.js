import { productoModel } from "./../Schemas/index.js"
import { MongoDb } from "./../../Connections/index.js"

export class Productos extends MongoDb {

    constructor() {
        super();
        this.connect = MongoDb.getInstance();
    }

    async getAll() {
        return await productoModel.find({});
    }

    async getById(id) {
        const result = await productoModel.find({ _id: id }).limit(1)
        return result[0];
    }

    async addProduct(product) {
        const productToSave = new productoModel(product)
        await productToSave.save()
        return true;
    }

    async modifyProduct(product) {
        const {
            _id,
            nombre,
            descripcion,
            codigo,
            precio,
            stock,
            foto } = product
        await productoModel.updateOne({ _id: _id }, {
            $set: {
                nombre: nombre,
                descripcion: descripcion,
                codigo: codigo,
                precio: precio,
                stock: stock,
                foto: foto,
            }
        })
        return true;
    }

    async deleteProduct(id) {
        await productoModel.deleteOne({ _id: id })
        return true;
    }

    async updateStock(id, qty) {
        const result = await productoModel
            .find({ _id: id }).limit(1)
        let qant = result[0].stock - (qty)

        await productoModel.findOneAndUpdate(
            { _id: id }, { $set: { stock: qant } })
    }

    async checkStock(products) {
        let outStock = [];

        for (let i = 0; i < products.length; i++) {
            const prod = await productoModel
                .find({ _id: products[i].id })
                .where('stock')
                .lt(products[i].cantidad)
            if (prod.length > 0)
                outStock = [...outStock, products[i]]
        }

        if (outStock.length === 0) {
            products.forEach(prod => {
                this.updateStock(prod.id, prod.cantidad)
            })
        }
        return outStock;


    }
}
