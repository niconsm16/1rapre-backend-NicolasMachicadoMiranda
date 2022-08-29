// Almacenamiento de usuario
const userButton = document.getElementById('userButton')
const adminButton = document.getElementById('adminButton')

const storageUser = (button) => {

    localStorage.removeItem('user')
    localStorage.setItem('user', button)

    if (button === 'isAdmin') {
        adminButton.style.background = 'linear-gradient(90deg, rgba(255,154,72,1) 0%, rgba(255,51,0,1) 100%)'
        userButton.style.background = ''
        Toastify({
            text: "Ahora eres Admin",
            style: {
                background: "linear-gradient(90deg, rgba(255,154,72,1) 0%, rgba(255,51,0,1) 100%)",
            }
        }).showToast();
    }

    if (button === 'isUser') {
        userButton.style.background = 'linear-gradient(90deg, rgba(72,103,255,1) 0%, rgba(0,255,154,1) 100%)'
        adminButton.style.background = ''
        Toastify({
            text: "Ahora eres un usuario mediocre",
            style: {
                background: "linear-gradient(90deg, rgba(72,103,255,1) 0%, rgba(0,255,154,1) 100%)",
            }
        }).showToast();
    }
}
userButton.onclick = () => storageUser('isUser')
adminButton.onclick = () => storageUser('isAdmin')