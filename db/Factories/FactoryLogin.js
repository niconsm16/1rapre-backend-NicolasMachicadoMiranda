import { settings } from "./../../config/settings.js"

export class FactoryLogin {

    static async login() {

        if (settings.db.login === 'mongodb') {
            const { Login } = await import('./../DAOs/login/loginDaoMongoDb.js');
            return Login
        }
    }
}