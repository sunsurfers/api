module.exports = function (domain) {
  if (!domain) {
    console.error('set DOMAIN for allowing cors')
    return;
  }

  return function (req, res, next) {
    res.header('Access-Control-Allow-Origin', domain);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Request-Headers', 'x-requested-with');

    next();
  }
};


