import { converter } from './../services/index.js'

export const middlewareProductos = function (req, res, next) {
    if (req.body.editMode === 'modify') { req.method = 'PUT' }
    if (req.body.editMode === 'delete') { req.method = 'DELETE' }
    req.body = converter(req.body)
    next()
}