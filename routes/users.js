var express = require('express');
var router = express.Router();

const usersCtrl = require('../controllers/users');

// All routes "start with" /user (from server.js)

/* GET user (show functionality) */
router.get('/:id', usersCtrl.show);

module.exports = router;
