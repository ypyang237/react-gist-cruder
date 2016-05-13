'use strict';

const express        = require('express'),
      app            = express(),
      PORT           = process.env.PORT || 3000,
      passport       = require('passport'),
      session        = require('express-session'),
      GitHubStrategy = require('passport-github2').Strategy,
      GitHub         = require('./githubfiles'),
      bodyParser     = require('body-parser'),
      queryString    = require('querystring')
      ;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: GitHub.GITHUB_CLIENT_ID,
    clientSecret: GitHub.GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {

    profile.accessToken = accessToken;

    return done(null, profile);

  }
));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));


app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
console.log('beep')
    var data = queryString.stringify({
      accessToken : req.user.accessToken,
      id : req.user.id,
      username : req.user.username
    });

    res.redirect('/#/' + data);
  });

app.get('/user', ensureAuthenticated, function(req, res){
  res.json(req.user);
});

app.listen(PORT, function(){
  console.log(`Server listening on port: ${PORT}`);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}