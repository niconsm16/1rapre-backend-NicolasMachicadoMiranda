import { Memory } from "../../Connections/index.js";
import { inspect } from 'util'

export class Carritos extends Memory {

    constructor() {
        super();
    }

    async locateCart(user) {
        const result = Memory.carritos.find(cart =>
            cart.user === user && !cart.selled);
        return result;
    }

    async createCart(cart) {
        Memory.carritos = [...Memory.carritos, cart];
        return cart;
    }

    async oneToCart(id_cart, id_prod) {
        const indexCart = Memory.carritos.findIndex(cart => cart.id === id_cart);
        const indexProd = Memory.carritos[indexCart].productos.findIndex(prod => prod.id === id_prod);
        Memory.carritos[indexCart].productos[indexProd].cantidad++;
        return true;
    }

    async addToCart(user, order) {
        const cart = await this.locateCart(user);
        cart.productos = [...cart.productos, order];
        return true;
    }

    async modifyCart(user, order) {
        let result = await this.locateCart(user);

        let item = result.productos.find(prod => prod.id === order.id);
        let items = result.productos.filter(prod => prod.id !== order.id);

        item = { ...item, cantidad: (item.cantidad + order.cantidad) };
        items = [...items, item];
        result.productos = items;

        Memory.carritos = Memory.carritos.filter(cart => cart.id !== result.id)
        Memory.carritos = [...Memory.carritos, result]
        return true;
    }

    async removeToCart(id_cart, id_prod) {
        const cart = Memory.carritos.find(cart => cart.id === id_cart);
        cart.productos = cart.productos.filter(prod => prod.id !== id_prod);

        Memory.carritos = Memory.carritos.filter(cart => cart.id !== id_cart)
        Memory.carritos = [...Memory.carritos, cart]
        return true;
    }

    async closeOrder(id_cart) {
        try {
            const index = Memory.carritos.findIndex(cart => cart.id === id_cart);
            Memory.carritos[index].selled = true;
            return true;
        }
        catch (err) { console.log('Error: No se pudo cerrar el carrito') }
    }
}