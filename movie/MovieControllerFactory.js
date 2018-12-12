const MovieController = require('./MovieController');
const { Factory } = require('../Factory');

class MovieControllerFactory {
  static create() {
    const movieService = Factory.create('MovieService');
    return new MovieController(movieService);
  }
}

module.exports = MovieControllerFactory;
