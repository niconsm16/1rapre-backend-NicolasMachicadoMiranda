function getProduct(id) {
    sessionStorage.setItem('tempId', id)
    location.href = './producto.html'
}

// Agregar(0)
function addProduct() {
    sessionStorage.setItem('editMode', 0)
    location.href = './editar.html'
}

// Modificar (1)
function modifyProduct(id) {
    sessionStorage.setItem('tempId', id)
    sessionStorage.setItem('editMode', 1)
    location.href = './editar.html'
}

// Borrar(2)
function deleteProduct(id) {
    sessionStorage.setItem('tempId', id)
    sessionStorage.setItem('editMode', 2)
    location.href = './editar.html'
}