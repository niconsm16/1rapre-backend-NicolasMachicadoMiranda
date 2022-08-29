import yargs from "yargs";

export const args = yargs()
    .default({
        port: process.env.PORT,
        productos: 'mongodb',
        carritos: 'mongodb',
        mode: 'fork'
    })
    .alias({
        prod: 'productos',
        cart: 'carritos',
        m: 'mode',
        p: 'port'
    })
    .parse(process.argv.slice(2))

