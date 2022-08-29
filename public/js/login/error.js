const errorInput = (input, error = true, box = '') => {

    if (error) {
        input.classList.remove('focus:border-green-500')
        input.classList.add('focus:border-red-500')
    } else {
        input.classList.remove('focus:border-red-500')
        input.classList.add('focus:border-green-500')
    }

    box && box.classList.add('opacity-0')
}

const errorBox = (box, section, callback) => {

    box.classList.remove('opacity-0')
    section.classList.remove('opacity-0')
    callback
}

const errValid = (section, position, errId, error = true) => {

    if (error) {
        errorInput(section)
        okForm[ position ] = false
        errId.classList.remove('hidden')
    } else {
        errorInput(section, false)
        okForm[ position ] = true
        errId.classList.add('hidden')
    }
}