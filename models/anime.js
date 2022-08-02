const mongoose = require('mongoose');
// optional shortcut variable
const Schema = mongoose.Schema;

// Reviews (subdocs) will be embedded inside of
// movie docs
const commentSchema = new Schema({
  content: {
    type: String,
    match: /.{10,}/
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  userName: String,
  userAvatar: String
}, {
  // Automatic createdAt & updatedAt properties
  timestamps: true
});

const animeSchema = new Schema({
  title: {type: String},
  releaseYear: {
    type: Number,
    // releaseYear must not exist
    // on req.body
    default: function() {
      // whatever is returned is assigned
      // to releaseYear
      return new Date().getFullYear();
    },
    min: 1927
  },
  mpaaRating: {
    type: String,
    enum: ['G', 'PG', 'PG-13', 'R']
  },
  // The ref property informs Mongoose which Module
  // to use when populating the cast property
  cast: [{type: Schema.Types.ObjectId, ref: 'Character'}],
  nowShowing: Boolean,
  comments: [commentSchema],
  large: String,
  medium: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Anime', animeSchema);