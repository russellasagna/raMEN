const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animeSchema = new Schema({
    anime: { type: String },
    animeID: { type: String },
    large: { type: String },
    medium: { type: String },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String,
    favorites: []
});

module.exports = mongoose.model('Anime', animeSchema);