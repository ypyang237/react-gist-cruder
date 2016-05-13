'use strict';

var React = require('react');

const oneGistItem = React.createClass({

  render: function() {
    console.log('this.props',this.props);

    return (
      <div className="oneGistItem">
      <h1> one Gist item </h1>
      </div>

      )

  }


})

module.exports = oneGistItem;















