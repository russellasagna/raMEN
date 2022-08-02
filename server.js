var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');

// Load the secrets in the .env module
require('dotenv').config();
// Connect to our database (line of code must be AFTER the above - .env)
require('./config/database');
// Configure passport
require('./config/passport');

var indexRouter = require('./routes/index');
var animesRouter = require('./routes/animes');
var commentsRouter = require('./routes/comments');
var charactersRouter = require('./routes/characters');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(session({
  secret: process.env.GOOGLE_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Custom middleware to add the logged in user
// to the locals object so that we can access
// user within EVERY template we render without
// having to pass user: req.user from the controller
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

// Middleware to protect routes
const isLoggedIn = require('./config/auth');

app.use('/', indexRouter);
app.use('/animes', animesRouter);
// The starts with path for a related-resource,
// comments, varies, thus we cannot specify
// a starts with path
app.use('/', isLoggedIn, commentsRouter);
app.use('/', isLoggedIn, charactersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
