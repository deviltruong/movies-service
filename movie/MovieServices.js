const Movie = require('./movie');

class MovieService {
  // static create(title, email) {
  //   const newMovie = new Movie();
  //   newMovie.title = title;
  //   newMovie.email = email;
  //
  //   // This will return a promise
  //   return newMovie.save();
  // }

  static getAllMovies() {
    return Movie.find();
  }

  static getMovieById(id) {
    return Movie.findOne({ id });
  }

  // static getMoviePremiers() {
  //   const currentDay = new Date();
  //   const query = {
  //     releaseYear: {
  //       $gt: currentDay.getFullYear() - 1,
  //       $lt: currentDay.getFullYear(),
  //     },
  //     releaseMonth: {
  //       $gte: currentDay.getMonth() + 1,
  //       $lte: currentDay.getMonth() + 2,
  //     },
  //     releaseDay: {
  //       $lte: currentDay.getDate(),
  //     },
  //   };
  //   return Movie.find(query);
  // }
}

module.exports = MovieService;
