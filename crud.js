// Load the secrets in the .env module
require('dotenv').config();
// Connect to our database (line of code must be AFTER the above - .env)
require('./config/database');

const Anime = require('./models/anime');
const Character = require('./models/character');

