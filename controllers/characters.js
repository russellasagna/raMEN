const Character = require('../models/character');
const Anime = require('../models/anime');

module.exports = {
  new: newCharacter,
  create,
  addToCast
};

function addToCast(req, res) {
  Anime.findById(req.params.id, function(err, anime) {
    anime.cast.push(req.body.characterId);
    anime.save(function(err) {
      res.redirect(`/animes/${anime._id}`);
    });
  });
}

function create(req, res) {
  const s = req.body.born;
  req.body.born = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
  Character.create(req.body, function (err, character) {
    res.redirect('/characters/new');
  });
}

function newCharacter(req, res) {
  Character.find({})
  .sort('name')
  .exec(function (err, characters) {
    res.render('characters/new', {
      title: 'Add Character',
      characters
    });
  });
}