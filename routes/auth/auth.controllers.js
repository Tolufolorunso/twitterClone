const { StatusCodes } = require('http-status-codes');
const User = require('../../models/User.model');

const landingPage = (req, res) => {
  res.status(200).render('auth/landing', {
    pageTitle: 'Tweeter. It’s what’s happening / Tweeter',
  });
};

const login = (req, res, next) => {
  console.log('hello');
  const payload = {
    pageTitle: 'Login | Page',
  };
  res.status(200).render('auth/login', payload);
};

const register = (req, res, next) => {
  const payload = {
    pageTitle: 'Register | Page',
    errorMsg: '',
    errorObj:{
      phone: '',
      email: '',
      username: ''
    },
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  res.status(200).render('auth/register', payload);
};

const registerPost = async (req, res, next) => {
  const { firstname, lastname, username, email, password, confirmPassword,phone } =
    req.body;
  if (
    !firstname ||
    !lastname ||
    !username ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    return res.status(StatusCodes.BAD_REQUEST).render('auth/register', {
      pageTitle: 'register page',
      errorMsg: 'All fields required',
      errorObj:{
        phone: '',
        email: '',
        username: ''
      },
      firstname,
      lastname,
      username,
      email,
      password,
      confirmPassword,
    });
  }
  const userExists = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (userExists) {
    return res.status(StatusCodes.BAD_REQUEST).render('auth/register', {
      pageTitle: 'register page',
      errorMsg: `${
        userExists.email === email
          ? 'Email already in use'
          : 'Username already in use'
      }`,
      errorObj:{
        phone: userExists.phone === phone ? 'Phone already in use' : '',
        email: userExists.email === email.toLowerCase() ? 'Email already in use' : '',
        username: userExists.username === username.toLowerCase() ? 'Username already in use' : '',
      },
      firstname,
      lastname,
      username,
      email,
      password,
      confirmPassword,
    });
  }

  const user = await User.create({ ...req.body });
  req.session.user = user;

  res.status(201).redirect('/');
};

const loginPost = async (req, res, next) => {
  const { logUser, password } = req.body;
  console.log(logUser, password);
  if (!logUser || !password) {
    return res.status(StatusCodes.BAD_REQUEST).render('auth/login', {
      pageTitle: 'register page',
      error: 'All fields required',
      logUser,
      password,
    });
  }

  const user = await User.findOne({
    $or: [{ username: logUser }, { email: logUser }, { phone: logUser }],
  }).select('+password');

  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).render('auth/login', {
      pageTitle: 'register page',
      error: 'Invalid credentials',
      logUser,
      password,
    });
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.status(StatusCodes.BAD_REQUEST).render('auth/login', {
      pageTitle: 'register page',
      error: 'Invalid credentials',
      logUser,
      password,
    });
  }

  req.session.user = user;

  res.status(201).redirect('/');
};

module.exports = {
  landingPage,
  login,
  register,
  registerPost,
  loginPost,
};
