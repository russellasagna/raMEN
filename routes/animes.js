

var express = require('express');
var router = express.Router();
const passport = require('passport');

const animesCtrl = require('../controllers/animes');

// All routes "start with" / (from server.js)

/* GET animes/home (index functionality) */
router.get('/', animesCtrl.index);
/* POST animes/anime (show functionality) */
router.post('/anime', animesCtrl.show);

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
    successRedirect: '/',
    failureRedirect: '/'
  }
));
// Google OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/');
  });
});

module.exports = router;
