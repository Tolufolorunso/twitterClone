exports.requireLogin = (req, res, next) => {
  if (req.session && req.seesion.user) {
    return next();
  } else {
    return res.redirect('/auth/login');
  }
};
