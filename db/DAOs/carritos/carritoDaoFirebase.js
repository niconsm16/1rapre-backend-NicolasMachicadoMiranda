import { Firebase } from "./../../Connections/index.js";
import admin from 'firebase-admin'


export class Carritos extends Firebase {

    constructor() {
        super();
        this.connect = Firebase.getInstance;
        this.db = admin.firestore()
        this.collection = this.db.collection('carritos')
    }

    async createCart(cart) {
        await this.collection.doc(cart._id).create(cart)
        return cart
    }

    async locateCart(user) {
        let query = await this.collection
            .where('user', '==', user)
            .where('selled', '==', false)
            .get()
        if (query.docs[0])
            return query.docs[0].data()
        else return false
    }

    async addToCart(user, order) {
        const { _id } = await this.locateCart(user)
        await this.collection
            .doc(_id)
            .update('productos',
                admin.firestore.FieldValue.arrayUnion(order),
                { merge: true })
        return true;
    }

    async oneToCart(id_cart, id_prod) {
        let temp = [];
        let productos = await this.collection
            .doc(id_cart)
            .get()
        productos = productos.data().productos.forEach(prod => {
            if (prod._id === id_prod) prod.cantidad++
            temp = [...temp, prod]
        })
        await this.collection
            .doc(id_cart)
            .update('productos', temp)
        return true;
    }

    async modifyCart(user, order) {
        const { _id, productos } = await this.locateCart(user)
        let temp = [];
        productos.forEach(prod => {
            if (prod._id === order._id) {
                prod.cantidad += order.cantidad
            }
            temp = [...temp, prod]
        })
        await this.collection
            .doc(_id)
            .update('productos', temp)
        return true;
    }

    async removeToCart(id_cart, id_prod) {
        let productos = await this.collection
            .doc(id_cart)
            .get()
        productos = productos.data()
            .productos.filter(prod =>
                prod._id !== id_prod)
        await this.collection
            .doc(id_cart)
            .update('productos', productos)
        return true;
    }

    async closeOrder(id) {
        this.collection.doc(id)
            .update('selled', true)
        return true;
    }
}