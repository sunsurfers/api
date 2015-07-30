var express = require('express');
var User = require('./scheme/user');
var router = express.Router();
var passport = require('passport');
var AuthenticationNeeded = require('./utils/AuthenticationNeeded');



/* get INDEX page */
router.get('/', function (req, res) {
  res.sendFile('index.html', {
    root: __dirname + '/public/'
  });
});

/* get USERS page */
router.get('/users', AuthenticationNeeded, function (req, res) {
  // dev fixtures
  User.getSafeList().then(function (users) {
    res.send(users);
  });
});


/* User try to authorize */
router.post(
   '/signIn',
   passport.authenticate('local', {
     failureRedirect: '/signin-fail',
     successRedirect: '/signin-success',
     failureFlash: true
   })
);


/* FAIL/SUCCESS responses for authorize try */
router.get('/signin-fail', function (req, res) {
  res.send({status: 'fail'})
});

router.get('/signin-success', function (req, res) {
  res.send({status: 'success'})
});


module.exports = router;