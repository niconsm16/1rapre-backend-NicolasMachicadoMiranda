import { carritoModel } from "./../Schemas/index.js"
import { MongoDb } from '../../Connections/index.js'


export class Carritos extends MongoDb {

    constructor() {
        super();
        this.connect = MongoDb.getInstance();
    }

    async locateCart(user) {
        const cart = await carritoModel.find({ user: user, selled: false }).limit(1)
        if (cart.length > 0) return cart[0]
        else return false;
    }

    async createCart(cart) {
        const cartToSave = new carritoModel(cart)
        await cartToSave.save()
        return cart;
    }

    async oneToCart(id_cart, id_prod) {

        const result = await carritoModel.findOne(
            {
                $and: [
                    { _id: id_cart },
                    { "productos.id": id_prod }]
            })
        let qty = result.productos
            .find(prod => prod.id === id_prod).cantidad
        qty++

        await carritoModel.updateOne({
            $and: [
                { _id: id_cart },
                { "productos._id": id_prod }]
        },
            { $set: { "productos.$.cantidad": qty } })
        return true;
    }

    async addToCart(user, order) {
        const cart = await this.locateCart(user)
        await carritoModel
            .updateOne(
                { _id: cart._id },
                { $push: { productos: order } }
            )
        return true;
    }

    async modifyCart(user, order) {
        const cart = await this.locateCart(user)
        const { cantidad } = await cart.productos
            .find(item => item._id === order._id)
        order.cantidad += cantidad

        await carritoModel.updateOne({
            $and: [
                { _id: cart._id },
                { "productos._id": order._id }
            ]
        }, {
            $set: {
                "productos.$.cantidad": order.cantidad
            }
        })
        return true;
    }

    async removeToCart(id_cart, id_prod) {
        await carritoModel.updateOne({ _id: id_cart },
            { $pull: { productos: { _id: id_prod } } }
        )
        return true;
    }

    async closeOrder(id) {
        await carritoModel.findOneAndUpdate(
            { $and: [{ _id: id }] },
            { $set: { "selled": true } })
        return true;
    }
}

