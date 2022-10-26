const express = require('express');
const { login, register } = require('./auth.controller');

const authRouter = express.Router();

authRouter.get('/login', login);
authRouter.get('/register', register);

module.exports = authRouter;
