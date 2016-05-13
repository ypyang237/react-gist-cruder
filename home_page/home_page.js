'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

var GistList = require('./gist_list.js');
var oneGistItem = require('./gist_item.js');


  const HomePage = React.createClass({

    getInitialState: function() {
        return {
          // route: window.location.hash.substr(1)
         gists : [],
         oneGistItem: '',
         contentUrl: '',
         userUrl: '',
         id : '',
         accessToken: ''
        };
    },


    componentWillMount: function() {
      var anchor = location.hash;
      var username = anchor.split('username=')[1];
      var token = (anchor.split('=')[1]).split('&')[0]


      this.setState({ userUrl: 'https://api.github.com/users/'+ username + '/gists' });
      this.setState({ accessToken: token})
    },



    loadDataFromGithub: function() {
      $.ajax({
        url: this.state.userUrl,
        type: 'GET',
        beforeSend: (xhr) => {
          xhr.setRequestHeader('Authorization', "token " + this.state.accessToken);
        },
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({ gists: data })
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.userUrl, status, err.toString());
        }.bind(this)
      })

    },





    componentDidMount: function() {
      // window.addEventListener('hashchange', _ => {
      //   this.setState({
      //     route: window.location.hash.substr(1)
      //   })
      // });
      this.loadDataFromGithub();

      var contentUrl = (this.props)
      // this.setState({ contentUrl: contentUrl});
      console.log('URL', contentUrl)

      window.addEventListener('click', this.loadOneGistItem, false)


    },


    render: function() {
      return (
        <div>
          <h1> Gist Manager </h1>
          <GistList gists={this.state.gists} accessToken={this.state.accessToken} />
          <oneGistContent oneGist={this.state.oneGistItem} />
        </div>
        )
    }

  })






ReactDOM.render(
  <HomePage />,
  document.getElementById('content')
  )

