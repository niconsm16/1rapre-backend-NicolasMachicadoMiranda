import { v4 as uuid } from 'uuid'
import { RepositoryProductos } from '../db/Repositories/index.js';


export class ServicesProductos {

    #repository;

    constructor() {
        this.#repository = new RepositoryProductos();
    }

    async getProducts() {
        return await this.#repository.getAll();
    }

    async getProduct(id) {
        return await this.#repository.getById(id);
    }

    async addItem(product) {
        product = {
            ...product,
            id: uuid(),
            timestamp: new Date()
                .toLocaleString()
        }
        return await this.#repository.addProduct(product)
    }

    async modifyItem(id, product) {
        product = { id, ...product }
        return await this.#repository.modifyProduct(product)
    }

    async delItem(id) {
        return await this.#repository.deleteProduct(id)
    }
}
