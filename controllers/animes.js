const Anime = require('../models/anime');
const User = require('../models/user');

module.exports = {
    index,
};

function index(req, res) {
    Anime.find({}, function (err, animes) {
        res.render('animes/home', { 
            title: 'raMEN', 
            image: 'images/raMEN.png',
            animes
        });
    });
}