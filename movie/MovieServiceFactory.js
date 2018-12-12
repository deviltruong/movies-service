const MovieService = require('./MovieServices');

class MovieServiceFactory {
  static create() {
    return MovieService;
  }
}

module.exports = MovieServiceFactory;
