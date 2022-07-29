const Anime = require('../models/anime');

module.exports = {
  create,
  delete: deleteComment,
};

async function deleteComment(req, res, next) {
  try {
    const anime = await Anime.findOne({'comments._id': req.params.id, 'comments.user': req.user._id});
    if (!anime) throw new Error('Nice Try!');
    // Remove the using the remove method on Mongoose arrays
    anime.comments.remove(req.params.id);
    await anime.save();
    res.redirect(`/animes/${anime._id}`);
  } catch (err) {
    return next(err);
  }
}

function create(req, res) {
  // The new comment will be embedded in the anime doc
  Anime.findById(req.params.id, function(err, anime) {
    // Mongoose arrays have everything that JS arrays
    // have, and more!

    // Add the user-centric info to req.body
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    anime.comments.push(req.body);
    anime.save(function(err) {
      // Step 5: Data has been changed
      // so we redirect
      res.redirect(`/animes/${anime._id}`);
    });
  });
}