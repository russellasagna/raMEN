var express = require('express');
var router = express.Router();

const commentsCtrl = require('../controllers/comments');

// All routes "start with" / (from server.js)

// POST /animes/:id/comments
router.post('/animes/:id/commments', commentsCtrl.create);
// DELETE /comments/:id
router.delete('/comments/:id', commentsCtrl.delete);

module.exports = router;
