import { settings } from "../../config/index.js"


export class FactoryProductos {

    static async productos() {

        if (settings.db.productos === 'memory') {
            const { Productos } = await import('./../DAOs/productos/productosDaoMemory.js')
            return Productos
        }
        if (settings.db.productos === 'files') {
            const { Productos } = await import('./../DAOs/productos/productosDaoFiles.js')
            return Productos
        }
        if (settings.db.productos === 'firebase') {
            const { Productos } = await import('./../DAOs/productos/productosDaoFirebase.js')
            return Productos
        }

        if (settings.db.productos === 'mongodb') {
            const { Productos } = await import('./../DAOs/productos/productosDaoMongoDb.js')
            return Productos
        }

        if (settings.db.productos === 'sqlite') {
            const { Productos } = await import('./../DAOs/productos/productosDaoSqlite.js')
            return Productos
        }

        if (settings.db.productos === 'mysql') {
            const { Productos } = await import('./../DAOs/productos/productosDaoMySql.js')
            return Productos
        }
    }

}

const dbConnects = () => {

    for (let connection in dbConfig) {

        const actualDb = dbConfig[connection]

        if (actualDb === 'mongodb') {

            if (!mongoConnected) {
                databases[actualDb]()
                mongoConnected = true
            }



        } else {
            databases[actualDb]()
        }
    }
}