const logout = document.getElementById('logout')

logout.onclick = () => {
    fetch('/logout')
}