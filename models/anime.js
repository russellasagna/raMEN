const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animeSchema = new Schema({
    anime: {
        type: String,
    },
});

module.exports = mongoose.model('Anime', animeSchema);