var Sequelize = require('sequelize'),
    dbconf = require('./conf/db-dev');

module.exports = new Sequelize(dbconf.name, dbconf.user, dbconf.password, {
  host: dbconf.host,
  dialect: dbconf.type
});