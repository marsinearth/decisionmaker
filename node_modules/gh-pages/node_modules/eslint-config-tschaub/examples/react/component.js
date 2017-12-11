import React from 'react';
import ReactDOM from 'react-dom';

const HelloMessage = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

ReactDOM.render(<HelloMessage name="John" />, document.getElementById('root'));
