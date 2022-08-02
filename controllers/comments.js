const Anime = require('../models/anime');

module.exports = {
  create,
  delete: deleteComment,
  edit: editComment,
  update: updateComment
};

function updateComment(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  Anime.findOne({'comments._id': req.params.id}, function(err, anime) {
    // Find the comment subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const commentSubdoc = anime.comments.id(req.params.id);
    // Ensure that the comment was created by the logged in user
    if (!commentSubdoc.userId.equals(req.user._id)) return res.redirect(`/animes/${anime._id}`);
    // Update the text of the comment
    commentSubdoc.text = req.body.text;
    // Save the updated anime
    anime.save(function(err) {
      // Redirect back to the anime's show view
      res.redirect(`/animes/${anime._id}`);
    });
  });
}

function editComment(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  Anime.findOne({'comments._id': req.params.id}, function(err, anime) {
    // Find the comment subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const comment = anime.comments.id(req.params.id);
    // Render the comments/edit.ejs template, passing to it the comment
    res.render('comments/edit', {comment});
  });
}

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