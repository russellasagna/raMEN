const Anime = require('../models/anime');
const Character = require('../models/character');

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

async function newAnime(req, res) {
  const keyword = req.query.keyword;
  const animeID = req.query.animeID;
  const animeFields = req.query.animeFields;
  const options = {
      headers: {
          "X-MAL-CLIENT-ID": process.env.MAL_CLIENT_ID,
      },
  }
  let fields = "id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics";
  const animeData = await fetch(`${rootURL}/anime?q=${keyword}&limit=50`, options).then(res => res.json());
  const animeDetails = await fetch(`${rootURL}/anime/${animeID}?fields=${animeFields}`, options).then(res => res.json());
  const animeTest = await fetch(`${rootURL}/anime/30749?fields=start_date`, options).then(res => res.json());
  res.render('animes/new', {
    title: 'raMEN',
    image: 'images/raMEN.png',
    search_img: '/images/magnifying_glass.svg',
    keyword: keyword,
    animeID: animeID,
    animeFields: animeFields,
    animeData,
    animeDetails,
    animeTest,
    fields: fields
  });
}

function create(req, res) {
  req.body.nowShowing = !!req.body.nowShowing;
  req.body.cast = req.body.cast.replace(/\s*,\s*/g, ',');
  if (req.body.cast) req.body.cast = req.body.cast.split(',');
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  var anime = new Anime(req.body);
  anime.save(function (err) {
    if (err) return res.redirect('/animes/new');
    res.redirect(`/animes/${anime._id}`);
  });
}