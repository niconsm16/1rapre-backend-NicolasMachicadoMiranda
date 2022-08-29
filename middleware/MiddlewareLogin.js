
export class MiddlewareLogin {

    constructor() { }

    static get getMiddleware() {
        return new MiddlewareLogin();
    }

    async login(req, res, next) {
        req.isAuthenticated()
            ? next()
            : res.redirect('/login.html')
    }

    async logged(req, res, next) {
        req.isAuthenticated()
            ? res.redirect('/productos.html')
            : next()
    }
}