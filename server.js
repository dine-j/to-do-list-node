var express = require('express');
var bodyParser = require('body-parser');
var session = require('cookie-session');

// Create new Express application.
var app = express();

// Use sessions
app.use(session({secret: 'saveit'}))

.use(function(req, res, next) {
  if(typeof(req.session.todolist) == 'undefined') {
    req.session.todolist = [];
  }
  next();
});

var parser = bodyParser.urlencoded({extended: false});

app.use(parser);

// Tell express to use the folder /views for the views
app.set('views', __dirname + '/views')

// Display list
app.get('/', function(req, res) {
  res.render('list.ejs', {todolist: req.session.todolist});
})

// Get input
.post('/add/', function(req, res) {
	var task = req.body.task;
  if(task != '') { 
  		req.session.todolist.push(task);
  	}
  res.redirect('/');
})

// Modify task
.post('/modify/', function(req, res){
  var checklist = req.body;
  for(var index in checklist) {
      var task = checklist[index];
      // Delete
      if(task[0] == 'on') {
        req.session.todolist.splice(index, 1);
        break;
      }
      // Change label
      if(typeof(task) == 'string' && req.session.todolist[index] != task) {
        req.session.todolist[index] = task; 
      }
  };
  res.redirect('/');
});

app.listen(8080);