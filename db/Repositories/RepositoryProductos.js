import { DbAdapter } from "./../Adapters/dbAdapter.js";
import { ProductosDto } from "../DTOs/productosDto.js";
import { FactoryProductos } from "../Factories/index.js";


export class RepositoryProductos {

    #factory;
    #adapter;
    #dto;

    constructor() {
        this.#factory = FactoryProductos.productos()
            .then(Factory => { return new Factory() })
        this.#adapter = new DbAdapter();
        this.#dto = new ProductosDto();
    }

    async getAll() {
        let dao = await (await this.#factory).getAll()
        dao = this.#adapter.getAllAdapter(dao)
        return dao;
    }

    async getById(id) {
        let dao = await (await this.#factory).getById(id)
        dao = this.#adapter.getByIdAdapter(dao)
        return dao;
    }

    async addProduct(product) {
        product = this.#adapter.idProductosAdapter(product)
        const dao = await (await this.#factory).addProduct(product)
        return dao;
    }

    async modifyProduct(product) {
        product = this.#adapter.idProductosAdapter(product)
        const dao = await (await this.#factory).modifyProduct(product)
        return dao;
    }

    async deleteProduct(id) {
        const dao = await (await this.#factory).deleteProduct(id)
        return dao;
    }

    async updateStock(id, qty) {
        const dao = await (await this.#factory).updateStock(id, qty);
        return dao;
    }

    async checkStock(products) {
        const dao = await (await this.#factory).checkStock(products);
        const dto = await this.#dto.checkStock(dao)
        return dto
    }
}
