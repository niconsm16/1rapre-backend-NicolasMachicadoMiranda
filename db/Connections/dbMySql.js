import knex from 'knex';
import dotenv from '../../global/dotenv.js'

let instance = null;

export class MySql {

    constructor() { }

    static get connection() {
        try {
            const mysql = knex({
                client: 'mysql',
                connection: {
                    user: process.env.MYSQL_USER,
                    password: process.env.MYSQL_PASS,
                    host: process.env.MYSQL_HOST,
                    database: process.env.MYSQL_DB
                },
                pool: { max: 25 }
            })
            console.log('\x1b[33m%s\x1b[0m', ' MySql: conexión exitosa', '\x1b[0m')
            return mysql
        }
        catch (err) { console.log('MariaDB: ', err) }
    }
}
