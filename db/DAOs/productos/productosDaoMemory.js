import { Memory } from "../../Connections/index.js";


export class Productos extends Memory {

    constructor() {
        super();
    }

    async getAll() {
        return Memory.productos
    }

    async getById(id) {
        const result = Memory.productos.find(product => product.id === id)
        return result
    }

    async addProduct(product) {
        Memory.productos = [product, ...Memory.productos];
        return true;
    }

    async modifyProduct(product) {
        const getProduct = Memory.productos.find(prod => prod.id === product.id)
        product = { id: product.id, timestamp: getProduct.timestamp, ...product }
        let filterList = Memory.productos.filter(prod => prod.id !== product.id)
        Memory.productos = [product, ...filterList]
        return true;
    }

    async deleteProduct(id) {
        this.productos = Memory.productos.filter(prod => prod.id !== id)
        return true;
    }

    async updateStock(id, qty) {
        let index = Memory.productos.findIndex(prod => prod.id === id)
        Memory.productos[index].stock -= qty
    }

    async checkStock(products) {
        let outStock = products.filter(item =>
            Memory.productos.find(prod => (
                prod.id === item.id && item.cantidad > prod.stock)))

        if (outStock.length === 0) {
            products.forEach(prod => {
                this.updateStock(prod.id, prod.cantidad)
            })
        }
        return outStock;
    }
}