const express = require('express');
const { login, register, registerPost } = require('./auth.controller');

const authRouter = express.Router();

authRouter.get('/login', login);
authRouter.route('/register').get(register).post(registerPost);

module.exports = authRouter;
