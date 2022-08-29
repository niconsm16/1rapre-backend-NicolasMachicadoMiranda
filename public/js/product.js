const tempId = sessionStorage.getItem('tempId')
const buy = document.getElementById('buy')
const add = document.getElementById('add')
const remove = document.getElementById('remove')

fetch(`./api/productos/${tempId}`)
    .then(res => {
        const url = res.url.split('/').at(-1)
        if (url === 'login.html') location.href = '/login.html'
        else return res.json()
    })
    .then(data => {
        document.getElementsByTagName('body')[0].classList.remove('hidden')

        buy.disabled = false
        add.disabled = false
        remove.disabled = false

        const $producto = document.getElementById('producto')
        data.error === -1
            ? error(data, $producto)
            : showProduct(data)
        storageProduct(data)
    })

