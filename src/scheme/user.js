var Sequelize = require('sequelize'),
   db = require('../db'),
   //Country = require('./country'),
   Promise = require('promise'),
   _ = require('lodash');


var User;
module.exports = User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nickname: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,

  name: Sequelize.STRING,
  surname: Sequelize.STRING,
  public_status: Sequelize.STRING,
  description: Sequelize.STRING,

  status: Sequelize.ENUM('unknown', 'wasongathering', 'approved'),

  instagram_id: Sequelize.STRING,
  facebook_id: Sequelize.STRING,
  vkontakte_id: Sequelize.STRING

  //living: Sequelize.STRING
}, {
  hooks: {
    afterFind: function () {
      //console.log('afterFind', arguments)
    }
  },
  classMethods: {
    getSafeUser: function(nickname){
      return new Promise(function (resolve, reject) {
        this.findOne({ where: {nickname: nickname} }).then(function (user) {
          resolve(pickSafeFieldsFromUser(user));
        }, reject);
      }.bind(this))
    },
    getSafeList: function () {
      return new Promise(function (resolve, reject) {
        this.all().then(function (users) {
          resolve(users.map(pickSafeFieldsFromUser))
        }, reject);
      }.bind(this))
    }
  }
});


function pickSafeFieldsFromUser(user) {
  return _.pick(user,
     "id",
     "email",
     // "password", // not allow password to public
     "name",
     "nickname",
     "surname",
     "living",
     "public_status",
     "description",
     "status",
     "instagram_id",
     "facebook_id",
     "vkontakte_id"
  );
}

