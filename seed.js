// // Load the secrets in the .env module
// require('dotenv').config();
// // Connect to our database (line of code must be AFTER the above - .env)
// require('./config/database');

// const Movie = require('./models/movie');
// const Performer = require('./models/performer');

// const data = require('./data');

// // Just a query object as an arg, no callback!
// // Movie.deleteMany({})
// //   // The cb provided to the .then does not use the error-first signature
// //   // use .catch instead to deal with errors
// //   .then(function (results) {
// //     // results will be whatever the promise
// //     // returned by the deleteMany method resolves to
// //     console.log('Deleted Movies...', results);
// //     return Performer.deleteMany({});
// //   })
// //   .then(function(results) {
// //     console.log('Deleted Performers...', results);
// //   })

// const p1 = Movie.deleteMany({});
// const p2 = Performer.deleteMany({});
// // Promise.all will return a single promise
// // that resolves when all of the promises
// // passed to it within an array are resolved
// Promise.all([p1, p2])
//   .then(function(results) {
//     console.log(results)
//     return Performer.create(data.performers);
//   })
//   .then(function(performers) {
//     console.log(performers);
//     return Movie.create(data.movies);
//   })
//   .then(function(movies) {
//     console.log(movies);
//     return Promise.all([
//       Performer.findOne({name: 'Mark Hamill'}),
//     Movie.findOne({title: /Star Wars.*/})
//     ]);
//   })
//   // results is an array of two elements,
//   // the "Mark" doc and the "Star Wars" doc
//   .then(function(results) { // one day we will destructure the array
//     const mark = results[0];
//     const starWars = results[1];
//     starWars.cast.push(mark._id);
//     return starWars.save();
//   })
//   .then(function(starWarsDoc) {
//     console.log(starWarsDoc);
//   })
//   .then(process.exit);