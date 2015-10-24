var db = require('./src/db'),
    User = require('./src/scheme/user'),
    //Country = require('./src/scheme/country'),
    users = require('./fixture/users.json').users;


//User.sync({force: true}).then(function(){
//  users.forEach(function(user){
//    User.create(user);
//  });
//});


//
//Country.sync({force: true}).then(function(){
//  require('world-countries').map(function(country){
//    return {
//      name: country.name.common,
//      code: country.cca2
//    }
//  }).forEach(function(country){
//    Country.create(country);
//  });
//});
