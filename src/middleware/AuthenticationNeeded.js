module.exports = function AuthenticationNeeded(req, res, next) {
  return next();

  /*if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/401');
  }*/
};