var express = require('express');
var router = express.Router();
const animesCtrl = require('../controllers/animes');
const isLoggedIn = require('../config/auth');

// All routes "start with" /animes (from server.js)

// GET /animes (index functionality)
router.get('/', animesCtrl.index);
// GET /animes/new (new functionality)
router.get('/new', isLoggedIn, animesCtrl.new);
// GET /animes/:id (show functionality)
router.get('/:id', animesCtrl.show);
// POST /animes (create functionality)
router.post('/', isLoggedIn, animesCtrl.create);

module.exports = router;
