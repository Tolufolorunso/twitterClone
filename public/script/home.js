const mobileNavBtn = $('.timeline__nav .profile')
const mobileNavCloseBtn = $('.mobileNavClose')
const overlay = $('.overlay')


const openMobileNav = () => {
    $('.nav').style.transform = 'translateX(0)'
    $('.nav').style.transition = 'all 0.3s ease'
    overlay.classList.remove('hidden')
}

const closeMobileNav = () => {
    $('.nav').style.transform = 'translateX(-1000px)'
    $('.nav').style.transition = 'all 0.3s ease'
    overlay.classList.add('hidden')
}

mobileNavBtn.addEventListener('click', openMobileNav)
mobileNavCloseBtn.addEventListener('click', closeMobileNav)
overlay.addEventListener('click', closeMobileNav)