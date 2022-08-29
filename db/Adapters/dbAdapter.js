import { settings } from "./../../config/settings.js"


export class DbAdapter {

    idCarritosAdapter(item) {

        if (settings.db.carritos === 'mongodb' ||
            settings.db.carritos === 'firebase') {
            if (item.id) {
                item = { _id: item.id, ...item };
                delete item.id;
            }
            else if (item._id) {
                item = { id: item._id, ...item };
                delete item._id;
            }
        }
        return item
    }

    idProductosAdapter(item) {

        if (settings.db.productos === 'mongodb' ||
            settings.db.productos === 'firebase') {
            if (item.id) {
                item = { _id: item.id, ...item };
                delete item.id;
            }
            else if (item._id) {
                item = { id: item._id, ...item };
                delete item._id;
            }
        }
        return item
    }

    firebaseAdapter(doc) {
        const adapter = { id: doc.id, ...(doc.data()) }
        delete adapter._id;
        return adapter;
    }

    getAllAdapter(products) {
        if (settings.db.productos === 'firebase') {
            products = products.docs.map(prod => this.firebaseAdapter(prod))
        } return products;
    }

    getByIdAdapter(product) {
        if (settings.db.productos === 'firebase') {
            product = this.firebaseAdapter(product)
        } return product;
    }

    locateCartAdapter(order) {
        if (settings.db.carritos === 'firebase') {
            if (order.productos) {
                let temp = [];
                order.productos.forEach(prod => {
                    prod = this.idCarritosAdapter(prod)
                    temp = [...temp, prod]
                })
                order.productos = temp;
            }
        }
        return order;
    }
}
