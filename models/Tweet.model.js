const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema(
  {
    tweetText: {
      type: String,
      minlength: 1,
      maxlength: 120,
      trim: true,
    },
    tweetImg: {
      type: String,
    },
    postedByImg: {
      type: String,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    pinned: Boolean,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('tweet', TweetSchema);
