const Anime = require('../models/anime');
const Character = require('../models/character');

// The fetch variable will be a function that behaves like fetch in the browser
const fetch = require('node-fetch');
const rootURL = "https://api.myanimelist.net/v2";

module.exports = {
  index,
  show,
  new: newAnime,
  create
};

function index(req, res) {
  Anime.find({}, function (err, animes) {
    res.render('animes/index', { title: 'All Animes', image: 'images/raMEN.png', animes });
  });
}

function show(req, res) {
  Anime.findById(req.params.id)
    .populate('cast')
    .exec(function (err, anime) {
      Character.find(
        { _id: { $nin: anime.cast } },
        function (err, characters) {
          res.render('animes/show', {
            title: 'Anime Detail',
            anime,
            characters
          });
        }
      );
    });
}

function newAnime(req, res) {
  // fetch data
  const keyword = req.query.keyword;
  // if (!username) return res.render('index', {userData: null});
  const options = {
      headers: {
          "X-MAL-CLIENT-ID": process.env.MAL_CLIENT_ID,
      },
  }
  let animeData;
  fetch(`${rootURL}`, options)
      .then(res => res.json())
      .then(animes => {
          animeData = animes;
          return fetch(`${rootURL}/anime?q=${keyword}&limit=50`, options);
      })
      .then(res => res.json())
      .then(animes => {
          animeData.animes = animes.data;
          // render view
          res.render('animes/new', {
              title: "raMEN",
              search_img: 'images/magnifying_glass.svg',
              keyword: keyword,
              animeData
          });
      });
}

function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  // remove whitespace next to commas
  req.body.cast = req.body.cast.replace(/\s*,\s*/g, ',');
  // split if it's not an empty string
  if (req.body.cast) req.body.cast = req.body.cast.split(',');
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  var anime = new Anime(req.body);
  anime.save(function (err) {
    // one way to handle errors
    if (err) return res.redirect('/animes/new');
    res.redirect(`/animes/${anime._id}`);
  });
}
