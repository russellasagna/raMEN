const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterSchema = new Schema({
  name: {type: String, required: true, unique: true},
  born: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Character', characterSchema);