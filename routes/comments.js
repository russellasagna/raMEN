const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

// The starts with path is '/'

// POST /animes/:id/comments
router.post('/animes/:id/comments', commentsCtrl.create);
// DELETE /comments/:id
router.delete('/comments/:id', commentsCtrl.delete);

module.exports = router;