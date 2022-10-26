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

module.exports = {
  login,
  register,
};
