const mobileNavBtn = $('.timeline__nav .profile')
const mobileNavCloseBtn = $('.mobileNavClose')
const overlay = $('.overlay')
const tweetPostBtn = $('.post-tweet')
const tweetInput = $('#tweet-field')


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

const postTweet = async () => {
    const tweet = tweetInput.value.trim()
try {
    
    const response = await fetch('/api/tweets', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({tweet}),
    })
    const result = await response.json()
    console.log(result) 
} catch (error) {
    console.log(error)
}
    
}

mobileNavBtn.addEventListener('click', openMobileNav)
mobileNavCloseBtn.addEventListener('click', closeMobileNav)
overlay.addEventListener('click', closeMobileNav)
tweetPostBtn.addEventListener('click', postTweet)

tweetInput.addEventListener('keyup', function (e) {
    if (e.target.value.trim()) {
        tweetPostBtn.removeAttribute('disabled')
    } else {
        tweetPostBtn.setAttribute('disabled', 'true')
    }
})