module.exports = function AuthenticationNeeded(req, res, next) {
  return next();

  /* Temporary disable */
  //if (req.isAuthenticated()) { return next(); }
  //res.redirect('/fail');
}