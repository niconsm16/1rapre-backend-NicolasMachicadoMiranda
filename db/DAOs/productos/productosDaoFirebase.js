import { Firebase } from "./../../Connections/index.js";
import admin from "firebase-admin";


export class Productos extends Firebase {

    constructor() {
        super();
        this.connect = Firebase.getInstance;
        this.db = admin.firestore()
        this.collection = this.db.collection('productos')
    }

    async getAll() {
        try { return await this.collection.get() }
        catch (err) { console.log('Firebase error: ', err) }
    }

    async getById(id) {
        try { return await this.collection.doc(id).get() }
        catch (err) { console.log('Firebase error: ', err) }
    }

    async addProduct(product) {
        try {
            const doc = this.collection.doc(product._id)
            await doc.create(product)
            return true;
        } catch (err) { console.log('Firebase error: ', err) }
    }

    async modifyProduct(product) {
        try {
            await this.collection
                .doc(product._id)
                .update(product)
            return true;
        } catch (err) { console.log('Firebase error: ', err) }
    }

    async deleteProduct(id) {
        try {
            await this.collection.doc(id).delete()
            return true;
        } catch (err) { console.log('Firebase error: ', err) }
    }

    async updateStock(id, qty) {
        await this.collection
            .doc(id)
            .update('stock',
                admin.firestore.FieldValue
                    .increment(-(qty)))
    }

    async checkStock(products) {
        let outStock = [];
        for (let i = 0; i < products.length; i++) {
            let product = await this.collection
                .doc(products[i].id)
                .get()
            if (products[i].cantidad > product.stock)
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
