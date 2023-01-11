document.querySelector('.search-btn').addEventListener('click', function () {
    this.parentElement.classList.toggle('open')
    this.previousElementSibling.focus()
})

const navListMobile = document.querySelector('.nav_list-mobile');

document.querySelector('.menu-icon').addEventListener('click', function () {
    navListMobile.classList.toggle('show')
})
