import MongoStore from 'connect-mongo'
import dotenv from '../../global/dotenv.js'

export const setCookies = {
    secret: 'proyectofinal',
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: 600000 },
    name: 'proyectofinal',
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    })
}