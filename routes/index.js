

var express = require('express');
var router = express.Router();
const passport = require('passport');

// All routes "start with" / (from server.js)

/* GET animes/home (index functionality) */
router.get('/', function(req, res, next){
    res.redirect('/animes');
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    // prompt: "select_account"
  }
));
// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/animes',
    failureRedirect: '/animes'
  }
));
// Google OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/animes');
  });
});

module.exports = router;
