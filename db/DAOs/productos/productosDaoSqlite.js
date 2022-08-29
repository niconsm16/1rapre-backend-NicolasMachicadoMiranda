import { Sqlite } from "./../../Connections/index.js";

export class Productos extends Sqlite {

    constructor() {
        super();
        this.table = 'productos'
        this.connect = Sqlite.connection;
    }

    async getAll() {
        return await this.connect.from(this.table).select('*')
    }

    async getById(id) {
        const result = await this.connect
            .from(this.table)
            .select('*')
            .where({ id: id })
        return result[0]
    }

    async addProduct(product) {
        await this.connect(this.table).insert(product)
        return true;
    }

    async modifyProduct(product) {
        await this.connect(this.table)
            .where({ id: product.id })
            .update({
                nombre: product.nombre,
                descripcion: product.descripcion,
                codigo: product.codigo,
                foto: product.foto,
                precio: product.precio,
                stock: product.stock
            })
        return true;
    }

    async deleteProduct(id) {
        await this.connect(this.table).where({ id: id }).del()
        return true;
    }

    async updateStock(id, qty) {
        await this.connect(this.table)
            .where({ id })
            .decrement({ stock: qty });
    }

    async checkStock(products) {
        let outStock = [];

        for (let prod of products) {
            const { id, cantidad } = prod
            const find = await this.connect
                .from(this.table)
                .select('*')
                .where((group) => {
                    group
                        .where('id', id)
                        .andWhere('stock', '<', cantidad)
                })
            if (find.length > 0)
                outStock = [...outStock, find[0]]
        }
        if (outStock.length === 0) {
            products.forEach(prod => {
                this.updateStock(prod.id, prod.cantidad)
            })
        }
        return outStock;
    }
}