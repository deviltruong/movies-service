const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const movieAPI = require('./movie/movieAPI');

const start = options => new Promise((resolve, reject) => {
  if (!options.port) {
    reject(new Error('The server must be started with an available port'));
    return;
  }

  const app = express();
  app.use(morgan('dev'));
  app.use(helmet());
  app.use(bodyParser.json());

  // const errorHandler = () => {
  //   const env = process.env.NODE_ENV || 'development';
  //
  //   return (err, req, res) => {
  //     reject(new Error(`Something went wrong!, err: ${err}`));
  //     res.status(500);
  //
  //     if (env === 'development') {
  //       res.json(err);
  //     }
  //     res.json({
  //       message: 'Something went wrong',
  //     });
  //   };
  // };
  //
  // app.use(errorHandler());
  movieAPI(app, options);

  const noPageHandler = (req, res) => {
    res.status(404);
    res.json({
      message: 'The page not found',
    });
  };

  app.use(noPageHandler);

  const server = app.listen(options.port, () => resolve(server));
});

module.exports = Object.assign({}, { start });
