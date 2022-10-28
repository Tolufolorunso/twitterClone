const express = require('express');
const {
  login,
  register,
  registerPost,
  landingPage,
  loginPost,
} = require('./auth.controller');

const authRouter = express.Router();

authRouter.get('/landing', landingPage);
authRouter.route('/login').get(login).post(loginPost);
authRouter.route('/register').get(register).post(registerPost);

module.exports = authRouter;
