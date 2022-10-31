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

const getTweets = async () => {
    try {
        const response = await fetch('/api/tweets')
        const result = await response.json()
        const { tweets } = result
        outPutTweets(tweets, $('.timeline__tweets'))
    } catch (error) {
        console.log(error)
    }
}

const outPutTweets = (data, container) => {
    container.innerHTML = ''
    data.forEach(tweet => {
        let html = generateTweetHtml(tweet)
        container.insertAdjacentHTML('afterbegin', html)
    })

    const html = `
    <span>Nothing to show here</span>
    `

    if(data.length === 0) {
        container.insertAdjacentHTML('afterbegin', html)
    }
}

getTweets()

const postTweet = async () => {
    const tweet = tweetInput.value.trim()
    try {

        const response = await fetch('/api/tweets', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ tweet }),
        })
        const result = await response.json()
        const html = generateTweetHtml(result.tweet)

        $('.timeline__tweets').insertAdjacentHTML('afterbegin', html)
    } catch (error) {
        console.log(error)
    }
}

const generateTweetHtml = (data) => {
    let { postedBy, tweetImg, tweetText, createdAt, _id } = data
    userImage = !postedBy.userImg ? postedBy.userImg : "/static/images/logo-blue.png"
    return `
            <div class="timeline__tweet px-2 py-1 flex gap-1" data-id="${_id}">
            <div class="nav__profile-img">
            <img src=${userImage} alt="">
            </div>
            <div class="timeline__tweet--content flex flex-col">
            <div class="timeline__tweet--content-detail flex">
                <p class="timeline__tweet--content-name">${postedBy.firstname} ${postedBy.lastname}</p>
                <p class="timeline__tweet--content-username">@${postedBy.username}</p>
                <p class="timeline__tweet--content-time"><span class="timeline__tweet--content-dot">.</span> ${timeDifference(new Date(), new Date(createdAt))}</p>
                <span class="material-symbols-outlined timeline__tweet--content-more">
                 more_horiz
                </span>
            </div>
            <div class="timeline__tweet--content-text">
                <p>${tweetText}</p>
            </div>
            <div class="timeline__tweet--content-image">${tweetImg}</div>
            <div class="timeline__tweet--content-actions flex flex-align-center">
                <div class="comment">
                <span class="material-symbols-outlined">
                    add_comment
                </span>
                </div>
                <div class="retweet">
                <span class="material-symbols-outlined">
                    repeat
                </span>
                </div>
                <div class="like">
                <span class="material-symbols-outlined likeBtn">
                    favorite
                </span>
                </div>
                <div class="share">
                <span class="material-symbols-outlined">
                    upload
                </span>
                </div>
            </div>
            </div>
        </div>
    `
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