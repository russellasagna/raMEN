const Anime = require('../models/anime');
const User = require('../models/user');

require('dotenv').config();

// The fetch variable will be a function that behaves like fetch in the browser
const fetch = require('node-fetch');
const rootURL = "https://api.myanimelist.net/v2";

module.exports = {
    index,
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
            return fetch(`https://api.myanimelist.net/v2/anime?q=${keyword}&limit=30`, options);
        })
        .then(res => res.json())
        .then(animes => {
            animeData.animes = animes.data;
            // render view
            res.render('animes/home', {
                title: 'raMEN',
                image: 'images/raMEN.png',
                search: "",
                animeData
            });
            // res.render('animes/home', { animeData });
        });
    
    // Anime.find({}, function (err, animes) {    });
    

}