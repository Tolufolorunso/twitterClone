const login = (req, res, next) => {
  console.log('hello');
  const payload = {
    pageTitle: 'Welcome Home',
  };
  res.status(200).render('auth/login', payload);
};

const register = (req, res, next) => {
  console.log('hello');
  const payload = {
    pageTitle: 'Welcome Home',
  };
  res.status(200).render('auth/register', payload);
};

const registerPost = (req, res, next) => {
  console.log(req.body);
  const payload = {
    pageTitle: 'Welcome Home',
  };
  res.status(200).json(req.body);
};

module.exports = {
  login,
  register,
  registerPost,
};
