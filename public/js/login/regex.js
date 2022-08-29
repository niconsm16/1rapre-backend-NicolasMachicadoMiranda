const reguser = /^[a-zA-Z0-9]{4,}@[a-zA-Z0-9]{4,}(\.com\b|\.net\b|\.ar\b|\.org\b|\.mail\b|\.io\b)$/

const regMayus = /[A-Z]+/
const regNumber = /[0-9]+/
const regSymbol = /[\.\-\_\+\*\!\@\#\$\%\&]+/

const regMayusExp = /[A-ZÁÉÍÓÚ]+/

const regName = /^[ a-zA-Z\.áéíóúÁÉÍÓÚ]{5,}$/
const regAll = /^[ a-zA-Z0-9\.áéíóúÁÉÍÓÚ]{5,}$/
const regAge = /^[0-9\-]{10}$/
const regTel = /^\+54[0-9]{10,}$/