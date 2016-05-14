'use strict';

var React = require('react');

const GistItem = React.createClass({

  render: function() {
    console.log(this.props)
    return (
      <div className="GistItem">
      <h1> one Gist Content </h1>
      <p> {this.props.content} </p>
      </div>

      )

  }


})

module.exports = GistItem;















