var express = require('express');
var router = express.Router();

// All routes "start with" /index (from server.js)

router.get('', function(req, res, next) {
    res.render('index', { title: 'raMEN' });
});

module.exports = router;