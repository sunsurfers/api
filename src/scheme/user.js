var Sequelize = require('sequelize'),
   db = require('../db'),
   //Countries = require('./country'),
   Promise = require('promise'),
   _ = require('lodash');

module.exports = User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: Sequelize.STRING,
  password: Sequelize.STRING,

  name: Sequelize.STRING,
  surname: Sequelize.STRING,
  living: Sequelize.STRING,
  public_status: Sequelize.STRING,
  description: Sequelize.STRING,

  status: Sequelize.ENUM('unknown', 'wasongathering', 'approved'),

  instagram_id: Sequelize.STRING,
  facebook_id: Sequelize.STRING,
  vkontakte_id: Sequelize.STRING
}, {
  hooks: {
    afterFind: function () {
      //console.log('afterFind', arguments)
    }
  },
  classMethods: {
    getSafeList: function () {
      return new Promise(function (resolve, reject) {
        this.all().then(function (users) {
          resolve(users.map(function (user) {
            return _.pick(user,
               "id",
               "email",
               // "password", // not allow password to public
               "name",
               "surname",
               "living",
               "public_status",
               "description",
               "status",
               "instagram_id",
               "facebook_id",
               "vkontakte_id"
            );
          }))
        }, reject);
      }.bind(this))
    }
  }
});


//User.belongsTo(Countries, {foreignKey: 'living', targetKey: 'code'})