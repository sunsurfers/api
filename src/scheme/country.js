var Sequelize = require('sequelize'),
   db = require('../db'),
   User = require('./user');


var Country;
module.exports = Country = db.define('country', {
  code: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: Sequelize.STRING
}, {});

//Country.belongsTo(User, {foreignKey: 'code', targetKey: 'living'});