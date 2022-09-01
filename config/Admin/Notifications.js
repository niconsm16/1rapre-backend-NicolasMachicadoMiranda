import twilio from 'twilio'
import { createTransport } from 'nodemailer'
import dotenv from './../../global/dotenv.js'


export class Notifications {

    constructor(user) {

        this.user = user
        this.service = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)
        this.transporter = createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })
    }


    // REGISTRO ADMIN ==========================

    mailRegistro = async (user) => {
        try {
            await this.transporter.sendMail({
                from: 'Cuebamna: Nuevo Usuario',
                to: process.env.MAIL_USER,
                subject: `Nuevo registro: ${user.user}`,
                html: `
    <div><span>Usuario: </span><span><b>${user.user}</b></span>
    </div><div><span>Nombre: </span><span><b>${user.name}</b></span>
    </div><div><span>Fecha de nacimiento: </span><span><b>${user.age}</b></span>
    </div><div><span>Telefono: </span><span><b>${user.tel}</b></span></div>`,
            })
            return true
        }
        catch (err) { console.log('Hubo un error al mandar el mail de registro al administrador: ', err) }
    }

    // COMPRA ADMIN ==================================

    mailCarrito = async (buyer, order, totals) => {
        try {

            await this.transporter.sendMail({
                from: 'Suburbios el Malandrín',
                to: process.env.MAIL_USER,
                subject: `Nuevo pedido de: ${buyer.user}`,
                html: `<h1>NUEVA CONFIRMACIÓN DE PEDIDO</h1>
                <p>NOMBRE: ${buyer.name}</p>
                <p>USUARIO: ${buyer.user}</p>
                <p>DIRECCION: ${buyer.address}</p>
                <p>TELEFONO: ${buyer.tel}</p>
                <p>ID de Orden: ${order.id || order._id}</p>
                <p>Fecha: ${order.timestamp}</p>
                </br>
                <hr/>
                </br>
                <p>Compras: ${order.productos.map(prod => {
                    return (
                        ` <div>
                        <p>Producto: ${prod.nombre}</p>
                            <p>Producto: $${prod.precio}</p>
                            <p>Producto: ${prod.cantidad} unid.</p>
                        </div>`
                    )
                })}</p>
                </br>
                <hr/>
                </br>
                <p>Subtotal: ${totals.subtotal}</p>
                <p>Imp.: ${totals.impuesto}</p>
                <p>Envío: ${totals.envio}</p>
                <p>Total: ${totals.total}</p>
                `,
            })
            return true
        }
        catch (err) { console.log('Hubo un error al mandar el mail de notificación al administrador: ', err) }
    }


    smsCarrito = async (user) => {

        try {
            await this.service.messages.create({
                body: `Has recibido un nuevo pedido de: ${user} `,
                from: process.env.TWILIO_N,
                to: process.env.TWILIO_ADM
            })
            return true
        }
        catch (err) { console.log('Hubo un error al mandar el sms de notificación al administrador: ', err) }
    }


    // COMPRA USER ======================================================================

    // smsBuyer = async (sms, id) => {

    //     try {
    //         await this.service.messages.create({
    //             body: `Tu compra ha concluído, tu id de seguimiento es: ${id}`,
    //             from: process.env.TWILIO_N,
    //             to: sms
    //         })
    //         return true
    //     }
    //     catch (err) { console.log('Hubo un error al mandar el sms de notificación al comprador: ', err) }
    //     finally { return true }
    // }
}