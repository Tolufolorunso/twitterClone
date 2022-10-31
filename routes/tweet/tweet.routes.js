const express = require('express');
const {
  postTweet, getTweets, likeTweet
} = require('./tweet.controllers');

const tweetRouter = express.Router();


tweetRouter.route('/').post(postTweet).get(getTweets);
tweetRouter.route('/:tweetId/likes').patch(likeTweet)

module.exports = tweetRouter;
