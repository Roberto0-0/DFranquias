const menu = document.querySelector(".menu")
const nav = document.querySelector("nav")
const mainRemoveClass = document.querySelector("main")

menu.onclick = () => {
    nav.classList.toggle('active')
}

mainRemoveClass.onclick = () => {
    nav.classList.remove('active')
}