import { ControllerCarritos } from '../controllers/index.js';
import { MiddlewareLogger, MiddlewareLogin } from '../middleware/index.js';

export class ApiCarritos {

    #logger;
    #middleware;
    #controller;

    constructor() {
        this.#logger = MiddlewareLogger.getMiddleware;
        this.#middleware = MiddlewareLogin.getMiddleware;
        this.#controller = new ControllerCarritos();
    }

    static get getClass() {
        return new ApiCarritos();
    }

    async getApi(router) {

        router.use(this.#logger.notLogin, this.#middleware.login)

        router.get('/api/carrito',
            this.#controller.listItems)

        router.post('/api/carrito',
            this.#controller.addToCart)

        router.put('/api/carrito/:id/productos/:id_prod',
            this.#controller.oneToCart)

        router.delete('/api/carrito/:id/productos/:id_prod',
            this.#controller.deleteToCart)

        router.delete('/api/carrito/:id',
            this.#controller.purchaseCart)

        return router;
    }
}