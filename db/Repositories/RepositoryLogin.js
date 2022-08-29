import { LoginDto } from "../DTOs/index.js";
import { FactoryLogin } from "../Factories/index.js";

let instance = null;

export class RepositoryLogin {

    #dto;
    #factory;

    constructor() {
        this.#dto = new LoginDto();
        this.#factory = FactoryLogin.login()
            .then(Factory => { return new Factory() })
    }

    static get getInstance() {
        if (!instance) { instance = new RepositoryLogin() }
        return instance;
    }

    async createUser(user) {
        const dao = await (await this.#factory).createUser(user)
        return dao
    }

    async findUser(user, full) {
        if (full) {
            const dao = await (await this.#factory).findUser(user, true);
            const dto = await this.#dto.checkoutFilter(dao);
            return dto;
        } else {
            const dao = await (await this.#factory).findUser(user, false);
            return dao;
        }

    }
}
