var ReFlux = require('reflux'),
    userActions = require('../action/user'),
    api = require('../core/api');

module.exports = ReFlux.createStore({
  init: function () {
    this.listenTo(userActions.downloadUsers, this.downloadUsers);
  },
  downloadUsers: function () {
    return api.get('/users')
        .then(function (users) {
          this.users = users;
          this.trigger(users);
        }.bind(this))
  }
});