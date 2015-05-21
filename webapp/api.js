var transport = require('superagent');
var Promise = require('promise');



/*
* Use like:
*   require('./api')
*     .get('/users', {id: 42})
*     .then(
*       function resolve(data, response){},
*       function reject(err, response) {}
*     )
* */

 module.exports = {
  get: function (path, extra) {
    return new Promise(function (resolve, reject) {
      transport
          .get(path)
          .send(extra || {})
          .end(function(err, res){
            if(err == null) {
              resolve(res.body, res)
            } else {
              reject(err, res)
            }
          });
    });
  }
};