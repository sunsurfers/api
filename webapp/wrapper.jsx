var React = require('react');
var {RouteHandler, Link} = require('react-router');
var {ListGroup, ListGroupItem} = require('react-bootstrap');


module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <ListGroup>
            <ListGroupItem><Link to="home">Home</Link></ListGroupItem>
            <ListGroupItem><Link to="users">Users</Link></ListGroupItem>
        </ListGroup>

        <RouteHandler />
      </div>
    )
  }
});