var express = require('express');
var User = require('./scheme/user');
var Country = require('./scheme/country');
var router = express.Router();
var passport = require('passport');
var AuthenticationNeeded = require('./utils/AuthenticationNeeded');
var _ = require('lodash');


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

/* get USER */
router.get('/user/:nickname', AuthenticationNeeded, function (req, res) {
  // dev fixtures
  User.getSafeUser(req.params.nickname).then(function (user) {
    res.send(user);
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



/* Countries */

router.get('/all/countries', function (req, res) {
  Country.all().then(res.send.bind(res))
});
router.get('/all/users', function (req, res) {
  User.all().then(res.send.bind(res))
});




module.exports = router;