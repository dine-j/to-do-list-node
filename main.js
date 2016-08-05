var express = require('express');
var bodyParser = require('body-parser');
var session = require('cookie-session');
//var passport = require('passport');
//var strategy = require('passport-local').Strategy;

// Create new Express application.
var app = express();

// Use sessions
app.use(session({secret: 'todotposecret'}))

.use(function(req, resm next) {
  if(typeof(req.session.todolist) == 'undefined') {
    req.session.todolist = [];
  }
  next();
});

// Tell express to use the folder /views for the views
app.set('views', __dirname + '/views')

// Display list
app.get('/', function(req, res) {
  res.render('list.ejs', {todolist: req.session.todolist});
});

app.use(bodyParser.urlencoded({extended: false;}));

// Get input
app.post('/add', function(req, res)) {
  res.send
};

app.listen(8080);