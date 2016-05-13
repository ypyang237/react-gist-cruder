'use strict';
var React = require('react');

const GistList = React.createClass({


  onItemClick: function(item) {
    console.log(item.url);
    var contentUrl = item.url;

      $.ajax({
        url: item.url,
        type: 'GET',
        beforeSend: (xhr) => {
          xhr.setRequestHeader('Authorization', "token " + this.props.accessToken);
        },
        dataType: 'json',
        cache: false,
        success: function(data) {
          console.log('data', data);
          this.setState({ oneGistItem: data })
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.userUrl, status, err.toString());
        }.bind(this)
      })
    },




  render: function() {
    var component = this;
    var gistListNode = this.props.gists.map(function(oneGistItem) {

          let boundItemClick = component.onItemClick.bind(this, oneGistItem);

          return (
            <oneGistItem key={oneGistItem.id} id={oneGistItem.url} onClick={boundItemClick}>
              {oneGistItem.description}
              {oneGistItem.url}
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