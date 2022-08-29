// Comprar - Vaciar carrito y borrarlo
const checkout = document.getElementById('checkout')

// Boton Checkout
checkout.onclick = (e) => {

    e.preventDefault()
    const idCart = localStorage.getItem('myIdCart');

    const data = {
        idCart,
        subtotal: $subtotal.innerText,
        impuesto: $impuesto.innerText,
        envio: $envio.innerText,
        total: $total.innerText
    }

    fetch(`./api/carrito/${idCart}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then((data) => {
            console.log('THENTHEN')
            if (data.error) errorStock(data.list)
            else {
                localStorage.removeItem('myIdCart')
                sessionStorage.setItem('idOrder', data.id)
                location.href = './exito.html'
            }
        })
}

//Remover producto
const remove = (id) => {
    const idCart = localStorage.getItem('myIdCart');
    fetch(`./api/carrito/${idCart}/productos/${id}`, {
        method: 'DELETE'
    })
        .then(res => {
            res.status === 200
                ? location.href = '/carrito.html'
                : location.href = '/error.html'
        })
}

//Agregar un producto
const add = (id) => {
    const idCart = localStorage.getItem('myIdCart');
    fetch(`./api/carrito/${idCart}/productos/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id })
    })
        .then(res => {
            res.status === 200
                ? location.href = '/carrito.html'
                : location.href = '/error.html'
        })
}