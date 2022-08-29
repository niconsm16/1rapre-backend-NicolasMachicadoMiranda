const user = document.getElementById('user')
const pass = document.getElementById('pass')
const submit = document.getElementById('submit')
const error = document.getElementById('userInexistent')

fetch('./login').then(res => {
    const url = res.url.split('/').at(-1)
    if (url !== 'login.html') {
        location.href = res.url
    }
})

localStorage.removeItem('user')

// User

user.addEventListener('input', (e) => {

    const targetUser = e.target.value.trim()
    const $warning = document.getElementById('userWarning')

    if (!reguser.test(targetUser)) {
        $warning.classList.remove('opacity-0')
        errorInput(user)
        return
    }

    errorInput(user, false, $warning)
})

// Pass

pass.addEventListener('input', (e) => {

    const targetPass = e.target.value
    const $passBox = document.getElementById('passBox')
    const $warningMayus = document.getElementById('warningMayus')
    const $warningNumber = document.getElementById('warningNumber')
    const $warningSymbol = document.getElementById('warningSymbol')

    if (!regMayus.test(targetPass)) {
        errorBox($passBox, $warningMayus, errorInput(pass))
        return
    } else { $warningMayus.classList.add('opacity-0') }

    if (!regNumber.test(targetPass)) {
        errorBox($passBox, $warningNumber, errorInput(pass))
        return
    } else { $warningNumber.classList.add('opacity-0') }

    if (!regSymbol.test(targetPass)) {
        errorBox($passBox, $warningSymbol, errorInput(pass))
        return
    } else { $warningSymbol.classList.add('opacity-0') }

    errorInput(pass, false, $passBox)
})

// Submit

submit.onsubmit = (e) => {
    e.preventDefault()
    if (!reguser.test(user.value)) { return }
    if (!regMayus.test(pass.value)) { return }
    if (!regNumber.test(pass.value)) { return }
    if (!regSymbol.test(pass.value)) { return }

    const password = CryptoJS.SHA256(pass.value).toString()

    fetch('/login', {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify({
            user: user.value,
            pass: password,
        })
    })
        .then(({ ok, url }) => {

            if (!ok) {
                error.classList.replace('opacity-0', 'opacity-100')
                return
            }
            location.href = url
        })
}
