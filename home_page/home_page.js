'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

var GistList = require('./gist_list.js');

var myGists = [
{id: 1, title: 'My first Gist', description: 'Always Be Committing'},
{id: 2, title: 'My second Gist', description: 'Always Be Committing'},
{id: 3, title: 'My third Gist', description: 'Always Be Committing'},
]

  const HomePage = React.createClass({

    render: function() {
      return (
        <div>
          <h1> Gist Manager </h1>
          <GistList myGists={myGists} />
        </div>
        )
    }

  })






ReactDOM.render(
  <HomePage />,
  document.getElementById('content')
  )

