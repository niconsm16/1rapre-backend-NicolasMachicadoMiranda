import { logger } from '../config/index.js'

export class MiddlewareLogger {

    constructor() { }

    static get getMiddleware() {
        return new MiddlewareLogger();
    }

    logInfo(req, res, next) {
        const { originalUrl, method } = req
        logger.info(`Ruta: ${originalUrl} - Metodo: ${method}`)
        next()
    }


    logWarn(req, res, next) {
        const { originalUrl, method } = req
        logger.warn(`Ruta: ${originalUrl} - Metodo: ${method} - Ruta inexistente.`)
        next()
    }


    logError(err, req, res, next) {
        logger.error(`Error en la api Productos: ${err.message}`)
        res.status(500).send(`Error inesperado: ${err.message}`)
    }


    notLogin(req, res, next) {
        const { originalUrl, method } = req
        if (req.isAuthenticated()) {
            next();
        }
        else {
            logger.warn(`Ruta: ${originalUrl} - Metodo: ${method} - Intento de acceso sin login.`)
            next()
        }
    }
}



