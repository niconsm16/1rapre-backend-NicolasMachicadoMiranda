fetch('/api/productos')
    .then(res => {
        const url = res.url.split('/').at(-1)
        if (url === 'login.html') location.href = '/login.html'
        else return res.json()
    })
    .then(data => {
        document.getElementsByTagName('body')[0].classList.remove('hidden')
        const $lista = document.getElementById('lista')
        const state = localStorage.getItem('user')

        if (state === 'isAdmin') {
            const menu = document.getElementById('menu')
            const addButton = document.createElement('div')
            addButton.className = 'w-auto'
            addButton.innerHTML = `<a onclick="addProduct()"
                class="word mx-2 bg-orange-400 hover:bg-blue-400 py-1 rounded text-white px-4">AGREGAR
                ITEM</a>`
            if (window.innerWidth > 1280) {
                const navBar = document.getElementById('movies')
                menu.insertBefore(addButton, navBar)
            } else {
                const container = document.getElementById('preview')
                container.append(addButton)
            }
        }
        else {
            console.log('nada')

        }
        productList(data, $lista)

    })


