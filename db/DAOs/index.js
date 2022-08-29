export const daos = {

    files: {
        productos: async () => await import('./productos/productosDaoFiles.js'),
        carrito: async () => await import('./carritos/carritoDaoFiles.js'),
        avatar: async () => await import('./files/filesDaoFiles.js')
    },
    sqlite: {
        productos: async () => await import('./productos/productosdaosqlite.js'),
        carrito: async () => await import('./carritos/carritodaosqlite.js'),
    },
    mariadb: {
        productos: async () => await import('./productos/productosDaoMySql.js'),
        carrito: async () => await import('./carritos/carritoDaoMariaDb.js')
    },
    mongodb: {
        productos: async () => await import('./productos/productosDaoMongoDb.js'),
        carrito: async () => await import('./carritos/carritoDaoMongodb.js'),
        // usuarios: async () => await import('./login/loginDaoMongoDb.js')
    },
    firebase: {
        productos: async () => await import('./productos/productosDaoFirebase.js'),
        carrito: async () => await import('./carritos/carritoDaoFirebase.js')
    }
}
