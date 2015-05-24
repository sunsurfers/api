var React = require('react');
var {Table} = require('react-bootstrap');
var api = require('../core/api.js');
var map = require('lodash/collection/map');

module.exports = React.createClass({
  componentWillMount: function () {
    // how to cache?
    api.get('/users').then(function (users) {
      this.setState({
        users: users
      })
    }.bind(this));
  },
  getInitialState: function () {
    return {
      users: null
    }
  },

  render: function () {
    var {users} = this.state;

    if (users == null) {
      return (<div>Loading...</div>)
    }

    return (<Table striped bordered condensed hover responsive >
      <thead>
        <tr>
          {Object.keys(users[0]).map(function (key) {
            return (<th key={key}>{key}</th>)
          })}
        </tr>
      </thead>
      <tbody>{map(users, function (user) {
        return (<tr key={user.id}>
          {map(user, function (value, key) {
            return (<td key={key}>{value}</td>)
          })}
        </tr>)
      })}</tbody>
    </Table>);
  }
});
