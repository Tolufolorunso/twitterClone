const { StatusCodes } = require('http-status-codes');
const Tweet = require('../../models/Tweet.model');
const User = require('../../models/User.model');

const getTweets = async (req,res) => {
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
        postedBy: req.session.user
    }

    try {
        let tweet = await Tweet.create(tweetData);
        tweet = await User.populate(tweet,{path: 'postedBy'})
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

const likeTweet = async (req,res) => {
    let tweetId = req.params.tweetId
    let userId = req.session.user._id

    const isLiked = req.session.user.likes && req.session.user.likes.includes(tweetId)
    console.log(isLiked)
    res.json(req.params)
}

module.exports = { getTweets,postTweet,likeTweet }