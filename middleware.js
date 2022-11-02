// exports.requireLogin = (req, res, next) => {
//   if (req.session && req.session.user) {
//     return next();
//   } else {
//     return res.redirect('/auth/landing');
//   }
// };

exports.requireLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/auth/landing');
  }
};
