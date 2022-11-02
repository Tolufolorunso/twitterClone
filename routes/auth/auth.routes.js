const express = require('express');
const passport = require('passport');
const {
  login,
  register,
  registerPost,
  landingPage,
  loginPost,
} = require('./auth.controllers');

const authRouter = express.Router();

authRouter.get('/landing', landingPage);
authRouter.route('/login').get(login).post( passport.authenticate('local', {failureRedirect:'/login'}), loginPost);
authRouter.route('/register').get(register).post(registerPost);

module.exports = authRouter;
