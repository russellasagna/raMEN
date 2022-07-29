const express = require('express');
const router = express.Router();
const charactersCtrl = require('../controllers/characters');

// This router is mounted to a "starts with" path of '/'

// GET /characters/new
router.get('/characters/new', charactersCtrl.new);
// POST /characters
router.post('/characters', charactersCtrl.create);
// POST /animes/:id/characters
router.post('/animes/:id/characters', charactersCtrl.addToCast);

module.exports = router;