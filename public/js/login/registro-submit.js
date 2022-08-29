// Submit

submit.addEventListener('submit', (e) => {

    completeForm = true
    button.disabled = true
    let allOk = false

    e.preventDefault()

    for (input of okForm) {
        if (!input) {
            allOk = false;
            button.disabled = false
            break
        }
        allOk = true
    }

    if (allOk) {

        if (validTel[ 0 ]) {

            error.classList.add('hidden')

            const image = img.files[ 0 ]
            const type = img.files[ 0 ].type
            const ext = img.files[ 0 ].name.split('.').at(-1)
            const blob = image.slice(0, image.size, image.type)
            newFile = new File([ blob ], `${user.value}.${ext}`, { type })

            const finalForm = new FormData(form)
            finalForm.set('pass', CryptoJS.SHA256(pass.value).toString())
            finalForm.set('tel', validTel[ 1 ])
            finalForm.set('img', newFile)
            finalForm.delete('passrepeat')

            fetch('/registro', { method: 'POST', body: finalForm })
                .then(({ ok, url }) => {

                    if (ok) {
                        sessionStorage.setItem('firstTime', 'yes')
                        location.href = url
                    } else {
                        if (!document.getElementById('exists')) {

                            button.disabled = false
                            const exists = document.createElement('div')
                            exists.id = 'exists'
                            exists.className = 'flex w-full bg-purple-500 text-white text-center justify-center rounded'
                            exists.innerText = 'Disculpa, ese usuario(correo electrónico) ya está registrado'
                            form.insertBefore(exists, user)
                        }
                    }
                })

        }
    } else { error.classList.remove('hidden') }
}
)

