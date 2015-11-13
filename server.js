var express = require('express');
var path = require('path');

var db = require('./src/db');

var app = express();

var configuration = {
  sessionword: "secretsessionword",
  port: process.env.PORT || 8888,
  allowDomain: 'http://localhost:3333',
};


app.set('port', configuration.port);
app.use(require('static-favicon')());

app.use(require('morgan')(':remote-addr | :remote-user | :method :url > :status (:response-time ms)'));
app.use(require('body-parser').json());
//app.use(require('body-parser').urlencoded());
//app.use(require('cookie-parser')());

app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./src/middleware/allowCors')(configuration.allowDomain));
app.use(require('./src/middleware/updateUserLastActive'));


db.init().then(function () {
  var server = app.listen(app.get('port'), function () {
    console.log('[INIT]: server - on port ' + server.address().port);


    /**
     * AUTHORIZATION LOGIC
     * */
    // todo: вынеси куда-то
    var session = require('express-session');
    var passport = require('passport');
    var LocalStrategy = require('passport-local');

    var MD5 = require('MD5');
    var flash = require('connect-flash');
    app.use(session({secret: configuration.sessionword}));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions

    // Passport session setup.
    //   To support persistent login sessions, Passport needs to be able to
    //   serialize users into and deserialize users out of the session.  Typically,
    //   this will be as simple as storing the user ID when serializing, and finding
    //   the user by ID when deserializing.

    /*db.findUserByEmail(email).then(function(user){
      if(user) {

      }
    });*/

    function findUserByEmail(email, cb) {
      return db.query(`SELECT * FROM users WHERE email='${email}'`, cb)
    }

    passport.serializeUser(function (user, done) {
      done(null, user.email);
    });

    passport.deserializeUser(function (email, done) {
      findUserByEmail(email, function (err, user) {
        if (err) done(err, false);
        done(null, user);
      });
    });

    passport.use(new LocalStrategy({
          usernameField: 'email',
          passwordField: 'password',
          session: false,
          passReqToCallback: true
        },
        function (req, email, password, done) {
          findUserByEmail(email, function (err, user) {
            if (err) done(err, false);

            var user = rows;

            if (!user || MD5(password) !== user.password) {
              return done(null, false);
            }

            console.log('user ok', user.email);
            done(null, user);
          });
        }
    ));


    /**
     * ROUTES
     * */
    // todo: тоже вынеси
    (function () {
      app.use(
          '/',
          require('./src/routes')
      );

      /// catch 404 and forward to error handler
      app.use(function (req, res, next) {
        console.error('error of routing');
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
      });

      /// error handlers

      // development error handler
      // will print stacktrace
      if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
          res.status(err.status || 500);
          res.send({
            message: err.message,
            error: err
          });
        });
      }

      // production error handler
      // no stacktraces leaked to user
      app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send({
          message: err.message,
          error: {}
        });
      });
    })()
  });
});



