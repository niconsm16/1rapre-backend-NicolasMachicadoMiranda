const form = document.forms.namedItem('formcito')
const user = document.getElementById('user')
const pass = document.getElementById('pass')
const repeat = document.getElementById('passrepeat')
const username = document.getElementById('username')
const address = document.getElementById('address')
const age = document.getElementById('age')
const tel = document.getElementById('tel')
const img = document.getElementById('img')
const imglabel = document.getElementById('imglabel')
const imgtext = document.getElementById('textlabel')
const submit = document.getElementById('form')
const button = document.getElementById('button')
const error = document.getElementById('errorBox')

const avatar = document.getElementById('avatar')
const avatarText = document.getElementById('avatarText')

const errUser = document.getElementById('errUser')
const errPass = document.getElementById('errPass')
const errRepeat = document.getElementById('errRepeat')
const errUsername = document.getElementById('errUsername')
const errAddress = document.getElementById('errAddress')
const errAge = document.getElementById('errAge')
const errTel = document.getElementById('errTel')
const errImg = document.getElementById('errImg')

fetch('./registro').then(res => {

    const url = res.url.split('/').at(-1)
    if (url !== 'registro.html') {
        location.href = res.url
    }
})