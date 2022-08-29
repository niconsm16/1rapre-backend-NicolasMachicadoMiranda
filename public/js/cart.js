const $container = document.getElementById('productos-container')
const $checkout = document.getElementById('checkout-container')
const $subtotal = document.getElementById('subtotal')
const $impuesto = document.getElementById('impuesto')
const $boton = document.getElementById('checkout')
const $envio = document.getElementById('envio')
const $total = document.getElementById('total')

//Obtener productos
fetch(`./api/carrito/`)
    .then(res => {
        const url = res.url.split('/').at(-1)
        if (url === 'login.html') location.href = '/login.html'
        else return res.json()
    })
    .then(data => {
        const { productos } = data
        const id = data.id || data._id
        localStorage.setItem('myIdCart', id)
        document.getElementsByTagName('body')[0].classList.remove('hidden')

        if (!productos || productos.length === 0) {
            nothing($container, $subtotal, $impuesto, $envio, $total, $boton)
        } else {
            showProducts(productos, $container)
            reduce(productos, $subtotal, $impuesto, $envio, $total)
        }
    })

