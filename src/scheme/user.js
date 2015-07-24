var Sequelize = require('sequelize'),
    db = require('../db');

module.exports = db.define('user', {
  email: {
    type: Sequelize.STRING,
    primaryKey: true
  },
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
}, {});



/* Locations */
/*
 * user_id
 * ltd
 * lng
 * date
 *
 * */
