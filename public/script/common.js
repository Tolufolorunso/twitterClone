// Like tweet by user


const likeTweet = async (e) => {
    if (e.target.classList.contains('like')) {
        let button = e.target
        let tweetId = getTweetId(button)

        if (!tweetId) return alert('no tweet id')
        try {
            const response = await fetch(`/api/tweets/${tweetId}/likes`, { method: 'PATCH' })
            const result = await response.json()
            button.querySelector('.number').textContent = result.tweet.likes.length || ''
        } catch (error) {
            console.log(error)
        }
    }
}

const getTweetId = (el) => {
    // return console.log(el.parentNode.parentNode.parentNode.parentNode.dataset.id)
    return el.closest('.timeline__tweet').dataset.id
}

$('.timeline__tweets').addEventListener('click', likeTweet)

console.log($('.like'))