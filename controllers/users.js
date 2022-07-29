const User = require('../models/user');

module.exports = {
    show,
};

function show(req, res) {
    Anime.findById(req.params.id)
    //   .populate('cast')
      .exec(function(err, anime) {
        res.render('animes/show', {
            anime,
        });
      });
}