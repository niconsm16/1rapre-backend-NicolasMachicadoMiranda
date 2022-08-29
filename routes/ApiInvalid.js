
export class ApiInvalid {

    constructor() { }

    static get getClass() {
        return new ApiInvalid();
    }

    async getApi(router) {
        router.get('*', (req, res) => { res.redirect('/') })
        return router;
    }
}