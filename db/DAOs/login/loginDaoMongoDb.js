import { usuarioModel } from "./../Schemas/index.js"
import { MongoDb } from "../../Connections/index.js"

export class Login extends MongoDb {

    constructor() {
        super();
        this.connect = MongoDb.getInstance();
    }

    async createUser(user) {
        const saveUser = new usuarioModel(user)
        await saveUser.save()
        return true
    }

    async findUser(user, full) {
        const found = await usuarioModel
            .find({ user: user }).limit(1)
        if (found.length) {
            if (full) return found[0]
            else {
                return {
                    user: found[0].user,
                    pass: found[0].pass
                }
            }
        }
        else false
    }
}