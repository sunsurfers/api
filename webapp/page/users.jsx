var React = require('react');
var {Table} = require('react-bootstrap');
var api = require('../core/api.js');
var map = require('lodash/collection/map');

var userStore = require('../store/user');
var userActions = require('../action/user');
var Reflux = require('reflux');


module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(userStore, 'userStoreHandle')
  ],
  userStoreHandle: function(users) {
    this.setState({
      users: users
    })
  },
  getInitialState: function(){
    return {
      users: null
    }
  },
  componentWillMount: function () {
    userActions.downloadUsers()
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
