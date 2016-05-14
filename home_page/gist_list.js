'use strict';
var React = require('react');
var GistItem = require('./gist_item.js');


const GistList = React.createClass({


  getInitialState: function() {
      return {
        oneGistContent: ''
      };
  },


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
          var mother = data.files

          var readMes = Object.keys(mother)

          var keyData = mother[readMes[0]].content

          this.setState({ oneGistContent: keyData })
          console.log('this.state.oneGistCOntent', this.state.oneGistContent);
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.userUrl, status, err.toString());
        }.bind(this)
      })

    },



  render: function() {
    var component = this;
    var gistListNode = this.props.gists.map(function(oneGistTitle) {

          let boundItemClick = component.onItemClick.bind(this, oneGistTitle);

          return (
            <p key={oneGistTitle.id} id={oneGistTitle.url} onClick={boundItemClick}>
              {oneGistTitle.description}
            </p>
          )
    })


    return (
      <div className="GistList">
        <h2> GistList</h2>
        <div> {gistListNode} </div>
        <GistItem  content={this.state.oneGistContent}/>
      </div>
      )
  }


});

module.exports = GistList;