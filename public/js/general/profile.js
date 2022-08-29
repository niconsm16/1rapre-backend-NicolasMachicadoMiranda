const firstTime = sessionStorage.getItem('firstTime')


if (firstTime) {
    document.getElementById('movies').classList.add('text-white')
    document.getElementById('movies').classList.add('animate-pulse')
    document.getElementById('hand').classList.remove('hidden')
}

sessionStorage.clear()

const $avatar = document.getElementById('avatar')
const $user = document.getElementById('user')
const $name = document.getElementById('name')
const $age = document.getElementById('age')
const $actualage = document.getElementById('actualage')
const $tel = document.getElementById('tel')

fetch('/profile')
    .then(res => res.json())
    .then(data => {

        document.getElementsByTagName('body')[0].classList.remove('hidden')

        const year = new Date().getFullYear()
        const birth = parseInt(data.age.split('-')[0])

        $avatar.src = `/uploads/avatar/${data.user}.jpg`
        $user.innerText = data.user
        $name.innerText = data.name
        $age.innerText = data.age
        $actualage.innerText = `${year - birth} años`
        $tel.innerText = data.tel
    })
    .catch(() => { location.href = 'login.html' })
