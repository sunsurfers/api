var debug = require('debug')('server.js');
var express = require('express');
var path = require('path');

var db = require('./src/db');

var app = express();

var noop = function () {};

app.use(require('static-favicon')());
app.use(require('morgan')('dev'));
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded());
app.use(require('cookie-parser')());
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 8888);

app.use(
   require('./src/utils/allowCors')('http://localhost:3333')
);


db.connect();

db.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
  if (err) {
    console.error(err)
  }
  console.log('[INIT]: database work fine');


  var server = app.listen(app.get('port'), function () {
    console.log('[INIT]: server - on port ' + server.address().port);

    require('./src/initializers').forEach(function (method) {
      method(app, server, db);
    });
  });

});



