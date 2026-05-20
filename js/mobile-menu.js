const menuButton = document.querySelector('.m-menu')
const menu = document.querySelector('.menu')
menuButton.addEventListener('click', () => {
    menu.classList.toggle('is-open')
})