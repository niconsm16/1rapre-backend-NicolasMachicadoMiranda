import passport from 'passport'
import { ServicesLogin } from '../services/index.js'

let instance = null;

export class ControllerLogin {

    static services = ServicesLogin.getInstance;

    constructor() { }

    static get getInstance() {
        if (!instance) { instance = new ControllerLogin() }
        return instance;
    }

    index(req, res) {
        res.redirect('profile.html')
    }


    login(req, res) {
        res.redirect('login.html')
    }


    register(req, res) {
        res.redirect('registro.html')
    }


    authenticate = passport.authenticate('login', {
        successRedirect: '/',
    })


    createUser = passport.authenticate('register', {
        successRedirect: '/',
    })


    async profile(req, res) {
        const user = req.session.passport.user
        const info = await ControllerLogin.services.getUser(user, true)
        res.send(info)
    }


    async logout(req, res) {
        res.clearCookie('proyectofinal')
        req.session.destroy(err => {
            err & res.redirect('login.html')
        })
    }
}

