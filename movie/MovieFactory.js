const mongoose = require('mongoose');
const movieSchema = require('./movieSchema');

class MovieFactory {
  static create([collection]) {
    return mongoose.model(collection, movieSchema);
  }
}

module.exports = MovieFactory;
