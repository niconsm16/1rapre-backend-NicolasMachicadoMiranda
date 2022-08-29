export class ProductosDto {

    constructor() { }

    async checkStock(products) {
        let names = [];
        const list = await products;
        if (list.length > 0) {
            await list.forEach(item => { names = [...names, item.nombre] })
            return names;
        }
        else return false;
    }
}