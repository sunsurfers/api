var Sequelize = require('sequelize'),
   db = require('../db');

module.exports = db.define('country', {
  code: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: Sequelize.STRING
}, {});