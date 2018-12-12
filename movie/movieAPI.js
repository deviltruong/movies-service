// const MovieController = require('./MovieController');
const resourceAPI = require('../resourceAPI');
const { Factory } = require('../Factory');

module.exports = (app, options) => {
  const movieController = Factory.create('MovieController', options);
  resourceAPI('movies', app, movieController);
};
