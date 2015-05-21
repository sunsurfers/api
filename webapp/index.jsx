/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');
var api = require('./api');
var {Alert, Button, ListGroup, ListGroupItem, Label} = require('react-bootstrap');


var UserItem = React.createClass({
  render: function(){
    var {user} = this.props;

    var info = _(user).map(function(value, key){
      return (<ListGroupItem><Label>{key}:</Label> <span>{value}</span></ListGroupItem>)
    }).value()

    return (<li><ListGroup>{info}</ListGroup><br /><br /></li>)
  }
});

var UserList = React.createClass({
  render: function(){
    var {users} = this.props;

    usersList = users.map(function(user){
      return (<UserItem user={user} />)
    });

    return <ol>{usersList}</ol>;
  }
});

var Root = React.createClass({
  render: function () {
    var {users} = this.props;

    var content = 'Загружаю список пользователей...'

    if (typeof users !== 'undefined') {
      content = (<UserList users={users} />)
    }
    return (
        <div>
          <h1>Привет реакт!</h1>
          {content}
        </div>
    )
  }
});

document.addEventListener("DOMContentLoaded", function (ev) {
  MountedRoot = React.render(
      (<Root />),
      document.getElementById("react-container")
  );


  api.get('/users').then(function(data, res){
    MountedRoot.setProps({
      users: data
    })
  });
});