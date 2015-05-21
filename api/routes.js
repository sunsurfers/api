var express = require('express');
var User = require('./scheme/user');
var router = express.Router();

/* GET index page */
router.get('/', function(req, res) {
  res.sendFile('index.html', {
    root: __dirname + '/public/'
  });
});

router.get('/users', function(req, res) {
  // dev fixtures
  User.all().then(function(users){
    res.send(users);
  });
});


module.exports = router;