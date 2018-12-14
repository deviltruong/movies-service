const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const spdy = require('spdy');
const morgan = require('./config/morgan');
const movieAPI = require('./movie/movieAPI');
const { serverError, pageNotFound } = require('./error-handler');
const Config = require('./config/Config.development');

class Server {
  static start(options) {
    return new Promise((resolve, reject) => {
      if (!options.port) {
        reject(new Error('The server must be started with an available port'));
        return;
      }
      const configs = new Config({});

      const app = express();
      app.use(morgan(configs.TIMEZONE));
      // if (process.env.NODE_ENV !== 'test') {
      //   // app.use(morgan('dev'));
      // }
      app.use(helmet());
      app.use(bodyParser.json());

      movieAPI(app, options);

      app.use(serverError());
      app.use(pageNotFound());

      const server = spdy.createServer(options.ssl, app)
        .listen(options.port, () => resolve(server));
    });
  }
}

module.exports = Server;
