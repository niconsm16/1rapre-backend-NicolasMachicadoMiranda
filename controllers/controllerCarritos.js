import { ServicesCarritos } from "./../services/index.js"


export class ControllerCarritos {

    static services = new ServicesCarritos();

    constructor() { }

    async listItems(req, res) {
        const resp = await ControllerCarritos.services.listCart(req.session.passport.user)
        res.send(resp)
    }

    async oneToCart(req, res) {
        const resp = await ControllerCarritos.services.addOneItem(req.params.id, req.params.id_prod)
        resp
            ? res.status(200).send(resp)
            : res.status(400).send(false);
    }

    async addToCart(req, res) {
        const resp = await ControllerCarritos.services.addItems(req.session.passport.user, req.body)
        resp
            ? res.status(200).send(resp)
            : res.status(400).send(false);
    }

    async deleteToCart({ params }, res) {
        const resp = await ControllerCarritos.services.deleteItem(params.id, params.id_prod)
        resp
            ? res.status(200).send(resp)
            : res.status(400).send(false);
    }

    async purchaseCart(req, res) {
        const info = await ControllerCarritos.services.closeCart(
            req.session.passport.user, req.params.id, req.body)
        info.error
            ? res.status(403).send(info)
            : res.status(200).send(info)
    }
}



















// export const delCart = async (req, res) => {
//     let carrito = await container(process.env.PERSIST_MODE)
//     carrito.emptyCart(req.params)
//         .then(result => res.send({ status: result }))
// }

// export const addItem = async (req, res) => {
//     let carrito = await container(process.env.PERSIST_MODE)
//     const { id: id_cart } = req.params
//     const { id: id_prod } = req.body
//     carrito.addToCartAlt(id_cart, id_prod)
//         .then(result => res.send({ status: result }))
// }

// export const delItems = async (req, res) => {
//     let carrito = await container(process.env.PERSIST_MODE)
//     const { id: id_cart, id_prod } = req.params
//     carrito.removeProduct(id_cart, id_prod)
//         .then(result => res.send({ status: result }))
// }