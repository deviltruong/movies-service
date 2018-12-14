/**
 * @author Long (reallongnguyen@gmail.com)
 */
class Config {
  /**
   *
   * @param {Object}override: useful for test with other config
   */
  constructor(override) {
    // map between class name and path of it. Use for Factory Abstract pattern
    this.FACTORY = {
      MovieController: 'movie/MovieControllerFactory',
      MovieService: 'movie/MovieServiceFactory',
    };

    this.DATABASE_URI = 'DATABASE_URI';
    this.PORT = 3000;

    Object.assign(this, override);
  }
}

module.exports = Config;
