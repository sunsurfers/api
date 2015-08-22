var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');

var basicConf = require('./conf/basic-dev.json');
var User = require('./scheme/user');
var MD5 = require('MD5');
var flash = require('connect-flash');

module.exports = [
  function (app) {
    // authorisation
    app.use(session({secret: basicConf.sessionword}));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions


    // Passport session setup.
    //   To support persistent login sessions, Passport needs to be able to
    //   serialize users into and deserialize users out of the session.  Typically,
    //   this will be as simple as storing the user ID when serializing, and finding
    //   the user by ID when deserializing.
    passport.serializeUser(function (user, done) {
      done(null, user.email);
    });

    passport.deserializeUser(function (email, done) {
      User.findOne({where: {email: email}}).then(function (res) {
        done(null, res.dataValues);
      });
    });

    passport.use(new LocalStrategy({
         usernameField: 'email',
         passwordField: 'password',
         session: false,
         passReqToCallback: true
       },
       function (req, email, password, done) {
         User.findOne({where: {email: email}}).then(function (res) {
           var user = res.dataValues;

           if (!user) {
             return done(null, false);
           } else if (MD5(password) !== user.password) {
             return done(null, false);
           }

           console.log('user ok', user.email);
           return done(null, user);

         }, function (err) {
           done(err, false);
         });
       }
    ));
  },
  function (app) {
    // all routes
    app.use(
       '/',
       require('./routes')
    );
  },
  function (app) {
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
  },

  function (app, server) {
    require('./chat/index')(
       require('socket.io')(server)
    );
  }
];
