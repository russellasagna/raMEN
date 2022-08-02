const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  timestamps: true
});

const animeSchema = new Schema({
  title: {type: String},
  releaseYear: {
    type: Number,
    default: function() {
      return new Date().getFullYear();
    },
    min: 1927
  },
  mpaaRating: {
    type: String,
    enum: ['G', 'PG', 'PG-13', 'R']
  },
  cast: [{type: Schema.Types.ObjectId, ref: 'Character'}],
  nowShowing: Boolean,
  comments: [commentSchema],
  large: String,
  medium: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Anime', animeSchema);