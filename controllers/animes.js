const Anime = require('../models/anime');
const User = require('../models/user');

require('dotenv').config();

// The fetch variable will be a function that behaves like fetch in the browser
const fetch = require('node-fetch');
const rootURL = "https://api.myanimelist.net/v2";

module.exports = {
    index,
    show,
    addFavorite,
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
            res.render('animes/home', {
                title: 'raMEN',
                image: 'images/raMEN.png',
                search_img: 'images/magnifying_glass.svg',
                keyword: keyword,
                animeData
            });
        });
}

function show(req, res) {
    // Originally planned to send anime data to MongoDB then pull from it using a Model

    if (req.body.user) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
    }

    var animeModel = new Anime(req.body);
    res.render('animes/anime', {
        anime: animeModel.anime,
        animeID: animeModel.animeID,
        animeLarge: animeModel.large,
        animeMedium: animeModel.medium,
        userID: req.body.userID,
        userName: req.body.userName,
        userAvatar: req.body.userAvatar,
    });  
}

function addFavorite(req, res) {
    Anime.findById(req.params.id, function(err, anime) {
      // Ensure that user is not already in favorites
      // See "Finding a Subdocument" in https://mongoosejs.com/docs/subdocs.html
      // if (anime.favorites.id(req.user._id)) return res.redirect('/animes');
      anime.favorites.push(req.user._id);
      anime.save(function(err) {
        res.redirect(`/animes/${req.user._id}`);
      });
    });
  }