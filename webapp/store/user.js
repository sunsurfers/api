var ReFlux = require('reflux'),
    userActions = require('../action/user'),
    api = require('../core/api'),
    throttle = require('lodash/function/throttle');

var errorHandle = console.error.bind(console);

var {Navigation} = require('react-router');

function set(key, value){
  if (!this.data.hasOwnProperty(key)) {
    throw new Error('key "' + key + '" not found in store')
  }

  this.data[key] = value;

  this.flash(this.data)
}

module.exports = ReFlux.createStore({
  set: set,

  data: {
    users: [],
    authorised: false
  },

  init: function () {
    this.flash = throttle(function(){
      this.trigger.apply(this, arguments)
    }.bind(this), 30);

    this.listenTo(userActions.downloadUsers, this.downloadUsers);
    this.listenTo(userActions.signIn, this.signIn);
  },

  downloadUsers: function () {
    return api.get('/users')
        .then(function (users) {
          this.set('users', users);
        }.bind(this), errorHandle)
  },
  signIn: function(authParams){
    return api.post('/signIn', authParams)
        .then(function (data) {
          if (data.status === 'success') {
            this.set('authorised', true);
            Navigation.transitionTo('users');
          } else if (data.status === 'fail') {
            this.set('authorised', false);
          }
        }.bind(this), errorHandle)
  }
});