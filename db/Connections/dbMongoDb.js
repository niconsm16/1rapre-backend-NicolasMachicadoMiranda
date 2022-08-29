import mongoose from "mongoose";
import dotenv from './../../global/dotenv.js'

let instance = null;

export class MongoDb {

    constructor() { }

    static async getInstance() {

        if (!instance) {
            instance = new MongoDb();
            try {
                console.log('Conectando a db: MongoDb');
                mongoose.connect(process.env.MONGO_URL);
                console.log('\x1b[30m\x1b[42m%s\x1b[0m', 'MongoDb: conexión exitosa');
            }
            catch (err) { console.log('MongoDB: ', err) }
        }
        return instance;
    }
}