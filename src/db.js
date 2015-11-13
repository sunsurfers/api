var
/*mysql = require('mysql'),*/
    Promise = require('promise'),
    fs = require('fs'),
    moment = require('moment'),
    path = require('path'),
    _ = require('lodash');

var databaseRelativeLocation = './database.json';

/*var connection = mysql.createConnection({
 host: "127.0.0.1",
 user: "sunserfer",
 password: "nonsecurepassword",
 database: "suncommunity"
 });*/

var lastSavedDB = require(databaseRelativeLocation);

var database = {
  users: [].concat(lastSavedDB.users),
  locations: [].concat(lastSavedDB.locations)
};

function saveDatabase() {
  fs.writeFile(path.join(__dirname, databaseRelativeLocation), JSON.stringify(database, null, 4))
}
var transformToSafeUser = (function () {
  var userPublicKeys = [
    'id',
    'nickname',
    'name',
    'surname',
    'living',
    'public_status',
    'description',

    'instagram_id',
    'facebook_id',
    'vkontakte_id',
    'couchsurfing_id',
    'swarm_id',
    'rallies',
  ];

  return function transformToSafeUser(user) {
    /* todo:
     if(user['password']) {
      user['password'] = MD5(user['password'])
     }
     */
    return _.pick(user, userPublicKeys)
  }
})();


var methods = {
  init: function init() {
    return new Promise(function (resolve, reject) {
      /*connection.connect();

       connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
       if (err) {
       reject(err)
       console.error(err);
       process.exit(1);
       } else {
       console.log('[INIT]: database work fine');
       resolve()
       }
       })*/
      resolve();
    })
  },

  getUsers: function getUsers() {
    return new Promise(function (resolve, reject) {
      resolve(
          database.users.map(function(user){
            return _.omit(user, [
              'password',
              'created_at',
            ])
          })
      )
    });
  },

  updateUser: function updateUser(user_id, userData) {
    return new Promise(function (resolve, reject) {
      var userIndex = _.findIndex(database.users, 'id', user_id);

      if (userIndex === -1) {
        reject('Sunsurfer with id:' + user_id + ' not found in database')
      } else {
        database.users[userIndex] = Object.assign({},
            database.users[userIndex],
            transformToSafeUser(userData)
        );
        saveDatabase();
        resolve();
      }
    })
  },

  addLocation: function addLocation(user_id, position) {
    return new Promise(function (resolve, reject) {
      var sunsurferIndex = _.findIndex(database.users, 'id', user_id);

      if (sunsurferIndex === -1) {
        reject('Sunsurfer with id:' + id + ' not found in database')
        return;
      }

      database.locations.push({
        user_id: user_id,
        created_at: (new Date()).toString(),
        lat: position.lat,
        lng: position.lng
      });
      saveDatabase();

      resolve();
    })
  },

  getUsersChangeDate: function getUsersChangeDate() {
    return new Promise(function (resolve, reject) {
      resolve(
          database.users.reduce(
              function (prev, user) {
                return moment(new Date(user.updated_at)).isAfter(new Date(prev.updated_at))
                    ? user
                    : prev
              },
              database.users[0]
          ).updated_at
      )
    });
  },
  getLocations: function getLocations() {
    return new Promise(function (resolve, reject) {
      resolve(
          _.reduce(
              _.groupBy(database.locations, 'user_id'),

              function(tree, locations, user_id){
                tree[user_id] = _.max(locations, function(loc){
                  return (new Date(loc.created_at)).getTime()
                });
                return tree
              },
              {}
          )
      )
    });
  },
  getLocationsChangeDate: function getLocationsChangeDate() {
    return new Promise(function (resolve, reject) {
      resolve(
          _.max(database.locations, function(loc){
            return (new Date(loc.created_at)).getTime()
          }).created_at
      )
    })
  }
};

module.exports = methods;