const Anime = require('../models/anime');
// const User = require('../models/user');

require('dotenv').config();

// // The fetch variable will be a function that behaves like fetch in the browser
const fetch = require('node-fetch');
const rootURL = "https://api.myanimelist.net/v2";

module.exports = {
    index,
    show,
    create,
};

function index(req, res, next) {
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
            res.render('animes/index', {
                title: 'raMEN',
                image: 'images/raMEN.png',
                search_img: 'images/magnifying_glass.svg',
                keyword: keyword,
                animeData
            });
        });
}

function show(req, res) {
    Anime.findById(req.params.id)
    //   .populate('cast')
    .exec(function(err, anime) {
        res.render('animes/show', {
            anime,
        });
    });
}

function create(req, res) {
    var anime = new Anime(req.body);
    anime.animeTitle = anime.anime;
    anime.save(function(err) {
      // one way to handle errors
      if (err) return res.redirect('/animes/new');
      res.redirect(`/animes/${anime._id}`);
    show(req, res);
    });
}