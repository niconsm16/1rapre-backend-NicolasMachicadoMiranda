import { ServicesProductos } from './../services/index.js';


export class ControllerProductos {

    static services = new ServicesProductos();

    constructor() { }

    async getInfo(req, res) {
        req.params.id
            ? res.send(await ControllerProductos.services.getProduct(req.params.id))
            : res.send(await ControllerProductos.services.getProducts())
    }

    async getEdit(req, res) {
        res.status(200).send()
    }

    async postProducts(req, res) {
        const resp = await ControllerProductos.services.addItem(req.body)
        resp
            ? res.status(200).send(resp)
            : res.status(400).send(false)
    }

    async modifyProducts(req, res) {
        const resp = await ControllerProductos.services.modifyItem(req.params.id, req.body)
        resp
            ? res.status(200).send(resp)
            : res.status(400).send(false)
    }

    async deleteProducts(req, res) {
        const resp = await ControllerProductos.services.delItem(req.params.id)
        resp
            ? res.status(200).send(resp)
            : res.status(400).send(false)
    }
}