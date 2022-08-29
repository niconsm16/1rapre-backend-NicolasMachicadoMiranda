import { ControllerLogin } from '../controllers/index.js';
import { MiddlewareFiles, MiddlewareLogger, MiddlewareLogin } from '../middleware/index.js';

let instance = null;

export class ApiLogin {

    #files;
    #logger;
    #middleware;
    #controller;

    constructor() {
        this.#files = MiddlewareFiles.getMiddleware;
        this.#logger = MiddlewareLogger.getMiddleware;
        this.#middleware = MiddlewareLogin.getMiddleware;
        this.#controller = ControllerLogin.getInstance;
    }

    static get getClass() {
        if (!instance) {
            instance = new ApiLogin();
        }
        return instance;
    }

    async getApi(router) {

        router.get('/',
            this.#middleware.login,
            this.#controller.index)

        router.get('/login',
            this.#middleware.logged,
            this.#controller.login)

        router.post('/login',
            this.#controller.authenticate)

        router.get('/registro',
            this.#middleware.logged,
            this.#controller.register)

        router.post('/registro',
            this.#files.avatar.upload,
            this.#controller.createUser)

        router.get('/logout',
            this.#middleware.login,
            this.#controller.logout)

        router.get('/profile',
            this.#logger.notLogin,
            this.#middleware.login,
            this.#controller.profile)

        return router;
    }
}