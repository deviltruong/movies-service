const status = require('http-status');

class MovieController {
  constructor(service) {
    this.service = service;
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
  }

  index(req, res, next) {
    // if (!req.query.collection) {
    //   res.status(400).json({
    //     message: 'Thieu tham so collection',
    //     errors: [
    //       {
    //         entity: 'Movie',
    //       },
    //     ],
    //   });
    // }
    this.service.getAllMovies(req.query.collection)
      .then((movies) => {
        res.status(status.OK).json(movies);
      })
      .catch(next);
  }

  // create(req, res, next) {
  //
  // }

  show(req, res, next) {
    if (!req.query.collection) {
      res.status(400).json({
        message: 'Thieu tham so collection',
        errors: [
          {
            entity: 'Movie',
          },
        ],
      });
    }
    this.service.getMovieById(req.params.id, req.query.collection)
      .then((movie) => {
        if (movie) {
          res.status(status.OK).json(movie);
        } else {
          res.status(status.NOT_FOUND).json({
            id: req.params.id,
            message: 'Item not found',
          });
        }
      }).catch(next);
  }

  // update(req, res, next) {
  //
  // }

  // delete(req, res, next) {
  //
  // }
}

module.exports = MovieController;
