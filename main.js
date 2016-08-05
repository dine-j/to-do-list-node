var express = require('express');
var passport = require('passport');
var strategy = require('passport-local').Strategy;

// Create new Express application.
var app = express();

app.set('views', __dirname + '/views')

app.get('/', function(req, res) {
  res.render('list.ejs', {});
})

app.listen(8080);