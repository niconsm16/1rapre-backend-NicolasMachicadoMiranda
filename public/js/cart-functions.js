// Total de carrito
const reduce = (products, $subtotal, $impuesto, $envio, $total) => {
    let subtotal = products.map(prod => prod.precio * prod.cantidad).reduce((subtotal, prod) => subtotal += prod)
    $subtotal.innerText = `$${subtotal}`
    let impuesto = subtotal * 0.21
    $impuesto.innerText = `$${impuesto.toFixed(2)}`
    let envio = 0
    $envio.innerText = `$${envio}`
    let total = subtotal + impuesto + envio
    $total.innerText = `$${total.toFixed(2)}`
}

// Mostrar productos
const showProducts = (products, container) => {

    let productos = document.createElement('div')
    productos.className = 'w-full bg-[#00000038]'
    productos.innerHTML = products.map(prod => `
                <div class="flex pb-4 border-neutral-20 border-b-2 py-4 bg-black/10">
                    <div class="md:w-4/12 2xl:w-1/4 w-full">
                        <img src=${prod.foto} alt="Black Leather Bag" class="w-full h-full object-center object-cover" onerror="this.src='https://www.prokerala.com/movies/assets/img/no-poster-available.webp'" />
                    </div>
                    <div class="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                        <p id="codigo" class="text-xs leading-3 md:pt-0 pt-4">${prod.codigo}</p>
                        <div class="flex items-center justify-between w-full pt-1">
                            <p id="nombre" class="text-base font-black leading-none my-4">
                                ${prod.nombre}
                            </p>
                        </div>
                        <p id="cantidad" class="text-xs leading-3 py-4">Compra: ${prod.cantidad}
                        <p id="precio" class="text-xs leading-3 pb-4">Precio: ${prod.precio}
                        </p>
                        <p id="descripcion" class="w-96 text-xs leading-3">Descripcion:
                            ${prod.descripcion}
                        </p>
                        <div class="flex items-center justify-between pt-5">
                            <div class="flex itemms-center">
                                <p id="add" onclick="add('${prod._id || prod.id}')"
                                    class="text-xs leading-3 underline text-green-400 cursor-pointer">
                                    Agregar</p>
                                <p id="remove" onclick="remove('${prod._id || prod.id}')"
                                class="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">
                                    Remover</p>
                            </div>
                            <p id="precio" class="text-base font-black leading-none">
                                $${Number(prod.precio) * prod.cantidad}</p>
                        </div>
                    </div>
                </div>
    `).join('')
    container.append(productos)
}

const nothing = (container, subtotal, impuesto, envio, total, boton) => {

    container.innerText = 'No has agregado nada todavía chamako'
    subtotal.innerText = ' $ 0'
    impuesto.innerText = ' $ 0'
    envio.innerText = ' $ 0'
    total.innerText = ' $ 0'
    boton.remove()
}

const errorStock = (list) => {

    const exist = document.getElementById('errorBox')
    exist && exist.remove()

    const errorBox = document.createElement('div')
    errorBox.id = 'errorBox'
    const ul = document.createElement('ul')
    errorBox.innerText = 'Los siguientes productos sobrepasan el stock del sistema, por favor revíselos:'
    errorBox.className = 'lg:text-left text-center w-full my-6 px-4 py-2 bg-red-800 font-normal text-base text-white'
    errorBox.id = 'errorBox'
    errorBox.append(ul)

    list.forEach(item => {
        const element = document.createElement('li')
        element.innerText = "- " + item
        ul.append(element)
    })
    $checkout.insertBefore(errorBox, $boton)
}