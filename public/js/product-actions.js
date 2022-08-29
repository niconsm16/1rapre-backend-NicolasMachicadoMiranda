// Producto.html (buy Button)
const sendProduct = () => {
    fetch('./api/carrito', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: sessionStorage.getItem('tempId'),
            timestamp: sessionStorage.getItem('timestamp'),
            nombre: sessionStorage.getItem('nombre'),
            descripcion: sessionStorage.getItem('descripcion'),
            codigo: Number(sessionStorage.getItem('codigo')),
            foto: sessionStorage.getItem('foto'),
            precio: Number(sessionStorage.getItem('precio')),
            stock: Number(sessionStorage.getItem('stock')),
            cantidad: Number(sessionStorage.getItem('cantidad'))
        })
    })
        .then(res => {
            res.status === 200
                ? location.href = '/exito.html'
                : location.href = '/error.html'
        })
        .catch(err => console.log(err))
}