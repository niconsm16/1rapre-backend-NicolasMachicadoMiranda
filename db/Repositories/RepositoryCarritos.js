import { DbAdapter } from "./../Adapters/dbAdapter.js";
import { FactoryCarritos } from "./../Factories/index.js";


export class RepositoryCarritos {

    #factory;
    #adapter;

    constructor() {
        this.#factory = FactoryCarritos.carritos()
            .then(Factory => { return new Factory() })
        this.#adapter = new DbAdapter();
    }

    async locateCart(user) {
        let dao = await (await this.#factory).locateCart(user);
        dao = this.#adapter.locateCartAdapter(dao);
        return dao;
    }

    async createCart(user) {
        user = this.#adapter.idCarritosAdapter(user)
        let dao = await (await this.#factory).createCart(user);
        dao = this.#adapter.idCarritosAdapter(dao)
        return dao;
    }

    async oneToCart(id_cart, id_prod) {
        const dao = (await this.#factory).oneToCart(id_cart, id_prod);
        return dao;
    }

    async addToCart(user, order) {
        order = this.#adapter.idCarritosAdapter(order)
        const dao = (await this.#factory).addToCart(user, order);
        return dao;
    }

    async modifyCart(user, order) {
        order = this.#adapter.idCarritosAdapter(order)
        const dao = await (await this.#factory).modifyCart(user, order)
        return dao;
    }

    async removeToCart(id_cart, id_product) {
        const dao = await (await this.#factory).removeToCart(id_cart, id_product);
        return dao;
    }

    async closeOrder(id) {
        const dao = await (await this.#factory).closeOrder(id);
        return dao;
    }
}
