import fs from 'fs'
import { Files } from "./../../Connections/index.js";


export class Productos extends Files {

    constructor() {
        super()
    }

    // Leer el archivo
    async readFile() {
        try { return JSON.parse(await fs.promises.readFile(this.productos, 'utf-8')) }
        catch (err) { throw new Error('No se ha podido leer la DB de los productos') }
    }

    // Escribir archivo
    async writeFile(file) {
        await fs.promises.writeFile(this.productos, JSON.stringify(file, null, 2), async (err) => {
            if (err) console.log('Error al grabar el item en la DB', err);
            else console.log('Item agregado exitosamente');
        })
        return true;
    }

    async getAll() {
        try { return await this.readFile() }
        catch (err) { throw new Error('No se ha podido traer los productos de la DB') }
    }

    async getById(id) {
        try {
            const products = await this.readFile()
            return products.find(prod => prod.id === id)
        }
        catch (error) { throw new Error('No se ha podido encontrar/leer/interpretar la DB') }
    }

    async addProduct(item) {
        try {
            const products = await this.readFile()
            if (!products.some(prod => prod.id === item.id)) {
                const list = [...products, item]
                return await this.writeFile(list)
            }
        }
        catch (error) { throw new Error('No se pudo agregar el producto') }
    }

    async modifyProduct(product) {
        try {
            const products = await this.readFile()
            const timestamp = products.find(prod => prod.id === product.id).timestamp
            product = { ...product, timestamp }

            let list = products.filter(prod => prod.id !== product.id)
            list = [product, ...list]
            return await this.writeFile(list)
        }
        catch (error) { throw new Error('No se ha podido procesar la operacion') }
    }

    async deleteProduct(id) {
        try {
            const products = await this.readFile()
            let list = products.filter(prod => prod.id !== id)
            return await this.writeFile(list)
        }
        catch (err) { throw new Error('No se ha podido encontrar/leer/interpretar la DB') }
    }

    async updateStock(id, qty) {
        const list = await this.readFile();
        const index = list.findIndex(prod => prod.id === id)
        list[index].stock -= qty;
        await this.writeFile(list)
    }

    async checkStock(products) {
        const list = await this.readFile();

        let outStock = products.filter(item =>
            list.find(prod => prod.id === item.id &&
                item.cantidad > prod.stock))

        if (outStock.length === 0) {
            products.forEach(prod => {
                this.updateStock(prod.id, prod.cantidad)
            })
        }

        return outStock;
    }
}