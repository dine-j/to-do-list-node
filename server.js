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
  // console.log(req.session.todolist);
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

// Delete task
.post('/delete/', function(req, res){
  // console.log(req.body);
  var checklist = req.body;
  for(var index in checklist) {
      if(checklist[index] == 'on') {
        req.session.todolist.splice(index, 1);
      }
  };
  res.redirect('/');
});

app.listen(8080);