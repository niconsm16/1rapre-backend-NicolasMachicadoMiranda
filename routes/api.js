// import { logError, logInfo, logWarn } from '../middleware/index.js'
import { ApiProductos, ApiLogin, ApiCarritos, ApiInvalid } from './index.js'


export class Apis {

    #login;
    #productos;
    #carritos;
    #invalid;

    constructor(router) {
        this.#login = ApiLogin.getClass.getApi(router);
        this.#productos = ApiProductos.getClass.getApi(router);
        this.#carritos = ApiCarritos.getClass.getApi(router);
        this.#invalid = ApiInvalid.getClass.getApi(router);
    }

    static getClass(router) {
        return new Apis(router);
    }

    async api(app) {
        app.use(await this.#login)
        app.use(await this.#productos)
        app.use(await this.#carritos)
        app.use(await this.#invalid)
    }

}