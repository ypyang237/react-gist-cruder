'use strict';
const React       = require('react'),
      ReactDOM    = require('react-dom'),
      HomePage    = require('./components/home_page'),
      App         = require('./components/app'),
      New         = require('./components/new.js')
      ;

const ReactRouter = require('react-router'),
      Router      = ReactRouter.Router,
      Route       = ReactRouter.Route,
      Link        = ReactRouter.Link,
      browserHistory = ReactRouter.browserHistory,
      IndexRoute  = ReactRouter.IndexRoute;

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage}></IndexRoute>
      <Route path="/new" component={New}></Route>
    </Route>
  </Router>,
  document.getElementById('app')
)