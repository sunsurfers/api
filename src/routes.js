var express = require('express');
var router = express.Router();
var passport = require('passport');
var AuthenticationNeeded = require('./middleware/AuthenticationNeeded');
var _ = require('lodash');
var db = require('./db');


/*
 if req['if-modified-since'] <= lastModifiedDate
 send 304
 else
 send 200 and data
 */
var user_id = 2;


/* get INDEX page */
router.get('/', function (req, res) {
  res.send(
      "<h1 style='font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace; text-align: center; margin-top: 50px;'>" +
      "api.sunsurfers v" + process.env.npm_package_version +
      "</h1>"
  );
});

router.get('/who-are-all-these-people', AuthenticationNeeded, function (req, res) {
  db.getUsers().then(function (results) {
    res.json(results);
  }, errorSender(res))
});

router.get('/where-all-gone', AuthenticationNeeded, function (req, res) {
  db.getLocations().then(function (results) {
    res.json(results)
  }, errorSender(res))
});


router.post('/pin-me-baby', AuthenticationNeeded, function (req, res) {
  db.addLocation(user_id, req.body).then(function () {
    res.status(200).send('теперь мы знаем где ты!')
  }, errorSender(res));
});

router.post('/save-my-secrets', AuthenticationNeeded, function (req, res) {
  db.updateUser(user_id, req.body).then(function () {
    res.status(200).send('я не злопамятный, я записываю')
  }, errorSender(res))
});


/* User try to authorize */
router.post(
    '/auth',
    passport.authenticate('local', {
      failureRedirect: '/auth-fail',
      successRedirect: '/auth-success',
      failureFlash: true
    })
);

router.get('/auth-success', function (req, res) {
  res.status(200).send('добро пожаловать в матрицу парень \n следуй за белым кроликом')
});

router.get('/auth-fail', function (req, res) {
  res.status(401).send({message: 'authorization fail'})
});


router.get('/401', function (req, res) {
  res.status(401).send({message: 'You should be authorize for this query'})
});


function errorSender(res) {
  return function (err) {
    res.status(400).json({
      error: err
    });
  }
}

module.exports = router;