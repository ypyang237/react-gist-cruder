'use strict';
const React    = require('react'),
      GistList = require('./gist_list.js')
      ;

  const HomePage = React.createClass({

    getInitialState: function() {
        return {
          // route: window.location.hash.substr(1)
         gists : [],
         oneGistItem: '',
         userUrl: '',
         id : '',
         accessToken: ''
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

    },


    render: function() {
      return (
        <div className="HomePage">
          <h1> Home Page </h1>
          <li><a href="/new"> Create New Gist </a></li>

          <GistList gists={this.state.gists} accessToken={this.state.accessToken} />
        </div>
        )
    }

  })

  module.exports = HomePage;


