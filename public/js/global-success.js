const idOrder = sessionStorage.getItem('idOrder')
const redirect = document.getElementById('redirect')

if (idOrder) {
    redirect.remove()
    const main = document.getElementsByTagName('main')
    const order = document.createElement('div')
    order.className = "bg-green-700 text-white px-4 py-2 font-bold"
    order.innerText = `Este es tu id de seguimiento, anótalo: ${idOrder}`
    main[0].append(order)
}

else {
    setInterval(() => {
        location.href = 'productos.html'
    }, 2000);
}

sessionStorage.clear()
