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
  // Need to "fix" date formatting to prevent day off by 1
  // This is due to the <input type="date"> returning the date
  // string in this format:  "YYYY-MM-DD"
  // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  const s = req.body.born;
  req.body.born = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
  // Alternative solution
  // req.body.born = req.body.born + 'T00:00';
  Character.create(req.body, function (err, character) {
    res.redirect('/characters/new');
  });
}

function newCharacter(req, res) {
  Character.find({})
  //Sort characters by their name
  .sort('name')
  .exec(function (err, characters) {
    res.render('characters/new', {
      title: 'Add Character',
      characters
    });
  });
}