const tempId = sessionStorage.getItem('tempId')
const editMode = sessionStorage.getItem('editMode')

let $titulo = document.getElementById('titulo')
let $detalles = document.getElementById('detalles')
let $accion = document.getElementById('accion')
let $form = document.getElementById('edit')

fetch('/api/productos/editar').then(res => {
    const url = res.url.split('/').at(-1)
    if (url === 'login.html') location.href = '/login.html'
    else document.getElementsByTagName('body')[0].classList.remove('hidden')
})

// Modificar
if (editMode === '1') {
    fetch(`./api/productos/${tempId}`,)
        .then(res => res.json())
        .then(data => {
            showFn(data, $titulo, $detalles, $accion)
            modifyFn(data, $form)
        })
}

// Borrar
if (editMode === '2') {
    fetch(`./api/productos/${tempId}`,)
        .then(res => res.json())
        .then(data => {
            showFn(data, $titulo, $detalles, $accion)
            deleteFn(data, $form, $titulo, $detalles, $accion)
        })
}