import fs from 'fs'
import { Files } from './../../Connections/index.js'


export class Carritos extends Files {

    constructor() {
        super()
    }

    async readFile() {
        try { return JSON.parse(await fs.promises.readFile(this.carritos, 'utf-8')) }
        catch (err) { throw new Error('No se ha podido leer la DB de los carritos') }
    }

    async writeFile(file) {
        await fs.promises.writeFile(this.carritos, JSON.stringify(file, null, 2), async (err) => {
            if (err) console.log('Error al grabar el item en la DB', err);
            else console.log('Item agregado exitosamente');
        })
    }

    async locateCart(user) {
        const list = await this.readFile()
        const result = list.find(cart =>
            cart.user === user && !cart.selled);
        return result;
    }

    async createCart(cart) {
        let list = await this.readFile();
        list = [cart, ...list];
        const success = await this.writeFile(list);
        if (success) {
            return cart;
        }
    }

    async oneToCart(id_cart, id_prod) {
        const carts = await this.readFile();
        const index = carts.findIndex(cart => cart.id === id_cart);

        const indexProd = carts[index].productos.findIndex(prod => prod.id === id_prod);
        carts[index].productos[indexProd].cantidad++
        await this.writeFile(carts)
        return true;
    }

    async addToCart(user, order) {
        const carts = await this.readFile();
        const cart = await this.locateCart(user);
        cart.productos = [...cart.productos, order];

        let list = await carts.filter(item => item.id !== cart.id)
        list = [cart, ...list]
        await this.writeFile(list)
        return true;
    }

    async modifyCart(user, order) {
        const carts = await this.readFile();
        const cart = await this.locateCart(user);

        const index = cart.productos.findIndex(prod => prod.id === order.id)
        cart.productos[index].cantidad += order.cantidad;

        let list = carts.filter(item => item.id !== cart.id)
        list = [cart, ...list]
        await this.writeFile(list)
        return true;
    }

    async removeToCart(id_cart, id_prod) {
        let carts = await this.readFile();
        const cart = carts.find(item => item.id === id_cart);
        cart.productos = cart.productos.filter(item => item.id !== id_prod);

        carts = carts.filter(item => item.id !== id_cart);
        carts = [cart, ...carts]
        await this.writeFile(carts);
        return true;
    }

    async closeOrder(id) {
        const carts = await this.readFile();
        const index = carts.findIndex(cart => cart.id === id)

        carts[index].selled = true;
        await this.writeFile(carts)
        return true;
    }
}



