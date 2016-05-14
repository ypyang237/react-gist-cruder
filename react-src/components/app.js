'use strict';
var React = require('react');


const App = React.createClass({
  render: function() {
    return(
      <div className="app">
        <a href="/auth/github" id="click">Click here to begin!</a>
        <h1> Welcome to Gist CRUDer </h1>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/new"> Create New Gist </a></li>
        </ul>
         {this.props.children}
      </div>
    )
  }

})

module.exports = App;