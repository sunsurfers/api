var React = require('react');
var Router = require('react-router');
var {Handler} = Router;
var routes = require('./routes.jsx');

document.addEventListener('DOMContentLoaded', function() {
  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
  });
});
