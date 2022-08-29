import { Strategy } from 'passport-local'
import { Notifications } from './../Admin/index.js'
import { ServicesLogin } from '../../services/servicesLogin.js'


export class Strategies {

    #db;
    #notifications;

    constructor() {
        this.#db = ServicesLogin.getInstance;
        this.#notifications = new Notifications();
    }

    register = new Strategy({
        usernameField: 'user',
        passwordField: 'pass',
        passReqToCallback: true,
    }, async (req, user, pass, done) => {
        const exist = await this.#db.getUser(user, false)
        if (exist) { return done(null, false) }
        await this.#db.newUser(req.body)
        await this.#notifications.mailRegistro(req.body)

        return done(null, user)
    })

    login = new Strategy({
        usernameField: 'user',
        passwordField: 'pass'
    }, async (user, pass, done) => {
        const find = await this.#db.getUser(user, false)
        if (!find || find.pass !== pass) {
            return done(null, false)
        }
        return done(null, user)
    })

    serialize = (user, done) => {
        done(null, user)
    }


    deserialize = async (user, done) => {
        await this.#db.getUser(user, false)
        return done(null, user)
    }
}
