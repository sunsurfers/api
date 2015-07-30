var db = require('./../db'),
    User = require('./../scheme/user'),
    users = require('./../../fixture/users.json').users;


User.sync({force: true}).then(function(){
  users.forEach(function(user){
    User.create(user);
  });
});
