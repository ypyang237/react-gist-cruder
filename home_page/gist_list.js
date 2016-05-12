'use strict';
var React = require('react');




const GistList = React.createClass({
  render: function() {
    var gistListNode = this.props.myGists.map(function(oneGistItem) {
          return (
            <p key={oneGistItem.id}>
              {oneGistItem.title}
            </p>
          )
    })

    return (
      <div className="GistList">
        <h2> GistList</h2>
        <div> {gistListNode} </div>
      </div>
      )
  }


});

module.exports = GistList;
