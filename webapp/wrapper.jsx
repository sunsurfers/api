var React = require('react');
var {RouteHandler, Link} = require('react-router');
var {ListGroup, ListGroupItem, Nav} = require('react-bootstrap');



module.exports = React.createClass({
  render: function () {
    return (
      <div className='container'>
        <ul className="nav nav-pills" style={{marginTop: '10px'}}>
          <li><Link to="home">Home</Link></li>
          <li><Link to="users">Users</Link></li>
          <li><Link to="/auth/signin">Signin</Link></li>
        </ul>

        <RouteHandler />
      </div>
    )
  }
});
