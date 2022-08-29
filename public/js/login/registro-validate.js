const okForm = new Array(8)
let completeForm = false


// User

user.addEventListener('input', (e) => {

    const targetUser = e.target.value.trim()

    if (!reguser.test(targetUser)) {

        errValid(user, 0, errUser)
        return
    }

    errValid(user, 0, errUser, false)
})



// Pass

pass.addEventListener('input', (e) => {

    const targetPass = e.target.value.trim()

    if (!regMayus.test(targetPass)) {
        errValid(pass, 1, errPass)
        return
    }

    if (!regNumber.test(targetPass)) {
        errValid(pass, 1, errPass)
        return
    }

    if (!regSymbol.test(targetPass)) {
        errValid(pass, 1, errPass)
        return
    }

    if (targetPass !== repeat.value) {
        errValid(repeat, 2, errRepeat)
    } else {
        errValid(repeat, 2, errRepeat, false)
    }

    errValid(pass, 1, errPass, false)

})



// Pass Repeat

repeat.addEventListener('input', (e) => {

    const targetRepeat = e.target.value

    if (targetRepeat !== pass.value) {
        errValid(repeat, 2, errRepeat)
        return
    }
    errValid(repeat, 2, errRepeat, false)

})



// Nombre

username.addEventListener('input', (e) => {

    const targetUsername = e.target.value

    if (!regName.test(targetUsername) ||
        !regMayus.test(targetUsername)) {
        errValid(username, 3, errUsername)
        return
    }
    errValid(username, 3, errUsername, false)
})



// Direccion

address.addEventListener('input', (e) => {

    const targetAddress = e.target.value

    if (!regAll.test(targetAddress) ||
        !regNumber.test(targetAddress) ||
        !regMayusExp.test(targetAddress)) {
        errValid(address, 4, errAddress)
        return
    }
    errValid(address, 4, errAddress, false)
})



// Fecha de Nacimiento

age.addEventListener('input', (e) => {

    const targetAge = e.target.value
    const realAge = new Date().getFullYear() - targetAge.split('-').at(0)

    if (!regAge.test(targetAge)) {
        errAge.innerText = 'Debe ser una fecha real!'
        errValid(age, 5, errAge)
        return
    }

    if (realAge > 99) {
        errAge.innerText = 'No puedes tener más de 100 años!'
        errValid(age, 5, errAge)
        return
    }

    if (targetAge.split('-').at(0) > new Date().getFullYear()) {
        errAge.innerText = 'No puedes venir del futuro!'
        errValid(age, 5, errAge)
        return
    }
    if (realAge < 18) {
        errAge.innerText = 'Debes ser mayor de 18 para ingresar!'
        errValid(age, 5, errAge)
        return
    }
    errValid(age, 5, errAge, false)
})


// Teléfono Móvil

const validTel = []

const errorMap = [
    "Número inválido",
    "Código de país inválido",
    "Número muy corto",
    "Número muy largo",
    "Número inválido"
];

const iti = window.intlTelInput(tel, {
    utilsScript: "./utils.js",
    initialCountry: 'ar',
    separateDialCode: true,
    preferredCountries: ['ar', 'bo', 'br', 'cl', 'co', 'ec', 'py', 'pe', 'mx', 'ur', 've', 'es']
});

tel.addEventListener('input', (e) => {

    validTel[0] = iti.isValidNumber()
    const targetTel = e.target.value

    if ((targetTel.trim() &&
        targetTel[0]) ||
        !regName.test(targetTel)) {
        if (iti.isValidNumber()) {
            errValid(tel, 6, errTel, false)
            validTel[1] = iti.getNumber()
            return
        }
        errValid(tel, 6, errTel)
        errTel.innerText = errorMap[iti.getValidationError()] || 'Ingrese un número de teléfono'
    }
})


// Imagen

img.addEventListener('input', (e) => {

    const imgSize = img.files[0].size
    const imgExt = img.files[0].name.split('.').at(-1)

    if (imgSize > 1024000) {
        okForm[7] = false
        imglabel.classList.remove('bg-black/60', 'bg-green-500')
        imglabel.classList.add('bg-red-500')
        imgtext.innerText = 'la imagen supera 1MB!'
        return
    }

    if (imgExt !== 'jpg' &&
        imgExt !== 'png' &&
        imgExt !== 'webp') {
        okForm[7] = false
        imglabel.classList.remove('bg-black/60', 'bg-green-500')
        imglabel.classList.add('bg-red-500')
        imgtext.innerText = 'solo jpg, png o webp!'
        return
    }

    okForm[7] = true
    const image = URL.createObjectURL(img.files[0])
    avatar.setAttribute('src', image)
    avatar.className = 'w-full h-96 object-cover p-[2em_0em_0]'
    avatarText.classList.remove('hidden')
    imglabel.classList.remove('bg-black/60', 'bg-red-500')
    imglabel.classList.add('bg-green-500')
    imgtext.innerText = ' imagen aceptada!'
})


// Form

form.addEventListener('keyup', () => {

    let incorrectForm = false

    for (let i = 0; i < okForm.length - 1; i++) {
        if (!Boolean(okForm[i])) {
            incorrectForm = true
            break
        }
    }

    if (completeForm) {

        incorrectForm
            ? error.classList.remove('hidden')
            : error.classList.add('hidden')
    }
})