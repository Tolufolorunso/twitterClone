const { StatusCodes } = require('http-status-codes');
const TweetModel = require('../../models/Tweet.model');

const postTweet = async(req,res) => {
    if (!req.file && !req.body.tweet) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            message: 'You didnt post anything'
        })
      }
      console.log(req,session.user)
      const tweetData = {
        tweetText: req.body.tweet || '',
        tweetImg: req.file?.filename || '',
        postedBy: req.session.user
      }

    //   const tweet = await TweetModel.create();
    
    //   res.status(StatusCodes.OK).json({
    //     status: true,
    //     message: 'tweet successful',
    //     tweet,
    //   });
    res.status(StatusCodes.CREATED).json(req.body)
}

module.exports = {postTweet}