var express = require('express');
var router = express.Router();
var passport = require('passport');
var AuthenticationNeeded = require('./utils/AuthenticationNeeded');
var _ = require('lodash');


/* get INDEX page */
router.get('/', function (req, res) {
  res.send("<h1>api.sunsurfers</h1>");
});


/*
* завести базовые фикшуры, как будто проект уже есть
* поимитировать ответочку, как будто это бд
* */

/*
формат ответа:
{
  status: 'success' || 'fail',
  message: '',
  data: ...
}
*/

router.get('/sunsurfers', AuthenticationNeeded, function (req, res) {
  /*
    if req['if-modified-since'] <= lastModifiedDate
     send 304
    else
     send 200 and data
  */
});

router.get('/locations', AuthenticationNeeded, function (req, res) {
  /*
   if req['if-modified-since'] <= lastModifiedDate
    send 304
   else
    send 200 and data
   */
});
router.post('/locations/add', AuthenticationNeeded, function (req, res) {
  /*
  * db.addPin
  *   success
  *   fail
  * */
});

router.post('/profile/update', AuthenticationNeeded, function (req, res) {
  /*
   * db.updateUser
   *  success
   *  fail
   * */
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
router.get('/auth-fail', function (req, res) {
  res.status(401).send({status: 'fail'})
});

router.get('/auth-success', function (req, res) {
  res.status(200).send({status: 'success'})
});


router.get('/401', function (req, res) {
  res.status(401).send({message: 'You should be authorize for this query'})
});


module.exports = router;