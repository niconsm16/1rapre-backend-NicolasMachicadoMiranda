import knex from 'knex'


export class Sqlite {

    constructor() { }

    static get connection() {
        try {
            const sqlite3 = knex({
                client: 'sqlite3',
                connection: { filename: './db/sqlitedb.db' },
                useNullAsDefault: true
            })
            console.log('\x1b[33m%s\x1b[0m', ' sqlite3: conexión exitosa', '\x1b[0m')
            return sqlite3
        }
        catch (err) { console.log('Error Sqlite3: ', err) }
    }
}