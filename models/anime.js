const mongoose = require('mongoose');
// optional shortcut variable
const Schema = mongoose.Schema;

// Comments (subdocs) will be embedded inside of
// Anime docs
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
    anime: { type: String },
    animeID: { type: String },
    large: { type: String },
    medium: { type: String },
    // The ref property informs Mongoose which Module
    // to use when populating the cast property
    // cast: [{type: Schema.Types.ObjectId, ref: 'Performer'}],
    comments: [commentSchema],
    favorites: [],
}, {
  timestamps: true
});

module.exports = mongoose.model('Anime', animeSchema);