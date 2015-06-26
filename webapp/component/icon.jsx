var React = require('react');

module.exports = React.createClass({
  render: function () {
    var {type} = this.props;
    if (!type) {
      return ''
    }
    var className = "glyphicon glyphicon-" + type;

    // TODO: fix font path in webpack (add /build/) then remove next line
    return (<span>*</span>);

    return (
        <span className={className} aria-hidden="true"></span>
    );
  }
});

