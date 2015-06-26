var React = require('react');
var {Route, DefaultRoute, NotFoundRoute, Redirect} = require('react-router');

getPage = function(name) {
  return require('./page/' + name + '.jsx')
};

module.exports = (
    <Route handler={require('./wrapper.jsx')} path='/'>
      <DefaultRoute name="home" handler={getPage('home')} />

      <Route name="users" handler={getPage('users')} />

      <Route name="auth" handler={getPage('auth')}>
        <DefaultRoute handler={getPage('auth.signin')} />

        <Route path="signin" handler={getPage('auth.signin')} />
        <Route path="signup" handler={getPage('auth.signup')} />
        <Route path="passrecover" handler={getPage('auth.passrecover')} />
      </Route>
    </Route>
);


//<Route handler={AppHandler}>
//  <DefaultRoute handler={TodoHandler} />
//  <Route name="all" path="/" handler={TodoHandler} action="all" />
//  <Route name="active" path="/active" handler={TodoHandler} action="active" />
//  <Route name="completed" path="/completed" handler={TodoHandler} action="completed" />
//</Route>