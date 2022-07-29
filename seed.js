// Load the secrets in the .env module
require('dotenv').config();
// Connect to our database (line of code must be AFTER the above - .env)
require('./config/database');

const Anime = require('./models/anime');
const Character = require('./models/character');

const data = require('./data');

// Just a query object as an arg, no callback!
// Anime.deleteMany({})
//   // The cb provided to the .then does not use the error-first signature
//   // use .catch instead to deal with errors
//   .then(function (results) {
//     // results will be whatever the promise
//     // returned by the deleteMany method resolves to
//     console.log('Deleted Movies...', results);
//     return Character.deleteMany({});
//   })
//   .then(function(results) {
//     console.log('Deleted Characters...', results);
//   })

const p1 = Anime.deleteMany({});
const p2 = Character.deleteMany({});
// Promise.all will return a single promise
// that resolves when all of the promises
// passed to it within an array are resolved
Promise.all([p1, p2])
  .then(function (results) {
    console.log(results)
    return Character.create(data.characters);
  })
  .then(function (characters) {
    console.log(characters);
    return Anime.create(data.animes);
  })
  .then(function (animes) {
    console.log(animes);
    return Promise.all([
      Character.findOne({ name: 'Kirito' }),
      Anime.findOne({ title: /Sword Art Online.*/ })
    ]);
  })
  // results is an array of two elements,
  // the "Mark" doc and the "Star Wars" doc
  .then(function (results) { // one day we will destructure the array
    const kirito = results[0];
    const sao = results[1];
    sao.cast.push(kirito._id);
    return sao.save();
  })
  .then(function (saoDoc) {
    console.log(saoDoc);
  })
  .then(process.exit);