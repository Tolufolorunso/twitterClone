const mongoose = require('mongoose');

const connectDB = (url) => {
  console.log('db connected...', url);
  
  return mongoose.connect(url);
};

module.exports = connectDB;
