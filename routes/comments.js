const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

// The starts with path is '/'

// POST /animes/:id/comments
router.post('/animes/:id/comments', commentsCtrl.create);
// GET /comments/:id/edit
router.get('/comments/:id/edit', commentsCtrl.edit);
// PUT /comments/:id
router.put('/comments/:id', commentsCtrl.update);
// DELETE /comments/:id
router.delete('/comments/:id', commentsCtrl.delete);

module.exports = router;