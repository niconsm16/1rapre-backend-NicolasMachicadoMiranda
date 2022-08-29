import { settings } from "./../../config/settings.js"


export class FactoryCarritos {

    static async carritos() {

        if (settings.db.carritos === 'memory') {
            const { Carritos } = await import('./../DAOs/carritos/carritoDaoMemory.js');
            return Carritos
        }

        if (settings.db.carritos === 'files') {
            const { Carritos } = await import('./../DAOs/carritos/carritoDaoFiles.js');
            return Carritos
        }

        if (settings.db.carritos === 'mongodb') {
            const { Carritos } = await import('./../DAOs/carritos/carritoDaoMongodb.js');
            return Carritos
        }

        if (settings.db.carritos === 'firebase') {
            const { Carritos } = await import('./../DAOs/carritos/carritoDaoFirebase.js')
            return Carritos
        }
    }
}