const Anime = require('../models/anime');
const User = require('../models/user');

module.exports = {
    index,
};

function index(req, res) {
    Anime.find({}, function (err, animes) {
        // req.body.user = req.user._id;
        // req.body.userName = req.user.name;
        // req.body.userAvatar = req.user.avatar;
        // animes.push(req.body);
        res.render('animes/home', { 
            title: 'raMEN', 
            image: 'images/raMEN.png',
            animes
        });
    });
}