'use strict';
var React = require('react');

  const New = React.createClass({

    getInitialState: function() {
        return {
          description : '',
          filename : '',
          content : '',
          publicity : 'public'
        };
    },

    componentWillMount: function() {

      if(location.hash.length > 50){
        var anchor = location.hash;
        var username = anchor.split('username=')[1];
        var token = (anchor.split('=')[1]).split('&')[0]

        this.setState({ userUrl: 'https://api.github.com/users/'+ username + '/gists' });
        this.setState({ accessToken: token})
      }

    },

    submitNew: function(event) {

      var publicity = true;
      if(this.state.publicity === 'private') {
        publicity = false;
      }

      var newGist = {
        description : this.state.description,
        filename : this.state.filename + '.md',
        publicity : publicity,
        content : this.state.content
      }

      var newReq = new XMLHttpRequest();
      newRequest.addEventListener('load', function() {
        window.location = '/'
      });
      newReq.open('POST', 'https://api.github.com/gists');
      newReq.setRequestHeader("Authorization", "token " + user.accessToken);
      newReq.send(JSON.stringify(newGist));

    },

  handleDescriptionChange : function(event){
    this.setState({description : event.target.value})
  },
  handleFileNameChange : function(event){
    this.setState({filename : event.target.value})
  },
  handleContentChange : function(event){
    this.setState({content : event.target.value})
  },
  handlePublicityChange : function(event){
    this.setState({publicity : event.target.value})
  },
  render : function(){
    return (
      <div className="Add Gist">
        <a href="/">Back</a>
        <h2>Create Gist</h2>
        <form onSubmit={this.handleSubmit}>
          <p>Gist Title:</p>
          <input
            type="text"
            placeholder="Gist Title"
            value={this.state.description}
            onChange={this.handleDescriptionChange}
          />
          <p>Gist Filename:</p>
          <input
            type="text"
            placeholder="Gist Filename"
            value={this.state.filename}
            onChange={this.handleFileNameChange}
          />
          <p>Content:</p>
          <input
            type="text"
            placeholder="Gist Title"
            value={this.state.content}
            onChange={this.handleContentChange}
          />
          <select value={this.state.publicity} onChange={this.handlePublicityChange}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          <input type="submit" />
        </form>
      </div>
    )
  }
});



module.exports = New;
