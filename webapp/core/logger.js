var logs = []

var logger = function (moduleName, eventName, data) {
  logs.push({
    'module': moduleName,
    'event': eventName,
    'data': data
  });
};

logger.show = function (query) {
  if (typeof query === 'undefined') {
    return logs;
  }

  var filteredLogs = logs.filter(function (log, i) {
    var equalParams = 0;
    for (var key in query) {
      if (log[key] === query[key]) {
        equalParams++
      }
    }
    return equalParams === Object.keys(query).length;
  });

  return filteredLogs.length > 0 ? filteredLogs : undefined;
};

logger.send = function () {
  console.log('logger.send')
};

logger.curry = function(moduleName){
  return function(eventName, data){
    return logger(moduleName, eventName, data);
  }
};

// it's dirty hack for debugging )) in webpack exist true way to do like this
window.logger = logger;

module.exports = logger;