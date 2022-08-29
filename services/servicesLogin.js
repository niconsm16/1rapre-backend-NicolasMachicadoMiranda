import { RepositoryLogin } from "../db/Repositories/index.js";

let instance = null;

export class ServicesLogin {

    #repository;

    constructor() {
        this.#repository = RepositoryLogin.getInstance;
    }

    static get getInstance() {
        if (!instance) { instance = new ServicesLogin() }
        return instance;
    }

    async newUser(user) {
        return await this.#repository.createUser(user);
    }

    async getUser(user, value) {
        const a = await this.#repository.findUser(user, value)
        return a
    }
}

