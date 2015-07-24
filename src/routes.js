var express = require('express');
var User = require('./scheme/user');
var router = express.Router();
var passport = require('passport');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/fail');
}

/* GET index page */
router.get('/', function(req, res) {
  res.sendFile('index.html', {
    root: __dirname + '/public/'
  });
});


router.get('/users', ensureAuthenticated, function(req, res) {
  // dev fixtures
  User.all().then(function(users){
    res.send(users);
  });
});



/* Authentification */
router.get('/signin-fail', function(req, res) {
  res.send({status: 'fail'})
});

router.get('/signin-success', function(req, res) {
  res.send({status: 'success'})
});


router.post(
    '/signIn',
    passport.authenticate('local', {
      failureRedirect: '/signin-fail',
      successRedirect: '/signin-success',
      failureFlash: true
    })
);


module.exports = router;