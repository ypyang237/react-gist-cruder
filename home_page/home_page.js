'use strict';
const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route
const Link = ReactRouter.Link
const BrowserHistory = ReactRouter.browserHistory
const IndexRoute = ReactRouter.IndexRoute

var GistList = require('./gist_list.js');


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

    },


    render: function() {
      return (
        <div>
          <h1> Gist Manager </h1>
          <li><Link to="/new"> Create New Gist </Link></li>

          <GistList gists={this.state.gists} accessToken={this.state.accessToken} />
        </div>
        )
    }

  })


  const App = React.createClass({
    render: function() {
      return(
      <div className="app">
        <h1> Welcome to Gist CRUDer </h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/new"> Create New Gist </Link></li>
        </ul>
         {this.props.children}
      </div>
      )
    }

  })


  const New = React.createClass({
    render: function() {
      return (
          <div>
           <h2>New</h2>
          </div>
        )
    }

  })






ReactDOM.render(
  (
    (
    <Router history={BrowserHistory}>
      <Route path="/" component={App}>
        <Route path="new" component={New}> </Route>
      </Route>
    </Router>
    )

  ), document.getElementById('content'))

