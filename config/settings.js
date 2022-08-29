import { args } from './../global/yargs.js'

export const settings = {
    db: {
        login: 'mongodb',
        productos: args.productos,
        carritos: args.carritos
    }
}

/* Opciones:
login: mongodb
carritos:, memory, files, mongodb, firebase
productos: memory, files, sqlite, mongodb, firebase, mysql
*/