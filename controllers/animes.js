const Anime = require('../models/anime');
const User = require('../models/user');

require('dotenv').config();

// The fetch variable will be a function that behaves like fetch in the browser
const fetch = require('node-fetch');
const rootURL = "https://api.myanimelist.net/v2";

module.exports = {
    index,
    show,
};

function index(req, res, next) {
    // fetch data
    const keyword = req.query.keyword;
    // if (!username) return res.render('index', {userData: null});
    const options = {
        headers: {
            "X-MAL-CLIENT-ID": process.env.MAL_CLIENT_ID
        }
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

    var animeModel = new Anime(req.body);
    res.render('animes/anime', {
        anime: animeModel.anime,
        animeID: animeModel.animeID,
        animeLarge: animeModel.large,
        animeMedium: animeModel.medium,
    });  
}