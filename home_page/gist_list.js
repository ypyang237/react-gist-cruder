'use strict';
var React = require('react');




const GistList = React.createClass({
  render: function() {
    console.log('this.props',this.props)
    var gistListNode = this.props.gists.map(function(oneGistItem) {
          return (
            <oneGistItem key={oneGistItem.id}>
              {oneGistItem.description}
            </oneGistItem>
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
