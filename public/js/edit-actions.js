
$form.onsubmit = (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value
    const descripcion = document.getElementById('descripcion').value
    const codigo = Number(document.getElementById('codigo').value)
    const precio = Number(document.getElementById('precio').value)
    const stock = Number(document.getElementById('stock').value)
    const foto = document.getElementById('foto').value

    const item = { nombre, descripcion, codigo, precio, stock, foto }

    if (editMode === '0') {
        fetch('./api/productos',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            })
            .then(res => {
                res.status === 200
                    ? location.href = '/exito.html'
                    : location.href = '/error.html'
            })
            .catch(err => console.log(err))
    }

    if (editMode === '1') {
        fetch(`./api/productos/${tempId}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            })
            .then(res => {
                res.status === 200
                    ? location.href = '/exito.html'
                    : location.href = '/error.html'
            })
            .catch(err => console.log(err))
    }

    if (editMode === '2') {
        fetch(`./api/productos/${tempId}`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => {
                res.status === 200
                    ? location.href = '/exito.html'
                    : location.href = '/error.html'
            })
            .catch(err => console.log(err))
    }
}