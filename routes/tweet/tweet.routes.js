const express = require('express');
const {
  postTweet
} = require('./tweet.controllers');

const tweetRouter = express.Router();


tweetRouter.route('/').post(postTweet);

module.exports = tweetRouter;
