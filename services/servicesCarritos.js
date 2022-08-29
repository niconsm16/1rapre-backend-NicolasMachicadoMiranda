import { v4 as uuid } from 'uuid'
import { Notifications } from './../config/Admin/index.js'
import { RepositoryProductos, RepositoryCarritos, RepositoryLogin } from '../db/Repositories/index.js';


export class ServicesCarritos {

    #notifications;
    #repository;
    #productos;
    #login;

    constructor() {
        this.#notifications = new Notifications();
        this.#repository = new RepositoryCarritos();
        this.#productos = new RepositoryProductos();
        this.#login = RepositoryLogin.getInstance;
    }

    async listCart(user) {
        const exist = await this.#repository.locateCart(user)
        return exist ? exist
            : await this.createCart(user)
    }

    async createCart(user) {
        const cart = {
            id: uuid(), user,
            timestamp: new Date().toLocaleString(),
            selled: false, productos: []
        }
        return await this.#repository.createCart(cart)
    }

    async addOneItem(id_cart, id_prod) {
        return await this.#repository.oneToCart(id_cart, id_prod)
    }

    async addItems(user, order) {
        const cart = await this.listCart(user)
        const exist = cart.productos.find(prod => prod.id === order.id)
        return exist
            ? this.#repository.modifyCart(user, order)
            : this.#repository.addToCart(user, order)
    }

    async deleteItem(id_cart, id_prod) {
        return await this.#repository.removeToCart(id_cart, id_prod);
    }

    async closeCart(user, id_cart, totals) {
        const order = await this.#repository.locateCart(user);
        const outStock = await this.#productos.checkStock(order.productos);

        if (!outStock) {
            const buyer = await this.#login.findUser(user, true)
            const closeOrder = await this.#repository.closeOrder(id_cart);
            if (closeOrder)
                return await this.buyNotification(id_cart, buyer, order, totals)
        }
        else return { error: true, list: outStock }
    }

    async buyNotification(id, buyer, order, totals) {
        const okMail = await this.#notifications.mailCarrito(buyer, order, totals)
        const okAdminSms = await this.#notifications.smsCarrito(buyer.user)

        // Twilio ahora pide verificar todos los números, por ende genera error para números no verificados
        // const okBuyerSms = await this.#notifications.smsBuyer(buyer.tel, id)

        if (okMail && okAdminSms)
            return { id }
    }
}
