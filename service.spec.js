/* eslint-env mocha */
process.env.NODE_ENV = 'test';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const request = require('supertest');
const { expect } = require('chai');
const server = require('./Server');
const { Factory } = require('./Factory');
const MovieControllerFactory = require('./movie/MovieControllerFactory');
const Config = require('./config/Config.test');

const configs = new Config();
Config.configENV();

describe('Movies API', () => {
  let app = null;
  const testMovies = [
    {
      id: '3',
      title: 'xXx: Reactivado',
      format: 'IMAX',
      releaseYear: 2017,
      releaseMonth: 1,
      releaseDay: 20,
    },
    {
      id: '4',
      title: 'Resident Evil: Capitulo Final',
      format: 'IMAX',
      releaseYear: 2017,
      releaseMonth: 1,
      releaseDay: 27,
    },
    {
      id: '1',
      title: 'Assasins Creed',
      format: 'IMAX',
      releaseYear: 2017,
      releaseMonth: 1,
      releaseDay: 6,
    },
  ];

  const testRepo = {
    getAllMovies() {
      return Promise.resolve(testMovies);
    },
    getMovieById(id) {
      const movie = testMovies.find(m => m.id === id);
      return Promise.resolve(movie);
    },
  };

  before(() => {
    Factory.register('MovieController', MovieControllerFactory);
    Factory.register('MovieService', {
      create() {
        return testRepo;
      },
    });
  });

  beforeEach(() => {
    server.start({
      port: configs.PORT,
      ssl: configs.SSL,
    }).then((serv) => {
      app = serv;
    }).catch();
  });

  afterEach(() => {
    app.close();
    app = null;
  });

  describe('#index', () => {
    it('can return all movies', (done) => {
      request(app)
        .get('/movies')
        .set('Accept', 'application/json')
        .expect(200, done);
    });
  });

  // it('can get movie premiers', (done) => {
  //   reqest(app)
  //     .get('/movies/premiers')
  //     .expect((res) => {
  //       res.body.should.containEql(testMovies.find(movie => movie.releaseYear === 2017));
  //     })
  //     .expect(200, done);
  // });

  describe('#show', () => {
    it('returns 200 for an known movie', (done) => {
      request(app)
        .get('/movies/1')
        .expect((res) => {
          expect(res.body).to.eql({
            id: '1',
            title: 'Assasins Creed',
            format: 'IMAX',
            releaseYear: 2017,
            releaseMonth: 1,
            releaseDay: 6,
          });
        })
        .expect(200, done);
    });

    it('returns 404 for an unknown movie', (done) => {
      request(app)
        .get('/movies/1001')
        .expect(404, done);
    });
  });
});
