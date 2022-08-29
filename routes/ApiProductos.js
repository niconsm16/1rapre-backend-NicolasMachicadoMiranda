import { ControllerProductos } from '../controllers/index.js';
import { MiddlewareLogger, MiddlewareLogin } from '../middleware/index.js';


export class ApiProductos {

    #logger;
    #middleware;
    #controller;

    constructor() {
        this.#logger = MiddlewareLogger.getMiddleware;
        this.#middleware = MiddlewareLogin.getMiddleware;
        this.#controller = new ControllerProductos();
    }

    static get getClass() {
        return new ApiProductos();
    }

    async getApi(router) {

        router.use(
            this.#logger.notLogin,
            this.#middleware.login);

        router.get('/api/productos/:id?',
            this.#controller.getInfo)

        router.get('/api/productos/editar',
            this.#controller.getEdit)

        router.post('/api/productos',
            this.#controller.postProducts)

        router.route('/api/productos/:id')
            .put(this.#controller.modifyProducts)
            .delete(this.#controller.deleteProducts)

        return router;
    }
}