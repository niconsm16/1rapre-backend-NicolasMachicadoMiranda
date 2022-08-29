const $add = document.getElementById('add')
const $remove = document.getElementById('remove')
let $count = document.getElementById('count')
$buy = document.getElementById('buy')

let count = 0

$add.onclick = () => {
    let stock = Number(sessionStorage.getItem('stock'))
    count < stock && count++
    $count.innerHTML = count
    sessionStorage.setItem('cantidad', count)

}
$remove.onclick = () => {
    count > 0 && count--
    $count.innerHTML = count
    sessionStorage.setItem('cantidad', count)
}

$buy.onclick = () => {
    if (count > 0) {
        let idCart = localStorage.getItem('myIdCart') || 0
        sendProduct(idCart)
    } else {
        const qty = document.getElementById('qty')
        qty.className = 'grid w-full justify-items-end mx-4 units'
        Toastify({
            text: "Debes indicar una cantidad de unidades a llevar para la compra",
            style: {
                background: "linear-gradient(90deg, rgba(255,154,72,1) 0%, rgba(255,51,0,1) 100%)",
            }
        }).showToast();
        setTimeout(() => { qty.className = 'grid w-full justify-items-end mx-4' }, 1500)
    }
}
