var debug = require('debug')('server.js');
var express = require('express');
var path = require('path');

var db = require('./api/db');

var app = express();

var noop = function () {};

app.use(require('static-favicon')());
app.use(require('morgan')('dev'));
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded());
app.use(require('cookie-parser')());
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);



db.authenticate().then(function(){
  require('./api/initializers').forEach(function (method) {
    method(app);
  });

  var server = app.listen(app.get('port'), function () {
    console.log('OK: The magic happens on port ' + server.address().port);
  });
}, function (err) {
  console.error('ERROR: Unable to connect to the db "' + db.config.database + '":', err);
});




