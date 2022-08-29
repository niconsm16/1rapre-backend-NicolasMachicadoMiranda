import session from 'express-session'
import { Strategies } from './strategy.js'


const strategy = new Strategies();

export const authPassport = async (app, passport, setCookies) => {

    app.use(session(setCookies))

    passport.use('register', strategy.register)
    passport.use('login', strategy.login)
    passport.serializeUser(strategy.serialize)
    await passport.deserializeUser(strategy.deserialize)
    app.use(passport.initialize())
    app.use(passport.session())
}