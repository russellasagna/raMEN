const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animeSchema = new Schema({
    anime: { type: String },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String
});

module.exports = mongoose.model('Anime', animeSchema);