export class LoginDto {

    constructor() { }

    async checkoutFilter(fullUser) {
        const { user, name, address, age, tel } = await fullUser
        return {
            user,
            name,
            address,
            age,
            tel
        }
    }
}