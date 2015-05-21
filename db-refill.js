var db = require('./api/db'),
    User = require('./api/scheme/user'),
    users = require('./fixture/users.json').users;


User.sync({force: true}).then(function(){
  users.forEach(function(user){
    User.create(user);
  });
});
