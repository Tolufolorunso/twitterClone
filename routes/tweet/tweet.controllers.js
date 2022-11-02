const { StatusCodes } = require('http-status-codes');
const Tweet = require('../../models/Tweet.model');
const User = require('../../models/User.model');

const getTweets = async (req, res) => {
    try {
        const tweets = await Tweet.find({}).populate('postedBy')

        res.status(StatusCodes.OK).json({
            status: true,
            result: 9,
            tweets
        })
    } catch (error) {
        res.sendStatus(400)
    }
}

const postTweet = async (req, res) => {
    if (!req.file && !req.body.tweet) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            message: 'You didnt post anything'
        })
    }
    const tweetData = {
        tweetText: req.body.tweet || '',
        tweetImg: req.file?.filename || '',
        postedBy: req.user._id
    }

    try {
        let tweet = await Tweet.create(tweetData);
        tweet = await User.populate(tweet, { path: 'postedBy' })
        res.status(StatusCodes.CREATED).json({
            status: true,
            message: 'tweet successful',
            tweet,
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
        });
    }
}

const likeTweet = async (req, res) => {
    let tweetId = req.params.tweetId
    let userId = req.user._id

    const isLiked = req.session.user.likes && req.session.user.likes.includes(tweetId)

    const option = isLiked ? '$pull' : '$addToSet'

    try {

        req.session.user = await User.findByIdAndUpdate(userId, {
            [option]: { likes: tweetId }
        }, { new: true })

        const tweet = await Tweet.findByIdAndUpdate(tweetId, {
            [option]: { likes: userId }
        }, { new: true })

        res.json({
            status: true,
            message: 'success',
            tweet
        })
    } catch (error) {
        res.sendStatus(400)
    }

}

module.exports = { getTweets, postTweet, likeTweet }